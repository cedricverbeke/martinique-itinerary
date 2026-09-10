import { useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Users, Home, Car, Bus, Clock } from 'lucide-react';
import { HEBERGEMENTS, GROUPES, TRANSPORTS } from '@/data/places';
import type { StaySettings } from '@/types/itinerary';

interface StaySettingsProps {
  settings: StaySettings;
  onChange: (settings: StaySettings) => void;
  onBack: () => void;
  onNext: () => void;
}

interface SliderConfig {
  key: keyof Pick<StaySettings, 'rythme' | 'effort' | 'orientation' | 'restauration'>;
  label: string;
  leftLabel: string;
  rightLabel: string;
  accentClass: string;
  badgeClass: string;
  trackClass: string;
}

const SLIDERS: SliderConfig[] = [
  {
    key: 'rythme',
    label: 'Rythme',
    leftLabel: 'Détente',
    rightLabel: 'Intensif',
    accentClass: 'accent-emerald-600',
    badgeClass: 'bg-emerald-50 text-emerald-700',
    trackClass: 'bg-emerald-200',
  },
  {
    key: 'effort',
    label: 'Effort physique',
    leftLabel: 'Balade',
    rightLabel: 'Sportif',
    accentClass: 'accent-sky-600',
    badgeClass: 'bg-sky-50 text-sky-700',
    trackClass: 'bg-sky-200',
  },
  {
    key: 'orientation',
    label: 'Orientation',
    leftLabel: 'Nature / Plages',
    rightLabel: 'Culture / Gastronomie',
    accentClass: 'accent-amber-600',
    badgeClass: 'bg-amber-50 text-amber-700',
    trackClass: 'bg-amber-200',
  },
  {
    key: 'restauration',
    label: 'Restauration',
    leftLabel: 'Snacks / Pique-niques',
    rightLabel: 'Tables gourmandes',
    accentClass: 'accent-rose-600',
    badgeClass: 'bg-rose-50 text-rose-700',
    trackClass: 'bg-rose-200',
  },
];

function computeDaysBetween(start: string, end: string): number {
  if (!start || !end) return 0;
  const d1 = new Date(start);
  const d2 = new Date(end);
  const diff = Math.round((d2.getTime() - d1.getTime()) / 86400000) + 1;
  return diff > 0 ? diff : 0;
}

