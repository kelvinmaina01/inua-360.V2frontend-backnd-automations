import { useState, useEffect } from 'react';
import { useContent } from './hooks/useContent';
import { useAuth } from './contexts/AuthContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { BottomNav } from './components/BottomNav';
import { Sidebar } from './components/Sidebar';
import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { Analytics } from './pages/Analytics';
import { AgentFeed } from './pages/AgentFeed';
import { Money } from './pages/Money';
import { LoanReadiness } from './pages/LoanReadiness';
import { ConnectMpesa } from './pages/ConnectMpesa';
import { Compliance } from './pages/Compliance';
import { CreditScore } from './pages/CreditScore';
import { Profile } from './pages/Profile';
import { Chat } from './pages/Chat';
import { Settings } from './pages/Settings';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/Auth';
import { Notifications } from './pages/Notifications';
import { InuaLogo } from './components/InuaLogo';
import { Button } from './components/ui/button';
import { Wifi, WifiOff, Menu, Loader2, Bell, User } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

export default function App() {
  const { language, setLanguage, t } = useContent();
  const { user, firebaseUser, loading: authLoading, signOut: firebaseSignOutAuth } = useAuth();
  const [showLanding, setShowLanding] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('/');

  const [darkMode, setDarkMode] = useState(false);
  const [autonomyMode, setAutonomyMode] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Sync onboarding status with user profile
  useEffect(() => {
    if (user) {
      setHasCompletedOnboarding(user.hasCompletedOnboarding || false);
    }
  }, [user]);

  // Simulate online/offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success(
        t('notifications.online', 'Back online'),
        {
          description: t('notifications.syncing', 'Syncing data...'),
          duration: 3000
        }
      );
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.warning(
        t('notifications.offline', 'You are offline'),
        {
          description: t('notifications.offline_desc', 'You can continue using the app'),
          duration: 5000
        }
      );
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [language]);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Show welcome toast when autonomy changes
  useEffect(() => {
    if (hasCompletedOnboarding && autonomyMode) {
      toast.success(
        t('notifications.autonomy_on', 'Autonomy Mode Enabled'),
        {
          description: t('notifications.autonomy_on_desc', 'Your agents are now working on your behalf'),
          duration: 4000
        }
      );
    }
  }, [autonomyMode, hasCompletedOnboarding, language]);

  const handleOnboardingComplete = (data: any) => {
    setLanguage(data.language || 'en');
    setAutonomyMode(data.autonomyEnabled);
    setHasCompletedOnboarding(true);

    toast.success(
      t('notifications.welcome', 'Welcome to Inua360!'),
      {
        description: t('notifications.welcome_desc', 'Your profile is ready. Your agents are getting to work!'),
        duration: 5000
      }
    );
  };

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
    setShowMobileMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLanguageChange = (lang: 'en' | 'sw') => {
    setLanguage(lang);
    toast.success(
      t('notifications.language_changed', 'Language changed'),
      {
        description: lang === 'sw' ? 'Kiswahili' : 'English',
        duration: 2000
      }
    );
  };

  const handleDarkModeToggle = (enabled: boolean) => {
    setDarkMode(enabled);
    toast.success(
      enabled
        ? t('notifications.dark_mode_enabled', 'Dark Mode Enabled')
        : t('notifications.dark_mode_disabled', 'Dark Mode Disabled'),
      { duration: 2000 }
    );
  };

  const handleAutonomyToggle = (enabled: boolean) => {
    setAutonomyMode(enabled);
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOutAuth();
      setHasCompletedOnboarding(false);
      setShowLanding(true);
      setCurrentRoute('/');
      setAutonomyMode(false); // Reset autonomy mode

      toast.success(
        t('notifications.logged_out', 'Logged out successfully'),
        { duration: 2000 }
      );
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  // 1. Splash Screen / Loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <InuaLogo size="lg" className="mb-8 animate-pulse" />
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // 2. Show Landing Page if not yet entered
  if (showLanding && !firebaseUser) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} onLogin={() => setShowLanding(false)} />;
  }

  // 3. Show Auth Page if not logged in
  if (!firebaseUser) {
    return (
      <>
        <AuthPage />
        <Toaster />
      </>
    );
  }

  // 4. Show onboarding if entering for the first time
  if (!hasCompletedOnboarding) {
    return (
      <>
        <Onboarding onComplete={handleOnboardingComplete} />
        <Toaster />
      </>
    );
  }

  // Render current page
  const renderPage = () => {
    switch (currentRoute) {
      case '/':
        return <Home language={language} onNavigate={handleNavigate} isOnline={isOnline} />;
      case '/analytics':
        return <Analytics language={language} onNavigate={handleNavigate} />;
      case '/feed':
        return <AgentFeed language={language} />;
      case '/money':
        return <Money language={language} onNavigate={handleNavigate} />;
      case '/loan-readiness':
        return <LoanReadiness language={language} onNavigate={handleNavigate} />;
      case '/connect-mpesa':
        return <ConnectMpesa language={language} onNavigate={handleNavigate} />;
      case '/compliance':
        return <Compliance language={language} onNavigate={handleNavigate} />;
      case '/credit-score':
        return <CreditScore language={language} onNavigate={handleNavigate} />;
      case '/notifications':
        return <Notifications language={language} />;
      case '/profile':
        return <Profile language={language} />;
      case '/chat':
        return <Chat language={language} onNavigate={handleNavigate} />;
      case '/settings':
        return (
          <Settings
            language={language}
            darkMode={darkMode}
            onLanguageChange={handleLanguageChange}
            onDarkModeToggle={handleDarkModeToggle}
            onLogout={handleLogout}
          />
        );
      default:
        return <Home language={language} onNavigate={handleNavigate} isOnline={isOnline} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          autonomyMode={autonomyMode}
          onAutonomyToggle={handleAutonomyToggle}
        />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Mobile Header - Glassmorphism */}
          <header className="lg:hidden sticky top-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-black/50 border-b border-white/20">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <h2 className="text-primary font-bold">Inua360</h2>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentRoute('/notifications')}
                  className="hover:bg-white/50 rounded-full"
                >
                  <Bell className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentRoute('/profile')}
                  className="hover:bg-white/50 rounded-full"
                >
                  <User className="h-5 w-5" />
                </Button>
                <LanguageSwitcher />
              </div>
            </div>
          </header>

          {/* Desktop Header */}
          <header className="lg:flex items-center justify-between p-6 border-b border-border sticky top-0 z-40 bg-background max-lg:hidden">
            <div className="flex items-center gap-4">
              <h2 className="text-muted-foreground">
                {currentRoute === '/'
                  ? t('nav.dashboard', 'Dashboard')
                  : currentRoute === '/analytics'
                    ? t('nav.analytics', 'Analytics')
                    : currentRoute === '/feed'
                      ? t('nav.feed', 'Agent Feed')
                      : currentRoute === '/money'
                        ? t('nav.money', 'Money')
                        : currentRoute === '/loan-readiness'
                          ? t('nav.loan_readiness', 'Loan Readiness')
                          : currentRoute === '/connect-mpesa'
                            ? t('nav.connect_mpesa', 'Connect M-Pesa')
                            : currentRoute === '/compliance'
                              ? t('nav.compliance', 'Compliance')
                              : currentRoute === '/credit-score'
                                ? t('nav.credit_score', 'Credit Score')
                                : currentRoute === '/profile'
                                  ? t('nav.profile', 'Profile')
                                  : currentRoute === '/chat'
                                    ? t('nav.chat', 'Chat')
                                    : t('nav.settings', 'Settings')}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              {isOnline ? (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Wifi className="h-4 w-4 text-success" />
                  <span>{t('status.online', 'Online')}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <WifiOff className="h-4 w-4 text-destructive" />
                  <span>{t('status.offline', 'Offline')}</span>
                </div>
              )}
              <LanguageSwitcher />
            </div>
          </header>

          {/* Page Content - Glassmorphism for mobile */}
          <main className="lg:px-4 pb-28 lg:pb-8">
            <div className="max-w-7xl mx-auto">{renderPage()}</div>
          </main>

          {/* Mobile Bottom Navigation */}
          <BottomNav currentRoute={currentRoute} onNavigate={handleNavigate} />
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster />

      {/* PWA Install Prompt (would be triggered by browser) */}
      {/* This is just a visual placeholder */}
    </div>
  );
}