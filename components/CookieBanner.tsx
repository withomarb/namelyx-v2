import React, { useState, useEffect } from 'react';

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consented = localStorage.getItem('namelyx-cookie-consent');
    if (!consented) {
      setTimeout(() => setVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('namelyx-cookie-consent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0F0F0F] border-t border-white/10 p-6 z-[100] animate-slide-up shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-gray-400 leading-relaxed max-w-3xl text-center md:text-left">
          <p>
            We use cookies to enhance your experience, analyze site traffic, and assist in our marketing efforts. By continuing to visit this site you agree to our use of cookies. For more information, please review our <button onClick={() => window.location.pathname = '/cookies'} className="text-brand-accent underline hover:text-white">Cookie Policy</button>.
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleAccept}
            className="px-8 py-3 bg-brand-accent text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;