import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import brandIcon from '../assets/icons/logo.png';
import Account from './Account';
import { HashLink } from 'react-router-hash-link';
import { LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation(); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
    <nav className="sticky top-0 z-[100] flex items-center justify-between px-8 py-3 glass bg-white/80">
      <Link to="/" className="flex items-center gap-2 group transition-transform hover:scale-105">
        <div className="p-1.5 bg-white border border-slate-100 rounded-xl shadow-sm transition-transform group-hover:rotate-3">
          <img 
            src={brandIcon} 
            alt="Fixr Logo" 
            className="h-6 w-auto" 
          />
        </div>
        <span className="text-xl font-black tracking-wider text-slate-900 uppercase">
          fixr<span className="text-amber-500">.</span>
        </span>
      </Link>

      <div className="hidden md:block">
        <ul className="flex items-center space-x-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                to={link.path} 
                className={`group relative py-2 text-[15px] font-semibold tracking-wide transition-colors duration-300 hover:text-amber-500
                  ${location.pathname === link.path ? 'text-amber-500' : 'text-slate-700'}`}
              >
                {link.name}
                <span className={`absolute -bottom-1.5 left-0 h-[3px] rounded-full bg-amber-500 transition-all duration-300 
                  ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} 
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

        <div className="flex items-center space-x-6">
          {(!user || user.role !== 'worker') && (
            <HashLink 
              smooth 
              to="/#joinaspro"
              className="hidden lg:block text-[15px] font-semibold text-slate-700 transition-colors duration-300 hover:text-amber-500"
            >
              Become a Pro
            </HashLink>
          )}

        {user ? (
          <div className="flex items-center space-x-3">
            <Link
              to="/profile"
              className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 text-[15px] font-semibold rounded-xl transition-all duration-300
                ${
                  location.pathname === '/profile'
                    ? 'bg-amber-100 text-amber-700'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-amber-600'
                }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <button 
              onClick={handleLogout} 
              className="btn-primary !bg-red-500 hover:!bg-red-600 !text-white !border-none !shadow-red-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsOpen(true)} 
            className="btn-primary"
          >
            Login
          </button>
        )}
      </div>
    </nav>
    <Account isOpen={isOpen} setIsOpen={setIsOpen} /> 

  </>
);
};

export default Navbar;