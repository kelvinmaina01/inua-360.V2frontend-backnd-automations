import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { AgentAvatar } from '../components/AgentAvatar';
import { 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Clock, 
  TrendingUp,
  Shield,
  Wallet,
  XCircle,
  Check
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error' | 'action';
  title: string;
  titleSwahili: string;
  message: string;
  messageSwahili: string;
  timestamp: Date;
  read: boolean;
  agentId?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'KRA TCC Validated',
    titleSwahili: 'Cheti cha KRA Kimethibitishwa',
    message: 'Tax Compliance Certificate is valid until March 2026',
    messageSwahili: 'Cheti cha Kodi ni halali hadi Machi 2026',
    timestamp: new Date('2025-11-18T09:14:00'),
    read: false,
    agentId: 'compliance'
  },
  {
    id: '2',
    type: 'action',
    title: 'Application Submitted',
    titleSwahili: 'Ombi Limewasilishwa',
    message: 'Women Fund application submitted - 96% match',
    messageSwahili: 'Ombi la Mfuko wa Wanawake limewasilishwa - ufanani 96%',
    timestamp: new Date('2025-11-17T16:45:00'),
    read: false,
    agentId: 'funding'
  },
  {
    id: '3',
    type: 'warning',
    title: 'License Expiring Soon',
    titleSwahili: 'Leseni Inaisha Hivi Karibuni',
    message: 'Nairobi business license expires in 4 days',
    messageSwahili: 'Leseni ya biashara ya Nairobi inaisha kwa siku 4',
    timestamp: new Date('2025-11-17T10:00:00'),
    read: false,
    agentId: 'compliance'
  },
  {
    id: '4',
    type: 'success',
    title: 'Profile Updated',
    titleSwahili: 'Wasifu Umesasishwa',
    message: 'Auto-synced revenue data from M-Pesa',
    messageSwahili: 'Data ya mapato imepangwa kiotomatiki kutoka M-Pesa',
    timestamp: new Date('2025-11-17T14:20:00'),
    read: true,
    agentId: 'profile'
  },
  {
    id: '5',
    type: 'info',
    title: 'Cash Flow Forecast',
    titleSwahili: 'Utabiri wa Mtiririko wa Fedha',
    message: 'KES 800k gap predicted for January 2026',
    messageSwahili: 'Pengo la KES 800k limebirika kwa Januari 2026',
    timestamp: new Date('2025-11-17T06:00:00'),
    read: true,
    agentId: 'cashflow'
  },
  {
    id: '6',
    type: 'success',
    title: 'Funding Match Found',
    titleSwahili: 'Fursa ya Fedha Imepatikana',
    message: 'Google AfCFTA Grant - 94% match',
    messageSwahili: 'Ruzuku ya Google AfCFTA - ufanani 94%',
    timestamp: new Date('2025-11-16T11:30:00'),
    read: true,
    agentId: 'funding'
  },
  {
    id: '7',
    type: 'error',
    title: 'NHIF Not Registered',
    titleSwahili: 'Haijasajiliwa NHIF',
    message: 'NHIF registration is required for compliance',
    messageSwahili: 'Usajili wa NHIF unahitajika kwa ufuatiliaji',
    timestamp: new Date('2025-11-15T08:00:00'),
    read: true,
    agentId: 'compliance'
  },
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case 'warning':
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    case 'error':
      return <XCircle className="w-5 h-5 text-red-500" />;
    case 'action':
      return <TrendingUp className="w-5 h-5 text-blue-500" />;
    default:
      return <Info className="w-5 h-5 text-blue-400" />;
  }
};

const getNotificationBg = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return 'bg-green-500/20 border-green-500/30';
    case 'warning':
      return 'bg-yellow-500/20 border-yellow-500/30';
    case 'error':
      return 'bg-red-500/20 border-red-500/30';
    case 'action':
      return 'bg-blue-500/20 border-blue-500/30';
    default:
      return 'bg-blue-500/20 border-blue-500/30';
  }
};

export function Notifications({ language = 'en' }: { language?: 'en' | 'sw' }) {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return language === 'sw' ? `${days} siku iliyopita` : `${days}d ago`;
    }
    if (hours > 0) {
      return language === 'sw' ? `${hours} saa iliyopita` : `${hours}h ago`;
    }
    return language === 'sw' ? 'Sasa hivi' : 'Just now';
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {language === 'sw' ? 'Arifa' : 'Notifications'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {unreadCount} {language === 'sw' ? 'isishio' : 'unread'}
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={markAllAsRead}
          className="text-primary"
        >
          <Check className="w-4 h-4 mr-1" />
          {language === 'sw' ? 'Washa zote' : 'Mark all read'}
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
          className="rounded-full"
        >
          {language === 'sw' ? 'Zote' : 'All'}
        </Button>
        <Button
          variant={filter === 'unread' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('unread')}
          className="rounded-full"
        >
          {language === 'sw' ? 'Isiziosome' : 'Unread'}
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Notifications List - Glassmorphism Cards */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => markAsRead(notification.id)}
            className={`
              relative overflow-hidden
              backdrop-blur-xl bg-white/10 
              border rounded-2xl p-4 
              transition-all duration-300 cursor-pointer
              hover:bg-white/15
              ${!notification.read ? 'ring-2 ring-primary/30' : 'opacity-80'}
              ${getNotificationBg(notification.type)}
            `}
          >
            {/* Glass overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
            
            <div className="relative flex gap-3">
              {/* Icon */}
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                bg-white/10 backdrop-blur-sm
              `}>
                {notification.agentId ? (
                  <AgentAvatar agentId={notification.agentId} size="sm" />
                ) : (
                  getNotificationIcon(notification.type)
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-foreground text-sm">
                    {language === 'sw' ? notification.titleSwahili : notification.title}
                  </h3>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {language === 'sw' ? notification.messageSwahili : notification.message}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground/70">
                  <Clock className="w-3 h-3" />
                  {formatTime(notification.timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">
            {language === 'sw' ? 'Hakuna arifa' : 'No notifications'}
          </p>
        </div>
      )}
    </div>
  );
}
