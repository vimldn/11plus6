import type { BlogPost } from './blogPosts';

type Block = BlogPost['content'][number];
const p = (text: string): Block => ({ type: 'p', text });
const h = (text: string): Block => ({ type: 'h2', text });
const ul = (...items: string[]): Block => ({ type: 'ul', items });
const ol = (...items: string[]): Block => ({ type: 'ol', items });
const table = (headers: string[], rows: string[][]): Block => ({ type: 'table', headers, rows });
const question = (text: string, answer: string, explanation: string): Block => ({ type: 'question', text, answer, explanation });
const note = (text: string): Block => ({ type: 'callout', variant: 'info', text });
const repair = (title: string, desc: string, content: Block[], extra: Partial<BlogPost> = {}): Partial<BlogPost> => {
  const words = content.flatMap(block => 'text' in block ? [block.text, ...('answer' in block ? [block.answer, block.explanation] : [])] : 'items' in block ? block.items : 'headers' in block ? [...block.headers, ...block.rows.flat()] : []).join(' ').split(/\s+/).length;
  return { title, desc, updatedAt: '2026-11-02', editorial: true, readTime: `${Math.max(3, Math.ceil(words / 210))} min read`, content, ...extra };
};

// Existing-URL repairs. Original publication dates, slugs and artwork are inherited.
export const SEO_REPAIRS_A: Record<string, Partial<BlogPost>> = {
  'what-topics-are-in-11-plus-english': repair(
    '11 Plus English topics: a practical revision checklist',
    'Check the English skills your child needs, from comprehension and vocabulary to grammar and writing, with examples and links to focused practice.',
    [
      p('11 Plus English preparation can include reading comprehension, vocabulary, spelling, grammar, punctuation and writing. The combination depends on the school and test. Use the checklist below to identify skills to teach, then compare it with your target school’s current sample materials before choosing papers.'),
      note('Preparing for an exam taken in 2027? Record the test year separately from the school-entry year. An autumn 2027 test will commonly relate to September 2028 entry; some independent-school calendars differ.'),
      h('The English topics to check'),
      table(['Topic', 'What your child should be able to do', 'A useful practice task'], [
        ['Retrieval', 'Find information the passage actually states, including conditions and exceptions.', 'Answer who, where, when or why without adding a detail.'],
        ['Inference', 'Reach a conclusion supported by clues in the text.', 'Explain what a character’s behaviour suggests, using evidence.'],
        ['Vocabulary', 'Choose the meaning that fits this particular sentence.', 'Replace a word with a suitable alternative and check the whole sentence.'],
        ['Language and structure', 'Explain the effect of a word choice, image, contrast or change of focus.', 'Describe what a phrase helps the reader imagine, rather than just naming a technique.'],
        ['Grammar and punctuation', 'Recognise and use accurate sentences, tenses, clauses and punctuation.', 'Correct a sentence and explain the rule.'],
        ['Spelling', 'Recognise correct forms and distinguish easily confused words.', 'Use a word in a sentence so meaning and spelling are checked together.'],
        ['Writing, if assessed', 'Develop a clear response to the task, organise it and revise errors.', 'Plan a short piece with a definite purpose, then improve one paragraph.'],
      ]),
      p('The [English national curriculum](https://www.gov.uk/government/publications/national-curriculum-in-england-english-programmes-of-study/national-curriculum-in-england-english-programmes-of-study) is a useful foundation for these skills. It is not a single entrance-exam specification. A topic can matter to general literacy without appearing as a separate section in your child’s assessment.'),
      h('See the difference between retrieval and inference'),
      p('Read this original mini-passage: “Leena left the invitation on the kitchen table. At the school gate, she checked her pocket again, then turned back towards home.”'),
      question('Where did Leena leave the invitation?', 'On the kitchen table.', 'This is retrieval: the first sentence states the location. There is no need to invent a reason.'),
      question('What does Leena’s decision to turn back suggest?', 'She probably wants to collect the invitation she left at home.', 'The invitation is on the table, she checks her pocket and then turns homewards. Together, those details support the inference. The passage does not establish that she is frightened or late.'),
      p('A response such as “She is worried” is less precise because it does not explain what the clues suggest. Practise [finding stated information](/subjects/english/comprehension-retrieval), then [making inferences](/subjects/english/comprehension-inference) and [supporting answers with evidence](/subjects/english/using-evidence).'),
      h('Adapt the practice to the answer format'),
      p('For multiple-choice comprehension, test every plausible option against the passage. An answer can sound sensible yet add something the author never said. For written answers, follow the command: “find” may need a short quotation; “explain” needs your child’s reasoning. The question and mark scheme determine the required detail.'),
      p('Writing needs its own preparation if the school assesses it. Give your child a clear task, ask for a short plan and read the finished piece for meaning before correcting everything. A convincing event, logical sequence and controlled sentences are more useful than inserting impressive words that do not fit.'),
      h('Choose the next skill, not another whole paper'),
      ul(
        'If answers copy the wrong line, work on locating the relevant detail.',
        'If answers guess beyond the passage, practise matching each conclusion to a clue.',
        'If unfamiliar vocabulary blocks understanding, use the [vocabulary routine](/blog/how-to-improve-11-plus-vocabulary-quickly).',
        'If written answers are vague, compare a thin answer with an explained answer on the same question.',
        'If punctuation slips recur, correct one rule and use it in a fresh sentence.'
      ),
      p('Keep a small record: skill, example of the difficulty, explanation tried and next question. Return to the skill in a new passage before deciding it is secure. Use the [English practice hub](/subjects/english) to choose a focused next step, and the [paper library](/papers) when your child is ready to combine skills.'),
      h('Sources and review'),
      p('Updated 2 November 2026 using the DfE English curriculum linked above and [GL Assessment’s familiarisation guidance](https://11plus.gl-assessment.co.uk/pages/free-materials). The passage and questions are original teaching examples. No fixed percentage of English marks, universal passage length or guaranteed syllabus is claimed.')
    ],
    { subject: 'english', category: 'English' }
  ),

  'what-topics-are-in-11-plus-maths': repair(
    '11 Plus maths topics: checklist, examples and study order',
    'Use this 11 Plus maths checklist to find gaps in number, fractions, geometry and problem solving, with worked examples and a sensible study order.',
    [
      p('Start 11 Plus maths preparation with secure number skills, then connect them to fractions, measures, geometry and problems in words. There is no single topic list that guarantees coverage for every entrance test. Your school’s published guidance and sample questions decide which areas need attention.'),
      p('The [Maths hub](/subjects/maths) provides original practice. Use it alongside the checklist below; a tick should mean your child can explain a method and apply it to a fresh question, rather than recognise an answer they have seen before.'),
      h('A maths checklist that checks understanding'),
      table(['Area', 'Skills to check', 'What to listen for'], [
        ['Number and calculation', 'Place value, ordering, rounding, negative numbers, all four operations, factors, multiples and primes.', 'Can your child estimate an answer and choose an appropriate written or mental method?'],
        ['Fractions, decimals and percentages', 'Equivalence, comparison, conversions, calculations and amounts.', 'Can they explain what the whole is and whether the question asks for a part or a remainder?'],
        ['Ratio and proportion', 'Sharing, comparing quantities and scaling.', 'Do they distinguish the number of parts from the total number of objects?'],
        ['Algebra and sequences', 'Missing values, simple equations, patterns and expressing a rule.', 'Can they check a proposed value in the original statement?'],
        ['Measurement', 'Money, time, length, mass, capacity, unit conversion and reading scales.', 'Do they keep units consistent and answer in the requested unit?'],
        ['Geometry', 'Angles, properties of shapes, coordinates, symmetry, area, perimeter and volume.', 'Can they say which measurement a calculation represents?'],
        ['Data', 'Reading tables, charts and graphs; interpreting averages where required.', 'Do they read the scale and identify exactly which values are relevant?'],
        ['Problem solving', 'Selecting operations, combining steps and explaining a conclusion.', 'Can they describe the problem before calculating?'],
      ]),
      p('England’s [primary mathematics curriculum](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study) is a useful reference for foundational content. Entrance questions may combine familiar skills in unfamiliar ways, and an autumn test arrives before a child has completed Year 6. Do not assume everything in a generic commercial checklist is required by every school.'),
      h('Teach the prerequisites first'),
      ol(
        'Check place value and the four operations. Fractions are harder when division is uncertain.',
        'Build equivalence and the meaning of a fraction before fraction arithmetic.',
        'Connect fractions, decimals and percentages instead of treating them as unrelated tricks.',
        'Introduce ratio and multi-step problems with quantities your child can draw or describe.',
        'Mix topics after your child can choose a method without being told which chapter they are in.'
      ),
      h('Three original questions that reveal different gaps'),
      question('Three fifths of a 45-minute lesson are spent reading. How many minutes remain?', '18 minutes.', 'One fifth is 45 ÷ 5 = 9 minutes. Three fifths is 27 minutes, so 45 − 27 = 18 remain. An answer of 27 finds the reading time but misses the word “remain”.'),
      question('Red and blue counters are in the ratio 2:3. There are 35 counters altogether. How many are blue?', '21 blue counters.', 'There are 2 + 3 = 5 equal parts. Each part is 35 ÷ 5 = 7 counters. Blue accounts for 3 parts, so 3 × 7 = 21.'),
      question('A rectangle has perimeter 30 cm and length 9 cm. What is its area?', '54 cm².', 'Length plus width is 30 ÷ 2 = 15 cm. The width is 15 − 9 = 6 cm. Area is 9 × 6 = 54 cm²; perimeter and area measure different things.'),
      p('If the first two were difficult, try [fractions of amounts](/subjects/maths/fractions-of-amounts) and [ratio sharing](/subjects/maths/ratio-sharing). For the third, use [area and perimeter](/blog/11-plus-area-perimeter). These links teach the missing method before another mixed test.'),
      h('How to use the checklist each week'),
      p('Choose one small gap and one previously learned skill. Work through an example, let your child explain it, then ask a different question without the example visible. Later, include that skill in a mixed set. Record whether an error came from the concept, calculation, wording or checking; each needs a different response.'),
      p('Try [fresh arithmetic practice](/quiz?paper=maths-generated&topic=arithmetic&mode=practice) or [percentage practice](/quiz?paper=maths-generated&topic=percentages&mode=practice). Use [mental maths methods](/blog/how-to-improve-11-plus-mental-maths) to improve fluency without banning written working. Match any timed session to the actual instructions for the target test.'),
      h('Sources and review'),
      p('Updated 2 November 2026 against the DfE curriculum and [GL Assessment’s parent guidance](https://11plus.gl-assessment.co.uk/). The three examples were independently recalculated. This checklist does not assign invented topic weightings or predict a school’s qualifying score. For exams taken in 2027, check the relevant entry cycle rather than relabelling an older paper.')
    ],
    { subject: 'maths', category: 'Maths' }
  ),

  'what-is-11-plus-verbal-reasoning': repair(
    'What is 11 Plus verbal reasoning? Examples and methods',
    'Understand verbal reasoning with original word, code, analogy and sequence examples, clear explanations and links to focused 11 Plus practice.',
    [
      p('Verbal reasoning uses words, letters and sometimes numbers to test relationships and logical thinking. A question might ask which words have a similar meaning, how a letter code works or what completes an analogy. It overlaps with English, but a child can read fluently and still need to learn the instructions for an unfamiliar puzzle.'),
      p('Check whether your target school tests verbal reasoning as a separate area, combines it with other skills or uses a different assessment. A publisher’s list of question types is a preparation catalogue, not a promise about every child’s exam.'),
      h('The main question families'),
      table(['Family', 'What the child works out', 'Useful first move'], [
        ['Word meanings', 'A synonym, an opposite or a word that fits a sentence.', 'Check the meaning in context before comparing the options.'],
        ['Word relationships', 'The link between two words, or which item does not belong.', 'Describe the relationship precisely: a tool and its purpose, for example.'],
        ['Letter and word manipulation', 'A code, missing letter, word construction or hidden word.', 'Read exactly what may change and what must stay fixed.'],
        ['Sequences', 'A consistent pattern in letters or numbers.', 'Write the changes between neighbouring terms.'],
        ['Logic', 'What follows from a small set of statements.', 'Use only the information given; separate “must” from “might”.'],
      ]),
      h('Four original examples, with explanations'),
      question('Choose the closest meaning to “scarce”: plentiful, rare, noisy or smooth.', 'Rare.', 'Scarce means in short supply. “Plentiful” is the opposite. The other choices describe unrelated qualities. A useful next step is to use “scarce” in a sentence.'),
      question('A code moves every letter two places forwards in the alphabet. CAT becomes ECV. What does DOG become?', 'FQI.', 'D moves to F, O to Q and G to I. Apply the same change to every letter and check the example. In a different question, do not assume the rule is still “add two”.'),
      question('Complete the relationship: glove is to hand as sock is to ___.', 'Foot.', 'The first item is worn on the second. “Shoe” is related to a sock but does not preserve that relationship.'),
      question('Continue the sequence: 4, 9, 14, 19, ___.', '24.', 'Each term increases by 5. Check more than one gap before choosing the rule: 9 − 4, 14 − 9 and 19 − 14 are all 5.'),
      p('These short examples introduce methods. They are not official questions or a complete measure of readiness. The [verbal reasoning hub](/subjects/verbal-reasoning) provides original exercises, and you can [start a practice set](/quiz?paper=verbal-reviewed&mode=practice) with explained answers.'),
      h('How to practise a new type'),
      ol(
        'Read one instruction together and ask your child to explain the task in their own words.',
        'Model the reasoning aloud, including why an attractive wrong answer fails.',
        'Try a few questions of that type without a stopwatch.',
        'Return to it in a mixed set so your child must recognise the method.',
        'Add timing only when the method is reasonably secure and the test format is known.'
      ),
      p('A correct answer with no explanation may be a lucky choice. Ask “What rule did you use?” or “Why is the other answer wrong?” If your child can explain the relationship but lacks one word’s meaning, treat that as a vocabulary gap rather than a failure of logic.'),
      h('Vocabulary and careful reading still matter'),
      p('Read a range of books and discuss unfamiliar words. Keep a small record of useful words, their meanings and an original sentence; revisit them in a different context. Our [vocabulary guide](/blog/how-to-improve-11-plus-vocabulary-quickly) shows how to organise this without pretending there is one official word list to memorise.'),
      p('Small instructions can change the task: one answer versus two, closest meaning versus opposite, or a word hidden across a boundary rather than inside one word. Accuracy begins with noticing that difference. For broader language work, see the [English topic checklist](/blog/what-topics-are-in-11-plus-english).'),
      h('What to check for the real test'),
      p('Use the admissions authority’s current familiarisation for the layout, answer sheet, section timing and permitted navigation. Avoid copying a universal time limit or raw pass percentage from a generic guide. For tests taken in 2027, confirm which school-entry year the instructions concern.'),
      h('Sources and review'),
      p('Updated 2 November 2026 with [GL’s official familiarisation materials](https://11plus.gl-assessment.co.uk/pages/free-materials) and [ISEB’s separate Pre-Tests family information](https://www.iseb.co.uk/assessments/common-pre-tests/for-families/). Original examples were checked for consistent rules and answers; no provider endorsement or human educator review is claimed.')
    ],
    { category: 'Verbal Reasoning' }
  ),

  'what-is-11-plus-non-verbal-reasoning': repair(
    'What is 11 Plus non-verbal reasoning? A parent’s guide',
    'Learn how non-verbal reasoning uses patterns, rotations and reflections, with a simple inspection method and links to real diagram practice.',
    [
      p('Non-verbal reasoning asks children to work with visual relationships: shapes, positions, shading, movement and patterns. Instead of explaining a passage, they may choose the figure that completes a sequence or follows the same transformation. Spatial questions can involve turning objects or imagining how a flat net forms a solid.'),
      p('It is not an art test, and one difficult puzzle does not define a child’s intelligence. The practical task is to identify which features change and check whether a proposed rule works. Your target school’s current information determines whether this area appears in its assessment.'),
      h('Common types of visual question'),
      table(['Type', 'What changes or stays the same?', 'A question to ask'], [
        ['Series', 'One or more features change across a sequence.', 'Does the movement or shading repeat in a regular way?'],
        ['Analogies', 'A transformation is shown in one pair and applied to another.', 'What exactly happened to the first figure?'],
        ['Matrices', 'A rule connects figures across rows or columns.', 'Does my explanation fit every completed row or column?'],
        ['Odd one out', 'Most figures share a property; one breaks it.', 'Which property do the other figures genuinely share?'],
        ['Rotation and reflection', 'A figure turns or is mirrored.', 'Has the object turned as a whole, or has its handedness reversed?'],
        ['Spatial problems', 'Views, folds, nets or hidden shapes must be related.', 'Which edges, faces or features would meet?'],
      ]),
      p('These are useful families for discussing practice. They are not guaranteed sections, fixed proportions or an official national syllabus. Some resources divide them into more categories, which does not establish that a real test contains that number of question types.'),
      h('A practical way to inspect a figure'),
      ol(
        'Count: shapes, sides, dots, lines and repeated elements.',
        'Locate: above, below, inside, outside and relative position.',
        'Compare: size, colour, shading and orientation.',
        'Track: what changes between figures and what remains fixed.',
        'Test: check the rule against another complete example before selecting an answer.'
      ),
      p('This is a checking routine, not a command to perform every step on every question. If rotation is clearly the relevant feature, follow it. When a plausible answer fails, return to the figure and identify which assumption was wrong.'),
      h('Try rotation and reflection with paper'),
      p('Draw an arrow pointing upwards on a small square of paper. Turn the whole paper a quarter-turn clockwise: the arrow now points right. Turn it back, then use a mirror beside the drawing to explore a reflection. A turn changes orientation; a reflection produces a mirror image. An asymmetrical shape, such as an irregular flag, makes the distinction easier to inspect.'),
      p('For a dot near the top-left corner of a square, a quarter-turn clockwise moves it near the top-right corner. Predict the new position before moving the paper. Check that every feature moves together rather than redrawing the dot wherever an answer happens to place it. This is a physical learning activity, not a substitute for diagram questions.'),
      h('Practise with actual diagrams'),
      p('Open the [non-verbal reasoning hub](/subjects/non-verbal-reasoning) for the available visual exercises, or [start diagram practice](/quiz?paper=visual-reviewed&mode=practice). Work through one type, explain the change, then revisit it among other types. The practice library’s coverage describes our resources; it does not certify complete coverage of a particular school’s test.'),
      p('After a mistake, ask your child to point to the feature they missed. “I forgot that the small triangle also turns” gives you a useful next step. “I am bad at shapes” does not. If several options seem to fit, check whether the question has been misunderstood or whether another feature distinguishes them.'),
      h('Timing and next steps'),
      p('Use the official instructions before introducing timed work. Some assessments control sections separately; the child must follow those boundaries. Do not assume a spare minute in one part can be transferred elsewhere. See the [time-management guide](/blog/11-plus-time-management-strategies-in-the-exam) for an adaptable practice method.'),
      p('For word and letter puzzles, use the separate [verbal reasoning guide](/blog/what-is-11-plus-verbal-reasoning). For tests taken in 2027, make sure your school guidance refers to the correct admission cycle rather than an older cohort.'),
      h('Sources and review'),
      p('Updated 2 November 2026 with [GL’s familiarisation information](https://11plus.gl-assessment.co.uk/pages/free-materials) and [ISEB’s Pre-Tests information](https://www.iseb.co.uk/assessments/common-pre-tests/for-families/). The feature checklist and paper activity are original teaching suggestions. No claim is made about universal question shares or a child’s cognitive score.')
    ],
    { category: 'Non-Verbal Reasoning' }
  ),

  'how-hard-is-the-11-plus-exam': repair(
    'How hard is the 11 Plus? Find the challenge your child faces',
    'Separate unfamiliar questions, knowledge gaps, timing and admissions competition, then use a practical review to choose the right 11 Plus support.',
    [
      p('The 11 Plus can be demanding, but “hard” can mean several different things. A child may know the maths but misread a problem, understand a passage but struggle to explain an inference, or solve a puzzle accurately until a timer is introduced. Those are different difficulties and need different responses.'),
      p('There is also a separate question: how difficult is it to obtain a place at a particular school? That depends on its admissions rules and the relevant applicant cohort. A demanding practice paper does not reveal an applicant’s chance of an offer.'),
      h('Identify which kind of difficulty you are seeing'),
      table(['What happens?', 'What to check', 'Useful next step'], [
        ['The child cannot explain the method, even without timing.', 'A missing concept or unfamiliar vocabulary.', 'Teach the underlying skill with a simpler example.'],
        ['They understand an explanation but cannot start a new question.', 'Whether the method transfers beyond the worked example.', 'Compare two questions and identify what stays the same.'],
        ['They solve it calmly but lose accuracy when timed.', 'Pacing, fluency and the pressure of the format.', 'Use a shorter timed section and review the point where errors begin.'],
        ['They calculate correctly but answer the wrong question.', 'Reading, units and words such as remaining or difference.', 'Ask for a one-sentence description of the required answer.'],
        ['They do well in practice but a school still looks uncertain.', 'Qualification, ranking and oversubscription criteria.', 'Read the school’s admissions policy rather than raising an arbitrary target score.'],
      ]),
      h('Use a small review before judging ability'),
      p('Choose a short, relevant set of questions. Start untimed and ask your child to explain a few answers. Note what they do independently and where they need help. Teach one missing skill, then try a fresh example. This tells you more about the next lesson than a single overall percentage.'),
      p('Later, try comparable questions under the appropriate conditions. Compare the kinds of error, not just the total. If the untimed work is insecure, repeatedly imposing the full exam clock is unlikely to tell you what to teach. If accuracy is secure, a pacing routine may be the more useful next step.'),
      h('A small change can make a familiar skill harder'),
      question('A box contains 40 beads. Three quarters are green. How many are not green?', '10 beads.', 'One quarter is 40 ÷ 4 = 10. Three quarters, or 30 beads, are green, leaving 10. A child may know fractions perfectly but answer 30 if they miss “not”.'),
      p('The example is deliberately simple. It separates calculation from understanding the wording. Use [fractions of amounts](/subjects/maths/fractions-of-amounts) if the method is the problem, or [multi-step word problems](/blog/11-plus-multi-step-word-problems) if selecting and interpreting the steps is harder.'),
      h('Why one practice percentage cannot predict a place'),
      p('Papers differ in difficulty, length, content and scoring. Repeating a familiar paper also changes what the result means. A commercial score is not an official standardised score, and a qualifying result is not always an offer. Our guides to [how the exam is scored](/blog/how-is-the-11-plus-scored-and-marked) and [pass rates](/blog/how-many-children-pass-the-11-plus-pass-rate) explain the distinctions.'),
      p('Avoid describing a child as certain to pass because they score a particular percentage, or as unsuitable because their first paper was difficult. Look for progress on fresh tasks, a clear understanding of the local requirements and a preparation routine the child can sustain.'),
      h('When extra help may be useful'),
      p('Ask the class teacher about a persistent learning gap or a concern that also appears in ordinary schoolwork. A tutor may help with a specific method or with feedback on written work, but more hours are not automatically the answer. Use the [tutor decision guide](/blog/do-we-need-an-11-plus-tutor) to define the support you actually need.'),
      p('Keep suitable alternative schools in the plan and make clear that an entrance result is not a verdict on your child. If preparation is causing distress, reduce the pressure and use the [parent support guide](/blog/11-plus-exam-stress-and-anxiety-how-to-help-my-child).'),
      h('Sources and review'),
      p('Updated 2 November 2026 using [GL’s parent FAQs](https://11plus.gl-assessment.co.uk/pages/faqs) and [EEF mathematics guidance](https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/maths-ks-2-3). The diagnostic table and bead example are original. Check the correct entry cycle for an exam taken in 2027; this guide does not invent a national pass probability or rank schools by difficulty.')
    ],
    { category: 'Guide' }
  ),

  'how-to-prepare-for-the-11-plus-at-home': repair(
    'How to prepare for the 11 Plus at home: a practical plan',
    'Build a manageable home preparation routine: confirm the test, find specific gaps, teach a method, review mistakes and choose useful practice.',
    [
      p('You can organise 11 Plus preparation at home by giving each session a clear purpose: find a gap, teach a method, practise it and return to it later. A large pile of papers is less useful if nobody can explain why a mistake happened or what should happen next.'),
      p('Begin with the school shortlist. Record the subjects, answer format, official familiarisation, test-registration requirements and relevant school-entry year. For an exam taken in autumn 2027, the intended entry will commonly be September 2028, but check each school’s calendar.'),
      h('Start with a small baseline'),
      p('Try a manageable selection of questions from the required subjects, without making the first session a high-pressure mock. Ask your child how they reached a few answers. Write down specific observations: “can find a fraction of an amount, but misses the remaining amount” is more useful than “weak at fractions”.'),
      p('Check the [Maths topic guide](/blog/what-topics-are-in-11-plus-maths) and [English topic guide](/blog/what-topics-are-in-11-plus-english) to choose a starting point. Only include [verbal](/subjects/verbal-reasoning) or [non-verbal reasoning](/subjects/non-verbal-reasoning) when relevant to the target assessment.'),
      h('An example week you can adapt'),
      table(['Session', 'Purpose', 'What you might do'], [
        ['First', 'Teach one maths gap.', 'Explain a worked example, then solve two fresh questions together and independently.'],
        ['Second', 'Read and discuss.', 'Read a short passage, retrieve a fact and explain an inference with evidence.'],
        ['Third', 'Revisit and vary.', 'Return to the maths method in a different context; review a few words from reading.'],
        ['Fourth', 'Combine known skills.', 'Try a short mixed set and select one useful correction for the next week.'],
      ]),
      p('This is an illustrative structure, not a required workload. Shorten, move or omit sessions around school homework, clubs, tiredness and family commitments. Reading for enjoyment does not need to become another marked test. Agree a stopping point before starting so the work does not expand whenever an answer is wrong.'),
      h('What to do during a teaching session'),
      ol(
        'Name the small goal: “Today we are finding the amount left after a fraction is used.”',
        'Show a worked example and explain the decision at each step.',
        'Let your child try a different example, with help if needed.',
        'Ask them to explain the method without simply repeating your words.',
        'Finish with one independent attempt and record the next useful step.'
      ),
      p('If your explanation is not helping, change the representation. Draw equal groups for ratio, use a number line for a subtraction, or point to the exact sentence that supports a comprehension answer. Repeating the same instruction more loudly is not an additional explanation.'),
      h('Keep a useful mistake record'),
      table(['Question or skill', 'What went wrong?', 'What will we try next?'], [
        ['Fraction remainder', 'Calculated the part used but stopped too early.', 'Underline what is asked and subtract the used part from the whole.'],
        ['Inference', 'Gave a possible story without textual support.', 'Pair the answer with the clue that makes it reasonable.'],
        ['Timed calculation', 'Rushed a method that is accurate without a clock.', 'Try a smaller timed set and check the working before increasing pace.'],
      ]),
      p('Ask “Which step would you change?” instead of making the child copy the complete answer repeatedly. Later, use a new question to check whether the correction transfers. Our [using-evidence lesson](/subjects/english/using-evidence) and [fresh maths practice](/quiz?paper=maths-generated&mode=practice) provide focused starting points.'),
      h('When to introduce papers and mocks'),
      p('Use the [paper library](/papers) to combine skills after the relevant methods are becoming familiar. Match conditions to official instructions, including answer sheets and section boundaries. A [mock session](/mock-exams) should have a review afterwards; it is not simply another score to collect.'),
      p('Keep repeated-paper scores separate from first attempts. Familiar answers can produce a higher mark without showing improvement on new material. If the same difficulty persists, ask a teacher or consider focused [tutor support](/blog/do-we-need-an-11-plus-tutor).'),
      h('Your first-session checklist'),
      ul('One current official test-information page.', 'One small learning goal.', 'A suitable example with an explained answer.', 'A clear stopping point.', 'A note of what to revisit, rather than a judgement about ability.'),
      h('Sources and review'),
      p('Updated 2 November 2026 using [GL’s familiarisation guidance](https://11plus.gl-assessment.co.uk/pages/free-materials), [EEF literacy guidance](https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/literacy-ks2) and [EEF mathematics guidance](https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/maths-ks-2-3). The timetable and review records are original examples for adaptation, not a prescribed preparation dose or promise of admission.')
    ],
    { category: 'Preparation' }
  ),

  'how-early-should-we-start-11-plus-preparation': repair(
    'When should 11 Plus preparation start? A readiness guide',
    'Decide when to introduce 11 Plus practice using your child’s skills, the actual test date and a phased plan, with practical advice for late starts.',
    [
      p('There is no universal starting age or minimum number of tutoring months that guarantees a good 11 Plus result. Begin by checking the actual test date and the skills your child already has. Broad reading and number confidence can develop well before formal exam practice needs to begin.'),
      p('Separate learning preparation from admissions planning. You can research schools and note registration deadlines without asking a younger child to sit full timed papers. The companion [grammar-school entry planning guide](/blog/how-early-should-we-start-preparing-for-grammar-school-entry) covers that administrative side.'),
      h('Use stages rather than an inflexible countdown'),
      table(['Stage', 'Learning priority', 'A reason to move on'], [
        ['Earlier primary years', 'Enjoy reading, discuss ideas, develop number facts and solve ordinary problems.', 'Your child can engage confidently with the underlying skills.'],
        ['Building foundations', 'Find specific gaps in reading, calculation or vocabulary and teach them steadily.', 'The method can be used on a new example without constant help.'],
        ['Learning the test format', 'Introduce the relevant question types and answer instructions.', 'Your child understands what each task is asking.'],
        ['Combining skills', 'Use mixed work and occasional appropriately timed sections.', 'Review shows which habits need attention, rather than only unfamiliar content.'],
        ['Approaching the test', 'Consolidate, practise logistics and protect ordinary routines.', 'The next session serves a clear purpose; additional volume is not the goal.'],
      ]),
      p('The stages may overlap. A child can enjoy challenging reading while still needing help with a particular calculation. Moving to harder papers does not repair an insecure prerequisite, and doing a full mock every week is not a compulsory milestone.'),
      h('What to look at in Years 4 and 5'),
      p('In Year 4, ask whether reading feels manageable, whether your child can explain everyday calculations and whether a short learning task ends reasonably calmly. Address school learning needs with the teacher instead of treating every difficulty as an entrance-exam problem.'),
      p('During Year 5, families with an early-Year-6 test need to check the calendar carefully: the assessment may arrive before much Year 6 teaching has taken place. Compare a small sample of the required work with what your child currently understands. Then use the [home preparation plan](/blog/how-to-prepare-for-the-11-plus-at-home) to choose a few priorities.'),
      h('If you are starting later'),
      ol(
        'Confirm the relevant subjects and format before buying resources.',
        'Choose a short baseline to identify gaps that affect several topics.',
        'Prioritise a small number of useful skills rather than completing every book.',
        'Introduce the answer sheet or online familiarisation promptly so the interface is not a surprise.',
        'Keep school choices realistic and avoid promising that a compressed timetable guarantees a place.'
      ),
      p('For example, if both ratio and fractions are difficult because division is insecure, work on division and equal grouping before switching between two advanced workbooks. If the child can solve questions but loses time decoding the instructions, targeted familiarisation may be a better use of the next session.'),
      h('How much is enough?'),
      p('Judge the routine by what your child is learning and how it fits their life. Ask whether a previously difficult question is now explainable, whether that explanation works a few days later, and whether the child is still sleeping, playing and enjoying normal activities. Our [study-time guide](/blog/how-many-hours-a-week-should-my-child-study-for-11-plus) helps you build an adaptable workload.'),
      p('One child may need specific support over a longer period; another may need a short introduction to an unfamiliar format. Neither pattern establishes a universal ideal age. If work is repeatedly distressing, step back and discuss the difficulty rather than adding more papers.'),
      h('Check the year before planning backwards'),
      p('A guide saying “2027 entry” may refer to tests taken in 2026. This site’s preparation programme targets exams taken in 2027; an autumn 2027 grammar-school test commonly leads to September 2028 entry. Independent schools can work to different schedules. Record both dates and use the school’s current instructions.'),
      p('Choose a concrete first step from the [Maths](/subjects/maths) or [English](/subjects/english) hub. Keep official familiarisation available to consult, and use full papers when they answer a useful question about current learning or exam technique.'),
      h('Sources and review'),
      p('Updated 2 November 2026 using [GL’s parent guidance](https://11plus.gl-assessment.co.uk/), the [English curriculum](https://www.gov.uk/government/publications/national-curriculum-in-england-english-programmes-of-study/national-curriculum-in-england-english-programmes-of-study) and [mathematics curriculum](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study). The stages are editorial planning suggestions, not an official timetable or evidence of a guaranteed optimal starting age.')
    ],
    { category: 'Preparation' }
  ),

  'best-11-plus-practice-papers-and-past-papers': repair(
    '11 Plus practice papers: how to choose reliable resources',
    'Find official 11 Plus familiarisation and past-paper sources, distinguish them from original practice, and choose materials that fit your child’s test.',
    [
      p('The best 11 Plus paper for your child is one that fits the intended assessment and teaches you something useful about the next step. Start with the school or admissions authority’s official guidance. A resource labelled “11+” or “GL-style” is not automatically an authentic past exam or a close match for your school.'),
      h('Four different resources are often called “papers”'),
      table(['Resource', 'What it is', 'What it can tell you'], [
        ['Official past paper', 'A paper identified by the issuing school or consortium as used for an earlier cohort.', 'Examples of historical tasks; the current test may still have changed.'],
        ['Official sample or familiarisation', 'Material issued to introduce an assessment’s question styles, interface or instructions.', 'How to approach the format; it may not reproduce the length or difficulty of the live test.'],
        ['Provider or commercial practice', 'New practice written by a provider or publisher.', 'Further rehearsal, subject to its stated scope; it is not automatically a past sitting.'],
        ['Original topic practice', 'Questions designed to teach or revisit a specific skill.', 'Which method needs attention; a short worksheet is not a full admission prediction.'],
      ]),
      h('Verified places to begin'),
      table(['Source', 'What to look for', 'Important distinction'], [
        ['[GL Assessment](https://11plus.gl-assessment.co.uk/pages/free-materials)', 'Free familiarisation downloads and separately offered practice papers.', 'Check your local instructions; GL explicitly notes that timings and question counts can differ.'],
        ['[CSSE practice material](https://csse.org.uk/practice-material/)', 'Officially labelled English, continuous-writing and maths material, including historical papers and mark schemes.', 'The page currently labels the listed papers by their entry year. A 2023-entry paper is not a 2027 test.'],
        ['[ISEB Pre-Tests information](https://www.iseb.co.uk/assessments/common-pre-tests/for-families/)', 'The provider’s family guidance and familiarisation route.', 'The online Common Pre-Tests are a different assessment from Common Entrance papers.'],
        ['Your target school or consortium', 'Current admissions guidance, specimens and any subject instructions.', 'Use the source for that exact route, rather than assuming another school’s materials apply.'],
      ]),
      p('The sources above were checked on 2 November 2026. They are starting points, not a paid league table. For exams taken in 2027, verify the school-entry cycle separately: many autumn tests relate to entry the following September.'),
      h('Check these details before downloading or buying'),
      ul(
        'Does the resource identify its author, publisher or issuing organisation?',
        'Is it an actual past paper, an official sample or newly written practice?',
        'Do the subjects and answer format match the current requirements?',
        'Are answers or marking guidance supplied, especially for written English?',
        'Is the age range or difficulty appropriate for the child’s current learning?',
        'Can you explain why this resource adds something your existing materials do not?'
      ),
      p('Be cautious with claims that a paper guarantees a place, predicts a standardised score or is “official” without naming the issuing body. A school logo on a third-party page is not proof of endorsement. When in doubt, follow the school’s own link to the material.'),
      h('How to use a paper without wasting it'),
      ol(
        'Read the instructions first and decide whether the purpose is learning, familiarisation or a timed rehearsal.',
        'Keep a record of whether this is a first attempt or a repeat.',
        'Mark using the relevant answer key or scheme; do not invent marks for an official paper.',
        'Sort mistakes into missing knowledge, misunderstood wording, method, calculation or pacing.',
        'Teach one or two useful corrections, then check them on fresh questions.'
      ),
      p('For written comprehension, compare the meaning of the response with the marking guidance rather than demanding one memorised sentence. For maths, inspect the method as well as the answer. A correct guess and a clear explanation do not show the same understanding.'),
      h('Use our resources for the job they are designed to do'),
      p('Our [paper library](/papers) and [mock sessions](/mock-exams) contain original practice. They are not official school past papers and are not endorsed by an exam provider. For targeted learning, choose [Maths](/subjects/maths), [English](/subjects/english), [verbal reasoning](/subjects/verbal-reasoning) or [visual reasoning](/subjects/non-verbal-reasoning).'),
      p('If your child cannot yet explain a method, a focused lesson is usually a clearer next step than another mixed paper. If methods are secure but the answer format is unfamiliar, official familiarisation is the priority. The [home preparation guide](/blog/how-to-prepare-for-the-11-plus-at-home) shows how to combine both.'),
      h('Sources and review'),
      p('Updated 2 November 2026. Official source links are provided in the table so families can inspect current labels and instructions. No copyrighted paper has been reproduced here, and no unsupported provider-to-region list, paper price or success-rate comparison is used.')
    ],
    { category: 'Preparation' }
  ),

  'do-we-need-an-11-plus-tutor': repair(
    'Do we need an 11 Plus tutor? A practical decision guide',
    'Decide whether tutoring would solve a specific 11 Plus problem, compare support options and use a clear checklist for a trial lesson and budget.',
    [
      p('A tutor is one way to organise and explain 11 Plus preparation. Hiring one is not, by itself, evidence that a child will do better, and paid tuition is not a universal requirement. Start by identifying a specific problem you want help with. Then decide which form of support fits it.'),
      p('For example, “We need feedback on written comprehension because we cannot judge the explanation” is a useful brief. “Everyone else has a tutor” does not tell a tutor what to teach or give you a way to judge whether the sessions help.'),
      h('Match the support to the problem'),
      table(['What you need', 'A possible first step', 'When a tutor may add value'], [
        ['A clear preparation plan', 'Use the official test information and a short skills review.', 'The tutor can prioritise genuine gaps and explain why.'],
        ['One difficult maths method', 'Try a worked lesson and a different representation.', 'The same misunderstanding persists and needs a different explanation.'],
        ['Feedback on written English', 'Read the question, response and marking guidance together.', 'You need specific comments on evidence, reasoning or composition.'],
        ['A routine that stays calm', 'Agree shorter sessions and predictable stopping points.', 'A different teaching relationship helps, without simply adding more hours.'],
        ['Support needs affecting schoolwork', 'Speak with the class teacher or SENCO.', 'Appropriate teaching is agreed around the child’s needs; tutoring does not replace specialist or school support.'],
      ]),
      h('Try a manageable home routine first if it suits your family'),
      p('Use the [home preparation guide](/blog/how-to-prepare-for-the-11-plus-at-home) to teach one small skill, review it and try a fresh example. You do not need to be able to answer every difficult question instantly. You do need reliable explanations, time to discuss mistakes and a willingness to seek help when something is unclear.'),
      p('A useful test is whether your child can explain a method more independently after support. A rising score on the same repeated paper is less informative. Keep the original attempt and a later fresh question so you can see what has changed.'),
      h('Questions to ask before a trial lesson'),
      ul(
        'Which current test route and subjects will the teaching cover?',
        'How will you identify my child’s gaps before choosing work?',
        'Can you show an anonymised example of the feedback you provide?',
        'How will I know what was taught and what needs revisiting?',
        'What homework is expected, and how does it fit alongside schoolwork?',
        'What are the safeguarding arrangements, communication boundaries and relevant checks?',
        'What are the total fees, cancellation terms and any extra material or mock costs?'
      ),
      p('Check claimed qualifications and experience rather than assuming that a professional-looking website establishes them. A responsible discussion should distinguish practice progress from a guaranteed admission outcome. There is no need for a tutor to claim privileged access to future questions.'),
      h('Use the trial lesson to assess teaching'),
      p('Watch for an explanation your child can understand, an opportunity to think independently and feedback that addresses the actual error. Afterwards, ask the child to describe one thing they learned. Ask the tutor for the next specific goal and why it was selected.'),
      p('Agree a review point rather than allowing a package to continue without a purpose. Progress might mean using a fraction method on a new problem, selecting stronger evidence in comprehension, or completing a session with less prompting. These are concrete observations; none is a promise of a place.'),
      h('Budget for the whole commitment'),
      question('Illustrative budget: 10 lessons at £35 each, plus £20 of agreed materials. What is the planned total?', '£370.', '10 × £35 = £350; £350 + £20 = £370. These are fictional figures to demonstrate budgeting, not current market prices or a recommended fee.'),
      p('Request the actual full cost in writing, including any assessment, registration, travel or cancellation charges. A short period of focused help, a group class or free learning resources may meet the need; compare what is included rather than only the hourly rate.'),
      h('Choose the next step'),
      p('If you know the skill to work on, start with our [Maths](/subjects/maths) or [English](/subjects/english) resources. If your main uncertainty is the grammar-school route, read [tutoring and grammar-school entrance](/blog/is-a-tutor-necessary-for-grammar-school-entrance). For a test taken in 2027, confirm the relevant entry year with any provider before accepting a programme description.'),
      h('Sources and review'),
      p('Updated 2 November 2026 with [GL’s parent information](https://11plus.gl-assessment.co.uk/) and the [London 11+ Consortium’s own preparation advice](https://london11plus.co.uk/). The Consortium’s advice applies to its route, not every school. The decision table and trial-lesson checklist are editorial suggestions; no unsupported success-rate comparison or clinical tutoring requirement is claimed.')
    ],
    { category: 'Preparation' }
  ),

  '11-plus-time-management-strategies-in-the-exam': repair(
    '11 Plus time management: pacing, checking and section rules',
    'Build a sensible 11 Plus pacing plan, protect answer accuracy and review unfinished questions without assuming every test lets children skip and return.',
    [
      p('Good 11 Plus time management means using the available time deliberately while following the test’s instructions. It does not mean rushing every question or applying one seconds-per-question rule to every paper. Reading, calculation, written explanation and visual puzzles can require different amounts of work.'),
      p('Start with the actual familiarisation and candidate instructions. Find out whether sections are timed separately, whether children may return to earlier questions, how answers are recorded and whether any review time is included. Those details decide which strategies are available.'),
      h('Build a pacing plan from the real format'),
      p('For an open section where returning is allowed, your child can learn to recognise when a question needs more thought and move on sensibly. If the system does not allow returning, or the invigilator has closed a section, that strategy does not apply. Never practise crossing a boundary the real assessment forbids.'),
      question('Illustrative example: a practice section allows 30 minutes for 24 questions. You reserve 3 minutes to check. What is the average working time per question?', '67.5 seconds, or 1 minute 7.5 seconds.', '27 minutes remain for working. 27 × 60 = 1,620 seconds; 1,620 ÷ 24 = 67.5. This is a planning average for this invented section, not a deadline for each question or an official 11 Plus timing.'),
      p('Some questions will take less time and some more. A reading passage also needs time before its questions can be answered. Use practice to find sensible checkpoints, and change the plan if it repeatedly causes rushed errors. Do not manufacture a checking allowance by stopping before the permitted working time has been used productively.'),
      h('Practise accuracy before increasing pace'),
      ol(
        'Try a short relevant set without timing and identify any insecure method.',
        'Teach that method and check it on fresh questions.',
        'Use a manageable timed section with the correct answer format.',
        'Review where time was spent, not just how many questions were unfinished.',
        'Repeat with comparable new work and adjust one habit at a time.'
      ),
      p('The [mental maths guide](/blog/how-to-improve-11-plus-mental-maths) can help with efficient calculations. For English, use [retrieval](/subjects/english/comprehension-retrieval) and [evidence practice](/subjects/english/using-evidence) to make answers precise rather than unnecessarily long.'),
      h('Protect marks you already know how to earn'),
      ul(
        'Read the question’s final instruction and the required units.',
        'On a separate answer sheet, keep the question number and answer row aligned.',
        'When skipping is allowed, keep a clear record so a blank does not shift later answers.',
        'Check that a changed answer is recorded unambiguously.',
        'If guessing is relevant, follow the actual marking instructions; do not assume a rule about penalties.',
        'Stop or move sections when instructed, even if a previous answer feels unfinished.'
      ),
      h('Review the unfinished questions differently'),
      table(['What happened?', 'Likely next practice task'], [
        ['Could not solve it even after the clock stopped.', 'Teach the missing concept; this is not only a speed problem.'],
        ['Solved it quickly once the instruction was understood.', 'Practise reading and recognising that task type.'],
        ['Spent too long polishing a correct response.', 'Use the marks and command word to decide the necessary detail.'],
        ['Missed easy questions after getting stuck.', 'Practise a permitted move-on decision and a later review.'],
        ['Many slips appeared only near the end.', 'Examine pacing, fatigue and whether the session was appropriately demanding.'],
      ]),
      p('Ask the child to identify one useful change for the next attempt. “Check the unit before choosing” is practical. “Be quicker” gives little guidance about what to do. Avoid comparing speed across unrelated papers or treating a repeated test as a fresh measure.'),
      h('Make the final rehearsal familiar'),
      p('Use the expected materials or official online familiarisation, the permitted timing and a calm environment. Practise the routine for asking an invigilator about a procedural problem; they cannot explain answers, but your child should know how to seek help with instructions or equipment. Keep normal rest and family routines around preparation.'),
      p('Choose [original mock practice](/mock-exams) when it serves a clear rehearsal purpose. Our papers are learning resources, so use the official guidance for the exact conditions of the target test.'),
      h('Sources and review'),
      p('Updated 2 November 2026 using [GL’s familiarisation guidance](https://11plus.gl-assessment.co.uk/pages/free-materials) and [ISEB’s family information](https://www.iseb.co.uk/assessments/common-pre-tests/for-families/). The timing example was independently calculated. For exams taken in 2027, verify the correct admissions cycle and never assume a national time limit or universal navigation rule.')
    ],
    { category: 'Preparation' }
  ),

  '11-plus-exam-stress-and-anxiety-how-to-help-my-child': repair(
    '11 Plus exam stress: practical ways to support your child',
    'Help your child talk about 11 Plus worries, reduce pressure around practice and recognise when school or professional support would be useful.',
    [
      p('If 11 Plus preparation is becoming upsetting, begin with your child’s experience rather than the latest score. Ask what feels difficult: understanding the work, the timer, comparison with friends, or fear of disappointing you. The answer should shape what happens next.'),
      p('An entrance result does not measure a child’s worth or decide whether they can have a good secondary-school experience. Say that explicitly, especially if family conversations have become dominated by one school or a target mark.'),
      h('Start a conversation without turning it into another assessment'),
      table(['Instead of', 'Try saying'], [
        ['You know this; why are you getting upset?', 'Show me the point where it started to feel difficult.'],
        ['Everyone else is doing more.', 'Let us work out what would help you, rather than compare.'],
        ['You must get into this school.', 'We are exploring schools where you can learn and feel supported.'],
        ['Just calm down and finish.', 'We can pause. Would talking, a break or some help with the first step be useful?'],
        ['You have wasted the whole session.', 'What have we learned about the support you need next time?'],
      ]),
      p('These are example phrases, not a script to force through. Listen before offering a solution. A child who is afraid of the exam room needs a different conversation from one who cannot yet divide fractions.'),
      h('Notice changes in ordinary life'),
      p('The [NHS exam-stress guide](https://www.nhs.uk/mental-health/children-and-young-adults/advice-for-parents/help-your-child-beat-exam-stress/) describes signs such as persistent worry, sleep changes, irritability, headaches or stomach aches. Notice patterns, but do not assume every symptom is caused by exam stress. Seek appropriate health advice if symptoms concern you.'),
      p('Look beyond whether your child agrees to complete a paper. Are they avoiding enjoyable activities, becoming unusually distressed before practice or repeatedly saying they will let everyone down? A score alone cannot answer whether the preparation routine is manageable.'),
      h('Agree a smaller, clearer preparation routine'),
      ul(
        'Choose one achievable learning goal for the next session.',
        'Agree the stopping point in advance, including what happens if a question is unfinished.',
        'Keep feedback specific: discuss the method or sentence rather than labelling the child.',
        'Include time away from preparation and protect normal meals, rest, play and contact with friends.',
        'Avoid displaying rankings or comparing results with siblings and classmates.',
        'Review the routine together if it repeatedly causes conflict.'
      ),
      p('A practical agreement might be: “We will work on two inference questions, discuss the clues and stop after that. If one is confusing, it becomes a question for the next lesson.” This is an example, not a treatment plan or a prescribed workload.'),
      h('Reduce uncertainty where you can'),
      p('Read the official candidate information together in manageable pieces. Confirm where the test is, what to bring, how the child can ask for procedural help and what will happen afterwards. Familiarisation can clarify the format without turning every evening into a mock exam.'),
      p('If your child needs learning support or access arrangements, speak with the school and admissions authority early. Do not assume an informal home adjustment will be available in the real test. Our [access-arrangements guide](/blog/can-my-child-get-extra-time-in-the-11-plus-sen) explains questions to raise.'),
      h('After a difficult session or the exam'),
      p('Give your child room to talk, or to take a break from talking. Ask what helped and what would make the next experience more manageable. Avoid a detailed interrogation about every possible error immediately afterwards. Keep plans for suitable alternative schools visible so the family is not treating one outcome as the only acceptable future.'),
      p('Our [home preparation guide](/blog/how-to-prepare-for-the-11-plus-at-home) can help make sessions more purposeful. If a full paper repeatedly overwhelms the child, return to shorter teaching tasks and discuss the problem with someone who knows their learning needs.'),
      h('When to seek more support'),
      p('Talk with the class teacher or school’s pastoral staff if worries are affecting school or preparation. The [NHS advice on anxiety in children](https://www.nhs.uk/mental-health/children-and-young-adults/advice-for-parents/anxiety-in-children/) recommends getting help when anxiety is severe, persistent, worsening or interferes with everyday life. A GP can be a starting point. [YoungMinds’ parent guidance](https://www.youngminds.org.uk/parent/parents-a-z-mental-health-guide/exam-time/) also offers support for conversations with school and family.'),
      h('Sources and review'),
      p('Updated 2 November 2026 using the NHS and YoungMinds sources linked above. This is general educational wellbeing information, not an assessment of an individual child. No invented pass-rate statistics, diagnosis, supplement advice or guaranteed relaxation technique is used.')
    ],
    { category: 'Preparation' }
  ),

  'how-to-improve-11-plus-vocabulary-quickly': repair(
    'How to improve 11 Plus vocabulary: learn words in context',
    'Use a practical word record, examples and a review routine to strengthen 11 Plus vocabulary without relying on a supposed official master list.',
    [
      p('The most useful quick improvement is often to learn a smaller set of unfamiliar words properly, then recognise and use them in new sentences. Reading a long list once is not the same as understanding it. There is no single official vocabulary list that guarantees coverage of every 11 Plus assessment.'),
      p('Choose words from your child’s reading, schoolwork and relevant practice. Focus on words that unlock meaning or recur across different contexts, rather than collecting impressive spellings simply because they look difficult.'),
      h('Make a word record that checks understanding'),
      table(['Part of the record', 'Example: reluctant'], [
        ['Meaning in the passage', 'Unwilling or hesitant to do something.'],
        ['Original sentence', 'Amir was reluctant to enter the dark shed, so he waited at the door.'],
        ['Useful related word', 'Unwilling can fit many contexts; hesitant emphasises uncertainty.'],
        ['A contrasting idea', 'Eager suggests wanting to do something.'],
        ['Check in a new context', 'Would a reluctant volunteer rush forwards enthusiastically? Explain why not.'],
      ]),
      p('A synonym is not always interchangeable in every sentence. “A bright light” and “a bright idea” use different senses of bright. Ask which meaning fits before reaching for the most sophisticated-looking alternative.'),
      h('A manageable routine for learning and review'),
      ol(
        'Read a short piece that interests your child and select a few useful unfamiliar words.',
        'Use the sentence to suggest a meaning, then check a reliable dictionary if needed.',
        'Say the word aloud and create a new sentence that demonstrates the meaning.',
        'Cover the explanation and ask the child to recall it.',
        'Return to the word later, in another sentence or question; keep reviewing words that remain uncertain.'
      ),
      p('For example, revisit a word the following day, several days later and the next week. These intervals illustrate an adaptable routine; they are not a guaranteed optimum. Add fewer new words if yesterday’s meanings are still unclear.'),
      p('The [EEF literacy guidance](https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/literacy-ks2) supports explicit teaching, repeated encounters and opportunities to use vocabulary. The practical aim is to move from recognising a word to explaining and applying it.'),
      h('Try three original context questions'),
      question('“Water was scarce after weeks without rain.” Does scarce mean plentiful, in short supply, noisy or hidden?', 'In short supply.', 'The dry period is a clue, and the meaning of scarce fits it. Hidden water might exist, but the sentence does not say that.'),
      question('“Maya gave a reluctant nod before joining the game.” Which description fits best: eager, unwilling, furious or careless?', 'Unwilling.', 'Reluctant describes hesitation or lack of willingness. It does not establish that Maya is furious, even if that might be possible in another story.'),
      question('“The glass ornament was fragile.” Which word is closest here: breakable, tiny, costly or transparent?', 'Breakable.', 'Fragile concerns how easily something can be damaged. The object may also be small or expensive, but those are different properties.'),
      p('For each answer, ask why another option is less suitable. Then change the setting: scarce tickets, a reluctant agreement, fragile confidence. Discuss whether the meaning stays the same or becomes less literal. Continue with the [vocabulary-in-context guide](/blog/11-plus-vocabulary-in-context).'),
      h('Use word parts as clues, not guarantees'),
      p('Prefixes, suffixes and related words can help. If your child knows “possible”, “impossible” provides a useful contrast; “care”, “careful” and “careless” show how endings change meaning. Still check the whole word and sentence: a familiar-looking fragment does not prove the meaning of an unfamiliar word.'),
      p('Keep the task connected to reading and writing. Ask your child to improve one vague word in a paragraph, then explain why the replacement fits. In comprehension, practise explaining the author’s choice instead of merely naming a dictionary definition.'),
      h('If the exam is close'),
      p('Review words already encountered, practise interpreting unfamiliar words from context and keep reading manageable. Avoid promising that memorising hundreds of new words in a few days will transform a result. If vocabulary is blocking understanding across schoolwork, discuss that broader need with the teacher.'),
      p('Use the [English hub](/subjects/english) for reading practice and [verbal reasoning](/subjects/verbal-reasoning) for word relationships. A short record of words your child can now explain in a fresh sentence is a more useful progress measure than the total number of cards viewed.'),
      h('Sources and review'),
      p('Updated 2 November 2026 using EEF guidance and the [DfE English curriculum](https://www.gov.uk/government/publications/national-curriculum-in-england-english-programmes-of-study/national-curriculum-in-england-english-programmes-of-study). Definitions and original examples were reviewed for context and a clear answer. No fixed word-count requirement, official provider vocabulary quota or rapid score-improvement claim is made.')
    ],
    { subject: 'english', category: 'English' }
  ),

  'how-to-improve-11-plus-mental-maths': repair(
    '11 Plus mental maths: efficient methods and worked practice',
    'Build mental maths fluency with compensation, partitioning, factors and percentage methods, plus original practice questions and explained answers.',
    [
      p('Mental maths improves when your child can choose a method that suits the numbers and explain why it works. Speed matters less than a reliable starting point. Secure number facts and place value support fluency, while written working remains useful whenever holding every step in mind would make errors more likely.'),
      p('There is no universal 11 Plus mental-maths time limit or fixed percentage of marks for this skill. Check the actual test’s instructions, including calculator and working-paper rules, rather than assuming every assessment has a separate mental-arithmetic section.'),
      h('Choose a method that fits the calculation'),
      table(['Method', 'Example', 'Why it helps'], [
        ['Partition', '46 + 27 = 46 + 20 + 7 = 73.', 'Split a number into useful parts while preserving its value.'],
        ['Compensate', '98 + 37 = 100 + 37 − 2 = 135.', 'Work with a nearby round number, then correct the change.'],
        ['Use a known fact', '7 × 8 = 56, so 70 × 8 = 560.', 'Connect multiplication facts to place value.'],
        ['Use factors', '48 ÷ 6 = 48 ÷ 3 ÷ 2 = 8.', 'Divide in stages because 6 = 3 × 2.'],
        ['Use a fraction equivalent', '25% of 84 = one quarter of 84 = 21.', 'Choose a familiar relationship instead of a longer calculation.'],
        ['Estimate to check', '19 × 6 should be near 20 × 6 = 120.', 'A rough expectation helps detect an implausible answer.'],
      ]),
      p('Explain the correction in compensation. If you replace 98 with 100, you added 2 too much, so subtract 2 afterwards. A remembered trick without that explanation is easy to apply in the wrong direction.'),
      h('Check the foundations'),
      ul(
        'Number bonds and how addition relates to subtraction.',
        'Multiplication facts and the matching division facts.',
        'Place value when multiplying or dividing by powers of ten.',
        'Halves, quarters and simple fraction–decimal–percentage connections.',
        'The meaning of the operation in a word problem, not only the symbol.'
      ),
      p('England’s [mathematics curriculum](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study) includes fluency, reasoning and problem solving. Those aims work together: quick calculation is useful when the child is calculating the quantity actually requested.'),
      h('Six original questions to try'),
      question('Calculate 59 + 26.', '85.', 'Add 60 + 26 = 86, then subtract the extra 1. Alternatively, add 20 and then 6 to 59.'),
      question('Calculate 203 − 98.', '105.', 'Subtract 100 to get 103, then add back 2 because 100 was 2 more than 98.'),
      question('Calculate 25 × 16.', '400.', 'Since 25 × 4 = 100 and 16 = 4 × 4, the calculation is 100 × 4 = 400.'),
      question('Calculate 96 ÷ 8.', '12.', 'Use the fact 8 × 12 = 96. Or halve three times: 96 → 48 → 24 → 12, because dividing by 8 is dividing by 2 × 2 × 2.'),
      question('Find 15% of 80.', '12.', '10% is 8 and 5% is half of 8, which is 4. Add 8 + 4 = 12.'),
      question('A £20 note pays for three notebooks costing £2.75 each. What change is due?', '£11.75.', 'Three notebooks cost £8.25: three lots of £2 is £6 and three lots of 75p is £2.25. Subtract £8.25 from £20. Counting up £1.75 to £10 and £10 to £20 also gives £11.75.'),
      p('The final problem benefits from recording an intermediate total if needed. “Mental maths” should not become a rule that forbids sensible working. What matters is choosing and checking an efficient method.'),
      h('Practise a method, then vary the task'),
      p('Begin with a few calculations that use the same idea. Ask which numbers made the method convenient. Later, mix those questions with calculations requiring a different approach, so the child chooses rather than follows a heading. Try [fresh arithmetic practice](/quiz?paper=maths-generated&topic=arithmetic&mode=practice) and [percentages of amounts](/subjects/maths/percentages-of-amounts).'),
      p('Record recurring errors precisely: “subtracts instead of adding back after subtracting too much” suggests a different lesson from “does not know the division fact”. [EEF mathematics guidance](https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/maths-ks-2-3) recommends using assessment to inform teaching and addressing the underlying misconception.'),
      h('Add timing without turning every attempt into a race'),
      p('Once the method is secure, use a short timed set and inspect the errors afterwards. Compare fresh questions of similar difficulty, not unrelated papers or memorised repeats. If the clock produces a sharp drop in accuracy, reduce the demand and practise the decision that is slowing the child down.'),
      p('Use the [maths checklist](/blog/what-topics-are-in-11-plus-maths) to connect calculation to broader topics, and the [time-management guide](/blog/11-plus-time-management-strategies-in-the-exam) for whole-section planning. There is no reason to invent an “elite” seconds-per-question target for every child.'),
      h('Sources and review'),
      p('Updated 2 November 2026 using the DfE and EEF sources above. All calculations in the table and questions were independently checked. These are original teaching examples, not official school questions; no unsupported claim about a percentage speed gain or admission outcome is made.')
    ],
    { subject: 'maths', category: 'Maths' }
  ),
};

