import { PLACES, ZONE_DISTANCES, Place, Zone } from '@/data/places';
import type { Itinerary, LegacyDayPlan, TimeSlot, LunchSlot, EveningSlot, StaySettings } from '@/types/itinerary';

const LUNCH_RECOMMENDATIONS: Record<Zone, { rec: string; type: string; cout: string }[]> = {
  'Nord Caraïbe': [
    { rec: 'Table créole chez Zanzibar à Saint-Pierre', type: 'Restaurant créole', cout: '25€' },
    { rec: 'Snack de plage à Anse Turin', type: 'Snack local', cout: '15€' },
    { rec: 'Déjeuner au Depaz, terrasse vue mer', type: 'Restaurant distillerie', cout: '28€' },
  ],
  'Sud Caraïbe': [
    { rec: 'Lunch Chez Loulou aux Anses d\'Arlet', type: 'Beach club', cout: '22€' },
    { rec: 'Snack Ti\'Sable au Diamant', type: 'Snack de plage', cout: '15€' },
    { rec: 'Restaurant Le Zanzi au Marin', type: 'Restaurant créole', cout: '28€' },
  ],
  'Nord Atlantique': [
    { rec: 'Auberge de la Caravelle à Tartane', type: 'Restaurant créole', cout: '25€' },
    { rec: 'Snack du port de Le Robert', type: 'Snack local', cout: '14€' },
    { rec: 'Table gourmande au Lorrain', type: 'Restaurant local', cout: '26€' },
  ],
  'Centre': [
    { rec: 'Restaurant Le Mémorial à Trois-Îlets', type: 'Restaurant créole', cout: '30€' },
    { rec: 'Snack du marché de Fort-de-France', type: 'Snack local', cout: '12€' },
    { rec: 'Brasserie du Lamentin', type: 'Brasserie', cout: '20€' },
  ],
};

const DINNER_RECOMMENDATIONS: Record<Zone, { rec: string; cout: string }[]> = {
  'Nord Caraïbe': [
    { rec: 'Yétte à Saint-Pierre, cuisine créole raffinée', cout: '35€' },
    { rec: 'Le Petibonum à Saint-Pierre, ambiance pieds dans le sable', cout: '30€' },
  ],
  'Sud Caraïbe': [
    { rec: 'Le Bambou aux Anses d\'Arlet, spécialités de la mer', cout: '32€' },
    { rec: 'Le Pouilly Bouillé au Diamant, cuisine fusion', cout: '34€' },
  ],
  'Nord Atlantique': [
    { rec: 'Tartane Village, dîner de fruits de mer', cout: '30€' },
    { rec: 'Restaurant Le Carbet, terrasse face à l\'Atlantique', cout: '28€' },
  ],
  'Centre': [
    { rec: 'Le Mémorial aux Trois-Îlets, grande table créole', cout: '35€' },
    { rec: 'Kacao à Fort-de-France, ambiance lounge', cout: '32€' },
  ],
};

