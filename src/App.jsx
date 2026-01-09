import React, { useState } from 'react';
import { 
  ShieldCheck, Printer, Zap, ArrowRight, FileText, Settings, Home, CheckCircle 
} from 'lucide-react';

const App = () => {
  const [view, setView] = useState('landing'); 
  const [activeDoc, setActiveDoc] = useState(null);
  
  // This is the "Product" you are selling - the ability to customize!
  const [userProfile, setUserProfile] = useState({
    companyName: 'Your Roofing Co',
    licenseNum: 'BC123456',
    address: '123 Main St, Waverly, MN'
  });

  const checklistItems = [
    { id: 1, text: "MN Statutory Warranty (Chapter 327A)" },
    { id: 2, text: "MN 3-Day Notice of Cancellation (Duplicate)" },
    { id: 3, text: "MN Pre-Lien Notice (Statute 514.011)" },
    { id: 4, text: "Insurance Fraud & Deductible (MN 325E.66)" },
  ];

  const templates = {
    "MN Statutory Warranty (Chapter 327A)": `STATUTORY WARRANTIES (MN § 327A.02)\n\nContractor: ${userProfile.companyName}\nLicense: ${userProfile.licenseNum}\n\n1 YEAR: Workmanship.\n2 YEARS: Systems.\n10 YEARS: Structural.`,
    "MN 3-Day Notice of Cancellation (Duplicate)": `NOTICE OF CANCELLATION (MN § 325G.08)\n\nYou may CANCEL this transaction without penalty within THREE BUSINESS DAYS.`,
    "MN Pre-Lien Notice (Statute 514.011)": `PRE-LIEN NOTICE (MN § 514.011)\n\nNOTICE: ANY PERSON SUPPLYING LABOR OR MATERIALS MAY FILE A LIEN IF NOT PAID.`,
    "Insurance Fraud & Deductible (MN 325E.66)": `DEDUCTIBLE DISCLOSURE (MN § 325E.66)\n\nA contractor shall not promise to pay or rebate any portion of an insurance deductible.`,
  };

  const Dashboard = () => (
    <div className="min-h-screen bg-slate-900 text-white p-6 font-sans">
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-2 text-xl font-black italic text-blue-400"><Zap fill="currentColor" size={24} /> ShieldPro</div>
        <div className="flex gap-4">
          <button onClick={() => setView('dashboard')} className={`p-2 ${view === 'dashboard' ? 'text-blue-400' : 'text-slate-500'}`}><Home /></button>
          <button onClick={() => setView('settings')} className={`p-2 ${view === 'settings' ? 'text-blue-400' : 'text-slate-500'}`}><Settings /></button>
        </div>
      </header>
      
      <h1 className="text-4xl font-black mb-8 tracking-tighter">Compliance HQ</h1>
      <div className="space-y-3">
        {checklistItems.map(item => (
          <div key={item.id} className="flex items-center justify-between p-6 bg-slate-800/40 rounded-[2rem] border border-slate-700/50">
            <span className="font-bold text-slate-200 text-sm">{item.text}</span>
            <button onClick={() => setActiveDoc(item.text)} className="bg-blue-600 text-white px-5 py-3 rounded-xl text-[9px] font-black uppercase">View</button>
          </div>
        ))}
      </div>

      {activeDoc && (
        <div className="fixed inset-0 bg-slate-900/95 flex items-center justify-center p-4 z-50 backdrop-blur-xl">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-black mb-4 text-slate-900">{activeDoc}</h2>
            <div className="bg-slate-50 p-6 rounded-2xl font-mono text-[11px] border border-slate-200 whitespace-pre-wrap leading-relaxed text-slate-700 mb-6">
              <p className="font-black uppercase mb-4 text-blue-700">{userProfile.companyName} • {userProfile.licenseNum}</p>
              {templates[activeDoc]}
            </div>
            <button onClick={() => setActiveDoc(null)} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest">Close Preview</button>
          </div>
        </div>
      )}
    </div>
  );

  const SettingsPage = () => (
    <div className="min-h-screen bg-slate-900 text-white p-6 font-sans">
       <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-2 text-xl font-black italic text-blue-400"><Zap fill="currentColor" size={24} /> ShieldPro</div>
        <div className="flex gap-4">
          <button onClick={() => setView('dashboard')} className="p-2 text-slate-500"><Home /></button>
          <button onClick={() => setView('settings')} className="p-2 text-blue-400"><Settings /></button>
        </div>
      </header>
      <h1 className="text-4xl font-black mb-2 tracking-tighter">Company Setup</h1>
      <p className="text-slate-500 text-xs font-bold uppercase mb-8 tracking-widest">Customize your Legal Output</p>
      
      <div className="space-y-6">
        <div>
          <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block">Company Name</label>
          <input 
            className="w-full bg-slate-800 border border-slate-700 p-5 rounded-2xl font-bold text-white focus:border-blue-500 outline-none"
            value={userProfile.companyName}
            onChange={(e) => setUserProfile({...userProfile, companyName: e.target.value})}
          />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block">MN License #</label>
          <input 
            className="w-full bg-slate-800 border border-slate-700 p-5 rounded-2xl font-bold text-white focus:border-blue-500 outline-none"
            value={userProfile.licenseNum}
            onChange={(e) => setUserProfile({...userProfile, licenseNum: e.target.value})}
          />
        </div>
        <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-[2rem] mt-10">
          <div className="flex items-center gap-3 text-blue-400 mb-2">
            <CheckCircle size={20} />
            <span className="font-black text-xs uppercase tracking-widest">Live Sync Active</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">Changes here will automatically update all MN statutory forms in your vault.</p>
        </div>
      </div>
    </div>
  );

  if (view === 'settings') return <SettingsPage />;
  if (view === 'dashboard') return <Dashboard />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-20%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
      <Zap className="text-blue-500 mb-8 animate-pulse" size={100} fill="currentColor" />
      <h1 className="text-7xl font-black mb-4 tracking-tighter leading-none italic">ShieldPro</h1>
      <p className="text-xl text-slate-400 mb-12 max-w-sm font-medium">Professional Restoration Sales Software for MN Contractors.</p>
      <button onClick={() => setView('dashboard')} className="bg-blue-600 text-white px-12 py-8 rounded-[2.5rem] font-black text-2xl shadow-2xl flex items-center gap-5 hover:scale-105 transition-transform active:scale-95">
        LAUNCH SYSTEM <ArrowRight size={28} />
      </button>
    </div>
  );
};

export default App;
