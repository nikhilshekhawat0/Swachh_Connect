// Mock Data for SwachhConnect

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'citizen' | 'worker' | 'admin';
  address: string;
  status: 'active' | 'inactive';
  createdAt: string;
  points: number;
  badges: string[];
}

export interface Complaint {
  id: string;
  complaintId: string;
  userId: string;
  description: string;
  image: string;
  wasteType: string;
  aiPrediction: string;
  aiConfidence: number;
  latitude: number;
  longitude: number;
  address: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Reported' | 'Under Review' | 'Assigned' | 'In Progress' | 'Resolved' | 'Verified';
  workerId: string | null;
  createdAt: string;
  assignedAt: string | null;
  startedAt: string | null;
  resolvedAt: string | null;
  verifiedAt: string | null;
  cleanupProof: string | null;
  feedback: { rating: number; comment: string } | null;
  area: string;
}

export interface Worker {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'offline' | 'on-task';
  area: string;
  assignedTasks: number;
  completedTasks: number;
  averageResponseTime: string;
  rating: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  relatedId: string | null;
}

export interface RecyclingCenter {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  acceptedTypes: string[];
  hours: string;
  contact: string;
}

export interface Hotspot {
  id: string;
  area: string;
  latitude: number;
  longitude: number;
  complaintCount: number;
  dominantWasteType: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  cleanScore: number;
  recommendation: string;
}

export const AREAS = ['Sector 14', 'Sector 15', 'Sector 17', 'Sector 18', 'Main Market', 'University Area'];
export const WASTE_TYPES = ['Plastic', 'Paper', 'Glass', 'Metal', 'Organic', 'Cardboard', 'E-Waste', 'Mixed Waste'];

export const mockUsers: User[] = [
  { id: 'u1', name: 'Ananya Sharma', email: 'citizen@demo.com', phone: '9876543210', password: '123456', role: 'citizen', address: '12 Green Park, Sector 14', status: 'active', createdAt: '2025-11-15', points: 145, badges: ['First Report', 'Eco Warrior', 'Consistent Reporter'] },
  { id: 'u2', name: 'Rahul Verma', email: 'rahul@example.com', phone: '9876543211', password: '123456', role: 'citizen', address: '45 MG Road, Sector 15', status: 'active', createdAt: '2025-12-01', points: 80, badges: ['First Report', 'Active Citizen'] },
  { id: 'u3', name: 'Priya Patel', email: 'priya@example.com', phone: '9876543212', password: '123456', role: 'citizen', address: '78 Nehru Nagar, Sector 17', status: 'active', createdAt: '2026-01-10', points: 200, badges: ['First Report', 'Eco Warrior', 'Top Reporter'] },
  { id: 'u4', name: 'Vikram Singh', email: 'vikram@example.com', phone: '9876543213', password: '123456', role: 'citizen', address: '23 Civil Lines, Sector 18', status: 'active', createdAt: '2026-02-05', points: 60, badges: ['First Report'] },
  { id: 'u5', name: 'Meera Joshi', email: 'meera@example.com', phone: '9876543214', password: '123456', role: 'citizen', address: '56 Lake View, University Area', status: 'active', createdAt: '2026-01-20', points: 110, badges: ['First Report', 'Active Citizen'] },
  { id: 'w1', name: 'Suresh Kumar', email: 'worker@demo.com', phone: '9876543220', password: '123456', role: 'worker', address: 'Sector 14, Worker Quarters', status: 'active', createdAt: '2025-10-01', points: 0, badges: [] },
  { id: 'w2', name: 'Rajesh Yadav', email: 'rajesh@example.com', phone: '9876543221', password: '123456', role: 'worker', address: 'Sector 15, Worker Quarters', status: 'active', createdAt: '2025-10-01', points: 0, badges: [] },
  { id: 'w3', name: 'Mohan Das', email: 'mohan@example.com', phone: '9876543222', password: '123456', role: 'worker', address: 'Sector 17, Worker Quarters', status: 'active', createdAt: '2025-10-01', points: 0, badges: [] },
  { id: 'w4', name: 'Deepak Sharma', email: 'deepak@example.com', phone: '9876543223', password: '123456', role: 'worker', address: 'Main Market Area', status: 'active', createdAt: '2025-10-01', points: 0, badges: [] },
  { id: 'w5', name: 'Arun Tiwari', email: 'arun@example.com', phone: '9876543224', password: '123456', role: 'worker', address: 'University Area', status: 'active', createdAt: '2025-10-01', points: 0, badges: [] },
  { id: 'a1', name: 'Dr. Kavita Menon', email: 'admin@demo.com', phone: '9876543230', password: '123456', role: 'admin', address: 'Municipal Corporation Office', status: 'active', createdAt: '2025-09-01', points: 0, badges: [] },
  { id: 'u6', name: 'Amit Gupta', email: 'amit@example.com', phone: '9876543215', password: '123456', role: 'citizen', address: '34 Rose Garden, Sector 14', status: 'active', createdAt: '2026-03-01', points: 30, badges: ['First Report'] },
  { id: 'u7', name: 'Sneha Reddy', email: 'sneha@example.com', phone: '9876543216', password: '123456', role: 'citizen', address: '67 Sunrise Colony, Sector 18', status: 'active', createdAt: '2026-02-15', points: 50, badges: ['First Report'] },
  { id: 'u8', name: 'Karan Malhotra', email: 'karan@example.com', phone: '9876543217', password: '123456', role: 'citizen', address: '89 Park Avenue, Main Market', status: 'inactive', createdAt: '2025-12-20', points: 15, badges: [] },
  { id: 'u9', name: 'Divya Nair', email: 'divya@example.com', phone: '9876543218', password: '123456', role: 'citizen', address: '12 Lake Road, University Area', status: 'active', createdAt: '2026-01-05', points: 90, badges: ['First Report', 'Active Citizen'] },
];

