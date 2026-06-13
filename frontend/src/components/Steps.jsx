import React from 'react'
import service from '../assets/icons/fixicon.svg'
import handyicon from '../assets/icons/handymanicon.png'
import call from '../assets/icons/callicon.png'
import rating from '../assets/icons/rating.png'

const Steps = () => {
  const stepsData = [
    {
      img: service,
      title: "Explore Services",
      desc: "Browse our wide variety of home maintenance categories.",
      number: "01"
    },
    {
      img: handyicon,
      title: "Select a Pro",
      desc: "Choose the perfect expert that fits your specific needs.",
      number: "02"
    },
    {
      img: call,
      title: "Get in Touch",
      desc: "Directly contact your worker to discuss the details.",
      number: "03"
    },
    {
      img: rating,
      title: "Leave a Review",
      desc: "Share your experience to help the community grow.",
      number: "04"
    }
  ];

  return (
    <section className='py-20 px-6 max-w-7xl mx-auto'>
      <div className='flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4'>
        <div>
          <h2 className='text-amber-500 font-bold uppercase tracking-widest text-sm mb-2'>Process</h2>
          <h1 className='text-4xl md:text-5xl font-extrabold text-slate-900'>
            How it <span className='text-amber-500'>works</span>
          </h1>
        </div>
        <p className='text-slate-500 max-w-md text-lg'>
          Getting your home projects done is easier than ever. Book a trusted professional in minutes.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
        {stepsData.map((step, index) => (
          <div 
            key={index}
            className='group relative flex flex-col items-center text-center p-8 bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 hover:shadow-amber-200/60 transition-all duration-500 hover:-translate-y-2'
          >
            <div className='absolute -top-4 -right-4 w-12 h-12 bg-amber-400 text-white flex items-center justify-center rounded-2xl font-black shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform'>
              {step.number}
            </div>

            <div className='mb-6 p-4 bg-amber-50 rounded-2xl group-hover:bg-amber-100 transition-colors'>
              <img src={step.img} alt={step.title} className='w-16 h-16 object-contain' />
            </div>

            <h2 className='text-xl font-bold text-slate-800 mb-3'>{step.title}</h2>
            <p className='text-slate-500 text-sm leading-relaxed'>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Steps