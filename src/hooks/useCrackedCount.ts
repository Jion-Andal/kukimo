import { useCallback, useState } from 'react';
import { getItem, setItem } from '../utils/storage';

const STORAGE_KEY = 'kukimo-cracked-count';
const LEGACY_STORAGE_KEY = 'cookiemo-cracked-count';

function readCount(): number {
  try {
    let raw = getItem(STORAGE_KEY);
    if (!raw) {
      raw = getItem(LEGACY_STORAGE_KEY);
      if (raw) setItem(STORAGE_KEY, raw);
    }
    if (!raw) return 0;
    const count = parseInt(raw, 10);
    return Number.isFinite(count) && count >= 0 ? count : 0;
  } catch {
    return 0;
  }
}

export function useCrackedCount() {
  const [count, setCount] = useState(readCount);

  const increment = useCallback(() => {
    const next = readCount() + 1;
    setItem(STORAGE_KEY, String(next));
    setCount(next);
  }, []);

  return { count, increment };
}
