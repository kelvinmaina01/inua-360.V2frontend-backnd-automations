import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Slider } from '../components/ui/slider';
import { Progress } from '../components/ui/progress';
import { AgentAvatar } from '../components/AgentAvatar';
import { InuaLogo } from '../components/InuaLogo';
import { KENYAN_SECTORS, KENYAN_COUNTIES } from '../lib/constants';
import { Globe, Smartphone, ChevronRight, ChevronDown, Camera, CheckCircle, Shield, Lock, Store, Wallet, Phone } from 'lucide-react';

interface OnboardingProps {
  onComplete: (data: any) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
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
    revenue: 50000,
    challenges: [] as string[],
    mpesaConnected: false,
    mpesaAccountType: null as 'till' | 'paybill' | 'pochi' | null,
    mpesaDetails: {} as Record<string, string>,
    whatsappConnected: false,
    autonomyEnabled: false
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete({ ...formData, language });
    }
  };

  const handleBack = () => {
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
            <InuaLogo size="md" showPulse />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Inua 360</h1>
              <p className="text-sm text-muted-foreground">
                {language === 'sw' ? 'Mshirika wako wa Biashara' : 'Your Business Co-Pilot'}
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
      <div className="px-4 sm:px-6 py-4 border-b border-border bg-muted/30">
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
              {/* Welcome Header with Logo */}
              <div className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-orange-500/10 to-amber-500/10">
                  <InuaLogo size="xl" showPulse />
                </div>
                <h2 className="text-2xl font-bold">
                  {language === 'sw' ? 'Karibu Inua 360!' : 'Welcome to Inua 360!'}
                </h2>
                <p className="text-muted-foreground">
                  {language === 'sw'
                    ? 'Mshirika wako wa biashara kwa ajili ya ukuaji wa SME'
                    : 'Your Business Co-Pilot for SME Growth'}
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
                      <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
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
                      <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
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
                      <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
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
                      <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
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
                    <div className="flex-shrink-0 p-3 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                      <Smartphone className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">
                          {language === 'sw' ? 'Ungana na M-Pesa ya Biashara' : 'Connect Business M-Pesa'}
                        </h4>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
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
                        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                          <Lock className="h-3.5 w-3.5" />
                          <span>{language === 'sw' ? 'Imefungwa' : 'Encrypted'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
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
                    <div className="border-t border-emerald-500/10 pt-4">
                      <Label className="text-sm font-medium mb-3 block">
                        {language === 'sw' ? 'Chagua aina ya akaunti:' : 'Select account type:'}
                      </Label>

                      {/* Account Type Cards */}
                      <div className="grid gap-3">
                        {/* Till Number */}
                        <div
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${mpesaAccountType === 'till'
                              ? 'border-emerald-500 bg-emerald-500/5'
                              : 'border-border hover:border-emerald-500/50'
                            }`}
                          onClick={() => setMpesaAccountType('till')}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-orange-500/10">
                              <Store className="h-5 w-5 text-orange-500" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Till Number</p>
                              <p className="text-xs text-muted-foreground">Buy Goods & Services</p>
                            </div>
                            {mpesaAccountType === 'till' && (
                              <CheckCircle className="h-5 w-5 text-emerald-500" />
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
                              ? 'border-emerald-500 bg-emerald-500/5'
                              : 'border-border hover:border-emerald-500/50'
                            }`}
                          onClick={() => setMpesaAccountType('paybill')}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-500/10">
                              <Wallet className="h-5 w-5 text-blue-500" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Paybill</p>
                              <p className="text-xs text-muted-foreground">Business Paybill Number</p>
                            </div>
                            {mpesaAccountType === 'paybill' && (
                              <CheckCircle className="h-5 w-5 text-emerald-500" />
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
                              ? 'border-emerald-500 bg-emerald-500/5'
                              : 'border-border hover:border-emerald-500/50'
                            }`}
                          onClick={() => setMpesaAccountType('pochi')}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-emerald-500/10">
                              <Phone className="h-5 w-5 text-emerald-500" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Pochi la Biashara</p>
                              <p className="text-xs text-muted-foreground">Safaricom Business Wallet</p>
                            </div>
                            {mpesaAccountType === 'pochi' && (
                              <CheckCircle className="h-5 w-5 text-emerald-500" />
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

          {/* Step 2: Profile Builder */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center space-y-2">
                <AgentAvatar agentId="profile" size="lg" status="active" showPulse />
                <h2>{language === 'sw' ? 'Wasifu wa Biashara' : 'Business Profile'}</h2>
                <p className="text-muted-foreground">
                  {language === 'sw'
                    ? 'Tuambie kuhusu biashara yako'
                    : 'Tell us about your business'}
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">
                    {language === 'sw' ? 'Jina la Biashara' : 'Business Name'}
                  </Label>
                  <Input
                    id="businessName"
                    placeholder={language === 'sw' ? 'Jina la biashara yako' : 'Your business name'}
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sector">{language === 'sw' ? 'Sekta' : 'Sector'}</Label>
                  <Select value={formData.sector} onValueChange={(value) => setFormData({ ...formData, sector: value })}>
                    <SelectTrigger id="sector">
                      <SelectValue placeholder={language === 'sw' ? 'Chagua sekta' : 'Select sector'} />
                    </SelectTrigger>
                    <SelectContent>
                      {KENYAN_SECTORS.map((sector) => (
                        <SelectItem key={sector.value} value={sector.value}>
                          {sector.icon} {language === 'sw' ? sector.labelSwahili : sector.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="county">{language === 'sw' ? 'Kaunti' : 'County'}</Label>
                  <Select value={formData.county} onValueChange={(value) => setFormData({ ...formData, county: value })}>
                    <SelectTrigger id="county">
                      <SelectValue placeholder={language === 'sw' ? 'Chagua kaunti' : 'Select county'} />
                    </SelectTrigger>
                    <SelectContent>
                      {KENYAN_COUNTIES.map((county) => (
                        <SelectItem key={county.value} value={county.value}>
                          {county.flag} {county.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>
                    {language === 'sw' ? 'Mapato ya Mwezi' : 'Monthly Revenue'} (KES)
                  </Label>
                  <div className="space-y-4">
                    <Slider
                      value={[formData.revenue]}
                      onValueChange={([value]) => setFormData({ ...formData, revenue: value })}
                      min={10000}
                      max={5000000}
                      step={10000}
                      className="py-4"
                    />
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <p className="text-primary">KES {formData.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>{language === 'sw' ? 'Changamoto Kuu' : 'Main Challenges'}</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {challenges.map((challenge) => (
                      <div key={challenge.id} className="flex items-center gap-2">
                        <Checkbox
                          id={challenge.id}
                          checked={formData.challenges.includes(challenge.id)}
                          onCheckedChange={() => toggleChallenge(challenge.id)}
                        />
                        <Label htmlFor={challenge.id} className="cursor-pointer">
                          {language === 'sw' ? challenge.labelSw : challenge.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full gap-2">
                  <Camera className="h-4 w-4" />
                  {language === 'sw' ? 'Piga Picha ya Risiti (AI Auto-Fill)' : 'Scan Receipt (AI Auto-Fill)'}
                </Button>
              </div>
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
                <div className="border border-border rounded-lg p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="autonomy"
                      checked={formData.autonomyEnabled}
                      onCheckedChange={(checked) => setFormData({ ...formData, autonomyEnabled: checked as boolean })}
                    />
                    <div className="flex-1">
                      <Label htmlFor="autonomy" className="cursor-pointer">
                        {language === 'sw' ? 'Wezesha Hali ya Kujitegemea' : 'Enable Autonomy Mode'}
                      </Label>
                      <p className="text-muted-foreground mt-1">
                        {language === 'sw'
                          ? 'Mawakala watafanya kazi chinichini wakikagua ufuatiliaji, wasilishe maombi, na watakie fursa'
                          : 'Agents will work in the background scanning compliance, submitting applications, and finding opportunities'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="whatsapp"
                      checked={formData.whatsappConnected}
                      onCheckedChange={(checked) => setFormData({ ...formData, whatsappConnected: checked as boolean })}
                    />
                    <div className="flex-1">
                      <Label htmlFor="whatsapp" className="cursor-pointer">
                        {language === 'sw' ? 'Ungana na WhatsApp' : 'Connect WhatsApp'}
                      </Label>
                      <p className="text-muted-foreground mt-1">
                        {language === 'sw'
                          ? 'Pata arifa na uidhinishe vitendo kupitia WhatsApp (95% ya mwingiliano)'
                          : 'Receive alerts and approve actions via WhatsApp (95% of interactions)'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <h4>{language === 'sw' ? 'Mawakala yako wa AI:' : 'Your AI Agents:'}</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {['profile', 'compliance', 'funding', 'cashflow', 'application', 'supervisor'].map((agentId) => (
                      <div key={agentId} className="flex items-center gap-2 p-2 bg-background rounded border border-border">
                        <AgentAvatar agentId={agentId} size="sm" status="active" />
                        <span className="text-xs capitalize">{agentId}</span>
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
              className={`flex-1 gap-2 btn-premium animate-button-glow h-12 text-base rounded-xl ${step === 1 ? '' : ''
                }`}
              disabled={
                (step === 2 && (!formData.businessName || !formData.sector || !formData.county)) ||
                (step === 3 && !formData.autonomyEnabled && !formData.whatsappConnected)
              }
            >
              {step === totalSteps
                ? language === 'sw'
                  ? 'Anza Kujitegemea'
                  : 'Start Autonomy'
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
