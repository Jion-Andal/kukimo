export type CookieSkinId =
  | 'default'
  | 'cap'
  | 'fedora'
  | 'cool'
  | 'angry'
  | 'king'
  | 'gold';

export interface CookieSkin {
  id: CookieSkinId;
  name: string;
  unlockAt: number;
  tagline: string;
}

export const COOKIE_SKINS: CookieSkin[] = [
  { id: 'default', name: 'Classic', unlockAt: 0, tagline: 'The original golden cookie' },
  { id: 'cap', name: 'Cap Cookie', unlockAt: 5, tagline: 'Sporty bull cap style' },
  { id: 'fedora', name: 'Fedora Cookie', unlockAt: 10, tagline: 'Dapper and distinguished' },
  { id: 'cool', name: 'Cool Cookie', unlockAt: 15, tagline: 'Too cool for shade' },
  { id: 'angry', name: 'Angry Cookie', unlockAt: 25, tagline: 'Not in the mood today' },
  { id: 'king', name: 'King Cookie', unlockAt: 50, tagline: 'Fit for a royal feast' },
  { id: 'gold', name: 'Gold Cookie', unlockAt: 100, tagline: 'Pure luxury shimmer' },
];

export function isSkinUnlocked(skinId: CookieSkinId, crackedCount: number): boolean {
  const skin = COOKIE_SKINS.find((s) => s.id === skinId);
  return skin ? crackedCount >= skin.unlockAt : false;
}

export function getUnlockedSkins(crackedCount: number): CookieSkin[] {
  return COOKIE_SKINS.filter((s) => crackedCount >= s.unlockAt);
}
