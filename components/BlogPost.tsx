
import React, { useState, useEffect } from 'react';
import { ArrowRightIcon } from './Icons';
import { getAllBlogPosts } from '../utils/content';

interface BlogPostData {
  title: string;
  date: string;
  slug: string;
  author: string;
  body: string;
}

interface BlogPostProps {
  slug: string;
  onBack: () => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ slug, onBack }) => {
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
        try {
            const posts = await getAllBlogPosts();
            const found = posts.find(p => p.slug === slug);
            if (found) {
                setPost({ ...found.attributes, body: found.body, slug: found.slug });
            }
        } catch(e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg text-brand-accent">
        Loading Article...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-bg text-white gap-4">
        <h2 className="text-2xl">Post not found</h2>
        <button onClick={onBack} className="text-brand-accent underline">Return to Blog</button>
      </div>
    );
  }

  // Simple Markdown Formatter
  const formatContent = (text: string) => {
    if (!text) return null;
    return text.split('\n\n').map((paragraph, idx) => {
      if (paragraph.startsWith('### ')) {
        return <h3 key={idx} className="text-2xl font-bold text-white mt-8 mb-4">{paragraph.replace('### ', '')}</h3>;
      }
      if (paragraph.startsWith('## ')) {
        return <h2 key={idx} className="text-3xl font-bold text-white mt-10 mb-6">{paragraph.replace('## ', '')}</h2>;
      }
      
      // Bold handling
      const parts = paragraph.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className="text-lg text-gray-300 leading-loose mb-6 font-light">
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <article className="min-h-screen pt-32 pb-24 bg-brand-bg relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 relative z-10 animate-fade-in">
        
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-12 hover:text-brand-accent transition-colors"
        >
          <ArrowRightIcon className="w-3 h-3 rotate-180" /> Return to Blog
        </button>

        <header className="mb-12 border-b border-white/10 pb-12">
          <div className="flex items-center gap-4 text-xs font-mono text-brand-accent mb-6 uppercase tracking-widest">
            <span>{post.date && new Date(post.date).toLocaleDateString()}</span>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span>By {post.author}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-sans font-bold text-white leading-tight">
            {post.title}
          </h1>
        </header>

        <div className="prose prose-invert max-w-none">
          {formatContent(post.body)}
        </div>

        <div className="mt-16 pt-16 border-t border-white/10 text-center">
           <button 
             onClick={onBack}
             className="px-8 py-4 border border-brand-accent/30 text-brand-accent font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-black transition-all duration-300"
           >
             Return to Blog
           </button>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
