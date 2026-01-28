
import React, { useState, useEffect } from 'react';
import { getAllDomains } from '../utils/content';

interface HeaderProps {
  onNavigate: (view: string, param?: string) => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({ available: 0, underReview: 0, loading: true });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const domains = await getAllDomains();
        if (domains) {
            const available = domains.filter(d => d.attributes.status === 'Available').length;
            const underReview = domains.filter(d => d.attributes.status === 'Offers Under Review').length;
            setStats({ available, underReview, loading: false });
        }
      } catch (e) {
        setStats(prev => ({ ...prev, loading: false }));
      }
    };
    fetchStats();
  }, []);

  const navItems = [
    { label: 'Portfolio', id: 'home' },
    { label: 'Methodology', id: 'methodology' },
    { label: 'Blog', id: 'blog' },
    { label: 'Buy & Transfer', id: 'buy-transfer' },
    { label: 'Valuation Tool', id: 'valuation' },
  ];

  const handleMobileNav = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <>
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-brand-bg/95 backdrop-blur-xl py-4 shadow-2xl' : 'bg-transparent py-8'
      }`}
    >
      {/* Trust Indicator Line */}
      <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-30'}`}></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-8 flex justify-between items-center h-full">
        {/* Brand & Tagline - Left Aligned */}
        <div className="flex flex-col justify-center cursor-pointer z-50 items-start" onClick={() => handleMobileNav('home')}>
          <div className="group">
            <span className="text-2xl md:text-3xl font-sans font-extrabold tracking-[0.2em] text-white group-hover:text-brand-accent transition-colors duration-500 uppercase">
              Namelyx
            </span>
          </div>
          <span className="text-[10px] md:text-xs font-medium text-brand-accent uppercase tracking-widest mt-1 opacity-90 pl-1">
            Strategic AI Asset Management
          </span>
          {/* Dynamic Stats - Desktop Only - Aligned under Tagline */}
          <div className="hidden lg:block mt-2 text-[10px] font-mono tracking-wide text-brand-accent/80 pl-1">
             {stats.loading ? (
               <span className="opacity-50">Loading...</span>
             ) : (
               <>
                 Available: <span className="font-bold text-brand-accent">{stats.available}</span> <span className="mx-2 text-brand-accent/30">|</span> Offers Under Review: <span className="font-bold text-brand-accent">{stats.underReview}</span>
               </>
             )}
          </div>
        </div>

        {/* Desktop Navigation - Right Aligned */}
        <div className="hidden lg:flex items-center gap-8 self-center h-full pt-2">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-xs font-bold hover:text-brand-accent hover:text-glow-green transition-all duration-300 tracking-[0.15em] uppercase relative group ${currentView === item.id || (currentView === 'blog-post' && item.id === 'blog') ? 'text-brand-accent' : 'text-gray-400'}`}
            >
              {item.label}
              <span className={`absolute -bottom-2 left-0 h-[1px] bg-brand-accent transition-all duration-300 ${currentView === item.id || (currentView === 'blog-post' && item.id === 'blog') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
          ))}
          
          <button 
            onClick={() => onNavigate('contact')}
            className="px-6 py-2 border border-brand-accent bg-brand-accent/10 rounded-none text-xs font-bold text-brand-accent uppercase tracking-widest hover:bg-brand-accent hover:text-black transition-all duration-300 animate-pulse-glow"
          >
            Inquiries
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden z-50">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white hover:text-brand-accent transition-colors p-2"
          >
            {mobileMenuOpen ? (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>

    {/* Mobile Overlay Menu */}
    <div className={`fixed inset-0 bg-brand-bg/98 backdrop-blur-xl z-40 transition-transform duration-500 ease-in-out lg:hidden flex flex-col items-center justify-center ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col gap-8 text-center">
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => handleMobileNav(item.id)}
            className={`text-2xl font-bold uppercase tracking-[0.2em] transition-all duration-300 ${currentView === item.id ? 'text-brand-accent text-glow-green' : 'text-white hover:text-brand-accent'}`}
          >
            {item.label}
          </button>
        ))}
         <button 
            onClick={() => handleMobileNav('contact')}
            className="mt-4 px-8 py-3 border border-brand-accent text-brand-accent font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,255,157,0.3)]"
          >
            Inquiries
          </button>
          
          {/* Mobile Stats */}
          <div className="mt-8 text-xs font-mono text-brand-accent tracking-wide">
             Available: <span className="text-white">{stats.available}</span> | Under Review: <span className="text-white">{stats.underReview}</span>
          </div>
      </div>
    </div>
    </>
  );
};

export default Header;
