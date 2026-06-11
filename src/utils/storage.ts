import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

const STORAGE_KEYS = [
  'kukimo-cracked-count',
  'kukimo-cookie-skin',
  'kukimo-equipped-pet',
  'kukimo-fortune-stats',
  'kukimo-daily-cookie',
] as const;

const LEGACY_KEYS = [
  'cookiemo-cracked-count',
  'cookiemo-cookie-skin',
  'kukimo-daily-cookie-date',
] as const;

const cache = new Map<string, string | null>();
let initialized = false;

async function readPersisted(key: string): Promise<string | null> {
  if (Capacitor.isNativePlatform()) {
    const { value } = await Preferences.get({ key });
    return value;
  }
  return localStorage.getItem(key);
}

async function writePersisted(key: string, value: string): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    await Preferences.set({ key, value });
    return;
  }
  localStorage.setItem(key, value);
}

async function removePersisted(key: string): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    await Preferences.remove({ key });
    return;
  }
  localStorage.removeItem(key);
}

async function migrateLegacyKeys(): Promise<void> {
  for (const legacyKey of LEGACY_KEYS) {
    const legacyValue = cache.get(legacyKey) ?? (await readPersisted(legacyKey));
    if (!legacyValue) continue;

    if (legacyKey === 'cookiemo-cracked-count' && !cache.get('kukimo-cracked-count')) {
      cache.set('kukimo-cracked-count', legacyValue);
      await writePersisted('kukimo-cracked-count', legacyValue);
    } else if (legacyKey === 'cookiemo-cookie-skin' && !cache.get('kukimo-cookie-skin')) {
      cache.set('kukimo-cookie-skin', legacyValue);
      await writePersisted('kukimo-cookie-skin', legacyValue);
    } else if (legacyKey === 'kukimo-daily-cookie-date' && !cache.get('kukimo-daily-cookie')) {
      const migrated = JSON.stringify({ date: legacyValue, category: 'life', message: '' });
      cache.set('kukimo-daily-cookie', migrated);
      await writePersisted('kukimo-daily-cookie', migrated);
    }

    cache.delete(legacyKey);
    await removePersisted(legacyKey);
  }
}

async function migrateWebLocalStorageToNative(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;

  for (const key of [...STORAGE_KEYS, ...LEGACY_KEYS]) {
    const webValue = localStorage.getItem(key);
    if (webValue === null) continue;

    const nativeValue = await Preferences.get({ key });
    if (nativeValue.value === null) {
      await Preferences.set({ key, value: webValue });
    }
    localStorage.removeItem(key);
  }
}

/** Load persisted data into memory before the app renders. */
export async function initStorage(): Promise<void> {
  if (initialized) return;

  await migrateWebLocalStorageToNative();

  for (const key of STORAGE_KEYS) {
    cache.set(key, await readPersisted(key));
  }

  for (const key of LEGACY_KEYS) {
    cache.set(key, await readPersisted(key));
  }

  await migrateLegacyKeys();
  initialized = true;
}

export function isStorageReady(): boolean {
  return initialized;
}

/** Read a value from the in-memory cache (call only after initStorage). */
export function getItem(key: string): string | null {
  if (cache.has(key)) {
    const value = cache.get(key);
    return value ?? null;
  }

  if (!Capacitor.isNativePlatform()) {
    return localStorage.getItem(key);
  }

  return null;
}

/** Persist a value to native storage / localStorage and update the cache. */
export function setItem(key: string, value: string): void {
  cache.set(key, value);
  void writePersisted(key, value);
}

/** Remove a persisted value and update the cache. */
export function removeItem(key: string): void {
  cache.set(key, null);
  void removePersisted(key);
}
