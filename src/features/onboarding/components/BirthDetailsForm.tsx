import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { format, parse } from 'date-fns';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';

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
    <div className="fixed inset-0 flex flex-col bg-gradient-to-b from-[#2E2A5D] via-[#1f1d3d] to-[#1a1b26] text-white pt-20">
      <motion.div
        className="flex-none space-y-3 bg-gradient-to-b from-[#2E2A5D] to-[#2E2A5D]/95 p-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight text-white/90">
          {t('onboarding.birthDetails.title')}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-gray-300/80">
          {t('onboarding.birthDetails.description')}
        </p>
      </motion.div>

      <motion.div
        className="flex-1 overflow-y-auto px-6 py-4 pb-32 [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar]:w-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="space-y-8">
          {isMobile ? (
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Label className="mb-2 block text-sm font-medium text-white/80">
                {t('onboarding.birthDetails.dateLabel')}
              </Label>
              <Input
                type="datetime-local"
                value={birthDetails.date ? format(birthDetails.date, "yyyy-MM-dd'T'HH:mm") : ''}
                onChange={handleDateTimeChange}
                className="h-12 w-full rounded-lg border border-white/5 bg-[#2A2B3B] px-4 py-2 text-white placeholder-gray-500 transition-colors hover:border-[#7F7ACA]/30 focus:border-[#7F7ACA]/50 focus:outline-none focus:ring-2 focus:ring-[#7F7ACA]/20"
              />
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block text-sm font-medium text-white/80">
                  {t('onboarding.birthDetails.dateLabel')}
                </Label>
                <Input
                  type="date"
                  value={birthDetails.date ? format(birthDetails.date, 'yyyy-MM-dd') : ''}
                  onChange={handleDateTimeChange}
                  className="h-12 w-full rounded-lg border border-white/5 bg-[#2A2B3B] px-4 py-2 text-white placeholder-gray-500 transition-colors hover:border-[#7F7ACA]/30 focus:border-[#7F7ACA]/50 focus:outline-none focus:ring-2 focus:ring-[#7F7ACA]/20"
                />
              </div>
              <div>
                <Label className="mb-2 block text-sm font-medium text-white/80">
                  {t('onboarding.birthDetails.timeLabel')}
                </Label>
                <Input
                  type="time"
                  value={birthDetails.time}
                  onChange={handleDateTimeChange}
                  className="h-12 w-full rounded-lg border border-white/5 bg-[#2A2B3B] px-4 py-2 text-white placeholder-gray-500 transition-colors hover:border-[#7F7ACA]/30 focus:border-[#7F7ACA]/50 focus:outline-none focus:ring-2 focus:ring-[#7F7ACA]/20"
                />
              </div>
            </div>
          )}

          <div>
            <Label className="mb-2 block text-sm font-medium text-white/80">
              {t('onboarding.birthDetails.placeLabel')}
            </Label>
            <Input
              type="text"
              value={birthDetails.place}
              onChange={e => onBirthDetailsChange({ place: e.target.value })}
              className="h-12 w-full rounded-lg border border-white/5 bg-[#2A2B3B] px-4 py-2 text-white placeholder-gray-500 transition-colors hover:border-[#7F7ACA]/30 focus:border-[#7F7ACA]/50 focus:outline-none focus:ring-2 focus:ring-[#7F7ACA]/20"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="flex-none bg-gradient-to-t from-[#1a1b26] via-[#1a1b26] to-transparent p-6 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button
          onClick={onNext}
          className={cn(
            'relative w-full overflow-hidden rounded-lg bg-[#7F7ACA] p-4 text-white transition-all',
            'hover:bg-[#7F7ACA]/90 hover:shadow-lg',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'focus:outline-none focus:ring-2 focus:ring-[#7F7ACA]/50',
            'group'
          )}
        >
          <span className="text-base font-medium">{t('onboarding.nextButton')}</span>
        </Button>
      </motion.div>
    </div>
  );
};
