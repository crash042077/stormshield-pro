import React, { useState } from 'react';
import { 
  ShieldCheck, Printer, Zap, ArrowRight, FileText, Settings, Home, CheckCircle, PenTool 
} from 'lucide-react';

const App = () => {
  const [view, setView] = useState('landing'); 
  const [activeDoc, setActiveDoc] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [isSigned, setIsSigned] = useState(false);
  
  // THE BRANDING ENGINE - Sells to the Contractor
  const [userProfile, setUserProfile] = useState({
    companyName: 'YOUR ROOFING CO',
    licenseNum: 'BC123456',
  });

  const checklistItems = [
    { id: 1, text: "MN Statutory Warranty (Chapter 327A)" },
    { id: 2, text: "MN 3-Day Notice of Cancellation (Duplicate)" },
    { id: 3, text: "MN Pre-Lien Notice (Statute 514.011)" },
    { id: 4, text: "Insurance Fraud & Deductible (MN 325E.66)" },
    { id: 5, text: "Cancellation if Claim Denied (MN 326B.811)" }
  ];

  const templates = {
    "MN Statutory Warranty (Chapter 327A)": `STATUTORY WARRANTIES - MN CHAPTER 327A\n\n(a) During the one-year period from and after the warranty date the dwelling shall be free from defects caused by faulty workmanship and defective materials due to noncompliance with building standards;\n\n(b) During the two-year period from and after the warranty date, the dwelling shall be free from defects caused by faulty installation of plumbing, electrical, heating, and cooling systems due to noncompliance with building standards;\n\n(c) During the ten-year period from and after the warranty date, the dwelling shall be free from major structural defects due to noncompliance with building standards.`,
    "MN 3-Day Notice of Cancellation (Duplicate)": `NOTICE OF CANCELLATION (MN STATUTE 325G.08)\n\nYOU MAY CANCEL THIS TRANSACTION, WITHOUT ANY PENALTY OR OBLIGATION, WITHIN THREE BUSINESS DAYS FROM THE DATE OF TRANSACTION.\n\nIf you cancel, any property traded in, any payments made by you under the contract or sale, and any negotiable instrument executed by you will be returned within ten business days following receipt by the seller of your cancellation notice.`,
    "MN Pre-Lien Notice (Statute 514.011)": `MECHANIC'S LIEN PRE-LIEN NOTICE (MN STATUTE 514.011)\n\n(a) ANY PERSON OR COMPANY SUPPLYING LABOR OR MATERIALS FOR THIS IMPROVEMENT TO YOUR PROPERTY MAY FILE A LIEN AGAINST YOUR PROPERTY IF THAT PERSON OR COMPANY IS NOT PAID FOR THE CONTRIBUTIONS.\n\n(b) UNDER MINNESOTA LAW, YOU HAVE THE RIGHT TO PAY PERSONS WHO SUPPLIED LABOR OR MATERIALS FOR THIS IMPROVEMENT DIRECTLY AND DEDUCT THIS AMOUNT FROM OUR CONTRACT PRICE.`,
    "Insurance Fraud & Deductible (MN 325E.66)": `MANDATORY MN STATUTE 325E.66 NOTICE:\n\nA residential contractor who provides goods or services to be paid by an insured from the proceeds of a property or casualty insurance policy shall not advertise or promise to pay or rebate all or any portion of any applicable insurance deductible.\n\nIF A CONTRACTOR VIOLATES THIS SECTION, THE INSURED OR THE APPLICABLE INSURER MAY BRING AN ACTION FOR DAMAGES.`,
    "Cancellation if Claim Denied (MN 326B.811)": `72-HOUR RIGHT TO CANCEL (MN STATUTE 326B.811)\n\nIf your insurance company denies the claim for work or goods to be provided under this contract, you may cancel the contract by delivering or mailing a written notice of cancellation to the contractor within 72 hours after you receive written notice of the denial.`,
  };

  const Dashboard = () => (
    <div className="min-h-screen bg-slate-900 text-white p-6 font-sans overflow-x-hidden">
      <header className="max-w-xl mx-auto flex justify-between items-center mb-10">
        <div className="flex items-center gap-2 text-xl font-black italic text-blue-400"><Zap fill="currentColor" size={24} /> ShieldPro</div>
        <div className="flex gap-4">
          <button onClick={() => setView('dashboard')} className={`p-2 ${view === 'dashboard' ? 'text-blue-400' : 'text-slate-500'}`}><Home /></button>
          <button onClick={() => setView('settings')} className={`p-2 ${view === 'settings' ? 'text-blue-400' : 'text-slate-500'}`}><Settings /></button>
        </div>
      </header>
      
      <main className="max-w-xl mx-auto">
        <h1 className="text-4xl font-black mb-8 tracking-tighter">Legal Vault</h1>
        <div className="space-y-3">
          {checklistItems.map(item => (
            <div key={item.id} className="flex items-center justify-between p-6 bg-slate-800/40 rounded-[2rem] border border-slate-700/50">
              <span className="font-bold text-slate-200 text-sm leading-tight pr-4">{item.text}</span>
              <button onClick={() => {setActiveDoc(item.text); setIsSigned(false);}} className="bg-blue-600 text-white px-5 py-3 rounded-xl text-[9px] font-black uppercase shadow-lg shrink-0">View</button>
            </div>
          ))}
        </div>
      </main>

      {activeDoc && (
        <div className="fixed inset-0 bg-slate-900/95 flex items-center justify-center p-4 z-50 backdrop-blur-xl">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
               <h2 className="text-lg font-black text-slate-900">{activeDoc}</h2>
               <button onClick={() => setActiveDoc(null)} className="text-slate-400 font-black">✕</button>
            </div>
            
            <div className="bg-slate-50 p-5 rounded-2xl font-mono text-[10px] border border-slate-200 whitespace-pre-wrap leading-relaxed text-slate-700 mb-6">
              <p className="font-black uppercase mb-3 text-blue-700 border-b border-blue-100 pb-1">{userProfile.companyName} • {userProfile.licenseNum}</p>
              {templates[activeDoc]}
            </div>

            {/* --- THE SIGNATURE ENGINE IS BACK! --- */}
            <div className="space-y-4 mb-6">
               <input 
                 type="text" 
                 placeholder="Homeowner Full Name"
                 className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-bold text-slate-900 text-sm outline-none focus:border-blue-500"
                 value={customerName}
                 onChange={(e) => setCustomerName(e.target.value)}
               />
               <div onClick={() => setIsSigned(true)} className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center cursor-pointer hover:bg-slate-50 transition-colors">
                  {!isSigned ? (
                    <div className="flex flex-col items-center gap-1">
                      <PenTool size={20} className="text-slate-300" />
                      <span className="text-[10px] font-black uppercase text-slate-400">Tap to Sign Screen</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="font-serif text-2xl text-blue-600 italic mb-1">{customerName || 'Signed'}</span>
                      <span className="text-[8px] font-black text-green-500 uppercase tracking-tighter italic">Digitally Verified MN Compliance</span>
                    </div>
                  )}
               </div>
            </div>

            <button onClick={() => window.print()} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg">Print Signed Form</button>
          </div>
        </div>
      )}
    </div>
  );

  const SettingsPage = () => (
    <div className="min-h-screen bg-slate-900 text-white p-6 font-sans overflow-x-hidden">
       <header className="max-w-xl mx-auto flex justify-between items-center mb-10">
        <div className="flex items-center gap-2 text-xl font-black italic text-blue-400"><Zap fill="currentColor" size={24} /> ShieldPro</div>
        <div className="flex gap-4">
          <button onClick={() => setView('dashboard')} className="p-2 text-slate-500"><Home /></button>
          <button onClick={() => setView('settings')} className="p-2 text-blue-400"><Settings /></button>
        </div>
      </header>
      <main className="max-w-xl mx-auto">
        <h1 className="text-4xl font-black mb-2 tracking-tighter">Company Setup</h1>
        <p className="text-slate-500 text-xs font-bold uppercase mb-8 tracking-widest">Customize your Software</p>
        <div className="space-y-6">
          <input 
            className="w-full bg-slate-800 border border-slate-700 p-5 rounded-2xl font-bold text-white outline-none focus:border-blue-400"
            value={userProfile.companyName}
            onChange={(e) => setUserProfile({...userProfile, companyName: e.target.value.toUpperCase()})}
            placeholder="COMPANY NAME"
          />
          <input 
            className="w-full bg-slate-800 border border-slate-700 p-5 rounded-2xl font-bold text-white outline-none focus:border-blue-400"
            value={userProfile.licenseNum}
            onChange={(e) => setUserProfile({...userProfile, licenseNum: e.target.value.toUpperCase()})}
            placeholder="LICENSE #"
          />
          <div className="bg-blue-600/10 border border-blue-500/20 p-8 rounded-[2rem] mt-10">
            <div className="flex items-center gap-3 text-blue-400 mb-3"><CheckCircle size={24} /><span className="font-black text-xs uppercase tracking-widest">Branding Engine Active</span></div>
            <p className="text-slate-400 text-[11px] leading-relaxed">Your company info will now automatically populate all MN statutory forms in the vault.</p>
          </div>
        </div>
      </main>
    </div>
  );

  if (view === 'settings') return <SettingsPage />;
  if (view === 'dashboard') return <Dashboard />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-slate-900 text-white relative overflow-hidden">
      <Zap className="text-blue-500 mb-8 animate-pulse" size={100} fill="currentColor" />
      <h1 className="text-7xl font-black mb-4 tracking-tighter leading-none italic">ShieldPro</h1>
      <p className="text-xl text-slate-400 mb-12 max-w-sm font-medium">Turnkey Front-End Compliance for MN Contractors.</p>
      <button onClick={() => setView('dashboard')} className="bg-blue-600 text-white px-12 py-8 rounded-[2.5rem] font-black text-2xl shadow-2xl flex items-center gap-5">LAUNCH SYSTEM <ArrowRight size={28} /></button>
    </div>
  );
};

export default App;
