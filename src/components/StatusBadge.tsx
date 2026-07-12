import type { TournamentStatus } from '../types'

const STATUS_META: Record<TournamentStatus, { label: string; dot: string; text: string }> = {
  live: { label: 'Live now', dot: 'bg-positive', text: 'text-positive' },
  upcoming: { label: 'Upcoming', dot: 'bg-court', text: 'text-court' },
  finished: { label: 'Finished', dot: 'bg-tertiary', text: 'text-secondary' },
}

export default function StatusBadge({ status }: { status: TournamentStatus }) {
  const meta = STATUS_META[status]
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${meta.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot} ${status === 'live' ? 'animate-pulse' : ''}`} />
      {meta.label}
    </span>
  )
}
