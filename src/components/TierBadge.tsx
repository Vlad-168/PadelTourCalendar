import type { Tier } from '../types'
import { TIER_META } from '../data/tierMeta'

const CLASSES: Record<Tier, string> = {
  major: 'bg-tier-major/15 text-tier-major border-tier-major/30',
  p1: 'bg-tier-p1/15 text-tier-p1 border-tier-p1/30',
  p2: 'bg-tier-p2/15 text-tier-p2 border-tier-p2/30',
  platinum: 'bg-tier-platinum/15 text-tier-platinum border-tier-platinum/30',
  gold: 'bg-tier-gold/15 text-tier-gold border-tier-gold/30',
  silver: 'bg-tier-silver/15 text-tier-silver border-tier-silver/30',
  bronze: 'bg-tier-bronze/15 text-tier-bronze border-tier-bronze/30',
  team: 'bg-tier-other/15 text-tier-other border-tier-other/30',
  university: 'bg-tier-other/15 text-tier-other border-tier-other/30',
}

export const TIER_DOT_CLASSES: Record<Tier, string> = {
  major: 'bg-tier-major',
  p1: 'bg-tier-p1',
  p2: 'bg-tier-p2',
  platinum: 'bg-tier-platinum',
  gold: 'bg-tier-gold',
  silver: 'bg-tier-silver',
  bronze: 'bg-tier-bronze',
  team: 'bg-tier-other',
  university: 'bg-tier-other',
}

export default function TierBadge({ tier, size = 'sm' }: { tier: Tier; size?: 'sm' | 'md' }) {
  const meta = TIER_META[tier]
  return (
    <span
      className={`inline-flex items-center rounded-full border font-semibold whitespace-nowrap ${CLASSES[tier]} ${
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      }`}
    >
      {meta.shortLabel}
    </span>
  )
}
