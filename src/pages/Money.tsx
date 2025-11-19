import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { AgentAvatar } from '../components/AgentAvatar';
import { FUNDING_SOURCES } from '../lib/constants';
import { MOCK_FUNDING_OPPORTUNITIES, MOCK_CASHFLOW_DATA } from '../lib/mock-data';
import { TrendingUp, TrendingDown, Calendar, Target, ExternalLink } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface MoneyProps {
  language: 'en' | 'sw';
  onNavigate: (route: string) => void;
}

export function Money({ language, onNavigate }: MoneyProps) {
  const [timeframe, setTimeframe] = useState<'21' | '90'>('21');

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
      <Tabs defaultValue="forecast" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto">
          <TabsTrigger value="forecast">
            {language === 'sw' ? 'Utabiri' : 'Forecast'}
          </TabsTrigger>
          <TabsTrigger value="funding">
            {language === 'sw' ? 'Ufadhili' : 'Funding'}
          </TabsTrigger>
        </TabsList>

        {/* Cash Flow Forecast Tab */}
        <TabsContent value="forecast" className="space-y-6">
          {/* Timeframe Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant={timeframe === '21' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe('21')}
            >
              {language === 'sw' ? 'Siku 21' : '21 Days'}
            </Button>
            <Button
              variant={timeframe === '90' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe('90')}
            >
              {language === 'sw' ? 'Siku 90' : '90 Days'}
            </Button>
          </div>

          {/* Cash Flow Chart */}
          <Card className="p-6">
            <div className="mb-6">
              <h3>{language === 'sw' ? 'Mtiririko wa Fedha' : 'Cash Flow Forecast'}</h3>
              <p className="text-muted-foreground">
                {language === 'sw'
                  ? 'Utabiri wa mapato na matumizi'
                  : 'Projected income and expenses'}
              </p>
            </div>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cumulativeData}>
                  <defs>
                    <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`KES ${value.toLocaleString()}`, 'Cash']}
                  />
                  <Area
                    type="monotone"
                    dataKey="cumulative"
                    stroke="hsl(var(--success))"
                    fill="url(#colorCash)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-xs text-muted-foreground flex items-center gap-2">
              <AgentAvatar agentId="cashflow" size="sm" />
              {language === 'sw' ? 'Mtabiri wa Mtiririko wa Fedha' : 'Cash-Flow Forecaster'}
            </div>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <TrendingUp className="h-4 w-4" />
                <span>{language === 'sw' ? 'Mapato' : 'Income'}</span>
              </div>
              <p className="text-success">KES 920,000</p>
              <p className="text-xs text-muted-foreground mt-1">
                {language === 'sw' ? 'Siku 21 zijazo' : 'Next 21 days'}
              </p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <TrendingDown className="h-4 w-4" />
                <span>{language === 'sw' ? 'Matumizi' : 'Expenses'}</span>
              </div>
              <p className="text-destructive">KES 520,000</p>
              <p className="text-xs text-muted-foreground mt-1">
                {language === 'sw' ? 'Siku 21 zijazo' : 'Next 21 days'}
              </p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Target className="h-4 w-4" />
                <span>{language === 'sw' ? 'Faida Halisi' : 'Net Profit'}</span>
              </div>
              <p className="text-success">KES 400,000</p>
              <p className="text-xs text-muted-foreground mt-1">
                {language === 'sw' ? 'Ongezeko la 23%' : '23% increase'}
              </p>
            </Card>
            <Card className="p-4 border-destructive">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                <span>{language === 'sw' ? 'Pengo' : 'Gap Ahead'}</span>
              </div>
              <p className="text-destructive">KES 800,000</p>
              <p className="text-xs text-muted-foreground mt-1">
                {language === 'sw' ? 'Januari 2026' : 'January 2026'}
              </p>
            </Card>
          </div>
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
      </Tabs>
    </div>
  );
}
