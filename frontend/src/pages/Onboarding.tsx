import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Switch } from '../components/ui/switch';
import { Progress } from '../components/ui/progress';
import { AgentAvatar } from '../components/AgentAvatar';
import { InuaLogo } from '../components/InuaLogo';
import { KENYAN_SECTORS, KENYAN_COUNTIES, REVENUE_RANGES } from '../lib/constants';
import { Globe, Smartphone, ChevronRight, ChevronDown, CheckCircle, Shield, Lock, Store, Wallet, Phone, TrendingUp, Mail, MessageSquare } from 'lucide-react';

interface OnboardingProps {
  onComplete: (data: any) => void;
}


export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [profileSubStep, setProfileSubStep] = useState(1);
  const [language, setLanguage] = useState<'en' | 'sw'>('en');
  const [mpesaExpanded, setMpesaExpanded] = useState(false);
  const [mpesaAccountType, setMpesaAccountType] = useState<'till' | 'paybill' | 'pochi' | null>(null);
  const [mpesaDetails, setMpesaDetails] = useState({
    tillNumber: '',
    paybillNumber: '',
    accountNumber: '',
    pochiPhone: ''
  });
  const [formData, setFormData] = useState({
    businessName: '',
    sector: '',
    county: '',
    revenueRange: '',
    challenges: [] as string[],
    mpesaConnected: false,
    mpesaAccountType: null as 'till' | 'paybill' | 'pochi' | null,
    mpesaDetails: {} as Record<string, string>,
    notificationChannels: [] as string[],
    autonomyEnabled: false
  });
  const [agentsExpanded, setAgentsExpanded] = useState(false);

  // Compact 3-word agent descriptions
  const agents = [
    { id: 'profile', tagline: 'Build Your Profile', taglineSwahili: 'Jenga Wasifu' },
    { id: 'compliance', tagline: 'Track Compliance', taglineSwahili: 'Fuatilia Sheria' },
    { id: 'funding', tagline: 'Find Funding', taglineSwahili: 'Tafuta Fedha' },
    { id: 'cashflow', tagline: 'Forecast Cash', taglineSwahili: 'Tabiri Fedha' },
    { id: 'application', tagline: 'Submit Applications', taglineSwahili: 'Wasilisha Maombi' },
    { id: 'supervisor', tagline: 'Coordinate Agents', taglineSwahili: 'Ratibu Mawakala' }
  ];



  const totalSteps = 3;

  // Calculate granular progress
  let progress = 0;
  if (step === 1) progress = 15;
  else if (step === 2) {
    if (profileSubStep === 1) progress = 30;
    if (profileSubStep === 2) progress = 50;
    if (profileSubStep === 3) progress = 70;
  } else if (step === 3) progress = 90;

  const handleNext = () => {
    // Step 2 Wizard Logic
    if (step === 2) {
      if (profileSubStep < 3) {
        // Validate sub-steps
        if (profileSubStep === 1 && (!formData.businessName || !formData.sector)) return;
        if (profileSubStep === 2 && (!formData.county || !formData.revenueRange)) return;

        setProfileSubStep(profileSubStep + 1);
        return;
      }
    }

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete({ ...formData, language });
    }
  };

  const handleBack = () => {
    if (step === 2 && profileSubStep > 1) {
      setProfileSubStep(profileSubStep - 1);
      return;
    }
    if (step > 1) setStep(step - 1);
  };

  const toggleChallenge = (challenge: string) => {
    setFormData((prev) => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter((c) => c !== challenge)
        : [...prev.challenges, challenge]
    }));
  };

  const challenges = [
    { id: 'funding', label: 'Access to Funding', labelSw: 'Kupata Fedha' },
    { id: 'compliance', label: 'Regulatory Compliance', labelSw: 'Kufuata Sheria' },
    { id: 'cashflow', label: 'Cash Flow Management', labelSw: 'Usimamizi wa Fedha' },
    { id: 'customers', label: 'Finding Customers', labelSw: 'Kupata Wateja' },
    { id: 'competition', label: 'Competition', labelSw: 'Ushindani' },
    { id: 'technology', label: 'Adopting Technology', labelSw: 'Kutumia Teknolojia' }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-border">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <InuaLogo size="md" showSlogan={false} showPulse />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Inua360</h1>
              <p className="text-sm text-muted-foreground">
                {language === 'sw' ? 'Wakala wako wa SME AI' : 'Your SME AI Agent'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
            className="gap-2"
          >
            <Globe className="h-4 w-4" />
            <span>{language === 'en' ? 'Swahili' : 'English'}</span>
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 sm:px-6 py-4 border-b border-border bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">
              {language === 'sw' ? 'Hatua' : 'Step'} {step} {language === 'sw' ? 'ya' : 'of'} {totalSteps}
            </span>
            <span className="text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="max-w-2xl mx-auto">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              {/* Welcome Header */}
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {language === 'sw' ? 'Karibu Inua360!' : 'Welcome to Inua360!'}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {language === 'sw'
                    ? 'Wakala wako wa SME AI'
                    : 'Your SME AI Agent'}
                </p>
              </div>

              {/* What we'll do together - with staggered animations */}
              <div className="space-y-6 p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm">
                <h3 className="font-semibold">
                  {language === 'sw' ? 'Tutafanya nini pamoja:' : "What we'll do together:"}
                </h3>
                <div className="space-y-4">
                  {/* Item 1 */}
                  <div className="flex gap-3 animate-fade-slide-in stagger-1">
                    <div className="animate-tick-pulse stagger-1">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {language === 'sw'
                          ? 'Jenga wasifu wa biashara yako wa 360°'
                          : 'Build your 360° business profile'}
                      </p>
                    </div>
                  </div>
                  {/* Item 2 */}
                  <div className="flex gap-3 animate-fade-slide-in stagger-2">
                    <div className="animate-tick-pulse stagger-2">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {language === 'sw'
                          ? 'Tafuta fedha zinazofaa biashara yako'
                          : 'Find funding opportunities that match your business'}
                      </p>
                    </div>
                  </div>
                  {/* Item 3 */}
                  <div className="flex gap-3 animate-fade-slide-in stagger-3">
                    <div className="animate-tick-pulse stagger-3">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {language === 'sw'
                          ? 'Fuatilia sheria na leseni kiotomatiki'
                          : 'Track compliance and licenses automatically'}
                      </p>
                    </div>
                  </div>
                  {/* Item 4 */}
                  <div className="flex gap-3 animate-fade-slide-in stagger-4">
                    <div className="animate-tick-pulse stagger-4">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {language === 'sw'
                          ? 'Tabiri mtiririko wa fedha na ongeza faida'
                          : 'Forecast cash flow and grow profits'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* M-Pesa Business Connection - Expandable with Account Types */}
              <div className="mpesa-trust-card overflow-hidden transition-all duration-300">
                {/* Header - Click to expand */}
                <div
                  className="p-5 cursor-pointer group"
                  onClick={() => setMpesaExpanded(!mpesaExpanded)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 rounded-xl bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                      <Smartphone className="h-6 w-6 text-secondary" />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">
                          {language === 'sw' ? 'Ungana na M-Pesa ya Biashara' : 'Connect Business M-Pesa'}
                        </h4>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">
                          {language === 'sw' ? 'Inapendekezwa' : 'Recommended'}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {language === 'sw'
                          ? 'Fuatilia miamala ya biashara yako kupitia Daraja API'
                          : 'Track your business transactions via Daraja API'}
                      </p>

                      {/* Trust badges */}
                      <div className="flex flex-wrap gap-3 pt-1">
                        <div className="flex items-center gap-1.5 text-xs text-secondary">
                          <Lock className="h-3.5 w-3.5" />
                          <span>{language === 'sw' ? 'Imefungwa' : 'Encrypted'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-secondary">
                          <Shield className="h-3.5 w-3.5" />
                          <span>{language === 'sw' ? 'Biashara tu' : 'Business only'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Expand indicator */}
                    <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${mpesaExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {/* Expanded Content - Account Type Selection */}
                {mpesaExpanded && (
                  <div className="px-5 pb-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="border-t border-secondary/10 pt-4">
                      <Label className="text-sm font-medium mb-3 block">
                        {language === 'sw' ? 'Chagua aina ya akaunti:' : 'Select account type:'}
                      </Label>

                      {/* Account Type Cards */}
                      <div className="grid gap-3">
                        {/* Till Number */}
                        <div
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${mpesaAccountType === 'till'
                            ? 'border-secondary bg-secondary/5'
                            : 'border-border hover:border-secondary/50'
                            }`}
                          onClick={() => setMpesaAccountType('till')}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Store className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Till Number</p>
                              <p className="text-xs text-muted-foreground">Buy Goods & Services</p>
                            </div>
                            {mpesaAccountType === 'till' && (
                              <CheckCircle className="h-5 w-5 text-secondary" />
                            )}
                          </div>
                          {mpesaAccountType === 'till' && (
                            <div className="mt-3 pt-3 border-t border-border">
                              <Input
                                placeholder="Enter 6-digit Till number"
                                value={mpesaDetails.tillNumber}
                                onChange={(e) => setMpesaDetails({ ...mpesaDetails, tillNumber: e.target.value })}
                                maxLength={6}
                                className="text-center text-lg tracking-widest"
                              />
                            </div>
                          )}
                        </div>

                        {/* Paybill */}
                        <div
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${mpesaAccountType === 'paybill'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                            }`}
                          onClick={() => setMpesaAccountType('paybill')}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Wallet className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Paybill</p>
                              <p className="text-xs text-muted-foreground">Business Paybill Number</p>
                            </div>
                            {mpesaAccountType === 'paybill' && (
                              <CheckCircle className="h-5 w-5 text-secondary" />
                            )}
                          </div>
                          {mpesaAccountType === 'paybill' && (
                            <div className="mt-3 pt-3 border-t border-border space-y-3">
                              <Input
                                placeholder="Paybill number (e.g. 247247)"
                                value={mpesaDetails.paybillNumber}
                                onChange={(e) => setMpesaDetails({ ...mpesaDetails, paybillNumber: e.target.value })}
                                className="text-center"
                              />
                              <Input
                                placeholder="Account number"
                                value={mpesaDetails.accountNumber}
                                onChange={(e) => setMpesaDetails({ ...mpesaDetails, accountNumber: e.target.value })}
                                className="text-center"
                              />
                            </div>
                          )}
                        </div>

                        {/* Pochi la Biashara */}
                        <div
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${mpesaAccountType === 'pochi'
                            ? 'border-secondary bg-secondary/5'
                            : 'border-border hover:border-secondary/50'
                            }`}
                          onClick={() => setMpesaAccountType('pochi')}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-secondary/10">
                              <Phone className="h-5 w-5 text-secondary" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Pochi la Biashara</p>
                              <p className="text-xs text-muted-foreground">Safaricom Business Wallet</p>
                            </div>
                            {mpesaAccountType === 'pochi' && (
                              <CheckCircle className="h-5 w-5 text-secondary" />
                            )}
                          </div>
                          {mpesaAccountType === 'pochi' && (
                            <div className="mt-3 pt-3 border-t border-border">
                              <Input
                                placeholder="Phone number (07XX or 01XX)"
                                value={mpesaDetails.pochiPhone}
                                onChange={(e) => setMpesaDetails({ ...mpesaDetails, pochiPhone: e.target.value })}
                                maxLength={10}
                                className="text-center text-lg"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Security disclaimer */}
                      <div className="mt-4 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
                        🔒 {language === 'sw'
                          ? 'Tutatumia Safaricom Daraja API kupata jumla za miamala tu. Hakuna data ya kibinafsi itakayohifadhiwa.'
                          : 'We use Safaricom Daraja API to fetch transaction totals only. No personal data is stored.'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Profile Builder Wizard - Broken into 3 Micro-Steps */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              {/* Wizard Progress Indicator */}
              <div className="flex items-center gap-2 mb-6">
                <div className={`h-1.5 flex-1 rounded-full transition-colors ${profileSubStep >= 1 ? 'bg-primary' : 'bg-muted'}`} />
                <div className={`h-1.5 flex-1 rounded-full transition-colors ${profileSubStep >= 2 ? 'bg-primary' : 'bg-muted'}`} />
                <div className={`h-1.5 flex-1 rounded-full transition-colors ${profileSubStep >= 3 ? 'bg-primary' : 'bg-muted'}`} />
              </div>

              {/* Step 2a: Identity (Name & Sector) */}
              {profileSubStep === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                  <div className="text-center space-y-2">
                    <AgentAvatar agentId="profile" size="lg" status="active" showPulse />
                    <h2>{language === 'sw' ? 'Tuambie Kuhusu Biashara Yako' : 'Tell Us About Your Business'}</h2>
                    <p className="text-muted-foreground">
                      {language === 'sw' ? 'Hii inatusaidia kubinafsisha mawakala wako' : 'This helps us personalize your agents'}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName" className="text-base">
                        {language === 'sw' ? 'Jina la Biashara' : 'Business Name'}
                      </Label>
                      <Input
                        id="businessName"
                        placeholder={language === 'sw' ? 'Mfano: Mama Fua Laundry' : 'Ex: Mama Fua Laundry'}
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="h-14 text-lg"
                        autoFocus
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base">{language === 'sw' ? 'Sekta' : 'Sector'}</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {KENYAN_SECTORS.map((sector) => (
                          <div
                            key={sector.value}
                            onClick={() => setFormData({ ...formData, sector: sector.value })}
                            className={`
                              cursor-pointer relative p-4 rounded-xl border-2 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5
                              ${formData.sector === sector.value
                                ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                                : 'border-border bg-card'
                              }
                            `}
                          >
                            <div className="flex flex-col items-center gap-2 text-center">
                              <span className="text-2xl">{sector.icon}</span>
                              <span className="text-sm font-medium leading-tight">
                                {language === 'sw' ? sector.labelSwahili : sector.label}
                              </span>
                            </div>
                            {formData.sector === sector.value && (
                              <div className="absolute top-2 right-2 text-primary">
                                <CheckCircle className="h-4 w-4 fill-primary text-white" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2b: Scale (Location & Revenue) */}
              {profileSubStep === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                  <div className="text-center space-y-2">
                    <TrendingUp className="h-10 w-10 text-secondary mx-auto" />
                    <h2>{language === 'sw' ? 'Eneo na Ukubwa' : 'Location & Scale'}</h2>
                    <p className="text-muted-foreground">
                      {language === 'sw' ? 'Tunalinganisha fursa kulingana na eneo lako' : 'We match opportunities based on your location'}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-base">{language === 'sw' ? 'Kaunti' : 'County'}</Label>
                      <Select value={formData.county} onValueChange={(value) => setFormData({ ...formData, county: value })}>
                        <SelectTrigger id="county" className="h-14 text-lg">
                          <SelectValue placeholder={language === 'sw' ? 'Chagua kaunti' : 'Select county'} />
                        </SelectTrigger>
                        <SelectContent className="max-h-64">
                          {KENYAN_COUNTIES.map((county) => (
                            <SelectItem key={county.value} value={county.value} className="py-3">
                              <span className="text-2xl mr-2">{county.flag}</span>
                              <span className="font-medium text-base">{county.label}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base">
                        {language === 'sw' ? 'Mapato ya Mwezi' : 'Monthly Revenue'} (KES)
                      </Label>
                      <div className="grid gap-3">
                        {REVENUE_RANGES.map((range) => (
                          <div
                            key={range.value}
                            onClick={() => setFormData({ ...formData, revenueRange: range.value })}
                            className={`
                              cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center justify-between
                              ${formData.revenueRange === range.value
                                ? 'border-secondary bg-secondary/10'
                                : 'border-border hover:bg-muted'
                              }
                            `}
                          >
                            <span className="font-medium text-lg">
                              {language === 'sw' ? range.labelSwahili : range.label}
                            </span>
                            {formData.revenueRange === range.value && (
                              <CheckCircle className="h-5 w-5 text-secondary" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2c: Context (Challenges) */}
              {profileSubStep === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                  <div className="text-center space-y-2">
                    <Shield className="h-10 w-10 text-primary mx-auto" />
                    <h2>{language === 'sw' ? 'Unapitia Changamoto Gani?' : 'What are your Main Challenges?'}</h2>
                    <p className="text-muted-foreground">
                      {language === 'sw' ? 'Chagua zote zinazokuhusu' : 'Select all that apply'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {challenges.map((challenge) => (
                      <div
                        key={challenge.id}
                        onClick={() => toggleChallenge(challenge.id)}
                        className={`
                          cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 relative overflow-hidden group
                          ${formData.challenges.includes(challenge.id)
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/30'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3 relative z-10">
                          <Checkbox
                            id={challenge.id}
                            checked={formData.challenges.includes(challenge.id)}
                            onCheckedChange={() => toggleChallenge(challenge.id)}
                            className="mt-1"
                          />
                          <div>
                            <span className={`font-medium block ${formData.challenges.includes(challenge.id) ? 'text-primary' : ''}`}>
                              {language === 'sw' ? challenge.labelSw : challenge.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Permissions */}
          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center space-y-2">
                <AgentAvatar agentId="supervisor" size="lg" status="active" showPulse />
                <h2>{language === 'sw' ? 'Ruhusa za Mawakala' : 'Agent Permissions'}</h2>
                <p className="text-muted-foreground">
                  {language === 'sw'
                    ? 'Ruhusu mawakala kufanya kazi kwa niaba yako'
                    : 'Allow agents to work on your behalf'}
                </p>
              </div>

              <div className="space-y-4">
                {/* Autonomy Mode Toggle */}
                <div className="border border-border/80 rounded-xl p-6 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <Label htmlFor="autonomy" className="text-lg font-bold cursor-pointer text-foreground">
                        {language === 'sw' ? 'Wezesha Hali ya Kujitegemea' : 'Enable Autonomy Mode'}
                      </Label>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {language === 'sw'
                          ? 'Mawakala watafanya kazi chinichini wakikagua ufuatiliaji, wasilishe maombi, na watakie fursa'
                          : 'Agents will work in the background scanning compliance, submitting applications, and finding opportunities'}
                      </p>
                    </div>
                    <Switch
                      id="autonomy"
                      checked={formData.autonomyEnabled}
                      onCheckedChange={(checked) => setFormData({ ...formData, autonomyEnabled: checked })}
                      className="border-2 border-red-500"
                    />
                  </div>
                </div>

                {/* Notification Channel Selection */}
                <div className="border border-border/80 rounded-xl p-6 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex-1 space-y-1">
                      <Label htmlFor="notifications" className="text-lg font-bold cursor-pointer text-foreground">
                        {language === 'sw' ? 'Ungana na Arifa' : 'Connect Notifications'}
                      </Label>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {language === 'sw'
                          ? 'Pata arifa na uidhinishe vitendo kupitia njia unayopendelea'
                          : 'Receive alerts and approve actions via your preferred channel'}
                      </p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={formData.notificationChannels.length > 0}
                      onCheckedChange={(checked) => {
                        if (!checked) setFormData({ ...formData, notificationChannels: [] });
                        else if (formData.notificationChannels.length === 0) setFormData({ ...formData, notificationChannels: ['whatsapp'] });
                      }}
                      className="border-2 border-red-500"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-border">
                    {[
                      { id: 'whatsapp', label: 'WhatsApp', logo: '/assets/logos/whatsapp.png', color: 'border-secondary' },
                      { id: 'gmail', label: 'Gmail', logo: '/assets/logos/gmail.png', color: 'border-destructive' },
                      { id: 'slack', label: 'Slack', logo: '/assets/logos/slack.png', color: 'border-primary' }
                    ].map((channel) => {
                      const Icon = channel.icon;
                      const isSelected = formData.notificationChannels.includes(channel.id);
                      return (
                        <Button
                          key={channel.id}
                          type="button"
                          variant="outline"
                          className={`flex-1 h-16 gap-3 rounded-xl transition-all duration-300 ${isSelected
                            ? `${channel.color} bg-white ring-2 ring-primary/10 shadow-sm font-bold`
                            : 'border-border hover:border-primary/50'
                            }`}
                          onClick={() => {
                            const newChannels = isSelected
                              ? formData.notificationChannels.filter(c => c !== channel.id)
                              : [...formData.notificationChannels, channel.id];
                            setFormData({ ...formData, notificationChannels: newChannels });
                          }}
                        >
                          <img src={channel.logo} alt={channel.label} className="h-6 w-auto object-contain" />
                          <span className={`font-medium ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {channel.label}
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* AI Agents - Collapsible with original grid layout */}
                <div
                  className="bg-muted/50 rounded-lg p-4 space-y-3 cursor-pointer group"
                  onClick={() => setAgentsExpanded(!agentsExpanded)}
                >
                  <div className="flex items-center justify-between">
                    <h4>{language === 'sw' ? 'Mawakala yako wa AI:' : 'Your AI Agents:'}</h4>
                    <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${agentsExpanded ? 'rotate-180' : ''}`} />
                  </div>

                  {/* Compact grid - always visible */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {agents.map((agent) => (
                      <div key={agent.id} className="flex items-center gap-2 p-2 bg-background rounded border border-border">
                        <AgentAvatar agentId={agent.id} size="sm" status="active" />
                        <div className="min-w-0">
                          <span className="text-xs capitalize font-medium block">{agent.id}</span>
                          {agentsExpanded && (
                            <span className="text-[10px] text-muted-foreground truncate block">
                              {language === 'sw' ? agent.taglineSwahili : agent.tagline}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-4 mt-8 pt-8 border-t border-border">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack} className="flex-1">
                {language === 'sw' ? 'Rudi Nyuma' : 'Back'}
              </Button>
            )}
            <Button
              onClick={handleNext}
              className={`flex-1 gap-2 btn-premium animate-button-glow h-12 text-base rounded-md`}
              disabled={
                (step === 2 && profileSubStep === 1 && (!formData.businessName || !formData.sector)) ||
                (step === 2 && profileSubStep === 2 && (!formData.county || !formData.revenueRange)) ||
                (step === 2 && profileSubStep === 3 && formData.challenges.length === 0) ||
                (step === 3 && (!formData.autonomyEnabled || formData.notificationChannels.length === 0))
              }
            >
              {step === totalSteps
                ? language === 'sw'
                  ? 'Anza Kujitegemea'
                  : 'Start Autonomy'
                : (step === 2 && profileSubStep < 3)
                  ? language === 'sw' ? 'Endelea' : 'Next' // Sub-step next
                  : language === 'sw'
                    ? 'Endelea'
                    : 'Continue'}
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
