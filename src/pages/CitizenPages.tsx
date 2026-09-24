import React, { useState, useMemo, useRef } from 'react';
import { Link, useParams, useNavigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, FileText, MapPin, Calendar, Recycle, Bell, User, LogOut, Menu, X, Plus, Clock, CheckCircle, AlertCircle, Camera, Upload, Brain, ChevronRight, Star, Award, TrendingUp, Filter, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { mockRecyclingCenters, collectionSchedule, WASTE_TYPES } from '../data/mockData';
import { simulateAIClassification, predictPriority, generateComplaintId, formatDate, formatDateTime, formatTimeAgo, getStatusColor, getPriorityColor, getCleanScoreColor } from '../utils/helpers';

// ====== CITIZEN LAYOUT ======
export function CitizenLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { notifications } = useApp();
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => n.userId === currentUser?.id && !n.read).length;

  const links = [
    { to: '/citizen/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/citizen/report', label: 'Report Waste', icon: Plus },
    { to: '/citizen/complaints', label: 'My Complaints', icon: FileText },
    { to: '/citizen/map', label: 'Area Map', icon: MapPin },
    { to: '/citizen/schedule', label: 'Collection Schedule', icon: Calendar },
    { to: '/citizen/recycling', label: 'Recycling Centers', icon: Recycle },
    { to: '/citizen/notifications', label: 'Notifications', icon: Bell },
    { to: '/citizen/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transform transition-transform duration-200 lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <Link to="/citizen/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center"><span className="text-white text-sm font-bold">SC</span></div>
              <span className="font-bold text-gray-900">SwachhConnect</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1"><X className="w-5 h-5" /></button>
          </div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
            {links.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition-colors [&.active]:bg-primary-50 [&.active]:text-primary-700">
                <l.icon className="w-4 h-4" />{l.label}
                {l.label === 'Notifications' && unreadCount > 0 && <span className="ml-auto bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{unreadCount}</span>}
              </Link>
            ))}
          </nav>
          <div className="p-3 border-t border-gray-100">
            <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 w-full transition-colors">
              <LogOut className="w-4 h-4" />Logout
            </button>
          </div>
        </div>
      </aside>
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-100 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2"><Menu className="w-5 h-5" /></button>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">Welcome,</span>
            <span className="font-medium text-gray-900 text-sm">{currentUser?.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/citizen/notifications" className="relative p-2 hover:bg-gray-50 rounded-lg">
              <Bell className="w-5 h-5 text-gray-500" />
              {unreadCount > 0 && <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{unreadCount}</span>}
            </Link>
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center"><span className="text-primary-700 text-sm font-medium">{currentUser?.name?.charAt(0)}</span></div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// ====== CITIZEN DASHBOARD ======
export function CitizenDashboard() {
  const { currentUser } = useAuth();
  const { getUserComplaints } = useApp();
  const complaints = getUserComplaints(currentUser?.id || '');
  const stats = useMemo(() => ({
    total: complaints.length,
    pending: complaints.filter(c => !['Resolved', 'Verified'].includes(c.status)).length,
    resolved: complaints.filter(c => ['Resolved', 'Verified'].includes(c.status)).length,
  }), [complaints]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, {currentUser?.name?.split(' ')[0]}! Here's your overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Reports', value: stats.total, icon: FileText, color: 'bg-blue-50 text-blue-600' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: 'bg-orange-50 text-orange-600' },
          { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'bg-green-50 text-green-600' },
          { label: 'Community Points', value: currentUser?.points || 0, icon: Award, color: 'bg-purple-50 text-purple-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color} mb-3`}><s.icon className="w-5 h-5" /></div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { to: '/citizen/report', label: 'Report Waste', icon: Plus, color: 'bg-primary-600 text-white' },
          { to: '/citizen/complaints', label: 'Track Complaints', icon: FileText, color: 'bg-white text-gray-700 border border-gray-200' },
          { to: '/citizen/map', label: 'View Map', icon: MapPin, color: 'bg-white text-gray-700 border border-gray-200' },
          { to: '/citizen/schedule', label: 'Schedule', icon: Calendar, color: 'bg-white text-gray-700 border border-gray-200' },
        ].map((a, i) => (
          <Link key={i} to={a.to} className={`${a.color} rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition-shadow`}>
            <a.icon className="w-5 h-5" /><span className="font-medium text-sm">{a.label}</span>
          </Link>
        ))}
      </div>

      {/* Recent Complaints */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Recent Complaints</h2>
          <Link to="/citizen/complaints" className="text-sm text-primary-600 hover:underline">View All</Link>
        </div>
        <div className="divide-y divide-gray-50">
          {complaints.slice(0, 5).map(c => (
            <Link key={c.id} to={`/citizen/complaints/${c.id}`} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0"><Camera className="w-5 h-5 text-gray-400" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{c.complaintId} – {c.wasteType}</p>
                <p className="text-xs text-gray-500">{formatTimeAgo(c.createdAt)}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(c.status)}`}>{c.status}</span>
            </Link>
          ))}
          {complaints.length === 0 && <p className="p-8 text-center text-gray-400 text-sm">No complaints yet. <Link to="/citizen/report" className="text-primary-600">Report your first issue</Link></p>}
        </div>
      </div>

      {/* CleanScore */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h2 className="font-semibold text-gray-900 mb-3">Your Area CleanScore</h2>
        <div className="flex items-center gap-6">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="63, 100" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center"><span className="text-lg font-bold text-gray-900">63</span></div>
          </div>
          <div>
            <p className="font-medium text-gray-900">Sector 14</p>
            <p className="text-sm text-orange-600 font-medium">Risk: High</p>
            <p className="text-xs text-gray-500 mt-1">Increase collection frequency recommended.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ====== REPORT WASTE ======
export function ReportWastePage() {
  const { currentUser } = useAuth();
  const { addComplaint } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ wasteType: '', description: '', severity: '', image: null as string | null, imageName: '' });
  const [location, setLocation] = useState({ lat: 28.6139 + (Math.random() * 0.02 - 0.01), lng: 77.209 + (Math.random() * 0.02 - 0.01), address: 'Sector 14, Near Green Park' });
  const [aiResult, setAiResult] = useState<{ prediction: string; confidence: number; recommendation: string } | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImage = (file: File) => {
    if (!file.type.match('image/(jpeg|png|webp)')) { setErrors(['Only JPEG, PNG, WebP images allowed']); return; }
    if (file.size > 5 * 1024 * 1024) { setErrors(['Image must be under 5MB']); return; }
    setErrors([]);
    const reader = new FileReader();
    reader.onload = (e) => { setForm(prev => ({ ...prev, image: e.target?.result as string, imageName: file.name })); };
    reader.readAsDataURL(file);
  };

  const runAI = () => {
    if (!form.image) return;
    setAnalyzing(true);
    setAiResult(null);
    setTimeout(() => {
      const result = simulateAIClassification(form.imageName);
      setAiResult(result);
      setForm(prev => ({ ...prev, wasteType: result.prediction }));
      setAnalyzing(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (!form.image) errs.push('Please upload an image');
    if (!form.wasteType) errs.push('Please select waste type');
    if (!form.description.trim()) errs.push('Please add a description');
    if (!form.severity) errs.push('Please select severity');
    if (errs.length) { setErrors(errs); return; }

    setSubmitting(true);
    const priority = predictPriority(form.severity, form.wasteType, 5);
    const complaintId = generateComplaintId();
    const newComplaint = {
      id: `c${Date.now()}`,
      complaintId,
      userId: currentUser?.id || '',
      description: form.description,
      image: form.image || '',
      wasteType: form.wasteType,
      aiPrediction: aiResult?.prediction || form.wasteType,
      aiConfidence: aiResult?.confidence || 80,
      latitude: location.lat,
      longitude: location.lng,
      address: location.address,
      severity: form.severity as any,
      priority,
      status: 'Reported' as const,
      workerId: null,
      createdAt: new Date().toISOString(),
      assignedAt: null, startedAt: null, resolvedAt: null, verifiedAt: null,
      cleanupProof: null, feedback: null,
      area: 'Sector 14',
    };
    setTimeout(() => {
      addComplaint(newComplaint);
      navigate(`/citizen/complaints/${newComplaint.id}`);
    }, 500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Report Waste</h1>
      <p className="text-gray-500 text-sm mb-6">Capture the issue and help keep your community clean.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            {errors.map((e, i) => <p key={i} className="text-sm text-red-700">{e}</p>)}
          </div>
        )}

        {/* Image Upload */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Waste Image *</label>
          {form.image ? (
            <div className="relative">
              <img src={form.image} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
              <button type="button" onClick={() => setForm(prev => ({ ...prev, image: null, imageName: '' }))} className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">×</button>
            </div>
          ) : (
            <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-primary-300 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload or drag & drop</p>
              <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP (max 5MB)</p>
              <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={e => e.target.files?.[0] && handleImage(e.target.files[0])} />
            </div>
          )}
          {form.image && !aiResult && (
            <button type="button" onClick={runAI} className="mt-3 w-full bg-purple-50 border border-purple-200 text-purple-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-purple-100 transition-colors">
              <Brain className="w-4 h-4" /> {analyzing ? 'Analyzing...' : 'Run AI Classification'}
            </button>
          )}
          {analyzing && (
            <div className="mt-3 flex items-center gap-3 bg-purple-50 rounded-lg p-3">
              <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-purple-700">AI is analyzing the image...</span>
            </div>
          )}
          {aiResult && (
            <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2"><Brain className="w-4 h-4 text-green-600" /><span className="text-sm font-medium text-green-800">AI Classification Result</span></div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-gray-500">Type:</span> <span className="font-medium text-gray-900">{aiResult.prediction}</span></div>
                <div><span className="text-gray-500">Confidence:</span> <span className="font-medium text-gray-900">{aiResult.confidence}%</span></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">{aiResult.recommendation}</p>
              <p className="text-xs text-gray-400 mt-1 italic">* Simulated AI prediction for demonstration</p>
            </div>
          )}
        </div>

        {/* Waste Type */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Waste Category *</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {WASTE_TYPES.map(w => (
              <button key={w} type="button" onClick={() => setForm(prev => ({ ...prev, wasteType: w }))} className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${form.wasteType === w ? 'bg-primary-50 border-primary-300 text-primary-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>{w}</button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none text-sm" placeholder="Describe the waste issue..." />
        </div>

        {/* Location */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary-500" />
            <div className="flex-1">
              <p className="text-sm text-gray-900">{location.address}</p>
              <p className="text-xs text-gray-500">{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Location auto-detected. You can adjust during admin review.</p>
        </div>

        {/* Severity */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Severity *</label>
          <div className="grid grid-cols-4 gap-2">
            {(['Low', 'Medium', 'High', 'Critical'] as const).map(s => (
              <button key={s} type="button" onClick={() => setForm(prev => ({ ...prev, severity: s }))} className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${form.severity === s ? (s === 'Critical' ? 'bg-red-50 border-red-300 text-red-700' : s === 'High' ? 'bg-orange-50 border-orange-300 text-orange-700' : s === 'Medium' ? 'bg-yellow-50 border-yellow-300 text-yellow-700' : 'bg-slate-50 border-slate-300 text-slate-700') : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>{s}</button>
            ))}
          </div>
        </div>

        <button type="submit" disabled={submitting} className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors disabled:opacity-50">
          {submitting ? 'Submitting...' : 'Submit Complaint'}
        </button>
      </form>
    </div>
  );
}

// ====== COMPLAINTS LIST ======
export function ComplaintsListPage() {
  const { currentUser } = useAuth();
  const { getUserComplaints } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const complaints = getUserComplaints(currentUser?.id || '');

  const filtered = useMemo(() => {
    return complaints.filter(c => {
      if (search && !c.complaintId.toLowerCase().includes(search.toLowerCase()) && !c.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter && c.status !== statusFilter) return false;
      return true;
    });
  }, [complaints, search, statusFilter]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">My Complaints</h1>
      <p className="text-gray-500 text-sm mb-6">Track and manage your waste reports.</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search complaints..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none">
          <option value="">All Status</option>
          {['Reported', 'Under Review', 'Assigned', 'In Progress', 'Resolved', 'Verified'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map(c => (
          <Link key={c.id} to={`/citizen/complaints/${c.id}`} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0"><Camera className="w-6 h-6 text-gray-400" /></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-gray-900">{c.complaintId}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(c.priority)}`}>{c.priority}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{c.description}</p>
              <p className="text-xs text-gray-400 mt-1">{formatTimeAgo(c.createdAt)} • {c.wasteType} • {c.area}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(c.status)}`}>{c.status}</span>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No complaints found</p>
            <Link to="/citizen/report" className="text-primary-600 text-sm font-medium hover:underline mt-2 inline-block">Report a new issue</Link>
          </div>
        )}
      </div>
    </div>
  );
}

// ====== COMPLAINT DETAIL ======
export function ComplaintDetailPage() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { complaints, addFeedback, updateStatus } = useApp();
  const [feedbackForm, setFeedbackForm] = useState({ rating: 5, comment: '' });
  const [showFeedback, setShowFeedback] = useState(false);
  const complaint = complaints.find(c => c.id === id);
  const navigate = useNavigate();

  if (!complaint) return <div className="text-center py-12"><p className="text-gray-500">Complaint not found</p><Link to="/citizen/complaints" className="text-primary-600 text-sm">Back to complaints</Link></div>;

  const timeline = [
    { label: 'Complaint Reported', date: complaint.createdAt, done: true },
    { label: 'Admin Reviewed', date: complaint.assignedAt, done: !!complaint.assignedAt },
    { label: 'Worker Assigned', date: complaint.assignedAt, done: !!complaint.workerId },
    { label: 'Cleaning In Progress', date: complaint.startedAt, done: !!complaint.startedAt },
    { label: 'Resolved', date: complaint.resolvedAt, done: !!complaint.resolvedAt },
    { label: 'Citizen Verified', date: complaint.verifiedAt, done: !!complaint.verifiedAt },
  ];

  const handleVerify = () => { updateStatus(complaint.id, 'Verified'); };
  const handleSubmitFeedback = () => {
    addFeedback(complaint.id, feedbackForm);
    setShowFeedback(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-gray-700">← Back</button>

      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{complaint.complaintId}</h1>
            <p className="text-sm text-gray-500">{formatDateTime(complaint.createdAt)}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}>{complaint.status}</span>
        </div>

        {complaint.image && <img src={complaint.image} alt="Waste" className="w-full h-48 object-cover rounded-lg mb-4" />}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="text-gray-500">Waste Type:</span> <span className="font-medium">{complaint.wasteType}</span></div>
          <div><span className="text-gray-500">Severity:</span> <span className={`font-medium ${getPriorityColor(complaint.severity)}`}>{complaint.severity}</span></div>
          <div><span className="text-gray-500">Priority:</span> <span className={`font-medium ${getPriorityColor(complaint.priority)}`}>{complaint.priority}</span></div>
          <div><span className="text-gray-500">Area:</span> <span className="font-medium">{complaint.area}</span></div>
        </div>

        <p className="text-sm text-gray-700 mt-4">{complaint.description}</p>

        <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
          <MapPin className="w-4 h-4" />{complaint.address}
        </div>

        {/* AI Prediction */}
        <div className="mt-4 bg-purple-50 border border-purple-100 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1"><Brain className="w-4 h-4 text-purple-600" /><span className="text-sm font-medium text-purple-800">AI Prediction</span></div>
          <p className="text-sm text-gray-700">Type: <strong>{complaint.aiPrediction}</strong> • Confidence: <strong>{complaint.aiConfidence}%</strong></p>
          <p className="text-xs text-gray-400 italic mt-1">* Simulated AI classification</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Progress Timeline</h2>
        <div className="space-y-3">
          {timeline.map((t, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${t.done ? 'bg-primary-500' : 'bg-gray-200'}`}>
                {t.done ? <CheckCircle className="w-4 h-4 text-white" /> : <div className="w-2 h-2 bg-gray-400 rounded-full" />}
              </div>
              <div className="flex-1">
                <p className={`text-sm ${t.done ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>{t.label}</p>
                {t.date && <p className="text-xs text-gray-400">{formatDateTime(t.date)}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cleanup Proof */}
      {complaint.cleanupProof && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Cleanup Proof</h2>
          <img src={complaint.cleanupProof} alt="Cleanup proof" className="w-full h-40 object-cover rounded-lg" />
        </div>
      )}

      {/* Feedback */}
      {complaint.status === 'Resolved' && !complaint.feedback && !showFeedback && (
        <button onClick={() => setShowFeedback(true)} className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700">Verify & Give Feedback</button>
      )}
      {complaint.status === 'Resolved' && !complaint.feedback && showFeedback && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Rate the Resolution</h2>
          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map(s => (
              <button key={s} onClick={() => setFeedbackForm(prev => ({ ...prev, rating: s }))} className="p-1">
                <Star className={`w-6 h-6 ${s <= feedbackForm.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              </button>
            ))}
          </div>
          <textarea value={feedbackForm.comment} onChange={e => setFeedbackForm(prev => ({ ...prev, comment: e.target.value }))} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm mb-3" placeholder="Share your experience..." />
          <button onClick={handleSubmitFeedback} className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700">Submit Feedback</button>
        </div>
      )}
      {complaint.feedback && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-900 mb-2">Your Feedback</h2>
          <div className="flex gap-1 mb-2">{[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= complaint.feedback!.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}</div>
          <p className="text-sm text-gray-600">{complaint.feedback.comment}</p>
        </div>
      )}
    </div>
  );
}

