import { useTranslation } from 'react-i18next';
import { PredictionResponse, PredictionType } from '../../types/predictions';

interface PredictionContentProps {
  activeTab: PredictionType;
  predictions: PredictionResponse;
}

export function PredictionContent({ activeTab, predictions }: PredictionContentProps): JSX.Element {
  const { t } = useTranslation();

  const renderPersonalityTab = (): JSX.Element | null => {
    const cardStyle =
      'rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-indigo-500/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-indigo-500/5 hover:via-purple-500/5 hover:to-fuchsia-500/5 dark:hover:from-indigo-500/10 dark:hover:via-purple-500/10 dark:hover:to-fuchsia-500/10';
    const personalityPrediction = predictions.find(
      p => p.type === 'core_personality_and_life_path'
    );
    if (!personalityPrediction) return null;

    const {
      traits = [],
      strengths = [],
      weaknesses = [],
      social_perception = '',
      past_life_influence = '',
    } = personalityPrediction.content;

    return (
      <div className="animate-fadeIn space-y-4" data-testid="personality-tab">
        <div className={cardStyle}>
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            {t('personality.traits')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {traits.map((trait: string, index: number) => (
              <span
                key={index}
                className="mb-2 mr-2 inline-block rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            {t('personality.socialPerception')}
          </h3>
          <p className="leading-relaxed text-black dark:text-white">{social_perception}</p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            {t('personality.pastLifeInfluence')}
          </h3>
          <p className="leading-relaxed text-black dark:text-white">{past_life_influence}</p>
        </div>

        {strengths.length > 0 && (
          <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
              {t('personality.strengths')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {strengths.map((strength: string, index: number) => (
                <span
                  key={index}
                  className="mb-2 mr-2 inline-block rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>
        )}

        {weaknesses.length > 0 && (
          <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
              {t('personality.weaknesses')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {weaknesses.map((weakness: string, index: number) => (
                <span
                  key={index}
                  className="mb-2 mr-2 inline-block rounded-full bg-rose-50 px-3 py-1 text-sm font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
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

  const renderCareerTab = (): JSX.Element | null => {
    const cardStyle =
      'rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-amber-500/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-amber-400/5 hover:via-yellow-500/5 hover:to-orange-500/5 dark:hover:from-amber-400/10 dark:hover:via-yellow-500/10 dark:hover:to-orange-500/10';
    const careerPrediction = predictions.find(p => p.type === 'career_success_and_wealth');
    if (!careerPrediction) return null;

    const {
      ideal_professions = [],
      financial_growth = { trend: '', wealth_accumulation: '' },
      career_transformation = { expected_age_range: '', prediction: '' },
      foreign_opportunities = '',
      business_vs_job = '',
    } = careerPrediction.content;

    return (
      <div className="animate-fadeIn space-y-8" data-testid="career-tab">
        <div className={cardStyle}>
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            {t('career.idealProfessions')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {ideal_professions.map((profession, index) => (
              <span
                key={index}
                className="mb-2 mr-2 inline-block rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
              >
                {profession}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            {t('career.financialGrowth')}
          </h3>
          <p className="leading-relaxed text-black dark:text-white">
            {financial_growth.trend || ''}
          </p>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            {financial_growth.wealth_accumulation || ''}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            {t('career.foreignOpportunities')}
          </h3>
          <p className="leading-relaxed text-black dark:text-white">{foreign_opportunities}</p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            {t('career.careerTransformation')}
          </h3>
          <p className="leading-relaxed text-black dark:text-white">
            <strong>{t('career.expectedAgeRangeLabel')}</strong>{' '}
            {career_transformation.expected_age_range || ''}
          </p>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            {career_transformation.prediction || ''}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            {t('career.businessVsJob')}
          </h3>
          <p className="leading-relaxed text-black dark:text-white">{business_vs_job || ''}</p>
        </div>
      </div>
    );
  };

  const renderRelationshipsTab = (): JSX.Element | null => {
    const cardStyle =
      'rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-rose-500/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-rose-500/5 hover:via-pink-500/5 hover:to-purple-500/5 dark:hover:from-rose-500/10 dark:hover:via-pink-500/10 dark:hover:to-purple-500/10';
    const relationsPrediction = predictions.find(p => p.type === 'relationships_love_and_marriage');
    if (!relationsPrediction) return null;

    const content = relationsPrediction.content;

    return (
      <div className="animate-fadeIn space-y-4" data-testid="relationships-tab">
        <div className={cardStyle}>
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            {t('relationships.relationshipTraits')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {content.traits_in_relationships.map((trait, index) => (
              <span
                key={index}
                className="mb-2 mr-2 inline-block rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            {t('relationships.marriage')}
          </h3>
          <p className="leading-relaxed text-black dark:text-white">{content.marriage.prediction}</p>
          <h4 className="mb-2 mt-4 font-semibold">{t('relationships.partnerTraits')}</h4>
          <div className="flex flex-wrap gap-2">
            {content.marriage.partner_traits.map((trait, index) => (
              <span
                key={index}
                className="mb-2 mr-2 inline-block rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
              >
                {trait}
              </span>
            ))}
          </div>
          <h4 className="mb-2 mt-4 font-semibold">{t('relationships.challenges')}</h4>
          <p className="leading-relaxed text-black dark:text-white">{content.marriage.challenges}</p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            {t('relationships.romanticInfluences')}
          </h3>
          <p className="leading-relaxed text-black dark:text-white">{content.romantic_influences}</p>
        </div>
      </div>
    );
  };

  const renderHealthTab = (): JSX.Element | null => {
    const cardStyle =
      'rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-emerald-500/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-emerald-400/5 hover:via-teal-500/5 hover:to-cyan-500/5 dark:hover:from-emerald-400/10 dark:hover:via-teal-500/10 dark:hover:to-cyan-500/10';
    const healthPrediction = predictions.find(p => p.type === 'health_and_wellbeing');
    if (!healthPrediction) return null;

    const { concerns = [], recommendations = [], long_term_health = '' } = healthPrediction.content;

    return (
      <div className="animate-fadeIn space-y-4" data-testid="health-tab">
        <div className={cardStyle}>
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            {t('health.healthConcerns')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {concerns.map((concern, index) => (
              <p
                key={index}
                className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300"
              >
                {concern}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            {t('health.longTermHealth')}
          </h3>
          <p className="leading-relaxed text-black dark:text-white">{long_term_health}</p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            {t('health.recommendations')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {recommendations.map((recommendation, index) => (
              <p
                key={index}
                className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300"
              >
                {recommendation}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderChallengesTab = (): JSX.Element | null => {
    const cardStyle =
      'rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-blue-600/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-blue-600/5 hover:via-indigo-600/5 hover:to-violet-600/5 dark:hover:from-blue-600/10 dark:hover:via-indigo-600/10 dark:hover:to-violet-600/10';
    const challengesPrediction = predictions.find(p => p.type === 'challenges_and_remedies');
    if (!challengesPrediction) return null;

    const {
      challenges = [],
      remedies = {
        mantras: [],
        spiritual_practices: [],
        astrological_recommendations: [],
      },
    } = challengesPrediction.content;

    return (
      <div className="animate-fadeIn space-y-4" data-testid="challenges-tab">
        <div className={cardStyle}>
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            {t('challenges.challenges')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {challenges.map((challenge, index) => (
              <p
                key={index}
                className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300"
              >
                {challenge}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            {t('challenges.remedies')}
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">
                {t('challenges.mantras')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {remedies.mantras.map((mantra, index) => (
                  <p
                    key={index}
                    className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300"
                  >
                    {mantra}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">
                {t('challenges.spiritualPractices')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {remedies.spiritual_practices.map((practice, index) => (
                  <p
                    key={index}
                    className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300"
                  >
                    {practice}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-2 font-semibold">{t('challenges.astrologicalRecommendations')}</h4>
              <div className="flex flex-wrap gap-2">
                {remedies.astrological_recommendations.map((recommendation, index) => (
                  <p
                    key={index}
                    className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300"
                  >
                    {recommendation}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMajorLifePeriodsTab = (): JSX.Element | null => {
    const cardStyle =
      'rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-cyan-500/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 hover:bg-gradient-to-br hover:from-cyan-400/5 hover:via-blue-500/5 hover:to-indigo-500/5 dark:hover:from-cyan-400/10 dark:hover:via-blue-500/10 dark:hover:to-indigo-500/10';
    const majorLifePeriodsPrediction = predictions.find(p => p.type === 'major_life_periods');
    if (!majorLifePeriodsPrediction) return null;

    const { early_life = '', mid_life = '', later_years = '' } = majorLifePeriodsPrediction.content;

    return (
      <div className="animate-fadeIn space-y-4" data-testid="major-life-periods-tab">
        <div className={cardStyle}>
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            {t('majorLifePeriods.earlyLife')}
          </h3>
          <p className="leading-relaxed text-black dark:text-white">{early_life}</p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            {t('majorLifePeriods.midLife')}
          </h3>
          <p className="leading-relaxed text-black dark:text-white">{mid_life}</p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            {t('majorLifePeriods.laterYears')}
          </h3>
          <p className="leading-relaxed text-black dark:text-white">{later_years}</p>
        </div>
      </div>
    );
  };

  const renderContent = (tab: PredictionType): JSX.Element | null => {
    if (!predictions || predictions.length === 0) return null;

    switch (tab) {
      case 'core_personality_and_life_path':
        return renderPersonalityTab();
      case 'career_success_and_wealth':
        return renderCareerTab();
      case 'relationships_love_and_marriage':
        return renderRelationshipsTab();
      case 'health_and_wellbeing':
        return renderHealthTab();
      case 'challenges_and_remedies':
        return renderChallengesTab();
      case 'major_life_periods':
        return renderMajorLifePeriodsTab();
      default:
        return null;
    }
  };

  return (
    <div className="relative h-[calc(100vh-12rem)] w-full overflow-hidden" data-testid="prediction-content">
      <div className="h-full w-full overflow-y-auto overflow-x-hidden px-4 pb-4">
        {renderContent(activeTab)}
      </div>
    </div>
  );
}
