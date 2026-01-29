import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      const docSnap = await getDoc(doc(db, "posts", id));
      if (docSnap.exists()) setPost(docSnap.data());
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-brand-bg pt-40 text-center text-white">Loading Article...</div>;
  if (!post) return <div className="min-h-screen bg-brand-bg pt-40 text-center text-white">Post not found.</div>;

  return (
    <div className="min-h-screen bg-brand-bg pt-40 pb-20 px-6">
      <article className="max-w-3xl mx-auto">
        <Link to="/blog" className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-8 inline-block">← Back to Blog</Link>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight uppercase italic tracking-tighter">{post.title}</h1>
        <div className="flex gap-4 mb-12 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          <span>{post.category}</span>
          <span>•</span>
          <span>{post.createdAt?.toDate().toLocaleDateString()}</span>
        </div>
        {/* عرض المحتوى بتنسيق HTML الذي حفظناه من المحرر */}
        <div 
          className="prose prose-invert prose-brand max-w-none text-gray-300 leading-relaxed blog-content-area"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
};

export default BlogPost;