const CONSEILS_MORNING: Record<string, string> = {
  'montagne-pelee': "Départ avant 5h30 pour éviter la couverture nuageuse au sommet. Emportez 2L d'eau par personne et une veste coupe-vent.",
  'caravelle': "Apportez chapeau et crème solaire, peu d'ombre sur la savane. Commencez par le sentier nord pour finir par la plage de l'Anse Chauvet.",
  'trace-jesuites': "Chaussures de marche recommandées, sentier parfois glissant après la pluie. Départ parking de l'Ajoupa-Bouillon.",
  'saut-gendarme': "Arrivez avant 9h pour profiter du bassin sans foule. Parking limité sur la route de la Trace.",
  'cascades-didier': "Prévoyez des chaussures aquatiques, les roches sont glissantes. Accès par le parking de Fond Saint-Denis.",
  'gorges-falaise': "Arrivez avant 8h30, le site ferme à 16h30. Ne tentez pas la nage sans savoir nager, le bassin est profond.",
  'snorkeling-anses-arlet': "Meilleure visibilité avant 10h, avant que le vent ne se lève. Respectez la réserve marine, ne touchez pas les coraux.",
  'kayak-mangrove': "Départ à la Pointe du Bout, marée haute idéale. Appliquez crème solaire 30 min avant, la mangrove n'offre pas d'ombre.",
  'canyoning': "Prévoyez maillot, chaussures fermées et serviette. L'encadrement fournit le matériel technique. Réservation obligatoire.",
  'salines': "Arrivez avant 8h30 pour le stationnement et l'ombre des cocotiers. Apportez parasol et hydratation, peu d'infrastructures.",
  'anse-noire-dufour': "Stationnement limité au hameau d'Anse Dufour. Marche 10 min entre les deux anses. Snorkeling côté Anse Dufour.",
  'anse-couleuvre': "Sentier d'accès de 15 min à travers la forêt. Vagues fortes, baignade déconseillée. Magnifiques photos au lever du jour.",
  'pointe-marin': "Eaux calmes toute la journée. Restaurants de plage à proximité pour déjeuner. Idéal pour les familles avec enfants.",
  'memorial-caffard': "Visite de 20 min, accès libre. Meilleure lumière en fin d'après-midi. Combiner avec le Diamant voisin.",
  'habitation-clement': "Dernière entrée à 16h. Visite guidée à 10h et 14h. Boutique de rhum et restaurant sur place.",
  'musee-banane': "Ferme le dimanche. Dégustation de produits dérivés incluse dans le billet. Parcours ombragé et accessible.",
  'saint-pierre': "Garez-vous sur le front de mer. Musée volcanologique ouvert 9h-17h. Combiner avec les ruines du théâtre.",
  'distillerie-depaz': "Visite guidée à 10h et 14h30. Dégustation de rhum incluse. Magnifique jardin créole à explorer.",
  'distillerie-neisson': "Visite sur réservation, créneaux à 10h et 15h. Boutique de produits rares. Fermeture le week-end.",
  'marche-fort-de-france': "Le marché est plus animé le matin. Évitez les heures de pointe en ville (7h-9h, 16h30-18h30).",
};

const CONSEILS_AFTERNOON: Record<string, string> = {
  'salines': "Transat et parasol à louer sur place. Restaurant Le Mango pour un ti-punch au coucher du soleil.",
  'anse-noire-dufour': "Apportez votre masque et tuba, location limitée sur place. Tortues marines fréquentes le matin.",
  'anse-couleuvre': "Évitez l'après-midi tardive, la marée peut restreindre la plage. Superbe lumière dorée vers 16h.",
  'pointe-marin': "Idéal pour le farniente en fin d'après-midi. Coucher de soleil visible depuis la pointe.",
  'memorial-caffard': "Site en plein air, visite libre et gratuite. Vue splendide sur le Rocher du Diamant.",
  'habitation-clement': "Le jardin botanique vaut la visite à lui seul. Comptez 30 min supplémentaires.",
  'musee-banane': "Parcours ombragé, agréable même en après-midi. Boutique de produits locaux à la sortie.",
  'saint-pierre': "Flânez sur le front de mer, rafraîchissez-vous au musée volcanologique. Ruines du théâtre en accès libre.",
  'distillerie-depaz': "Dégustation commentée à la fin de la visite. Le jardin créole est magnifique en après-midi.",
  'distillerie-neisson': "Boutique de rhums rares et éditions limitées. Démonstration de distillation selon saison.",
  'marche-fort-de-france': "Évitez l'après-midi, les stands ferment vers 15h. Privilégiez le matin pour l'ambiance.",
  'snorkeling-anses-arlet': "Évitez 14h-15h quand le vent se lève. Le spot de Grande Anse est plus abrité l'après-midi.",
  'kayak-mangrove': "Sortie de fin d'après-midi possible, plus fraîche. Coucher de soleil spectaculaire sur la baie.",
  'canyoning': "Sortie uniquement encadrée, créneaux du matin. Alternative: via ferrata de la Caravelle.",
  'montagne-pelee': "L'après-midi le sommet est souvent dans les nuages. Préférez une autre activité.",
  'caravelle': "Finissez par la plage de l'Anse Chauvet pour vous rafraîchir. Baignade surveillée.",
  'trace-jesuites': "Sentier ombragé, agréable même en après-midi. Combiner avec le Jardin de Balata voisin.",
  'saut-gendarme': "Le bassin est à l'ombre en après-midi, parfait pour la fraîcheur. Site moins fréquenté après 14h.",
  'cascades-didier': "Les cascades sont ombragées l'après-midi. Attention aux roches glissantes.",
  'gorges-falaise': "Site fermé après 16h30. L'après-midi est moins fréquenté mais la lumière est belle.",
};

