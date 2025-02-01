import {
  Briefcase,
  Clock,
  GraduationCap,
  Heart,
  User,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PredictionType } from "../../types/predictions";

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
      id: "core_personality_and_life_path",
      label: t("tabs.personality"),
      icon: <User className="w-4 h-4" />,
      color: "from-oriental-500 to-oriental-500",
    },
    {
      id: "career_success_and_wealth",
      label: t("tabs.career"),
      icon: <Briefcase className="w-4 h-4" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "relationships_love_and_marriage",
      label: t("tabs.relationships"),
      icon: <Users className="w-4 h-4" />,
      color: "from-rose-500 to-pink-500",
    },
    {
      id: "health_and_wellbeing",
      label: t("tabs.health"),
      icon: <Heart className="w-4 h-4" />,
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: "challenges_and_remedies",
      label: t("tabs.challenges"),
      icon: <GraduationCap className="w-4 h-4" />,
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "major_life_periods",
      label: t("tabs.lifePeriods"),
      icon: <Clock className="w-4 h-4" />,
      color: "from-fuchsia-500 to-pink-500",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/10 p-3 mb-4">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`group relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300
              ${
                activeTab === tab.id
                  ? `bg-gradient-to-br ${tab.color} ring-2 ring-white/20 dark:ring-black/20 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900 text-white shadow-lg transform scale-105`
                  : "hover:bg-white dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 hover:shadow-md"
              }`}
          >
            <div
              className={`mb-2 transition-transform duration-300 ${
                activeTab !== tab.id && "group-hover:scale-110"
              }`}
            >
              {tab.icon}
            </div>
            <span className="text-xs font-medium tracking-wide whitespace-nowrap">
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <div className="absolute -inset-0.5 bg-white/20 dark:bg-black/20 rounded-xl blur opacity-50" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
