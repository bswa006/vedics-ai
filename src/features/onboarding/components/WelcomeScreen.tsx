import React from 'react';
import { Button } from '../../../components/ui/button';

interface WelcomeScreenProps {
  onContinue: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="space-y-8 max-w-md">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Unlock the Power of Vedic Astrology
        </h1>

        <p className="text-lg leading-relaxed text-gray-300">
          Personalized insights, daily guidance, and AI-driven astrology—all at your fingertips!
        </p>

        <div className="pt-4">
          <Button
            onClick={onContinue}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors
              disabled:bg-blue-400/50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};
