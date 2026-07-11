import { Search, X } from 'lucide-react'
import type { Tier, TournamentStatus } from '../types'
import { TIER_META, TIER_ORDER } from '../data/tierMeta'
import { TIER_DOT_CLASSES } from './TierBadge'

export type StatusFilter = 'all' | TournamentStatus

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'live', label: 'Сейчас' },
  { value: 'upcoming', label: 'Скоро' },
  { value: 'finished', label: 'Прошли' },
]

interface Props {
  search: string
  onSearchChange: (v: string) => void
  selectedTiers: Set<Tier>
  onToggleTier: (t: Tier) => void
  countries: string[]
  selectedCountry: string
  onCountryChange: (c: string) => void
  status: StatusFilter
  onStatusChange: (s: StatusFilter) => void
  onReset: () => void
  hasActiveFilters: boolean
}

export default function FilterBar({
  search,
  onSearchChange,
  selectedTiers,
  onToggleTier,
  countries,
  selectedCountry,
  onCountryChange,
  status,
  onStatusChange,
  onReset,
  hasActiveFilters,
}: Props) {
  return (
    <div className="space-y-2.5">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Турнир, город или страна"
          className="w-full glass pl-9 pr-9 py-2.5 text-sm placeholder:text-tertiary focus:outline-none focus:ring-1 focus:ring-accent"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary"
          >
            <X size={15} />
          </button>
        )}
      </div>

      <div className="flex gap-1.5 overflow-x-auto scrollbar-none -mx-4 px-4">
        {TIER_ORDER.map((tier) => {
          const active = selectedTiers.has(tier)
          return (
            <button
              key={tier}
              onClick={() => onToggleTier(tier)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                active
                  ? 'bg-accent/15 border-accent/40 text-accent'
                  : 'bg-card border-muted text-secondary'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${TIER_DOT_CLASSES[tier]}`} />
              {TIER_META[tier].shortLabel}
            </button>
          )
        })}
      </div>

      <div className="flex gap-2">
        <div className="flex bg-card rounded-2xl p-0.5 flex-1">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onStatusChange(opt.value)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-[14px] transition-colors ${
                status === opt.value ? 'bg-accent text-base' : 'text-secondary'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <select
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
          className="glass px-2.5 text-xs font-medium max-w-[38%] focus:outline-none"
        >
          <option value="">Все страны</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <button onClick={onReset} className="text-xs text-secondary underline underline-offset-2">
          Сбросить фильтры
        </button>
      )}
    </div>
  )
}
