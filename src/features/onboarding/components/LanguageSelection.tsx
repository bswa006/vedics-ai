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
  // South Asian Languages
  { code: 'english', name: 'English' },
  { code: 'hindi', name: 'हिंदी (Hindi)' },
  { code: 'tamil', name: 'தமிழ் (Tamil)' },
  { code: 'telugu', name: 'తెలుగు (Telugu)' },
  { code: 'bengali', name: 'বাংলা (Bengali)' },
  { code: 'marathi', name: 'मराठी (Marathi)' },
  { code: 'kannada', name: 'ಕನ್ನಡ (Kannada)' },
  { code: 'malayalam', name: 'മലയാളം (Malayalam)' },
  { code: 'gujarati', name: 'ગુજરાતી (Gujarati)' },
  { code: 'punjabi', name: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'sanskrit', name: 'संस्कृतम् (Sanskrit)' },
  { code: 'urdu', name: 'اردو (Urdu)' },
  { code: 'nepali', name: 'नेपाली (Nepali)' },
  { code: 'sinhala', name: 'සිංහල (Sinhala)' },
  { code: 'odia', name: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'assamese', name: 'অসমীয়া (Assamese)' },
  { code: 'kashmiri', name: 'कॉशुर (Kashmiri)' },
  { code: 'konkani', name: 'कोंकणी (Konkani)' },
  { code: 'manipuri', name: 'মৈতৈলোন্ (Manipuri)' },
  { code: 'maithili', name: 'मैथिली (Maithili)' },
  
  // Southeast Asian Languages
  { code: 'burmese', name: 'မြန်မာ (Burmese)' },
  { code: 'thai', name: 'ไทย (Thai)' },
  { code: 'khmer', name: 'ខ្មែរ (Khmer)' },
  { code: 'vietnamese', name: 'Tiếng Việt (Vietnamese)' },
  { code: 'indonesian', name: 'Bahasa Indonesia (Indonesian)' },
  { code: 'malay', name: 'Bahasa Melayu (Malay)' },
  { code: 'tagalog', name: 'Tagalog (Filipino)' },
  { code: 'lao', name: 'ລາວ (Lao)' },
  { code: 'javanese', name: 'Basa Jawa (Javanese)' },
  { code: 'sundanese', name: 'Basa Sunda (Sundanese)' },
  
  // East Asian Languages
  { code: 'chinese', name: '中文 (Chinese)' },
  { code: 'japanese', name: '日本語 (Japanese)' },
  { code: 'korean', name: '한국어 (Korean)' },
  { code: 'mongolian', name: 'Монгол (Mongolian)' },
  { code: 'tibetan', name: 'བོད་སྐད་ (Tibetan)' },
  
  // Central Asian Languages
  { code: 'kazakh', name: 'Қазақ тілі (Kazakh)' },
  { code: 'uzbek', name: 'Oʻzbek (Uzbek)' },
  { code: 'kyrgyz', name: 'Кыргызча (Kyrgyz)' },
  { code: 'turkmen', name: 'Türkmen (Turkmen)' },
  { code: 'tajik', name: 'Тоҷикӣ (Tajik)' },
  
  // Middle Eastern Languages
  { code: 'arabic', name: 'العربية (Arabic)' },
  { code: 'persian', name: 'فارسی (Persian)' },
  { code: 'turkish', name: 'Türkçe (Turkish)' },
  { code: 'hebrew', name: 'עברית (Hebrew)' },
  { code: 'kurdish', name: 'کوردی (Kurdish)' },
  
  // European Languages
  { code: 'french', name: 'Français (French)' },
  { code: 'german', name: 'Deutsch (German)' },
  { code: 'spanish', name: 'Español (Spanish)' },
  { code: 'portuguese', name: 'Português (Portuguese)' },
  { code: 'italian', name: 'Italiano (Italian)' },
  { code: 'russian', name: 'Русский (Russian)' },
  { code: 'polish', name: 'Polski (Polish)' },
  { code: 'ukrainian', name: 'Українська (Ukrainian)' },
  { code: 'greek', name: 'Ελληνικά (Greek)' },
  { code: 'dutch', name: 'Nederlands (Dutch)' },
  { code: 'czech', name: 'Čeština (Czech)' },
  { code: 'swedish', name: 'Svenska (Swedish)' },
  { code: 'romanian', name: 'Română (Romanian)' },
  { code: 'hungarian', name: 'Magyar (Hungarian)' },
  { code: 'bulgarian', name: 'Български (Bulgarian)' },
];


export interface LanguageSelectionProps {
  onNext: () => Promise<void>;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

import { Search } from 'lucide-react';
import { Input } from '../../../components/ui/input';

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  onNext,
  selectedLanguage,
  onLanguageChange,
}) => {
  const { t } = useTranslation();
  const [localSelectedLanguage, setLocalSelectedLanguage] = useState<string>(selectedLanguage);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLanguages = LANGUAGES.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="relative mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder={t('onboarding.language.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 w-full rounded-xl border border-gray-800 bg-gray-900/90 pl-12 pr-4 text-base text-white ring-1 ring-gray-700/50 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
        </div>
        <RadioGroup
          value={localSelectedLanguage}
          onValueChange={value => {
            setLocalSelectedLanguage(value);
            onLanguageChange(value);
          }}
          className="space-y-2"
        >
          {filteredLanguages.map((lang, index) => (
            <motion.div
              key={lang.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={cn(
                'flex cursor-pointer items-center rounded-xl py-3.5 px-4',
                'group transition-all duration-300 ease-in-out',
                'transform-gpu',
                localSelectedLanguage === lang.code
                  ? 'bg-blue-500/10 ring-1 ring-blue-500/50'
                  : 'bg-gray-900/90 ring-1 ring-gray-800 hover:bg-gray-800/90 hover:ring-gray-700'
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
                  'text-blue-500',
                  localSelectedLanguage === lang.code
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-600 group-hover:border-gray-500'
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
