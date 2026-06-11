import { useId } from 'react';
import type { CookieSkinId } from '../data/cookieSkins';
import { CookieArt } from './CookieArt';

const TAPS_TO_CRACK = 4;

interface FortuneCookieProps {
  skinId: CookieSkinId;
  taps: number;
  cracked: boolean;
  disabled: boolean;
  onTap: () => void;
}

export function FortuneCookie({ skinId, taps, cracked, disabled, onTap }: FortuneCookieProps) {
  const idPrefix = useId().replace(/:/g, '');

  return (
    <button
      type="button"
      className={`cookie-btn ${cracked ? 'cookie-btn--cracked' : ''}`}
      onClick={onTap}
      disabled={disabled || cracked}
      aria-label={cracked ? 'Cookie cracked' : `Tap to crack cookie, ${TAPS_TO_CRACK - taps} taps remaining`}
    >
      <CookieArt
        skinId={skinId}
        taps={taps}
        cracked={cracked}
        idPrefix={idPrefix}
        className="cookie-svg"
      />

      {!cracked && taps < TAPS_TO_CRACK && (
        <p className="tap-hint">
          Tap to crack {!disabled && <span className="tap-dots">{'.'.repeat(taps + 1)}</span>}
        </p>
      )}
    </button>
  );
}

export { TAPS_TO_CRACK };
