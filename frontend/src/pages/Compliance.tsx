import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Progress } from '../components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { AgentAvatar } from '../components/AgentAvatar';
import { MOCK_COMPLIANCE_STATUS } from '../lib/mock-data';
import { Shield, CheckCircle, AlertCircle, Clock, ExternalLink, Download, FileText } from 'lucide-react';

interface ComplianceProps {
  language: 'en' | 'sw';
  onNavigate: (route: string) => void;
}

export function Compliance({ language, onNavigate }: ComplianceProps) {
  const [trackerEnabled, setTrackerEnabled] = useState<{ [key: string]: boolean }>({
    county_license: true
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'text-success';
      case 'expiring':
        return 'text-warning';
      case 'expired':
        return 'text-destructive';
      case 'pending':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'expiring':
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case 'expired':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'valid':
        return (
          <Badge className="bg-success text-white">
            {language === 'sw' ? 'Halali' : 'Valid'}
          </Badge>
        );
      case 'expiring':
        return (
          <Badge variant="destructive">
            {language === 'sw' ? 'Inaisha' : 'Expiring'}
          </Badge>
        );
      case 'expired':
        return (
          <Badge variant="destructive">
            {language === 'sw' ? 'Imeisha' : 'Expired'}
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="secondary">
            {language === 'sw' ? 'Inasubiri' : 'Pending'}
          </Badge>
        );
      default:
        return null;
    }
  };

  // Calculate score color
  const scoreColor =
    MOCK_COMPLIANCE_STATUS.score >= 80
      ? 'text-success'
      : MOCK_COMPLIANCE_STATUS.score >= 60
        ? 'text-warning'
        : 'text-destructive';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>{language === 'sw' ? 'Kinga Yako' : 'Compliance Shield'}</h1>
        <p className="text-muted-foreground">
          {language === 'sw'
            ? 'Leseni, vibali, na ufuatiliaji wa sheria'
            : 'Licenses, permits, and regulatory tracking'}
        </p>
      </div>

      {/* Compliance Score Gauge */}
      <Card className="p-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="relative flex items-center justify-center">
            {/* Circular gauge using conic gradient */}
            <div className="relative w-48 h-48">
              <svg className="w-48 h-48 transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="hsl(var(--muted))"
                  strokeWidth="16"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="hsl(var(--success))"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${(MOCK_COMPLIANCE_STATUS.score / 100) * 502.65} 502.65`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className={`text-5xl ${scoreColor}`}>
                  {MOCK_COMPLIANCE_STATUS.score}
                </span>
                <span className="text-muted-foreground">/100</span>
              </div>
            </div>
          </div>
          <div className="flex-1 text-center lg:text-left space-y-4">
            <div>
              <h2>{language === 'sw' ? 'Kinga Yako' : 'Your Compliance Score'}</h2>
              <p className="text-muted-foreground">
                {language === 'sw'
                  ? 'Ulinzi kamili wa sheria na leseni'
                  : 'Complete regulatory and license protection'}
              </p>
            </div>
            <Progress value={MOCK_COMPLIANCE_STATUS.score} className="h-3" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center lg:justify-start">
              <AgentAvatar agentId="compliance" size="sm" />
              {language === 'sw' ? 'Mfuatiliaji wa Sheria' : 'Compliance Tracker'}
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-4 w-4 text-success" />
            <span className="text-muted-foreground">
              {language === 'sw' ? 'Halali' : 'Valid'}
            </span>
          </div>
          <p className="text-success">4</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-warning" />
            <span className="text-muted-foreground">
              {language === 'sw' ? 'Inaisha' : 'Expiring'}
            </span>
          </div>
          <p className="text-warning">1</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {language === 'sw' ? 'Inasubiri' : 'Pending'}
            </span>
          </div>
          <p>1</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">
              {language === 'sw' ? 'Jumla' : 'Total'}
            </span>
          </div>
          <p>6</p>
        </Card>
      </div>

      {/* Compliance Items Accordion */}
      <Card className="p-6">
        <div className="mb-6">
          <h3>{language === 'sw' ? 'Leseni na Vibali' : 'Licenses & Permits'}</h3>
          <p className="text-muted-foreground">
            {language === 'sw'
              ? 'Angalia na usimamie vitu vyote vya sheria'
              : 'View and manage all compliance items'}
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {MOCK_COMPLIANCE_STATUS.items.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border border-border rounded-lg px-4"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 flex-1 text-left">
                  {getStatusIcon(item.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4>{language === 'sw' ? item.nameSwahili : item.name}</h4>
                      {getStatusBadge(item.status)}
                    </div>
                    {item.validUntil && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {language === 'sw' ? 'Inaisha:' : 'Valid until:'}{' '}
                        {item.validUntil.toLocaleDateString(
                          language === 'sw' ? 'sw-KE' : 'en-KE',
                          { day: 'numeric', month: 'long', year: 'numeric' }
                        )}
                        {item.daysLeft !== undefined && (
                          <span className="text-destructive ml-2">
                            ({item.daysLeft} {language === 'sw' ? 'siku zimebaki' : 'days left'})
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {language === 'sw'
                        ? 'Mfuatiliaji Otomatiki wa Wakala'
                        : 'Auto Tracker Agent'}
                    </span>
                  </div>
                  <Switch
                    checked={trackerEnabled[item.id] || false}
                    onCheckedChange={(checked) =>
                      setTrackerEnabled({ ...trackerEnabled, [item.id]: checked })
                    }
                  />
                </div>

                {item.actionRequired && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-destructive">
                      {language === 'sw'
                        ? 'Kitendo kinahitajika - Uidhinishe wakala kuendelea'
                        : 'Action required - Approve agent to proceed'}
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2">
                  {item.status === 'expiring' && (
                    <Button className="flex-1 gap-2">
                      {language === 'sw' ? 'Anza Kufufua' : 'Initiate Renewal'}
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                  {item.actionRequired && (
                    <Button className="flex-1 gap-2">
                      {language === 'sw' ? 'Uidhinishe Wakala' : 'Approve Agent'}
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    {language === 'sw' ? 'Angalia Hati' : 'View Document'}
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    {language === 'sw' ? 'Pakua' : 'Download'}
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  {language === 'sw' ? 'Imekaguliwa mwisho:' : 'Last checked:'}{' '}
                  {item.lastChecked.toLocaleString(language === 'sw' ? 'sw-KE' : 'en-KE', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      {/* View Full Log */}
      <div className="text-center">
        <Button variant="outline" onClick={() => onNavigate('/feed')}>
          {language === 'sw' ? 'Angalia Kumbukumbu Kamili ya Ukaguzi' : 'View Full Audit Log'}
        </Button>
      </div>
    </div>
  );
}