export const mockWorkers: Worker[] = [
  { id: 'w1', name: 'Suresh Kumar', email: 'worker@demo.com', phone: '9876543220', status: 'active', area: 'Sector 14', assignedTasks: 2, completedTasks: 45, averageResponseTime: '1.2 hrs', rating: 4.7 },
  { id: 'w2', name: 'Rajesh Yadav', email: 'rajesh@example.com', phone: '9876543221', status: 'on-task', area: 'Sector 15', assignedTasks: 1, completedTasks: 38, averageResponseTime: '1.5 hrs', rating: 4.5 },
  { id: 'w3', name: 'Mohan Das', email: 'mohan@example.com', phone: '9876543222', status: 'active', area: 'Sector 17', assignedTasks: 0, completedTasks: 52, averageResponseTime: '0.9 hrs', rating: 4.8 },
  { id: 'w4', name: 'Deepak Sharma', email: 'deepak@example.com', phone: '9876543223', status: 'active', area: 'Main Market', assignedTasks: 3, completedTasks: 30, averageResponseTime: '1.8 hrs', rating: 4.3 },
  { id: 'w5', name: 'Arun Tiwari', email: 'arun@example.com', phone: '9876543224', status: 'offline', area: 'University Area', assignedTasks: 0, completedTasks: 28, averageResponseTime: '2.1 hrs', rating: 4.1 },
  { id: 'w6', name: 'Ramesh Patel', email: 'ramesh@example.com', phone: '9876543225', status: 'on-task', area: 'Sector 18', assignedTasks: 2, completedTasks: 41, averageResponseTime: '1.3 hrs', rating: 4.6 },
  { id: 'w7', name: 'Gopal Krishna', email: 'gopal@example.com', phone: '9876543226', status: 'active', area: 'Sector 14', assignedTasks: 1, completedTasks: 35, averageResponseTime: '1.6 hrs', rating: 4.4 },
  { id: 'w8', name: 'Bharat Singh', email: 'bharat@example.com', phone: '9876543227', status: 'active', area: 'Sector 15', assignedTasks: 0, completedTasks: 22, averageResponseTime: '2.3 hrs', rating: 4.0 },
];

const imgPlaceholder = (text: string) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="#e2e8f0" width="400" height="300"/><text fill="#64748b" font-family="sans-serif" font-size="14" text-anchor="middle" x="200" y="155">${text}</text></svg>`)}`;

