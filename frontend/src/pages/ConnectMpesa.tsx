import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import {
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  Building2,
  ArrowRight,
  Shield,
  Zap,
  TrendingUp
} from 'lucide-react';

interface ConnectMpesaProps {
  language: 'en' | 'sw';
  onNavigate: (path: string) => void;
}

type AccountType = 'till' | 'paybill' | 'pochi' | null;

const translations = {
  en: {
    title: 'Connect M-Pesa Account',
    subtitle: 'Connect your business M-Pesa account to automatically track your cash flow',
    accountType: 'Select Account Type',
    tillNumber: 'Till Number (Buy Goods)',
    paybillNumber: 'Paybill Number',
    pochiNumber: 'Pochi La Biashara',
    businessName: 'Business Name',
    phoneNumber: 'M-Pesa Phone Number',
    storeNumber: 'Store Number',
    businessNamePlaceholder: 'Enter your registered business name',
    phoneNumberPlaceholder: '254712345678',
    tillNumberPlaceholder: 'Enter your Till Number',
    paybillNumberPlaceholder: 'Enter your Paybill Number',
    pochiNumberPlaceholder: 'Enter your phone number',
    storeNumberPlaceholder: 'Enter store number (for Paybill)',
    connect: 'Connect M-Pesa',
    connecting: 'Connecting...',
    businessAccountWarning: 'Business Account Only',
    warningMessage: 'This M-Pesa account must be exclusively for your business. Personal transactions will affect your financial analysis accuracy.',
    benefits: 'Benefits of Connecting',
    benefit1: 'Automatic cash flow tracking',
    benefit2: 'Real-time financial insights',
    benefit3: 'Accurate loan readiness scoring',
    benefit4: 'No manual receipt entry needed',
    howItWorks: 'How It Works',
    step1Title: 'Secure Connection',
    step1Desc: 'We connect to Safaricom Daraja API using OAuth 2.0',
    step2Title: 'Daily Sync',
    step2Desc: 'Your transactions sync automatically every day at 7 AM',
    step3Title: 'AI Analysis',
    step3Desc: 'Our Financial Agent analyzes your cash flow and provides insights',
    bankComingSoon: 'Bank Integration',
    bankMessage: 'Bank account connection coming soon! For now, M-Pesa is the primary way to track your business finances.',
    privacyNote: 'Privacy & Security',
    privacyMessage: 'Your M-Pesa data is encrypted and stored securely. We only access transaction data, never your PIN or password.',
    requiredField: 'This field is required',
    invalidPhone: 'Phone number must start with 254',
    success: 'M-Pesa Connected Successfully!',
    successMessage: 'Your account is now connected. We\'ll sync your transactions starting tomorrow at 7 AM.',
    viewDashboard: 'View Dashboard'
  },
  sw: {
    title: 'Unganisha Akaunti ya M-Pesa',
    subtitle: 'Unganisha akaunti yako ya biashara ya M-Pesa ili kufuatilia mtiririko wa fedha kiotomatiki',
    accountType: 'Chagua Aina ya Akaunti',
    tillNumber: 'Namba ya Till (Nunua Bidhaa)',
    paybillNumber: 'Namba ya Paybill',
    pochiNumber: 'Pochi La Biashara',
    businessName: 'Jina la Biashara',
    phoneNumber: 'Namba ya Simu ya M-Pesa',
    storeNumber: 'Namba ya Duka',
    businessNamePlaceholder: 'Weka jina la biashara lililosajiliwa',
    phoneNumberPlaceholder: '254712345678',
    tillNumberPlaceholder: 'Weka Namba ya Till',
    paybillNumberPlaceholder: 'Weka Namba ya Paybill',
    pochiNumberPlaceholder: 'Weka namba ya simu',
    storeNumberPlaceholder: 'Weka namba ya duka (kwa Paybill)',
    connect: 'Unganisha M-Pesa',
    connecting: 'Inaunganisha...',
    businessAccountWarning: 'Akaunti ya Biashara Tu',
    warningMessage: 'Akaunti hii ya M-Pesa lazima iwe ya biashara yako pekee. Miamala ya kibinafsi itaathiri usahihi wa uchambuzi wako wa kifedha.',
    benefits: 'Faida za Kuunganisha',
    benefit1: 'Ufuatiliaji wa mtiririko wa fedha kiotomatiki',
    benefit2: 'Maarifa ya kifedha ya wakati halisi',
    benefit3: 'Alama sahihi ya uwezo wa mkopo',
    benefit4: 'Hakuna haja ya kuingiza risiti kwa mkono',
    howItWorks: 'Jinsi Inavyofanya Kazi',
    step1Title: 'Muunganisho Salama',
    step1Desc: 'Tunaunganisha na Safaricom Daraja API kwa kutumia OAuth 2.0',
    step2Title: 'Usawazishaji wa Kila Siku',
    step2Desc: 'Miamala yako inasawazishwa kiotomatiki kila siku saa 1 asubuhi',
    step3Title: 'Uchambuzi wa AI',
    step3Desc: 'Wakala wetu wa Kifedha anachambua mtiririko wako wa fedha na kutoa maarifa',
    bankComingSoon: 'Uunganishaji wa Benki',
    bankMessage: 'Muunganisho wa akaunti ya benki unakuja hivi karibuni! Kwa sasa, M-Pesa ndiyo njia kuu ya kufuatilia fedha za biashara yako.',
    privacyNote: 'Faragha na Usalama',
    privacyMessage: 'Data yako ya M-Pesa imefungwa na kuhifadhiwa salama. Tunapata tu data ya miamala, kamwe si PIN au nenosiri lako.',
    requiredField: 'Sehemu hii inahitajika',
    invalidPhone: 'Namba ya simu lazima ianze na 254',
    success: 'M-Pesa Imeunganishwa!',
    successMessage: 'Akaunti yako sasa imeunganishwa. Tutasawazisha miamala yako kuanzia kesho saa 1 asubuhi.',
    viewDashboard: 'Tazama Dashibodi'
  }
};

