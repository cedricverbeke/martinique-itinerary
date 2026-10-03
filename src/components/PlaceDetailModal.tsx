import { useState } from 'react';
import { X, MapPin, Clock, Euro, Gauge, Sun, Calendar, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import type { Place } from '@/data/places';

interface PlaceDetailModalProps {
  place: Place;
  onClose: () => void;
}

const BEST_TIME_LABELS: Record<string, string> = {
  matin: 'Matin (recommandé)',
  apresMidi: 'Après-midi',
  soir: 'Soir',
  any: 'Toute la journée',
};

const EFFORT_LABELS: Record<number, string> = {
  1: 'Très facile',
  2: 'Facile',
  3: 'Modéré',
  4: 'Soutenu',
  5: 'Exigeant',
};

export default function PlaceDetailModal({ place, onClose }: PlaceDetailModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const allImages = [place.image, ...place.galerie];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main image */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={allImages[activeImage]}
            alt={place.nom}
            className="h-full w-full object-cover transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg transition-colors hover:bg-white"
          >
            <X className="h-5 w-5" />
          </button>
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
            {place.categorie}
          </span>
          <h2 className="absolute bottom-4 left-4 right-4 text-2xl font-bold text-white drop-shadow-lg">
            {place.nom}
          </h2>
        </div>

        {/* Thumbnail gallery */}
        <div className="flex gap-2 px-6 pt-4">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`relative h-16 w-24 overflow-hidden rounded-lg transition-all ${
                activeImage === i
                  ? 'ring-2 ring-emerald-500 ring-offset-2'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`${place.nom} ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        {/* Scrollable content */}
        <div className="max-h-[45vh] overflow-y-auto px-6 py-5">
          {/* Quick info grid */}
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="flex flex-col items-center gap-1 rounded-xl bg-slate-50 p-3 text-center">
              <MapPin className="h-4 w-4 text-emerald-600" />
              <p className="text-[10px] font-medium text-slate-400">Zone</p>
              <p className="text-xs font-bold text-slate-700">{place.zone}</p>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-xl bg-slate-50 p-3 text-center">
              <Clock className="h-4 w-4 text-emerald-600" />
              <p className="text-[10px] font-medium text-slate-400">Durée</p>
              <p className="text-xs font-bold text-slate-700">{place.dureeMoyenne}</p>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-xl bg-slate-50 p-3 text-center">
              <Euro className="h-4 w-4 text-emerald-600" />
              <p className="text-[10px] font-medium text-slate-400">Coût</p>
              <p className="text-xs font-bold text-slate-700">{place.costEstimate}</p>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-xl bg-slate-50 p-3 text-center">
              <Sun className="h-4 w-4 text-emerald-600" />
              <p className="text-[10px] font-medium text-slate-400">Moment</p>
              <p className="text-xs font-bold text-slate-700">{BEST_TIME_LABELS[place.bestTimeOfDay]}</p>
            </div>
          </div>

          {/* Effort level */}
          <div className="mb-5 flex items-center gap-3 rounded-xl bg-slate-50 p-4">
            <Gauge className="h-5 w-5 text-emerald-600" />
            <div className="flex-1">
              <p className="mb-2 text-xs font-medium text-slate-400">Niveau d'effort</p>
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-2.5 w-9 rounded-full transition-colors ${
                        i < place.niveauEffort ? 'bg-emerald-400' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-slate-600">
                  {EFFORT_LABELS[place.niveauEffort]}
                </span>
              </div>
            </div>
          </div>

          {/* Long description */}
          <div className="mb-5">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
              <Info className="h-4 w-4 text-emerald-600" />
              À propos de ce lieu
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              {place.descriptionLongue}
            </p>
          </div>

          {/* Practical tips */}
          <div className="rounded-xl bg-emerald-50 p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-emerald-900">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Conseils pratiques
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-xs leading-relaxed text-emerald-800">
                <span className="mt-0.5 text-emerald-500">&#x2022;</span>
                Meilleur moment pour visiter : <strong>{BEST_TIME_LABELS[place.bestTimeOfDay]}</strong>
              </li>
              <li className="flex items-start gap-2 text-xs leading-relaxed text-emerald-800">
                <span className="mt-0.5 text-emerald-500">&#x2022;</span>
                Durée moyenne de la visite : <strong>{place.dureeMoyenne}</strong>
              </li>
              <li className="flex items-start gap-2 text-xs leading-relaxed text-emerald-800">
                <span className="mt-0.5 text-emerald-500">&#x2022;</span>
                Coût estimé : <strong>{place.costEstimate}</strong>
              </li>
              {place.niveauEffort >= 3 && (
                <li className="flex items-start gap-2 text-xs leading-relaxed text-amber-700">
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-amber-500" />
                  Activité physique modérée à exigeante : prévoyez eau, chaussures adaptées et protection solaire.
                </li>
              )}
              {place.bestTimeOfDay === 'matin' && (
                <li className="flex items-start gap-2 text-xs leading-relaxed text-amber-700">
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-amber-500" />
                  Visite recommandée le matin pour éviter la chaleur, la foule et les nuages.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
