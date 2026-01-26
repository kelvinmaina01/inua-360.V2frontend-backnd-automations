// Mock data for Inua 360 prototype

export const MOCK_AGENT_ACTIVITIES = [
  {
    id: '1',
    agentId: 'compliance',
    timestamp: new Date('2025-11-18T09:14:00'),
    title: 'KRA TCC Validated',
    titleSwahili: 'Cheti cha KRA Kimethibitishwa',
    description: 'Tax Compliance Certificate is valid until March 2026',
    descriptionSwahili: 'Cheti cha Kodi ni halali hadi Machi 2026',
    status: 'success',
    actionable: false
  },
  {
    id: '2',
    agentId: 'funding',
    timestamp: new Date('2025-11-18T02:31:00'),
    title: 'Applied to Google AfCFTA Grant',
    titleSwahili: 'Imewasilisha Ombi la Ruzuku ya Google AfCFTA',
    description: '94% match score - High chance of approval',
    descriptionSwahili: 'Alama ya 94% - Nafasi kubwa ya kukubaliwa',
    status: 'pending',
    actionable: false,
    metadata: { matchScore: 94, amount: 5000000 }
  },
  {
    id: '3',
    agentId: 'application',
    timestamp: new Date('2025-11-17T16:45:00'),
    title: 'KIE Loan Documents Prepared',
    titleSwahili: 'Hati za Mkopo wa KIE Zimeandaliwa',
    description: 'Review and approve signature to submit',
    descriptionSwahili: 'Kagua na uidhinishe saini ili kuwasilisha',
    status: 'action_required',
    actionable: true,
    metadata: { requiresSignature: true }
  },
  {
    id: '4',
    agentId: 'profile',
    timestamp: new Date('2025-11-17T14:20:00'),
    title: 'Profile Updated via M-Pesa',
    titleSwahili: 'Wasifu Umesasishwa kupitia M-Pesa',
    description: 'Auto-synced revenue data from last 30 days',
    descriptionSwahili: 'Data ya mapato imepangwa kiotomatiki kwa siku 30 zilizopita',
    status: 'success',
    actionable: false
  },
  {
    id: '5',
    agentId: 'compliance',
    timestamp: new Date('2025-11-17T10:00:00'),
    title: 'County License Expiring Soon',
    titleSwahili: 'Leseni ya Kaunti Inaisha Hivi Karibuni',
    description: 'Nairobi business license expires in 4 days',
    descriptionSwahili: 'Leseni ya biashara ya Nairobi inaisha kwa siku 4',
    status: 'warning',
    actionable: true,
    metadata: { daysLeft: 4, renewalFee: 15000 }
  },
  {
    id: '6',
    agentId: 'cashflow',
    timestamp: new Date('2025-11-17T06:00:00'),
    title: 'Cash Flow Forecast Updated',
    titleSwahili: 'Utabiri wa Mtiririko wa Fedha Umesasishwa',
    description: 'KES 800k gap predicted for January 2026',
    descriptionSwahili: 'Pengo la KES 800k limebirika kwa Januari 2026',
    status: 'info',
    actionable: false,
    metadata: { gap: 800000, month: 'January 2026' }
  },
  {
    id: '7',
    agentId: 'funding',
    timestamp: new Date('2025-11-16T11:30:00'),
    title: 'Women Fund Application Submitted',
    titleSwahili: 'Ombi la Mfuko wa Wanawake Limewasilishwa',
    description: '96% match - Application reference #WF2025-4521',
    descriptionSwahili: 'Ufanani wa 96% - Nambari ya ombi #WF2025-4521',
    status: 'success',
    actionable: false,
    metadata: { matchScore: 96, reference: 'WF2025-4521' }
  }
];

