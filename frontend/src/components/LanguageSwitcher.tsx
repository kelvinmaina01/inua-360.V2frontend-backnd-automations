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
      className="gap-2 touch-target"
    >
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline">{language === 'en' ? 'Swahili' : 'English'}</span>
      <span className="sm:hidden">{language === 'en' ? 'SW' : 'EN'}</span>
    </Button>
  );
}
