import { useMemo, useState } from 'react'
import { CalendarDays, List as ListIcon, Radio } from 'lucide-react'
import Logo from './components/Logo'
import FilterBar, { type StatusFilter } from './components/FilterBar'
import ListView from './components/ListView'
import CalendarView from './components/CalendarView'
import BottomSheet from './components/BottomSheet'
import TournamentDetail from './components/TournamentDetail'
import TournamentCard from './components/TournamentCard'
import AnimatedNumber from './components/AnimatedNumber'
import { TOURNAMENTS, DATA_RANGE } from './data/tournaments'
import type { Tier, Tournament, ViewMode } from './types'
import { formatDateRange, getStatus, tournamentsOnDay } from './utils/date'

const today = new Date()

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('calendar')
  const [search, setSearch] = useState('')
  const [selectedTiers, setSelectedTiers] = useState<Set<Tier>>(new Set())
  const [selectedCountry, setSelectedCountry] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')

  const [calYear, setCalYear] = useState(today.getFullYear())
  const [calMonth, setCalMonth] = useState(today.getMonth())
  const [calDirection, setCalDirection] = useState(0)

  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)

  const countries = useMemo(() => [...new Set(TOURNAMENTS.map((t) => t.country))].sort(), [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return TOURNAMENTS.filter((t) => {
      if (selectedTiers.size > 0 && !selectedTiers.has(t.tier)) return false
      if (selectedCountry && t.country !== selectedCountry) return false
      if (status !== 'all' && getStatus(t) !== status) return false
      if (q && !(t.name.toLowerCase().includes(q) || t.city.toLowerCase().includes(q) || t.country.toLowerCase().includes(q))) return false
      return true
    })
  }, [search, selectedTiers, selectedCountry, status])

  const liveCount = useMemo(() => TOURNAMENTS.filter((t) => getStatus(t) === 'live').length, [])

  const hasActiveFilters = selectedTiers.size > 0 || !!selectedCountry || status !== 'all' || !!search

  function toggleTier(tier: Tier) {
    setSelectedTiers((prev) => {
      const next = new Set(prev)
      if (next.has(tier)) next.delete(tier)
      else next.add(tier)
      return next
    })
  }

  function resetFilters() {
    setSearch('')
    setSelectedTiers(new Set())
    setSelectedCountry('')
    setStatus('all')
  }

  function goToday() {
    setCalDirection(0)
    setCalYear(today.getFullYear())
    setCalMonth(today.getMonth())
  }

  function changeMonth(delta: number) {
    setCalDirection(delta)
    let m = calMonth + delta
    let y = calYear
    if (m < 0) { m = 11; y -= 1 }
    if (m > 11) { m = 0; y += 1 }
    setCalMonth(m)
    setCalYear(y)
  }

  const dayTournaments = selectedDay ? tournamentsOnDay(filtered, selectedDay) : []

  return (
    <div className="min-h-full flex flex-col">
      <header className="sticky top-0 z-30 bg-base/95 backdrop-blur-sm border-b border-muted safe-top fade-in">
        <div className="px-4 pt-3 pb-3 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo size={26} />
              <h1 className="font-bold text-primary text-base">Padel Tour Calendar</h1>
            </div>
            <div className="flex bg-card rounded-2xl p-0.5">
              <button
                onClick={() => setViewMode('calendar')}
                className={`press p-1.5 rounded-[14px] transition-colors duration-200 ${viewMode === 'calendar' ? 'bg-accent text-base' : 'text-secondary'}`}
              >
                <CalendarDays size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`press p-1.5 rounded-[14px] transition-colors duration-200 ${viewMode === 'list' ? 'bg-accent text-base' : 'text-secondary'}`}
              >
                <ListIcon size={16} />
              </button>
            </div>
          </div>

          <FilterBar
            search={search}
            onSearchChange={setSearch}
            selectedTiers={selectedTiers}
            onToggleTier={toggleTier}
            countries={countries}
            selectedCountry={selectedCountry}
            onCountryChange={setSelectedCountry}
            status={status}
            onStatusChange={setStatus}
            onReset={resetFilters}
            hasActiveFilters={hasActiveFilters}
          />

          <div className="flex items-center justify-between text-xs">
            <span className="text-secondary">
              Tournaments found: <span className="text-primary font-medium tabular-nums"><AnimatedNumber value={filtered.length} /></span>
            </span>
            {liveCount > 0 && (
              <span className="flex items-center gap-1 text-positive font-medium">
                <span className="relative flex items-center justify-center w-3 h-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-positive opacity-60 animate-ping" />
                  <Radio size={12} className="relative" />
                </span>
                <span className="tabular-nums"><AnimatedNumber value={liveCount} /></span> live now
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 pt-4 safe-bottom">
        {viewMode === 'calendar' ? (
          <div key="calendar" className="fade-slide-up">
            <CalendarView
              year={calYear}
              month={calMonth}
              direction={calDirection}
              tournaments={filtered}
              onPrevMonth={() => changeMonth(-1)}
              onNextMonth={() => changeMonth(1)}
              onToday={goToday}
              onSelectDay={setSelectedDay}
            />
            <p className="text-tertiary text-[11px] text-center mt-4 pb-8">
              Data from the official FIP calendar (Cupra FIP Tour + Premier Padel):
              {' '}{formatDateRange(DATA_RANGE.start, DATA_RANGE.end)}.
            </p>
          </div>
        ) : (
          <div key="list" className="fade-slide-up">
            <ListView tournaments={filtered} onSelect={setSelectedTournament} />
          </div>
        )}
      </main>

      <BottomSheet
        open={!!selectedDay}
        onClose={() => setSelectedDay(null)}
        title={selectedDay ? selectedDay.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : ''}
      >
        <div className="p-4 space-y-2">
          {dayTournaments.map((t) => (
            <TournamentCard
              key={t.id}
              t={t}
              onClick={() => {
                setSelectedDay(null)
                setSelectedTournament(t)
              }}
            />
          ))}
        </div>
      </BottomSheet>

      <BottomSheet open={!!selectedTournament} onClose={() => setSelectedTournament(null)} title="Tournament">
        {selectedTournament && <TournamentDetail t={selectedTournament} />}
      </BottomSheet>
    </div>
  )
}