export const MOCK_FUNDING_OPPORTUNITIES = [
  {
    id: 'women-fund-1',
    source: 'women',
    amount: 500000,
    matchScore: 96,
    deadline: new Date('2025-12-31'),
    title: 'Women Enterprise Development Fund',
    titleSwahili: 'Mfuko wa Maendeleo ya Wajasiriamali Wanawake',
    status: 'submitted',
    requirements: ['KRA PIN', 'County License', 'Business Plan'],
    timeline: '2-3 months'
  },
  {
    id: 'google-grant-1',
    source: 'google',
    amount: 5000000,
    matchScore: 94,
    deadline: new Date('2025-12-15'),
    title: 'Google AfCFTA Digital Commerce Grant',
    titleSwahili: 'Ruzuku ya Biashara ya Kidijitali ya Google AfCFTA',
    status: 'in_progress',
    requirements: ['Digital presence', 'Export potential', '2+ years operation'],
    timeline: '3-6 months'
  },
  {
    id: 'kie-loan-1',
    source: 'kie',
    amount: 2000000,
    matchScore: 88,
    deadline: new Date('2026-01-31'),
    title: 'KIE SME Growth Loan',
    titleSwahili: 'Mkopo wa Ukuaji wa SME wa KIE',
    status: 'available',
    requirements: ['KRA TCC', 'Business plan', 'Collateral'],
    timeline: '1-2 months'
  },
  {
    id: 'hustler-1',
    source: 'hustler',
    amount: 50000,
    matchScore: 100,
    deadline: new Date('2025-11-30'),
    title: 'Hustler Fund - Group Product',
    titleSwahili: 'Mfuko wa Wahustler - Bidhaa ya Kikundi',
    status: 'available',
    requirements: ['KRA PIN', 'Phone number'],
    timeline: 'Instant'
  }
];

export const MOCK_CASHFLOW_DATA = [
  { date: '2025-11-18', amount: 45000, type: 'inflow', category: 'Sales' },
  { date: '2025-11-19', amount: 38000, type: 'inflow', category: 'Sales' },
  { date: '2025-11-20', amount: 52000, type: 'inflow', category: 'Sales' },
  { date: '2025-11-21', amount: 41000, type: 'inflow', category: 'Sales' },
  { date: '2025-11-22', amount: 48000, type: 'inflow', category: 'Sales' },
  { date: '2025-11-23', amount: 55000, type: 'inflow', category: 'Sales' },
  { date: '2025-11-24', amount: 50000, type: 'inflow', category: 'Sales' },
  { date: '2025-11-25', amount: -15000, type: 'outflow', category: 'Rent' },
  { date: '2025-11-26', amount: 42000, type: 'inflow', category: 'Sales' },
  { date: '2025-11-27', amount: 39000, type: 'inflow', category: 'Sales' },
  { date: '2025-11-28', amount: -25000, type: 'outflow', category: 'Supplies' },
  { date: '2025-11-29', amount: 46000, type: 'inflow', category: 'Sales' },
  { date: '2025-11-30', amount: -8000, type: 'outflow', category: 'Utilities' },
  { date: '2025-12-01', amount: 51000, type: 'inflow', category: 'Sales' },
  { date: '2025-12-02', amount: 44000, type: 'inflow', category: 'Sales' },
  { date: '2025-12-03', amount: 47000, type: 'inflow', category: 'Sales' },
  { date: '2025-12-04', amount: -30000, type: 'outflow', category: 'Salaries' },
  { date: '2025-12-05', amount: 53000, type: 'inflow', category: 'Sales' },
  { date: '2025-12-06', amount: 49000, type: 'inflow', category: 'Sales' },
  { date: '2025-12-07', amount: 45000, type: 'inflow', category: 'Sales' }
];

