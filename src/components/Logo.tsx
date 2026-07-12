export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* calendar rings */}
      <rect x="26" y="6" width="10" height="22" rx="5" fill="#0B1220" />
      <rect x="64" y="6" width="10" height="22" rx="5" fill="#0B1220" />

      {/* calendar body */}
      <rect x="8" y="30" width="84" height="64" rx="14" fill="#182238" />

      {/* day grid */}
      <rect x="22" y="58" width="12" height="12" rx="3" fill="#233252" />
      <rect x="44" y="58" width="12" height="12" rx="3" fill="#2FB8E0" />
      <rect x="66" y="58" width="12" height="12" rx="3" fill="#233252" />
      <rect x="22" y="76" width="12" height="12" rx="3" fill="#233252" />
      <rect x="44" y="76" width="12" height="12" rx="3" fill="#233252" />
      <rect x="66" y="76" width="12" height="12" rx="3" fill="#233252" />

      {/* FIP ribbon on top */}
      <rect x="6" y="22" width="88" height="22" rx="8" fill="#C6F135" />
      <text
        x="50"
        y="38"
        textAnchor="middle"
        fontFamily="-apple-system, 'SF Pro Display', Arial, sans-serif"
        fontWeight="800"
        fontSize="17"
        letterSpacing="-0.5"
        fill="#0B1220"
      >
        FIP
      </text>
    </svg>
  )
}
