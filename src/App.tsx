import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

// Public Pages
import { HomePage, AboutPage, HowItWorksPage, LoginPage, RegisterPage } from './pages/PublicPages';

// Citizen Pages
import { CitizenLayout, CitizenDashboard, ReportWastePage, ComplaintsListPage, ComplaintDetailPage, CitizenMapPage, SchedulePage, RecyclingPage, NotificationsPage as CitizenNotificationsPage, ProfilePage as CitizenProfilePage } from './pages/CitizenPages';

// Worker Pages
import { WorkerLayout, WorkerDashboard, WorkerTasksPage, WorkerTaskDetailPage, WorkerNotificationsPage, WorkerProfilePage } from './pages/WorkerPages';

// Admin Pages
import { AdminLayout, AdminDashboard, AdminComplaintsPage, AdminWorkersPage, AdminUsersPage, AdminHotspotsPage, AdminAnalyticsPage, AdminNotificationsPage, AdminSettingsPage } from './pages/AdminPages';

// Protected Route Component
function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { isAuthenticated, currentUser } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (currentUser && !allowedRoles.includes(currentUser.role)) return <Navigate to="/unauthorized" replace />;
  return <>{children}</>;
}

// Redirect based on role
function RoleRedirect() {
  const { isAuthenticated, currentUser } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (currentUser?.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  if (currentUser?.role === 'worker') return <Navigate to="/worker/dashboard" replace />;
  return <Navigate to="/citizen/dashboard" replace />;
}

// 404 Page
function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <p className="text-gray-600 mb-6">Page not found</p>
        <a href="/" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700">Go Home</a>
      </div>
    </div>
  );
}

// Unauthorized Page
function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">403</h1>
        <p className="text-gray-600 mb-2">Access Denied</p>
        <p className="text-sm text-gray-500 mb-6">You don't have permission to access this page.</p>
        <a href="/" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700">Go Home</a>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Role-based redirect */}
      <Route path="/dashboard" element={<RoleRedirect />} />

      {/* Citizen Routes */}
      <Route path="/citizen" element={<ProtectedRoute allowedRoles={['citizen']}><CitizenLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/citizen/dashboard" replace />} />
        <Route path="dashboard" element={<CitizenDashboard />} />
        <Route path="report" element={<ReportWastePage />} />
        <Route path="complaints" element={<ComplaintsListPage />} />
        <Route path="complaints/:id" element={<ComplaintDetailPage />} />
        <Route path="map" element={<CitizenMapPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="recycling" element={<RecyclingPage />} />
        <Route path="notifications" element={<CitizenNotificationsPage />} />
        <Route path="profile" element={<CitizenProfilePage />} />
      </Route>

      {/* Worker Routes */}
      <Route path="/worker" element={<ProtectedRoute allowedRoles={['worker']}><WorkerLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/worker/dashboard" replace />} />
        <Route path="dashboard" element={<WorkerDashboard />} />
        <Route path="tasks" element={<WorkerTasksPage />} />
        <Route path="tasks/:id" element={<WorkerTaskDetailPage />} />
        <Route path="notifications" element={<WorkerNotificationsPage />} />
        <Route path="profile" element={<WorkerProfilePage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="complaints" element={<AdminComplaintsPage />} />
        <Route path="workers" element={<AdminWorkersPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="hotspots" element={<AdminHotspotsPage />} />
        <Route path="analytics" element={<AdminAnalyticsPage />} />
        <Route path="notifications" element={<AdminNotificationsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      {/* Error Routes */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
