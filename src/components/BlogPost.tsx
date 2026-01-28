import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from './Icons';
import { getAllBlogPosts } from '../utils/content';

interface BlogPostData {
  title: string;
  date: string;
  slug: string;
  author: string;
  body: string;
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>(); // جلب الـ slug من الرابط تلقائياً
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
        try {
            if (!slug) return;
            const posts = await getAllBlogPosts();
            const found = posts.find(p => p.slug === slug);
            if (found) {
                setPost({ ...found.attributes, body: found.body, slug: found.slug });
            }
        } catch(e) {
            console.error("Error loading blog post:", e);
        } finally {
            setLoading(false);
        }
    };
    loadPost();
  }, [slug]);

  const handleBack = () => navigate('/blog');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg text-brand-accent font-mono uppercase tracking-widest text-sm">
        Loading Article...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-bg text-white gap-6">
        <h2 className="text-2xl font-light">Post not found</h2>
        <button onClick={handleBack} className="text-brand-accent underline hover:text-white transition-colors">
          Return to Blog
        </button>
      </div>
    );
  }

  const formatContent = (text: string) => {
    if (!text) return null;
    return text.split('\n\n').map((paragraph, idx) => {
      if (paragraph.startsWith('### ')) {
        return <h3 key={idx} className="text-2xl font-bold text-white mt-8 mb-4">{paragraph.replace('### ', '')}</h3>;
      }
      if (paragraph.startsWith('## ')) {
        return <h2 key={idx} className="text-3xl font-bold text-white mt-10 mb-6">{paragraph.replace('## ', '')}</h2>;
      }
      
      const parts = paragraph.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className="text-lg text-gray-400 leading-loose mb-6 font-light">
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
    <article className="min-h-screen pt-32 pb-24 bg-brand-bg relative">
      <div className="max-w-3xl mx-auto px-6 relative z-10 animate-fade-in">
        
        <button 
          onClick={handleBack}
          className="group flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-12 hover:text-brand-accent transition-colors"
        >
          <ArrowRightIcon className="w-3 h-3 rotate-180" /> Return to Blog
        </button>

        <header className="mb-12 border-b border-white/10 pb-12">
          <div className="flex items-center gap-4 text-xs font-mono text-brand-accent mb-6 uppercase tracking-widest">
            <span>{post.date && new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span>By {post.author}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
            {post.title}
          </h1>
        </header>

        <div className="prose prose-invert max-w-none">
          {formatContent(post.body)}
        </div>

        <div className="mt-20 pt-16 border-t border-white/10 text-center">
           <button 
             onClick={handleBack}
             className="px-10 py-4 border border-brand-accent/30 text-brand-accent font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-black transition-all duration-300"
           >
             Return to Blog
           </button>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;