import React, { useEffect } from 'react';

const Privacy: React.FC = () => {
  useEffect(() => {
    document.title = "Privacy Policy - Namelyx";
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen pt-32 pb-24 bg-brand-bg relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10 animate-fade-in">
        <h1 className="text-3xl md:text-5xl font-sans font-bold text-white mb-10 tracking-tight">
          Privacy <span className="text-brand-accent">Policy</span>
        </h1>

        <div className="space-y-12 text-gray-400 font-light leading-relaxed">
          <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-sm">
            <p className="mb-4 text-sm text-gray-500 uppercase tracking-widest">Last Updated: January 24, 2026</p>
            <p className="mb-6">
              Namelyx ("we," "us," or "our") is committed to protecting your personal privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website namelyx.com, including any other media form, media channel, mobile website, or mobile application related or connected thereto. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-sm">
            <h2 className="text-white font-bold text-xl mb-6 border-b border-white/10 pb-4">Collection of Your Information</h2>
            <p className="mb-4">
              We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            </p>
            <h3 className="text-white font-bold text-lg mt-6 mb-2">Personal Data</h3>
            <p className="mb-4">
              Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards. You are under no obligation to provide us with personal information of any kind, however your refusal to do so may prevent you from using certain features of the Site.
            </p>
            <h3 className="text-white font-bold text-lg mt-6 mb-2">Derivative Data</h3>
            <p>
              Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-sm">
            <h2 className="text-white font-bold text-xl mb-6 border-b border-white/10 pb-4">Use of Your Information</h2>
            <p className="mb-4">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Facilitate the negotiation, sale, and transfer of domain names.</li>
              <li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
              <li>Email you regarding your account or order.</li>
              <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
              <li>Increase the efficiency and operation of the Site.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
              <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
            </ul>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-sm">
            <h2 className="text-white font-bold text-xl mb-6 border-b border-white/10 pb-4">Google Analytics & Third-Party Cookies</h2>
            <p className="mb-4">
              We may use third-party software to serve ads on the Site, implement email marketing campaigns, and manage other interactive marketing initiatives. This third-party software may use cookies or similar tracking technology to help manage and optimize your online experience with us.
            </p>
            <p>
              Specifically, we use Google Analytics to analyze traffic to this website. Google Analytics uses cookies to collect information about your usage of our website. This data is used to create reports about the use of our website. You can opt-out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-sm">
            <h2 className="text-white font-bold text-xl mb-6 border-b border-white/10 pb-4">Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Privacy;