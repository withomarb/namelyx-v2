import React, { useState, useEffect } from 'react';
import { Domain } from '../types';
import DomainCard from './DomainCard';
// استيراد إعدادات Firebase
import { db } from '../firebase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

interface PortfolioProps {
  onInquire: (domainName: string) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onInquire }) => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // إنشاء استعلام لجلب الدومينات مرتبة من الأحدث إلى الأقدم
        const domainsRef = collection(db, "domains");
        const q = query(domainsRef, orderBy("createdAt", "desc"));
        
        const querySnapshot = await getDocs(q);
        
        // تحويل البيانات من Firestore إلى صيغة تتوافق مع نوع Domain
        const domainData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            // نأخذ 'name' من Firebase ونضعه في 'title' ليتوافق مع مكون DomainCard القديم
            title: data.name || '', 
            price: data.price || '',
            status: data.status || 'Available',
            ...data
          } as unknown as Domain;
        });

        setDomains(domainData);
      } catch (e) {
        console.error("Failed to load domains from Firebase", e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // الحفاظ على منطق تصفية الدومينات المخفية
  const visibleDomains = domains.filter(d => d.status !== 'Hidden');

  return (
    <section id="portfolio" className="py-12 bg-brand-bg relative min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center text-brand-accent animate-pulse tracking-widest uppercase text-sm">
              Loading Assets...
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
            {visibleDomains.map((domain, index) => (
              <DomainCard 
                key={domain.id || index} 
                domain={domain} 
                index={index} 
                onInquire={onInquire}
              />
            ))}
          </div>
        )}
        
        {/* رسالة في حال كانت قاعدة البيانات فارغة */}
        {!loading && visibleDomains.length === 0 && (
          <div className="text-center text-white/40 py-20 font-light tracking-widest uppercase text-xs">
            No domains currently in inventory.
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;