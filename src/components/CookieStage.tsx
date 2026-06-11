import type { CookieSkinId } from '../data/cookieSkins';
import { isPetUnlocked, type PetId } from '../data/pets';
import type { FortuneStats } from '../hooks/useFortuneStats';
import { FortuneCookie } from './FortuneCookie';
import { PetArt } from './PetArt';

interface CookieStageProps {
  skinId: CookieSkinId;
  taps: number;
  cracked: boolean;
  disabled: boolean;
  onTap: () => void;
  equippedPetId: PetId | null;
  fortuneStats: FortuneStats;
}

export function CookieStage({
  skinId,
  taps,
  cracked,
  disabled,
  onTap,
  equippedPetId,
  fortuneStats,
}: CookieStageProps) {
  const showPet =
    equippedPetId !== null && isPetUnlocked(equippedPetId, fortuneStats);

  return (
    <div className="cookie-stage">
      <FortuneCookie
        skinId={skinId}
        taps={taps}
        cracked={cracked}
        disabled={disabled}
        onTap={onTap}
      />
      {showPet && (
        <div className="cookie-stage__pet" aria-hidden>
          <PetArt petId={equippedPetId} className="cookie-stage__pet-art" />
        </div>
      )}
    </div>
  );
}
