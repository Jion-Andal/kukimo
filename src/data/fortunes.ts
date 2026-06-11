export type FortuneCategory =
  | 'romance'
  | 'wealth'
  | 'health'
  | 'work'
  | 'family'
  | 'friends'
  | 'life';

export const CATEGORY_LABELS: Record<FortuneCategory, string> = {
  romance: 'Romance',
  wealth: 'Wealth',
  health: 'Health',
  work: 'Work',
  family: 'Family',
  friends: 'Friends',
  life: 'Life',
};

export const FORTUNES_BY_CATEGORY: Record<FortuneCategory, string[]> = {
  romance: [
    'Love will find you when you least expect it.',
    'A heartfelt conversation will deepen a bond.',
    'Your charm will open a door to someone special.',
    'An admirer admires you from afar.',
    'The heart that gives gathers.',
    'A small gesture of affection will mean the world.',
    'True love begins with friendship.',
  ],
  wealth: [
    'Financial wisdom you gain today will reward you tomorrow.',
    'An unexpected opportunity may improve your fortunes.',
    'Patience in money matters will serve you well.',
    'Your generosity will return to you in surprising ways.',
    'A wise investment of time will pay dividends.',
    'Prosperity flows to those who plan ahead.',
    'Good fortune in business is coming your way.',
  ],
  health: [
    'Rest and renewal will restore your energy.',
    'A walk outdoors will clear your mind and lift your spirit.',
    'Your body thanks you for the care you give it.',
    'Balance in all things leads to lasting wellness.',
    'Small healthy habits will bring great results.',
    'Strength grows from steady, gentle effort.',
    'Listen to your body — it speaks with wisdom.',
  ],
  work: [
    'Your hard work will soon be recognized.',
    'A new idea will set you apart from the crowd.',
    'Persistence will overcome today\'s obstacles.',
    'Collaboration will lead to a breakthrough.',
    'Your dedication will open doors you never imagined.',
    'Take pride in the progress you have made.',
    'An opportunity at work is closer than you think.',
  ],
  family: [
    'A family bond will grow stronger this week.',
    'Home is where your heart finds peace.',
    'An elder\'s advice will guide you wisely.',
    'Laughter shared with family heals the soul.',
    'A reunion or call will warm your heart.',
    'Your love anchors those closest to you.',
    'Traditions you honor will bring you joy.',
  ],
  friends: [
    'A true friend will appear when you need one most.',
    'Laughter with friends is the best medicine.',
    'An old friend will reach out with good news.',
    'Your loyalty will be remembered and returned.',
    'A new friendship will enrich your life.',
    'Shared adventures await with someone dear.',
    'Kindness to a friend will circle back to you.',
  ],
  life: [
    'The best time to plant a tree was twenty years ago. The second best time is now.',
    'Every day is a fresh start.',
    'Your smile is your greatest asset.',
    'Trust your intuition — it knows the way.',
    'Something wonderful is about to happen.',
    'You are stronger than you know.',
    'Take time to enjoy the little moments.',
    'The journey of a thousand miles begins with a single step.',
    'Peace comes from within — do not seek it without.',
    'Your next idea could change everything.',
  ],
};

export const FORTUNE_CATEGORIES = Object.keys(FORTUNES_BY_CATEGORY) as FortuneCategory[];

export const CATEGORY_COLORS: Record<FortuneCategory, string> = {
  romance: '#E85D75',
  wealth: '#E8B84A',
  health: '#6BBF59',
  work: '#5B9BD5',
  family: '#F0A04B',
  friends: '#A67BD4',
  life: '#4DB8A4',
};

export interface Fortune {
  category: FortuneCategory;
  message: string;
}

export function getRandomFortune(): Fortune {
  const category = FORTUNE_CATEGORIES[Math.floor(Math.random() * FORTUNE_CATEGORIES.length)];
  const messages = FORTUNES_BY_CATEGORY[category];
  const message = messages[Math.floor(Math.random() * messages.length)];
  return { category, message };
}
