import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { AgentAvatar } from '../components/AgentAvatar';
import { FinancialKPIs } from '../components/FinancialKPIs';
import { AGENTS, MOCK_USER } from '../lib/constants';
import { AlertCircle, TrendingUp, CheckCircle, Clock, Wifi, WifiOff, MessageCircle, Smartphone, ArrowRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { BarChart3, ArrowUpRight } from 'lucide-react';

interface HomeProps {
  language: 'en' | 'sw';
  onNavigate: (route: string) => void;
  isOnline: boolean;
}

const sparklineData = [
  { value: 1100000 },
  { value: 1150000 },
  { value: 1120000 },
  { value: 1180000 },
  { value: 1200000 },
  { value: 1240000 }
];

export function Home({ language, onNavigate, isOnline }: HomeProps) {
  const greeting = language === 'sw' ? 'Habari' : 'Hello';
  const title = language === 'sw' ? 'Mwanabiiashara!' : 'Entrepreneur!';
  const dateStr = new Date().toLocaleDateString(language === 'sw' ? 'sw-KE' : 'en-KE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  // Mock M-Pesa connection status - will be replaced with real API call
  const isMpesaConnected = false; // Change to true when user connects

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1>
            {greeting} {MOCK_USER.name.split(' ')[0]}, {title}
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {dateStr}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {!isOnline && (
            <Badge variant="secondary" className="gap-2">
              <WifiOff className="h-3 w-3" />
              {language === 'sw' ? 'Nje ya Mtandao' : 'Offline'}
            </Badge>
          )}
          <div className="flex -space-x-2">
            {AGENTS.slice(0, 4).map((agent) => (
              <div key={agent.id} className="border-2 border-background rounded-full">
                <AgentAvatar agentId={agent.id} size="sm" status="active" />
              </div>
            ))}
            <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
              +2
            </div>
          </div>
        </div>
      </div>

      {/* Hero Metric */}
      <Card className="p-6 kitenge-pattern">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <p className="text-muted-foreground">
              {language === 'sw' ? 'Utabiri wa Fedha' : 'Projected Cash'}
            </p>
            <h1 className="text-success flex items-baseline gap-2">
              KES {(1240000).toLocaleString()}
              <TrendingUp className="h-8 w-8" />
            </h1>
            <p className="text-muted-foreground">
              {language === 'sw' ? 'Siku 21 zijazo' : 'Next 21 Days'}
            </p>
          </div>
          <div className="w-full lg:w-64 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--success))"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="mt-4 text-xs text-muted-foreground flex items-center gap-2">
          <AgentAvatar agentId="cashflow" size="sm" />
          {language === 'sw' ? 'Mtabiri wa Mtiririko wa Fedha' : 'Cash-Flow Forecaster'}
        </div>
      </Card>

      {/* M-Pesa Connection Status */}
      {!isMpesaConnected && (
        <Card className="p-6 border-l-4 border-l-primary bg-primary/10">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-foreground">
                    {language === 'sw' ? 'Unganisha M-Pesa yako' : 'Connect Your M-Pesa'}
                  </h3>
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    {language === 'sw' ? 'Muhimu' : 'Required'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === 'sw'
                    ? 'Unganisha akaunti yako ya M-Pesa ili kufuatilia mtiririko wa fedha kiotomatiki na kupata uwezo wa mkopo'
                    : 'Connect your M-Pesa business account to automatically track cash flow and get loan readiness insights'}
                </p>
                <div className="flex items-center gap-2 text-xs text-primary">
                  <AgentAvatar agentId="financial" size="sm" />
                  {language === 'sw' ? 'Mshauri wa Kifedha' : 'Financial Advisor'}
                </div>
              </div>
            </div>
            <Button
              className="w-full sm:w-auto bg-primary hover:bg-primary/90"
              onClick={() => onNavigate('/connect-mpesa')}
            >
              {language === 'sw' ? 'Unganisha Sasa' : 'Connect Now'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {/* M-Pesa Connected Status */}
      {isMpesaConnected && (
        <Card className="p-4 border-l-4 border-l-green-500 bg-green-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">
                  {language === 'sw' ? 'M-Pesa Imeunganishwa' : 'M-Pesa Connected'}
                </p>
                <p className="text-xs text-green-700">
                  {language === 'sw'
                    ? 'Miamala inasawazishwa kila siku saa 1 asubuhi'
                    : 'Transactions sync daily at 7 AM'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('/money')}
              className="text-green-700 hover:text-green-900 hover:bg-green-100"
            >
              {language === 'sw' ? 'Tazama Miamala' : 'View Transactions'}
            </Button>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Urgent - Compliance */}
        <Card className="p-6 border-l-4 border-l-destructive">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <div className="flex-1 space-y-2">
              <Badge variant="destructive">
                {language === 'sw' ? 'Haraka!' : 'Urgent!'}
              </Badge>
              <h3>
                {language === 'sw' ? 'Leseni Inaisha' : 'License Expiring'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'sw'
                  ? 'Leseni ya biashara ya Kaunti inaisha kwa siku 4'
                  : 'County business license expires in 4 days'}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AgentAvatar agentId="compliance" size="sm" />
                {language === 'sw' ? 'Mfuatiliaji wa Sheria' : 'Compliance Tracker'}
              </div>
            </div>
          </div>
          <Button
            className="w-full mt-4 bg-destructive hover:bg-destructive/90"
            onClick={() => onNavigate('/compliance')}
          >
            {language === 'sw' ? 'Rekebisha Sasa' : 'Fix Now'}
          </Button>
        </Card>

        {/* Good News - Funding */}
        <Card className="p-6 border-l-4 border-l-success">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-success/10 rounded-lg">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <div className="flex-1 space-y-2">
              <Badge className="bg-success text-white">
                {language === 'sw' ? 'Habari Njema!' : 'Good News!'}
              </Badge>
              <h3>
                {language === 'sw' ? 'Ombi Limewasilishwa' : 'Application Submitted'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'sw'
                  ? 'Mfuko wa Wanawake - Ufanani wa 96%'
                  : 'Women Fund - 96% Match'}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AgentAvatar agentId="funding" size="sm" />
                {language === 'sw' ? 'Kiongozi wa Fedha' : 'Funding Navigator'}
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => onNavigate('/money')}
          >
            {language === 'sw' ? 'Angalia Maelezo' : 'View Details'}
          </Button>
        </Card>

        {/* Opportunity */}
        <Card className="p-6 border-l-4 border-l-warning md:col-span-2 lg:col-span-1">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-warning/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-warning" />
            </div>
            <div className="flex-1 space-y-2">
              <Badge className="bg-warning text-black">
                {language === 'sw' ? 'Fursa' : 'Opportunity'}
              </Badge>
              <h3>
                {language === 'sw' ? 'Pengo la Fedha' : 'Cash Gap Ahead'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'sw'
                  ? 'KES 800k pengo Januari → 4 chaguo zilizotambuliwa'
                  : 'KES 800k gap in Jan → 4 options identified'}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AgentAvatar agentId="funding" size="sm" />
                {language === 'sw' ? 'Kiongozi wa Fedha' : 'Funding Navigator'}
              </div>
            </div>
          </div>
          <Button
            className="w-full mt-4 bg-warning hover:bg-warning/90 text-black"
            onClick={() => onNavigate('/money')}
          >
            {language === 'sw' ? 'Angalia Chaguo' : 'View Options'}
          </Button>
        </Card>
      </div>

      {/* Financial Health KPIs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3>
            {language === 'sw' ? 'Afya ya Fedha' : 'Financial Health'}
          </h3>
          <Button variant="ghost" size="sm" onClick={() => onNavigate('/loan-readiness')}>
            {language === 'sw' ? 'Ripoti Kamili' : 'Full Report'}
          </Button>
        </div>
        <FinancialKPIs language={language} onNavigate={onNavigate} />
      </div>

      {/* Credit Score Card */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
        <div className="flex items-center gap-6">
          {/* Mini Circular Gauge */}
          <div className="relative w-24 h-24 shrink-0">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="#8B5CF6"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(82 / 100) * 251.33} 251.33`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">82</span>
              <span className="text-[10px] text-muted-foreground">/100</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-purple-900 dark:text-purple-100">
                {language === 'sw' ? 'Alama ya Mkopo' : 'Credit Score'}
              </h3>
              <Badge className="bg-success text-white">
                {language === 'sw' ? 'Nzuri Sana' : 'Very Good'}
              </Badge>
            </div>
            <p className="text-sm text-purple-700 dark:text-purple-300 mb-3">
              {language === 'sw'
                ? 'Ustahiki wako wa mikopo ni mzuri. Endelea kufanya vizuri!'
                : 'Your creditworthiness is strong. Keep it up!'}
            </p>
            <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400 mb-3">
              <AgentAvatar agentId="credit" size="sm" />
              {language === 'sw' ? 'Mshauri wa Mikopo' : 'Credit Advisor'}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('/credit-score')}
              className="border-purple-300 text-purple-700 hover:bg-purple-100 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/30"
            >
              {language === 'sw' ? 'Angalia Maelezo' : 'View Details'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Today's Agent Actions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3>
            {language === 'sw' ? 'Vitendo vya Leo vya Mawakala' : "Today's Agent Actions"}
          </h3>
          <Button variant="ghost" size="sm" onClick={() => onNavigate('/feed')}>
            {language === 'sw' ? 'Angalia Yote' : 'View All'}
          </Button>
        </div>
        <div className="space-y-4">
          {[
            {
              agent: 'profile',
              time: '09:14 AM',
              action: language === 'sw'
                ? 'Wasifu umesasishwa kupitia M-Pesa'
                : 'Profile updated via M-Pesa',
              icon: CheckCircle,
              color: 'text-success'
            },
            {
              agent: 'compliance',
              time: '02:31 AM',
              action: language === 'sw'
                ? 'KRA TCC imethibitishwa - halali hadi Machi'
                : 'KRA TCC validated - valid until March',
              icon: CheckCircle,
              color: 'text-success'
            },
            {
              agent: 'funding',
              time: 'Yesterday',
              action: language === 'sw'
                ? 'Imewasilisha ombi la Google AfCFTA (94% ufanani)'
                : 'Applied to Google AfCFTA (94% match)',
              icon: Clock,
              color: 'text-muted-foreground'
            }
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
              <AgentAvatar agentId={item.agent} size="sm" status="active" />
              <div className="flex-1 min-w-0">
                <p className="truncate">{item.action}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
              <item.icon className={`h-5 w-5 ${item.color} shrink-0`} />
            </div>
          ))}
        </div>
      </Card>

      {/* WhatsApp CTA */}
      <Card className="p-6 bg-primary text-primary-foreground">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 text-center sm:text-left">
            <h3>{language === 'sw' ? 'Ongea na Inua' : 'Chat with Inua'}</h3>
            <p className="opacity-90">
              {language === 'sw'
                ? 'Pata msaada wa haraka kupitia WhatsApp - 95% ya mwingiliano'
                : 'Get instant help via WhatsApp - 95% of interactions'}
            </p>
          </div>
          <Button
            size="lg"
            variant="secondary"
            className="gap-2 touch-target"
            onClick={() => window.open('https://wa.me/254712345678', '_blank')}
          >
            <MessageCircle className="h-5 w-5" />
            {language === 'sw' ? 'Fungua WhatsApp' : 'Open WhatsApp'}
          </Button>
        </div>
      </Card>

      {/* Analytics Quick Access */}
      <Card
        className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40 transition-all cursor-pointer"
        onClick={() => onNavigate('/analytics')}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-primary">{language === 'sw' ? 'Dashibodi ya Takwimu' : 'Analytics Dashboard'}</h3>
              <p className="text-muted-foreground">
                {language === 'sw'
                  ? 'Angalia uchambuzi kamili wa biashara yako'
                  : 'View comprehensive business analytics'}
              </p>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            {language === 'sw' ? 'Fungua' : 'Open'}
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Offline Sync Indicator */}
      {!isOnline && (
        <Card className="p-4 bg-muted">
          <div className="flex items-center gap-3">
            <WifiOff className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <p>
                {language === 'sw'
                  ? 'Unafanya kazi nje ya mtandao'
                  : 'Working offline'}
              </p>
              <p className="text-xs text-muted-foreground">
                {language === 'sw'
                  ? 'Data itapangwa wakati wa kurudi mtandaoni'
                  : 'Data will sync when back online'}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}