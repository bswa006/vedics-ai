import { useEffect, useState, useCallback, useRef } from 'react';
import { TodayReading } from '../../types/readings';
import api from '../../services/api';

interface DailyStarsProps {
  userId: number;
}

export function DailyStars({ userId }: DailyStarsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [todayReadings, setTodayReadings] = useState<TodayReading | null>(null);
  const fetchInProgressRef = useRef(false);

  const fetchTodayReadings = useCallback(async (signal: AbortSignal) => {
    if (fetchInProgressRef.current) return;
    fetchInProgressRef.current = true;

    try {
      setLoading(true);
      setError(null);

      const response: any = await api.readings.getTodayReadings();

      if (!signal.aborted) {
        if (response?.message?.content) {
          setTodayReadings(response.message.content);
        } else {
          setError('No readings available for today');
        }
      }
    } catch (err) {
      if (!signal.aborted) {
        console.error('Failed to fetch daily readings:', err);
        setError(err instanceof Error ? err.message : "Failed to fetch today's readings");
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
      fetchInProgressRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const abortController = new AbortController();
    
    // Only fetch if we don't have readings
    if (!todayReadings) {
      fetchTodayReadings(abortController.signal);
    }

    return () => {
      abortController.abort();
    };
  }, [userId, todayReadings, fetchTodayReadings]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center text-gray-500">Loading your daily stars...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  if (!todayReadings) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center text-gray-500">No readings available for today.</div>
      </div>
    );
  }

  const cardStyle = `
    group relative px-8 py-6 transition-all duration-300
    bg-white dark:bg-gray-900 backdrop-blur-sm
    hover:scale-[1.01] hover:bg-white/95 dark:hover:bg-gray-900/95
    border-b border-gray-200 dark:border-gray-800
    last:border-b-0
  `;

  const renderArrayContent = (items: any[]) => {
    // Handle array of objects
    if (items.length > 0 && typeof items[0] === 'object') {
      return (
        <div className="space-y-3 w-full">
          {items.map((item, index) => (
            <div key={index} className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/10">
              {Object.entries(item).map(([key, value]) => (
                <div key={key} className="mb-2 last:mb-0">
                  <span className="font-medium text-purple-700 dark:text-purple-300">
                    {key.split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}:
                  </span>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    {Array.isArray(value) ? value.join(', ') : String(value)}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    const stringItems = items.map(item => {
      if (typeof item === 'string') return item;
      if (typeof item === 'number') return item.toString();
      if (typeof item === 'object' && item !== null) return JSON.stringify(item);
      return String(item);
    });

    const isThreeWordArray = stringItems.every(
      item => item.split(' ').length <= 3
    );

    if (isThreeWordArray) {
      return stringItems.map((item, index) => (
        <span
          key={index}
          className="mb-2 mr-2 inline-flex items-center gap-1.5 rounded-full bg-purple-100/80 py-1 pl-2 pr-3 text-sm font-medium text-purple-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-200/90 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40"
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

  const renderValue = (value: any): JSX.Element | JSX.Element[] => {
    if (Array.isArray(value)) {
      return <div className="flex flex-wrap gap-2">{renderArrayContent(value)}</div>;
    } else if (typeof value === 'object' && value !== null) {
      // Special handling for dosha_balance
      if ('vata' in value || 'pitta' in value || 'kapha' in value) {
        return (
          <div className="grid gap-4 md:grid-cols-3">
            {Object.entries(value).map(([doshaName, doshaInfo]) => (
              <div key={doshaName} className="rounded-lg bg-purple-50/50 p-5 dark:bg-purple-900/10 transition-all duration-300 hover:shadow-md">
                <h4 className="mb-3 text-lg font-medium capitalize text-gray-800 dark:text-gray-100 flex items-center">
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    {doshaName === 'vata' ? '🍃' : doshaName === 'pitta' ? '🔥' : '💧'}
                  </span>
                  {doshaName.charAt(0).toUpperCase() + doshaName.slice(1)}
                </h4>
                {typeof doshaInfo === 'object' && doshaInfo !== null && (
                  <>
                    <div className="mb-3 flex items-center">
                      <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Level:</span>
                      <span className="ml-2 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700 dark:bg-purple-800/40 dark:text-purple-300">
                        {((doshaInfo as any).level).charAt(0).toUpperCase() + ((doshaInfo as any).level).slice(1)}
                      </span>
                    </div>
                    <div className="border-l-2 border-purple-200 pl-4 dark:border-purple-800/30">
                      <p className="text-gray-600 dark:text-gray-300">
                        {(doshaInfo as any).advice}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        );
      }
      
      // Handle mood_cycles
      if ('mood_cycles' in value) {
        return (
          <div className="space-y-4">
            <h4 className="mb-2 text-base font-medium text-gray-800 dark:text-gray-100">
              Mood Cycles
            </h4>
            <div className="space-y-3">
              {value.mood_cycles.map((item: any, index: number) => (
                <div key={index} className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/10 border-l-4 border-purple-200 dark:border-purple-800/30">
                  <div className="mb-2 flex items-center">
                    <span className="font-medium text-purple-700 dark:text-purple-300">Quality:</span>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{item.quality.charAt(0).toUpperCase() + item.quality.slice(1)}</span>
                  </div>
                  <div className="mb-2 flex items-center">
                    <span className="font-medium text-purple-700 dark:text-purple-300">Time Window:</span>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{item.time_window}</span>
                  </div>
                  {item.planetary_influence && (
                    <div className="flex items-center">
                      <span className="font-medium text-purple-700 dark:text-purple-300">Planetary Influence:</span>
                      <span className="ml-2 text-gray-700 dark:text-gray-300">{item.planetary_influence}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }
      
      // Handle crystal_recommendations
      if ('crystal_recommendations' in value) {
        return (
          <div className="space-y-4">
            <h4 className="mb-2 text-base font-medium text-gray-800 dark:text-gray-100">
              Crystal Recommendations
            </h4>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {value.crystal_recommendations.map((item: any, index: number) => (
                <div key={index} className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/10 hover:shadow-md transition-all duration-300">
                  <div className="mb-2">
                    <span className="font-medium text-purple-700 dark:text-purple-300">Stone:</span>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{item.stone.charAt(0).toUpperCase() + item.stone.slice(1)}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-medium text-purple-700 dark:text-purple-300">Usage:</span>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{item.usage.charAt(0).toUpperCase() + item.usage.slice(1)}</span>
                  </div>
                  {item.purpose && (
                    <div>
                      <span className="font-medium text-purple-700 dark:text-purple-300">Purpose:</span>
                      <span className="ml-2 text-gray-700 dark:text-gray-300">{item.purpose.charAt(0).toUpperCase() + item.purpose.slice(1)}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }
      
      // Handle other nested objects
      return (
        <div className="space-y-4">
          {Object.entries(value).map(([subKey, subValue]) => (
            <div key={subKey} className="mt-4">
              <h4 className="mb-3 flex items-center gap-2 text-base font-medium text-gray-800 dark:text-gray-100">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-400 dark:bg-purple-500"></span>
                {subKey
                  .split('_')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </h4>
              {renderValue(subValue)}
            </div>
          ))}
        </div>
      );
    } else if (typeof value === 'string') {
      return (
        <p className="border-l-2 border-purple-200 pl-4 text-base leading-relaxed text-gray-600 transition-colors duration-300 hover:border-purple-400 dark:border-purple-800/30 dark:text-gray-300 dark:hover:border-purple-600/50">
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </p>
      );
    }
    return <>{String(value).charAt(0).toUpperCase() + String(value).slice(1)}</>;
  };

  return (
    <div>
      {todayReadings &&
        Object.entries(todayReadings).map(([key, value]) => (
          <div key={key} className={cardStyle}>
            <h3 className="mb-5 flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                ✧
              </span>
              {key
                .split('_')
                .map(word => word.charAt(0).toLowerCase() + word.slice(1))
                .join(' ')}
            </h3>
            {renderValue(value)}
          </div>
        ))}
    </div>
  );
}
