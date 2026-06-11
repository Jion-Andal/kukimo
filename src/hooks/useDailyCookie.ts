import { useCallback, useEffect, useState } from 'react';
import type { Fortune, FortuneCategory } from '../data/fortunes';
import { formatTimeUntilMidnight, getLocalDateKey, msUntilLocalMidnight } from '../utils/localDate';
import { getItem, removeItem, setItem } from '../utils/storage';

const STORAGE_KEY = 'kukimo-daily-cookie';
const LEGACY_DATE_KEY = 'kukimo-daily-cookie-date';

interface StoredDailyCookie {
  date: string;
  category: FortuneCategory;
  message: string;
}

function isFortuneCategory(value: string): value is FortuneCategory {
  return (
    value === 'romance' ||
    value === 'wealth' ||
    value === 'health' ||
    value === 'work' ||
    value === 'family' ||
    value === 'friends' ||
    value === 'life'
  );
}

function readStored(): StoredDailyCookie | null {
  try {
    const raw = getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as StoredDailyCookie;
    if (
      typeof data.date === 'string' &&
      isFortuneCategory(data.category) &&
      typeof data.message === 'string'
    ) {
      return data;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function readTodayFortune(today: string): Fortune | null {
  const stored = readStored();
  if (!stored || stored.date !== today || !stored.message) return null;
  return { category: stored.category, message: stored.message };
}

function readLastCrackDate(): string | null {
  const stored = readStored();
  if (stored) return stored.date;
  try {
    return getItem(LEGACY_DATE_KEY);
  } catch {
    return null;
  }
}

export function useDailyCookie() {
  const [lastCrackDate, setLastCrackDate] = useState(readLastCrackDate);
  const [todayFortune, setTodayFortune] = useState<Fortune | null>(() =>
    readTodayFortune(getLocalDateKey()),
  );
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setTimeout(() => setNow(Date.now()), msUntilLocalMidnight(new Date(now)) + 50);
    return () => clearTimeout(id);
  }, [now]);

  const today = getLocalDateKey(new Date(now));
  const hasUsedToday = lastCrackDate === today;
  const canCrackToday = !hasUsedToday;
  const refreshIn = formatTimeUntilMidnight(new Date(now));

  useEffect(() => {
    if (!hasUsedToday) {
      setTodayFortune(null);
      return;
    }
    setTodayFortune(readTodayFortune(today));
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, [hasUsedToday, today]);

  const recordDailyCrack = useCallback((fortune: Fortune) => {
    const crackDate = getLocalDateKey();
    const stored: StoredDailyCookie = {
      date: crackDate,
      category: fortune.category,
      message: fortune.message,
    };
    setItem(STORAGE_KEY, JSON.stringify(stored));
    removeItem(LEGACY_DATE_KEY);
    setLastCrackDate(crackDate);
    setTodayFortune(fortune);
  }, []);

  return { canCrackToday, hasUsedToday, todayFortune, recordDailyCrack, refreshIn };
}
