import type { BlogPost } from './blogPosts';
export const DAILY_POSTS_20261106: BlogPost[] = [
  {
    "slug": "11-plus-recipe-scaling",
    "title": "11+ recipe scaling: how many portions can you make?",
    "desc": "Scale a recipe up or down, then use two ingredients to find the maximum number of complete portions.",
    "subject": "maths",
    "date": "November 6, 2026",
    "category": "Maths",
    "readTime": "3 min read",
    "imageUrl": "/blog-artwork/11-plus-recipe-scaling.webp",
    "imageAlt": "Editorial illustration of a child weighing apricots beside a mixing bowl and jugs",
    "images": [],
    "content": [
      {
        "type": "p",
        "text": "A recipe for eight little fruit pots needs 280 g of oats and 480 ml of milk. You only need six pots. Taking two away from each ingredient would give you 278 g and 478 ml: almost the original batch. Two fewer pots means removing two portions of each ingredient, not two grams or two millilitres."
      },
      {
        "type": "h2",
        "text": "Two ways from eight pots to six"
      },
      {
        "type": "p",
        "text": "If you like whole numbers, start with one pot: 280 ÷ 8 = 35 g and 480 ÷ 8 = 60 ml. For six, that gives 210 g and 360 ml. Or notice that six is three quarters of eight. Divide each original amount by four, then multiply by three. Both methods work because the size of one pot stays the same."
      },
      {
        "type": "table",
        "headers": [
          "Pots",
          "Oats (g)",
          "Milk (ml)"
        ],
        "rows": [
          [
            "8",
            "280",
            "480"
          ],
          [
            "1",
            "35",
            "60"
          ],
          [
            "6",
            "210",
            "360"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Which ingredient runs out first?"
      },
      {
        "type": "p",
        "text": "You now have 420 g of oats and 630 ml of milk. The oats would fill 12 pots; the milk would fill only 10 whole pots, with 30 ml left. Ten is the answer because every pot needs both ingredients. Check the next pot: eleven would require 660 ml, which you do not have."
      },
      {
        "type": "h2",
        "text": "Try changing the batch"
      },
      {
        "type": "question",
        "text": "Using the fruit-pot recipe, how much milk makes 14 pots?",
        "answer": "840 ml.",
        "explanation": "Each pot needs 60 ml. Fourteen portions use 14 × 60 = 840 ml; the answer is more than the 480 ml for eight."
      },
      {
        "type": "question",
        "text": "A soup for six needs 450 g of carrots. How many grams do ten equal servings need?",
        "answer": "750 g.",
        "explanation": "One serving uses 450 ÷ 6 = 75 g. Multiply by ten; adding four grams would not add four servings."
      },
      {
        "type": "question",
        "text": "Bread for four rolls uses 180 g flour and 100 ml water. With 490 g flour and 300 ml water, how many whole rolls can you make?",
        "answer": "10 rolls.",
        "explanation": "Each takes 45 g and 25 ml. Flour covers ten complete rolls, water twelve. An eleventh roll needs 495 g of flour."
      },
      {
        "type": "question",
        "text": "For eight pots, someone orders 0.48 litres of milk instead of 480 ml. Is any extra needed?",
        "answer": "No.",
        "explanation": "One litre is 1,000 millilitres. Multiplying 0.48 by 1,000 gives exactly 480 ml."
      },
      {
        "type": "h2",
        "text": "Where to practise next"
      },
      {
        "type": "p",
        "text": "Compare this with [sharing a fixed amount in a ratio](/subjects/maths/ratio-sharing). If only the units change, revisit [unit conversions](/blog/11-plus-unit-conversions). The [maths hub](/subjects/maths) includes topic practice and the [printable maths papers](/papers#maths-printable) give you space to work on paper. These examples are original preparation for exams taken in 2027; individual tests vary."
      },
      {
        "type": "p",
        "text": "Curriculum reference: [DfE mathematics programmes of study, including Year 6 ratio and proportion](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study)."
      }
    ]
  },
  {
    "slug": "11-plus-divisibility-rules",
    "title": "11+ divisibility rules: find every possible missing digit",
    "desc": "Use digit sums, last digits and pairs of tests to solve missing-digit puzzles and prove your list is complete.",
    "subject": "maths",
    "date": "November 6, 2026",
    "category": "Maths",
    "readTime": "3 min read",
    "imageUrl": "/blog-artwork/11-plus-divisibility-rules.webp",
    "imageAlt": "Editorial illustration of a young printmaker sorting wooden type in a drawer",
    "images": [],
    "content": [
      {
        "type": "p",
        "text": "Can 52□ be divided by six without a remainder? One answer is 522. But the question changes if it asks for every possible digit. A reliable solution needs a way to find them all."
      },
      {
        "type": "h2",
        "text": "Choose the part of the number that matters"
      },
      {
        "type": "table",
        "headers": [
          "Divisor",
          "What to inspect"
        ],
        "rows": [
          [
            "2",
            "The final digit must be even (0 counts)."
          ],
          [
            "3 or 9",
            "The sum of all the digits must be divisible by 3 or 9 respectively."
          ],
          [
            "4",
            "The number formed by the last two digits must be divisible by 4."
          ],
          [
            "6",
            "Both the test for 2 and the test for 3 must pass."
          ]
        ]
      },
      {
        "type": "p",
        "text": "Why do the last two digits work for four? In 7,316 the first part, 7,300, consists of whole hundreds. Every hundred is divisible by four. Only the final 16 can affect the remainder. That argument would fail for three: 100 itself leaves a remainder of one."
      },
      {
        "type": "h2",
        "text": "Return to 52□"
      },
      {
        "type": "p",
        "text": "For six, narrow the possibilities to 0, 2, 4, 6 and 8. The digit sum is 7 plus the missing digit. The five possible sums are 7, 9, 11, 13 and 15. Only 9 and 15 are multiples of three, so 522 and 528 both work. The list covers every even digit, so none are missing."
      },
      {
        "type": "h2",
        "text": "Try the clues"
      },
      {
        "type": "question",
        "text": "Which digits make 4□2 divisible by nine?",
        "answer": "3 only.",
        "explanation": "The digit sum is 6 plus the missing digit, between 6 and 15. The only multiple of nine in that interval is 9."
      },
      {
        "type": "question",
        "text": "Which digits make 71□ divisible by four?",
        "answer": "2 and 6.",
        "explanation": "The ending must be between 10 and 19. Only 12 and 16 divide exactly by four."
      },
      {
        "type": "question",
        "text": "Which digits make 36□ divisible by six?",
        "answer": "0 and 6.",
        "explanation": "The digit sum is 9 plus the missing digit. Digits 0, 3, 6 and 9 pass the three test; of those, only 0 and 6 are even."
      },
      {
        "type": "question",
        "text": "Is every whole number ending in 9 divisible by nine? Give a counterexample.",
        "answer": "No; 19 is one example.",
        "explanation": "Its digit sum is 10, which is not divisible by nine. A single counterexample is enough to disprove ‘every’."
      },
      {
        "type": "h2",
        "text": "Where to practise next"
      },
      {
        "type": "p",
        "text": "Use the [factors and multiples guide](/blog/11-plus-factors-multiples-primes) for the underlying vocabulary, or [long division](/blog/11-plus-long-division-remainders) to check a candidate. The [maths hub](/subjects/maths) includes topic practice and the [printable maths papers](/papers#maths-printable) give you space to work on paper. These examples are original preparation for exams taken in 2027; individual tests vary."
      },
      {
        "type": "p",
        "text": "Further reading: [NZCER’s assessment resource on divisibility by three and nine](https://arbs.nzcer.org.nz/resources/divisibility-three-and-nine)."
      }
    ]
  },
  {
    "slug": "11-plus-two-way-tables",
    "title": "11+ two-way tables: fill the gaps and check both totals",
    "desc": "Rebuild a partly empty two-way table, check the row and column totals, and spot a question with too little information.",
    "subject": "maths",
    "date": "November 6, 2026",
    "category": "Maths",
    "readTime": "3 min read",
    "imageUrl": "/blog-artwork/11-plus-two-way-tables.webp",
    "imageAlt": "Editorial illustration of an attendant beside a cloakroom wall of cubbies holding hats and scarves",
    "images": [],
    "content": [
      {
        "type": "p",
        "text": "At a museum workshop, each visitor chooses one session and one activity. There are 38 visitors. A helper remembers some counts but has left gaps on the record below. A blank means unknown, not zero."
      },
      {
        "type": "table",
        "headers": [
          "Session",
          "Clay",
          "Print",
          "Total"
        ],
        "rows": [
          [
            "Morning",
            "8",
            "?",
            "19"
          ],
          [
            "Afternoon",
            "?",
            "?",
            "?"
          ],
          [
            "Total",
            "17",
            "?",
            "38"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Start where only one number is missing"
      },
      {
        "type": "p",
        "text": "Morning print must be 19 − 8 = 11. Look down the clay column: afternoon clay must be 17 − 8 = 9. Then there are 38 − 19 = 19 afternoon visitors, of whom 19 − 9 = 10 chose print. Notice that the two 19s happen to match: each is the total for a different session."
      },
      {
        "type": "h2",
        "text": "Check in the other direction"
      },
      {
        "type": "p",
        "text": "Print visitors total 11 + 10 = 21. Together with the 17 clay visitors that gives 38. Do not add both the row totals and the column totals: each describes the same 38 people from a different direction."
      },
      {
        "type": "h2",
        "text": "Try a second table"
      },
      {
        "type": "p",
        "text": "At a cycle club every rider is in one group and hires or brings one helmet. Use this table for the first three questions."
      },
      {
        "type": "table",
        "headers": [
          "Group",
          "Hire",
          "Bring",
          "Riders"
        ],
        "rows": [
          [
            "Red",
            "6",
            "?",
            "14"
          ],
          [
            "Blue",
            "?",
            "?",
            "17"
          ],
          [
            "Riders",
            "15",
            "?",
            "31"
          ]
        ]
      },
      {
        "type": "question",
        "text": "How many red riders bring a helmet?",
        "answer": "8.",
        "explanation": "The red group has 14 in all. Taking away the six who hire leaves eight who bring one."
      },
      {
        "type": "question",
        "text": "How many blue riders hire a helmet?",
        "answer": "9.",
        "explanation": "Read the hire column: 15 altogether minus six red riders gives nine blue riders."
      },
      {
        "type": "question",
        "text": "How many blue riders bring a helmet? Check with both directions.",
        "answer": "8.",
        "explanation": "In the blue row, 17 − 9 = 8. There are 31 − 15 = 16 bringers altogether; removing eight red bringers also leaves eight."
      },
      {
        "type": "question",
        "text": "At another club, red and blue each have 10 riders. Ten helmets are hired overall. Is the number of red hirers fixed?",
        "answer": "No.",
        "explanation": "Five red and five blue hirers would fit. So would six red and four blue. Both respect the totals, so another inside count is needed."
      },
      {
        "type": "h2",
        "text": "Where to practise next"
      },
      {
        "type": "p",
        "text": "For scales and keys, go to [data interpretation](/blog/11-plus-data-interpretation). Compare the two-category idea with [Venn and Carroll diagrams](/blog/11-plus-venn-carroll-diagrams). The [maths hub](/subjects/maths) includes topic practice and the [printable maths papers](/papers#maths-printable) give you space to work on paper. These examples are original preparation for exams taken in 2027; individual tests vary."
      },
      {
        "type": "p",
        "text": "Teaching reference: [White Rose Education’s Year 5 statistics sequence](https://assets.whiteroseeducation.com/new-schemes/Y5%20Spring%20Block%205%20SOL%20Statistics.pdf)."
      }
    ]
  },
  {
    "slug": "11-plus-missing-digit-column-puzzles",
    "title": "11+ missing-digit column puzzles: follow the carry or exchange",
    "desc": "Find hidden digits in addition and subtraction by tracking what moves between neighbouring columns.",
    "subject": "maths",
    "date": "November 6, 2026",
    "category": "Maths",
    "readTime": "3 min read",
    "imageUrl": "/blog-artwork/11-plus-missing-digit-column-puzzles.webp",
    "imageAlt": "Editorial illustration of a child fitting a loose piece into a mechanical adding machine",
    "images": [],
    "content": [
      {
        "type": "p",
        "text": "In 4□7 + 185 = 652, ten minus eight looks like a promising shortcut for the tens digit. It is also the wrong place to start. The ones column has already sent a ten next door by the time you reach the gap."
      },
      {
        "type": "h2",
        "text": "Keep a separate line for the incoming ten"
      },
      {
        "type": "p",
        "text": "Write the numbers underneath one another with their ones aligned. Seven plus five gives twelve: write 2, carry 1 ten. Now the tens column is □ + 8 + 1. It must end in 5 and send 1 hundred to the next column. The total is 15, so the missing digit is 6. Check all three columns together: 467 + 185 = 652."
      },
      {
        "type": "h2",
        "text": "An exchange changes the digit you see"
      },
      {
        "type": "p",
        "text": "Try 7□2 − 368 = 374. To take eight ones from two, exchange one ten: twelve minus eight leaves four. The tens column has already lost one. It must now give seven after subtracting six, so we also exchange a hundred. The tens calculation is (□ − 1 + 10) − 6 = 7. The digit was 4. Adding back is often a faster check: 374 + 368 = 742."
      },
      {
        "type": "h2",
        "text": "Test one digit at a time"
      },
      {
        "type": "question",
        "text": "Fill the gap: 2□8 + 177 = 445.",
        "answer": "6.",
        "explanation": "Eight plus seven carries one ten. The tens must make 14: 6 + 7 + 1. Verify 268 + 177 = 445."
      },
      {
        "type": "question",
        "text": "Fill the gap: 5□3 − 276 = 287.",
        "answer": "6.",
        "explanation": "Check by addition: 287 + 276 = 563. In the subtraction the ones exchange leaves five tens before the next exchange."
      },
      {
        "type": "question",
        "text": "Different squares can have different digits. Complete 3□8 + 24□ = 585.",
        "answer": "3 and 7, in that order.",
        "explanation": "Eight plus seven makes fifteen. In the tens, three plus four plus the carried one gives eight. Check: 338 + 247 = 585."
      },
      {
        "type": "question",
        "text": "Can 4□9 + 152 = 550 work for any digit?",
        "answer": "No.",
        "explanation": "The ones are fixed: nine plus two ends in one, but 550 ends in zero. No tens digit can change the ones column."
      },
      {
        "type": "h2",
        "text": "Where to practise next"
      },
      {
        "type": "p",
        "text": "Compare with [working backwards](/blog/11-plus-working-backwards); for decimal columns, see [decimal arithmetic](/blog/11-plus-decimal-arithmetic). The [maths hub](/subjects/maths) includes topic practice and the [printable maths papers](/papers#maths-printable) give you space to work on paper. These examples are original preparation for exams taken in 2027; individual tests vary."
      },
      {
        "type": "p",
        "text": "Teaching reference: [Oak National Academy on solving problems with column addition and subtraction](https://www.thenational.academy/teachers/programmes/maths-primary-ks2/units/order-compare-and-calculate-with-numbers-up-to-8-digits/lessons/solving-problems-using-column-addition-and-subtraction)."
      }
    ]
  },
  {
    "slug": "11-plus-currency-exchange",
    "title": "11+ currency exchange questions: when to multiply or divide",
    "desc": "Read the direction of a fictional exchange rate, convert holiday money back into pounds and check when a fee applies.",
    "subject": "maths",
    "date": "November 6, 2026",
    "category": "Maths",
    "readTime": "3 min read",
    "imageUrl": "/blog-artwork/11-plus-currency-exchange.webp",
    "imageAlt": "Editorial illustration of two travellers with purses and coins at a ferry counter",
    "images": [],
    "content": [
      {
        "type": "p",
        "text": "A puzzle gives £1 = €1.25. A ticket costs €30. Should it cost more or less than £30? One pound buys more than one euro at this fictional rate, so fewer than 30 pounds should pay for it. That rough check catches a surprising number of wrong answers."
      },
      {
        "type": "h2",
        "text": "Make a pair of matching amounts"
      },
      {
        "type": "p",
        "text": "Instead of memorising ‘going abroad means multiply’, write a pair: £4 = €5. Six lots of €5 cost six lots of £4, so €30 costs £24. In one calculation that is 30 ÷ 1.25 = 24. On the return journey £24 × 1.25 gives €30."
      },
      {
        "type": "h2",
        "text": "What if the rate is written the other way?"
      },
      {
        "type": "p",
        "text": "Suppose the question says €1 = £0.80. Now the multiplier 0.80 takes you from euros to pounds. The same ticket costs 30 × 0.80 = £24. What changed was the way the rate was quoted, not the value of the ticket. Label both columns on your working; a bare number such as 24 does not tell the reader which currency you found."
      },
      {
        "type": "h2",
        "text": "Fees belong to a particular step"
      },
      {
        "type": "p",
        "text": "You take £42 to a fictional exchange desk. It deducts a £2 fee before converting the rest at €1.25 per £1. Only £40 is exchanged, giving €50. Subtracting two euros at the end would take off a fee in the wrong currency. Use only the fees and rates the question specifies."
      },
      {
        "type": "h2",
        "text": "Try the currency desk"
      },
      {
        "type": "question",
        "text": "At £1 = €1.20, how many euros buy the same amount as £35, with no fees?",
        "answer": "€42.",
        "explanation": "There are 35 lots of €1.20: 35 × 1.20 = 42. The rate is euros per pound."
      },
      {
        "type": "question",
        "text": "At the same fictional rate, what is €54 in pounds?",
        "answer": "£45.",
        "explanation": "Divide 54 by 1.20. Check from pounds to euros: 45 × 1.20 = 54."
      },
      {
        "type": "question",
        "text": "A question gives €1 = £0.85. What is a €16 museum ticket in pounds?",
        "answer": "£13.60.",
        "explanation": "This time the multiplier is pounds per euro. Sixteen lots of £0.85 make £13.60."
      },
      {
        "type": "question",
        "text": "Desk A gives €1.20 per £1 with no fee. Desk B deducts £3, then gives €1.25 per £1. For £63, which hands over more euros?",
        "answer": "Desk A, by €0.60.",
        "explanation": "A gives 63 × 1.20 = €75.60. B converts £60 and gives €75. The higher headline rate does not offset the fee here."
      },
      {
        "type": "h2",
        "text": "Where to practise next"
      },
      {
        "type": "p",
        "text": "Use [best-value problems](/blog/11-plus-money-best-value) to compare offers, or revisit [multiplying decimals](/blog/11-plus-decimal-arithmetic). The [maths hub](/subjects/maths) includes topic practice and the [printable maths papers](/papers#maths-printable) give you space to work on paper. These examples are original preparation for exams taken in 2027; individual tests vary."
      },
      {
        "type": "p",
        "text": "Method reference: [Open University, Everyday Maths: currency conversions](https://www.open.edu/openlearn/mod/oucontent/view.php?id=87283&section=_unit3.2.1). All exchange rates here are made up for practice."
      }
    ]
  },
  {
    "slug": "heathfield-year-7-assessment-november-2026",
    "title": "Heathfield’s November Year 7 assessments: when families can expect offers",
    "desc": "Heathfield listed two assessment days for September 2027 entry. Its offer, scholarship and acceptance stages have different dates.",
    "kind": "news",
    "editorial": true,
    "eventNote": "Assessment window: 4–5 November 2026. School timetable checked 6 November 2026.",
    "date": "November 6, 2026",
    "category": "Admissions news",
    "readTime": "2 min read",
    "imageUrl": "/blog-artwork/heathfield-year-7-assessment-november-2026.webp",
    "imageAlt": "Editorial illustration of two empty chairs and a small table in an autumn-lit interview room",
    "images": [],
    "content": [
      {
        "type": "p",
        "text": "Heathfield’s published Year 7 assessment window for September 2027 entry was Wednesday 4 and Thursday 5 November 2026. For a family waiting after an appointment, the next decision is a school-place offer. Heathfield says it makes those offers before Christmas; it does not give an individual decision date."
      },
      {
        "type": "h2",
        "text": "What the school considers"
      },
      {
        "type": "p",
        "text": "The [school’s entry process](https://www.heathfieldschool.net/admissions/procedure/) describes a small-group visit, an online Cambridge Select Insight assessment and an individual interview with the headmaster. A reference from the child’s current school also forms part of the process. The school does not present a single published pass mark from which parents can calculate the outcome."
      },
      {
        "type": "h2",
        "text": "Three dates with different meanings"
      },
      {
        "type": "p",
        "text": "The school lists a festive event on 30 November for registered children. That wording matters: registration and an offer are different things. January 2027 is the scholarship assessment stage for applicants seeking a scholarship. The offer-holders’ event is listed for 3 February 2027, and the published deadline to accept a place is Monday 1 March 2027."
      },
      {
        "type": "p",
        "text": "If your child applied for a scholarship, keep the scholarship invitation separate from any offer correspondence. If you need an individual update, use the admissions contact on the school’s page; the published two-day window cannot tell you whether an individual child attended or how they performed."
      },
      {
        "type": "h2",
        "text": "For a child sitting an exam in 2027"
      },
      {
        "type": "p",
        "text": "These November dates were for tests in 2026. They are not an appointment for the following cohort. Check the [exam dates hub](/exam-dates) and go back to Heathfield’s own Year 7 entry page for your child’s cycle. Our [guide to independent-school assessments](/blog/do-independent-schools-use-the-11-plus) explains why another school’s arrangements may differ."
      }
    ]
  },
  {
    "slug": "felsted-year-7-taster-days-november-2026",
    "title": "Felsted’s November taster days and the separate Year 7 entrance assessment",
    "desc": "Felsted listed visits on 3 and 5 November 2026. Its standard Year 7 assessment falls in the week beginning 16 November for September 2027 entry.",
    "kind": "news",
    "editorial": true,
    "eventNote": "Taster dates: 3 and 5 November 2026. School timetable checked 6 November 2026.",
    "date": "November 6, 2026",
    "category": "Admissions news",
    "readTime": "2 min read",
    "imageUrl": "/blog-artwork/felsted-year-7-taster-days-november-2026.webp",
    "imageAlt": "Editorial illustration of walking boots, a visitor lanyard and autumn leaves by a doorway",
    "images": [],
    "content": [
      {
        "type": "p",
        "text": "Felsted listed 3 and 5 November 2026 as on-site taster days for children seeking Year 7 places in September 2027. Families looking for the entrance test date should look further down the [school’s Year 7 timetable](https://www.felsted.org/admissions/age11): the standard entrance assessment is listed for the week beginning Monday 16 November."
      },
      {
        "type": "h2",
        "text": "A visit date is not a test booking"
      },
      {
        "type": "p",
        "text": "The school separates an invitation to experience the school from the standard entrance assessment. The published week identifies the assessment period; it does not assign every child to Monday morning. If your family has the taster information but no assessment instructions, check the admissions correspondence and use the contact on the school’s timetable to confirm your child’s arrangements."
      },
      {
        "type": "h2",
        "text": "Standard places and awards follow different timetables"
      },
      {
        "type": "p",
        "text": "Felsted places standard offers before Christmas. Its award assessments, including academic, arts and sports options, are listed separately for January 2027, with exact dates to be confirmed. Families considering an award should check their own invitation rather than treating a standard place assessment as an award appointment."
      },
      {
        "type": "p",
        "text": "The timetable lists confirmation of a place for the first week of March 2027 and marks the exact date as unconfirmed. Keep the individual offer letter for the applicable deadline and instructions."
      },
      {
        "type": "h2",
        "text": "Which cohort is this?"
      },
      {
        "type": "p",
        "text": "This is the November 2026 assessment cycle for September 2027 school entry. It does not confirm dates for children preparing to take tests in calendar 2027. Use our [exam dates hub](/exam-dates) to distinguish cohorts and the [independent-school assessment guide](/blog/do-independent-schools-use-the-11-plus) for the different ways schools organise entry."
      }
    ]
  }
];
