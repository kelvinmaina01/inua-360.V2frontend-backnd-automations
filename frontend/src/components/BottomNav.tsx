import { Home, Activity, Wallet, Shield, MessageCircle, BarChart3 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useContent } from '../hooks/useContent';

interface BottomNavProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

const NAV_ITEMS = [
  { id: 'home', icon: Home, labelKey: 'nav.home', fallback: 'Home', route: '/' },
  { id: 'analytics', icon: BarChart3, labelKey: 'nav.analytics', fallback: 'Stats', route: '/analytics' },
  { id: 'money', icon: Wallet, labelKey: 'nav.money', fallback: 'Money', route: '/money' },
  { id: 'compliance', icon: Shield, labelKey: 'nav.compliance', fallback: 'Shield', route: '/compliance' },
  { id: 'chat', icon: MessageCircle, labelKey: 'nav.chat', fallback: 'Chat', route: '/chat' }
];

export function BottomNav({ currentRoute, onNavigate }: BottomNavProps) {
  const { t } = useContent();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-md border-t border-white/20 z-50">
      <div className="grid grid-cols-5 h-14">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.route;
          const label = t(item.labelKey, item.fallback);

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.route)}
              className={cn(
                'flex flex-col items-center justify-center gap-1 transition-colors touch-target',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px]">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}