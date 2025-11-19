import { Bot, Shield, Wallet, TrendingUp, FileText, Cpu, UserCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface AgentAvatarProps {
  agentId: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'active' | 'idle';
  showPulse?: boolean;
}

const AGENT_ICONS = {
  profile: UserCircle,
  compliance: Shield,
  funding: Wallet,
  cashflow: TrendingUp,
  application: FileText,
  supervisor: Cpu
};

const AGENT_COLORS = {
  profile: 'hsl(13 100% 54%)',
  compliance: 'hsl(145 63% 49%)',
  funding: 'hsl(48 100% 52%)',
  cashflow: 'hsl(211 100% 50%)',
  application: 'hsl(32 100% 50%)',
  supervisor: 'hsl(13 100% 54%)'
};

export function AgentAvatar({ agentId, size = 'md', status = 'idle', showPulse = false }: AgentAvatarProps) {
  const Icon = AGENT_ICONS[agentId as keyof typeof AGENT_ICONS] || Bot;
  const color = AGENT_COLORS[agentId as keyof typeof AGENT_COLORS];

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className="relative inline-flex">
      <div
        className={cn(
          'rounded-full flex items-center justify-center',
          sizeClasses[size],
          showPulse && status === 'active' && 'agent-pulse'
        )}
        style={{ backgroundColor: color + '20', color: color }}
      >
        <Icon className={iconSizes[size]} />
      </div>
      {status === 'active' && (
        <div
          className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background"
          style={{ backgroundColor: color }}
        />
      )}
    </div>
  );
}