// ====== MAP PAGE ======
export function CitizenMapPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Area Map</h1>
      <p className="text-gray-500 text-sm mb-4">View complaints, hotspots, and recycling centers on the map.</p>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden" style={{ height: '500px' }}>
        <MapComponent />
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full" /> Complaints</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full" /> Hotspots</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full" /> Recycling Centers</div>
      </div>
    </div>
  );
}

function MapComponent() {
  const [MapLib, setMapLib] = useState<any>(null);
  const { complaints } = useApp();

  React.useEffect(() => {
    import('react-leaflet').then(mod => setMapLib(mod));
  }, []);

  if (!MapLib) return <div className="h-full flex items-center justify-center text-gray-400">Loading map...</div>;

  const { MapContainer, TileLayer, Marker, Popup } = MapLib;
  const L = (window as any).L;

  return (
    <MapContainer center={[28.6250, 77.2150]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
      {complaints.slice(0, 10).map(c => (
        <Marker key={c.id} position={[c.latitude, c.longitude]}>
          <Popup><strong>{c.complaintId}</strong><br/>{c.wasteType} – {c.status}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

// ====== SCHEDULE PAGE ======
export function SchedulePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Collection Schedule</h1>
      <p className="text-gray-500 text-sm mb-6">Weekly waste collection schedule for your area.</p>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Area</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Day</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Waste Type</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Time</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {collectionSchedule.map((s, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">{s.area}</td>
                  <td className="px-4 py-3 text-gray-700">{s.day}</td>
                  <td className="px-4 py-3 text-gray-700">{s.type}</td>
                  <td className="px-4 py-3 text-gray-500">{s.time}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.status === 'On Schedule' ? 'bg-green-100 text-green-700' : s.status === 'Delayed' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ====== RECYCLING PAGE ======
export function RecyclingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Recycling Centers</h1>
      <p className="text-gray-500 text-sm mb-6">Find nearby recycling centers and their accepted waste types.</p>
      <div className="grid md:grid-cols-2 gap-4">
        {mockRecyclingCenters.map(rc => (
          <div key={rc.id} className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-900 mb-2">{rc.name}</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600 flex items-start gap-2"><MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />{rc.address}</p>
              <p className="text-gray-600 flex items-center gap-2"><Clock className="w-4 h-4 text-gray-400" />{rc.hours}</p>
              <p className="text-gray-600 flex items-center gap-2"><span className="text-gray-400 text-xs">📞</span>{rc.contact}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {rc.acceptedTypes.map(t => <span key={t} className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded text-xs font-medium">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ====== NOTIFICATIONS PAGE ======
export function NotificationsPage() {
  const { currentUser } = useAuth();
  const { getUserNotifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const notifications = getUserNotifications(currentUser?.id || '');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 text-sm">Stay updated on your complaints and community.</p>
        </div>
        <button onClick={() => markAllNotificationsRead(currentUser?.id || '')} className="text-sm text-primary-600 hover:underline font-medium">Mark all read</button>
      </div>
      <div className="space-y-2">
        {notifications.map(n => (
          <div key={n.id} onClick={() => markNotificationRead(n.id)} className={`bg-white rounded-xl border p-4 flex items-start gap-3 cursor-pointer transition-colors ${n.read ? 'border-gray-100' : 'border-primary-200 bg-primary-50/30'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${n.read ? 'bg-gray-100' : 'bg-primary-100'}`}>
              <Bell className={`w-4 h-4 ${n.read ? 'text-gray-400' : 'text-primary-600'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${n.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>{n.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
              <p className="text-xs text-gray-400 mt-1">{formatTimeAgo(n.createdAt)}</p>
            </div>
            {!n.read && <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-2" />}
          </div>
        ))}
        {notifications.length === 0 && <p className="text-center py-12 text-gray-400">No notifications yet</p>}
      </div>
    </div>
  );
}

// ====== PROFILE PAGE ======
export function ProfilePage() {
  const { currentUser } = useAuth();
  const { getUserComplaints } = useApp();
  const complaints = getUserComplaints(currentUser?.id || '');
  const resolved = complaints.filter(c => ['Resolved', 'Verified'].includes(c.status)).length;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center"><span className="text-2xl font-bold text-primary-700">{currentUser?.name?.charAt(0)}</span></div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{currentUser?.name}</h2>
            <p className="text-sm text-gray-500">{currentUser?.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500">Phone</p><p className="font-medium text-gray-900">{currentUser?.phone}</p></div>
          <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500">Address</p><p className="font-medium text-gray-900">{currentUser?.address}</p></div>
          <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500">Member Since</p><p className="font-medium text-gray-900">{formatDate(currentUser?.createdAt || '')}</p></div>
          <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500">Role</p><p className="font-medium text-gray-900 capitalize">{currentUser?.role}</p></div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 mt-4">
        <h3 className="font-semibold text-gray-900 mb-4">Community Contribution</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div><p className="text-2xl font-bold text-primary-600">{currentUser?.points || 0}</p><p className="text-xs text-gray-500">Points</p></div>
          <div><p className="text-2xl font-bold text-gray-900">{complaints.length}</p><p className="text-xs text-gray-500">Reports</p></div>
          <div><p className="text-2xl font-bold text-green-600">{resolved}</p><p className="text-xs text-gray-500">Resolved</p></div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Badges</p>
          <div className="flex flex-wrap gap-2">
            {(currentUser?.badges || []).map(b => <span key={b} className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium border border-yellow-200">{b}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
