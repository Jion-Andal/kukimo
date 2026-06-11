import { CATEGORY_LABELS, type FortuneCategory } from '../data/fortunes';

interface FortunePreviewProps {
  category: FortuneCategory;
  fortune: string;
}

export function FortunePreview({ category, fortune }: FortunePreviewProps) {
  return (
    <div className="fortune-preview">
      <p className="fortune-preview__label">Today&apos;s fortune</p>
      <div className="fortune-preview__paper">
        <p className="fortune-preview__category">{CATEGORY_LABELS[category]}</p>
        <p className="fortune-preview__text">{fortune}</p>
      </div>
    </div>
  );
}
