import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { format, parse } from 'date-fns';
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
    <div className="flex h-full flex-col bg-[#1a1b26] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white">
      <motion.div
        className="flex-none space-y-3 p-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
          {t('onboarding.birthDetails.title')}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-gray-400/80">
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
              <Label className="text-sm font-medium text-gray-400/80">
                {t('onboarding.birthDetails.dateLabel')}
              </Label>
              <Input
                type="datetime-local"
                value={birthDetails.date ? format(birthDetails.date, "yyyy-MM-dd'T'HH:mm") : ''}
                onChange={handleDateTimeChange}
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white backdrop-blur-xl placeholder:text-gray-500 hover:border-white/20 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
              />
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-400/80">
                  {t('onboarding.birthDetails.dateLabel')}
                </Label>
                <Input
                  type="date"
                  value={birthDetails.date ? format(birthDetails.date, 'yyyy-MM-dd') : ''}
                  onChange={handleDateTimeChange}
                  className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white backdrop-blur-xl placeholder:text-gray-500 hover:border-white/20 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-400/80">
                  {t('onboarding.birthDetails.timeLabel')}
                </Label>
                <Input
                  type="time"
                  value={birthDetails.time}
                  onChange={handleDateTimeChange}
                  className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white backdrop-blur-xl placeholder:text-gray-500 hover:border-white/20 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
                />
              </div>
            </div>
          )}

          <div>
            <Label className="text-sm font-medium text-gray-400/80">
              {t('onboarding.birthDetails.placeLabel')}
            </Label>
            <Input
              type="text"
              value={birthDetails.place}
              onChange={e => onBirthDetailsChange({ place: e.target.value })}
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white backdrop-blur-xl placeholder:text-gray-500 hover:border-white/20 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
            />
          </div>
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
          className="relative w-full rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 px-8 py-3.5 transition-all group-hover:bg-opacity-0"
        >
          {t('onboarding.nextButton')}
        </Button>
      </motion.div>
    </div>
  );
};
