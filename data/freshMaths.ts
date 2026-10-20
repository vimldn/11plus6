import { Question } from '../types';

export type FreshTopic = 'arithmetic' | 'fractions' | 'percentages';
export const freshTopics: FreshTopic[] = ['arithmetic', 'fractions', 'percentages'];

function shuffle<T>(items: T[], random: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Finite original templates, not AI answers or extracted school questions.
export function freshMathsPool(topic: FreshTopic): Question[] {
  const pool: Question[] = [];
  const add = (id: string, text: string, answer: number, explanation: string, distractors: number[]) => {
    const wrong = Array.from(new Set(distractors)).filter(n => n !== answer && n >= 0);
    for (let delta = 1; wrong.length < 3; delta++) {
      if (!wrong.includes(answer + delta)) wrong.push(answer + delta);
    }
    pool.push({ id: `fresh-${id}`, text, correctAnswer: String(answer),
      options: [answer, ...wrong.slice(0, 3)].map(String), explanation,
      topic: topic === 'arithmetic' ? 'Order of operations' : topic === 'fractions' ? 'Fractions of amounts' : 'Percentages of amounts' });
  };
  if (topic === 'arithmetic') {
    for (let a = 11; a <= 30; a++) for (let b = 3; b <= 12; b++) for (let c = 2; c <= 9; c++) {
      add(`arithmetic-${a}-${b}-${c}`, `Calculate ${a} + ${b} × ${c}.`, a + b * c,
        `Multiply before adding: ${b} × ${c} = ${b * c}. Then ${a} + ${b * c} = ${a + b * c}. Adding first would change the order of operations.`, [(a + b) * c, a + b + c, b * c]);
    }
  } else if (topic === 'fractions') {
    for (let d = 3; d <= 10; d++) for (let n = 1; n < d; n++) for (let unit = 4; unit <= 20; unit++) {
      const whole = d * unit;
      add(`fractions-${n}-${d}-${unit}`, `What is ${n}/${d} of ${whole}?`, n * unit,
        `Find one part: ${whole} ÷ ${d} = ${unit}. Take ${n} part${n === 1 ? '' : 's'}: ${unit} × ${n} = ${unit * n}. The denominator tells you the number of equal parts; the numerator tells you how many to take.`, [unit, whole - n * unit, whole * n]);
    }
  } else {
    for (let p = 5; p <= 95; p += 5) for (let scale = 2; scale <= 30; scale++) {
      const whole = scale * 100;
      add(`percentages-${p}-${scale}`, `What is ${p}% of ${whole}?`, p * scale,
        `Percent means out of 100. First find 1%: ${whole} ÷ 100 = ${scale}. Then find ${p}%: ${scale} × ${p} = ${scale * p}. This is the percentage amount, not the amount left over.`, [scale, whole - p * scale, p]);
    }
  }
  return pool;
}

export function createFreshMaths(random: () => number = Math.random): Question[] {
  const selected = freshTopics.flatMap(topic => shuffle(freshMathsPool(topic), random).slice(0, 5));
  return shuffle(selected, random).map(q => ({ ...q, options: shuffle(q.options, random) }));
}
