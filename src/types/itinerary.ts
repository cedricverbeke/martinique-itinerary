export interface TimeSlot {
  heure: string;
  activite: string;
  lieu: string;
  duree: string;
  trajetMinutes: number;
  cout: string;
  conseil: string;
}

export interface LunchSlot {
  heure: string;
  recommandation: string;
  type: string;
  cout: string;
}

export interface EveningSlot {
  heure: string;
  activite: string;
  lieu: string;
  cout: string;
}

export interface DayPlan {
  jourNumero: number;
  date: string;
  titre: string;
  zoneGeographique: string;
  coutEstimeJournee: string;
  programme: {
    matin: TimeSlot;
    dejeuner: LunchSlot;
    apresMidi: TimeSlot;
    soir: EveningSlot;
  };
}

export interface PhotoSessionPromo {
  jour: number;
  date: string;
  titre: string;
  description: string;
  lieu: string;
  heure: string;
  lien: string;
}

export interface Itinerary {
  titreSejour: string;
  coutTotalEstime: string;
  conseilGeneral: string;
  seancePhoto?: PhotoSessionPromo;
  jours: DayPlan[];
}

export interface StaySettings {
  hebergement: string;
  dateDebut: string;
  dateFin: string;
  heureDebut: string;
  duree: number;
  modeDate: 'jours' | 'dates';
  groupe: string;
  transport: string;
  rythme: number; // 0-10
  effort: number; // 0-10
  orientation: number; // 0-10 (nature <-> culture)
  restauration: number; // 0-10 (snacks <-> tables gourmandes)
}

export interface GenerationParams {
  selectedPlaces: string[];
  settings: StaySettings;
}
