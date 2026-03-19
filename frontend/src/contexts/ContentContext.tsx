import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'sw';

interface ContentContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string, fallback?: string) => string;
    loading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>(() => {
        return (localStorage.getItem('inua-language') as Language) || 'en';
    });
    const [content, setContent] = useState<Record<string, Record<Language, string>>>({
        'notifications.online': { en: 'Back online', sw: 'Umerudi mtandaoni' },
        'notifications.syncing': { en: 'Syncing data...', sw: 'Data inasawazishwa...' },
        'notifications.offline': { en: 'You are offline', sw: 'Nje ya mtandao' },
        'notifications.offline_desc': { en: 'You can continue using the app', sw: 'Unaweza kuendelea kutumia programu' },
        'notifications.dark_mode_enabled': { en: 'Dark Mode Enabled', sw: 'Hali ya Giza Imewashwa' },
        'notifications.dark_mode_disabled': { en: 'Dark Mode Disabled', sw: 'Hali ya Giza Imezimwa' },
        'notifications.language_changed': { en: 'Language changed', sw: 'Lugha imebadilishwa' },
        'notifications.logged_out': { en: 'Logged out successfully', sw: 'Umeondoka kikamilifu' },
        'notifications.welcome': { en: 'Welcome to Inua360!', sw: 'Karibu Inua360!' },
        'notifications.welcome_desc': { en: 'Your profile is ready. Your agents are getting to work!', sw: 'Wasifu wako umeundwa. Mawakala wako wanaanza kazi!' },
        'notifications.autonomy_on': { en: 'Autonomy Mode Enabled', sw: 'Hali ya Kujitegemea Imewashwa' },
        'notifications.autonomy_on_desc': { en: 'Your agents are now working on your behalf', sw: 'Mawakala wako sasa wanafanya kazi kwa niaba yako' },
        'status.online': { en: 'Online', sw: 'Mtandaoni' },
        'status.offline': { en: 'Offline', sw: 'Nje ya Mtandao' },
        'nav.dashboard': { en: 'Dashboard', sw: 'Dashibodi' },
        'nav.analytics': { en: 'Analytics', sw: 'Mawasiliano' },
        'nav.feed': { en: 'Agent Feed', sw: 'Shughuli za Mawakala' },
        'nav.money': { en: 'Money', sw: 'Fedha' },
        'nav.loan_readiness': { en: 'Loan Readiness', sw: 'Uwezo wa Mkopo' },
        'nav.connect_mpesa': { en: 'Connect M-Pesa', sw: 'Unganisha M-Pesa' },
        'nav.compliance': { en: 'Compliance', sw: 'Kinga' },
        'nav.credit_score': { en: 'Credit Score', sw: 'Alama ya Mkopo' },
        'nav.profile': { en: 'Profile', sw: 'Wasifu' },
        'nav.chat': { en: 'Chat', sw: 'Ongea' },
        'nav.settings': { en: 'Settings', sw: 'Mipangilio' },
        'landing.login': { en: 'Login', sw: 'Ingia' },
        'landing.cta_short': { en: 'Get Started', sw: 'Anza Sasa' },
        'landing.badge': { en: 'AI SME Co-Pilot', sw: 'Wakala wa SME AI' },
        'landing.hero_title': { en: 'We help SMEs secure funding', sw: 'Tunasaidia SME kupata ufadhili' },
        'landing.hero_title_highlight': { en: 'through AI-powered business intelligence', sw: 'kupitia akili ya biashara inayotumiwa na AI' },
        'landing.hero_subtitle': { en: 'We prepare your business for funding using AI to convert everyday financial activity into actionable intelligence.', sw: 'Tunatayarisha biashara yako kwa ajili ya ufadhili kwa kutumia AI kubadilisha shughuli za kila siku za kifedha kuwa maarifa yanayotendeka.' },
        'landing.cta_main': { en: 'Get Funding Ready', sw: 'Kuwa Tayari kwa Ufadhili' },
        'landing.cta_secondary': { en: 'Book a Demo', sw: 'Weka Demo' },
        'landing.value_1': { en: 'Using AI to convert everyday financial activity into actionable funding intelligence.', sw: 'Kutumia AI kubadilisha shughuli za kila siku za kifedha kuwa maarifa ya ufadhili yanayotendeka.' },
        'landing.value_2': { en: 'Giving entrepreneurs a clear roadmap to funding readiness.', sw: 'Kuwa na ramani wazi kwa wajasiriamali kuelekea utayari wa ufadhili.' },
        'landing.pillars_title': { en: 'Our Solution Stack', sw: 'Suluhu Zetu' },
        'landing.pillars_subtitle': { en: 'Three specialized AI agents working together to make your business investable.', sw: 'Mawakala watatu wa AI walioboreshwa wakifanya kazi pamoja kufanya biashara yako iweze kuwekezwa.' },

        // Traditional vs Inua Scaling Section
        'landing.compare_title': { en: 'Why Traditional Financing Fails SMEs', sw: 'Kwa nini Ufadhili wa Jadi Hufeli kwa SMEs' },
        'landing.compare_subtitle': { en: 'The gap between a broken system and a funding-ready future.', sw: 'Pengo kati ya mfumo uliovunjika na maisha ya baadaye tayari kwa ufadhili.' },

        'landing.trad_title': { en: 'Traditional SME Financing', sw: 'Ufadhili wa Jadi wa SME' },
        'landing.trad_1_title': { en: 'Manual Record Keeping', sw: 'Kuweka Kumbukumbu kwa Mkono' },
        'landing.trad_1_desc': { en: 'Paper-based logs that fail to show the true strength of your business.', sw: 'Kumbukumbu za karatasi ambazo zinashindwa kuonyesha nguvu halisi ya biashara yako.' },
        'landing.trad_2_title': { en: 'Compliance Gaps', sw: 'Mapengo ya Uzingatiaji' },
        'landing.trad_2_desc': { en: 'Missing certificates and disorganized tax records that block funding instantly.', sw: 'Vyeti vilivyokosekana na kumbukumbu za kodi ambazo zinazuia ufadhili mara moja.' },
        'landing.trad_3_title': { en: 'Revenue Uncertainty', sw: 'Kutokuwa na Uhakika wa Mapato' },
        'landing.trad_3_desc': { en: 'No clear path to show lenders how you will repay, leading to high-risk rejections.', sw: 'Hakuna njia wazi ya kuonyesha wakopeshaji jinsi utakavyolipa, na kusababisha kukataliwa kwa hatari kubwa.' },
        'landing.trad_4_title': { en: 'The "Lender Lottery"', sw: '"Bahati Nasibu ya Mkopesha"' },
        'landing.trad_4_desc': { en: 'Applying everywhere without knowing where you actually fit, wasting months.', sw: 'Kuomba kila mahali bila kujua mahali unapofaa, kupoteza miezi.' },
        'landing.trad_5_title': { en: 'Weak Business Profiles', sw: 'Wasifu Dhaifu wa Biashara' },
        'landing.trad_5_desc': { en: 'Standard applications that fail to stand out, making your SME look high-risk to creditors.', sw: 'Maombi ya kawaida ambayo yanashindwa kujitokeza, na kufanya SME yako ionekane hatari kubwa kwa wadai.' },

        'landing.inua_title': { en: 'The Inua360 AI Solution', sw: 'Suluhisho la AI la Inua360' },
        'landing.inua_1_title': { en: 'Inua360 AI Advisor', sw: 'Mshauri wa AI wa Inua360' },
        'landing.inua_1_desc': { en: 'Using AI to convert everyday financial activity into actionable funding intelligence.', sw: 'Kutumia AI kubadilisha shughuli za kifedha za kila siku kuwa akili ya ufadhili inayoweza kutekelezwa.' },
        'landing.inua_2_title': { en: 'Compliance Tracker', sw: 'Kifuatiliaji cha Uzingatiaji' },
        'landing.inua_2_desc': { en: 'Automates compliance and documentation tracking — organizes records to keep you funding-ready.', sw: 'Inahariri uzingatiaji na ufuatiliaji wa hati — hupanga kumbukumbu ili kukuweka tayari kwa ufadhili.' },
        'landing.inua_3_title': { en: 'Cash-Flow Forecaster', sw: 'Mtabiri wa Mtiririko wa Fedha' },
        'landing.inua_3_desc': { en: 'Forecasts cash flow and repayment scenarios so SMEs borrow with total confidence.', sw: 'Hutabiri mtiririko wa sasa wa pesa na hali za ulipaji ili SMEs wakope kwa ujasiri kamili.' },
        'landing.inua_4_title': { en: 'Funding Navigator', sw: 'Mwelekezi wa Ufadhili' },
        'landing.inua_4_desc': { en: 'Matches businesses to the right funding opportunities based on real financial signals.', sw: 'Hulinganisha biashara na nafasi sahihi za ufadhili kulingana na ishara halisi za kifedha.' },
        'landing.inua_5_title': { en: 'Profile Builder', sw: 'Mjenzi wa Wasifu' },
        'landing.inua_5_desc': { en: 'Giving entrepreneurs a clear roadmap to funding readiness. High-impact profiles funders and creditors trust.', sw: 'Kuwapa wajasiriamali ramani ya wazi ya utayari wa ufadhili. Wasifu wenye athari kubwa ambao wafadhili na wadai wanauamini.' },

        'landing.compliance_title': { en: 'Compliance Tracker', sw: 'Kifuatiliaji cha Kinga' },
        'landing.compliance_desc': { en: 'Automates compliance and documentation tracking — the Compliance Tracker organizes financial records and keeps required paperwork funding-ready.', sw: 'Hutumia kiotomatiki ufuatiliaji wa kinga na nyaraka — Kifuatiliaji cha Kinga hupanga rekodi za kifedha na kuweka makaratasi yanayohitajika tayari kwa ufadhili.' },
        'landing.cashflow_title': { en: 'Cash-Flow Forecaster', sw: 'Kikadiriaji cha Mtiririko wa Fedha' },
        'landing.cashflow_desc': { en: 'Forecasts cash flow and repayment scenarios — the Cash-Flow Forecaster models future outcomes so SMEs borrow with confidence.', sw: 'Hukadiria mtiririko wa fedha na mifumo ya malipo — Kikadiriaji cha Mtiririko wa Fedha hutengeneza mifumo ya matokeo ya baadaye ili SME ziweze kukopa kwa kujiamini.' },
        'landing.funding_title': { en: 'Funding Navigator', sw: 'Kiongozi wa Ufadhili' },
        'landing.funding_desc': { en: 'Matches businesses to the right funding opportunities — the Funding Navigator connects SMEs to suitable lenders based on real financial signals.', sw: 'Huunganisha biashara na fursa sahihi za ufadhili — Kiongozi wa Ufadhili huunganisha SME na wakopeshaji wanaofaa kulingana na ishara halisi za kifedha.' },
        'landing.bottom_cta_title': { en: 'Ready to transform your business?', sw: 'Je, uko tayari kubadilisha biashara yako?' },
        'landing.bottom_cta_subtitle': { en: 'Join the fastest growing SMEs in Kenya and get your business funding-ready today.', sw: 'Jiunge na SME zinazokua kwa kasi nchini Kenya na uifanye biashara yako iwe tayari kwa ufadhili leo.' },
        'footer.about': { en: 'About', sw: 'Kuhusu' },
        'footer.privacy': { en: 'Privacy', sw: 'Ufaragha' },
        'footer.terms': { en: 'Terms', sw: 'Masharti' },
        'footer.contact': { en: 'Contact', sw: 'Wasiliana' },
        'footer.action_hero': { en: 'Transform your business with Inua360', sw: 'Badilisha biashara yako na Inua360' },
        'footer.newsletter_title': { en: 'Subscribe to our newsletter for funding insights', sw: 'Jiunge na jarida letu kwa maarifa ya ufadhili' },
        'footer.newsletter_desc': { en: 'Get weekly updates on market trends, compliance tips, and SME financing strategies.', sw: 'Pata sasisho za kila wiki kuhusu mwenendo wa soko, vidokezo vya uzingatiaji, na mikakati ya ufadhili wa SME.' },
        'footer.email_placeholder': { en: 'Enter your business email', sw: 'Ingiza barua pepe ya biashara yako' },
        'footer.subscribe': { en: 'Subscribe', sw: 'Jiandikishe' },
        'footer.privacy_notice': { en: 'You can unsubscribe at any time. Read our', sw: 'Unaweza kujiondoa wakati wowote. Soma yetu' },
        'footer.ai_agents': { en: 'AI Agents', sw: 'Mawakala wa AI' },
        'footer.company': { en: 'Legal', sw: 'Kisheria' },
        'footer.contact_title': { en: 'Contact Us', sw: 'Wasiliana Nasi' },
        'brand.name': { en: 'Inua360', sw: 'Inua360' },
        'footer.privacy_policy_link': { en: 'Privacy Policy', sw: 'Sera ya Faragha' },
        'footer.legal_title': { en: 'Legal', sw: 'Kisheria' },
        'footer.link_advisor': { en: 'AI Advisor', sw: 'Mshauri wa AI' },
        'footer.link_compliance': { en: 'Compliance Tracker', sw: 'Mfuatiliaji wa Uzingatiaji' },
        'footer.link_cashflow': { en: 'Cash-Flow Forecaster', sw: 'Mtabiri wa Mtiririko wa Fedha' },
        'footer.link_funding': { en: 'Funding Navigator', sw: 'Kiongozi wa Ufadhili' },
        'footer.link_privacy': { en: 'Privacy Policy', sw: 'Sera ya Faragha' },
        'footer.link_terms': { en: 'Terms of Use', sw: 'Masharti ya Matumizi' },
        'footer.link_legal_notice': { en: 'Legal Notice', sw: 'Ilani ya Kisheria' },
        'footer.link_compliance_legal': { en: 'Compliance', sw: 'Uzingatiaji' },
        'footer.bottom_privacy_bottom': { en: 'Privacy Policy', sw: 'Sera ya Faragha' },
        'footer.bottom_terms_bottom': { en: 'Terms of Use', sw: 'Masharti ya Matumizi' },
        'footer.bottom_legal_bottom': { en: 'Legal', sw: 'Kisheria' },
        'footer.bottom_sitemap': { en: 'Site Map', sw: 'Ramani ya Tovuti' },
        'footer.description': { en: 'Inua360 is the world\'s first AI SME Co-pilot. We empower Kenyan entrepreneurs by converting financial data into funding-ready intelligence.', sw: 'Inua360 ni msaidizi wa kwanza wa AI wa SME duniani. Tunawawezesha wajasiriamali wa Kenya kwa kubadilisha data ya kifedha kuwa maarifa tayari kwa ufadhili.' },
        'footer.rights': { en: 'All rights reserved.', sw: 'Haki zote zimehifadhiwa.' },
        'auth.login_title': { en: 'Welcome back', sw: 'Karibu tena' },
        'auth.signup_title': { en: 'Join Inua360', sw: 'Jiunge na Inua360' },
        'auth.login_desc': { en: 'Enter your credentials to access your business copilot', sw: 'Ingiza maelezo yako ili kufikia msaidizi wa biashara yako' },
        'auth.signup_desc': { en: 'Start your journey to becoming funding-ready today', sw: 'Anza safari yako ya kuwa tayari kwa ufadhili leo' },
        'auth.login': { en: 'Login', sw: 'Ingia' },
        'auth.signup': { en: 'Register', sw: 'Jisajili' },
        'auth.name_placeholder': { en: 'Full Name', sw: 'Jina Kamili' },
        'auth.phone_placeholder': { en: 'Phone Number', sw: 'Nambari ya Simu' },
        'auth.email_placeholder': { en: 'Email Address', sw: 'Anwani ya Barua Pepe' },
        'auth.password_placeholder': { en: 'Password', sw: 'Nenosiri' },
        'auth.login_btn': { en: 'Sign In', sw: 'Ingia' },
        'auth.signup_btn': { en: 'Create Account', sw: 'Unda Akaunti' },
        'auth.or_continue': { en: 'or continue with', sw: 'au endelea na' },
        'auth.login_success': { en: 'Welcome back!', sw: 'Karibu tena!' },
        'auth.signup_success': { en: 'Account created successfully!', sw: 'Akaunti imeundwa kikamilifu!' },
        'auth.error': { en: 'Authentication failed', sw: 'Uthibitishaji umeshindikana' },
        'auth.terms_agreement': { en: 'By continuing, you agree to our', sw: 'Kwa kuendelea, unakubali' },
        'auth.terms': { en: 'Terms of Service', sw: 'Masharti ya Huduma' },
        'auth.privacy': { en: 'Privacy Policy', sw: 'Sera ya Faragha' },
        'auth.and': { en: 'and', sw: 'na' },
        'auth.email_label': { en: 'Email Address', sw: 'Anwani ya Barua Pepe' },
        'auth.password_label': { en: 'Password', sw: 'Nenosiri' },
        'auth.confirm_password_label': { en: 'Confirm Password', sw: 'Thibitisha Nenosiri' },
        'auth.password_mismatch': { en: 'Passwords do not match', sw: 'Manenosiri hayalingani' }
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        localStorage.setItem('inua-language', language);
    }, [language]);

    // Mock implementation of the t() helper until backend is ready
    const t = (key: string, fallback?: string) => {
        if (content[key] && content[key][language]) {
            return content[key][language];
        }
        return fallback || key;
    };

    return (
        <ContentContext.Provider value={{ language, setLanguage, t, loading }}>
            {children}
        </ContentContext.Provider>
    );
}

export function useContent() {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
}
