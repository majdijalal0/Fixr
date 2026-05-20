import React from 'react';
import { X, Mail, Lock } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Login = ({ onClose, setView }) => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const handleChange = (e) => {
  const { name, value } = e.target;
  
  setCredentials({
    ...credentials, 
    [name]: value   
  });
};
  const handleLogin = async(e)=>{
    e.preventDefault()
    try{
      const response = await fetch(`${API_URL}/api/auth/login` , {
        method : 'POST',
        headers : {'Content-Type':'application/json'},
        body : JSON.stringify(credentials)
      })

      const data = await response.json();

      if(response.ok){
        localStorage.setItem('token',data.token);
        localStorage.setItem('user',JSON.stringify({
          id: data.id,
          name: data.name,
          role: data.role
        }));
        onClose();
        navigate('/profile');      
      }else{
        console.error("Backend Error Details:", data); 
        alert(`Login failed: ${data.message || "Unknown error"}`);
      }
    }catch(err){
      console.log(err.message)
    }
  }
  return (
    <div className='fixed inset-0 z-[2000] flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
      <div 
        className='fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity' 
        onClick={onClose}
      ></div>

      <div className='relative z-[2001] w-full max-w-md transform overflow-hidden rounded-3xl glass p-8 shadow-2xl transition-all animate-scale-in'>
        
        <button 
          onClick={() => onClose(false)}
          className="absolute right-6 top-6 text-slate-400 hover:text-slate-800 transition-colors bg-white/50 hover:bg-white rounded-full p-1"
        >
          <X size={20} />
        </button>

        <div className='text-center mb-8'>
          <h2 className='text-3xl font-black text-slate-900'>Welcome <span className="text-amber-500">Back</span></h2>
          <p className='text-slate-500 mt-2 font-medium'>Login to manage your bookings</p>
        </div>

        <form className='space-y-5' onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className='block text-sm font-bold text-slate-700 mb-2 ml-1'>Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" size={18} />
              <input 
                type='email' 
                name='email'
                placeholder='name@example.com' 
                className='input-styled pl-12' 
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-bold text-slate-700 mb-2 ml-1'>Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" size={18} />
              <input 
                type='password' 
                name='password'
                placeholder='••••••••' 
                className='input-styled pl-12'
                value={credentials.password}
                onChange={handleChange} 
              />
            </div>
            <div className="flex justify-end mt-2">
              <button className="text-xs font-bold text-amber-600 hover:text-amber-700">Forgot Password?</button>
            </div>
          </div>

          <div className='pt-2'>
            <button onClick={handleLogin} className='w-full btn-primary py-4 text-lg'>
              Sign In
            </button>
          </div>
        </form>

        <div className='mt-8 text-center'>
          <p className='text-slate-600 text-sm'>
            Don't have an account?{' '}
            <button 
              onClick={() => setView('signup')} 
              className='font-bold text-amber-600 hover:underline'
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;