import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  onNavigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Portfolio', path: '/' },
    { name: 'Methodology', path: '/methodology' },
    { name: 'Buy & Transfer', path: '/buy-transfer' },
    { name: 'Valuation', path: '/valuation' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-brand-bg/90 backdrop-blur-xl py-4 shadow-2xl border-b border-white/5' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
        {/* قسم اللوجو الجديد: نصي فقط، فخم، وبدون أيقونة */}
        <div 
          className="cursor-pointer group"
          onClick={() => handleNavigation('/')}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-white select-none transition-colors duration-300 group-hover:text-brand-accent">
            NAMELYX
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavigation(link.path)}
              className={`text-sm font-bold uppercase tracking-widest hover:text-brand-accent transition-colors relative group py-2 ${
                isActive(link.path) ? 'text-brand-accent' : 'text-gray-300'
              }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 h-[2px] bg-brand-accent transition-all duration-300 ${
                isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button (Hamburger) */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 flex flex-col gap-1.5 items-end">
            <span className={`h-[2px] bg-current transition-all duration-300 ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-2.5 bg-brand-accent' : 'w-6'}`}></span>
            <span className={`h-[2px] bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
            <span className={`h-[2px] bg-current transition-all duration-300 ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2 bg-brand-accent' : 'w-2'}`}></span>
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-brand-bg/95 backdrop-blur-2xl transition-all duration-500 md:hidden flex flex-col items-center justify-center gap-8 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavigation(link.path)}
              className={`text-2xl font-bold uppercase tracking-widest hover:text-brand-accent transition-colors ${
                 isActive(link.path) ? 'text-brand-accent' : 'text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;