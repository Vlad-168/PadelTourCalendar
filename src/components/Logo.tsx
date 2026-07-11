export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="40" rx="30" ry="34" fill="#C6F135" />
      <rect x="34" y="68" width="12" height="26" rx="6" fill="#C6F135" />
      <circle cx="78" cy="24" r="12" fill="#2FB8E0" />
    </svg>
  )
}
