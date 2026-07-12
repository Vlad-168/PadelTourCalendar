import type { Tournament, TournamentStatus } from '../types'

const MONTHS_FULL = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const WEEKDAYS_SHORT = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

export function parseISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function toISODate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export function monthLabel(year: number, month: number): string {
  return `${MONTHS_FULL[month]} ${year}`
}

export function weekdayLabels(): string[] {
  return WEEKDAYS_SHORT
}

export function formatDateRange(startISO: string, endISO: string): string {
  const start = parseISO(startISO)
  const end = parseISO(endISO)
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()
  const sameDay = startISO === endISO

  if (sameDay) {
    return `${start.getDate()} ${MONTHS_FULL[start.getMonth()]}`
  }
  if (sameMonth) {
    return `${start.getDate()}–${end.getDate()} ${MONTHS_FULL[start.getMonth()]}`
  }
  return `${start.getDate()} ${MONTHS_SHORT[start.getMonth()]} – ${end.getDate()} ${MONTHS_SHORT[end.getMonth()]}`
}

export function getStatus(t: Tournament, today: Date = new Date()): TournamentStatus {
  const day = startOfDay(today)
  const start = parseISO(t.startDate)
  const end = parseISO(t.endDate)
  if (day < start) return 'upcoming'
  if (day > end) return 'finished'
  return 'live'
}

/** 6x7 grid of dates for a month view, weeks starting Monday. Cells outside
 * the month are still real Date objects (from adjacent months) so the grid
 * stays rectangular. */
export function calendarGrid(year: number, month: number): Date[] {
  const first = new Date(year, month, 1)
  const firstWeekday = (first.getDay() + 6) % 7 // Monday = 0
  const gridStart = new Date(year, month, 1 - firstWeekday)
  return Array.from({ length: 42 }, (_, i) => new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i))
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function tournamentsOnDay(tournaments: Tournament[], day: Date): Tournament[] {
  const iso = toISODate(day)
  return tournaments.filter((t) => t.startDate <= iso && iso <= t.endDate)
}
