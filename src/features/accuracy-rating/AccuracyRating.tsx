import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AccuracyRatingProps {
  onRate: (rating: number) => void;
  className?: string;
}

export const AccuracyRating: React.FC<AccuracyRatingProps> = ({ onRate, className }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleRate = (value: number) => {
    setRating(value);
    onRate(value);
  };

  return (
    <div className={cn('flex flex-col items-center space-y-4', className)}>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        Rate Prediction Accuracy
      </h3>
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <motion.button
            key={value}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleRate(value)}
            onMouseEnter={() => setHoveredRating(value)}
            onMouseLeave={() => setHoveredRating(0)}
            className="focus:outline-none"
          >
            <Star
              className={cn(
                'w-8 h-8 transition-colors duration-200',
                (value <= (hoveredRating || rating))
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              )}
            />
          </motion.button>
        ))}
      </div>
      {rating > 0 && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-gray-600 dark:text-gray-400"
        >
          Thank you for your feedback!
        </motion.p>
      )}
    </div>
  );
};
