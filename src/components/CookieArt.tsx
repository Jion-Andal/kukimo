import type { CookieSkinId } from '../data/cookieSkins';

interface CookieArtProps {
  skinId: CookieSkinId;
  taps?: number;
  cracked?: boolean;
  idPrefix?: string;
  className?: string;
}

/** Top arc where hats sit on the cookie head */
const HEAD_BAND = 'M 78 52 Q 110 44 142 52';

export function CookieArt({
  skinId,
  taps = 0,
  cracked = false,
  idPrefix = 'cookie',
  className = '',
}: CookieArtProps) {
  const crackOpacity = (stage: number) => (taps >= stage ? 1 : 0);
  const isGold = skinId === 'gold';

  const leftGrad = `${idPrefix}-left`;
  const rightGrad = `${idPrefix}-right`;
  const goldShine = `${idPrefix}-gold-shine`;
  const clipLeft = `${idPrefix}-clip-left`;
  const clipRight = `${idPrefix}-clip-right`;

  const leftFill = isGold ? `url(#${goldShine})` : `url(#${leftGrad})`;
  const rightFill = isGold ? `url(#${goldShine})` : `url(#${rightGrad})`;
  const strokeColor = isGold ? '#B8860B' : '#A66B28';

  const leftHalfClass = `cookie-half cookie-half--left${cracked ? ' cookie-half--split' : ''}`;
  const rightHalfClass = `cookie-half cookie-half--right${cracked ? ' cookie-half--split' : ''}`;

  return (
    <svg
      className={`cookie-art ${isGold ? 'cookie-art--gold' : ''} ${className}`.trim()}
      viewBox="0 0 220 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={leftGrad} x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#EDBF5E" />
          <stop offset="100%" stopColor="#C9923A" />
        </linearGradient>
        <linearGradient id={rightGrad} x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#E5B24E" />
          <stop offset="100%" stopColor="#BF8530" />
        </linearGradient>
        <linearGradient id={goldShine} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF4A3" />
          <stop offset="35%" stopColor="#FFD700" />
          <stop offset="70%" stopColor="#F5C842" />
          <stop offset="100%" stopColor="#D4A017" />
        </linearGradient>
        <clipPath id={clipLeft}>
          <rect x="0" y="0" width="110" height="200" />
        </clipPath>
        <clipPath id={clipRight}>
          <rect x="110" y="0" width="110" height="200" />
        </clipPath>
      </defs>

      <ellipse cx="110" cy="178" rx="72" ry="8" fill="#8B5A2B" opacity="0.12" />

      {!cracked && (
        <g className="fortune-slip-peek">
          <rect x="103" y="18" width="14" height="36" rx="2" fill="#FFFEF5" stroke="#E8DFC8" strokeWidth="1" />
          <line x1="106" y1="26" x2="114" y2="26" stroke="#E0D5BC" strokeWidth="1" />
          <line x1="106" y1="32" x2="114" y2="32" stroke="#E0D5BC" strokeWidth="1" />
          <line x1="106" y1="38" x2="112" y2="38" stroke="#E0D5BC" strokeWidth="1" />
        </g>
      )}

      <g className={leftHalfClass}>
        <path
          d="M110 48 C 82 50, 28 72, 22 118 C 18 148, 48 172, 82 176 C 98 178, 110 172, 110 155 L 110 48 Z"
          fill={leftFill}
          stroke={strokeColor}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <g className="crack-lines" stroke="#7A4E20" strokeWidth="2.5" strokeLinecap="round" fill="none">
          <path d="M110 84 L110 100" style={{ opacity: crackOpacity(1) }} />
          <path d="M110 100 L94 118" style={{ opacity: crackOpacity(2) }} />
          <path d="M94 118 L110 128" style={{ opacity: crackOpacity(4) }} />
        </g>
        {skinId === 'gold' && <GoldNecklaceLeft />}
        {skinId === 'cap' && (
          <g clipPath={`url(#${clipLeft})`}>
            <CapWorn />
          </g>
        )}
        {skinId === 'fedora' && (
          <g clipPath={`url(#${clipLeft})`}>
            <FedoraWorn />
          </g>
        )}
        {skinId === 'cool' && <SunglassesLeft />}
        {skinId === 'angry' && (
          <g clipPath={`url(#${clipLeft})`}>
            <AngryFaceWorn />
          </g>
        )}
        {skinId === 'king' && (
          <g clipPath={`url(#${clipLeft})`}>
            <CrownWorn />
          </g>
        )}
        {isGold && <GoldSparklesLeft />}
        {!cracked && taps === 0 && (
          <g clipPath={`url(#${clipLeft})`}>
            <CenterHighlight strokeColor={isGold ? '#D4A017' : '#B87830'} />
          </g>
        )}
      </g>

      <g className={rightHalfClass}>
        <path
          d="M110 48 C 138 50, 192 72, 198 118 C 202 148, 172 172, 138 176 C 122 178, 110 172, 110 155 L 110 48 Z"
          fill={rightFill}
          stroke={strokeColor}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <g className="crack-lines" stroke="#7A4E20" strokeWidth="2.5" strokeLinecap="round" fill="none">
          <path d="M110 84 L110 100" style={{ opacity: crackOpacity(1) }} />
          <path d="M110 100 L126 118" style={{ opacity: crackOpacity(3) }} />
          <path d="M126 118 L110 128" style={{ opacity: crackOpacity(4) }} />
        </g>
        {skinId === 'gold' && <GoldNecklaceRight />}
        {skinId === 'cap' && (
          <g clipPath={`url(#${clipRight})`}>
            <CapWorn />
          </g>
        )}
        {skinId === 'fedora' && (
          <g clipPath={`url(#${clipRight})`}>
            <FedoraWorn />
          </g>
        )}
        {skinId === 'cool' && <SunglassesRight />}
        {skinId === 'angry' && (
          <g clipPath={`url(#${clipRight})`}>
            <AngryFaceWorn />
          </g>
        )}
        {skinId === 'king' && (
          <g clipPath={`url(#${clipRight})`}>
            <CrownWorn />
          </g>
        )}
        {isGold && <GoldSparklesRight />}
        {!cracked && taps === 0 && (
          <g clipPath={`url(#${clipRight})`}>
            <CenterHighlight strokeColor={isGold ? '#D4A017' : '#B87830'} />
          </g>
        )}
      </g>
    </svg>
  );
}

