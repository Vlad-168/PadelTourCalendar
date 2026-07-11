import type { Tier, TierMeta } from '../types'

export const TIER_META: Record<Tier, TierMeta> = {
  major: { label: 'Premier Padel Major', shortLabel: 'Major', group: 'premier', color: 'tier-major' },
  p1: { label: 'Premier Padel P1', shortLabel: 'P1', group: 'premier', color: 'tier-p1' },
  p2: { label: 'Premier Padel P2', shortLabel: 'P2', group: 'premier', color: 'tier-p2' },
  platinum: { label: 'FIP Platinum', shortLabel: 'Platinum', group: 'fip', color: 'tier-platinum' },
  gold: { label: 'FIP Gold', shortLabel: 'Gold', group: 'fip', color: 'tier-gold' },
  silver: { label: 'FIP Silver', shortLabel: 'Silver', group: 'fip', color: 'tier-silver' },
  bronze: { label: 'FIP Bronze', shortLabel: 'Bronze', group: 'fip', color: 'tier-bronze' },
  team: { label: 'Командный турнир', shortLabel: 'Team', group: 'other', color: 'tier-other' },
  university: { label: 'Студенческий чемпионат', shortLabel: 'University', group: 'other', color: 'tier-other' },
}

export const TIER_ORDER: Tier[] = ['major', 'p1', 'p2', 'platinum', 'gold', 'silver', 'bronze', 'team', 'university']
