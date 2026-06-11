import type { Fortune } from '../data/fortunes';
import { FortunePreview } from './FortunePreview';

interface DailyLimitReachedProps {
  refreshIn: string;
  fortune?: Fortune | null;
}

export function DailyLimitReached({ refreshIn, fortune }: DailyLimitReachedProps) {
  return (
    <div className="daily-limit">
      <p className="daily-limit__icon" aria-hidden>
        🍪
      </p>
      <p className="daily-limit__title">Today&apos;s cookie is cracked</p>
      <p className="daily-limit__text">
        You get one fortune cookie per day. A fresh cookie arrives at midnight in your timezone.
      </p>
      {fortune && <FortunePreview category={fortune.category} fortune={fortune.message} />}
      <p className="daily-limit__countdown">
        Next cookie in <strong>{refreshIn}</strong>
      </p>
    </div>
  );
}
