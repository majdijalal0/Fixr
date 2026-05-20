import React from 'react';
import services from '../assets/services.js';

const Sidebar = ({selectedServiceId, setSelectedServiceId}) => {

    return (
        <aside className='sticky top-5 flex flex-col h-[calc(100vh-60px)] w-64 bg-white border-r border-zinc-200 p-4 shadow-sm overflow-y-auto scrollbar-thin scrollbar-thumb-amber-200'>
            
            <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-6 px-4">
                Categories
            </h2>

            <nav className="flex flex-col gap-2">
                <button 
                    onClick={() => setSelectedServiceId('all')} 
                    className={`group relative flex items-center px-4 py-3 rounded-xl transition-all duration-200 font-semibold
                    ${selectedServiceId === 'all' 
                        ? 'bg-amber-50 text-amber-700 font-bold' 
                        : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}
                >
                    {selectedServiceId === 'all' && (
                        <div className="absolute left-0 w-1.5 h-6 bg-amber-500 rounded-r-full" />
                    )}
                    All Services
                </button>

                {services.map((serv) => (
                    <button 
                        key={serv.id} 
                        onClick={() => setSelectedServiceId(serv.name.toLowerCase())} 
                        className={`group relative flex items-center px-4 py-3 rounded-xl transition-all duration-200 text-left font-semibold
                        ${selectedServiceId === serv.name.toLowerCase()
                            ? 'bg-amber-50 text-amber-700 font-bold' 
                            : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}
                    >
                        {selectedServiceId === serv.name.toLowerCase() && (
                            <div className="absolute left-0 w-1.5 h-6 bg-amber-500 rounded-r-full" />
                        )}
                        <span className="leading-tight">{serv.name}</span>
                    </button>
                ))}

                <button 
                    onClick={() => setSelectedServiceId('other')} 
                    className={`group relative flex items-center px-4 py-3 rounded-xl transition-all duration-200 text-left font-semibold
                    ${selectedServiceId === 'other' 
                        ? 'bg-amber-50 text-amber-700 font-bold' 
                        : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}
                >
                    {selectedServiceId === 'other' && (
                        <div className="absolute left-0 w-1.5 h-6 bg-amber-500 rounded-r-full" />
                    )}
                    <span className="leading-tight">Other Services</span>
                </button>
            </nav>
        </aside>
    );
}

export default Sidebar;
