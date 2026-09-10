import { useState } from 'react';
import {
  Calendar, Download, Clock, MapPin, Wallet, Sun, Utensils, Sunset,
  Car, Lightbulb, ArrowLeft, RotateCcw, Plus, Camera, ExternalLink
} from 'lucide-react';
import type { Itinerary, LegacyDayPlan } from '@/types/itinerary';
import {
  downloadICS,
  buildDayGoogleCalendarLink,
  buildGoogleCalendarLink,
} from '@/lib/calendar';

interface ItineraryDashboardProps {
  itinerary: Itinerary;
  onBack: () => void;
  onRestart: () => void;
}

function ActivityCard({ day, slot, label, icon: Icon, color }: { day: LegacyDayPlan; slot: any; label: string; icon: typeof Sun; color: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${color}`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">{label}</p>
            <p className="text-sm font-bold text-slate-700">{slot.heure}</p>
          </div>
        </div>
        {slot.cout && (
          <span className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200">
            {slot.cout}
          </span>
        )}
      </div>

      <p className="mb-2 text-sm font-semibold text-slate-800">{slot.activite}</p>

      {slot.lieu && (
        <div className="mb-2 flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin className="h-3 w-3" />
          {slot.lieu}
        </div>
      )}

      <div className="mb-3 flex flex-wrap gap-3 text-xs text-slate-500">
        {slot.duree && (
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {slot.duree}
          </span>
        )}
        {slot.trajetMinutes > 0 && (
          <span className="flex items-center gap-1">
            <Car className="h-3 w-3" />
            {slot.trajetMinutes} min depuis l'étape précédente
          </span>
        )}
      </div>

      {slot.conseil && (
        <div className="flex gap-2 rounded-lg bg-amber-50 p-2.5">
          <Lightbulb className="h-3.5 w-3.5 flex-shrink-0 text-amber-500 mt-0.5" />
          <p className="text-xs leading-relaxed text-amber-700">{slot.conseil}</p>
        </div>
      )}
    </div>
  );
}

function LunchCard({ slot }: { slot: any }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-orange-50/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-400">
            <Utensils className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">Déjeuner</p>
            <p className="text-sm font-bold text-slate-700">{slot.heure}</p>
          </div>
        </div>
        <span className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200">
          {slot.cout}
        </span>
      </div>
      <p className="mb-1 text-sm font-semibold text-slate-800">{slot.recommandation}</p>
      <p className="text-xs text-slate-500">{slot.type}</p>
    </div>
  );
}

function EveningCard({ slot }: { slot: any }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-indigo-50/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
            <Sunset className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">Soir</p>
            <p className="text-sm font-bold text-slate-700">{slot.heure}</p>
          </div>
        </div>
        <span className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200">
          {slot.cout}
        </span>
      </div>
      <p className="text-sm font-semibold text-slate-800">{slot.activite}</p>
    </div>
  );
}

function DayCard({ day, index }: { day: LegacyDayPlan; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);

  const dateObj = new Date(day.date);
  const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const months = ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'aoû', 'sep', 'oct', 'nov', 'déc'];
  const dateLabel = `${days[dateObj.getDay()]} ${dateObj.getDate()} ${months[dateObj.getMonth()]}`;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200/60">
      {/* Day header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-slate-50"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
            <span className="text-[10px] font-medium uppercase tracking-wide opacity-80">{dateLabel.split(' ')[0]}</span>
            <span className="text-xl font-bold leading-none">{dateObj.getDate()}</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{day.titre}</h3>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {day.zoneGeographique}
              </span>
              <span className="flex items-center gap-1">
                <Wallet className="h-3 w-3" />
                {day.coutEstimeJournee}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            onClick={(e) => { e.stopPropagation(); window.open(buildDayGoogleCalendarLink(day), '_blank'); }}
            className="hidden items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-100 sm:flex"
          >
            <Plus className="h-3.5 w-3.5" />
            Google Calendar
          </span>
          <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition-transform ${expanded ? 'rotate-180' : ''}`}>
            <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-slate-100 p-5">
          <div className="space-y-3">
            <ActivityCard day={day} slot={day.programme.matin} label="Matin" icon={Sun} color="bg-amber-400" />
            <LunchCard slot={day.programme.dejeuner} />
            <ActivityCard day={day} slot={day.programme.apresMidi} label="Après-midi" icon={Sun} color="bg-orange-400" />
            <EveningCard slot={day.programme.soir} />
          </div>

          {/* Mobile Google Calendar button */}
          <button
            onClick={() => window.open(buildDayGoogleCalendarLink(day), '_blank')}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-100 sm:hidden"
          >
            <Plus className="h-4 w-4" />
            Ajouter ce jour à Google Calendar
          </button>
        </div>
      )}
    </div>
  );
}

