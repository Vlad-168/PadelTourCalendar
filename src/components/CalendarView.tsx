import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Tournament } from '../types'
import { calendarGrid, isSameDay, monthLabel, tournamentsOnDay, weekdayLabels } from '../utils/date'
import { TIER_DOT_CLASSES } from './TierBadge'

interface Props {
  year: number
  month: number
  tournaments: Tournament[]
  onPrevMonth: () => void
  onNextMonth: () => void
  onToday: () => void
  onSelectDay: (day: Date) => void
}

export default function CalendarView({ year, month, tournaments, onPrevMonth, onNextMonth, onToday, onSelectDay }: Props) {
  const grid = calendarGrid(year, month)
  const today = new Date()

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button onClick={onPrevMonth} className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-secondary active:scale-95">
          <ChevronLeft size={16} />
        </button>
        <button onClick={onToday} className="text-sm font-semibold text-primary">
          {monthLabel(year, month)}
        </button>
        <button onClick={onNextMonth} className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-secondary active:scale-95">
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekdayLabels().map((w) => (
          <div key={w} className="text-center text-[11px] text-tertiary font-medium py-1">{w}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {grid.map((day, i) => {
          const inMonth = day.getMonth() === month
          const dayTournaments = tournamentsOnDay(tournaments, day)
          const isToday = isSameDay(day, today)
          const hasEvents = dayTournaments.length > 0
          return (
            <button
              key={i}
              onClick={() => hasEvents && onSelectDay(day)}
              disabled={!hasEvents}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 ${inMonth ? '' : 'opacity-30'} ${
                isToday ? 'bg-accent/15 ring-1 ring-accent/50' : hasEvents ? 'bg-card active:scale-95' : ''
              }`}
            >
              <span className={`text-xs ${isToday ? 'text-accent font-bold' : 'text-primary'}`}>{day.getDate()}</span>
              {hasEvents && (
                <div className="flex items-center gap-0.5">
                  {dayTournaments.slice(0, 3).map((t) => (
                    <span key={t.id} className={`w-1 h-1 rounded-full ${TIER_DOT_CLASSES[t.tier]}`} />
                  ))}
                  {dayTournaments.length > 3 && <span className="text-[8px] text-secondary">+{dayTournaments.length - 3}</span>}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
