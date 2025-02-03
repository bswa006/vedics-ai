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
      'rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-indigo-500/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-indigo-500/5 hover:via-purple-500/5 hover:to-fuchsia-500/5 dark:hover:from-indigo-500/10 dark:hover:via-purple-500/10 dark:hover:to-fuchsia-500/10';
    const personalityPrediction = predictions.find(isCorePersonalityPrediction) as
      | CorePersonalityPrediction
      | undefined;

    if (!personalityPrediction || !personalityPrediction.content) return null;
    
    const traits = personalityPrediction.content.traits || [];

    return (
      <div className="animate-fadeIn space-y-8">
        <div className={cardStyle}>
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('personality.traits')}
          </h3>
          <div className="flex flex-wrap gap-3">
            {traits.map((trait: string, index: number) => (
              <span
                key={index}
                className="rounded-lg bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-fuchsia-500/10 px-3 py-1 text-sm font-medium text-indigo-700 transition-all duration-300 hover:scale-105 hover:from-indigo-500/20 hover:via-purple-500/20 hover:to-fuchsia-500/20 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-fuchsia-500/20 dark:text-indigo-300 dark:hover:from-indigo-500/30 dark:hover:via-purple-500/30 dark:hover:to-fuchsia-500/30"
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
      'rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-amber-500/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-amber-400/5 hover:via-yellow-500/5 hover:to-orange-500/5 dark:hover:from-amber-400/10 dark:hover:via-yellow-500/10 dark:hover:to-orange-500/10';
    const careerPrediction = predictions.find(isCareerSuccessPrediction) as
      | CareerSuccessPrediction
      | undefined;

    if (!careerPrediction || !careerPrediction.content) return null;
    
    const idealProfessions = careerPrediction.content.ideal_professions || [];

    return (
      <div className="animate-fadeIn space-y-8">
        <div className={cardStyle}>
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('career.idealProfessions')}
          </h3>
          <div className="flex flex-wrap gap-3">
            {idealProfessions.map((profession, index) => (
              <span
                key={index}
                className="rounded-lg bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-fuchsia-500/10 px-3 py-1 text-sm font-medium text-indigo-700 transition-all duration-300 hover:scale-105 hover:from-indigo-500/20 hover:via-purple-500/20 hover:to-fuchsia-500/20 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-fuchsia-500/20 dark:text-indigo-300 dark:hover:from-indigo-500/30 dark:hover:via-purple-500/30 dark:hover:to-fuchsia-500/30"
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
      'rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-rose-500/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-rose-500/5 hover:via-pink-500/5 hover:to-purple-500/5 dark:hover:from-rose-500/10 dark:hover:via-pink-500/10 dark:hover:to-purple-500/10';
    const relationsPrediction = predictions.find(isRelationshipsPrediction) as
      | RelationshipsPrediction
      | undefined;

    if (!relationsPrediction || !relationsPrediction.content || !relationsPrediction.content.marriage) return null;
    
    const partnerTraits = relationsPrediction.content.marriage.partner_traits || [];

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
                className="rounded-lg bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-fuchsia-500/10 px-3 py-1 text-sm font-medium text-indigo-700 transition-all duration-300 hover:scale-105 hover:from-indigo-500/20 hover:via-purple-500/20 hover:to-fuchsia-500/20 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-fuchsia-500/20 dark:text-indigo-300 dark:hover:from-indigo-500/30 dark:hover:via-purple-500/30 dark:hover:to-fuchsia-500/30"
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
            {partnerTraits.map((trait, index) => (
              <span
                key={index}
                className="rounded-lg bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-fuchsia-500/10 px-3 py-1 text-sm font-medium text-indigo-700 transition-all duration-300 hover:scale-105 hover:from-indigo-500/20 hover:via-purple-500/20 hover:to-fuchsia-500/20 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-fuchsia-500/20 dark:text-indigo-300 dark:hover:from-indigo-500/30 dark:hover:via-purple-500/30 dark:hover:to-fuchsia-500/30"
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
      'rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-emerald-500/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-emerald-400/5 hover:via-teal-500/5 hover:to-cyan-500/5 dark:hover:from-emerald-400/10 dark:hover:via-teal-500/10 dark:hover:to-cyan-500/10';
    const healthPrediction = predictions.find(isHealthPrediction) as HealthPrediction | undefined;

    if (!healthPrediction || !healthPrediction.content) return null;
    
    const concerns = healthPrediction.content.concerns || [];

    return (
      <div className="animate-fadeIn space-y-8">
        <div className={cardStyle}>
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('health.healthConcerns')}
          </h3>
          <div className="flex flex-wrap gap-3">
            {concerns.map((concern, index) => (
              <span
                key={index}
                className="rounded-lg bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-fuchsia-500/10 px-3 py-1 text-sm font-medium text-indigo-700 transition-all duration-300 hover:scale-105 hover:from-indigo-500/20 hover:via-purple-500/20 hover:to-fuchsia-500/20 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-fuchsia-500/20 dark:text-indigo-300 dark:hover:from-indigo-500/30 dark:hover:via-purple-500/30 dark:hover:to-fuchsia-500/30"
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
                className="rounded-lg bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-fuchsia-500/10 px-3 py-1 text-sm font-medium text-indigo-700 transition-all duration-300 hover:scale-105 hover:from-indigo-500/20 hover:via-purple-500/20 hover:to-fuchsia-500/20 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-fuchsia-500/20 dark:text-indigo-300 dark:hover:from-indigo-500/30 dark:hover:via-purple-500/30 dark:hover:to-fuchsia-500/30"
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
      'rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-blue-600/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-blue-600/5 hover:via-indigo-600/5 hover:to-violet-600/5 dark:hover:from-blue-600/10 dark:hover:via-indigo-600/10 dark:hover:to-violet-600/10';
    const challengesPrediction = predictions.find(isChallengesPrediction) as
      | ChallengesPrediction
      | undefined;

    if (!challengesPrediction || !challengesPrediction.content || !challengesPrediction.content.remedies) return null;
    
    const challenges = challengesPrediction.content.challenges || [];
    const mantras = challengesPrediction.content.remedies.mantras || [];
    const spiritualPractices = challengesPrediction.content.remedies.spiritual_practices || [];
    const astrologicalRecommendations = challengesPrediction.content.remedies.astrological_recommendations || [];

    return (
      <div className="animate-fadeIn space-y-8">
        <div className={cardStyle}>
          <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-gray-100">
            {t('challenges.challenges')}
          </h3>
          <div className="flex flex-wrap gap-3">
            {challenges.map((challenge, index) => (
              <span
                key={index}
                className="rounded-lg bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-fuchsia-500/10 px-3 py-1 text-sm font-medium text-indigo-700 transition-all duration-300 hover:scale-105 hover:from-indigo-500/20 hover:via-purple-500/20 hover:to-fuchsia-500/20 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-fuchsia-500/20 dark:text-indigo-300 dark:hover:from-indigo-500/30 dark:hover:via-purple-500/30 dark:hover:to-fuchsia-500/30"
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
                {mantras.map((mantra, index) => (
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
                {spiritualPractices.map(
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
                {astrologicalRecommendations.map(
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
      'rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-cyan-500/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-cyan-400/5 hover:via-blue-500/5 hover:to-indigo-500/5 dark:hover:from-cyan-400/10 dark:hover:via-blue-500/10 dark:hover:to-indigo-500/10';
    const majorLifePeriodsPrediction = predictions.find(isMajorLifePeriodsPrediction) as
      | MajorLifePeriodsPrediction
      | undefined;

    if (!majorLifePeriodsPrediction || !majorLifePeriodsPrediction.content) return null;

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
