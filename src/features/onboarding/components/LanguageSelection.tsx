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
    <div className="flex h-full flex-col">
      <div className="flex-none space-y-2 p-6">
        <h2 className="text-2xl font-semibold text-white mb-2">
          {t('onboarding.language.title')}
        </h2>
        <p className="text-gray-300 text-sm">
          {t('onboarding.language.description')}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6">
        <RadioGroup
          value={selectedLanguage}
          onValueChange={onLanguageChange}
          className="space-y-3"
        >
          {LANGUAGES.map((lang) => (
            <div
              key={lang.code}
              className={`flex items-center rounded-lg p-4 transition-colors cursor-pointer
                ${selectedLanguage === lang.code ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-gray-800/40 border border-gray-700'}
                hover:border-blue-500/30 hover:bg-blue-500/5`}
              onClick={() => onLanguageChange(lang.code)}
            >
              <RadioGroupItem
                value={lang.code}
                id={lang.code}
                className="h-5 w-5 border-2 border-gray-600 text-blue-500"
              />
              <Label
                htmlFor={lang.code}
                className="ml-3 text-lg text-white cursor-pointer"
              >
                {lang.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex-none p-6">
        <Button
          onClick={onNext}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors
            disabled:bg-blue-400/50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
        >
          {t('common.next')}
        </Button>
      </div>
    </div>
  );
};
