import { TabNavigation } from '../tabs/TabNavigation';
import { useState, useEffect } from 'react';

interface PredictionContentProps {
  predictions: Array<{
    prediction_type: string;
    content: Record<string, any>;
    id: number;
    created_at: string;
    updated_at: string;
  }>;
}

export function PredictionContent({ predictions }: PredictionContentProps): JSX.Element | null {
  console.log('Predictions:', predictions);

  if (!predictions || predictions.length === 0) return null;

  const availableTabs = predictions.map(p => p.prediction_type);
  const [activeTab, setActiveTab] = useState<string>(availableTabs[0] || '');

  useEffect(() => {
    // Update active tab if predictions change and current tab is no longer available
    if (!availableTabs.includes(activeTab)) {
      setActiveTab(availableTabs[0] || '');
    }
  }, [predictions, activeTab, availableTabs]);

  const cardStyle = `
    group relative px-8 py-6 transition-all duration-300
    bg-white dark:bg-gray-900 backdrop-blur-sm
    hover:scale-[1.01] hover:bg-white/95 dark:hover:bg-gray-900/95
    border-b border-gray-200 dark:border-gray-800
    last:border-b-0
  `;

  const renderArrayContent = (items: any[], className?: string) => {
    // Convert items to strings and ensure they are valid
    const stringItems = items.map(item => {
      if (typeof item === 'string') return item;
      if (typeof item === 'number') return item.toString();
      if (typeof item === 'object' && item !== null) return JSON.stringify(item);
      return String(item);
    });

    const isThreeWordArray = stringItems.every(item => item.split(' ').length <= 3);

    if (isThreeWordArray) {
      return stringItems.map((item, index) => (
        <span
          key={index}
          className={
            className ||
            'mb-2 mr-2 inline-flex items-center gap-1.5 rounded-full bg-purple-100/80 py-1 pl-2 pr-3 text-sm font-medium text-purple-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-200/90 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40'
          }
        >
          {item}
        </span>
      ));
    } else {
      return (
        <ul className="ml-1 list-none space-y-3">
          {stringItems.map((item, index) => (
            <li
              key={index}
              className="group/item -ml-2 flex items-start gap-3 rounded-lg p-2 transition-all duration-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              <span className="mt-1 text-purple-400 dark:text-purple-500">✦</span>
              <span className="text-gray-700 transition-colors duration-300 group-hover/item:text-purple-700 dark:text-gray-200 dark:group-hover/item:text-purple-300">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );
    }
  };

  const renderValue = (value: any, key: string): JSX.Element | JSX.Element[] => {
    if (Array.isArray(value)) {
      return <div className="flex flex-wrap gap-2">{renderArrayContent(value)}</div>;
    } else if (typeof value === 'object' && value !== null) {
      return Object.entries(value).map(([subKey, subValue]) => (
        <div key={subKey} className="mt-4">
          <h4 className="mb-3 flex items-center gap-2 text-base font-medium text-gray-800 dark:text-gray-100">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-400 dark:bg-purple-500"></span>
            {subKey
              .split('_')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </h4>
          {renderValue(subValue, `${key}.${subKey}`)}
        </div>
      ));
    } else if (typeof value === 'string') {
      return (
        <p className="border-l-2 border-purple-200 pl-4 text-base leading-relaxed text-gray-600 transition-colors duration-300 hover:border-purple-400 dark:border-purple-800/30 dark:text-gray-300 dark:hover:border-purple-600/50">
          {value}
        </p>
      );
    }
    return <></>;
  };

  const activePrediction = predictions.find(p => p.prediction_type === activeTab);
  if (!activePrediction) return null;

  const content = activePrediction.content;
  if (!content) return null;

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="h-[100px] w-full" />
      <div
        className="fixed inset-x-0 top-20 z-10 bg-[#1a1b26]/80 backdrop-blur-md"
        style={{
          transform: 'translate3d(0, 0, 0)',
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          WebkitBackfaceVisibility: 'hidden',
          WebkitPerspective: 1000,
          WebkitTransform: 'translate3d(0, 0, 0)',
        }}
      >
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          availableTabs={availableTabs}
        />
      </div>

      <div className="animate-fadeIn" data-testid={`${activeTab}-tab`}>
        {Object.entries(content).map(([key, value]) => (
          <div key={key} className={cardStyle}>
            <h3 className="mb-5 flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                ✧
              </span>
              {key
                .split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </h3>
            {renderValue(value, key)}
          </div>
        ))}
      </div>
    </div>
  );
}
