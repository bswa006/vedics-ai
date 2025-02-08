import { Star } from 'lucide-react';
import styles from './TabNavigation.module.css';
import type { Swiper } from 'swiper';
import { Carousel } from '../../components/ui/Carousel';

interface Tab {
  id: string;
  label: string;
  icon: JSX.Element;
  color: string;
}

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  availableTabs: string[];
}

function getTabColor(index: number): string {
  // Predefined array of visually pleasing colors
  const colors: any = [
    'bg-[#7C3AED]', // Purple
    'bg-[#F59E0B]', // Amber
    'bg-[#EC4899]', // Pink
    'bg-[#10B981]', // Emerald
    'bg-[#3B82F6]', // Blue
    'bg-[#EF4444]', // Red
    'bg-[#8B5CF6]', // Violet
    'bg-[#14B8A6]', // Teal
  ];
  return colors[index % colors.length];
}

function formatLabel(id: string): string {
  return id
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function TabNavigation({ activeTab, setActiveTab, availableTabs = [] }: TabNavigationProps) {
  if (!availableTabs || availableTabs.length === 0) {
    return null;
  }

  const tabs: Tab[] = availableTabs.map((tabId, index) => ({
    id: tabId,
    label: formatLabel(tabId),
    icon: <Star className="h-6 w-6" />,
    color: getTabColor(index),
  }));

  const handleSlideChange = (swiper: Swiper) => {
    const activeIndex = swiper.realIndex;
    const tab = tabs[activeIndex];
    if (tab) {
      setActiveTab(tab.id);
    }
  };

  const tabItems = tabs.map(tab => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      data-state={activeTab === tab.id ? 'active' : 'inactive'}
      className={`group relative flex flex-col items-center justify-start pt-2 ${styles['tab-hover']}`}
    >
      <div className="relative z-10 flex flex-col items-center space-y-1">
        <div
          className={`rounded-full p-2 ${
            activeTab === tab.id
              ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg'
              : 'text-[#8B93B8] hover:bg-white/5 hover:text-white'
          }`}
        >
          {tab.icon}
        </div>
        <span
          className={`inline-block max-w-[80px] break-words text-center text-[11px] leading-tight tracking-wide ${
            activeTab === tab.id
              ? 'font-semibold text-indigo-500 dark:text-indigo-400'
              : 'font-medium text-[#8B93B8]'
          }`}
        >
          {tab.label}
        </span>
      </div>
      <div className={styles['tab-indicator']} />
    </button>
  ));

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div
      className="hide-scrollbar relative touch-pan-x overflow-x-auto"
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
      }}
    >
      <Carousel
        items={tabItems}
        slidesPerView={Math.min(3, tabs.length)}
        spaceBetween={8}
        onSlideChange={handleSlideChange}
      />
    </div>
  );
}
