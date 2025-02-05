import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';
import { Label } from '../../../components/ui/label';

export interface LanguageOption {
  code: string;
  name: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'mr', name: 'मराठी' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
];

export interface LanguageSelectionProps {
  onNext: () => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  onNext,
  selectedLanguage,
  onLanguageChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex h-full flex-col space-y-6 p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">
          {t('onboarding.language.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('onboarding.language.description')}
        </p>
      </div>

      <RadioGroup
        value={selectedLanguage}
        onValueChange={onLanguageChange}
        className="grid flex-1 gap-4 overflow-y-auto pb-4"
      >
        {LANGUAGES.map((lang) => (
          <div key={lang.code} className="flex items-center space-x-2">
            <RadioGroupItem value={lang.code} id={lang.code} />
            <Label htmlFor={lang.code}>{lang.name}</Label>
          </div>
        ))}
      </RadioGroup>

      <div className="mt-auto">
        <Button
          onClick={onNext}
          className="w-full"
          size="lg"
        >
          {t('common.next')}
        </Button>
      </div>
    </div>
  );
};
