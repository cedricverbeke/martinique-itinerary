import { useState, useCallback } from 'react';
import PlaceSelection from '@/components/PlaceSelection';
import StaySettingsForm from '@/components/StaySettings';
import LoadingScreen from '@/components/LoadingScreen';
import ItineraryDashboard from '@/components/ItineraryDashboard';
import { generateItinerary } from '@/services/aiService';
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

  const togglePlace = useCallback((id: string) => {
    setSelectedPlaces((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }, []);

  const handleGenerate = useCallback(() => {
    setStep('loading');
  }, []);

  const handleLoadingComplete = useCallback(async () => {
    const result = await generateItinerary({
      selectedPlaces,
      ...settings,
    });
    setItinerary(result.legacyItinerary);
    setStep('result');
  }, [selectedPlaces, settings]);

  const handleRestart = useCallback(() => {
    setSelectedPlaces([]);
    setSettings(DEFAULT_SETTINGS);
    setItinerary(null);
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
      return <LoadingScreen onComplete={handleLoadingComplete} />;
    case 'result':
      return itinerary ? (
        <ItineraryDashboard
          itinerary={itinerary}
          onBack={() => setStep('settings')}
          onRestart={handleRestart}
        />
      ) : null;
  }
}

export default App;
