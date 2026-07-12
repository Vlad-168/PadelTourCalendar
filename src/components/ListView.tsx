import { useMemo } from 'react'
import { SearchX } from 'lucide-react'
import type { Tournament } from '../types'
import TournamentCard from './TournamentCard'
import EmptyState from './EmptyState'
import { monthLabel, parseISO } from '../utils/date'

export default function ListView({ tournaments, onSelect }: { tournaments: Tournament[]; onSelect: (t: Tournament) => void }) {
  const groups = useMemo(() => {
    const sorted = [...tournaments].sort((a, b) => a.startDate.localeCompare(b.startDate))
    const map = new Map<string, Tournament[]>()
    for (const t of sorted) {
      const d = parseISO(t.startDate)
      const key = `${d.getFullYear()}-${d.getMonth()}`
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(t)
    }
    return [...map.entries()].map(([key, items]) => {
      const [year, month] = key.split('-').map(Number)
      return { key, label: monthLabel(year, month), items }
    })
  }, [tournaments])

  if (groups.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="Nothing found"
        subtitle="Try changing the filters or search query"
      />
    )
  }

  return (
    <div className="space-y-5 pb-8">
      {groups.map((group) => (
        <div key={group.key} id={`month-${group.key}`} className="scroll-mt-40">
          <div className="text-secondary text-xs font-semibold uppercase tracking-wide mb-2 px-0.5">
            {group.label}
          </div>
          <div className="space-y-2">
            {group.items.map((t) => (
              <TournamentCard key={t.id} t={t} onClick={() => onSelect(t)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
