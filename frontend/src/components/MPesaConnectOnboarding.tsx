import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Smartphone, Shield, Check, Sparkles } from 'lucide-react';
import { AgentAvatar } from './AgentAvatar';

interface MPesaConnectOnboardingProps {
  language: 'en' | 'sw';
  onComplete: () => void;
}

export function MPesaConnectOnboarding({ language, onComplete }: MPesaConnectOnboardingProps) {
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<'till' | 'personal' | 'both'>('both');
  const [phoneNumber, setPhoneNumber] = useState('0712345678');
  const [connecting, setConnecting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConnect = async () => {
    setConnecting(true);
    // Simulate OAuth flow
    setTimeout(() => {
      setConnecting(false);
      setShowSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 3000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-6 sm:p-8 space-y-6">
        {/* Progress Indicator */}
        <div className="flex items-center gap-2 justify-center">
          <div className={`h-2 w-12 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
          <div className={`h-2 w-12 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
          <div className={`h-2 w-12 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
        </div>

        {/* Step 1: Introduction */}
        {step === 1 && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="relative">
                <AgentAvatar agentId="financials" size="lg" />
                <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                  <Smartphone className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h2>
                {language === 'sw' 
                  ? 'Unganisha M-Pesa' 
                  : 'Connect M-Pesa'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'sw'
                  ? 'Ruhusu Inua360 kusoma miamala yako ya M-Pesa (jumla na makundi tu, imefungwa kabisa)'
                  : 'Let Inua360 read your M-Pesa transactions (only totals & categories, fully encrypted)'}
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-left text-sm">
                  <p className="font-medium">
                    {language === 'sw' ? 'Salama 100%' : '100% Secure'}
                  </p>
                  <p className="text-muted-foreground">
                    {language === 'sw'
                      ? 'Hakuna majina au mawasiliano yanayohifadhiwa. Ni jumla za fedha tu.'
                      : 'No names or contacts are stored. Only financial totals.'}
                  </p>
                </div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full"
              onClick={() => setStep(2)}
            >
              <Smartphone className="h-5 w-5 mr-2" />
              {language === 'sw' ? 'Unganisha M-Pesa' : 'Connect M-Pesa'}
            </Button>

            <Button 
              variant="ghost" 
              size="sm"
              onClick={onComplete}
              className="w-full"
            >
              {language === 'sw' ? 'Baadaye' : 'Maybe Later'}
            </Button>
          </div>
        )}

        {/* Step 2: Phone Number & Account Type */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2>
                {language === 'sw' 
                  ? 'Aina ya Akaunti' 
                  : 'Account Type'}
              </h2>
              <p className="text-muted-foreground text-sm">
                {language === 'sw'
                  ? 'Unatumia nambari gani za M-Pesa kwa biashara?'
                  : 'Which M-Pesa numbers do you use for business?'}
              </p>
            </div>

            <div className="space-y-3">
              <Label>
                {language === 'sw' ? 'Nambari ya Simu' : 'Phone Number'}
              </Label>
              <Input 
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="07XXXXXXXX"
                className="text-lg"
              />
            </div>

            <div className="space-y-3">
              <Label>
                {language === 'sw' ? 'Chagua Aina' : 'Select Type'}
              </Label>
              <div className="grid gap-3">
                <Card 
                  className={`p-4 cursor-pointer transition-all ${
                    accountType === 'till' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setAccountType('till')}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {language === 'sw' ? 'Nambari ya Till' : 'Till Number'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {language === 'sw' ? 'Kwa biashara' : 'For business'}
                      </p>
                    </div>
                    {accountType === 'till' && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </Card>

                <Card 
                  className={`p-4 cursor-pointer transition-all ${
                    accountType === 'personal' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setAccountType('personal')}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {language === 'sw' ? 'Binafsi' : 'Personal'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {language === 'sw' ? 'Akaunti yangu' : 'My account'}
                      </p>
                    </div>
                    {accountType === 'personal' && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </Card>

                <Card 
                  className={`p-4 cursor-pointer transition-all ${
                    accountType === 'both' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setAccountType('both')}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {language === 'sw' ? 'Zote' : 'Both'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {language === 'sw' ? 'Till na Binafsi' : 'Till & Personal'}
                      </p>
                    </div>
                    {accountType === 'both' && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </Card>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground text-center">
                {language === 'sw'
                  ? 'Hakuna majina au mawasiliano yanayohifadhiwa kamwe'
                  : 'No names or contacts are ever stored'}
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
                className="flex-1"
              >
                {language === 'sw' ? 'Rudi' : 'Back'}
              </Button>
              <Button 
                onClick={() => setStep(3)}
                className="flex-1"
              >
                {language === 'sw' ? 'Endelea' : 'Continue'}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: OAuth Consent & Success */}
        {step === 3 && (
          <div className="space-y-6">
            {!showSuccess ? (
              <>
                {connecting ? (
                  <div className="text-center space-y-4 py-8">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
                    </div>
                    <p className="text-muted-foreground">
                      {language === 'sw' 
                        ? 'Inaunganisha na Safaricom...' 
                        : 'Connecting to Safaricom...'}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="text-center space-y-2">
                      <div className="flex justify-center mb-4">
                        <div className="bg-success/10 rounded-full p-4">
                          <Smartphone className="h-8 w-8 text-success" />
                        </div>
                      </div>
                      <h2>
                        {language === 'sw' 
                          ? 'Idhini ya Safaricom' 
                          : 'Safaricom Consent'}
                      </h2>
                      <p className="text-muted-foreground">
                        {language === 'sw'
                          ? 'Inua360 inahitaji idhini yako kufikia takwimu za M-Pesa'
                          : 'Inua360 needs your permission to access M-Pesa statistics'}
                      </p>
                    </div>

                    {/* Mock OAuth Screen */}
                    <Card className="border-2 border-success/20 bg-success/5 p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4>M-Pesa by Safaricom</h4>
                        <Badge className="bg-success text-white">
                          {language === 'sw' ? 'Salama' : 'Secure'}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <p className="font-medium">
                          {language === 'sw' 
                            ? 'Inua360 itapata ufikiaji wa:' 
                            : 'Inua360 will get access to:'}
                        </p>
                        <ul className="space-y-1 text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                            {language === 'sw' 
                              ? 'Jumla za miamala (sio maelezo)' 
                              : 'Transaction totals (not details)'}
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                            {language === 'sw' 
                              ? 'Makundi ya gharama (chakula, stoki, n.k.)' 
                              : 'Expense categories (food, stock, etc.)'}
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                            {language === 'sw' 
                              ? 'Historia ya siku 90 zilizopita' 
                              : 'Last 90 days history'}
                          </li>
                        </ul>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        {language === 'sw'
                          ? '🔒 Imefungwa kwa njia ya mwisho. Unaweza kuondoa ufikiaji wakati wowote.'
                          : '🔒 End-to-end encrypted. You can revoke access anytime.'}
                      </p>
                    </Card>

                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => setStep(2)}
                        className="flex-1"
                      >
                        {language === 'sw' ? 'Ghairi' : 'Cancel'}
                      </Button>
                      <Button 
                        onClick={handleConnect}
                        className="flex-1 bg-success hover:bg-success/90"
                      >
                        {language === 'sw' ? 'Ruhusu' : 'Allow'}
                      </Button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="text-center space-y-6 py-8">
                <div className="relative flex justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="h-16 w-16 text-primary animate-pulse" />
                  </div>
                  <div className="bg-success/10 rounded-full p-6">
                    <Check className="h-12 w-12 text-success" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-success">
                    {language === 'sw' ? 'Imeunganishwa!' : 'Connected!'}
                  </h2>
                  <p className="text-muted-foreground">
                    {language === 'sw'
                      ? 'Nimevuta miamala ya siku 90 zilizopita.'
                      : 'I just pulled your last 90 days.'}
                  </p>
                </div>

                <Badge className="bg-primary text-primary-foreground">
                  {language === 'sw' 
                    ? 'Inasakinisha data...' 
                    : 'Syncing data...'}
                </Badge>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
