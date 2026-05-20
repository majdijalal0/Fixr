import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { X, User, Mail, Phone, Lock } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Signup = ({ onClose, setView }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccessMsg('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          setView('login');
        }, 2000);
      } else {
        setErrorMsg(data.message || 'Error creating account.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Server error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const modalContent = (
    <div className='fixed inset-0 z-[1000] flex items-center justify-center p-4 overflow-y-auto'>
      <div 
        className='fixed inset-0 bg-slate-900/60 backdrop-blur-sm' 
        onClick={() => onClose(false)}
      ></div>

      <div className='relative z-[1001] w-full max-w-lg transform overflow-hidden rounded-3xl glass p-8 shadow-2xl transition-all my-8 animate-scale-in'>
        
        <button 
          onClick={() => onClose(false)}
          className="absolute right-6 top-6 text-slate-400 hover:text-slate-800 transition-colors bg-white/50 hover:bg-white rounded-full p-1"
        >
          <X size={20} />
        </button>

        <div className='text-center mb-6'>
          <h2 className='text-3xl font-black text-slate-900'>Create <span className="text-amber-500">Account</span></h2>
          <p className='text-slate-500 mt-1 font-medium'>Join our community of skilled professionals and homeowners</p>
        </div>

        <form className='space-y-4' onSubmit={handleSignup}>
          
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-200 text-center">
              {errorMsg}
            </div>
          )}
          
          {successMsg && (
            <div className="p-3 bg-green-50 text-green-600 text-sm font-bold rounded-xl border border-green-200 text-center">
              {successMsg}
            </div>
          )}

          <div>
            <label className='block text-xs font-bold text-slate-700 mb-1 ml-1 uppercase tracking-wider'>Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" size={16} />
              <input 
                type='text' 
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Full Name' 
                className='input-styled pl-11 py-2.5' 
              />
            </div>
          </div>

          <div>
            <label className='block text-xs font-bold text-slate-700 mb-1 ml-1 uppercase tracking-wider'>Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" size={16} />
              <input 
                type='email' 
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='name@email.com' 
                className='input-styled pl-11 py-2.5' 
              />
            </div>
          </div>

          <div>
            <label className='block text-xs font-bold text-slate-700 mb-1 ml-1 uppercase tracking-wider'>Phone Number (Optional)</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" size={16} />
              <input 
                type='text' 
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                placeholder='+212...' 
                className='input-styled pl-11 py-2.5' 
              />
            </div>
          </div>

          <div>
            <label className='block text-xs font-bold text-slate-700 mb-1 ml-1 uppercase tracking-wider'>Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" size={16} />
              <input 
                type='password' 
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='••••••••' 
                className='input-styled pl-11 py-2.5' 
              />
            </div>
          </div>

          <div>
            <label className='block text-xs font-bold text-slate-700 mb-1 ml-1 uppercase tracking-wider'>Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" size={16} />
              <input 
                type='password' 
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='••••••••' 
                className='input-styled pl-11 py-2.5' 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full mt-4 btn-primary py-4 text-lg transition-all
              ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
            `}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className='mt-6 text-center border-t border-slate-100 pt-6'>
          <p className='text-slate-600 text-sm'>
            Already have an account?{' '}
            <button 
              onClick={() => setView('login')} 
              className='font-bold text-amber-600 hover:text-amber-700 underline underline-offset-4'
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default Signup;