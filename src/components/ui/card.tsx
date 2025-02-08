import { HTMLMotionProps, motion } from 'framer-motion';
import * as React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'interactive' | 'highlight';
  icon?: string;
  title?: string;
  excerpt?: string;
  cta?: string;
  description?: string;
  contentClassName?: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function Card({
  className,
  variant = 'default',
  icon,
  title,
  excerpt,
  cta,
  children,
  onClick,
  ...props
}: CardProps) {
  const variants: Record<NonNullable<CardProps['variant']>, string> = {
    default: 'bg-creamWhite dark:bg-midnightIndigo',
    interactive: 'cursor-pointer hover:border-celestialLilac/30 hover:bg-celestialLilac/5',
    highlight: 'border-vedicSaffron/50 bg-vedicSaffron/10',
  };

  return (
    <motion.div
      className={cn(
        'rounded-xl border border-gray-200 dark:border-gray-700/50',
        'shadow-lg backdrop-blur-sm transition-all duration-300',
        variants[variant],
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className="space-y-4 p-5">
        {(icon || title) && (
          <div className="flex items-center space-x-3">
            {icon && (
              <span className="text-2xl drop-shadow-lg transition-transform duration-300">
                {icon}
              </span>
            )}
            {title && (
              <h3 className="from-deepCharcoal to-deepCharcoal/90 bg-gradient-to-r bg-clip-text font-heading text-lg font-semibold text-transparent dark:from-white dark:to-white/90">
                {title}
              </h3>
            )}
          </div>
        )}
        {excerpt && (
          <p className="text-coolGray text-sm leading-relaxed dark:text-gray-400">{excerpt}</p>
        )}
        {cta && (
          <button
            type="button"
            className="text-vedicSaffron hover:text-vedicSaffron/80 text-sm font-medium transition-colors"
            aria-label={cta}
          >
            {cta}
          </button>
        )}
        {children}
      </div>
    </motion.div>
  );
}
