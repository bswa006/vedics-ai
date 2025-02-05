import { useTranslation } from 'react-i18next';
import { PredictionResponse, PredictionType } from '../../types/predictions';

interface PredictionContentProps {
  activeTab: PredictionType;
  predictions: PredictionResponse;
}

export function PredictionContent({ activeTab, predictions }: PredictionContentProps): JSX.Element {
  const { t } = useTranslation();

  const renderPersonalityTab = (): JSX.Element | null => {
    const cardStyle = `
    group relative rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8
    shadow-xl shadow-indigo-500/10 transition-all duration-300
    hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900
    hover:bg-gradient-to-br hover:from-indigo-500/5 hover:via-purple-500/5 hover:to-fuchsia-500/5
    dark:hover:from-indigo-500/10 dark:hover:via-purple-500/10 dark:hover:to-fuchsia-500/10
    before:absolute before:inset-0 before:rounded-2xl before:border before:border-gray-200/50
    before:transition-all before:duration-300 hover:before:border-indigo-500/30 dark:before:border-gray-700/50
  `;
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
          <h3 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {t('personality.traits')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {traits.map((trait: string, index: number) => (
              <span
                key={index}
                className="mb-2 mr-2 inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 transition-all duration-300 hover:scale-105 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-800/40"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {t('personality.socialPerception')}
          </h3>
          <p className="leading-relaxed text-gray-800 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-gray-100">
            {social_perception}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {t('personality.pastLifeInfluence')}
          </h3>
          <p className="leading-relaxed text-gray-800 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-gray-100">
            {past_life_influence}
          </p>
        </div>

        {strengths.length > 0 && (
          <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
            <h3 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
              {t('personality.strengths')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {strengths.map((strength: string, index: number) => (
                <span
                  key={index}
                  className="mb-2 mr-2 inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700 transition-all duration-300 hover:scale-105 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-800/40"
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>
        )}

        {weaknesses.length > 0 && (
          <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
            <h3 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
              {t('personality.weaknesses')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {weaknesses.map((weakness: string, index: number) => (
                <span
                  key={index}
                  className="mb-2 mr-2 inline-block rounded-full bg-rose-50 px-4 py-1.5 text-sm font-medium text-rose-700 transition-all duration-300 hover:scale-105 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-800/40"
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
    const cardStyle = `
    group relative rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8
    shadow-xl shadow-amber-500/10 transition-all duration-300
    hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900
    hover:bg-gradient-to-br hover:from-amber-400/5 hover:via-yellow-500/5 hover:to-orange-500/5
    dark:hover:from-amber-400/10 dark:hover:via-yellow-500/10 dark:hover:to-orange-500/10
    before:absolute before:inset-0 before:rounded-2xl before:border before:border-gray-200/50
    before:transition-all before:duration-300 hover:before:border-amber-500/30 dark:before:border-gray-700/50
  `;
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
      <div className="animate-fadeIn space-y-6" data-testid="career-tab">
        <div className={cardStyle}>
          <h3 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {t('career.idealProfessions')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {ideal_professions.map((profession, index) => (
              <span
                key={index}
                className="mb-2 mr-2 inline-block rounded-full bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-700 transition-all duration-300 hover:scale-105 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-800/40"
              >
                {profession}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {t('career.financialGrowth')}
          </h3>
          <p className="leading-relaxed text-gray-800 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-gray-100">
            {financial_growth.trend || ''}
          </p>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            {financial_growth.wealth_accumulation || ''}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {t('career.foreignOpportunities')}
          </h3>
          <p className="leading-relaxed text-gray-800 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-gray-100">
            {foreign_opportunities}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {t('career.careerTransformation')}
          </h3>
          <p className="leading-relaxed text-gray-800 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-gray-100">
            <strong>{t('career.expectedAgeRangeLabel')}</strong>{' '}
            {career_transformation.expected_age_range || ''}
          </p>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
            {career_transformation.prediction || ''}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {t('career.businessVsJob')}
          </h3>
          <p className="leading-relaxed text-gray-800 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-gray-100">
            {business_vs_job || ''}
          </p>
        </div>
      </div>
    );
  };

  const renderRelationshipsTab = (): JSX.Element | null => {
    const cardStyle = `
    group relative rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8
    shadow-xl shadow-rose-500/10 transition-all duration-300
    hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900
    hover:bg-gradient-to-br hover:from-rose-500/5 hover:via-pink-500/5 hover:to-purple-500/5
    dark:hover:from-rose-500/10 dark:hover:via-pink-500/10 dark:hover:to-purple-500/10
    before:absolute before:inset-0 before:rounded-2xl before:border before:border-gray-200/50
    before:transition-all before:duration-300 hover:before:border-rose-500/30 dark:before:border-gray-700/50
  `;
    const relationsPrediction = predictions.find(p => p.type === 'relationships_love_and_marriage');
    if (!relationsPrediction) return null;

    const content = relationsPrediction.content;

    return (
      <div className="animate-fadeIn space-y-6" data-testid="relationships-tab">
        <div className={cardStyle}>
          <h3 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {t('relationships.relationshipTraits')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {content.traits_in_relationships.map((trait, index) => (
              <span
                key={index}
                className="mb-2 mr-2 inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 transition-all duration-300 hover:scale-105 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-800/40"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {t('relationships.marriage')}
          </h3>
          <p className="leading-relaxed text-gray-800 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-gray-100">
            {content.marriage.prediction}
          </p>
          <h4 className="mb-3 mt-6 text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-indigo-500 dark:text-gray-200 dark:group-hover:text-indigo-400">
            {t('relationships.partnerTraits')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {content.marriage.partner_traits.map((trait, index) => (
              <span
                key={index}
                className="mb-2 mr-2 inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 transition-all duration-300 hover:scale-105 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-800/40"
              >
                {trait}
              </span>
            ))}
          </div>
          <h4 className="mb-3 mt-6 text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-indigo-500 dark:text-gray-200 dark:group-hover:text-indigo-400">
            {t('relationships.challenges')}
          </h4>
          <p className="leading-relaxed text-gray-800 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-gray-100">
            {content.marriage.challenges}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {t('relationships.romanticInfluences')}
          </h3>
          <p className="leading-relaxed text-gray-800 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-gray-100">
            {content.romantic_influences}
          </p>
        </div>
      </div>
    );
  };

  const renderHealthTab = (): JSX.Element | null => {
    const cardStyle = `
    group relative rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8
    shadow-xl shadow-emerald-500/10 transition-all duration-300
    hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900
    hover:bg-gradient-to-br hover:from-emerald-400/5 hover:via-teal-500/5 hover:to-cyan-500/5
    dark:hover:from-emerald-400/10 dark:hover:via-teal-500/10 dark:hover:to-cyan-500/10
    before:absolute before:inset-0 before:rounded-2xl before:border before:border-gray-200/50
    before:transition-all before:duration-300 hover:before:border-emerald-500/30 dark:before:border-gray-700/50
  `;
    const healthPrediction = predictions.find(p => p.type === 'health_and_wellbeing');
    if (!healthPrediction) return null;

    const { concerns = [], recommendations = [], long_term_health = '' } = healthPrediction.content;

    return (
      <div className="animate-fadeIn space-y-6" data-testid="health-tab">
        <div className={cardStyle}>
          <h3 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {t('health.healthConcerns')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {concerns.map((concern, index) => (
              <p
                key={index}
                className="text-base leading-relaxed text-gray-700 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100"
              >
                {concern}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {t('health.longTermHealth')}
          </h3>
          <p className="leading-relaxed text-gray-800 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-gray-100">
            {long_term_health}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {t('health.recommendations')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {recommendations.map((recommendation, index) => (
              <p
                key={index}
                className="text-base leading-relaxed text-gray-700 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100"
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
    const cardStyle = `
    group relative rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8
    shadow-xl shadow-blue-600/10 transition-all duration-300
    hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900
    hover:bg-gradient-to-br hover:from-blue-600/5 hover:via-indigo-600/5 hover:to-violet-600/5
    dark:hover:from-blue-600/10 dark:hover:via-indigo-600/10 dark:hover:to-violet-600/10
    before:absolute before:inset-0 before:rounded-2xl before:border before:border-gray-200/50
    before:transition-all before:duration-300 hover:before:border-blue-600/30 dark:before:border-gray-700/50
  `;
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
      <div className="animate-fadeIn space-y-6" data-testid="challenges-tab">
        <div className={cardStyle}>
          <h3 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {t('challenges.challenges')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {challenges.map((challenge, index) => (
              <p
                key={index}
                className="text-base leading-relaxed text-gray-700 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100"
              >
                {challenge}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {t('challenges.remedies')}
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="mb-3 text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-indigo-500 dark:text-gray-200 dark:group-hover:text-indigo-400">
                {t('challenges.mantras')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {remedies.mantras.map((mantra, index) => (
                  <p
                    key={index}
                    className="text-base leading-relaxed text-gray-700 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100"
                  >
                    {mantra}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-indigo-500 dark:text-gray-200 dark:group-hover:text-indigo-400">
                {t('challenges.spiritualPractices')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {remedies.spiritual_practices.map((practice, index) => (
                  <p
                    key={index}
                    className="text-base leading-relaxed text-gray-700 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100"
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
                    className="text-base leading-relaxed text-gray-700 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100"
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
    const cardStyle = `
    group relative rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8
    shadow-xl shadow-cyan-500/10 transition-all duration-300
    hover:scale-[1.02] hover:shadow-2xl dark:from-gray-800 dark:to-gray-900
    hover:bg-gradient-to-br hover:from-cyan-400/5 hover:via-blue-500/5 hover:to-indigo-500/5
    dark:hover:from-cyan-400/10 dark:hover:via-blue-500/10 dark:hover:to-indigo-500/10
    before:absolute before:inset-0 before:rounded-2xl before:border before:border-gray-200/50
    before:transition-all before:duration-300 hover:before:border-cyan-500/30 dark:before:border-gray-700/50
  `;
    const majorLifePeriodsPrediction = predictions.find(p => p.type === 'major_life_periods');
    if (!majorLifePeriodsPrediction) return null;

    const { early_life = '', mid_life = '', later_years = '' } = majorLifePeriodsPrediction.content;

    return (
      <div className="animate-fadeIn space-y-6" data-testid="major-life-periods-tab">
        <div className={cardStyle}>
          <h3 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {t('majorLifePeriods.earlyLife')}
          </h3>
          <p className="leading-relaxed text-gray-800 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-gray-100">
            {early_life}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {t('majorLifePeriods.midLife')}
          </h3>
          <p className="leading-relaxed text-gray-800 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-gray-100">
            {mid_life}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl shadow-oriental-900/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-oriental-50 hover:to-oriental-100 hover:shadow-2xl dark:from-gray-800 dark:to-gray-900 dark:hover:from-oriental-900/20 dark:hover:to-oriental-800/20">
          <h3 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {t('majorLifePeriods.laterYears')}
          </h3>
          <p className="leading-relaxed text-gray-800 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-gray-100">
            {later_years}
          </p>
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
    <div
      className="relative overflow-hidden bg-gradient-to-b from-transparent via-gray-50/50 to-gray-50/50 dark:via-gray-900/50 dark:to-gray-900/50"
      data-testid="prediction-content"
    >
      <div className="h-full w-full overflow-y-auto overflow-x-hidden px-6 pb-6">
        {renderContent(activeTab)}
      </div>
    </div>
  );
}
