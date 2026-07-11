import type { Tournament } from '../types'
import { parseISO } from './date'

function toICSDate(iso: string, offsetDays = 0): string {
  const d = parseISO(iso)
  d.setDate(d.getDate() + offsetDays)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}${m}${day}`
}

export function downloadTournamentICS(t: Tournament) {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PadelTourCalendar//RU',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${t.id}@padeltourcalendar`,
    `DTSTART;VALUE=DATE:${toICSDate(t.startDate)}`,
    `DTEND;VALUE=DATE:${toICSDate(t.endDate, 1)}`,
    `SUMMARY:${t.name} (${t.city})`,
    `LOCATION:${t.city}\\, ${t.country}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${t.name.replace(/[^a-z0-9]+/gi, '-')}.ics`
  a.click()
  URL.revokeObjectURL(url)
}
