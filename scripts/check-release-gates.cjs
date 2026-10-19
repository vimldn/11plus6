#!/usr/bin/env node
'use strict';

// Run from any directory: node scripts/check-release-gates.cjs
// Compile the real TypeScript helpers in memory; never alter publication data.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const cache = new Map();

function loadLocal(relative) {
  const filename = path.resolve(root, relative);
  if (cache.has(filename)) return cache.get(filename).exports;
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    fileName: filename,
  });
  const loaded = new Module(filename, module);
  loaded.filename = filename;
  loaded.paths = Module._nodeModulePaths(path.dirname(filename));
  const nativeRequire = loaded.require.bind(loaded);
  loaded.require = (request) => request.startsWith('@/')
    ? loadLocal(`${request.slice(2)}.ts`)
    : nativeRequire(request);
  cache.set(filename, loaded);
  loaded._compile(compiled.outputText, filename);
  return loaded.exports;
}

const { allLessons: lessons } = loadLocal('lib/lessonPublishing.ts');
const { publishedLessons, publishedLesson, lessonPreviewEnabled } = loadLocal('lib/lessonPublishing.ts');
const previousEnv = { NODE_ENV: process.env.NODE_ENV, VERCEL_ENV: process.env.VERCEL_ENV };
function setEnv(node, vercel) {
  process.env.NODE_ENV = node;
  if (vercel === undefined) delete process.env.VERCEL_ENV;
  else process.env.VERCEL_ENV = vercel;
}

try {
  setEnv('production', 'production');
  assert.equal(lessonPreviewEnabled(), false, 'Production must deny draft preview');
  setEnv('development', 'production');
  assert.equal(lessonPreviewEnabled(), false, 'Explicit production must override development');
  setEnv('production', 'preview');
  assert.equal(lessonPreviewEnabled(), true, 'Vercel preview must permit draft review');
  setEnv('development', undefined);
  assert.equal(lessonPreviewEnabled(), true, 'Local development permits review');
  setEnv('production', undefined);
  assert.equal(lessonPreviewEnabled(), false, 'Unknown production deployment fails closed');

  const drafts = lessons.filter(lesson => lesson.status === 'draft');
  const released = lessons.filter(lesson => lesson.status === 'published');
  assert.equal(released.length, 6, 'Exactly the reviewed maths and English batches are released');
  assert.equal(drafts.length, 0, 'All three English drafts passed this release');
  assert.deepEqual(released.filter(x => x.subject === 'english').map(x => x.slug).sort(),
    ['comprehension-inference', 'comprehension-retrieval', 'using-evidence']);
  assert.equal(released.filter(x => x.subject === 'maths').length, 3);
  assert.deepEqual(publishedLessons(), released);
  for (const lesson of released) {
    assert.equal(publishedLesson(lesson.subject, lesson.slug), lesson);
    assert.equal(publishedLesson(lesson.subject === 'maths' ? 'english' : 'maths', lesson.slug), undefined);
  }
  assert.equal(publishedLesson('maths', 'missing-lesson'), undefined);
  // Exercise a real unpublished state so the absence of drafts cannot hide a broken gate.
  const candidate = released.find(x => x.subject === 'english');
  try {
    candidate.status = 'draft';
    assert.equal(publishedLesson(candidate.subject, candidate.slug), undefined);
    assert.equal(publishedLessons().length, released.length - 1);
  } finally { candidate.status = 'published'; }
  assert.deepEqual(publishedLessons(), released);

  const catalogue = JSON.parse(fs.readFileSync(path.join(root, 'data/schools.catalog.json'), 'utf8'));
  const qe = catalogue.find((school) => school.id === 'qe-boys');
  const kehs = catalogue.find((school) => school.id === 'king-edward-vi-girls');
  assert.deepEqual(qe.subjects, ['maths', 'english'], 'QE must not prescribe VR/NVR');
  assert.match(qe.examFormat, /one round/i);
  assert.equal(kehs.category, 'private', 'KEHS must not appear as a state grammar');
  assert.deepEqual(kehs.subjects, ['maths', 'english']);
  console.log('PASS: production/preview access, draft exclusion, publication/subject lookup, QE and KEHS corrections.');
} finally {
  for (const [key, value] of Object.entries(previousEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}
