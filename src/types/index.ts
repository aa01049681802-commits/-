export type VehicleId = 'motorcycle' | 'damas' | 'labo' | 'truck1t' | 'truck1t_lift' | 'truck5t';

export interface VehicleOption {
  id: VehicleId;
  name: string;
  nameKo: string;
  badge: string;
  maxWeight: string;
  dimensions: string;
  bestFor: string;
  baseFare: number;
  baseDistanceKm: number;
  perKmRate: number;
  imageUrl?: string;
}

export type PaymentMethod = 'prepaid' | 'collect' | 'card' | 'tax_invoice';

export type DeliveryType = 'standard' | 'express';

export type DeliveryStatus = 'received' | 'assigned' | 'picked_up' | 'in_transit' | 'delivered';

export interface BookingData {
  id: string;
  trackingCode: string;
  createdAt: string;
  vehicleId: VehicleId;
  deliveryType: DeliveryType;
  needHelper: boolean;
  isNight: boolean;
  sender: {
    name: string;
    phone: string;
    region: string;
    address: string;
    detail: string;
  };
  receiver: {
    name: string;
    phone: string;
    region: string;
    address: string;
    detail: string;
  };
  item: {
    type: string;
    weightKg?: number;
    boxCount?: number;
    notes?: string;
  };
  estimatedDistanceKm: number;
  estimatedMinutes: number;
  totalFare: number;
  paymentMethod: PaymentMethod;
  status: DeliveryStatus;
  driver?: {
    name: string;
    phone: string;
    vehiclePlate: string;
    rating: number;
  };
  timeline: {
    status: DeliveryStatus;
    label: string;
    time: string;
    detail: string;
  }[];
}

export type PromoVehicleCategory = 'motorcycle' | 'damas' | 'truck';
export type PromoRegionCategory = 'seoul' | 'gyeonggi';

export interface PromotionPost {
  id: string;
  title: string;
  vehicleCategory: PromoVehicleCategory; // 'motorcycle' (오토바이) | 'damas' (다마스) | 'truck' (용달)
  regionCategory: PromoRegionCategory;   // 'seoul' (서울) | 'gyeonggi' (경기도)
  regionDetail: string;                  // e.g. "서울 강남구 역삼동" or "경기도 성남시 분당구"
  content: string;
  imageUrl?: string;                     // uploaded image base64 or URL
  author: string;                        // e.g. "스마트관리자"
  createdAt: string;                     // e.g. "2026-10-24"
  views: number;
  likes: number;
  tags?: string[];
}

