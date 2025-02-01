import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-lg transition-all"
      title={i18n.language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
    >
      <Globe className="w-5 h-5 text-white" />
    </button>
  );
};

export default LanguageSwitcher;