export const mockComplaints: Complaint[] = [
  { id: 'c1', complaintId: 'SC-2026-0001', userId: 'u1', description: 'Large pile of plastic waste accumulated near the park entrance. Bins are overflowing and garbage is spreading onto the pathway.', image: imgPlaceholder('Plastic Waste Pile'), wasteType: 'Plastic', aiPrediction: 'Plastic', aiConfidence: 94, latitude: 28.6139, longitude: 77.2090, address: 'Green Park Entrance, Sector 14', severity: 'High', priority: 'High', status: 'Assigned', workerId: 'w1', createdAt: '2026-03-18T08:30:00', assignedAt: '2026-03-18T10:15:00', startedAt: null, resolvedAt: null, verifiedAt: null, cleanupProof: null, feedback: null, area: 'Sector 14' },
  { id: 'c2', complaintId: 'SC-2026-0002', userId: 'u2', description: 'Broken glass bottles scattered on the road near the school bus stop. Very dangerous for children.', image: imgPlaceholder('Glass Debris'), wasteType: 'Glass', aiPrediction: 'Glass', aiConfidence: 91, latitude: 28.6200, longitude: 77.2150, address: 'School Bus Stop, Sector 15', severity: 'Critical', priority: 'Critical', status: 'In Progress', workerId: 'w2', createdAt: '2026-03-17T14:20:00', assignedAt: '2026-03-17T15:00:00', startedAt: '2026-03-18T07:30:00', resolvedAt: null, verifiedAt: null, cleanupProof: null, feedback: null, area: 'Sector 15' },
  { id: 'c3', complaintId: 'SC-2026-0003', userId: 'u3', description: 'Organic waste from the vegetable market is rotting and causing a terrible smell. Flies and mosquitoes everywhere.', image: imgPlaceholder('Organic Waste'), wasteType: 'Organic', aiPrediction: 'Organic', aiConfidence: 88, latitude: 28.6300, longitude: 77.2200, address: 'Vegetable Market Lane, Sector 17', severity: 'High', priority: 'High', status: 'Resolved', workerId: 'w3', createdAt: '2026-03-15T09:00:00', assignedAt: '2026-03-15T10:30:00', startedAt: '2026-03-15T11:00:00', resolvedAt: '2026-03-16T08:00:00', verifiedAt: null, cleanupProof: imgPlaceholder('Cleanup Done'), feedback: null, area: 'Sector 17' },
  { id: 'c4', complaintId: 'SC-2026-0004', userId: 'u4', description: 'E-waste including old monitors and cables dumped behind the community center.', image: imgPlaceholder('E-Waste Dump'), wasteType: 'E-Waste', aiPrediction: 'E-Waste', aiConfidence: 86, latitude: 28.6350, longitude: 77.2100, address: 'Behind Community Center, Sector 18', severity: 'Medium', priority: 'Medium', status: 'Reported', workerId: null, createdAt: '2026-03-19T16:45:00', assignedAt: null, startedAt: null, resolvedAt: null, verifiedAt: null, cleanupProof: null, feedback: null, area: 'Sector 18' },
  { id: 'c5', complaintId: 'SC-2026-0005', userId: 'u5', description: 'Mixed waste including food wrappers and paper堆积 near the university canteen area.', image: imgPlaceholder('Mixed Waste'), wasteType: 'Mixed Waste', aiPrediction: 'Mixed Waste', aiConfidence: 79, latitude: 28.6400, longitude: 77.2250, address: 'University Canteen Area', severity: 'Medium', priority: 'Medium', status: 'Under Review', workerId: null, createdAt: '2026-03-19T11:30:00', assignedAt: null, startedAt: null, resolvedAt: null, verifiedAt: null, cleanupProof: null, feedback: null, area: 'University Area' },
  { id: 'c6', complaintId: 'SC-2026-0006', userId: 'u1', description: 'Paper and cardboard boxes left outside the recycling bin after collection hours.', image: imgPlaceholder('Paper Waste'), wasteType: 'Paper', aiPrediction: 'Paper', aiConfidence: 92, latitude: 28.6145, longitude: 77.2095, address: 'Recycling Point, Sector 14', severity: 'Low', priority: 'Low', status: 'Verified', workerId: 'w1', createdAt: '2026-03-10T10:00:00', assignedAt: '2026-03-10T11:00:00', startedAt: '2026-03-10T14:00:00', resolvedAt: '2026-03-11T09:00:00', verifiedAt: '2026-03-11T15:00:00', cleanupProof: imgPlaceholder('Cleaned'), feedback: { rating: 5, comment: 'Very quick response! Thank you.' }, area: 'Sector 14' },
  { id: 'c7', complaintId: 'SC-2026-0007', userId: 'u3', description: 'Metal scrap and rusted containers堆积 near the construction site fence.', image: imgPlaceholder('Metal Scrap'), wasteType: 'Metal', aiPrediction: 'Metal', aiConfidence: 89, latitude: 28.6280, longitude: 77.2180, address: 'Construction Site, Sector 17', severity: 'Medium', priority: 'Medium', status: 'Assigned', workerId: 'w3', createdAt: '2026-03-16T13:00:00', assignedAt: '2026-03-16T15:30:00', startedAt: null, resolvedAt: null, verifiedAt: null, cleanupProof: null, feedback: null, area: 'Sector 17' },
  { id: 'c8', complaintId: 'SC-2026-0008', userId: 'u2', description: 'Plastic bags and wrappers clogging the drainage near the main road intersection.', image: imgPlaceholder('Drainage Blockage'), wasteType: 'Plastic', aiPrediction: 'Plastic', aiConfidence: 93, latitude: 28.6210, longitude: 77.2140, address: 'Main Road Intersection, Sector 15', severity: 'Critical', priority: 'Critical', status: 'Resolved', workerId: 'w2', createdAt: '2026-03-12T07:30:00', assignedAt: '2026-03-12T08:00:00', startedAt: '2026-03-12T08:30:00', resolvedAt: '2026-03-12T12:00:00', verifiedAt: '2026-03-12T16:00:00', cleanupProof: imgPlaceholder('Drain Cleared'), feedback: { rating: 4, comment: 'Good work, drainage is clear now.' }, area: 'Sector 15' },
  { id: 'c9', complaintId: 'SC-2026-0009', userId: 'u5', description: 'Food waste from the canteen not being collected regularly. Attracting stray animals.', image: imgPlaceholder('Food Waste'), wasteType: 'Organic', aiPrediction: 'Organic', aiConfidence: 85, latitude: 28.6410, longitude: 77.2260, address: 'University Canteen Back Area', severity: 'High', priority: 'High', status: 'In Progress', workerId: 'w5', createdAt: '2026-03-18T12:00:00', assignedAt: '2026-03-18T13:30:00', startedAt: '2026-03-19T08:00:00', resolvedAt: null, verifiedAt: null, cleanupProof: null, feedback: null, area: 'University Area' },
  { id: 'c10', complaintId: 'SC-2026-0010', userId: 'u4', description: 'Cardboard packaging waste from shops堆积 on the sidewalk blocking pedestrian walkway.', image: imgPlaceholder('Cardboard Waste'), wasteType: 'Cardboard', aiPrediction: 'Cardboard', aiConfidence: 90, latitude: 28.6340, longitude: 77.2090, address: 'Shopping Street, Sector 18', severity: 'Low', priority: 'Low', status: 'Resolved', workerId: 'w6', createdAt: '2026-03-14T09:30:00', assignedAt: '2026-03-14T11:00:00', startedAt: '2026-03-14T14:00:00', resolvedAt: '2026-03-14T17:00:00', verifiedAt: '2026-03-15T10:00:00', cleanupProof: imgPlaceholder('Sidewalk Clear'), feedback: { rating: 5, comment: 'Excellent service!' }, area: 'Sector 18' },
  { id: 'c11', complaintId: 'SC-2026-0011', userId: 'u6', description: 'Plastic bottles and cans thrown into the pond near the jogging track.', image: imgPlaceholder('Pond Pollution'), wasteType: 'Plastic', aiPrediction: 'Plastic', aiConfidence: 91, latitude: 28.6150, longitude: 77.2080, address: 'Jogging Track Pond, Sector 14', severity: 'High', priority: 'High', status: 'Reported', workerId: null, createdAt: '2026-03-19T06:30:00', assignedAt: null, startedAt: null, resolvedAt: null, verifiedAt: null, cleanupProof: null, feedback: null, area: 'Sector 14' },
  { id: 'c12', complaintId: 'SC-2026-0012', userId: 'u7', description: 'Large heap of mixed garbage near the apartment complex gate.', image: imgPlaceholder('Garbage Heap'), wasteType: 'Mixed Waste', aiPrediction: 'Mixed Waste', aiConfidence: 82, latitude: 28.6360, longitude: 77.2110, address: 'Apartment Gate, Sector 18', severity: 'High', priority: 'High', status: 'Assigned', workerId: 'w6', createdAt: '2026-03-17T17:00:00', assignedAt: '2026-03-18T08:00:00', startedAt: null, resolvedAt: null, verifiedAt: null, cleanupProof: null, feedback: null, area: 'Sector 18' },
  { id: 'c13', complaintId: 'SC-2026-0013', userId: 'u9', description: 'Discarded syringes and medical waste found near the public park dustbin.', image: imgPlaceholder('Medical Waste'), wasteType: 'Mixed Waste', aiPrediction: 'Mixed Waste', aiConfidence: 72, latitude: 28.6420, longitude: 77.2270, address: 'Public Park, University Area', severity: 'Critical', priority: 'Critical', status: 'In Progress', workerId: 'w5', createdAt: '2026-03-19T07:00:00', assignedAt: '2026-03-19T07:30:00', startedAt: '2026-03-19T08:30:00', resolvedAt: null, verifiedAt: null, cleanupProof: null, feedback: null, area: 'University Area' },
  { id: 'c14', complaintId: 'SC-2026-0014', userId: 'u1', description: 'Overflowing dustbin at the bus stop with garbage spilling onto the road.', image: imgPlaceholder('Overflowing Bin'), wasteType: 'Mixed Waste', aiPrediction: 'Mixed Waste', aiConfidence: 80, latitude: 28.6135, longitude: 77.2085, address: 'Bus Stop, Sector 14', severity: 'Medium', priority: 'Medium', status: 'Resolved', workerId: 'w7', createdAt: '2026-03-13T08:00:00', assignedAt: '2026-03-13T09:00:00', startedAt: '2026-03-13T10:00:00', resolvedAt: '2026-03-13T13:00:00', verifiedAt: '2026-03-13T17:00:00', cleanupProof: imgPlaceholder('Bin Emptied'), feedback: { rating: 4, comment: 'Resolved quickly.' }, area: 'Sector 14' },
  { id: 'c15', complaintId: 'SC-2026-0015', userId: 'u3', description: 'Illegal dumping of construction debris on the empty plot near the school.', image: imgPlaceholder('Construction Debris'), wasteType: 'Mixed Waste', aiPrediction: 'Mixed Waste', aiConfidence: 76, latitude: 28.6290, longitude: 77.2190, address: 'Empty Plot, Sector 17', severity: 'High', priority: 'High', status: 'Under Review', workerId: null, createdAt: '2026-03-19T14:00:00', assignedAt: null, startedAt: null, resolvedAt: null, verifiedAt: null, cleanupProof: null, feedback: null, area: 'Sector 17' },
];

