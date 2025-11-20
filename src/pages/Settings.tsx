import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { AgentAvatar } from '../components/AgentAvatar';
import { AGENTS } from '../lib/constants';
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Globe,
  MessageCircle,
  Smartphone,
  Shield,
  Bell,
  Download,
  Power,
  ChevronRight,
  Link,
  Clock,
  Check,
  Plus
} from 'lucide-react';

interface SettingsProps {
  language: 'en' | 'sw';
  darkMode: boolean;
  onLanguageChange: (lang: 'en' | 'sw') => void;
  onDarkModeToggle: (enabled: boolean) => void;
}

export function Settings({ language, darkMode, onLanguageChange, onDarkModeToggle }: SettingsProps) {
  const [agentsEnabled, setAgentsEnabled] = useState<{ [key: string]: boolean }>({
    profile: true,
    compliance: true,
    funding: true,
    cashflow: true,
    application: true,
    supervisor: true
  });

  const [channels, setChannels] = useState({
    whatsapp: true,
    webApp: true,
    ussd: false,
    sms: true
  });

  const [notifications, setNotifications] = useState({
    agentActions: true,
    compliance: true,
    funding: true,
    cashFlow: false
  });

  const toggleAgent = (agentId: string) => {
    setAgentsEnabled({ ...agentsEnabled, [agentId]: !agentsEnabled[agentId] });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>{language === 'sw' ? 'Mipangilio' : 'Settings'}</h1>
        <p className="text-muted-foreground">
          {language === 'sw'
            ? 'Dhibiti programu yako na mawakala'
            : 'Control your app and agents'}
        </p>
      </div>

      {/* Appearance */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            {darkMode ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
          </div>
          <div>
            <h3>{language === 'sw' ? 'Muonekano' : 'Appearance'}</h3>
            <p className="text-xs text-muted-foreground">
              {language === 'sw'
                ? 'Badilisha jinsi programu inavyoonekana'
                : 'Customize how the app looks'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label>{language === 'sw' ? 'Lugha' : 'Language'}</Label>
                <p className="text-xs text-muted-foreground">
                  {language === 'sw' ? 'Chagua lugha yako' : 'Choose your language'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={language === 'en' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onLanguageChange('en')}
              >
                English
              </Button>
              <Button
                variant={language === 'sw' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onLanguageChange('sw')}
              >
                Swahili
              </Button>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Sun className="h-4 w-4 text-muted-foreground" />
              )}
              <div>
                <Label>{language === 'sw' ? 'Hali ya Giza' : 'Dark Mode'}</Label>
                <p className="text-xs text-muted-foreground">
                  {language === 'sw'
                    ? 'Badilisha kwa muonekano wa giza'
                    : 'Switch to dark appearance'}
                </p>
              </div>
            </div>
            <Switch checked={darkMode} onCheckedChange={onDarkModeToggle} />
          </div>
        </div>
      </Card>

      {/* Connected Accounts - NEW M-PESA SECTION */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <Link className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h3>{language === 'sw' ? 'Akaunti Zilizounganishwa' : 'Connected Accounts'}</h3>
            <p className="text-xs text-muted-foreground">
              {language === 'sw'
                ? 'Simamia miunganisho ya fedha zako'
                : 'Manage your financial connections'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* M-Pesa Connected */}
          <div className="p-4 border-2 border-secondary/20 bg-secondary/5 rounded-lg">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-start gap-3 flex-1">
                <div className="p-2 bg-secondary rounded-lg">
                  <Smartphone className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4>M-Pesa</h4>
                    <Badge className="bg-secondary text-secondary-foreground">
                      <Check className="h-3 w-3 mr-1" />
                      {language === 'sw' ? 'Imeunganishwa' : 'Connected'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {language === 'sw' 
                      ? 'Till 403321 · Binafsi 07xxxxxxx'
                      : 'Till 403321 · Personal 07xxxxxxx'}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {language === 'sw' 
                      ? 'Ilisasishwa dakika 2 zilizopita'
                      : 'Last sync 2 mins ago'}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                {language === 'sw' ? 'Sasisha Sasa' : 'Sync Now'}
              </Button>
              <Button variant="destructive" size="sm">
                {language === 'sw' ? 'Ondoa' : 'Revoke'}
              </Button>
            </div>
          </div>

          {/* Equity Bank - Not Connected */}
          <div className="p-4 border border-border rounded-lg opacity-60">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="p-2 bg-muted rounded-lg">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h4>{language === 'sw' ? 'Benki ya Equity' : 'Equity Bank'}</h4>
                  <p className="text-xs text-muted-foreground">
                    {language === 'sw' 
                      ? 'Hiari - kwa mipango ya baadaye'
                      : 'Optional - for future plans'}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                {language === 'sw' ? 'Unganisha' : 'Connect'}
              </Button>
            </div>
          </div>

          {/* Quick Log Toggle */}
          <Separator />
          <div className="flex items-center justify-between pt-2">
            <div>
              <Label>{language === 'sw' ? 'Rekodi Haraka' : 'Quick Log'}</Label>
              <p className="text-xs text-muted-foreground">
                {language === 'sw'
                  ? 'Niulize kurekodi mauzo ya taslimu kila siku'
                  : 'Ask me to log cash sales daily'}
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Communication Channels */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <MessageCircle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3>{language === 'sw' ? 'Njia za Mawasiliano' : 'Communication Channels'}</h3>
            <p className="text-xs text-muted-foreground">
              {language === 'sw'
                ? 'Dhibiti jinsi unavyoingiliana na Inua'
                : 'Control how you interact with Inua'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              id: 'whatsapp',
              icon: MessageCircle,
              label: 'WhatsApp Bot',
              labelSw: 'WhatsApp Bot',
              desc: '95% of interactions',
              descSw: '95% ya mwingiliano'
            },
            {
              id: 'webApp',
              icon: Smartphone,
              label: 'Web App',
              labelSw: 'Programu ya Wavuti',
              desc: '4% - Weekly oversight',
              descSw: '4% - Usimamizi wa kila wiki'
            },
            {
              id: 'ussd',
              icon: Smartphone,
              label: 'USSD Fallback',
              labelSw: 'USSD',
              desc: '1% - No data access',
              descSw: '1% - Hakuna data'
            },
            {
              id: 'sms',
              icon: MessageCircle,
              label: 'SMS Alerts',
              labelSw: 'Arifa za SMS',
              desc: 'Critical notifications only',
              descSw: 'Arifa muhimu tu'
            }
          ].map((channel) => {
            const Icon = channel.icon;
            return (
              <div key={channel.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label>{language === 'sw' ? channel.labelSw : channel.label}</Label>
                    <p className="text-xs text-muted-foreground">
                      {language === 'sw' ? channel.descSw : channel.desc}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={channels[channel.id as keyof typeof channels]}
                  onCheckedChange={(checked) =>
                    setChannels({ ...channels, [channel.id]: checked })
                  }
                />
              </div>
            );
          })}
        </div>

        {channels.ussd && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-xs mb-2">
              {language === 'sw' ? 'Nambari ya USSD:' : 'USSD Code:'}
            </p>
            <code className="text-primary">*384*360#</code>
          </div>
        )}
      </Card>

      {/* Agent Controls */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Power className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3>{language === 'sw' ? 'Udhibiti wa Mawakala' : 'Agent Controls'}</h3>
            <p className="text-xs text-muted-foreground">
              {language === 'sw'
                ? 'Washa au zima mawakala maalum'
                : 'Enable or disable specific agents'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {AGENTS.map((agent) => (
            <div key={agent.id} className="flex items-start justify-between gap-4 p-4 border border-border rounded-lg">
              <div className="flex items-start gap-3">
                <AgentAvatar
                  agentId={agent.id}
                  size="sm"
                  status={agentsEnabled[agent.id] ? 'active' : 'idle'}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Label>{language === 'sw' ? agent.nameSwahili : agent.name}</Label>
                    <Badge variant={agentsEnabled[agent.id] ? 'default' : 'secondary'} className="text-xs">
                      {language === 'sw'
                        ? agentsEnabled[agent.id]
                          ? 'Hai'
                          : 'Tulia'
                        : agentsEnabled[agent.id]
                          ? 'Active'
                          : 'Idle'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {language === 'sw' ? agent.descriptionSwahili : agent.description}
                  </p>
                </div>
              </div>
              <Switch
                checked={agentsEnabled[agent.id]}
                onCheckedChange={() => toggleAgent(agent.id)}
              />
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-4 gap-2">
          {language === 'sw' ? 'Angalia Mtiririko wa Timu ya Wakala' : 'View Agent Crew Diagram'}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3>{language === 'sw' ? 'Arifa' : 'Notifications'}</h3>
            <p className="text-xs text-muted-foreground">
              {language === 'sw'
                ? 'Dhibiti arifa unazopokea'
                : 'Control what notifications you receive'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              id: 'agentActions',
              label: 'Agent Actions',
              labelSw: 'Vitendo vya Mawakala',
              desc: 'Get notified of all agent activities'
            },
            {
              id: 'compliance',
              label: 'Compliance Alerts',
              labelSw: 'Arifa za Sheria',
              desc: 'Licenses & permits expiring'
            },
            {
              id: 'funding',
              label: 'Funding Opportunities',
              labelSw: 'Fursa za Fedha',
              desc: 'New matches found'
            },
            {
              id: 'cashFlow',
              label: 'Cash Flow Warnings',
              labelSw: 'Tahadhari za Fedha',
              desc: 'Predicted gaps ahead'
            }
          ].map((notif) => (
            <div key={notif.id} className="flex items-center justify-between">
              <div>
                <Label>{language === 'sw' ? notif.labelSw : notif.label}</Label>
                <p className="text-xs text-muted-foreground">{notif.desc}</p>
              </div>
              <Switch
                checked={notifications[notif.id as keyof typeof notifications]}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, [notif.id]: checked })
                }
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Privacy & Data */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3>{language === 'sw' ? 'Faragha & Data' : 'Privacy & Data'}</h3>
            <p className="text-xs text-muted-foreground">
              {language === 'sw'
                ? 'Taarifa zako ni salama'
                : 'Your information is secure'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-between">
            {language === 'sw' ? 'Sera ya Faragha' : 'Privacy Policy'}
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between">
            {language === 'sw' ? 'Idhini ya Kenya DPA' : 'Kenya DPA Consent'}
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between gap-2">
            <Download className="h-4 w-4" />
            {language === 'sw' ? 'Pakua Data Yangu' : 'Download My Data'}
          </Button>
        </div>
      </Card>

      {/* PWA Install */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Download className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3>{language === 'sw' ? 'Ongeza kwenye Skrini ya Nyumbani' : 'Add to Home Screen'}</h3>
            <p className="text-xs text-muted-foreground">
              {language === 'sw'
                ? 'Tumia Inua kama programu ya simu'
                : 'Use Inua like a native app'}
            </p>
          </div>
        </div>
        <Button className="w-full gap-2">
          <Download className="h-4 w-4" />
          {language === 'sw' ? 'Sakinisha Programu' : 'Install App'}
        </Button>
      </Card>

      {/* Version Info */}
      <div className="text-center text-xs text-muted-foreground">
        <p>Inua 360 v1.0.0</p>
        <p>{language === 'sw' ? 'Imetengenezwa na upendo nchini Kenya 🇰🇪' : 'Made with love in Kenya 🇰🇪'}</p>
      </div>
    </div>
  );
}