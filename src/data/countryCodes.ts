// Maps the country label used in tournament data to an ISO 3166-1 alpha-2
// code, used to render a flag emoji. Kept separate from tournaments.ts so
// new countries can be added without touching the tournament list.
export const COUNTRY_CODES: Record<string, string> = {
  Australia: 'AU',
  France: 'FR',
  Spain: 'ES',
  India: 'IN',
  Qatar: 'QA',
  Chile: 'CL',
  Portugal: 'PT',
  Bahrain: 'BH',
  'Saudi Arabia': 'SA',
  Egypt: 'EG',
  UAE: 'AE',
  Morocco: 'MA',
  Finland: 'FI',
  Italy: 'IT',
  Netherlands: 'NL',
  Brazil: 'BR',
  Singapore: 'SG',
  Philippines: 'PH',
  'Hong Kong': 'HK',
  Mexico: 'MX',
  Sweden: 'SE',
  Kenya: 'KE',
  Lithuania: 'LT',
  'United States': 'US',
  Kazakhstan: 'KZ',
  Azerbaijan: 'AZ',
  'Ivory Coast': 'CI',
  Cyprus: 'CY',
  Argentina: 'AR',
  Kosovo: 'XK',
  Denmark: 'DK',
  Thailand: 'TH',
  England: 'GB',
  'Northern Ireland': 'GB',
  Slovakia: 'SK',
  Romania: 'RO',
  Poland: 'PL',
  Indonesia: 'ID',
  Albania: 'AL',
  Malta: 'MT',
  China: 'CN',
  Germany: 'DE',
  Turkey: 'TR',
  Senegal: 'SN',
  Slovenia: 'SI',
  Japan: 'JP',
  Belgium: 'BE',
  Georgia: 'GE',
  Hungary: 'HU',
  Ireland: 'IE',
  'South Africa': 'ZA',
  'United Kingdom': 'GB',
  Kuwait: 'KW',
  Paraguay: 'PY',
  Malaysia: 'MY',
  Norway: 'NO',
}

export function flagEmoji(country: string): string {
  const code = COUNTRY_CODES[country]
  if (!code) return '🏳️'
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
}
