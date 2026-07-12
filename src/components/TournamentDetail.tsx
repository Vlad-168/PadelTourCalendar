import { CalendarPlus, ExternalLink, MapPin } from 'lucide-react'
import type { Tournament } from '../types'
import TierBadge from './TierBadge'
import StatusBadge from './StatusBadge'
import { TIER_META } from '../data/tierMeta'
import { flagEmoji } from '../data/countryCodes'
import { formatDateRange, getStatus } from '../utils/date'
import { downloadTournamentICS } from '../utils/ics'

export default function TournamentDetail({ t }: { t: Tournament }) {
  const status = getStatus(t)

  return (
    <div className="p-4 space-y-5 fade-slide-up">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <TierBadge tier={t.tier} size="md" />
          <StatusBadge status={status} />
        </div>
        <h1 className="text-xl font-bold text-primary leading-tight">{t.name}</h1>
        <div className="text-secondary text-sm mt-1">{TIER_META[t.tier].label}</div>
      </div>

      <div className="glass p-4 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl leading-none">{flagEmoji(t.country)}</span>
          <div>
            <div className="text-primary text-sm font-medium flex items-center gap-1">
              <MapPin size={13} className="text-secondary" />
              {t.city}, {t.country}
            </div>
          </div>
        </div>
        <div className="h-px bg-muted" />
        <div>
          <div className="text-secondary text-xs mb-0.5">Dates</div>
          <div className="text-primary text-sm font-medium">{formatDateRange(t.startDate, t.endDate)}</div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => downloadTournamentICS(t)}
          className="press flex items-center justify-center gap-2 bg-accent text-base font-semibold text-sm py-3 rounded-2xl"
        >
          <CalendarPlus size={16} />
          Add to calendar
        </button>
        <a
          href={t.url ?? 'https://www.padelfip.com/calendar/'}
          target="_blank"
          rel="noopener noreferrer"
          className="press flex items-center justify-center gap-2 glass text-primary font-semibold text-sm py-3 rounded-2xl"
        >
          <ExternalLink size={16} />
          {t.url ? 'Official tournament page' : 'Official FIP calendar'}
        </a>
      </div>
    </div>
  )
}
