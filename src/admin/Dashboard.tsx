import React, { useEffect } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => { if (!user) navigate('/admin/login'); });
  }, [navigate]);

  const menuItems = [
    { title: "Manage Domains", desc: "Add, Edit or Delete Portfolio items", link: "/admin", icon: "🌐", color: "bg-blue-500/10" },
    { title: "Blog Manager", desc: "Write articles & manage drafts", link: "/admin/posts", icon: "✍️", color: "bg-green-500/10" },
    { title: "SEO & Scripts", desc: "Google Analytics, Adsense & Meta", link: "/admin/settings", icon: "🚀", color: "bg-brand-accent/10" },
  ];

  return (
    <div className="min-h-screen bg-brand-bg pt-32 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h1 className="text-6xl font-black italic uppercase tracking-tighter">Command <span className="text-brand-accent">Center</span></h1>
            <p className="text-gray-500 mt-2 uppercase text-xs tracking-[0.3em]">Namelyx Administrative Portal</p>
          </div>
          <button onClick={() => signOut(auth)} className="text-[10px] font-bold border border-red-500/30 text-red-500 px-4 py-2 hover:bg-red-500 hover:text-white transition-all">LOGOUT</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.link} className={`group p-10 rounded-3xl border border-white/10 transition-all hover:border-brand-accent/50 ${item.color}`}>
              <div className="text-4xl mb-6">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-brand-accent transition-colors">{item.title}</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">{item.desc}</p>
              <div className="mt-8 text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-white transition-colors">Enter Section →</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;