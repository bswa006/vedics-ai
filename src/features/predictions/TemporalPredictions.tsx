import { useTranslation } from "react-i18next";
import { VedicReading } from "../../types/vedic";

interface TemporalPredictionsProps {
  predictions: VedicReading;
}

import { useState } from "react";

export function TemporalPredictions({ predictions }: TemporalPredictionsProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"yearly" | "monthly">("yearly");

  if (!predictions.prediction.temporal_predictions) {
    return null;
  }

  const { yearly, monthly } = predictions.prediction.temporal_predictions;

  const renderYearlyPredictions = () => {
    const currentYear = new Date().getFullYear().toString();
    const yearPrediction = yearly[currentYear];

    if (!yearPrediction) {
      return <div className="text-gray-700 dark:text-gray-300">{t("predictions.no_yearly_predictions")}</div>;
    }

    return (
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {t("predictions.overview")}
          </h4>
          <p className="text-gray-700 dark:text-gray-300">{yearPrediction.overview}</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {t("predictions.career")}
          </h4>
          <p className="text-gray-700 dark:text-gray-300">{yearPrediction.career}</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {t("predictions.relationships")}
          </h4>
          <p className="text-gray-700 dark:text-gray-300">{yearPrediction.relationships}</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {t("predictions.health")}
          </h4>
          <p className="text-gray-700 dark:text-gray-300">{yearPrediction.health}</p>
        </div>
      </div>
    );
  };

  const renderMonthlyPredictions = () => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' }).toLowerCase();
    const monthPrediction = monthly[currentMonth];

    if (!monthPrediction) {
      return <div className="text-gray-700 dark:text-gray-300">{t("predictions.no_monthly_predictions")}</div>;
    }

    return (
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {t("predictions.overview")}
          </h4>
          <p className="text-gray-700 dark:text-gray-300">{monthPrediction.overview}</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {t("predictions.focus_areas")}
          </h4>
          <ul className="list-disc list-inside space-y-1">
            {monthPrediction.focus_areas.map((area, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">{area}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fadeIn">
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl shadow-purple-900/10 p-6 transition-all hover:shadow-2xl hover:scale-[1.02] duration-300">
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("yearly")}
            className={`flex-1 py-2 px-4 rounded-lg transition-all ${
              activeTab === "yearly"
                ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg"
                : "hover:bg-slate-50 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-200"
            }`}
          >
            <span className="font-medium">
              {t("predictions.yearly")}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("monthly")}
            className={`flex-1 py-2 px-4 rounded-lg transition-all ${
              activeTab === "monthly"
                ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg"
                : "hover:bg-slate-50 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-200"
            }`}
          >
            <span className="font-medium">
              {t("predictions.monthly")}
            </span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "yearly" && renderYearlyPredictions()}
        {activeTab === "monthly" && renderMonthlyPredictions()}
      </div>
    </div>
  );
}
