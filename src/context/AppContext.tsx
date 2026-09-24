import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Complaint, Notification, mockComplaints, mockNotifications } from '../data/mockData';

interface AppContextType {
  complaints: Complaint[];
  notifications: Notification[];
  addComplaint: (complaint: Complaint) => void;
  updateComplaint: (id: string, updates: Partial<Complaint>) => void;
  assignWorker: (complaintId: string, workerId: string) => void;
  updateStatus: (complaintId: string, status: Complaint['status']) => void;
  addFeedback: (complaintId: string, feedback: { rating: number; comment: string }) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (userId: string) => void;
  getUserNotifications: (userId: string) => Notification[];
  getUserComplaints: (userId: string) => Complaint[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return fallback;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [complaints, setComplaints] = useState<Complaint[]>(() => loadFromStorage('swachhconnect_complaints', mockComplaints));
  const [notifications, setNotifications] = useState<Notification[]>(() => loadFromStorage('swachhconnect_notifications', mockNotifications));

  useEffect(() => {
    localStorage.setItem('swachhconnect_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('swachhconnect_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addComplaint = useCallback((complaint: Complaint) => {
    setComplaints(prev => [complaint, ...prev]);
    setNotifications(prev => [{
      id: `n${Date.now()}`,
      userId: complaint.userId,
      type: 'complaint-submitted',
      title: 'Complaint Submitted',
      message: `Your complaint ${complaint.complaintId} has been submitted successfully.`,
      read: false,
      createdAt: new Date().toISOString(),
      relatedId: complaint.id,
    }, ...prev]);
  }, []);

  const updateComplaint = useCallback((id: string, updates: Partial<Complaint>) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  const assignWorker = useCallback((complaintId: string, workerId: string) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        const updated = { ...c, workerId, status: 'Assigned' as const, assignedAt: new Date().toISOString() };
        setNotifications(n => [{
          id: `n${Date.now()}`,
          userId: c.userId,
          type: 'complaint-assigned',
          title: 'Worker Assigned',
          message: `A worker has been assigned to your complaint ${c.complaintId}.`,
          read: false,
          createdAt: new Date().toISOString(),
          relatedId: c.id,
        }, {
          id: `n${Date.now() + 1}`,
          userId: workerId,
          type: 'task-assigned',
          title: 'New Task Assigned',
          message: `You have been assigned complaint ${c.complaintId}.`,
          read: false,
          createdAt: new Date().toISOString(),
          relatedId: c.id,
        }, ...n]);
        return updated;
      }
      return c;
    }));
  }, []);

  const updateStatus = useCallback((complaintId: string, status: Complaint['status']) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        const updates: Partial<Complaint> = { status };
        if (status === 'In Progress') updates.startedAt = new Date().toISOString();
        if (status === 'Resolved') updates.resolvedAt = new Date().toISOString();
        if (status === 'Verified') updates.verifiedAt = new Date().toISOString();
        const updated = { ...c, ...updates };

        if (status === 'Resolved') {
          setNotifications(n => [{
            id: `n${Date.now()}`,
            userId: c.userId,
            type: 'complaint-resolved',
            title: 'Complaint Resolved',
            message: `Your complaint ${c.complaintId} has been resolved. Please verify.`,
            read: false,
            createdAt: new Date().toISOString(),
            relatedId: c.id,
          }, ...n]);
        }
        return updated;
      }
      return c;
    }));
  }, []);

  const addFeedback = useCallback((complaintId: string, feedback: { rating: number; comment: string }) => {
    setComplaints(prev => prev.map(c => c.id === complaintId ? { ...c, feedback, status: 'Verified' as const, verifiedAt: new Date().toISOString() } : c));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllNotificationsRead = useCallback((userId: string) => {
    setNotifications(prev => prev.map(n => n.userId === userId ? { ...n, read: true } : n));
  }, []);

  const getUserNotifications = useCallback((userId: string) => {
    return notifications.filter(n => n.userId === userId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [notifications]);

  const getUserComplaints = useCallback((userId: string) => {
    return complaints.filter(c => c.userId === userId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [complaints]);

  return (
    <AppContext.Provider value={{
      complaints, notifications, addComplaint, updateComplaint,
      assignWorker, updateStatus, addFeedback,
      markNotificationRead, markAllNotificationsRead,
      getUserNotifications, getUserComplaints,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
