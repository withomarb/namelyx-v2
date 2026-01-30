import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc, collection, query, where, getDocs, limit } from 'firebase/firestore';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        // 1. البحث باستخدام الـ Slug للسيو
        const q = query(collection(db, "posts"), where("slug", "==", id), limit(1));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setPost(data);
          document.title = `${data.title} | Namelyx Journal`;
        } else {
          // 2. البحث باستخدام الـ ID كخيار احتياطي
          const docRef = doc(db, "posts", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setPost(data);
            document.title = `${data.title} | Namelyx Journal`;
          }
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-brand-bg pt-40 text-center text-brand-accent animate-pulse uppercase tracking-widest">Opening Article...</div>;
  if (!post) return <div className="min-h-screen bg-brand-bg pt-40 text-center text-white">Article not found.</div>;

  return (
    <div className="min-h-screen bg-brand-bg pt-40 pb-20 px-6">
      <article className="max-w-3xl mx-auto">
        <Link to="/blog" className="text-brand-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-12 inline-block hover:opacity-70 transition-opacity">
          ← Back to Journal
        </Link>

        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight uppercase italic tracking-tighter">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mb-12 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold border-y border-white/5 py-4">
          <span className="text-brand-accent">{post.category}</span>
          <span className="w-1 h-1 bg-white/20 rounded-full"></span>
          <span>{post.createdAt?.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>

        {/* التعديل القسري هنا: استخدام علامة التعجب (!) لفرض اللون الأخضر الفسفوري وكسر ستايلات المحرر */}
        <div 
          className="prose prose-invert prose-brand max-w-none text-gray-300 leading-relaxed text-lg 
                     [&_a]:!text-brand-accent [&_a]:!font-bold [&_a]:!no-underline hover:[&_a]:!text-white hover:[&_a]:!underline transition-all"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
};

export default BlogPost;