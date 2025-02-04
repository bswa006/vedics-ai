import { Briefcase, Clock, GraduationCap, Heart, User, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PredictionType } from '../../types/predictions';
import styles from './TabNavigation.module.css';
import type { Swiper } from 'swiper';
import { Carousel } from '../../components/ui/Carousel';

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
      id: 'core_personality_and_life_path',
      label: t('tabs.personality'),
      icon: <User className="h-6 w-6" />,
      color: 'bg-[#7C3AED]', // Vibrant purple for personality
    },
    {
      id: 'career_success_and_wealth',
      label: t('tabs.career'),
      icon: <Briefcase className="h-6 w-6" />,
      color: 'bg-[#F59E0B]', // Vibrant amber for career
    },
    {
      id: 'relationships_love_and_marriage',
      label: t('tabs.relationships'),
      icon: <Users className="h-6 w-6" />,
      color: 'bg-[#EC4899]', // Vibrant pink for relationships
    },
    {
      id: 'health_and_wellbeing',
      label: t('tabs.health'),
      icon: <Heart className="h-6 w-6" />,
      color: 'bg-[#10B981]', // Vibrant emerald for health
    },
    {
      id: 'challenges_and_remedies',
      label: t('tabs.challenges'),
      icon: <GraduationCap className="h-6 w-6" />,
      color: 'bg-[#2435b3]',
    },
    {
      id: 'major_life_periods',
      label: t('tabs.lifePeriods'),
      icon: <Clock className="h-6 w-6" />,
      color: 'bg-[#2435b3]',
    },
  ];

  const handleSlideChange = (swiper: Swiper) => {
    const activeIndex = swiper.realIndex;
    const tab = tabs[activeIndex];
    if (tab && tab.id !== 'ask_anything') {
      setActiveTab(tab.id);
    }
  };

  const tabItems = tabs.map(tab => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      data-state={activeTab === tab.id ? 'active' : 'inactive'}
      className={`group relative flex flex-col items-center justify-center ${styles['tab-hover']}`}
    >
      <div className="relative z-10 flex flex-col items-center space-y-1 px-3 py-2.5">
        <div
          className={`rounded-full p-2 ${activeTab === tab.id ? 'bg-[#2435b3] text-white shadow-lg' : 'text-[#8B93B8] hover:bg-white/5 hover:text-white'}`}
        >
          {tab.icon}
        </div>
        <span
          className={`block text-center text-[11px] tracking-wide ${activeTab === tab.id ? 'font-semibold text-[#2435b3]' : 'font-medium text-[#8B93B8]'}`}
        >
          {tab.label}
        </span>
      </div>
      <div className={styles['tab-indicator']} />
    </button>
  ));

  return (
    <Carousel
      items={tabItems}
      slidesPerView={3}
      spaceBetween={8}
      onSlideChange={handleSlideChange}
    />
  );
}
