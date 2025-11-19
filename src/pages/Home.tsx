import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { AgentAvatar } from '../components/AgentAvatar';
import { AGENTS, MOCK_USER } from '../lib/constants';
import { AlertCircle, TrendingUp, CheckCircle, Clock, Wifi, WifiOff, MessageCircle } from 'lucide-react';
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