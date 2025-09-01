export interface Event {
  id: string;
  name: string;
  type: EventType;
  description: string;
  requirements: string[];
  date: Date;
  duration: number; // in hours
  rules: string[];
  location: {
    state: string;
    country: string;
    city: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    pincode: string;
  };
  capacity?: number;
  ticketType: 'free' | 'paid';
  price?: number;
  createdBy: string;
  createdAt: Date;
  interestedUsers: string[];
  checkedInUsers: string[];
  image?: string;
}

export interface EventType {
  id: string;
  name: string;
  color: string;
  icon: string;
  description: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  gender: string;
  role: 'user' | 'admin' | 'provider';
  location?: {
    city: string;
    state: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  interestedEvents: string[];
  joinedEvents: string[];
}

export interface ServiceProvider extends User {
  role: 'provider';
  services: string[];
  experience: number;
  description: string;
  availability: 'full-time' | 'part-time' | 'weekends' | 'on-call';
  hourlyRate: number;
  rating: number;
  totalReviews: number;
  isVerified: boolean;
  profileImage?: string;
}

export interface LocationFilter {
  radius: number; // in km
  city?: string;
  state?: string;
  country?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface EventFilters {
  location: LocationFilter;
  eventTypes: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  ticketType?: 'free' | 'paid' | 'all';
}