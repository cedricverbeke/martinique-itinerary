import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const DEFAULT_GEMINI_MODELS = ["gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-2.5-flash"];

function getGeminiModels(): string[] {
  const envModels = Deno.env.get("GEMINI_MODELS");
  if (envModels) {
    const models = envModels.split(",").map((m) => m.trim()).filter((m) => m.length > 0);
    if (models.length > 0) return models;
  }
  return DEFAULT_GEMINI_MODELS;
}
const GEMINI_ENDPOINT = (model: string) => `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

interface PlaceInfo {
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

interface StaySettings {
  hebergement: string;
  dateDebut: string;
  dateFin: string;
  heureDebut: string;
  duree: number;
  modeDate: "jours" | "dates";
  groupe: string;
  transport: string;
  rythme: number;
  effort: number;
  orientation: number;
  restauration: number;
}

interface RequestBody {
  places: PlaceInfo[];
  settings: StaySettings;
}

const ZONE_DISTANCES: Record<string, Record<string, number>> = {
  "Nord Caraïbe": { "Nord Caraïbe": 15, "Sud Caraïbe": 90, "Nord Atlantique": 45, "Centre": 35 },
  "Sud Caraïbe": { "Nord Caraïbe": 90, "Sud Caraïbe": 20, "Nord Atlantique": 75, "Centre": 45 },
  "Nord Atlantique": { "Nord Caraïbe": 45, "Sud Caraïbe": 75, "Nord Atlantique": 20, "Centre": 30 },
  "Centre": { "Nord Caraïbe": 35, "Sud Caraïbe": 45, "Nord Atlantique": 30, "Centre": 15 },
};

const LUNCH_OPTIONS: Record<string, { rec: string; type: string; cout: string }[]> = {
  "Nord Caraïbe": [
    { rec: "Table créole chez Zanzibar à Saint-Pierre", type: "Restaurant créole", cout: "25€" },
    { rec: "Snack de plage à Anse Turin", type: "Snack local", cout: "15€" },
    { rec: "Déjeuner au Depaz, terrasse vue mer", type: "Restaurant distillerie", cout: "28€" },
    { rec: "Petit restaurant Le Pilon au Carbet", type: "Restaurant local", cout: "20€" },
    { rec: "Lokal au Morne-Rouge, cuisine du marché", type: "Table gourmande", cout: "26€" },
  ],
  "Sud Caraïbe": [
    { rec: "Lunch Chez Loulou aux Anses d'Arlet", type: "Beach club", cout: "22€" },
    { rec: "Snack Ti'Sable au Diamant", type: "Snack de plage", cout: "15€" },
    { rec: "Restaurant Le Zanzi au Marin", type: "Restaurant créole", cout: "28€" },
    { rec: "Le Mango à Sainte-Anne, cuisine fusion", type: "Restaurant créole", cout: "30€" },
    { rec: "Snack de la pointe à Sainte-Luce", type: "Snack local", cout: "14€" },
  ],
  "Nord Atlantique": [
    { rec: "Auberge de la Caravelle à Tartane", type: "Restaurant créole", cout: "25€" },
    { rec: "Snack du port de Le Robert", type: "Snack local", cout: "14€" },
    { rec: "Table gourmande au Lorrain", type: "Restaurant local", cout: "26€" },
    { rec: "Restaurant Le Macouba, vue sur l'Atlantique", type: "Restaurant créole", cout: "24€" },
    { rec: "Snack de plage à Tartane", type: "Snack de plage", cout: "15€" },
  ],
  "Centre": [
    { rec: "Restaurant Le Mémorial à Trois-Îlets", type: "Restaurant créole", cout: "30€" },
    { rec: "Snack du marché de Fort-de-France", type: "Snack local", cout: "12€" },
    { rec: "Brasserie du Lamentin", type: "Brasserie", cout: "20€" },
    { rec: "La Maison à Fort-de-France, cuisine créole moderne", type: "Table gourmande", cout: "32€" },
    { rec: "Snack créole à Ducos", type: "Snack local", cout: "13€" },
  ],
};

const DINNER_OPTIONS: Record<string, { rec: string; cout: string }[]> = {
  "Nord Caraïbe": [
    { rec: "Yétte à Saint-Pierre, cuisine créole raffinée", cout: "35€" },
    { rec: "Le Petibonum à Saint-Pierre, ambiance pieds dans le sable", cout: "30€" },
    { rec: "Restaurant Le Carbet, terrasse face au soleil couchant", cout: "28€" },
    { rec: "Table du Morne-Rouge, spécialités montagnardes", cout: "32€" },
  ],
  "Sud Caraïbe": [
    { rec: "Le Bambou aux Anses d'Arlet, spécialités de la mer", cout: "32€" },
    { rec: "Le Pouilly Bouillé au Diamant, cuisine fusion", cout: "34€" },
    { rec: "Restaurant Le Marin, grande table de la marina", cout: "36€" },
    { rec: "Sainte-Anne, dîner les pieds dans le sable", cout: "30€" },
  ],
  "Nord Atlantique": [
    { rec: "Tartane Village, dîner de fruits de mer", cout: "30€" },
    { rec: "Restaurant Le Carbet, terrasse face à l'Atlantique", cout: "28€" },
    { rec: "Auberge de la Trinité, cuisine du terroir", cout: "32€" },
    { rec: "Bord de mer au Robert, grillades de poissons", cout: "26€" },
  ],
  "Centre": [
    { rec: "Le Mémorial aux Trois-Îlets, grande table créole", cout: "35€" },
    { rec: "Kacao à Fort-de-France, ambiance lounge", cout: "32€" },
    { rec: "Brasserie du Lamentin, dîner convivial", cout: "25€" },
    { rec: "La Canne à Sucre aux Trois-Îlets, gastronomie créole", cout: "38€" },
  ],
};

function pickLunch(zone: string, restaurationLevel: number, dayIndex: number, usedRecs: Set<string>): { rec: string; type: string; cout: string } {
  const opts = LUNCH_OPTIONS[zone] || LUNCH_OPTIONS["Centre"];
  const preference = restaurationLevel > 6 ? 0 : restaurationLevel > 3 ? 1 : 2;
  const offset = dayIndex % opts.length;
  for (let i = 0; i < opts.length; i++) {
    const idx = (preference + offset + i) % opts.length;
    if (!usedRecs.has(opts[idx].rec)) {
      usedRecs.add(opts[idx].rec);
      return opts[idx];
    }
  }
  const fallback = opts[offset];
  usedRecs.add(fallback.rec);
  return fallback;
}

function pickDinner(zone: string, dayIndex: number, usedRecs: Set<string>): { rec: string; cout: string } {
  const opts = DINNER_OPTIONS[zone] || DINNER_OPTIONS["Centre"];
  const offset = dayIndex % opts.length;
  for (let i = 0; i < opts.length; i++) {
    const idx = (offset + i) % opts.length;
    if (!usedRecs.has(opts[idx].rec)) {
      usedRecs.add(opts[idx].rec);
      return opts[idx];
    }
  }
  const fallback = opts[offset];
  usedRecs.add(fallback.rec);
  return fallback;
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseCost(costStr: string): number {
  const match = costStr.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { places, settings } = await req.json() as RequestBody;

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Build context for Gemini
    const placesList = places.map((p) =>
      `- ${p.nom} (${p.categorie}, zone: ${p.zone}, effort: ${p.niveauEffort}/5, durée: ${p.dureeMoyenne}, coût: ${p.costEstimate}, meilleur moment: ${p.bestTimeOfDay}) — ${p.description}`,
    ).join("\n");

    const rythmeLabel = settings.rythme <= 3 ? "très détendu (1-2 activités par jour max)" :
      settings.rythme <= 6 ? "modéré (2 activités par jour)" :
      "intense (2-3 activités par jour)";
    const effortLabel = settings.effort <= 3 ? "activités faciles, peu physiques" :
      settings.effort <= 6 ? "activités modérées, un peu de marche" :
      "activités exigeantes, randonnées et sport";
    const orientationLabel = settings.orientation <= 3 ? "plutôt nature et paysages" :
      settings.orientation <= 6 ? "équilibre nature et culture" :
      "plutôt culture, histoire et patrimoine";
    const restaurationLabel = settings.restauration <= 3 ? "snacks et repas sur le pouce" :
      settings.restauration <= 6 ? "restaurants locaux et créoles" :
      "tables gourmandes et gastronomie";

    const transportInfo = settings.transport === "Voiture"
      ? "L'utilisateur a une voiture, les trajets sont flexibles mais éviter les longues distances inutiles."
      : "L'utilisateur utilise les transports en commun, privilégier les lieux accessibles et minimiser les trajets.";

    const dateInfo = settings.modeDate === "dates"
      ? `Du ${settings.dateDebut} au ${settings.dateFin} (${settings.duree} jours), départ chaque jour à ${settings.heureDebut}.`
      : `${settings.duree} jours de séjour.`;

    const prompt = `Tu es un expert local en Martinique qui crée des itinéraires de voyage sur-mesure.

