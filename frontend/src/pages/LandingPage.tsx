import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { InuaLogo } from "../components/InuaLogo";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useContent } from "../hooks/useContent";
import { 
  ArrowRight, 
  TrendingUp, 
  Shield, 
  Wallet, 
  Users, 
  Building2, 
  BarChart3,
  CheckCircle2,
  Star,
  Handshake,
  Landmark,
  Target,
  Zap,
  Globe,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { Card, CardContent } from "../components/ui/card";

// Hook to detect mobile view
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

// Mobile Welcome Screen Component
function MobileWelcome({ onGetStarted, onLogin, language }: { 
  onGetStarted: () => void, 
  onLogin: () => void,
  language: 'en' | 'sw'
}) {
  const [showContent, setShowContent] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    // Animation sequence
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
        <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl mb-8 animate-bounce">
          <span className="text-5xl">🚀</span>
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
  const { t, language } = useContent();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<'sme' | 'lender'>('sme');

  // Show mobile welcome screen on mobile devices
  if (isMobile) {
    return (
      <MobileWelcome 
        onGetStarted={onGetStarted} 
        onLogin={onLogin}
        language={language}
      />
    );
  }

  const stats = [
    { value: "50,000+", label: language === 'sw' ? 'SME zilizosajiliwa' : 'SMEs Registered', icon: Building2 },
    { value: "KES 2B+", label: language === 'sw' ? 'Mikopo Iliyopatikana' : 'Loans Facilitated', icon: Wallet },
    { value: "94%", label: language === 'sw' ? 'Kiwango cha Upatanifu' : 'Compliance Rate', icon: Shield },
    { value: "200+", label: language === 'sw' ? 'Watoa Huduma' : 'Partner Lenders', icon: Handshake },
  ];

  const smeFeatures = [
    {
      icon: BarChart3,
      title: language === 'sw' ? 'Afya ya Biashara' : 'Business Health Score',
      desc: language === 'sw' 
        ? 'Pata alama ya kina ya afya ya biashara yako kiotomatiki'
        : 'Get a comprehensive health score for your business automatically',
      color: 'bg-green-500'
    },
    {
      icon: Shield,
      title: language === 'sw' ? 'Kufuatilia Sheria' : 'Compliance Tracking',
      desc: language === 'sw'
        ? 'Wakati wako binafsi wa kufuatilia leseni na vibali'
        : 'Automated tracking of all your licenses and permits',
      color: 'bg-blue-500'
    },
    {
      icon: Wallet,
      title: language === 'sw' ? 'Uwezo wa Mkopo' : 'Funding Readiness',
      desc: language === 'sw'
        ? 'jua ni lini biashara yako imeiva kwa mkopo'
        : 'Know exactly when your business is loan-ready',
      color: 'bg-orange-500'
    },
    {
      icon: TrendingUp,
      title: language === 'sw' ? 'Utabiri wa Fedha' : 'Cash Flow Forecasting',
      desc: language === 'sw'
        ? 'agari utabiri wa mapato na matumishi ya baadaye'
        : 'AI-powered predictions of future income and expenses',
      color: 'bg-purple-500'
    },
    {
      icon: Users,
      title: language === 'sw' ? 'Mawakala wa AI' : 'AI Agents',
      desc: language === 'sw'
        ? 'Wakala 8 wa AI wanaofanya kazi kwa ajili yako 24/7'
        : '8 AI agents working for you around the clock',
      color: 'bg-teal-500'
    },
    {
      icon: Target,
      title: language === 'sw' ? 'Kulinganisha na Ruzuku' : 'Funding Matching',
      desc: language === 'sw'
        ? 'linganishwa kiotomatiki na fursa bora za ufadhili'
        : 'Auto-matched with the best funding opportunities',
      color: 'bg-red-500'
    },
  ];

  const lenderBenefits = [
    {
      icon: Shield,
      title: language === 'sw' ? 'Data ya Kikamilifu' : 'Comprehensive Data',
      desc: language === 'sw'
        ? 'Fungua data za kina za SME kutoka M-Pesa, KRA, na vyanzo vingine'
        : 'Access deep SME data from M-Pesa, KRA, and other sources',
    },
    {
      icon: BarChart3,
      title: language === 'sw' ? 'Tathmini ya Hatari' : 'Risk Assessment',
      desc: language === 'sw'
        ? 'Alama za kiotomatiki za kuthibiti hatari na uwezo wa kulipa'
        : 'Automated risk and creditworthiness scoring',
    },
    {
      icon: CheckCircle2,
      title: language === 'sw' ? 'SME Zilizothibitishwa' : 'Vetted SMEs',
      desc: language === 'sw'
        ? 'Tuunganishe na SME zilizo thibitishwa na zilizo tayari kwa mkopo'
        : 'Connect with pre-vetted, loan-ready SMEs',
    },
    {
      icon: Zap,
      title: language === 'sw' ? 'Mchakato wa Haraka' : 'Fast Processing',
      desc: language === 'sw'
        ? 'Punguza muda wa Uchukuaji mkopo kwa asilimia 70'
        : 'Reduce loan processing time by up to 70%',
    },
    {
      icon: Globe,
      title: language === 'sw' ? 'Ufikiaji wa Masoko' : 'Market Access',
      desc: language === 'sw'
        ? 'Fungua masoko mapya ya SME kote Kenya'
        : 'Access new SME markets across Kenya',
    },
    {
      icon: Handshake,
      title: language === 'sw' ? 'Mshirika wa Kudumu' : 'Long-term Partner',
      desc: language === 'sw'
        ? 'Jenga uhusiano wa muda mrefu na wateja wako'
        : 'Build long-term relationships with your customers',
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: language === 'sw' ? 'Jiunge na Inua360' : 'Join Inua360',
      desc: language === 'sw'
        ? 'Sajili biashara yako na uunganishe akaunti ya M-Pesa'
        : 'Register your business and connect your M-Pesa account',
    },
    {
      step: "02",
      title: language === 'sw' ? 'Wakala wanafanya kazi' : 'AI Agents Work',
      desc: language === 'sw'
        ? 'Wakala wetu wa AI hujenga wasifu wako na kufuatilia ufuatiliaji wako'
        : 'Our AI agents build your profile and monitor compliance',
    },
    {
      step: "03",
      title: language === 'sw' ? 'Pata Upatanifu' : 'Get Compliant',
      desc: language === 'sw'
        ? 'Pata arifa za wakati na usaidizi wa kusasisha leseni zako'
        : 'Get real-time alerts and help renew your licenses',
    },
    {
      step: "04",
      title: language === 'sw' ? 'Pata Ruzuku' : 'Get Funded',
      desc: language === 'sw'
        ? 'Lingana na fursa bora za ufadhili na omba mkopo'
        : 'Match with the best funding opportunities and apply',
    },
  ];

  const testimonials = [
    {
      name: "Grace Wanjiku",
      role: language === 'sw' ? 'Mwenye Biashara' : 'Business Owner',
      business: "Mama Fua Laundry",
      quote: language === 'sw'
        ? 'Inua360 ilinisaidia kugundua kwamba nilikuwa tayari kwa mkopo. Sasa nina mkopo wa KES 500,000!'
        : 'Inua360 helped me discover I was ready for a loan. Now I have a KES 500,000 loan!',
      rating: 5,
    },
    {
      name: "James Otieno",
      role: language === 'sw' ? 'Mwenye Duka' : 'Shop Owner',
      business: "Otieno Wholesale",
      quote: language === 'sw'
        ? 'Wakala wa ufuatiliaji wamenisaidia kurekebisha leseni yangu kabla ya kuisha. Asante Inua360!'
        : 'The compliance agent helped me renew my license before it expired. Thank you Inua360!',
      rating: 5,
    },
    {
      name: "Sarah Kamau",
      role: language === 'sw' ? 'Mjasiriamali' : 'Entrepreneur',
      business: "Kamau Foods",
      quote: language === 'sw'
        ? 'Nimepata ruzuku ya KES 1M kupitia jukwaa. Haiwezekani bila Inua360!'
        : 'Got a KES 1M grant through the platform. Impossible without Inua360!',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <InuaLogo size="sm" showSlogan={false} />
              <span className="text-xl font-bold text-foreground">Inua360</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {language === 'sw' ? 'Jinsi inavyofanya kazi' : 'How It Works'}
              </a>
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {language === 'sw' ? 'Vipengele' : 'Features'}
              </a>
              <a href="#for-lenders" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {language === 'sw' ? 'Kwa Watoa Mikopo' : 'For Lenders'}
              </a>
              <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {language === 'sw' ? 'Maoni' : 'Testimonials'}
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Button variant="ghost" onClick={onLogin} className="hidden sm:inline-flex">
                {language === 'sw' ? 'Ingia' : 'Login'}
              </Button>
              <Button onClick={onGetStarted} className="shadow-lg shadow-primary/25">
                {language === 'sw' ? 'Anza Sasa' : 'Get Started'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {language === 'sw' ? 'Mfumo wa Kwanza wa AI kwa SME huko Kenya' : "Kenya's First AI Platform for SMEs"}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              {language === 'sw' ? 'Fanya Biashara Yako Iwe' : 'Make Your Business'}
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500">
                {language === 'sw' ? 'Tayari kwa Mikopo' : 'Loan-Ready with AI'}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              {language === 'sw'
                ? 'Jenga wasifu wa kina wa biashara, futilia ufuatiliaji kiotomatiki, na lingana na fursa bora za ufadhili. Inua360 inafanya kazi kwa ajili yako 24/7.'
                : 'Build a comprehensive business profile, automate compliance tracking, and match with the best funding opportunities. Inua360 works for you 24/7.'}
            </p>

            {/* User Type Toggle */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
              <Button
                size="lg"
                onClick={onGetStarted}
                className={`w-full sm:w-auto text-lg px-8 h-14 rounded-full shadow-lg hover:shadow-xl transition-all ${
                  activeTab === 'sme' 
                    ? 'bg-primary shadow-primary/25' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                <Building2 className="w-5 h-5 mr-2" />
                {language === 'sw' ? 'SME: Anza Hapa' : 'SME: Start Here'}
              </Button>
              <Button
                size="lg"
                variant={activeTab === 'lender' ? 'default' : 'outline'}
                onClick={() => {
                  const lenderSection = document.getElementById('for-lenders');
                  if (lenderSection) {
                    lenderSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full sm:w-auto text-lg px-8 h-14 rounded-full"
              >
                <Landmark className="w-5 h-5 mr-2" />
                {language === 'sw' ? 'Mtoaji Mikopo: Jenga Partner' : 'Lender: Partner With Us'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {language === 'sw' ? 'Inavyofanya kazi' : 'How It Works'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'sw'
                ? 'Ndio mchakato rahisi wa kufanya biashara yako iwe tayari kwa mkopo'
                : 'The simple 4-step process to make your business loan-ready'}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-card border border-border rounded-2xl p-6 h-full">
                  <div className="text-5xl font-bold text-primary/20 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features for SMEs */}
      <section id="features" className="py-20 lg:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {language === 'sw' ? 'Kwa Biashara Ndogo' : 'For Small Businesses'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'sw'
                ? 'Vipengele vilivyoundwa kusaidia biashara ndogo za Kenya kukua'
                : 'Features designed to help Kenyan SMEs grow'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {smeFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-border/50">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" onClick={onGetStarted} className="rounded-full px-8 h-12 text-lg shadow-lg shadow-primary/25">
              {language === 'sw' ? 'Anza Sasa - Ni Bure' : 'Start Now - It\'s Free'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* For Lenders Section */}
      <section id="for-lenders" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-600 text-sm font-medium mb-6">
                <Handshake className="w-4 h-4" />
                {language === 'sw' ? 'Jenga Partner Nasi' : 'Partner With Us'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {language === 'sw' 
                  ? 'Watoa Mikopo: Pata SME Bora' 
                  : 'Lenders: Access Quality SMEs'}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {language === 'sw'
                  ? 'Inua360 inakuunganisha na SME zilizo thibitishwa na zilizo tayari kwa mkopo. Pata data ya kina, alama za hatari, na mchakato wa haraka.'
                  : 'Inua360 connects you with pre-vetted, loan-ready SMEs. Get comprehensive data, risk scores, and fast processing.'}
              </p>

              <div className="space-y-4">
                {lenderBenefits.slice(0, 4).map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button size="lg" className="rounded-full px-8 h-12 text-lg bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25">
                  {language === 'sw' ? 'Jiunge na Mradi' : 'Join the Program'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {lenderBenefits.map((benefit, index) => (
                <Card key={index} className="bg-muted/30 border-0">
                  <CardContent className="p-4">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3">
                      <benefit.icon className="w-5 h-5 text-orange-500" />
                    </div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">{benefit.title}</h4>
                    <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 lg:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {language === 'sw' ? 'Maoni ya Wateja' : 'What Our Users Say'}
            </h2>
            <p className="text-lg text-muted-foreground">
              {language === 'sw'
                ? 'Wasiri wa maelfu wa SME wamepata mafanikio kupitia Inua360'
                : 'Thousands of SMEs have found success through Inua360'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.business}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-primary to-orange-500 border-0 overflow-hidden">
            <CardContent className="p-8 sm:p-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {language === 'sw' 
                  ? 'Je, Unatafsiri Kugeuza Biashara Yako?' 
                  : 'Ready to Transform Your Business?'}
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                {language === 'sw'
                  ? 'Jiunge na maelfu ya SME walioanza safari yao ya kufika kwenye ufadhili leo.'
                  : 'Join thousands of SMEs on their journey to funding readiness today.'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={onGetStarted}
                  className="rounded-full px-8 h-12 text-lg bg-white text-primary hover:bg-white/90"
                >
                  {language === 'sw' ? 'Anza Hapa' : 'Start Here'}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={onLogin}
                  className="rounded-full px-8 h-12 text-lg border-white text-white hover:bg-white/10"
                >
                  {language === 'sw' ? 'Ingia kwenye Akaunti' : 'Login to Account'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <InuaLogo size="sm" showSlogan={false} />
                <span className="text-lg font-bold text-foreground">Inua360</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {language === 'sw'
                  ? 'Mfumo wa kwanza wa AI kwa SME huko Kenya'
                  : 'Kenya\'s first AI platform for SMEs'}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">
                {language === 'sw' ? 'Viungo vya Haraka' : 'Quick Links'}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">{language === 'sw' ? 'Nyumbani' : 'Home'}</a></li>
                <li><a href="#features" className="hover:text-foreground">{language === 'sw' ? 'Vipengele' : 'Features'}</a></li>
                <li><a href="#for-lenders" className="hover:text-foreground">{language === 'sw' ? 'Watoa Mikopo' : 'Lenders'}</a></li>
                <li><a href="#testimonials" className="hover:text-foreground">{language === 'sw' ? 'Maoni' : 'Testimonials'}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">
                {language === 'sw' ? 'Mawasiliano' : 'Contact'}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +254 700 000 000
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  hello@inua360.com
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Nairobi, Kenya
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">
                {language === 'sw' ? 'Kisheria' : 'Legal'}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">{language === 'sw' ? 'Sheria na Masharti' : 'Terms of Service'}</a></li>
                <li><a href="#" className="hover:text-foreground">{language === 'sw' ? 'Sera ya Faragha' : 'Privacy Policy'}</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Inua360. {language === 'sw' ? 'Haki zote zimehifadhiwa.' : 'All rights reserved.'}
          </div>
        </div>
      </footer>
    </div>
  );
}
