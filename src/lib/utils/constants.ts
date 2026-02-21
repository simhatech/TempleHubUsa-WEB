export const APP_NAME = 'TempleHubUSA';
export const API_BASE = '/backend';

export const QUERY_KEYS = {
  temples: ['temples'] as const,
  temple: (id: number) => ['temples', id] as const,
  templeCount: ['temples', 'count'] as const,
  events: (templeId?: number) => ['events', { templeId }] as const,
  upcomingEvents: (templeId?: number) => ['events', 'upcoming', { templeId }] as const,
  donations: ['donations'] as const,
  donationStats: ['donations', 'stats'] as const,
  pujas: ['pujas'] as const,
  puja: (id: number) => ['pujas', id] as const,
  pujaBookings: ['puja-bookings'] as const,
  sevaOpportunities: (templeId?: number) => ['seva', { templeId }] as const,
  sevaRegistrations: ['seva', 'my-registrations'] as const,
  prasadamItems: (templeId?: number) => ['prasadam', { templeId }] as const,
  prasadamOrders: ['prasadam', 'orders'] as const,
  familyMembers: ['family'] as const,
  membershipStatus: ['membership', 'status'] as const,
  membershipPlans: (templeId?: number) => ['membership', 'plans', { templeId }] as const,
  userProfile: ['user', 'profile'] as const,
  adminAnalytics: (period?: string) => ['admin', 'analytics', { period }] as const,
  adminStats: (templeId?: number) => ['admin', 'stats', { templeId }] as const,
  adminTopServices: (limit?: number) => ['admin', 'top-services', { limit }] as const,
  adminDevotees: (templeId?: number) => ['admin', 'devotees', { templeId }] as const,
  adminInventory: (templeId?: number) => ['admin', 'inventory', { templeId }] as const,
  adminInventoryStats: (templeId?: number) => ['admin', 'inventory', 'stats', { templeId }] as const,
  adminStaff: (templeId?: number) => ['admin', 'staff', { templeId }] as const,
  adminStaffAttendance: (templeId?: number, date?: string) =>
    ['admin', 'staff', 'attendance', { templeId, date }] as const,
  adminEvents: (templeId?: number) => ['admin', 'events', { templeId }] as const,
  adminDonations: (templeId?: number) => ['admin', 'donations', { templeId }] as const,
  adminDonationStats: (templeId?: number) => ['admin', 'donations', 'stats', { templeId }] as const,
} as const;

export const ROLES = {
  DEVOTEE: 'DEVOTEE',
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
} as const;

export const EVENT_CATEGORIES = [
  'FESTIVAL',
  'CULTURAL',
  'EDUCATIONAL',
  'SPIRITUAL',
  'COMMUNITY',
] as const;

export const DONATION_PURPOSES = [
  'GENERAL',
  'ANNADANAM',
  'CONSTRUCTION',
  'UTILITIES',
  'EDUCATION',
  'FESTIVAL',
] as const;

export const PUJA_CATEGORIES = ['DAILY', 'SPECIAL', 'FESTIVAL', 'PERSONAL'] as const;

export const PRASADAM_CATEGORIES = [
  'BREAKFAST',
  'LUNCH',
  'DINNER',
  'SNACKS',
  'SWEETS',
  'BEVERAGES',
  'FESTIVAL_SPECIAL',
] as const;

export const INVENTORY_CATEGORIES = [
  'PUJA_ITEMS',
  'PRASADAM',
  'DECORATIONS',
  'MAINTENANCE',
  'OTHER',
] as const;

export const PRESET_DONATION_AMOUNTS = [11, 21, 51, 101, 251, 501] as const;
