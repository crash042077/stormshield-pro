import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { 
  CheckCircle2, ClipboardCheck, LayoutDashboard, Settings, 
  Printer, Zap, Check, ArrowRight, Loader2, ShieldCheck, AlertCircle 
} from 'lucide-react';

// --- INITIALIZATION ---
let firebaseConfig = { apiKey: "placeholder" };
try { if (typeof __firebase_config !== 'undefined' && __firebase_config) { firebaseConfig = JSON.parse(__firebase_config); } } catch (e) {}
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const App = () => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('landing'); 
  const [loading, setLoading] = useState(true);
  const [activeDoc, setActiveDoc] = useState(null);
  const [userProfile, setUserProfile] = useState({
    companyName: 'StormShield Pro User',
    licenseNum: 'MN-PENDING',
    companyAddress: 'Waverly, MN',
  });

  const checklistItems = [
    { id: 1, text: "MN Statutory Warranty (Chapter 327A)" },
    { id: 2, text: "MN 3-Day Notice of Cancellation (Duplicate)" },
    { id: 3, text: "Boldface Signature Warning (MN 325G.08)" },
    { id: 4, text: "Lead Warning Statement (EPA/MN)" },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- THE MINNESOTA LEGAL VAULT ---
  const templates = {
    "Boldface Signature Warning (MN 325G.08)": `
      MANDATORY MN STATUTE 325G.08 DISCLOSURE
      (Must be in 10-point Bold Type near Signature)
      
      "You, the buyer, may cancel this purchase at any time prior to 
      midnight of the third business day after the date of this purchase. 
      See attached notice of cancellation form for an explanation of this right."
    `,
    "MN 3-Day Notice of Cancellation (Duplicate)": `
      NOTICE OF CANCELLATION (MN STATUTE 325G.08)
      (Required to be provided in DUPLICATE)
      
      Date of Transaction: __________
      
      You may CANCEL this transaction, without any penalty or obligation, 
      within THREE BUSINESS DAYS from the above date.
      
      If you cancel, any property traded in, any payments made by you 
      under the contract or sale, and any negotiable instrument executed 
      by you will be returned within TEN BUSINESS DAYS...
    `,
    "MN Statutory Warranty (Chapter 327A)": `
      STATUTORY WARRANTIES (MN CHAPTER 327A)
      
      1 YEAR: The dwelling shall be free from defects caused by faulty 
      workmanship and defective materials.
      
      2 YEARS: The dwelling shall be free from defects caused by faulty 
      installation of plumbing, electrical, heating, and cooling systems.
      
      10 YEARS: The dwelling shall be free from major structural defects.
    `,
    "Lead Warning Statement (EPA/MN)": `
      EPA LEAD WARNING STATEMENT (PRE-1978 HOUSING)
      
      Housing built before 1978 may contain lead-based paint. Lead from 
      paint, paint chips, and dust can pose health hazards if not managed 
      properly. Contractors performing RRP projects in pre-1978 homes 
      must be lead-safe certified.
    `
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  const DocumentModal = () => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl p-8 shadow-2xl border border-slate-100 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <ShieldCheck className="text-blue-600" size={32} />
          <button onClick={() => setActiveDoc(null)} className="text-slate-400 font-black">✕ CLOSE</button>
        </div>
        <h2 className="text-2xl font-black mb-4">{activeDoc}</h2>
        <div className="bg-slate-50 p-6 rounded-3xl font-mono text-sm border border-slate-200 whitespace-pre-wrap leading-relaxed">
          <p className="font-black uppercase mb-4 text-blue-800">{userProfile.companyName} | LIC# {userProfile.licenseNum}</p>
          {templates[activeDoc] || "MN Standard Statutory Language Applied."}
        </div>
        <button onClick={() => window.print()} className="mt-8 w-full bg-slate-900 text-white py-5 rounded-3xl font-black text-xl flex items-center justify-center gap-3">
          <Printer size={20} /> Print Full Packet
        </button>
      </div>
    </div>
  );

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        {activeDoc && <DocumentModal />}
        <aside className="w-64 bg-slate-900 text-white p-8 hidden md:flex flex-col">
          <div className="text-2xl font-black mb-12 flex items-center gap-2"><Zap className="text-blue-500 fill-blue-500" /> ShieldPro</div>
          <nav className="space-y-4 flex-1">
            <button onClick={() => setView('dashboard')} className="flex items-center gap-3 w-full p-4 bg-blue-600 rounded-2xl font-black shadow-lg shadow-blue-900/40 transition">Dashboard</button>
            <button onClick={() => setView('settings')} className="flex items-center gap-3 w-full p-4 text-slate-400 font-bold hover:text-white transition">Settings</button>
          </nav>
        </aside>
        <main className="flex-1 p-8 md:p-16">
          <h1 className="text-4xl font-black mb-2 tracking-tighter">{userProfile.companyName} Dashboard</h1>
          <p className="text-slate-400 font-bold mb-12 uppercase tracking-widest text-xs">MN Compliance HQ</p>
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
            <div className="flex items-center gap-3 mb-8 text-amber-500"><AlertCircle /> <span className="font-black text-xs uppercase tracking-widest">Required Signing Documents</span></div>
            <div className="space-y-4">
              {checklistItems.map(item => (
                <div key={item.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-blue-200 transition">
                  <span className="font-black text-slate-700 tracking-tight">{item.text}</span>
                  <button onClick={() => setActiveDoc(item.text)} className="bg-white px-6 py-3 rounded-2xl text-[10px] font-black text-blue-600 border border-blue-100 shadow-sm hover:bg-blue-600 hover:text-white transition-all">VIEW TEMPLATE</button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (view === 'settings') {
    return (
      <div className="min-h-screen bg-white p-12 max-w-2xl mx-auto flex flex-col justify-center">
        <h1 className="text-5xl font-black mb-4 tracking-tighter">Your Identity</h1>
        <p className="text-slate-500 mb-12 font-medium">Update these fields to brand your legal documents.</p>
        <div className="space-y-6">
          <input type="text" value={userProfile.companyName} onChange={(e) => setUserProfile({...userProfile, companyName: e.target.value})} className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl font-black" placeholder="Company Name" />
          <input type="text" value={userProfile.licenseNum} onChange={(e) => setUserProfile({...userProfile, licenseNum: e.target.value})} className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl font-black" placeholder="MN License #" />
          <button onClick={() => setView('dashboard')} className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black text-2xl shadow-2xl shadow-blue-200">Update HQ</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-slate-900 text-white">
      <Zap className="text-blue-500 mb-8" size={80} />
      <h1 className="text-7xl font-black mb-4 tracking-tighter">ShieldPro</h1>
      <p className="text-xl text-slate-400 mb-12 max-w-lg font-medium italic">Minnesota's smartest restoration sales engine.</p>
      <button onClick={() => setView('dashboard')} className="bg-blue-600 text-white px-16 py-7 rounded-full font-black text-2xl shadow-2xl shadow-blue-500/20 flex items-center gap-4 hover:scale-105 transition">ENTER YOUR HQ <ArrowRight /></button>
    </div>
  );
};

export default App;
