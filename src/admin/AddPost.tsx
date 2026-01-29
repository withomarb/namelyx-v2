import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { db, auth } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Tech');
  const [isPublishing, setIsPublishing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate('/admin/login');
    });
    return () => unsubscribe();
  }, [navigate]);

  // --- دالة إنشاء الرابط الصديق (Slug) المضافة ---
  const createSlug = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')           // استبدال المسافات بشرطات
      .replace(/[^\w\u0621-\u064A-]+/g, '') // دعم الحروف العربية والإنجليزية وحذف الرموز
      .replace(/--+/g, '-');          // منع تكرار الشرطات
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const handleSave = async (status: 'Published' | 'Draft') => {
    if (!title || !content) return alert("الرجاء إدخال العنوان والمحتوى");
    
    setIsPublishing(true);
    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        category,
        status, 
        slug: createSlug(title), // السطر الجديد لحفظ الرابط الصديق
        createdAt: serverTimestamp(),
      });
      alert(status === 'Published' ? "🚀 تم النشر بنجاح!" : "📁 تم الحفظ في المسودات بنجاح");
      navigate('/admin/posts');
    } catch (error) {
      console.error(error);
      alert("فشل في العملية");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-32 px-4 text-white">
      <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 p-8 rounded-2xl">
        <h2 className="text-3xl font-black mb-8 text-brand-accent uppercase italic">Create Content</h2>
        
        <div className="space-y-6">
          <input 
            value={title} onChange={e => setTitle(e.target.value)}
            className="w-full bg-black border border-white/20 p-4 rounded-lg focus:border-brand-accent outline-none text-2xl"
            placeholder="Article Title..."
          />
          
          <div className="bg-white rounded-lg text-black overflow-hidden min-h-[400px]">
            <ReactQuill 
              theme="snow" value={content} onChange={setContent} modules={modules}
              className="h-[350px]" placeholder="Write your SEO-friendly content here..."
            />
          </div>

          <div className="flex gap-4 pt-8">
            <button 
              onClick={() => handleSave('Published')} disabled={isPublishing}
              className="flex-1 bg-brand-accent text-black py-4 font-bold uppercase hover:bg-green-400 transition-all"
            >
              {isPublishing ? 'Publishing...' : 'Publish Now'}
            </button>
            <button 
              onClick={() => handleSave('Draft')} disabled={isPublishing}
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

export default AddPost;