import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const ManagePosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => { if (!user) navigate('/admin/login'); });

    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchPosts();
  }, [navigate]);

  const handleDelete = async (id: string) => {
    if (window.confirm("حذف المقال قد يؤثر على الأرشفة في جوجل، هل أنت متأكد؟")) {
      await deleteDoc(doc(db, "posts", id));
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-32 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black tracking-tighter italic uppercase">Blog Manager</h1>
          <Link to="/admin/add-post" className="bg-brand-accent text-black px-6 py-2 font-bold hover:bg-green-400 transition-all">+ Write New Post</Link>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/10 text-brand-accent uppercase text-xs tracking-widest">
                <th className="p-4">Title</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold truncate max-w-[300px]">{post.title}</td>
                  <td className="p-4">
                    <span className={`text-[10px] px-2 py-1 rounded border uppercase ${post.status === 'Published' ? 'border-brand-accent text-brand-accent bg-brand-accent/10' : 'border-white/20 text-white/40 bg-white/5'}`}>
                      {post.status || 'Published'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-6 items-center">
                      <Link to={`/admin/edit-post/${post.id}`} className="text-brand-accent hover:text-white text-sm font-bold uppercase">Edit</Link>
                      <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:text-red-400 text-sm font-bold uppercase">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <div className="p-20 text-center animate-pulse text-brand-accent">Loading...</div>}
        </div>
      </div>
    </div>
  );
};

export default ManagePosts;