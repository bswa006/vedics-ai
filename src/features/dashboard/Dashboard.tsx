import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/card';

interface DashboardProps {
  userName?: string;
}

export function Dashboard({ userName }: DashboardProps) {
  const { t } = useTranslation();

  const sections = [
    {
      id: 'daily-horoscope',
      title: t('dashboard.horoscope.title'),
      description: t('dashboard.horoscope.description'),
      icon: '🌟',
      link: '/horoscope',
    },
    {
      id: 'predictions',
      title: t('dashboard.predictions.title'),
      description: t('dashboard.predictions.description'),
      icon: '🔮',
      link: '/predictions',
    },
    {
      id: 'compatibility',
      title: t('dashboard.compatibility.title'),
      description: t('dashboard.compatibility.description'),
      icon: '❤️',
      link: '/compatibility',
    },
    {
      id: 'chat',
      title: t('dashboard.chat.title'),
      description: t('dashboard.chat.description'),
      icon: '💬',
      link: '/chat',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="space-y-6 px-4 py-6">
      {/* Welcome Section */}
      <section className="space-y-2">
        <h2 className="text-deepCharcoal dark:text-creamWhite font-heading text-2xl font-bold">
          {userName ? t('dashboard.welcomeBack', { name: userName }) : t('dashboard.welcome')}
        </h2>
        <p className="text-coolGray dark:text-coolGray/80">{t('dashboard.subtitle')}</p>
      </section>

      {/* Main Sections */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {sections.map(section => (
          <motion.div key={section.id} variants={itemVariants}>
            <Card
              variant="interactive"
              icon={section.icon}
              title={section.title}
              excerpt={section.description}
              onClick={() => (window.location.href = section.link)}
              className="h-full"
            >
              <div>{section.description}</div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <section className="space-y-4">
        <h3 className="text-deepCharcoal dark:text-creamWhite font-heading text-lg font-semibold">
          {t('dashboard.quickActions')}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <Card
            variant="highlight"
            icon="📅"
            title={t('dashboard.quickActions.schedule')}
            onClick={() => (window.location.href = '/schedule')}
          />
          <Card
            variant="highlight"
            icon="📊"
            title={t('dashboard.quickActions.insights')}
            onClick={() => (window.location.href = '/insights')}
          />
        </div>
      </section>
    </div>
  );
}
