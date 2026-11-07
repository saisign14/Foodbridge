export type UserRole = 'donor' | 'ngo' | 'volunteer' | 'admin';

export type AndhraCity =
  | 'Vijayawada'
  | 'Visakhapatnam'
  | 'Guntur'
  | 'Tirupati'
  | 'Rajahmundry'
  | 'Kakinada'
  | 'Nellore'
  | 'Kurnool'
  | 'Anantapur';

export type FoodCategory =
  | 'Andhra Meals & Rice'
  | 'Kalyana Mandapam Feast'
  | 'South Indian Tiffins'
  | 'Temple Prasadam & Annadanam'
  | 'Rythu Bazaar Fresh Produce'
  | 'Sweets & Bakery';

export type DietaryType = 'Vegetarian' | 'Non-Vegetarian' | 'Vegan' | 'Pure Sattvic (No Onion/Garlic)';

export type StorageRequirement =
  | 'Keep Warm (>60°C)'
  | 'Normal Room Temp (Cool & Dry)'
  | 'Refrigerated (0-4°C)'
  | 'Consume Within 2 Hours';

export type DonationStatus =
  | 'Available'
  | 'Requested'
  | 'Approved'
  | 'Assigned to Volunteer'
  | 'Picked Up'
  | 'Delivered'
  | 'Completed'
  | 'Expired'
  | 'Cancelled';

export interface TimelineEvent {
  status: DonationStatus;
  timestamp: string;
  note: string;
  actor: string;
}

export interface FoodDonation {
  id: string;
  title: string;
  teluguTitle?: string;
  category: FoodCategory;
  description: string;
  imageUrl: string;
  quantity: string; // e.g. "45 kg (100 meals)", "6 Handis Sambar Rice"
  servingsCount: number; // e.g. 100 people
  dietaryType: DietaryType;
  prepTime: string; // ISO date-time string
  expiryTime: string; // ISO date-time string
  pickupAddress: string;
  landmark: string;
  city: AndhraCity;
  district: string;
  pickupTimeWindow: string; // e.g. "Today before 4:00 PM"
  donorId: string;
  donorName: string;
  donorOrg: string;
  donorType:
    | 'Kalyana Mandapam / Function Hall'
    | 'Hotel & Restaurant'
    | 'Temple Trust / Annadanam'
    | 'Rythu Bazaar Trader'
    | 'Catering Services'
    | 'Individual Donor';
  donorPhone: string;
  donorEmail: string;
  storageReq: StorageRequirement;
  allergens: string[];
  specialInstructions: string;
  status: DonationStatus;
  timeline: TimelineEvent[];
  handoverPin: string; // 4-digit verification code
  isEmergencyAlert?: boolean; // For urgent wedding banquet surplus
  vesselReturnRequired?: boolean; // If steel handis/dabbawalas need to be returned
  
  // Relations
  requestedBy?: {
    ngoId: string;
    ngoName: string;
    requestedAt: string;
    beneficiaryCount: number;
    requestNotes: string;
    urgency: 'Standard' | 'Urgent';
  };

  assignedVolunteer?: {
    volunteerId: string;
    volunteerName: string;
    volunteerPhone: string;
    vehicleType: string;
    assignedAt: string;
    currentStep?: 'heading_to_donor' | 'at_pickup' | 'in_transit_to_ngo' | 'delivered';
  };

  // Live GPS Tracking & Telemetry (Next-Level Feature)
  liveTracking?: {
    isLive: boolean;
    routeProgressPercent: number; // 0 to 100
    etaMinutes: number;
    distanceKm: number;
    speedKmh: number;
    foodCoreTempCelsius: number; // e.g. 64.5°C
    vehicleNumber: string; // e.g. "AP 16 TX 4921"
    driverCurrentLocation: string; // e.g. "Passing Prakasam Barrage Bridge"
    lastGpsPingTime: string;
    routeWaypoints?: string[];
  };

  // Stainless Steel Handi & Vessel Return Ledger
  handiVesselLedger?: {
    totalHandis: number;
    itemsIncluded: string[]; // e.g. ["2 Rice Handis", "1 Sambar Handi", "1 Pappu Handi"]
    returnDeadlineDate: string;
    isReturnedToMandapam: boolean;
    returnedAt?: string;
    acknowledgedByDonor: boolean;
  };

  certificateId?: string; // Generated upon completion

  feedback?: {
    rating: number; // 1 to 5
    notes: string;
    submittedAt: string;
    mealsDeliveredCount: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  organizationName?: string;
  address: string;
  city: AndhraCity;
  district?: string;
  avatarUrl: string;
  isVerified: boolean;
  joinedDate: string;
  badge?: string;
  stats?: {
    donationsListed?: number;
    mealsShared?: number;
    requestsFulfilled?: number;
    deliveriesCompleted?: number;
    volunteerHours?: number;
  };
}

export interface SuccessStory {
  id: string;
  title: string;
  teluguTag?: string;
  beneficiaryOrg: string;
  donorOrg: string;
  location: string;
  date: string;
  mealsShared: number;
  description: string;
  quote: string;
  author: string;
  authorRole: string;
  imageUrl: string;
}

export interface ImpactStats {
  totalFoodDonatedKg: number;
  mealsServed: number;
  activeVolunteers: number;
  partnerNgos: number;
  carbonSavedKg: number;
  andhraDistrictsCovered: number;
}