export const mockRecyclingCenters: RecyclingCenter[] = [
  { id: 'rc1', name: 'Green Earth Recycling Hub', address: '45 Industrial Area, Sector 14', latitude: 28.6160, longitude: 77.2070, acceptedTypes: ['Plastic', 'Metal', 'Glass'], hours: '9:00 AM - 6:00 PM (Mon-Sat)', contact: '011-2345-6789' },
  { id: 'rc2', name: 'EcoCycle Collection Center', address: '12 Market Road, Sector 15', latitude: 28.6220, longitude: 77.2160, acceptedTypes: ['Paper', 'Cardboard', 'Plastic'], hours: '8:00 AM - 5:00 PM (Mon-Sat)', contact: '011-2345-6790' },
  { id: 'rc3', name: 'TechWaste Disposal Point', address: '78 Tech Park, Sector 17', latitude: 28.6310, longitude: 77.2210, acceptedTypes: ['E-Waste', 'Metal'], hours: '10:00 AM - 4:00 PM (Mon-Fri)', contact: '011-2345-6791' },
  { id: 'rc4', name: 'Organic Composting Center', address: '23 Farm Road, Sector 18', latitude: 28.6370, longitude: 77.2120, acceptedTypes: ['Organic'], hours: '7:00 AM - 3:00 PM (Mon-Sat)', contact: '011-2345-6792' },
  { id: 'rc5', name: 'City Waste Processing Unit', address: '56 Highway Side, Main Market', latitude: 28.6250, longitude: 77.2300, acceptedTypes: ['Plastic', 'Paper', 'Glass', 'Metal', 'Cardboard'], hours: '8:00 AM - 8:00 PM (Daily)', contact: '011-2345-6793' },
  { id: 'rc6', name: 'University Recycling Drive', address: 'Campus Area, University', latitude: 28.6430, longitude: 77.2280, acceptedTypes: ['Paper', 'Plastic', 'E-Waste'], hours: '9:00 AM - 5:00 PM (Mon-Fri)', contact: '011-2345-6794' },
  { id: 'rc7', name: 'CleanCity Glass Recycling', address: '34 Glass Factory Lane, Sector 14', latitude: 28.6170, longitude: 77.2100, acceptedTypes: ['Glass'], hours: '9:00 AM - 4:00 PM (Mon-Sat)', contact: '011-2345-6795' },
  { id: 'rc8', name: 'Metro Scrap Collection', address: '89 Near Metro Station, Sector 15', latitude: 28.6190, longitude: 77.2130, acceptedTypes: ['Metal', 'E-Waste', 'Plastic'], hours: '8:00 AM - 7:00 PM (Mon-Sat)', contact: '011-2345-6796' },
];

