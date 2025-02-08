import { useEffect, useState } from 'react';
import { TodayReading } from '../../types/readings';
import api from '../../services/api';

interface DailyStarsProps {
  userId: number;
}

export function DailyStars({ userId }: DailyStarsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [todayReadings, setTodayReadings] = useState<TodayReading | null>(null);

  useEffect(() => {
    if (!userId) {
      console.log('No userId provided');
      return;
    }

    console.log('Fetching readings for userId:', userId);
    let isSubscribed = true;

    const fetchTodayReadings = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Making API call to getTodayReadings...');
        const response: any = await api.readings.getTodayReadings();
        console.log('API Response:', response);

        if (isSubscribed) {
          if (response?.message?.content) {
            console.log('Setting today readings:', response.message.content);
            setTodayReadings(response.message.content);
          } else {
            console.log('No today_reading found in response');
            setError('No readings available for today');
          }
        }
      } catch (err) {
        console.error('API call failed:', err);
        if (isSubscribed) {
          setError(err instanceof Error ? err.message : "Failed to fetch today's readings");
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    fetchTodayReadings();

    return () => {
      isSubscribed = false;
    };
  }, [userId]);

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

  const renderArrayContent = (items: (string | number)[]) => {
    const isThreeWordArray = items.every(
      item => typeof item === 'number' || (typeof item === 'string' && item.split(' ').length <= 3)
    );

    if (isThreeWordArray) {
      return items.map((item, index) => (
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
          {items.map((item, index) => (
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
    } else if (typeof value === 'string') {
      return (
        <p className="border-l-2 border-purple-200 pl-4 text-base leading-relaxed text-gray-600 transition-colors duration-300 hover:border-purple-400 dark:border-purple-800/30 dark:text-gray-300 dark:hover:border-purple-600/50">
          {value}
        </p>
      );
    }
    return <></>;
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
