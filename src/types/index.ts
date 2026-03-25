import type { Timestamp } from "firebase/firestore";

export interface Listing {
  id: string;
  title: string;
  vendorName: string;
  imageUrl: string;
  category: "Vegetables" | "Fruits" | "Grains" | "Dairy" | "Tubers" | "Legumes" | "Spices" | "Herbs";
  quantity: string;
  originalPrice: number;
  discountPrice: number;
  discountPercent: number;
  aiReason?: string;
  co2Saved?: number;
  createdAt: Timestamp;
  status: "active" | "sold";
}

export interface ListingFormData {
  title: string;
  vendorName: string;
  category: string;
  quantity: string;
  originalPrice: number;
  imageFile: File | null;
}

export interface AIPricingResult {
  suggestedPrice: number;
  reason: string;
  co2Saved: number;
}

export interface AIDisposalResult {
  category: string;
  disposalMethod: string;
  compostabilityScore: number;
  co2Offset: number;
  instructions: string;
  marketValue: string;
}

export interface CleaningEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  targetParticipants: number;
  currentParticipants: number;
}

export interface Participant {
  id: string;
  name: string;
  stallNumber: string;
  joinedAt: Timestamp;
  avatarUrl?: string;
}

export interface DisposalSearchHistory {
  query: string;
  timestamp: number;
  icon: string;
}
