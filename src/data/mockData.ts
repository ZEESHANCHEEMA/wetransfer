export const partners = [
  {
    id: 1,
    name: 'Sarah',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    requestCount: 24,
  },
  {
    id: 2,
    name: 'Jan',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    requestCount: 18,
  },
  {
    id: 3,
    name: 'Benno',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    requestCount: 8,
  },
];

export const incomingRequests = [
  {
    id: 1,
    name: 'jan',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=200&fit=crop&crop=face',
    app: 'instagram',
    reason: 'need to finish a project',
    time: '30 min',
    status: 'pending',
    timestamp: '2m ago',
  },
];

export const outgoingRequests = [
  {
    id: 1,
    partner: 'Sarah',
    partnerImage:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    selfieImage:
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=200&fit=crop&crop=face',
    app: 'Instagram',
    time: '30 min',
    reason: 'need to post a story rq',
    status: 'accepted',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    partner: 'Jan',
    partnerImage:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    selfieImage:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=200&fit=crop&crop=face',
    app: 'YouTube',
    time: '15 min',
    reason: 'watching a tutorial for class',
    status: 'pending',
    timestamp: '5 hours ago',
  },
];

export const limitedApps = [
  { id: 'instagram', name: 'Instagram', todayMinutes: 25, beforeAppMinutes: 360 },
  { id: 'tiktok', name: 'TikTok', todayMinutes: 15, beforeAppMinutes: 210 },
  { id: 'youtube', name: 'YouTube', todayMinutes: 25, beforeAppMinutes: 240 },
  { id: 'netflix', name: 'Netflix', todayMinutes: 45, beforeAppMinutes: 150 },
];

export const friends = [
  {
    id: 1,
    name: 'Sarah Ay',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    sharedApps: 5,
    activeRequests: 1,
  },
  {
    id: 2,
    name: 'Jan Lasetzke',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    sharedApps: 3,
    activeRequests: 0,
  },
  {
    id: 3,
    name: 'Benno Ay',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    sharedApps: 2,
    activeRequests: 0,
  },
];

export const controlledApps = [
  { id: 'instagram', name: 'Instagram', limit: '20m' },
  { id: 'tiktok', name: 'TikTok', limit: '10m' },
  { id: 'youtube', name: 'YouTube', limit: '20m' },
  { id: 'netflix', name: 'Netflix', limit: '45m' },
];
