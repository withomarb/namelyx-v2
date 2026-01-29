import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [domains, setDomains] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate('/admin/login');
    });

    const fetchDomains = async () => {
      try {
        const q = query(collection(db, "domains"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        setDomains(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching domains:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDomains();
    return () => unsubscribe();
  }, [navigate]);

  const handleDelete = async (id: string) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الدومين؟")) {
      await deleteDoc(doc(db, "domains", id));
      setDomains(domains.filter(d => d.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-32 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black tracking-tighter italic">COMMAND CENTER</h1>
          <Link to="/admin/add" className="bg-brand-accent text-black px-6 py-2 font-bold hover:bg-green-400 transition-all">
            + ADD NEW DOMAIN
          </Link>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/10 text-brand-accent uppercase text-xs tracking-widest">
                <th className="p-4">Domain Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {domains.map((domain) => (
                <tr key={domain.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold">{domain.name}</td>
                  <td className="p-4 opacity-70">${domain.price}</td>
                  <td className="p-4 text-xs">
                    <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded-full border border-green-500/20">
                      {domain.status}
                    </span>
                  </td>
                  {/* هنا قمنا بتحديث خلية الأزرار لتشمل التعديل */}
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-6">
                      <Link 
                        to={`/admin/edit/${domain.id}`} 
                        className="text-brand-accent hover:text-white text-sm font-bold uppercase transition-colors"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(domain.id)}
                        className="text-red-500 hover:text-red-400 text-sm font-bold uppercase transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <div className="p-10 text-center animate-pulse">Loading data...</div>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;