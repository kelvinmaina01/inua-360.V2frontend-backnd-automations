import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { AgentAvatar } from '../components/AgentAvatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { MOCK_CREDIT_SCORE } from '../lib/mock-data';
import {
    CreditCard,
    TrendingUp,
    CheckCircle,
    AlertTriangle,
    Clock,
    Target,
    ArrowRight,
    Calendar,
    Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface CreditScoreProps {
    language: 'en' | 'sw';
    onNavigate: (route: string) => void;
}

export function CreditScore({ language, onNavigate }: CreditScoreProps) {
    const data = MOCK_CREDIT_SCORE;

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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'excellent':
                return 'text-success';
            case 'good':
                return 'text-success';
            case 'adequate':
                return 'text-warning';
            default:
                return 'text-muted-foreground';
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

    const getGradeLabel = (score: number) => {
        if (score >= 90) return language === 'sw' ? 'Bora Kabisa' : 'Excellent';
        if (score >= 80) return language === 'sw' ? 'Nzuri Sana' : 'Very Good';
        if (score >= 70) return language === 'sw' ? 'Nzuri' : 'Good';
        if (score >= 60) return language === 'sw' ? 'Ya Wastani' : 'Fair';
        return language === 'sw' ? 'Inahitaji Kuboresha' : 'Needs Improvement';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1>{language === 'sw' ? 'Alama ya Mkopo' : 'Credit Score'}</h1>
                <p className="text-muted-foreground">
                    {language === 'sw'
                        ? 'Tathmini ya ustahiki wako wa mkopo'
                        : 'Assessment of your creditworthiness'}
                </p>
            </div>

            {/* Credit Score Gauge */}
            <Card className="p-8">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="relative flex items-center justify-center">
                        {/* Circular gauge using SVG */}
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
                                    stroke={data.score >= 80 ? 'hsl(var(--success))' : data.score >= 60 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))'}
                                    strokeWidth="16"
                                    fill="none"
                                    strokeDasharray={`${(data.score / 100) * 502.65} 502.65`}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className={`text-5xl font-bold ${getScoreColor(data.score)}`}>
                                    {data.score}
                                </span>
                                <span className="text-muted-foreground">/100</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 text-center lg:text-left space-y-4">
                        <div>
                            <div className="flex items-center gap-3 justify-center lg:justify-start mb-2">
                                <h2>{language === 'sw' ? 'Alama Yako ya Mkopo' : 'Your Credit Score'}</h2>
                                <Badge className={`${getScoreBgColor(data.score)} text-white`}>
                                    {getGradeLabel(data.score)}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground">
                                {language === 'sw'
                                    ? 'Ustahiki wako wa mikopo unaaminika sana'
                                    : 'Your creditworthiness is highly trusted'}
                            </p>
                        </div>
                        <Progress value={data.score} className="h-3" />
                        <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center lg:justify-start">
                            <AgentAvatar agentId="credit" size="sm" />
                            {language === 'sw' ? 'Mshauri wa Mikopo' : 'Credit Advisor'}
                        </div>
                    </div>
                </div>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-success" />
                        <span className="text-muted-foreground text-sm">
                            {language === 'sw' ? 'Mwenendo' : 'Trend'}
                        </span>
                    </div>
                    <p className="text-2xl font-bold text-success">+10</p>
                    <p className="text-xs text-muted-foreground">
                        {language === 'sw' ? 'Miezi 6 iliyopita' : 'Last 6 months'}
                    </p>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground text-sm">
                            {language === 'sw' ? 'Lengo' : 'Target'}
                        </span>
                    </div>
                    <p className="text-2xl font-bold">90+</p>
                    <p className="text-xs text-muted-foreground">
                        {language === 'sw' ? 'Bora Kabisa' : 'Excellent'}
                    </p>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-warning" />
                        <span className="text-muted-foreground text-sm">
                            {language === 'sw' ? 'Sasisha Ijayo' : 'Next Update'}
                        </span>
                    </div>
                    <p className="text-sm font-medium">
                        {data.next_update.toLocaleDateString(language === 'sw' ? 'sw-KE' : 'en-KE', {
                            day: 'numeric',
                            month: 'short'
                        })}
                    </p>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground text-sm">
                            {language === 'sw' ? 'Imesasishwa' : 'Updated'}
                        </span>
                    </div>
                    <p className="text-sm font-medium">
                        {data.last_updated.toLocaleDateString(language === 'sw' ? 'sw-KE' : 'en-KE', {
                            day: 'numeric',
                            month: 'short'
                        })}
                    </p>
                </Card>
            </div>

            {/* Historical Trend Chart */}
            <Card className="p-6">
                <h3 className="mb-4">{language === 'sw' ? 'Mwenendo wa Historia' : 'Historical Trend'}</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data.historical_scores}>
                            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                            <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: '8px'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="score"
                                stroke="hsl(var(--success))"
                                strokeWidth={3}
                                dot={{ fill: 'hsl(var(--success))', r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Score Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Payment History */}
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-success/10 rounded-lg">
                            <CreditCard className={`h-5 w-5 ${getStatusColor(data.breakdown.payment_history.status)}`} />
                        </div>
                        <div className="flex-1">
                            <h4>{language === 'sw' ? 'Historia ya Malipo' : 'Payment History'}</h4>
                            <p className={`text-2xl font-bold ${getScoreColor(data.breakdown.payment_history.score)}`}>
                                {data.breakdown.payment_history.score}/100
                                <span className="text-sm text-muted-foreground ml-2">
                                    ({data.breakdown.payment_history.weight}% {language === 'sw' ? 'uzito' : 'weight'})
                                </span>
                            </p>
                        </div>
                    </div>
                    <Progress value={data.breakdown.payment_history.score} className="mb-4" />
                    <div className="space-y-3">
                        {Object.entries(data.breakdown.payment_history.factors).map(([key, factor]) => (
                            <div key={key} className="text-sm">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-muted-foreground capitalize">
                                        {key.replace(/_/g, ' ')}
                                    </span>
                                    <span className={getScoreColor(factor.score)}>{factor.score}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {language === 'sw' ? factor.detailsSwahili : factor.details}
                                </p>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Financial Stability */}
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-success/10 rounded-lg">
                            <TrendingUp className={`h-5 w-5 ${getStatusColor(data.breakdown.financial_stability.status)}`} />
                        </div>
                        <div className="flex-1">
                            <h4>{language === 'sw' ? 'Uimara wa Kifedha' : 'Financial Stability'}</h4>
                            <p className={`text-2xl font-bold ${getScoreColor(data.breakdown.financial_stability.score)}`}>
                                {data.breakdown.financial_stability.score}/100
                                <span className="text-sm text-muted-foreground ml-2">
                                    ({data.breakdown.financial_stability.weight}% {language === 'sw' ? 'uzito' : 'weight'})
                                </span>
                            </p>
                        </div>
                    </div>
                    <Progress value={data.breakdown.financial_stability.score} className="mb-4" />
                    <div className="space-y-3">
                        {Object.entries(data.breakdown.financial_stability.factors).map(([key, factor]) => (
                            <div key={key} className="text-sm">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-muted-foreground capitalize">
                                        {key.replace(/_/g, ' ')}
                                    </span>
                                    <span className={getScoreColor(factor.score)}>{factor.score}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {language === 'sw' ? factor.detailsSwahili : factor.details}
                                </p>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Business Longevity */}
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-warning/10 rounded-lg">
                            <Clock className={`h-5 w-5 ${getStatusColor(data.breakdown.business_longevity.status)}`} />
                        </div>
                        <div className="flex-1">
                            <h4>{language === 'sw' ? 'Umri wa Biashara' : 'Business Longevity'}</h4>
                            <p className={`text-2xl font-bold ${getScoreColor(data.breakdown.business_longevity.score)}`}>
                                {data.breakdown.business_longevity.score}/100
                                <span className="text-sm text-muted-foreground ml-2">
                                    ({data.breakdown.business_longevity.weight}% {language === 'sw' ? 'uzito' : 'weight'})
                                </span>
                            </p>
                        </div>
                    </div>
                    <Progress value={data.breakdown.business_longevity.score} className="mb-4" />
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                {language === 'sw' ? 'Miaka ya Uendeshaji' : 'Years in Operation'}
                            </span>
                            <span className="font-medium">{data.breakdown.business_longevity.years_in_operation}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {language === 'sw' ? data.breakdown.business_longevity.detailsSwahili : data.breakdown.business_longevity.details}
                        </p>
                    </div>
                </Card>

                {/* Compliance Impact */}
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-success/10 rounded-lg">
                            <CheckCircle className={`h-5 w-5 ${getStatusColor(data.breakdown.compliance_impact.status)}`} />
                        </div>
                        <div className="flex-1">
                            <h4>{language === 'sw' ? 'Athari ya Ufuatiliaji' : 'Compliance Impact'}</h4>
                            <p className={`text-2xl font-bold ${getScoreColor(data.breakdown.compliance_impact.score)}`}>
                                {data.breakdown.compliance_impact.score}/100
                                <span className="text-sm text-muted-foreground ml-2">
                                    ({data.breakdown.compliance_impact.weight}% {language === 'sw' ? 'uzito' : 'weight'})
                                </span>
                            </p>
                        </div>
                    </div>
                    <Progress value={data.breakdown.compliance_impact.score} className="mb-4" />
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                {language === 'sw' ? 'Alama ya Ufuatiliaji' : 'Compliance Score'}
                            </span>
                            <span className="font-medium">{data.breakdown.compliance_impact.compliance_score}/100</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {language === 'sw' ? data.breakdown.compliance_impact.detailsSwahili : data.breakdown.compliance_impact.details}
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-2"
                            onClick={() => onNavigate('/compliance')}
                        >
                            {language === 'sw' ? 'Angalia Ufuatiliaji' : 'View Compliance'}
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Improvement Actions */}
            <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    <h3>{language === 'sw' ? 'Hatua za Kuboresha' : 'Improvement Actions'}</h3>
                </div>
                <Accordion type="single" collapsible className="space-y-4">
                    {data.improvement_actions.map((action) => (
                        <AccordionItem
                            key={action.id}
                            value={action.id}
                            className="border border-border rounded-lg px-4"
                        >
                            <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center gap-4 flex-1 text-left">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 flex-wrap mb-2">
                                            {getPriorityBadge(action.priority)}
                                            <Badge variant="outline" className="text-xs">
                                                {action.category.replace(/_/g, ' ')}
                                            </Badge>
                                        </div>
                                        <p className="font-medium">
                                            {language === 'sw' ? action.actionSwahili : action.action}
                                        </p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                    <div className="p-3 bg-muted/50 rounded-lg">
                                        <p className="text-muted-foreground text-xs mb-1">
                                            {language === 'sw' ? 'Athari' : 'Impact'}
                                        </p>
                                        <p className="font-medium text-success">
                                            {language === 'sw' ? action.impactSwahili : action.impact}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-muted/50 rounded-lg">
                                        <p className="text-muted-foreground text-xs mb-1">
                                            {language === 'sw' ? 'Muda Unaokadirika' : 'Estimated Time'}
                                        </p>
                                        <p className="font-medium">
                                            {language === 'sw' ? action.estimated_time_swahili : action.estimated_time}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">
                                        {language === 'sw' ? 'Maendeleo ya Sasa' : 'Current Progress'}
                                    </p>
                                    <p className="text-sm font-medium">
                                        {language === 'sw' ? action.current_progress_swahili : action.current_progress}
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Card>

            {/* View Loan Readiness */}
            <div className="text-center">
                <Button onClick={() => onNavigate('/loan-readiness')} className="gap-2">
                    {language === 'sw' ? 'Angalia Uwezo wa Mkopo' : 'View Loan Readiness'}
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
