import { Briefcase, Clock, GraduationCap, Heart, User, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PredictionType } from '../../types/predictions';

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
      color: 'from-indigo-500 via-purple-500 to-fuchsia-500', // Mystical cosmic energy for personality
    },
    {
      id: 'career_success_and_wealth',
      label: t('tabs.career'),
      icon: <Briefcase className="h-6 w-6" />,
      color: 'from-amber-400 via-yellow-500 to-orange-500', // Solar energy for career success
    },
    {
      id: 'relationships_love_and_marriage',
      label: t('tabs.relationships'),
      icon: <Users className="h-6 w-6" />,
      color: 'from-rose-500 via-pink-500 to-purple-500', // Venus-inspired colors for relationships
    },
    {
      id: 'health_and_wellbeing',
      label: t('tabs.health'),
      icon: <Heart className="h-6 w-6" />,
      color: 'from-emerald-400 via-teal-500 to-cyan-500', // Earth's healing aura for health
    },
    {
      id: 'challenges_and_remedies',
      label: t('tabs.challenges'),
      icon: <GraduationCap className="h-6 w-6" />,
      color: 'from-blue-600 via-indigo-600 to-violet-600', // Deep space energy for challenges
    },
    {
      id: 'major_life_periods',
      label: t('tabs.lifePeriods'),
      icon: <Clock className="h-6 w-6" />,
      color: 'from-cyan-400 via-blue-500 to-indigo-500', // Time-space continuum colors
    },
  ];

  return (
    <div className="mb-4 rounded-2xl bg-gradient-to-b from-white to-gray-50 p-3 shadow-xl shadow-gray-200/50 dark:from-gray-800 dark:to-gray-900 dark:shadow-black/10">
      <div className="grid grid-cols-3 gap-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`group relative flex flex-col items-center justify-center rounded-xl p-4 transition-all duration-300 ${
              activeTab === tab.id
                ? `bg-gradient-to-r ${tab.color} scale-105 transform text-white shadow-lg ring-2 ring-white/30 ring-offset-2 ring-offset-gray-50 dark:ring-white/20 dark:ring-offset-gray-900`
                : 'text-gray-600 hover:bg-white hover:shadow-md dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            <div
              className={`mb-2 transition-transform duration-300 ${
                activeTab !== tab.id && 'group-hover:scale-110'
              }`}
            >
              {tab.icon}
            </div>
            <span className="whitespace-nowrap text-sm font-medium tracking-wide">{tab.label}</span>
            {activeTab === tab.id && (
              <div className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r ${tab.color} opacity-20 blur animate-pulse`} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
