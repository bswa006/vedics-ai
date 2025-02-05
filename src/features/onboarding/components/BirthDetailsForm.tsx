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
    <div className="flex min-h-screen flex-col space-y-6 p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">{t('onboarding.birthDetails.title')}</h2>
        <p className="text-muted-foreground">{t('onboarding.birthDetails.description')}</p>
      </div>

      <div className="space-y-4">
        {isMobile ? (
          <div className="space-y-2">
            <Label>{t('onboarding.birthDetails.dateTimeLabel')}</Label>
            <Input
              type="datetime-local"
              value={birthDetails.date ? format(birthDetails.date, "yyyy-MM-dd'T'HH:mm") : ''}
              onChange={handleDateTimeChange}
              className="h-12 px-4 py-2 text-base"
            />
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <Label>{t('onboarding.birthDetails.dateLabel')}</Label>
              <Input
                type="date"
                value={birthDetails.date ? format(birthDetails.date, 'yyyy-MM-dd') : ''}
                onChange={handleDateTimeChange}
                className="h-12 px-4 py-2 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label>{t('onboarding.birthDetails.timeLabel')}</Label>
              <Input
                type="time"
                value={birthDetails.time}
                onChange={handleDateTimeChange}
                className="h-12 px-4 py-2 text-base"
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label>{t('onboarding.birthDetails.placeLabel')}</Label>
          <Input
            type="text"
            value={birthDetails.place}
            onChange={e => onBirthDetailsChange({ place: e.target.value })}
            placeholder={t('onboarding.birthDetails.placePlaceholder')}
            className="h-12 px-4 py-2 text-base"
          />
        </div>
      </div>

      <div className="mt-auto">
        <Button
          onClick={onNext}
          className={cn(
            'w-full h-12 text-base',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          disabled={!birthDetails.date || !birthDetails.time || !birthDetails.place}
        >
          {t('common.next')}
        </Button>
      </div>
    </div>
  );
};
