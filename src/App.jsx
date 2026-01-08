import React, { useState } from 'react';
import { 
  ShieldCheck, Printer, Zap, ArrowRight, Info, AlertTriangle, FileText
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
    "MN Statutory Warranty (Chapter 327A)": `STATUTORY WARRANTIES - MINNESOTA STATUTES, CHAPTER 327A

The following warranties are provided by the contractor to the homeowner:

(a) during the one-year period from and after the warranty date the dwelling shall be free from defects caused by faulty workmanship and defective materials due to noncompliance with building standards;

(b) during the two-year period from and after the warranty date, the dwelling shall be free from defects caused by faulty installation of plumbing, electrical, heating, and cooling systems due to noncompliance with building standards; and

(c) during the ten-year period from and after the warranty date, the dwelling shall be free from major structural defects due to noncompliance with building standards.`,

    "MN 3-Day Notice of Cancellation (Duplicate)": `NOTICE OF CANCELLATION (MN STATUTE 325G.08)
(Required to be provided in DUPLICATE)

Date of Transaction: __________

You may CANCEL this transaction, without any penalty or obligation, within THREE BUSINESS DAYS from the above date. If you cancel, any property traded in, any payments made by you under the contract or sale, and any negotiable instrument executed by you will be returned within TEN BUSINESS DAYS following receipt by the seller of your cancellation notice.

To cancel this transaction, mail or deliver a signed and dated copy of this cancellation notice or any other written notice, or send a telegram to: 
[Contractor Name] at [Address] 
NOT LATER THAN MIDNIGHT OF: [Date]`,

    "MN Pre-Lien Notice (Statute 514.011)": `MECHANIC'S LIEN PRE-LIEN NOTICE (MN STATUTE 514.011)

(a) ANY PERSON OR COMPANY SUPPLYING LABOR OR MATERIALS FOR THIS IMPROVEMENT TO YOUR PROPERTY MAY FILE A LIEN AGAINST YOUR PROPERTY IF THAT PERSON OR COMPANY IS NOT PAID FOR THE CONTRIBUTIONS.

(b) UNDER MINNESOTA LAW, YOU HAVE THE RIGHT TO PAY PERSONS WHO SUPPLIED LABOR OR MATERIALS FOR THIS IMPROVEMENT DIRECTLY AND DEDUCT THIS AMOUNT FROM OUR CONTRACT PRICE, OR WITHHOLD THE AMOUNTS DUE THEM FROM US UNTIL 120 DAYS AFTER COMPLETION OF THE IMPROVEMENT UNLESS WE GIVE YOU A LIEN WAIVER SIGNED BY PERSONS WHO SUPPLIED ANY LABOR OR MATERIAL FOR THE IMPROVEMENT AND WHO GAVE YOU TIMELY NOTICE.`,

    "Insurance Fraud & Deductible (MN 325E.66)": `MANDATORY MINNESOTA STATUTE 325E.66 DISCLOSURE:

A residential contractor who provides goods or services to be paid by an insured from the proceeds of a property or casualty insurance policy shall not advertise or promise to pay or rebate all or any portion of any applicable insurance deductible as an inducement to the sale of goods or services. 

As used in this section, a promise to pay or rebate includes granting any allowance or offering any discount against the fees to be charged or paying the insured or any person directly or indirectly associated with the property any form of compensation, gift, prize, bonus, coupon, credit, referral fee, or other item of monetary value for any reason.`,

    "Cancellation if Claim Denied (MN 326B.811)": `72-HOUR RIGHT TO CANCEL (MN STATUTE 326B.811)

A person who has entered into a written contract with a residential contractor to provide goods or services to be paid by the insured from the proceeds of a property or casualty insurance policy has the right to cancel the contract within 72 hours after the insured has been notified by the insurer that the claim has been denied. 

Cancellation is evidenced by the insured giving written notice of cancellation to the contractor at the address stated in the contract. Notice of cancellation, if given by mail, is effective upon deposit in a United States mailbox, proper postage prepaid, and addressed to the contractor.`,

    "Lead Warning Statement (EPA/MN)": `EPA LEAD-BASED PAINT WARNING STATEMENT

Housing built before 1978 may contain lead-based paint. Lead from paint, paint chips, and dust can pose health hazards if not managed properly. Lead exposure is especially harmful to young children and pregnant women. 

Before rehabilitating pre-1978 housing, contractors must give you a copy of the pamphlet "Protect Your Family from Lead in Your Home." Contractors performing renovation, repair, and painting projects in pre-1978 homes must be lead-safe certified by the EPA or an authorized state program.`
  };

  const DocumentModal = () => (
    <div className="fixed inset-0 bg-slate-900/95 flex items-center justify-center p-4 z-50 backdrop-blur-xl">
      <div className="bg-white rounded-[3.5rem] w-full max-w-3xl p-10 shadow-2xl border border-slate-100 overflow-y-auto max-h-[95vh]">
        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-2xl text-white"><ShieldCheck size={32} /></div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Official Template</h2>
          </div>
          <button onClick={() => setActiveDoc(null)} className="bg-slate-100 p-4 rounded-full text-slate-500 font-black hover:bg-red-50 hover:text-red-500 transition-colors">✕</button>
        </div>
        
        <div className="bg-slate-50 p-8 rounded-[2.5rem] font-mono text-[13px] border border-slate-200 whitespace-pre-wrap leading-relaxed text-slate-800 shadow-inner mb-8">
          <div className="font-black uppercase mb-6 text-blue-700 border-b-2 border-blue-200/30 pb-4 flex justify-between">
            <span>{userProfile.companyName}</span>
            <span className="text-slate-400 font-bold">MN LIC# {userProfile.licenseNum}</span>
          </div>
          {templates[activeDoc]}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => window.print()} className="bg-blue-600 text-white py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-300">
            <Printer size={24} /> Print Full Form
          </button>
          <button onClick={() => setActiveDoc(null)} className="bg-slate-900 text-white py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all">
             Close Preview
          </button>
        </div>
      </div>
    </div>
  );

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6 md:p-12 font-sans">
        {activeDoc && <DocumentModal />}
        <header className="max-w-4xl mx-auto flex justify-between items-center mb-16">
          <div className="flex items-center gap-3 text-3xl font-black italic tracking-tighter text-blue-400 group cursor-pointer" onClick={() => setView('landing')}>
            <Zap fill="currentColor" className="group-hover:scale-110 transition-transform" /> ShieldPro
          </div>
          <div className="bg-slate-800 px-6 py-3 rounded-2xl border border-slate-700 flex items-center gap-3">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
             <span className="text-xs font-black uppercase tracking-widest text-slate-400">Compliance Active</span>
          </div>
        </header>
        <main className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-6xl font-black mb-4 tracking-tighter leading-none">Legal Vault</h1>
            <p className="text-blue-400 font-bold text-lg uppercase tracking-widest">{userProfile.companyName}</p>
          </div>
          <div className="grid gap-4">
            {checklistItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-10 bg-slate-800/40 rounded-[3rem] border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="bg-blue-500/10 p-4 rounded-2xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all"><FileText size={24} /></div>
                  <span className="font-bold text-slate-200 text-xl leading-tight">{item.text}</span>
                </div>
                <button onClick={() => setActiveDoc(item.text)} className="bg-white text-slate-900 px-8 py-4 rounded-2xl text-xs font-black tracking-widest uppercase hover:bg-blue-500 hover:text-white transition-all shadow-lg">VIEW FORM</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px]" />
      <Zap className="text-blue-500 mb-8 animate-bounce" size={100} fill="currentColor" />
      <h1 className="text-[5.5rem] md:text-[9rem] font-black mb-6 tracking-tighter leading-none italic drop-shadow-2xl">ShieldPro</h1>
      <p className="text-2xl md:text-3xl text-slate-400 mb-16 max-w-2xl font-medium leading-relaxed">Minnesota's smartest restoration sales engine.</p>
      <button onClick={() => setView('dashboard')} className="group relative bg-blue-600 text-white px-16 py-10 rounded-[3rem] font-black text-3xl shadow-2xl shadow-blue-500/40 flex items-center gap-6 hover:bg-blue-500 transition-all active:scale-95">
        ENTER YOUR HQ <ArrowRight size={32} className="group-hover:translate-x-3 transition-transform" />
      </button>
    </div>
  );
};

export default App;
