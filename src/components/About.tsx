
import React, { useEffect, useState } from 'react';
import { ArrowRightIcon } from './Icons';
import { getPageContent } from '../utils/content';

interface AboutProps {
  onNavigate: (view: string) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const [data, setData] = useState<{ title: string; body: string } | null>(null);

  useEffect(() => {
    document.title = "About Us - Namelyx";
    window.scrollTo(0, 0);

    const loadContent = async () => {
        const content = await getPageContent('about');
        if (content) {
            setData({ title: content.attributes.title, body: content.body });
        }
    }
    loadContent();
  }, []);

  const formatBody = (text: string) => {
    return text.split('\n\n').map((paragraph, idx) => {
       if (paragraph.startsWith('### ')) {
        return <h3 key={idx} className="text-white text-xl font-bold mt-12 mb-6">{paragraph.replace('### ', '')}</h3>;
       }
       return <p key={idx} className="mb-8">{paragraph}</p>;
    });
  };

  return (
    <section className="min-h-screen pt-32 pb-24 bg-brand-bg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-sans font-bold text-white mb-12 tracking-tight">
          {data ? data.title : 'About Namelyx'}
        </h1>

        <div className="space-y-12">
          <div className="prose prose-invert max-w-none text-gray-400 font-light leading-loose text-lg">
             {data ? formatBody(data.body) : <p>Loading...</p>}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 mt-12 pt-12 border-t border-white/10">
            <p className="text-white font-bold uppercase tracking-widest text-sm">Ready to acquire your legacy?</p>
            <button 
              onClick={() => onNavigate('contact')}
              className="px-8 py-3 border border-brand-accent text-brand-accent font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-black transition-all duration-300 inline-flex items-center gap-2"
            >
              Contact Us <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
