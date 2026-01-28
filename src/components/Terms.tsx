import React, { useEffect } from 'react';

const Terms: React.FC = () => {
  useEffect(() => {
    document.title = "Terms & Conditions - Namelyx";
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen pt-32 pb-24 bg-brand-bg relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10 animate-fade-in">
        <h1 className="text-3xl md:text-5xl font-sans font-bold text-white mb-10 tracking-tight">
          Terms & <span className="text-brand-accent">Conditions</span>
        </h1>

        <div className="space-y-12 text-gray-400 font-light leading-relaxed">
          <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-sm">
             <p className="mb-4 text-sm text-gray-500 uppercase tracking-widest">Last Updated: January 24, 2026</p>
            <h2 className="text-white font-bold text-xl mb-6 border-b border-white/10 pb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              Welcome to Namelyx ("Company", "we", "our", "us"). These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Namelyx, concerning your access to and use of the namelyx.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
            </p>
            <p>
              By accessing the Site, you acknowledge that you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these terms, then you are expressly prohibited from using the Site and you must discontinue use immediately.
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-sm">
            <h2 className="text-white font-bold text-xl mb-6 border-b border-white/10 pb-4">2. Domain Transfer Policy & Security</h2>
            <p className="mb-4 text-white">
              Transactions and domain transfers are facilitated through secure third-party platforms (like Dan.com, Escrow.com, or Sedo) to ensure maximum security for the buyer.
            </p>
            <p>
              We do not directly handle financial transactions on this server. Upon reaching an agreement for the purchase of a domain name, a dedicated transaction page will be created on one of our partner platforms. This ensures that:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Your payment details are processed by regulated financial entities.</li>
              <li>The domain name is held in a secure lock-state until funds are verified.</li>
              <li>You receive a dedicated invoice and transfer assistance from a neutral third party.</li>
            </ul>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-sm">
            <h2 className="text-white font-bold text-xl mb-6 border-b border-white/10 pb-4">3. Intellectual Property Rights</h2>
            <p className="mb-4">
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
            </p>
            <p>
              The domain names listed on this site are the legal property of Namelyx until a transfer of ownership is completed. Listing a domain does not constitute an infringement on any existing trademark, as these names are generic, descriptive, or abstract in nature. It is the buyer's responsibility to ensure that their intended use of the domain does not infringe on third-party rights in their specific jurisdiction.
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-sm">
            <h2 className="text-white font-bold text-xl mb-6 border-b border-white/10 pb-4">4. Valuation & Pricing</h2>
            <p className="mb-4">
              The prices listed for domains are subject to change without notice. While we strive to provide accurate market valuations based on current AI and tech trends, these figures are estimates and should not be considered financial advice.
            </p>
            <p>
              We reserve the right to refuse service, terminate accounts, or cancel orders in our sole discretion, including, without limitation, if we believe that customer conduct violates applicable law or is harmful to our interests.
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-sm">
            <h2 className="text-white font-bold text-xl mb-6 border-b border-white/10 pb-4">5. Limitation of Liability</h2>
            <p>
              In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;