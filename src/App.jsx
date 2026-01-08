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
    "MN Statutory Warranty (Chapter 327A)": `STATUTORY WARRANTIES (MN STATUTES § 327A.02)

(a) ONE-YEAR PERIOD: The dwelling shall be free from defects caused by faulty workmanship and defective materials due to noncompliance with building standards.
(b) TWO-YEAR PERIOD: The dwelling shall be free from defects caused by faulty installation of plumbing, electrical, heating, and cooling systems due to noncompliance with building standards.
(c) TEN-YEAR PERIOD: The dwelling shall be free from major construction defects due to noncompliance with building standards.`,

    "MN 3-Day Notice of Cancellation (Duplicate)": `NOTICE OF CANCELLATION (MN STATUTE § 325G.08)

Date of Transaction: __________
YOU MAY CANCEL THIS TRANSACTION, WITHOUT ANY PENALTY OR OBLIGATION, WITHIN THREE BUSINESS DAYS FROM THE ABOVE DATE. 

If you cancel, any property traded in, any payments made by you under the contract or sale, and any negotiable instrument executed by you will be returned within ten business days following receipt by the seller of your cancellation notice. To cancel this transaction, mail or deliver a signed and dated copy of this cancellation notice to: [Contractor Name] at [Address] NOT LATER THAN MIDNIGHT OF: [Date].`,

    "MN Pre-Lien Notice (Statute 514.011)": `MECHANIC'S LIEN PRE-LIEN NOTICE (MN STATUTE § 514.011)

(a) ANY PERSON OR COMPANY SUPPLYING LABOR OR MATERIALS FOR THIS IMPROVEMENT TO YOUR PROPERTY MAY FILE A LIEN AGAINST YOUR PROPERTY IF THAT PERSON OR COMPANY IS NOT PAID FOR THE CONTRIBUTIONS.
(b) UNDER MINNESOTA LAW, YOU HAVE THE RIGHT TO PAY PERSONS WHO SUPPLIED LABOR OR MATERIALS FOR THIS IMPROVEMENT DIRECTLY AND DEDUCT THIS AMOUNT FROM OUR CONTRACT PRICE, OR WITHHOLD THE AMOUNTS DUE THEM FROM US UNTIL 120 DAYS AFTER COMPLETION UNLESS WE GIVE YOU A LIEN WAIVER SIGNED BY PERSONS WHO SUPPLIED ANY LABOR OR MATERIAL.`,

    "Insurance Fraud & Deductible (MN 325E.66)": `INSURANCE CLAIMS DISCLOSURE (MN STATUTE § 325E.66)

A residential contractor providing home repair or improvement services to be paid by an insured from the proceeds of a property or casualty insurance policy shall not, as an inducement to the sale, advertise or promise to pay or rebate, directly or indirectly, all or part of any applicable insurance deductible. 

If a residential contractor violates this section, the insurer to whom the insured tendered the claim shall not be obligated to consider the estimate prepared by the residential contractor. Violation may result in public enforcement action including fines up to $10,000.`,

    "Cancellation if Claim Denied (MN 326B.811)": `72-HOUR RIGHT TO CANCEL (MN STATUTE § 326B.811)

You may cancel this contract at any time within 72 hours after you have been notified that your insurer has denied your claim to pay for the goods and services to be provided under this contract. 

Cancellation is evidenced by the insured giving written notice of cancellation to the contractor at the address stated in the contract. If you cancel, any payments made by you under the contract will be returned within ten business days following receipt by the contractor of your cancellation notice.`,

    "Lead Warning Statement (EPA/MN)": `EPA LEAD-BASED PAINT WARNING STATEMENT

Housing built before 1978 may contain lead-based paint. Lead from paint, paint chips, and dust can pose health hazards if not managed properly. Lead exposure is especially harmful to young children and pregnant women. Before renovation of pre-1978 housing, contractors must provide the pamphlet "Protect Your Family from Lead in Your Home" and a "Lead Warning Statement" confirming compliance with all notification requirements.`
  };

  const DocumentModal = () => (
    <div className="fixed inset-0 bg-slate-900/95 flex items-center justify-center p-4 z-50 backdrop-blur-xl">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-6 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
          <ShieldCheck className="text-blue-600" size={32} />
          <button onClick={() => setActiveDoc(null)} className="p-2 text-slate-400 font-black">✕</button>
        </div>
        <h2 className="text-xl md:text-2xl font-black mb-4 text-slate-900 tracking-tight leading-tight">{activeDoc}</h2>
        <div className="bg-slate-50 p-6 rounded-2xl font-mono text-[11px] border border-slate-200 whitespace-pre-wrap leading-relaxed text-slate-700 mb-6">
          <p className="font-black uppercase mb-4 text-blue-700 border-b border-blue-100 pb-2">OFFICIAL MN COMPLIANCE FORM</p>
          {templates[activeDoc]}
        </div>
        <button onClick={() => window.print()} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-transform">
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
          <div className="flex items-center gap-2 text-xl font-black italic text-blue-400" onClick={() => setView('landing')}><Zap fill="currentColor" size={24} /> ShieldPro</div>
          <div className="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 text-[10px] font-black uppercase text-slate-400 tracking-widest">Compliance Active</div>
        </header>
        <main className="max-w-xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black mb-2 tracking-tighter">Legal Vault</h1>
          <p className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-8">{userProfile.companyName}</p>
          <div className="space-y-3">
            {checklistItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-5 bg-slate-800/40 rounded-[2rem] border border-slate-700/50 hover:border-blue-500/30 transition-all group">
                <div className="flex items-center gap-4 flex-1 pr-4">
                  <FileText className="text-blue-400" size={20} />
                  <span className="font-bold text-slate-200 text-sm leading-tight">{item.text}</span>
                </div>
                <button onClick={() => setActiveDoc(item.text)} className="bg-white text-slate-900 px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-transform">VIEW</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-900 text-white overflow-hidden relative font-sans">
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
      <Zap className="text-blue-500 mb-6 animate-pulse" size={80} fill="currentColor" />
      <h1 className="text-6xl md:text-9xl font-black mb-4 tracking-tighter leading-none italic drop-shadow-2xl">ShieldPro</h1>
      <p className="text-lg md:text-2xl text-slate-400 mb-10 max-w-md font-medium leading-relaxed">Minnesota's smartest restoration sales engine.</p>
      <button onClick={() => setView('dashboard')} className="group bg-blue-600 text-white px-10 py-6 rounded-[2.5rem] font-black text-xl md:text-2xl shadow-2xl shadow-blue-500/40 flex items-center gap-4 hover:bg-blue-500 transition-all active:scale-95">
        ENTER YOUR HQ <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
      </button>
    </div>
  );
};

export default App;
