import React from 'react';

const Methodology: React.FC = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center pt-32 pb-24 bg-brand-bg relative overflow-hidden">
       {/* Background Ambience */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center animate-slide-up">
        <h1 className="text-4xl md:text-6xl font-sans font-bold text-white mb-12 tracking-tight">
          The Namelyx <span className="text-brand-accent text-glow-green">Standard</span>
        </h1>
        
        <div className="bg-white/5 border border-white/10 p-12 backdrop-blur-sm">
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-8">
            We select digital assets based on the <strong className="text-white">Radio Test</strong>, <strong className="text-white">linguistic symmetry</strong>, and <strong className="text-white">2026 AI-market liquidity</strong>.
          </p>
          <div className="w-24 h-[1px] bg-brand-accent mx-auto mb-8"></div>
          <p className="text-lg text-brand-accent font-medium tracking-wide uppercase text-xs">
            Our methodology ensures high brandability and long-term strategic value.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Methodology;