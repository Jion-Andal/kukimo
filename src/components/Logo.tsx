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
      <defs>
        <linearGradient id="logoCookie" x1="30%" y1="10%" x2="70%" y2="90%">
          <stop offset="0%" stopColor="#FBE8A8" />
          <stop offset="50%" stopColor="#EDBF5E" />
          <stop offset="100%" stopColor="#C9923A" />
        </linearGradient>
      </defs>
      <rect x="30" y="10" width="4" height="12" rx="1" fill="#FFFEF5" stroke="#E8DFC8" strokeWidth="0.5" />
      <path
        d="M32 22
           C 24 23, 10 28, 9 40
           C 8 48, 16 54, 24 55
           C 28 56, 32 54, 32 48
           L 32 22 Z"
        fill="url(#logoCookie)"
        stroke="#A66B28"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M32 22
           C 40 23, 54 28, 55 40
           C 56 48, 48 54, 40 55
           C 36 56, 32 54, 32 48
           L 32 22 Z"
        fill="url(#logoCookie)"
        stroke="#A66B28"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M32 22 C 31 26, 31 32, 32 48"
        fill="none"
        stroke="#B87830"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
