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
      <div className="relative mx-auto mt-2 max-w-md px-4">
        {/* Outer glow effect */}
        <div className="absolute -inset-[1px] rounded-[21px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-[1px]" />

        {/* Main container */}
        <div className="group relative overflow-hidden rounded-[20px] bg-[#070B14] p-[1px]">
          {/* Gradient border */}
          <div className="absolute inset-0 rounded-[20px] p-[1px]">
            <div className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-[20px] bg-[conic-gradient(from_0deg,#1E293B,#3B82F6,#1E293B)] opacity-40" />
          </div>

          {/* Inner container with glass effect */}
          <div className="relative rounded-[19px] bg-gradient-to-br from-[#0B1120]/90 via-[#0F172A]/80 to-[#0B1120]/90 px-6 py-1.5 backdrop-blur-xl">
            {/* Deep space effect */}
            <div className="absolute inset-0 rounded-[19px] bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
            <div className="absolute inset-0 rounded-[19px] bg-[radial-gradient(circle_at_80%_20%,rgba(147,197,253,0.1),transparent_50%)]" />
            <div className="absolute inset-0 rounded-[19px] bg-[radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.1),transparent_50%)]" />

            {/* Content */}
            <div className="relative">
              {/* Main text */}
              <div className="text-center">
                <div className="relative z-10 bg-gradient-to-r from-white/90 via-white to-white/90 bg-clip-text text-sm font-medium tracking-wide text-transparent">
                  Loading your daily stars...
                </div>
              </div>

              {/* Animated line */}
              <div className="relative mx-auto mt-0.5 h-[2px] w-16 overflow-hidden rounded-full bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30">
                {/* Primary shimmer */}
                <div className="absolute h-full w-2/3 animate-[loading_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white to-transparent" />
                {/* Blue accent */}
                <div className="absolute h-full w-1/2 animate-[loading_2s_ease-in-out_infinite_0.3s] bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
                {/* Purple accent */}
                <div className="absolute h-full w-1/2 animate-[loading_2s_ease-in-out_infinite_0.6s] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
                {/* Cyan accent */}
                <div className="absolute h-full w-1/3 animate-[loading_2s_ease-in-out_infinite_0.9s] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                {/* Sparkle overlay */}
                <div className="absolute inset-0 animate-[shimmer_3s_linear_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
            </div>
          </div>
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
