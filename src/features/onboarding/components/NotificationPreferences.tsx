import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import { Switch } from '../../../components/ui/switch';
import { Label } from '../../../components/ui/label';

export interface NotificationSetting {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const NOTIFICATION_SETTINGS: NotificationSetting[] = [
  {
    id: 'daily-horoscope',
    icon: '🔔',
    title: 'onboarding.notifications.dailyHoroscope.title',
    description: 'onboarding.notifications.dailyHoroscope.description',
  },
  {
    id: 'special-events',
    icon: '🔥',
    title: 'onboarding.notifications.specialEvents.title',
    description: 'onboarding.notifications.specialEvents.description',
  },
  {
    id: 'weekly-summary',
    icon: '✅',
    title: 'onboarding.notifications.weeklySummary.title',
    description: 'onboarding.notifications.weeklySummary.description',
  },
];

export interface NotificationPreferencesProps {
  onNext: () => void;
  notificationSettings: Record<string, boolean>;
  onSettingToggle: (settingId: string) => void;
}

export const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({
  onNext,
  notificationSettings,
  onSettingToggle,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex h-full max-h-screen flex-col">
      <div className="flex-none space-y-2 p-6">
        <h2 className="text-2xl font-semibold">
          {t('onboarding.notifications.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('onboarding.notifications.description')}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6">
        <div className="space-y-4 pb-6">
          {NOTIFICATION_SETTINGS.map((setting) => (
            <div
              key={setting.id}
              className="flex items-start justify-between space-x-3 p-4 rounded-lg border hover:bg-accent/5 transition-colors"
            >
              <div className="space-y-1">
                <Label className="text-base font-medium">
                  <span className="mr-2 text-xl">{setting.icon}</span>
                  {t(setting.title)}
                </Label>
                <p className="text-muted-foreground text-sm">
                  {t(setting.description)}
                </p>
              </div>
              <Switch
                checked={notificationSettings[setting.id] || false}
                onCheckedChange={() => onSettingToggle(setting.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex-none p-6">
        <Button 
          onClick={onNext} 
          className="h-12 w-full text-base"
        >
          {t('common.next')}
        </Button>
      </div>
    </div>
  );
};
