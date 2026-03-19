import { Home, Activity, Wallet, Shield, User, MessageCircle, Settings, Power, BarChart3 } from 'lucide-react';
import { cn } from '../lib/utils';
import { InuaLogo } from './InuaLogo';
import { Switch } from './ui/switch';
import { useContent } from '../hooks/useContent';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  autonomyMode: boolean;
  onAutonomyToggle: (enabled: boolean) => void;
}

const NAV_ITEMS = [
  { id: 'home', icon: Home, labelKey: 'nav.home', fallback: 'Home', route: '/' },
  { id: 'analytics', icon: BarChart3, labelKey: 'nav.analytics', fallback: 'Analytics', route: '/analytics' },
  { id: 'feed', icon: Activity, labelKey: 'nav.feed', fallback: 'Agent Feed', route: '/feed' },
  { id: 'money', icon: Wallet, labelKey: 'nav.money', fallback: 'Money', route: '/money' },
  { id: 'compliance', icon: Shield, labelKey: 'nav.compliance', fallback: 'Compliance', route: '/compliance' },
  { id: 'profile', icon: User, labelKey: 'nav.profile', fallback: 'Profile', route: '/profile' },
  { id: 'chat', icon: MessageCircle, labelKey: 'nav.chat', fallback: 'Chat', route: '/chat' },
  { id: 'settings', icon: Settings, labelKey: 'nav.settings', fallback: 'Settings', route: '/settings' }
];

export function Sidebar({ currentRoute, onNavigate, autonomyMode, onAutonomyToggle }: SidebarProps) {
  const { language, t } = useContent();

  return (
    <aside className="lg:flex flex-col w-64 bg-card border-r border-border h-screen sticky top-0 max-lg:hidden">
      <div className="p-6 border-b border-border">
        <InuaLogo
          size="md"
          showSlogan={true}
          showPulse={autonomyMode}
        />
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.route;
          const label = t(item.labelKey, item.fallback);

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
              {t('sidebar.autonomy', 'Autonomy Mode')}
            </span>
          </div>
          <Switch checked={autonomyMode} onCheckedChange={onAutonomyToggle} />
        </div>
      </div>
    </aside>
  );
}