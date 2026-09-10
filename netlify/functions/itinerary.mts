import { GoogleGenAI } from '@google/genai';

type UserPreferences = {
  hebergement: string;
  dateDebut: string;
  dateFin: string;
  heureDebut: string;
  duree: number;
  modeDate: 'jours' | 'dates';
  groupe: string;
  transport: string;
  rythme: number;
  effort: number;
  orientation: number;
  restauration: number;
  selectedPlaces: string[];
};

const SYSTEM_INSTRUCTION = `
Tu es un expert du tourisme en Martinique. Génère des itinéraires réalistes, cohérents et
agréables, en tenant compte de la géographie de l'île (Nord Caraïbe, Nord Atlantique,
Centre, Sud Caraïbe), des temps de trajet et des regroupements géographiques.

Tiens compte de la saisonnalité tropicale : chaleur et soleil le matin, averses/orages
plus fréquents l'après-midi selon la période, et adapte les randonnées, cascades,
baignades et sorties nautiques en conséquence. Propose des activités variées : nature,
plages, patrimoine, culture, gastronomie, distilleries et découvertes locales.
Évite les trajets inutiles et les journées irréalistes. Ne fabrique pas de lieux ou
d'activités manifestement inexistants.

Réponds exclusivement avec un JSON conforme au schéma demandé.
`;

const ITINERARY_SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    totalBudget: { type: 'number' },
    summary: { type: 'string' },
    days: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          day: { type: 'integer' },
          location: { type: 'string' },
          activities: { type: 'array', items: { type: 'string' } },
          budgetEstimate: { type: 'number' },
          tips: { type: 'array', items: { type: 'string' } },
        },
        required: ['day', 'location', 'activities', 'budgetEstimate', 'tips'],
      },
    },
  },
  required: ['title', 'totalBudget', 'summary', 'days'],
};

function isPreferences(value: unknown): value is UserPreferences {
  if (!value || typeof value !== 'object') return false;
  const p = value as Partial<UserPreferences>;
  return (
    typeof p.hebergement === 'string' &&
    typeof p.dateDebut === 'string' &&
    typeof p.dateFin === 'string' &&
    typeof p.duree === 'number' &&
    Array.isArray(p.selectedPlaces)
  );
}

export default async (request: Request) => {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Méthode non autorisée.' }, { status: 405 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: 'Service Gemini non configuré.' },
      { status: 503 }
    );
  }

  try {
    const preferences: unknown = await request.json();

    if (!isPreferences(preferences)) {
      return Response.json(
        { error: 'Préférences de voyage invalides.' },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Crée un itinéraire de voyage en Martinique à partir de ces préférences :\n${JSON.stringify(preferences, null, 2)}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseJsonSchema: ITINERARY_SCHEMA,
      },
    });

    const text = response.text?.trim();
    if (!text) throw new Error('Réponse Gemini vide.');

    return Response.json(JSON.parse(text), { status: 200 });
  } catch (error) {
    console.error('Erreur Netlify Function / Gemini:', error);
    return Response.json(
      { error: 'Impossible de générer l’itinéraire avec Gemini.' },
      { status: 502 }
    );
  }
};
