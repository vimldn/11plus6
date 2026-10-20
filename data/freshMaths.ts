import { Question } from '../types';

export type FreshTopic = 'arithmetic' | 'fractions' | 'percentages' | 'algebra' | 'word-problems' | 'money' | 'geometry' | 'data';
export const freshTopics: FreshTopic[] = ['arithmetic', 'fractions', 'percentages', 'algebra', 'word-problems', 'money', 'geometry', 'data'];
export const freshTopicLabels: Record<FreshTopic,string> = {arithmetic:'Order of operations',fractions:'Fractions of amounts',percentages:'Percentages of amounts',algebra:'Simple equations','word-problems':'Multi-step sharing',money:'Money and change',geometry:'Rectangle area',data:'Mean averages'};

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
      topic: freshTopicLabels[topic] });
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
  } else if (topic === 'percentages') {
    for (let p = 5; p <= 95; p += 5) for (let scale = 2; scale <= 30; scale++) {
      const whole = scale * 100;
      add(`percentages-${p}-${scale}`, `What is ${p}% of ${whole}?`, p * scale,
        `Percent means out of 100. First find 1%: ${whole} ÷ 100 = ${scale}. Then find ${p}%: ${scale} × ${p} = ${scale * p}. This is the percentage amount, not the amount left over.`, [scale, whole - p * scale, p]);
    }
  }
  if (topic === 'algebra') {
    for (let a=2;a<=9;a++) for (let x=3;x<=20;x++) for (let b=4;b<=12;b+=2) {
      const total=a*x+b;
      add(`algebra-${a}-${x}-${b}`, `Solve ${a}x + ${b} = ${total}. What is x?`, x,
        `Subtract ${b} from both sides: ${total} − ${b} = ${a*x}. Divide by ${a}: ${a*x} ÷ ${a} = ${x}. Check by substituting ${x} for x in the original equation.`, [a*x,total-b-a,x+b]);
    }
  }
  if (topic === 'word-problems') {
    for (let packs=3;packs<=9;packs++) for (let each=6;each<=18;each+=3) for (let groups=2;groups<=6;groups++) {
      if (packs*each % groups) continue;
      add(`word-${packs}-${each}-${groups}`, `A club has ${packs} packs of ${each} pencils. All the pencils are shared equally between ${groups} groups. How many pencils does each group receive?`, packs*each/groups,
        `Find the total: ${packs} × ${each} = ${packs*each}. Share equally: ${packs*each} ÷ ${groups} = ${packs*each/groups}. The question asks for each group's share, not the total.`,[packs*each,packs+each,each]);
    }
  }
  if (topic === 'money') {
    for (let n=2;n<=6;n++) for (let price=35;price<=145;price+=10) {
      const cost=n*price, change=1000-cost;
      add(`money-${n}-${price}`, `A notebook costs ${price}p. You buy ${n} notebooks and pay with £10. How much change do you receive, in pence?`,change,
        `Work in pence: £10 is 1000p. Total cost: ${n} × ${price} = ${cost}. Change: 1000 − ${cost} = ${change}. Give the answer in pence, as requested.`,[cost,1000-price,change+10]);
    }
  }
  if (topic === 'geometry') {
    for (let width=3;width<=14;width++) for (let length=width+1;length<=24;length++) {
      const perimeter=2*(length+width);
      add(`geometry-${width}-${length}`, `A rectangle has perimeter ${perimeter}cm and length ${length}cm. What is its area, in square centimetres?`,width*length,
        `Half the perimeter is ${perimeter} ÷ 2 = ${width+length}, the sum of length and width. Width: ${width+length} − ${length} = ${width}. Area: ${length} × ${width} = ${length*width} square centimetres.`,[perimeter,length+width,width]);
    }
  }
  if (topic === 'data') {
    for (let mean=8;mean<=30;mean++) for (let gap=1;gap<=6;gap++) {
      const a=mean-gap,b=mean+2*gap,c=mean+gap,d=mean-2*gap;
      if(d<0)continue;
      add(`data-${mean}-${gap}`, `Find the mean of ${a}, ${b}, ${c} and ${d}.`,mean,
        `Add the four values to get ${mean*4}. There are four values, so divide the total by four: ${mean*4} ÷ 4 = ${mean}. The mean uses every value, not just the largest and smallest.`,[mean*4,2*gap,mean+gap]);
    }
  }
  return pool;
}

export function createFreshMaths(random: () => number = Math.random, topics: FreshTopic[] = freshTopics, perTopic = 2, excludeIds: string[] = []): Question[] {
  const selected = Array.from(new Set(topics)).filter(t => freshTopics.includes(t)).flatMap(topic => shuffle(freshMathsPool(topic).filter(q => !excludeIds.includes(q.id)), random).slice(0, perTopic));
  return shuffle(selected, random).map(q => ({ ...q, options: shuffle(q.options, random) }));
}
