// Inua 360 Design System Constants

export const AGENTS = [
  {
    id: 'profile',
    name: 'Profile Builder',
    nameSwahili: 'Mjenzi wa Wasifu',
    icon: 'user-circle',
    color: '#FA6F20',
    description: 'Builds and maintains your 360° SME profile',
    descriptionSwahili: 'Inajenga na kudumisha wasifu wako wa biashara',
    status: 'active' as const
  },
  {
    id: 'compliance',
    name: 'Compliance Tracker',
    nameSwahili: 'Mfuatiliaji wa Sheria',
    icon: 'shield-check',
    color: '#34C759',
    description: 'Monitors licenses, permits, and regulatory compliance',
    descriptionSwahili: 'Inafuatilia leseni, vibali, na sheria za serikali',
    status: 'active' as const
  },
  {
    id: 'funding',
    name: 'Funding Navigator',
    nameSwahili: 'Kiongozi wa Fedha',
    icon: 'wallet',
    color: '#FFD60A',
    description: 'Finds and matches you with funding opportunities',
    descriptionSwahili: 'Inatafuta na kulinganisha fursa za fedha',
    status: 'active' as const
  },
  {
    id: 'cashflow',
    name: 'Cash-Flow Forecaster',
    nameSwahili: 'Mtabiri wa Mtiririko wa Fedha',
    icon: 'trending-up',
    color: '#007AFF',
    description: 'Predicts future cash flow and identifies gaps',
    descriptionSwahili: 'Inatabiri mtiririko wa fedha na pengo',
    status: 'active' as const
  },
  {
    id: 'application',
    name: 'Application Assistant',
    nameSwahili: 'Msaidizi wa Maombi',
    icon: 'file-text',
    color: '#FF9500',
    description: 'Prepares and submits funding applications',
    descriptionSwahili: 'Inaandaa na kuwasilisha maombi ya fedha',
    status: 'active' as const
  },
  {
    id: 'supervisor',
    name: 'Multi-Agent Supervisor',
    nameSwahili: 'Msimamizi wa Mawakala',
    icon: 'cpu',
    color: '#FA6F20',
    description: 'Coordinates all agents and manages autonomy',
    descriptionSwahili: 'Inaratibu mawakala wote na kusimamia kujitegemea',
    status: 'idle' as const
  }
];

export const KENYAN_SECTORS = [
  { value: 'agriculture', label: 'Agriculture', labelSwahili: 'Kilimo', icon: '🌾' },
  { value: 'juakali', label: 'Jua Kali (Manufacturing)', labelSwahili: 'Jua Kali', icon: '🔨' },
  { value: 'retail', label: 'Retail', labelSwahili: 'Reja Reja', icon: '🏪' },
  { value: 'transport', label: 'Transport (Matatu/Boda)', labelSwahili: 'Usafiri', icon: '🚌' },
  { value: 'food', label: 'Food & Hospitality', labelSwahili: 'Chakula & Ukarimu', icon: '🍲' },
  { value: 'tech', label: 'Technology', labelSwahili: 'Teknolojia', icon: '💻' },
  { value: 'beauty', label: 'Beauty & Salon', labelSwahili: 'Urembo', icon: '💇' },
  { value: 'construction', label: 'Construction', labelSwahili: 'Ujenzi', icon: '🏗️' },
  { value: 'other', label: 'Other', labelSwahili: 'Nyingine', icon: '📦' }
];

export const KENYAN_COUNTIES = [
  { value: 'nairobi', label: 'Nairobi', flag: '🏙️' },
  { value: 'mombasa', label: 'Mombasa', flag: '🏖️' },
  { value: 'kisumu', label: 'Kisumu', flag: '🐟' },
  { value: 'nakuru', label: 'Nakuru', flag: '🦩' },
  { value: 'eldoret', label: 'Uasin Gishu (Eldoret)', flag: '🏃' },
  { value: 'machakos', label: 'Machakos', flag: '⛰️' },
  { value: 'kiambu', label: 'Kiambu', flag: '☕' },
  { value: 'kakamega', label: 'Kakamega', flag: '🌳' }
];

