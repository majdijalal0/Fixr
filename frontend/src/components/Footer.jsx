import React from 'react'
import logo from '../assets/icons/logo.png'

const Footer = () => {
  return (
    <footer className="relative bg-slate-900 border-t border-slate-800 text-slate-300 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
      
      <div className="px-4 pt-12 md:pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 relative z-10">
        <div className="grid gap-8 md:gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          
          <div className="sm:col-span-2">
            <a href="/" className="inline-flex items-center group">
              <div className="p-2 bg-white rounded-xl shadow-lg transition-transform group-hover:scale-105 group-hover:rotate-3">
                <img src={logo} alt="logo" className="h-6 md:h-8 w-auto" />
              </div>
              <span className="ml-3 text-xl md:text-2xl font-black tracking-tight text-white uppercase">
                Fixr<span className="text-amber-400"> Premium</span>
              </span>
            </a>
            <div className="mt-4 md:mt-6 lg:max-w-sm">
              <p className="text-sm text-slate-400 leading-relaxed">
                Connecting homeowners with the finest local professionals. From leaky faucets to full renovations, find the expertise you need to keep your home in perfect shape.
              </p>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4 text-sm">
            <p className="text-base font-bold tracking-wide text-white">Get in Touch</p>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-200">Phone:</span>
              <a href="tel:850-123-5021" className="transition-colors duration-300 text-amber-400 hover:text-amber-300">850-123-5021</a>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-200">Email:</span>
              <a href="mailto:support@fixrpremium.com" className="transition-colors duration-300 text-amber-400 hover:text-amber-300">support@fixrpremium.com</a>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-semibold text-slate-200">Office:</span>
              <span className="text-slate-400">312 Lovely Street, NY 10012</span>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <p className="text-base font-bold tracking-wide text-white">Follow Our Work</p>
            <div className="flex items-center space-x-4">
              <a href="/" className="p-2 transition-all duration-300 bg-slate-800 rounded-lg text-slate-400 hover:bg-amber-400 hover:text-slate-900 hover:-translate-y-1 shadow-md">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="/" className="p-2 transition-all duration-300 bg-slate-800 rounded-lg text-slate-400 hover:bg-amber-400 hover:text-slate-900 hover:-translate-y-1 shadow-md">
                <svg viewBox="0 0 30 30" fill="currentColor" className="h-5"><circle cx="15" cy="15" r="4"></circle><path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z"></path></svg>
              </a>
            </div>
            <p className="text-xs text-slate-500">
              Subscribe for home maintenance tips and seasonal discounts.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse justify-between pt-6 md:pt-8 pb-8 md:pb-10 border-t border-slate-800 lg:flex-row">
          <p className="text-xs md:text-sm text-slate-500 font-medium text-center lg:text-left mt-4 lg:mt-0">
            © {new Date().getFullYear()} Fixr Premium Services Inc. All rights reserved.
          </p>
          <ul className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8">
            <li>
              <a href="/" className="text-xs md:text-sm text-slate-400 transition-colors duration-300 hover:text-amber-400">F.A.Q</a>
            </li>
            <li>
              <a href="/" className="text-xs md:text-sm text-slate-400 transition-colors duration-300 hover:text-amber-400">Privacy Policy</a>
            </li>
            <li>
              <a href="/" className="text-xs md:text-sm text-slate-400 transition-colors duration-300 hover:text-amber-400">Terms of Service</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
