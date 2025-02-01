import { CalendarDays, Clock, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PredictionTypeSelectorProps {
  predictionType: "overall" | "daily" | "monthly";
  setPredictionType: (type: "overall" | "daily" | "monthly") => void;
}

export function PredictionTypeSelector({
  predictionType,
  setPredictionType,
}: PredictionTypeSelectorProps) {
  const { t } = useTranslation();

  const types = [
    {
      id: "overall",
      label: t("predictions.generalFuture"),
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      id: "daily",
      label: t("predictions.daily"),
      icon: <Clock className="w-5 h-5" />,
    },
    {
      id: "monthly",
      label: t("predictions.monthly"),
      icon: <CalendarDays className="w-5 h-5" />,
    },
  ] as const;

  return (
    <div className="flex justify-center gap-2 mb-2">
      {types.map((type) => (
        <button
          key={type.id}
          onClick={() => setPredictionType(type.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all duration-300
            ${
              predictionType === type.id
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white ring-2 ring-indigo-200 dark:ring-indigo-900"
                : "bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
        >
          <div className="w-4 h-4">{type.icon}</div>
          <span className="font-medium">{type.label}</span>
        </button>
      ))}
    </div>
  );
}
