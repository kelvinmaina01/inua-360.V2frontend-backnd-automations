import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useContent } from "../hooks/useContent";
import { ArrowRight, Shield } from 'lucide-react';

// Mobile Welcome Screen Component - Clean Design
function MobileWelcome({ onGetStarted, onLogin, language }: { 
  onGetStarted: () => void, 
  onLogin: () => void,
  language: 'en' | 'sw'
}) {
  const [showContent, setShowContent] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setLogoVisible(true), 300);
    const timer2 = setTimeout(() => setShowContent(true), 800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-orange-500 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute top-1/2 -right-10 w-48 h-48 bg-white/10 rounded-full animate-pulse delay-300" />
        <div className="absolute -bottom-20 left-1/3 w-40 h-40 bg-white/10 rounded-full animate-pulse delay-500" />
      </div>

      {/* Animated logo */}
      <div className={`relative z-10 transition-all duration-1000 ${logoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl mb-8 border border-white/30">
          <span className="text-5xl">💼</span>
        </div>
      </div>

      {/* Welcome content */}
      <div className={`relative z-10 text-center transition-all duration-700 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h1 className="text-4xl font-bold text-white mb-4">
          {language === 'sw' ? 'Karibu Inua360' : 'Welcome to Inua360'}
        </h1>
        <p className="text-white/80 text-lg mb-8 max-w-xs mx-auto">
          {language === 'sw' 
            ? 'Jenga biashara yako na AI - Jua ni lini unatayari kwa mkopo'
            : 'Build Your Business with AI - Know When You\'re Loan-Ready'}
        </p>

        <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
          <Button 
            onClick={onGetStarted}
            className="w-full h-14 text-lg bg-white text-primary hover:bg-white/90 rounded-full shadow-xl font-bold"
          >
            {language === 'sw' ? 'Anza Sasa' : 'Get Started'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button 
            onClick={onLogin}
            variant="outline"
            className="w-full h-12 text-white border-white/30 hover:bg-white/10 rounded-full bg-transparent"
          >
            {language === 'sw' ? 'Ingia' : 'Login'}
          </Button>
        </div>

        {/* Trust indicator */}
        <div className="mt-12 flex items-center justify-center gap-2 text-white/60 text-sm">
          <Shield className="w-4 h-4" />
          <span>{language === 'sw' ? 'Salama na salama' : 'Secure & Trusted'}</span>
        </div>
      </div>

      {/* Version indicator */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <span className="text-white/30 text-xs">v1.0.0</span>
      </div>
    </div>
  );
}

export function LandingPage({ onGetStarted, onLogin }: { onGetStarted: () => void, onLogin: () => void }) {
  const { language } = useContent();

  // Show clean welcome screen - mobile app experience for all devices
  return (
    <MobileWelcome 
      onGetStarted={onGetStarted} 
      onLogin={onLogin}
      language={language}
    />
  );
}
