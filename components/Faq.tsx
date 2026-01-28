import React, { useEffect } from 'react';

const Faq: React.FC = () => {
  useEffect(() => {
    document.title = "FAQ - Namelyx";
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      q: "How is the domain transferred?",
      a: "We use a secure, white-glove transfer process. Once funds are secured via Escrow.com or Atom.com, we will unlock the domain and provide you with the authorization code (EPP code). You can then initiate the transfer to your preferred registrar (e.g., GoDaddy, Namecheap). The process typically takes less than 24 hours."
    },
    {
      q: "Are these domains SEO-ready?",
      a: "Yes. Our portfolio consists of aged, clean domains with no history of spam or abuse. Many of our assets are keyword-rich (e.g., 'AI', 'Bot', 'Sys'), giving you a significant head start in organic search ranking for relevant tech sectors."
    },
    {
      q: "Do you offer payment plans?",
      a: "We consider payment plans (lease-to-own) on a case-by-case basis for domains valued over $5,000 USD. This is typically handled via Atom.com's installment infrastructure to ensure security for both parties."
    },
    {
      q: "Can I make an offer below the asking price?",
      a: "We are open to reasonable offers. Use the 'Inquire' button on any domain card to submit your counter-offer. Please note that low-ball offers are generally automatically rejected by our system."
    }
  ];

  return (
    <section className="min-h-screen pt-32 pb-24 bg-brand-bg relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 relative z-10 animate-fade-in">
        <h1 className="text-3xl md:text-5xl font-sans font-bold text-white mb-12 tracking-tight">
          Frequently Asked <span className="text-brand-accent">Questions</span>
        </h1>

        <div className="space-y-6">
          {faqs.map((item, idx) => (
            <div key={idx} className="bg-white/[0.02] border border-white/5 p-8 hover:border-brand-accent/30 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-4">{item.q}</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;