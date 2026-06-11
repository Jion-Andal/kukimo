import { CATEGORY_LABELS, type FortuneCategory } from '../data/fortunes';

interface FortunePaperProps {
  category: FortuneCategory;
  fortune: string;
  canCrackToday: boolean;
  refreshIn: string;
  onNewCookie: () => void;
}

export function FortunePaper({ category, fortune, canCrackToday, refreshIn, onNewCookie }: FortunePaperProps) {
  return (
    <div className="fortune-reveal">
      <div className="fortune-paper">
        <p className="fortune-paper__category">{CATEGORY_LABELS[category]}</p>
        <p className="fortune-paper__label">Your fortune</p>
        <p className="fortune-paper__text">{fortune}</p>
      </div>
      {canCrackToday ? (
        <button type="button" className="btn-secondary" onClick={onNewCookie}>
          Crack another cookie
        </button>
      ) : (
        <p className="daily-limit__footnote">
          Next cookie in <strong>{refreshIn}</strong> (midnight, your time)
        </p>
      )}
    </div>
  );
}
