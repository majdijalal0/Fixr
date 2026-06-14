import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Users, Wrench, CheckCircle, TrendingUp } from 'lucide-react';

const stats = [
  { id: 1, label: 'Happy Customers', value: '10,000+' },
  { id: 2, label: 'Verified Pros', value: '5,000+' },
  { id: 3, label: 'Cities Covered', value: '50+' },
  { id: 4, label: 'Years Experience', value: '10+' },
];

const values = [
  { 
    id: 1, 
    icon: Shield, 
    title: 'Trust & Safety', 
    desc: 'Every professional is rigorously background-checked and fully verified.' 
  },
  { 
    id: 2, 
    icon: Award, 
    title: 'Quality Guarantee', 
    desc: 'We ensure top-tier service quality for every job, big or small, backed by our promise.' 
  },
  { 
    id: 3, 
    icon: Users, 
    title: 'Community First', 
    desc: 'Building strong connections between neighbors and local experts to foster trust.' 
  },
  { 
    id: 4, 
    icon: Wrench, 
    title: 'Expert Skills', 
    desc: 'From plumbing to electrical, we have the right expert for your specific needs.' 
  },
];

const About = () => {
  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16 bg-slate-50">
      <section className="relative px-4 md:px-6 py-16 md:py-20 overflow-hidden lg:px-8 bg-gradient-mesh">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Building a Better Community, <span className="text-amber-500">One Job at a Time</span>.
            </h1>
            <p className="mt-6 text-base md:text-lg leading-8 text-slate-600">
              We connect homeowners with trusted, skilled professionals for all their home service needs. 
              Our platform makes it easy to find reliability when you need it most.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 md:px-6 py-10 md:py-12 mx-auto max-w-7xl lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 md:p-6 text-center transition-all duration-300 glass rounded-2xl hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="text-2xl md:text-4xl font-bold text-amber-500">{stat.value}</div>
              <div className="mt-2 text-xs md:text-sm font-medium text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-6 py-12 md:py-16 mx-auto max-w-7xl lg:px-8">
        <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 sm:text-4xl">Our Mission</h2>
            <p className="mt-6 text-base md:text-lg leading-8 text-slate-600">
              Our mission is to simplify home maintenance by providing a seamless, secure, and reliable platform 
              where homeowners can easily discover and hire top-rated local professionals.
            </p>
            <ul className="mt-6 md:mt-8 space-y-4">
              {['Empower local skilled workers', 'Provide transparent pricing', 'Ensure 100% satisfaction'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 md:w-6 h-5 md:h-6 text-amber-500" />
                  <span className="text-sm md:text-base font-medium text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-amber-200 rounded-3xl blur-3xl opacity-30"></div>
            <div className="p-6 md:p-8 relative glass rounded-3xl border border-white/50">
               <div className="flex items-center gap-4 mb-6">
                 <div className="p-3 bg-amber-100 rounded-xl">
                   <TrendingUp className="w-6 md:w-8 h-6 md:h-8 text-amber-600" />
                 </div>
                 <div>
                   <h3 className="text-lg md:text-xl font-bold text-slate-900">Continuous Growth</h3>
                   <p className="text-slate-500 text-sm md:text-base">Expanding our reach daily</p>
                 </div>
               </div>
               <p className="text-slate-600 leading-relaxed text-base md:text-lg italic">
                 "We've built this platform on the foundation of trust. Every feature, every professional, and every connection is designed to make your life easier and your home better."
               </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 md:px-6 py-12 md:py-16 mx-auto max-w-7xl lg:px-8">
        <div className="mb-10 md:mb-12 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 sm:text-4xl">Why Choose Us</h2>
          <p className="mt-4 text-base md:text-lg text-slate-600">The core values that drive everything we do.</p>
        </div>
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 md:p-8 transition-all duration-300 bg-white border shadow-sm border-slate-100 rounded-2xl hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-10 md:w-12 h-10 md:h-12 flex items-center justify-center bg-amber-50 rounded-xl mb-6">
                  <Icon className="w-5 md:w-6 h-5 md:h-6 text-amber-500" />
                </div>
                <h3 className="mb-3 text-lg md:text-xl font-bold text-slate-900">{value.title}</h3>
                <p className="text-sm md:text-base leading-relaxed text-slate-600">{value.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  );
};

export default About;
