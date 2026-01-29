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
    // مراقبة حالة تسجيل الدخول
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate('/admin/login');
    });

    const fetchDomains = async () => {
      try {
        const q = query(collection(db, "domains"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDomains(data);
      } catch (error) {
        console.error("Firebase Error:", error);
      } finally {
        setLoading(false); // نوقف التحميل حتى لو فشل الجلب لكي لا تعلق الصفحة
      }
    };

    fetchDomains();
    return () => unsubscribe();
  }, [navigate]);

  const handleDelete = async (id: string) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الدومين؟")) {
      try {
        await deleteDoc(doc(db, "domains", id));
        setDomains(domains.filter(d => d.id !== id));
      } catch (e) {
        alert("فشل الحذف، تأكد من صلاحيات Firestore");
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-32 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black tracking-tighter italic uppercase">Command Center</h1>
          <Link to="/admin/add" className="bg-brand-accent text-black px-6 py-2 font-bold hover:bg-green-400 transition-all">
            + Add New Domain
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
                  <td className="p-4">
                    <span 
                    className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase ${
                    domain.status === 'Review' 
                    ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/10' 
                    : domain.status === 'Sold'
                    ? 'bg-red-500/20 text-red-500 border-red-500/10'
                    : 'bg-brand-accent/20 text-brand-accent border-brand-accent/10'
                    }`}>
                    {domain.status === 'Review' ? 'OFFER RECEIVED' : domain.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-6 items-center">
                      <Link 
                        to={`/admin/edit/${domain.id}`} 
                        className="text-brand-accent hover:text-white text-sm font-bold uppercase transition-colors"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(domain.id)}
                        className="text-red-500 hover:text-red-400 text-sm font-bold uppercase"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {loading && (
            <div className="p-20 text-center animate-pulse text-brand-accent tracking-widest text-sm uppercase">
              Fetching inventory...
            </div>
          )}
          
          {!loading && domains.length === 0 && (
            <div className="p-20 text-center text-white/40 text-sm uppercase">
              No domains found in database.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;