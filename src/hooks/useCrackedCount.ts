import { useCallback, useState } from 'react';

const STORAGE_KEY = 'kukimo-cracked-count';
const LEGACY_STORAGE_KEY = 'cookiemo-cracked-count';

function readCount(): number {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      raw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (raw) localStorage.setItem(STORAGE_KEY, raw);
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
    localStorage.setItem(STORAGE_KEY, String(next));
    setCount(next);
  }, []);

  return { count, increment };
}
