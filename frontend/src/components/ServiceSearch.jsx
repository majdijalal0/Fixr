import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react'; 

const ServiceSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setLocalSearchTerm(q);
    else setLocalSearchTerm('');
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearchTerm.trim()) {
      searchParams.set('q', localSearchTerm.trim());
    } else {
      searchParams.delete('q');
    }
    setSearchParams(searchParams);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value) {
      searchParams.set('sort', value);
    } else {
      searchParams.delete('sort');
    }
    setSearchParams(searchParams);
  };

  return (
    <div className='bg-gradient-to-br from-yellow-400 to-amber-500 rounded-b-[2rem] md:rounded-b-[3rem] shadow-2xl px-4 md:px-10 pt-8 md:pt-10 pb-20 md:pb-16 relative mb-36 md:mb-12'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-2 tracking-tight'>
          Find your specialist
        </h1>
        <p className='text-base md:text-lg lg:text-xl text-slate-800/80 mb-8 md:mb-8 font-medium'>
          Over 2,000 verified professionals ready to help. Find standard trades or search for any custom trade.
        </p>
 
        <form onSubmit={handleSearchSubmit} className='flex flex-col md:flex-row items-center gap-4 bg-white p-3 md:p-3 rounded-2xl shadow-xl border border-white/20 absolute left-4 right-4 md:left-10 md:right-10 -bottom-20 md:-bottom-8 max-w-6xl mx-auto'>
          
          <div className='relative flex-1 w-full'>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input 
              type='text' 
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              placeholder='Try "Plumbing", "Carpentry" or any custom trade...' 
              className='w-full pl-12 pr-4 py-3 md:py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all text-sm md:text-base text-slate-700 placeholder:text-sm'
            />
          </div>

          <div className='hidden md:block w-px h-10 bg-slate-200'></div>

          <div className='relative w-full md:w-64'>
            <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
            <select 
              value={searchParams.get('sort') || ''}
              onChange={handleSortChange}
              className='w-full pl-10 pr-4 py-3 md:py-4 bg-slate-50 border-none rounded-xl appearance-none focus:ring-2 focus:ring-amber-500 outline-none text-sm md:text-base text-slate-600 font-medium cursor-pointer'
            >
              <option value="">Sort by: Featured</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>

          <button type="submit" className='w-full md:w-auto px-8 py-3 md:py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 text-sm md:text-base'>
            Search
          </button>
        </form>
      </div>
    </div>
  )
}

export default ServiceSearch
