import type { CookieSkinId } from '../data/cookieSkins';

interface CookieArtProps {
  skinId: CookieSkinId;
  taps?: number;
  cracked?: boolean;
  idPrefix?: string;
  className?: string;
}

const COOKIE_MAIN = '#F5B942';
const COOKIE_SHADOW = '#D4922A';
const COOKIE_HIGHLIGHT = '#FFE9A8';
const COOKIE_STROKE = '#2D2016';
const STROKE_W = 4.5;

/** Arc along the pinched top where hats sit */
const HEAD_BAND = 'M 72 46 Q 110 34 148 46';

/** Classic crescent — pinched top, wide curved wings, rounded bottom corners */
const LEFT_HALF =
  'M 110 40 C 94 42, 40 62, 28 106 C 22 136, 36 164, 66 176 C 86 182, 102 172, 108 144 C 112 114, 110 72, 110 40 Z';

const RIGHT_HALF =
  'M 110 40 C 126 42, 180 62, 192 106 C 198 136, 184 164, 154 176 C 134 182, 118 172, 112 144 C 108 114, 110 72, 110 40 Z';

/** Rear fold peeking behind the upper-right */
const BACK_FOLD =
  'M 116 42 C 142 40, 172 56, 180 86 C 183 106, 168 122, 146 118 C 128 114, 116 92, 116 66 Z';

/** Inner cavity at the top pinch */
const PINCH_SHADOW =
  'M 110 40 C 102 54, 104 82, 110 104 C 116 82, 118 54, 110 40 Z';

export function CookieArt({
  skinId,
  taps = 0,
  cracked = false,
  idPrefix = 'cookie',
  className = '',
}: CookieArtProps) {
  const crackOpacity = (stage: number) => (taps >= stage ? 1 : 0);
  const isGold = skinId === 'gold';
  const isAngel = skinId === 'angel';

  const clipLeft = `${idPrefix}-clip-left`;
  const clipRight = `${idPrefix}-clip-right`;

  const mainFill = isGold ? '#FFD700' : COOKIE_MAIN;
  const shadowFill = isGold ? '#D4A010' : COOKIE_SHADOW;

  const leftHalfClass = `cookie-half cookie-half--left${cracked ? ' cookie-half--split' : ''}`;
  const rightHalfClass = `cookie-half cookie-half--right${cracked ? ' cookie-half--split' : ''}`;

  return (
    <svg
      className={`cookie-art ${isGold ? 'cookie-art--gold' : ''} ${isAngel ? 'cookie-art--angel' : ''} ${className}`.trim()}
      viewBox="0 0 220 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <clipPath id={clipLeft}>
          <rect x="0" y="0" width="110" height="200" />
        </clipPath>
        <clipPath id={clipRight}>
          <rect x="110" y="0" width="110" height="200" />
        </clipPath>
      </defs>

      <ellipse cx="110" cy="182" rx="62" ry="6" fill="#2D2016" opacity="0.08" />

      {isAngel && !cracked && <AngelWings />}

      {!cracked && (
        <path
          d={BACK_FOLD}
          fill={shadowFill}
          stroke={COOKIE_STROKE}
          strokeWidth={STROKE_W}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      )}

      {!cracked && (
        <g className="fortune-slip-peek">
          <g transform="translate(30 78) rotate(-28)">
            <rect
              x="0"
              y="0"
              width="38"
              height="14"
              rx="2"
              fill="#FFFEF5"
              stroke={COOKIE_STROKE}
              strokeWidth="2.5"
            />
            <rect x="10" y="5" width="16" height="3" rx="1.5" fill="#C4B8A8" />
          </g>
        </g>
      )}

      <g className={leftHalfClass}>
        <path
          d={LEFT_HALF}
          fill={mainFill}
          stroke={COOKIE_STROKE}
          strokeWidth={STROKE_W}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {!cracked && <path d={PINCH_SHADOW} fill={shadowFill} stroke="none" clipPath={`url(#${clipLeft})`} />}
        <path
          d="M 46 78 C 36 100, 38 132, 54 158 C 62 142, 58 102, 50 82 Z"
          fill={COOKIE_HIGHLIGHT}
          stroke="none"
        />
        <g className="crack-lines" stroke={COOKIE_STROKE} strokeWidth="2.5" strokeLinecap="round" fill="none">
          <path d="M 110 80 L 110 96" style={{ opacity: crackOpacity(1) }} />
          <path d="M 110 96 L 98 112" style={{ opacity: crackOpacity(2) }} />
          <path d="M 98 112 L 110 126" style={{ opacity: crackOpacity(4) }} />
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
      </g>

      <g className={rightHalfClass}>
        <path
          d={RIGHT_HALF}
          fill={mainFill}
          stroke={COOKIE_STROKE}
          strokeWidth={STROKE_W}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {!cracked && <path d={PINCH_SHADOW} fill={shadowFill} stroke="none" clipPath={`url(#${clipRight})`} />}
        <path
          d="M 174 78 C 184 100, 182 132, 166 158 C 158 142, 162 102, 170 82 Z"
          fill={COOKIE_HIGHLIGHT}
          stroke="none"
        />
        <g className="crack-lines" stroke={COOKIE_STROKE} strokeWidth="2.5" strokeLinecap="round" fill="none">
          <path d="M 110 80 L 110 96" style={{ opacity: crackOpacity(1) }} />
          <path d="M 110 96 L 122 112" style={{ opacity: crackOpacity(3) }} />
          <path d="M 122 112 L 110 126" style={{ opacity: crackOpacity(4) }} />
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
      </g>

      {isAngel && !cracked && <AngelHalo />}
    </svg>
  );
}

