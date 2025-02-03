import { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl bg-white dark:bg-gray-800 shadow-lg transition-all duration-300',
        className
      )}
      {...props}
    />
  );
}
