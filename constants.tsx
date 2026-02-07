
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
  },
  {
    id: '2',
    name: 'Onyx Heritage Palace',
    location: 'Pouso Alegre, MG',
    rating: 5.0,
    reviewsCount: 42,
    pricePerNight: 350,
    marketPrice: 500,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    tier: 'prive',
    isZenithAward: true,
    zenithTier: 3,
    sovereigntyAudit: {
      autonomyStatus: 'verified',
      securityScore: 100,
      auditDate: '2025-01-20',
      certificateId: 'LV-0001-HQ',
      complianceScore: 100,
      shieldStatus: 'active',
      foresightRating: 99
    },
    pulseSentiment: "Base operacional regional. Privacidade absoluta garantida pela infraestrutura local.",
    sentimentScores: { privacy: 100, service: 98, exclusivity: 100, gastronomy: 95 },
    secretTip: "Acesso direto à biblioteca privada do Arquiteto disponível para Tier III.",
    nearbyExperiences: [
      { name: "Degustação de Vinhos de Altitude", type: 'gastronomy', description: "Seleção exclusiva de vinhedos da Mantiqueira." }
    ],
    amenities: ['Bunker Digital', 'Acesso Criptografado', 'Heliporto'],
    description: 'O epicentro do protocolo Zenith. Luxo clássico equilibrado com segurança operacional de última geração.',
    distanceFromCenter: 0.1,
    provider: 'Zenith Registry',
    coords: { lat: -22.2281, lng: -45.9322 }
  },
  {
    id: '3',
    name: 'Citadel Peak Sanctuary',
    location: 'Alpes Suíços',
    rating: 4.8,
    reviewsCount: 890,
    pricePerNight: 1200,
    marketPrice: 1600,
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80',
    tier: 'prive',
    isZenithAward: false,
    zenithTier: 2,
    sovereigntyAudit: {
      autonomyStatus: 'verified',
      securityScore: 97.5,
      auditDate: '2024-11-05',
      certificateId: 'ZX-7721-ALP',
      complianceScore: 92,
      shieldStatus: 'active',
      foresightRating: 94
    },
    pulseSentiment: "Silêncio absoluto. Arquitetura integrada à rocha para blindagem total.",
    sentimentScores: { privacy: 99, service: 94, exclusivity: 96, gastronomy: 97 },
    secretTip: "O spa termal subterrâneo é acessível apenas via chave biométrica.",
    nearbyExperiences: [
      { name: "Ski Privado Noturno", type: 'adventure', description: "Pistas exclusivas iluminadas por tochas." }
    ],
    amenities: ['Spa Termal', 'Suíte em Rocha', 'Chef Estrela Michelin'],
    description: 'Refúgio de alta montanha para líderes mundiais que buscam isolamento estratégico.',
    distanceFromCenter: 12.0,
    provider: 'Alpine Core',
    coords: { lat: 46.5476, lng: 7.9854 }
  },
  {
    id: '4',
    name: 'Jade Pearl Manor',
    location: 'Kyoto, Japão',
    rating: 4.9,
    reviewsCount: 654,
    pricePerNight: 950,
    marketPrice: 1300,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    tier: 'prive',
    isZenithAward: true,
    zenithTier: 3,
    sovereigntyAudit: {
      autonomyStatus: 'verified',
      securityScore: 98.9,
      auditDate: '2024-12-01',
      certificateId: 'ZX-1010-KYO',
      complianceScore: 98,
      shieldStatus: 'active',
      foresightRating: 97
    },
    pulseSentiment: "A harmonia perfeita entre tradição milenar e tecnologia invisível.",
    sentimentScores: { privacy: 97, service: 100, exclusivity: 98, gastronomy: 99 },
    secretTip: "O jardim zen privado é reconfigurado por IA para cada aderente.",
    nearbyExperiences: [
      { name: "Cerimônia do Chá Soberana", type: 'gastronomy', description: "Ritual privativo com mestre Ryokan." }
    ],
    amenities: ['Jardim Meditativo', 'Tatami Tecnológico', 'Onsen Privado'],
    description: 'Uma imersão na estética Wabi-sabi com a segurança do protocolo Zenith.',
    distanceFromCenter: 2.3,
    provider: 'Kyoto Trust',
    coords: { lat: 35.0116, lng: 135.7681 }
  },
  {
    id: '5',
    name: 'Desert Mirage Citadel',
    location: 'Dubai, EAU',
    rating: 4.7,
    reviewsCount: 3200,
    pricePerNight: 2100,
    marketPrice: 2800,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    tier: 'prive',
    isZenithAward: false,
    zenithTier: 1,
    sovereigntyAudit: {
      autonomyStatus: 'verified',
      securityScore: 94.2,
      auditDate: '2025-01-05',
      certificateId: 'ZX-8800-DXB',
      complianceScore: 90,
      shieldStatus: 'active',
      foresightRating: 91
    },
    pulseSentiment: "O ápice do excesso controlado. Máxima visibilidade com máxima proteção.",
    sentimentScores: { privacy: 92, service: 97, exclusivity: 95, gastronomy: 98 },
    secretTip: "O observatório privado oferece a melhor vista astronômica do deserto.",
    nearbyExperiences: [
      { name: "Safari Particular", type: 'adventure', description: "Dunas isoladas com acampamento de luxo." }
    ],
    amenities: ['Piscina Infinita', 'Shopping Privado', 'Segurança Armada'],
    description: 'Verticalidade e poder no coração do deserto, operando sob vigilância constante.',
    distanceFromCenter: 1.5,
    provider: 'Emirate Node',
    coords: { lat: 25.2048, lng: 55.2708 }
  }
];
