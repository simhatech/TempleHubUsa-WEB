export type UserRole = 'DEVOTEE' | 'ADMIN' | 'STAFF';

export interface User {
  id: number;
  email: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  membershipTier?: string;
  membershipExpiry?: string;
  templeId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type TempleColorTheme = 'DEFAULT' | 'GANESH' | 'LAKSHMI' | 'SHIVA' | 'DURGA';

export interface Temple {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
  colorTheme?: TempleColorTheme;
  isIntegrated: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type EventCategory = 'FESTIVAL' | 'CULTURAL' | 'EDUCATIONAL' | 'SPIRITUAL' | 'COMMUNITY';

export interface Event {
  id: number;
  templeId: number;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  category?: EventCategory;
  maxAttendees?: number;
  currentAttendees: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type RsvpStatus = 'CONFIRMED' | 'CANCELLED';

export interface EventRsvp {
  id: number;
  eventId: number;
  userId: number;
  status: RsvpStatus;
  rsvpDate: string;
}

export type DonationPurpose = 'GENERAL' | 'CONSTRUCTION' | 'FESTIVAL' | 'EDUCATION' | 'FOOD';

export interface Donation {
  id: number;
  userId: number;
  templeId: number;
  amount: number;
  purpose: DonationPurpose;
  transactionId?: string;
  receiptNumber?: string;
  isAnonymous: boolean;
  createdAt?: string;
}

export type PujaCategory = 'DAILY' | 'SPECIAL' | 'FESTIVAL' | 'PERSONAL';

export interface Puja {
  id: number;
  templeId: number;
  name: string;
  description?: string;
  price: number;
  durationMinutes: number;
  category?: PujaCategory;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface PujaBooking {
  id: number;
  userId: number;
  pujaId: number;
  scheduledDate: string;
  amount: number;
  status: BookingStatus;
  specialInstructions?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type SevaStatus = 'ACTIVE' | 'INACTIVE';

export interface SevaOpportunity {
  id: number;
  templeId: number;
  title: string;
  description?: string;
  emoji?: string;
  schedule?: string;
  durationMinutes?: number;
  maxVolunteers?: number;
  currentVolunteers: number;
  status: SevaStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type SevaRegistrationStatus = 'REGISTERED' | 'COMPLETED' | 'CANCELLED';

export interface SevaRegistration {
  id: number;
  userId: number;
  opportunityId: number;
  status: SevaRegistrationStatus;
  registeredAt: string;
  completedAt?: string;
}

export type PrasadamCategory =
  | 'BREAKFAST'
  | 'LUNCH'
  | 'DINNER'
  | 'SNACKS'
  | 'SWEETS'
  | 'BEVERAGES'
  | 'FESTIVAL_SPECIAL';

export interface PrasadamItem {
  id: number;
  templeId: number;
  itemName: string;
  description?: string;
  price: number;
  category?: PrasadamCategory;
  imageUrl?: string;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type OrderStatus = 'PENDING' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

export interface PrasadamOrder {
  id: number;
  userId: number;
  templeId: number;
  itemId: number;
  quantity: number;
  amount: number;
  deliveryAddress?: string;
  status: OrderStatus;
  estimatedDelivery?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type FamilyMemberStatus = 'ACTIVE' | 'INACTIVE';

export interface FamilyMember {
  id: number;
  userId: number;
  name: string;
  relation: string;
  emoji?: string;
  status: FamilyMemberStatus;
  createdAt?: string;
}

export type MembershipTier = 'BASIC' | 'PREMIUM' | 'VIP';
export type BillingCycle = 'MONTHLY' | 'YEARLY';
export type MembershipStatus = 'ACTIVE' | 'EXPIRED' | 'CANCELLED';

export interface MembershipPlan {
  id: number;
  templeId: number;
  tier: MembershipTier;
  monthlyPrice: number;
  yearlyPrice: number;
  features?: string;
  limits?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserMembership {
  id: number;
  userId: number;
  planId: number;
  templeId: number;
  billingCycle: BillingCycle;
  pricePaid: number;
  startDate: string;
  endDate: string;
  status: MembershipStatus;
  paymentId?: number;
  cancelledAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type StaffStatus = 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE';

export interface Staff {
  id: number;
  templeId: number;
  name: string;
  position?: string;
  department?: string;
  phone?: string;
  email?: string;
  imageUrl?: string;
  joinedDate?: string;
  status: StaffStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'ON_LEAVE';

export interface StaffAttendance {
  id: number;
  staffId: number;
  date: string;
  status: AttendanceStatus;
  notes?: string;
  createdAt?: string;
}

export type PaymentType = 'DONATION' | 'PUJA_BOOKING' | 'PRASADAM_ORDER' | 'MEMBERSHIP';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';

export interface Payment {
  id: number;
  userId: number;
  templeId: number;
  paymentType: PaymentType;
  donationId?: number;
  pujaBookingId?: number;
  prasadamOrderId?: number;
  amount: number;
  status: PaymentStatus;
  gatewayTransactionId?: string;
  paymentMethod?: string;
  failureReason?: string;
  paidAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type InventoryCategory =
  | 'PUJA_ITEMS'
  | 'PRASADAM'
  | 'DECORATIONS'
  | 'MAINTENANCE'
  | 'OTHER';

export interface Inventory {
  id: number;
  templeId: number;
  itemName: string;
  category?: InventoryCategory;
  quantity: number;
  minQuantity?: number;
  unit?: string;
  lastRestocked?: string;
  createdAt?: string;
  updatedAt?: string;
}
