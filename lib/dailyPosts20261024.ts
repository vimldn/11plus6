import type { BlogPost } from './blogPosts';

export const DAILY_POSTS_20261024: BlogPost[] = [
  {
    "slug": "11-plus-order-of-operations",
    "title": "11+ Order of Operations: BODMAS Questions and Answers",
    "desc": "Learn which operation comes first, handle equal-priority operations and brackets, and practise with eight original questions and worked answers.",
    "subject": "maths",
    "date": "October 24, 2026",
    "category": "Maths",
    "readTime": "5 min read",
    "imageUrl": "/brand/book-journey.webp",
    "imageAlt": "Illustrated books forming steps on a learning journey",
    "images": [],
    "content": [
      {
        "type": "p",
        "text": "A calculation can contain all the right numbers and still give the wrong answer if you combine them in the wrong order. Order of operations is the shared convention that makes an expression mean the same thing to different readers. It is especially useful when checking algebra, prices or a line of working in a longer problem."
      },
      {
        "type": "p",
        "text": "These original questions support preparation for exams taken in 2027. They are not official school papers. Topic coverage and question formats vary: check your target school’s current information. Try the questions on paper before opening each answer."
      },
      {
        "type": "h2",
        "text": "Read the expression before calculating"
      },
      {
        "type": "p",
        "text": "BODMAS and BIDMAS are reminders of the same ordering convention. The O means orders and the I means indices: powers such as a square. The important detail is that the four operations do not have four separate priority levels. Multiplication and division share a level; addition and subtraction share another."
      },
      {
        "type": "table",
        "headers": [
          "Stage",
          "What to do"
        ],
        "rows": [
          [
            "1",
            "Complete the calculation inside brackets."
          ],
          [
            "2",
            "Evaluate powers, if present: 5² means 5 × 5."
          ],
          [
            "3",
            "Work multiplication and division from left to right."
          ],
          [
            "4",
            "Work addition and subtraction from left to right."
          ]
        ]
      },
      {
        "type": "p",
        "text": "Do not treat the letters as a rule that division must always happen before multiplication, or addition before subtraction. At a shared level, position decides the next operation. Also, left to right does not mean ignoring priority and completing every operation as you meet it."
      },
      {
        "type": "h2",
        "text": "Worked example: two equal-priority operations"
      },
      {
        "type": "p",
        "text": "Consider 42 ÷ 7 × 3. Divide first because it is the leftmost operation at that level: 42 ÷ 7 = 6, then 6 × 3 = 18. If you multiply 7 × 3 first, you have silently changed the expression to 42 ÷ (7 × 3). That is a different calculation."
      },
      {
        "type": "h2",
        "text": "Worked example: preserve the rest of the line"
      },
      {
        "type": "p",
        "text": "For 19 + 4 × (8 − 5), first replace only the bracket with its value: 19 + 4 × 3. Next replace the product: 19 + 12. Finally add to obtain 31. Writing a complete new line after each step helps you keep the initial 19 and prevents an unfinished intermediate answer becoming your final one."
      },
      {
        "type": "p",
        "text": "Compare this with (19 + 4) × (8 − 5). The first bracket is now 23 and the second is 3, giving 69. The numbers have stayed the same, but the grouping has changed. Brackets communicate meaning; they are not decoration."
      },
      {
        "type": "h2",
        "text": "A short extension: squares"
      },
      {
        "type": "p",
        "text": "For 6² − 12 ÷ 3, square 6 to make 36. Divide 12 by 3 to make 4, then subtract: 36 − 4 = 32. Squaring does not mean doubling, so 6² is not 12. Keep this extension separate if you are still building confidence with the four basic operations."
      },
      {
        "type": "h2",
        "text": "Eight original questions"
      },
      {
        "type": "question",
        "text": "1. Work out 14 + 6 × 5.",
        "answer": "44",
        "explanation": "Multiply 6 × 5 = 30, then add 14. The answer 100 would come from adding first."
      },
      {
        "type": "question",
        "text": "2. Work out 48 ÷ 8 × 4.",
        "answer": "24",
        "explanation": "Division and multiplication have equal priority: 48 ÷ 8 = 6, then 6 × 4 = 24."
      },
      {
        "type": "question",
        "text": "3. Work out 25 − 9 + 2.",
        "answer": "18",
        "explanation": "Subtraction and addition share a level. Read left to right: 25 − 9 = 16, then 16 + 2 = 18."
      },
      {
        "type": "question",
        "text": "4. Work out 7 × (13 − 8) + 6.",
        "answer": "41",
        "explanation": "The bracket gives 5. Multiply 7 × 5 = 35, then add 6."
      },
      {
        "type": "question",
        "text": "5. Work out 4² + 18 ÷ 6.",
        "answer": "19",
        "explanation": "4² = 16 and 18 ÷ 6 = 3. Add them to get 19."
      },
      {
        "type": "question",
        "text": "6. A pupil writes 30 − 12 ÷ 3 = 18 ÷ 3 = 6. Correct the working.",
        "answer": "30 − 4 = 26",
        "explanation": "The first error is subtracting before dividing. Replace 12 ÷ 3 with 4 while retaining 30 −."
      },
      {
        "type": "question",
        "text": "7. Insert one pair of brackets into 9 + 3 × 4 to make the answer 48.",
        "answer": "(9 + 3) × 4 = 48",
        "explanation": "Grouping the addition makes 12, which is then multiplied by 4. The unbracketed expression is 21."
      },
      {
        "type": "question",
        "text": "8. Work out 60 ÷ (2 + 3) + 4 × 2.",
        "answer": "20",
        "explanation": "Bracket: 5. Then 60 ÷ 5 = 12 and 4 × 2 = 8. Finally 12 + 8 = 20."
      },
      {
        "type": "h2",
        "text": "Check the method, not only the total"
      },
      {
        "type": "ul",
        "items": [
          "Underline the first operation before doing any arithmetic.",
          "Change one part of the expression at a time and copy everything else accurately.",
          "If two answers disagree, locate the first different line rather than repeating the whole question faster."
        ]
      },
      {
        "type": "p",
        "text": "Next, use this convention in [algebra basics](/blog/11-plus-algebra-basics). For choosing an operation from a story, work through our [multi-step word problems](/blog/11-plus-multi-step-word-problems). Return to the [maths hub](/subjects/maths) for the wider learning sequence."
      },
      {
        "type": "p",
        "text": "Curriculum context: the [Department for Education maths programme](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study) includes order of operations in Year 6. This is a learning reference, not a single national 11-plus syllabus. Sources and answers checked 24 October 2026."
      }
    ]
  },
  {
    "slug": "11-plus-factors-multiples-primes",
    "title": "11+ Factors, Multiples and Primes: Questions with Answers",
    "desc": "Distinguish factors from multiples, find HCF and LCM, and solve original number puzzles with eight explained practice answers.",
    "subject": "maths",
    "date": "October 24, 2026",
    "category": "Maths",
    "readTime": "5 min read",
    "imageUrl": "/brand/book-journey.webp",
    "imageAlt": "Illustrated books forming steps on a learning journey",
    "images": [],
    "content": [
      {
        "type": "p",
        "text": "When a question mentions two numbers, multiplying them together is not automatically the right move. Factors describe exact divisions of a number. Multiples describe repeated whole-number groups. Knowing which relationship the problem needs is more useful than memorising the initials HCF and LCM on their own."
      },
      {
        "type": "p",
        "text": "These original questions support preparation for exams taken in 2027. They are not official school papers. Topic coverage and question formats vary: check your target school’s current information. Try the questions on paper before opening each answer."
      },
      {
        "type": "h2",
        "text": "Factors and multiples answer different questions"
      },
      {
        "type": "p",
        "text": "We use positive whole-number factors here. A factor divides a number without a remainder. The factors of 28 are 1, 2, 4, 7, 14 and 28, because the pairs 1 × 28, 2 × 14 and 4 × 7 all make 28. Check the pairs in order so that you do not omit one."
      },
      {
        "type": "p",
        "text": "A positive multiple of 7 is made by multiplying 7 by a positive whole number: 7, 14, 21, 28, 35 and so on. Zero is also a multiple in wider mathematical usage, but when finding a lowest common multiple we mean the smallest positive one. The word positive matters."
      },
      {
        "type": "table",
        "headers": [
          "Question",
          "A useful test"
        ],
        "rows": [
          [
            "Is 4 a factor of 28?",
            "Yes: 28 ÷ 4 = 7 exactly."
          ],
          [
            "Is 28 a multiple of 4?",
            "Yes: 4 × 7 = 28."
          ],
          [
            "Is 8 a factor of 28?",
            "No: dividing leaves a remainder."
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Prime does not mean odd"
      },
      {
        "type": "p",
        "text": "A prime number is a whole number greater than one with exactly two positive factors: 1 and itself. Two is prime even though it is even. Nine is odd but not prime, because 3 × 3 = 9. One is not prime: it has only one positive factor."
      },
      {
        "type": "p",
        "text": "To test a small number, look systematically for a factor pair other than 1 and the number. For 29, check 2, 3, 4 and 5. None divides it exactly. After that, any new factor pair would have to repeat a smaller partner you have already checked, since 6 × 6 exceeds 29. Therefore 29 is prime."
      },
      {
        "type": "h2",
        "text": "HCF: making the largest equal groups"
      },
      {
        "type": "p",
        "text": "The highest common factor is the greatest positive number that divides both values. Suppose you have 32 red counters and 48 blue counters. You want identical packs with none left over. Each pack must contain the same number of red counters as every other pack, and likewise for blue. The greatest possible number of packs is HCF(32, 48) = 16. Each has 2 red and 3 blue counters."
      },
      {
        "type": "p",
        "text": "Be careful about what that 16 represents: it is the number of packs, not the number of counters inside each pack. A number can be calculated correctly and still be attached to the wrong label."
      },
      {
        "type": "h2",
        "text": "LCM: when repeating events next coincide"
      },
      {
        "type": "p",
        "text": "A light flashes every 6 seconds and another every 14 seconds. They flash together now. Multiples of 14 are 14, 28 and 42; 42 is the first that is also divisible by 6. They next coincide after 42 seconds. Multiplying 6 × 14 gives 84, a common multiple but not the lowest one."
      },
      {
        "type": "h2",
        "text": "Eight original questions"
      },
      {
        "type": "question",
        "text": "1. List every positive factor of 30.",
        "answer": "1, 2, 3, 5, 6, 10, 15, 30",
        "explanation": "The pairs are 1 × 30, 2 × 15, 3 × 10 and 5 × 6. Write the list in increasing order."
      },
      {
        "type": "question",
        "text": "2. Which are prime: 1, 2, 21, 29, 39?",
        "answer": "2 and 29",
        "explanation": "1 has only one factor; 21 = 3 × 7 and 39 = 3 × 13. Only 2 and 29 have exactly two positive factors."
      },
      {
        "type": "question",
        "text": "3. Find the highest common factor of 24 and 40.",
        "answer": "8",
        "explanation": "The common factors are 1, 2, 4 and 8. The greatest is 8, not 40, which does not divide 24."
      },
      {
        "type": "question",
        "text": "4. Find the lowest common multiple of 9 and 12.",
        "answer": "36",
        "explanation": "Positive multiples of 12 are 12, 24, 36. Of these, 36 is the first divisible by 9."
      },
      {
        "type": "question",
        "text": "5. There are 42 pencils and 70 stickers. Make the greatest number of identical packs using everything. How many packs, and what goes in each?",
        "answer": "14 packs; 3 pencils and 5 stickers each",
        "explanation": "HCF(42, 70) = 14. Divide each original quantity by 14 to find the contents."
      },
      {
        "type": "question",
        "text": "6. Two bells ring every 8 and 10 minutes. They ring together at 09:00. When do they next ring together?",
        "answer": "09:40",
        "explanation": "The lowest common multiple is 40 minutes: 8 × 5 = 10 × 4. Add 40 minutes to the starting time."
      },
      {
        "type": "question",
        "text": "7. A puzzle asks for a number greater than 30 and less than 60 that is a multiple of 8 and a factor of 96. Do these clues give a unique answer?",
        "answer": "32 or 48; the clues do not give a unique answer",
        "explanation": "The multiples of 8 in the range are 32, 40, 48 and 56. Both 32 and 48 divide 96, so this information actually has two solutions: 32 and 48. A single-answer question needs another clue."
      },
      {
        "type": "question",
        "text": "8. Add the clue “it is also a multiple of 3” to question 7. What is the number now?",
        "answer": "48",
        "explanation": "Only 48 from the two surviving candidates is divisible by 3. Test every clue before deciding a number puzzle is finished."
      },
      {
        "type": "h2",
        "text": "Why checking a puzzle matters"
      },
      {
        "type": "p",
        "text": "Question 7 deliberately exposes an incomplete question: its wording asks for a number, and both 32 and 48 satisfy the conditions. If you found 32, your arithmetic was not wrong. The follow-up adds a condition to make a unique answer. When practising, distinguish an error in your method from a question that allows more than one result."
      },
      {
        "type": "p",
        "text": "Factor knowledge helps with simplifying in our [fraction, decimal and percentage conversion guide](/blog/11-plus-fractions-decimals-percentages-conversions). For calculation conventions, try [order of operations](/blog/11-plus-order-of-operations), or return to the [maths hub](/subjects/maths)."
      },
      {
        "type": "p",
        "text": "Curriculum context: [Department for Education maths programme](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study). The examples are original and do not reproduce official exam questions. Answers checked 24 October 2026."
      }
    ]
  },
  {
    "slug": "11-plus-negative-numbers",
    "title": "11+ Negative Numbers: Ordering, Temperature and Practice",
    "desc": "Learn to compare negative numbers, count across zero and find intervals, with a worked temperature table and eight explained questions.",
    "subject": "maths",
    "date": "October 24, 2026",
    "category": "Maths",
    "readTime": "5 min read",
    "imageUrl": "/brand/book-journey.webp",
    "imageAlt": "Illustrated books forming steps on a learning journey",
    "images": [],
    "content": [
      {
        "type": "p",
        "text": "A minus sign changes where a number sits. On a number line, −9 is to the left of −2, so −9 is smaller even though the digit 9 is larger than 2. Keep the sign attached to the number whenever you copy it into working."
      },
      {
        "type": "p",
        "text": "These original questions support preparation for exams taken in 2027. They are not official school papers. Topic coverage and question formats vary: check your target school’s current information. Try the questions on paper before opening each answer."
      },
      {
        "type": "h2",
        "text": "Start with position, then movement"
      },
      {
        "type": "p",
        "text": "Zero is the reference point. Positive values lie to its right and negative values to its left. Moving right increases the value; moving left decreases it. A thermometer uses the same idea vertically: a higher reading is warmer, including when both readings are below zero."
      },
      {
        "type": "p",
        "text": "For an ascending list, place the values from smallest to greatest: −12, −5, −1, 0, 6. The number nearest zero is not always the smallest. If all values are negative, the one furthest below zero is smallest. If the instruction says descending, reverse the direction of the completed list."
      },
      {
        "type": "h2",
        "text": "Worked example: a rise through zero"
      },
      {
        "type": "p",
        "text": "A reading begins at −7°C and rises by 12°C. Reaching zero uses 7 degrees of the rise. There are 5 degrees still to go, so the final reading is 5°C. The 12 describes a change; it is not the final temperature. Writing “start + change = finish” helps separate those quantities."
      },
      {
        "type": "h2",
        "text": "Worked example: the gap between two readings"
      },
      {
        "type": "p",
        "text": "A freezer reading changes from −14°C to −6°C. It has become warmer by 8°C, even though both readings remain negative. Count from −14 up to −6: eight one-degree intervals. You do not add 14 and 6 because the interval does not cross zero."
      },
      {
        "type": "p",
        "text": "For the gap from −4°C to 9°C, the route does cross zero: 4 degrees to zero, then 9 more, giving 13°C. In this guide a gap means the non-negative distance between two values. A signed change also records the direction: a fall from 9°C to −4°C is a change of −13°C."
      },
      {
        "type": "h2",
        "text": "Read a table before doing arithmetic"
      },
      {
        "type": "table",
        "headers": [
          "Time",
          "Temperature"
        ],
        "rows": [
          [
            "06:00",
            "−8°C"
          ],
          [
            "10:00",
            "−3°C"
          ],
          [
            "14:00",
            "4°C"
          ],
          [
            "18:00",
            "1°C"
          ]
        ]
      },
      {
        "type": "p",
        "text": "The coldest reading is −8°C at 06:00. The rise between 06:00 and 14:00 is 12°C. The fall from 14:00 to 18:00 is 3°C. These are invented measurements for practice, not weather observations. Notice that the greatest reading and the greatest change are different questions."
      },
      {
        "type": "h2",
        "text": "Count intervals, not labels"
      },
      {
        "type": "p",
        "text": "From −2 to 2 there are four steps: −2 to −1, −1 to 0, 0 to 1 and 1 to 2. There are five printed whole-number labels, but only four gaps. This is the same distinction as counting fence posts versus spaces between them. On an unlabelled scale, establish the value of each interval before reading a point."
      },
      {
        "type": "h2",
        "text": "Eight original questions"
      },
      {
        "type": "question",
        "text": "1. Put −3, 5, −11, 0 and −1 in ascending order.",
        "answer": "−11, −3, −1, 0, 5",
        "explanation": "Increasing order means moving right along the number line, starting with the smallest signed value."
      },
      {
        "type": "question",
        "text": "2. Which is greater, −8 or −5?",
        "answer": "−5",
        "explanation": "−5 is further right and closer to zero. Compare the signed numbers, not just their digits."
      },
      {
        "type": "question",
        "text": "3. A temperature of −6°C rises by 11°C. What is the final reading?",
        "answer": "5°C",
        "explanation": "Six degrees of the rise reach zero. The remaining five degrees take it to 5°C."
      },
      {
        "type": "question",
        "text": "4. A reading is 7°C, then falls by 15°C. What is it now?",
        "answer": "−8°C",
        "explanation": "A fall of 7 reaches zero; a further fall of 8 reaches −8°C."
      },
      {
        "type": "question",
        "text": "5. How many degrees warmer is 3°C than −9°C?",
        "answer": "12°C",
        "explanation": "The interval is 9 degrees from −9 to zero plus 3 from zero to 3."
      },
      {
        "type": "question",
        "text": "6. A lift is on floor −4. It goes up 9 floors, then down 3. Where does it finish? Assume each adjacent numbered floor is one floor apart and ground is 0.",
        "answer": "Floor 2",
        "explanation": "−4 + 9 = 5, then 5 − 3 = 2. The stated floor convention avoids an unnumbered-ground-floor ambiguity."
      },
      {
        "type": "question",
        "text": "7. Complete the sequence: 8, 3, −2, ___, ___.",
        "answer": "−7, −12",
        "explanation": "Subtract 5 each time, retaining the minus sign after passing zero."
      },
      {
        "type": "question",
        "text": "8. A temperature rises by 9°C and finishes at −2°C. What was the starting temperature?",
        "answer": "−11°C",
        "explanation": "Undo the rise: −2 − 9 = −11. Check forwards: −11 + 9 = −2."
      },
      {
        "type": "h2",
        "text": "Review a wrong answer"
      },
      {
        "type": "ul",
        "items": [
          "If your answer is on the wrong side of zero, redraw the starting point and direction.",
          "If a difference is one too large, check whether you counted labels rather than gaps.",
          "If the arithmetic is correct but the answer does not fit, check whether the question asked for a change or an endpoint."
        ]
      },
      {
        "type": "p",
        "text": "Use the same labelled steps in [multi-step word problems](/blog/11-plus-multi-step-word-problems), and practise expression rules in [order of operations](/blog/11-plus-order-of-operations). The [maths hub](/subjects/maths) links the wider skills sequence."
      },
      {
        "type": "p",
        "text": "Source context: [Department for Education maths programme](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study) includes negative numbers and intervals across zero. This guide does not claim all schools test them in the same way. Questions and answers checked 24 October 2026."
      }
    ]
  },
  {
    "slug": "11-plus-percentage-increase-decrease",
    "title": "11+ Percentage Increase and Decrease: Worked Questions",
    "desc": "Find new amounts, compare successive percentage changes and recover an original price, with eight explained questions and clear base-value checks.",
    "subject": "maths",
    "date": "October 24, 2026",
    "category": "Maths",
    "readTime": "5 min read",
    "imageUrl": "/brand/book-journey.webp",
    "imageAlt": "Illustrated books forming steps on a learning journey",
    "images": [],
    "content": [
      {
        "type": "p",
        "text": "A percentage change has two parts: the size of the percentage and the amount it applies to. Before calculating, name that starting amount. A reduction of 15% does not mean subtracting £15 unless the original price happens to be £100."
      },
      {
        "type": "p",
        "text": "These original questions support preparation for exams taken in 2027. They are not official school papers. Topic coverage and question formats vary: check your target school’s current information. Try the questions on paper before opening each answer."
      },
      {
        "type": "h2",
        "text": "Find the change, then the new amount"
      },
      {
        "type": "p",
        "text": "For an increase, calculate the percentage of the original amount and add it. For a decrease, calculate that percentage and subtract it. Start with familiar building blocks: 10% is one tenth, 5% is half of 10%, and 25% is one quarter. Keep money in consistent units."
      },
      {
        "type": "p",
        "text": "A £64 item is reduced by 25%. One quarter of £64 is £16, so £16 is the saving. The new price is £64 − £16 = £48. If the question asks how much you save, answer £16; if it asks what you pay, answer £48. Those two correct calculations answer different questions."
      },
      {
        "type": "p",
        "text": "For a 15% increase on 260, first find 10% = 26 and 5% = 13. The increase is 39, and the new value is 299. Check that an increase on a positive amount has made it larger. This check will not prove your arithmetic, but it catches an accidental subtraction."
      },
      {
        "type": "h2",
        "text": "An alternative: the percentage remaining"
      },
      {
        "type": "table",
        "headers": [
          "Change",
          "New amount as a percentage of the original"
        ],
        "rows": [
          [
            "Increase by 12%",
            "112%"
          ],
          [
            "Decrease by 12%",
            "88%"
          ],
          [
            "Decrease by 25%",
            "75%"
          ]
        ]
      },
      {
        "type": "p",
        "text": "You can use these relationships directly: reducing a positive amount by 25% leaves three quarters. The change is one quarter; the new amount is three quarters. Do not confuse a percentage with a number of pounds, centimetres or pupils."
      },
      {
        "type": "h2",
        "text": "Successive changes use successive bases"
      },
      {
        "type": "p",
        "text": "A £50 ticket increases by 20%, making £60. It then decreases by 20% of its current price: 20% of £60 is £12, so the final price is £48. The percentages are equal, but the amounts added and removed are different. An equal rise and fall need not return a value to its starting point."
      },
      {
        "type": "p",
        "text": "Put each stage on its own line and label the current amount. Do not combine successive percentages by simply subtracting one rate from another. For example, a discount followed by a further discount needs the second discount calculated on the reduced price."
      },
      {
        "type": "h2",
        "text": "Stretch: work backwards from a sale price"
      },
      {
        "type": "p",
        "text": "After a 30% reduction, a bag costs £42. This £42 represents 70% of the original price, not 100%. Divide by 7 to find 10% = £6, then multiply by 10 to recover 100% = £60. Check: 30% of £60 is £18 and £60 − £18 = £42."
      },
      {
        "type": "p",
        "text": "Adding 30% of £42 would use the wrong base. Reverse questions are a separate step from finding a percentage of a known whole; try them after the forward method feels secure. Do not assume this extension appears in every school’s assessment."
      },
      {
        "type": "h2",
        "text": "Eight original questions"
      },
      {
        "type": "question",
        "text": "1. Increase 180 by 15%.",
        "answer": "207",
        "explanation": "10% is 18 and 5% is 9. Add the increase of 27 to 180."
      },
      {
        "type": "question",
        "text": "2. Reduce £72 by 25%.",
        "answer": "£54",
        "explanation": "The saving is £18, one quarter of £72. Subtract it from £72."
      },
      {
        "type": "question",
        "text": "3. A £90 coat is reduced by 12%. How much money is saved?",
        "answer": "£10.80",
        "explanation": "10% is £9 and 2% is £1.80. The question wants the saving, not the £79.20 sale price."
      },
      {
        "type": "question",
        "text": "4. A £45 kit rises in price by 20%, then falls by 10% of the increased price. Find its final price.",
        "answer": "£48.60",
        "explanation": "The increase makes £54. Ten per cent of £54 is £5.40, leaving £48.60."
      },
      {
        "type": "question",
        "text": "5. After a 20% reduction, a lamp costs £56. What was its original price?",
        "answer": "£70",
        "explanation": "£56 is 80%. Divide by 8 for 10% = £7, then multiply by 10. Check: £70 less £14 = £56."
      },
      {
        "type": "question",
        "text": "6. After a 10% increase, a fee is £66. What was it before the increase?",
        "answer": "£60",
        "explanation": "£66 is 110%. Divide by 11 for 10% = £6, then multiply by 10."
      },
      {
        "type": "question",
        "text": "7. A £40 price falls by 25%, then rises by 25% of the sale price. Does it return to £40? Give the final price.",
        "answer": "No; £37.50",
        "explanation": "The reduction makes £30. The rise is £7.50, giving £37.50. The second percentage uses £30."
      },
      {
        "type": "question",
        "text": "8. A length of 250 cm increases by 8%. What is the new length?",
        "answer": "270 cm",
        "explanation": "1% is 2.5 cm, so 8% is 20 cm. Add the change to the original length."
      },
      {
        "type": "h2",
        "text": "Before choosing an answer"
      },
      {
        "type": "ul",
        "items": [
          "Name the base amount and keep its units.",
          "Decide whether the question wants the change, the new value or the original value.",
          "In a reverse question, label the given amount with its actual percentage before calculating."
        ]
      },
      {
        "type": "p",
        "text": "Review [percentages of amounts](/subjects/maths/percentages-of-amounts) if the building blocks need practice. Our [conversion guide](/blog/11-plus-fractions-decimals-percentages-conversions) connects percentages with fractions and decimals. Return to the [maths hub](/subjects/maths) for related original practice."
      },
      {
        "type": "p",
        "text": "Learning context: [Department for Education maths programme](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study). Percentage and proportion skills support this work; the guide is not a claim that every question here belongs to one universal exam specification. All examples and keys checked 24 October 2026."
      }
    ]
  },
  {
    "slug": "11-plus-apostrophes",
    "title": "11+ Apostrophes: Possession, Contractions and Practice",
    "desc": "Choose apostrophes by meaning: contractions, singular and plural possession, its and it’s, with an original passage and eight explained questions.",
    "subject": "english",
    "date": "October 24, 2026",
    "category": "English",
    "readTime": "5 min read",
    "imageUrl": "/brand/book-journey.webp",
    "imageAlt": "Illustrated books forming steps on a learning journey",
    "images": [],
    "content": [
      {
        "type": "p",
        "text": "An apostrophe is easier to place when you first decide what the word is doing. Is it shortening two words? Is it showing a noun’s relationship to something? Or is the word simply plural? Looking for every letter s and inserting punctuation is not a reliable method."
      },
      {
        "type": "p",
        "text": "These original questions support preparation for exams taken in 2027. They are not official school papers. Topic coverage and question formats vary: check your target school’s current information. Try the questions on paper before opening each answer."
      },
      {
        "type": "h2",
        "text": "Ask what the apostrophe means"
      },
      {
        "type": "p",
        "text": "A contraction leaves letters out: we have becomes we’ve. Possession uses an apostrophe with a noun: the pilot’s map. An ordinary plural does not need one: three maps. These are different decisions, so first identify the intended meaning rather than guessing the punctuation from the sound."
      },
      {
        "type": "h2",
        "text": "Count the owners, not the things owned"
      },
      {
        "type": "p",
        "text": "In “the artist’s brushes”, one artist has several brushes. The apostrophe belongs with artist, because that is the owner word. In “the artists’ studio”, several artists share a studio; artists is already plural and ends in s, so the apostrophe follows that s. One studio does not make the owners singular."
      },
      {
        "type": "table",
        "headers": [
          "Meaning",
          "Written form"
        ],
        "rows": [
          [
            "The notebook of one swimmer",
            "the swimmer’s notebook"
          ],
          [
            "The notebooks of several swimmers",
            "the swimmers’ notebooks"
          ],
          [
            "The notebooks of several children",
            "the children’s notebooks"
          ],
          [
            "More than one notebook, with no ownership stated",
            "notebooks"
          ]
        ]
      },
      {
        "type": "p",
        "text": "Irregular plurals need attention. Children already means more than one child, so there is no reason to add another plural s before the apostrophe. Form the owner word first, then decide the ending. This avoids treating children like a regular plural such as swimmers."
      },
      {
        "type": "h2",
        "text": "Use the expansion test for it’s"
      },
      {
        "type": "p",
        "text": "It’s can stand for it is or it has. Its expresses possession without an apostrophe. Try expanding the phrase in its sentence. “It’s become quieter” means “It has become quieter”. “The clock lost its hands” cannot mean “The clock lost it is hands”. The surrounding words decide the answer."
      },
      {
        "type": "h2",
        "text": "Original passage: the exhibition"
      },
      {
        "type": "p",
        "text": "Before the exhibition, one curator checked the artists’ labels. Two visitors left their umbrellas beside the children’s drawings. “It’s almost ready,” the curator said, lifting a model onto its stand. “We’ve only got the lights to test.”"
      },
      {
        "type": "p",
        "text": "The passage has several artists, more than one child, and one curator. Its apostrophes do different jobs. Artists’ and children’s mark relationships with nouns; it’s and we’ve shorten phrases. Visitors and umbrellas are plain plurals. The model’s stand is described with its, so no apostrophe is added there."
      },
      {
        "type": "h2",
        "text": "A proofreading routine"
      },
      {
        "type": "ul",
        "items": [
          "Read the sentence for meaning before editing it.",
          "For a contraction, expand the words and check that the sentence still makes sense.",
          "For possession, say “the item of the owner” to identify the owner word.",
          "Form that owner as singular or plural before placing the apostrophe.",
          "Leave ordinary plural nouns alone."
        ]
      },
      {
        "type": "p",
        "text": "A sentence without enough context can allow more than one possessive form. “The singers song” could concern one singer or several. A careful question states the number of owners, or provides clues in a passage. Do not claim an answer is uniquely correct when the meaning has not been specified."
      },
      {
        "type": "h2",
        "text": "Eight original questions"
      },
      {
        "type": "question",
        "text": "1. Rewrite “We have finished the display” using a contraction.",
        "answer": "We’ve finished the display.",
        "explanation": "We’ve contracts we have. The apostrophe marks the omitted letters in have."
      },
      {
        "type": "question",
        "text": "2. One gardener owns several spades. Rewrite “the spades belonging to the gardener”.",
        "answer": "the gardener’s spades",
        "explanation": "There is one gardener, so the singular owner takes ’s. Spades is an ordinary plural."
      },
      {
        "type": "question",
        "text": "3. Four musicians share a rehearsal room. Rewrite “the room used by the musicians” using possession.",
        "answer": "the musicians’ rehearsal room",
        "explanation": "Musicians is plural and already ends in s. Add the apostrophe after that s."
      },
      {
        "type": "question",
        "text": "4. Rewrite “the helmets belonging to the children” using possession.",
        "answer": "the children’s helmets",
        "explanation": "Children is an irregular plural without a final s. Add ’s to children."
      },
      {
        "type": "question",
        "text": "5. Complete: “The museum has changed ___ entrance, and ___ easier to find.”",
        "answer": "its; it’s",
        "explanation": "The first gap means the museum’s entrance. The second expands to it is easier to find."
      },
      {
        "type": "question",
        "text": "6. In the exhibition passage, what two words does “It’s” replace?",
        "answer": "It is",
        "explanation": "The sentence means It is almost ready. It has almost ready would not be grammatical."
      },
      {
        "type": "question",
        "text": "7. Correct this sentence: “The baker sold six loaf’s before lunch.”",
        "answer": "The baker sold six loaves before lunch.",
        "explanation": "This is a plural, not possession. The correct plural spelling is loaves, with no apostrophe."
      },
      {
        "type": "question",
        "text": "8. Explain the difference between “the dancer’s shoes” and “the dancers’ shoes”.",
        "answer": "The first refers to one dancer; the second to more than one dancer.",
        "explanation": "Shoes is plural in both phrases. The changed apostrophe position changes the number of owners, not the number of shoes."
      },
      {
        "type": "h2",
        "text": "Take the rule into your own writing"
      },
      {
        "type": "p",
        "text": "Write two sentences about a shared object and two about separate owners. Underline the owner words, then explain each apostrophe aloud. Follow with our [direct-speech punctuation guide](/blog/11-plus-direct-speech-punctuation) to edit the exhibition dialogue, or return to the [English hub](/subjects/english). This practice tests explanation as well as spotting a symbol."
      },
      {
        "type": "p",
        "text": "Teaching sources checked 24 October 2026: [British Council: capital letters and apostrophes](https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/capital-letters-apostrophes) and [DfE English programme](https://www.gov.uk/government/publications/national-curriculum-in-england-english-programmes-of-study/national-curriculum-in-england-english-programmes-of-study). The passage, examples and questions are original; no official mark scheme or educator endorsement is claimed."
      }
    ]
  }
];
