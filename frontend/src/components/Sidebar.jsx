import React from 'react';
import { X } from 'lucide-react';
import services from '../assets/services.js';

const Sidebar = ({selectedServiceId, setSelectedServiceId, onClose}) => {

    return (
        <aside className='lg:sticky lg:top-5 flex flex-col lg:h-[calc(100vh-60px)] w-full lg:w-64 bg-white lg:border-r border-zinc-200 p-4 shadow-sm overflow-y-auto scrollbar-thin scrollbar-thumb-amber-200'>
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider px-4">
                  Categories
              </h2>
              {onClose && (
                <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-600">
                  <X size={20} />
                </button>
              )}
            </div>
            
            <h2 className="hidden lg:block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-6 px-4">
                Categories
            </h2>

            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                <button 
                    onClick={() => setSelectedServiceId('all')} 
                    className={`group relative flex items-center px-4 py-3 rounded-xl transition-all duration-200 font-semibold whitespace-nowrap lg:whitespace-normal shrink-0
                    ${selectedServiceId === 'all' 
                        ? 'bg-amber-50 text-amber-700 font-bold' 
                        : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}
                >
                    {selectedServiceId === 'all' && (
                        <div className="hidden lg:block absolute left-0 w-1.5 h-6 bg-amber-500 rounded-r-full" />
                    )}
                    All Services
                </button>

                {services.map((serv) => (
                    <button 
                        key={serv.id} 
                        onClick={() => setSelectedServiceId(serv.name.toLowerCase())} 
                        className={`group relative flex items-center px-4 py-3 rounded-xl transition-all duration-200 text-left font-semibold whitespace-nowrap lg:whitespace-normal shrink-0
                        ${selectedServiceId === serv.name.toLowerCase()
                            ? 'bg-amber-50 text-amber-700 font-bold' 
                            : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}
                    >
                        {selectedServiceId === serv.name.toLowerCase() && (
                            <div className="hidden lg:block absolute left-0 w-1.5 h-6 bg-amber-500 rounded-r-full" />
                        )}
                        <span className="leading-tight">{serv.name}</span>
                    </button>
                ))}

                <button 
                    onClick={() => setSelectedServiceId('other')} 
                    className={`group relative flex items-center px-4 py-3 rounded-xl transition-all duration-200 text-left font-semibold whitespace-nowrap lg:whitespace-normal shrink-0
                    ${selectedServiceId === 'other' 
                        ? 'bg-amber-50 text-amber-700 font-bold' 
                        : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}
                >
                    {selectedServiceId === 'other' && (
                        <div className="hidden lg:block absolute left-0 w-1.5 h-6 bg-amber-500 rounded-r-full" />
                    )}
                    <span className="leading-tight">Other Services</span>
                </button>
            </nav>
        </aside>
    );
}

export default Sidebar;
