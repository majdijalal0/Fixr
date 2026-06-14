import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import home_bg from '../assets/handyman1.jpg';
import { Search } from 'lucide-react'; 

const HomeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/services?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/services');
    }
  };

  return (
    <section className='relative h-[500px] md:h-[650px] w-full flex items-center overflow-hidden'>
      <img 
        className='absolute inset-0 w-full h-full object-cover scale-105 transform animate-[pulse-soft_10s_ease-in-out_infinite_alternate]' 
        src={home_bg} 
        alt="Fixr specialist at work" 
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>

      <div className='relative z-10 container mx-auto px-4 md:px-20'>
        <div className='max-w-3xl'>
          <h1 className='text-white text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 animate-fade-in-up'>
            Need to fix <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300 drop-shadow-sm">something?</span>
          </h1>
          
          <p className='text-slate-300 text-lg md:text-xl lg:text-2xl font-medium mb-6 md:mb-10 max-w-xl leading-relaxed animate-fade-in-up stagger-1'>
            Our skilled professionals cover standard trades and custom requests. Reliable, verified, and ready to help.
          </p>

          <form onSubmit={handleSearch} className="flex flex-col md:flex-row w-full max-w-2xl glass rounded-2xl md:rounded-full p-2.5 transition-all focus-within:ring-4 focus-within:ring-amber-400/30 focus-within:bg-white/95 animate-fade-in-up stagger-2">
            <div className='flex items-center px-4 py-2 md:py-0 text-slate-500'>
               <Search size={26} strokeWidth={2.5} />
            </div>
            <input 
              type='text' 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="What do you need help with? (e.g. electrical, carpentry, custom trade)" 
              className="grow px-3 py-3 md:py-4 outline-none text-slate-800 text-base md:text-lg font-medium placeholder:text-slate-400 bg-transparent" 
            />
            <button type="submit" className="w-full md:w-auto btn-primary px-8 rounded-xl md:rounded-full text-base md:text-lg ml-0 md:ml-2 mt-2 md:mt-0">
              Find Expert
            </button>
          </form>

          <div className='mt-6 md:mt-10 flex flex-wrap gap-4 md:gap-8 text-slate-300 text-sm font-semibold animate-fade-in-up stagger-3'>
             <div className='flex items-center gap-3 bg-slate-800/50 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700/50'>
                <div className='relative flex h-3 w-3'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-3 w-3 bg-emerald-500'></span>
                </div>
                <span className="tracking-wide">500+ Experts Online</span>
             </div>
             <div className='flex items-center gap-3 bg-slate-800/50 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700/50'>
                <div className='w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.6)]'></div>
                <span className="tracking-wide">Verified Reviews</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeSearch;
