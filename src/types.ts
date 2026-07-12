export type Tier =
  | 'finals'
  | 'major'
  | 'p1'
  | 'p2'
  | 'platinum'
  | 'gold'
  | 'silver'
  | 'bronze'
  | 'team'
  | 'university'

export interface TierMeta {
  label: string
  shortLabel: string
  group: 'premier' | 'fip' | 'other'
  color: string
}

export interface Tournament {
  id: string
  tier: Tier
  name: string
  city: string
  country: string
  countryCode: string | null
  startDate: string // ISO yyyy-mm-dd
  endDate: string // ISO yyyy-mm-dd
  url: string | null // official padelfip.com event page, when known
}

export type TournamentStatus = 'upcoming' | 'live' | 'finished'

export type ViewMode = 'calendar' | 'list'
