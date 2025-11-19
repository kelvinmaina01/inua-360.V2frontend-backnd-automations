import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Slider } from '../components/ui/slider';
import { Progress } from '../components/ui/progress';
import { AgentAvatar } from '../components/AgentAvatar';
import { KENYAN_SECTORS, KENYAN_COUNTIES } from '../lib/constants';
import { Globe, Smartphone, ChevronRight, Camera, CheckCircle } from 'lucide-react';

interface OnboardingProps {
  onComplete: (data: any) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState<'en' | 'sw'>('en');
  const [formData, setFormData] = useState({
    businessName: '',
    sector: '',
    county: '',
    revenue: 50000,
    challenges: [] as string[],
    mpesaConnected: false,
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
            <AgentAvatar agentId="supervisor" size="md" status="active" showPulse />
            <div>
              <h1 className="text-primary">Inua 360</h1>
              <p className="text-muted-foreground">
                {language === 'sw' ? 'Kiongozi wako wa AI' : 'Your AI Co-Pilot'}
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
              <div className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-full bg-primary/10">
                  <AgentAvatar agentId="supervisor" size="lg" status="active" showPulse />
                </div>
                <h2>{language === 'sw' ? 'Karibu Inua 360!' : 'Welcome to Inua 360!'}</h2>
                <p className="text-muted-foreground">
                  {language === 'sw'
                    ? 'Kiongozi wako cha AI kwa ajili ya ukuaji wa biashara'
                    : 'Your AI Co-Pilot for SME Growth'}
                </p>
              </div>

              <div className="space-y-6 kitenge-pattern p-6 rounded-lg border border-border">
                <h3>{language === 'sw' ? 'Tutafanya nini pamoja:' : "What we'll do together:"}</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <p>
                        {language === 'sw'
                          ? 'Jenga wasifu wa biashara yako wa 360°'
                          : 'Build your 360° business profile'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <p>
                        {language === 'sw'
                          ? 'Tafuta fedha zinazofaa biashara yako'
                          : 'Find funding opportunities that match your business'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <p>
                        {language === 'sw'
                          ? 'Fuatilia sheria na leseni kiotomatiki'
                          : 'Track compliance and licenses automatically'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <p>
                        {language === 'sw'
                          ? 'Tabiri mtiririko wa fedha na ongeza faida'
                          : 'Forecast cash flow and grow profits'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Smartphone className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-secondary">
                      {language === 'sw' ? 'Ungana na M-Pesa?' : 'Connect M-Pesa?'}
                    </h4>
                    <p className="text-muted-foreground">
                      {language === 'sw'
                        ? 'Jaza taarifa za biashara kiotomatiki kutoka kwa miamala yako'
                        : 'Auto-fill business info from your transactions'}
                    </p>
                  </div>
                </div>
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
              className="flex-1 gap-2"
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
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
