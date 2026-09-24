import React, { useState, useMemo, useRef } from 'react';
import { Link, useParams, useNavigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, Bell, User, LogOut, Menu, X, CheckCircle, Clock, AlertCircle, Camera, Upload, MapPin, ChevronRight, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { mockWorkers } from '../data/mockData';
import { formatDate, formatDateTime, formatTimeAgo, getStatusColor, getPriorityColor } from '../utils/helpers';

// ====== WORKER LAYOUT ======
export function WorkerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { notifications } = useApp();
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => n.userId === currentUser?.id && !n.read).length;

  const links = [
    { to: '/worker/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/worker/tasks', label: 'My Tasks', icon: ClipboardList },
    { to: '/worker/notifications', label: 'Notifications', icon: Bell },
    { to: '/worker/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transform transition-transform duration-200 lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <Link to="/worker/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center"><span className="text-white text-sm font-bold">SC</span></div>
              <span className="font-bold text-gray-900">SwachhConnect</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1"><X className="w-5 h-5" /></button>
          </div>
          <nav className="flex-1 p-3 space-y-1">
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
            <span className="text-sm text-gray-500 hidden sm:block">Worker:</span>
            <span className="font-medium text-gray-900 text-sm">{currentUser?.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/worker/notifications" className="relative p-2 hover:bg-gray-50 rounded-lg">
              <Bell className="w-5 h-5 text-gray-500" />
              {unreadCount > 0 && <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{unreadCount}</span>}
            </Link>
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center"><span className="text-orange-700 text-sm font-medium">{currentUser?.name?.charAt(0)}</span></div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// ====== WORKER DASHBOARD ======
export function WorkerDashboard() {
  const { currentUser } = useAuth();
  const { complaints } = useApp();
  const worker = mockWorkers.find(w => w.id === currentUser?.id) || mockWorkers[0];
  const myTasks = complaints.filter(c => c.workerId === currentUser?.id);
  const stats = useMemo(() => ({
    assigned: myTasks.length,
    pending: myTasks.filter(t => ['Assigned', 'Under Review'].includes(t.status)).length,
    inProgress: myTasks.filter(t => t.status === 'In Progress').length,
    completed: myTasks.filter(t => ['Resolved', 'Verified'].includes(t.status)).length,
  }), [myTasks]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Worker Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome, {currentUser?.name?.split(' ')[0]}! Here's your work overview.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Assigned Tasks', value: stats.assigned, icon: ClipboardList, color: 'bg-blue-50 text-blue-600' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: 'bg-orange-50 text-orange-600' },
          { label: 'In Progress', value: stats.inProgress, icon: AlertCircle, color: 'bg-purple-50 text-purple-600' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'bg-green-50 text-green-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color} mb-3`}><s.icon className="w-5 h-5" /></div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Performance */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Performance Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center"><p className="text-xl font-bold text-gray-900">{worker.completedTasks}</p><p className="text-xs text-gray-500">Total Completed</p></div>
          <div className="text-center"><p className="text-xl font-bold text-gray-900">{worker.averageResponseTime}</p><p className="text-xs text-gray-500">Avg Response</p></div>
          <div className="text-center"><p className="text-xl font-bold text-gray-900 flex items-center justify-center gap-1">{worker.rating} <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /></p><p className="text-xs text-gray-500">Rating</p></div>
          <div className="text-center"><p className="text-xl font-bold text-gray-900">{worker.area}</p><p className="text-xs text-gray-500">Assigned Area</p></div>
        </div>
      </div>

      {/* Today's Tasks */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-4 border-b border-gray-100"><h2 className="font-semibold text-gray-900">My Assigned Tasks</h2></div>
        <div className="divide-y divide-gray-50">
          {myTasks.filter(t => !['Resolved', 'Verified'].includes(t.status)).map(t => (
            <Link key={t.id} to={`/worker/tasks/${t.id}`} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${t.priority === 'Critical' ? 'bg-red-100' : t.priority === 'High' ? 'bg-orange-100' : 'bg-gray-100'}`}>
                <AlertCircle className={`w-5 h-5 ${t.priority === 'Critical' ? 'text-red-600' : t.priority === 'High' ? 'text-orange-600' : 'text-gray-500'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{t.complaintId} – {t.wasteType}</p>
                <p className="text-xs text-gray-500">{t.address}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(t.priority)}`}>{t.priority}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(t.status)}`}>{t.status}</span>
              </div>
            </Link>
          ))}
          {myTasks.filter(t => !['Resolved', 'Verified'].includes(t.status)).length === 0 && (
            <p className="p-8 text-center text-gray-400 text-sm">No pending tasks</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ====== TASKS LIST ======
export function WorkerTasksPage() {
  const { currentUser } = useAuth();
  const { complaints } = useApp();
  const [statusFilter, setStatusFilter] = useState('');
  const myTasks = complaints.filter(c => c.workerId === currentUser?.id);

  const filtered = useMemo(() => {
    if (!statusFilter) return myTasks;
    return myTasks.filter(t => t.status === statusFilter);
  }, [myTasks, statusFilter]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">My Tasks</h1>
      <p className="text-gray-500 text-sm mb-6">View and manage your assigned cleanup tasks.</p>

      <div className="flex gap-2 mb-4 flex-wrap">
        {['', 'Assigned', 'In Progress', 'Resolved'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${statusFilter === s ? 'bg-primary-50 border-primary-300 text-primary-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
            {s || 'All'}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(t => (
          <Link key={t.id} to={`/worker/tasks/${t.id}`} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0"><Camera className="w-6 h-6 text-gray-400" /></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-gray-900">{t.complaintId}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(t.priority)}`}>{t.priority}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{t.description}</p>
              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" />{t.address}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(t.status)}`}>{t.status}</span>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </div>
          </Link>
        ))}
        {filtered.length === 0 && <p className="text-center py-12 text-gray-400">No tasks found</p>}
      </div>
    </div>
  );
}

// ====== TASK DETAIL ======
export function WorkerTaskDetailPage() {
  const { id } = useParams();
  const { complaints, updateStatus, updateComplaint } = useApp();
  const [proofImage, setProofImage] = useState<string | null>(null);
  const [showProofUpload, setShowProofUpload] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const complaint = complaints.find(c => c.id === id);

  if (!complaint) return <div className="text-center py-12"><p className="text-gray-500">Task not found</p><Link to="/worker/tasks" className="text-primary-600 text-sm">Back to tasks</Link></div>;

  const handleProof = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setProofImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleStart = () => { updateStatus(complaint.id, 'In Progress'); };
  const handleComplete = () => {
    if (proofImage) {
      updateComplaint(complaint.id, { cleanupProof: proofImage });
    }
    updateStatus(complaint.id, 'Resolved');
    navigate('/worker/tasks');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-gray-700">← Back</button>

      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{complaint.complaintId}</h1>
            <p className="text-sm text-gray-500">Reported {formatDateTime(complaint.createdAt)}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}>{complaint.status}</span>
        </div>

        {complaint.image && <img src={complaint.image} alt="Waste" className="w-full h-48 object-cover rounded-lg mb-4" />}

        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div><span className="text-gray-500">Waste Type:</span> <span className="font-medium">{complaint.wasteType}</span></div>
          <div><span className="text-gray-500">Priority:</span> <span className={`font-medium ${getPriorityColor(complaint.priority)}`}>{complaint.priority}</span></div>
          <div><span className="text-gray-500">Severity:</span> <span className="font-medium">{complaint.severity}</span></div>
          <div><span className="text-gray-500">Area:</span> <span className="font-medium">{complaint.area}</span></div>
        </div>

        <p className="text-sm text-gray-700 mb-3">{complaint.description}</p>
        <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin className="w-4 h-4" />{complaint.address}</p>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Task Actions</h2>

        {complaint.status === 'Assigned' && (
          <button onClick={handleStart} className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5" /> Start Task
          </button>
        )}

        {(complaint.status === 'In Progress' || complaint.status === 'Assigned') && (
          <div className="space-y-4">
            {!showProofUpload ? (
              <button onClick={() => setShowProofUpload(true)} className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
                <Camera className="w-5 h-5" /> Upload Cleanup Proof
              </button>
            ) : (
              <div className="border border-gray-200 rounded-lg p-4">
                {proofImage ? (
                  <div className="relative">
                    <img src={proofImage} alt="Cleanup proof" className="w-full h-40 object-cover rounded-lg" />
                    <button onClick={() => setProofImage(null)} className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full text-sm">×</button>
                  </div>
                ) : (
                  <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-primary-300">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload cleanup photo</p>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleProof(e.target.files[0])} />
                  </div>
                )}
              </div>
            )}

            {complaint.status === 'In Progress' && (
              <button onClick={handleComplete} className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" /> Mark as Completed
              </button>
            )}
          </div>
        )}

        {['Resolved', 'Verified'].includes(complaint.status) && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-green-800 font-medium">Task Completed</p>
            <p className="text-sm text-green-600">Resolved on {complaint.resolvedAt ? formatDateTime(complaint.resolvedAt) : 'N/A'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ====== WORKER NOTIFICATIONS ======
export function WorkerNotificationsPage() {
  const { currentUser } = useAuth();
  const { getUserNotifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const notifications = getUserNotifications(currentUser?.id || '');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <button onClick={() => markAllNotificationsRead(currentUser?.id || '')} className="text-sm text-primary-600 hover:underline font-medium">Mark all read</button>
      </div>
      <div className="space-y-2">
        {notifications.map(n => (
          <div key={n.id} onClick={() => markNotificationRead(n.id)} className={`bg-white rounded-xl border p-4 flex items-start gap-3 cursor-pointer ${n.read ? 'border-gray-100' : 'border-primary-200 bg-primary-50/30'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${n.read ? 'bg-gray-100' : 'bg-primary-100'}`}>
              <Bell className={`w-4 h-4 ${n.read ? 'text-gray-400' : 'text-primary-600'}`} />
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

// ====== WORKER PROFILE ======
export function WorkerProfilePage() {
  const { currentUser } = useAuth();
  const worker = mockWorkers.find(w => w.id === currentUser?.id) || mockWorkers[0];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center"><span className="text-2xl font-bold text-orange-700">{currentUser?.name?.charAt(0)}</span></div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{currentUser?.name}</h2>
            <p className="text-sm text-gray-500">{currentUser?.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500">Phone</p><p className="font-medium text-gray-900">{worker.phone}</p></div>
          <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500">Area</p><p className="font-medium text-gray-900">{worker.area}</p></div>
          <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500">Status</p><p className="font-medium text-green-600 capitalize">{worker.status}</p></div>
          <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500">Rating</p><p className="font-medium text-gray-900 flex items-center gap-1">{worker.rating} <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /></p></div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-6 mt-4">
        <h3 className="font-semibold text-gray-900 mb-4">Work Statistics</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div><p className="text-2xl font-bold text-blue-600">{worker.assignedTasks}</p><p className="text-xs text-gray-500">Assigned</p></div>
          <div><p className="text-2xl font-bold text-green-600">{worker.completedTasks}</p><p className="text-xs text-gray-500">Completed</p></div>
          <div><p className="text-2xl font-bold text-gray-900">{worker.averageResponseTime}</p><p className="text-xs text-gray-500">Avg Response</p></div>
        </div>
      </div>
    </div>
  );
}
