type TopicLink = { label: string; href: string };
type SubjectHubContent = {
  introduction: string;
  practiceHref: string;
  practiceLabel: string;
  printableHref: string;
  guideHref: string;
  guideLabel: string;
  topicIntroduction: string;
  topics: TopicLink[];
  faqs: { q: string; a: string }[];
};

/** Existing public destinations only. Quiz sessions remain outside the search index. */
export const SUBJECT_HUB_CONTENT: Record<string, SubjectHubContent> = {
  maths: {
    introduction: 'Build a method, try a question, then understand the answer. Choose a maths topic, print a foundations booklet or start a focused online set.',
    practiceHref: '/quiz?paper=maths-generated&mode=practice',
    practiceLabel: 'Start maths practice',
    printableHref: '/papers#maths-printable',
    guideHref: '/blog/what-topics-are-in-11-plus-maths',
    guideLabel: 'Explore the maths preparation guide',
    topicIntroduction: 'Each link opens a relevant lesson or worked guide. Start with one skill; use the practice links in that guide when you are ready.',
    topics: [
      { label: 'Rounding & estimation', href: '/blog/11-plus-rounding-estimation' },
      { label: 'Decimal arithmetic', href: '/blog/11-plus-decimal-arithmetic' },
      { label: 'Long multiplication', href: '/blog/11-plus-long-multiplication' },
      { label: 'Fractions, decimals & percentages', href: '/blog/11-plus-fractions-decimals-percentages-conversions' },
      { label: 'Ratio & sharing', href: '/subjects/maths/ratio-sharing' },
      { label: 'Algebra & equations', href: '/blog/11-plus-algebra-basics' },
      { label: 'Area & perimeter', href: '/blog/11-plus-area-perimeter' },
      { label: 'Measurement & unit conversions', href: '/blog/11-plus-unit-conversions' },
      { label: 'Data handling', href: '/blog/11-plus-data-interpretation' },
      { label: 'Multi-step word problems', href: '/blog/11-plus-multi-step-word-problems' },
    ],
    faqs: [
      { q: 'What maths topics should we practise for the 11+?', a: 'Start with the topics in your school or admissions authority’s current guidance. Our resources cover selected number, fractions, percentages, ratio, algebra, geometry, measurement and data skills. The topic guides explain methods and include worked answers; they are not a guarantee of a complete local syllabus.' },
      { q: 'Where should my child start?', a: 'Try a familiar topic untimed and ask your child to show the method. Review mistakes before choosing another set. The maths foundations PDF covers order of operations, factors and multiples, negative numbers and percentage change; the online 16-question set samples eight skills.' },
      { q: 'How many questions are in a maths practice session?', a: 'Our generated mixed set has 16 questions, a focused topic set has 10, and the maths pilot has 30. Their optional timers are our practice settings. The real test’s question count, subjects and timings depend on the admissions authority; check its current instructions.' },
      { q: 'Can I print questions and worked answers?', a: 'Yes. The free maths foundations booklet contains 20 original questions, with a separate worked-answer PDF. You can also read the topic guides on screen and use the explained answers to decide what to practise next.' },
    ],
  },
  english: {
    introduction: 'Read closely, explain your thinking and check the evidence. Start with an original comprehension passage, then explore vocabulary, grammar, punctuation and writing.',
    practiceHref: '/subjects/english/comprehension-retrieval#practice',
    practiceLabel: 'Start comprehension practice',
    printableHref: '/papers#english-printable',
    guideHref: '/blog/what-topics-are-in-11-plus-english',
    guideLabel: 'Explore the English preparation guide',
    topicIntroduction: 'Choose the skill you want to work on. Written comprehension lessons include model answers for self-review; the writing guide explains planning and reviewing your own work.',
    topics: [
      { label: 'Reading comprehension: retrieval', href: '/subjects/english/comprehension-retrieval' },
      { label: 'Synonyms & antonyms', href: '/blog/11-plus-synonyms-antonyms' },
      { label: 'Sentence structure', href: '/blog/11-plus-sentence-structure' },
      { label: 'Word building & spelling', href: '/blog/11-plus-prefixes-suffixes' },
      { label: 'Vocabulary in context', href: '/blog/11-plus-vocabulary-in-context' },
      { label: 'Poetry comprehension', href: '/blog/11-plus-poetry-comprehension' },
      { label: 'Direct speech punctuation', href: '/blog/11-plus-direct-speech-punctuation' },
      { label: 'Creative writing', href: '/blog/what-is-covered-in-11-plus-creative-writing' },
      { label: 'Supporting answers with evidence', href: '/subjects/english/using-evidence' },
      { label: 'Inference', href: '/subjects/english/comprehension-inference' },
    ],
    faqs: [
      { q: 'What English skills does the 11+ test?', a: 'English assessments can include comprehension, vocabulary, grammar, punctuation, spelling or writing. The combination and answer format depend on the school or provider. Check the guidance for the entry cycle you need before choosing a full practice paper.' },
      { q: 'Are the written answers marked automatically?', a: 'The three comprehension lessons use self-review. Write your answer first, then compare it with the model and explanation. Look for the required meaning and relevant evidence rather than trying to copy the model word for word.' },
      { q: 'Can I download an English practice paper?', a: 'Yes. Our free English punctuation booklet has 16 original questions on apostrophes and direct speech, plus a separate answer booklet. It is a focused skills resource; it does not assess every English skill or reproduce a school’s paper.' },
      { q: 'Does every 11+ include creative writing?', a: 'No single English format applies to every school. Check whether your child’s assessment includes a written task, and whether it asks for a story, description, continuation or another form. Our creative-writing guide helps with planning, a controlled viewpoint and reviewing a finished response.' },
    ],
  },
  'verbal-reasoning': {
    introduction: 'Make sense of the rule before racing the clock. Try original letter codes, word analogies, classifications and constant-step sequences, with explained answers.',
    practiceHref: '/quiz?paper=verbal-reviewed&mode=practice',
    practiceLabel: 'Start verbal reasoning',
    printableHref: '/papers#verbal-printable',
    guideHref: '/blog/what-is-11-plus-verbal-reasoning',
    guideLabel: 'Read the verbal reasoning guide',
    topicIntroduction: 'These four starter skills have focused practice sets. Read a worked example below, or choose a skill to try questions with feedback.',
    topics: [
      { label: 'Letter codes', href: '/quiz?paper=verbal-reviewed&topic=codes&mode=practice' },
      { label: 'Word analogies', href: '/quiz?paper=verbal-reviewed&topic=analogies&mode=practice' },
      { label: 'Word classifications', href: '/quiz?paper=verbal-reviewed&topic=classifications&mode=practice' },
      { label: 'Letter & number sequences', href: '/quiz?paper=verbal-reviewed&topic=sequences&mode=practice' },
    ],
    faqs: [
      { q: 'What is verbal reasoning?', a: 'Verbal reasoning asks children to work out relationships and rules involving words, letters or numbers. Depending on the test, it can involve codes, word relationships, sequences and deduction. Our starter practice covers four selected skills rather than every possible question type.' },
      { q: 'What is included in the free practice?', a: 'A mixed online set has 12 questions: three each on letter codes, analogies, classifications and constant-step sequences. A focused set has 10 questions. Practice mode gives an explanation after each answer; the separate printable starter has 12 fixed questions and worked answers.' },
      { q: 'Should we start with timed practice?', a: 'Begin untimed so your child can explain the rule and check it against the example. When that method is clear, a timed attempt can help practise pacing. The optional 15-minute timer here is our practice setting, not a statement of your school’s test timing.' },
      { q: 'Do all 11+ tests include the same verbal reasoning questions?', a: 'No. Subjects, question formats and timings vary. Check the current school or admissions authority guidance and any official familiarisation it supplies. Our original questions use four options and should not be treated as a replica of an official paper.' },
    ],
  },
  'non-verbal-reasoning': {
    introduction: 'Follow the shape, spot the change and check the whole figure. Learn rotations, reflections, shape sequences and matrices with original diagrams and worked visual answers.',
    practiceHref: '/quiz?paper=visual-reviewed&mode=practice',
    practiceLabel: 'Start picture practice',
    printableHref: '/papers#nonverbal-printable',
    guideHref: '/blog/what-is-11-plus-non-verbal-reasoning',
    guideLabel: 'Read the non-verbal reasoning guide',
    topicIntroduction: 'Start with one visual skill. These activities use marked shapes and turning rules; the worked diagrams show what changes and what stays fixed.',
    topics: [
      { label: 'Rotations', href: '/quiz?paper=visual-reviewed&topic=rotations&mode=practice' },
      { label: 'Reflections', href: '/quiz?paper=visual-reviewed&topic=reflections&mode=practice' },
      { label: 'Shape sequences', href: '/quiz?paper=visual-reviewed&topic=sequences&mode=practice' },
      { label: 'Matrices', href: '/quiz?paper=visual-reviewed&topic=matrices&mode=practice' },
    ],
    faqs: [
      { q: 'What is non-verbal reasoning?', a: 'Non-verbal reasoning uses visual patterns and relationships. A question may ask you to compare figures, continue a sequence or complete a grid. Read the instructions as well as the diagram: the relevant feature could be position, orientation, shape, shading or another relationship.' },
      { q: 'Which skills are available here?', a: 'Our original starter pool covers rotations, reflections, constant-turn sequences and transformation matrices. An online set has eight questions; a mixed set includes two from each skill. It does not yet cover every NVR type, such as folding, cube nets or all shading rules.' },
      { q: 'Can I print the diagrams and answers?', a: 'Yes. Download the eight-question NVR starter and its separate worked-answer booklet from the papers library. The original diagrams are included in both, with the completed transformation or grid in the answers. Online sessions also offer print controls.' },
      { q: 'How should we review a wrong answer?', a: 'Identify one feature, such as the marked dot, and follow the required transformation. Then check the complete outline. For a sequence, test every step; for a matrix, check both the row and column. Use the worked diagram before retrying the question.' },
    ],
  },
};
