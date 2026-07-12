export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="24" fill="#0B1220" />
      <circle cx="76" cy="26" r="10" fill="#2FB8E0" />
      <text
        x="46"
        y="68"
        textAnchor="middle"
        fontFamily="-apple-system, 'SF Pro Display', Arial, sans-serif"
        fontWeight="800"
        fontSize="38"
        letterSpacing="-1.5"
        fill="#C6F135"
      >
        FIP
      </text>
    </svg>
  )
}
