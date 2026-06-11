import type { PetId } from '../data/pets';

interface PetArtProps {
  petId: PetId;
  className?: string;
}

export function PetArt({ petId, className = '' }: PetArtProps) {
  return (
    <svg
      className={`pet-art pet-art--${petId} ${className}`.trim()}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {petId === 'cat' && <CatSvg />}
      {petId === 'fish' && <FishSvg />}
      {petId === 'bunny' && <BunnySvg />}
      {petId === 'bird' && <BirdSvg />}
      {petId === 'fox' && <FoxSvg />}
      {petId === 'dog' && <DogSvg />}
      {petId === 'butterfly' && <ButterflySvg />}
    </svg>
  );
}

function CatSvg() {
  return (
    <g className="pet-cat">
      <g className="pet-cat__tail">
        <path d="M 88 72 Q 108 52 104 32" fill="none" stroke="#e17055" strokeWidth="8" strokeLinecap="round" />
      </g>
      <ellipse cx="60" cy="72" rx="30" ry="24" fill="#e17055" />
      <ellipse cx="60" cy="78" rx="18" ry="14" fill="#fab1a0" />
      <g className="pet-cat__head">
        <ellipse cx="60" cy="44" rx="24" ry="22" fill="#e17055" />
        <polygon className="pet-cat__ear pet-cat__ear--left" points="40,32 34,14 48,28" fill="#e17055" />
        <polygon className="pet-cat__ear pet-cat__ear--right" points="80,32 86,14 72,28" fill="#e17055" />
        <ellipse className="pet-cat__eye pet-cat__eye--left" cx="50" cy="44" rx="4" ry="5" fill="#2d3436" />
        <ellipse className="pet-cat__eye pet-cat__eye--right" cx="70" cy="44" rx="4" ry="5" fill="#2d3436" />
        <ellipse cx="60" cy="52" rx="3" ry="2.5" fill="#d63031" />
      </g>
    </g>
  );
}

function FishSvg() {
  return (
    <g className="pet-fish">
      <g className="pet-fish__swim">
        <ellipse cx="60" cy="60" rx="32" ry="20" fill="#00b894" />
        <g className="pet-fish__tail">
          <polygon points="92,60 115,42 115,78" fill="#00cec9" />
        </g>
        <circle cx="38" cy="54" r="5" fill="#fff" />
        <circle cx="37" cy="54" r="2.5" fill="#2d3436" />
      </g>
    </g>
  );
}

function BunnySvg() {
  return (
    <g className="pet-bunny">
      <ellipse cx="60" cy="78" rx="26" ry="22" fill="#f8f9fa" />
      <g className="pet-bunny__head">
        <ellipse cx="60" cy="48" rx="22" ry="18" fill="#f8f9fa" />
        <ellipse className="pet-bunny__ear pet-bunny__ear--left" cx="48" cy="22" rx="6" ry="20" fill="#f8f9fa" />
        <ellipse className="pet-bunny__ear pet-bunny__ear--right" cx="72" cy="22" rx="6" ry="20" fill="#f8f9fa" />
        <ellipse className="pet-bunny__ear-inner pet-bunny__ear-inner--left" cx="48" cy="24" rx="3" ry="14" fill="#fab1a0" />
        <ellipse className="pet-bunny__ear-inner pet-bunny__ear-inner--right" cx="72" cy="24" rx="3" ry="14" fill="#fab1a0" />
        <ellipse cx="54" cy="48" rx="3" ry="4" fill="#2d3436" />
        <ellipse cx="66" cy="48" rx="3" ry="4" fill="#2d3436" />
        <ellipse className="pet-bunny__nose" cx="60" cy="54" rx="3" ry="2.5" fill="#fab1a0" />
      </g>
      <ellipse cx="82" cy="76" rx="8" ry="8" fill="#f8f9fa" />
    </g>
  );
}