export const MOCK_COMPLIANCE_STATUS = {
  score: 87,
  items: [
    {
      id: 'kra_pin',
      name: 'KRA PIN Certificate',
      nameSwahili: 'Cheti cha KRA PIN',
      status: 'valid',
      validUntil: null,
      lastChecked: new Date('2025-11-18')
    },
    {
      id: 'kra_tcc',
      name: 'KRA Tax Compliance',
      nameSwahili: 'Ufuatiliaji wa Kodi KRA',
      status: 'valid',
      validUntil: new Date('2026-03-15'),
      lastChecked: new Date('2025-11-18')
    },
    {
      id: 'county_license',
      name: 'Nairobi Business License',
      nameSwahili: 'Leseni ya Biashara ya Nairobi',
      status: 'expiring',
      validUntil: new Date('2025-11-22'),
      lastChecked: new Date('2025-11-18'),
      daysLeft: 4
    },
    {
      id: 'nssf',
      name: 'NSSF Registration',
      nameSwahili: 'Usajili wa NSSF',
      status: 'valid',
      validUntil: null,
      lastChecked: new Date('2025-11-15')
    },
    {
      id: 'nhif',
      name: 'NHIF Registration',
      nameSwahili: 'Usajili wa NHIF',
      status: 'pending',
      validUntil: null,
      lastChecked: new Date('2025-11-10'),
      actionRequired: true
    },
    {
      id: 'fire',
      name: 'Fire Safety Certificate',
      nameSwahili: 'Cheti cha Usalama wa Moto',
      status: 'valid',
      validUntil: new Date('2026-06-30'),
      lastChecked: new Date('2025-11-01')
    }
  ]
};

export const MOCK_PROFILE_DATA = {
  business: {
    name: 'Mama Fua Laundry & Dry Cleaning',
    sector: 'retail',
    county: 'nairobi',
    established: new Date('2021-03-15'),
    employees: 4,
    registration: 'BN/2021/45234',
    phone: '+254 712 345 678',
    email: 'mamafua@example.com',
    address: 'Ngara, Nairobi'
  },
  financials: {
    monthlyRevenue: 120000,
    monthlyExpenses: 75000,
    netProfit: 45000,
    growthRate: 23.5,
    yearlyRevenue: 1240000
  },
  customers: {
    total: 156,
    returning: 98,
    demographics: {
      residential: 65,
      corporate: 35
    },
    satisfaction: 4.7
  },
  team: [
    {
      name: 'Jane Wanjiku',
      role: 'Owner/Manager',
      nssf: true,
      nhif: true
    },
    {
      name: 'Peter Omondi',
      role: 'Dry Cleaner',
      nssf: true,
      nhif: false
    },
    {
      name: 'Mary Akinyi',
      role: 'Laundry Assistant',
      nssf: true,
      nhif: true
    },
    {
      name: 'John Kamau',
      role: 'Delivery Driver',
      nssf: false,
      nhif: false
    }
  ],
  growthScore: {
    overall: 78,
    financial: 85,
    compliance: 87,
    customer: 72,
    innovation: 65
  }
};

export const MOCK_CHAT_MESSAGES = [
  {
    id: '1',
    sender: 'agent',
    agentId: 'supervisor',
    message: 'Habari Jane! How can I help you today?',
    messageSwahili: 'Habari Jane! Naweza kukusaidia vipi leo?',
    timestamp: new Date('2025-11-18T10:00:00')
  },
  {
    id: '2',
    sender: 'user',
    message: 'Check funding opportunities',
    timestamp: new Date('2025-11-18T10:01:00')
  },
  {
    id: '3',
    sender: 'agent',
    agentId: 'funding',
    message: 'I found 4 funding matches for you! The best one is Women Enterprise Fund at 96% match. Would you like to view details in the Money Tab?',
    messageSwahili: 'Nimepata fursa 4 za fedha! Bora zaidi ni Mfuko wa Wanawake kwa ufanani wa 96%. Ungependa kuona maelezo katika Fedha Tab?',
    timestamp: new Date('2025-11-18T10:01:30'),
    actions: [
      { label: 'View Money Tab', labelSwahili: 'Angalia Fedha', route: '/money' },
      { label: 'Apply Now', labelSwahili: 'Omba Sasa', action: 'apply-funding' }
    ]
  }
];

