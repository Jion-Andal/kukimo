import {
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  FORTUNE_CATEGORIES,
  type FortuneCategory,
} from '../data/fortunes';
import type { FortuneStats } from '../hooks/useFortuneStats';

interface FortuneStatsModalProps {
  open: boolean;
  onClose: () => void;
  stats: FortuneStats;
  total: number;
}

function polarToCartesian(cx: number, cy: number, radius: number, angleDegrees: number) {
  const radians = ((angleDegrees - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

function pieSlicePath(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) {
  if (endAngle - startAngle >= 360) {
    return `M ${cx} ${cy} m -${radius} 0 a ${radius} ${radius} 0 1 0 ${radius * 2} 0 a ${radius} ${radius} 0 1 0 -${radius * 2} 0`;
  }

  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
}

export function FortuneStatsModal({ open, onClose, stats, total }: FortuneStatsModalProps) {
  if (!open) return null;

  const slices: { category: FortuneCategory; start: number; end: number; count: number }[] = [];
  let angle = 0;

  for (const category of FORTUNE_CATEGORIES) {
    const count = stats[category];
    if (count === 0) continue;
    const sweep = (count / total) * 360;
    slices.push({ category, start: angle, end: angle + sweep, count });
    angle += sweep;
  }

  const cx = 100;
  const cy = 100;
  const radius = 88;

  return (
    <div className="collection-backdrop" onClick={onClose} role="presentation">
      <div
        className="collection-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="fortune-stats-title"
      >
        <div className="collection-header">
          <h2 id="fortune-stats-title">Fortune Stats</h2>
          <button type="button" className="collection-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <p className="collection-subtitle">
          {total === 0
            ? 'Crack cookies to start tracking your fortunes.'
            : (
              <>
                You have received <strong>{total}</strong>
                {total === 1 ? ' fortune' : ' fortunes'} across all categories.
              </>
            )}
        </p>

        {total > 0 ? (
          <div className="fortune-stats">
            <div className="fortune-stats__chart-wrap">
              <svg
                className="fortune-stats__chart"
                viewBox="0 0 200 200"
                aria-label="Pie chart of fortune categories"
              >
                {slices.map(({ category, start, end }) => (
                  <path
                    key={category}
                    d={pieSlicePath(cx, cy, radius, start, end)}
                    fill={CATEGORY_COLORS[category]}
                    stroke="#fffef5"
                    strokeWidth="1.5"
                  />
                ))}
              </svg>
            </div>
            <ul className="fortune-stats__legend">
              {FORTUNE_CATEGORIES.map((category) => {
                const count = stats[category];
                if (count === 0) return null;
                const pct = Math.round((count / total) * 100);
                return (
                  <li key={category} className="fortune-stats__legend-item">
                    <span
                      className="fortune-stats__swatch"
                      style={{ background: CATEGORY_COLORS[category] }}
                      aria-hidden
                    />
                    <span className="fortune-stats__label">{CATEGORY_LABELS[category]}</span>
                    <span className="fortune-stats__count">
                      {count} <span className="fortune-stats__pct">({pct}%)</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="fortune-stats__empty">
            <span className="fortune-stats__empty-icon" aria-hidden>📊</span>
            <p>No fortunes yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
