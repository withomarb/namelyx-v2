
import React, { useState, useEffect } from 'react';
import { ArrowRightIcon } from './Icons';
import { getAllBlogPosts } from '../utils/content';

interface BlogPost {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
}

interface BlogIndexProps {
  onReadPost: (slug: string) => void;
}

const BlogIndex: React.FC<BlogIndexProps> = ({ onReadPost }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
        try {
            const loadedContent = await getAllBlogPosts();
            // Transform and Sort by date desc
            const blogPosts = loadedContent.map(c => ({
                ...c.attributes,
                slug: c.slug
            })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setPosts(blogPosts);
        } catch(e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
    loadPosts();
  }, []);

  return (
    <section className="min-h-screen pt-32 pb-24 bg-brand-bg relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
             Insights & Strategy
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-white tracking-tight">
            The Namelyx <span className="text-brand-accent text-glow-green">Blog</span>
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center text-brand-accent animate-pulse">Loading Insights...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr">
            {posts.map((post, index) => (
              <div 
                key={post.slug}
                onClick={() => onReadPost(post.slug)}
                className="group relative bg-white/[0.02] border border-white/10 p-10 cursor-pointer hover:border-brand-accent/50 transition-all duration-500 overflow-hidden flex flex-col justify-between animate-slide-up h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className="relative z-10">
                  <span className="text-brand-accent text-xs font-mono uppercase tracking-widest mb-4 block opacity-80">
                    {post.date && new Date(post.date).toLocaleDateString()}
                  </span>
                  <h2 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-brand-accent transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-8 font-light line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="relative z-10 mt-auto">
                   <button className="flex items-center gap-3 text-xs font-bold text-white uppercase tracking-widest group-hover:text-brand-accent transition-colors duration-300">
                    Read Article <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogIndex;
