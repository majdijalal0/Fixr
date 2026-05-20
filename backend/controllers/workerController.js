const User = require('../models/User');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const cloudinary = require('../config/cloudinary');

const extractPublicId = (url) => {
  try {
    const parts = url.split('/upload/');
    if (parts.length < 2) return null;
    const pathAndVersion = parts[1];
    const pathParts = pathAndVersion.split('/');
    if (pathParts[0].startsWith('v')) {
      pathParts.shift();
    }
    const publicIdWithExt = pathParts.join('/');
    const publicId = publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.'));
    return publicId;
  } catch (err) {
    return null;
  }
};

const onboardWorker = async (req, res) => {
  try {
    const { service, experience, hourlyRate } = req.body;
    
    const certificationURL = req.file ? req.file.path : ''; 

    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.workerProfile = {
      ...user.workerProfile,
      service,
      experience,
      hourlyRate: Number(hourlyRate),
      certificationURL,
      isVerified: false 
    };

    user.role = 'worker'; 

    await user.save();

    res.status(200).json({
      message: 'Worker profile updated successfully',
      workerProfile: user.workerProfile,
      role: user.role
    });

  } catch (error) {
    console.error('Error in onboardWorker:', error);
    res.status(500).json({ message: 'Server error during onboarding', error: error.message });
  }
};


const getWorkers = async (req, res) => {
  try {
    const workersList = await User.find({ role: 'worker' }).select('-password -__v');
    
    const workersWithAvailability = await Promise.all(workersList.map(async (worker) => {
      const activeTasksCount = await Booking.countDocuments({ 
        workerId: worker._id, 
        status: 'accepted' 
      });
      return { 
        ...worker.toObject(), 
        activeTasksCount 
      };
    }));

    res.status(200).json(workersWithAvailability);
  } catch (error) {
    console.error('Error fetching workers:', error);
    res.status(500).json({ message: 'Failed to fetch workers', error: error.message });
  }
};


const getWorkerById = async (req, res) => {
  try {
    const worker = await User.findOne({ _id: req.params.id, role: 'worker' }).select('-password -__v -workerProfile.certificationURL');
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    const activeTasksCount = await Booking.countDocuments({ 
      workerId: worker._id, 
      status: 'accepted' 
    });

    res.status(200).json({
      ...worker.toObject(),
      activeTasksCount
    });
  } catch (error) {
    console.error('Error fetching worker:', error);
    res.status(500).json({ message: 'Failed to fetch worker', error: error.message });
  }
};


const updateWorkerProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || user.role !== 'worker') {
      return res.status(403).json({ message: 'Access denied. Workers only.' });
    }

    const { bio, hourlyRate, experience } = req.body;


    if (bio !== undefined && bio !== '') user.workerProfile.bio = bio;
    if (hourlyRate !== undefined && hourlyRate !== '') user.workerProfile.hourlyRate = Number(hourlyRate);
    if (experience !== undefined && experience !== '') user.workerProfile.experience = experience;

    if (req.files && req.files['profileImage'] && req.files['profileImage'][0]) {
      user.workerProfile.profileImage = req.files['profileImage'][0].path;
    }

    if (req.files && req.files['gallery'] && req.files['gallery'].length > 0) {
      const newUrls = req.files['gallery'].map(f => f.path);
      user.workerProfile.gallery = [...(user.workerProfile.gallery || []), ...newUrls];
    }

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      workerProfile: user.workerProfile
    });

  } catch (error) {
    console.error('Error updating worker profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const removeGalleryImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const user = await User.findById(req.user.id);

    if (!user || user.role !== 'worker') {
      return res.status(403).json({ message: 'Access denied. Workers only.' });
    }

    user.workerProfile.gallery = (user.workerProfile.gallery || []).filter(url => url !== imageUrl);
    await user.save();

    const publicId = extractPublicId(imageUrl);
    if (publicId) {
      try { await cloudinary.uploader.destroy(publicId); } catch (_) {}
    }

    res.status(200).json({ message: 'Image removed', gallery: user.workerProfile.gallery });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



const createWorkerReview = async (req, res) => {
  try {
    const workerId = req.params.id;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    if (!rating || !comment) {
      return res.status(400).json({ message: 'Rating and comment are required' });
    }

    if (workerId.toString() === userId.toString()) {
      return res.status(400).json({ message: 'Workers cannot review themselves' });
    }

    const worker = await User.findOne({ _id: workerId, role: 'worker' });
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    const existingReview = await Review.findOne({ workerId, userId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this worker' });
    }

    const review = await Review.create({
      workerId,
      userId,
      rating: Number(rating),
      comment
    });

    const reviews = await Review.find({ workerId });
    const numReviews = reviews.length;
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / numReviews;

    worker.workerProfile.rating = Number(avgRating.toFixed(1));
    worker.workerProfile.ratingCount = numReviews;

    await worker.save();

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const getWorkerReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ workerId: req.params.id })
      .populate('userId', 'name')
      .sort('-createdAt');
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  onboardWorker,
  getWorkers,
  getWorkerById,
  updateWorkerProfile,
  removeGalleryImage,
  createWorkerReview,
  getWorkerReviews
};
