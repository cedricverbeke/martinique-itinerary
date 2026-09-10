import { Check, Plus, Clock, Euro, MapPin, Info } from 'lucide-react';
import type { Place } from '@/data/places';

interface PlaceCardProps {
  place: Place;
  selected: boolean;
  onToggle: (id: string) => void;
  onDetails: (place: Place) => void;
}

export default function PlaceCard({ place, selected, onToggle, onDetails }: PlaceCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 transition-all duration-300 hover:shadow-2xl ${
        selected ? 'ring-2 ring-emerald-500 shadow-emerald-100' : 'ring-slate-200/60'
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={place.image}
          alt={place.nom}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
          {place.categorie}
        </span>
        {selected && (
          <span className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg ring-2 ring-white">
            <Check className="h-4 w-4" />
          </span>
        )}
        <h3 className="absolute bottom-3 left-3 right-3 text-lg font-bold text-white drop-shadow-lg">
          {place.nom}
        </h3>
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {place.zone}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {place.dureeMoyenne}
          </span>
          <span className="flex items-center gap-1">
            <Euro className="h-3.5 w-3.5" />
            {place.costEstimate}
          </span>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-slate-600 line-clamp-2">
          {place.description}
        </p>

        <div className="mb-4 flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400">Effort</span>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-5 rounded-full ${
                  i < place.niveauEffort ? 'bg-emerald-400' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onDetails(place)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50"
          >
            <Info className="h-4 w-4" />
            Détails
          </button>
          <button
            onClick={() => onToggle(place.id)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
              selected
                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            {selected ? (
              <>
                <Check className="h-4 w-4" />
                Retirer
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Ajouter
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
