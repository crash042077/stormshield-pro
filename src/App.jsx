import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, Printer, Zap, ArrowRight, FileText, PenTool, CheckCircle
} from 'lucide-react';

const App = () => {
  const [view, setView] = useState('landing'); 
  const [activeDoc, setActiveDoc] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [isSigned, setIsSigned] = useState(false);
  const [userProfile] = useState({
    companyName: 'StormShield Pro',
    licenseNum: 'MN-BC778844',
  });

  const checklistItems = [
    { id: 1, text: "MN Statutory Warranty (Chapter 327A)" },
    { id: 2, text: "MN 3-Day Notice of Cancellation (Duplicate)" },
    { id: 3, text: "MN Pre-Lien Notice (Statute 514.011)" },
    { id: 4, text: "Insurance Fraud & Deductible (MN 325E.66)" },
    { id: 5, text: "Cancellation if Claim Denied (MN 326B.811)" },
  ];

  const templates = {
    "MN Statutory Warranty (Chapter 327A)": `STATUTORY WARRANTIES (MN § 327A.02)\n\n1 YEAR: Workmanship/materials.\n2 YEARS: Mechanical systems.\n10 YEARS: Major structural defects.`,
    "MN 3-Day Notice of Cancellation (Duplicate)": `NOTICE OF CANCELLATION (MN § 325G.08)\n\nYou may CANCEL this transaction without penalty within THREE BUSINESS DAYS.`,
    "MN Pre-Lien Notice (Statute 514.011)": `PRE-LIEN NOTICE (MN § 514.011)\n\nLABORERS/MATERIAL SUPPLIERS MAY FILE A LIEN IF NOT PAID.`,
    "Insurance Fraud & Deductible (MN 325E.66)": `DEDUCTIBLE DISCLOSURE (MN § 325E.66)\n\nA contractor shall not promise to pay/rebate any portion of an insurance deductible.`,
    "Cancellation if Claim Denied (MN 326B.811)": `72-HOUR RIGHT TO CANCEL (MN § 326B.811)\n\nYou may cancel within 72 hours if your insurer denies the claim.`,
  };

  const DocumentModal = () => (
    <div className="fixed inset-0 bg-slate-900/95 flex items-center justify-center p-4 z-50 backdrop-blur-xl">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-6 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <ShieldCheck className="text-blue-600" size={32} />
          <button onClick={() => {setActiveDoc(null); setIsSigned(false);}} className="p-2 text-slate-400 font-black">✕</button>
        </div>
        
        <h2 className="text-xl font-black mb-4 text-slate-900">{activeDoc}</h2>
        
        <div className="bg-slate-50 p-6 rounded-2xl font-mono text-[11px] border border-slate-200 whitespace-pre-wrap leading-relaxed text-slate-700 mb-6">
          <p className="font-black uppercase mb-4 text-blue-700">{userProfile.companyName}</p>
          {templates[activeDoc]}
        </div>

        {/* --- DIGITAL SIGNING SECTION --- */}
        <div className="space-y-4 mb-8">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Customer Name</label>
            <input 
              type="text" 
              placeholder="Full Legal Name"
              className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-bold text-slate-900 focus:border-blue-500 outline-none"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center relative group">
            {!isSigned ? (
              <div onClick={() => setIsSigned(true)} className="cursor-pointer">
                <PenTool className="mx-auto text-slate-300 mb-2 group-hover:text-blue-500 transition-colors" />
                <p className="text-[10px] font-black uppercase text-slate-400">Tap to sign with finger</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <p className="font-cursive text-3xl text-blue-600 italic mb-2">{customerName || 'Customer Signature'}</p>
                <div className="flex items-center gap-2 text-green-500 font-black text-[10px] uppercase">
                  <CheckCircle size={14} /> Digitally Verified {new Date().toLocaleDateString()}
                </div>
              </div>
            )}
          </div>
        </div>

        <button onClick={() => window.print()} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-transform">
          <Printer size={20} /> Print Signed Form
        </button>
      </div>
    </div>
  );

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-4 md:p-12">
        {activeDoc && <DocumentModal />}
        <header className="max-w-xl mx-auto flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 text-xl font-black italic text-blue-400" onClick={() => setView('landing')}><Zap fill="currentColor" size={24} /> ShieldPro</div>
          <div className="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 text-[10px] font-black text-slate-400 tracking-widest">WAVERLY, MN</div>
        </header>
        <main className="max-w-xl mx-auto">
          <h1 className="text-4xl font-black mb-8 tracking-tighter leading-none">Legal Vault</h1>
          <div className="space-y-3">
            {checklistItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-5 bg-slate-800/40 rounded-3xl border border-slate-700/50 hover:border-blue-500/40 transition-all">
                <div className="flex items-center gap-4">
                  <FileText className="text-blue-400 shrink-0" size={20} />
                  <span className="font-bold text-slate-200 text-sm leading-tight">{item.text}</span>
                </div>
                <button onClick={() => setActiveDoc(item.text)} className="bg-blue-600 text-white px-5 py-3 rounded-xl text-[9px] font-black uppercase shadow-lg">VIEW</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-900 text-white font-sans">
      <Zap className="text-blue-500 mb-6" size={80} fill="currentColor" />
      <h1 className="text-7xl font-black mb-4 tracking-tighter leading-none italic">ShieldPro</h1>
      <p className="text-lg text-slate-400 mb-10 max-w-md font-medium">Minnesota's smartest restoration sales engine.</p>
      <button onClick={() => setView('dashboard')} className="bg-blue-600 text-white px-10 py-6 rounded-[2rem] font-black text-xl shadow-2xl flex items-center gap-4 hover:scale-105 transition-transform">
        ENTER YOUR HQ <ArrowRight size={24} />
      </button>
    </div>
  );
};

export default App;