export default function StaySettings({ settings, onChange, onBack, onNext }: StaySettingsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = <K extends keyof StaySettings>(key: K, value: StaySettings[K]) => {
    onChange({ ...settings, [key]: value });
    if (errors[key as string]) {
      setErrors({ ...errors, [key as string]: '' });
    }
  };

  const handleModeChange = (mode: 'jours' | 'dates') => {
    if (mode === 'dates' && settings.dateDebut && settings.dateFin) {
      const computed = computeDaysBetween(settings.dateDebut, settings.dateFin);
      if (computed > 0) {
        onChange({ ...settings, modeDate: mode, duree: computed });
      } else {
        onChange({ ...settings, modeDate: mode });
      }
    } else {
      onChange({ ...settings, modeDate: mode });
    }
  };

  const handleNext = () => {
    const errs: Record<string, string> = {};
    if (!settings.dateDebut) errs.dateDebut = 'Veuillez choisir une date de début';
    if (settings.modeDate === 'dates') {
      if (!settings.dateFin) errs.dateFin = 'Veuillez choisir une date de fin';
      if (settings.dateDebut && settings.dateFin) {
        const days = computeDaysBetween(settings.dateDebut, settings.dateFin);
        if (days < 1) errs.dateFin = 'La date de fin doit être après la date de début';
        if (days > 15) errs.dateFin = 'Maximum 15 jours';
      }
    } else {
      if (settings.duree < 1) errs.duree = 'Minimum 1 jour';
    }
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center">
          <span className="inline-block rounded-full bg-emerald-500/20 px-4 py-1.5 text-sm font-medium text-emerald-300 ring-1 ring-emerald-400/30">
            Étape 2 sur 3
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white">
            Paramétrez votre séjour
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
            Affinez les détails pour un itinéraire parfaitement adapté à vos envies.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* Logistique */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/60">
          <h2 className="mb-6 text-lg font-bold text-slate-900">Logistique</h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Hébergement */}
            <div className="sm:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Home className="h-4 w-4 text-emerald-600" />
                Hébergement principal (commune)
              </label>
              <select
                value={settings.hebergement}
                onChange={(e) => update('hebergement', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition-colors focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
              >
                {HEBERGEMENTS.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>

            {/* Mode de date */}
            <div className="sm:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Calendar className="h-4 w-4 text-emerald-600" />
                Organisation des dates
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleModeChange('jours')}
                  className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    settings.modeDate === 'jours'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  Nombre de jours
                </button>
                <button
                  onClick={() => handleModeChange('dates')}
                  className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    settings.modeDate === 'dates'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Clock className="h-4 w-4" />
                  Dates et heures précises
                </button>
              </div>
            </div>

            {/* Date de début */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Calendar className="h-4 w-4 text-emerald-600" />
                Date de début
              </label>
              <input
                type="date"
                value={settings.dateDebut}
                onChange={(e) => {
                  update('dateDebut', e.target.value);
                  if (settings.modeDate === 'dates' && e.target.value && settings.dateFin) {
                    const days = computeDaysBetween(e.target.value, settings.dateFin);
                    if (days > 0) onChange({ ...settings, dateDebut: e.target.value, duree: days });
                  }
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition-colors focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
              {errors.dateDebut && (
                <p className="mt-1 text-xs text-red-500">{errors.dateDebut}</p>
              )}
            </div>

            {/* Mode: jours → slider / Mode: dates → date de fin + heure */}
            {settings.modeDate === 'jours' ? (
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Calendar className="h-4 w-4 text-emerald-600" />
                  Durée du séjour
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={15}
                    value={settings.duree}
                    onChange={(e) => update('duree', parseInt(e.target.value, 10))}
                    className="flex-1 accent-emerald-600"
                  />
                  <span className="min-w-[60px] rounded-lg bg-emerald-50 px-3 py-1.5 text-center text-sm font-bold text-emerald-700">
                    {settings.duree} jour{settings.duree > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Calendar className="h-4 w-4 text-emerald-600" />
                    Date de fin
                  </label>
                  <input
                    type="date"
                    value={settings.dateFin}
                    onChange={(e) => {
                      update('dateFin', e.target.value);
                      if (settings.dateDebut && e.target.value) {
                        const days = computeDaysBetween(settings.dateDebut, e.target.value);
                        if (days > 0) onChange({ ...settings, dateFin: e.target.value, duree: days });
                      }
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition-colors focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                  {errors.dateFin && (
                    <p className="mt-1 text-xs text-red-500">{errors.dateFin}</p>
                  )}
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Clock className="h-4 w-4 text-emerald-600" />
                    Heure de début
                  </label>
                  <input
                    type="time"
                    value={settings.heureDebut}
                    onChange={(e) => update('heureDebut', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition-colors focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div className="sm:col-span-2">
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Durée calculée : <strong>{settings.duree} jour{settings.duree > 1 ? 's' : ''}</strong>
                      {settings.heureDebut && ` — départ à ${settings.heureDebut}`}
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* Groupe */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Users className="h-4 w-4 text-emerald-600" />
                Type de groupe
              </label>
              <div className="grid grid-cols-4 gap-2">
                {GROUPES.map((g) => (
                  <button
                    key={g}
                    onClick={() => update('groupe', g)}
                    className={`rounded-xl px-2 py-3 text-xs font-semibold transition-all ${
                      settings.groupe === g
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Transport */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Car className="h-4 w-4 text-emerald-600" />
                Mode de transport
              </label>
              <div className="grid grid-cols-2 gap-3">
                {TRANSPORTS.map((t) => {
                  const Icon = t === 'Voiture' ? Car : Bus;
                  return (
                    <button
                      key={t}
                      onClick={() => update('transport', t)}
                      className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                        settings.transport === t
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {t === 'Voiture' ? 'Voiture' : 'Transports'}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/60">
          <h2 className="mb-6 text-lg font-bold text-slate-900">Préférences & Rythme</h2>

          <div className="space-y-8">
            {SLIDERS.map((slider) => (
              <div key={slider.key}>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700">
                    {slider.label}
                  </label>
                  <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${slider.badgeClass}`}>
                    {settings[slider.key]}/10
                  </span>
                </div>
                <div className="relative">
                  <div className={`absolute inset-0 h-2 top-1/2 -translate-y-1/2 rounded-full ${slider.trackClass} opacity-30`} />
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={settings[slider.key]}
                    onChange={(e) => update(slider.key, parseInt(e.target.value, 10))}
                    className={`relative w-full ${slider.accentClass}`}
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-slate-400">
                  <span>{slider.leftLabel}</span>
                  <span>{slider.rightLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-md ring-1 ring-slate-200 transition-all hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </button>
          <button
            onClick={handleNext}
            className="group flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-700"
          >
            Générer mon itinéraire
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
