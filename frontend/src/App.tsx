import { useState, useEffect } from 'react';
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
import { Button } from './components/ui/button';
import { Wifi, WifiOff, Menu } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('/');
  const [language, setLanguage] = useState<'en' | 'sw'>('en');
  const [darkMode, setDarkMode] = useState(false);
  const [autonomyMode, setAutonomyMode] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Simulate online/offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success(
        language === 'sw' ? 'Umerudi mtandaoni' : 'Back online',
        {
          description:
            language === 'sw'
              ? 'Data inasawazishwa...'
              : 'Syncing data...',
          duration: 3000
        }
      );
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.warning(
        language === 'sw' ? 'Nje ya mtandao' : 'You are offline',
        {
          description:
            language === 'sw'
              ? 'Unaweza kuendelea kutumia programu'
              : 'You can continue using the app',
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
        language === 'sw' ? 'Hali ya Kujitegemea Imewashwa' : 'Autonomy Mode Enabled',
        {
          description:
            language === 'sw'
              ? 'Mawakala wako sasa wanafanya kazi kwa niaba yako'
              : 'Your agents are now working on your behalf',
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
      data.language === 'sw' ? 'Karibu Inua 360!' : 'Welcome to Inua 360!',
      {
        description:
          data.language === 'sw'
            ? 'Wasifu wako umeundwa. Mawakala wako wanaanza kazi!'
            : 'Your profile is ready. Your agents are getting to work!',
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
      lang === 'sw' ? 'Lugha imebadilishwa' : 'Language changed',
      {
        description: lang === 'sw' ? 'Swahili' : 'English',
        duration: 2000
      }
    );
  };

  const handleDarkModeToggle = (enabled: boolean) => {
    setDarkMode(enabled);
    toast.success(
      language === 'sw'
        ? enabled
          ? 'Hali ya Giza Imewashwa'
          : 'Hali ya Giza Imezimwa'
        : enabled
          ? 'Dark Mode Enabled'
          : 'Dark Mode Disabled',
      { duration: 2000 }
    );
  };

  const handleAutonomyToggle = (enabled: boolean) => {
    setAutonomyMode(enabled);
  };

  const handleLogout = () => {
    setHasCompletedOnboarding(false);
    setCurrentRoute('/');
    setAutonomyMode(false); // Reset autonomy mode

    toast.success(
      language === 'sw' ? 'Umeondoka kikamilifu' : 'Logged out successfully',
      { duration: 2000 }
    );
  };

  // Show onboarding if not completed
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
          language={language}
          autonomyMode={autonomyMode}
          onAutonomyToggle={handleAutonomyToggle}
        />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Mobile Header */}
          <header className="lg:hidden sticky top-0 z-40 bg-card border-b border-border">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <h2 className="text-primary">Inua 360</h2>
              </div>
              <div className="flex items-center gap-2">
                {!isOnline && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <WifiOff className="h-4 w-4" />
                  </div>
                )}
                <LanguageSwitcher language={language} onLanguageChange={handleLanguageChange} />
              </div>
            </div>
          </header>

          {/* Desktop Header */}
          <header className="hidden lg:flex items-center justify-between p-6 border-b border-border sticky top-0 z-40 bg-background">
            <div className="flex items-center gap-4">
              <h2 className="text-muted-foreground">
                {currentRoute === '/'
                  ? language === 'sw'
                    ? 'Dashibodi'
                    : 'Dashboard'
                  : currentRoute === '/analytics'
                    ? language === 'sw'
                      ? 'Mawasiliano'
                      : 'Analytics'
                    : currentRoute === '/feed'
                      ? language === 'sw'
                        ? 'Shughuli za Mawakala'
                        : 'Agent Feed'
                      : currentRoute === '/money'
                        ? language === 'sw'
                          ? 'Fedha'
                          : 'Money'
                        : currentRoute === '/loan-readiness'
                          ? language === 'sw'
                            ? 'Uwezo wa Mkopo'
                            : 'Loan Readiness'
                          : currentRoute === '/connect-mpesa'
                            ? language === 'sw'
                              ? 'Unganisha M-Pesa'
                              : 'Connect M-Pesa'
                            : currentRoute === '/compliance'
                              ? language === 'sw'
                                ? 'Kinga'
                                : 'Compliance'
                              : currentRoute === '/credit-score'
                                ? language === 'sw'
                                  ? 'Alama ya Mkopo'
                                  : 'Credit Score'
                                : currentRoute === '/profile'
                                  ? language === 'sw'
                                    ? 'Wasifu'
                                    : 'Profile'
                                  : currentRoute === '/chat'
                                    ? language === 'sw'
                                      ? 'Ongea'
                                      : 'Chat'
                                    : language === 'sw'
                                      ? 'Mipangilio'
                                      : 'Settings'}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              {isOnline ? (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Wifi className="h-4 w-4 text-success" />
                  <span>{language === 'sw' ? 'Mtandaoni' : 'Online'}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <WifiOff className="h-4 w-4 text-destructive" />
                  <span>{language === 'sw' ? 'Nje ya Mtandao' : 'Offline'}</span>
                </div>
              )}
              <LanguageSwitcher language={language} onLanguageChange={handleLanguageChange} />
            </div>
          </header>

          {/* Page Content */}
          <main className="p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
            <div className="max-w-7xl mx-auto">{renderPage()}</div>
          </main>

          {/* Mobile Bottom Navigation */}
          <BottomNav currentRoute={currentRoute} onNavigate={handleNavigate} language={language} />
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster />

      {/* PWA Install Prompt (would be triggered by browser) */}
      {/* This is just a visual placeholder */}
    </div>
  );
}