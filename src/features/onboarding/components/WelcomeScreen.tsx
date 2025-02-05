import React from 'react';
import { Button } from '../../../components/ui/button';

interface WelcomeScreenProps {
  onContinue: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="from-primary/10 via-background to-primary/5 dark:from-primary/20 dark:via-background/80 dark:to-primary/10 relative w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br p-6 backdrop-blur-lg">
        <div className="bg-grid-white/10 dark:bg-grid-black/10 absolute inset-0 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

        <h1 className="text-foreground relative mb-4 text-4xl font-bold tracking-tight">
          Unlock the Power of Vedic Astrology
        </h1>

        <p className="text-muted-foreground relative mb-6 text-lg leading-relaxed">
          Personalized insights, daily guidance, and AI-driven astrology—all at your fingertips!
        </p>

        <div className="relative mt-2 flex justify-center">
          <Button
            onClick={onContinue}
            className="bg-primary/90 hover:bg-primary w-full max-w-xs text-base font-medium transition-all"
            size="lg"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};
