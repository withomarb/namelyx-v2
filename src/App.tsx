import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { db, auth } from './firebase/config';
import { doc, getDoc } from 'firebase/firestore';

// استيراد المكونات
import AddDomain from './admin/AddDomain';
import Login from './admin/Login';
import AdminDashboard from './admin/Dashboard';
import EditDomain from './admin/EditDomain';
import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Expertise from './components/Expertise';
import Methodology from './components/Methodology';
import About from './components/About';
import BuyTransfer from './components/BuyTransfer';
import ValuationTool from './components/ValuationTool';
import Contact from './components/Contact';
import Footer from './components/Footer';
import OfferModal from './components/OfferModal';
import CookieBanner from './components/CookieBanner';
import BlogIndex from './components/BlogIndex';
import BlogPost from './components/BlogPost';
import AddPost from './admin/AddPost';
import ManagePosts from './admin/ManagePosts';
import EditPost from './admin/EditPost';
import Settings from './admin/Settings'; // استيراد الإعدادات الجديدة
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import Cookies from './components/Cookies';
import Faq from './components/Faq';
import ManageDomains from './admin/ManageDomains';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('');

  // --- نظام حقن أكواد SEO و Analytics تلقائياً ---
  useEffect(() => {
    const injectScripts = async () => {
      try {
        const docSnap = await getDoc(doc(db, "settings", "global"));
        if (docSnap.exists()) {
          const { analytics, adsense, searchConsole } = docSnap.data();
          const allScripts = `${analytics || ''} ${adsense || ''} ${searchConsole || ''}`;
          
          if (allScripts.trim()) {
            // ننشئ حاوية مؤقتة لتحويل النص إلى عناصر HTML
            const holder = document.createElement('div');
            holder.innerHTML = allScripts;
            
            // نحقن كل عنصر (Script أو Meta) في الـ Head
            Array.from(holder.childNodes).forEach((node) => {
              if (node.nodeName === 'SCRIPT') {
                const script = document.createElement('script');
                Array.from((node as HTMLScriptElement).attributes).forEach(attr => 
                  script.setAttribute(attr.name, attr.value)
                );
                script.innerHTML = (node as HTMLScriptElement).innerHTML;
                document.head.appendChild(script);
              } else {
                document.head.appendChild(node.cloneNode(true));
              }
            });
          }
        }
      } catch (e) { console.error("SEO Injection Error:", e); }
    };
    injectScripts();
  }, []);

  const handleInquire = (domainName: string) => {
    setSelectedDomain(domainName);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <Header onNavigate={(path) => navigate(path)} />
      <main>
        <Routes>
          <Route path="/" element={<><Hero /><Portfolio onInquire={handleInquire} /><Expertise /></>} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/buy-transfer" element={<BuyTransfer />} />
          <Route path="/valuation" element={<ValuationTool />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/add" element={<AddDomain />} />
          <Route path="/admin/edit/:id" element={<EditDomain />} />
          <Route path="/admin/add-post" element={<AddPost />} />
          <Route path="/admin/posts" element={<ManagePosts />} />
          <Route path="/admin/edit-post/:id" element={<EditPost />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/about" element={<About onNavigate={(path) => navigate(path)} />} />
          <Route path="/admin/domains" element={<ManageDomains />} />
        </Routes>
      </main>
      <Footer onNavigate={(path) => navigate(path)} />
      <OfferModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} domainName={selectedDomain} />
      <CookieBanner />
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;