function BirdSvg() {
  return (
    <g className="pet-bird">
      <g className="pet-bird__hop">
        <g className="pet-bird__wing pet-bird__wing--left">
          <ellipse cx="42" cy="54" rx="18" ry="9" fill="#74b9ff" transform="rotate(-30 42 54)" />
        </g>
        <g className="pet-bird__wing pet-bird__wing--right">
          <ellipse cx="78" cy="54" rx="18" ry="9" fill="#0984e3" transform="rotate(30 78 54)" />
        </g>
        <ellipse cx="60" cy="62" rx="14" ry="18" fill="#0984e3" />
        <circle cx="60" cy="40" r="14" fill="#0984e3" />
        <circle cx="54" cy="38" r="3" fill="#2d3436" />
        <polygon points="60,44 72,47 60,50" fill="#fdcb6e" />
        <ellipse cx="54" cy="80" rx="2" ry="8" fill="#fdcb6e" />
        <ellipse cx="66" cy="80" rx="2" ry="8" fill="#fdcb6e" />
      </g>
    </g>
  );
}

function FoxSvg() {
  return (
    <g className="pet-fox">
      <ellipse cx="60" cy="76" rx="24" ry="20" fill="#e17055" />
      <ellipse cx="60" cy="82" rx="14" ry="12" fill="#fab1a0" />
      <g className="pet-fox__head">
        <ellipse cx="60" cy="48" rx="20" ry="18" fill="#e17055" />
        <polygon className="pet-fox__ear pet-fox__ear--left" points="44,36 38,18 50,32" fill="#e17055" />
        <polygon className="pet-fox__ear pet-fox__ear--right" points="76,36 82,18 70,32" fill="#e17055" />
        <ellipse cx="60" cy="54" rx="10" ry="8" fill="#fff" />
        <ellipse cx="54" cy="46" rx="3" ry="4" fill="#2d3436" />
        <ellipse cx="66" cy="46" rx="3" ry="4" fill="#2d3436" />
        <ellipse cx="60" cy="52" rx="3" ry="2" fill="#2d3436" />
      </g>
      <g className="pet-fox__tail">
        <ellipse cx="88" cy="72" rx="14" ry="8" fill="#e17055" transform="rotate(30 88 72)" />
        <ellipse cx="94" cy="68" rx="6" ry="5" fill="#fff" />
      </g>
    </g>
  );
}

function DogSvg() {
  return (
    <g className="pet-dog">
      <g className="pet-dog__tail">
        <path d="M 90 68 Q 110 48 106 28" fill="none" stroke="#a66b3a" strokeWidth="7" strokeLinecap="round" />
      </g>
      <ellipse cx="58" cy="72" rx="28" ry="20" fill="#c49a6c" />
      <g className="pet-dog__head">
        <ellipse cx="46" cy="48" rx="20" ry="18" fill="#c49a6c" />
        <ellipse cx="34" cy="54" rx="12" ry="10" fill="#e8c9a0" />
        <ellipse cx="28" cy="52" rx="5" ry="4" fill="#2d3436" />
        <ellipse cx="40" cy="36" rx="8" ry="12" fill="#a66b3a" transform="rotate(-15 40 36)" />
        <ellipse cx="58" cy="34" rx="8" ry="12" fill="#a66b3a" transform="rotate(10 58 34)" />
        <ellipse cx="40" cy="44" rx="3" ry="4" fill="#2d3436" />
        <ellipse cx="52" cy="44" rx="3" ry="4" fill="#2d3436" />
      </g>
      <g className="pet-dog__tongue">
        <ellipse cx="30" cy="60" rx="5" ry="7" fill="#e84393" />
      </g>
    </g>
  );
}

function ButterflySvg() {
  return (
    <g className="pet-butterfly">
      <g className="pet-butterfly__fly">
        <g className="pet-butterfly__wing pet-butterfly__wing--left">
          <ellipse cx="42" cy="54" rx="20" ry="26" fill="#a29bfe" opacity="0.85" />
          <ellipse cx="36" cy="72" rx="12" ry="14" fill="#6c5ce7" opacity="0.7" />
        </g>
        <g className="pet-butterfly__wing pet-butterfly__wing--right">
          <ellipse cx="78" cy="54" rx="20" ry="26" fill="#a29bfe" opacity="0.85" />
          <ellipse cx="84" cy="72" rx="12" ry="14" fill="#6c5ce7" opacity="0.7" />
        </g>
        <ellipse cx="60" cy="60" rx="3" ry="18" fill="#2d3436" />
        <circle cx="60" cy="38" r="5" fill="#2d3436" />
      </g>
    </g>
  );
}
