export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M 36 14 C 44 12, 52 18, 54 26 C 55 32, 50 38, 44 38 C 40 38, 36 32, 36 24 Z"
        fill="#D4922A"
        stroke="#2D2016"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <g transform="translate(14 30) rotate(-28)">
        <rect x="0" y="0" width="14" height="5" rx="1" fill="#FFFEF5" stroke="#2D2016" strokeWidth="1.2" />
      </g>
      <path
        d="M 32 16 C 22 16, 14 24, 12 34 C 10 44, 16 52, 24 56 C 28 58, 30 54, 32 46 C 34 54, 36 58, 40 56 C 48 52, 54 44, 52 34 C 50 24, 42 16, 32 16 Z"
        fill="#F5B942"
        stroke="#2D2016"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M 20 30 C 18 36, 20 44, 24 48 C 26 42, 24 34, 22 30 Z" fill="#FFE9A8" />
      <path d="M 44 30 C 46 36, 44 44, 40 48 C 38 42, 40 34, 42 30 Z" fill="#FFE9A8" />
    </svg>
  );
}
