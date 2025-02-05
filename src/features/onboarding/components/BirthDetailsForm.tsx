import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { format, parse } from 'date-fns';
import { cn } from '../../../lib/utils';
import { motion } from 'framer-motion';

interface BirthDetails {
  date: Date | undefined;
  time: string;
  place: string;
}

interface BirthDetailsFormProps {
  onNext: () => void;
  birthDetails: BirthDetails;
  onBirthDetailsChange: (details: Partial<BirthDetails>) => void;
}

export const BirthDetailsForm: React.FC<BirthDetailsFormProps> = ({
  onNext,
  birthDetails,
  onBirthDetailsChange,
}) => {
  const { t } = useTranslation();
  const [isMobile] = React.useState(() => window.innerWidth <= 768);

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return;

    if (e.target.type === 'datetime-local') {
      const date = new Date(value);
      onBirthDetailsChange({
        date,
        time: format(date, 'HH:mm'),
      });
    } else if (e.target.type === 'date') {
      const date = parse(value, 'yyyy-MM-dd', new Date());
      onBirthDetailsChange({ date });
    } else if (e.target.type === 'time') {
      onBirthDetailsChange({ time: value });
    }
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <motion.div
        className="flex-none space-y-3 p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
          {t('onboarding.birthDetails.title')}
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-gray-400">
          {t('onboarding.birthDetails.description')}
        </p>
      </motion.div>

      <motion.div
        className="flex-1 overflow-y-auto px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="space-y-6">
          {isMobile ? (
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Label className="text-sm font-medium text-gray-300">
                {t('onboarding.birthDetails.dateLabel')}
              </Label>
              <Input
                type="datetime-local"
                value={birthDetails.date ? format(birthDetails.date, "yyyy-MM-dd'T'HH:mm") : ''}
                onChange={handleDateTimeChange}
                className={cn(
                  'h-12 rounded-xl px-4 py-2 text-white',
                  'border border-gray-700/50 bg-gray-800/40 backdrop-blur-sm',
                  'transition-all duration-300 ease-in-out',
                  'focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
                  'hover:border-blue-500/30 hover:bg-blue-500/5'
                )}
              />
            </motion.div>
          ) : (
            <>
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Label className="text-sm font-medium text-gray-300">
                  {t('onboarding.birthDetails.dateLabel')}
                </Label>
                <Input
                  type="date"
                  value={birthDetails.date ? format(birthDetails.date, 'yyyy-MM-dd') : ''}
                  onChange={handleDateTimeChange}
                  className={cn(
                    'h-12 rounded-xl px-4 py-2 text-white',
                    'border border-gray-700/50 bg-gray-800/40 backdrop-blur-sm',
                    'transition-all duration-300 ease-in-out',
                    'focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
                    'hover:border-blue-500/30 hover:bg-blue-500/5'
                  )}
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Label className="text-sm font-medium text-gray-300">
                  {t('onboarding.birthDetails.timeLabel')}
                </Label>
                <Input
                  type="time"
                  value={birthDetails.time}
                  onChange={handleDateTimeChange}
                  className={cn(
                    'h-12 rounded-xl px-4 py-2 text-white',
                    'border border-gray-700/50 bg-gray-800/40 backdrop-blur-sm',
                    'transition-all duration-300 ease-in-out',
                    'focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
                    'hover:border-blue-500/30 hover:bg-blue-500/5'
                  )}
                />
              </motion.div>
            </>
          )}

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Label className="text-sm font-medium text-gray-300">
              {t('onboarding.birthDetails.placeLabel')}
            </Label>
            <Input
              type="text"
              value={birthDetails.place}
              onChange={e => onBirthDetailsChange({ place: e.target.value })}
              placeholder={t('onboarding.birthDetails.placePlaceholder')}
              className={cn(
                'h-12 rounded-xl px-4 py-2 text-white',
                'border border-gray-700/50 bg-gray-800/40 backdrop-blur-sm',
                'transition-all duration-300 ease-in-out',
                'focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
                'hover:border-blue-500/30 hover:bg-blue-500/5'
              )}
            />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="flex-none p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button
          onClick={onNext}
          disabled={!birthDetails.date || !birthDetails.time || !birthDetails.place}
          className={cn(
            'relative w-full overflow-hidden rounded-xl p-[1px] transition-all',
            'bg-gradient-to-r from-blue-500 to-blue-600',
            'hover:shadow-[0_0_2rem_-0.5rem_#3b82f6]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'group'
          )}
        >
          <div className="relative rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-3.5 transition-all group-hover:bg-opacity-0">
            <span className="relative z-10 text-base font-medium text-white">
              {t('common.next')}
            </span>
          </div>
        </Button>
      </motion.div>
    </div>
  );
};
