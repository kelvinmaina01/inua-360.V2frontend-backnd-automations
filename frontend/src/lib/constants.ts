// Inua 360 Design System Constants

export const AGENTS = [
  {
    id: 'profile',
    name: 'Profile Builder',
    nameSwahili: 'Mjenzi wa Wasifu',
    icon: 'user-circle',
    color: '#FA6915',
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
    color: '#00B8A9',
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
    color: '#FA6915',
    description: 'Coordinates all agents and manages autonomy',
    descriptionSwahili: 'Inaratibu mawakala wote na kusimamia kujitegemea',
    status: 'idle' as const
  },
  {
    id: 'financials',
    name: 'Financials Agent',
    nameSwahili: 'Wakala wa Fedha',
    icon: 'smartphone',
    color: '#00B8A9',
    description: 'Syncs M-Pesa transactions and tracks financial health',
    descriptionSwahili: 'Inasawazisha miamala ya M-Pesa na kufuatilia afya ya fedha',
    status: 'active' as const
  },
  {
    id: 'credit',
    name: 'Credit Advisor',
    nameSwahili: 'Mshauri wa Mikopo',
    icon: 'credit-card',
    color: '#8B5CF6',
    description: 'Monitors creditworthiness and provides improvement insights',
    descriptionSwahili: 'Inafuatilia ustahiki wa mikopo na kutoa maarifa ya kuboresha',
    status: 'active' as const
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
  { value: 'baringo', label: 'Baringo', flag: '🏞️' },
  { value: 'bomet', label: 'Bomet', flag: '🍵' },
  { value: 'bungoma', label: 'Bungoma', flag: '🌽' },
  { value: 'busia', label: 'Busia', flag: '🛃' },
  { value: 'elgeyo_marakwet', label: 'Elgeyo-Marakwet', flag: '🏃' },
  { value: 'embu', label: 'Embu', flag: '🌿' },
  { value: 'garissa', label: 'Garissa', flag: '🐪' },
  { value: 'homa_bay', label: 'Homa Bay', flag: '🐟' },
  { value: 'isiolo', label: 'Isiolo', flag: '🦎' },
  { value: 'kajiado', label: 'Kajiado', flag: '🦒' },
  { value: 'kakamega', label: 'Kakamega', flag: '🌳' },
  { value: 'kericho', label: 'Kericho', flag: '🍵' },
  { value: 'kiambu', label: 'Kiambu', flag: '☕' },
  { value: 'kilifi', label: 'Kilifi', flag: '🌴' },
  { value: 'kirinyaga', label: 'Kirinyaga', flag: '🍚' },
  { value: 'kisii', label: 'Kisii', flag: '🍌' },
  { value: 'kisumu', label: 'Kisumu', flag: '🐟' },
  { value: 'kitui', label: 'Kitui', flag: '🏜️' },
  { value: 'kwale', label: 'Kwale', flag: '🏖️' },
  { value: 'laikipia', label: 'Laikipia', flag: '🦏' },
  { value: 'lamu', label: 'Lamu', flag: '⛵' },
  { value: 'machakos', label: 'Machakos', flag: '⛰️' },
  { value: 'makueni', label: 'Makueni', flag: '🍈' },
  { value: 'mandera', label: 'Mandera', flag: '🏜️' },
  { value: 'marsabit', label: 'Marsabit', flag: '🌋' },
  { value: 'meru', label: 'Meru', flag: '🌾' },
  { value: 'migori', label: 'Migori', flag: '⛏️' },
  { value: 'mombasa', label: 'Mombasa', flag: '🏖️' },
  { value: 'muranga', label: "Murang'a", flag: '☕' },
  { value: 'nairobi', label: 'Nairobi', flag: '🏙️' },
  { value: 'nakuru', label: 'Nakuru', flag: '🦩' },
  { value: 'nandi', label: 'Nandi', flag: '🏃' },
  { value: 'narok', label: 'Narok', flag: '🦁' },
  { value: 'nyamira', label: 'Nyamira', flag: '🍵' },
  { value: 'nyandarua', label: 'Nyandarua', flag: '🥔' },
  { value: 'nyeri', label: 'Nyeri', flag: '🏔️' },
  { value: 'samburu', label: 'Samburu', flag: '🦓' },
  { value: 'siaya', label: 'Siaya', flag: '🎣' },
  { value: 'taita_taveta', label: 'Taita-Taveta', flag: '🏔️' },
  { value: 'tana_river', label: 'Tana River', flag: '🐊' },
  { value: 'tharaka_nithi', label: 'Tharaka-Nithi', flag: '🌾' },
  { value: 'trans_nzoia', label: 'Trans-Nzoia', flag: '🌽' },
  { value: 'turkana', label: 'Turkana', flag: '🐪' },
  { value: 'uasin_gishu', label: 'Uasin Gishu', flag: '🏃' },
  { value: 'vihiga', label: 'Vihiga', flag: '🌳' },
  { value: 'wajir', label: 'Wajir', flag: '🐫' },
  { value: 'west_pokot', label: 'West Pokot', flag: '⛰️' }
];

// Revenue ranges for Kenyan SMEs (in KES)
export const REVENUE_RANGES = [
  { value: 'below_10k', label: 'Below KES 10,000', labelSwahili: 'Chini ya KES 10,000', min: 0, max: 10000 },
  { value: '10k_30k', label: 'KES 10,000 - 30,000', labelSwahili: 'KES 10,000 - 30,000', min: 10000, max: 30000 },
  { value: '30k_50k', label: 'KES 30,000 - 50,000', labelSwahili: 'KES 30,000 - 50,000', min: 30000, max: 50000 },
  { value: '50k_100k', label: 'KES 50,000 - 100,000', labelSwahili: 'KES 50,000 - 100,000', min: 50000, max: 100000 },
  { value: '100k_250k', label: 'KES 100,000 - 250,000', labelSwahili: 'KES 100,000 - 250,000', min: 100000, max: 250000 },
  { value: '250k_500k', label: 'KES 250,000 - 500,000', labelSwahili: 'KES 250,000 - 500,000', min: 250000, max: 500000 },
  { value: '500k_1m', label: 'KES 500,000 - 1 Million', labelSwahili: 'KES 500,000 - Milioni 1', min: 500000, max: 1000000 },
  { value: '1m_5m', label: 'KES 1 Million - 5 Million', labelSwahili: 'Milioni 1 - 5', min: 1000000, max: 5000000 },
  { value: 'above_5m', label: 'Above KES 5 Million', labelSwahili: 'Zaidi ya Milioni 5', min: 5000000, max: 50000000 }
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