export const FUNDING_SOURCES = [
  {
    id: 'hustler',
    name: 'Hustler Fund',
    nameSwahili: 'Mfuko wa Wahustler',
    logo: '💰',
    maxAmount: 50000,
    type: 'government'
  },
  {
    id: 'kie',
    name: 'KIE - Kenya Industrial Estates',
    nameSwahili: 'KIE',
    logo: '🏭',
    maxAmount: 5000000,
    type: 'government'
  },
  {
    id: 'nyota',
    name: 'NYOTA Fund',
    nameSwahili: 'Mfuko wa NYOTA',
    logo: '⭐',
    maxAmount: 500000,
    type: 'government'
  },
  {
    id: 'women',
    name: 'Women Enterprise Fund',
    nameSwahili: 'Mfuko wa Wanawake',
    logo: '👩‍💼',
    maxAmount: 1000000,
    type: 'government'
  },
  {
    id: 'youth',
    name: 'Youth Enterprise Fund',
    nameSwahili: 'Mfuko wa Vijana',
    logo: '🎓',
    maxAmount: 1000000,
    type: 'government'
  },
  {
    id: 'google',
    name: 'Google AfCFTA Grant',
    nameSwahili: 'Ruzuku ya Google AfCFTA',
    logo: '🌍',
    maxAmount: 10000000,
    type: 'private'
  }
];

export const COMPLIANCE_ITEMS = [
  {
    id: 'kra_pin',
    name: 'KRA PIN Certificate',
    nameSwahili: 'Cheti cha KRA PIN',
    required: true,
    renewable: false
  },
  {
    id: 'kra_tcc',
    name: 'KRA Tax Compliance Certificate',
    nameSwahili: 'Cheti cha Kodi KRA',
    required: true,
    renewable: true,
    renewalPeriod: 'annual'
  },
  {
    id: 'county_license',
    name: 'County Business License',
    nameSwahili: 'Leseni ya Biashara ya Kaunti',
    required: true,
    renewable: true,
    renewalPeriod: 'annual'
  },
  {
    id: 'nssf',
    name: 'NSSF Compliance',
    nameSwahili: 'Ufuatiliaji wa NSSF',
    required: true,
    renewable: false
  },
  {
    id: 'nhif',
    name: 'NHIF Compliance',
    nameSwahili: 'Ufuatiliaji wa NHIF',
    required: true,
    renewable: false
  },
  {
    id: 'fire',
    name: 'Fire Safety Certificate',
    nameSwahili: 'Cheti cha Usalama wa Moto',
    required: false,
    renewable: true,
    renewalPeriod: 'annual'
  },
  {
    id: 'food',
    name: 'Food Handling Permit',
    nameSwahili: 'Kibali cha Kushughulikia Chakula',
    required: false,
    renewable: true,
    renewalPeriod: 'annual'
  }
];

export const NAVIGATION = [
  { id: 'home', label: 'Home', labelSwahili: 'Nyumbani', icon: 'home', route: '/' },
  { id: 'feed', label: 'Agent Feed', labelSwahili: 'Mawakala', icon: 'activity', route: '/feed' },
  { id: 'money', label: 'Money', labelSwahili: 'Fedha', icon: 'wallet', route: '/money' },
  { id: 'compliance', label: 'Shield', labelSwahili: 'Kinga', icon: 'shield', route: '/compliance' },
  { id: 'profile', label: 'Profile', labelSwahili: 'Wasifu', icon: 'user', route: '/profile' },
  { id: 'chat', label: 'Chat', labelSwahili: 'Ongea', icon: 'message-circle', route: '/chat' }
];

export const MOCK_USER = {
  name: 'Jane Wanjiku',
  business: 'Mama Fua Laundry',
  sector: 'retail',
  county: 'nairobi',
  revenue: 1240000,
  language: 'en' as 'en' | 'sw',
  avatar: '👩‍💼'
};