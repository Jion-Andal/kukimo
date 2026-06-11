interface FortuneCookieIconProps {
  size?: number;
  className?: string;
  cracked?: boolean;
}

const STROKE = '#2D2016';
const MAIN = '#F5B942';
const HIGHLIGHT = '#FFE9A8';

/** Small fortune cookie icon — crescent halves with a paper tab. */
export function FortuneCookieIcon({
  size = 24,
  className = '',
  cracked = false,
}: FortuneCookieIconProps) {
  if (cracked) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`fortune-cookie-icon fortune-cookie-icon--cracked ${className}`.trim()}
        aria-hidden
      >
        <g className="fortune-cookie-icon__half fortune-cookie-icon__half--left" transform="translate(-4 2) rotate(-14 32 38)">
          <path
            d="M 32 22 C 24 23, 10 28, 9 40 C 8 48, 16 54, 24 55 C 28 56, 32 54, 32 48 L 32 22 Z"
            fill={MAIN}
            stroke={STROKE}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M 18 36 C 16 42, 18 48, 22 50 C 23 45, 21 39, 19 36 Z" fill={HIGHLIGHT} />
        </g>
        <g className="fortune-cookie-icon__half fortune-cookie-icon__half--right" transform="translate(4 2) rotate(14 32 38)">
          <path
            d="M 32 22 C 40 23, 54 28, 55 40 C 56 48, 48 54, 40 55 C 36 56, 32 54, 32 48 L 32 22 Z"
            fill={MAIN}
            stroke={STROKE}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M 46 36 C 48 42, 46 48, 42 50 C 41 45, 43 39, 45 36 Z" fill={HIGHLIGHT} />
        </g>
        <g stroke={STROKE} strokeWidth="1.8" strokeLinecap="round" fill="none">
          <path d="M 32 26 L 32 34" />
          <path d="M 32 34 L 28 40" />
          <path d="M 32 34 L 36 40" />
        </g>
        <g transform="translate(24 38) rotate(-8)">
          <rect
            x="0"
            y="0"
            width="16"
            height="6"
            rx="1"
            fill="#FFFEF5"
            stroke={STROKE}
            strokeWidth="1.2"
          />
          <rect x="3" y="2.2" width="8" height="1.5" rx="0.75" fill="#C4B8A8" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`fortune-cookie-icon ${className}`.trim()}
      aria-hidden
    >
      <rect x="30" y="8" width="4" height="14" rx="1" fill="#FFFEF5" stroke={STROKE} strokeWidth="1.2" />
      <path
        d="M 32 22 C 24 23, 10 28, 9 40 C 8 48, 16 54, 24 55 C 28 56, 32 54, 32 48 L 32 22 Z"
        fill={MAIN}
        stroke={STROKE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M 32 22 C 40 23, 54 28, 55 40 C 56 48, 48 54, 40 55 C 36 56, 32 54, 32 48 L 32 22 Z"
        fill={MAIN}
        stroke={STROKE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M 18 36 C 16 42, 18 48, 22 50 C 23 45, 21 39, 19 36 Z" fill={HIGHLIGHT} />
      <path d="M 46 36 C 48 42, 46 48, 42 50 C 41 45, 43 39, 45 36 Z" fill={HIGHLIGHT} />
    </svg>
  );
}
