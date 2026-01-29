import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AddDomain from './admin/AddDomain';
import Login from './admin/Login';
import AdminDashboard from './admin/Dashboard';
import EditDomain from './admin/EditDomain';

// استيراد المكونات الأساسية
import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Expertise from './components/Expertise';
import Methodology from './components/Methodology';
import BuyTransfer from './components/BuyTransfer';
import ValuationTool from './components/ValuationTool';
import Contact from './components/Contact';
import Footer from './components/Footer';
import OfferModal from './components/OfferModal';
import CookieBanner from './components/CookieBanner';

// استيراد مكونات المدونة (تأكد من وجود الملفات في مجلد components)
import BlogIndex from './components/BlogIndex'; // السطر الذي سألت عنه لظهور التدوينات
import BlogPost from './components/BlogPost';
import AddPost from './admin/AddPost';
import ManagePosts from './admin/ManagePosts';
import EditPost from './admin/EditPost';

// استيراد الملفات القانونية والدعم
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import Cookies from './components/Cookies';
import Faq from './components/Faq';

// استيراد صفحة About (إذا كانت موجودة، وإلا اترك التوجيه لـ Methodology)
// import About from './components/About'; 

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('');

  const handleInquire = (domainName: string) => {
    setSelectedDomain(domainName);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <Header onNavigate={(path) => navigate(path)} />
      
      <main>
        <Routes>
          {/* الصفحة الرئيسية */}
          <Route path="/" element={
            <>
              <Hero />
              <Portfolio onInquire={handleInquire} />
              <Expertise />
            </>
          } />

          {/* روابط الخدمات والأدوات */}
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/buy-transfer" element={<BuyTransfer />} />
          <Route path="/valuation" element={<ValuationTool />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<Login />} />
          
          {/* قسم المدونة: الآن سيظهر الفهرس وتفتح التدوينة */}
          // استبدل السطرين اللذين أرسلتهما لي بهذين السطرين:
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          
          {/* الروابط القانونية والدعم */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/faq" element={<Faq />} />
          
          {/* صفحة About (توجيه مؤقت لـ Methodology إذا لم يوجد ملف About.tsx) */}
          <Route path="/about" element={<Methodology />} /> 
          <Route path="/admin/add" element={<AddDomain />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/edit/:id" element={<EditDomain />} />
          <Route path="/admin/add-post" element={<AddPost />} />
          <Route path="/admin/posts" element={<ManagePosts />} />
          <Route path="/admin/posts" element={<ManagePosts />} />
          <Route path="/admin/add-post" element={<AddPost />} />
          <Route path="/admin/edit-post/:id" element={<EditPost />} />
        </Routes>
      </main>

      <Footer onNavigate={(path) => navigate(path)} />
      
      <OfferModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        domainName={selectedDomain} 
      />
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