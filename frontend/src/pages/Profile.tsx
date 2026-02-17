import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { AgentAvatar } from '../components/AgentAvatar';
import { KENYAN_SECTORS, KENYAN_COUNTIES } from '../lib/constants';
import { MOCK_PROFILE_DATA } from '../lib/mock-data';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Users,
  TrendingUp,
  Download,
  Edit,
  CheckCircle,
  XCircle,
  FileText
} from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer as RC, CartesianGrid } from 'recharts';

interface ProfileProps {
  language: 'en' | 'sw';
}

export function Profile({ language }: ProfileProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const sector = KENYAN_SECTORS.find((s) => s.value === MOCK_PROFILE_DATA.business.sector);
  const county = KENYAN_COUNTIES.find((c) => c.value === MOCK_PROFILE_DATA.business.county);

  // Growth score radar data
  const radarData = [
    {
      category: language === 'sw' ? 'Fedha' : 'Financial',
      value: MOCK_PROFILE_DATA.growthScore.financial
    },
    {
      category: language === 'sw' ? 'Sheria' : 'Compliance',
      value: MOCK_PROFILE_DATA.growthScore.compliance
    },
    {
      category: language === 'sw' ? 'Wateja' : 'Customer',
      value: MOCK_PROFILE_DATA.growthScore.customer
    },
    {
      category: language === 'sw' ? 'Ubunifu' : 'Innovation',
      value: MOCK_PROFILE_DATA.growthScore.innovation
    }
  ];

  // Revenue trend data (mock)
  const revenueTrend = [
    { month: 'Jul', revenue: 85000 },
    { month: 'Aug', revenue: 92000 },
    { month: 'Sep', revenue: 98000 },
    { month: 'Oct', revenue: 105000 },
    { month: 'Nov', revenue: 120000 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>{language === 'sw' ? 'Wasifu wa Biashara' : 'Business Profile'}</h1>
        <p className="text-muted-foreground">
          {language === 'sw'
            ? 'Muonekano wa 360° wa biashara yako'
            : '360° view of your business'}
        </p>
      </div>

      {/* Business Card */}
      <Card className="p-6 kitenge-pattern">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-24 h-24 rounded-lg bg-primary/10 flex items-center justify-center text-5xl shrink-0">
            {sector?.icon}
          </div>
          <div className="flex-1 space-y-4 w-full">
            <div>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h2>{MOCK_PROFILE_DATA.business.name}</h2>
                  <p className="text-muted-foreground">
                    {language === 'sw' ? sector?.labelSwahili : sector?.label}
                  </p>
                </div>
                <Badge className="text-lg px-4 py-2">
                  {language === 'sw' ? 'Alama' : 'Score'}: {MOCK_PROFILE_DATA.growthScore.overall}
                  /100
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{county?.flag} {county?.label}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {language === 'sw' ? 'Kuanzishwa' : 'Est.'}{' '}
                  {MOCK_PROFILE_DATA.business.established.getFullYear()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>
                  {MOCK_PROFILE_DATA.business.employees}{' '}
                  {language === 'sw' ? 'wafanyikazi' : 'employees'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span>{MOCK_PROFILE_DATA.business.registration}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AgentAvatar agentId="profile" size="sm" />
              {language === 'sw' ? 'Mjenzi wa Wasifu' : 'Profile Builder'}
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Edit className="h-4 w-4" />
            {language === 'sw' ? 'Hariri' : 'Edit'}
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
          <TabsTrigger value="overview">
            {language === 'sw' ? 'Muhtasari' : 'Overview'}
          </TabsTrigger>
          <TabsTrigger value="financials">
            {language === 'sw' ? 'Fedha' : 'Financials'}
          </TabsTrigger>
          <TabsTrigger value="customers">
            {language === 'sw' ? 'Wateja' : 'Customers'}
          </TabsTrigger>
          <TabsTrigger value="team">
            {language === 'sw' ? 'Timu' : 'Team'}
          </TabsTrigger>
          <TabsTrigger value="documents">
            {language === 'sw' ? 'Hati' : 'Docs'}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Key Metrics */}
            <Card className="p-6">
              <h3 className="mb-4">{language === 'sw' ? 'Vipimo Muhimu' : 'Key Metrics'}</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-muted-foreground">
                    {language === 'sw' ? 'Mapato ya Mwezi' : 'Monthly Revenue'}
                  </span>
                  <span className="text-success">
                    KES {MOCK_PROFILE_DATA.financials.monthlyRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-muted-foreground">
                    {language === 'sw' ? 'Faida Halisi' : 'Net Profit'}
                  </span>
                  <span className="text-success">
                    KES {MOCK_PROFILE_DATA.financials.netProfit.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-muted-foreground">
                    {language === 'sw' ? 'Kiwango cha Ukuaji' : 'Growth Rate'}
                  </span>
                  <span className="text-success flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {MOCK_PROFILE_DATA.financials.growthRate}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    {language === 'sw' ? 'Jumla ya Wateja' : 'Total Customers'}
                  </span>
                  <span>{MOCK_PROFILE_DATA.customers.total}</span>
                </div>
              </div>
            </Card>

            {/* Growth Score Radar */}
            <Card className="p-6">
              <h3 className="mb-4">{language === 'sw' ? 'Alama ya Ukuaji' : 'Growth Score'}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                    <Radar
                      name="Score"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Contact Info */}
          <Card className="p-6">
            <h3 className="mb-4">{language === 'sw' ? 'Taarifa za Mawasiliano' : 'Contact Information'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    {language === 'sw' ? 'Simu' : 'Phone'}
                  </p>
                  <p>{MOCK_PROFILE_DATA.business.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p>{MOCK_PROFILE_DATA.business.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    {language === 'sw' ? 'Anwani' : 'Address'}
                  </p>
                  <p>{MOCK_PROFILE_DATA.business.address}</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Financials Tab */}
        <TabsContent value="financials" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">{language === 'sw' ? 'Mwenendo wa Mapato' : 'Revenue Trend'}</h3>
            <div className="h-64">
              <RC width="100%" height="100%">
                <AreaChart data={revenueTrend}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `${value / 1000}K`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`KES ${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </RC>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              {language === 'sw'
                ? 'Data imepangwa kiotomatiki kutoka M-Pesa'
                : 'Auto-synced from M-Pesa'}
            </p>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <p className="text-muted-foreground mb-2">
                {language === 'sw' ? 'Jumla ya Wateja' : 'Total Customers'}
              </p>
              <p className="text-2xl">{MOCK_PROFILE_DATA.customers.total}</p>
            </Card>
            <Card className="p-4">
              <p className="text-muted-foreground mb-2">
                {language === 'sw' ? 'Warudi' : 'Returning'}
              </p>
              <p className="text-2xl text-success">{MOCK_PROFILE_DATA.customers.returning}</p>
            </Card>
            <Card className="p-4">
              <p className="text-muted-foreground mb-2">
                {language === 'sw' ? 'Ridhaa' : 'Satisfaction'}
              </p>
              <p className="text-2xl">{MOCK_PROFILE_DATA.customers.satisfaction}/5.0</p>
            </Card>
            <Card className="p-4">
              <p className="text-muted-foreground mb-2">
                {language === 'sw' ? 'Kikanda' : 'Corporate'}
              </p>
              <p className="text-2xl">{MOCK_PROFILE_DATA.customers.demographics.corporate}%</p>
            </Card>
          </div>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">{language === 'sw' ? 'Wafanyikazi' : 'Team Members'}</h3>
            <div className="space-y-4">
              {MOCK_PROFILE_DATA.team.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p>{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {member.nssf ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                      <span className="text-xs">NSSF</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {member.nhif ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                      <span className="text-xs">NHIF</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              {language === 'sw' ? 'Hati zote za biashara' : 'All business documents'}
            </p>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              {language === 'sw' ? 'Pakua Yote PDF' : 'Download All PDF'}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'KRA PIN Certificate',
              'KRA TCC',
              'County License',
              'NSSF Registration',
              'Fire Safety Cert',
              'Business Permit'
            ].map((doc, index) => (
              <Card key={index} className="p-6">
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p>{doc}</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, 245 KB</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Download className="h-3 w-3" />
                    {language === 'sw' ? 'Pakua' : 'Download'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
