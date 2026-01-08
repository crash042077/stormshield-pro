import React, { useState } from 'react';
import { 
  ShieldCheck, Printer, Zap, ArrowRight, Info, FileText
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
    "MN Statutory Warranty (Chapter 327A)": `STATUTORY WARRANTIES - MN CHAPTER 327A\n\n1 YEAR: Workmanship/materials.\n2 YEARS: Systems (Plumbing/HVAC).\n10 YEARS: Major structural defects.`,
    "MN 3-Day Notice of Cancellation (Duplicate)": `NOTICE OF CANCELLATION (MN 325G.08)\n\nYou may CANCEL this transaction without penalty within THREE BUSINESS DAYS.`,
    "MN Pre-Lien Notice (Statute 514.011)": `PRE-LIEN NOTICE (MN 514.011)\n\nANY PERSON SUPPLYING LABOR/MATERIALS MAY FILE A LIEN AGAINST YOUR PROPERTY IF NOT PAID.`,
    "Insurance Fraud & Deductible (MN 325E.66)": `DEDUCTIBLE DISCLOSURE (MN 325E.66)\n\nA contractor shall not advertise or promise to pay or rebate any portion of an insurance deductible.`,
    "Cancellation if Claim Denied (MN 326B.811)": `72-HOUR RIGHT TO CANCEL (MN 326B.811)\n\nYou may cancel this contract within 72 hours if your insurance claim is denied.`,
    "Lead Warning Statement (EPA/MN)": `EPA LEAD WARNING\n\nHousing built before 1978 may contain lead-based paint.`
  };

  const DocumentModal = () => (
    <div className="fixed inset-0 bg-slate-900/95 flex items-center justify-center p-4 z-50 backdrop-blur-xl">
      <div className="bg-white rounded-[2rem] w-full max-w-lg p-6 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <ShieldCheck className="text-blue-600" size={32} />
          <button onClick={() => setActiveDoc(null)} className="p-2 text-slate-400 font-black">✕</button>
        </div>
        <h2 className="text-xl md:text-2xl font-black mb-4 text-slate-900 leading-tight">{activeDoc}</h2>
        <div className="bg-slate-50 p-6 rounded-2xl font-mono text-[12px] border border-slate-200 whitespace-pre-wrap leading-relaxed text-slate-700 mb-6">
          <p className="font-black uppercase mb-4 text-blue-700">{userProfile.companyName}</p>
          {templates[activeDoc]}
        </div>
        <button onClick={() => window.print()} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg">
          <Printer size={20} /> Print Full Form
        </button>
      </div>
    </div>
  );

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-4 md:p-12 overflow-x-hidden">
        {activeDoc && <DocumentModal />}
        <header className="max-w-xl mx-auto flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 text-xl font-black italic text-blue-400"><Zap fill="currentColor" size={24} /> ShieldPro</div>
          <button onClick={() => setView('landing')} className="text-[10px] font-black uppercase text-slate-500">Sign Out</button>
        </header>
        <main className="max-w-xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black mb-2 tracking-tighter">Legal Vault</h1>
          <p className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-8">{userProfile.companyName}</p>
          <div className="space-y-3">
            {checklistItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-5 bg-slate-800/40 rounded-3xl border border-slate-700/50">
                <div className="flex items-center gap-4 flex-1 pr-4">
                  <FileText className="text-blue-400 shrink-0" size={20} />
                  <span className="font-bold text-slate-200 text-sm md:text-base leading-tight">{item.text}</span>
                </div>
                <button onClick={() => setActiveDoc(item.text)} className="bg-blue-600 text-white px-4 py-3 rounded-xl text-[10px] font-black uppercase shrink-0">VIEW</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-900 text-white overflow-hidden relative">
      <Zap className="text-blue-500 mb-6 animate-bounce" size={80} fill="currentColor" />
      <h1 className="text-6xl md:text-9xl font-black mb-4 tracking-tighter leading-none italic">ShieldPro</h1>
      <p className="text-lg md:text-2xl text-slate-400 mb-10 max-w-md font-medium">Minnesota's smartest restoration sales engine.</p>
      <button onClick={() => setView('dashboard')} className="bg-blue-600 text-white px-10 py-6 rounded-[2rem] font-black text-xl md:text-2xl shadow-2xl flex items-center gap-4 hover:scale-105 transition-transform">
        ENTER YOUR HQ <ArrowRight size={24} />
      </button>
    </div>
  );
};

export default App;
