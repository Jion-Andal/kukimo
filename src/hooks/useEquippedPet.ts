import { useCallback, useState } from 'react';
import { isPetUnlocked, type PetId } from '../data/pets';
import { getItem, setItem } from '../utils/storage';
import type { FortuneStats } from './useFortuneStats';

const STORAGE_KEY = 'kukimo-equipped-pet';

function isPetId(value: string): value is PetId {
  return (
    value === 'cat' ||
    value === 'fish' ||
    value === 'bunny' ||
    value === 'bird' ||
    value === 'fox' ||
    value === 'dog' ||
    value === 'butterfly'
  );
}

function readEquippedPet(): PetId | null {
  try {
    const raw = getItem(STORAGE_KEY);
    if (raw === 'none') return null;
    if (raw && isPetId(raw)) return raw;
  } catch {
    /* ignore */
  }
  return null;
}

export function useEquippedPet() {
  const [petId, setPetId] = useState<PetId | null>(readEquippedPet);

  const selectPet = useCallback((id: PetId | null, stats: FortuneStats) => {
    if (id !== null && !isPetUnlocked(id, stats)) return false;
    setItem(STORAGE_KEY, id ?? 'none');
    setPetId(id);
    return true;
  }, []);

  return { petId, selectPet };
}
