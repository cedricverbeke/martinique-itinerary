import { generateItinerary as generateMockItinerary } from '@/lib/generator';
import type {
  DayPlan,
  ItineraryResponse,
  LegacyDayPlan,
  UserPreferences,
} from '@/types/itinerary';

function normalizeResponse(value: unknown): Omit<ItineraryResponse, 'legacyItinerary' | 'source' | 'warning'> {
  const data = value as Partial<ItineraryResponse>;
  const days = Array.isArray(data.days) ? data.days : [];

  return {
    title: String(data.title || 'Séjour sur mesure en Martinique'),
    totalBudget: Number(data.totalBudget || 0),
    summary: String(data.summary || ''),
    days: days.map((day, index) => ({
      day: Number(day.day || index + 1),
      location: String(day.location || 'Martinique'),
      activities: Array.isArray(day.activities) ? day.activities.map(String) : [],
      budgetEstimate: Number(day.budgetEstimate || 0),
      tips: Array.isArray(day.tips) ? day.tips.map(String) : [],
    })),
  };
}

function toLegacyItinerary(
  response: Omit<ItineraryResponse, 'legacyItinerary' | 'source' | 'warning'>,
  preferences: UserPreferences
) {
  const base = generateMockItinerary(preferences.selectedPlaces, preferences);
  const legacyDays: LegacyDayPlan[] = response.days.map((day, index) => {
    const fallback = base.jours[index] || base.jours[base.jours.length - 1];
    if (!fallback) return fallback;

    const activities = day.activities;
    return {
      ...fallback,
      titre: `${fallback.titre.split(' — ')[0]} — ${day.location}`,
      zoneGeographique: day.location,
      coutEstimeJournee: `${Math.round(day.budgetEstimate)}€`,
      programme: {
        ...fallback.programme,
        matin: {
          ...fallback.programme.matin,
          activite: activities[0] || fallback.programme.matin.activite,
          lieu: day.location,
          conseil: day.tips[0] || fallback.programme.matin.conseil,
        },
        apresMidi: {
          ...fallback.programme.apresMidi,
          activite: activities[1] || fallback.programme.apresMidi.activite,
          lieu: day.location,
          conseil: day.tips[1] || fallback.programme.apresMidi.conseil,
        },
      },
    };
  }).filter(Boolean) as LegacyDayPlan[];

  return {
    ...base,
    titreSejour: response.title,
    coutTotalEstime: `${Math.round(response.totalBudget)}€ par personne`,
    conseilGeneral: response.summary,
    jours: legacyDays.length ? legacyDays : base.jours,
  };
}

function buildMockResponse(preferences: UserPreferences): ItineraryResponse {
  const legacy = generateMockItinerary(preferences.selectedPlaces, preferences);
  const days: DayPlan[] = legacy.jours.map((day, index) => ({
    day: index + 1,
    location: day.zoneGeographique,
    activities: [day.programme.matin.activite, day.programme.apresMidi.activite, day.programme.soir.activite],
    budgetEstimate: Number(day.coutEstimeJournee.match(/\d+/)?.[0] || 0),
    tips: [day.programme.matin.conseil, day.programme.apresMidi.conseil],
  }));

  return {
    title: legacy.titreSejour,
    totalBudget: Number(legacy.coutTotalEstime.match(/\d+/)?.[0] || 0),
    summary: legacy.conseilGeneral,
    days,
    source: 'mock',
    warning: 'Gemini est indisponible : itinéraire local de secours utilisé.',
    legacyItinerary: legacy,
  };
}

export async function generateItinerary(preferences: UserPreferences): Promise<ItineraryResponse> {
  try {
    const response = await fetch('/.netlify/functions/itinerary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preferences),
    });

    if (!response.ok) {
      throw new Error(`Netlify Function indisponible (${response.status}).`);
    }

    const normalized = normalizeResponse(await response.json());

    return {
      ...normalized,
      source: 'gemini',
      legacyItinerary: toLegacyItinerary(normalized, preferences),
    };
  } catch (error) {
    console.warn('Gemini/Netlify indisponible, fallback local utilisé.', error);
    return buildMockResponse(preferences);
  }
}
