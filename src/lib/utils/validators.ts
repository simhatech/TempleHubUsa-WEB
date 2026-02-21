import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    phone: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const donationSchema = z.object({
  amount: z.number().min(1, 'Minimum donation is $1'),
  purpose: z.string().min(1, 'Please select a purpose'),
  isAnonymous: z.boolean().default(false),
});

export type DonationFormValues = z.infer<typeof donationSchema>;

export const pujaBookingSchema = z.object({
  pujaId: z.number(),
  scheduledDate: z.string().min(1, 'Please select a date'),
  specialInstructions: z.string().optional(),
});

export type PujaBookingFormValues = z.infer<typeof pujaBookingSchema>;

export const familyMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  relation: z.string().min(1, 'Relation is required'),
});

export type FamilyMemberFormValues = z.infer<typeof familyMemberSchema>;

export const sevaRegistrationSchema = z.object({
  opportunityId: z.number(),
});

export type SevaRegistrationFormValues = z.infer<typeof sevaRegistrationSchema>;

export const prasadamOrderSchema = z.object({
  itemId: z.number(),
  quantity: z.number().min(1, 'Minimum quantity is 1'),
  deliveryAddress: z.string().optional(),
});

export type PrasadamOrderFormValues = z.infer<typeof prasadamOrderSchema>;

export const membershipUpgradeSchema = z.object({
  planId: z.number(),
  billingCycle: z.enum(['MONTHLY', 'YEARLY']),
});

export type MembershipUpgradeFormValues = z.infer<typeof membershipUpgradeSchema>;

export const templeSchema = z.object({
  name: z.string().min(2, 'Temple name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(5, 'Valid zip code required'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  colorTheme: z.string().optional(),
});

export type TempleFormValues = z.infer<typeof templeSchema>;

export const eventSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().optional(),
  templeId: z.number(),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  category: z.string().optional(),
  maxAttendees: z.number().optional(),
});

export type EventFormValues = z.infer<typeof eventSchema>;

export const inventorySchema = z.object({
  itemName: z.string().min(1, 'Item name is required'),
  category: z.string().optional(),
  quantity: z.number().min(0),
  minQuantity: z.number().min(0).optional(),
  unit: z.string().optional(),
});

export type InventoryFormValues = z.infer<typeof inventorySchema>;

export const staffSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  position: z.string().optional(),
  department: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Valid email required').optional().or(z.literal('')),
  joinedDate: z.string().optional(),
});

export type StaffFormValues = z.infer<typeof staffSchema>;
