import { useCallback, useState } from 'react';
import type { CookieSkinId } from '../data/cookieSkins';
import { isSkinUnlocked } from '../data/cookieSkins';

const STORAGE_KEY = 'kukimo-cookie-skin';
const LEGACY_STORAGE_KEY = 'cookiemo-cookie-skin';

function isCookieSkinId(value: string): value is CookieSkinId {
  return (
    value === 'default' ||
    value === 'cap' ||
    value === 'fedora' ||
    value === 'cool' ||
    value === 'angry' ||
    value === 'king' ||
    value === 'gold'
  );
}

function readSkin(): CookieSkinId {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      raw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (raw && isCookieSkinId(raw)) localStorage.setItem(STORAGE_KEY, raw);
    }
    if (raw && isCookieSkinId(raw)) return raw;
  } catch {
    /* ignore */
  }
  return 'default';
}

export function useCookieSkin() {
  const [skinId, setSkinId] = useState<CookieSkinId>(readSkin);

  const selectSkin = useCallback((id: CookieSkinId, crackedCount: number) => {
    if (!isSkinUnlocked(id, crackedCount)) return false;
    localStorage.setItem(STORAGE_KEY, id);
    setSkinId(id);
    return true;
  }, []);

  return { skinId, selectSkin };
}
