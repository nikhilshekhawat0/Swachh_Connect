import React, { useState, useMemo } from 'react';
import { Link, useParams, useNavigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, Wrench, MapPin, BarChart3, Bell, Settings, LogOut, Menu, X, Search, Filter, CheckCircle, Clock, AlertCircle, TrendingUp, Brain, Target, ChevronDown, Eye, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { mockWorkers, mockHotspots, mockUsers, AREAS, WASTE_TYPES } from '../data/mockData';
import { formatDate, formatDateTime, formatTimeAgo, getStatusColor, getPriorityColor, getRiskColor, getCleanScoreColor } from '../utils/helpers';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from 'recharts';

// ====== ADMIN LAYOUT ======
export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { notifications } = useApp();
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => n.userId === currentUser?.id && !n.read).length;

  const links = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/complaints', label: 'Complaints', icon: FileText },
    { to: '/admin/workers', label: 'Workers', icon: Wrench },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/hotspots', label: 'Hotspots', icon: MapPin },
    { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/admin/notifications', label: 'Notifications', icon: Bell },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transform transition-transform duration-200 lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center"><span className="text-white text-sm font-bold">SC</span></div>
              <span className="font-bold text-gray-900">SwachhConnect</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1"><X className="w-5 h-5" /></button>
          </div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
            {links.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition-colors">
                <l.icon className="w-4 h-4" />{l.label}
                {l.label === 'Notifications' && unreadCount > 0 && <span className="ml-auto bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{unreadCount}</span>}
              </Link>
            ))}
          </nav>
          <div className="p-3 border-t border-gray-100">
            <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 w-full">
              <LogOut className="w-4 h-4" />Logout
            </button>
          </div>
        </div>
      </aside>
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-100 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2"><Menu className="w-5 h-5" /></button>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">Admin:</span>
            <span className="font-medium text-gray-900 text-sm">{currentUser?.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin/notifications" className="relative p-2 hover:bg-gray-50 rounded-lg">
              <Bell className="w-5 h-5 text-gray-500" />
              {unreadCount > 0 && <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{unreadCount}</span>}
            </Link>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center"><span className="text-red-700 text-sm font-medium">{currentUser?.name?.charAt(0)}</span></div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// ====== ADMIN DASHBOARD ======
export function AdminDashboard() {
  const { complaints } = useApp();
  const stats = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter(c => !['Resolved', 'Verified'].includes(c.status)).length;
    const resolved = complaints.filter(c => ['Resolved', 'Verified'].includes(c.status)).length;
    const highPriority = complaints.filter(c => ['High', 'Critical'].includes(c.priority)).length;
    return { total, pending, resolved, highPriority };
  }, [complaints]);

  const wasteTypeData = useMemo(() => {
    const counts: Record<string, number> = {};
    complaints.forEach(c => { counts[c.wasteType] = (counts[c.wasteType] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [complaints]);

  const areaData = useMemo(() => {
    const counts: Record<string, number> = {};
    complaints.forEach(c => { counts[c.area] = (counts[c.area] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [complaints]);

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#64748b'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of the waste management system.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Complaints', value: stats.total, icon: FileText, color: 'bg-blue-50 text-blue-600' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: 'bg-orange-50 text-orange-600' },
          { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'bg-green-50 text-green-600' },
          { label: 'High Priority', value: stats.highPriority, icon: AlertCircle, color: 'bg-red-50 text-red-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color} mb-3`}><s.icon className="w-5 h-5" /></div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Complaints by Waste Type</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={wasteTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {wasteTypeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Complaints by Area</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hotspots & Recent */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Top Hotspots</h3>
            <Link to="/admin/hotspots" className="text-sm text-primary-600 hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {mockHotspots.slice(0, 4).map(h => (
              <div key={h.id} className="p-4 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${h.riskLevel === 'Critical' ? 'bg-red-100' : h.riskLevel === 'High' ? 'bg-orange-100' : 'bg-yellow-100'}`}>
                  <MapPin className={`w-4 h-4 ${h.riskLevel === 'Critical' ? 'text-red-600' : h.riskLevel === 'High' ? 'text-orange-600' : 'text-yellow-600'}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{h.area}</p>
                  <p className="text-xs text-gray-500">{h.complaintCount} complaints • {h.dominantWasteType}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${getCleanScoreColor(h.cleanScore)}`}>{h.cleanScore}</p>
                  <p className="text-xs text-gray-400">Score</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Recent Complaints</h3>
            <Link to="/admin/complaints" className="text-sm text-primary-600 hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {complaints.slice(0, 5).map(c => (
              <div key={c.id} className="p-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{c.complaintId} – {c.wasteType}</p>
                  <p className="text-xs text-gray-500">{c.area} • {formatTimeAgo(c.createdAt)}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(c.status)}`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4"><Brain className="w-5 h-5 text-purple-600" /><h3 className="font-semibold text-gray-900">AI Insights</h3><span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Simulated</span></div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <p className="text-sm font-medium text-red-800 mb-1">⚠️ Critical Hotspot Detected</p>
            <p className="text-xs text-red-600">Sector 17 shows 15 complaints with declining CleanScore (32). Immediate intervention recommended.</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
            <p className="text-sm font-medium text-orange-800 mb-1">📈 Rising Plastic Waste</p>
            <p className="text-xs text-orange-600">Plastic waste complaints increased 23% this week. Consider awareness campaigns.</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-sm font-medium text-blue-800 mb-1">🎯 Prediction: Weekend Surge</p>
            <p className="text-xs text-blue-600">Based on historical patterns, expect 30% more complaints this weekend in Main Market area.</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3 italic">* These insights are simulated demonstrations. No real ML model is running.</p>
      </div>
    </div>
  );
}

// ====== ADMIN COMPLAINTS ======
export function AdminComplaintsPage() {
  const { complaints, assignWorker, updateStatus, updateComplaint } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [assignModal, setAssignModal] = useState<string | null>(null);
  const [selectedWorker, setSelectedWorker] = useState('');

  const filtered = useMemo(() => {
    return complaints.filter(c => {
      if (search && !c.complaintId.toLowerCase().includes(search.toLowerCase()) && !c.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter && c.status !== statusFilter) return false;
      if (priorityFilter && c.priority !== priorityFilter) return false;
      return true;
    });
  }, [complaints, search, statusFilter, priorityFilter]);

  const handleAssign = (complaintId: string) => {
    if (selectedWorker) {
      assignWorker(complaintId, selectedWorker);
      setAssignModal(null);
      setSelectedWorker('');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Complaints Management</h1>
      <p className="text-gray-500 text-sm mb-6">View, filter, assign and manage all complaints.</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search complaints..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
          <option value="">All Status</option>
          {['Reported', 'Under Review', 'Assigned', 'In Progress', 'Resolved', 'Verified'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
          <option value="">All Priority</option>
          {['Low', 'Medium', 'High', 'Critical'].map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">ID</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Area</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Priority</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Date</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{c.complaintId}</td>
                  <td className="px-4 py-3 text-gray-700">{c.wasteType}</td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{c.area}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(c.priority)}`}>{c.priority}</span></td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(c.status)}`}>{c.status}</span></td>
                  <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{formatDate(c.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {!c.workerId && c.status !== 'Resolved' && c.status !== 'Verified' && (
                        <button onClick={() => setAssignModal(c.id)} className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded hover:bg-primary-100 font-medium">Assign</button>
                      )}
                      {c.status === 'Under Review' && (
                        <button onClick={() => updateStatus(c.id, 'Assigned')} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100 font-medium">Review</button>
                      )}
                      {c.status === 'Reported' && (
                        <button onClick={() => updateStatus(c.id, 'Under Review')} className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-100 font-medium">Review</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="p-8 text-center text-gray-400">No complaints match your filters</p>}
      </div>

      {/* Assign Modal */}
      {assignModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setAssignModal(null)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-gray-900 mb-4">Assign Worker</h3>
            <select value={selectedWorker} onChange={e => setSelectedWorker(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm mb-4">
              <option value="">Select a worker...</option>
              {mockWorkers.filter(w => w.status !== 'offline').map(w => (
                <option key={w.id} value={w.id}>{w.name} – {w.area} ({w.assignedTasks} tasks)</option>
              ))}
            </select>
            <div className="flex gap-3">
              <button onClick={() => setAssignModal(null)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={() => handleAssign(assignModal)} disabled={!selectedWorker} className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50">Assign</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ====== ADMIN WORKERS ======
export function AdminWorkersPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const filtered = statusFilter ? mockWorkers.filter(w => w.status === statusFilter) : mockWorkers;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Workers Management</h1>
      <p className="text-gray-500 text-sm mb-6">Monitor and manage waste collection workers.</p>

      <div className="flex gap-2 mb-4">
        {['', 'active', 'on-task', 'offline'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${statusFilter === s ? 'bg-primary-50 border-primary-300 text-primary-700' : 'border-gray-200 text-gray-600'}`}>
            {s ? s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ') : 'All'}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(w => (
          <div key={w.id} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center"><span className="text-orange-700 font-medium">{w.name.charAt(0)}</span></div>
              <div>
                <p className="font-medium text-gray-900">{w.name}</p>
                <p className="text-xs text-gray-500">{w.area}</p>
              </div>
              <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-medium ${w.status === 'active' ? 'bg-green-100 text-green-700' : w.status === 'on-task' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{w.status}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="bg-gray-50 rounded-lg p-2"><p className="font-bold text-gray-900">{w.assignedTasks}</p><p className="text-xs text-gray-500">Active</p></div>
              <div className="bg-gray-50 rounded-lg p-2"><p className="font-bold text-gray-900">{w.completedTasks}</p><p className="text-xs text-gray-500">Done</p></div>
              <div className="bg-gray-50 rounded-lg p-2"><p className="font-bold text-gray-900">{w.rating}</p><p className="text-xs text-gray-500">Rating</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ====== ADMIN USERS ======
export function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const users = mockUsers.filter(u => u.role === 'citizen');
  const filtered = users.filter(u => {
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (roleFilter && u.status !== roleFilter) return false;
    return true;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Users Management</h1>
      <p className="text-gray-500 text-sm mb-6">View and manage registered citizens.</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
        </div>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Phone</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Joined</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Points</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{u.name}</td>
                  <td className="px-4 py-3 text-gray-600">{u.email}</td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{u.phone}</td>
                  <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{formatDate(u.createdAt)}</td>
                  <td className="px-4 py-3 text-gray-900 font-medium">{u.points}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{u.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ====== ADMIN HOTSPOTS ======
export function AdminHotspotsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Garbage Hotspots</h1>
      <p className="text-gray-500 text-sm mb-6">Identified areas with recurring waste issues. <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Simulated DBSCAN Detection</span></p>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {mockHotspots.map(h => (
          <div key={h.id} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{h.area}</h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRiskColor(h.riskLevel)}`}>{h.riskLevel}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Complaints</span><span className="font-medium">{h.complaintCount}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Dominant Type</span><span className="font-medium">{h.dominantWasteType}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">CleanScore</span><span className={`font-bold ${getCleanScoreColor(h.cleanScore)}`}>{h.cleanScore}/100</span></div>
            </div>
            <div className="mt-3 bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-600"><strong>Recommendation:</strong> {h.recommendation}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hotspot Map */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Hotspot Map</h3>
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Interactive map with hotspot markers</p>
            <p className="text-xs text-gray-400">View in Citizen Map section for full map experience</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs">
          {mockHotspots.map(h => (
            <div key={h.id} className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded-full ${h.riskLevel === 'Critical' ? 'bg-red-500' : h.riskLevel === 'High' ? 'bg-orange-500' : h.riskLevel === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`} />
              <span className="text-gray-600">{h.area} ({h.complaintCount})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ====== ADMIN ANALYTICS ======
export function AdminAnalyticsPage() {
  const { complaints } = useApp();

  const trendData = useMemo(() => {
    const days = ['Mar 10', 'Mar 11', 'Mar 12', 'Mar 13', 'Mar 14', 'Mar 15', 'Mar 16', 'Mar 17', 'Mar 18', 'Mar 19'];
    return days.map((d, i) => ({ date: d, complaints: Math.floor(2 + Math.random() * 4), resolved: Math.floor(1 + Math.random() * 3) }));
  }, []);

  const wasteTypeData = useMemo(() => {
    const counts: Record<string, number> = {};
    complaints.forEach(c => { counts[c.wasteType] = (counts[c.wasteType] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [complaints]);

  const resolutionData = useMemo(() => {
    return [
      { time: '< 2hrs', count: 5 },
      { time: '2-6hrs', count: 8 },
      { time: '6-12hrs', count: 4 },
      { time: '12-24hrs', count: 2 },
      { time: '> 24hrs', count: 1 },
    ];
  }, []);

  const cleanScoreTrend = useMemo(() => {
    return ['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((w, i) => ({ week: w, score: 55 + i * 5 + Math.floor(Math.random() * 10) }));
  }, []);

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#64748b'];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Analytics</h1>
      <p className="text-gray-500 text-sm mb-6">Comprehensive waste management analytics and insights.</p>

      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Complaint Trends</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Area type="monotone" dataKey="complaints" stroke="#22c55e" fill="#dcfce7" />
              <Area type="monotone" dataKey="resolved" stroke="#3b82f6" fill="#dbeafe" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Waste Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={wasteTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {wasteTypeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Resolution Time Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={resolutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">CleanScore Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={cleanScoreTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ====== ADMIN NOTIFICATIONS ======
export function AdminNotificationsPage() {
  const { currentUser } = useAuth();
  const { getUserNotifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const notifications = getUserNotifications(currentUser?.id || '');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 text-sm">System alerts and updates.</p>
        </div>
        <button onClick={() => markAllNotificationsRead(currentUser?.id || '')} className="text-sm text-primary-600 hover:underline font-medium">Mark all read</button>
      </div>
      <div className="space-y-2">
        {notifications.map(n => (
          <div key={n.id} onClick={() => markNotificationRead(n.id)} className={`bg-white rounded-xl border p-4 flex items-start gap-3 cursor-pointer ${n.read ? 'border-gray-100' : 'border-primary-200 bg-primary-50/30'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${n.type.includes('high') || n.type.includes('hotspot') ? 'bg-red-100' : 'bg-primary-100'}`}>
              {n.type.includes('high') || n.type.includes('hotspot') ? <AlertCircle className="w-4 h-4 text-red-600" /> : <Bell className={`w-4 h-4 ${n.read ? 'text-gray-400' : 'text-primary-600'}`} />}
            </div>
            <div className="flex-1">
              <p className={`text-sm ${n.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>{n.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
              <p className="text-xs text-gray-400 mt-1">{formatTimeAgo(n.createdAt)}</p>
            </div>
            {!n.read && <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-2" />}
          </div>
        ))}
        {notifications.length === 0 && <p className="text-center py-12 text-gray-400">No notifications</p>}
      </div>
    </div>
  );
}

// ====== ADMIN SETTINGS ======
export function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsAlerts: false,
    autoAssign: false,
    darkMode: false,
  });

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Settings</h1>
      <p className="text-gray-500 text-sm mb-6">Configure application preferences.</p>

      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            {[
              { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email alerts for new complaints and updates' },
              { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Get SMS for critical priority complaints' },
              { key: 'autoAssign', label: 'Auto-assign Workers', desc: 'Automatically assign workers based on area and availability' },
            ].map(s => (
              <div key={s.key} className="flex items-center justify-between py-2">
                <div><p className="text-sm font-medium text-gray-900">{s.label}</p><p className="text-xs text-gray-500">{s.desc}</p></div>
                <button onClick={() => setSettings(prev => ({ ...prev, [s.key]: !prev[s.key as keyof typeof prev] }))} className={`w-10 h-6 rounded-full transition-colors ${(settings as any)[s.key] ? 'bg-primary-500' : 'bg-gray-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${(settings as any)[s.key] ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Demo Data Controls</h3>
          <p className="text-sm text-gray-600 mb-3">Reset all data to initial demo state.</p>
          <button onClick={() => {
            localStorage.clear();
            window.location.reload();
          }} className="px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 border border-red-200">
            Reset All Data
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">About</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>SwachhConnect</strong> v1.0.0</p>
            <p>B.Tech CSE AI/ML Project – React Frontend Prototype</p>
            <p className="text-xs text-gray-400 mt-2">This is a frontend prototype with simulated AI/ML features. No real ML models are deployed.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
