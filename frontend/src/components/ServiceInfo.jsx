import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const ServiceInfo = ({ selectedservice }) => {
  const navigate = useNavigate();
  
  if (!selectedservice) return null;

  return (
    <div className='w-full px-4 py-6 md:py-10 overflow-x-hidden'>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedservice.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1, zIndex: 50 }}
          exit={{ opacity: 0, scale: 0.95, zIndex: 10 }}
          transition={{ duration: 0.4 }}
          className='relative w-full max-w-5xl mx-auto min-w-0 min-h-0 md:min-h-[350px] md:h-[450px] md:max-h-none overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-amber-300 to-amber-400 shadow-xl flex flex-col md:flex-row md:items-center z-20 p-4 md:p-10 gap-4 md:gap-0'
        >
          <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl z-10" />

          <div className='relative z-40 p-4 md:p-8 w-full min-w-0 max-w-full md:max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 mx-0 mt-0 md:ml-0 md:mt-0'>
            <div className='inline-block px-3 py-1 mb-3 md:mb-4 text-xs font-bold tracking-widest text-amber-600 uppercase bg-amber-100 rounded-full'>
              Professional Service
            </div>
            <h1 className='text-2xl md:text-4xl text-slate-800 font-extrabold mb-3 md:mb-4 break-words'>
              {selectedservice.name}
            </h1>
            <p className='text-slate-600 leading-relaxed text-sm md:text-lg line-clamp-3 md:line-clamp-none'>
              {selectedservice.description}
            </p>
            <button 
              onClick={() => navigate(`/services?q=${encodeURIComponent(selectedservice.name)}`)}
               className="mt-4 md:mt-6 w-full md:w-auto px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-amber-200"
            >
              Book Specialist
            </button>
          </div>

          <div className='relative md:absolute md:right-0 w-full max-w-full md:w-1/2 h-56 md:h-full z-10 rounded-xl md:rounded-none overflow-hidden'>
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-amber-300 via-transparent to-transparent z-20" />
            <img 
              src={selectedservice.image} 
              alt={selectedservice.name} 
              className='w-full h-full object-cover'
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default ServiceInfo