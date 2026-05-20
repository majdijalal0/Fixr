import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ worker }) => {
  return (
    <div className="max-w-sm overflow-hidden rounded-2xl bg-white shadow-lg border border-zinc-100 transition-all hover:shadow-xl">
      <div className="flex items-center gap-4 p-6">
        <img 
          src={worker.avatar} 
          alt={worker.name} 
          className="h-14 w-14 rounded-full object-cover ring-2 ring-zinc-50"  
        />
        <div>
          <h1 className="text-lg font-bold text-zinc-900">{worker.name}</h1>
          <p className="text-sm font-medium text-blue-600">{worker.specialty}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-y border-zinc-50 bg-zinc-50/50 px-6 py-3">
        <div className="flex items-center gap-1">
          <span className="text-yellow-500 text-sm">★</span>
          <span className="text-sm font-bold text-zinc-700">{worker.rating}</span>
          <span className="text-xs text-zinc-400">({worker.reviews})</span>
        </div>
        <div className="text-sm font-semibold text-zinc-900">
          {worker.price}$
        </div>
      </div>

      <div className="flex items-center justify-between p-6">
        <div className="flex flex-col gap-1">
          <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
            worker.activeTasksCount === 0 ? 'text-emerald-500' : 'text-amber-500'
          }`}>
            <span className={`h-2 w-2 rounded-full ${worker.activeTasksCount === 0 ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
            {worker.activeTasksCount === 0 ? 'Available' : 'On Job'}
          </span>
          {worker.status === 'Verified' && (
            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 w-fit">
              VERIFIED
            </span>
          )}
        </div>
        <Link
          to={`/workers/${worker.id}`}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500 transition-colors"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default Card;