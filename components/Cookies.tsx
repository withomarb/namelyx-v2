import React, { useEffect } from 'react';

const Cookies: React.FC = () => {
  useEffect(() => {
    document.title = "Cookie Policy - Namelyx";
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen pt-32 pb-24 bg-brand-bg relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 relative z-10 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-sans font-bold text-white mb-10 tracking-tight">
          Cookie <span className="text-brand-accent">Policy</span>
        </h1>

        <div className="space-y-8 text-gray-400 font-light leading-relaxed">
          <div>
            <p>
              This Cookie Policy explains how Namelyx uses cookies and similar technologies to recognize you when you visit our website.
            </p>
          </div>

          <div>
            <h2 className="text-white font-bold text-lg mb-4">What are cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
          </div>

          <div>
            <h2 className="text-white font-bold text-lg mb-4">How we use cookies</h2>
            <p>
              We use cookies primarily for analytics purposes (via Google Analytics) to understand how visitors interact with our portfolio. This helps us optimize the user experience and the layout of our digital real estate. These cookies track information such as the number of visitors, the pages visited, and the source of the traffic.
            </p>
          </div>

          <div>
            <h2 className="text-white font-bold text-lg mb-4">Managing cookies</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cookies;