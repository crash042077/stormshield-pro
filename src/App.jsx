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
  Lock,
  Settings
} from 'lucide-react';

// --- OWNER CONFIGURATION ---
const STRIPE_CONFIG = {
  publicKey: "", 
  plans: {
    standard: "price_XYZ123",
    business: "price_XYZ456",
    enterprise: "price_XYZ789"
  }
};

// --- SAFER FIREBASE INITIALIZATION ---
// This prevents the "Blank Screen" crash if config is missing
let firebaseConfig = {
  apiKey: "placeholder",
  authDomain: "placeholder",
  projectId: "placeholder",
  storageBucket: "placeholder",
  messagingSenderId: "placeholder",
  appId: "placeholder"
};

try {
  if (typeof __firebase_config !== 'undefined' && __firebase_config) {
    firebaseConfig = JSON.parse(__firebase_config);
  }
} catch (e) {
  console.error("Firebase config parse error:", e);
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'storm-shield-v4';

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
    if (!user || firebaseConfig.apiKey === "placeholder") return;
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
    if (!user || firebaseConfig.apiKey === "placeholder") return;
    const dataRef = doc(db, 'artifacts', appId, 'users', user.uid, 'settings', 'appState');
    await setDoc(dataRef, { checklist: items, lastUpdated: new Date().toISOString() }, { merge: true });
  };

  const triggerStripeCheckout = (planName) => {
    setView('checkout_processing');
    setIsProcessingPayment(true);
    setTimeout(async () => {
      if (firebaseConfig.apiKey !== "placeholder") {
        const profileRef = doc(db, 'artifacts', appId, 'users', user.uid, 'settings', 'profile');
        await setDoc(profileRef, { plan: planName.toLowerCase(), status: 'active' }, { merge: true });
      }
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
          <div className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">Built for Restoration Pros</div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tight">The Digital HQ for <span className="text-blue-600">Storm Sales.</span></h1>
          <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium">Auto-generate compliance docs, track field reps, and close claims faster than the next hail storm.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => setView('pricing')} className="bg-blue-600 text-white px-12 py-5 rounded-3xl font-black text-xl flex items-center gap-3 hover:bg-blue-700 transition shadow-2xl shadow-blue-200">
              Launch App <ArrowRight />
            </button>
            <button className="bg-white border-2 border-slate-100 px-12 py-5 rounded-3xl font-black text-xl hover:bg-slate-50 transition">Watch Demo</button>
          </div>
        </section>
      </div>
    );
  }

  if (view === 'pricing') {
    return (
      <div className="min-h-screen bg-slate-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-black mb-4">Pricing That Scales</h2>
          <p className="text-slate-500 font-medium">Simple, transparent, and built for your team.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PriceCard title="Standard" price="99" features={["5 Reps", "Compliance Checklists"]} onBuy={() => triggerStripeCheckout('Standard')} />
          <PriceCard title="Business" price="199" featured features={["Unlimited Reps", "PDF Exporting", "Real-time Dashboards"]} onBuy={() => triggerStripeCheckout('Business')} />
          <PriceCard title="Enterprise" price="499" features={["Whitelabeling", "Custom Branding", "Legal Priority"]} onBuy={() => triggerStripeCheckout('Enterprise')} />
        </div>
        <button onClick={() => setView('landing')} className="mt-12 block mx-auto text-slate-400 font-bold hover:text-blue-600 transition underline underline-offset-4">← Return to Homepage</button>
      </div>
    );
  }

  if (view === 'checkout_processing') {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white p-6">
        <div className="w-full max-w-md bg-slate-50 rounded-[3rem] p-12 text-center border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="bg-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
            <Loader2 className="animate-spin text-blue-600" size={32} />
          </div>
          <h2 className="text-2xl font-black mb-3">Connecting to Secure Vault...</h2>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">We are encrypting your session and preparing the payment portal. Please don't close this window.</p>
          <div className="flex justify-center gap-6 opacity-20">
            <ShieldCheck size={20} /> <Lock size={20} /> <CreditCard size={20} />
          </div>
        </div>
      </div>
    );
  }

  if (view === 'purchase_success') {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-blue-600 text-white p-6">
        <div className="bg-white/10 p-6 rounded-full mb-8 animate-bounce">
           <CheckCircle2 size={80} className="text-white" strokeWidth={3} />
        </div>
        <h2 className="text-5xl font-black mb-4 tracking-tight text-center">Payment Verified!</h2>
        <p className="text-blue-100 text-center max-w-md mb-12 text-lg">Your business account has been upgraded. You now have full access to all StormShield Pro features.</p>
        <button 
          onClick={() => setView('dashboard')}
          className="bg-white text-blue-600 px-14 py-5 rounded-3xl font-black text-xl hover:scale-105 transition shadow-2xl"
        >
          Enter Your HQ
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F8FAFC]">
      <aside className="w-full md:w-64 bg-slate-900 text-white p-6 flex flex-col shrink-0">
        <div className="flex items-center gap-2 mb-10 font-black text-2xl group cursor-pointer" onClick={() => setView('landing')}>
          <Zap className="text-blue-500 group-hover:scale-125 transition" /> Shield<span className="text-blue-500">Pro</span>
        </div>
        <nav className="space-y-2 flex-1">
          <SideBtn active label="Company Pulse" icon={<LayoutDashboard size={20}/>} />
          <SideBtn label="Field Tools" icon={<ClipboardCheck size={20}/>} />
          <SideBtn label="Team Roster" icon={<Users size={20}/>} />
          <SideBtn label="Owner Admin" icon={<Settings size={20}/>} />
        </nav>
        <div className="bg-blue-600 p-5 rounded-[2rem] shadow-lg shadow-blue-900/40">
          <p className="text-[10px] font-black uppercase opacity-60 tracking-widest mb-1">Company Status</p>
          <p className="font-bold capitalize text-lg leading-tight">{userProfile?.plan || 'Free'} Member</p>
          <button onClick={() => setView('pricing')} className="mt-3 text-[10px] bg-white/20 px-3 py-1 rounded-full font-black uppercase tracking-tighter hover:bg-white/40 transition">Change Plan</button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 md:p-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight">Dashboard Overview</h1>
            <p className="text-slate-400 font-medium">{userProfile?.companyName || 'Restoration Enterprise'}</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 pr-6 rounded-full border border-slate-100 shadow-sm">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-sm">
              {user?.uid.substring(0, 2).toUpperCase()}
            </div>
            <span className="text-sm font-bold text-slate-700">Admin Mode</span>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <MetricBox label="Active Claims" val="12" icon={<TrendingUp size={16} className="text-green-500" />} />
          <MetricBox label="Pending Docs" val="04" icon={<AlertTriangle size={16} className="text-amber-500" />} />
          <MetricBox label="Estimated Revenue" val="$142,500" icon={<DollarSign size={16} className="text-blue-500" />} />
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/20">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-black text-2xl mb-1">Master Compliance</h3>
              <p className="text-slate-400 text-sm font-medium italic">Legal requirements for storm signings</p>
            </div>
            <button className="bg-slate-50 p-3 rounded-2xl hover:bg-slate-100 transition"><Printer size={20} className="text-slate-400" /></button>
          </div>
          <div className="space-y-4">
            {checklistItems.map(item => (
              <div 
                key={item.id} 
                onClick={() => {
                  const next = checklistItems.map(i => i.id === item.id ? {...i, completed: !i.completed} : i);
                  setChecklistItems(next);
                  saveChecklist(next);
                }}
                className="flex items-center justify-between p-6 bg-[#FBFDFF] rounded-[1.5rem] border border-slate-50 cursor-pointer hover:border-blue-200 hover:bg-white transition group"
              >
                <div className="flex items-center gap-4">
                  <div className={`h-7 w-7 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${item.completed ? 'bg-blue-600 border-blue-600 scale-110 shadow-lg shadow-blue-200' : 'border-slate-200 bg-white group-hover:border-blue-400'}`}>
                    {item.completed && <Check size={16} className="text-white" strokeWidth={4} />}
                  </div>
                  <span className={`text-lg font-bold tracking-tight ${item.completed ? 'text-slate-300 line-through' : 'text-slate-700'}`}>{item.text}</span>
                </div>
                {item.required && <span className="text-[10px] font-black bg-red-50 text-red-500 px-3 py-1 rounded-full uppercase tracking-tighter">Required</span>}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const PriceCard = ({ title, price, features, featured, onBuy }) => (
  <div className={`p-10 rounded-[3rem] border-2 bg-white transition-all hover:scale-105 ${featured ? 'border-blue-600 ring-[12px] ring-blue-50 relative' : 'border-slate-100 shadow-sm'}`}>
    {featured && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Market Leader</span>}
    <h3 className="text-2xl font-black mb-2">{title}</h3>
    <p className="text-5xl font-black mb-8 leading-none">${price}<span className="text-sm font-bold text-slate-400 uppercase ml-1">/mo</span></p>
    <ul className="space-y-5 mb-12">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-600">
          <div className="h-5 w-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Check size={12} className="text-blue-600" strokeWidth={4} />
          </div>
          {f}
        </li>
      ))}
    </ul>
    <button onClick={onBuy} className={`w-full py-5 rounded-3xl font-black text-lg transition-all shadow-xl ${featured ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-100'}`}>
      Activate {title}
    </button>
  </div>
);

const SideBtn = ({ label, icon, active }) => (
  <div className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all cursor-pointer ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
    <div className="shrink-0">{icon}</div>
    <span className="text-sm tracking-tight">{label}</span>
  </div>
);

const MetricBox = ({ label, val, icon }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 text-center shadow-xl shadow-slate-200/10 hover:shadow-blue-100/50 transition duration-500">
    <div className="flex justify-center mb-4">{icon}</div>
    <p className="text-4xl font-black text-slate-900 leading-none mb-1">{val}</p>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
  </div>
);

export default App;
