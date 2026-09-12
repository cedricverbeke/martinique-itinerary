import { useState, useMemo } from 'react';
import { Waves, Mountain, Droplets, Landmark, Compass, Wine, MapPin, ArrowRight } from 'lucide-react';
import { PLACES, CATEGORIES, type Category, type Place } from '@/data/places';
import PlaceCard from './PlaceCard';
import PlaceDetailModal from './PlaceDetailModal';

interface PlaceSelectionProps {
  selectedPlaces: string[];
  onTogglePlace: (id: string) => void;
  onNext: () => void;
}

const ICON_MAP: Record<Category, typeof Waves> = {
  'Plages': Waves,
  'Randonnées': Mountain,
  'Rivières & Cascades': Droplets,
  'Culture & Patrimoine': Landmark,
  'Sport & Aventure': Compass,
  'Gastronomie & Distilleries': Wine,
};

export default function PlaceSelection({ selectedPlaces, onTogglePlace, onNext }: PlaceSelectionProps) {
  const [activeCategory, setActiveCategory] = useState<Category | 'Toutes'>('Toutes');
  const [detailPlace, setDetailPlace] = useState<Place | null>(null);

  const filteredPlaces = useMemo(() => {
    if (activeCategory === 'Toutes') return PLACES;
    return PLACES.filter((p) => p.categorie === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/10490921/pexels-photo-10490921.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-16 text-center">
          <span className="inline-block rounded-full bg-emerald-500/20 px-4 py-1.5 text-sm font-medium text-emerald-300 ring-1 ring-emerald-400/30">
            Étape 1 sur 3
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Vos incontournables en Martinique
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Sélectionnez les lieux qui font rêver parmi 20 sites emblématiques. Notre algorithme construira votre itinéraire sur-mesure.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 sm:py-4">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide sm:flex-wrap sm:gap-2">
            <button
              onClick={() => setActiveCategory('Toutes')}
              title="Toutes les catégories"
              className={`flex flex-shrink-0 items-center gap-2 rounded-full py-2 text-sm font-semibold transition-all ${
                activeCategory === 'Toutes'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              } px-3 sm:px-4`}
            >
              <span className="text-xs font-bold sm:text-sm">Toutes</span>
              <span className="hidden sm:inline">({PLACES.length})</span>
            </button>
            {CATEGORIES.map((cat) => {
              const Icon = ICON_MAP[cat];
              const count = PLACES.filter((p) => p.categorie === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  title={cat}
                  className={`flex flex-shrink-0 items-center gap-2 rounded-full py-2 text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  } px-2.5 sm:px-4`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="hidden lg:inline">{cat}</span>
                  <span className="hidden lg:inline">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-6 py-10 pb-28">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPlaces.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              selected={selectedPlaces.includes(place.id)}
              onToggle={onTogglePlace}
              onDetails={setDetailPlace}
            />
          ))}
        </div>
      </div>

      {/* Floating bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {selectedPlaces.length} lieu{selectedPlaces.length > 1 ? 'x' : ''} sélectionné{selectedPlaces.length > 1 ? 's' : ''}
              </p>
              <p className="text-xs text-slate-500">
                {selectedPlaces.length === 0
                  ? 'Choisissez au moins un lieu pour continuer'
                  : 'Prêt à paramétrer votre séjour'}
              </p>
            </div>
          </div>
          <button
            onClick={onNext}
            disabled={selectedPlaces.length === 0}
            className="group flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            Paramétrer mon séjour
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Detail modal */}
      {detailPlace && (
        <PlaceDetailModal place={detailPlace} onClose={() => setDetailPlace(null)} />
      )}
    </div>
  );
}
