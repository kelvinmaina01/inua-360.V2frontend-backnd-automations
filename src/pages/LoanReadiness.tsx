import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { AgentAvatar } from '../components/AgentAvatar';
import {
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  FileText,
  Building2,
  Target,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

interface LoanReadinessProps {
  language: 'en' | 'sw';
  onNavigate: (route: string) => void;
}

// Mock data - will be replaced with useLoanReadiness() hook
const MOCK_LOAN_READINESS = {
  report_id: 'uuid-1',
  generated_at: new Date().toISOString(),
  user_id: 'uuid-user',
  business_name: 'Mama Fua Laundry',
  loan_readiness_score: 78,
  approval_likelihood: 'high' as const,
  assessment: {
    financial_health: {
      score: 85,
      status: 'strong' as const,
      factors: {
        revenue_consistency: {
          score: 90,
          status: 'excellent',
          details: 'Revenue stable for 6 months with 12% growth trend'
        },
        cash_flow_positive: {
          score: 80,
          status: 'good',
          details: 'Positive cash flow in 5 of last 6 months'
        },
        expense_control: {
          score: 85,
          status: 'good',
          details: 'Expenses consistently below 60% of revenue'
        }
      }
    },
    documentation_completeness: {
      score: 70,
      status: 'adequate' as const,
      factors: {
        compliance_current: {
          score: 87,
          status: 'good',
          details: '5 of 6 compliance items valid'
        },
        financial_records: {
          score: 75,
          status: 'good',
          details: '6 months of M-Pesa transaction history'
        },
        bank_statements: {
          score: 50,
          status: 'needs_improvement',
          details: 'No bank statements uploaded'
        }
      }
    },
    repayment_capacity: {
      score: 80,
      status: 'good' as const,
      factors: {
        debt_service_coverage_ratio: {
          value: 2.5,
          score: 90,
          status: 'excellent',
          details: 'DSCR of 2.5x indicates strong repayment capacity'
        },
        cash_runway: {
          value: 38,
          score: 70,
          status: 'adequate',
          details: '38 days of cash runway'
        }
      }
    }
  },
  loan_capacity: {
    recommended_loan_amount: 500000,
    max_loan_amount: 1000000,
    recommended_term_months: 12,
    estimated_interest_rate: 12.5,
    monthly_payment: 44500,
    notes: 'Based on 30% debt-to-income ratio and current cash flow'
  },
  improvement_actions: [
    {
      priority: 'high' as const,
      category: 'documentation' as const,
      action: 'Upload 6 months of bank statements',
      impact: '+8 points to loan readiness score',
      estimated_time: '10 minutes'
    },
    {
      priority: 'medium' as const,
      category: 'compliance' as const,
      action: 'Renew County Business License (expires in 37 days)',
      impact: '+5 points to loan readiness score',
      estimated_time: '2 days'
    },
    {
      priority: 'low' as const,
      category: 'financial_health' as const,
      action: 'Increase cash runway to 60 days',
      impact: '+10 points to loan readiness score',
      estimated_time: '2-3 months'
    }
  ],
  matched_lenders: [
    {
      lender_id: 'kie',
      lender_name: 'KIE - Kenya Industrial Estates',
      match_score: 96,
      max_amount: 2000000,
      interest_rate: 9.5,
      approval_likelihood: 'very_high' as const,
      reasons: ['Sector match (retail)', 'Revenue meets minimum', 'Strong repayment capacity']
    },
    {
      lender_id: 'hustler',
      lender_name: 'Hustler Fund',
      match_score: 88,
      max_amount: 50000,
      interest_rate: 8.0,
      approval_likelihood: 'high' as const,
      reasons: ['Guaranteed approval for compliant businesses', 'Fast disbursement']
    },
    {
      lender_id: 'women',
      lender_name: 'Women Enterprise Fund',
      match_score: 92,
      max_amount: 1000000,
      interest_rate: 10.0,
      approval_likelihood: 'very_high' as const,
      reasons: ['Women-led business', 'Strong financial health', 'Compliance current']
    }
  ]
};

export function LoanReadiness({ language, onNavigate }: LoanReadinessProps) {
  const report = MOCK_LOAN_READINESS;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  const getLikelihoodBadge = (likelihood: string) => {
    switch (likelihood) {
      case 'very_high':
        return (
          <Badge className="bg-success text-white">
            {language === 'sw' ? 'Juu Sana' : 'Very High'}
          </Badge>
        );
      case 'high':
        return (
          <Badge className="bg-success/80 text-white">
            {language === 'sw' ? 'Juu' : 'High'}
          </Badge>
        );
      case 'medium':
        return (
          <Badge className="bg-warning text-white">
            {language === 'sw' ? 'Wastani' : 'Medium'}
          </Badge>
        );
      default:
        return (
          <Badge variant="destructive">
            {language === 'sw' ? 'Chini' : 'Low'}
          </Badge>
        );
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">{language === 'sw' ? 'Juu' : 'High'}</Badge>;
      case 'medium':
        return <Badge className="bg-warning text-white">{language === 'sw' ? 'Wastani' : 'Medium'}</Badge>;
      default:
        return <Badge variant="secondary">{language === 'sw' ? 'Chini' : 'Low'}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>{language === 'sw' ? 'Uwezo wa Mkopo' : 'Loan Readiness'}</h1>
        <p className="text-muted-foreground">
          {language === 'sw'
            ? 'Tathmini ya uwezekano wako wa kupata mkopo'
            : 'Assessment of your loan approval likelihood'}
        </p>
      </div>

      {/* Score Gauge */}
      <Card className="p-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Circular Score */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="hsl(var(--muted))"
                  strokeWidth="16"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke={report.loan_readiness_score >= 80 ? 'hsl(var(--success))' : report.loan_readiness_score >= 60 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))'}
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${(report.loan_readiness_score / 100) * 502.65} 502.65`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className={`text-5xl font-bold ${getScoreColor(report.loan_readiness_score)}`}>
                  {report.loan_readiness_score}
                </span>
                <span className="text-muted-foreground">/100</span>
              </div>
            </div>
          </div>

          {/* Score Details */}
          <div className="flex-1 text-center lg:text-left space-y-4">
            <div>
              <div className="flex items-center gap-3 justify-center lg:justify-start mb-2">
                <h2>{language === 'sw' ? 'Alama Yako' : 'Your Score'}</h2>
                {getLikelihoodBadge(report.approval_likelihood)}
              </div>
              <p className="text-muted-foreground">
                {language === 'sw'
                  ? 'Uwezekano wa kupata mkopo ni mkubwa'
                  : 'High likelihood of loan approval'}
              </p>
            </div>
            <Progress value={report.loan_readiness_score} className="h-3" />
            <div className="text-xs text-muted-foreground flex items-center gap-2 justify-center lg:justify-start">
              <AgentAvatar agentId="cashflow" size="sm" />
              {language === 'sw' ? 'Mtabiri wa Fedha' : 'Financial Agent'}
            </div>
          </div>
        </div>
      </Card>

      {/* Loan Capacity */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="mb-4">{language === 'sw' ? 'Uwezo wa Mkopo' : 'Loan Capacity'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  {language === 'sw' ? 'Mkopo Unaopendekezwa' : 'Recommended Loan'}
                </p>
                <p className="text-2xl text-primary font-bold">
                  KES {(report.loan_capacity.recommended_loan_amount / 1000).toFixed(0)}K
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  {language === 'sw' ? 'Malipo ya Kila Mwezi' : 'Monthly Payment'}
                </p>
                <p className="text-2xl font-bold">
                  KES {report.loan_capacity.monthly_payment.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  {language === 'sw' ? 'Riba Inayokadirika' : 'Est. Interest Rate'}
                </p>
                <p className="text-2xl font-bold">
                  {report.loan_capacity.estimated_interest_rate}%
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              {report.loan_capacity.notes}
            </p>
          </div>
        </div>
      </Card>

      {/* Assessment Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Health */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${report.assessment.financial_health.score >= 80 ? 'bg-success/10' : 'bg-warning/10'}`}>
              <TrendingUp className={`h-5 w-5 ${getScoreColor(report.assessment.financial_health.score)}`} />
            </div>
            <div className="flex-1">
              <h4>{language === 'sw' ? 'Afya ya Fedha' : 'Financial Health'}</h4>
              <p className={`text-2xl font-bold ${getScoreColor(report.assessment.financial_health.score)}`}>
                {report.assessment.financial_health.score}/100
              </p>
            </div>
          </div>
          <Progress value={report.assessment.financial_health.score} className="mb-4" />
          <div className="space-y-3">
            {Object.entries(report.assessment.financial_health.factors).map(([key, factor]) => (
              <div key={key} className="text-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-muted-foreground capitalize">
                    {key.replace(/_/g, ' ')}
                  </span>
                  <span className={getScoreColor(factor.score)}>{factor.score}</span>
                </div>
                <p className="text-xs text-muted-foreground">{factor.details}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Documentation */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${report.assessment.documentation_completeness.score >= 80 ? 'bg-success/10' : 'bg-warning/10'}`}>
              <FileText className={`h-5 w-5 ${getScoreColor(report.assessment.documentation_completeness.score)}`} />
            </div>
            <div className="flex-1">
              <h4>{language === 'sw' ? 'Nyaraka' : 'Documentation'}</h4>
              <p className={`text-2xl font-bold ${getScoreColor(report.assessment.documentation_completeness.score)}`}>
                {report.assessment.documentation_completeness.score}/100
              </p>
            </div>
          </div>
          <Progress value={report.assessment.documentation_completeness.score} className="mb-4" />
          <div className="space-y-3">
            {Object.entries(report.assessment.documentation_completeness.factors).map(([key, factor]) => (
              <div key={key} className="text-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-muted-foreground capitalize">
                    {key.replace(/_/g, ' ')}
                  </span>
                  <span className={getScoreColor(factor.score)}>{factor.score}</span>
                </div>
                <p className="text-xs text-muted-foreground">{factor.details}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Repayment Capacity */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${report.assessment.repayment_capacity.score >= 80 ? 'bg-success/10' : 'bg-warning/10'}`}>
              <CheckCircle className={`h-5 w-5 ${getScoreColor(report.assessment.repayment_capacity.score)}`} />
            </div>
            <div className="flex-1">
              <h4>{language === 'sw' ? 'Uwezo wa Kulipa' : 'Repayment Capacity'}</h4>
              <p className={`text-2xl font-bold ${getScoreColor(report.assessment.repayment_capacity.score)}`}>
                {report.assessment.repayment_capacity.score}/100
              </p>
            </div>
          </div>
          <Progress value={report.assessment.repayment_capacity.score} className="mb-4" />
          <div className="space-y-3">
            {Object.entries(report.assessment.repayment_capacity.factors).map(([key, factor]) => (
              <div key={key} className="text-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-muted-foreground capitalize">
                    {key.replace(/_/g, ' ')}
                  </span>
                  <span className={getScoreColor(factor.score)}>{factor.score}</span>
                </div>
                <p className="text-xs text-muted-foreground">{factor.details}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Improvement Actions */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <h3>{language === 'sw' ? 'Hatua za Kuboresha' : 'Improvement Actions'}</h3>
        </div>
        <div className="space-y-4">
          {report.improvement_actions.map((action, index) => (
            <Card key={index} className="p-4 bg-muted/50">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getPriorityBadge(action.priority)}
                    <Badge variant="outline" className="text-xs">
                      {action.category.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                  <p className="font-medium mb-2">{action.action}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {action.impact}
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span>{language === 'sw' ? 'Muda:' : 'Time:'} {action.estimated_time}</span>
                  </div>
                </div>
                <Button size="sm">
                  {language === 'sw' ? 'Fanya' : 'Do It'}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Matched Lenders */}
      <div>
        <h3 className="mb-4">
          {language === 'sw' ? 'Wakopesha Wanaofaa' : 'Matched Lenders'}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {report.matched_lenders.map((lender) => (
            <Card key={lender.lender_id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4>{lender.lender_name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {language === 'sw' ? 'Hadi' : 'Up to'} KES {(lender.max_amount / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>
                <Badge
                  className="text-lg px-3 py-1"
                  style={{
                    backgroundColor:
                      lender.match_score >= 90
                        ? 'hsl(var(--success))'
                        : lender.match_score >= 80
                          ? 'hsl(var(--primary))'
                          : 'hsl(var(--warning))'
                  }}
                >
                  {lender.match_score}%
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {language === 'sw' ? 'Riba' : 'Interest Rate'}
                  </span>
                  <span className="font-medium">{lender.interest_rate}% {language === 'sw' ? 'kwa mwaka' : 'p.a.'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {language === 'sw' ? 'Uwezekano' : 'Approval Likelihood'}
                  </span>
                  {getLikelihoodBadge(lender.approval_likelihood)}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">
                  {language === 'sw' ? 'Sababu:' : 'Why matched:'}
                </p>
                <div className="flex flex-wrap gap-1">
                  {lender.reasons.map((reason, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {reason}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button className="w-full gap-2">
                {language === 'sw' ? 'Omba Sasa' : 'Apply Now'}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Report Info */}
      <div className="text-center text-sm text-muted-foreground">
        {language === 'sw' ? 'Ripoti imetengenezwa' : 'Report generated'}{' '}
        {new Date(report.generated_at).toLocaleString(language === 'sw' ? 'sw-KE' : 'en-KE', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    </div>
  );
}
