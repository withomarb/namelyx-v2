import React from 'react';

const Expertise: React.FC = () => {
  return (
    <section id="expertise" className="py-24 bg-brand-bg relative border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-6 block opacity-80">
          Our Philosophy
        </span>
        
        <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mb-10 leading-tight tracking-tight">
          We identify digital assets that define the <span className="text-brand-accent text-glow-green">next generation</span> of software.
        </h2>
        
        <p className="text-lg text-gray-400 leading-relaxed mb-16 max-w-3xl mx-auto font-light">
          Namelyx specializes in high-liquidity assets and AI-centric naming strategies. 
          In a crowded digital landscape, a premium domain is the ultimate signal of authority 
          and intent. We don't just sell names; we provide the foundation for future unicorns.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-brand-accent/30 transition-all duration-300 group">
            <h3 className="text-white font-bold text-lg mb-4 group-hover:text-brand-accent transition-colors">Strategic Valuation</h3>
            <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400">Deep market analysis ensures every asset in our portfolio holds intrinsic long-term value.</p>
          </div>
          <div className="p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-brand-accent/30 transition-all duration-300 group">
            <h3 className="text-white font-bold text-lg mb-4 group-hover:text-brand-accent transition-colors">AI & Tech Focus</h3>
            <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400">Specialized in succinct, memorable names tailored for SaaS, AI, and Web3 sectors.</p>
          </div>
          <div className="p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-brand-accent/30 transition-all duration-300 group">
            <h3 className="text-white font-bold text-lg mb-4 group-hover:text-brand-accent transition-colors">Secure Transfer</h3>
            <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400">Fast, secure escrow services ensure a seamless acquisition process for all parties.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;