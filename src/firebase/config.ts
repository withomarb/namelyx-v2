import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxSi4llNK2VW2NfezyzIMXVZ5wZqK3Ozo",
  authDomain: "namelyxprj.firebaseapp.com",
  projectId: "namelyxprj",
  storageBucket: "namelyxprj.firebasestorage.app",
  messagingSenderId: "167858290916",
  appId: "1:167858290916:web:cd2c9943baed235d84ecf1"
};

// تشغيل Firebase
const app = initializeApp(firebaseConfig);

// تصدير الخدمات لاستخدامها في بقية الموقع
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;