export type Lesson = {
  slug: string;
  title: string;
  description: string;
  subject: 'maths';
  status: 'draft' | 'published';
  reviewedAt: string;
  introduction: string[];
  sections: { title: string; paragraphs: string[] }[];
  examples: { question: string; steps: string[]; answer: string }[];
  mistakes: string[];
  questions: { question: string; answer: string; explanation: string }[];
  relatedSlugs: string[];
  sources: { label: string; url: string }[];
};

const curriculumSource = {
  label: 'Department for Education: mathematics programmes of study (curriculum context)',
  url: 'https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study',
};
const parentSource = {
  label: 'Oxford Owl: maths in Year 6 (parent guidance)',
  url: 'https://home.oxfordowl.co.uk/maths/primary-maths-age-10-11-year-6/',
};

export const lessons: Lesson[] = [
  {
    slug: 'fractions-of-amounts',
    title: '11+ Fractions of Amounts: Questions and Worked Answers',
    description: 'Learn to find fractions of amounts, calculate what remains and work backwards to the whole, with three examples and six original practice questions.',
    subject: 'maths', status: 'draft', reviewedAt: '2026-10-07',
    introduction: [
      'Finding a fraction of an amount means splitting the whole into equal parts and choosing some of those parts. For example, three fifths of a collection means that the collection has been divided into five equal groups and you want three groups.',
      'This lesson moves from finding a part to finding what remains and working backwards. Suggested difficulty: foundation to intermediate, with a final stretch question. These are editorial estimates, not an exam-board grading. You should already be comfortable with multiplication and division. Try the questions without a calculator, keeping your working on paper.',
      'The examples and practice questions are original learning resources, not official past-paper questions. Check your target school’s current exam information before treating any topic list as its syllabus.',
    ],
    sections: [
      { title: 'What do the numerator and denominator tell you?', paragraphs: [
        'In 3/5, the denominator is 5: it tells you how many equal parts make the whole. The numerator is 3: it tells you how many of those parts you need. The fraction describes the relationship between the selected part and the whole; it is not the number of objects by itself.',
        'Imagine 35 counters arranged in five equal groups. Each group contains seven counters. Three groups contain 21 counters. Drawing five equal boxes and writing seven in each is a useful way to see why the calculation works.',
      ] },
      { title: 'The method: find one part, then the required parts', paragraphs: [
        'To find a/b of an amount, divide the amount by b, then multiply by a. Finding one part first keeps the numbers manageable. Write the units beside your final answer: a fraction of a length is a length, while a fraction of a group of children is a number of children.',
        'You can also multiply first and divide afterwards, but an intermediate calculation may be larger. Choose an order you can carry out accurately. When the fraction is less than one, your answer should be less than the original positive amount. This quick estimate catches many slips.',
      ] },
      { title: 'Does the question ask for the part or the remainder?', paragraphs: [
        'Words such as left, remaining and unused tell you to take another step. If 2/7 of some money is spent, 5/7 remains. You can find the money spent and subtract it from the total, or calculate 5/7 directly. Both methods should give the same answer.',
        'Keep track of the whole. Half of the remaining money is not necessarily half of the original money. For a problem with several stages, write down the new amount after each stage before calculating its next fraction.',
      ] },
      { title: 'Working backwards from a fraction', paragraphs: [
        'If you know that 3/8 of a collection is 27, the 27 belongs to three parts, not eight. Divide 27 by 3 to get one part, then multiply by 8 to rebuild the whole. You are reversing the forward calculation.',
        'After finding the whole, use the original fraction on your answer. If it does not reproduce the amount given in the question, inspect which number of parts you divided by.',
      ] },
      { title: 'How to use the practice', paragraphs: [
        'Attempt all six questions before opening the answers. Questions 1 and 2 practise direct calculations; 3 asks for a remainder; 4 reverses the method; 5 compares amounts; and 6 changes the whole halfway through.',
        'For each mistake, decide whether you misunderstood the fraction, chose the wrong whole or made an arithmetic slip. Explain the corrected method aloud, then try a similar calculation with different numbers. One small practice set cannot establish exam readiness.',
      ] },
    ],
    examples: [
      { question: 'Find 3/7 of 84.', steps: ['Seven equal parts make 84, so one part is 84 ÷ 7 = 12.', 'Three parts are 12 × 3 = 36.', 'Check: 3/7 is less than a half, and 36 is less than half of 84.'], answer: '36' },
      { question: 'A ribbon is 96 cm long. Maya uses 5/8 of it. How much ribbon remains?', steps: ['One eighth is 96 ÷ 8 = 12 cm.', 'Five eighths is 12 × 5 = 60 cm, so Maya uses 60 cm.', 'Subtract the used length: 96 − 60 = 36 cm.', 'Alternative: the remaining 3/8 is 12 × 3 = 36 cm.'], answer: '36 cm' },
      { question: 'Three fifths of a box of pencils is 42 pencils. How many pencils are in the full box?', steps: ['The 42 pencils represent three equal parts.', 'One part is 42 ÷ 3 = 14 pencils.', 'The whole has five parts: 14 × 5 = 70 pencils.', 'Check: 70 ÷ 5 × 3 = 42.'], answer: '70 pencils' },
    ],
    mistakes: [
      'Dividing by the numerator when finding a fraction of a known whole. First divide by the denominator to find one equal part.',
      'Stopping after finding one part. A numerator greater than one means you need several parts.',
      'Giving the amount used when the question asks how much remains. Reread the final sentence.',
      'Using the original whole after the question says “of the remainder”. Write down the remainder first.',
      'Assuming every fraction must make an amount smaller. That check applies to positive fractions less than one; an improper fraction can make it larger.',
    ],
    questions: [
      { question: 'Find 2/9 of 72.', answer: '16', explanation: 'One ninth is 72 ÷ 9 = 8. Two ninths is 8 × 2 = 16.' },
      { question: 'Find 7/10 of £130.', answer: '£91', explanation: 'One tenth is £13. Seven tenths is 7 × £13 = £91. Keep the pounds unit.' },
      { question: 'A tray holds 56 seedlings. A gardener plants 3/8 of them. How many are still on the tray?', answer: '35 seedlings', explanation: 'One eighth is 7, so 3/8 is 21 seedlings planted. The remaining number is 56 − 21 = 35. Alternatively, calculate the remaining 5/8.' },
      { question: 'Four sevenths of a number is 36. What is the number?', answer: '63', explanation: 'Four parts equal 36, so one part is 36 ÷ 4 = 9. Seven parts equal 9 × 7 = 63.' },
      { question: 'Which is greater: 3/4 of 44 or 5/6 of 42? By how much?', answer: '5/6 of 42 is greater by 2.', explanation: '44 ÷ 4 × 3 = 33. Separately, 42 ÷ 6 × 5 = 35. Compare the amounts, not just the fractions: 35 − 33 = 2.' },
      { question: 'Stretch: A club has 90 stickers. It gives away 2/5 of them, then uses 1/3 of the remaining stickers on posters. How many stickers are left?', answer: '36 stickers', explanation: 'First it gives away 90 ÷ 5 × 2 = 36, leaving 54. It then uses 54 ÷ 3 = 18, leaving 54 − 18 = 36. The second fraction acts on 54, not 90.' },
    ],
    relatedSlugs: ['ratio-sharing', 'percentages-of-amounts'], sources: [curriculumSource, parentSource],
  },
  {
    slug: 'ratio-sharing',
    title: '11+ Ratio Sharing: Questions and Worked Answers',
    description: 'Learn to share amounts in a ratio, distinguish a total from a difference and check your shares, with three examples and six original questions.',
    subject: 'maths', status: 'draft', reviewedAt: '2026-10-07',
    introduction: [
      'A sharing ratio tells you the relative sizes of the shares. If two children share counters in the ratio 2:3, the first child receives two equal parts and the second receives three of the same-sized parts. There are five parts altogether.',
      'Suggested difficulty: foundation to intermediate, with a difference-based stretch question. These are editorial estimates. Before starting, practise multiplication, division and finding fractions of amounts. Work on paper and keep each person’s name beside their share.',
      'These are original practice questions, not an official school or exam-provider paper. The lesson concentrates on sharing; recipe scaling and map scales are different applications that need further practice.',
    ],
    sections: [
      { title: 'A ratio compares shares, not a share with the whole', paragraphs: [
        'Read 2:3 as “two parts to three parts”. The first share is 2/5 of the combined total, because 2 + 3 = 5. It is not 2/3 of the total. However, the first share is 2/3 of the second share. Knowing which quantities are being compared prevents confusion.',
        'The order matters. If the question says apples to pears is 2:3, apples take two parts and pears take three. Reverse the labels and you reverse the answer. Before calculating, copy the names in the same order as the ratio.',
      ] },
      { title: 'Sharing a known total', paragraphs: [
        'Add the ratio numbers to find how many equal parts make the total. Divide the total amount by this number of parts. Then multiply the value of one part by each ratio number to calculate the separate shares.',
        'For a visual method, draw a row of equal boxes: two boxes for the first person and three for the second. Label the whole row with the total. Every box must have the same value even though the people receive different numbers of boxes.',
        'Check the result twice. The shares should add back to the original total, and they should simplify to the stated ratio. Correct addition alone is not enough: two equal shares would add correctly but would not match a 2:3 ratio.',
      ] },
      { title: 'When one share is given instead', paragraphs: [
        'Do not divide every number you see by the total number of parts. First decide what the given amount represents. If the second person has three parts and receives £24, one part is £24 ÷ 3. You can then calculate the first share or the combined total.',
        'The same idea works for three people. In a 2:3:4 ratio there are nine parts altogether, but a known middle share represents three parts. Underlining “altogether” or the name attached to a number helps you choose the correct calculation.',
      ] },
      { title: 'Stretch: when the difference is given', paragraphs: [
        'A difference compares how much more one person receives. In a 5:2 ratio, the larger share exceeds the smaller by three parts. If the difference is £18, those three parts are worth £18, so each part is £6.',
        'The total would be seven parts, or £42. Dividing the £18 difference by seven would treat it as the total and answer a different problem. A labelled bar drawing can make the extra three parts easier to see.',
      ] },
      { title: 'Choosing the right first step', paragraphs: [
        'Ask: “Does the known amount represent all the parts, one person’s parts, or the difference in parts?” Match the amount to that number of parts, then divide. Once you know one part, multiply to build the quantity the question requests.',
        'Try the six questions without timing yourself first. After checking, revisit the ones where you chose the wrong number of parts. Explain why the correct divisor represents the amount given; memorising a sequence of operations without that explanation is less useful.',
      ] },
    ],
    examples: [
      { question: 'Ari and Bea share £72 in the ratio 5:3. How much does each receive?', steps: ['Total parts: 5 + 3 = 8.', 'One part is £72 ÷ 8 = £9.', 'Ari receives 5 × £9 = £45. Bea receives 3 × £9 = £27.', 'Check: £45 + £27 = £72, and 45:27 simplifies to 5:3.'], answer: 'Ari £45; Bea £27.' },
      { question: 'Red, blue and green counters are in the ratio 2:3:4. There are 63 counters altogether. How many are blue?', steps: ['All three colours contribute to the total: 2 + 3 + 4 = 9 parts.', 'One part is 63 ÷ 9 = 7 counters.', 'Blue has three parts: 3 × 7 = 21 counters.', 'Red has 14 and green has 28; 14 + 21 + 28 = 63.'], answer: '21 blue counters' },
      { question: 'Jo and Lee receive tokens in the ratio 3:7. Jo receives 24 tokens. How many tokens does Lee receive?', steps: ['Jo’s 24 tokens represent three parts, not the whole ten parts.', 'One part is 24 ÷ 3 = 8 tokens.', 'Lee has seven parts: 7 × 8 = 56 tokens.', 'Check the ratio: 24:56 simplifies to 3:7.'], answer: '56 tokens' },
    ],
    mistakes: [
      'Treating 3:4 as 3/4 of the total. There are seven parts in the total, so the first share is 3/7.',
      'Dividing by the number of people instead of the number of equal parts. Unequal ratios produce unequal shares.',
      'Swapping the names or categories. Write them in the same order as the ratio.',
      'Treating a known share or difference as the total. Identify exactly what the amount represents before dividing.',
      'Scaling one ratio number by adding a number instead of multiplying both by the same factor. Equivalent ratios preserve the multiplicative relationship.',
    ],
    questions: [
      { question: 'Share 42 counters between Ana and Bo in the ratio 2:5.', answer: 'Ana 12; Bo 30.', explanation: 'There are 7 parts. Each is 42 ÷ 7 = 6. Ana gets 2 × 6 = 12; Bo gets 5 × 6 = 30.' },
      { question: 'Share £96 between Kim and Mo in the ratio 5:7. How much does Mo receive?', answer: '£56', explanation: 'There are 12 parts, each worth £8. Mo receives seven parts, so 7 × £8 = £56.' },
      { question: 'Orange, purple and white beads are in the ratio 1:2:5. There are 64 beads. How many are white?', answer: '40 white beads', explanation: 'The total is 8 parts. One part is 64 ÷ 8 = 8 beads. White accounts for five parts, so 5 × 8 = 40.' },
      { question: 'Sam and Zara have points in the ratio 4:9. Sam has 28 points. How many does Zara have?', answer: '63 points', explanation: 'Sam’s four parts are 28, so each part is 7. Zara has nine parts: 9 × 7 = 63.' },
      { question: 'Blue and yellow tiles are in the ratio 3:5. What fraction of all the tiles is yellow?', answer: '5/8', explanation: 'There are 3 + 5 = 8 equal parts overall. Yellow takes five of those eight parts. The fraction is 5/8, not 5/3.' },
      { question: 'Stretch: Nina and Omar share prize money in the ratio 7:4. Nina receives £27 more than Omar. How much do they share altogether?', answer: '£99', explanation: 'The difference is 7 − 4 = 3 parts. Three parts are £27, so one part is £9. The combined 11 parts are 11 × £9 = £99. Their shares are £63 and £36, which differ by £27.' },
    ],
    relatedSlugs: ['fractions-of-amounts', 'percentages-of-amounts'], sources: [curriculumSource, parentSource],
  },
  {
    slug: 'percentages-of-amounts',
    title: '11+ Percentages of Amounts: Questions and Worked Answers',
    description: 'Find percentages using 10%, 1% and fraction shortcuts, then tackle discounts and money questions with three examples and six original practice questions.',
    subject: 'maths', status: 'draft', reviewedAt: '2026-10-07',
    introduction: [
      'A percentage describes an amount in hundredths. The symbol % means “per hundred”, so 35% means 35 out of every 100 equal parts. To find 35% of an amount, you need to find the value of those parts for that particular whole.',
      'Suggested difficulty: foundation to intermediate, with one stretch question. These are editorial estimates. You will need division by 10 and 100, multiplication and basic fractions. These original questions teach the method; they are not official past-paper questions or a prediction of a particular school’s exam.',
    ],
    sections: [
      { title: 'Start with useful building blocks', paragraphs: [
        'To find 10% of an amount, divide it by 10. To find 1%, divide it by 100. You can combine these amounts to make the percentage you need: 30% is three lots of 10%; 5% is half of 10%; 15% is 10% plus 5%.',
        'For example, if the whole is 240, then 10% is 24 and 1% is 2.4. The percentage remains the same kind of relationship whatever the whole is. But 10% of 240 and 10% of 80 are different amounts, because they start from different wholes.',
        'Do not round your building blocks too early. If 1% is a decimal, keep that value while calculating. For money, write the final amount clearly in pounds and pence, or in pence throughout.',
      ] },
      { title: 'Use a fraction when it is simpler', paragraphs: [
        '50% is 1/2, so halve the amount. 25% is 1/4, so divide by four. 75% is 3/4, so find one quarter and multiply by three. These are different ways of writing the same relationships, not separate rules to memorise without understanding.',
        'For a stretch calculation, 12.5% is 1/8 because it is half of 25%. You can find 12.5% by dividing by eight, or by finding a quarter and halving it. Use the method whose arithmetic feels clearest for the numbers in front of you.',
      ] },
      { title: 'Any percentage: the 1% method', paragraphs: [
        'For a whole-number percentage such as 17%, find 1% and multiply it by 17. Alternatively, combine 10%, 5% and 2%. Both methods work because you are adding equivalent portions of the same whole.',
        'A useful check for a percentage between 0% and 100% is that the answer lies between zero and the whole positive amount. A percentage above 100% can produce a larger answer; for example, 150% means one and a half times the amount.',
      ] },
      { title: 'Discount amount or final price?', paragraphs: [
        'A 20% discount is the amount taken off, not the price paid. If the question asks for the sale price, first calculate the discount and subtract it from the original price. Alternatively, calculate the 80% that remains.',
        'An increase works in the other direction: add the calculated increase to the original amount. Read the last line carefully. “Find 20% of the price” and “find the price after 20% off” request different answers.',
      ] },
      { title: 'What this lesson does not cover', paragraphs: [
        'Finding what percentage one amount is of another and recovering an original price after a percentage change are separate skills. Do not automatically reuse this method without identifying the whole. If a reduced price is given, that price may represent less than 100% of the original.',
        'Work through the practice before looking at the explanations. If you get an answer wrong, identify whether the error was choosing a percentage method, doing the arithmetic or answering the wrong part of the question. Try the calculation again with the whole and requested amount labelled.',
      ] },
    ],
    examples: [
      { question: 'Find 35% of 180.', steps: ['10% of 180 is 18.', '30% is 3 × 18 = 54, and 5% is half of 18 = 9.', '35% is 54 + 9 = 63.', 'Check: 35% is more than a quarter but less than a half. The answer 63 is between 45 and 90.'], answer: '63' },
      { question: 'A coat costs £64 before a 25% discount. What is the sale price?', steps: ['25% is one quarter, so the discount is £64 ÷ 4 = £16.', 'Subtract the discount from the original price: £64 − £16 = £48.', 'Check: the price paid is the remaining 75%, not the £16 saving.'], answer: '£48' },
      { question: 'Find 7% of £250.', steps: ['1% is £250 ÷ 100 = £2.50.', '7% is 7 × £2.50 = £17.50.', 'Check: 10% would be £25, so a 7% amount should be less than £25.'], answer: '£17.50' },
    ],
    mistakes: [
      'Writing the percentage number as the amount. 30% of 70 is 21, not 30.',
      'Dividing by the percentage. To find 20%, find one fifth or build it from 10%; do not divide the amount by 20.',
      'Giving the saving instead of the sale price. Subtract the discount when the question asks what you pay.',
      'Losing place value when dividing by 100. £250 ÷ 100 is £2.50, not £25.',
      'Comparing percentages without checking their wholes. A larger percentage of a smaller amount can still be less money.',
    ],
    questions: [
      { question: 'Find 20% of 85.', answer: '17', explanation: '10% is 8.5. Double that to get 20%: 8.5 × 2 = 17. Alternatively, 20% is one fifth, and 85 ÷ 5 = 17.' },
      { question: 'Find 75% of 92.', answer: '69', explanation: '25% is one quarter: 92 ÷ 4 = 23. Three quarters is 23 × 3 = 69.' },
      { question: 'Find 6% of £350.', answer: '£21', explanation: '1% is £3.50. Six lots of £3.50 equal £21.' },
      { question: 'A bag originally costs £80. Its price is reduced by 15%. What is the new price?', answer: '£68', explanation: '10% is £8 and 5% is £4, so the discount is £12. The new price is £80 − £12 = £68.' },
      { question: 'Which is greater: 40% of 65 or 30% of 90? By how much?', answer: '30% of 90 is greater by 1.', explanation: '40% of 65 is 4 × 6.5 = 26. 30% of 90 is 3 × 9 = 27. The smaller percentage gives the larger amount here because the whole is larger.' },
      { question: 'Stretch: A tank holds 72 litres when full. It currently contains 12.5% of its capacity. How many more litres are needed to fill it?', answer: '63 litres', explanation: '12.5% is one eighth, so the tank contains 72 ÷ 8 = 9 litres. It needs 72 − 9 = 63 more litres. The question asks for the missing amount, not the amount already inside.' },
    ],
    relatedSlugs: ['fractions-of-amounts', 'ratio-sharing'], sources: [curriculumSource, parentSource],
  },
];
