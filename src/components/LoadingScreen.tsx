import { useEffect, useState } from 'react';
import { MapPin, Route, Clock, Wallet, Sparkles } from 'lucide-react';

const MESSAGES = [
  { icon: MapPin, text: "Analyse de vos lieux sélectionnés..." },
  { icon: Route, text: "Optimisation des trajets entre les sites..." },
  { icon: Clock, text: "Analyse des heures de pointe et du trafic..." },
  { icon: Wallet, text: "Calcul du budget estimé par journée..." },
  { icon: Sparkles, text: "Personnalisation des conseils d'expert local..." },
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepDuration = 800;
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= MESSAGES.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      <div className="w-full max-w-md px-6">
        {/* Animated icon */}
        <div className="relative mx-auto mb-10 h-28 w-28">
          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20" />
          <div className="absolute inset-2 animate-pulse rounded-full bg-emerald-500/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-2xl shadow-emerald-500/50">
              <MapPin className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-slate-700/50">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-700 ease-out"
            style={{ width: `${((currentStep + 1) / MESSAGES.length) * 100}%` }}
          />
        </div>

        {/* Messages */}
        <div className="space-y-3">
          {MESSAGES.map((msg, index) => {
            const Icon = msg.icon;
            const isDone = index < currentStep;
            const isActive = index === currentStep;
            return (
              <div
                key={index}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-500 ${
                  isActive
                    ? 'bg-white/10 ring-1 ring-emerald-400/30'
                    : isDone
                    ? 'opacity-40'
                    : 'opacity-20'
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition-colors ${
                    isDone ? 'text-emerald-400' : isActive ? 'text-emerald-300' : 'text-slate-400'
                  } ${isActive ? 'animate-bounce' : ''}`}
                />
                <span
                  className={`text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : isDone ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
