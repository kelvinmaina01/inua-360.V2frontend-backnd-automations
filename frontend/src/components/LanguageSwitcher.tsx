import { Globe } from 'lucide-react';
import { Button } from './ui/button';
import { useContent } from '../hooks/useContent';

export function LanguageSwitcher() {
  const { language, setLanguage } = useContent();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sw' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2 touch-target backdrop-blur-sm bg-white/30 hover:bg-white/50 border border-white/20 rounded-full px-3"
    >
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline font-medium">{language === 'en' ? 'Swahili' : 'English'}</span>
      <span className="sm:hidden font-bold">{language === 'en' ? 'SW' : 'EN'}</span>
    </Button>
  );
}
