
import { Hotel, PlaybookGuideline } from './types';

export const SOVEREIGN_PLAYBOOK: PlaybookGuideline[] = [
  {
    id: "P1",
    pilar: "Blindagem de Dados",
    directive: "A identidade do aderente é um ativo criptografado.",
    action: "Nenhum dado sensível é armazenado em nuvens públicas. Protocolo de anonimato local.",
    icon: "Shield"
  },
  {
    id: "P2",
    pilar: "Antevisão Estratégica",
    directive: "Prever a necessidade antes do desejo se manifestar.",
    action: "IA Concierge analisa padrões para ajustar o ambiente via automação invisível.",
    icon: "Zap"
  },
  {
    id: "P3",
    pilar: "Independência de Rede",
    directive: "Operação autônoma em nós redundantes.",
    action: "Sistemas críticos operam em nós descentralizados (Sovereign Infrastructure).",
    icon: "Globe"
  },
  {
    id: "P4",
    pilar: "Adesão Qualificada",
    directive: "O acesso é condicionado por níveis técnicos de integração.",
    action: "Limite estrito de 30 Zenith Associates por cluster regional sob regime de conformidade.",
    icon: "Gem"
  },
  {
    id: "P5",
    pilar: "Proteção da Rede",
    directive: "A confiança qualificada é a condição resolutiva do vínculo técnico.",
    action: "A quebra de aderência aciona o Dissolution Protocol: isolamento neural e reversão nominal.",
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
    secretTip: "Peça a villa 402 para o pôr do sol mais privativo da ilha.",
    nearbyExperiences: [
      { name: "Jantar sob as Estrelas", type: 'gastronomy', description: "Mesa privada em um banco de areia isolado." },
      { name: "Mergulho com Arraias", type: 'adventure', description: "Expedição guiada por biólogos marinhos." }
    ],
    amenities: ['Heliponto', 'Suíte Blindada', 'Praia Privativa', 'Chef Dedicado'],
    description: 'A joia das Maldivas para quem exige anonimato e luxo absoluto. Auditado sob o protocolo de soberania Marcos Carvalho.',
    distanceFromCenter: 0.5,
    provider: 'Iconic Registry',
    coords: { lat: 4.1755, lng: 73.5093 }
  }
];
