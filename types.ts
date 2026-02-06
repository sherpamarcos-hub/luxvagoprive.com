
export interface PlaybookGuideline {
  pilar: string;
  directive: string;
  action: string;
  icon: string;
  id: string;
}

export interface ExperienceItem {
  name: string;
  type: 'gastronomy' | 'culture' | 'adventure';
  description: string;
}

export interface Rituals {
  temperature: number;
  pillowType: string;
  morningDrink: string;
  wakeUpTime: string;
}

export interface LogisticTransfer {
  type: 'Helicopter' | 'Rolls Royce' | 'Private Jet';
  status: 'pending' | 'en_route' | 'ready';
  driverName?: string;
  eta?: string;
}

export interface UserStats {
  totalSaved: number;
  tripsCompleted: number;
  zenithPoints: number;
  memberSince: string;
  tier: ZenithCardTier;
  honorProgress: number;
  referralsCount: number;
  rituals?: Rituals;
  activeTransfer?: LogisticTransfer;
  isPartner?: boolean;
}

// Atualizado para refletir camadas de acesso técnico
export type ZenithCardTier = 'Fundamental' | 'Sovereign' | 'Zenith';

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  marketPrice: number;
  image: string;
  galleryImages?: string[];
  amenities: string[];
  description: string;
  distanceFromCenter: number;
  provider: string;
  aiInsight?: string;
  isFull?: boolean;
  isExternal?: boolean;
  tier: 'essential' | 'prive';
  isZenithAward?: boolean;
  zenithTier?: 1 | 2 | 3;
  coords: { lat: number; lng: number; };
  sovereigntyAudit?: {
    autonomyStatus: string;
    securityScore: number;
    auditDate: string;
    certificateId: string;
    complianceScore?: number;
    shieldStatus: 'active' | 'reinforcing' | 'standby';
    foresightRating: number;
  };
  pulseSentiment?: string;
  sentimentScores?: {
    privacy: number;
    service: number;
    exclusivity: number;
    gastronomy: number;
  };
  secretTip?: string;
  nearbyExperiences?: ExperienceItem[];
}

export interface FilterOptions {
  minRating: number;
  selectedAmenities: string[];
  maxDistance: number;
  priceRange: [number, number];
}
