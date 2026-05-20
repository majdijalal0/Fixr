const express = require('express');
const router = express.Router();
const { onboardWorker, getWorkers, getWorkerById, updateWorkerProfile, removeGalleryImage, createWorkerReview, getWorkerReviews } = require('../controllers/workerController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getWorkers);
router.get('/:id', getWorkerById);

router.post('/onboard', protect, upload.single('image'), onboardWorker);

router.put(
  '/profile',
  protect,
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'gallery', maxCount: 10 },
  ]),
  updateWorkerProfile
);

router.delete('/profile/gallery', protect, removeGalleryImage);

router.get('/:id/reviews', getWorkerReviews);

router.post('/:id/reviews', protect, createWorkerReview);

module.exports = router;