export default function ItineraryDashboard({ itinerary, onBack, onRestart }: ItineraryDashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <div className="flex items-center justify-between">
            <span className="inline-block rounded-full bg-emerald-500/20 px-4 py-1.5 text-sm font-medium text-emerald-300 ring-1 ring-emerald-400/30">
              Votre itinéraire sur-mesure
            </span>
            <button
              onClick={onRestart}
              className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-white/20"
            >
              <RotateCcw className="h-4 w-4" />
              Recommencer
            </button>
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {itinerary.titreSejour}
          </h1>

          {/* Summary cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/30">
                  <Wallet className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Budget estimé</p>
                  <p className="text-lg font-bold text-white">{itinerary.coutTotalEstime}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/30">
                  <Calendar className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Durée</p>
                  <p className="text-lg font-bold text-white">{itinerary.jours.length} jour{itinerary.jours.length > 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/30">
                  <MapPin className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Étapes</p>
                  <p className="text-lg font-bold text-white">{itinerary.jours.length * 2}+ activités</p>
                </div>
              </div>
            </div>
          </div>

          {/* General advice */}
          <div className="mt-6 flex gap-3 rounded-2xl bg-amber-500/10 p-4 ring-1 ring-amber-400/20">
            <Lightbulb className="h-5 w-5 flex-shrink-0 text-amber-400 mt-0.5" />
            <p className="text-sm leading-relaxed text-amber-100">{itinerary.conseilGeneral}</p>
          </div>
        </div>
      </div>

      {/* Export buttons */}
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => downloadICS(itinerary)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-slate-800"
          >
            <Download className="h-4 w-4" />
            Télécharger le fichier .ics
          </button>
          <a
            href={buildGoogleCalendarLink(
              itinerary.titreSejour,
              itinerary.jours[0].programme.matin.heure,
              '12h',
              itinerary.jours[0].zoneGeographique,
              itinerary.conseilGeneral,
              itinerary.jours[0].date
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Ajouter tout le séjour à Google Calendar
          </a>
        </div>
      </div>

      {/* Day cards */}
      <div className="mx-auto max-w-5xl px-6 pb-16">
        {/* Photo session promo */}
        {itinerary.seancePhoto && (
          <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 shadow-2xl ring-1 ring-amber-500/20">
            <div className="flex flex-col sm:flex-row">
              <div className="relative h-48 sm:h-auto sm:w-2/5 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/4015091/pexels-photo-4015091.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Séance photo au coucher du soleil"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/60" />
              </div>
              <div className="flex-1 p-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/30 ring-1 ring-amber-400/30">
                    <Camera className="h-5 w-5 text-amber-300" />
                  </div>
                  <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 ring-1 ring-amber-400/30">
                    Proposition souvenir
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">
                  {itinerary.seancePhoto.titre}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {itinerary.seancePhoto.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-amber-400" />
                    {itinerary.seancePhoto.lieu}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-amber-400" />
                    {itinerary.seancePhoto.heure}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-amber-400" />
                    Jour {itinerary.seancePhoto.jour}
                  </span>
                </div>
                <a
                  href={itinerary.seancePhoto.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-slate-900 shadow-lg transition-all hover:bg-amber-400"
                >
                  Réserver ma séance photo
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {itinerary.jours.map((day, index) => (
            <DayCard key={day.jourNumero} day={day} index={index} />
          ))}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="border-t border-slate-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-md ring-1 ring-slate-200 transition-all hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Modifier mes préférences
          </button>
          <button
            onClick={onRestart}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-700"
          >
            <RotateCcw className="h-4 w-4" />
            Nouveau séjour
          </button>
        </div>
      </div>
    </div>
  );
}
