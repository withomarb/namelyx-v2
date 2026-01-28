import React from 'react';
import { SOCIALS } from '../constants';
import { XIcon, LinkedInIcon, MailIcon } from './Icons';

interface FooterProps {
  onNavigate: (view: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const getIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'x': return <XIcon className={className} />;
      case 'linkedin': return <LinkedInIcon className={className} />;
      case 'email': return <MailIcon className={className} />;
      default: return null;
    }
  };

  const handleSocialClick = (e: React.MouseEvent, url: string) => {
    if (url.startsWith('/')) {
      e.preventDefault();
      onNavigate(url.substring(1)); // Remove leading slash
    }
  };

  return (
    <footer className="bg-brand-bg border-t border-white/5 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
             <div className="cursor-pointer" onClick={() => onNavigate('home')}>
              <span className="text-2xl font-sans font-extrabold tracking-[0.2em] text-white uppercase">
                Namelyx
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-light max-w-xs">
              Curating the world's most premium digital assets for the age of Artificial Intelligence and Future Tech.
            </p>
            <div className="flex gap-6 pt-2">
              {SOCIALS.map((social) => (
                <a 
                  key={social.platform}
                  href={social.url}
                  onClick={(e) => handleSocialClick(e, social.url)}
                  target={social.url.startsWith('/') ? undefined : "_blank"}
                  rel={social.url.startsWith('/') ? undefined : "noopener noreferrer"}
                  className="text-gray-500 hover:text-brand-accent transition-colors duration-300"
                  aria-label={social.platform}
                >
                  {getIcon(social.icon, "w-5 h-5")}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Legal */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Legal</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={() => onNavigate('privacy')} className="text-gray-500 hover:text-brand-accent text-sm transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="text-gray-500 hover:text-brand-accent text-sm transition-colors text-left">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cookies')} className="text-gray-500 hover:text-brand-accent text-sm transition-colors text-left">
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Support</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={() => onNavigate('about')} className="text-gray-500 hover:text-brand-accent text-sm transition-colors text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="text-gray-500 hover:text-brand-accent text-sm transition-colors text-left">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="text-gray-500 hover:text-brand-accent text-sm transition-colors text-left">
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-[10px] text-gray-600 font-sans tracking-widest uppercase">
            &copy; 2026 Namelyx
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;