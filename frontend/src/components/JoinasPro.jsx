import React, { useState } from 'react';
import { Briefcase, TrendingUp, ShieldCheck, Clock, ShieldAlert, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {Link} from 'react-router-dom'
const JoinAsPro = () => {
  const [warningType, setWarningType] = useState(null);

  const handleApplyClick = (e) => {
    const token = localStorage.getItem('token');
    if (!token) {
      e.preventDefault();
      setWarningType('auth');
      return;
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user && user.role === 'worker') {
          e.preventDefault();
          setWarningType('worker');
        }
      } catch (err) {
        console.error('Error parsing user data:', err);
      }
    }
  };

  return (
    <section id='joinaspro' className="py-16 md:py-20 bg-slate-900 rounded-[2rem] md:rounded-[3rem] mx-4 my-16 md:my-20 overflow-hidden relative scroll-mt-24">
      <AnimatePresence>
        {warningType && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-md bg-slate-950/90 border border-white/10 backdrop-blur-md px-4 md:px-6 py-4 rounded-2xl shadow-2xl shadow-amber-500/5 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="bg-amber-500/10 p-2 rounded-xl text-amber-500 shrink-0">
                <ShieldAlert size={20} className="animate-pulse" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">
                  {warningType === 'auth' ? 'Authentication Required' : 'Already a Professional'}
                </h4>
                <p className="text-slate-300 text-xs mt-0.5 leading-relaxed">
                  {warningType === 'auth' 
                    ? 'Please log in or register via the button at the top to apply as a Pro.'
                    : 'You are already registered as a professional worker. Access to the application form is restricted.'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setWarningType(null)}
              className="text-slate-400 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-all"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full -mr-40 -mt-40 pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center"
      >
        <div className="relative z-10">
          <h2 className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-4">Work on your terms</h2>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            Earn money doing what <br />
            <span className="text-amber-500">you do best.</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg mb-8 md:mb-10 leading-relaxed">
            Join thousands of skilled professionals. Set your own hours, choose your own price, and grow your business with our steady stream of local leads.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
            <div className="flex items-center gap-4">
              <div className="bg-amber-500/20 p-2 rounded-lg text-amber-500">
                <TrendingUp size={20}/>
              </div>
              <span className="text-slate-200 font-medium">Higher Earnings</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-amber-500/20 p-2 rounded-lg text-amber-500">
                <Clock size={20}/>
              </div>
              <span className="text-slate-200 font-medium">Flexible Schedule</span>
            </div>
          </div>

          <Link 
            to='/WorkerForm' 
            onClick={handleApplyClick}
            className="w-full md:w-auto text-center block px-8 md:px-10 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-black rounded-2xl transition-all shadow-xl shadow-amber-500/20 active:scale-95"
          >
            Apply to be a Pro
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
          <div className="p-5 md:p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl flex flex-col justify-between">
            <div>
              <ShieldCheck className="text-amber-500 mb-4" size={28} />
              <h3 className="text-white font-bold text-lg md:text-xl mb-2">Verified Trust</h3>
              <p className="text-slate-400 text-sm">We verify all customers to ensure your safety and reliable payments.</p>
            </div>
          </div>
          <div className="p-5 md:p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl flex flex-col justify-between">
            <div>
              <Briefcase className="text-amber-500 mb-4" size={28} />
              <h3 className="text-white font-bold text-lg md:text-xl mb-2">Grow Fast</h3>
              <p className="text-slate-400 text-sm">Get access to high-paying jobs in your local area instantly.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default JoinAsPro;
