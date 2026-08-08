export type NavigationTab = 'packages' | 'rental' | 'tickets' | 'operator';

export interface RoutePackage {
  id: string;
  title: string;
  region: 'Sierra' | 'Costa' | 'Amazonía' | 'Insular';
  origin: string;
  destination: string;
  intermediateStops: string[];
  price: number;
  originalPrice: number;
  durationDays: number;
  durationHours?: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  inclusions: {
    transport: boolean;
    hotel: boolean;
    breakfast: boolean;
    activities: boolean;
  };
  departureTimes: string[];
  description: string;
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  hotelName: string;
  activitiesList: string[];
}

export interface PrivateVehicle {
  id: string;
  name: string;
  type: string; // 'Sprinter VIP', 'Bus Panorámico', 'Coaster Executive', 'Van Luxury'
  capacity: number;
  pricePerDay: number;
  imageUrl: string;
  features: string[];
  driverIncluded: boolean;
  idealFor: string;
}

export interface TicketBooking {
  id: string;
  ticketCode: string;
  packageId?: string;
  packageName: string;
  origin: string;
  destination: string;
  intermediatePickup: string;
  departureDate: string;
  departureTime: string;
  seatNumber: string;
  passengerName: string;
  passengerDoc: string;
  passengerPhone: string;
  totalPaid: number;
  status: 'Confirmed' | 'Boarded' | 'Cancelled';
  inclusions: {
    transport: boolean;
    hotel: boolean;
    breakfast: boolean;
    activities: boolean;
  };
  vehicleType?: string;
  qrPayload: string;
  createdAt: string;
}

export interface SearchFilterState {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
  category: string;
}
