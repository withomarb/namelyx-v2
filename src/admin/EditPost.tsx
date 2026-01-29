import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { db, auth } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Tech');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) navigate('/admin/login');
    });

    const fetchPost = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setContent(data.content);
          setCategory(data.category || 'Tech');
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  // --- دالة إنشاء الرابط الصديق (Slug) المضافة لضمان التزامن عند التعديل ---
  const createSlug = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u0621-\u064A-]+/g, '')
      .replace(/--+/g, '-');
  };

  const handleUpdate = async (status: 'Published' | 'Draft') => {
    if (!id) return;
    try {
      const docRef = doc(db, "posts", id);
      await updateDoc(docRef, {
        title,
        content,
        category,
        status,
        slug: createSlug(title), // تحديث الرابط الصديق بناءً على العنوان الجديد
        updatedAt: new Date()
      });
      alert("✅ تم تحديث المقال بنجاح!");
      navigate('/admin/posts');
    } catch (error) {
      alert("حدث خطأ أثناء التحديث");
    }
  };

  if (loading) return <div className="pt-40 text-center text-white animate-pulse uppercase tracking-widest">Loading Post Content...</div>;

  return (
    <div className="min-h-screen bg-brand-bg pt-32 px-4 text-white">
      <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 p-8 rounded-2xl">
        <h2 className="text-3xl font-black mb-8 text-brand-accent uppercase italic">Edit Article</h2>
        
        <div className="space-y-6">
          <input 
            value={title} onChange={e => setTitle(e.target.value)}
            className="w-full bg-black border border-white/20 p-4 rounded-lg focus:border-brand-accent outline-none text-2xl font-bold"
            placeholder="Title"
          />
          
          <div className="bg-white rounded-lg text-black overflow-hidden">
            <ReactQuill 
              theme="snow" value={content} onChange={setContent}
              className="h-[400px] mb-12"
            />
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => handleUpdate('Published')}
              className="flex-1 bg-brand-accent text-black py-4 font-bold uppercase hover:bg-green-400 transition-all"
            >
              Update & Publish
            </button>
            <button 
              onClick={() => handleUpdate('Draft')}
              className="flex-1 bg-white/10 text-white py-4 font-bold uppercase hover:bg-white/20 transition-all"
            >
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;