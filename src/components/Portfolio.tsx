import React, { useState, useEffect } from 'react';
import { Domain } from '../types';
import DomainCard from './DomainCard';
import { getAllDomains } from '../utils/content';

interface PortfolioProps {
  onInquire: (domainName: string) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onInquire }) => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
        try {
          const loadedContent = await getAllDomains();
          // تأكد أن البيانات تأتي بصيغة attributes
          const domainData = loadedContent.map(c => c.attributes);
          setDomains(domainData);
        } catch (e) {
          console.error("Failed to load domains", e);
        } finally {
          setLoading(false);
        }
    };
    loadData();
  }, []);

  const visibleDomains = domains.filter(d => d.status !== 'Hidden');

  return (
    <section id="portfolio" className="py-12 bg-brand-bg relative min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6">
        {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center text-brand-accent animate-pulse tracking-widest uppercase text-sm">Loading Assets...</div>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
            {visibleDomains.map((domain, index) => (
                <DomainCard 
                key={domain.title || index} 
                domain={domain} 
                index={index} 
                onInquire={onInquire}
                />
            ))}
            </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;