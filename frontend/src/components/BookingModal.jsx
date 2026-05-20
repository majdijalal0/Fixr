import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, MapPin, Briefcase, User, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BookingModal = ({ isOpen, onClose, serviceType, preselectedWorkerId = null }) => {
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(preselectedWorkerId || '');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  
  const [loadingWorkers, setLoadingWorkers] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorCode, setErrorCode] = useState('');

  useEffect(() => {
    if (!isOpen || preselectedWorkerId) return;

    const fetchWorkers = async () => {
      setLoadingWorkers(true);
      try {
        const response = await fetch(`${API_URL}/api/workers`);
        if (response.ok) {
          const data = await response.json();
          const filteredWorkers = data.filter(w => 
            w.workerProfile?.service?.toLowerCase() === serviceType?.toLowerCase()
          );
          setWorkers(filteredWorkers);
        }
      } catch (error) {
        console.error("Error fetching workers:", error);
      } finally {
        setLoadingWorkers(false);
      }
    };

    fetchWorkers();
  }, [isOpen, serviceType, preselectedWorkerId]);

  useEffect(() => {
    if (preselectedWorkerId) setSelectedWorker(preselectedWorkerId);
  }, [preselectedWorkerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorCode('');

    if (!selectedWorker || !date || !address) {
       setErrorCode('Please fill in all required fields.');
       return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        setErrorCode('Please log in to book a service.');
        return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          workerId: selectedWorker,
          serviceType: serviceType,
          date: date,
          address: address,
          notes: notes
        })
      });

      if (response.ok) {
         onClose();
      } else {
         const data = await response.json();
         setErrorCode(data.message || 'Failed to submit booking.');
      }
    } catch (error) {
       console.error("Submit error:", error);
       setErrorCode('Network error occurred.');
    } finally {
       setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[2000] flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
       <div 
         className='fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity' 
         onClick={onClose}
       ></div>

       <div className='relative z-[2001] w-full max-w-lg transform overflow-hidden rounded-3xl glass p-8 shadow-2xl transition-all animate-scale-in bg-white'>
         
         <button 
           onClick={onClose}
           className="absolute right-6 top-6 text-slate-400 hover:text-slate-800 transition-colors bg-slate-100 hover:bg-slate-200 rounded-full p-2"
         >
           <X size={20} />
         </button>

         <div className='mb-6'>
           <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-sm font-bold text-amber-600 bg-amber-100 rounded-full">
             <Briefcase className="w-4 h-4" />
             {serviceType} Service
           </div>
           <h2 className='text-3xl font-black text-slate-900'>Book a <span className="text-amber-500">Professional</span></h2>
           <p className='text-slate-500 mt-2 font-medium'>Please fill in the details below to request a service.</p>
         </div>

         {errorCode && (
            <div className="p-3 mb-4 text-sm font-bold text-red-600 bg-red-50 border border-red-200 rounded-xl">
              {errorCode}
            </div>
         )}

         <form className='space-y-5' onSubmit={handleSubmit}>
           
           {!preselectedWorkerId && (
           <div>
             <label className='block text-sm font-bold text-slate-700 mb-2 ml-1'>Select a Professional</label>
             <div className="relative">
               <User className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" size={18} />
               <select 
                 className='input-styled pl-12 appearance-none cursor-pointer'
                 value={selectedWorker}
                 onChange={(e) => setSelectedWorker(e.target.value)}
                 disabled={loadingWorkers || workers.length === 0}
               >
                 <option value="" disabled>
                   {loadingWorkers ? 'Loading professionals...' : 
                    workers.length === 0 ? `No ${serviceType} professionals available` : 
                    'Choose a professional'}
                 </option>
                 {workers.map(worker => (
                   <option key={worker._id} value={worker._id}>
                     {worker.name} - ${worker.workerProfile?.hourlyRate}/hr
                   </option>
                 ))}
               </select>
             </div>
           </div>
           )}

           <div>
             <label className='block text-sm font-bold text-slate-700 mb-2 ml-1'>Service Date</label>
             <div className="relative">
               <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" size={18} />
               <input 
                 type='date' 
                 className='input-styled pl-12' 
                 value={date}
                 onChange={(e) => setDate(e.target.value)}
                 min={new Date().toISOString().split('T')[0]}
               />
             </div>
           </div>

           <div>
             <label className='block text-sm font-bold text-slate-700 mb-2 ml-1'>Service Address</label>
             <div className="relative">
               <MapPin className="absolute left-4 top-4 text-amber-500" size={18} />
               <textarea 
                 rows={2}
                 placeholder='Enter the full address...' 
                 className='input-styled pl-12 resize-none' 
                 value={address}
                 onChange={(e) => setAddress(e.target.value)}
               />
             </div>
           </div>

           <div>
             <label className='block text-sm font-bold text-slate-700 mb-2 ml-1'>Additional Notes</label>
             <textarea 
               rows={3}
               placeholder='Describe the issue or provide instructions...' 
               className='input-styled resize-none' 
               value={notes}
               onChange={(e) => setNotes(e.target.value)}
             />
           </div>

           <div className='pt-4'>
             <button 
               type="submit" 
               disabled={isSubmitting || (!preselectedWorkerId && workers.length === 0)}
               className={`w-full py-4 text-lg btn-primary ${isSubmitting || (!preselectedWorkerId && workers.length === 0) ? 'opacity-70 cursor-not-allowed' : ''}`}
             >
               {isSubmitting ? (
                 <span className="flex items-center justify-center gap-2">
                   <Loader2 className="w-5 h-5 animate-spin" />
                   Booking...
                 </span>
               ) : (
                 'Confirm Booking'
               )}
             </button>
           </div>
         </form>

       </div>
    </div>
  );
};

export default BookingModal;