L'utilisateur est un ${settings.groupe.toLowerCase()} de ${settings.duree} jours, hébergé à ${settings.hebergement}.
${dateInfo}
${transportInfo}

Profil du voyageur :
- Rythme: ${rythmeLabel}
- Niveau d'effort souhaité: ${effortLabel}
- Orientation: ${orientationLabel}
- Restauration: ${restaurationLabel}

Lieux sélectionnés par l'utilisateur (${places.length} lieux) :
${placesList}

Crée un itinéraire détaillé jour par jour en respectant ces règles STRICTES :
1. Chaque lieu sélectionné doit apparaître UNE SEULE FOIS dans tout l'itinéraire. Ne JAMAIS répéter un lieu.
2. Regroupe les lieux par zone géographique pour minimiser les trajets (les zones sont: Nord Caraïbe, Sud Caraïbe, Nord Atlantique, Centre).
3. Les randonnées, cascades et activités physiques vont le MATIN (avant la chaleur de l'après-midi).
4. Les plages, culture et visites légères peuvent aller l'après-midi.
5. Si le nombre de lieux dépasse la capacité d'un jour, ajoute des activités complémentaires NON répétitives (balade locale, marché, coucher de soleil, etc.) sans jamais reprendre un lieu déjà programmé.
6. Si le nombre de lieux est insuffisant, complète avec des suggestions variées et adaptées au profil, en évitant la répétition.
7. Propose des déjeuners et dîners DIFFÉRENTS chaque jour — ne JAMAIS proposer le même restaurant deux fois dans le séjour.
8. Les conseils pratiques doivent être spécifiques au lieu et au moment de la journée.

Réponds UNIQUEMENT avec un objet JSON valide (pas de markdown, pas de texte avant ou après) au format suivant :
{
  "titreSejour": "string",
  "coutTotalEstime": "string",
  "conseilGeneral": "string (conseils globaux pour le séjour)",
  "jours": [
    {
      "jourNumero": number,
      "date": "YYYY-MM-DD",
      "titre": "string (titre du jour avec zone et activité principale)",
      "zoneGeographique": "string (Nord Caraïbe | Sud Caraïbe | Nord Atlantique | Centre)",
      "coutEstimeJournee": "string",
      "programme": {
        "matin": {
          "heure": "HH:MM",
          "activite": "string (nom de l'activité ou du lieu)",
          "lieu": "string (zone)",
          "duree": "string",
          "trajetMinutes": number,
          "cout": "string",
          "conseil": "string (conseil pratique spécifique)"
        },
        "dejeuner": {
          "heure": "12:30",
          "recommandation": "string (nom du restaurant/snack, TOUS DIFFÉRENTS)",
          "type": "string",
          "cout": "string"
        },
        "apresMidi": {
          "heure": "HH:MM",
          "activite": "string (DOIT être différent du matin)",
          "lieu": "string",
          "duree": "string",
          "trajetMinutes": number,
          "cout": "string",
          "conseil": "string"
        },
        "soir": {
          "heure": "19:30",
          "activite": "string (dîner: nom du restaurant, TOUS DIFFÉRENTS)",
          "lieu": "string",
          "cout": "string"
        }
      }
    }
  ]
}

La date de début est ${settings.dateDebut}. Chaque jour suivant est +1.`;

    const maxTokens = settings.duree > 4 ? 16384 : 8192;
    let geminiResponse: Response | null = null;
    let usedModel = "";
    let lastError = "";

    for (const model of getGeminiModels()) {
      usedModel = model;
      lastError = "";
      try {
        geminiResponse = await fetch(`${GEMINI_ENDPOINT(model)}?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.8,
              maxOutputTokens: maxTokens,
              responseMimeType: "application/json",
            },
          }),
        });

        if (geminiResponse.ok) break;

        const errText = await geminiResponse.text().catch(() => "");
        console.error(`Gemini API error (${model}):`, errText);
        lastError = `Gemini API error (${model}): ${geminiResponse.status}`;

        // Retry once on 503 (service overloaded) before trying next model
        if (geminiResponse.status === 503) {
          await new Promise((r) => setTimeout(r, 2000));
          try {
            geminiResponse = await fetch(`${GEMINI_ENDPOINT(model)}?key=${apiKey}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                  temperature: 0.8,
                  maxOutputTokens: maxTokens,
                  responseMimeType: "application/json",
                },
              }),
            });
            if (geminiResponse.ok) break;
            const errText2 = await geminiResponse.text().catch(() => "");
            console.error(`Gemini API retry error (${model}):`, errText2);
            lastError = `Gemini API error (${model}): ${geminiResponse.status}`;
          } catch (e) {
            lastError = e.message || "Network error";
          }
        }
      } catch (e) {
        lastError = e.message || "Network error";
      }
    }

    if (!geminiResponse || !geminiResponse.ok) {
      return new Response(
        JSON.stringify({ error: lastError || "All Gemini models failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const geminiData = await geminiResponse.json();
    const generatedText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      return new Response(
        JSON.stringify({ error: "Empty response from Gemini" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(generatedText);
    } catch {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse Gemini response as JSON");
      }
    }

    return new Response(
      JSON.stringify(parsed),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
