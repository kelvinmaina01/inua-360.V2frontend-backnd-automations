import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface FinancialKPIsProps {
  language: 'en' | 'sw';
  onNavigate?: (route: string) => void;
}

// Mock data - will be replaced with useFinancialKPIs() hook
const MOCK_KPIS = {
  cash_runway_days: 38,
  loan_approval_likelihood: 78,
  debt_service_coverage_ratio: 2.5,
  revenue_growth_rate: 12.3,
  gross_profit_margin: 43.5,
  operating_expense_ratio: 56.5
};

export function FinancialKPIs({ language, onNavigate }: FinancialKPIsProps) {
  const kpis = MOCK_KPIS;

  const getCashRunwayStatus = (days: number) => {
    if (days >= 60) return { color: 'text-success', bg: 'bg-success', status: language === 'sw' ? 'Nzuri' : 'Healthy' };
    if (days >= 30) return { color: 'text-warning', bg: 'bg-warning', status: language === 'sw' ? 'Ya Wastani' : 'Adequate' };
    return { color: 'text-destructive', bg: 'bg-destructive', status: language === 'sw' ? 'Hatari' : 'Critical' };
  };

  const getLoanLikelihoodStatus = (score: number) => {
    if (score >= 80) return { color: 'text-success', label: language === 'sw' ? 'Juu Sana' : 'Very High' };
    if (score >= 60) return { color: 'text-success/80', label: language === 'sw' ? 'Juu' : 'High' };
    if (score >= 40) return { color: 'text-warning', label: language === 'sw' ? 'Wastani' : 'Medium' };
    return { color: 'text-destructive', label: language === 'sw' ? 'Chini' : 'Low' };
  };

  const runwayStatus = getCashRunwayStatus(kpis.cash_runway_days);
  const loanStatus = getLoanLikelihoodStatus(kpis.loan_approval_likelihood);

  return (
    <div className="space-y-4">
      {/* Cash Runway - Main KPI */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className={`p-3 ${runwayStatus.bg}/10 rounded-lg`}>
              <Calendar className={`h-6 w-6 ${runwayStatus.color}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {language === 'sw' ? 'Muda wa Fedha' : 'Cash Runway'}
              </p>
              <div className="flex items-baseline gap-2">
                <h2 className={runwayStatus.color}>{kpis.cash_runway_days}</h2>
                <span className="text-muted-foreground">{language === 'sw' ? 'siku' : 'days'}</span>
              </div>
            </div>
          </div>
          <Badge className={`${runwayStatus.bg} text-white`}>
            {runwayStatus.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {language === 'sw'
            ? `Biashara yako inaweza kuendesha kwa siku ${kpis.cash_runway_days} kwa salio la sasa`
            : `Your business can operate for ${kpis.cash_runway_days} days with current cash`}
        </p>
      </Card>

      {/* Other KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Loan Readiness */}
        <Card className="p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className={`p-2 ${loanStatus.color === 'text-success' ? 'bg-success' : 'bg-warning'}/10 rounded-lg`}>
              <Target className={`h-5 w-5 ${loanStatus.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">
                {language === 'sw' ? 'Uwezekano wa Mkopo' : 'Loan Approval Likelihood'}
              </p>
              <div className="flex items-baseline gap-2">
                <p className={`text-2xl font-bold ${loanStatus.color}`}>{kpis.loan_approval_likelihood}%</p>
                <Badge variant="secondary" className="text-xs">
                  {loanStatus.label}
                </Badge>
              </div>
            </div>
          </div>
          {onNavigate && (
            <Button
              size="sm"
              variant="ghost"
              className="w-full gap-2 text-xs"
              onClick={() => onNavigate('/loan-readiness')}
            >
              {language === 'sw' ? 'Angalia Ripoti Kamili' : 'View Full Report'}
              <ArrowRight className="h-3 w-3" />
            </Button>
          )}
        </Card>

        {/* Debt Coverage */}
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">
                {language === 'sw' ? 'Uwiano wa Kulipa Deni' : 'Debt Service Coverage'}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-success">{kpis.debt_service_coverage_ratio}x</p>
                <Badge className="bg-success text-white text-xs">
                  {language === 'sw' ? 'Nzuri' : 'Strong'}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {language === 'sw'
                  ? 'Uwezo wa kulipa deni ni wa kutosha'
                  : 'Strong repayment capacity'}
              </p>
            </div>
          </div>
        </Card>

        {/* Revenue Growth */}
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">
                {language === 'sw' ? 'Ukuaji wa Mapato' : 'Revenue Growth'}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-success">+{kpis.revenue_growth_rate}%</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {language === 'sw' ? 'Miezi 6 iliyopita' : 'Last 6 months'}
              </p>
            </div>
          </div>
        </Card>

        {/* Profit Margin */}
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">
                {language === 'sw' ? 'Faida Halisi' : 'Gross Profit Margin'}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-primary">{kpis.gross_profit_margin}%</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {language === 'sw' ? 'Wastani wa sekta: 40%' : 'Industry avg: 40%'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Alert if Cash Runway < 30 days */}
      {kpis.cash_runway_days < 30 && (
        <Card className="p-4 bg-destructive/10 border-destructive/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-destructive mb-1">
                {language === 'sw' ? 'Tahadhari: Muda wa Fedha Mdogo' : 'Warning: Low Cash Runway'}
              </p>
              <p className="text-sm text-muted-foreground">
                {language === 'sw'
                  ? 'Fikiria kupata mkopo au kupunguza gharama ili kuongeza muda wa fedha yako.'
                  : 'Consider securing a loan or reducing expenses to extend your cash runway.'}
              </p>
              {onNavigate && (
                <Button
                  size="sm"
                  variant="destructive"
                  className="mt-3 gap-2"
                  onClick={() => onNavigate('/money?tab=funding')}
                >
                  {language === 'sw' ? 'Tafuta Fursa za Ufadhili' : 'Explore Funding Options'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
