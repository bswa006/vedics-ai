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
        const response = await api.readings.getTodayReadings(userId);
        console.log('API Response:', response);
        
        if (isSubscribed) {
          if (response?.reading?.today_reading) {
            console.log('Setting today readings:', response.reading.today_reading);
            setTodayReadings(response.reading.today_reading);
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
        <div className="text-center text-gray-500">
          Loading your daily stars...
        </div>
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

  return (
    <div className="mb-6">
      <div key="general-insights" className="group relative px-8 py-6 transition-all duration-300 bg-white dark:bg-gray-900 backdrop-blur-sm hover:scale-[1.01] hover:bg-white/95 dark:hover:bg-gray-900/95 mb-6">
        <h3 className="mb-5 flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">✧</span>
          GENERAL INSIGHTS
        </h3>
        <p className="border-l-2 border-purple-200 pl-4 text-base leading-relaxed text-gray-600 transition-colors duration-300 hover:border-purple-400 dark:border-purple-800/30 dark:text-gray-300 dark:hover:border-purple-600/50">
          {todayReadings?.general_insights}
        </p>
      </div>

      <div key="color" className="group relative px-8 py-6 transition-all duration-300 bg-white dark:bg-gray-900 backdrop-blur-sm hover:scale-[1.01] hover:bg-white/95 dark:hover:bg-gray-900/95 mb-6">
        <h3 className="mb-5 flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">✧</span>
          COLOR OF THE DAY
        </h3>
        <p className="border-l-2 border-purple-200 pl-4 text-base leading-relaxed text-gray-600 transition-colors duration-300 hover:border-purple-400 dark:border-purple-800/30 dark:text-gray-300 dark:hover:border-purple-600/50">
          {todayReadings?.color_of_the_day}
        </p>
      </div>

      <div key="activities" className="group relative px-8 py-6 transition-all duration-300 bg-white dark:bg-gray-900 backdrop-blur-sm hover:scale-[1.01] hover:bg-white/95 dark:hover:bg-gray-900/95 mb-6">
        <h3 className="mb-5 flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">✧</span>
          FAVORABLE ACTIVITIES
        </h3>
        <div className="flex flex-wrap gap-2">
          {todayReadings?.favorable_activities?.map((activity, index) => (
            <span
              key={index}
              className="mb-2 mr-2 inline-flex items-center gap-1.5 rounded-full bg-purple-100/80 py-1 pl-2 pr-3 text-sm font-medium text-purple-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-200/90 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40"
            >
              {activity}
            </span>
          ))}
        </div>
      </div>

      <div key="aspects" className="group relative px-8 py-6 transition-all duration-300 bg-white dark:bg-gray-900 backdrop-blur-sm hover:scale-[1.01] hover:bg-white/95 dark:hover:bg-gray-900/95 mb-6">
        <h3 className="mb-5 flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">✧</span>
          CHALLENGING ASPECTS
        </h3>
        <div className="flex flex-wrap gap-2">
          {todayReadings?.challenging_aspects?.map((aspect, index) => (
            <span
              key={index}
              className="mb-2 mr-2 inline-flex items-center gap-1.5 rounded-full bg-purple-100/80 py-1 pl-2 pr-3 text-sm font-medium text-purple-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-200/90 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40"
            >
              {aspect}
            </span>
          ))}
        </div>
      </div>

      <div key="remedies" className="group relative px-8 py-6 transition-all duration-300 bg-white dark:bg-gray-900 backdrop-blur-sm hover:scale-[1.01] hover:bg-white/95 dark:hover:bg-gray-900/95">
        <h3 className="mb-5 flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">✧</span>
          REMEDIES FOR THE DAY
        </h3>
        <div className="flex flex-wrap gap-2">
          {todayReadings?.remedies_for_the_day?.map((remedy, index) => (
            <span
              key={index}
              className="mb-2 mr-2 inline-flex items-center gap-1.5 rounded-full bg-purple-100/80 py-1 pl-2 pr-3 text-sm font-medium text-purple-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-200/90 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40"
            >
              {remedy}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