function HeadBand({ color, width = 5 }: { color: string; width?: number }) {
  return (
    <path d={HEAD_BAND} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" />
  );
}

function CapWorn() {
  return (
    <g className="skin-cap">
      <HeadBand color="#1D4ED8" width={5} />
      <ellipse cx="110" cy="48" rx="36" ry="7" fill="#1E3A5F" stroke={COOKIE_STROKE} strokeWidth="2" />
      <path
        d="M 82 48 C 82 28, 96 18, 110 16 C 124 18, 138 28, 138 48 Z"
        fill="#2563EB"
        stroke={COOKIE_STROKE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </g>
  );
}

function FedoraWorn() {
  return (
    <g className="skin-fedora">
      <HeadBand color="#3D2914" width={4} />
      <ellipse cx="110" cy="48" rx="40" ry="6" fill="#3D2914" stroke={COOKIE_STROKE} strokeWidth="2" />
      <path
        d="M 86 48 C 86 28, 98 16, 110 14 C 122 16, 134 28, 134 48 Z"
        fill="#5C4033"
        stroke={COOKIE_STROKE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M 86 46 Q 110 50 134 46" fill="none" stroke="#4A3228" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function SunglassesLeft() {
  return (
    <g className="skin-sunglasses">
      <path d="M 106 108 Q 110 106 114 108" stroke={COOKIE_STROKE} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path
        d="M 74 104 Q 92 100 108 104 L 108 120 Q 92 124 74 120 Z"
        fill="#111"
        stroke={COOKIE_STROKE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M 74 112 L 64 110" stroke={COOKIE_STROKE} strokeWidth="2" strokeLinecap="round" />
      <path d="M 80 108 L 86 108 L 84 114 L 78 114 Z" fill="#FFF" opacity="0.3" />
    </g>
  );
}

function SunglassesRight() {
  return (
    <g className="skin-sunglasses">
      <path d="M 106 108 Q 110 106 114 108" stroke={COOKIE_STROKE} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path
        d="M 112 104 Q 128 100 146 104 L 146 120 Q 128 124 112 120 Z"
        fill="#111"
        stroke={COOKIE_STROKE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M 146 112 L 156 110" stroke={COOKIE_STROKE} strokeWidth="2" strokeLinecap="round" />
      <path d="M 134 108 L 140 108 L 138 114 L 132 114 Z" fill="#FFF" opacity="0.3" />
    </g>
  );
}

function AngryFaceWorn() {
  return (
    <g className="skin-angry">
      <path d="M 68 96 Q 110 90 152 96 L 149 106 Q 110 102 71 106 Z" fill="#E57373" opacity="0.3" />
      <path d="M 80 98 L 92 104" stroke={COOKIE_STROKE} strokeWidth="3" strokeLinecap="round" />
      <path d="M 140 98 L 128 104" stroke={COOKIE_STROKE} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="88" cy="110" rx="4" ry="5" fill={COOKIE_STROKE} />
      <ellipse cx="132" cy="110" rx="4" ry="5" fill={COOKIE_STROKE} />
      <path d="M 86 126 Q 110 118 134 126" fill="none" stroke={COOKIE_STROKE} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 110 126 L 110 132" stroke={COOKIE_STROKE} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function CrownWorn() {
  return (
    <g className="skin-crown">
      <path
        d="M 84 48 L 136 48 L 133 52 L 87 52 Z"
        fill="#D4AF37"
        stroke={COOKIE_STROKE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M 87 48 L 93 32 L 102 42 L 110 24 L 118 42 L 127 32 L 133 48 Z"
        fill="#FFD700"
        stroke={COOKIE_STROKE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="110" cy="34" r="2.5" fill="#FFF8DC" stroke={COOKIE_STROKE} strokeWidth="1" />
    </g>
  );
}

function GoldNecklaceLeft() {
  return (
    <g className="skin-gold-necklace">
      <ellipse cx="74" cy="118" rx="5" ry="3" fill="#FFD700" stroke={COOKIE_STROKE} strokeWidth="1.2" transform="rotate(-15 74 118)" />
      <ellipse cx="92" cy="122" rx="5" ry="3" fill="#FFD700" stroke={COOKIE_STROKE} strokeWidth="1.2" transform="rotate(-5 92 122)" />
      <ellipse cx="110" cy="124" rx="5" ry="3" fill="#FFD700" stroke={COOKIE_STROKE} strokeWidth="1.2" />
      <circle cx="110" cy="132" r="7" fill="#FFD700" stroke={COOKIE_STROKE} strokeWidth="1.5" />
    </g>
  );
}

function GoldNecklaceRight() {
  return (
    <g className="skin-gold-necklace">
      <ellipse cx="110" cy="124" rx="5" ry="3" fill="#FFD700" stroke={COOKIE_STROKE} strokeWidth="1.2" />
      <ellipse cx="128" cy="122" rx="5" ry="3" fill="#FFD700" stroke={COOKIE_STROKE} strokeWidth="1.2" transform="rotate(5 128 122)" />
      <ellipse cx="146" cy="118" rx="5" ry="3" fill="#FFD700" stroke={COOKIE_STROKE} strokeWidth="1.2" transform="rotate(15 146 118)" />
      <circle cx="110" cy="132" r="7" fill="#FFD700" stroke={COOKIE_STROKE} strokeWidth="1.5" />
    </g>
  );
}

function GoldSparklesLeft() {
  return (
    <g className="gold-sparkles">
      <path d="M 44 84 L 46 88 L 50 90 L 46 92 L 44 96 L 42 92 L 38 90 L 42 88 Z" fill="#FFF8DC" opacity="0.85" />
    </g>
  );
}

function GoldSparklesRight() {
  return (
    <g className="gold-sparkles">
      <path d="M 168 68 L 169 71 L 172 72 L 169 73 L 168 76 L 167 73 L 164 72 L 167 71 Z" fill="#FFF8DC" opacity="0.75" />
      <path d="M 182 144 L 183 147 L 186 148 L 183 149 L 182 152 L 181 149 L 178 148 L 181 147 Z" fill="#FFF8DC" opacity="0.65" />
    </g>
  );
}

function AngelWings() {
  return (
    <g className="skin-angel-wings">
      <g className="skin-angel-wing skin-angel-wing--left">
        <path
          d="M 98 98 C 72 82, 38 68, 18 88 C 8 102, 14 122, 32 132 C 48 140, 68 128, 82 112 C 90 104, 96 100, 98 98 Z"
          fill="#FFFEF8"
          stroke={COOKIE_STROKE}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M 94 100 C 70 88, 44 82, 28 96"
          fill="none"
          stroke="#E8E0D0"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 88 108 C 62 102, 40 108, 30 118"
          fill="none"
          stroke="#E8E0D0"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <g className="skin-angel-wing skin-angel-wing--right">
        <path
          d="M 122 98 C 148 82, 182 68, 202 88 C 212 102, 206 122, 188 132 C 172 140, 152 128, 138 112 C 130 104, 124 100, 122 98 Z"
          fill="#FFFEF8"
          stroke={COOKIE_STROKE}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M 126 100 C 150 88, 176 82, 192 96"
          fill="none"
          stroke="#E8E0D0"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 132 108 C 158 102, 180 108, 190 118"
          fill="none"
          stroke="#E8E0D0"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </g>
  );
}

function AngelHalo() {
  return (
    <g className="skin-angel-halo">
      <ellipse cx="110" cy="20" rx="30" ry="9" fill="#FFD700" opacity="0.18" />
      <ellipse
        cx="110"
        cy="20"
        rx="30"
        ry="9"
        fill="none"
        stroke="#FFD700"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <ellipse cx="110" cy="20" rx="30" ry="9" fill="none" stroke="#FFF8DC" strokeWidth="1.5" opacity="0.7" />
    </g>
  );
}
