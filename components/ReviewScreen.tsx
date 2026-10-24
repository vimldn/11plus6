'use client';

import { VisualStem, VisualAnswer, VisualWorked } from './VisualDiagram';
import { isAnswerCorrect } from '../lib/answerMarking';
import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, CircleMinus } from 'lucide-react';
import { QuizResult } from '../types';
import { Button } from './Button';

interface ReviewScreenProps { result: QuizResult; onBack: () => void; }

export const ReviewScreen: React.FC<ReviewScreenProps> = ({ result, onBack }) => {
  const [mistakesOnly, setMistakesOnly] = useState(false);
  const [selected, setSelected] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const questions = result.questions.map((question, index) => ({ question, index,
    correct: isAnswerCorrect(result.userAnswers[question.id], question.correctAnswer, result.quizType, question.marking),
    answered: Boolean(result.userAnswers[question.id]?.trim()),
  }));
  const visible = mistakesOnly ? questions.filter(item => !item.correct) : questions;
  const active = visible.find(item => item.index === selected) || visible[0];
  const position = active ? visible.indexOf(active) : -1;
  const choose = (index: number) => { setSelected(index); heading.current?.focus(); };

  return <div className="answer-review">
    <Button onClick={onBack} variant="ghost"><ArrowLeft size={16}/> Back to results</Button>
    <header className="review-header"><p className="brand-eyebrow">The learning starts here</p><h1>Review your answers.</h1><p>Take your time. Compare your answer, follow the explanation and try the method again.</p></header>
    <div className="review-layout">
      <aside className="review-navigator" aria-label="Question navigator">
        <h2>Your questions</h2>
        <div className="review-filters" aria-label="Filter questions">
          <button aria-pressed={!mistakesOnly} onClick={() => setMistakesOnly(false)}>All questions ({questions.length})</button>
          <button aria-pressed={mistakesOnly} onClick={() => setMistakesOnly(true)}>Mistakes only ({questions.filter(item => !item.correct).length})</button>
        </div>
        <p className="review-legend">✓ Correct · × Incorrect · – Unanswered</p>
        <div className="review-number-grid">{visible.map(item => <button key={item.question.id} onClick={() => choose(item.index)} aria-current={active?.index === item.index ? 'step' : undefined} aria-label={`Question ${item.index + 1}: ${item.correct ? 'correct' : item.answered ? 'incorrect' : 'unanswered'}`} className={item.correct ? 'is-correct' : item.answered ? 'is-incorrect' : 'is-unanswered'}><span>{item.index + 1}</span><small aria-hidden="true">{item.correct ? '✓' : item.answered ? '×' : '–'}</small></button>)}</div>
      </aside>
      <div className="min-w-0">{active ? <>
        <article className="review-question" aria-labelledby="review-question-title">
          <div className="review-question-meta"><span>Question {active.index + 1} of {questions.length}</span><span className={active.correct ? 'text-emerald-800' : 'text-slate-700'}>{active.correct ? <CheckCircle size={17}/> : active.answered ? <XCircle size={17}/> : <CircleMinus size={17}/>} {active.correct ? 'Correct' : active.answered ? 'Incorrect' : 'Unanswered'}</span></div>
          <h2 id="review-question-title" ref={heading} tabIndex={-1}>{active.question.text}</h2>
          {active.question.topic && <p className="review-topic">{active.question.topic}</p>}
          <VisualStem question={active.question} />
          <div className="review-answer-pair"><section><h3>Your answer</h3><div><VisualAnswer question={active.question} answer={result.userAnswers[active.question.id]?.trim()} /></div></section><section className="review-correct-answer"><h3>Correct answer</h3><div><VisualAnswer question={active.question} answer={active.question.correctAnswer} /></div></section></div>
          <section className="review-explanation"><h3>How to solve it</h3><p>{active.question.explanation || 'A worked explanation is not available for this question.'}</p><VisualWorked question={active.question} /></section>
          {active.question.options.length > 0 && <details className="review-options"><summary>See the original answer options</summary><ul className={active.question.visual ? "grid grid-cols-2 gap-4" : undefined}>{active.question.options.map((option, index) => <li key={`${index}-${option}`}><VisualAnswer question={active.question} answer={option} /></li>)}</ul></details>}
        </article>
        <nav className="review-pagination" aria-label="Move between questions"><Button variant="secondary" disabled={position <= 0} onClick={() => choose(visible[position - 1].index)}><ArrowLeft size={16}/> Previous</Button><span aria-live="polite">{position + 1} / {visible.length}</span><Button disabled={position === visible.length - 1} onClick={() => choose(visible[position + 1].index)}>Next <ArrowRight size={16}/></Button></nav>
      </> : <div className="review-question"><h2 ref={heading} tabIndex={-1}>Nothing to revisit here.</h2><p>{questions.length ? 'Every answer was correct. Choose All questions to read the explanations.' : 'This attempt has no questions to review.'}</p><Button onClick={onBack} className="mt-6">Back to results</Button></div>}
      <button className="brand-text-link mt-8" onClick={onBack}>Back to results <ArrowRight size={16}/></button></div>
    </div>
  </div>;
};