export const MOCK_CREDIT_SCORE = {
  score: 82,
  grade: 'excellent' as const,
  breakdown: {
    payment_history: {
      score: 85,
      weight: 35,
      status: 'good' as const,
      factors: {
        transaction_regularity: {
          score: 90,
          status: 'excellent',
          details: 'Consistent M-Pesa transactions for 6+ months',
          detailsSwahili: 'Miamala ya kawaida ya M-Pesa kwa miezi 6+'
        },
        average_payment_value: {
          score: 85,
          status: 'good',
          details: 'Average transaction value increasing by 15%',
          detailsSwahili: 'Wastani wa thamani ya miamala unaongezeka kwa 15%'
        },
        payment_timeliness: {
          score: 80,
          status: 'good',
          details: 'Regular payment patterns observed',
          detailsSwahili: 'Mifumo ya malipo ya kawaida imegunduliwa'
        }
      }
    },
    financial_stability: {
      score: 88,
      weight: 30,
      status: 'excellent' as const,
      factors: {
        cash_flow_consistency: {
          score: 85,
          status: 'good',
          details: 'Positive cash flow in 5 of last 6 months',
          detailsSwahili: 'Mtiririko chanya wa fedha katika miezi 5 ya 6 iliyopita'
        },
        revenue_growth: {
          score: 92,
          status: 'excellent',
          details: '23.5% revenue growth year-over-year',
          detailsSwahili: 'Ukuaji wa mapato wa 23.5% kwa mwaka'
        },
        expense_ratio: {
          score: 87,
          status: 'good',
          details: 'Expenses consistently below 65% of revenue',
          detailsSwahili: 'Gharama mara kwa mara chini ya 65% ya mapato'
        }
      }
    },
    business_longevity: {
      score: 75,
      weight: 20,
      status: 'adequate' as const,
      years_in_operation: 3.7,
      details: '3 years, 8 months of active trading',
      detailsSwahili: 'Miaka 3, miezi 8 ya biashara hai'
    },
    compliance_impact: {
      score: 87,
      weight: 15,
      status: 'excellent' as const,
      compliance_score: 87,
      details: '5 of 6 compliance items valid and up-to-date',
      detailsSwahili: 'Vitu 5 vya 6 vya ufuatiliaji ni halali na vimesasishwa'
    }
  },
  historical_scores: [
    { date: '2025-06', score: 72 },
    { date: '2025-07', score: 74 },
    { date: '2025-08', score: 76 },
    { date: '2025-09', score: 78 },
    { date: '2025-10', score: 80 },
    { date: '2025-11', score: 82 }
  ],
  improvement_actions: [
    {
      id: '1',
      priority: 'high' as const,
      category: 'payment_history' as const,
      action: 'Maintain consistent M-Pesa transactions for 3 more months',
      actionSwahili: 'Endelea na miamala ya kawaida ya M-Pesa kwa miezi 3 zaidi',
      impact: '+5 points to credit score',
      impactSwahili: '+5 alama kwa alama ya mikopo',
      estimated_time: '3 months',
      estimated_time_swahili: 'Miezi 3',
      current_progress: '6 months streak',
      current_progress_swahili: 'Mfululizo wa miezi 6'
    },
    {
      id: '2',
      priority: 'medium' as const,
      category: 'financial_stability' as const,
      action: 'Increase cash runway to 60 days',
      actionSwahili: 'Ongeza kipindi cha fedha hadi siku 60',
      impact: '+8 points to credit score',
      impactSwahili: '+8 alama kwa alama ya mikopo',
      estimated_time: '2-3 months',
      estimated_time_swahili: 'Miezi 2-3',
      current_progress: '38 days runway',
      current_progress_swahili: 'Kipindi cha siku 38'
    },
    {
      id: '3',
      priority: 'low' as const,
      category: 'business_longevity' as const,
      action: 'Continue building business track record',
      actionSwahili: 'Endelea kujenga historia ya biashara',
      impact: '+2 points per year',
      impactSwahili: '+2 alama kwa mwaka',
      estimated_time: 'Ongoing',
      estimated_time_swahili: 'Inaendelea',
      current_progress: '3.7 years in operation',
      current_progress_swahili: 'Miaka 3.7 ya uendeshaji'
    }
  ],
  last_updated: new Date('2025-11-18T10:00:00'),
  next_update: new Date('2025-12-18T10:00:00')
};
