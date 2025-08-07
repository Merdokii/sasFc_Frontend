import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/team", name: "Team" },
    { path: "/matches", name: "Matches" },
    { path: "/news", name: "News" },
    { path: "/gallery", name: "Gallery" },
    { path: "/contact", name: "Contact" }
  ];

  return (
    <>
      {/* DYNAMIC NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-gray-900/90 backdrop-blur-md border-b border-[#f9fd06]/20' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          {/* LOGO WITH HERO MATCHING EFFECTS */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="group-hover:rotate-[15deg] transition-transform duration-300">
              <img 
                src="/logo.png" 
                alt="SAS FC Logo"
                className="h-14 w-14 object-contain drop-shadow-lg group-hover:drop-shadow-[0_0_15px_rgba(249,253,6,0.8)] transition-all"
              />
            </div>
            <span className={`text-2xl font-extrabold bg-clip-text ${scrolled ? 'text-transparent bg-gradient-to-r from-white to-[#f9fd06]' : 'text-white'}`}>
              SAS FC
            </span>
          </Link>
          
          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className="relative px-1 py-2 font-medium group"
              >
                <span className={`transition-colors ${scrolled ? 'text-white/90 hover:text-[#f9fd06]' : 'text-white hover:text-[#f9fd06]'}`}>
                  {link.name}
                </span>
                <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${scrolled ? 'bg-[#f9fd06]' : 'bg-white'} scale-x-0 group-hover:scale-x-100 origin-left transition-transform`}></span>
              </Link>
            ))}
          </div>
          
          {/* MOBILE MENU BUTTON */}
          <button 
            className={`md:hidden p-2 rounded-lg transition ${scrolled ? 'hover:bg-[#f9fd06]/20' : 'hover:bg-white/20'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg 
              className="w-7 h-7" 
              fill="none" 
              stroke={scrolled ? '#f9fd06' : 'white'} 
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-lg md:hidden pt-24">
          <div className="container mx-auto px-6 flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-3xl font-bold py-4 px-4 text-white border-b border-[#339c0c]/30 hover:text-[#f9fd06] hover:pl-8 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};