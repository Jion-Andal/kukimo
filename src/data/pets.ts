import { CATEGORY_LABELS, type FortuneCategory } from './fortunes';
import type { FortuneStats } from '../hooks/useFortuneStats';

export type PetId =
  | 'cat'
  | 'fish'
  | 'bunny'
  | 'bird'
  | 'fox'
  | 'dog'
  | 'butterfly';

export interface Pet {
  id: PetId;
  name: string;
  category: FortuneCategory;
  unlockAt: number;
  tagline: string;
}

export const PETS: Pet[] = [
  { id: 'cat', name: 'Whiskers', category: 'romance', unlockAt: 3, tagline: 'Purrfect for love fortunes' },
  { id: 'fish', name: 'Goldie', category: 'wealth', unlockAt: 3, tagline: 'Swims in prosperity' },
  { id: 'bunny', name: 'Clover', category: 'health', unlockAt: 3, tagline: 'Hops toward wellness' },
  { id: 'bird', name: 'Sunny', category: 'work', unlockAt: 5, tagline: 'The early bird companion' },
  { id: 'fox', name: 'Ember', category: 'family', unlockAt: 5, tagline: 'Keeps the den cozy' },
  { id: 'dog', name: 'Buddy', category: 'friends', unlockAt: 3, tagline: 'Loyal friend forever' },
  { id: 'butterfly', name: 'Flutter', category: 'life', unlockAt: 7, tagline: 'Light as a life lesson' },
];

export function isPetUnlocked(petId: PetId, stats: FortuneStats): boolean {
  const pet = PETS.find((p) => p.id === petId);
  return pet ? stats[pet.category] >= pet.unlockAt : false;
}

export function getCategoryFortuneCount(pet: Pet, stats: FortuneStats): number {
  return stats[pet.category];
}

export function petUnlockLabel(pet: Pet): string {
  return `${pet.unlockAt} ${CATEGORY_LABELS[pet.category]} fortunes`;
}
