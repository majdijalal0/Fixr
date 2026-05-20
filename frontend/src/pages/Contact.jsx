import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50">
      <section className="px-6 py-12 text-center lg:px-8 bg-gradient-mesh">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Get in <span className="text-amber-500">Touch</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-slate-600">
            Have questions about our services or need support? We're here to help. Reach out to us and we'll respond as soon as we can.
          </p>
        </motion.div>
      </section>

      <section className="px-6 mx-auto mt-8 max-w-7xl lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Contact Information</h2>
              <p className="text-slate-600 text-lg">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
               <div className="flex items-start gap-4 p-4 transition-all duration-300 bg-white shadow-sm rounded-2xl hover:shadow-md border border-slate-100">
                 <div className="p-3 bg-amber-50 rounded-xl">
                   <Phone className="w-6 h-6 text-amber-500" />
                 </div>
                 <div>
                   <h3 className="font-semibold text-slate-900 text-lg">Phone</h3>
                   <p className="mt-1 text-slate-600">+1 (555) 123-4567</p>
                   <p className="text-sm text-slate-400">Mon-Fri from 8am to 6pm</p>
                 </div>
               </div>

               <div className="flex items-start gap-4 p-4 transition-all duration-300 bg-white shadow-sm rounded-2xl hover:shadow-md border border-slate-100">
                 <div className="p-3 bg-amber-50 rounded-xl">
                   <Mail className="w-6 h-6 text-amber-500" />
                 </div>
                 <div>
                   <h3 className="font-semibold text-slate-900 text-lg">Email</h3>
                   <p className="mt-1 text-slate-600">support@fixrpremium.com</p>
                   <p className="text-sm text-slate-400">Online support 24/7</p>
                 </div>
               </div>

               <div className="flex items-start gap-4 p-4 transition-all duration-300 bg-white shadow-sm rounded-2xl hover:shadow-md border border-slate-100">
                 <div className="p-3 bg-amber-50 rounded-xl">
                   <MapPin className="w-6 h-6 text-amber-500" />
                 </div>
                 <div>
                   <h3 className="font-semibold text-slate-900 text-lg">Office</h3>
                   <p className="mt-1 text-slate-600">123 Innovation Drive</p>
                   <p className="text-sm text-slate-400">Tech City, TC 90210</p>
                 </div>
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="p-8 glass rounded-3xl border border-white/60 shadow-xl">
              <div className="mb-6 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-amber-500" />
                <h3 className="text-2xl font-bold text-slate-900">Send a Message</h3>
              </div>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">First Name</label>
                    <input type="text" id="firstName" className="input-styled" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">Last Name</label>
                    <input type="text" id="lastName" className="input-styled" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                  <input type="email" id="email" className="input-styled" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700">Subject</label>
                  <input type="text" id="subject" className="input-styled" placeholder="How can we help you?" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
                  <textarea id="message" rows={4} className="input-styled resize-none" placeholder="Your message here..."></textarea>
                </div>

                <button type="submit" className="w-full btn-primary gap-2">
                  Send Message
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
