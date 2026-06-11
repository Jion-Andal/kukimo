import { useCallback, useState } from 'react';
import { CookieCollection } from './components/CookieCollection';
import { CookieStage } from './components/CookieStage';
import { FortuneStatsModal } from './components/FortuneStatsModal';
import { TAPS_TO_CRACK } from './components/FortuneCookie';
import { FortunePaper } from './components/FortunePaper';
import { Logo } from './components/Logo';
import type { CookieSkinId } from './data/cookieSkins';
import type { PetId } from './data/pets';
import { getRandomFortune, type Fortune } from './data/fortunes';
import { useCookieSkin } from './hooks/useCookieSkin';
import { useCrackedCount } from './hooks/useCrackedCount';
import { useEquippedPet } from './hooks/useEquippedPet';
import { useFortuneStats } from './hooks/useFortuneStats';
import { playCrackSound } from './utils/crackSound';

type Phase = 'cracking' | 'revealed';

export default function App() {
  const { count: crackedCount, increment: incrementCracked } = useCrackedCount();
  const { stats: fortuneStats, total: fortuneTotal, recordFortune } = useFortuneStats();
  const { skinId, selectSkin } = useCookieSkin();
  const { petId: equippedPetId, selectPet } = useEquippedPet();
  const [phase, setPhase] = useState<Phase>('cracking');
  const [taps, setTaps] = useState(0);
  const [fortune, setFortune] = useState<Fortune | null>(null);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  const handleTap = useCallback(() => {
    if (phase !== 'cracking') return;

    const nextTaps = taps + 1;
    const isFinal = nextTaps >= TAPS_TO_CRACK;
    playCrackSound(nextTaps, isFinal);
    setTaps(nextTaps);

    if (isFinal) {
      incrementCracked();
      const nextFortune = getRandomFortune();
      recordFortune(nextFortune.category);
      setFortune(nextFortune);
      setTimeout(() => setPhase('revealed'), 400);
    }
  }, [phase, taps, incrementCracked, recordFortune]);

  const handleNewCookie = useCallback(() => {
    setTaps(0);
    setFortune(null);
    setPhase('cracking');
  }, []);

  const handleSelectSkin = useCallback(
    (id: CookieSkinId) => {
      selectSkin(id, crackedCount);
    },
    [selectSkin, crackedCount],
  );

  const handleSelectPet = useCallback(
    (id: PetId | null) => {
      selectPet(id, fortuneStats);
    },
    [selectPet, fortuneStats],
  );

  return (
    <div className="app">
      <header className="header">
        <Logo size={44} />
        <h1 className="title">Kukimo</h1>
        <p className="subtitle">Tap to crack your fortune</p>
        <p className="cracked-tracker">
          <span className="cracked-tracker__count">{crackedCount}</span>
          {crackedCount === 1 ? ' cookie cracked' : ' cookies cracked'}
        </p>
      </header>

      <main className="main">
        {phase === 'cracking' ? (
          <CookieStage
            skinId={skinId}
            taps={taps}
            cracked={taps >= TAPS_TO_CRACK}
            disabled={false}
            onTap={handleTap}
            equippedPetId={equippedPetId}
            fortuneStats={fortuneStats}
          />
        ) : (
          <FortunePaper
            category={fortune!.category}
            fortune={fortune!.message}
            onNewCookie={handleNewCookie}
          />
        )}
      </main>

      <button
        type="button"
        className="collection-fab"
        onClick={() => setCollectionOpen(true)}
        aria-label="Open upgrades"
      >
        <span className="collection-fab__icon" aria-hidden>
          🍪
        </span>
        Upgrades
      </button>

      <button
        type="button"
        className="collection-fab collection-fab--right"
        onClick={() => setStatsOpen(true)}
        aria-label="Open fortune stats"
      >
        <span className="collection-fab__icon" aria-hidden>
          📊
        </span>
        Fortune Stats
      </button>

      <CookieCollection
        open={collectionOpen}
        onClose={() => setCollectionOpen(false)}
        crackedCount={crackedCount}
        selectedSkinId={skinId}
        onSelectSkin={handleSelectSkin}
        fortuneStats={fortuneStats}
        selectedPetId={equippedPetId}
        onSelectPet={handleSelectPet}
      />

      <FortuneStatsModal
        open={statsOpen}
        onClose={() => setStatsOpen(false)}
        stats={fortuneStats}
        total={fortuneTotal}
      />
    </div>
  );
}
