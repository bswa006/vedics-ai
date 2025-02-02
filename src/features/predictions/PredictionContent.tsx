import { useTranslation } from 'react-i18next';
import {
  Prediction,
  isCorePersonalityPrediction,
  isCareerSuccessPrediction,
  isRelationshipsPrediction,
  isHealthPrediction,
  isChallengesPrediction,
  isMajorLifePeriodsPrediction,
  CorePersonalityPrediction,
  CareerSuccessPrediction,
  RelationshipsPrediction,
  HealthPrediction,
  ChallengesPrediction,
  MajorLifePeriodsPrediction,
} from '../../types/predictions';

interface PredictionContentProps {
  activeTab: string;
  predictions: Prediction[];
}

export function PredictionContent({ activeTab, predictions }: PredictionContentProps): JSX.Element {
  const { t } = useTranslation();

  const renderPersonalityTab = (predictions: Prediction[]): JSX.Element | null => {
    const cardStyle =
      'rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20';
    const personalityPrediction = predictions.find(isCorePersonalityPrediction) as
      | CorePersonalityPrediction
      | undefined;

    if (!personalityPrediction) return null;

    return (
      <div className="animate-fadeIn space-y-8">
        <div className={cardStyle}>
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('personality.traits')}
          </h3>
          <div className="flex flex-wrap gap-3">
            {personalityPrediction.content?.traits?.map((trait: string, index: number) => (
              <span
                key={index}
                className="rounded-lg bg-oriental-100/80 px-3 py-1 text-sm font-medium text-oriental-800 transition-all duration-300 hover:scale-105 hover:bg-oriental-200 dark:bg-oriental-900/50 dark:text-oriental-300 dark:hover:bg-oriental-800/50"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('personality.socialPerception')}
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {personalityPrediction.content.social_perception}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('personality.pastLifeInfluence')}
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {personalityPrediction.content.past_life_influence}
          </p>
        </div>

        {personalityPrediction.content.strengths && (
          <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
            <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
              {t('personality.strengths')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {personalityPrediction.content.strengths.map((strength: string, index: number) => (
                <span
                  key={index}
                  className="rounded-lg bg-emerald-100/80 px-3 py-1 text-sm font-medium text-emerald-800 transition-all duration-300 hover:scale-105 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:hover:bg-emerald-800/50"
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>
        )}

        {personalityPrediction.content.weaknesses && (
          <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
            <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
              {t('personality.weaknesses')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {personalityPrediction.content.weaknesses.map((weakness: string, index: number) => (
                <span
                  key={index}
                  className="rounded-lg bg-rose-100/80 px-3 py-1 text-sm font-medium text-rose-800 transition-all duration-300 hover:scale-105 hover:bg-rose-200 dark:bg-rose-900/50 dark:text-rose-300 dark:hover:bg-rose-800/50"
                >
                  {weakness}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCareerTab = (predictions: Prediction[]): JSX.Element | null => {
    const cardStyle =
      'rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-blue-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-100 dark:hover:from-blue-900/20 dark:hover:to-cyan-800/20';
    const careerPrediction = predictions.find(isCareerSuccessPrediction) as
      | CareerSuccessPrediction
      | undefined;

    if (!careerPrediction) return null;

    return (
      <div className="animate-fadeIn space-y-8">
        <div className={cardStyle}>
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('career.idealProfessions')}
          </h3>
          <div className="flex flex-wrap gap-3">
            {careerPrediction.content.ideal_professions.map((profession, index) => (
              <span
                key={index}
                className="rounded-lg bg-oriental-100/80 px-3 py-1 text-sm font-medium text-oriental-800 transition-all duration-300 hover:scale-105 hover:bg-oriental-200 dark:bg-oriental-900/50 dark:text-oriental-300 dark:hover:bg-oriental-800/50"
              >
                {profession}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('career.financialGrowth')}
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {careerPrediction.content.financial_growth.trend}
          </p>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            {careerPrediction.content.financial_growth.wealth_accumulation}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('career.foreignOpportunities')}
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {careerPrediction.content.foreign_opportunities}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('career.careerTransformation')}
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            <strong>{t('career.expectedAgeRangeLabel')}</strong>{' '}
            {careerPrediction.content.career_transformation.expected_age_range}
          </p>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            {careerPrediction.content.career_transformation.prediction}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('career.businessVsJob')}
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {careerPrediction.content.business_vs_job}
          </p>
        </div>
      </div>
    );
  };

  const renderRelationshipsTab = (predictions: Prediction[]): JSX.Element | null => {
    const cardStyle =
      'rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-rose-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-rose-50 hover:to-pink-100 dark:hover:from-rose-900/20 dark:hover:to-pink-800/20';
    const relationsPrediction = predictions.find(isRelationshipsPrediction) as
      | RelationshipsPrediction
      | undefined;

    if (!relationsPrediction) return null;

    return (
      <div className="animate-fadeIn space-y-8">
        <div className={cardStyle}>
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('relationships.relationshipTraits')}
          </h3>
          <div className="flex flex-wrap gap-3">
            {relationsPrediction.content.traits_in_relationships.map((trait, index) => (
              <span
                key={index}
                className="rounded-lg bg-oriental-100/80 px-3 py-1 text-sm font-medium text-oriental-800 transition-all duration-300 hover:scale-105 hover:bg-oriental-200 dark:bg-oriental-900/50 dark:text-oriental-300 dark:hover:bg-oriental-800/50"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('relationships.marriage')}
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {relationsPrediction.content.marriage.prediction}
          </p>
          <h4 className="mb-2 mt-4 font-semibold">{t('relationships.partnerTraits')}</h4>
          <div className="flex flex-wrap gap-2">
            {relationsPrediction.content.marriage.partner_traits.map((trait, index) => (
              <span
                key={index}
                className="rounded-lg bg-oriental-100/80 px-3 py-1 text-sm font-medium text-oriental-800 transition-all duration-300 hover:scale-105 hover:bg-oriental-200 dark:bg-oriental-900/50 dark:text-oriental-300 dark:hover:bg-oriental-800/50"
              >
                {trait}
              </span>
            ))}
          </div>
          <h4 className="mb-2 mt-4 font-semibold">{t('relationships.challenges')}</h4>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {relationsPrediction.content.marriage.challenges}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('relationships.romanticInfluences')}
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {relationsPrediction.content.romantic_influences}
          </p>
        </div>
      </div>
    );
  };

  const renderHealthTab = (predictions: Prediction[]): JSX.Element | null => {
    const cardStyle =
      'rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-emerald-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-teal-100 dark:hover:from-emerald-900/20 dark:hover:to-teal-800/20';
    const healthPrediction = predictions.find(isHealthPrediction) as HealthPrediction | undefined;

    if (!healthPrediction) return null;

    return (
      <div className="animate-fadeIn space-y-8">
        <div className={cardStyle}>
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('health.healthConcerns')}
          </h3>
          <div className="flex flex-wrap gap-3">
            {healthPrediction.content.concerns.map((concern, index) => (
              <span
                key={index}
                className="rounded-lg bg-oriental-100/80 px-3 py-1 text-sm font-medium text-oriental-800 transition-all duration-300 hover:scale-105 hover:bg-oriental-200 dark:bg-oriental-900/50 dark:text-oriental-300 dark:hover:bg-oriental-800/50"
              >
                {concern}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('health.longTermHealth')}
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {healthPrediction.content.long_term_health}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('health.recommendations')}
          </h3>
          <div className="flex flex-wrap gap-3">
            {healthPrediction.content.recommendations.map((recommendation, index) => (
              <span
                key={index}
                className="rounded-lg bg-oriental-100/80 px-3 py-1 text-sm font-medium text-oriental-800 transition-all duration-300 hover:scale-105 hover:bg-oriental-200 dark:bg-oriental-900/50 dark:text-oriental-300 dark:hover:bg-oriental-800/50"
              >
                {recommendation}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderChallengesTab = (predictions: Prediction[]): JSX.Element | null => {
    const cardStyle =
      'rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-amber-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-100 dark:hover:from-amber-900/20 dark:hover:to-orange-800/20';
    const challengesPrediction = predictions.find(isChallengesPrediction) as
      | ChallengesPrediction
      | undefined;

    if (!challengesPrediction) return null;

    return (
      <div className="animate-fadeIn space-y-8">
        <div className={cardStyle}>
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('challenges.challenges')}
          </h3>
          <div className="flex flex-wrap gap-3">
            {challengesPrediction.content.challenges.map((challenge, index) => (
              <span
                key={index}
                className="rounded-lg bg-oriental-100/80 px-3 py-1 text-sm font-medium text-oriental-800 transition-all duration-300 hover:scale-105 hover:bg-oriental-200 dark:bg-oriental-900/50 dark:text-oriental-300 dark:hover:bg-oriental-800/50"
              >
                {challenge}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('challenges.remedies')}
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {t('challenges.mantras')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {challengesPrediction.content.remedies.mantras.map((mantra, index) => (
                  <span
                    key={index}
                    className="rounded-lg bg-blue-100/80 px-3 py-1 text-sm font-medium text-blue-800 transition-all duration-300 hover:scale-105 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-800/50"
                  >
                    {mantra}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {t('challenges.spiritualPractices')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {challengesPrediction.content.remedies.spiritual_practices.map(
                  (practice, index) => (
                    <span
                      key={index}
                      className="rounded-lg bg-blue-100/80 px-3 py-1 text-sm font-medium text-blue-800 transition-all duration-300 hover:scale-105 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-800/50"
                    >
                      {practice}
                    </span>
                  )
                )}
              </div>
            </div>

            <div>
              <h4 className="mb-2 font-semibold">{t('challenges.astrologicalRecommendations')}</h4>
              <div className="flex flex-wrap gap-2">
                {challengesPrediction.content.remedies.astrological_recommendations.map(
                  (recommendation, index) => (
                    <span
                      key={index}
                      className="rounded-lg bg-blue-100/80 px-3 py-1 text-sm font-medium text-blue-800 transition-all duration-300 hover:scale-105 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-800/50"
                    >
                      {recommendation}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMajorLifePeriodsTab = (predictions: Prediction[]): JSX.Element | null => {
    const cardStyle =
      'rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-fuchsia-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-fuchsia-50 hover:to-pink-100 dark:hover:from-fuchsia-900/20 dark:hover:to-pink-800/20';
    const majorLifePeriodsPrediction = predictions.find(isMajorLifePeriodsPrediction) as
      | MajorLifePeriodsPrediction
      | undefined;

    if (!majorLifePeriodsPrediction) return null;

    return (
      <div className="animate-fadeIn space-y-8">
        <div className={cardStyle}>
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('majorLifePeriods.earlyLife')}
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {majorLifePeriodsPrediction.content.early_life}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('majorLifePeriods.midLife')}
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {majorLifePeriodsPrediction.content.mid_life}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('majorLifePeriods.laterYears')}
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {majorLifePeriodsPrediction.content.later_years}
          </p>
        </div>
      </div>
    );
  };

  const renderContent = (tab: string) => {
    switch (tab) {
      case 'core_personality_and_life_path':
        return renderPersonalityTab(predictions);
      case 'career_success_and_wealth':
        return renderCareerTab(predictions);
      case 'relationships_love_and_marriage':
        return renderRelationshipsTab(predictions);
      case 'health_and_wellbeing':
        return renderHealthTab(predictions);
      case 'challenges_and_remedies':
        return renderChallengesTab(predictions);
      case 'major_life_periods':
        return renderMajorLifePeriodsTab(predictions);
      default:
        return null;
    }
  };

  return <div className="space-y-6">{renderContent(activeTab)}</div>;
}
