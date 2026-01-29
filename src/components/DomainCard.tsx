import React from 'react';
import { Domain } from '../types';

interface DomainCardProps {
  domain: Domain;
  index: number;
  onInquire: (domainName: string) => void;
}

const DomainCard: React.FC<DomainCardProps> = ({ domain, index, onInquire }) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      // تعديل الحالة لتطابق "Review" القادمة من قاعدة البيانات باللون الأصفر
      case 'Review': 
        return 'text-yellow-400 border-yellow-400/20 shadow-yellow-400/10';
      case 'Sold': 
        return 'text-red-500 border-red-500/20 shadow-red-500/10';
      case 'Available': 
      default: 
        return 'text-brand-accent border-brand-accent/20 shadow-[0_0_10px_rgba(0,255,157,0.1)]';
    }
  };

  const isSold = domain.status === 'Sold';
  const displayStatusValue = domain.status || 'Available';
  const statusStyles = getStatusColor(displayStatusValue);

  return (
    <div 
      onClick={() => !isSold && onInquire(domain.title)}
      className={`relative group bg-brand-bg border border-white/5 p-8 flex flex-col h-full justify-between min-h-[280px] overflow-hidden transition-all duration-300 ease-out
        ${isSold ? 'opacity-60 cursor-not-allowed grayscale' : 'cursor-pointer hover:border-brand-accent/50 hover:shadow-[0_0_30px_rgba(0,255,157,0.15)] hover:-translate-y-2 hover:bg-white/[0.03]'}
      `}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Domain Name & Tagline Content */}
      <div className="relative z-10 flex-grow flex flex-col justify-center text-center w-full px-1">
        <h3 
          className={`font-sans font-bold text-white tracking-tight text-glow w-full text-2xl mb-4 truncate ${!isSold ? 'group-hover:text-brand-accent' : ''} transition-colors duration-300`}
          title={domain.title}
        >
          {domain.title}
        </h3>
        
        {/* Description Tagline - Always Visible */}
        <p className="text-gray-400 text-sm font-light leading-relaxed line-clamp-3">
          {domain.description}
        </p>
      </div>

      {/* Footer Area: Status Only (No Price) */}
      <div className="relative z-10 h-10 flex items-end justify-center w-full mt-6">
        <div className="absolute bottom-0 transition-transform duration-300 group-hover:translate-y-1">
          <span className={`inline-block px-3 py-1.5 border rounded-full text-[10px] font-bold uppercase tracking-[0.15em] ${statusStyles} backdrop-blur-sm bg-black/20`}>
            {/* عرض النص الإنجليزي الجديد بدلاً من كلمة Review */}
            {displayStatusValue === 'Review' ? 'OFFER RECEIVED' : displayStatusValue}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DomainCard;