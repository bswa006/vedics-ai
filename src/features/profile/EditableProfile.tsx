import { motion } from 'framer-motion';
import { AlertCircle, Calendar, Languages, User as UserIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
import { theme } from '../../styles/theme';
import { User } from '../../types/user';
import { localToUtc, utcToLocal } from '../../utils/dateTime';
import { LANGUAGES } from '../onboarding/components/LanguageSelection';

interface EditableProfileProps {
  user: User;
  onUpdate: () => void;
  onCancel: () => void;
}

export function EditableProfile({ user, onUpdate, onCancel }: EditableProfileProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  // Convert UTC to local time for initial display
  const initialLocalDateTime =
    user.date_of_birth && user.time_of_birth
      ? utcToLocal(user.date_of_birth, user.time_of_birth)
      : { localDate: user.date_of_birth || '', localTime: user.time_of_birth || '' };

  const [formData, setFormData] = useState({
    date_of_birth: initialLocalDateTime.localDate,
    time_of_birth: initialLocalDateTime.localTime,
    place_of_birth: user.place_of_birth || '',
    preferred_language: user.preferred_language,
    area_of_interests: user.area_of_interests || [],
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  // References for error fields
  const errorRefs = {
    date_of_birth: useRef<HTMLDivElement>(null),
    time_of_birth: useRef<HTMLDivElement>(null),
    place_of_birth: useRef<HTMLDivElement>(null),
    preferred_language: useRef<HTMLDivElement>(null),
    general: useRef<HTMLDivElement>(null),
  };

  const scrollToError = (errors: Record<string, string>) => {
    // Find the first error field
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField && errorRefs[firstErrorField as keyof typeof errorRefs]?.current) {
      errorRefs[firstErrorField as keyof typeof errorRefs].current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current?.checkValidity()) {
      formRef.current?.reportValidity();
      return;
    }

    setLoading(true);
    setFieldErrors({});

    try {
      // Convert local time to UTC before saving
      const utcDateTime = localToUtc(formData.date_of_birth, formData.time_of_birth);

      // Update profile with all data in one call
      await api.profiles.updateProfile(user.id, {
        date_of_birth: utcDateTime.utcDate,
        time_of_birth: utcDateTime.utcTime,
        place_of_birth: formData.place_of_birth,
        preferred_language: formData.preferred_language,
        area_of_interests: formData.area_of_interests,
      });

      await onUpdate();
    } catch (err: any) {
      try {
        const errorObj = JSON.parse(err?.message);
        console.log('Validation errors:', errorObj); // Debug log
        setFieldErrors(errorObj);
        scrollToError(errorObj);
      } catch (parseErr) {
        console.log('Error parsing:', err?.message); // Debug log
        const generalError = { general: err?.message || t('profile.updateError') };
        setFieldErrors(generalError);
        scrollToError(generalError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onSubmit={handleSubmit}
      ref={formRef}
      className="space-y-8"
      noValidate
      aria-label={t('profile.editForm')}
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-light tracking-tight text-white"
            style={{
              fontFamily: theme.typography.heading.fontFamily,
              fontWeight: theme.typography.heading.weights.medium,
            }}
          >
            {t('profile.editTitle')}
          </motion.h1>
          <p className="text-gray-300">{t('profile.editSubtitle')}</p>
        </div>

        <div className="flex flex-shrink-0 gap-4">
          <motion.button
            type="button"
            onClick={onCancel}
            className="group flex items-center gap-2 whitespace-nowrap rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-xl transition-all hover:bg-white/10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="transform transition-transform group-hover:-translate-x-0.5">←</span>
            {t('common.cancel')}
          </motion.button>
          <motion.button
            type="submit"
            disabled={loading}
            className="group relative flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-xl p-[1px]"
            style={{ background: theme.gradients.primary }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="bg-midnightIndigo relative flex items-center gap-2 rounded-xl px-6 py-3 transition-all group-hover:bg-transparent">
              <span className="relative z-10 text-sm font-medium text-white">
                {loading ? t('common.saving') : t('common.save')}
              </span>
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <span className="transform transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              )}
            </div>
          </motion.button>
        </div>
      </div>

      {fieldErrors.general && (
        <motion.div
          ref={errorRefs.general}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-sm font-medium text-red-500">{fieldErrors.general}</p>
          </div>
        </motion.div>
      )}

      {/* Profile Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Birth Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hover:border-celestialLilac/40 group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300"
        >
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: `${theme.gradients.primary}10` }}
          />
          <div className="relative">
            <h3 className="mb-6 flex items-center gap-3 text-xl font-medium text-white">
              <span className="bg-celestialLilac/20 flex h-12 w-12 items-center justify-center rounded-lg text-xl text-white">
                <Calendar className="h-6 w-6" />
              </span>
              {t('profile.birthDetails')}
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-200">
                  {t('profile.birthDate')} *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.date_of_birth}
                    onChange={e => setFormData({ ...formData, date_of_birth: e.target.value })}
                    className="focus:border-celestialLilac/40 focus:ring-celestialLilac/20 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white backdrop-blur-xl transition-all duration-200 hover:bg-white/10 focus:outline-none focus:ring-2"
                    required
                  />
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 transform text-gray-400">
                    📅
                  </div>
                </div>
                <div ref={errorRefs.date_of_birth}>
                {fieldErrors.date_of_birth && (
                  <p className="mt-2 text-sm font-medium text-red-500">{fieldErrors.date_of_birth}</p>
                )}
                </div>
                <p className="mt-1 text-sm text-gray-400">{t('profile.birthDateHelp')}</p>
              </div>
              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-200">
                  {t('profile.birthTime')} *
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={formData.time_of_birth}
                    onChange={e => setFormData({ ...formData, time_of_birth: e.target.value })}
                    className="focus:border-celestialLilac/40 focus:ring-celestialLilac/20 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white backdrop-blur-xl transition-all duration-200 hover:bg-white/10 focus:outline-none focus:ring-2"
                    required
                  />
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 transform text-gray-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                </div>
                <div ref={errorRefs.time_of_birth}>
                {fieldErrors.time_of_birth && (
                  <p className="mt-2 text-sm font-medium text-red-500">{fieldErrors.time_of_birth}</p>
                )}
                </div>
                <p className="mt-1 text-sm text-gray-400">{t('profile.birthTimeHelp')}</p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  {t('profile.birthPlace')}
                </label>
                <input
                  type="text"
                  value={formData.place_of_birth}
                  onChange={e => setFormData({ ...formData, place_of_birth: e.target.value })}
                  className="focus:border-celestialLilac/40 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white backdrop-blur-xl focus:outline-none focus:ring-0"
                  required
                />
                <div ref={errorRefs.place_of_birth}>
                {fieldErrors.place_of_birth && (
                  <p className="mt-2 text-sm font-medium text-red-500">{fieldErrors.place_of_birth}</p>
                )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Personal Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hover:border-celestialLilac/40 group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300"
        >
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: `${theme.gradients.primary}10` }}
          />
          <div className="relative">
            <h3 className="mb-4 flex items-center gap-3 text-xl font-medium text-white">
              <span className="bg-celestialLilac/20 flex h-10 w-10 items-center justify-center rounded-lg text-white">
                <UserIcon className="h-6 w-6" />
              </span>
              {t('profile.personalInfo')}
            </h3>
            <div className="space-y-6">
              {/* Preferred Language */}
              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-200">
                  {t('profile.preferredLanguage')} *
                </label>
                <div className="relative">
                  <select
                    value={formData.preferred_language}
                    onChange={e => setFormData({ ...formData, preferred_language: e.target.value })}
                    className="focus:border-celestialLilac/40 focus:ring-celestialLilac/20 w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 pl-10 text-white backdrop-blur-xl transition-all duration-200 hover:bg-white/10 focus:outline-none focus:ring-2"
                    required
                  >
                    {LANGUAGES.map(lang => (
                      <option key={lang.code} value={lang.code} className="bg-gray-800">
                        {lang.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 transform text-gray-400">
                    <Languages className="h-5 w-5" />
                  </div>
                </div>
                <div ref={errorRefs.preferred_language}>
                {fieldErrors.preferred_language && (
                  <p className="mt-2 text-sm font-medium text-red-500">{fieldErrors.preferred_language}</p>
                )}
                </div>
                <p className="mt-1 text-sm text-gray-400">{t('profile.preferredLanguageHelp')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.form>
  );
}
