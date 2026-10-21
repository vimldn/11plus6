import type { BlogPost } from './blogPosts';

// Original skill articles; research: docs/serp-review-new-blogs-2026-10-21.md
export const OCTOBER_SKILL_POSTS: BlogPost[] = [
  {
    "slug": "11-plus-fractions-decimals-percentages-conversions",
    "title": "11+ Fractions, Decimals and Percentages: Conversions and Questions",
    "desc": "Learn to convert and compare fractions, decimals and percentages, with an equivalence table, worked examples and eight explained practice questions.",
    "subject": "maths",
    "date": "October 21, 2026",
    "readTime": "4 min read",
    "category": "Maths",
    "imageUrl": "/brand/book-journey.webp",
    "imageAlt": "An illustrated staircase of books leading towards a school",
    "images": [],
    "content": [
      {
        "type": "p",
        "text": "Original learning material for families preparing for 11-plus exams taken in 2027. These examples are not official exam questions; check your school’s current assessment guidance for the skills and format it uses."
      },
      {
        "type": "p",
        "text": "A fraction, decimal and percentage can name exactly the same number. The job in a conversion question is to change its form while keeping its value. That is different from finding a fraction of a quantity: rewriting 3/4 as 75% does not require an amount such as £40."
      },
      {
        "type": "h2",
        "text": "Understand what each form means"
      },
      {
        "type": "p",
        "text": "In 3/4, the denominator 4 tells you that a whole has four equal parts; the numerator 3 tells you how many parts are counted. In 0.75, the digits describe seven tenths and five hundredths. The percentage 75% means 75 out of every 100. Each represents the same position on a number line."
      },
      {
        "type": "p",
        "text": "Keep the whole in mind. If one whole is a litre, 0.75 of that whole is 750 ml. If the whole is a group of 20, 75% of it is 15. The representation stays the same; the quantity depends on the whole."
      },
      {
        "type": "h2",
        "text": "A useful conversion table"
      },
      {
        "type": "table",
        "headers": [
          "Fraction",
          "Decimal",
          "Percentage"
        ],
        "rows": [
          [
            "1/2",
            "0.5",
            "50%"
          ],
          [
            "1/4",
            "0.25",
            "25%"
          ],
          [
            "3/4",
            "0.75",
            "75%"
          ],
          [
            "1/5",
            "0.2",
            "20%"
          ],
          [
            "2/5",
            "0.4",
            "40%"
          ],
          [
            "1/10",
            "0.1",
            "10%"
          ],
          [
            "1/8",
            "0.125",
            "12.5%"
          ],
          [
            "3/8",
            "0.375",
            "37.5%"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Use these as landmarks rather than eight unrelated facts. For example, half of 1/4 is 1/8, so half of 0.25 is 0.125 and half of 25% is 12.5%. Deriving a forgotten fact is more useful than guessing."
      },
      {
        "type": "h2",
        "text": "Three worked examples"
      },
      {
        "type": "h3",
        "text": "Fraction to decimal and percentage: 3/20"
      },
      {
        "type": "p",
        "text": "Make an equivalent fraction with denominator 100: multiply both numerator and denominator by 5. This gives 15/100, so 3/20 = 0.15 = 15%. Check that the result is below 1/4: 15% is below 25%, as expected. You can also divide 3 by 20 to obtain the decimal."
      },
      {
        "type": "h3",
        "text": "Decimal to a simplified fraction: 0.36"
      },
      {
        "type": "p",
        "text": "The final digit is in the hundredths place, so write 36/100. Divide both numbers by 4 to get 9/25. Do not write 36/10: that would be 3.6, which is greater than one. Checking the size of the result catches the place-value error."
      },
      {
        "type": "h3",
        "text": "Compare mixed forms: 0.62, 5/8 and 61%"
      },
      {
        "type": "p",
        "text": "Choose decimals for all three. They become 0.620, 0.625 and 0.610. From smallest to largest: 61%, 0.62, 5/8. Write the original forms in the final answer so it is clear which item goes where. Adding a zero after the last decimal digit does not change its value."
      },
      {
        "type": "h2",
        "text": "Choose the right conversion route"
      },
      {
        "type": "ol",
        "items": [
          "Fraction to decimal: divide the numerator by the denominator, or make an equivalent denominator of 10, 100 or 1000 when convenient.",
          "Decimal to fraction: use place value to write tenths, hundredths or thousandths, then simplify.",
          "Decimal to percentage: multiply the numerical value by 100 and include the % sign. Reverse this by dividing by 100.",
          "Percentage to fraction: write the percentage over 100 and simplify. Keep decimal percentages accurate; 12.5% = 12.5/100 = 125/1000 = 1/8."
        ]
      },
      {
        "type": "p",
        "text": "Some fractions produce recurring decimals. A third is 0.333… rather than exactly 0.33. If a question asks for an exact value, retain 1/3 or the recurring form. Round only when instructed. Numbers can also exceed one: 1.2 = 6/5 = 120%; a percentage need not be below 100%."
      },
      {
        "type": "h2",
        "text": "Eight questions: try before opening each answer"
      },
      {
        "type": "question",
        "text": "1. Write 7/20 as a decimal and a percentage.",
        "answer": "0.35 and 35%.",
        "explanation": "7/20 = 35/100. Thirty-five hundredths is 0.35, and 35 per hundred is 35%."
      },
      {
        "type": "question",
        "text": "2. Write 0.045 as a fraction in its simplest form and as a percentage.",
        "answer": "9/200 and 4.5%.",
        "explanation": "0.045 = 45/1000. Divide numerator and denominator by 5 to get 9/200. Multiplying the decimal by 100 gives 4.5%."
      },
      {
        "type": "question",
        "text": "3. Write 18% as a decimal and a simplified fraction.",
        "answer": "0.18 and 9/50.",
        "explanation": "18% = 18/100 = 0.18. Dividing 18 and 100 by 2 gives 9/50."
      },
      {
        "type": "question",
        "text": "4. Order 3/8, 0.37 and 38% from smallest to largest.",
        "answer": "0.37, 3/8, 38%.",
        "explanation": "Convert to decimals: 0.375, 0.370 and 0.380. Compare the thousandths after aligning decimal places."
      },
      {
        "type": "question",
        "text": "5. Express 1.2 as an improper fraction in simplest form and as a percentage.",
        "answer": "6/5 and 120%.",
        "explanation": "1.2 = 12/10 = 6/5. As a percentage it is 1.2 × 100 = 120%. Both are greater than one whole."
      },
      {
        "type": "question",
        "text": "6. A pupil writes 3/5 = 0.35. Explain the mistake and correct it.",
        "answer": "3/5 = 0.6.",
        "explanation": "The digits of a numerator and denominator cannot simply be put after a decimal point. Multiply both by 2: 3/5 = 6/10 = 0.6. Three fifths is also greater than half, whereas 0.35 is below half."
      },
      {
        "type": "question",
        "text": "7. Is 0.6 larger than 0.60, smaller, or equal? Explain.",
        "answer": "They are equal.",
        "explanation": "Six tenths is sixty hundredths. A trailing zero after a decimal does not change the value; 0.6 = 0.60 = 60%."
      },
      {
        "type": "question",
        "text": "8. Write 1/3 as a percentage rounded to the nearest whole percent.",
        "answer": "33%.",
        "explanation": "1 ÷ 3 × 100 = 33.333…%. The next digit after the whole percent is 3, so round down. Here 33% is a rounded answer, not an exact equivalent of 1/3."
      },
      {
        "type": "h2",
        "text": "What should you practise next?"
      },
      {
        "type": "p",
        "text": "If the conversion is secure but applying it is difficult, use [fractions of amounts](/subjects/maths/fractions-of-amounts) and [percentages of amounts](/subjects/maths/percentages-of-amounts). For mixed contexts, try [multi-step word problems](/blog/11-plus-multi-step-word-problems). Return to the [Maths hub](/subjects/maths) to choose another skill."
      },
      {
        "type": "h2",
        "text": "Source and scope"
      },
      {
        "type": "p",
        "text": "The [DfE mathematics programme](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study) provides the curriculum reference for equivalence and place value. It is not a promise about an individual school’s 11-plus syllabus. Source checked 21 October 2026; examples and answers are our original practice."
      }
    ]
  },
  {
    "slug": "11-plus-multi-step-word-problems",
    "title": "11+ Multi-Step Word Problems: A Method and Eight Practice Questions",
    "desc": "Turn word problems into labelled steps, handle units and remainders, and check eight original questions with full worked explanations.",
    "subject": "maths",
    "date": "October 21, 2026",
    "readTime": "6 min read",
    "category": "Maths",
    "imageUrl": "/brand/book-journey.webp",
    "imageAlt": "An illustrated staircase of books leading towards a school",
    "images": [],
    "content": [
      {
        "type": "p",
        "text": "Original learning material for families preparing for 11-plus exams taken in 2027. These examples are not official exam questions; check your school’s current assessment guidance for the skills and format it uses."
      },
      {
        "type": "p",
        "text": "The arithmetic in a word problem may be familiar while the route to it is not. Before calculating, decide what the final answer must describe. A correct total is still the wrong answer if the question asks for change. This guide makes those decisions visible."
      },
      {
        "type": "h2",
        "text": "Make a plan before you calculate"
      },
      {
        "type": "ol",
        "items": [
          "Read the whole situation, then restate the final question: “I need the money left” or “I need the number of vehicles”.",
          "List the quantities you need, with their units. Convert metres to centimetres or pounds to pence when the calculation requires a common unit.",
          "Write short labels for the intermediate answers. A label such as “cost of all tickets” stops that number being mistaken for the final result.",
          "Calculate in the order your plan requires, retaining working and avoiding early rounding.",
          "Read the final sentence again. Check the size, unit and whether a remainder changes what the answer means."
        ]
      },
      {
        "type": "p",
        "text": "A sketch, a bar or a small table can show the relationships without being elaborate. If you know the total and what has been used, the missing part is a subtraction. If equal groups are being combined, multiplication may help. Let the situation decide rather than treating a word as an automatic operation command."
      },
      {
        "type": "h2",
        "text": "Worked example: total cost is not change"
      },
      {
        "type": "p",
        "text": "A garden club buys four seed trays at £3.65 each and compost costing £6.80. It pays with £30. How much change is due? First label tray cost: 4 × £3.65 = £14.60. Next label total cost: £14.60 + £6.80 = £21.40. Finally calculate change: £30 − £21.40 = £8.60."
      },
      {
        "type": "p",
        "text": "£21.40 is a sensible intermediate answer, but it describes the purchase rather than the change. Check by adding: £21.40 + £8.60 = £30. An estimate also helps: trays cost around £16 and compost around £7, so change should be several pounds, not £20."
      },
      {
        "type": "h2",
        "text": "Worked example: a fraction of what remains"
      },
      {
        "type": "p",
        "text": "A club has 72 stickers. It gives away one third of them, then uses half of the remaining stickers on posters. How many are left? One third of 72 is 24, leaving 48. Half of the remaining 48 is 24, leaving 24 stickers. The second fraction applies to 48, not to the original 72."
      },
      {
        "type": "p",
        "text": "Compare a different instruction: if the club used half of the original stickers on posters, it would use 36 and have 72 − 24 − 36 = 12 left. Both calculations are reasonable for different stories. Underline “remaining” or “original” because these change the mathematical relationship."
      },
      {
        "type": "h2",
        "text": "Worked example: interpret a remainder"
      },
      {
        "type": "p",
        "text": "Ninety-four pupils and eight adults need transport. Each minibus has room for 16 passengers, excluding its driver. How many minibuses are needed? There are 94 + 8 = 102 passengers. Six minibuses hold 96, which leaves six people without seats. Seven are needed. Rounding 102 ÷ 16 to the nearest whole number would give six and fail the actual requirement."
      },
      {
        "type": "h2",
        "text": "Eight original problems"
      },
      {
        "type": "p",
        "text": "Work without a time limit first. For each question, write one short sentence explaining your plan. The answer panels include the calculations, but try to identify the required steps before revealing them."
      },
      {
        "type": "question",
        "text": "1. Five notebooks cost £1.75 each and three pens cost 60p each. What change is due from £20?",
        "answer": "£9.45.",
        "explanation": "Notebooks: 5 × £1.75 = £8.75. Pens: 3 × £0.60 = £1.80. Total: £10.55. Change: £20 − £10.55 = £9.45. Check: £10.55 + £9.45 = £20."
      },
      {
        "type": "question",
        "text": "2. A ribbon is 3.6 m long. Five pieces of 45 cm are cut from it. How many centimetres remain?",
        "answer": "135 cm.",
        "explanation": "Convert 3.6 m to 360 cm. The pieces use 5 × 45 = 225 cm. The remaining length is 360 − 225 = 135 cm. Giving 1.35 without a unit would not answer the request in centimetres."
      },
      {
        "type": "question",
        "text": "3. A rehearsal begins at 13:48, lasts 57 minutes, and is followed immediately by 18 minutes of packing. When does packing finish?",
        "answer": "15:03.",
        "explanation": "From 13:48, add 12 minutes to reach 14:00, then 45 more to reach 14:45. Add 18 minutes: 15:03. The complete interval is 75 minutes."
      },
      {
        "type": "question",
        "text": "4. A group has 87 people. Each table seats eight. How many tables are needed, and how many seats will be empty?",
        "answer": "11 tables, with 1 empty seat.",
        "explanation": "Ten tables seat 80 and are insufficient. Eleven seat 88, so one place is empty. The remainder represents people needing another table, not a fraction of a table to use."
      },
      {
        "type": "question",
        "text": "5. A tank contains 180 litres. One third of the water is used, then one quarter of the remaining water is used. How much water remains?",
        "answer": "90 litres.",
        "explanation": "First use: 180 ÷ 3 = 60 litres, leaving 120. Second use: 120 ÷ 4 = 30 litres, leaving 90. Adding 60 + 30 + 90 gives the original 180."
      },
      {
        "type": "question",
        "text": "6. A kit costs £48 before a 25% discount. Delivery then costs £3.50. What is the final cost?",
        "answer": "£39.50.",
        "explanation": "The discount is 48 ÷ 4 = £12. The reduced kit costs £36. Add delivery after the discount: £36 + £3.50 = £39.50. The wording does not discount delivery."
      },
      {
        "type": "question",
        "text": "7. A pupil has £29 and wants equipment costing £83. They save £8 each week. How many more full weeks are needed?",
        "answer": "7 weeks.",
        "explanation": "The shortfall is £83 − £29 = £54. Six weeks add £48, giving only £77. Seven weeks add £56, giving £85. The first affordable week is week seven."
      },
      {
        "type": "question",
        "text": "8. Three identical packets contain 18 beads each. Seven beads are set aside; the rest are shared equally between four children. How many does each receive, and how many are left over?",
        "answer": "11 beads each, with 3 left over.",
        "explanation": "Start with 3 × 18 = 54 beads. After setting aside seven, 47 remain to share. 47 = 4 × 11 + 3. Check the complete story: 7 + 44 + 3 = 54."
      },
      {
        "type": "h2",
        "text": "Repair the plan, not just the arithmetic"
      },
      {
        "type": "p",
        "text": "If an answer is wrong, ask which line changed the meaning of the question. Was a fraction applied to the wrong whole? Were minutes treated as hundredths of an hour? Was the calculation stopped at a subtotal? Repeating the same arithmetic faster will not fix a misunderstood relationship."
      },
      {
        "type": "p",
        "text": "Words alone are unreliable shortcuts. In “£12 is shared equally between three people”, “equally” leads to division. In “three people each receive £12”, the total is found by multiplication. Explain what is being counted before choosing the operation."
      },
      {
        "type": "h2",
        "text": "Build the component skills"
      },
      {
        "type": "p",
        "text": "Use [fraction, decimal and percentage conversions](/blog/11-plus-fractions-decimals-percentages-conversions) when forms are mixed, [ratio sharing](/subjects/maths/ratio-sharing) for unequal groups, and [algebra basics](/blog/11-plus-algebra-basics) when a missing number can be named. The [Maths hub](/subjects/maths) links to further practice."
      },
      {
        "type": "p",
        "text": "Skill reference: [DfE mathematics programme](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study), checked 21 October 2026. Curriculum guidance does not determine every school’s entrance-test content. These are original questions with worked checks, not an official paper or an exam-score prediction."
      }
    ]
  },
  {
    "slug": "11-plus-algebra-basics",
    "title": "11+ Algebra Basics: Missing Numbers, Equations and Worked Answers",
    "desc": "Understand expressions, substitution and simple equations, then try eight original algebra questions with step-by-step answers and checking methods.",
    "subject": "maths",
    "date": "October 21, 2026",
    "readTime": "5 min read",
    "category": "Maths",
    "imageUrl": "/brand/book-journey.webp",
    "imageAlt": "An illustrated staircase of books leading towards a school",
    "images": [],
    "content": [
      {
        "type": "p",
        "text": "Original learning material for families preparing for 11-plus exams taken in 2027. These examples are not official exam questions; check your school’s current assessment guidance for the skills and format it uses."
      },
      {
        "type": "p",
        "text": "Algebra gives a name to a number you do not yet know, or a quantity that can vary. If a box plus seven equals nineteen, you already know how to find the missing value. Writing x + 7 = 19 records the same problem with a letter instead of a box."
      },
      {
        "type": "h2",
        "text": "Know what the symbols are saying"
      },
      {
        "type": "table",
        "headers": [
          "Notation",
          "Meaning"
        ],
        "rows": [
          [
            "x",
            "An unknown or variable; the question tells you how it is used"
          ],
          [
            "4x",
            "4 multiplied by x, not 4 plus x"
          ],
          [
            "x + 6",
            "An expression: a calculation involving x"
          ],
          [
            "x + 6 = 17",
            "An equation: the two sides have equal values"
          ],
          [
            "2(x + 3)",
            "Two lots of the complete amount x + 3"
          ]
        ]
      },
      {
        "type": "p",
        "text": "An expression has no equals sign telling you what it must equal. You can evaluate it when given a value, or sometimes simplify it. An equation gives a relationship you can use to find an unknown. Do not try to “solve x” in 3x + 5 unless you are given more information."
      },
      {
        "type": "h2",
        "text": "Worked example: substitute a value"
      },
      {
        "type": "p",
        "text": "Find the value of 4a + 3 when a = 6. Replace the letter with six: 4 × 6 + 3 = 24 + 3 = 27. Multiplication happens before addition here. The expression is not 46 + 3, because writing a number next to a letter indicates multiplication."
      },
      {
        "type": "p",
        "text": "Brackets can change the result. With a = 6, the expression 4(a + 3) gives 4 × (6 + 3) = 4 × 9 = 36. Compare 27 and 36: the first expression adds three once; the second adds three inside each of four groups."
      },
      {
        "type": "h2",
        "text": "Worked example: solve and keep the balance"
      },
      {
        "type": "p",
        "text": "Solve 5x + 8 = 43. Subtract eight from both sides: 5x = 35. Divide both sides by five: x = 7. The point of doing the same thing to each side is to preserve equality. You are changing the equation into a simpler equivalent one, not merely moving symbols around."
      },
      {
        "type": "p",
        "text": "Now substitute seven into the original equation: 5 × 7 + 8 = 35 + 8 = 43. This confirms the value satisfies the equation. If you check only the final line x = 7, you have not checked the original relationship."
      },
      {
        "type": "h2",
        "text": "Worked example: reverse a function machine"
      },
      {
        "type": "p",
        "text": "A machine multiplies an input by four, then subtracts nine. Its output is 31. Undo the last step first: 31 + 9 = 40. Undo multiplying by four: 40 ÷ 4 = 10. The input is ten. Checking forwards gives 10 × 4 − 9 = 31."
      },
      {
        "type": "p",
        "text": "The order matters. Dividing 31 by four before adding nine would reverse the individual operations in the wrong order. A useful question is: “What was the last thing done to the number?” That is the first thing to undo."
      },
      {
        "type": "h2",
        "text": "Form an equation from a short story"
      },
      {
        "type": "p",
        "text": "A workshop charges £6 to enter and £3 for each model made. If a visitor pays £24 altogether, let m be the number of models. The charge is 6 + 3m = 24. Subtract six to get 3m = 18, then divide by three: m = 6. Check the answer as a cost: £6 + six lots of £3 = £24."
      },
      {
        "type": "p",
        "text": "Keep the meaning of the letter clear. Here m counts models; it does not mean money. Labelling a variable prevents a numerical answer from being attached to the wrong quantity in a longer problem."
      },
      {
        "type": "h2",
        "text": "Eight algebra questions with answers"
      },
      {
        "type": "question",
        "text": "1. Evaluate 3b + 7 when b = 5.",
        "answer": "22.",
        "explanation": "Replace b with five: 3 × 5 + 7 = 15 + 7 = 22. Complete multiplication before addition."
      },
      {
        "type": "question",
        "text": "2. Solve x + 9 = 26.",
        "answer": "x = 17.",
        "explanation": "Subtract nine from both sides. Check: 17 + 9 = 26."
      },
      {
        "type": "question",
        "text": "3. Solve 6n = 54.",
        "answer": "n = 9.",
        "explanation": "6n means six multiplied by n. Divide both sides by six. Check: 6 × 9 = 54."
      },
      {
        "type": "question",
        "text": "4. Solve 4y − 7 = 29.",
        "answer": "y = 9.",
        "explanation": "Add seven to both sides: 4y = 36. Divide by four. Check: 4 × 9 − 7 = 36 − 7 = 29."
      },
      {
        "type": "question",
        "text": "5. Solve 3(t + 2) = 30.",
        "answer": "t = 8.",
        "explanation": "Divide both sides by three: t + 2 = 10. Subtract two. Check with the brackets intact: 3 × (8 + 2) = 30."
      },
      {
        "type": "question",
        "text": "6. A machine adds five, then multiplies by three. The output is 42. What was the input?",
        "answer": "9.",
        "explanation": "Undo multiplying by three: 42 ÷ 3 = 14. Undo adding five: 14 − 5 = 9. Check: (9 + 5) × 3 = 42."
      },
      {
        "type": "question",
        "text": "7. Three identical badges and a £4 pouch cost £19. Write and solve an equation for the price b of one badge in pounds.",
        "answer": "3b + 4 = 19, so b = 5.",
        "explanation": "Subtract four: 3b = 15. Divide by three: b = 5. The original purchase costs 3 × £5 + £4 = £19."
      },
      {
        "type": "question",
        "text": "8. A pupil says 4x + 3 = 7x. Is that an algebraic identity? Explain using x = 2.",
        "answer": "No. With x = 2, the sides are 11 and 14.",
        "explanation": "4x and 3 are unlike terms, so they cannot be combined as 7x. Substitution gives 4 × 2 + 3 = 11, while 7 × 2 = 14. They happen to be equal when x = 1, but an identity must hold for every allowed value."
      },
      {
        "type": "h2",
        "text": "Three mistakes to watch for"
      },
      {
        "type": "ul",
        "items": [
          "Subtracting the coefficient: in 5x = 35, undo multiplication by dividing by five, not subtracting five.",
          "Checking a changed equation but not the original: a slip in an earlier line can survive a check of only the last step.",
          "Forgetting brackets: 2(x + 4) includes two lots of four; it is not the same expression as 2x + 4."
        ]
      },
      {
        "type": "h2",
        "text": "Where this fits in preparation"
      },
      {
        "type": "p",
        "text": "These beginner skills can support [multi-step word problems](/blog/11-plus-multi-step-word-problems). For more original question practice, try the [fresh maths set](/quiz?paper=maths-generated&mode=practice), which includes equations alongside other skills, or return to the [Maths hub](/subjects/maths). A practice score is not a prediction of an entrance-exam result."
      },
      {
        "type": "p",
        "text": "The [DfE mathematics programme](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study) includes algebraic missing-number work and simple formulae in Year 6. It is a curriculum reference, not a guarantee that a particular 11-plus test uses these question types. Source checked 21 October 2026. No educator endorsement or official-paper affiliation is claimed."
      }
    ]
  },
  {
    "slug": "11-plus-vocabulary-in-context",
    "title": "11+ Vocabulary in Context: A Passage, Questions and Explained Answers",
    "desc": "Use context to choose the right meaning of a word, with an original passage, worked comparisons and eight explained vocabulary questions.",
    "subject": "english",
    "date": "October 21, 2026",
    "readTime": "6 min read",
    "category": "English",
    "imageUrl": "/brand/book-journey.webp",
    "imageAlt": "An illustrated staircase of books leading towards a school",
    "images": [],
    "content": [
      {
        "type": "p",
        "text": "Original learning material for families preparing for 11-plus exams taken in 2027. These examples are not official exam questions; check your school’s current assessment guidance for the skills and format it uses."
      },
      {
        "type": "p",
        "text": "Knowing a definition is useful, but a word can carry different meanings in different sentences. A light suitcase is easy to lift; a light room is bright. Vocabulary-in-context questions ask you to identify the meaning that fits the particular passage, not the first meaning you remember."
      },
      {
        "type": "h2",
        "text": "What does “in context” ask you to do?"
      },
      {
        "type": "p",
        "text": "Context is the surrounding language and situation. A nearby contrast, an action or a description can narrow the meaning. If the passage says someone gives a faint smile, “faint” describes how slight the smile is; it does not mean that the person has lost consciousness."
      },
      {
        "type": "p",
        "text": "Read the exact instruction. “Which word is closest in meaning?” invites comparison between options. “Replace the word” also requires a grammatical fit. “Explain what the phrase means” may need several words. You do not need to retell the entire story if a short, precise explanation answers the question."
      },
      {
        "type": "h2",
        "text": "A method for testing a possible meaning"
      },
      {
        "type": "ol",
        "items": [
          "Locate the target word and read the full sentence. Read a little further when the meaning depends on another sentence.",
          "Decide what kind of job the word is doing: naming a thing, describing it, describing an action, or expressing an action.",
          "Suggest a plain meaning before choosing between the options.",
          "Test that meaning in the sentence. Does it preserve both the sense and the strength of the original?",
          "Reject answers that describe the scene generally but do not explain the target word."
        ]
      },
      {
        "type": "h2",
        "text": "Worked comparisons: the sentence decides"
      },
      {
        "type": "h3",
        "text": "The same word, two meanings"
      },
      {
        "type": "p",
        "text": "“The guide spoke in a grave voice after the accident.” Here grave means serious or solemn. It does not name a burial place, even though that is another meaning of the word. The word describes “voice”, so a noun naming a place would not fit this use."
      },
      {
        "type": "h3",
        "text": "A related word can still be too strong"
      },
      {
        "type": "p",
        "text": "“Mila was uneasy about the unfamiliar route, but she agreed to lead.” Uneasy means worried or uncomfortable here. “Terrified” is much stronger and is not required by the sentence. When comparing options, look for the closest meaning, not the most dramatic one."
      },
      {
        "type": "p",
        "text": "Do not assume every question can be solved from a single obvious clue. Sometimes the passage only narrows the possibilities and your existing vocabulary completes the decision. If you are practising, check an unfamiliar meaning in a dictionary after attempting it, then write a new sentence of your own."
      },
      {
        "type": "h2",
        "text": "Original passage: Before the observatory opened"
      },
      {
        "type": "p",
        "text": "Eli had reserved two places for the evening tour, but he remained his usual reserved self when the guide welcomed them. His sister Asha asked the questions. Outside, a sharp wind rattled the notices against the observatory door."
      },
      {
        "type": "p",
        "text": "Inside, the guide lifted a dull brass cover from the telescope. Beneath the dust, Asha could see where the metal had once shone. A narrow beam from a torch crossed the floor and stopped beside a heavy wooden beam supporting the roof."
      },
      {
        "type": "p",
        "text": "“The old stand is sound,” the guide explained, pressing its firm joints. “The small glass lens is delicate, though.” Asha took the light paper chart instead of the thick atlas; she wanted something easy to carry up the stairs. Curious about the unfamiliar star symbols, she asked what each one meant. Eli moved closer to listen."
      },
      {
        "type": "h2",
        "text": "Eight questions about word meaning"
      },
      {
        "type": "p",
        "text": "Use the passage above for every question. For written answers, a different phrase can be correct if it preserves the meaning. The explanations show the evidence for each suggested answer; they are not an official school mark scheme."
      },
      {
        "type": "question",
        "text": "1. In “he remained his usual reserved self”, does reserved mean booked, quiet, damaged or expensive?",
        "answer": "Quiet.",
        "explanation": "It describes Eli’s manner, and Asha is the one asking questions. “Booked” fits the earlier use, “reserved two places”, but not his personality."
      },
      {
        "type": "question",
        "text": "2. Which meaning best fits sharp in “a sharp wind”: pointed, biting, clever or sudden?",
        "answer": "Biting.",
        "explanation": "The adjective describes the uncomfortable wind outside. “Pointed” is a possible meaning for a sharp object, but the wind is not a pointed object. “Sudden” concerns when it arrives rather than its biting feel."
      },
      {
        "type": "question",
        "text": "3. Explain dull as it describes the brass cover.",
        "answer": "Not shiny or bright.",
        "explanation": "Dust covers the metal, and Asha notices where it had once shone. The contrast is about its surface appearance, not whether the cover is interesting."
      },
      {
        "type": "question",
        "text": "4. In “a narrow beam from a torch”, what does beam mean?",
        "answer": "A ray or narrow stream of light.",
        "explanation": "The torch produces the beam that crosses the floor. The later wooden beam is a roof support: the same spelling has a different meaning there."
      },
      {
        "type": "question",
        "text": "5. Which meaning fits sound in “The old stand is sound”: noisy, secure, musical or sleepy?",
        "answer": "Secure.",
        "explanation": "The guide presses its firm joints. Sound describes a stand in good, stable condition; it does not refer to something the stand can hear or make."
      },
      {
        "type": "question",
        "text": "6. What does delicate suggest about the small glass lens?",
        "answer": "It is fragile and needs careful handling.",
        "explanation": "The guide contrasts the firm stand with the delicate glass lens. The relevant meaning is easily damaged, not beautiful or tasty."
      },
      {
        "type": "question",
        "text": "7. Replace light in “the light paper chart” with a short phrase that preserves its meaning here.",
        "answer": "Not heavy.",
        "explanation": "Asha chooses it instead of a thick atlas because she wants something easy to carry. The passage is comparing weight, not brightness or colour."
      },
      {
        "type": "question",
        "text": "8. In “Curious about the unfamiliar star symbols”, is Asha strange, interested, annoyed or exhausted?",
        "answer": "Interested.",
        "explanation": "She asks what each symbol means. This shows a desire to find out, rather than the alternative meaning of curious as odd or unusual."
      },
      {
        "type": "h2",
        "text": "How to improve an imprecise answer"
      },
      {
        "type": "p",
        "text": "Compare “Sound means good” with “Sound means the stand is secure and in good condition”. The second answer identifies what kind of goodness matters. It remains short, but its meaning is clearer. Compare “Delicate means you should be nice” with “The glass could break, so it needs careful handling”. The latter explains the relevant sense without inventing an event."
      },
      {
        "type": "p",
        "text": "A useful practice note has three parts: the original phrase, a plain meaning, and the detail that supports it. Add a second sentence showing another meaning when the word has one. For example, contrast a “sound stand” with the “sound of footsteps”. This tests understanding rather than copying a definition."
      },
      {
        "type": "h2",
        "text": "Link this skill to comprehension"
      },
      {
        "type": "p",
        "text": "For conclusions about a character, move to [inference](/subjects/english/comprehension-inference). For choosing a supporting quotation, use [evidence in comprehension](/subjects/english/using-evidence). When writing dialogue of your own, check [direct-speech punctuation](/blog/11-plus-direct-speech-punctuation). The [English hub](/subjects/english) brings these different skills together."
      },
      {
        "type": "p",
        "text": "Skill reference: [DfE English programme](https://www.gov.uk/government/publications/national-curriculum-in-england-english-programmes-of-study/national-curriculum-in-england-english-programmes-of-study), checked 21 October 2026. The passage and exercises are original. This guide supports vocabulary learning; it does not claim that all entrance tests use one question format."
      }
    ]
  },
  {
    "slug": "11-plus-direct-speech-punctuation",
    "title": "11+ Direct Speech Punctuation: Rules, Examples and Practice",
    "desc": "Learn speech marks, reporting clauses and split dialogue, then correct eight original examples with explained answers for 11-plus English preparation.",
    "subject": "english",
    "date": "October 21, 2026",
    "readTime": "6 min read",
    "category": "English",
    "imageUrl": "/brand/book-journey.webp",
    "imageAlt": "An illustrated staircase of books leading towards a school",
    "images": [],
    "content": [
      {
        "type": "p",
        "text": "Original learning material for families preparing for 11-plus exams taken in 2027. These examples are not official exam questions; check your school’s current assessment guidance for the skills and format it uses."
      },
      {
        "type": "p",
        "text": "Direct speech records the words a character says. Its punctuation helps a reader separate those spoken words from the narrator’s explanation. Learn the parts first, then check how they join. A long list of punctuation rules is easier to use when you can see who is speaking and which words belong inside the speech marks."
      },
      {
        "type": "h2",
        "text": "Separate speech from the reporting clause"
      },
      {
        "type": "p",
        "text": "In Asha said, “The telescope is ready.” the spoken words are “The telescope is ready.” The reporting clause is Asha said. It identifies the speaker but is not part of what Asha says. Put speech marks around the spoken words, not around the whole sentence."
      },
      {
        "type": "p",
        "text": "This guide uses double speech marks. Single inverted commas can also be used consistently; follow the convention and instructions in the task you are given. The purpose is the same: mark where the exact speech begins and ends."
      },
      {
        "type": "h2",
        "text": "Four patterns to understand"
      },
      {
        "type": "h3",
        "text": "1. Reporting clause before the speech"
      },
      {
        "type": "p",
        "text": "Noah replied, “I will bring the chart.” Use a comma after the reporting clause in this ordinary pattern. Begin the spoken sentence with a capital letter and place its full stop before the closing speech mark."
      },
      {
        "type": "h3",
        "text": "2. Reporting clause after a statement"
      },
      {
        "type": "p",
        "text": "“I will bring the chart,” Noah replied. The comma belongs inside the closing speech mark, and the reporting clause continues the sentence. The full stop comes after replied. A pronoun such as he stays lower case; a name such as Noah keeps its normal capital."
      },
      {
        "type": "h3",
        "text": "3. A spoken question or exclamation"
      },
      {
        "type": "p",
        "text": "“Where is the chart?” he asked. The question mark belongs to the spoken question, so it stays inside the speech marks. Do not add a comma after it. Similarly: “Look out!” she shouted. The reporting clause is still part of the surrounding sentence, so she is not capitalised merely because an exclamation mark appears before it."
      },
      {
        "type": "h3",
        "text": "4. A separate action sentence"
      },
      {
        "type": "p",
        "text": "“The chart is here.” Noah opened the folder. Opened describes an action rather than reporting how Noah speaks. The speech therefore ends with a full stop, and the separate action sentence begins with a capital. Do not join a complete statement to an action using the pattern “The chart is here,” Noah opened the folder."
      },
      {
        "type": "h2",
        "text": "Split speech: one sentence or two?"
      },
      {
        "type": "p",
        "text": "“If the clouds clear,” said Asha, “we can look for Saturn.” Remove the reporting clause to check the spoken sentence: “If the clouds clear, we can look for Saturn.” It is one sentence interrupted by a reporting clause. The continuation begins with lower-case we, and commas separate the interruption."
      },
      {
        "type": "p",
        "text": "Compare: “The clouds are clearing,” said Asha. “We can look for Saturn.” These are two complete spoken sentences, so the reporting clause ends with a full stop and the next spoken sentence begins with capital We. Do not assume every interruption must be followed by a lower-case word; inspect the sentence structure."
      },
      {
        "type": "h2",
        "text": "Start a new paragraph when the speaker changes"
      },
      {
        "type": "p",
        "text": "A change of speaker starts a new paragraph in ordinary prose dialogue. This helps a reader track a conversation without needing “said” after every line. Paragraphing and speech marks work together: a new paragraph does not replace the need to show where the spoken words begin and end."
      },
      {
        "type": "h2",
        "text": "Eight punctuation questions"
      },
      {
        "type": "p",
        "text": "Correct the sentences below without changing their intended words. Double speech marks are used in the suggested answers. In the final dialogue, the line break represents a new paragraph. Read the explanation after making your own correction."
      },
      {
        "type": "question",
        "text": "1. Add punctuation: Leah said the lantern is in the cupboard",
        "answer": "Leah said, “The lantern is in the cupboard.”",
        "explanation": "The reporting clause comes first, followed by a comma. The spoken sentence begins with a capital and its full stop goes inside the closing speech mark."
      },
      {
        "type": "question",
        "text": "2. Correct: “The bridge is safe.” he said.",
        "answer": "“The bridge is safe,” he said.",
        "explanation": "The reporting clause follows a spoken statement. Replace the full stop inside the speech with a comma; keep he lower case and end the whole sentence after said."
      },
      {
        "type": "question",
        "text": "3. Add punctuation: where did you leave the map she asked",
        "answer": "“Where did you leave the map?” she asked.",
        "explanation": "This is a direct question. Capitalise Where, put the question mark inside the speech marks, and finish the reporting clause with a full stop. No additional comma follows the question mark."
      },
      {
        "type": "question",
        "text": "4. Correct: “Stop”! shouted Arun.",
        "answer": "“Stop!” shouted Arun.",
        "explanation": "The exclamation mark is part of the speech and belongs before the closing speech mark. The reporting clause then completes the surrounding sentence."
      },
      {
        "type": "question",
        "text": "5. Punctuate as one interrupted spoken sentence: if we leave now said Mei we can catch the bus",
        "answer": "“If we leave now,” said Mei, “we can catch the bus.”",
        "explanation": "Removing said Mei gives one sentence: If we leave now, we can catch the bus. Commas mark the reporting clause and we continues in lower case."
      },
      {
        "type": "question",
        "text": "6. Punctuate as two complete spoken sentences: the rain has stopped said Mei we can go outside",
        "answer": "“The rain has stopped,” said Mei. “We can go outside.”",
        "explanation": "Each spoken sentence can stand alone. End the reporting clause with a full stop; begin the second spoken sentence with capital We."
      },
      {
        "type": "question",
        "text": "7. Correct: “I found it,” Priya lifted the notebook.",
        "answer": "“I found it.” Priya lifted the notebook.",
        "explanation": "Lifted describes a separate action, not a speaking verb. The speech is a complete sentence, followed by the action sentence. Priya keeps its capital as a name."
      },
      {
        "type": "question",
        "text": "8. Punctuate and paragraph this exchange: are you ready asked Ben almost replied Imani",
        "answer": "“Are you ready?” asked Ben.\n“Almost,” replied Imani.",
        "explanation": "Ben asks a question, so the question mark stays inside his speech marks. Imani is a new speaker and starts a new paragraph. Her short reply takes a comma before its reporting clause."
      },
      {
        "type": "h2",
        "text": "A final checking routine"
      },
      {
        "type": "ol",
        "items": [
          "Underline only the words said aloud. Check that each stretch has opening and closing speech marks.",
          "Find the reporting clause or separate action. Decide whether the surrounding sentence continues or ends.",
          "Check the punctuation immediately before each closing speech mark.",
          "Check capitals at the beginning of a spoken sentence, names and separate sentences.",
          "Check paragraph breaks when the speaker changes."
        ]
      },
      {
        "type": "p",
        "text": "Direct speech and reported speech are different forms. “I am ready,” said Ben gives his exact words. Ben said that he was ready reports their meaning without enclosing those words in speech marks. This article concentrates on punctuating direct speech, not on all the tense changes involved in reported speech."
      },
      {
        "type": "h2",
        "text": "Use dialogue with purpose"
      },
      {
        "type": "p",
        "text": "Punctuation makes dialogue readable; the words still need to do useful work. A brief exchange can reveal disagreement, move an event forward or show a character’s hesitation. Replacing every said with an elaborate verb is unnecessary. Use [vocabulary in context](/blog/11-plus-vocabulary-in-context) to think carefully about precise meanings, and return to the [English hub](/subjects/english) for comprehension practice."
      },
      {
        "type": "p",
        "text": "When quoting a passage in an answer, the purpose differs from writing a conversation. Use our [comprehension evidence lesson](/subjects/english/using-evidence) to select short, accurate quotations that support a point; do not add invented dialogue to an answer about an existing text."
      },
      {
        "type": "p",
        "text": "Skill reference: the [DfE English programme](https://www.gov.uk/government/publications/national-curriculum-in-england-english-programmes-of-study/national-curriculum-in-england-english-programmes-of-study) and its [grammar and punctuation appendix](https://www.gov.uk/government/uploads/system/uploads/attachment_data/file/335190/English_Appendix_2_-_Vocabulary_grammar_and_punctuation.pdf), checked 21 October 2026. Examples and exercises are original. Check the school’s assessment guidance rather than assuming every entrance test has a separate punctuation section."
      }
    ]
  }
];
