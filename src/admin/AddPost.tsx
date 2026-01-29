import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Tech');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) navigate('/admin/login');
    });
  }, [navigate]);

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert("الرجاء إدخال العنوان والمحتوى");

    setLoading(true);
    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        category,
        author: auth.currentUser?.email,
        createdAt: serverTimestamp(),
      });
      alert("📝 تم نشر المقال بنجاح!");
      navigate('/admin'); // أو اذهب لصفحة إدارة المقالات
    } catch (error) {
      console.error("Error adding post:", error);
      alert("فشل في نشر المقال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-32 px-4 text-white">
      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-black mb-8 text-brand-accent uppercase tracking-tighter italic">Create New Article</h2>
        <form onSubmit={handleAddPost} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 opacity-50 uppercase tracking-widest">Post Title</label>
            <input 
              value={title} onChange={e => setTitle(e.target.value)}
              className="w-full bg-black border border-white/20 p-4 rounded-lg focus:border-brand-accent outline-none text-xl font-bold"
              placeholder="Enter a catchy title..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 opacity-50 uppercase tracking-widest">Category</label>
            <select 
              value={category} onChange={e => setCategory(e.target.value)}
              className="w-full bg-black border border-white/20 p-4 rounded-lg focus:border-brand-accent outline-none"
            >
              <option value="Tech">Technology</option>
              <option value="AI">Artificial Intelligence</option>
              <option value="Domains">Domain Industry</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 opacity-50 uppercase tracking-widest">Content</label>
            <textarea 
              value={content} onChange={e => setContent(e.target.value)}
              className="w-full bg-black border border-white/20 p-4 rounded-lg focus:border-brand-accent outline-none min-h-[300px] leading-relaxed"
              placeholder="Write your thoughts here..."
            />
          </div>

          <button 
            type="submit" disabled={loading}
            className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest transition-all ${loading ? 'bg-gray-600' : 'bg-brand-accent text-black hover:scale-[1.01] shadow-lg shadow-brand-accent/10'}`}
          >
            {loading ? 'Publishing...' : 'Publish Article'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;