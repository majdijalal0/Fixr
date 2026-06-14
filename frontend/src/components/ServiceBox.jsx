import React from 'react'
import * as Icons from 'lucide-react'; 

const ServiceBox = ({ service, onClick, isSelected }) => {

  const LucideIcon = Icons[service.icon] || Icons.Wrench; 

  return (
    <div className="relative group w-full">
      <button
        onClick={onClick}
        className={`
          relative flex flex-col items-center justify-center w-full
          h-28 md:h-36 rounded-[min(1.5rem,15%)] p-3 md:p-4
          transition-all duration-300 ease-out
          transform hover:-translate-y-2
          cursor-pointer
          ${isSelected 
            ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-xl shadow-amber-300/50 ring-4 ring-amber-400/30' 
            : 'glass text-slate-700 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-100'
          }
        `}
      >
        <div className={`
          mb-3 p-3 rounded-xl transition-colors duration-300
          ${isSelected ? 'bg-white/20' : 'bg-slate-50 group-hover:bg-amber-50'}
        `}>
          <LucideIcon 
            size={32} 
            strokeWidth={2} 
            className={isSelected ? 'text-white' : 'text-amber-500'} 
          />
        </div>

        <p className={`
          text-[15px] font-bold text-center leading-tight
          ${isSelected ? 'text-white' : 'text-slate-800'}
        `}>
          {service.name}
        </p>

        {isSelected && (
          <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full animate-pulse shadow-sm" />
        )}
      </button>
    </div>
  )
}

export default ServiceBox