import { useEffect, useState, useCallback, useRef } from 'react';
import { TodayReading } from '../../types/readings';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

interface DailyStarsProps {
  userId: number;
}

export function DailyStars({ userId }: DailyStarsProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [todayReadings, setTodayReadings] = useState<TodayReading | null>(null);
  const fetchInProgressRef = useRef(false);
  const [refreshing, setRefreshing] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

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
        setRefreshing(false);
      }
      fetchInProgressRef.current = false;
    }
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    const abortController = new AbortController();
    fetchTodayReadings(abortController.signal);
    
    return () => {
      abortController.abort();
    };
  };

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

  // Loading state
  if (loading && !refreshing) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="mb-6 text-6xl flex justify-center"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <Sparkles className="text-purple-500" size={48} />
          </motion.div>
          <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
            Reading the stars...
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Aligning cosmic energies for your daily guidance
          </p>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex h-[80vh] items-center justify-center p-6">
        <motion.div 
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 text-4xl flex justify-center text-red-500">⚠️</div>
          <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
            Cosmic Interference
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error}
          </p>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            <RefreshCw size={16} className="mr-2" />
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  // No readings state
  if (!todayReadings) {
    return (
      <div className="flex h-[80vh] items-center justify-center p-6">
        <motion.div 
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 text-4xl flex justify-center text-gray-400">🔭</div>
          <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
            Stars Are Aligning
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            No readings available for today yet. The cosmic energies are still aligning.
          </p>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            <RefreshCw size={16} className="mr-2" />
            Check Again
          </button>
        </motion.div>
      </div>
    );
  }

  const renderValue = (value: any): JSX.Element | JSX.Element[] | string => {
    if (Array.isArray(value)) {
      return (
        <div className="space-y-4">
          {value.map((item, index) => (
            <div key={index} className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/10">
              {typeof item === 'object' && item !== null ? (
                Object.entries(item).map(([key, val]) => (
                  <div key={key} className="mb-2 last:mb-0">
                    <span className="font-medium text-purple-700 dark:text-purple-300">
                      {key.split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}:
                    </span>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                      {String(val)}
                    </span>
                  </div>
                ))
              ) : (
                <span className="text-gray-700 dark:text-gray-300">{String(item)}</span>
              )}
            </div>
          ))}
        </div>
      );
    } else if (typeof value === 'object' && value !== null) {
      // Handle dosha objects with level and advice
      if ('level' in value && 'advice' in value) {
        return (
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="font-medium text-purple-700 dark:text-purple-300">Level:</span>
              <span className="ml-2 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700 dark:bg-purple-800/40 dark:text-purple-300">
                {(value.level as string).charAt(0).toUpperCase() + (value.level as string).slice(1)}
              </span>
            </div>
            <div className="border-l-2 border-purple-200 pl-4 dark:border-purple-800/30">
              <p className="text-gray-600 dark:text-gray-300">
                {value.advice as string}
              </p>
            </div>
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
            <div className="grid gap-3 sm:grid-cols-2">
              {value.mood_cycles.map((item: any, index: number) => (
                <motion.div 
                  key={index} 
                  className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/10 hover:shadow-md transition-all duration-300"
                  whileHover={{ 
                    scale: 1.03, 
                    backgroundColor: "rgba(168, 85, 247, 0.08)",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" 
                  }}
                >
                  <div className="mb-2">
                    <span className="font-medium text-purple-700 dark:text-purple-300">Quality:</span>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{item.quality.charAt(0).toUpperCase() + item.quality.slice(1)}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-medium text-purple-700 dark:text-purple-300">Time Window:</span>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{item.time_window}</span>
                  </div>
                  {item.planetary_influence && (
                    <div>
                      <span className="font-medium text-purple-700 dark:text-purple-300">Planetary Influence:</span>
                      <span className="ml-2 text-gray-700 dark:text-gray-300">{item.planetary_influence}</span>
                    </div>
                  )}
                </motion.div>
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
                <motion.div 
                  key={index} 
                  className="rounded-lg bg-purple-50/50 p-4 dark:bg-purple-900/10 hover:shadow-md transition-all duration-300"
                  whileHover={{ 
                    scale: 1.03, 
                    backgroundColor: "rgba(168, 85, 247, 0.08)",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" 
                  }}
                >
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
                </motion.div>
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
        <motion.p 
          className="border-l-2 border-purple-200 pl-4 text-base leading-relaxed text-gray-600 transition-colors duration-300 hover:border-purple-400 dark:border-purple-800/30 dark:text-gray-300 dark:hover:border-purple-600/50"
          whileHover={{ x: 3, borderLeftColor: "rgb(168, 85, 247)" }}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </motion.p>
      );
    }
    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
  };

  return (
    <div className="space-y-6 px-4 py-6">
      {/* Refreshing indicator */}
      <AnimatePresence>
        {refreshing && (
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm flex items-center">
              <Sparkles className="mr-2 animate-pulse" size={16} />
              Refreshing your cosmic guidance...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {todayReadings &&
          Object.entries(todayReadings).map(([key, value], index) => (
            <motion.div 
              key={key} 
              variants={cardVariants}
              className="rounded-xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Improved header styling for better visibility */}
              <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 dark:from-purple-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-purple-100 dark:border-purple-900/30">
                <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    ✧
                  </span>
                  {key
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </h3>
              </div>
              
              {/* Content section with improved styling for dosha elements */}
              <div className="px-6 py-5">
                {typeof value === 'object' && value !== null && !Array.isArray(value) && 
                 Object.keys(value).length > 0 && 
                 Object.keys(value).every(k => ['वात', 'पित्त', 'कफ'].includes(k)) ? (
                  <div className="space-y-6">
                    {Object.entries(value).map(([doshaKey, doshaValue]) => (
                      <div key={doshaKey} className="space-y-3">
                        {/* Enhanced dosha header */}
                        <h4 className="text-lg font-medium text-purple-700 dark:text-purple-400 flex items-center">
                          <span className="inline-block h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
                          {doshaKey}
                        </h4>
                        
                        {/* Dosha content with improved styling */}
                        {typeof doshaValue === 'object' && doshaValue !== null && (
                          <div className="ml-4 space-y-4">
                            {Object.entries(doshaValue as object).map(([subKey, subValue]) => (
                              <div key={subKey} className="space-y-2">
                                <h5 className="text-base font-medium text-gray-700 dark:text-gray-300 flex items-center">
                                  <span className="w-1.5 h-1.5 rounded-full bg-purple-300 dark:bg-purple-700 mr-2"></span>
                                  {subKey}
                                </h5>
                                <div className="ml-3.5 border-l-2 border-purple-200 dark:border-purple-800/30 pl-4">
                                  <p className="text-gray-600 dark:text-gray-400">
                                    {String(subValue)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  renderValue(value)
                )}
              </div>
            </motion.div>
          ))}
      </motion.div>
      
      {/* Refresh button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className={`px-4 py-2 rounded-full flex items-center ${refreshing 
            ? 'bg-purple-100 text-purple-400 dark:bg-purple-900/30 dark:text-purple-300' 
            : 'bg-purple-100 text-purple-600 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-800/40'}`}
        >
          <RefreshCw 
            size={18} 
            className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} 
          />
          {refreshing ? 'Refreshing...' : 'Refresh Readings'}
        </button>
      </div>
    </div>
  );
}