export const mockHotspots: Hotspot[] = [
  { id: 'h1', area: 'Sector 14', latitude: 28.6139, longitude: 77.2090, complaintCount: 12, dominantWasteType: 'Plastic', riskLevel: 'High', cleanScore: 45, recommendation: 'Increase collection frequency and install additional bins near park areas.' },
  { id: 'h2', area: 'Sector 15', latitude: 28.6200, longitude: 77.2150, complaintCount: 8, dominantWasteType: 'Mixed Waste', riskLevel: 'Medium', cleanScore: 62, recommendation: 'Schedule more frequent cleanup drives and improve bin placement.' },
  { id: 'h3', area: 'Sector 17', latitude: 28.6300, longitude: 77.2200, complaintCount: 15, dominantWasteType: 'Organic', riskLevel: 'Critical', cleanScore: 32, recommendation: 'Immediate intervention needed. Deploy additional organic waste collection and enforce market waste management rules.' },
  { id: 'h4', area: 'Main Market', latitude: 28.6250, longitude: 77.2300, complaintCount: 6, dominantWasteType: 'Cardboard', riskLevel: 'Low', cleanScore: 78, recommendation: 'Maintain current collection schedule. Monitor during festival seasons.' },
  { id: 'h5', area: 'University Area', latitude: 28.6420, longitude: 77.2270, complaintCount: 10, dominantWasteType: 'Plastic', riskLevel: 'High', cleanScore: 51, recommendation: 'Launch awareness campaign and increase bin density around canteen areas.' },
];

