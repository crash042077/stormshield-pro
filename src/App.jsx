import React, { useState } from 'react';
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
    "MN Statutory Warranty (Chapter 327A)": `STATUTORY WARRANTIES - MN CHAPTER 327A\n\n(a) During the one-year period from and after the warranty date the dwelling shall be free from defects caused by faulty workmanship and defective materials due to noncompliance with building standards;\n\n(b) During the two-year period from and after the warranty date, the dwelling shall be free from defects caused by faulty installation of plumbing, electrical, heating, and cooling systems due to noncompliance with building standards; and\n\n(c) During the ten-year period from and after the warranty date, the dwelling shall be free from major structural defects due to noncompliance with building standards.`,

    "MN 3-Day Notice of Cancellation (Duplicate)": `NOTICE OF CANCELLATION (MN STATUTE 325G.08)\n\nYOU MAY CANCEL THIS TRANSACTION, WITHOUT ANY PENALTY OR OBLIGATION, WITHIN THREE BUSINESS DAYS FROM THE DATE OF TRANSACTION.\n\nIf you cancel, any property traded in, any payments made by you under the contract or sale, and any negotiable instrument executed by you will be returned within ten business days following receipt by the seller of your cancellation notice.`,

    "MN Pre-Lien Notice (Statute 514.011)": `MECHANIC'S LIEN PRE-LIEN NOTICE (MN STATUTE 514.011)\n\n(a) ANY PERSON OR COMPANY SUPPLYING LABOR OR MATERIALS FOR THIS IMPROVEMENT TO YOUR PROPERTY MAY FILE A LIEN AGAINST YOUR PROPERTY IF THAT PERSON OR COMPANY IS NOT PAID FOR THE CONTRIBUTIONS.\n\n(b) UNDER MINNESOTA LAW, YOU HAVE THE RIGHT TO PAY PERSONS WHO SUPPLIED LABOR OR MATERIALS FOR THIS IMPROVEMENT DIRECTLY AND DEDUCT THIS AMOUNT FROM OUR CONTRACT PRICE.`,

    "Insurance Fraud & Deductible (MN 325E.66)": `MANDATORY MN STATUTE 325E.66 NOTICE:\n\nA residential contractor who provides goods or services to be paid by an insured from the proceeds of a property or casualty insurance policy shall not advertise or promise to pay or rebate all or any portion of any applicable insurance deductible. \n\nIF A CONTRACTOR VIOLATES THIS SECTION, THE INSURED OR THE APPLICABLE INSURER MAY BRING AN ACTION FOR DAMAGES.`,

    "Cancellation if Claim Denied (MN 326B.811)": `72-HOUR RIGHT TO CANCEL (MN STATUTE 326B.811)\n\nIf your insurance company denies the claim for work or goods to be provided under this contract, you may cancel the contract by delivering or mailing a written notice of cancellation to the contractor within 72 hours after you receive written notice of the denial.`,
  };

  const DocumentModal = () => (
    <div className="fixed inset-0 bg-slate-900/95 flex items-center justify-center p-4 z-50 backdrop-blur-xl">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-6 md:p-10 shadow-2xl overflow-y-auto max-h-[95vh]">
        <div className="flex justify-between items-center mb-6">
          <ShieldCheck className="text-blue-600" size={32} />
          <button onClick={() => {setActiveDoc(null); setIsSigned(false);}} className="p-2 text-slate-400 font-black text-xl">✕</button>
        </div>
        
        <h2 className="text-xl font-black mb-6 text-slate-900 leading-tight">{activeDoc}</h2>
        
        <div className="bg-slate-50 px-6 py-10 rounded-2xl font-mono text-[11px] border border-slate-200 whitespace-pre-wrap leading-relaxed text-slate-700 mb-8">
          <p className="font-black uppercase mb-4 text-blue-700">{userProfile.companyName}</p>
          {templates[activeDoc]}
        </div>

        <div className="space-y-6 mb-8">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Customer Name</label>
            <input 
              type="text" 
              placeholder="Full Legal Name"
              className="w-full bg-slate-50 border border-slate-200 p-5 rounded-xl font-bold text-slate-900 focus:border-blue-500 outline-none"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center relative group">
            {!isSigned ? (
              <div onClick={() => setIsSigned(true)} className="cursor-pointer">
                <PenTool className="mx-auto text-slate-300 mb-3 group-hover:text-blue-500 transition-colors" />
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tap to sign with finger</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <p className="font-serif text-3xl text-blue-600 italic mb-3 tracking-wide">{customerName || 'Signature'}</p>
                <div className="flex items-center gap-2 text-green-500 font-black text-[9px] uppercase tracking-widest">
                  <CheckCircle size={14} /> Digitally Verified {new Date().toLocaleDateString()}
                </div>
              </div>
            )}
          </div>
        </div>

        <button onClick={() => window.print()} className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-transform">
          <Printer size={20} /> Print Signed Form
        </button>
      </div>
    </div>
  );

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-4 md:p-12 overflow-x-hidden">
        {activeDoc && <DocumentModal />}
        <header className="max-w-xl mx-auto flex justify-between items-center mb-10">
          <div className="flex items-center gap-2 text-xl font-black italic text-blue-400" onClick={() => setView('landing')}><Zap fill="currentColor" size={24} /> ShieldPro</div>
          <div className="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 text-[10px] font-black text-slate-400 tracking-widest uppercase">Compliance HQ</div>
        </header>
        <main className="max-w-xl mx-auto">
          <h1 className="text-4xl font-black mb-8 tracking-tighter leading-none">Legal Vault</h1>
          <div className="space-y-3">
            {checklistItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-6 bg-slate-800/40 rounded-[2rem] border border-slate-700/50 hover:border-blue-500/40 transition-all">
                <div className="flex items-center gap-4 pr-2">
                  <FileText className="text-blue-400 shrink-0" size={22} />
                  <span className="font-bold text-slate-200 text-sm leading-tight">{item.text}</span>
                </div>
                <button onClick={() => setActiveDoc(item.text)} className="bg-blue-600 text-white px-5 py-3 rounded-xl text-[9px] font-black uppercase shadow-lg shrink-0">VIEW</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-900 text-white font-sans relative">
      <Zap className="text-blue-500 mb-6" size={80} fill="currentColor" />
      <h1 className="text-7xl font-black mb-4 tracking-tighter leading-none italic">ShieldPro</h1>
      <p className="text-lg text-slate-400 mb-12 max-w-md font-medium leading-relaxed">Minnesota's smartest restoration sales engine.</p>
      <button onClick={() => setView('dashboard')} className="bg-blue-600 text-white px-12 py-8 rounded-[2.5rem] font-black text-2xl shadow-2xl flex items-center gap-5 hover:scale-105 transition-transform">
        ENTER YOUR HQ <ArrowRight size={28} />
      </button>
    </div>
  );
};

export default App;
