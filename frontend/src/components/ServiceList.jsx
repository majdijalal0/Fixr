import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ServiceBox from './ServiceBox.jsx';
import ServiceInfo from './ServiceInfo.jsx';
import services from '../assets/services.js';

const ServiceList = () => {
  const [selectedService, setSelectedService] = useState(services[0]);
  const carouselRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState({ left: false, right: true });

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setScrollPosition({
        left: scrollLeft > 5,
        right: scrollLeft + clientWidth < scrollWidth - 5
      });
    }
  };

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.65;
      carouselRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      handleScroll();
      window.addEventListener('resize', handleScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section className='w-full min-w-0 py-6 md:py-20 px-4 md:px-6 max-w-7xl mx-auto overflow-x-hidden'>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className='text-center mb-10 md:mb-12'>
        <h2 className='text-amber-500 font-bold uppercase tracking-widest text-sm mb-3'>What We Offer</h2>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900'>
          Popular <span className='text-amber-500'>Services</span>
        </h1>
        <p className='mt-4 text-slate-500 max-w-2xl mx-auto text-base md:text-lg'>
          Explore our top-rated services designed to keep your home in perfect condition.
        </p>
      </div>
      
      <div className='w-full overflow-hidden'>
        <div className="relative w-full max-w-6xl mx-auto mb-10 md:mb-12 px-2 group/carousel">
          {scrollPosition.left && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-2 md:left-[-16px] top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 bg-white/95 backdrop-blur-md hover:bg-amber-500 hover:text-slate-900 border border-slate-100 rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 text-slate-700 cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {scrollPosition.right && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-2 md:right-[-16px] top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 bg-white/95 backdrop-blur-md hover:bg-amber-500 hover:text-slate-900 border border-slate-100 rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 text-slate-700 cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          )}

          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide py-4 px-2 scroll-smooth scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' ,width: '100%', maxWidth: '100%' }}
          >
            {services.map((serv) => (
              <div 
                key={serv.id} 
                className="flex-none transition-transform duration-300 hover:scale-105"
                style={{ width: '140px', minWidth: '140px' }}
              >
                <ServiceBox 
                  onClick={() => setSelectedService(serv)} 
                  isSelected={selectedService?.id === serv.id} 
                  service={serv} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ServiceInfo selectedservice={selectedService} />
    </section>
  );
};

export default ServiceList;