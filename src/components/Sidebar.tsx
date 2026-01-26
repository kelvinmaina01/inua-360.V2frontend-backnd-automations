import { Home, Activity, Wallet, Shield, User, MessageCircle, Settings, Power, BarChart3 } from 'lucide-react';
import { cn } from '../lib/utils';
import { InuaLogo } from './InuaLogo';
import { Switch } from './ui/switch';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  language: 'en' | 'sw';
  autonomyMode: boolean;
  onAutonomyToggle: (enabled: boolean) => void;
}

const NAV_ITEMS = [
  { id: 'home', icon: Home, label: 'Home', labelSw: 'Nyumbani', route: '/' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics', labelSw: 'Takwimu', route: '/analytics' },
  { id: 'feed', icon: Activity, label: 'Agent Feed', labelSw: 'Mawakala', route: '/feed' },
  { id: 'money', icon: Wallet, label: 'Money', labelSw: 'Fedha', route: '/money' },
  { id: 'compliance', icon: Shield, label: 'Compliance', labelSw: 'Kinga', route: '/compliance' },
  { id: 'profile', icon: User, label: 'Profile', labelSw: 'Wasifu', route: '/profile' },
  { id: 'chat', icon: MessageCircle, label: 'Chat', labelSw: 'Ongea', route: '/chat' },
  { id: 'settings', icon: Settings, label: 'Settings', labelSw: 'Mipangilio', route: '/settings' }
];

export function Sidebar({ currentRoute, onNavigate, language, autonomyMode, onAutonomyToggle }: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border h-screen sticky top-0">
      <div className="p-6 border-b border-border">
        <InuaLogo
          size="md"
          showSlogan={true}
          showPulse={autonomyMode}
          language={language}
        />
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.route;
          const label = language === 'sw' ? item.labelSw : item.label;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.route)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors touch-target',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Power className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {language === 'sw' ? 'Hali ya Kujitegemea' : 'Autonomy Mode'}
            </span>
          </div>
          <Switch checked={autonomyMode} onCheckedChange={onAutonomyToggle} />
        </div>
      </div>
    </aside>
  );
}