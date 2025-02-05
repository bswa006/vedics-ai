import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';
import { Label } from '../../../components/ui/label';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';

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
  onNext: () => Promise<void>;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  onNext,
  selectedLanguage,
  onLanguageChange,
}) => {
  const { t } = useTranslation();
  const [localSelectedLanguage, setLocalSelectedLanguage] = useState<string>(selectedLanguage);

  return (
    <div className="flex h-full flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <motion.div
        className="flex-none space-y-3 p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
          {t('onboarding.language.title')}
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-gray-400">
          {t('onboarding.language.description')}
        </p>
      </motion.div>

      <motion.div
        className="flex-1 overflow-y-auto px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <RadioGroup
          value={localSelectedLanguage}
          onValueChange={value => {
            setLocalSelectedLanguage(value);
            onLanguageChange(value);
          }}
          className="space-y-4"
        >
          {LANGUAGES.map((lang, index) => (
            <motion.div
              key={lang.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={cn(
                'flex cursor-pointer items-center rounded-xl p-5 backdrop-blur-sm',
                'group transition-all duration-500 ease-in-out',
                'border hover:shadow-lg hover:shadow-blue-500/5',
                'transform-gpu',
                localSelectedLanguage === lang.code
                  ? 'scale-[1.02] border-blue-500/50 bg-blue-500/10'
                  : 'border-gray-700/50 hover:scale-[1.01] hover:border-blue-500/30 hover:bg-blue-500/5'
              )}
              onClick={() => {
                setLocalSelectedLanguage(lang.code);
                onLanguageChange(lang.code);
              }}
              role="button"
              tabIndex={0}
            >
              <RadioGroupItem
                value={lang.code}
                id={lang.code}
                className={cn(
                  'h-5 w-5 border-2 transition-all duration-300',
                  'border-gray-500/50 text-blue-500',
                  'group-hover:border-blue-400/50',
                  localSelectedLanguage === lang.code && 'border-blue-500'
                )}
              />
              <Label
                htmlFor={lang.code}
                className="ml-4 cursor-pointer bg-gradient-to-r from-white to-white/90 bg-clip-text text-lg font-medium text-transparent"
              >
                {lang.name}
              </Label>
            </motion.div>
          ))}
        </RadioGroup>
      </motion.div>

      <motion.div
        className="flex-none p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button
          onClick={() => onNext()}
          className={cn(
            'relative w-full overflow-hidden rounded-xl p-[1px] transition-all',
            'bg-gradient-to-r from-blue-500 to-blue-600',
            'hover:shadow-[0_0_2rem_-0.5rem_#3b82f6]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'group'
          )}
        >
          <div className="relative rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-3.5 transition-all group-hover:bg-opacity-0">
            <span className="relative z-10 text-base font-medium text-white">
              {t('common.next')}
            </span>
          </div>
        </Button>
      </motion.div>
    </div>
  );
};
