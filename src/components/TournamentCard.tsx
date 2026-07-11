import type { Tournament } from '../types'
import { MapPin } from 'lucide-react'
import TierBadge from './TierBadge'
import StatusBadge from './StatusBadge'
import { flagEmoji } from '../data/countryCodes'
import { formatDateRange, getStatus } from '../utils/date'

export default function TournamentCard({ t, onClick }: { t: Tournament; onClick: () => void }) {
  const status = getStatus(t)

  return (
    <button
      onClick={onClick}
      className="w-full glass p-3.5 flex items-center gap-3 text-left active:scale-[0.98] transition-transform"
    >
      <div className="text-2xl leading-none flex-shrink-0 w-9 text-center">{flagEmoji(t.country)}</div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <TierBadge tier={t.tier} />
          <StatusBadge status={status} />
        </div>
        <div className="font-semibold text-primary text-sm truncate">{t.name}</div>
        <div className="flex items-center gap-1 text-secondary text-xs mt-0.5">
          <MapPin size={11} className="flex-shrink-0" />
          <span className="truncate">{t.city}, {t.country}</span>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <div className="text-xs font-medium text-primary whitespace-nowrap">{formatDateRange(t.startDate, t.endDate)}</div>
      </div>
    </button>
  )
}
