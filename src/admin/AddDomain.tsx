import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const AddDomain = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "domains"), {
        name: name,
        price: price,
        status: "Available",
        createdAt: new Date()
      });
      alert("تم إضافة الدومين بنجاح!");
      setName(''); setPrice('');
    } catch (e) {
      console.error("خطأ في الإضافة: ", e);
    }
  };

  return (
    <div className="pt-40 text-white max-w-md mx-auto">
      <h2 className="text-2xl mb-6">إضافة دومين جديد</h2>
      <form onSubmit={handleAdd} className="flex flex-col gap-4 text-black">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="اسم الدومين" className="p-2" />
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="السعر" className="p-2" />
        <button type="submit" className="bg-brand-accent p-2 font-bold">حفظ في Firebase</button>
      </form>
    </div>
  );
};

export default AddDomain;