import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center pt-32 pb-12 overflow-hidden bg-brand-bg">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-sans font-bold text-white mb-6 tracking-tight animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
          NAMELYX
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-brand-accent/80 font-light leading-relaxed animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
          Curating Digital Excellence for the AI & Tech Era.
        </p>
      </div>
    </section>
  );
};

export default Hero;