export const mockNotifications: Notification[] = [
  { id: 'n1', userId: 'u1', type: 'complaint-submitted', title: 'Complaint Submitted', message: 'Your complaint SC-2026-0001 has been submitted successfully.', read: true, createdAt: '2026-03-18T08:31:00', relatedId: 'c1' },
  { id: 'n2', userId: 'u1', type: 'complaint-assigned', title: 'Worker Assigned', message: 'Worker Suresh Kumar has been assigned to your complaint SC-2026-0001.', read: false, createdAt: '2026-03-18T10:16:00', relatedId: 'c1' },
  { id: 'n3', userId: 'u1', type: 'verification-required', title: 'Verification Required', message: 'Your complaint SC-2026-0006 has been resolved. Please verify the cleanup.', read: false, createdAt: '2026-03-11T09:05:00', relatedId: 'c6' },
  { id: 'n4', userId: 'a1', type: 'high-priority', title: 'High Priority Complaint', message: 'New critical complaint SC-2026-0002 reported - Broken glass near school.', read: false, createdAt: '2026-03-17T14:25:00', relatedId: 'c2' },
  { id: 'n5', userId: 'a1', type: 'hotspot-alert', title: 'Hotspot Alert', message: 'Sector 17 CleanScore dropped to 32. Risk level: Critical.', read: false, createdAt: '2026-03-19T06:00:00', relatedId: 'h3' },
  { id: 'n6', userId: 'w1', type: 'task-assigned', title: 'New Task Assigned', message: 'You have been assigned complaint SC-2026-0001 in Sector 14.', read: false, createdAt: '2026-03-18T10:16:00', relatedId: 'c1' },
  { id: 'n7', userId: 'w2', type: 'task-assigned', title: 'New Task Assigned', message: 'You have been assigned complaint SC-2026-0002 in Sector 15.', read: true, createdAt: '2026-03-17T15:01:00', relatedId: 'c2' },
  { id: 'n8', userId: 'u3', type: 'complaint-resolved', title: 'Complaint Resolved', message: 'Your complaint SC-2026-0003 has been resolved. Please verify.', read: false, createdAt: '2026-03-16T08:05:00', relatedId: 'c3' },
  { id: 'n9', userId: 'u1', type: 'collection-reminder', title: 'Collection Reminder', message: 'Organic waste collection scheduled for tomorrow 7:00 AM - 10:00 AM.', read: false, createdAt: '2026-03-19T18:00:00', relatedId: null },
  { id: 'n10', userId: 'a1', type: 'cleanscore-warning', title: 'CleanScore Warning', message: 'University Area CleanScore declining. Currently at 51.', read: true, createdAt: '2026-03-18T06:00:00', relatedId: 'h5' },
];

