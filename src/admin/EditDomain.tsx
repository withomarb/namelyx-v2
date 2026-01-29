import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const EditDomain = () => {
  const { id } = useParams(); // الحصول على ID الدومين من الرابط
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    status: 'Available'
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => { if (!user) navigate('/admin/login'); });

    const fetchDomain = async () => {
      if (!id) return;
      const docRef = doc(db, "domains", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data() as any);
      }
      setLoading(false);
    };
    fetchDomain();
  }, [id, navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      const docRef = doc(db, "domains", id);
      await updateDoc(docRef, formData);
      alert("✅ تم تحديث البيانات بنجاح!");
      navigate('/admin'); // العودة للوحة التحكم
    } catch (error) {
      alert("خطأ في التحديث");
    }
  };

  if (loading) return <div className="pt-40 text-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-brand-bg pt-32 px-4 text-white">
      <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 p-8 rounded-2xl">
        <h2 className="text-2xl font-black mb-8 text-brand-accent uppercase">Edit Domain Assets</h2>
        <form onSubmit={handleUpdate} className="space-y-6">
          <input 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full bg-black border border-white/20 p-4 rounded-lg outline-none focus:border-brand-accent"
            placeholder="Domain Name"
          />
          <input 
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full bg-black border border-white/20 p-4 rounded-lg outline-none focus:border-brand-accent"
            placeholder="Description"
          />
          <input 
            value={formData.price} 
            onChange={e => setFormData({...formData, price: e.target.value})}
            className="w-full bg-black border border-white/20 p-4 rounded-lg outline-none focus:border-brand-accent"
            placeholder="Price"
          />
          <select 
            value={formData.status}
            onChange={e => setFormData({...formData, status: e.target.value})}
            className="w-full bg-black border border-white/20 p-4 rounded-lg outline-none focus:border-brand-accent text-white"
          >
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Pending">Pending</option>
            <option value="Hidden">Hidden</option>
          </select>
          <button type="submit" className="w-full py-4 bg-brand-accent text-black font-bold uppercase hover:bg-green-400 transition-all">
            Update Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDomain;