import React, { useState } from 'react';
import { 
  ShieldCheck, Printer, Zap, ArrowRight, FileText, UserPlus, ClipboardList, TrendingUp 
} from 'lucide-react';

const App = () => {
  const [view, setView] = useState('landing'); 
  const [activeDoc, setActiveDoc] = useState(null);
  const [customers, setCustomers] = useState([
    { id: 1, name: "The Miller Project", address: "Waverly, MN", status: "Insurance Pending" },
    { id: 2, name: "Anderson Residence", address: "Montrose, MN", status: "Signed & Ready" }
  ]);

  const checklistItems = [
    { id: 1, text: "MN Statutory Warranty (Chapter 327A)" },
    { id: 2, text: "MN 3-Day Notice of Cancellation (Duplicate)" },
    { id: 3, text: "MN Pre-Lien Notice (Statute 514.011)" },
    { id: 4, text: "Insurance Fraud & Deductible (MN 325E.66)" },
    { id: 5, text: "Cancellation if Claim Denied (MN 326B.811)" }
  ];

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-4 md:p-12 overflow-x-hidden font-sans">
        <header className="max-w-xl mx-auto flex justify-between items-center mb-10">
          <div className="flex items-center gap-2 text-xl font-black italic text-blue-400" onClick={() => setView('landing')}><Zap fill="currentColor" size={24} /> ShieldPro</div>
          <button onClick={() => setView('landing')} className="text-[10px] font-black uppercase text-slate-500">Log Out</button>
        </header>

        <main className="max-w-xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-4xl font-black tracking-tighter leading-none">Sales HQ</h1>
              <p className="text-blue-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">Active Projects</p>
            </div>
            <button className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-900/40"><UserPlus size={20}/></button>
          </div>

          {/* CUSTOMER PROFILES - This is the "Smooth Runner" Section */}
          <div className="grid gap-3 mb-12">
            {customers.map(c => (
              <div key={c.id} className="bg-slate-800/60 p-5 rounded-[2rem] border border-slate-700/50 flex items-center justify-between group hover:border-blue-500/50 transition-all">
                <div>
                  <h3 className="font-black text-lg text-slate-100">{c.name}</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase">{c.address} • <span className="text-blue-400">{c.status}</span></p>
                </div>
                <ArrowRight className="text-slate-600 group-hover:text-blue-400 transition-colors" size={20}/>
              </div>
            ))}
          </div>

          <h2 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-4">MN Compliance Vault</h2>
          <div className="space-y-3">
            {checklistItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-5 bg-slate-800/30 rounded-[1.5rem] border border-slate-700/30">
                <div className="flex items-center gap-4 flex-1 pr-4">
                  <FileText className="text-blue-500/50" size={18} />
                  <span className="font-bold text-slate-300 text-sm leading-tight">{item.text}</span>
                </div>
                <button className="bg-slate-700 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest">Open</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-900 text-white font-sans">
      <div className="absolute top-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.15),transparent_70%)]" />
      <Zap className="text-blue-500 mb-6 animate-pulse" size={80} fill="currentColor" />
      <h1 className="text-7xl font-black mb-4 tracking-tighter leading-none italic drop-shadow-2xl">ShieldPro</h1>
      <p className="text-lg text-slate-400 mb-12 max-w-sm font-medium leading-relaxed">Turnkey Front-End System for MN Contractors.</p>
      <button onClick={() => setView('dashboard')} className="relative z-10 bg-blue-600 text-white px-12 py-8 rounded-[2.5rem] font-black text-2xl shadow-2xl flex items-center gap-5 hover:scale-105 transition-transform active:scale-95">
        LAUNCH HQ <TrendingUp size={28} />
      </button>
    </div>
  );
};

export default App;
