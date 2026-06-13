import React from 'react';
import { Shield, Star } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: 'Verified Professionals',
      description: 'Every expert is thoroughly vetted and quality-checked before joining our platform.',
      icon: <Shield size={24} className="text-amber-500" />
    },
    {
      title: 'Satisfaction Guaranteed',
      description: 'Our top-rated workers maintain excellent ratings to stay on our network.',
      icon: <Star size={24} className="text-amber-500" />
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-mesh opacity-50 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-3">Why choose Fixr Premium</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Premium Service, <br className="hidden md:block"/>
            <span className="text-slate-500">Zero Headaches.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat, idx) => (
            <div 
              key={idx} 
              className="bg-white border-l-4 border-amber-500 p-8 shadow-sm rounded-r-2xl hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                {feat.icon}
                <h3 className="text-xl font-bold text-slate-800">{feat.title}</h3>
              </div>
              <p className="text-slate-500 leading-relaxed text-sm">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
