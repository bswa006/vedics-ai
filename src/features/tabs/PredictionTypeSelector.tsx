import { CalendarDays, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PredictionTypeSelectorProps {
  predictionType: 'overall' | 'daily' | 'monthly';
  setPredictionType: (type: 'overall' | 'daily' | 'monthly') => void;
}

export function PredictionTypeSelector({
  predictionType,
  setPredictionType,
}: PredictionTypeSelectorProps) {
  const { t } = useTranslation();

  const types = [
    {
      id: 'overall',
      label: t('predictions.generalFuture'),
      icon: <Sparkles className="h-5 w-5" />,
    },

    {
      id: 'monthly',
      label: t('predictions.monthly'),
      icon: <CalendarDays className="h-5 w-5" />,
    },
  ] as const;

  return (
    <div className="mb-2 flex justify-center gap-2">
      {types.map(type => (
        <button
          key={type.id}
          onClick={() => setPredictionType(type.id)}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-all duration-300 ${
            predictionType === type.id
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white ring-2 ring-indigo-200 dark:ring-indigo-900'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800'
          }`}
        >
          <div className="h-4 w-4">{type.icon}</div>
          <span className="font-medium">{type.label}</span>
        </button>
      ))}
    </div>
  );
}
