import { useId, useState, type ReactNode } from 'react';
import { COOKIE_SKINS, isSkinUnlocked, type CookieSkinId } from '../data/cookieSkins';
import {
  getCategoryFortuneCount,
  isPetUnlocked,
  petUnlockLabel,
  PETS,
  type PetId,
} from '../data/pets';
import { CATEGORY_LABELS } from '../data/fortunes';
import type { FortuneStats } from '../hooks/useFortuneStats';
import { CookieArt } from './CookieArt';
import { PetArt } from './PetArt';

interface CookieCollectionProps {
  open: boolean;
  onClose: () => void;
  crackedCount: number;
  selectedSkinId: CookieSkinId;
  onSelectSkin: (id: CookieSkinId) => void;
  fortuneStats: FortuneStats;
  selectedPetId: PetId | null;
  onSelectPet: (id: PetId | null) => void;
}

type UpgradeTab = 'cookies' | 'pets';

export function CookieCollection({
  open,
  onClose,
  crackedCount,
  selectedSkinId,
  onSelectSkin,
  fortuneStats,
  selectedPetId,
  onSelectPet,
}: CookieCollectionProps) {
  const [activeTab, setActiveTab] = useState<UpgradeTab>('cookies');

  if (!open) return null;

  return (
    <div className="collection-backdrop" onClick={onClose} role="presentation">
      <div
        className="collection-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="collection-title"
      >
        <div className="collection-header">
          <h2 id="collection-title">Upgrades</h2>
          <button type="button" className="collection-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="collection-tabs" role="tablist" aria-label="Upgrade categories">
          <button
            type="button"
            role="tab"
            id="upgrades-tab-cookies"
            className={`collection-tab ${activeTab === 'cookies' ? 'collection-tab--active' : ''}`}
            aria-selected={activeTab === 'cookies'}
            aria-controls="upgrades-panel-cookies"
            onClick={() => setActiveTab('cookies')}
          >
            Cookie Designs
          </button>
          <button
            type="button"
            role="tab"
            id="upgrades-tab-pets"
            className={`collection-tab ${activeTab === 'pets' ? 'collection-tab--active' : ''}`}
            aria-selected={activeTab === 'pets'}
            aria-controls="upgrades-panel-pets"
            onClick={() => setActiveTab('pets')}
          >
            Pets
          </button>
        </div>

        {activeTab === 'cookies' && (
          <section
            className="collection-section"
            role="tabpanel"
            id="upgrades-panel-cookies"
            aria-labelledby="upgrades-tab-cookies"
          >
            <p className="collection-section__hint">
              Unlock new looks by cracking cookies. You have cracked{' '}
              <strong>{crackedCount}</strong>.
            </p>
            <div className="collection-grid">
              {COOKIE_SKINS.map((skin) => {
                const unlocked = isSkinUnlocked(skin.id, crackedCount);
                const selected = selectedSkinId === skin.id;
                return (
                  <SkinCard
                    key={skin.id}
                    skinId={skin.id}
                    name={skin.name}
                    unlockAt={skin.unlockAt}
                    tagline={skin.tagline}
                    unlocked={unlocked}
                    selected={selected}
                    onSelect={() => unlocked && onSelectSkin(skin.id)}
                  />
                );
              })}
            </div>
          </section>
        )}

        {activeTab === 'pets' && (
          <section
            className="collection-section"
            role="tabpanel"
            id="upgrades-panel-pets"
            aria-labelledby="upgrades-tab-pets"
          >
            <p className="collection-section__hint">
              Unlock companions by collecting fortunes in each category. Equipped pets appear beside
              your cookie.
            </p>
            <div className="collection-grid">
              <PetCard
                name="None"
                tagline="No companion"
                unlocked
                selected={selectedPetId === null}
                onSelect={() => onSelectPet(null)}
              >
                <span className="pet-card__none" aria-hidden>
                  —
                </span>
              </PetCard>
              {PETS.map((pet) => {
                const unlocked = isPetUnlocked(pet.id, fortuneStats);
                const count = getCategoryFortuneCount(pet, fortuneStats);
                const selected = selectedPetId === pet.id;
                return (
                  <PetCard
                    key={pet.id}
                    name={pet.name}
                    tagline={
                      unlocked
                        ? pet.tagline
                        : `${count}/${pet.unlockAt} ${CATEGORY_LABELS[pet.category]} fortunes`
                    }
                    unlocked={unlocked}
                    selected={selected}
                    onSelect={() => unlocked && onSelectPet(pet.id)}
                    categoryLabel={CATEGORY_LABELS[pet.category]}
                    unlockLabel={!unlocked ? petUnlockLabel(pet) : undefined}
                  >
                    <PetArt petId={pet.id} className="pet-card__art" />
                  </PetCard>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

interface SkinCardProps {
  skinId: CookieSkinId;
  name: string;
  unlockAt: number;
  tagline: string;
  unlocked: boolean;
  selected: boolean;
  onSelect: () => void;
}

function SkinCard({ skinId, name, unlockAt, tagline, unlocked, selected, onSelect }: SkinCardProps) {
  const idPrefix = useId().replace(/:/g, '');

  return (
    <button
      type="button"
      className={`skin-card ${unlocked ? 'skin-card--unlocked' : 'skin-card--locked'} ${selected ? 'skin-card--selected' : ''}`}
      onClick={onSelect}
      disabled={!unlocked}
    >
      <div className="skin-card__preview">
        <CookieArt skinId={skinId} idPrefix={idPrefix} className="skin-card__cookie" />
        {!unlocked && (
          <div className="skin-card__lock">
            <span aria-hidden>🔒</span>
            <span>{unlockAt} cracks</span>
          </div>
        )}
      </div>
      <div className="skin-card__info">
        <span className="skin-card__name">{name}</span>
        <span className="skin-card__tagline">{unlocked ? tagline : `Unlock at ${unlockAt} cracks`}</span>
      </div>
      {selected && unlocked && <span className="skin-card__badge">Equipped</span>}
    </button>
  );
}

interface PetCardProps {
  name: string;
  tagline: string;
  unlocked: boolean;
  selected: boolean;
  onSelect: () => void;
  categoryLabel?: string;
  unlockLabel?: string;
  children: ReactNode;
}

function PetCard({
  name,
  tagline,
  unlocked,
  selected,
  onSelect,
  categoryLabel,
  unlockLabel,
  children,
}: PetCardProps) {
  return (
    <button
      type="button"
      className={`skin-card pet-card ${unlocked ? 'skin-card--unlocked' : 'skin-card--locked'} ${selected ? 'skin-card--selected' : ''}`}
      onClick={onSelect}
      disabled={!unlocked}
    >
      <div className="skin-card__preview pet-card__preview">
        {children}
        {!unlocked && unlockLabel && (
          <div className="skin-card__lock">
            <span aria-hidden>🔒</span>
            <span>{unlockLabel}</span>
          </div>
        )}
      </div>
      <div className="skin-card__info">
        <span className="skin-card__name">{name}</span>
        {categoryLabel && <span className="pet-card__category">{categoryLabel}</span>}
        <span className="skin-card__tagline">{tagline}</span>
      </div>
      {selected && unlocked && <span className="skin-card__badge">Equipped</span>}
    </button>
  );
}