export const collectionSchedule = [
  { area: 'Sector 14', day: 'Monday', type: 'Organic Waste', time: '7:00 AM - 10:00 AM', status: 'On Schedule' },
  { area: 'Sector 14', day: 'Wednesday', type: 'Dry Waste', time: '7:00 AM - 10:00 AM', status: 'On Schedule' },
  { area: 'Sector 14', day: 'Friday', type: 'Mixed Waste', time: '7:00 AM - 10:00 AM', status: 'On Schedule' },
  { area: 'Sector 15', day: 'Monday', type: 'Dry Waste', time: '7:00 AM - 10:00 AM', status: 'On Schedule' },
  { area: 'Sector 15', day: 'Wednesday', type: 'Organic Waste', time: '7:00 AM - 10:00 AM', status: 'Delayed' },
  { area: 'Sector 15', day: 'Friday', type: 'Mixed Waste', time: '7:00 AM - 10:00 AM', status: 'On Schedule' },
  { area: 'Sector 17', day: 'Tuesday', type: 'Organic Waste', time: '7:00 AM - 10:00 AM', status: 'On Schedule' },
  { area: 'Sector 17', day: 'Thursday', type: 'Dry Waste', time: '7:00 AM - 10:00 AM', status: 'Missed' },
  { area: 'Sector 17', day: 'Saturday', type: 'Mixed Waste', time: '7:00 AM - 10:00 AM', status: 'On Schedule' },
  { area: 'Sector 18', day: 'Monday', type: 'Mixed Waste', time: '7:00 AM - 10:00 AM', status: 'On Schedule' },
  { area: 'Sector 18', day: 'Wednesday', type: 'Organic Waste', time: '7:00 AM - 10:00 AM', status: 'On Schedule' },
  { area: 'Sector 18', day: 'Friday', type: 'Dry Waste', time: '7:00 AM - 10:00 AM', status: 'On Schedule' },
  { area: 'Main Market', day: 'Daily', type: 'Mixed Waste', time: '6:00 AM - 9:00 AM', status: 'On Schedule' },
  { area: 'University Area', day: 'Monday', type: 'Organic Waste', time: '8:00 AM - 11:00 AM', status: 'On Schedule' },
  { area: 'University Area', day: 'Wednesday', type: 'Dry Waste', time: '8:00 AM - 11:00 AM', status: 'On Schedule' },
  { area: 'University Area', day: 'Friday', type: 'Mixed Waste', time: '8:00 AM - 11:00 AM', status: 'Delayed' },
];
