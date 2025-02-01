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
    const personalityPrediction = predictions.find(isCorePersonalityPrediction) as
      | CorePersonalityPrediction
      | undefined;


    if (!personalityPrediction) return null;

    return (
      <div className="space-y-4 text-gray-900 dark:text-gray-100">
        <div>
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">{t('personality.traits')}</h3>
          <div className="flex flex-wrap gap-2">
            {personalityPrediction.content.traits.map((trait: string, index: number) => (
              <span key={index} className="rounded-full bg-purple-100 dark:bg-purple-900 px-3 py-1 text-purple-800 dark:text-purple-100">
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">{t('personality.socialPerception')}</h3>
          <p className="text-gray-900 dark:text-gray-100">{personalityPrediction.content.social_perception}</p>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">{t('personality.pastLifeInfluence')}</h3>
          <p className="text-gray-900 dark:text-gray-100">{personalityPrediction.content.past_life_influence}</p>
        </div>
      </div>
    );
  };

  const renderCareerTab = (predictions: Prediction[]): JSX.Element | null => {
    const careerPrediction = predictions.find(isCareerSuccessPrediction) as
      | CareerSuccessPrediction
      | undefined;

    if (!careerPrediction) return null;

    return (
      <div className="animate-fadeIn space-y-8">
        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('career.idealProfessions')}
          </h3>
          <div className="flex flex-wrap gap-3">
            {careerPrediction.content.ideal_professions.map((profession, index) => (
              <span
                key={index}
                className="rounded-lg bg-oriental-100 px-3 py-1 text-sm font-medium text-oriental-800 dark:bg-oriental-900/50 dark:text-oriental-300"
              >
                {profession}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900">
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

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('career.foreignOpportunities')}
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {careerPrediction.content.foreign_opportunities}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900">
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

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900">
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
    const relationsPrediction = predictions.find(isRelationshipsPrediction) as
      | RelationshipsPrediction
      | undefined;

    if (!relationsPrediction) return null;

    return (
      <div className="animate-fadeIn space-y-8">
        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('relationships.relationshipTraits')}
          </h3>
          <div className="flex flex-wrap gap-3">
            {relationsPrediction.content.traits_in_relationships.map((trait, index) => (
              <span
                key={index}
                className="rounded-lg bg-oriental-100 px-3 py-1 text-sm font-medium text-oriental-800 dark:bg-oriental-900/50 dark:text-oriental-300"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900">
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
                className="rounded-lg bg-oriental-100 px-3 py-1 text-sm font-medium text-oriental-800 dark:bg-oriental-900/50 dark:text-oriental-300"
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

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900">
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
    const healthPrediction = predictions.find(isHealthPrediction) as HealthPrediction | undefined;

    if (!healthPrediction) return null;

    return (
      <div className="animate-fadeIn space-y-8">
        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('health.healthConcerns')}
          </h3>
          <div className="flex flex-wrap gap-3">
            {healthPrediction.content.concerns.map((concern, index) => (
              <span
                key={index}
                className="rounded-lg bg-oriental-100 px-3 py-1 text-sm font-medium text-oriental-800 dark:bg-oriental-900/50 dark:text-oriental-300"
              >
                {concern}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('health.longTermHealth')}
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {healthPrediction.content.long_term_health}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('health.recommendations')}
          </h3>
          <div className="flex flex-wrap gap-3">
            {healthPrediction.content.recommendations.map((recommendation, index) => (
              <span
                key={index}
                className="rounded-lg bg-oriental-100 px-3 py-1 text-sm font-medium text-oriental-800 dark:bg-oriental-900/50 dark:text-oriental-300"
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
    const challengesPrediction = predictions.find(isChallengesPrediction) as
      | ChallengesPrediction
      | undefined;

    if (!challengesPrediction) return null;

    return (
      <div className="animate-fadeIn space-y-8">
        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('challenges.challenges')}
          </h3>
          <div className="flex flex-wrap gap-3">
            {challengesPrediction.content.challenges.map((challenge, index) => (
              <span
                key={index}
                className="rounded-lg bg-oriental-100 px-3 py-1 text-sm font-medium text-oriental-800 dark:bg-oriental-900/50 dark:text-oriental-300"
              >
                {challenge}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('challenges.remedies')}
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">{t('challenges.mantras')}</h4>
              <div className="flex flex-wrap gap-2">
                {challengesPrediction.content.remedies.mantras.map((mantra, index) => (
                  <span
                    key={index}
                    className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                  >
                    {mantra}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">{t('challenges.spiritualPractices')}</h4>
              <div className="flex flex-wrap gap-2">
                {challengesPrediction.content.remedies.spiritual_practices.map(
                  (practice, index) => (
                    <span
                      key={index}
                      className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-800 dark:text-blue-100"
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
                      className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-800 dark:text-blue-100"
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
    const majorLifePeriodsPrediction = predictions.find(isMajorLifePeriodsPrediction) as
      | MajorLifePeriodsPrediction
      | undefined;

    if (!majorLifePeriodsPrediction) return null;

    return (
      <div className="animate-fadeIn space-y-8">
        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('majorLifePeriods.earlyLife')}
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {majorLifePeriodsPrediction.content.early_life}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900">
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('majorLifePeriods.midLife')}
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {majorLifePeriodsPrediction.content.mid_life}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900">
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
