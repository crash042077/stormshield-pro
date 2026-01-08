import React, { useState } from 'react';
import { 
  ShieldCheck, Printer, Zap, ArrowRight, AlertCircle, Info 
} from 'lucide-react';

const App = () => {
  const [view, setView] = useState('landing'); 
  const [activeDoc, setActiveDoc] = useState(null);
  const [userProfile, setUserProfile] = useState({
    companyName: 'StormShield Pro User',
    licenseNum: 'MN-PENDING',
  });

  const checklistItems = [
    { id: 1, text: "MN Statutory Warranty (Chapter 327A)" },
    { id: 2, text: "MN 3-Day Notice of Cancellation (Duplicate)" },
    { id: 3, text: "MN Pre-Lien Notice (Statute 514.011)" },
    { id: 4, text: "Insurance Fraud & Deductible (MN 325E.66)" },
    { id: 5, text: "Cancellation if Claim Denied (MN 326B.811)" },
    { id: 6, text: "Lead Warning Statement (EPA/MN)" },
  ];

  const templates = {
    "MN Statutory Warranty (Chapter 327A)": "STATUTORY WARRANTIES (MN CHAPTER 327A)\n\n1 YEAR: Faulty workmanship/materials.\n2 YEARS: Plumbing, electrical, heating, cooling.\n10 YEARS: Major structural defects.",
    "MN 3-Day Notice of Cancellation (Duplicate)": "NOTICE OF CANCELLATION (MN STATUTE 325G.08)\n\nYou may CANCEL this transaction without penalty within THREE BUSINESS DAYS.",
    "MN Pre-Lien Notice (Statute 514.011)": "NOTICE OF LIEN RIGHTS (MN STATUTE 514.011)\n\nANY PERSON SUPPLYING LABOR OR MATERIALS MAY FILE A LIEN AGAINST YOUR PROPERTY IF NOT PAID.",
    "Insurance Fraud & Deductible (MN 325E.66)": "MANDATORY MN STATUTE 325E.66 NOTICE:\n\nA residential contractor shall not advertise or promise to pay or rebate all or any portion of any applicable insurance deductible.",
    "Cancellation if Claim Denied (MN 326B.811)": "RIGHT TO CANCEL (MN STATUTE 326B.811)\n\nIf your insurance company denies the claim, you may cancel this contract within 72 hours of receiving the denial notice.",
    "Lead Warning Statement (EPA/MN)": "EPA LEAD WARNING STATEMENT\n\nHousing built before 1978 may contain lead-based paint."
  };

  const DocumentModal = () => (
    <div className="fixed inset-0 bg-slate-900/90 flex items-center justify-center p-4 z-50 backdrop-blur-md">
      <div className="bg-white rounded-[3rem] w-full max-w-2xl p-10 shadow-2xl border border-slate-100 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-8">
          <ShieldCheck className="text-blue-600" size={40} />
          <button onClick={() => setActiveDoc(null)} className="bg-slate-100 p-3 rounded-full text-slate-500 font-black">✕</button>
        </div>
        <h2 className="text-3xl font-black mb-6 text-slate-900 leading-tight">{activeDoc}</h2>
        <div className="bg-slate-50 p-8 rounded-[2rem] font-mono text-sm border border-slate-200 whitespace-pre-wrap leading-relaxed text-slate-700">
          <p className="font-black uppercase mb-6 text-blue-700 border-b border-blue-100 pb-4">{userProfile.companyName} | LIC# {userProfile.licenseNum}</p>
          {templates[activeDoc]}
        </div>
        <button onClick={() => window.print()} className="mt-10 w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
          <Printer size={24} /> Print For Homeowner
        </button>
      </div>
    </div>
  );

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6 md:p-12">
        {activeDoc && <DocumentModal />}
        <header className="max-w-4xl mx-auto flex justify-between items-center mb-12">
          <div className="flex items-center gap-2 text-2xl font-black italic tracking-tighter text-blue-400"><Zap fill="currentColor" /> ShieldPro</div>
          <button onClick={() => setView('landing')} className="text-xs font-bold uppercase tracking-widest text-slate-500">Sign Out</button>
        </header>
        <main className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black mb-2 tracking-tighter">HQ Dashboard</h1>
          <p className="text-blue-400 font-bold mb-10 text-sm uppercase tracking-widest">{userProfile.companyName}</p>
          <div className="grid gap-4">
            {checklistItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-8 bg-slate-800/50 rounded-[2.5rem] border border-slate-700/50 hover:border-blue-500/50 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500/10 p-3 rounded-2xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors"><Info size={20} /></div>
                  <span className="font-bold text-slate-200 text-lg leading-tight">{item.text}</span>
                </div>
                <button onClick={() => setActiveDoc(item.text)} className="bg-blue-600 text-white px-6 py-4 rounded-2xl text-[10px] font-black tracking-widest uppercase shadow-lg shadow-blue-900/20 hover:scale-105 transition-all">VIEW</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
      <Zap className="text-blue-500 mb-8 animate-pulse" size={100} fill="currentColor" />
      <h1 className="text-[5rem] md:text-[8rem] font-black mb-4 tracking-tighter leading-none italic">ShieldPro</h1>
      <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-lg font-medium leading-relaxed">Minnesota's smartest restoration sales engine.</p>
      <button onClick={() => setView('dashboard')} className="group relative bg-blue-600 text-white px-12 py-8 rounded-[2.5rem] font-black text-2xl shadow-2xl shadow-blue-500/40 flex items-center gap-6 hover:bg-blue-500 transition-all active:scale-95">
        ENTER YOUR HQ <ArrowRight className="group-hover:translate-x-2 transition-transform" />
      </button>
    </div>
  );
};

export default App;
