import React from 'react';
import { motion } from 'framer-motion';
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
    <div className="fixed inset-0 flex flex-col bg-gradient-to-b from-[#2E2A5D] via-[#1f1d3d] to-[#1a1b26] text-white pt-20">
      <motion.div
        className="flex-none space-y-3 bg-gradient-to-b from-[#2E2A5D] to-[#2E2A5D]/95 p-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight text-white/90">
          {t('onboarding.notifications.title')}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-gray-300/80">
          {t('onboarding.notifications.description')}
        </p>
      </motion.div>

      <div className="flex-1 overflow-y-auto px-6">
        <div className="space-y-4 pb-6">
          {NOTIFICATION_SETTINGS.map((setting) => (
            <div
              key={setting.id}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-white/10 hover:shadow-[0_0_1rem_-0.25rem_#3b82f6]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative flex items-start justify-between space-x-4">
                <div className="space-y-2">
                  <Label className="flex items-center space-x-3">
                    <span className="text-2xl filter group-hover:brightness-110">{setting.icon}</span>
                    <span className="text-lg font-medium bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent group-hover:to-white">
                      {t(setting.title)}
                    </span>
                  </Label>
                  <p className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent text-sm pl-10">
                    {t(setting.description)}
                  </p>
                </div>
                <Switch
                  checked={notificationSettings[setting.id] || false}
                  onCheckedChange={() => onSettingToggle(setting.id)}
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500/50"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-none p-6">
        <Button
          onClick={onNext}
          className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-[1px] transition-all hover:shadow-[0_0_2rem_-0.5rem_#3b82f6]"
        >
          <div className="relative rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-3 transition-all group-hover:bg-opacity-0">
            <span className="relative z-10 text-base font-medium text-white">
              {t('common.next')}
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
};
