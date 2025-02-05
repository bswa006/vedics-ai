import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { format, parse } from 'date-fns';
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
        time: format(date, 'HH:mm')
      });
    } else if (e.target.type === 'date') {
      const date = parse(value, 'yyyy-MM-dd', new Date());
      onBirthDetailsChange({ date });
    } else if (e.target.type === 'time') {
      onBirthDetailsChange({ time: value });
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-none space-y-2 p-6">
        <h2 className="text-2xl font-semibold text-white mb-2">
          {t('onboarding.birthDetails.title')}
        </h2>
        <p className="text-gray-300 text-sm">
          {t('onboarding.birthDetails.description')}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6">
        <div className="space-y-6">
          {isMobile ? (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-300">
                {t('onboarding.birthDetails.dateTimeLabel')}
              </Label>
              <Input
                type="datetime-local"
                value={birthDetails.date ? format(birthDetails.date, "yyyy-MM-dd'T'HH:mm") : ''}
                onChange={handleDateTimeChange}
                className="h-12 rounded-lg border border-gray-700 bg-gray-800/40 px-4 py-2 text-white transition-colors
                  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-blue-500/30"
              />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-300">
                  {t('onboarding.birthDetails.dateLabel')}
                </Label>
                <Input
                  type="date"
                  value={birthDetails.date ? format(birthDetails.date, 'yyyy-MM-dd') : ''}
                  onChange={handleDateTimeChange}
                  className="h-12 rounded-lg border border-gray-700 bg-gray-800/40 px-4 py-2 text-white transition-colors
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-blue-500/30"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-300">
                  {t('onboarding.birthDetails.timeLabel')}
                </Label>
                <Input
                  type="time"
                  value={birthDetails.time}
                  onChange={handleDateTimeChange}
                  className="h-12 rounded-lg border border-gray-700 bg-gray-800/40 px-4 py-2 text-white transition-colors
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-blue-500/30"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-300">
              {t('onboarding.birthDetails.placeLabel')}
            </Label>
            <Input
              type="text"
              value={birthDetails.place}
              onChange={e => onBirthDetailsChange({ place: e.target.value })}
              placeholder={t('onboarding.birthDetails.placePlaceholder')}
              className="h-12 rounded-lg border border-gray-700 bg-gray-800/40 px-4 py-2 text-white transition-colors
                focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-blue-500/30"
            />
          </div>
        </div>
      </div>

      <div className="flex-none p-6">
        <Button
          onClick={onNext}
          disabled={!birthDetails.date || !birthDetails.time || !birthDetails.place}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors
            disabled:bg-blue-400/50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
        >
          {t('common.next')}
        </Button>
      </div>
    </div>
  );
};
