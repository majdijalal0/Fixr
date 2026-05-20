import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from './Card'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const CardLayout = ({ selectedServiceId }) => {
  const [workers, setWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/workers`);
        const data = await response.json();
        
        if (response.ok) {
          const formattedWorkers = data.map((user) => ({
            id: user._id,
            name: user.name,
            serviceId: user.workerProfile?.service?.toLowerCase() || 'other', 
            specialty: user.workerProfile?.service || 'Professional',
            rating: user.workerProfile?.rating || 0,
            reviews: user.workerProfile?.ratingCount || 0,
            avatar: user.workerProfile?.profileImage
              || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=120&background=fef3c7&color=92400e&bold=true`,
            status: user.workerProfile?.isVerified ? "Verified" : "Pending",
            activeTasksCount: user.activeTasksCount || 0,
            price: user.workerProfile?.hourlyRate || 50,
            bio: user.workerProfile?.bio || '',
          }));
          
          setWorkers(formattedWorkers);
        }
      } catch (err) {
        console.error("Failed to fetch workers:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  const query = searchParams.get('q')?.toLowerCase() || '';
  const sort = searchParams.get('sort') || '';

  const filteredWorkers = workers.filter(worker => {
    const standardServices = ['electrical', 'painting', 'plumbing', 'flooring', 'appliance installation', 'hvac', 'carpentry', 'cleaning', 'gardening & landscaping', 'roofing'];

    const matchesService = selectedServiceId === 'all'
      ? true
      : selectedServiceId === 'other'
        ? !standardServices.includes(worker.serviceId.toLowerCase())
        : worker.serviceId === selectedServiceId.toLowerCase();

    const matchesSearchText = !query || 
      worker.name.toLowerCase().includes(query) || 
      worker.specialty.toLowerCase().includes(query) || 
      worker.bio.toLowerCase().includes(query);

    return matchesService && matchesSearchText;
  });

  const sortedWorkers = [...filteredWorkers].sort((a, b) => {
    if (sort === 'rating') {
      return b.rating - a.rating;
    } else if (sort === 'reviews') {
      return b.reviews - a.reviews;
    } else if (sort === 'price_low') {
      return a.price - b.price;
    } else if (sort === 'price_high') {
      return b.price - a.price;
    }
    return 0;
  });

  if (isLoading) {
    return (
      <div className='flex-1 p-10 flex justify-center items-center h-full'>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className='flex-1 p-10'>
      <div className='mb-8 flex justify-between items-end'>
        <div>
          <h2 className='text-3xl font-bold text-slate-800'>
            {selectedServiceId === 'all' ? 'All Professionals' : `${selectedServiceId.charAt(0).toUpperCase() + selectedServiceId.slice(1)} Experts`}
          </h2>
          <p className='text-slate-500'>Found {sortedWorkers.length} results</p>
        </div>
      </div>

      {sortedWorkers.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
           {sortedWorkers.map((worker) => (
             <Card key={worker.id} worker={worker} />
           ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-20 bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200'>
          <p className='text-xl text-zinc-400 font-medium'>No professionals found in this category yet.</p>
          <button 
            className='mt-4 text-amber-600 font-bold hover:underline'
            onClick={() => window.location.reload()}
          >
            Refresh List
          </button>
        </div>
      )}
    </div>
  )
}

export default CardLayout