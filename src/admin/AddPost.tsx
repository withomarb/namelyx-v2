import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // استيراد التنسيق
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Tech');
  const navigate = useNavigate();

  // إعدادات شريط الأدوات الخاص بالـ SEO
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline','blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const handlePublish = async () => {
    try {
      await addDoc(collection(db, "posts"), {
        title,
        content, // سيتم حفظه كـ HTML (H1, H2, P...)
        category,
        createdAt: serverTimestamp(),
      });
      alert("✅ المقال جاهز للنشر!");
      navigate('/admin/posts');
    } catch (e) { alert("خطأ في النشر"); }
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-32 px-4 text-white">
      <div className="max-w-5xl mx-auto space-y-6">
        <input 
          value={title} onChange={e => setTitle(e.target.value)}
          className="w-full bg-transparent text-4xl font-black outline-none border-b border-white/10 pb-4 focus:border-brand-accent transition-all"
          placeholder="Title of your tech article..."
        />
        
        <div className="bg-white rounded-lg text-black overflow-hidden">
          <ReactQuill 
            theme="snow" 
            value={content} 
            onChange={setContent} 
            modules={modules}
            placeholder="Start writing your SEO-friendly content..."
            className="h-[400px] mb-12"
          />
        </div>

        <button onClick={handlePublish} className="bg-brand-accent text-black px-10 py-4 font-bold uppercase tracking-widest hover:scale-105 transition-all">
          Publish to Namelyx Blog
        </button>
      </div>
    </div>
  );
};

export default AddPost;