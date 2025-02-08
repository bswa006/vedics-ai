import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '../../types/user';
import { motion } from 'framer-motion';
import { LANGUAGES } from '../onboarding/components/LanguageSelection';
import { api } from '../../services/api';
import { theme } from '../../styles/theme';

interface EditableProfileProps {
  user: User;
  onUpdate: () => void;
  onCancel: () => void;
}

export function EditableProfile({ user, onUpdate, onCancel }: EditableProfileProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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

        <div className="flex flex-shrink-0 gap-3">
          <motion.button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-white/10 bg-white/5 px-4 sm:px-6 py-2 text-sm font-medium text-white backdrop-blur-xl transition-all hover:bg-white/10 whitespace-nowrap"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('common.cancel')}
          </motion.button>
          <motion.button
            type="submit"
            disabled={loading}
            className="group relative overflow-hidden rounded-xl p-[1px] whitespace-nowrap"
            style={{ background: theme.gradients.primary }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="bg-midnightIndigo relative rounded-xl px-4 sm:px-6 py-2 transition-all group-hover:bg-transparent">
              <span className="relative z-10 text-sm font-medium text-white">
                {loading ? t('common.saving') : t('common.save')}
              </span>
            </div>
          </motion.button>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-statusRed/20 bg-statusRed/5 rounded-xl border p-4 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <svg className="text-statusRed h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-statusRed text-sm font-medium">{error}</p>
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
            <h3 className="mb-4 flex items-center gap-3 text-xl font-medium text-white">
              <span className="bg-celestialLilac/20 flex h-10 w-10 items-center justify-center rounded-lg text-white">
                ✧
              </span>
              {t('profile.birthDetails')}
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  {t('profile.birthDate')}
                </label>
                <input
                  type="date"
                  value={formData.date_of_birth}
                  onChange={e => setFormData({ ...formData, date_of_birth: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white backdrop-blur-xl focus:border-celestialLilac/40 focus:outline-none focus:ring-0"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  {t('profile.birthTime')}
                </label>
                <input
                  type="time"
                  value={formData.time_of_birth}
                  onChange={e => setFormData({ ...formData, time_of_birth: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white backdrop-blur-xl focus:border-celestialLilac/40 focus:outline-none focus:ring-0"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  {t('profile.birthPlace')}
                </label>
                <input
                  type="text"
                  value={formData.place_of_birth}
                  onChange={e => setFormData({ ...formData, place_of_birth: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white backdrop-blur-xl focus:border-celestialLilac/40 focus:outline-none focus:ring-0"
                  required
                />
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
                ⭐
              </span>
              {t('profile.personalInfo')}
            </h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  {t('profile.firstName')}
                </label>
                <input
                  type="text"
                  value={formData.first_name}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white backdrop-blur-xl"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  {t('profile.lastName')}
                </label>
                <input
                  type="text"
                  value={formData.last_name}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white backdrop-blur-xl"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  {t('profile.preferredLanguage')}
                </label>
                <select
                  value={formData.preferred_language}
                  onChange={e => setFormData({ ...formData, preferred_language: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white backdrop-blur-xl focus:border-celestialLilac/40 focus:outline-none focus:ring-0"
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.form>
  );
}
