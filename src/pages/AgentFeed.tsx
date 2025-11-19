import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { AgentAvatar } from '../components/AgentAvatar';
import { AGENTS } from '../lib/constants';
import { MOCK_AGENT_ACTIVITIES } from '../lib/mock-data';
import { Filter, ThumbsUp, Undo, CheckCircle, AlertCircle, Info, Clock } from 'lucide-react';

interface AgentFeedProps {
  language: 'en' | 'sw';
}

export function AgentFeed({ language }: AgentFeedProps) {
  const [filterAgent, setFilterAgent] = useState<string>('all');
  const [reactedActivities, setReactedActivities] = useState<Set<string>>(new Set());

  const handleReaction = (id: string) => {
    setReactedActivities((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredActivities = MOCK_AGENT_ACTIVITIES.filter(
    (activity) => filterAgent === 'all' || activity.agentId === filterAgent
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case 'action_required':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-primary" />;
      default:
        return <Info className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'border-l-success';
      case 'warning':
        return 'border-l-warning';
      case 'action_required':
        return 'border-l-destructive';
      case 'pending':
        return 'border-l-primary';
      default:
        return 'border-l-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1>{language === 'sw' ? 'Shughuli za Mawakala' : 'Agent Feed'}</h1>
          <p className="text-muted-foreground">
            {language === 'sw'
              ? 'Vitendo vyote vya mawakala wako wa AI'
              : 'All your AI agent activities'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filterAgent} onValueChange={setFilterAgent}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {language === 'sw' ? 'Mawakala Wote' : 'All Agents'}
              </SelectItem>
              {AGENTS.map((agent) => (
                <SelectItem key={agent.id} value={agent.id}>
                  {language === 'sw' ? agent.nameSwahili : agent.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Agent Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {AGENTS.map((agent) => (
          <Card
            key={agent.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
              filterAgent === agent.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setFilterAgent(filterAgent === agent.id ? 'all' : agent.id)}
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <AgentAvatar agentId={agent.id} size="md" status={agent.status} showPulse />
              <div>
                <p className="text-xs">
                  {language === 'sw' ? agent.nameSwahili : agent.name}
                </p>
                <Badge
                  variant={agent.status === 'active' ? 'default' : 'secondary'}
                  className="text-[10px] mt-1"
                >
                  {language === 'sw'
                    ? agent.status === 'active'
                      ? 'Hai'
                      : 'Tulia'
                    : agent.status}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="space-y-4">
        {filteredActivities.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">
              {language === 'sw'
                ? 'Hakuna shughuli za kuonyesha'
                : 'No activities to show'}
            </p>
          </Card>
        ) : (
          <>
            {filteredActivities.map((activity) => {
              const agent = AGENTS.find((a) => a.id === activity.agentId);
              const timeStr = new Date(activity.timestamp).toLocaleString(
                language === 'sw' ? 'sw-KE' : 'en-KE',
                {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }
              );

              return (
                <Card
                  key={activity.id}
                  className={`p-6 border-l-4 ${getStatusColor(activity.status)} receipt-slide`}
                >
                  <div className="flex items-start gap-4">
                    <AgentAvatar agentId={activity.agentId} size="md" status="active" />
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h4>
                              {language === 'sw' ? activity.titleSwahili : activity.title}
                            </h4>
                            {getStatusIcon(activity.status)}
                          </div>
                          <p className="text-muted-foreground">
                            {language === 'sw'
                              ? activity.descriptionSwahili
                              : activity.description}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {timeStr}
                        </span>
                      </div>

                      {/* Metadata */}
                      {activity.metadata && (
                        <div className="flex flex-wrap gap-2">
                          {activity.metadata.matchScore && (
                            <Badge variant="secondary">
                              {activity.metadata.matchScore}% {language === 'sw' ? 'Ufanani' : 'Match'}
                            </Badge>
                          )}
                          {activity.metadata.amount && (
                            <Badge variant="secondary">
                              KES {activity.metadata.amount.toLocaleString()}
                            </Badge>
                          )}
                          {activity.metadata.daysLeft !== undefined && (
                            <Badge variant="destructive">
                              {activity.metadata.daysLeft} {language === 'sw' ? 'siku zimebaki' : 'days left'}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-2 border-t border-border">
                        <Button
                          variant={reactedActivities.has(activity.id) ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => handleReaction(activity.id)}
                          className="gap-2"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          {reactedActivities.has(activity.id)
                            ? language === 'sw'
                              ? 'Imependwa'
                              : 'Liked'
                            : language === 'sw'
                              ? 'Penda'
                              : 'Like'}
                        </Button>
                        {activity.actionable && (
                          <Button variant="outline" size="sm" className="gap-2">
                            <Undo className="h-4 w-4" />
                            {language === 'sw' ? 'Tendua' : 'Undo'}
                          </Button>
                        )}
                        {activity.actionable && activity.status === 'action_required' && (
                          <Button size="sm" className="ml-auto gap-2">
                            {language === 'sw' ? 'Kagua & Uidhinishe' : 'Review & Approve'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Agent Attribution */}
                  <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{language === 'sw' ? 'Wakala:' : 'Agent:'}</span>
                    <span>{language === 'sw' ? agent?.nameSwahili : agent?.name}</span>
                  </div>
                </Card>
              );
            })}
          </>
        )}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">
          {language === 'sw' ? 'Pakia Zaidi' : 'Load More'}
        </Button>
      </div>
    </div>
  );
}
