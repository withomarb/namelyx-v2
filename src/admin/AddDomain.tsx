import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AddDomain = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // التأكد من أن المستخدم مسجل دخوله فعلياً
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate('/admin/login');
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return alert("الرجاء ملء كافة الحقول");
    
    setLoading(true);
    try {
      await addDoc(collection(db, "domains"), {
        name,
        price,
        status: "Available",
        createdAt: serverTimestamp(),
      });
      alert("🚀 تم حفظ الدومين بنجاح في قاعدة البيانات!");
      setName(''); setPrice('');
    } catch (error) {
      console.error("خطأ:", error);
      alert("فشل في الحفظ، تأكد من إعدادات Firestore Rules");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-32 px-4 text-white">
      <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-black mb-8 text-brand-accent uppercase tracking-tighter">Add Premium Domain</h2>
        <form onSubmit={handleAdd} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 opacity-50">Domain Name (e.g. AI-Expert.com)</label>
            <input 
              value={name} onChange={e => setName(e.target.value)}
              className="w-full bg-black border border-white/20 p-4 rounded-lg focus:border-brand-accent outline-none"
              placeholder="Enter domain name..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 opacity-50">Price (USD)</label>
            <input 
              value={price} onChange={e => setPrice(e.target.value)}
              className="w-full bg-black border border-white/20 p-4 rounded-lg focus:border-brand-accent outline-none"
              placeholder="e.g. 2500"
            />
          </div>
          <button 
            type="submit" disabled={loading}
            className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest transition-all ${loading ? 'bg-gray-600' : 'bg-brand-accent text-black hover:scale-[1.02]'}`}
          >
            {loading ? 'Saving to Cloud...' : 'Add to Inventory'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDomain;