import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { AgentAvatar } from '../components/AgentAvatar';
import {
  TrendingUp,
  Users,
  Target,
  Award,
  Clock,
  Download,
  ChevronRight,
  ShoppingBag,
  AlertCircle
} from 'lucide-react';

interface BusinessReportProps {
  language: 'en' | 'sw';
  onNavigate: (route: string) => void;
}

export function BusinessReport({ language, onNavigate }: BusinessReportProps) {
  const reportDate = '18 Nov 2025';
  const lastSyncMinutes = 2;

  const recommendations = [
    {
      id: 1,
      icon: ShoppingBag,
      title: language === 'sw' ? 'Gharama za stoki zimepanda 28%' : 'Stock expenses up 28%',
      description: language === 'sw'
        ? 'Je, nitafute wauzaji wa bei nafuu?'
        : 'Shall I look for cheaper suppliers?',
      action: language === 'sw' ? 'Angalia Chaguo' : 'View Options',
      color: 'warning'
    },
    {
      id: 2,
      icon: AlertCircle,
      title: language === 'sw' ? 'Pengo la KES 1.2M katika siku 18' : 'KES 1.2M gap in 18 days',
      description: language === 'sw'
        ? 'Nimegundua chaguo 3 za ufadhili'
        : 'I found 3 funding options',
      action: language === 'sw' ? 'Angalia Fedha' : 'View Funding',
      color: 'primary'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1>{language === 'sw' ? 'Ripoti ya Biashara Yako' : 'Your Business Report'}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Clock className="h-4 w-4" />
            {language === 'sw'
              ? `Ilisasishwa ${reportDate} kutoka M-Pesa`
              : `Updated ${reportDate} from M-Pesa`}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">
              {language === 'sw' ? 'Pakua PDF' : 'Download PDF'}
            </span>
          </Button>
        </div>
      </div>

      {/* Sync Status */}
      <Card className="p-4 bg-secondary/5 border-secondary/20">
        <div className="flex items-center gap-3">
          <AgentAvatar agentId="financials" size="sm" status="active" />
          <div className="flex-1">
            <p className="text-sm">
              {language === 'sw'
                ? `Ilisasishwa dakika ${lastSyncMinutes} zilizopita kutoka kwa data ya M-Pesa`
                : `Last synced ${lastSyncMinutes} minutes ago from M-Pesa data`}
            </p>
          </div>
          <Badge className="bg-secondary text-secondary-foreground">
            {language === 'sw' ? 'Hai' : 'Live'}
          </Badge>
        </div>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Annual Revenue */}
        <Card className="p-6 border-l-4 border-l-primary">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <Badge className="bg-success/10 text-success border-success/20">
                {language === 'sw' ? 'Kiotomatiki' : 'Auto'}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {language === 'sw' ? 'Mapato ya Kila Mwaka' : 'Annual Revenue'}
              </p>
              <h2 className="text-primary">KES 21.4M</h2>
              <p className="text-xs text-muted-foreground">
                {language === 'sw' ? 'Imekokotolewa kutoka M-Pesa' : 'Auto-calculated'}
              </p>
            </div>
          </div>
        </Card>

        {/* Employees */}
        <Card className="p-6 border-l-4 border-l-secondary">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <Badge className="bg-success/10 text-success border-success/20">
                {language === 'sw' ? 'Kiotomatiki' : 'Auto'}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {language === 'sw' ? 'Wafanyikazi' : 'Employees'}
              </p>
              <h2 className="text-secondary">12</h2>
              <p className="text-xs text-muted-foreground">
                {language === 'sw' ? 'Kutoka waliopewalipi wa kawaida' : 'Detected from regular payees'}
              </p>
            </div>
          </div>
        </Card>

        {/* Growth Rate */}
        <Card className="p-6 border-l-4 border-l-success">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="p-2 bg-success/10 rounded-lg">
                <Target className="h-6 w-6 text-success" />
              </div>
              <Badge className="bg-success/10 text-success border-success/20">
                +34%
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {language === 'sw' ? 'Kiwango cha Ukuaji' : 'Growth Rate'}
              </p>
              <h2 className="text-success">+34% YoY</h2>
              <p className="text-xs text-muted-foreground">
                {language === 'sw' ? 'Kutoka kuingia' : 'From inflows'}
              </p>
            </div>
          </div>
        </Card>

        {/* Financial Health */}
        <Card className="p-6 border-l-4 border-l-primary">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <Badge className="bg-primary text-primary-foreground">
                A
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {language === 'sw' ? 'Afya ya Fedha' : 'Financial Health'}
              </p>
              <h2 className="text-primary">92/100</h2>
              <p className="text-xs text-muted-foreground">
                {language === 'sw' ? 'Nzuri sana' : 'Excellent'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Business Profile Summary */}
      <Card className="p-6">
        <h3 className="mb-4">{language === 'sw' ? 'Muhtasari wa Biashara' : 'Business Summary'}</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">
                {language === 'sw' ? 'Jina la Biashara' : 'Business Name'}
              </span>
              <span>Mama Fua Laundry</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">
                {language === 'sw' ? 'Sekta' : 'Sector'}
              </span>
              <span>{language === 'sw' ? 'Reja Reja' : 'Retail'}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">
                {language === 'sw' ? 'Kaunti' : 'County'}
              </span>
              <span>Nairobi 🏙️</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">
                {language === 'sw' ? 'Mapato ya Mwezi' : 'Monthly Revenue'}
              </span>
              <span className="text-success">KES 2.8M</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">
                {language === 'sw' ? 'Gharama za Mwezi' : 'Monthly Expenses'}
              </span>
              <span>KES 1.9M</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">
                {language === 'sw' ? 'Faida ya Mwezi' : 'Monthly Profit'}
              </span>
              <span className="text-success">KES 900K</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Top Recommendations */}
      <div className="space-y-4">
        <h3>{language === 'sw' ? 'Mapendekezo ya Juu' : 'Top Recommendations'}</h3>
        {recommendations.map((rec, index) => (
          <Card
            key={rec.id}
            className={`p-6 border-l-4 ${
              rec.color === 'primary' ? 'border-l-primary' : 'border-l-warning'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-lg ${
                  rec.color === 'primary' ? 'bg-primary/10' : 'bg-warning/10'
                }`}
              >
                <rec.icon
                  className={`h-6 w-6 ${
                    rec.color === 'primary' ? 'text-primary' : 'text-warning'
                  }`}
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{index + 1}</Badge>
                      <h4>{rec.title}</h4>
                    </div>
                    <p className="text-muted-foreground">{rec.description}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() =>
                    onNavigate(rec.color === 'primary' ? '/money' : '/feed')
                  }
                >
                  {rec.action}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* CTA Card */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-primary">
              {language === 'sw' ? 'Tayari kwa Kuomba Fedha?' : 'Ready to Apply for Funding?'}
            </h3>
            <p className="text-muted-foreground">
              {language === 'sw'
                ? 'Ripoti yako imekamilika. Inua inaweza kusaidia kukamilisha maombi yoyote.'
                : 'Your report is complete. Inua can help fill any application.'}
            </p>
          </div>
          <Button size="lg" onClick={() => onNavigate('/money')}>
            {language === 'sw' ? 'Angalia Fedha' : 'View Funding'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
