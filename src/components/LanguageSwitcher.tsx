import { Globe } from 'lucide-react';
import { Button } from './ui/button';

interface LanguageSwitcherProps {
  language: 'en' | 'sw';
  onLanguageChange: (lang: 'en' | 'sw') => void;
}

export function LanguageSwitcher({ language, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onLanguageChange(language === 'en' ? 'sw' : 'en')}
      className="gap-2 touch-target"
    >
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline">{language === 'en' ? 'Swahili' : 'English'}</span>
      <span className="sm:hidden">{language === 'en' ? 'SW' : 'EN'}</span>
    </Button>
  );
}
