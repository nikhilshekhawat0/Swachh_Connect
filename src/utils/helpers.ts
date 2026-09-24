// Utility functions for SwachhConnect

// AI Simulation - Waste Classification
export function simulateAIClassification(imageName: string): { prediction: string; confidence: number; recommendation: string } {
  const classes = ['Plastic', 'Paper', 'Glass', 'Metal', 'Organic', 'Cardboard', 'E-Waste', 'Mixed Waste'];
  const name = imageName.toLowerCase();
  let prediction = 'Mixed Waste';
  let confidence = 75 + Math.floor(Math.random() * 15);

  if (name.includes('plastic') || name.includes('bottle') || name.includes('can')) { prediction = 'Plastic'; confidence = 88 + Math.floor(Math.random() * 10); }
  else if (name.includes('paper') || name.includes('cardboard') || name.includes('box')) { prediction = 'Paper'; confidence = 85 + Math.floor(Math.random() * 12); }
  else if (name.includes('glass') || name.includes('bottle')) { prediction = 'Glass'; confidence = 86 + Math.floor(Math.random() * 10); }
  else if (name.includes('metal') || name.includes('scrap') || name.includes('tin')) { prediction = 'Metal'; confidence = 84 + Math.floor(Math.random() * 12); }
  else if (name.includes('organic') || name.includes('food') || name.includes('vegetable')) { prediction = 'Organic'; confidence = 82 + Math.floor(Math.random() * 14); }
  else if (name.includes('e-waste') || name.includes('electronic') || name.includes('monitor')) { prediction = 'E-Waste'; confidence = 80 + Math.floor(Math.random() * 15); }
  else if (name.includes('mixed') || name.includes('garbage') || name.includes('heap')) { prediction = 'Mixed Waste'; confidence = 72 + Math.floor(Math.random() * 15); }
  else { prediction = classes[Math.floor(Math.random() * classes.length)]; confidence = 70 + Math.floor(Math.random() * 20); }

  const recommendations: Record<string, string> = {
    'Plastic': 'Dispose in blue bin. Rinse containers before disposal.',
    'Paper': 'Dispose in green bin. Keep dry and flat.',
    'Glass': 'Handle carefully. Dispose in designated glass container.',
    'Metal': 'Dispose in yellow bin. Separate ferrous and non-ferrous.',
    'Organic': 'Dispose in brown bin. Consider composting.',
    'Cardboard': 'Flatten before disposal. Place in recycling bin.',
    'E-Waste': 'Do NOT mix with regular waste. Take to e-waste center.',
    'Mixed Waste': 'Segregate if possible. Dispose in general waste bin.',
  };

  return { prediction, confidence, recommendation: recommendations[prediction] || 'Dispose according to local guidelines.' };
}

// Priority Prediction Engine
export function predictPriority(severity: string, wasteType: string, complaintCount: number): 'Low' | 'Medium' | 'High' | 'Critical' {
  let score = 0;
  if (severity === 'Critical') score += 40;
  else if (severity === 'High') score += 30;
  else if (severity === 'Medium') score += 20;
  else score += 10;

  if (wasteType === 'E-Waste' || wasteType === 'Glass') score += 15;
  else if (wasteType === 'Organic') score += 10;
  else if (wasteType === 'Mixed Waste') score += 12;
  else score += 5;

  if (complaintCount > 10) score += 20;
  else if (complaintCount > 5) score += 10;

  if (score >= 60) return 'Critical';
  if (score >= 40) return 'High';
  if (score >= 25) return 'Medium';
  return 'Low';
}

// CleanScore Calculator
export function calculateCleanScore(complaintCount: number, resolvedCount: number, avgResolutionHours: number): number {
  const baseScore = 100;
  const complaintPenalty = Math.min(complaintCount * 3, 40);
  const unresolvedPenalty = Math.max((complaintCount - resolvedCount) * 5, 0);
  const timePenalty = Math.min(avgResolutionHours * 0.5, 20);
  return Math.max(Math.round(baseScore - complaintPenalty - unresolvedPenalty - timePenalty), 0);
}

// Formatters
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function formatTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateStr);
}

export function generateComplaintId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `SC-2026-${num}`;
}

// Validators
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone);
}

// Status colors
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'Reported': 'bg-blue-100 text-blue-800',
    'Under Review': 'bg-yellow-100 text-yellow-800',
    'Assigned': 'bg-purple-100 text-purple-800',
    'In Progress': 'bg-orange-100 text-orange-800',
    'Resolved': 'bg-green-100 text-green-800',
    'Verified': 'bg-emerald-100 text-emerald-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    'Low': 'bg-slate-100 text-slate-700',
    'Medium': 'bg-yellow-100 text-yellow-700',
    'High': 'bg-orange-100 text-orange-700',
    'Critical': 'bg-red-100 text-red-700',
  };
  return colors[priority] || 'bg-gray-100 text-gray-700';
}

export function getRiskColor(risk: string): string {
  const colors: Record<string, string> = {
    'Low': 'text-green-600 bg-green-50',
    'Medium': 'text-yellow-600 bg-yellow-50',
    'High': 'text-orange-600 bg-orange-50',
    'Critical': 'text-red-600 bg-red-50',
  };
  return colors[risk] || 'text-gray-600 bg-gray-50';
}

export function getCleanScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  if (score >= 40) return 'text-orange-600';
  return 'text-red-600';
}
