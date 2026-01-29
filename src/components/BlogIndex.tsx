import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const BlogIndex = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, "posts"), 
          where("status", "==", "Published"), // نجلب المنشور فقط
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="min-h-screen bg-brand-bg pt-40 text-center text-brand-accent animate-pulse uppercase tracking-[0.3em]">Loading Insights...</div>;

  return (
    <div className="min-h-screen bg-brand-bg pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic">The Namelyx <span className="text-brand-accent">Blog</span></h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col justify-between hover:border-brand-accent/30 transition-all group">
              <div>
                <span className="text-[10px] text-brand-accent font-bold mb-4 block uppercase tracking-widest">{post.category}</span>
                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-accent transition-colors leading-tight">{post.title}</h2>
                <p className="text-gray-400 text-sm font-light leading-relaxed line-clamp-3 mb-8">
                  {post.content.replace(/<[^>]*>/g, '')} {/* حذف وسوم HTML للمعاينة فقط */}
                </p>
              </div>
              <Link to={`/blog/${post.id}`} className="text-[10px] font-bold text-white uppercase tracking-[0.2em] flex items-center gap-2 hover:text-brand-accent transition-colors">
                Read Article <span className="text-lg">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogIndex;