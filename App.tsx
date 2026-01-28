import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Expertise from './components/Expertise';
import Methodology from './components/Methodology';
import BuyTransfer from './components/BuyTransfer';
import ValuationTool from './components/ValuationTool';
import BlogIndex from './components/BlogIndex';
import BlogPost from './components/BlogPost';
import About from './components/About';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Cookies from './components/Cookies';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import OfferModal from './components/OfferModal';
import CookieBanner from './components/CookieBanner';
import { fetchJsonContent } from './utils/content';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [currentPostSlug, setCurrentPostSlug] = useState('');

  // Fetch and Inject Global Settings
  useEffect(() => {
    // 1. SEO Settings
    fetchJsonContent<any>('/content/settings/seo.json').then(seo => {
      if (seo) {
        if (seo.site_title) document.title = seo.site_title;
        if (seo.site_description) {
          document.querySelector('meta[name="description"]')?.setAttribute('content', seo.site_description);
        }
      }
    });

    // 2. Scripts Injection
    fetchJsonContent<any>('/content/settings/scripts.json').then(scripts => {
      if (scripts) {
        // Analytics
        if (scripts.google_analytics) {
          // If not already present
          if (!document.querySelector(`script[src*="${scripts.google_analytics}"]`)) {
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${scripts.google_analytics}`;
            document.head.appendChild(script);

            const inlineScript = document.createElement('script');
            inlineScript.innerHTML = `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${scripts.google_analytics}');
            `;
            document.head.appendChild(inlineScript);
          }
        }
        
        // Search Console (Meta Tag)
        if (scripts.google_console) {
           // Create a temp div to parse the string to a node if it's a tag
           const div = document.createElement('div');
           div.innerHTML = scripts.google_console;
           const meta = div.firstChild;
           if (meta) document.head.appendChild(meta);
        }

        // AdSense
        if (scripts.google_adsense) {
          const div = document.createElement('div');
          div.innerHTML = scripts.google_adsense;
          Array.from(div.childNodes).forEach(node => document.head.appendChild(node));
        }
      }
    });
  }, []);

  // Handle Hash changes for Routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      
      if (hash.startsWith('blog/')) {
        const slug = hash.replace('blog/', '');
        if (slug) {
          setCurrentPostSlug(slug);
          setCurrentView('blog-post');
        } else {
          setCurrentView('blog');
        }
      } else if (hash === 'blog') setCurrentView('blog');
      else if (hash === 'about') setCurrentView('about');
      else if (hash === 'terms') setCurrentView('terms');
      else if (hash === 'privacy') setCurrentView('privacy');
      else if (hash === 'cookies') setCurrentView('cookies');
      else if (hash === 'faq') setCurrentView('faq');
      else if (hash === 'contact') setCurrentView('contact');
      else if (hash === 'methodology') setCurrentView('methodology');
      else if (hash === 'buy-transfer') setCurrentView('buy-transfer');
      else if (hash === 'valuation') setCurrentView('valuation');
      else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigation = (view: string, param?: string) => {
    setCurrentView(view);
    
    let hash = '';
    if (view === 'home') hash = '';
    else if (view === 'blog') hash = 'blog';
    else if (view === 'blog-post' && param) {
      hash = `blog/${param}`;
      setCurrentPostSlug(param);
    }
    else {
      hash = view;
    }

    if (view !== 'blog-post') {
      window.scrollTo(0, 0);
    }
    window.location.hash = hash;
  };

  const handleInquire = (domainName: string) => {
    setSelectedDomain(domainName);
    setIsModalOpen(true);
  };

  const renderView = () => {
    switch(currentView) {
      case 'methodology': return <Methodology />;
      case 'buy-transfer': return <BuyTransfer onNavigate={handleNavigation} />;
      case 'valuation': return <ValuationTool />;
      case 'blog': return <BlogIndex onReadPost={(slug) => handleNavigation('blog-post', slug)} />;
      case 'blog-post': return <BlogPost slug={currentPostSlug} onBack={() => handleNavigation('blog')} />;
      case 'about': return <About onNavigate={(view) => handleNavigation(view)} />;
      case 'terms': return <Terms />;
      case 'privacy': return <Privacy />;
      case 'cookies': return <Cookies />;
      case 'faq': return <Faq />;
      case 'contact': return <Contact />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <Portfolio onInquire={handleInquire} />
            <Expertise />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text selection:bg-brand-accent/20 selection:text-brand-accent">
      <Header onNavigate={(view) => handleNavigation(view)} currentView={currentView} />
      <main>
        {renderView()}
      </main>
      <Footer onNavigate={(view) => handleNavigation(view)} />
      <OfferModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        domainName={selectedDomain} 
      />
      <CookieBanner />
    </div>
  );
};

export default App;