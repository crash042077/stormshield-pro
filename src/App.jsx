import React, { useState } from 'react';
import { 
  ShieldCheck, Printer, Zap, ArrowRight, FileText, Settings, Home, CheckCircle, PenTool, ClipboardCheck, Factory
} from 'lucide-react';

const App = () => {
  const [view, setView] = useState('landing'); 
  const [activeDoc, setActiveDoc] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [userProfile, setUserProfile] = useState({ companyName: 'YOUR ROOFING CO', licenseNum: 'BC123456' });

  // MOCK DATA: Showing a buyer how they can track "Production-Ready" status
  const [jobs, setJobs] = useState([
    { id: 1, name: "The Miller Project", address: "Waverly, MN", docs: { warranty: true, cancellation: true, preLien: true, insurance: true }, ready: true },
    { id: 2, name: "Anderson Siding", address: "Montrose, MN", docs: { warranty: true, cancellation: true, preLien: false, insurance: true }, ready: false }
  ]);

  const checklistItems = [
    { id: 'warranty', text: "MN Statutory Warranty (Chapter 327A)" },
    { id: 'cancellation', text: "MN 3-Day Notice of Cancellation" },
    { id: 'preLien', text: "MN Pre-Lien Notice (Statute 514.011)" },
    { id: 'insurance', text: "Insurance Fraud Disclosure (MN 325E.66)" }
  ];

  const JobFolder = ({ job }) => (
    <div className="bg-slate-800/60 p-6 rounded-[2.5rem] border border-slate-700/50 mb-4 group hover:border-blue-500/50 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-black text-white">{job.name}</h3>
          <p className="text-xs text-slate-500 font-bold uppercase">{job.address}</p>
        </div>
        {job.ready ? 
          <span className="bg-green-500/10 text-green-400 text-[10px] font-black px-3 py-1 rounded-full border border-green-500/20 flex items-center gap-1"><Factory size={12}/> READY FOR PRODUCTION</span> : 
          <span className="bg-amber-500/10 text-amber-400 text-[10px] font-black px-3 py-1 rounded-full border border-amber-500/20">DOCS PENDING</span>
        }
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {Object.entries(job.docs).map(([key, val]) => (
          <div key={key} className={`text-[9px] font-black uppercase p-2 rounded-lg flex items-center gap-2 ${val ? 'bg-blue-600/10 text-blue-400' : 'bg-slate-700/30 text-slate-500'}`}>
            {val ? <CheckCircle size={10}/> : <div className="w-2.5 h-2.5 rounded-full border border-slate-600"/>} {key}
          </div>
        ))}
      </div>
      <button onClick={() => setSelectedJob(job)} className="w-full bg-slate-700 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors">Open Job File</button>
    </div>
  );

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6 font-sans">
        <header className="max-w-xl mx-auto flex justify-between items-center mb-10">
          <div className="flex items-center gap-2 text-xl font-black italic text-blue-400"><Zap fill="currentColor" size={24} /> ShieldPro</div>
          <div className="flex gap-4">
            <button onClick={() => setView('dashboard')} className="p-2 text-blue-400"><ClipboardCheck /></button>
            <button onClick={() => setView('settings')} className="p-2 text-slate-500"><Settings /></button>
          </div>
        </header>
        
        <main className="max-w-xl mx-auto">
          <h1 className="text-4xl font-black mb-2 tracking-tighter italic">Production Queue</h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-8">Contractor Intake & Job Files</p>
          
          {jobs.map(job => <JobFolder key={job.id} job={job} />)}
          
          <button className="w-full border-2 border-dashed border-slate-700 p-6 rounded-[2rem] text-slate-500 font-black uppercase text-xs hover:border-blue-500/50 hover:text-blue-400 transition-all flex items-center justify-center gap-3">
             <PlusCircle /> Start New Customer Intake
          </button>
        </main>
      </div>
    );
  }
  
  // Settings view and Landing view logic... (kept from previous version)
  return <div onClick={() => setView('dashboard')} className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8 text-center">
    <Zap className="text-blue-500 mb-6 animate-pulse" size={80} fill="currentColor" />
    <h1 className="text-7xl font-black mb-4 tracking-tighter italic">ShieldPro</h1>
    <p className="text-lg text-slate-400 mb-10">Sales-to-Production Logic for MN Pros.</p>
    <button className="bg-blue-600 px-12 py-8 rounded-[2.5rem] font-black text-2xl shadow-2xl flex items-center gap-5">LAUNCH SYSTEM <ArrowRight size={28} /></button>
  </div>;
};

const PlusCircle = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;

export default App;
