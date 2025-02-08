import { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'highlight';
  icon?: string;
  title?: string;
  excerpt?: string;
  cta?: string;
}

export function Card({
  className,
  variant = 'default',
  icon,
  title,
  excerpt,
  cta,
  children,
  ...props
}: CardProps) {
  const variants = {
    default: 'bg-creamWhite dark:bg-midnightIndigo',
    interactive: 'cursor-pointer hover:border-celestialLilac/30 hover:bg-celestialLilac/5',
    highlight: 'border-vedicSaffron/50 bg-vedicSaffron/10',
  };

  return (
    <motion.div
      whileHover={variant === 'interactive' ? { scale: 1.02 } : undefined}
      className={cn(
        'rounded-xl border border-gray-200 dark:border-gray-700/50',
        'shadow-lg backdrop-blur-sm transition-all duration-300',
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="p-5 space-y-4">
        {(icon || title) && (
          <div className="flex items-center space-x-3">
            {icon && (
              <span className="text-2xl drop-shadow-lg transition-transform duration-300">
                {icon}
              </span>
            )}
            {title && (
              <h3 className="font-heading font-semibold text-lg bg-gradient-to-r from-deepCharcoal to-deepCharcoal/90 dark:from-white dark:to-white/90 bg-clip-text text-transparent">
                {title}
              </h3>
            )}
          </div>
        )}
        {excerpt && (
          <p className="text-coolGray dark:text-gray-400 text-sm leading-relaxed">
            {excerpt}
          </p>
        )}
        {cta && (
          <button className="text-vedicSaffron hover:text-vedicSaffron/80 text-sm font-medium transition-colors">
            {cta}
          </button>
        )}
        {children}
      </div>
    </motion.div>
  );
}
