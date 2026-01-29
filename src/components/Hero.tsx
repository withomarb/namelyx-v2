import React, { useState, useEffect } from 'react';
// استيراد أدوات Firebase بدلاً من المحتوى القديم
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const Hero: React.FC = () => {
  const [stats, setStats] = useState({ available: 0, review: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // جلب الدومينات مباشرة من قاعدة البيانات الحية
        const querySnapshot = await getDocs(collection(db, "domains"));
        const domains = querySnapshot.docs.map(doc => doc.data());

        // حساب الإحصائيات بناءً على القيم الجديدة التي برمجناها
        const available = domains.filter(d => d.status === 'Available').length;
        
        // هنا نحسب الحالات التي أسميناها "Review" والتي تظهر كـ OFFER RECEIVED
        const review = domains.filter(d => d.status === 'Review').length;

        setStats({ available, review });
      } catch (error) {
        console.error("Error fetching live stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-12 overflow-hidden bg-brand-bg">
      {/* تأثير إضاءة خلفي (Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/5 blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* كلمة NAMELYX الفخمة */}
        <h1 className="text-6xl md:text-9xl font-black text-white mb-4 tracking-tighter uppercase animate-fade-in">
          NAMELYX
        </h1>
        
        {/* قسم الإحصائيات - الآن أصبح حياً! */}
        <div className="flex items-center justify-center gap-6 mb-10 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase">
          <div className="flex items-center gap-2 text-brand-accent">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            <span>Available: {stats.available}</span>
          </div>
          
          <div className="w-[1px] h-3 bg-white/20"></div>
          
          <div className="text-white/40">
            {/* جعلنا الاسم هنا يتوافق مع "OFFER RECEIVED" أو نبقيه "Under Review" حسب رغبتك */}
            Offers: <span className="text-white/80">{stats.review}</span>
          </div>
        </div>

        {/* الوصف الجانبي */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 font-light leading-relaxed">
          Curating Digital Excellence for the AI & Tech Era.
        </p>
      </div>
    </section>
  );
};

export default Hero;