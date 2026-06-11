import type { Fortune } from '../data/fortunes';
import { FortuneCookieIcon } from './FortuneCookieIcon';
import { FortunePreview } from './FortunePreview';

interface DailyLimitReachedProps {
  refreshIn: string;
  fortune?: Fortune | null;
}

export function DailyLimitReached({ refreshIn, fortune }: DailyLimitReachedProps) {
  return (
    <div className="daily-limit">
      <div className="daily-limit__top">
        <div className="daily-limit__icon" aria-hidden>
          <FortuneCookieIcon size={40} cracked />
        </div>
        <p className="daily-limit__title">Today&apos;s cookie is cracked</p>
      </div>

      <div className="daily-limit__hero">
        {fortune ? (
          <FortunePreview category={fortune.category} fortune={fortune.message} />
        ) : (
          <p className="daily-limit__text">Your fortune will appear here after you crack today&apos;s cookie.</p>
        )}
      </div>

      <div className="daily-limit__footer">
        <p className="daily-limit__countdown">
          <span className="daily-limit__countdown-label">Next cookie in</span>
          <strong className="daily-limit__countdown-time">{refreshIn}</strong>
        </p>
        <p className="daily-limit__hint">Fresh cookie at midnight, your time</p>
      </div>
    </div>
  );
}
