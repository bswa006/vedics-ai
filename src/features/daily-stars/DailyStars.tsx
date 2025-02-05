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
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="mt-2 text-sm text-gray-500">Loading your daily stars...</p>
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
    <div className="animate-fadeIn space-y-8 p-4">
      <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-indigo-500/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-indigo-500/5 hover:via-purple-500/5 hover:to-fuchsia-500/5 dark:hover:from-indigo-500/10 dark:hover:via-purple-500/10 dark:hover:to-fuchsia-500/10">
        <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
          <span className="mr-2">🌙</span>
          General Insights
        </h3>
        <p className="leading-relaxed text-black dark:text-white">
          {todayReadings?.general_insights}
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-indigo-500/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-indigo-500/5 hover:via-purple-500/5 hover:to-fuchsia-500/5 dark:hover:from-indigo-500/10 dark:hover:via-purple-500/10 dark:hover:to-fuchsia-500/10">
        <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
          <span className="mr-2">🌈</span>
          Color of the Day
        </h3>
        <p className="leading-relaxed text-black dark:text-white">
          {todayReadings?.color_of_the_day}
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-indigo-500/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-indigo-500/5 hover:via-purple-500/5 hover:to-fuchsia-500/5 dark:hover:from-indigo-500/10 dark:hover:via-purple-500/10 dark:hover:to-fuchsia-500/10">
        <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
          <span className="mr-2">♃</span>
          Favorable Activities
        </h3>
        <div className="flex flex-wrap gap-2">
          {todayReadings?.favorable_activities?.map((activity, index) => (
            <span
              key={index}
              className="mb-2 mr-2 inline-block rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
            >
              {activity}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-indigo-500/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-indigo-500/5 hover:via-purple-500/5 hover:to-fuchsia-500/5 dark:hover:from-indigo-500/10 dark:hover:via-purple-500/10 dark:hover:to-fuchsia-500/10">
        <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
          <span className="mr-2">♂</span>
          Challenging Aspects
        </h3>
        <div className="flex flex-wrap gap-2">
          {todayReadings?.challenging_aspects?.map((aspect, index) => (
            <span
              key={index}
              className="mb-2 mr-2 inline-block rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
            >
              {aspect}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-indigo-500/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-indigo-500/5 hover:via-purple-500/5 hover:to-fuchsia-500/5 dark:hover:from-indigo-500/10 dark:hover:via-purple-500/10 dark:hover:to-fuchsia-500/10">
        <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
          <span className="mr-2">☿</span>
          Remedies for the Day
        </h3>
        <div className="flex flex-wrap gap-2">
          {todayReadings?.remedies_for_the_day?.map((remedy, index) => (
            <span
              key={index}
              className="mb-2 mr-2 inline-block rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
            >
              {remedy}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
