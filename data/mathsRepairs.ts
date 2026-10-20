import { Question } from '../types';
// Reviewed corrections apply to every legacy format in each source family.
export const mathsRepairs: Record<string, {text: string; answer: string; options: string[]; explanation: string; falseAnswer: string}> = {
  '038': {text:'A shop sells 250 items in January and 18% more in February. How many items does it sell in February?', answer:'295', options:['268','280','295','300'], falseAnswer:'280', explanation:'Find the increase: 250 × 18 ÷ 100 = 45. Add it to January: 250 + 45 = 295 items. The increase alone is not the February total.'},
  '164': {text:'Rice costs £2.40 for 500g or £3.45 for 750g. What is the mass, in grams, of the better-value pack?',answer:'750',options:['250','500','750','1000'],falseAnswer:'500',explanation:'Compare the cost per 100g. The 500g pack costs 240 ÷ 5 = 48p per 100g. The 750g pack costs 345 ÷ 7.5 = 46p per 100g, so the 750g pack is better value.'},
  '189': {text:'Bulbs come in packs of 8 or packs of 12. You want the same number of bulbs from each pack size, buying only whole packs. What is the smallest positive number of bulbs you can buy from each pack size?',answer:'24',options:['12','20','24','48'],falseAnswer:'20',explanation:'Multiples of 8 begin 8, 16, 24; multiples of 12 begin 12, 24. The first shared positive number is 24: three packs of 8 and two packs of 12. That is 24 from each size, not 24 altogether.'},
  '226': {text:'What is the difference between the largest and smallest prime numbers less than 20?',answer:'17',options:['13','15','17','19'],falseAnswer:'15',explanation:'The prime numbers below 20 are 2, 3, 5, 7, 11, 13, 17 and 19. The difference is 19 − 2 = 17. The number 1 is not prime.'},
  '232': {text:'The angle between the two equal sides of an isosceles triangle is 50 degrees. What is the size of each of the other two angles, in degrees?',answer:'65',options:['50','60','65','80'],falseAnswer:'50',explanation:'Angles in a triangle total 180 degrees. The two equal base angles share 180 − 50 = 130 degrees, so each is 130 ÷ 2 = 65 degrees.'},
  '236': {text:'A positive number is multiplied by itself and then 21 is added. The result is 46. What is the number?',answer:'5',options:['4','5','6','7'],falseAnswer:'4',explanation:'Subtract 21: 46 − 21 = 25. The positive number whose square is 25 is 5. Check: 5 × 5 + 21 = 46. The word positive rules out −5.'},
  '242': {text:'Seven numbers have a mean of 11. In ascending order they are 4, 7, a missing number, 12, 12, 14, 19. What is the missing number?',answer:'9',options:['8','9','10','11'],falseAnswer:'10',explanation:'Their total is 7 × 11 = 77. The six known numbers total 4 + 7 + 12 + 12 + 14 + 19 = 68. The missing number is 77 − 68 = 9, which fits between 7 and 12.'},
};
export function applyMathsRepair(q: Question): Question {
  const match = /^math-(mc|tf|fitb)-(\d+)$/.exec(q.id);
  const repair = match && mathsRepairs[match[2]];
  if (!match || !repair) return q;
  if (match[1] === 'tf') return {...q, text:`True or False: ${repair.text} The answer is ${repair.falseAnswer}.`,options:['True','False'],correctAnswer:'False',explanation:repair.explanation};
  return {...q,text:repair.text,options:match[1]==='mc'?repair.options:[],correctAnswer:repair.answer,explanation:repair.explanation,...(match[1]==='fitb'?{marking:{kind:'numeric' as const}}:{})};
}
