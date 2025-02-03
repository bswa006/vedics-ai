import { Briefcase, Clock, GraduationCap, Heart, Sun, User, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PredictionType } from '../../types/predictions';
import styles from './TabNavigation.module.css';

interface Tab {
  id: PredictionType;
  label: string;
  icon: JSX.Element;
  color: string;
}

interface TabNavigationProps {
  activeTab: PredictionType;
  setActiveTab: (id: PredictionType) => void;
}

export function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  const { t } = useTranslation();

  const tabs: Tab[] = [
    {
      id: 'today_readings',
      label: t('tabs.today'),
      icon: <Sun className="h-6 w-6" />,
      color: 'bg-[#2435b3]'
    },
    {
      id: 'core_personality_and_life_path',
      label: t('tabs.personality'),
      icon: <User className="h-6 w-6" />,
      color: 'bg-[#2435b3]'
    },
    {
      id: 'career_success_and_wealth',
      label: t('tabs.career'),
      icon: <Briefcase className="h-6 w-6" />,
      color: 'bg-[#2435b3]'
    },
    {
      id: 'relationships_love_and_marriage',
      label: t('tabs.relationships'),
      icon: <Users className="h-6 w-6" />,
      color: 'bg-[#2435b3]'
    },
    {
      id: 'health_and_wellbeing',
      label: t('tabs.health'),
      icon: <Heart className="h-6 w-6" />,
      color: 'bg-[#2435b3]'
    },
    {
      id: 'challenges_and_remedies',
      label: t('tabs.challenges'),
      icon: <GraduationCap className="h-6 w-6" />,
      color: 'bg-[#2435b3]'
    },
    {
      id: 'major_life_periods',
      label: t('tabs.lifePeriods'),
      icon: <Clock className="h-6 w-6" />,
      color: 'bg-[#2435b3]'
    },
  ];

  return (
    <div className="mb-6 rounded-[24px] bg-white/10 p-3 shadow-2xl backdrop-blur-lg">
      <div className="grid grid-cols-3 gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            data-state={activeTab === tab.id ? 'active' : 'inactive'}
            className={`group relative flex flex-col items-center justify-center transition-all duration-300 ${styles['tab-hover']} ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-[#8B93B8] hover:text-white'
            }`}
          >
            <div className="relative z-10 flex flex-col items-center space-y-2 py-4 px-3">
              <div className="transition-all duration-300 mb-1.5">
                {tab.icon}
              </div>
              <span className="block text-center text-[13px] font-medium tracking-wide transition-colors duration-300">
                {tab.label}
              </span>
            </div>
            <div className={styles['tab-indicator']} />
          </button>
        ))}
      </div>
    </div>
  );
}
