import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  signInWithCustomToken, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { 
  CheckCircle2, 
  FileText, 
  ClipboardCheck, 
  ShieldAlert, 
  UserPlus, 
  DollarSign,
  AlertTriangle,
  Printer,
  Save,
  LayoutDashboard,
  Users,
  CreditCard,
  ChevronRight,
  TrendingUp,
  Loader2,
  Zap,
  Check,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
  Lock
} from 'lucide-react';

// Firebase configuration using environment variables
const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'storm-shield-v3';

const App = () => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('landing'); 
  const [loading, setLoading] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "Signed Contingency Agreement", completed: false, required: true },
    { id: 2, text: "3-Day Right to Rescind Notice", completed: false, required: true },
    { id: 3, text: "Notice of Cancellation (Dual Copies)", completed: false, required: true },
    { id: 4, text: "Insurance Scope of Loss", completed: false, required: true },
    { id: 5, text: "Pre-Repair Photo Documentation", completed: false, required: true },
    { id: 6, text: "Direction to Pay / AOB", completed: false, required: false },
    { id: 7, text: "Deductible Acknowledgement", completed: false, required: true },
  ]);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else if (!auth.currentUser) {
          await signInAnonymously(auth);
        }
      } catch (err) { console.error(err); }
    };
    handleAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const profileRef = doc(db, 'artifacts', appId, 'users', user.uid, 'settings', 'profile');
    const dataRef = doc(db, 'artifacts', appId, 'users', user.uid, 'settings', 'appState');

    const unsubProfile = onSnapshot(profileRef, (snap) => {
      if (snap.exists()) setUserProfile(snap.data());
      else setDoc(profileRef, { plan: 'free', companyName: 'New Storm Co' }, { merge: true });
    });

    const unsubData = onSnapshot(dataRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data.checklist) setChecklistItems(data.checklist);
      }
    });

    return () => { unsubProfile(); unsubData(); };
  }, [user]);

  const saveChecklist = async (items) => {
    if (!user) return;
    const dataRef = doc(db, 'artifacts', appId, 'users', user.uid, 'settings', 'appState');
    await setDoc(dataRef, { checklist: items, lastUpdated: new Date().toISOString() }, { merge: true });
  };

  const triggerStripeCheckout = (planName) => {
    setView('checkout_processing');
    setIsProcessingPayment(true);
    setTimeout(async () => {
      const profileRef = doc(db, 'artifacts', appId, 'users', user.uid, 'settings', 'profile');
      await setDoc(profileRef, { plan: planName.toLowerCase(), status: 'active' }, { merge: true });
      setIsProcessingPayment(false);
      setView('purchase_success');
    }, 2500);
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <nav className="flex justify-between items-center px-6 md:px-20 py-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-black text-2xl">
            <Zap className="text-blue-600 fill-blue-600" size={32} />
            StormShield<span className="text-blue-600">Pro</span>
          </div>
          <button onClick={() => setView('pricing')} className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:scale-105 transition shadow-lg">Get Started</button>
        </nav>
        <section className="px-6 py-20 text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-black mb-8 leading-[1.1]">The Only Way to <span className="text-blue-600 underline">Automate</span> Your Restoration Sales.</h1>
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto font-medium">Compliance, contracts, and crew tracking in one high-performance dashboard.</p>
          <button onClick={() => setView('pricing')} className="bg-blue-600 text-white px-12 py-5 rounded-3xl font-black text-xl flex items-center gap-3 mx-auto hover:bg-blue-700 transition shadow-2xl shadow-blue-200">
            Launch Your Digital Office <ArrowRight />
          </button>
        </section>
      </div>
    );
  }

  if (view === 'pricing') {
    return (
      <div className="min-h-screen bg-slate-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Plans for Serious Growth</h2>
          <p className="text-slate-500 font-medium">Unlock the full power of StormShield Pro today.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PriceCard title="Standard" price="99" features={["5 Reps", "Checklists"]} onBuy={() => triggerStripeCheckout('Standard')} />
          <PriceCard title="Business" price="199" featured features={["Unlimited Reps", "PDF Contracts", "Dashboard"]} onBuy={() => triggerStripeCheckout('Business')} />
          <PriceCard title="Enterprise" price="499" features={["Whitelabeling", "API", "Priority Support"]} onBuy={() => triggerStripeCheckout('Enterprise')} />
        </div>
      </div>
    );
  }

  if (view === 'checkout_processing') {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white p-6">
        <div className="w-full max-w-md bg-slate-50 rounded-[2.5rem] p-10 text-center border border-slate-100">
          <Loader2 className="animate-spin text-blue-600 mx-auto mb-6" size={40} />
          <h2 className="text-2xl font-black mb-2">Connecting Stripe...</h2>
          <p className="text-slate-500 text-sm">Securing your private payment vault.</p>
        </div>
      </div>
    );
  }

  if (view === 'purchase_success') {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-blue-600 text-white p-6">
        <CheckCircle2 size={80} className="mb-6" />
        <h2 className="text-4xl font-black mb-4">You're Verified!</h2>
        <button onClick={() => setView('dashboard')} className="bg-white text-blue-600 px-12 py-4 rounded-3xl font-black text-lg">Enter Dashboard</button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10 font-black text-2xl"><Zap className="text-blue-500" /> Shield</div>
        <nav className="space-y-2 flex-1">
          <SideBtn active label="Dashboard" icon={<LayoutDashboard size={20}/>} />
          <SideBtn label="Checklists" icon={<ClipboardCheck size={20}/>} />
          <SideBtn label="Teams" icon={<Users size={20}/>} />
        </nav>
        <div className="bg-blue-600 p-4 rounded-2xl">
          <p className="text-[10px] font-black uppercase opacity-60">Plan Status</p>
          <p className="font-bold capitalize">{userProfile?.plan || 'Free'} Member</p>
        </div>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black">Company Pulse</h1>
          <button onClick={() => setView('landing')} className="text-slate-400 font-bold hover:text-slate-900">Sign Out</button>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Box label="Active Claims" val="12" />
          <Box label="Pending Docs" val="04" />
          <Box label="Revenue Est" val="$142k" />
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200">
          <h3 className="font-black text-lg mb-6">Master Compliance Checklist</h3>
          <div className="space-y-4">
            {checklistItems.map(item => (
              <div 
                key={item.id} 
                onClick={() => {
                  const next = checklistItems.map(i => i.id === item.id ? {...i, completed: !i.completed} : i);
                  setChecklistItems(next);
                  saveChecklist(next);
                }}
                className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition"
              >
                <div className="flex items-center gap-4">
                  <div className={`h-6 w-6 rounded-lg border-2 flex items-center justify-center ${item.completed ? 'bg-blue-600 border-blue-600' : 'border-slate-200 bg-white'}`}>
                    {item.completed && <Check size={14} className="text-white" strokeWidth={4} />}
                  </div>
                  <span className={`font-bold ${item.completed ? 'text-slate-300 line-through' : 'text-slate-700'}`}>{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const PriceCard = ({ title, price, features, featured, onBuy }) => (
  <div className={`p-10 rounded-[3rem] border-2 bg-white ${featured ? 'border-blue-600 ring-8 ring-blue-50' : 'border-slate-100'}`}>
    <h3 className="text-xl font-black mb-2">{title}</h3>
    <p className="text-4xl font-black mb-8">${price}<span className="text-sm font-bold text-slate-400">/mo</span></p>
    <ul className="space-y-4 mb-10">
      {features.map((f, i) => <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-600"><Check size={16} className="text-blue-600" /> {f}</li>)}
    </ul>
    <button onClick={onBuy} className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black hover:bg-blue-600 transition shadow-xl">Select {title}</button>
  </div>
);

const SideBtn = ({ label, icon, active }) => (
  <div className={`flex items-center gap-3 p-4 rounded-xl font-bold transition cursor-pointer ${active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
    {icon} {label}
  </div>
);

const Box = ({ label, val }) => (
  <div className="bg-white p-8 rounded-[2rem] border border-slate-200 text-center shadow-sm">
    <p className="text-3xl font-black">{val}</p>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{label}</p>
  </div>
);

export default App;

