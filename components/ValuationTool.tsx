import React, { useState } from 'react';
import { ExternalLinkIcon } from './Icons';

const ValuationTool: React.FC = () => {
  const [domain, setDomain] = useState('');

  const handleVerify = (platform: 'atom' | 'godaddy') => {
    if (!domain) return;
    
    let url = '';
    if (platform === 'atom') {
      url = `https://www.atom.com/domain-appraisal/${encodeURIComponent(domain)}`;
    } else {
      url = `https://ie.godaddy.com/domain-value-appraisal/appraisal/?domainToCheck=${encodeURIComponent(domain)}`;
    }
    
    window.open(url, '_blank');
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center pt-32 pb-24 bg-brand-bg relative overflow-hidden">
      <div className="max-w-3xl w-full mx-auto px-6 relative z-10 text-center animate-slide-up">
        <h1 className="text-3xl md:text-5xl font-sans font-bold text-white mb-6 tracking-tight">
          Domain <span className="text-brand-accent text-glow-green">Valuation</span> Tool
        </h1>
        <p className="text-gray-400 mb-12 font-light">
          Verify market value using leading industry appraisal data.
        </p>

        <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-lg backdrop-blur-md">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain name (e.g. namelyx.com)"
            className="w-full bg-black/50 border border-white/20 text-white p-4 mb-8 focus:outline-none focus:border-brand-accent focus:shadow-[0_0_15px_rgba(0,255,157,0.2)] transition-all text-center text-lg placeholder-gray-600 font-mono"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleVerify('atom')}
              disabled={!domain}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-transparent border border-brand-accent/30 text-brand-accent font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              Verify on Atom <ExternalLinkIcon className="w-4 h-4 group-hover:stroke-black" />
            </button>

            <button
              onClick={() => handleVerify('godaddy')}
              disabled={!domain}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest hover:border-white hover:bg-white/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify on GoDaddy <ExternalLinkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuationTool;