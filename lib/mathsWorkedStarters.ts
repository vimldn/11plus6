import type { FreshTopic } from '../data/freshMaths';

/** Original examples for the eight narrow skills available in focused practice. */
export const mathsWorkedStarters: Record<FreshTopic, { question: string; answer: number; working: string; check: string }> = {
  arithmetic: { question: 'Work out 18 + 7 × 4.', answer: 46, working: 'Multiply first: 7 × 4 = 28. Then add 18: 18 + 28 = 46.', check: 'Adding 18 and 7 first would give 100. That would answer a different expression, (18 + 7) × 4.' },
  fractions: { question: 'Find 3/7 of 84.', answer: 36, working: 'Divide 84 into seven equal parts: 84 ÷ 7 = 12. Take three parts: 12 × 3 = 36.', check: '12 is only one seventh. The numerator asks for three of those parts.' },
  percentages: { question: 'Find 35% of 600.', answer: 210, working: '1% is 600 ÷ 100 = 6. Multiply by 35: 6 × 35 = 210.', check: 'Check another way: 30% is 180 and 5% is 30, giving 210. The amount remaining would be a different answer.' },
  algebra: { question: 'Solve 4x + 9 = 61.', answer: 13, working: 'Subtract 9 from both sides: 4x = 52. Divide both sides by 4: x = 13.', check: 'Substitute back: 4 × 13 + 9 = 61. Stopping at 52 gives the value of 4x, not x.' },
  'word-problems': { question: 'Six packs each contain 14 pencils. All the pencils are shared equally between four groups. How many does each group receive?', answer: 21, working: 'Find the total: 6 × 14 = 84 pencils. Divide by the four groups: 84 ÷ 4 = 21 pencils per group.', check: 'Four groups of 21 use all 84 pencils. The question asks for each share, not the total.' },
  money: { question: 'Five notebooks cost 85p each. You pay with £10. How much change do you receive, in pence?', answer: 575, working: 'The cost is 5 × 85 = 425p. Convert £10 to 1000p, then subtract: 1000 − 425 = 575p.', check: '425p + 575p = 1000p. Give 575p, not 5.75p: £5.75 is the equivalent amount in pounds.' },
  geometry: { question: 'A rectangle has perimeter 38cm and length 12cm. Find its area in square centimetres.', answer: 84, working: 'Half the perimeter is 38 ÷ 2 = 19cm, the sum of length and width. The width is 19 − 12 = 7cm. Area = 12 × 7 = 84cm².', check: 'Check the perimeter: 12 + 7 + 12 + 7 = 38cm. Multiplying the length by the whole perimeter would not find the area.' },
  data: { question: 'Find the mean of 9, 13, 16 and 18.', answer: 14, working: 'Add all four values: 9 + 13 + 16 + 18 = 56. Divide by the number of values: 56 ÷ 4 = 14.', check: 'There are four values, even though there are three gaps between them. This set practises the mean, not median, mode or range.' },
};
