import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const ManageDomains = () => {
  const [domains, setDomains] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => { if (!user) navigate('/admin/login'); });

    const fetchDomains = async () => {
      const querySnapshot = await getDocs(collection(db, "domains"));
      setDomains(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchDomains();
  }, [navigate]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this domain?")) {
      await deleteDoc(doc(db, "domains", id));
      setDomains(domains.filter(d => d.id !== id));
    }
  };

  if (loading) return <div className="pt-40 text-center text-white uppercase tracking-widest animate-pulse">Loading Inventory...</div>;

  return (
    <div className="min-h-screen bg-brand-bg pt-32 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <Link to="/admin" className="text-brand-accent text-[10px] font-bold uppercase tracking-widest">← Back to Command Center</Link>
          <Link to="/admin/add" className="bg-brand-accent text-black px-6 py-2 font-bold uppercase text-[10px]">Add New Domain</Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-gray-500">
                <th className="py-4">Domain Name</th>
                <th className="py-4">Extension</th>
                <th className="py-4">Price</th>
                <th className="py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {domains.map((domain) => (
                <tr key={domain.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 font-bold text-xl tracking-tighter">{domain.name}</td>
                  <td className="py-6 text-brand-accent font-mono">.{domain.extension}</td>
                  <td className="py-6 text-gray-400">${domain.price}</td>
                  <td className="py-6 space-x-4">
                    <Link to={`/admin/edit/${domain.id}`} className="text-xs font-bold hover:text-brand-accent">EDIT</Link>
                    <button onClick={() => handleDelete(domain.id)} className="text-xs font-bold text-red-500 hover:text-red-400">DELETE</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageDomains;