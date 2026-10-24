import { Question, VisualFigure, VisualQuestion } from '../types';
export function describeFigure(figure:VisualFigure) {
  const point=([x,y]:[number,number])=>`${Math.abs(x)} ${x<0?'left':'right'}, ${Math.abs(y)} ${y<0?'above':'below'}`;
  return `Distances from C in diagram units. Outline vertices in order: ${figure.points.map(point).join('; ')}. Solid dot: ${point(figure.dot)}.`;
}
export function VisualDiagram({figure,guide,label}:{figure:VisualFigure;guide:VisualQuestion['guide'];label:string}) {
  return <svg viewBox="-50 -50 100 100" role="img" aria-label={`${label}. ${describeFigure(figure)}`} className="visual-diagram mx-auto block h-auto w-full max-w-[190px]" style={{aspectRatio:'1',color:'#172c25'}}>
    <rect x="-49" y="-49" width="98" height="98" rx="4" fill="white" stroke="#b8bdb7" strokeWidth="0.5"/>
    {guide!=='horizontal' && <line x1="0" y1="-42" x2="0" y2="42" stroke={guide==='vertical'?'#172c25':'#ced1cc'} strokeWidth={guide==='vertical'?1:0.4} strokeDasharray="3 3"/>}
    {guide!=='vertical' && <line x1="-42" y1="0" x2="42" y2="0" stroke={guide==='horizontal'?'#172c25':'#ced1cc'} strokeWidth={guide==='horizontal'?1:0.4} strokeDasharray="3 3"/>}
    <polygon points={figure.points.map(p=>p.join(',')).join(' ')} fill="#e5e7e2" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <circle cx={figure.dot[0]} cy={figure.dot[1]} r="3" fill="currentColor" stroke="white" strokeWidth="0.6"/>
    <path d="M -2 0 H 2 M 0 -2 V 2" stroke="black" strokeWidth="0.8"/>
    <text x="3" y="-3" fontSize="6" fill="black" paintOrder="stroke" stroke="white" strokeWidth="1.2">C</text>
  </svg>;
}
export function VisualStem({question}:{question:Question}) {
  return question.visual ? <figure className="my-5 rounded-xl border border-stone-200 bg-stone-50 p-4"><figcaption className="mb-3 text-center text-sm font-bold">Starting figure · {question.visual.guide==='centre'?'centre C':`${question.visual.guide} mirror line through C`}</figcaption><VisualDiagram figure={question.visual.start} guide={question.visual.guide} label="Starting figure"/><p className="mt-3 text-center text-xs text-slate-600">Follow the solid dot and the outline. C marks the fixed centre.</p></figure> : null;
}
export function VisualAnswer({question,answer}:{question:Question;answer?:string}) {
  const visual=question.visual;
  if(!visual || !answer || !visual.options[answer])return <>{answer || 'Not answered'}</>;
  return <span className="block min-w-0"><span className="mb-2 block font-bold">Option {answer}</span><VisualDiagram figure={visual.options[answer]} guide={visual.guide} label={`Option ${answer}`}/></span>;
}
export function VisualWorked({question}:{question:Question}) {
  const v=question.visual;
  return v ? <div className="my-4 grid grid-cols-2 gap-3 rounded-xl border border-stone-300 bg-white p-3" aria-label="Worked visual comparison"><figure><figcaption className="mb-2 text-center text-sm font-bold">Before</figcaption><VisualDiagram figure={v.start} guide={v.guide} label="Before transformation"/></figure><figure><figcaption className="mb-2 text-center text-sm font-bold">After · option {question.correctAnswer}</figcaption><VisualDiagram figure={v.options[question.correctAnswer]} guide={v.guide} label="Correct result"/></figure><p className="col-span-2 text-center text-xs text-slate-700">{v.guide==='centre'?'Turn every feature about C. Do not flip the figure.':'Match equal distances on opposite sides of the dashed mirror line.'}</p></div> : null;
}
