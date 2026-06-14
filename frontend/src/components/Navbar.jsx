import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import brandIcon from '../assets/icons/logo.png';
import Account from './Account';
import { HashLink } from 'react-router-hash-link';
import { LayoutDashboard, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation(); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]); 

  useEffect(() => {
    setMobileMenuOpen(false);
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
    <nav className="sticky top-0 z-[100] flex items-center justify-between px-4 md:px-8 py-3 glass bg-white/80 relative">
      <Link to="/" className="flex items-center gap-2 group transition-transform hover:scale-105 shrink-0">
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

      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 text-slate-700 hover:text-amber-500 transition-colors"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

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

      <div className="hidden md:flex items-center space-x-6">
        {(!user || user.role !== 'worker') && (
          <HashLink 
            smooth 
            to="/#joinaspro"
            className="text-[15px] font-semibold text-slate-700 transition-colors duration-300 hover:text-amber-500"
          >
            Become a Pro
          </HashLink>
        )}

        {user ? (
          <div className="flex items-center space-x-3">
            <Link
              to="/profile"
              className={`inline-flex items-center gap-2 px-4 py-2 text-[15px] font-semibold rounded-xl transition-all duration-300
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
              className="bg-white border border-slate-900 text-slate-900 text-sm px-4 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
            >
              Log out
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

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white md:hidden border-t border-slate-100 shadow-lg overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 px-4 rounded-xl font-semibold transition-colors ${
                  location.pathname === link.path
                    ? 'bg-amber-50 text-amber-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {(!user || user.role !== 'worker') && (
              <HashLink
                smooth
                to="/#joinaspro"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-4 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Become a Pro
              </HashLink>
            )}
          </div>
          <div className="px-4 py-4 border-t border-slate-100 space-y-3">
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-50 text-amber-700 font-semibold rounded-xl transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="w-full bg-white border border-slate-900 text-slate-900 text-sm px-4 py-3 rounded-md hover:bg-slate-100 transition-colors font-semibold"
                >
                  Log out
                </button>
              </>
            ) : (
              <button
                onClick={() => { setIsOpen(true); setMobileMenuOpen(false); }}
                className="w-full btn-primary"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>

    <Account isOpen={isOpen} setIsOpen={setIsOpen} /> 
  </>
);
};

export default Navbar;
