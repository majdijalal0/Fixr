import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star, MapPin, Briefcase, Clock, BadgeCheck,
  Phone, ChevronLeft, Image as ImageIcon, Loader2, MessageSquare, Send, Quote, CheckCircle2
} from 'lucide-react';
import BookingModal from '../components/BookingModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const WorkerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [ratingInput, setRatingInput] = useState(0);
  const [commentInput, setCommentInput] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const response = await fetch(`${API_URL}/api/workers/${id}`);
        if (response.ok) {
          const data = await response.json();
          setWorker(data);
        } else {
          navigate('/services');
        }
      } catch (err) {
        console.error('Failed to fetch worker:', err);
        navigate('/services');
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/api/workers/${id}/reviews`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      }
    };

    fetchWorker();
    fetchReviews();
  }, [id, navigate]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!ratingInput || !commentInput.trim()) return;
    if (!user) return alert("Please login to submit a review");

    setIsSubmittingReview(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/workers/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ rating: ratingInput, comment: commentInput })
      });
      const data = await res.json();
      if (res.ok) {
        const newReview = { 
          ...data.review, 
          userId: { _id: user.id || user._id, name: user.name } 
        };
        setReviews([newReview, ...reviews]);
        setCommentInput('');
        setRatingInput(0);
        
        const newCount = (worker.workerProfile?.ratingCount || 0) + 1;
        const newAvg = (((Number(worker.workerProfile?.rating) || 0) * (newCount - 1)) + ratingInput) / newCount;
        
        setWorker({
          ...worker,
          workerProfile: {
            ...worker.workerProfile,
            ratingCount: newCount,
            rating: newAvg.toFixed(1)
          }
        });
      } else {
        alert(data.message || 'Error submitting review');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
      </div>
    );
  }

  if (!worker) return null;

  const wp = worker.workerProfile || {};
  const avatarUrl = wp.profileImage
    ? wp.profileImage
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(worker.name)}&size=200&background=fef3c7&color=92400e&bold=true`;
  const gallery = wp.gallery || [];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50 font-sans relative">
      <div className="absolute top-10  sm:left-8 lg:left-12 z-20 mt-2">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-[#FFB800] font-semibold transition-colors bg-white/60 backdrop-blur-md py-2 px-4 rounded-full shadow-sm hover:shadow-md border border-slate-200/60"
        >
          <ChevronLeft className="w-5 h-5 -ml-1" />
          Back to Services
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-12 gap-8">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-12 lg:col-span-4"
          >
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-sm border border-slate-200/60 overflow-visible relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="pt-24 pb-8 px-6 text-center">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                  <div className="relative">
                    <img
                      src={avatarUrl}
                      alt={worker.name}
                      className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-xl"
                    />
                    
                  </div>
                </div>

                <div className="mt-2">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">{worker.name}</h1>
                  <p className="text-[#FFB800] font-bold uppercase tracking-widest text-xs mt-1 mb-4">{wp.service || 'Professional'}</p>
                  
                  

                  <div className="flex justify-between items-center bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
                    <div className="text-center">
                      <p className="text-xl font-mono font-bold text-slate-900 flex items-center justify-center gap-1">
                        {wp.rating || '0.0'}
                      </p>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1">Rating</p>
                    </div>
                    <div className="w-px h-8 bg-slate-200"></div>
                    <div className="text-center">
                      <p className="text-xl font-mono font-bold text-slate-900">${wp.hourlyRate || '0'}</p>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1">/Hour</p>
                    </div>
                    <div className="w-px h-8 bg-slate-200"></div>
                    <div className="text-center">
                      <p className="text-xl font-mono font-bold text-slate-900">
                        {String(wp.experience || '0').toLowerCase().includes('less than 1') 
                          ? '<1' 
                          : String(wp.experience || '0').replace(/[^0-9+\-]/g, '') || '0'}
                      </p>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1">Years</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="w-full mt-6 bg-[#FFB800] hover:bg-amber-500 text-slate-900 font-bold py-4 rounded-2xl shadow-lg shadow-amber-500/20 transition-all active:scale-95"
                  >
                    Request Booking
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-sm border border-slate-200/60 p-6 mt-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
               <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Direct Contact</h3>
               <div className="space-y-3">
                  <a href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                     <div className="bg-orange-50 p-2 rounded-lg text-orange-600"><Phone className="w-4 h-4"/></div>
                     <span className="font-semibold text-slate-700 text-sm">{wp.phone || 'Contact via booking'}</span>
                  </a>

               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="col-span-12 lg:col-span-8 flex flex-col gap-6"
          >
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-slate-200/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                   <ImageIcon className="w-6 h-6 text-[#FFB800]" />
                   Featured Work
                 </h2>
                 <span className="text-sm font-bold text-[#FFB800] bg-orange-50 px-3 py-1 rounded-full border border-orange-100">{gallery.length} Projects</span>
              </div>
              
              {gallery.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {gallery.slice(0, 3).map((url, i) => (
                    <div
                      key={i}
                      className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer shadow-sm"
                      onClick={() => setLightboxImg(url)}
                    >
                      <img src={url} alt={`Work sample ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                         <div className="p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                             <p className="text-white font-bold text-sm">Project {i + 1}</p>
                             <p className="text-slate-300 text-xs mt-0.5">{wp.service || 'Panel Upgrade'}</p>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                  <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">No portfolio images uploaded yet.</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-slate-200/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">
                  <div>
                      <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-[#FFB800]" /> About
                      </h2>
                      {wp.bio ? (
                        <p className="text-slate-600 leading-relaxed text-[15px]">{wp.bio}</p>
                      ) : (
                        <p className="text-slate-400 italic">This professional hasn't added a bio yet.</p>
                      )}
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-slate-200/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-[#FFB800]" /> Expertise
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {wp.service && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100/80 text-orange-700 font-bold rounded-xl text-xs border border-orange-200/50">
                             <CheckCircle2 className="w-3.5 h-3.5" />
                             {wp.service}
                          </span>
                        )}
                        {wp.experience && (
                           <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 font-bold rounded-xl text-xs border border-blue-100">
                             <Clock className="w-3.5 h-3.5" />
                             {wp.experience} exp.
                           </span>
                        )}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 font-bold rounded-xl text-xs border border-emerald-100">
                            <BadgeCheck className="w-3.5 h-3.5" />
                            Licensed
                        </span>
                      </div>
                    </div>

                    {reviews.length > 0 && (
                        <div className="bg-slate-900 rounded-3xl p-8 shadow-md border border-slate-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden flex-1 flex flex-col justify-center">
                            <Quote className="absolute -top-4 -right-2 w-24 h-24 text-slate-800/50 rotate-12" />
                            <h2 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider relative z-10">Client Feedback</h2>
                            <p className="text-white font-serif text-lg leading-snug italic relative z-10">
                                "{reviews[0].comment.length > 100 ? reviews[0].comment.substring(0, 100) + '...' : reviews[0].comment}"
                            </p>
                            <div className="mt-4 flex items-center justify-between relative z-10">
                                <span className="font-bold text-[#FFB800] text-sm">— {reviews[0].userId?.name || 'Verified Client'}</span>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(reviews[0].rating) ? 'text-[#FFB800] fill-[#FFB800]' : 'text-slate-600'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-slate-200/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                   <Star className="w-5 h-5 text-[#FFB800] fill-[#FFB800]" />
                   All Reviews
                 </h2>
                 <span className="px-3 py-1 bg-slate-100 text-slate-700 font-bold text-sm rounded-full border border-slate-200">
                    {worker.workerProfile?.ratingCount || 0} Total
                 </span>
              </div>

              {user && user.role !== 'worker' && (
                <form onSubmit={handleReviewSubmit} className="mb-8 p-6 bg-slate-50/80 backdrop-blur-sm rounded-2xl border border-slate-200/80">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-slate-400" /> Share your experience
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingInput(star)}
                        className={`p-1.5 transition-colors duration-200 ${ratingInput >= star ? 'text-[#FFB800]' : 'text-slate-300 hover:text-yellow-300'}`}
                      >
                        <Star className={`w-7 h-7 ${ratingInput >= star ? 'fill-[#FFB800]' : ''}`} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Tell us about the service..."
                    className="w-full p-4 rounded-xl border border-slate-200/80 focus:ring-2 focus:ring-[#FFB800] focus:border-transparent outline-none resize-none mb-4 bg-white"
                    rows="3"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingReview || !ratingInput || !commentInput.trim()}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl ml-auto disabled:opacity-50 transition-colors"
                  >
                    {isSubmittingReview ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Submit Review
                  </button>
                </form>
              )}

              <div className="space-y-4">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review._id} className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:border-slate-200 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 uppercase">
                               {review.userId?.name?.charAt(0) || 'U'}
                           </div>
                           <div>
                               <span className="block font-bold text-slate-900">{review.userId?.name || 'User'}</span>
                               <span className="block text-xs text-slate-400 mt-0.5">{new Date(review.createdAt).toLocaleDateString()}</span>
                           </div>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                          <Star className="w-3.5 h-3.5 text-[#FFB800] fill-[#FFB800]" />
                          <span className="text-sm font-bold text-amber-700">{review.rating}.0</span>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-slate-500 font-medium">No reviews yet. Be the first to review!</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        serviceType={wp.service || 'General'}
        preselectedWorkerId={worker._id}
      />

      {lightboxImg && (
        <div
          className="fixed inset-0 z-[3000] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4"
          onClick={() => setLightboxImg(null)}
        >
           <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
              <ChevronLeft className="w-8 h-8 rotate-180" />
           </button>
          <img
            src={lightboxImg}
            alt="Portfolio"
            className="max-w-4xl w-full max-h-[85vh] rounded-3xl object-contain shadow-2xl ring-1 ring-white/10"
          />
        </div>
      )}
    </div>
  );
};

export default WorkerProfile;
