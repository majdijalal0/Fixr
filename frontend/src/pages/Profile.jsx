import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, Briefcase, Calendar, MapPin, Mail, 
  Settings, LogOut, Loader2, CheckCircle, XCircle, Clock,
  PenLine, Image as ImageIcon, Trash2, Save, AlertTriangle, X
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('bookings');

  const [profileData, setProfileData] = useState({ bio: '', hourlyRate: '', experience: '' });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [workerProfile, setWorkerProfile] = useState(null);
  const [saveStatus, setSaveStatus] = useState(''); 
  const [profileLoading, setProfileLoading] = useState(false);
  const [deleteConfirmImg, setDeleteConfirmImg] = useState(null);
  const profileImgRef = useRef(null);
  const galleryRef = useRef(null);
  const originalProfileRef = useRef({ bio: '', hourlyRate: '', experience: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (e) {
      console.error('Error parsing user data:', e);
      navigate('/');
      return;
    }
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const endpoint = user.role === 'worker' 
          ? `${API_URL}/api/bookings/worker`
          : `${API_URL}/api/bookings/customer`;

        const response = await fetch(endpoint, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          console.error('Failed to fetch bookings');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  useEffect(() => {
    if (!user || user.role !== 'worker') return;
    setProfileLoading(true);
    const fetchWorkerProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/api/workers/${user.id || user._id}`);
        if (res.ok) {
          const data = await res.json();
          const wp = data.workerProfile || {};
          setWorkerProfile(wp);
          const loaded = {
            bio: wp.bio || '',
            hourlyRate: wp.hourlyRate || '',
            experience: wp.experience || ''
          };
          setProfileData(loaded);
          originalProfileRef.current = loaded;
        }
      } catch (err) { console.error(err); }
      finally { setProfileLoading(false); }
    };
    fetchWorkerProfile();
  }, [user]);

  const handleSaveProfile = async () => {
    setSaveStatus('saving');
    try {
      const token = localStorage.getItem('token');
      const form = new FormData();

      const orig = originalProfileRef.current;
      if (profileData.bio !== orig.bio) form.append('bio', profileData.bio);
      if (String(profileData.hourlyRate) !== String(orig.hourlyRate)) form.append('hourlyRate', profileData.hourlyRate);
      if (profileData.experience !== orig.experience) form.append('experience', profileData.experience);

      if (profileImageFile) form.append('profileImage', profileImageFile);
      galleryFiles.forEach(f => form.append('gallery', f));

      const res = await fetch(`${API_URL}/api/workers/profile`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: form
      });

      if (res.ok) {
        const data = await res.json();
        setWorkerProfile(data.workerProfile);
        originalProfileRef.current = {
          bio: data.workerProfile?.bio || '',
          hourlyRate: data.workerProfile?.hourlyRate || '',
          experience: data.workerProfile?.experience || ''
        };
        setProfileData(originalProfileRef.current);
        setProfileImageFile(null);
        setGalleryFiles([]);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      console.error(err);
      setSaveStatus('error');
    }
  };

  const handleDeleteGalleryImage = (imageUrl) => {
    setDeleteConfirmImg(imageUrl);
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmImg) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/workers/profile/gallery`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ imageUrl: deleteConfirmImg })
      });
      if (res.ok) {
        const data = await res.json();
        setWorkerProfile(prev => ({ ...prev, gallery: data.gallery }));
      }
    } catch (err) { 
      console.error(err); 
    } finally {
      setDeleteConfirmImg(null);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setBookings(bookings.map(b => 
          b._id === bookingId ? { ...b, status: newStatus } : b
        ));
      } else {
        alert('Failed to update booking status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-semibold text-amber-700 bg-amber-100 rounded-full"><Clock className="w-4 h-4" /> Pending</span>;
      case 'accepted':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full"><CheckCircle className="w-4 h-4" /> Accepted</span>;
      case 'completed':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-semibold text-emerald-700 bg-emerald-100 rounded-full"><CheckCircle className="w-4 h-4" /> Completed</span>;
      case 'rejected':
      case 'cancelled':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-semibold text-red-700 bg-red-100 rounded-full"><XCircle className="w-4 h-4" /> {status.charAt(0).toUpperCase() + status.slice(1)}</span>;
      default:
        return <span className="px-3 py-1 text-sm font-semibold text-slate-700 bg-slate-100 rounded-full">{status}</span>;
    }
  };

  if (!user) return null;

  const isWorker = user.role === 'worker';

  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 overflow-hidden bg-white shadow-sm rounded-3xl border border-slate-100"
        >
          <div className="h-32 bg-gradient-mesh"></div>
          <div className="relative px-6 pb-6 sm:px-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 sm:-mt-16 gap-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full p-1.5 shadow-lg shrink-0">
                <img
                  src={
                    (isWorker && (profileImageFile
                      ? URL.createObjectURL(profileImageFile)
                      : workerProfile?.profileImage))
                    || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=128&background=fef3c7&color=92400e&bold=true`
                  }
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
                <p className="text-slate-500 font-medium mt-1 flex items-center justify-center sm:justify-start gap-2">
                  <Briefcase className="w-4 h-4" />
                  {isWorker ? 'Professional Worker' : 'Customer Account'}
                </p>
              </div>
              <button 
                onClick={handleLogout}
                className="btn-outline gap-2 mt-4 sm:mt-0"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-2">
              <button 
                onClick={() => setActiveTab('bookings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${activeTab === 'bookings' ? 'bg-amber-50 text-amber-700' : 'text-slateate-600 hover:bg-slate-50'}`}
              >
                <Briefcase className="w-5 h-5" />
                {isWorker ? 'Job Requests' : 'My Bookings'}
              </button>
              {isWorker && (
                <button 
                  onClick={() => setActiveTab('editprofile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${activeTab === 'editprofile' ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <PenLine className="w-5 h-5" />
                  Edit Profile
                </button>
              )}
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${activeTab === 'settings' ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <Settings className="w-5 h-5" />
                Account Settings
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 min-h-[500px]"
          >
            <AnimatePresence mode="wait">
              {activeTab === 'bookings' && (
                <motion.div
                  key="bookings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">
                      {isWorker ? 'Incoming Job Requests' : 'Booking History'}
                    </h2>
                  </div>

                  {loading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
                    </div>
                  ) : bookings.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">No bookings yet</h3>
                      <p className="text-slate-500">
                        {isWorker ? "You don't have any job requests at the moment." : "You haven't made any service bookings yet."}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div key={booking._id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all hover:shadow-md">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-3 bg-slate-50 rounded-xl">
                                <Briefcase className="w-6 h-6 text-slate-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-slate-900 capitalize">{booking.serviceType} Service</h3>
                                <p className="text-slate-500 text-sm">Ref: #{booking._id.slice(-6).toUpperCase()}</p>
                              </div>
                            </div>
                            <div>
                              {getStatusBadge(booking.status)}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-t border-slate-100">
                            <div className="space-y-3 gap-2 text-slate-600">
                              <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400"/> {new Date(booking.date).toLocaleDateString()}</p>
                              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400"/> {booking.address}</p>
                            </div>
                            <div className="space-y-3 text-slate-600 bg-slate-50 p-4 rounded-xl">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-slate-400"/>
                                <span className="font-semibold text-slate-900">
                                  {isWorker ? 'Customer: ' : 'Professional: '}
                                </span>
                                {isWorker ? booking.customerId?.name : booking.workerId?.name}
                              </div>
                              {booking.notes && (
                                <p className="text-sm italic text-slate-500 mt-2 border-l-2 border-amber-300 pl-3">
                                  "{booking.notes}"
                                </p>
                              )}
                            </div>
                          </div>

                          {isWorker && booking.status === 'pending' && (
                            <div className="flex gap-3 mt-4 pt-4 border-t border-slate-100">
                              <button 
                                onClick={() => handleStatusUpdate(booking._id, 'accepted')}
                                className="flex-1 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold rounded-lg transition-colors"
                              >
                                Accept Job
                              </button>
                              <button 
                                onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                                className="flex-1 py-2 bg-red-50 text-red-700 hover:bg-red-100 font-semibold rounded-lg transition-colors"
                              >
                                Decline
                              </button>
                            </div>
                          )}
                          
                          {isWorker && booking.status === 'accepted' && (
                             <div className="flex gap-3 mt-4 pt-4 border-t border-slate-100">
                               <button 
                                 onClick={() => handleStatusUpdate(booking._id, 'completed')}
                                 className="flex-1 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:shadow-sm font-semibold rounded-lg transition-all"
                               >
                                 Mark as Completed
                               </button>
                             </div>
                          )}

                          {!isWorker && booking.status === 'pending' && (
                            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                              <button 
                                onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                                className="px-6 py-2 bg-red-50 text-red-700 hover:bg-red-100 font-semibold rounded-lg transition-colors"
                              >
                                Cancel Request
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'settings' && (
                 <motion.div
                 key="settings"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm"
               >
                 <h2 className="text-2xl font-bold text-slate-900 mb-6">Account Settings</h2>
                 <p className="text-slate-500 mb-8">Manage your profile information and preferences.</p>
                 
                 <div className="space-y-6 max-w-xl">
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                     <input type="text" className="input-styled" defaultValue={user.name} disabled />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                     <div className="relative">
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5"/>
                       <input type="email" className="input-styled pl-11" defaultValue={user.email || 'user@example.com'} disabled />
                     </div>
                   </div>
                   {isWorker && (
                     <div className="pt-4 border-t border-slate-100 mt-6">
                        <h3 className="font-bold text-slate-900 mb-2">Worker Profile</h3>
                        <p className="text-sm text-slate-500">Your profile is currently active and visible to customers.</p>
                     </div>
                   )}
                 </div>
               </motion.div>
              )}

              {activeTab === 'editprofile' && isWorker && (
                <motion.div
                  key="editprofile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-slate-900">Edit Your Profile</h2>
                    <button
                      onClick={handleSaveProfile}
                      disabled={saveStatus === 'saving'}
                      className="btn-primary gap-2"
                    >
                      {saveStatus === 'saving' ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
                      ) : saveStatus === 'saved' ? (
                        <><CheckCircle className="w-4 h-4" /> Saved!</>
                      ) : (
                        <><Save className="w-4 h-4" /> Save Changes</>
                      )}
                    </button>
                  </div>
                  {saveStatus === 'error' && (
                    <div className="p-3 bg-red-50 text-red-600 font-semibold text-sm rounded-xl border border-red-200">
                      Failed to save changes. Please try again.
                    </div>
                  )}

                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><User className="w-5 h-5 text-amber-500" /> Profile Photo</h3>
                    <div className="flex items-center gap-6">
                      <img
                        src={profileImageFile
                          ? URL.createObjectURL(profileImageFile)
                          : workerProfile?.profileImage
                          || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=120&background=fef3c7&color=92400e&bold=true`}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover ring-4 ring-amber-100 shadow"
                      />
                      <div>
                        <input ref={profileImgRef} type="file" accept="image/*" className="hidden" onChange={e => setProfileImageFile(e.target.files[0])} />
                        <button
                          onClick={() => profileImgRef.current?.click()}
                          className="btn-outline text-sm gap-2"
                        >
                          <ImageIcon className="w-4 h-4" /> Upload New Photo
                        </button>
                        {profileImageFile && <p className="text-xs text-slate-500 mt-2">Selected: {profileImageFile.name}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-5">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2"><PenLine className="w-5 h-5 text-amber-500" /> Professional Details</h3>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">About Me / Bio</label>
                      <textarea
                        rows={4}
                        placeholder="Describe your experience, skills, and what makes you stand out…"
                        className="input-styled resize-none"
                        value={profileData.bio}
                        onChange={e => setProfileData(p => ({ ...p, bio: e.target.value }))}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Hourly Rate ($)</label>
                        <input
                          type="number"
                          placeholder="e.g. 40"
                          className="input-styled"
                          value={profileData.hourlyRate}
                          onChange={e => setProfileData(p => ({ ...p, hourlyRate: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Years of Experience</label>
                        <select
                          className="input-styled"
                          value={profileData.experience}
                          onChange={e => setProfileData(p => ({ ...p, experience: e.target.value }))}
                        >
                          <option value="">Select…</option>
                          <option>Less than 1 year</option>
                          <option>1-3 years</option>
                          <option>3-5 years</option>
                          <option>5+ years</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-slate-900 flex items-center gap-2"><ImageIcon className="w-5 h-5 text-amber-500" /> Portfolio Gallery</h3>
                      <div>
                        <input ref={galleryRef} type="file" accept="image/*" multiple className="hidden" onChange={e => setGalleryFiles(Array.from(e.target.files))} />
                        <button onClick={() => galleryRef.current?.click()} className="btn-outline text-sm gap-2">
                          + Add Photos
                        </button>
                      </div>
                    </div>
                    {galleryFiles.length > 0 && (
                      <div className="mb-4 p-3 bg-amber-50 rounded-xl text-sm text-amber-700 font-semibold">
                        {galleryFiles.length} new photo(s) selected — click Save Changes to upload.
                      </div>
                    )}
                    {(workerProfile?.gallery || []).length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {(workerProfile?.gallery || []).map((url, i) => (
                          <div key={i} className="relative group aspect-square rounded-xl overflow-hidden shadow-sm">
                            <img src={url} alt={`Portfolio ${i + 1}`} className="w-full h-full object-cover" />
                            <button
                              onClick={() => handleDeleteGalleryImage(url)}
                              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow"
                              title="Remove"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
                        No portfolio images yet. Upload some to showcase your work!
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>

      <AnimatePresence>
        {deleteConfirmImg && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmImg(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 border border-slate-100/80 overflow-hidden z-10"
            >
              <button 
                onClick={() => setDeleteConfirmImg(null)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50 transition-all"
              >
                <X size={18} />
              </button>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-100">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-2">Remove Project?</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 px-4">
                  Are you sure you want to delete this image from your portfolio? This action is permanent and cannot be undone.
                </p>

                <div className="w-full h-40 rounded-2xl overflow-hidden mb-8 border border-slate-100 shadow-inner relative">
                  <img 
                    src={deleteConfirmImg} 
                    alt="Deleting portfolio preview" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setDeleteConfirmImg(null)}
                    className="flex-1 py-3.5 px-6 bg-slate-50 hover:bg-slate-100 active:scale-[0.98] text-slate-700 font-bold rounded-2xl border border-slate-200/60 transition-all text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="flex-1 py-3.5 px-6 bg-red-500 hover:bg-red-600 active:scale-[0.98] text-white font-bold rounded-2xl shadow-lg shadow-red-500/25 transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    Yes, Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;