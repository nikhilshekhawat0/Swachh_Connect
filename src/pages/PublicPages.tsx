import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Recycle, Shield, BarChart3, Bell, Users, Trash2, ChevronRight, Eye, EyeOff, Leaf, AlertTriangle, CheckCircle, Brain, Target, TrendingUp, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { validateEmail } from '../utils/helpers';

// ====== NAVBAR ======
export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">SwachhConnect</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/about" className="text-gray-600 hover:text-primary-600 transition-colors text-sm font-medium">About</Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-primary-600 transition-colors text-sm font-medium">How It Works</Link>
            <Link to="/login" className="text-gray-600 hover:text-primary-600 transition-colors text-sm font-medium">Login</Link>
            <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">Get Started</Link>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2"><Menu className="w-5 h-5" /></button>
        </div>
        {open && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-3 space-y-2">
            <Link to="/about" className="block py-2 text-gray-600" onClick={() => setOpen(false)}>About</Link>
            <Link to="/how-it-works" className="block py-2 text-gray-600" onClick={() => setOpen(false)}>How It Works</Link>
            <Link to="/login" className="block py-2 text-gray-600" onClick={() => setOpen(false)}>Login</Link>
            <Link to="/register" className="block py-2 text-primary-600 font-medium" onClick={() => setOpen(false)}>Get Started</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

// ====== FOOTER ======
export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center"><Leaf className="w-5 h-5 text-white" /></div>
              <span className="font-bold text-lg text-white">SwachhConnect</span>
            </div>
            <p className="text-sm text-gray-400">Connect. Report. Resolve. Clean. A smarter way to manage community waste.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Platform</h4>
            <div className="space-y-2 text-sm">
              <Link to="/about" className="block hover:text-white">About</Link>
              <Link to="/how-it-works" className="block hover:text-white">How It Works</Link>
              <Link to="/login" className="block hover:text-white">Login</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Demo Accounts</h4>
            <div className="space-y-1 text-sm text-gray-400">
              <p>Citizen: citizen@demo.com</p>
              <p>Worker: worker@demo.com</p>
              <p>Admin: admin@demo.com</p>
              <p className="text-gray-500">Password: 123456</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Technology</h4>
            <div className="space-y-1 text-sm text-gray-400">
              <p>React + Vite</p>
              <p>Tailwind CSS</p>
              <p>AI/ML Ready Architecture</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>© 2026 SwachhConnect. B.Tech CSE AI/ML Project. Prototype – Simulated AI/ML features.</p>
        </div>
      </div>
    </footer>
  );
}

