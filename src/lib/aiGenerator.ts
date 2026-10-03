import { PLACES } from '@/data/places';
import type { StaySettings, Itinerary } from '@/types/itinerary';

interface GeminiPlaceInfo {
  id: string;
  nom: string;
  categorie: string;
  zone: string;
  description: string;
  niveauEffort: number;
  dureeMoyenne: string;
  costEstimate: string;
  bestTimeOfDay: string;
}

export async function generateItineraryWithAI(
  selectedPlaceIds: string[],
  settings: StaySettings,
): Promise<Itinerary> {
  const selectedPlaces = PLACES.filter((p) => selectedPlaceIds.includes(p.id));
  const placesToSchedule = selectedPlaces.length > 0 ? selectedPlaces : PLACES.slice(0, 6);

  const placesInfo: GeminiPlaceInfo[] = placesToSchedule.map((p) => ({
    id: p.id,
    nom: p.nom,
    categorie: p.categorie,
    zone: p.zone,
    description: p.description,
    niveauEffort: p.niveauEffort,
    dureeMoyenne: p.dureeMoyenne,
    costEstimate: p.costEstimate,
    bestTimeOfDay: p.bestTimeOfDay,
  }));

  const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-itinerary`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (import.meta.env.VITE_SUPABASE_ANON_KEY) {
    headers['Authorization'] = `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`;
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({ places: placesInfo, settings }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`Edge function failed (${response.status}): ${errText}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  if (!data.jours || !Array.isArray(data.jours) || data.jours.length === 0) {
    throw new Error('Invalid itinerary response from AI');
  }

  const days = data.jours as { jourNumero: number; date: string }[];
  const photoDayIndex = Math.min(Math.floor(days.length / 2), days.length - 1);
  const photoDay = days[photoDayIndex];
  const photoDate = new Date(photoDay.date);
  const photoDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const photoDayName = photoDays[photoDate.getDay()];

  const itinerary = data as Itinerary;
  itinerary.seancePhoto = {
    jour: photoDayIndex + 1,
    date: photoDay.date,
    titre: `Séance photo souvenir au Diamant — ${photoDayName} ${photoDate.getDate()}`,
    description: "Immortalisez votre séjour en Martinique avec une séance photo professionnelle au coucher du soleil sur la plage du Diamant, face au célèbre Rocher. Un souvenir unique et authentique de vos vacances, capturé par un photographe local passionné. Séance en fin de journée pour profiter de la lumière dorée du golden hour.",
    lieu: "Plage du Diamant, Martinique",
    heure: "17h30 — coucher de soleil",
    lien: "https://declicstudio.fr",
  };

  return itinerary;
}
