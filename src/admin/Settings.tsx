import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [analyticsCode, setAnalyticsCode] = useState('');
  const [adsenseCode, setAdsenseCode] = useState('');
  const [searchConsoleCode, setSearchConsoleCode] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => { if (!user) navigate('/admin/login'); });

    const fetchSettings = async () => {
      const docSnap = await getDoc(doc(db, "settings", "global"));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setAnalyticsCode(data.analytics || '');
        setAdsenseCode(data.adsense || '');
        setSearchConsoleCode(data.searchConsole || '');
      }
    };
    fetchSettings();
  }, [navigate]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, "settings", "global"), {
        analytics: analyticsCode,
        adsense: adsenseCode,
        searchConsole: searchConsoleCode,
        updatedAt: new Date()
      });
      alert("✅ تم حفظ الإعدادات بنجاح، ستعمل الأكواد في الموقع فوراً.");
    } catch (error) {
      alert("حدث خطأ أثناء الحفظ");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-32 px-4 text-white">
      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 p-8 rounded-2xl">
        <h2 className="text-3xl font-black mb-8 text-brand-accent uppercase italic">SEO & Script Manager</h2>
        
        <div className="space-y-8">
          {/* Google Analytics */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-3 text-gray-400">Google Analytics (Header Script)</label>
            <textarea 
              value={analyticsCode} onChange={e => setAnalyticsCode(e.target.value)}
              className="w-full bg-black border border-white/20 p-4 rounded-lg focus:border-brand-accent outline-none font-mono text-sm h-32"
              placeholder=""
            />
          </div>

          {/* Google AdSense */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-3 text-gray-400">Google AdSense Code</label>
            <textarea 
              value={adsenseCode} onChange={e => setAdsenseCode(e.target.value)}
              className="w-full bg-black border border-white/20 p-4 rounded-lg focus:border-brand-accent outline-none font-mono text-sm h-32"
              placeholder=""
            />
          </div>

          {/* Search Console / Meta Tags */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-3 text-gray-400">Verification Tags (Bing/Google Console)</label>
            <textarea 
              value={searchConsoleCode} onChange={e => setSearchConsoleCode(e.target.value)}
              className="w-full bg-black border border-white/20 p-4 rounded-lg focus:border-brand-accent outline-none font-mono text-sm h-32"
              placeholder="<meta name='google-site-verification' content='...' />"
            />
          </div>

          <button 
            onClick={handleSave} disabled={isSaving}
            className="w-full bg-brand-accent text-black py-4 font-bold uppercase hover:bg-green-400 transition-all"
          >
            {isSaving ? 'Saving Configuration...' : 'Save & Deploy Scripts'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;