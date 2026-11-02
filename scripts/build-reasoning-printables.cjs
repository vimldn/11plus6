'use strict';
// Fixed starter selections from already checked original pools; no new questions.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { load } = require('./load-ts.cjs');
const { verbalPool } = load('data/verbalPractice.ts');
const { visualPool } = load('data/visualPractice.ts');
const { createVisualPracticePDF } = load('lib/visualPracticePDF.ts');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'public/papers');
const temporary = path.join(root, 'tmp/pdfs');

function select(pool, ids) {
  return ids.map(id => {
    const question = pool.find(item => item.id === id);
    if (!question) throw new Error(`Missing checked question: ${id}`);
    if (question.options.length !== 4 || new Set(question.options).size !== 4 || !question.options.includes(question.correctAnswer)) throw new Error(`Invalid options: ${id}`);
    return question;
  });
}

async function main() {
  fs.mkdirSync(output, { recursive: true });
  fs.mkdirSync(temporary, { recursive: true });
  const groups = [
    { title: 'Letter codes', questions: select(verbalPool('codes'), ['vrchecked-code-HEN-2', 'vrchecked-code-JAR--1', 'vrchecked-code-ZIP-3']) },
    { title: 'Word analogies', questions: select(verbalPool('analogies'), ['vrchecked-analogy-1', 'vrchecked-analogy-3', 'vrchecked-analogy-4']) },
    { title: 'Word classifications', questions: select(verbalPool('classifications'), ['vrchecked-classification-1', 'vrchecked-classification-2', 'vrchecked-classification-3']) },
    { title: 'Constant-step sequences', questions: select(verbalPool('sequences'), ['vrchecked-number-7-3', 'vrchecked-number-18-4', 'vrchecked-letter-0-2']) },
  ];
  let questionNumber = 0;
  const verbal = groups.map(group => ({ ...group, questions: group.questions.map(question => {
    const shift = (++questionNumber) % 4;
    return { ...question, options: [...question.options.slice(shift), ...question.options.slice(0, shift)] };
  }) }));
  fs.writeFileSync(path.join(temporary, 'verbal-starter.json'), JSON.stringify(verbal, null, 2));
  const python = process.env.CODEX_PRIMARY_RUNTIME_PYTHON || 'python3';
  const build = spawnSync(python, [path.join(__dirname, 'render-verbal-starter.py')], { cwd: root, encoding: 'utf8' });
  if (build.status !== 0) throw new Error(build.stderr || build.stdout || 'Verbal PDF build failed');
  process.stdout.write(build.stdout);

  // Two per skill; keep different variations and balanced correct-option positions in this fixed set.
  const visualIndexes = { rotations: [0, 11], reflections: [1, 6], sequences: [2, 5], matrices: [3, 8] };
  const visual = ['rotations', 'reflections', 'sequences', 'matrices'].flatMap(topic => {
    const pool = visualPool(topic);
    return visualIndexes[topic].map(index => pool[index]);
  });
  const fonts = {
    regular: fs.readFileSync('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf').toString('base64'),
    bold: fs.readFileSync('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf').toString('base64'),
  };
  for (const answers of [false, true]) {
    const document = await createVisualPracticePDF(visual, answers, fonts);
    if (document.getNumberOfPages() !== visual.length) throw new Error('Visual starter page count changed');
    fs.writeFileSync(path.join(output, `nonverbal-${answers ? 'worked-answers' : 'practice'}.pdf`), Buffer.from(document.output('arraybuffer')));
  }
  const manifest = {
    created: '2026-11-02',
    provenance: 'Original checked question pools; fixed selections; no newly authored questions or educator endorsement.',
    verbal: verbal.flatMap(group => group.questions.map(question => ({ id: question.id, topic: group.title, options: question.options, answer: question.correctAnswer }))),
    nonverbal: visual.map(question => ({ id: question.id, topic: question.topic, answer: question.correctAnswer })),
    files: ['verbal-practice.pdf', 'verbal-worked-answers.pdf', 'nonverbal-practice.pdf', 'nonverbal-worked-answers.pdf'],
  };
  fs.writeFileSync(path.join(root, 'docs/paper-audit/reasoning-printables-2026-11-02.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log('Built 12-question verbal and 8-question visual starter booklets, each with separate worked answers.');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
