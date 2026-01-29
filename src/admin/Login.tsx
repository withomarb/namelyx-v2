import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/add'); // التوجيه لصفحة الإضافة بعد النجاح
    } catch (err: any) {
      setError("خطأ في بيانات الدخول، حاول مجدداً.");
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
        <h2 className="text-3xl font-black text-white mb-6 text-center tracking-tighter">ADMIN LOGIN</h2>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full bg-black border border-white/20 p-3 text-white focus:border-brand-accent outline-none transition-all"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-black border border-white/20 p-3 text-white focus:border-brand-accent outline-none transition-all"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            type="submit" 
            className="w-full bg-brand-accent text-black font-bold py-3 hover:bg-green-400 transition-colors uppercase tracking-widest"
          >
            Enter Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;