function pick<T>(arr: T[], index: number): T {
  return arr[index % arr.length];
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatFrenchDate(date: Date): string {
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
}

function parseCost(costStr: string): number {
  const match = costStr.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function isRushHour(hour: number): boolean {
  return (hour >= 7 && hour < 9) || (hour >= 16 && hour < 19);
}

function getZoneFromHebergement(hebergement: string): Zone {
  const map: Record<string, Zone> = {
    'Les Anses-d\'Arlet': 'Sud Caraïbe',
    'L\'Ajoupa-Bouillon': 'Nord Atlantique',
    'Basse-Pointe': 'Nord Atlantique',
    'Bellefontaine': 'Nord Caraïbe',
    'Le Carbet': 'Nord Caraïbe',
    'Case-Pilote': 'Nord Caraïbe',
    'Le Diamant': 'Sud Caraïbe',
    'Ducos': 'Centre',
    'Fonds-Saint-Denis': 'Centre',
    'Fort-de-France': 'Centre',
    'Gros-Morne': 'Nord Atlantique',
    'Le Lamentin': 'Centre',
    'Le Lorrain': 'Nord Atlantique',
    'Le Marin': 'Sud Caraïbe',
    'Le Morne-Rouge': 'Nord Atlantique',
    'Le Prêcheur': 'Nord Caraïbe',
    'Les Trois-Îlets': 'Centre',
    'Rivière-Pilote': 'Sud Caraïbe',
    'Rivière-Salée': 'Sud Caraïbe',
    'Le Robert': 'Nord Atlantique',
    'Sainte-Anne': 'Sud Caraïbe',
    'Sainte-Luce': 'Sud Caraïbe',
    'Sainte-Marie': 'Nord Atlantique',
    'Saint-Esprit': 'Sud Caraïbe',
    'Saint-Joseph': 'Sud Caraïbe',
    'Saint-Pierre': 'Nord Caraïbe',
    'Schœlcher': 'Centre',
    'La Trinité': 'Nord Atlantique',
    'Le Vauclin': 'Sud Caraïbe',
  };
  return map[hebergement] || 'Centre';
}

function groupPlacesByZone(places: Place[]): Map<Zone, Place[]> {
  const groups = new Map<Zone, Place[]>();
  for (const p of places) {
    if (!groups.has(p.zone)) groups.set(p.zone, []);
    groups.get(p.zone)!.push(p);
  }
  return groups;
}

function sortZonesByProximity(zones: Zone[], baseZone: Zone): Zone[] {
  return [...zones].sort((a, b) => {
    const distA = ZONE_DISTANCES[baseZone]?.[a] ?? 999;
    const distB = ZONE_DISTANCES[baseZone]?.[b] ?? 999;
    return distA - distB;
  });
}

function buildMorningSlot(place: Place, trajetMinutes: number, heureDebut?: string): TimeSlot {
  return {
    heure: heureDebut || '08:30',
    activite: place.nom,
    lieu: place.zone,
    duree: place.dureeMoyenne,
    trajetMinutes,
    cout: place.costEstimate,
    conseil: CONSEILS_MORNING[place.id] || `Arrivez tôt pour profiter du site dans les meilleures conditions.`,
  };
}

function buildAfternoonSlot(place: Place, trajetMinutes: number): TimeSlot {
  return {
    heure: '15:00',
    activite: place.nom,
    lieu: place.zone,
    duree: place.dureeMoyenne,
    trajetMinutes,
    cout: place.costEstimate,
    conseil: CONSEILS_AFTERNOON[place.id] || `Profitez de la lumière de l'après-midi pour les photos.`,
  };
}

function buildLunchSlot(zone: Zone, restaurationLevel: number): LunchSlot {
  const opts = LUNCH_RECOMMENDATIONS[zone];
  const idx = restaurationLevel > 5 ? 0 : restaurationLevel > 2 ? 1 : 2;
  const choice = pick(opts, idx);
  return {
    heure: '12:30',
    recommandation: choice.rec,
    type: choice.type,
    cout: choice.cout,
  };
}

function buildEveningSlot(zone: Zone, dayDate: Date): EveningSlot {
  const opts = DINNER_RECOMMENDATIONS[zone];
  const choice = pick(opts, Math.floor(dayDate.getDate() / 2));
  return {
    heure: '19:30',
    activite: `Dîner: ${choice.rec}`,
    lieu: zone,
    cout: choice.cout,
  };
}

function getDayTitle(zone: Zone, placesInDay: Place[], dayNum: number): string {
  const zoneLabels: Record<Zone, string> = {
    'Nord Caraïbe': 'Côte Caraïbe du Nord',
    'Sud Caraïbe': 'Côte Sud Caraïbe',
    'Nord Atlantique': 'Presqu\'île Atlantique',
    'Centre': 'Cœur de la Martinique',
  };
  const mainActivity = placesInDay[0]?.nom || 'Découverte';
  return `Jour ${dayNum} — ${zoneLabels[zone]} — ${mainActivity}`;
}

function computeDayCost(morning: TimeSlot, lunch: LunchSlot, afternoon: TimeSlot | null, evening: EveningSlot): string {
  const costs = [
    parseCost(morning.cout),
    parseCost(lunch.cout),
    afternoon ? parseCost(afternoon.cout) : 0,
    parseCost(evening.cout),
  ];
  const total = costs.reduce((a, b) => a + b, 0);
  return `${total}€`;
}

function getRushHourAdvice(zone: Zone, baseZone: Zone, hour: number): string {
  if (zone !== baseZone && isRushHour(hour)) {
    if (zone === 'Centre' || baseZone === 'Centre') {
      return "Attention aux embouteillages autour de Fort-de-France/Lamentin aux heures de pointe (7h-9h, 16h30-18h30). Prévoyez 20 min de marge.";
    }
  }
  return '';
}

export function generateItinerary(
  selectedPlaceIds: string[],
  settings: StaySettings
): Itinerary {
  const selectedPlaces = PLACES.filter((p) => selectedPlaceIds.includes(p.id));
  const baseZone = getZoneFromHebergement(settings.hebergement);

  // If no places selected, use a default selection
  const placesToSchedule = selectedPlaces.length > 0 ? selectedPlaces : PLACES.slice(0, 6);

  // Separate morning-only places (randonnées, rivières) from flexible places
  const morningOnly = placesToSchedule.filter(
    (p) => p.categorie === 'Randonnées' || p.categorie === 'Rivières & Cascades' || p.bestTimeOfDay === 'matin'
  );
  const flexible = placesToSchedule.filter((p) => !morningOnly.includes(p));

  // Group all places by zone
  const allByZone = groupPlacesByZone(placesToSchedule);
  const sortedZones = sortZonesByProximity([...allByZone.keys()], baseZone);

  // Distribute places across days
  const numDays = settings.duree;
  const days: LegacyDayPlan[] = [];

  // Build a flat list of (place, isMorning) tuples, ordered by zone proximity
  type ScheduleItem = { place: Place; isMorning: boolean };
  const scheduleItems: ScheduleItem[] = [];

  for (const zone of sortedZones) {
    const zonePlaces = allByZone.get(zone)!;
    const zoneMorning = zonePlaces.filter((p) => morningOnly.includes(p));
    const zoneFlexible = zonePlaces.filter((p) => !zoneMorning.includes(p));

    // Morning items first, then flexible
    for (const p of zoneMorning) scheduleItems.push({ place: p, isMorning: true });
    for (const p of zoneFlexible) scheduleItems.push({ place: p, isMorning: false });
  }

  // Distribute items across days: 1 morning + 1 afternoon per day
  const itemsPerDay = Math.max(1, Math.ceil(scheduleItems.length / numDays));

  let itemIndex = 0;
  for (let day = 0; day < numDays; day++) {
    const dayDate = new Date(settings.dateDebut);
    dayDate.setDate(dayDate.getDate() + day);

    const dayItems = scheduleItems.slice(itemIndex, itemIndex + 2);
    itemIndex += 2;

    if (dayItems.length === 0) {
      // No more places to schedule — create a rest/exploration day
      const zone = sortedZones[day % sortedZones.length] || baseZone;
      const lunch = buildLunchSlot(zone, settings.restauration);
      const evening = buildEveningSlot(zone, dayDate);
      const trajet = ZONE_DISTANCES[baseZone]?.[zone] ?? 30;
      days.push({
        jourNumero: day + 1,
        date: formatDate(dayDate),
        titre: `Jour ${day + 1} — Journée détente à ${settings.hebergement}`,
        zoneGeographique: zone,
        coutEstimeJournee: `0€ + ${lunch.cout} + ${evening.cout}`,
        programme: {
          matin: {
            heure: '09:00',
            activite: 'Matinée libre à l\'hébergement',
            lieu: settings.hebergement,
            duree: 'Libre',
            trajetMinutes: 0,
            cout: 'Gratuit',
            conseil: 'Profitez de cette journée pour vous reposer et profiter des installations.',
          },
          dejeuner: lunch,
          apresMidi: {
            heure: '14:30',
            activite: 'Balade libre et découverte du quartier',
            lieu: zone,
            duree: '2h',
            trajetMinutes: 0,
            cout: 'Gratuit',
            conseil: 'Flânez, profitez de la plage locale ou explorez les environs.',
          },
          soir: evening,
        },
      });
      continue;
    }

    const dayZone = dayItems[0].place.zone;
    const morningItem = dayItems.find((it) => it.isMorning) || dayItems[0];
    const afternoonItem = dayItems.find((it) => !it.isMorning) || dayItems[1];

    const morningTrajet = day === 0
      ? ZONE_DISTANCES[baseZone]?.[morningItem.place.zone] ?? 30
      : ZONE_DISTANCES[days[days.length - 1].zoneGeographique as Zone]?.[morningItem.place.zone] ?? 30;

    const morningSlot = buildMorningSlot(morningItem.place, morningTrajet, settings.modeDate === 'dates' ? settings.heureDebut : undefined);
    const lunch = buildLunchSlot(dayZone, settings.restauration);

    let afternoonSlot: TimeSlot | null = null;
    if (afternoonItem) {
      const afternoonTrajet = ZONE_DISTANCES[morningItem.place.zone]?.[afternoonItem.place.zone] ?? 15;
      afternoonSlot = buildAfternoonSlot(afternoonItem.place, afternoonTrajet);
    }

    const evening = buildEveningSlot(dayZone, dayDate);

    // Rush hour advice
    let extraConseil = getRushHourAdvice(dayZone, baseZone, 8);
    if (extraConseil) {
      morningSlot.conseil += ' ' + extraConseil;
    }

    const dayCost = computeDayCost(morningSlot, lunch, afternoonSlot, evening);
    const placesInDay = dayItems.map((it) => it.place);

    days.push({
      jourNumero: day + 1,
      date: formatDate(dayDate),
      titre: getDayTitle(dayZone, placesInDay, day + 1),
      zoneGeographique: dayZone,
      coutEstimeJournee: dayCost,
      programme: {
        matin: morningSlot,
        dejeuner: lunch,
        apresMidi: afternoonSlot || {
          heure: '15:00',
          activite: 'Après-midi libre',
          lieu: dayZone,
          duree: 'Libre',
          trajetMinutes: 0,
          cout: 'Gratuit',
          conseil: "Profitez de l'après-midi pour vous reposer ou explorer librement.",
        },
        soir: evening,
      },
    });
  }

  // Compute total cost
  const totalCost = days.reduce((sum, day) => {
    const morningC = parseCost(day.programme.matin.cout);
    const lunchC = parseCost(day.programme.dejeuner.cout);
    const apresC = parseCost(day.programme.apresMidi.cout);
    const soirC = parseCost(day.programme.soir.cout);
    return sum + morningC + lunchC + apresC + soirC;
  }, 0);

  // Build general advice
  const conseils: string[] = [];
  if (settings.transport === 'Transports') {
    conseils.push("Les transports en commun étant limités, vérifiez les horaires de bus la veille. Le taxi collectif est une alternative locale économique.");
  } else {
    conseils.push("La voiture est le meilleur moyen d'explorer l'île en toute liberté. Roulez prudemment, les routes de montagne sont sinueuses.");
  }
  if (settings.rythme > 6) {
    conseils.push("Avec un rythme soutenu, n'oubliez pas de vous hydrater régulièrement et de porter une protection solaire adaptée au climat tropical.");
  }
  if (settings.effort > 6) {
    conseils.push("Pour les activités physiques exigeantes, prévoyez des chaussures de marche, un chapeau et au moins 2L d'eau par personne.");
  }
  conseils.push("Évitez la traversée de Fort-de-France et du Lamentin aux heures de pointe (7h-9h et 16h30-18h30) pour gagner du temps.");
  conseils.push("Les randonnées et baignades en rivière se font exclusivement le matin, avant les orages de l'après-midi tropical.");

  const groupLabels: Record<string, string> = {
    'Couple': 'romantique',
    'Famille': 'en famille',
    'Solo': 'solo',
    'Amis': 'entre amis',
  };

  const titre = `Séjour ${groupLabels[settings.groupe] || ''} en Martinique — ${settings.duree} jours`;

  // Build photo session promo — pick a day around the middle of the stay
  const photoDayIndex = Math.min(Math.floor(days.length / 2), days.length - 1);
  const photoDay = days[photoDayIndex];
  const photoDate = new Date(photoDay.date);
  const photoDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const photoDayName = photoDays[photoDate.getDay()];

  const seancePhoto = {
    jour: photoDayIndex + 1,
    date: photoDay.date,
    titre: `Séance photo souvenir au Diamant — ${photoDayName} ${photoDate.getDate()}`,
    description: "Immortalisez votre séjour en Martinique avec une séance photo professionnelle au coucher du soleil sur la plage du Diamant, face au célèbre Rocher. Un souvenir unique et authentique de vos vacances, capturé par un photographe local passionné. Séance en fin de journée pour profiter de la lumière dorée du golden hour.",
    lieu: "Plage du Diamant, Martinique",
    heure: "17h30 — coucher de soleil",
    lien: "https://declicstudio.fr",
  };

  return {
    titreSejour: titre,
    coutTotalEstime: `${totalCost}€ par personne`,
    conseilGeneral: conseils.join(' '),
    seancePhoto,
    jours: days,
  };
}
