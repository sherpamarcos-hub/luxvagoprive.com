
import { Hotel, PlaybookGuideline } from './types';

export const SOVEREIGN_PLAYBOOK: PlaybookGuideline[] = [
  {
    id: "P1",
    pilar: "Blindagem de Dados",
    directive: "Identidade é um ativo criptografado.",
    action: "Protocolo de anonimato local sem nuvens públicas.",
    icon: "Shield"
  },
  {
    id: "P2",
    pilar: "Antevisão Estratégica",
    directive: "Prever a necessidade antes do desejo se manifestar.",
    action: "IA Concierge analisa padrões para ajustar o ambiente.",
    icon: "Zap"
  },
  {
    id: "P3",
    pilar: "Independência de Rede",
    directive: "Operação autônoma em nós redundantes.",
    action: "Sistemas críticos operam em nós descentralizados.",
    icon: "Globe"
  },
  {
    id: "P4",
    pilar: "Adesão Qualificada",
    directive: "Acesso condicionado por níveis técnicos.",
    action: "Limite estrito de Zenith Associates por cluster.",
    icon: "Gem"
  },
  {
    id: "P5",
    pilar: "Proteção da Rede",
    directive: "Confiança qualificada como condição resolutiva.",
    action: "Dissolution Protocol: isolamento neural imediato.",
    icon: "EyeOff"
  }
];

export const MOCK_HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'Grand Azure Resort',
    location: 'Maldivas',
    rating: 4.9,
    reviewsCount: 1240,
    pricePerNight: 850,
    marketPrice: 1100,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1573843225233-6f8c40258617?auto=format&fit=crop&w=800&q=80'
    ],
    tier: 'prive',
    isZenithAward: true,
    zenithTier: 3,
    sovereigntyAudit: {
      autonomyStatus: 'verified',
      securityScore: 99.8,
      auditDate: '2024-10-12',
      certificateId: 'ZX-9981-MARCOS',
      complianceScore: 95,
      shieldStatus: 'active',
      foresightRating: 98
    },
    pulseSentiment: "Aderentes destacam o isolamento absoluto e o atendimento por protocolo invisível.",
    sentimentScores: { privacy: 98, service: 95, exclusivity: 99, gastronomy: 92 },
    coords: { lat: 4.1755, lng: 73.5093 },
    amenities: ['Heliponto', 'Suíte Blindada', 'Praia Privativa', 'Chef Dedicado'],
    description: 'A joia das Maldivas para quem exige anonimato e luxo absoluto.',
    distanceFromCenter: 0.5,
    provider: 'Iconic Registry'
  }
];
