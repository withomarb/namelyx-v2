import React from 'react';
import { ArrowRightIcon, ShieldCheckIcon, ChatBubbleIcon, RocketIcon } from './Icons';

interface BuyTransferProps {
  onNavigate: (view: string) => void;
}

const BuyTransfer: React.FC<BuyTransferProps> = ({ onNavigate }) => {
  return (
    <section className="min-h-screen pt-32 pb-24 bg-brand-bg relative overflow-hidden">
       {/* Background Ambience */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-20 left-20 w-[200px] h-[200px] bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 animate-slide-up">
        
        {/* Header Section */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
             Guide to Ownership
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-white tracking-tight mb-8">
            Secure Domain Acquisitions & <span className="text-brand-accent text-glow-green">Seamless Transfers</span>
          </h1>
          <p className="text-xl text-gray-400 font-light leading-relaxed">
            Acquiring a premium digital asset is a significant investment. At Namelyx, we prioritize your security. 
            Once an agreement is reached on a domain price, we work closely with you to choose the transfer platform 
            you trust most. Whether it is a direct registrar transfer or a third-party escrow service, the choice is yours.
          </p>
        </div>

        {/* 3-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          
          {/* Step 1 */}
          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-sm hover:border-brand-accent/30 transition-colors duration-300 group">
            <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mb-6 text-brand-accent">
              <ChatBubbleIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl text-white font-bold mb-4 group-hover:text-brand-accent transition-colors">1. Inquiry & Agreement</h3>
            <p className="text-gray-400 leading-relaxed font-light text-sm">
              The process begins with transparency. We discuss the terms and reach a fair market price for the asset. 
              There are no hidden fees or surprise costs. We ensure that both parties are aligned on the valuation 
              and the currency of the transaction before moving forward.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-sm hover:border-brand-accent/30 transition-colors duration-300 group">
            <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mb-6 text-brand-accent">
              <ShieldCheckIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl text-white font-bold mb-4 group-hover:text-brand-accent transition-colors">2. Platform Selection</h3>
            <p className="text-gray-400 leading-relaxed font-light text-sm">
              You choose your preferred secure transfer method. While we recommend industry leaders like <strong>Escrow.com</strong> or <strong>Atom.com</strong> for their robust buyer protection, we are fully flexible. We can also facilitate transactions via Dan.com, Sedo, or direct registrar push if preferred.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-sm hover:border-brand-accent/30 transition-colors duration-300 group">
            <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mb-6 text-brand-accent">
              <RocketIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl text-white font-bold mb-4 group-hover:text-brand-accent transition-colors">3. Rapid Transfer</h3>
            <p className="text-gray-400 leading-relaxed font-light text-sm">
              We initiate the process immediately to ensure your domain is live within 24-48 hours. 
              Once funds are secured, we provide the Authorization (EPP) Code and unlock the domain, 
              guiding you through the transfer to your preferred registrar (e.g., GoDaddy, Namecheap, AWS).
            </p>
          </div>
        </div>

        {/* Detailed SEO Content Section */}
        <div className="max-w-4xl mx-auto border-t border-white/5 pt-16">
          <h2 className="text-2xl text-white font-bold mb-6">Why Security Matters in Digital Real Estate</h2>
          <div className="prose prose-invert max-w-none text-gray-400 font-light leading-loose">
            <p className="mb-6">
              In the high-stakes world of digital asset acquisition, trust is the ultimate currency. A premium domain is not just a web address; it is intellectual property, brand identity, and a store of value. As such, we treat every transfer with the same rigor as a real estate closing.
            </p>
            <p className="mb-6">
              Our "Secure Acquisition Guide" is designed to eliminate risk. By utilizing third-party escrow services, we ensure that your funds are never released until you have full control of the domain. This protects you from non-delivery and ensures that we, as the seller, are protected from chargebacks. It is a mutually beneficial ecosystem that allows for high-value transactions to occur across borders without friction.
            </p>
            <p className="mb-8">
              Furthermore, for our corporate clients, we understand the need for compliance and proper invoicing. Platforms like Atom and Escrow.com provide detailed VAT invoices and transaction records that satisfy rigorous accounting standards. Whether you are a startup founder or a corporate procurement officer, Namelyx is dedicated to making your acquisition experience professional, secure, and swift.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
           <button 
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-3 px-10 py-5 bg-brand-accent text-black font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-[0_4px_20px_rgba(0,255,157,0.3)] rounded-sm"
           >
            Contact Us to Discuss Your Next Domain <ArrowRightIcon className="w-4 h-4" />
          </button>
          <p className="mt-4 text-xs text-gray-500 uppercase tracking-wide">
            Response time: Under 12 hours
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 pt-12 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
          <span className="text-xl md:text-2xl font-bold font-sans tracking-tight text-white">Escrow.com</span>
          <span className="text-xl md:text-2xl font-bold font-sans tracking-tight text-white">Atom</span>
          <span className="text-xl md:text-2xl font-bold font-sans tracking-tight text-white">Sedo</span>
        </div>

      </div>
    </section>
  );
};

export default BuyTransfer;