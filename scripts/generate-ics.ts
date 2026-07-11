import { mkdirSync, writeFileSync } from 'node:fs'
import { TOURNAMENTS } from '../src/data/tournaments'
import { TIER_META } from '../src/data/tierMeta'

// Builds a subscribable .ics feed (public/calendar.ics) from the same
// tournament data the app renders. Regenerated on every `npm run dev` /
// `npm run build`, so it's never committed — see .gitignore.

function toICSDate(iso: string, offsetDays = 0): string {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d + offsetDays)
  const yy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yy}${mm}${dd}`
}

function escapeICS(text: string): string {
  return text.replace(/([\\,;])/g, '\\$1')
}

function foldLine(line: string): string {
  // RFC 5545: lines >75 octets should be folded with CRLF + leading space
  if (line.length <= 75) return line
  const parts: string[] = []
  let rest = line
  while (rest.length > 75) {
    parts.push(rest.slice(0, 75))
    rest = ' ' + rest.slice(75)
  }
  parts.push(rest)
  return parts.join('\r\n')
}

const now = new Date()
const stamp = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, '0')}${String(now.getUTCDate()).padStart(2, '0')}T${String(now.getUTCHours()).padStart(2, '0')}${String(now.getUTCMinutes()).padStart(2, '0')}${String(now.getUTCSeconds()).padStart(2, '0')}Z`

const lines: string[] = [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//PadelTourCalendar//RU',
  'CALSCALE:GREGORIAN',
  'METHOD:PUBLISH',
  'X-WR-CALNAME:Padel Tour Calendar (FIP / Premier Padel)',
  'X-WR-CALDESC:Турниры FIP Cupra Tour и Premier Padel',
  'X-WR-TIMEZONE:UTC',
  'REFRESH-INTERVAL;VALUE=DURATION:P1D',
  'X-PUBLISHED-TTL:P1D',
]

for (const t of TOURNAMENTS) {
  lines.push(
    'BEGIN:VEVENT',
    `UID:${t.id}@padeltourcalendar.vlad-168.github.io`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${toICSDate(t.startDate)}`,
    `DTEND;VALUE=DATE:${toICSDate(t.endDate, 1)}`,
    foldLine(`SUMMARY:${escapeICS(`${t.name} (${t.city})`)}`),
    foldLine(`LOCATION:${escapeICS(`${t.city}, ${t.country}`)}`),
    foldLine(`DESCRIPTION:${escapeICS(TIER_META[t.tier].label)}`),
    'END:VEVENT',
  )
}
lines.push('END:VCALENDAR')

mkdirSync('public', { recursive: true })
writeFileSync('public/calendar.ics', lines.join('\r\n') + '\r\n')
console.log(`generate-ics: wrote public/calendar.ics with ${TOURNAMENTS.length} events`)
