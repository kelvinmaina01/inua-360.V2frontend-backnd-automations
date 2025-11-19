import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  Award,
  Download,
  BarChart3,
  PlusCircle,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface AnalyticsProps {
  language: 'en' | 'sw';
  onNavigate: (route: string) => void;
}

export function Analytics({ language, onNavigate }: AnalyticsProps) {
  const [timeframe, setTimeframe] = useState<'7' | '30' | '90'>('30');

  // Revenue & Profit Data
  const revenueData = [
    { month: 'Jan', revenue: 450000, profit: 180000 },
    { month: 'Feb', revenue: 520000, profit: 195000 },
    { month: 'Mar', revenue: 580000, profit: 220000 },
    { month: 'Apr', revenue: 630000, profit: 245000 },
    { month: 'May', revenue: 690000, profit: 265000 },
    { month: 'Jun', revenue: 750000, profit: 285000 }
  ];

  // Team Growth Data
  const teamData = [
    { month: 'Jan', count: 15 },
    { month: 'Feb', count: 17 },
    { month: 'Mar', count: 18 },
    { month: 'Apr', count: 20 },
    { month: 'May', count: 22 },
    { month: 'Jun', count: 23 }
  ];

  // Sector Distribution
  const sectorData = [
    { name: 'Technology', value: 35, color: '#F25020' },
    { name: 'Agriculture', value: 25, color: '#34C759' },
    { name: 'Retail', value: 20, color: '#FFD60A' },
    { name: 'Services', value: 20, color: '#00B8A9' }
  ];

  // Report Scores
  const reportScores = [
    { name: 'SME', score: 85, color: '#F25020' },
    { name: 'Funding', score: 78, color: '#FFD60A' },
    { name: 'Compliance', score: 92, color: '#34C759' },
    { name: 'Growth', score: 88, color: '#00B8A9' }
  ];

  // Report History
  const reports = [
    {
      id: 1,
      type: 'SME Report',
      typeSw: 'Ripoti ya SME',
      status: 'completed',
      date: 'Nov 9, 2025',
      score: 85,
      color: '#F25020'
    },
    {
      id: 2,
      type: 'Funding Report',
      typeSw: 'Ripoti ya Ufadhili',
      status: 'completed',
      date: 'Nov 9, 2025',
      score: 78,
      color: '#FFD60A'
    },
    {
      id: 3,
      type: 'Compliance Report',
      typeSw: 'Ripoti ya Kufuata Sheria',
      status: 'completed',
      date: 'Nov 9, 2025',
      score: 92,
      color: '#34C759'
    },
    {
      id: 4,
      type: 'Growth Report',
      typeSw: 'Ripoti ya Ukuaji',
      status: 'completed',
      date: 'Nov 9, 2025',
      score: 88,
      color: '#00B8A9'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-primary';
    if (score >= 50) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1>{language === 'sw' ? 'Dashibodi ya Takwimu' : 'Analytics Dashboard'}</h1>
          <p className="text-muted-foreground">
            {language === 'sw'
              ? 'Fuatilia utendaji wa biashara yako na maarifa'
              : 'Track your business performance and insights'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">
              {language === 'sw' ? 'Angalia katika Slack' : 'View in Slack'}
            </span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">
              {language === 'sw' ? 'Pakua PDF' : 'Export PDF'}
            </span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <Badge className="bg-success/10 text-success border-success/20">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +15.3%
            </Badge>
          </div>
          <p className="text-muted-foreground mb-1">
            {language === 'sw' ? 'Jumla ya Mapato' : 'Total Revenue'}
          </p>
          <h2 className="mb-1">KES 750,000</h2>
          <p className="text-xs text-muted-foreground">
            {language === 'sw' ? 'kuliko kipindi kilichopita' : 'vs last period'}
          </p>
        </Card>

        {/* Active Reports */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <Badge className="bg-success/10 text-success border-success/20">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +8
            </Badge>
          </div>
          <p className="text-muted-foreground mb-1">
            {language === 'sw' ? 'Ripoti Hai' : 'Active Reports'}
          </p>
          <h2 className="mb-1">24</h2>
          <p className="text-xs text-muted-foreground">
            {language === 'sw' ? 'kuliko kipindi kilichopita' : 'vs last period'}
          </p>
        </Card>

        {/* Team Members */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <Badge className="bg-success/10 text-success border-success/20">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +3
            </Badge>
          </div>
          <p className="text-muted-foreground mb-1">
            {language === 'sw' ? 'Wanachama wa Timu' : 'Team Members'}
          </p>
          <h2 className="mb-1">23</h2>
          <p className="text-xs text-muted-foreground">
            {language === 'sw' ? 'kuliko kipindi kilichopita' : 'vs last period'}
          </p>
        </Card>

        {/* Growth Score */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <Badge className="bg-success/10 text-success border-success/20">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +5%
            </Badge>
          </div>
          <p className="text-muted-foreground mb-1">
            {language === 'sw' ? 'Alama ya Ukuaji' : 'Growth Score'}
          </p>
          <h2 className="mb-1">88%</h2>
          <p className="text-xs text-muted-foreground">
            {language === 'sw' ? 'kuliko kipindi kilichopita' : 'vs last period'}
          </p>
        </Card>
      </div>

      {/* Time Period Filter */}
      <div className="flex items-center gap-2">
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
        <Button
          variant={timeframe === '90' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTimeframe('90')}
        >
          {language === 'sw' ? 'Siku 90' : '90 Days'}
        </Button>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Profit Trends */}
        <Card className="p-6">
          <div className="mb-6">
            <h3>{language === 'sw' ? 'Mwenendo wa Mapato & Faida' : 'Revenue & Profit Trends'}</h3>
            <p className="text-muted-foreground text-sm">
              {language === 'sw' ? 'Utendaji wa fedha wa kila mwezi' : 'Monthly financial performance'}
            </p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
                  formatter={(value: number) => [`KES ${value.toLocaleString()}`, '']}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#F25020"
                  strokeWidth={3}
                  dot={{ fill: '#F25020', r: 4 }}
                  name={language === 'sw' ? 'Mapato' : 'Revenue'}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#34C759"
                  strokeWidth={3}
                  dot={{ fill: '#34C759', r: 4 }}
                  name={language === 'sw' ? 'Faida' : 'Profit'}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Team Growth */}
        <Card className="p-6">
          <div className="mb-6">
            <h3>{language === 'sw' ? 'Ukuaji wa Timu' : 'Team Growth'}</h3>
            <p className="text-muted-foreground text-sm">
              {language === 'sw' ? 'Idadi ya wafanyikazi kwa muda' : 'Employee count over time'}
            </p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={teamData}>
                <defs>
                  <linearGradient id="colorTeam" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F25020" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F25020" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  domain={[0, 24]}
                  ticks={[0, 6, 12, 18, 24]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [value, language === 'sw' ? 'Wafanyikazi' : 'Employees']}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#F25020"
                  fill="url(#colorTeam)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Distribution */}
        <Card className="p-6">
          <div className="mb-6">
            <h3>{language === 'sw' ? 'Usambazaji wa Sekta' : 'Sector Distribution'}</h3>
            <p className="text-muted-foreground text-sm">
              {language === 'sw' ? 'Maeneo ya lengo la biashara' : 'Business focus areas'}
            </p>
          </div>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`${value}%`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Report Scores */}
        <Card className="p-6">
          <div className="mb-6">
            <h3>{language === 'sw' ? 'Alama za Ripoti' : 'Report Scores'}</h3>
            <p className="text-muted-foreground text-sm">
              {language === 'sw' ? 'Vipimo vya utendaji wa uchambuzi wa AI' : 'AI analysis performance metrics'}
            </p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportScores}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  domain={[0, 100]}
                  ticks={[0, 25, 50, 75, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`${value}%`, language === 'sw' ? 'Alama' : 'Score']}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {reportScores.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Report History */}
      <Card className="p-6">
        <div className="mb-6">
          <h3>{language === 'sw' ? 'Historia ya Ripoti' : 'Report History'}</h3>
          <p className="text-muted-foreground">
            {language === 'sw'
              ? 'Fuatilia ripoti zako zilizozalishwa na uchambuzi kwa muda'
              : 'Track your generated reports and analysis over time'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reports.map((report) => (
            <Card key={report.id} className="p-5 border-l-4" style={{ borderLeftColor: report.color }}>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4>{language === 'sw' ? report.typeSw : report.type}</h4>
                    <Badge variant="secondary" className="mt-2">
                      {language === 'sw' ? 'imekamilika' : 'completed'}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">{report.date}</p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl ${getScoreColor(report.score)}`}>{report.score}%</span>
                    <span className="text-xs text-muted-foreground">
                      {language === 'sw' ? 'Alama' : 'Score'}
                    </span>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Eye className="h-3 w-3" />
                  {language === 'sw' ? 'Angalia Ripoti' : 'View Report'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6 bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <PlusCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="text-primary">
                {language === 'sw' ? 'Tengeneza Ripoti Mpya' : 'Generate New Report'}
              </h4>
              <p className="text-xs text-muted-foreground">
                {language === 'sw' ? 'Unda uchambuzi mpya' : 'Create fresh analysis'}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4>{language === 'sw' ? 'Angalia Takwimu' : 'View Analytics'}</h4>
              <p className="text-xs text-muted-foreground">
                {language === 'sw' ? 'Chunguza kwa kina data' : 'Deep dive into data'}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Download className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4>{language === 'sw' ? 'Hamisha Ripoti' : 'Export Reports'}</h4>
              <p className="text-xs text-muted-foreground">
                {language === 'sw' ? 'Pakua kama PDF' : 'Download as PDF'}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