function CenterHighlight({ strokeColor }: { strokeColor: string }) {
  return (
    <path
      d="M110 48 C 108 56, 107 68, 110 155"
      fill="none"
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.45"
    />
  );
}

/** Head band helper — wraps the cookie's top curve */
function HeadBand({ color, width = 5 }: { color: string; width?: number }) {
  return (
    <path
      d={HEAD_BAND}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
    />
  );
}

function CapWorn() {
  return (
    <g className="skin-cap">
      <HeadBand color="#1D4ED8" width={5} />
      <ellipse cx="110" cy="50" rx="34" ry="7" fill="#1E3A5F" stroke="#152A45" strokeWidth="1.5" />
      <path
        d="M84 50 C 84 32, 96 22, 110 20 C 124 22, 136 32, 136 50 Z"
        fill="#2563EB"
        stroke="#1D4ED8"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </g>
  );
}

function FedoraWorn() {
  return (
    <g className="skin-fedora">
      <HeadBand color="#3D2914" width={4} />
      <ellipse cx="110" cy="50" rx="38" ry="6" fill="#3D2914" stroke="#2A1D0E" strokeWidth="1.5" />
      <path
        d="M88 50 C 88 30, 98 18, 110 16 C 122 18, 132 30, 132 50 Z"
        fill="#5C4033"
        stroke="#3D2914"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M88 48 Q 110 52 132 48" fill="none" stroke="#4A3228" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function SunglassesLeft() {
  return (
    <g className="skin-sunglasses">
      <path d="M106 100 Q 110 98 114 100" stroke="#333" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path
        d="M76 96 Q 92 92 108 96 L 108 112 Q 92 116 76 112 Z"
        fill="#111"
        stroke="#333"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M76 104 L68 102" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      <path d="M82 100 L88 100 L86 106 L80 106 Z" fill="#FFF" opacity="0.25" />
    </g>
  );
}

function SunglassesRight() {
  return (
    <g className="skin-sunglasses">
      <path d="M106 100 Q 110 98 114 100" stroke="#333" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path
        d="M112 96 Q 128 92 144 96 L 144 112 Q 128 116 112 112 Z"
        fill="#111"
        stroke="#333"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M144 104 L152 102" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      <path d="M132 100 L138 100 L136 106 L130 106 Z" fill="#FFF" opacity="0.25" />
    </g>
  );
}

function AngryFaceWorn() {
  return (
    <g className="skin-angry">
      <path
        d="M72 88 Q 110 82 148 88 L 145 98 Q 110 94 75 98 Z"
        fill="#E57373"
        opacity="0.25"
      />
      <path d="M84 90 L96 96" stroke="#4A3728" strokeWidth="3" strokeLinecap="round" />
      <path d="M136 90 L124 96" stroke="#4A3728" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="92" cy="102" rx="4" ry="5" fill="#4A3728" />
      <ellipse cx="128" cy="102" rx="4" ry="5" fill="#4A3728" />
      <path d="M90 118 Q110 110 130 118" fill="none" stroke="#4A3728" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M110 118 L110 124" stroke="#4A3728" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function CrownWorn() {
  return (
    <g className="skin-crown">
      <path
        d="M 88 50 L 133 50 L 130 54 L 91 54 Z"
        fill="#D4AF37"
        stroke="#B8860B"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M 91 50 L 97 36 L 105 44 L 110 28 L 115 44 L 123 36 L 129 50 Z"
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="110" cy="38" r="2.2" fill="#FFF8DC" />
    </g>
  );
}

function GoldNecklaceLeft() {
  return (
    <g className="skin-gold-necklace">
      <ellipse cx="78" cy="78" rx="5" ry="3" fill="#FFD700" stroke="#B8860B" strokeWidth="1.2" transform="rotate(-15 78 78)" />
      <ellipse cx="94" cy="82" rx="5" ry="3" fill="#FFD700" stroke="#B8860B" strokeWidth="1.2" transform="rotate(-5 94 82)" />
      <ellipse cx="110" cy="84" rx="5" ry="3" fill="#FFD700" stroke="#B8860B" strokeWidth="1.2" />
      <circle cx="110" cy="92" r="7" fill="#FFD700" stroke="#B8860B" strokeWidth="1.5" />
    </g>
  );
}

function GoldNecklaceRight() {
  return (
    <g className="skin-gold-necklace">
      <ellipse cx="110" cy="84" rx="5" ry="3" fill="#FFD700" stroke="#B8860B" strokeWidth="1.2" />
      <ellipse cx="126" cy="82" rx="5" ry="3" fill="#FFD700" stroke="#B8860B" strokeWidth="1.2" transform="rotate(5 126 82)" />
      <ellipse cx="142" cy="78" rx="5" ry="3" fill="#FFD700" stroke="#B8860B" strokeWidth="1.2" transform="rotate(15 142 78)" />
      <circle cx="110" cy="92" r="7" fill="#FFD700" stroke="#B8860B" strokeWidth="1.5" />
    </g>
  );
}

function GoldSparklesLeft() {
  return (
    <g className="gold-sparkles">
      <path d="M48 70 L50 74 L54 76 L50 78 L48 82 L46 78 L42 76 L46 74 Z" fill="#FFF8DC" opacity="0.8" />
    </g>
  );
}

function GoldSparklesRight() {
  return (
    <g className="gold-sparkles">
      <path d="M168 55 L169 58 L172 59 L169 60 L168 63 L167 60 L164 59 L167 58 Z" fill="#FFF8DC" opacity="0.7" />
      <path d="M185 130 L186 133 L189 134 L186 135 L185 138 L184 135 L181 134 L184 133 Z" fill="#FFF8DC" opacity="0.6" />
    </g>
  );
}
