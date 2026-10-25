const assert=require('node:assert/strict'),fs=require('node:fs');
const {load}=require('./load-ts.cjs');
const {createTopicPractice}=load('lib/topicPractice.ts');
const {freshTopics,freshTopicLabels,freshMathsPool}=load('data/freshMaths.ts');
const {mathsJourneys,englishJourney,topicPracticeHref}=load('lib/practiceJourneys.ts');
const {englishLessons}=load('data/englishLessons.ts');
const inventory=new Set(fs.readFileSync('docs/releases/url-inventory-practice-2026-10-25.txt','utf8').trim().split('\n').map(u=>new URL(u).pathname));
assert.equal(mathsJourneys.length,8);assert.equal(new Set(mathsJourneys.map(j=>j.topic)).size,8);
for(const topic of freshTopics){const allowed=new Set(freshMathsPool(topic).map(q=>q.id));for(let attempt=0;attempt<100;attempt++){const set=createTopicPractice(topic);assert.equal(set.questions.length,10);assert.equal(new Set(set.questions.map(q=>q.id)).size,10);assert(set.questions.every(q=>allowed.has(q.id)&&q.topic===freshTopicLabels[topic]));}}
assert.equal(createTopicPractice().questions.length,16);assert.equal(createTopicPractice('not-a-supported-topic').questions.length,0);assert.match(createTopicPractice('not-a-supported-topic').notice,/not available/);
for(const j of mathsJourneys){if(j.guide)assert(inventory.has(j.guide),j.guide);for(const mode of ['practice','exam']){const u=new URL(topicPracticeHref(j.topic,mode),'https://www.11plusexampapers.com');assert.equal(u.searchParams.get('topic'),j.topic);assert.equal(u.searchParams.get('mode'),mode);}}
for(const step of englishJourney){const lesson=englishLessons.find(l=>l.slug===step.slug);assert(lesson&&lesson.status==='published');assert.equal(lesson.questions.length,6);assert(lesson.sections.some(s=>s.title.startsWith('Original passage:')&&s.paragraphs.length));assert(inventory.has('/subjects/english/'+step.slug));}
console.log('PASS: 800 focused 10-question sets, exact topics, distinct IDs, mixed16 preserved, invalid-topic guard, all guide URLs, three published passages/18 original keys');
