import { Home, Activity, Wallet, Shield, User, MessageCircle, BarChart3 } from 'lucide-react';
import { cn } from '../lib/utils';

interface BottomNavProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  language: 'en' | 'sw';
}

const NAV_ITEMS = [
  { id: 'home', icon: Home, label: 'Home', labelSw: 'Nyumbani', route: '/' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics', labelSw: 'Takwimu', route: '/analytics' },
  { id: 'money', icon: Wallet, label: 'Money', labelSw: 'Fedha', route: '/money' },
  { id: 'compliance', icon: Shield, label: 'Shield', labelSw: 'Kinga', route: '/compliance' },
  { id: 'profile', icon: User, label: 'Profile', labelSw: 'Wasifu', route: '/profile' },
  { id: 'chat', icon: MessageCircle, label: 'Chat', labelSw: 'Ongea', route: '/chat' }
];

export function BottomNav({ currentRoute, onNavigate, language }: BottomNavProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="grid grid-cols-6 h-16">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.route;
          const label = language === 'sw' ? item.labelSw : item.label;

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