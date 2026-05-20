import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const ServiceInfo = ({ selectedservice }) => {
  const navigate = useNavigate();
  
  if (!selectedservice) return null;

  return (
    <div className='flex justify-center w-full px-4 py-10'>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedservice.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1, zIndex: 50 }}
          exit={{ opacity: 0, scale: 0.95, zIndex: 10 }}
          transition={{ duration: 0.4 }}
          className='relative w-full max-w-5xl h-[450px] overflow-hidden rounded-3xl bg-gradient-to-br from-amber-300 to-amber-400 shadow-xl flex items-center z-20' 
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl z-10" />

          <div className='relative z-40 ml-10 p-8 w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20'>
            <div className='inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-amber-600 uppercase bg-amber-100 rounded-full'>
              Professional Service
            </div>
            <h1 className='text-4xl text-slate-800 font-extrabold mb-4'>
              {selectedservice.name}
            </h1>
            <p className='text-slate-600 leading-relaxed text-lg'>
              {selectedservice.description}
            </p>
            <button 
              onClick={() => navigate(`/services?q=${encodeURIComponent(selectedservice.name)}`)}
              className="mt-6 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-amber-200"
            >
              Book Specialist
            </button>
          </div>

          <div className='absolute right-0 w-3/5 h-full z-10'>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-300 via-transparent to-transparent z-20" />
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