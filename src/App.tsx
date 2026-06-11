import { useCallback, useEffect, useState } from 'react';
import { CookieCollection } from './components/CookieCollection';
import { CookieStage } from './components/CookieStage';
import { DailyLimitReached } from './components/DailyLimitReached';
import { FortuneCookieIcon } from './components/FortuneCookieIcon';
import { FortuneStatsModal } from './components/FortuneStatsModal';
import { TAPS_TO_CRACK } from './components/FortuneCookie';
import { FortunePaper } from './components/FortunePaper';
import { Logo } from './components/Logo';
import type { CookieSkinId } from './data/cookieSkins';
import type { PetId } from './data/pets';
import { getRandomFortune, type Fortune } from './data/fortunes';
import { useCookieSkin } from './hooks/useCookieSkin';
import { useCrackedCount } from './hooks/useCrackedCount';
import { useDailyCookie } from './hooks/useDailyCookie';
import { useEquippedPet } from './hooks/useEquippedPet';
import { useFortuneStats } from './hooks/useFortuneStats';
import { playCrackSound } from './utils/crackSound';

type Phase = 'cracking' | 'revealed';

export default function App() {
  const { count: crackedCount, increment: incrementCracked } = useCrackedCount();
  const { canCrackToday, todayFortune, recordDailyCrack, refreshIn } = useDailyCookie();
  const { stats: fortuneStats, total: fortuneTotal, recordFortune } = useFortuneStats();
  const { skinId, selectSkin } = useCookieSkin();
  const { petId: equippedPetId, selectPet } = useEquippedPet();
  const [phase, setPhase] = useState<Phase>(() => (todayFortune ? 'revealed' : 'cracking'));
  const [taps, setTaps] = useState(0);
  const [fortune, setFortune] = useState<Fortune | null>(() => todayFortune);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  const activeFortune = fortune ?? todayFortune;

  useEffect(() => {
    if (canCrackToday) {
      setPhase('cracking');
      setTaps(0);
      setFortune(null);
    }
  }, [canCrackToday]);

  const handleTap = useCallback(() => {
    if (phase !== 'cracking' || !canCrackToday) return;

    const nextTaps = taps + 1;
    const isFinal = nextTaps >= TAPS_TO_CRACK;
    playCrackSound(nextTaps, isFinal);
    setTaps(nextTaps);

    if (isFinal) {
      incrementCracked();
      const nextFortune = getRandomFortune();
      recordFortune(nextFortune.category);
      setFortune(nextFortune);
      setTimeout(() => {
        recordDailyCrack(nextFortune);
        setPhase('revealed');
      }, 400);
    }
  }, [phase, taps, canCrackToday, incrementCracked, recordDailyCrack, recordFortune]);

  const handleNewCookie = useCallback(() => {
    if (!canCrackToday) return;
    setTaps(0);
    setFortune(null);
    setPhase('cracking');
  }, [canCrackToday]);

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
        <p className="subtitle">One cookie per day — tap to crack your fortune</p>
        <p className="cracked-tracker">
          <span className="cracked-tracker__count">{crackedCount}</span>
          {crackedCount === 1 ? ' cookie cracked' : ' cookies cracked'}
        </p>
      </header>

      <main className="main">
        {!canCrackToday ? (
          <DailyLimitReached refreshIn={refreshIn} fortune={activeFortune} />
        ) : phase === 'revealed' && activeFortune ? (
          <FortunePaper
            category={activeFortune.category}
            fortune={activeFortune.message}
            canCrackToday={canCrackToday}
            refreshIn={refreshIn}
            onNewCookie={handleNewCookie}
          />
        ) : (
          <CookieStage
            skinId={skinId}
            taps={taps}
            cracked={taps >= TAPS_TO_CRACK}
            disabled={!canCrackToday}
            onTap={handleTap}
            equippedPetId={equippedPetId}
            fortuneStats={fortuneStats}
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
          <FortuneCookieIcon size={18} />
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