export function ConnectMpesa({ language, onNavigate }: ConnectMpesaProps) {
  const t = translations[language];
  const [accountType, setAccountType] = useState<AccountType>(null);
  const [formData, setFormData] = useState({
    businessName: '',
    phoneNumber: '',
    tillNumber: '',
    paybillNumber: '',
    storeNumber: '',
    pochiNumber: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = t.requiredField;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = t.requiredField;
    } else if (!formData.phoneNumber.startsWith('254')) {
      newErrors.phoneNumber = t.invalidPhone;
    }

    if (accountType === 'till' && !formData.tillNumber.trim()) {
      newErrors.tillNumber = t.requiredField;
    }

    if (accountType === 'paybill' && !formData.paybillNumber.trim()) {
      newErrors.paybillNumber = t.requiredField;
    }

    if (accountType === 'pochi' && !formData.pochiNumber.trim()) {
      newErrors.pochiNumber = t.requiredField;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConnect = async () => {
    if (!validateForm()) return;

    setIsConnecting(true);

    // Simulate API call - will be replaced with real endpoint
    // POST /api/v1/mpesa/connect
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsConnecting(false);
    setIsConnected(true);
  };

  if (isConnected) {
    return (
      <div className="container max-w-2xl mx-auto p-4 space-y-6">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-900 mb-2">{t.success}</h3>
                <p className="text-green-700">{t.successMessage}</p>
              </div>
              <div className="bg-white rounded-lg p-4 w-full text-left space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t.accountType}:</span>
                  <span className="font-medium capitalize">{accountType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t.businessName}:</span>
                  <span className="font-medium">{formData.businessName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t.phoneNumber}:</span>
                  <span className="font-medium">{formData.phoneNumber}</span>
                </div>
              </div>
              <Button
                onClick={() => onNavigate('/')}
                className="w-full"
              >
                {t.viewDashboard}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Warning Alert */}
      <Alert className="border-warning/20 bg-warning/10">
        <AlertTriangle className="h-4 w-4 text-warning" />
        <AlertDescription className="text-foreground">
          <strong>{t.businessAccountWarning}:</strong> {t.warningMessage}
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>{t.accountType}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  variant={accountType === 'till' ? 'default' : 'outline'}
                  className="h-auto py-4 flex flex-col items-center gap-2"
                  onClick={() => setAccountType('till')}
                >
                  <Smartphone className="w-6 h-6" />
                  <span className="text-sm">{t.tillNumber}</span>
                </Button>
                <Button
                  variant={accountType === 'paybill' ? 'default' : 'outline'}
                  className="h-auto py-4 flex flex-col items-center gap-2"
                  onClick={() => setAccountType('paybill')}
                >
                  <Building2 className="w-6 h-6" />
                  <span className="text-sm">{t.paybillNumber}</span>
                </Button>
                <Button
                  variant={accountType === 'pochi' ? 'default' : 'outline'}
                  className="h-auto py-4 flex flex-col items-center gap-2"
                  onClick={() => setAccountType('pochi')}
                >
                  <Smartphone className="w-6 h-6" />
                  <span className="text-sm">{t.pochiNumber}</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Details Form */}
          {accountType && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {accountType === 'till' && t.tillNumber}
                  {accountType === 'paybill' && t.paybillNumber}
                  {accountType === 'pochi' && t.pochiNumber}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Business Name */}
                <div className="space-y-2">
                  <Label htmlFor="businessName">{t.businessName}</Label>
                  <Input
                    id="businessName"
                    placeholder={t.businessNamePlaceholder}
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className={errors.businessName ? 'border-red-500' : ''}
                  />
                  {errors.businessName && (
                    <p className="text-sm text-red-500">{errors.businessName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">{t.phoneNumber}</Label>
                  <Input
                    id="phoneNumber"
                    placeholder={t.phoneNumberPlaceholder}
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className={errors.phoneNumber ? 'border-red-500' : ''}
                  />
                  {errors.phoneNumber && (
                    <p className="text-sm text-red-500">{errors.phoneNumber}</p>
                  )}
                </div>

                {/* Till Number */}
                {accountType === 'till' && (
                  <div className="space-y-2">
                    <Label htmlFor="tillNumber">{t.tillNumber}</Label>
                    <Input
                      id="tillNumber"
                      placeholder={t.tillNumberPlaceholder}
                      value={formData.tillNumber}
                      onChange={(e) => setFormData({ ...formData, tillNumber: e.target.value })}
                      className={errors.tillNumber ? 'border-red-500' : ''}
                    />
                    {errors.tillNumber && (
                      <p className="text-sm text-red-500">{errors.tillNumber}</p>
                    )}
                  </div>
                )}

                {/* Paybill Number + Store Number */}
                {accountType === 'paybill' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="paybillNumber">{t.paybillNumber}</Label>
                      <Input
                        id="paybillNumber"
                        placeholder={t.paybillNumberPlaceholder}
                        value={formData.paybillNumber}
                        onChange={(e) => setFormData({ ...formData, paybillNumber: e.target.value })}
                        className={errors.paybillNumber ? 'border-red-500' : ''}
                      />
                      {errors.paybillNumber && (
                        <p className="text-sm text-red-500">{errors.paybillNumber}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storeNumber">{t.storeNumber}</Label>
                      <Input
                        id="storeNumber"
                        placeholder={t.storeNumberPlaceholder}
                        value={formData.storeNumber}
                        onChange={(e) => setFormData({ ...formData, storeNumber: e.target.value })}
                      />
                    </div>
                  </>
                )}

                {/* Pochi Number */}
                {accountType === 'pochi' && (
                  <div className="space-y-2">
                    <Label htmlFor="pochiNumber">{t.pochiNumber}</Label>
                    <Input
                      id="pochiNumber"
                      placeholder={t.pochiNumberPlaceholder}
                      value={formData.pochiNumber}
                      onChange={(e) => setFormData({ ...formData, pochiNumber: e.target.value })}
                      className={errors.pochiNumber ? 'border-red-500' : ''}
                    />
                    {errors.pochiNumber && (
                      <p className="text-sm text-red-500">{errors.pochiNumber}</p>
                    )}
                  </div>
                )}

                <Button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="w-full"
                >
                  {isConnecting ? t.connecting : t.connect}
                  {!isConnecting && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Bank Coming Soon */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold text-primary mb-1">{t.bankComingSoon}</h4>
                  <p className="text-sm text-muted-foreground">{t.bankMessage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t.benefits}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{t.benefit1}</p>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{t.benefit2}</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{t.benefit3}</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{t.benefit4}</p>
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t.howItWorks}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-xs font-semibold text-green-700">
                    1
                  </div>
                  <h5 className="font-semibold text-sm">{t.step1Title}</h5>
                </div>
                <p className="text-xs text-gray-600 ml-8">{t.step1Desc}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-xs font-semibold text-green-700">
                    2
                  </div>
                  <h5 className="font-semibold text-sm">{t.step2Title}</h5>
                </div>
                <p className="text-xs text-gray-600 ml-8">{t.step2Desc}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-xs font-semibold text-green-700">
                    3
                  </div>
                  <h5 className="font-semibold text-sm">{t.step3Title}</h5>
                </div>
                <p className="text-xs text-gray-600 ml-8">{t.step3Desc}</p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card className="border-gray-200 bg-gray-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-sm text-gray-900 mb-1">{t.privacyNote}</h5>
                  <p className="text-xs text-gray-600">{t.privacyMessage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
