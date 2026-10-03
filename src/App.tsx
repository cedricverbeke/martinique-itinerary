import { useState, useCallback, useRef } from 'react';
import PlaceSelection from '@/components/PlaceSelection';
import StaySettingsForm from '@/components/StaySettings';
import LoadingScreen from '@/components/LoadingScreen';
import ItineraryDashboard from '@/components/ItineraryDashboard';
import { generateItinerary } from '@/lib/generator';
import { generateItineraryWithAI } from '@/lib/aiGenerator';
import type { StaySettings as StaySettingsType, Itinerary } from '@/types/itinerary';

type Step = 'selection' | 'settings' | 'loading' | 'result';

const DEFAULT_SETTINGS: StaySettingsType = {
  hebergement: 'Les Trois-Îlets',
  dateDebut: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
  dateFin: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
  heureDebut: '08:00',
  duree: 7,
  modeDate: 'jours',
  groupe: 'Couple',
  transport: 'Voiture',
  rythme: 5,
  effort: 3,
  orientation: 5,
  restauration: 5,
};

function App() {
  const [step, setStep] = useState<Step>('selection');
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [settings, setSettings] = useState<StaySettingsType>(DEFAULT_SETTINGS);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const generationStarted = useRef(false);

  const togglePlace = useCallback((id: string) => {
    setSelectedPlaces((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }, []);

  const handleGenerate = useCallback(() => {
    setAiError(null);
    generationStarted.current = false;
    setStep('loading');
  }, []);

  const handleLoadingStart = useCallback(async () => {
    if (generationStarted.current) return;
    generationStarted.current = true;

    try {
      const result = await generateItineraryWithAI(selectedPlaces, settings);
      setItinerary(result);
      setStep('result');
    } catch (err) {
      setAiError(err instanceof Error ? err.message : 'L\'IA a rencontré une erreur');
      const fallback = generateItinerary(selectedPlaces, settings);
      setItinerary(fallback);
      setStep('result');
    }
  }, [selectedPlaces, settings]);

  const handleRestart = useCallback(() => {
    setSelectedPlaces([]);
    setSettings(DEFAULT_SETTINGS);
    setItinerary(null);
    setAiError(null);
    setStep('selection');
  }, []);

  switch (step) {
    case 'selection':
      return (
        <PlaceSelection
          selectedPlaces={selectedPlaces}
          onTogglePlace={togglePlace}
          onNext={() => setStep('settings')}
        />
      );
    case 'settings':
      return (
        <StaySettingsForm
          settings={settings}
          onChange={setSettings}
          onBack={() => setStep('selection')}
          onNext={handleGenerate}
        />
      );
    case 'loading':
      return <LoadingScreen onComplete={handleLoadingStart} />;
    case 'result':
      return itinerary ? (
        <>
          {aiError && (
            <div className="fixed top-4 right-4 z-50 max-w-sm rounded-xl bg-amber-50 p-4 shadow-lg ring-1 ring-amber-200">
              <p className="text-sm font-medium text-amber-800">
                L'IA n'a pas pu générer l'itinéraire. Un itinéraire de secours a été utilisé.
              </p>
            </div>
          )}
          <ItineraryDashboard
            itinerary={itinerary}
            onBack={() => setStep('settings')}
            onRestart={handleRestart}
          />
        </>
      ) : null;
  }
}

export default App;
