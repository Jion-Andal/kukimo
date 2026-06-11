import { useCallback, useState } from 'react';
import { FORTUNE_CATEGORIES, type FortuneCategory } from '../data/fortunes';

const STORAGE_KEY = 'kukimo-fortune-stats';

export type FortuneStats = Record<FortuneCategory, number>;

function emptyStats(): FortuneStats {
  return {
    romance: 0,
    wealth: 0,
    health: 0,
    work: 0,
    family: 0,
    friends: 0,
    life: 0,
  };
}

function readStats(): FortuneStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStats();
    const parsed = JSON.parse(raw) as Partial<FortuneStats>;
    const stats = emptyStats();
    for (const category of FORTUNE_CATEGORIES) {
      const value = parsed[category];
      if (typeof value === 'number' && value >= 0) stats[category] = value;
    }
    return stats;
  } catch {
    return emptyStats();
  }
}

export function useFortuneStats() {
  const [stats, setStats] = useState<FortuneStats>(readStats);

  const recordFortune = useCallback((category: FortuneCategory) => {
    const current = readStats();
    const next = { ...current, [category]: current[category] + 1 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setStats(next);
  }, []);

  const total = FORTUNE_CATEGORIES.reduce((sum, category) => sum + stats[category], 0);

  return { stats, total, recordFortune };
}
