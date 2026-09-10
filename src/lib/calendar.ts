import type { Itinerary, LegacyDayPlan } from '@/types/itinerary';

function parseDate(dateStr: string, timeStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  const [h, min] = timeStr.split(':').map(Number);
  return new Date(y, m - 1, d, h, min, 0);
}

function formatDateForICS(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  const h = String(date.getUTCHours()).padStart(2, '0');
  const min = String(date.getUTCMinutes()).padStart(2, '0');
  const s = String(date.getUTCSeconds()).padStart(2, '0');
  return `${y}${m}${d}T${h}${min}${s}Z`;
}

function escapeICS(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

function durationToHours(duree: string): number {
  const match = duree.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 2;
}

function buildEventFromDay(day: LegacyDayPlan, itineraryTitle: string): string {
  const events: string[] = [];
  const { matin, dejeuner, apresMidi, soir } = day.programme;

  const buildEvent = (
    title: string,
    startTime: string,
    duree: string,
    location: string,
    description: string
  ): string => {
    const start = parseDate(day.date, startTime);
    const hours = durationToHours(duree);
    const end = new Date(start.getTime() + hours * 60 * 60 * 1000);
    return [
      'BEGIN:VEVENT',
      `UID:${day.jourNumero}-${startTime}-${Date.now()}@martinique-planner`,
      `DTSTAMP:${formatDateForICS(new Date())}`,
      `DTSTART:${formatDateForICS(start)}`,
      `DTEND:${formatDateForICS(end)}`,
      `SUMMARY:${escapeICS(title)}`,
      `LOCATION:${escapeICS(location)}`,
      `DESCRIPTION:${escapeICS(description)}`,
      'END:VEVENT',
    ].join('\r\n');
  };

  // Morning event
  if (matin.activite && matin.activite !== "Matinée libre à l'hébergement") {
    const trajetInfo = matin.trajetMinutes > 0 ? ` | Trajet: ${matin.trajetMinutes} min depuis l'étape précédente` : '';
    events.push(buildEvent(
      `${matin.activite} (Matin)`,
      matin.heure,
      matin.duree,
      matin.lieu,
      `${matin.activite} — ${matin.lieu}. Durée: ${matin.duree}. Coût: ${matin.cout}. Conseil: ${matin.conseil}${trajetInfo}`
    ));
  }

  // Lunch event
  events.push(buildEvent(
    `Déjeuner: ${dejeuner.recommandation}`,
    dejeuner.heure,
    '1h30',
    dejeuner.recommandation,
    `${dejeuner.recommandation} — Type: ${dejeuner.type}. Coût: ${dejeuner.cout}`
  ));

  // Afternoon event
  if (apresMidi.activite && apresMidi.activite !== 'Après-midi libre') {
    const trajetInfo = apresMidi.trajetMinutes > 0 ? ` | Trajet: ${apresMidi.trajetMinutes} min depuis l'étape précédente` : '';
    events.push(buildEvent(
      `${apresMidi.activite} (Après-midi)`,
      apresMidi.heure,
      apresMidi.duree,
      apresMidi.lieu,
      `${apresMidi.activite} — ${apresMidi.lieu}. Durée: ${apresMidi.duree}. Coût: ${apresMidi.cout}. Conseil: ${apresMidi.conseil}${trajetInfo}`
    ));
  }

  // Evening event
  if (soir.activite) {
    events.push(buildEvent(
      soir.activite,
      soir.heure,
      '2h',
      soir.lieu,
      `${soir.activite} — ${soir.lieu}. Coût: ${soir.cout}`
    ));
  }

  return events.join('\r\n');
}

export function generateICS(itinerary: Itinerary): string {
  const header = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Martinique Planner//FR//EN',
    'CALSCALE:GREGORIAN',
    `X-WR-CALNAME:${escapeICS(itinerary.titreSejour)}`,
  ].join('\r\n');

  const events = itinerary.jours
    .map((day) => buildEventFromDay(day, itinerary.titreSejour))
    .join('\r\n');

  const footer = 'END:VCALENDAR';

  return `${header}\r\n${events}\r\n${footer}`;
}

export function downloadICS(itinerary: Itinerary): void {
  const icsContent = generateICS(itinerary);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `sejour-martinique.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function formatDateForGoogle(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${y}${m}${d}T${h}${min}00`;
}

export function buildGoogleCalendarLink(
  title: string,
  startTime: string,
  duree: string,
  location: string,
  description: string,
  dateStr: string
): string {
  const start = parseDate(dateStr, startTime);
  const hours = durationToHours(duree);
  const end = new Date(start.getTime() + hours * 60 * 60 * 1000);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${formatDateForGoogle(start)}/${formatDateForGoogle(end)}`,
    details: description,
    location: location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildDayGoogleCalendarLink(day: LegacyDayPlan): string {
  const firstActivity = day.programme.matin;
  const start = parseDate(day.date, firstActivity.heure);
  const lastActivity = day.programme.soir;
  const end = new Date(start.getTime() + 12 * 60 * 60 * 1000);

  const details = [
    `Matin: ${day.programme.matin.activite} (${day.programme.matin.heure}, ${day.programme.matin.duree})`,
    `Déjeuner: ${day.programme.dejeuner.recommandation} (${day.programme.dejeuner.heure})`,
    `Après-midi: ${day.programme.apresMidi.activite} (${day.programme.apresMidi.heure}, ${day.programme.apresMidi.duree})`,
    `Soir: ${day.programme.soir.activite} (${day.programme.soir.heure})`,
    `Coût estimé: ${day.coutEstimeJournee}`,
  ].join('\n');

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: day.titre,
    dates: `${formatDateForGoogle(start)}/${formatDateForGoogle(end)}`,
    details: details,
    location: day.zoneGeographique,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
