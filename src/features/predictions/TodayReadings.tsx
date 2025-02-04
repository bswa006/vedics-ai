import { useEffect, useState } from 'react';
import { CalendarDays, Check, Sparkles, Sun, XCircle } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import { api } from '../../services/api';
import { TodayReading } from '../../types/readings';

interface TodayReadingsProps {
  userId: number;
}

export function TodayReadings({ userId }: TodayReadingsProps) {
  const [readings, setReadings] = useState<TodayReading | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodayReadings = async () => {
      try {
        // const data = await api.readings.getTodayReadings(userId);
        // if (!data?.reading?.today_reading) {
        //   throw new Error('Invalid response format');
        // }
        // setReadings(data.reading.today_reading);
        // setError(null);
      } catch (err: unknown) {
        console.error("Failed to fetch today's readings:", err);
        setError("Failed to load today's readings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodayReadings();
  }, [userId]);

  if (loading) {
    return (
      <div className={cn('flex h-64 items-center justify-center')}>
        <div
          className={cn('h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500')}
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('flex h-64 flex-col items-center justify-center text-red-500')}>
        <XCircle className={cn('mb-2 h-8 w-8')} />
        <p>{error}</p>
      </div>
    );
  }

  if (!readings) {
    return null;
  }

  const {
    general_insights = '',
    color_of_the_day = '',
    favorable_activities = [],
    challenging_aspects = [],
    remedies_for_the_day = [],
  } = readings;

  return (
    <div className={cn('space-y-6')}>
      {/* General Insights */}
      {general_insights && (
        <Card className={cn('p-6')}>
          <div className={cn('mb-4 flex items-center gap-2')}>
            <Sparkles className={cn('h-6 w-6 text-blue-500')} />
            <h2 className={cn('text-xl font-semibold')}>Daily Insights</h2>
          </div>
          <p className={cn('text-gray-700 dark:text-gray-300')}>{general_insights}</p>
        </Card>
      )}

      {/* Color of the Day */}
      {color_of_the_day && (
        <Card className={cn('p-6')}>
          <div className={cn('mb-4 flex items-center gap-2')}>
            <Sun className={cn('h-6 w-6 text-yellow-500')} />
            <h2 className={cn('text-xl font-semibold')}>Color of the Day</h2>
          </div>
          <div className={cn('flex items-center gap-2')}>
            <div
              className={cn('h-6 w-6 rounded-full')}
              style={{ backgroundColor: color_of_the_day.toLowerCase() }}
            />
            <span className={cn('text-lg')}>{color_of_the_day}</span>
          </div>
        </Card>
      )}

      {/* Activities and Challenges */}
      {(favorable_activities.length > 0 || challenging_aspects.length > 0) && (
        <div className={cn('grid grid-cols-1 gap-6 md:grid-cols-2')}>
          {/* Favorable Activities */}
          {favorable_activities.length > 0 && (
            <Card className={cn('p-6')}>
              <div className={cn('mb-4 flex items-center gap-2')}>
                <Check className={cn('h-6 w-6 text-green-500')} />
                <h2 className={cn('text-xl font-semibold')}>Favorable Activities</h2>
              </div>
              <ul className={cn('space-y-2')}>
                {favorable_activities.map((activity, index) => (
                  <li key={index} className={cn('flex items-center gap-2')}>
                    <Check className={cn('h-4 w-4 text-green-500')} />
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Challenging Aspects */}
          {challenging_aspects.length > 0 && (
            <Card className={cn('p-6')}>
              <div className={cn('mb-4 flex items-center gap-2')}>
                <XCircle className={cn('h-6 w-6 text-red-500')} />
                <h2 className={cn('text-xl font-semibold')}>Challenging Aspects</h2>
              </div>
              <ul className={cn('space-y-2')}>
                {challenging_aspects.map((aspect, index) => (
                  <li key={index} className={cn('flex items-center gap-2')}>
                    <XCircle className={cn('h-4 w-4 text-red-500')} />
                    <span>{aspect}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      )}

      {/* Daily Remedies */}
      {remedies_for_the_day.length > 0 && (
        <Card className={cn('p-6')}>
          <div className={cn('mb-4 flex items-center gap-2')}>
            <CalendarDays className={cn('h-6 w-6 text-purple-500')} />
            <h2 className={cn('text-xl font-semibold')}>Daily Remedies</h2>
          </div>
          <ul className={cn('space-y-2')}>
            {remedies_for_the_day.map((remedy, index) => (
              <li key={index} className={cn('flex items-center gap-2')}>
                <div className={cn('mt-2 h-2 w-2 rounded-full bg-purple-500')} />
                <span>{remedy}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
