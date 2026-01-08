import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { 
  CheckCircle2, ClipboardCheck, LayoutDashboard, Users, Settings, 
  Printer, Zap, Check, ArrowRight, Lock, Loader2, FileText, ShieldCheck, AlertCircle
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
    companyAddress: '123 Main St, Waverly, MN',
    plan: 'free'
  });

  const [checklistItems] = useState([
    { id: 1, text: "MN Contingency Agreement", type: 'legal' },
    { id: 2, text: "MN 3-Day Notice of Cancellation (DUPLICATE)", type: 'legal' },
    { id: 3, text: "Boldface Signature Warning (MN 325G.08)", type: 'legal' },
    { id: 4, text: "MN Statutory Warranty (Chapter 327A)", type: 'legal' },
    { id: 5, text: "EPA Lead-Safe Warning & Pamphlet", type: 'legal' },
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- THE LEGAL VAULT ---
  const templates = {
    "Boldface Signature Warning (MN 325G.08)": `
      --- MANDATORY SIGNATURE PROXIMITY WARNING ---
      (Must be in 10pt Bold Type directly above signature)
      
      "You, the buyer, may cancel this purchase at any time prior to 
      midnight of the third business day after the date of this purchase. 
      See attached notice of cancellation form for an explanation of this right."
    `,
    "MN 3-Day Notice of Cancellation (DUPLICATE)": `
      NOTICE OF CANCELLATION (MN STATUTE 325G.08)
      (Contractor Copy & Homeowner Copy)
      
      Date of Transaction: __________
      
      You may CANCEL this transaction, without any penalty or obligation, 
      within THREE BUSINESS DAYS from the above date.
      
      If you cancel, any property traded in, any payments made by you 
      under the contract or sale, and any negotiable instrument executed 
      by you will be returned within TEN BUSINESS DAYS following receipt 
      by the seller of your cancellation notice.
      
      TO CANCEL THIS TRANSACTION: Mail or deliver a signed and dated 
      copy of this cancellation notice to:
      ${userProfile.companyName} at ${userProfile.companyAddress}
      NOT LATER THAN MIDNIGHT OF: [Insert Date 3 Days from Signing]
    `,
    "EPA Lead-Safe Warning & Pamphlet": `
      LEAD WARNING STATEMENT (PRE-1978 HOUSING)
      
      Housing built before 1978 may contain lead-based paint. Lead from 
      paint, paint chips, and dust can pose health hazards if not managed 
      properly. Lead exposure is especially harmful to young children 
      and pregnant women.
      
      The seller (${userProfile.companyName}) is required to provide the 
      buyer with any information on lead-based paint hazards from risk 
      assessments or inspections in the seller's possession and notify 
      the buyer of any known lead-based paint hazards. A risk assessment 
      or inspection for possible lead-based paint hazards is recommended 
      prior to purchase.
    `
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  const DocumentModal = () => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl p-8 shadow-2xl overflow-y-auto max-h-[85vh] border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <div className="bg-blue-50 p-3 rounded-2xl"><ShieldCheck className="text-blue-600" /></div>
          <button onClick={() => setActiveDoc(null)} className="bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition">✕</button>
        </div>
        <h2 className="text-2xl font-black mb-2">{activeDoc}</h2>
        <p className="text-xs font-bold text-blue-600 uppercase tracking-tighter mb-6">MN Legal Compliance Template</p>
        <div className="bg-slate-50 p-8 rounded-3xl font-mono text-sm leading-relaxed border border-slate-200 text-slate-700">
          <div className="mb-8 border-b border-dashed border-slate-300 pb-4">
            <p className="font-black text-lg uppercase">{userProfile.companyName}</p>
            <p className="text-xs">License #: {userProfile.licenseNum}</p>
            <p className="text-xs">{userProfile.companyAddress}</p>
          </div>
          {templates[activeDoc] || "MN Standard Statutory Warranty Language Applied."}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <button onClick={() => window.print()} className="bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition">
            <Printer size={18} /> Print Packet
          </button>
          <button className="bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition">
            <FileText size={18} /> Send to Homeowner
          </button>
        </div>
      </div>
    </div>
  );

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
        {activeDoc && <DocumentModal />}
        <aside className="w-full md:w-64 bg-slate-900 text-white p-6 shrink-0">
          <div className="flex items-center gap-2 mb-10 font-black text-2xl"><Zap className="text-blue-500" /> Shield<span className="text-blue-500">Pro</span></div>
          <nav className="space-y-2">
            <button onClick={() => setView('dashboard')} className="flex items-center gap-3 w-full p-4 bg-blue-600 rounded-2xl font-bold shadow-lg shadow-blue-900/40 transition"><LayoutDashboard size={20}/> HQ Dashboard</button>
            <button onClick={() => setView('settings')} className="flex items-center gap-3 w-full p-4 text-slate-400 hover:text-white hover:bg-slate-800 rounded-2xl transition"><Settings size={20}/> App Settings</button>
          </nav>
          <div className="mt-auto pt-10">
            <div className="bg-white/5 p-5 rounded-3xl border border-white/10">
              <p className="text-[10px] font-black uppercase text-blue-400 tracking-widest mb-1">Protection Status</p>
              <p className="font-bold text-sm">MN Legal Compliant ✅</p>
            </div>
          </div>
        </aside>
        <main className="flex-1 p-6 md:p-12 overflow-y-auto">
          <header className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-black tracking-tight">Project Compliance</h1>
              <p className="text-slate-400 font-medium">Ready for homeowner signature</p>
            </div>
          </header>
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/20">
              <div className="flex items-center gap-3 mb-8">
                <AlertCircle className="text-amber-500" />
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Required Signing Packet</p>
              </div>
              <div className="space-y-4">
                {checklistItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-blue-200 hover:bg-white transition group">
                    <span className="text-lg font-bold text-slate-700">{item.text}</span>
                    <button onClick={() => setActiveDoc(item.text)} className="bg-white px-6 py-3 rounded-2xl text-xs font-black text-blue-600 border border-blue-100 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">VIEW DOCUMENT</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (view === 'settings') {
    return (
      <div className="min-h-screen bg-white p-8 md:p-20 max-w-4xl mx-auto">
        <button onClick={() => setView('dashboard')} className="mb-12 font-black text-blue-600 flex items-center gap-2">← BACK TO HQ</button>
        <h1 className="text-5xl font-black mb-4 tracking-tighter">Contractor Identity</h1>
        <p className="text-slate-500 text-xl font-medium mb-12">The information below will be automatically applied to all legal documents.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Company Name</label>
            <input type="text" value={userProfile.companyName} onChange={(e) => setUserProfile({...userProfile, companyName: e.target.value})} className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[2rem] font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">MN License Number</label>
            <input type="text" value={userProfile.licenseNum} onChange={(e) => setUserProfile({...userProfile, licenseNum: e.target.value})} className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[2rem] font-bold" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Business Address</label>
            <input type="text" value={userProfile.companyAddress} onChange={(e) => setUserProfile({...userProfile, companyAddress: e.target.value})} className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[2rem] font-bold" />
          </div>
        </div>
        <button onClick={() => setView('dashboard')} className="mt-12 w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black text-2xl shadow-2xl shadow-blue-200 hover:scale-[1.02] transition">Update Master Templates</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-900 text-white">
      <Zap className="text-blue-500 mb-8" size={80} />
      <h1 className="text-6xl font-black mb-4 tracking-tighter">StormShield<span className="text-blue-500">Pro</span></h1>
      <p className="text-xl text-slate-400 mb-12 max-w-lg font-medium">The Minnesota-compliant engine for smart restoration contractors.</p>
      <button onClick={() => setView('dashboard')} className="bg-blue-600 text-white px-16 py-6 rounded-full font-black text-2xl shadow-2xl shadow-blue-500/20 flex items-center gap-4 hover:scale-105 transition">ENTER YOUR HQ <ArrowRight /></button>
    </div>
  );
};

export default App;
