import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { AgentAvatar } from '../components/AgentAvatar';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Plus, 
  Mic,
  ShoppingBag,
  Wallet,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  ReferenceLine
} from 'recharts';

interface MoneyMPesaProps {
  language: 'en' | 'sw';
  onNavigate: (route: string) => void;
}

export function MoneyMPesa({ language, onNavigate }: MoneyMPesaProps) {
  const [showCashModal, setShowCashModal] = useState(false);
  const [cashAmount, setCashAmount] = useState('');
  const lastSyncMinutes = 2;

  // 90-day M-Pesa data with forecast
  const cashFlowData = [
    // Historical data (90 days)
    { day: 'Jul 1', inflow: 85000, outflow: -42000, type: 'actual' },
    { day: 'Jul 8', inflow: 92000, outflow: -45000, type: 'actual' },
    { day: 'Jul 15', inflow: 88000, outflow: -41000, type: 'actual' },
    { day: 'Jul 22', inflow: 95000, outflow: -48000, type: 'actual' },
    { day: 'Jul 29', inflow: 98000, outflow: -46000, type: 'actual' },
    { day: 'Aug 5', inflow: 102000, outflow: -49000, type: 'actual' },
    { day: 'Aug 12', inflow: 105000, outflow: -51000, type: 'actual' },
    { day: 'Aug 19', inflow: 108000, outflow: -52000, type: 'actual' },
    { day: 'Aug 26', inflow: 112000, outflow: -54000, type: 'actual' },
    { day: 'Sep 2', inflow: 115000, outflow: -55000, type: 'actual' },
    { day: 'Sep 9', inflow: 118000, outflow: -57000, type: 'actual' },
    { day: 'Sep 16', inflow: 122000, outflow: -58000, type: 'actual' },
    { day: 'Sep 23', inflow: 125000, outflow: -60000, type: 'actual' },
    { day: 'Sep 30', inflow: 128000, outflow: -61000, type: 'actual' },
    { day: 'Oct 7', inflow: 132000, outflow: -63000, type: 'actual' },
    { day: 'Oct 14', inflow: 135000, outflow: -64000, type: 'actual' },
    { day: 'Oct 21', inflow: 138000, outflow: -66000, type: 'actual' },
    { day: 'Oct 28', inflow: 142000, outflow: -67000, type: 'actual' },
    { day: 'Nov 4', inflow: 145000, outflow: -69000, type: 'actual' },
    { day: 'Nov 11', inflow: 148000, outflow: -70000, type: 'actual' },
    { day: 'Nov 18', inflow: 151000, outflow: -72000, type: 'actual' },
    // Forecast (21 days)
    { day: 'Nov 25', inflow: 0, outflow: 0, forecast: 154000, type: 'forecast' },
    { day: 'Dec 2', inflow: 0, outflow: 0, forecast: 157000, type: 'forecast' },
    { day: 'Dec 9', inflow: 0, outflow: 0, forecast: 160000, type: 'forecast' }
  ];

  // Calculate net flow
  const chartData = cashFlowData.map(item => ({
    ...item,
    net: item.type === 'actual' ? item.inflow + item.outflow : item.forecast
  }));

  const handleLogCash = () => {
    // Logic to log cash sale
    setShowCashModal(false);
    setCashAmount('');
  };

  return (
    <div className="space-y-6">
      {/* Header with Sync Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1>{language === 'sw' ? 'Fedha & Ufadhili' : 'Money & Funding'}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Clock className="h-4 w-4" />
            {language === 'sw' 
              ? `Fedha yako – ilisasishwa dakika ${lastSyncMinutes} zilizopita`
              : `Your money – last synced ${lastSyncMinutes} minutes ago`}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AgentAvatar agentId="financials" size="sm" status="active" />
          <Badge className="bg-secondary text-secondary-foreground">
            {language === 'sw' ? 'M-Pesa Imeunganishwa' : 'M-Pesa Connected'}
          </Badge>
        </div>
      </div>

      {/* Hero Balance */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 border-primary/20">
        <div className="space-y-2">
          <p className="text-muted-foreground">
            {language === 'sw' ? 'Jumla ya Salio' : 'Total Balance'}
          </p>
          <div className="flex items-baseline gap-3">
            <h1 className="text-primary">KES 1,847,200</h1>
            <Badge className="bg-success/10 text-success border-success/20">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12%
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {language === 'sw' 
              ? 'Till + Mkoba + Fedha taslimu'
              : 'Till + Wallet + Cash in hand'}
          </p>
        </div>
      </Card>

      {/* 90-Day River Chart */}
      <Card className="p-6">
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3>{language === 'sw' ? 'Mtiririko wa Fedha' : 'Cash Flow'}</h3>
            <div className="flex gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-success" />
                <span className="text-muted-foreground">
                  {language === 'sw' ? 'Kuingia' : 'Inflow'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <span className="text-muted-foreground">
                  {language === 'sw' ? 'Kutoka' : 'Outflow'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">
                  {language === 'sw' ? 'Utabiri' : 'Forecast'}
                </span>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {language === 'sw' 
              ? 'Siku 90 zilizopita + utabiri wa siku 21 zijazo'
              : 'Last 90 days + 21-day forecast'}
          </p>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34C759" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#34C759" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF3B30" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF3B30" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FA6915" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FA6915" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => [`KES ${value.toLocaleString()}`, '']}
              />
              <ReferenceLine x="Nov 18" stroke="hsl(var(--border))" strokeDasharray="3 3" />
              <Area
                type="monotone"
                dataKey="inflow"
                stroke="#34C759"
                fill="url(#colorInflow)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="outflow"
                stroke="#FF3B30"
                fill="url(#colorOutflow)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="forecast"
                stroke="#FA6915"
                fill="url(#colorForecast)"
                strokeWidth={3}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Key Metrics - Horizontal Scroll on Mobile */}
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-4 sm:pb-0 min-w-max sm:min-w-0">
          {/* Revenue */}
          <Card className="p-5 min-w-[280px] sm:min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <Badge className="bg-success/10 text-success border-success/20">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12%
              </Badge>
            </div>
            <p className="text-muted-foreground mb-1">
              {language === 'sw' ? 'Mapato mwezi huu' : 'Revenue this month'}
            </p>
            <h3>KES 2.8M</h3>
          </Card>

          {/* Expenses */}
          <Card className="p-5 min-w-[280px] sm:min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <TrendingDown className="h-5 w-5 text-destructive" />
              </div>
              <Badge className="bg-muted text-muted-foreground">
                {language === 'sw' ? 'Kawaida' : 'Normal'}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-1">
              {language === 'sw' ? 'Gharama' : 'Expenses'}
            </p>
            <h3>KES 1.9M</h3>
          </Card>

          {/* Top Category */}
          <Card className="p-5 min-w-[280px] sm:min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                42%
              </Badge>
            </div>
            <p className="text-muted-foreground mb-1">
              {language === 'sw' ? 'Aina kuu' : 'Top category'}
            </p>
            <h4>{language === 'sw' ? 'Ununuzi wa stoki' : 'Stock purchases'}</h4>
          </Card>

          {/* Cash in Pockets */}
          <Card className="p-5 min-w-[280px] sm:min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Wallet className="h-5 w-5 text-warning" />
              </div>
              <Badge className="bg-warning/10 text-warning border-warning/20">
                {language === 'sw' ? 'Taslimu' : 'Cash'}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-1">
              {language === 'sw' ? 'Fedha mfukoni' : 'Cash in pockets'}
            </p>
            <h3>KES 87,400</h3>
          </Card>
        </div>
      </div>

      {/* AI Insights */}
      <Card className="p-6 border-l-4 border-l-secondary">
        <div className="flex items-start gap-4">
          <AgentAvatar agentId="cashflow" size="sm" />
          <div className="flex-1 space-y-3">
            <div>
              <h4 className="text-secondary">
                {language === 'sw' ? 'Uwezekano Uliogundulika' : 'Opportunity Detected'}
              </h4>
              <p className="text-muted-foreground mt-1">
                {language === 'sw'
                  ? 'Ziada ya KES 680k katika siku 21 – Nilimove KES 200k kwa Mkoba wa Akiba'
                  : 'KES 680k surplus in 21 days – Moved KES 200k to Savings Pocket'}
              </p>
            </div>
            <Badge className="bg-secondary/10 text-secondary border-secondary/20">
              {language === 'sw' ? 'Kiotomatiki' : 'Auto-optimized'}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Floating Cash Button on Mobile */}
      <Button
        size="lg"
        className="fixed bottom-20 right-4 sm:hidden rounded-full shadow-lg h-14 w-14 p-0"
        onClick={() => setShowCashModal(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Desktop Cash Button */}
      <Button
        size="lg"
        className="hidden sm:flex gap-2"
        onClick={() => setShowCashModal(true)}
      >
        <Plus className="h-5 w-5" />
        {language === 'sw' ? 'Rekodi Mauzo ya Taslimu' : 'Log Cash Sale'}
      </Button>

      {/* Cash Log Modal */}
      <Dialog open={showCashModal} onOpenChange={setShowCashModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === 'sw' ? 'Rekodi Mauzo ya Taslimu Leo' : 'Log cash sale today'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>
                {language === 'sw' ? 'Kiasi (KES)' : 'Amount (KES)'}
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                  className="text-2xl pr-12"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowCashModal(false)}
                className="flex-1"
              >
                {language === 'sw' ? 'Ghairi' : 'Cancel'}
              </Button>
              <Button
                onClick={handleLogCash}
                className="flex-1"
                disabled={!cashAmount}
              >
                {language === 'sw' ? 'Hifadhi' : 'Save'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
