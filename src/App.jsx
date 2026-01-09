import React, { useState } from 'react';
import { 
  ShieldCheck, Printer, Zap, ArrowRight, FileText, Settings, Home, CheckCircle, PenTool, ClipboardCheck, Factory 
} from 'lucide-react';

const App = () => {
  const [view, setView] = useState('landing'); 
  const [activeDoc, setActiveDoc] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [isSigned, setIsSigned] = useState(false);
  
  const [userProfile, setUserProfile] = useState({
    companyName: 'YOUR ROOFING CO',
    licenseNum: 'BC123456',
  });

  const [jobs] = useState([
    { id: 1, name: "The Miller Project", address: "WAVERLY, MN", status: "READY FOR PRODUCTION", ready: true },
    { id: 2, name: "Anderson Siding", address: "MONTROSE, MN", status: "DOCS PENDING", ready: false }
  ]);

  const checklistItems = [
    { id: 1, text: "MN Statutory Warranty (Chapter 327A)" },
    { id: 2, text: "MN 3-Day Notice of Cancellation (Duplicate)" },
    { id: 3, text: "MN Pre-Lien Notice (Statute 514.011)" },
    { id: 4, text: "Insurance Fraud & Deductible (MN 325E.66)" },
    { id: 5, text: "Cancellation if Claim Denied (MN 326B.811)" }
  ];

  const templates = {
    "MN Statutory Warranty (Chapter 327A)": `STATUTORY WARRANTIES - MN CHAPTER 327A\n\n(a) One-year workmanship warranty...\n(b) Two-year systems warranty...\n(c) Ten-year structural warranty...`,
    "MN 3-Day Notice of Cancellation (Duplicate)": `NOTICE OF CANCELLATION (MN STATUTE 325G.08)\n\nYOU MAY CANCEL THIS TRANSACTION WITHIN THREE BUSINESS DAYS...`,
    "MN Pre-Lien Notice (Statute 514.011)": `MECHANIC'S LIEN PRE-LIEN NOTICE (MN STATUTE 514.011)\n\nNOTICE: ANY PERSON SUPPLYING LABOR OR MATERIALS MAY FILE A LIEN...`,
    "Insurance Fraud & Deductible (MN 325E.66)": `MANDATORY MN STATUTE 325E.66 NOTICE:\n\nContractors shall not rebate or pay insurance deductibles...`,
    "Cancellation if Claim Denied (MN 326B.811)": `72-HOUR RIGHT TO CANCEL (MN STATUTE 326B.811)\n\nCancel within 72 hours of insurance denial...`,
  };

  const JobFolder = () => (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <header className="max-w-xl mx-auto flex justify-between items-center mb-8">
        <div onClick={() => setSelectedJob(null)} className="flex items-center gap-2 text-xl font-black italic text-blue-400 cursor-pointer"><Zap fill="currentColor" size={24} /> ShieldPro</div>
        <button onClick={() => setSelectedJob(null)} className="text-[10px] font-black uppercase text-slate-500 underline">Back to Queue</button>
      </header>
      <main className="max-w-xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tighter italic">{selectedJob.name}</h1>
          <p className="text-blue-400 font-bold text-[10px] uppercase tracking-widest">{selectedJob.address}</p>
        </div>
        <div className="space-y-3">
          {checklistItems.map(item => (
            <div key={item.id} className="flex items-center justify-between p-5 bg-slate-800/40 rounded-[2rem] border border-slate-700/50">
              <span className="font-bold text-slate-200 text-sm leading-tight pr-4">{item.text}</span>
              <button onClick={() => {setActiveDoc(item.text); setIsSigned(false);}} className="bg-blue-600 text-white px-5 py-3 rounded-xl text-[9px] font-black uppercase shadow-lg">Open</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );

  const Queue = () => (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <header className="max-w-xl mx-auto flex justify-between items-center mb-10">
        <div className="flex items-center gap-2 text-xl font-black italic text-blue-400"><Zap fill="currentColor" size={24} /> ShieldPro</div>
        <button onClick={() => setView('settings')} className="p-2 text-slate-500"><Settings /></button>
      </header>
      <main className="max-w-xl mx-auto">
        <h1 className="text-4xl font-black mb-2 tracking-tighter italic">Production Queue</h1>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-8">Intake & Job Files</p>
        {jobs.map(job => (
          <div key={job.id} className="bg-slate-800/60 p-6 rounded-[2.5rem] border border-slate-700/50 mb-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-black text-white">{job.name}</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase">{job.address}</p>
              </div>
              <span className={`text-[8px] font-black px-3 py-1 rounded-full border ${job.ready ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>{job.status}</span>
            </div>
            <button onClick={() => setSelectedJob(job)} className="w-full bg-blue-600 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">Open Job File</button>
          </div>
        ))}
      </main>
    </div>
  );

  const DocumentModal = () => (
    <div className="fixed inset-0 bg-slate-900/95 flex items-center justify-center p-4 z-50 backdrop-blur-xl">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-black text-slate-900">{activeDoc}</h2>
          <button onClick={() => setActiveDoc(null)} className="text-slate-400 font-black">✕</button>
        </div>
        <div className="bg-slate-50 p-5 rounded-2xl font-mono text-[10px] border border-slate-200 whitespace-pre-wrap leading-relaxed text-slate-700 mb-6">
          <p className="font-black uppercase mb-3 text-blue-700 border-b border-blue-100 pb-1">{userProfile.companyName} • {userProfile.licenseNum}</p>
          {templates[activeDoc]}
        </div>
        <div className="space-y-4 mb-6">
          <input type="text" placeholder="Homeowner Name" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-bold text-slate-900 text-sm outline-none" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          <div onClick={() => setIsSigned(true)} className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center cursor-pointer">
            {!isSigned ? <span className="text-[10px] font-black uppercase text-slate-400">Tap to Sign</span> : <span className="font-serif text-2xl text-blue-600 italic">{customerName || 'Signed'}</span>}
          </div>
        </div>
        <button onClick={() => window.print()} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase text-xs">Print Form</button>
      </div>
    </div>
  );

  if (activeDoc) return <DocumentModal />;
  if (selectedJob) return <JobFolder />;
  if (view === 'dashboard') return <Queue />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-slate-900 text-white relative">
      <Zap className="text-blue-500 mb-8 animate-pulse" size={100} fill="currentColor" />
      <h1 className="text-7xl font-black mb-4 tracking-tighter italic">ShieldPro</h1>
      <p className="text-xl text-slate-400 mb-12 max-w-sm">Sales-to-Production Logic for MN Pros.</p>
      <button onClick={() => setView('dashboard')} className="bg-blue-600 text-white px-12 py-8 rounded-[2.5rem] font-black text-2xl shadow-2xl flex items-center gap-5">LAUNCH SYSTEM <ArrowRight size={28} /></button>
    </div>
  );
};

export default App;
