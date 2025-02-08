import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '../../types/user';
import { motion, useReducedMotion } from 'framer-motion';
import { LANGUAGES } from '../onboarding/components/LanguageSelection';
import { api } from '../../services/api';

interface EditableProfileProps {
  user: User;
  onUpdate: () => void;
  onCancel: () => void;
}

export function EditableProfile({ user, onUpdate, onCancel }: EditableProfileProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    first_name: user.user.first_name,
    last_name: user.user.last_name,
    email: user.user.email,
    date_of_birth: user.date_of_birth || '',
    time_of_birth: user.time_of_birth || '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current?.checkValidity()) {
      formRef.current?.reportValidity();
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.profiles.updateProfile(user.id, {
        date_of_birth: formData.date_of_birth,
        time_of_birth: formData.time_of_birth,
        place_of_birth: formData.place_of_birth,
        preferred_language: formData.preferred_language,
        area_of_interests: formData.area_of_interests,
      });
      await onUpdate();
    } catch (err: any) {
      setError(err?.message || t('profile.updateError'));
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onSubmit={handleSubmit}
      ref={formRef}
      className="mx-auto max-w-2xl space-y-8"
      noValidate
      aria-label={t('profile.editForm')}
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-xl bg-red-50 p-4 dark:bg-red-900/10"
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Personal Information */}
      <motion.div
        className="px-8 py-4"
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <h3 className="mb-6 flex items-center gap-3 text-xl font-medium text-gray-900 dark:text-white">
          <motion.span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
            whileHover={{ scale: 1.05, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            ✧
          </motion.span>
          {t('profile.personalInfo')}
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                {t('profile.firstName')}
              </label>
              <input
                type="text"
                value={formData.first_name}
                onChange={e => setFormData({ ...formData, first_name: e.target.value })}
                className="mt-2 block w-full rounded-md border-0 px-3 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-purple-500 dark:bg-transparent dark:text-white dark:ring-gray-700 sm:text-sm"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                {t('profile.lastName')}
              </label>
              <input
                type="text"
                value={formData.last_name}
                onChange={e => setFormData({ ...formData, last_name: e.target.value })}
                className="mt-2 block w-full rounded-md border-0 px-3 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-purple-500 dark:bg-transparent dark:text-white dark:ring-gray-700 sm:text-sm"
                disabled
              />
            </div>
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
              {t('profile.email')}
            </label>
            <div className="relative mt-2">
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="block w-full rounded-xl border-0 bg-white px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:focus:ring-purple-500 sm:text-sm"
                disabled
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                  <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Birth Details */}
      <motion.div
        className="px-8 py-4"
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <h3 className="mb-6 flex items-center gap-3 text-xl font-medium text-gray-900 dark:text-white">
          <motion.span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
            whileHover={{ scale: 1.05, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            ✧
          </motion.span>
          {t('profile.birthDetails')}
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                {t('profile.dateOfBirth')}
              </label>
              <input
                type="date"
                value={formData.date_of_birth}
                onChange={e => setFormData({ ...formData, date_of_birth: e.target.value })}
                className="mt-2 block w-full rounded-md border-0 px-3 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-purple-500 dark:bg-transparent dark:text-white dark:ring-gray-700 sm:text-sm"
                required
                aria-required="true"
                aria-label={t('profile.dateOfBirth')}
                min="1900-01-01"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                {t('profile.timeOfBirth')}
              </label>
              <input
                type="time"
                value={formData.time_of_birth}
                onChange={e => setFormData({ ...formData, time_of_birth: e.target.value })}
                className="mt-2 block w-full rounded-md border-0 px-3 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-purple-500 dark:bg-transparent dark:text-white dark:ring-gray-700 sm:text-sm"
                required
                aria-required="true"
                aria-label={t('profile.timeOfBirth')}
                step="60"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
              {t('profile.placeOfBirth')}
            </label>
            <div className="relative mt-2">
              <input
                type="text"
                value={formData.place_of_birth}
                onChange={e => setFormData({ ...formData, place_of_birth: e.target.value })}
                className="block w-full rounded-xl border-0 bg-white px-4 py-3 pl-11 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:focus:ring-purple-500 sm:text-sm"
                placeholder={t('profile.placeOfBirthPlaceholder')}
                required
                aria-required="true"
                aria-label={t('profile.placeOfBirth')}
                minLength={2}
                maxLength={100}
                pattern="[A-Za-z\s,]+"
                title={t('profile.placeOfBirthValidation')}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Language and Interests */}
      <motion.div
        className="px-8 py-4"
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <h3 className="mb-6 flex items-center gap-3 text-xl font-medium text-gray-900 dark:text-white">
          <motion.span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
            whileHover={{ scale: 1.05, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            ✧
          </motion.span>
          {t('profile.preferences')}
        </h3>
        <div className="space-y-4">
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
              {t('profile.preferredLanguage')}
            </label>
            <div className="relative mt-2">
              <select
                value={formData.preferred_language}
                onChange={e => setFormData({ ...formData, preferred_language: e.target.value })}
                className="block w-full rounded-xl border-0 bg-white px-4 py-3 pl-11 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:focus:ring-purple-500 sm:text-sm"
                required
                aria-required="true"
                aria-label={t('profile.preferredLanguage')}
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389 21.034 21.034 0 01-.554-.6 19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
              {t('profile.interests')}
            </label>
            <div className="mt-4 flex flex-wrap gap-3">
              {formData.area_of_interests.map(interest => (
                <motion.span
                  key={interest}
                  className="inline-flex items-center rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-600 shadow-sm ring-1 ring-purple-900/5 transition-colors duration-200 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:ring-purple-400/20 dark:hover:bg-purple-900/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="sticky bottom-0 flex items-center justify-end gap-4 border-t px-8 py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <motion.button
          type="button"
          onClick={onCancel}
          className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-800"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          disabled={loading}
        >
          <span className="relative z-10">{t('common.cancel')}</span>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-100 to-gray-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-gray-700 dark:to-gray-800"></div>
        </motion.button>
        <motion.button
          type="submit"
          className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 dark:bg-purple-500 dark:hover:bg-purple-400"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          disabled={loading}
        >
          <span className="relative z-10 flex items-center">
            {loading && (
              <svg
                className="mr-2 h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            {t('common.save')}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-purple-400 dark:to-purple-500"></div>
          </span>
        </motion.button>
      </motion.div>
    </motion.form>
  );
}