// ====== HOME PAGE ======
export function HomePage() {
  return (
    <div>
      <Navbar />
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                <Leaf className="w-4 h-4" /> Smart Waste Management
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Connect. Report.<br /><span className="text-primary-600">Resolve. Clean.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">A smarter way to connect communities with waste management. Report issues, track resolutions, and help build cleaner neighborhoods with AI-powered insights.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register" className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-flex items-center gap-2">
                  Report Waste <ChevronRight className="w-4 h-4" />
                </Link>
                <Link to="/how-it-works" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Explore SwachhConnect
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center"><MapPin className="w-5 h-5 text-primary-600" /></div>
                    <div><p className="font-semibold text-gray-900">Sector 14 Hotspot</p><p className="text-sm text-gray-500">CleanScore: 45/100</p></div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex justify-between text-sm mb-2"><span className="text-gray-600">Complaints Resolved</span><span className="font-semibold text-primary-600">87%</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-primary-500 h-2 rounded-full" style={{width:'87%'}}></div></div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-blue-50 rounded-lg p-3 text-center"><p className="text-lg font-bold text-blue-700">156</p><p className="text-xs text-blue-600">Reports</p></div>
                    <div className="bg-green-50 rounded-lg p-3 text-center"><p className="text-lg font-bold text-green-700">136</p><p className="text-xs text-green-600">Resolved</p></div>
                    <div className="bg-orange-50 rounded-lg p-3 text-center"><p className="text-lg font-bold text-orange-700">20</p><p className="text-xs text-orange-600">Pending</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[{ num: '2,450+', label: 'Reports Resolved', icon: CheckCircle }, { num: '1,200+', label: 'Active Citizens', icon: Users }, { num: '85+', label: 'Active Workers', icon: Trash2 }, { num: '3,100+', label: 'Issues Tracked', icon: BarChart3 }].map((s, i) => (
              <div key={i} className="text-center p-6 rounded-xl border border-gray-100 hover:border-primary-200 transition-colors">
                <s.icon className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                <p className="text-2xl lg:text-3xl font-bold text-gray-900">{s.num}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How SwachhConnect Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">From reporting to resolution, our platform streamlines the entire waste management process.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Report Waste', desc: 'Citizens capture photos and locations of waste issues. AI classifies the waste type automatically.', icon: MapPin },
              { step: '02', title: 'Analyze & Assign', desc: 'System predicts priority, identifies hotspots, and administrators assign workers efficiently.', icon: Brain },
              { step: '03', title: 'Resolve & Track', desc: 'Workers complete cleanup, upload proof, and citizens verify resolution. Data drives prevention.', icon: CheckCircle },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center"><item.icon className="w-6 h-6 text-primary-600" /></div>
                  <span className="text-3xl font-bold text-primary-200">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI/ML Highlight */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Brain className="w-4 h-4" /> AI/ML Powered
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Intelligent Waste Management</h2>
              <p className="text-gray-600 mb-6">SwachhConnect uses simulated AI/ML concepts to demonstrate how machine learning can transform waste management — from automatic waste classification to predictive hotspot detection.</p>
              <div className="space-y-4">
                {[
                  { title: 'Waste Classification', desc: 'AI classifies waste type from images with confidence scores', icon: Target },
                  { title: 'Hotspot Detection', desc: 'Geographic clustering identifies recurring problem areas', icon: MapPin },
                  { title: 'CleanScore Analytics', desc: 'Area cleanliness scored 0-100 with trend analysis', icon: TrendingUp },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"><f.icon className="w-4 h-4 text-primary-600" /></div>
                    <div><p className="font-medium text-gray-900">{f.title}</p><p className="text-sm text-gray-500">{f.desc}</p></div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-gray-400 italic">* AI/ML features in this prototype are simulated demonstrations. No real ML model is deployed.</p>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4"><Brain className="w-5 h-5 text-purple-600" /><span className="font-semibold text-gray-900">AI Classification Result</span></div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Predicted Type</span><span className="font-semibold text-primary-600">Plastic</span></div>
                  <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Confidence</span><span className="font-semibold">94%</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-primary-500 h-2 rounded-full" style={{width:'94%'}}></div></div>
                  <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Priority</span><span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-medium">High</span></div>
                  <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Disposal</span><span className="text-sm text-gray-700">Blue bin – Rinse first</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Make Your Community Cleaner?</h2>
          <p className="text-primary-100 mb-8 text-lg">Join SwachhConnect and be part of the solution. Report waste, track progress, and earn community points.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors">Get Started Free</Link>
            <Link to="/login" className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-500 transition-colors">Login to Dashboard</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ====== ABOUT PAGE ======
export function AboutPage() {
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About SwachhConnect</h1>
        <div className="prose max-w-none space-y-8">
          <section className="bg-white rounded-xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Project Purpose</h2>
            <p className="text-gray-600">SwachhConnect is a smart community waste management platform designed as a B.Tech CSE AI/ML project. It demonstrates how technology, data analytics, and AI/ML concepts can transform urban waste management from reactive complaint handling to proactive, data-driven prevention.</p>
          </section>
          <section className="bg-white rounded-xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Problem Statement</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              {['Improper waste disposal and overflowing garbage bins', 'Irregular waste collection and poor segregation', 'Illegal dumping and recurring garbage hotspots', 'Weak citizen-authority communication', 'Lack of complaint transparency and slow resolution', 'Limited data for preventive waste management'].map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </section>
          <section className="bg-white rounded-xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Proposed Solution</h2>
            <p className="text-gray-600 mb-3">SwachhConnect connects three key actors — Citizens, Waste Workers, and Administrators — through a unified platform that enables:</p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              {['Citizens to report waste with images and GPS locations', 'AI-simulated waste classification and priority prediction', 'Administrators to manage, assign, and track complaints', 'Workers to receive tasks and upload cleanup proof', 'Analytics and hotspot detection for preventive management', 'CleanScore system for area-wise cleanliness tracking'].map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </section>
          <section className="bg-white rounded-xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Technology Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['React + Vite', 'Tailwind CSS', 'React Router', 'Recharts', 'Leaflet Maps', 'Lucide Icons', 'Context API', 'localStorage', 'AI Simulation'].map((t, i) => (
                <div key={i} className="bg-primary-50 text-primary-700 px-3 py-2 rounded-lg text-sm font-medium text-center">{t}</div>
              ))}
            </div>
          </section>
          <section className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-1">AI/ML Disclaimer</h3>
                <p className="text-sm text-yellow-700">The AI/ML features in this React prototype are simulated demonstrations. No real machine learning model has been trained or deployed. The classification, priority prediction, and hotspot detection use rule-based mock logic. Future versions may integrate real ML models (MobileNetV2, Random Forest, DBSCAN) via a backend API.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ====== HOW IT WORKS PAGE ======
export function HowItWorksPage() {
  const steps = [
    { title: 'Report Waste', desc: 'Citizen captures photo and location of the waste issue', icon: MapPin },
    { title: 'Upload Image', desc: 'Image is uploaded for AI analysis and evidence', icon: Trash2 },
    { title: 'AI Classification', desc: 'Simulated AI classifies waste type with confidence score', icon: Brain },
    { title: 'Priority Prediction', desc: 'System predicts priority based on severity and context', icon: Target },
    { title: 'Admin Review', desc: 'Administrator reviews and validates the complaint', icon: Shield },
    { title: 'Worker Assignment', desc: 'Appropriate worker is assigned based on area and availability', icon: Users },
    { title: 'Cleanup', desc: 'Worker performs cleanup and uploads proof photo', icon: CheckCircle },
    { title: 'Citizen Verification', desc: 'Citizen verifies resolution and provides feedback', icon: Bell },
    { title: 'Analytics Update', desc: 'Data contributes to hotspot detection and CleanScore', icon: BarChart3 },
  ];
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">How It Works</h1>
        <p className="text-gray-600 mb-12">The complete workflow from waste reporting to resolution and analytics.</p>
        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 hover:border-primary-200 transition-colors">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <step.icon className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-primary-500">STEP {i + 1}</span>
                </div>
                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/register" className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-flex items-center gap-2">
            Start Reporting <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ====== LOGIN PAGE ======
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields'); return; }
    if (!validateEmail(email)) { setError('Please enter a valid email'); return; }
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.success) {
        const user = JSON.parse(localStorage.getItem('swachhconnect_user') || '{}');
        if (user.role === 'admin') navigate('/admin/dashboard');
        else if (user.role === 'worker') navigate('/worker/dashboard');
        else navigate('/citizen/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    }, 800);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4"><Leaf className="w-6 h-6 text-primary-600" /></div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-500 text-sm mt-1">Login to your SwachhConnect account</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all pr-10" placeholder="••••••" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50">
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 text-center mb-3">Demo Accounts</p>
              <div className="grid grid-cols-3 gap-2">
                {[{ role: 'Citizen', email: 'citizen@demo.com' }, { role: 'Worker', email: 'worker@demo.com' }, { role: 'Admin', email: 'admin@demo.com' }].map(d => (
                  <button key={d.role} onClick={() => { setEmail(d.email); setPassword('123456'); }} className="text-xs bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-200 rounded-lg px-2 py-2 text-center transition-colors">
                    <span className="block font-medium text-gray-700">{d.role}</span>
                    <span className="text-gray-400">{d.email}</span>
                  </button>
                ))}
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-6">Don't have an account? <Link to="/register" className="text-primary-600 font-medium hover:underline">Register</Link></p>
            <p className="text-center text-xs text-gray-400 mt-2">This is prototype authentication for demonstration purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ====== REGISTER PAGE ======
export function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', address: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password) { setError('Please fill in required fields'); return; }
    if (!validateEmail(form.email)) { setError('Please enter a valid email'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    setLoading(true);
    setTimeout(() => {
      const result = register(form);
      setLoading(false);
      if (result.success) navigate('/citizen/dashboard');
      else setError(result.error || 'Registration failed');
    }, 800);
  };

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
              <p className="text-gray-500 text-sm mt-1">Join SwachhConnect as a citizen</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input type="text" value={form.name} onChange={e => update('name', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="9876543210" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input type="text" value={form.address} onChange={e => update('address', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="Your area/locality" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                <input type="password" value={form.password} onChange={e => update('password', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="Min 6 characters" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                <input type="password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="Re-enter password" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50">
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-6">Already have an account? <Link to="/login" className="text-primary-600 font-medium hover:underline">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
