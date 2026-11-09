import type { BlogPost } from './blogPosts';
const extensions: Record<string, BlogPost['content']> = {
  "11-plus-fractions-decimals-percentages-conversions": [
    {
      "type": "h2",
      "text": "Diagnostic: keep exact values until the final instruction"
    },
    {
      "type": "p",
      "text": "A pupil compares 2/3 with 67% by rounding both to 67% and calling them equal. The rounded descriptions match, but the exact values do not. Multiply both by 300: 2/3 becomes 200 and 67/100 becomes 201. Therefore 67% is larger. Rounding is useful when requested, but it can hide a difference that an ordering question needs. For a value above one whole, keep the same conversion rule: 7/5 =1.4 =140%. A percentage greater than 100 is possible; it describes more than the chosen whole."
    },
    {
      "type": "p",
      "text": "Try these diagnostic questions on paper. Write what each intermediate number represents before revealing the explanation. A correct number without the right interpretation may answer a different question."
    },
    {
      "type": "question",
      "text": "Which is larger: 3/8 or 38%? Explain without rounding.",
      "answer": "38%.",
      "explanation": "3/8 =37.5%, which is less than 38%. Rounding 37.5% first would destroy the distinction."
    },
    {
      "type": "question",
      "text": "Write 1.06 as a simplified fraction and a percentage.",
      "answer": "53/50 and 106%.",
      "explanation": "1.06 =106/100 =53/50. Multiplying the decimal by 100 gives 106%; it is slightly greater than one whole."
    },
    {
      "type": "question",
      "text": "A pupil says 0.405 equals 40.5/100. Is this exact?",
      "answer": "Yes.",
      "explanation": "40.5 divided by 100 is 0.405. If integer numerator and denominator are wanted, use 405/1000 =81/200. The numerator of a percentage representation need not be a whole number."
    },
    {
      "type": "p",
      "text": "If this exposed a gap, revisit [the related method](/blog/11-plus-decimal-arithmetic), then use the [maths printable and worked answers](/papers#maths-printable). Return to the [Maths learning hub](/subjects/maths) to choose your next skill. These are original extension questions, not a prediction of a school’s 2027 paper."
    }
  ],
  "11-plus-multi-step-word-problems": [
    {
      "type": "h2",
      "text": "Diagnostic: choose the information that answers the question"
    },
    {
      "type": "p",
      "text": "A club has 48 children,6 adults and 12 boxes of equipment. Each vehicle has 9 passenger seats, excluding its driver. The question asks only how many vehicles carry the people; equipment travels separately. Count 48+6=54 passengers, then 54÷9=6 vehicles. Adding 12 boxes to the passenger count would mix different kinds of quantity. Do not discard a number because it looks awkward: explain why the wording makes it irrelevant. If equipment occupied passenger seats, that would be a different problem. Check both capacity and the meaning of the total."
    },
    {
      "type": "p",
      "text": "Try these diagnostic questions on paper. Write what each intermediate number represents before revealing the explanation. A correct number without the right interpretation may answer a different question."
    },
    {
      "type": "question",
      "text": "There are 37 pupils and 4 adults. Vehicles hold 8 passengers each, excluding the driver. Equipment is transported separately in 5 boxes. How many vehicles are needed?",
      "answer": "6 vehicles.",
      "explanation": "41 people need seats. Five vehicles carry 40, leaving one person, so six are required. The 5 boxes are irrelevant to passenger capacity."
    },
    {
      "type": "question",
      "text": "A 4.2 m ribbon costs£3. Five 60 cm pieces are cut. How much length remains, in centimetres?",
      "answer": "120 cm.",
      "explanation": "Convert 4.2 m to 420 cm. Five pieces use 300 cm, leaving 120 cm. The price is not needed for a length answer."
    },
    {
      "type": "question",
      "text": "A group needs 30 admission tickets. Six are free; the others cost£7 each. A pupil calculates 30×7. What has been missed, and what is the cost?",
      "answer": "The free tickets;£168.",
      "explanation": "Only 30−6=24 tickets are paid for.24×7=168. The original calculation charges for tickets explicitly described as free."
    },
    {
      "type": "p",
      "text": "If this exposed a gap, revisit [the related method](/blog/11-plus-working-backwards), then use the [maths printable and worked answers](/papers#maths-printable). Return to the [Maths learning hub](/subjects/maths) to choose your next skill. These are original extension questions, not a prediction of a school’s 2027 paper."
    }
  ],
  "11-plus-algebra-basics": [
    {
      "type": "h2",
      "text": "Diagnostic: let the expression match the grouping"
    },
    {
      "type": "p",
      "text": "A craft session costs£4 to enter and£2 for each model. For m models the bill is 4+2 m, because the entry fee is paid once. The expression 2(m+4) instead adds£4 inside each of two groups; it represents a different relationship. Test m=3: the correct bill is£10, whereas the second expression gives£14. Substitution can expose a translation error before you solve an equation. Also check what values the variable can take: a count of complete models must be a non-negative whole number, even though an equation may have a fractional solution."
    },
    {
      "type": "p",
      "text": "Try these diagnostic questions on paper. Write what each intermediate number represents before revealing the explanation. A correct number without the right interpretation may answer a different question."
    },
    {
      "type": "question",
      "text": "A club charges£5 once and£3 per badge made. Write the bill for b badges and evaluate it for b=4.",
      "answer": "5+3 b;£17.",
      "explanation": "The fixed charge appears once. Four badges cost£12, so the total is£17.3(b+5) would charge the fixed amount three times."
    },
    {
      "type": "question",
      "text": "With that pricing, can the bill be exactly£18 for a whole number of badges?",
      "answer": "No.",
      "explanation": "5+3 b=18 gives 3 b=13 and b=13/3. Four badges cost£17 and five cost£20; no whole-number count gives£18."
    },
    {
      "type": "question",
      "text": "Which expression means three more than twice n:2 n+3 or 2(n+3)? Check n=4.",
      "answer": "2 n+3, giving 11.",
      "explanation": "Double 4 is 8, then add 3. The bracketed expression gives 14 because it doubles the extra 3 as well."
    },
    {
      "type": "p",
      "text": "If this exposed a gap, revisit [the related method](/blog/11-plus-multi-step-word-problems), then use the [maths printable and worked answers](/papers#maths-printable). Return to the [Maths learning hub](/subjects/maths) to choose your next skill. These are original extension questions, not a prediction of a school’s 2027 paper."
    }
  ],
  "11-plus-percentage-increase-decrease": [
    {
      "type": "h2",
      "text": "Diagnostic: compare a cash saving with a percentage saving"
    },
    {
      "type": "p",
      "text": "Two offers apply to the same£60 item:£12 off, or 15% off. The percentage saving is£9, so the cash offer saves£3 more. This comparison changes with the original price. At£80,15% is£12 and the offers are equal. Below£80 the fixed£12 saving is larger; above£80 the 15% saving is larger. Compare the savings or compare the final prices, but use the same method for both offers. These are hypothetical arithmetic offers with no additional conditions, not advice about a real purchase."
    },
    {
      "type": "p",
      "text": "Try these diagnostic questions on paper. Write what each intermediate number represents before revealing the explanation. A correct number without the right interpretation may answer a different question."
    },
    {
      "type": "question",
      "text": "On a£90 item, which saves more:£12 off or 15% off? By how much?",
      "answer": "15% off, by£1.50.",
      "explanation": "10% of£90 is£9 and 5% is£4.50. The saving£13.50 exceeds£12 by£1.50."
    },
    {
      "type": "question",
      "text": "At what original price are£18 off and 20% off equal?",
      "answer": "£90.",
      "explanation": "If 20% is£18,10% is£9 and 100% is£90. Check: one fifth of£90 is£18."
    },
    {
      "type": "question",
      "text": "A£100 item has 10% off and then£5 off the reduced price. Is that the same as£5 off first and then 10% off?",
      "answer": "No:£85 versus£85.50.",
      "explanation": "First route:100−10−5=85. Second:95−9.50=85.50. A fixed cash reduction changes the base on which the later percentage is calculated."
    },
    {
      "type": "p",
      "text": "If this exposed a gap, revisit [the related method](/blog/11-plus-money-best-value), then use the [maths printable and worked answers](/papers#maths-printable). Return to the [Maths learning hub](/subjects/maths) to choose your next skill. These are original extension questions, not a prediction of a school’s 2027 paper."
    }
  ],
  "11-plus-money-best-value": [
    {
      "type": "h2",
      "text": "Diagnostic: compare complete bills, including delivery"
    },
    {
      "type": "p",
      "text": "Supplier A sells identical folders in packs of 4 for£3.20 with£2 delivery per order. Supplier B sells packs of 6 for£5.40 with free delivery. For at least 12 folders, A costs 3×£3.20+£2=£11.60, while B costs 2×£5.40=£10.80. A has the lower price per folder before delivery, but B has the lower complete bill. Write a separate line for delivery so it is added once per order, not once per pack. For larger quantities the result may change; the cheaper supplier is not a permanent property of the unit price."
    },
    {
      "type": "p",
      "text": "Try these diagnostic questions on paper. Write what each intermediate number represents before revealing the explanation. A correct number without the right interpretation may answer a different question."
    },
    {
      "type": "question",
      "text": "Using those suppliers, find the cheaper complete bill for at least 8 folders.",
      "answer": "A:£8.40.",
      "explanation": "A needs two packs:£6.40+£2=£8.40. B needs two packs:£10.80. One B pack supplies only 6 folders."
    },
    {
      "type": "question",
      "text": "Using those suppliers, find the cheaper complete bill for exactly 24 folders.",
      "answer": "A:£21.20.",
      "explanation": "A: six packs cost£19.20 plus£2 delivery. B: four packs cost£21.60. Both meet the exact quantity; A saves 40 p."
    },
    {
      "type": "question",
      "text": "You may buy from only one supplier and have£15 including delivery. What is the maximum number of folders?",
      "answer": "16 folders from A.",
      "explanation": "A leaves£13 for packs, so four packs cost£12.80 and provide 16 folders; five exceed the budget. B permits two packs costing£10.80, providing 12; three cost£16.20."
    },
    {
      "type": "p",
      "text": "If this exposed a gap, revisit [the related method](/blog/11-plus-systematic-listing), then use the [maths printable and worked answers](/papers#maths-printable). Return to the [Maths learning hub](/subjects/maths) to choose your next skill. These are original extension questions, not a prediction of a school’s 2027 paper."
    }
  ]
};
export function extendMathsNovember9(post: BlogPost): BlogPost {
 const extra = extensions[post.slug];
 return extra ? { ...post, title: post.title.replace('Eight', 'Eleven'), desc: post.desc.replace('eight', 'eleven'), updatedAt: '2026-11-09', content: [...post.content, ...extra] } : post;
}
