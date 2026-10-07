import type { Lesson } from './lessons';

const curriculum = {
  label: 'Department for Education: English programmes of study (reading skills, not an 11+ specification)',
  url: 'https://www.gov.uk/government/publications/national-curriculum-in-england-english-programmes-of-study/national-curriculum-in-england-english-programmes-of-study',
};

export const englishLessons: Lesson[] = [
  {
    slug: 'comprehension-retrieval',
    title: '11+ Retrieval Questions: Find Facts and Check Your Answers',
    description: 'Practise finding information in a passage with three worked examples, six original retrieval questions and explanations of every answer.',
    subject: 'english', status: 'draft', reviewedAt: '2026-10-07',
    introduction: [
      'Retrieval means finding information that a text actually gives you. If a notice says that a workshop begins at ten, you can retrieve its starting time. You do not need to guess why the organiser chose ten.',
      'This lesson practises precise fact-finding, including exceptions, two-part answers and instructions to use your own words. Read the original passage below, study the examples, then attempt the six questions before revealing their answers. These are independent learning materials, not official school questions or an admissions test.',
    ],
    sections: [
      { title: 'Find the fact the question requests', paragraphs: [
        'Read the passage to understand its subject. Then identify what the question wants: a person, place, time, object or a reason explicitly stated in the text. Look for distinctive words and their equivalents. A question might say “starts” when the passage says “begins”.',
        'When you locate a possible answer, read the surrounding sentence carefully. Check what pronouns such as “it” and “they” refer to. Copying a nearby number or name without understanding its role can give you the wrong fact.',
      ] },
      { title: 'Keep exceptions and conditions', paragraphs: [
        'A rule can have a limit. “Children may borrow any kit except the microscope” does not mean every kit can be borrowed. Keep words such as except, before, after and only attached to the information they qualify.',
        'If the question requests two things, give two distinct things. If it asks for your own words, express the information differently without changing its meaning. If it asks you to copy a word or phrase, reproduce that wording accurately instead.',
      ] },
      { title: 'Original passage: The Saturday repair club', paragraphs: [
        'Paragraph 1. The repair club meets in the community hall on the first Saturday of each month. Visitors enter through the side door because the front steps are being repaired. Doors open at 9.30 am, but the demonstrations begin at 10 am. Leena puts a green sign beside the entrance so that newcomers can find it.',
        'Paragraph 2. Each visitor may bring one broken household item, except electrical appliances. Volunteers can mend torn fabric and loose wooden handles. They cannot promise to repair everything. Visitors must remain with their belongings; the club has no storage space for items left behind.',
        'Paragraph 3. At the welcome desk, Omar records each visitor’s name and the item they have brought. He gives them a numbered card. Visitors then wait near the windows until a volunteer calls their number. There are twelve seats in the waiting area, and four more beside the noticeboard.',
        'Paragraph 4. The last repair starts at noon. Before leaving, visitors return their numbered cards to a red box on the welcome desk. Attendance is free, although donations towards materials are welcome. Last month, the donations paid for thread and sandpaper.',
      ] },
      { title: 'Retrieval is different from inference', paragraphs: [
        'You can retrieve the reason for using the side door because the passage supplies it. You cannot retrieve Omar’s feelings: the writer does not state them. A question about his feelings would need supported inference, and this passage might not provide enough clues for a useful conclusion.',
        'Use only the passage for these questions. Repair clubs you have visited may follow different rules. Outside knowledge must not replace the details in this particular text.',
      ] },
      { title: 'Check your response', paragraphs: [
        'Point to the exact sentence supporting your answer. Then reread the question: have you answered the right time, place or person? A correct fact can still answer the wrong question. “9.30 am” is the opening time, not the demonstration time.',
        'These questions have no official mark allocation. The model answers show the information required, and equivalent accurate wording is acceptable unless copying is requested. If you make an error, label it as a missing detail, a misunderstood instruction or an incorrect fact, then correct it from the text.',
      ] },
    ],
    examples: [
      { question: 'When does the repair club meet?', steps: ['Find the sentence about when the club meets in paragraph 1.', 'Keep both the day and its position within the month. “Saturday” alone is incomplete.'], answer: 'On the first Saturday of each month.' },
      { question: 'Why do visitors use the side door?', steps: ['Locate “side door” in paragraph 1.', 'Read the reason after “because”. Do not invent a reason about queues or parking.'], answer: 'Because the front steps are being repaired.' },
      { question: 'Give two things Omar records at the welcome desk.', steps: ['Find Omar’s task in paragraph 3.', 'Separate the two recorded details from the numbered card he gives out afterwards.'], answer: 'Each visitor’s name and the item they have brought.' },
    ],
    mistakes: ['Giving a plausible fact from outside the text instead of the stated information.', 'Confusing opening time with the start of demonstrations.', 'Dropping the exception from a rule.', 'Giving one detail when two are requested.', 'Copying a long paragraph without selecting the relevant answer.'],
    questions: [
      { question: 'What time do the demonstrations begin?', answer: '10 am.', explanation: 'Paragraph 1 distinguishes doors opening at 9.30 am from demonstrations beginning at 10 am.' },
      { question: 'Which type of household item may visitors not bring?', answer: 'Electrical appliances.', explanation: 'Paragraph 2 gives this exception to the rule allowing one broken household item.' },
      { question: 'Where do visitors wait after receiving their numbered cards?', answer: 'Near the windows.', explanation: 'Paragraph 3 states the waiting location. The noticeboard is mentioned for extra seats, but is not the location requested in this sentence.' },
      { question: 'Explain in your own words why visitors must stay with their belongings.', answer: 'There is nowhere at the club to keep things that visitors leave behind.', explanation: 'Paragraph 2 says the club has no storage space. This answer restates that reason without inventing a rule about theft.' },
      { question: 'Where should visitors put their cards before leaving? Give both the container and its location.', answer: 'In a red box on the welcome desk.', explanation: 'Paragraph 4 supplies both details. “At the desk” omits the container; “in a box” omits its location.' },
      { question: 'Name the two materials bought with last month’s donations.', answer: 'Thread and sandpaper.', explanation: 'The final sentence names these materials. Fabric and wooden handles are repair examples elsewhere, not the stated purchases.' },
    ],
    relatedSlugs: ['comprehension-inference', 'using-evidence'], sources: [curriculum],
  },
  {
    slug: 'comprehension-inference',
    title: '11+ Inference Questions: Read Clues and Explain Your Thinking',
    description: 'Learn to make supported inferences with an original passage, three worked examples and six questions with explained answers.',
    subject: 'english', status: 'draft', reviewedAt: '2026-10-07',
    introduction: [
      'Inference means working out something the writer suggests without stating it directly. A character might repeatedly check a clock rather than announce that they are impatient. Your job is to connect the details to a reasonable conclusion.',
      'In this lesson, focus on choosing the best-supported interpretation, not inventing a story around the passage. The text, examples and questions are original practice, not official examination material. The answer wording is illustrative: other carefully supported interpretations can sometimes work.',
    ],
    sections: [
      { title: 'Separate a clue from a conclusion', paragraphs: [
        'A clue is a detail you can point to in the text. A conclusion is what you think that detail suggests. First locate the action, speech or description. Then ask what it makes likely in this situation. Finally, check the surrounding passage for details that support or contradict your idea.',
        'One gesture may fit several feelings. Looking down could suggest embarrassment, concentration or searching for something. Context helps you decide. Use more than one clue when the question calls for a fuller explanation, and avoid claiming certainty that the text does not provide.',
      ] },
      { title: 'Original passage: The first rehearsal', paragraphs: [
        'Paragraph 1. Outside the music room, Nia read the rehearsal notice for the third time. From behind the door came a quick burst of violin music. She tightened her grip on her flute case and let two younger children go in before her. Then she took a breath and pushed the door open.',
        'Paragraph 2. A boy at the nearest chair moved his bag from the empty seat beside him. “First time? I got lost on my first day,” he said. Nia sat down. She opened her case, but kept watching the conductor instead of joining the chatter around her.',
        'Paragraph 3. During the first piece, Nia missed her entry. Heat rose into her cheeks. She lowered her flute and stared at the music. The boy tapped the correct line with his pencil. At the next signal, she lifted her instrument and played.',
        'Paragraph 4. By the final piece, Nia was tapping her foot in time with the others. When the conductor asked who could come early the following week, her hand went up. Outside, she folded the rehearsal notice carefully and slipped it into her case.',
      ] },
      { title: 'Do not add an unsupported backstory', paragraphs: [
        'The passage gives clues about Nia’s first rehearsal, but it does not tell you her exam grades, how long she has played or what her family thinks. You cannot infer these details merely because they would fit a possible story.',
        'Distinguish a reasonable inference from a stronger unsupported claim. Volunteering to arrive early suggests willingness to participate. It does not prove that Nia is the best musician, will always attend, or has decided on a musical career.',
      ] },
      { title: 'Check multiple-choice alternatives against the whole text', paragraphs: [
        'An option can contain a familiar word and still be wrong. If the passage mentions younger children, that does not establish that Nia dislikes them. Ask which option explains the actual actions with the fewest unsupported assumptions.',
        'When writing your own answer, state the inference and connect it to a clue. “She is embarrassed because her cheeks become hot after she misses the entry” shows the link. A quotation alone gives the clue but leaves your conclusion unstated.',
      ] },
      { title: 'Notice changes, not just isolated moments', paragraphs: [
        'For a question about change, compare the beginning and the end. Keep both moments in your answer. A child who hesitates at the door and later volunteers to return has not behaved in the same way throughout.',
        'Use the practice to explain your reasoning aloud before checking the models. If your wording differs, test whether the passage supports the same idea. No short set establishes readiness for a particular exam; confirm the relevant school’s format separately.',
      ] },
    ],
    examples: [
      { question: 'What does Nia’s behaviour outside the room suggest about how she feels?', steps: ['She repeatedly reads the notice, grips the case and delays entering.', 'Together these actions suggest hesitation about entering an unfamiliar situation.', 'Do not claim that she has forgotten how to play: the text does not say this.'], answer: 'She seems nervous or unsure, shown by checking the notice repeatedly and letting others enter first.' },
      { question: 'Why might the boy mention getting lost on his first day?', steps: ['He makes space and mentions his own difficulty when he was new.', 'This gives Nia a reason to feel less alone in being unfamiliar with the rehearsal.'], answer: 'He is probably trying to reassure her and make her feel welcome.' },
      { question: 'What suggests that Nia wants to participate again?', steps: ['In paragraph 4 she volunteers to come early the following week.', 'This is stronger evidence of future participation than simply owning a flute.'], answer: 'She raises her hand to come early next week, suggesting that she wants to take part again.' },
    ],
    mistakes: ['Retelling an action without explaining what it suggests.', 'Treating a possible explanation as a proven fact.', 'Ignoring a later detail that changes the interpretation.', 'Assuming that every physical gesture always means the same emotion.', 'Choosing an option just because it repeats words from the passage.'],
    questions: [
      { question: 'Why is “Nia is reluctant to enter immediately” better supported than “Nia cannot read the notice”?', answer: 'She pauses and lets others enter first; nothing says she is unable to read.', explanation: 'Repeated reading alongside delaying entry supports hesitation. Difficulty reading would be an invented explanation.' },
      { question: 'What does the boy moving his bag suggest about his attitude towards Nia?', answer: 'He is welcoming and willing to include her.', explanation: 'He creates a place for her to sit, and his friendly comment supports this interpretation.' },
      { question: 'What might Nia’s hot cheeks and lowered flute suggest after she misses her entry?', answer: 'She feels embarrassed or self-conscious about the mistake.', explanation: 'The reaction happens immediately after the missed entry. Simply saying that the room is hot ignores that context.' },
      { question: 'Why does the boy probably tap the line with his pencil?', answer: 'He wants to help Nia find her place in the music.', explanation: 'He taps the correct line after her missed entry, and she plays at the next signal. This sequence supports help rather than criticism.' },
      { question: 'Which is best supported by paragraph 4: A) Nia feels more involved; B) Nia dislikes rehearsals; C) Nia has won a prize? Explain.', answer: 'A) Nia feels more involved.', explanation: 'She keeps time with the group and volunteers to come early. No prize is mentioned, and her willingness to return works against B.' },
      { question: 'How does Nia’s confidence appear to change? Use a detail from the beginning and one from the end.', answer: 'She becomes more comfortable: initially she delays entering, but by the end she volunteers to arrive early next week.', explanation: 'The answer compares two moments rather than describing only her initial nerves. “Appears” keeps the claim proportionate to the evidence.' },
    ],
    relatedSlugs: ['comprehension-retrieval', 'using-evidence'], sources: [curriculum],
  },
  {
    slug: 'using-evidence',
    title: '11+ Comprehension: Using Evidence and Short Quotations',
    description: 'Choose relevant evidence, quote accurately and explain your point with three worked examples and six original comprehension questions.',
    subject: 'english', status: 'draft', reviewedAt: '2026-10-07',
    introduction: [
      'A supported answer shows how the passage led you to your conclusion. This lesson concentrates on selecting evidence and explaining it after you have formed an idea. Practise retrieval and inference first if finding facts or drawing conclusions still feels difficult.',
      'Read the original passage and compare the example answers. The models demonstrate useful features rather than official marks. They are not a school mark scheme, and a particular exam may require a different response format.',
    ],
    sections: [
      { title: 'Point, evidence and explanation', paragraphs: [
        'For an extended response, a helpful structure is point, evidence, explanation, sometimes called PEE. Make a point that answers the question, choose a relevant detail, then explain its connection to your point. This is a planning aid, not a rule that every answer needs three sentences.',
        'If asked to copy one word, copy one word. If asked for your own words, paraphrase rather than quote. If asked to explain a writer’s word choice, quoting the relevant word can make the explanation precise. Always follow the actual question.',
      ] },
      { title: 'Original passage: The bridge model', paragraphs: [
        'Paragraph 1. On the classroom table stood Ravi’s bridge, made from thin strips of card. One end sagged. Ravi pushed his chair back. “It will never hold anything,” he muttered. Across the table, Ellie put down her own finished model.',
        'Paragraph 2. “Let’s look underneath,” she said. She crouched beside the table and pointed to the unsupported middle. Ravi fetched two spare strips. Together they folded the strips into triangles and fixed them below the bridge. Ellie waited while Ravi pressed the joins firmly into place.',
        'Paragraph 3. Ravi set a toy car on the bridge. It held. He added another. The card trembled, but the bridge stayed upright. His shoulders loosened. “Try the lorry,” he said, reaching for the largest vehicle in the box.',
        'Paragraph 4. When their teacher arrived, Ravi moved aside so she could see the supports. “Ellie helped me work out what was wrong,” he said. Ellie smiled and returned to her own table.',
      ] },
      { title: 'Choose evidence that supports this particular point', paragraphs: [
        'To show Ravi’s early discouragement, his prediction that the bridge will never hold anything is relevant. To show Ellie’s helpfulness, her suggestion and examination of the bridge are stronger choices. A detail can be true without supporting the point you are making.',
        'Keep quotations short enough to discuss clearly, but long enough to preserve the meaning. There is no universal three-word limit. Do not remove words in a way that reverses the original meaning, and do not put changed wording inside quotation marks.',
      ] },
      { title: 'Explain rather than repeat', paragraphs: [
        '“His shoulders loosened means his shoulders loosened” adds nothing. Explain that this physical change suggests his tension is easing after the bridge succeeds. Connect the action to its context, rather than assuming relaxed shoulders always mean the same thing.',
        'A response can include precise paraphrased evidence when the question permits it. “He credits Ellie when the teacher arrives” identifies a relevant event without copying the speech. If the question specifically requests a quotation, include one accurately.',
      ] },
      { title: 'Improve a thin answer', paragraphs: [
        'For “How does Ravi show appreciation?”, the answer “He is nice” is too vague. “He thanks Ellie” is closer, but the passage does not contain those exact words. A more precise response explains that he acknowledges her help to the teacher, giving Ellie credit for solving the problem.',
        'Before checking the practice answers, underline your point, identify your evidence and ask whether your explanation links the two. Alternative wording can work. These examples do not assign marks or claim that every examiner uses an identical formula.',
      ] },
    ],
    examples: [
      { question: 'How does Ravi’s speech show that he is discouraged at the start?', steps: ['Point: Ravi expects the bridge to fail.', 'Evidence: he says “It will never hold anything”.', 'Explanation: “never” makes the prediction absolute, showing he has little hope at that moment.'], answer: 'Ravi expects failure. His words “never hold anything” suggest that he has lost hope in the bridge at this point.' },
      { question: 'Give evidence that Ellie actively helps rather than simply watches.', steps: ['Select an action that contributes to finding the problem.', 'She looks beneath the model and identifies the unsupported middle.', 'Explain how that action helps them decide where support is needed.'], answer: 'Ellie points to the unsupported middle, helping Ravi identify where the bridge needs strengthening.' },
      { question: 'Explain what “His shoulders loosened” suggests in paragraph 3.', steps: ['Quote only the phrase being discussed.', 'Connect it to the bridge holding the cars immediately beforehand.', 'Interpret the physical change without inventing a new event.'], answer: '“His shoulders loosened” suggests relief: the bridge has held the cars, so his tension begins to ease.' },
    ],
    mistakes: ['Adding a quotation without explaining how it supports the answer.', 'Choosing evidence that is true but irrelevant to the question.', 'Changing the text inside quotation marks.', 'Using the same detail twice as if it were two separate pieces of evidence.', 'Applying PEE to a question that asks only for a word or short fact.'],
    questions: [
      { question: 'Copy one word from Ravi’s first speech that makes his prediction sound absolute.', answer: 'never', explanation: '“Never” rules out any future success in his prediction. The instruction asks for one word, so no paragraph is needed.' },
      { question: 'Which quotation better supports the point that Ellie investigates the problem: “put down her own finished model” or “pointed to the unsupported middle”? Explain.', answer: '“pointed to the unsupported middle”.', explanation: 'This identifies the weak part of Ravi’s bridge. Putting down her model shows that she stops her work, but not that she finds the problem.' },
      { question: 'Explain how Ravi’s request “Try the lorry” suggests growing confidence.', answer: 'He is willing to test the bridge with the largest vehicle, suggesting that he now expects it to cope with a greater challenge.', explanation: 'The passage identifies the lorry as the largest vehicle. The answer links this choice to increased confidence without claiming the lorry test succeeds.' },
      { question: 'Use your own words to explain how Ravi gives Ellie credit.', answer: 'He tells the teacher that she helped him discover the problem.', explanation: 'This paraphrases his final speech accurately. It avoids claiming that Ellie did all the building or that he explicitly says thank you.' },
      { question: 'Improve this answer to “How does Ellie show patience?”: “Ellie is patient because she is patient.” Use a detail from paragraph 2.', answer: 'Ellie waits while Ravi secures the joins, allowing him time to finish the task himself.', explanation: 'The waiting is evidence; allowing him time explains why it suggests patience. The original answer merely repeats the point.' },
      { question: 'A pupil writes: “The bridge carries the lorry successfully.” Is this supported? Explain what the passage actually establishes.', answer: 'No. The bridge holds two toy cars, and Ravi suggests testing the lorry, but the result of that test is not given.', explanation: 'A request to try something is not evidence that it happened successfully. This response distinguishes the stated result from an unsupported extension.' },
    ],
    relatedSlugs: ['comprehension-retrieval', 'comprehension-inference'], sources: [curriculum],
  },
];
