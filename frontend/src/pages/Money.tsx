import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { AgentAvatar } from '../components/AgentAvatar';
import { FUNDING_SOURCES } from '../lib/constants';
import { MOCK_FUNDING_OPPORTUNITIES, MOCK_CASHFLOW_DATA } from '../lib/mock-data';
import { TrendingUp, TrendingDown, Calendar, Target, ExternalLink, CreditCard, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface MoneyProps {
  language: 'en' | 'sw';
  onNavigate: (route: string) => void;
}

// Mock M-Pesa transactions - will be replaced with real API call from Daraja API
const MOCK_MPESA_TRANSACTIONS = [
  {
    id: 'TXN001',
    date: '2025-12-09',
    time: '14:32',
    type: 'inflow' as const,
    amount: 5500,
    customer_name: 'JOHN KAMAU',
    phone: '254712345678',
    reference: 'Payment for laundry services',
    balance: 125500,
    transaction_code: 'SJK2H4D3F5'
  },
  {
    id: 'TXN002',
    date: '2025-12-09',
    time: '11:15',
    type: 'outflow' as const,
    amount: 3200,
    recipient: 'WATER COMPANY LTD',
    phone: '254700123456',
    reference: 'Water bill payment',
    balance: 120000,
    transaction_code: 'SJK2H4D3F6'
  },
  {
    id: 'TXN003',
    date: '2025-12-08',
    time: '16:45',
    type: 'inflow' as const,
    amount: 12000,
    customer_name: 'MARY WANJIRU',
    phone: '254723456789',
    reference: 'Bulk order payment',
    balance: 123200,
    transaction_code: 'SJK2H4D3F7'
  },
  {
    id: 'TXN004',
    date: '2025-12-08',
    time: '09:20',
    type: 'outflow' as const,
    amount: 8500,
    recipient: 'SUPPLIER XYZ',
    phone: '254734567890',
    reference: 'Stock purchase',
    balance: 111200,
    transaction_code: 'SJK2H4D3F8'
  },
  {
    id: 'TXN005',
    date: '2025-12-07',
    time: '13:00',
    type: 'inflow' as const,
    amount: 7800,
    customer_name: 'PETER OMONDI',
    phone: '254745678901',
    reference: 'Service payment',
    balance: 119700,
    transaction_code: 'SJK2H4D3F9'
  },
  {
    id: 'TXN006',
    date: '2025-12-07',
    time: '10:30',
    type: 'inflow' as const,
    amount: 4500,
    customer_name: 'GRACE AKINYI',
    phone: '254756789012',
    reference: 'Payment received',
    balance: 111900,
    transaction_code: 'SJK2H4D3G0'
  },
  {
    id: 'TXN007',
    date: '2025-12-06',
    time: '15:10',
    type: 'outflow' as const,
    amount: 15000,
    recipient: 'RENT PAYMENT',
    phone: '254767890123',
    reference: 'Monthly rent',
    balance: 107400,
    transaction_code: 'SJK2H4D3G1'
  },
  {
    id: 'TXN008',
    date: '2025-12-06',
    time: '08:45',
    type: 'inflow' as const,
    amount: 9200,
    customer_name: 'DAVID KIPCHOGE',
    phone: '254778901234',
    reference: 'Order #1234',
    balance: 122400,
    transaction_code: 'SJK2H4D3G2'
  }
];

export function Money({ language, onNavigate }: MoneyProps) {
  const [timeframe, setTimeframe] = useState<'7' | '30'>('7');

  // Process cash flow data for chart
  const chartData = MOCK_CASHFLOW_DATA.map((item) => {
    const date = new Date(item.date);
    return {
      date: date.toLocaleDateString('en', { month: 'short', day: 'numeric' }),
      cash: item.amount
    };
  });

  // Calculate cumulative cash
  let cumulative = 0;
  const cumulativeData = chartData.map((item) => {
    cumulative += item.cash;
    return {
      ...item,
      cumulative,
      isPositive: cumulative > 0
    };
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return (
          <Badge className="bg-primary">
            {language === 'sw' ? 'Imewasilishwa' : 'Submitted'}
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge variant="secondary">
            {language === 'sw' ? 'Inaendelea' : 'In Progress'}
          </Badge>
        );
      case 'available':
        return (
          <Badge className="bg-success text-white">
            {language === 'sw' ? 'Inapatikana' : 'Available'}
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>{language === 'sw' ? 'Fedha Zako' : 'Your Money'}</h1>
        <p className="text-muted-foreground">
          {language === 'sw'
            ? 'Mtiririko wa fedha na fursa za ufadhili'
            : 'Cash flow and funding opportunities'}
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="transactions">
            {language === 'sw' ? 'Miamala' : 'Transactions'}
          </TabsTrigger>
          <TabsTrigger value="funding">
            {language === 'sw' ? 'Ufadhili' : 'Funding'}
          </TabsTrigger>
          <TabsTrigger value="debt">
            {language === 'sw' ? 'Deni' : 'Debt'}
          </TabsTrigger>
        </TabsList>

        {/* M-Pesa Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm">{language === 'sw' ? 'Jumla ya Mapato' : 'Total Inflow'}</span>
              </div>
              <p className="text-2xl font-bold text-success">KES 39,000</p>
              <p className="text-xs text-muted-foreground mt-1">
                {language === 'sw' ? 'Miamala 5' : '5 transactions'}
              </p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <TrendingDown className="h-4 w-4 text-destructive" />
                <span className="text-sm">{language === 'sw' ? 'Jumla ya Matumizi' : 'Total Outflow'}</span>
              </div>
              <p className="text-2xl font-bold text-destructive">KES 26,700</p>
              <p className="text-xs text-muted-foreground mt-1">
                {language === 'sw' ? 'Miamala 3' : '3 transactions'}
              </p>
            </Card>
            <Card className="p-4 border-l-4 border-l-success">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span className="text-sm">{language === 'sw' ? 'Salio' : 'Current Balance'}</span>
              </div>
              <p className="text-2xl font-bold">KES 125,500</p>
              <p className="text-xs text-success mt-1">
                {language === 'sw' ? '+12,300 wiki hii' : '+12,300 this week'}
              </p>
            </Card>
          </div>

          {/* Timeframe Toggle */}
          <div className="flex items-center justify-between">
            <h3>{language === 'sw' ? 'Miamala ya Hivi Karibuni' : 'Recent Transactions'}</h3>
            <div className="flex gap-2">
              <Button
                variant={timeframe === '7' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeframe('7')}
              >
                {language === 'sw' ? 'Siku 7' : '7 Days'}
              </Button>
              <Button
                variant={timeframe === '30' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeframe('30')}
              >
                {language === 'sw' ? 'Siku 30' : '30 Days'}
              </Button>
            </div>
          </div>

          {/* Transactions List */}
          <Card>
            <div className="divide-y divide-border">
              {MOCK_MPESA_TRANSACTIONS.map((transaction) => (
                <div key={transaction.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'inflow'
                          ? 'bg-success/10'
                          : 'bg-destructive/10'
                      }`}>
                        {transaction.type === 'inflow' ? (
                          <TrendingUp className="h-5 w-5 text-success" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-destructive" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-medium">
                            {transaction.type === 'inflow'
                              ? transaction.customer_name
                              : transaction.recipient}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {transaction.transaction_code}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {transaction.reference}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span>{transaction.date}</span>
                          <span>•</span>
                          <span>{transaction.time}</span>
                          <span>•</span>
                          <span>{transaction.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${
                        transaction.type === 'inflow' ? 'text-success' : 'text-destructive'
                      }`}>
                        {transaction.type === 'inflow' ? '+' : '-'}KES {transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {language === 'sw' ? 'Salio' : 'Balance'}: {transaction.balance.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Agent Attribution */}
          <Card className="p-4 bg-muted/50">
            <div className="flex items-center gap-3">
              <AgentAvatar agentId="financial" size="sm" />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {language === 'sw' ? 'Mshauri wa Kifedha' : 'Financial Advisor'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {language === 'sw'
                    ? 'Miamala inasawazishwa kiotomatiki kutoka M-Pesa kila siku saa 1 asubuhi'
                    : 'Transactions automatically synced from M-Pesa daily at 7 AM'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('/loan-readiness')}
              >
                {language === 'sw' ? 'Angalia Uwezo wa Mkopo' : 'Check Loan Readiness'}
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Funding Opportunities Tab */}
        <TabsContent value="funding" className="space-y-6">
          {/* Summary */}
          <Card className="p-6 bg-primary/5">
            <div className="flex items-center gap-4">
              <AgentAvatar agentId="funding" size="lg" status="active" showPulse />
              <div className="flex-1">
                <h3>
                  {language === 'sw'
                    ? '4 Fursa za Ufadhili Zimepatikana'
                    : '4 Funding Opportunities Found'}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'sw'
                    ? 'Jumla ya KES 7.5M inapatikana - ufanani mpaka 96%'
                    : 'Total KES 7.5M available - up to 96% match'}
                </p>
              </div>
            </div>
          </Card>

          {/* Funding Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {MOCK_FUNDING_OPPORTUNITIES.map((opportunity) => {
              const source = FUNDING_SOURCES.find((s) => s.id === opportunity.source);
              const daysLeft = Math.ceil(
                (opportunity.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              );

              return (
                <Card key={opportunity.id} className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{source?.logo}</div>
                      <div>
                        <h4>
                          {language === 'sw' ? opportunity.titleSwahili : opportunity.title}
                        </h4>
                        <p className="text-muted-foreground">
                          {language === 'sw' ? source?.nameSwahili : source?.name}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className="text-lg px-3 py-1"
                      style={{
                        backgroundColor:
                          opportunity.matchScore >= 90
                            ? 'hsl(var(--success))'
                            : opportunity.matchScore >= 80
                              ? 'hsl(var(--primary))'
                              : 'hsl(var(--warning))'
                      }}
                    >
                      {opportunity.matchScore}%
                    </Badge>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl text-primary">
                      KES {(opportunity.amount / 1000).toFixed(0)}K
                    </span>
                    {getStatusBadge(opportunity.status)}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {language === 'sw' ? 'Muda wa mwisho:' : 'Deadline:'} {daysLeft}{' '}
                        {language === 'sw' ? 'siku' : 'days'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Target className="h-3 w-3" />
                      <span>
                        {language === 'sw' ? 'Muda:' : 'Timeline:'} {opportunity.timeline}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">
                      {language === 'sw' ? 'Mahitaji:' : 'Requirements:'}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {opportunity.requirements.map((req, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {opportunity.status === 'available' ? (
                      <>
                        <Button className="flex-1 gap-2">
                          {language === 'sw' ? 'Omba Sasa' : 'Apply Now'}
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button variant="outline">
                          {language === 'sw' ? 'Maelezo' : 'Details'}
                        </Button>
                      </>
                    ) : opportunity.status === 'in_progress' ? (
                      <>
                        <Button className="flex-1" variant="outline">
                          {language === 'sw' ? 'Angalia Maendeleo' : 'View Progress'}
                        </Button>
                        <Button variant="outline">
                          {language === 'sw' ? 'Maelezo' : 'Details'}
                        </Button>
                      </>
                    ) : (
                      <Button className="flex-1" variant="outline">
                        {language === 'sw' ? 'Angalia Maelezo' : 'View Details'}
                      </Button>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <AgentAvatar agentId="funding" size="sm" />
                    {language === 'sw'
                      ? 'Imepatikana na Kiongozi wa Fedha'
                      : 'Found by Funding Navigator'}
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Debt Schedule Tab */}
        <TabsContent value="debt" className="space-y-6">
          {/* Debt Summary */}
          <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <CreditCard className="h-4 w-4" />
                  <span>{language === 'sw' ? 'Jumla ya Deni' : 'Total Debt'}</span>
                </div>
                <p className="text-3xl font-bold text-primary">KES 250,000</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>{language === 'sw' ? 'Malipo ya Kila Mwezi' : 'Monthly Obligations'}</span>
                </div>
                <p className="text-3xl font-bold">KES 25,000</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Target className="h-4 w-4" />
                  <span>{language === 'sw' ? 'Uwiano wa Deni' : 'Debt-to-Income'}</span>
                </div>
                <p className="text-3xl font-bold text-success">28%</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === 'sw' ? 'Inaweza kudhibitiwa' : 'Manageable'}
                </p>
              </div>
            </div>
          </Card>

          {/* Active Loans */}
          <div>
            <h3 className="mb-4">{language === 'sw' ? 'Mikopo Yako' : 'Active Loans'}</h3>
            <div className="space-y-4">
              {/* Loan 1: Hustler Fund */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4>Hustler Fund</h4>
                      <p className="text-sm text-muted-foreground">
                        {language === 'sw' ? 'Mtaji wa Kazi' : 'Working Capital'}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-success text-white">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {language === 'sw' ? 'Hali Nzuri' : 'Current'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {language === 'sw' ? 'Kiasi cha Msingi' : 'Principal'}
                    </p>
                    <p className="font-medium">KES 50,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {language === 'sw' ? 'Bado' : 'Outstanding'}
                    </p>
                    <p className="font-medium text-primary">KES 35,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {language === 'sw' ? 'Malipo ya Mwezi' : 'Monthly'}
                    </p>
                    <p className="font-medium">KES 8,700</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {language === 'sw' ? 'Malipo Yaliyobaki' : 'Payments Left'}
                    </p>
                    <p className="font-medium">4</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>{language === 'sw' ? 'Maendeleo' : 'Progress'}</span>
                    <span>33% {language === 'sw' ? 'imemaliza' : 'paid'}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-success" style={{ width: '33%' }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-sm">
                    <span className="text-muted-foreground">{language === 'sw' ? 'Malipo Yajayo:' : 'Next Payment:'}</span>
                    <span className="ml-2 font-medium">Dec 15, 2025</span>
                  </div>
                  <Button size="sm" variant="outline">
                    {language === 'sw' ? 'Lipa Mapema' : 'Pay Early'}
                  </Button>
                </div>
              </Card>

              {/* Loan 2: Equipment Loan */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4>Equipment Loan</h4>
                      <p className="text-sm text-muted-foreground">
                        {language === 'sw' ? 'Vifaa vya Biashara' : 'Business Equipment'}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-success text-white">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {language === 'sw' ? 'Hali Nzuri' : 'Current'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {language === 'sw' ? 'Kiasi cha Msingi' : 'Principal'}
                    </p>
                    <p className="font-medium">KES 200,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {language === 'sw' ? 'Bado' : 'Outstanding'}
                    </p>
                    <p className="font-medium text-primary">KES 152,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {language === 'sw' ? 'Malipo ya Mwezi' : 'Monthly'}
                    </p>
                    <p className="font-medium">KES 16,300</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {language === 'sw' ? 'Malipo Yaliyobaki' : 'Payments Left'}
                    </p>
                    <p className="font-medium">10</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>{language === 'sw' ? 'Maendeleo' : 'Progress'}</span>
                    <span>24% {language === 'sw' ? 'imemaliza' : 'paid'}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-success" style={{ width: '24%' }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-sm">
                    <span className="text-muted-foreground">{language === 'sw' ? 'Malipo Yajayo:' : 'Next Payment:'}</span>
                    <span className="ml-2 font-medium">Dec 20, 2025</span>
                  </div>
                  <Button size="sm" variant="outline">
                    {language === 'sw' ? 'Angalia Maelezo' : 'View Details'}
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Payment Calendar */}
          <Card className="p-6">
            <h3 className="mb-4">{language === 'sw' ? 'Kalenda ya Malipo' : 'Payment Calendar'}</h3>
            <div className="space-y-3">
              {/* Upcoming Payment 1 */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-background rounded-lg">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Dec 15, 2025</p>
                    <p className="text-sm text-muted-foreground">Hustler Fund</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">KES 8,700</p>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {language === 'sw' ? 'Siku 6 zimebaki' : '6 days left'}
                  </Badge>
                </div>
              </div>

              {/* Upcoming Payment 2 */}
              <div className="flex items-center justify-between p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-warning/20 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-warning" />
                  </div>
                  <div>
                    <p className="font-medium">Dec 20, 2025</p>
                    <p className="text-sm text-muted-foreground">Equipment Loan</p>
                    <p className="text-xs text-warning mt-1">
                      {language === 'sw' ? 'Malipo makubwa - hakikisha una salio' : 'Large payment - ensure sufficient balance'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">KES 16,300</p>
                  <Badge className="bg-warning text-white text-xs mt-1">
                    {language === 'sw' ? 'Siku 11 zimebaki' : '11 days left'}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Recommendations */}
          <Card className="p-6 bg-secondary/5 border-secondary/20">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Target className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex-1">
                <h4 className="text-secondary mb-2">
                  {language === 'sw' ? 'Ushauri wa Wakala' : 'Agent Recommendation'}
                </h4>
                <p className="text-muted-foreground mb-3">
                  {language === 'sw'
                    ? 'Una ziada ya KES 680k katika wiki 3 zijazo. Fikiria kulipa Mkopo wa Hustler Fund mapema ili kuokoa KES 2,800 kwa riba.'
                    : 'You have KES 680k surplus in the next 3 weeks. Consider paying off Hustler Fund loan early to save KES 2,800 in interest.'}
                </p>
                <Button size="sm" className="gap-2">
                  {language === 'sw' ? 'Pata Maelezo Zaidi' : 'Learn More'}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground flex items-center gap-2">
              <AgentAvatar agentId="cashflow" size="sm" />
              {language === 'sw' ? 'Mtabiri wa Mtiririko wa Fedha' : 'Cash-Flow Forecaster'}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
