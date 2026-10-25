import { Question, VisualFigure, VisualPoint, VisualTransform, VisualQuestion } from '../types';

export const visualTopics = ['rotations', 'reflections', 'sequences', 'matrices'] as const;
export type VisualTopic = typeof visualTopics[number];
export const visualLabels = { rotations: 'NVR rotations', reflections: 'NVR reflections', sequences: 'NVR shape sequences', matrices: 'NVR matrices' };
export function isVisualTopic(value: string): value is VisualTopic { return visualTopics.some(t => t === value); }
// Original marked, asymmetric motifs. Coordinates are SVG coordinates: x right, y down.
export const visualMotifs: VisualFigure[] = [
  { points: [[-25,-25],[15,-25],[15,-10],[-5,-10],[-5,25],[-25,25]], dot:[24,15] },
  { points: [[-28,-20],[5,-20],[5,-30],[28,-5],[5,20],[5,8],[-28,8]], dot:[-15,25] },
  { points: [[-25,-28],[10,-28],[10,-10],[25,-10],[25,8],[-5,8],[-5,25],[-25,25]], dot:[22,25] },
  { points: [[-28,-20],[-5,-30],[25,-12],[8,5],[20,28],[-20,18]], dot:[-23,2] },
  { points: [[-25,-25],[25,-25],[25,-5],[0,-5],[0,25],[-25,25]], dot:[20,20] },
  { points: [[-28,-28],[25,-10],[8,0],[25,25],[-15,25],[-10,0]], dot:[-25,12] },
];
export function transformPoint([x,y]: VisualPoint, operation: VisualTransform): VisualPoint {
  switch(operation) {
    case 'cw90': return [-y,x];
    case 'ccw90': return [y,-x];
    case 'half': return [-x,-y];
    case 'vertical': return [-x,y];
    case 'horizontal': return [x,-y];
    default: return [x,y];
  }
}
export function transformFigure(figure: VisualFigure, operation: VisualTransform): VisualFigure {
  const clean=(p:VisualPoint):VisualPoint=>p.map(n=>n===0?0:n) as VisualPoint;
  return {points:figure.points.map(p=>clean(transformPoint(p,operation))),dot:clean(transformPoint(figure.dot,operation))};
}
const turns = {cw90:'90° clockwise (a quarter turn)',ccw90:'90° anticlockwise (a quarter turn)',half:'180° (a half turn)'};
function position([x,y]:VisualPoint) {return `${Math.abs(x)} units ${x<0?'left':'right'} and ${Math.abs(y)} units ${y<0?'above':'below'} C`;}
function makeQuestion(motif:number, operation:Exclude<VisualTransform,'identity'>, index:number): Question {
  const rotation = operation in turns;
  const start = transformFigure(visualMotifs[motif], motif%2 ? 'half' : 'identity');
  const target = transformFigure(start,operation);
  // Include mirror/turn confusions, but never equivalent diagrams for these asymmetric marked figures.
  const distractors: VisualTransform[] = rotation ? ['vertical','horizontal','identity'] : ['cw90','ccw90','half'];
  const candidates = [target,...distractors.map(t=>transformFigure(start,t))];
  const keyIndex = index%4;
  const ordered = candidates.map((_,i)=>candidates[(i-keyIndex+4)%4]);
  const options = ['A','B','C','D'];
  const guide = operation==='vertical' || operation==='horizontal' ? operation : 'centre';
  const visual: VisualQuestion = {start,options:Object.fromEntries(options.map((o,i)=>[o,ordered[i]])),guide,operation,motif};
  const instruction = rotation ? `Turn the whole figure ${turns[operation as keyof typeof turns]} about C.` : `Reflect the whole figure in the dashed ${operation} mirror line through C.`;
  const method = rotation ? `C stays fixed. Every corner and the solid dot make the same turn; the figure is not flipped. The dot moves from ${position(start.dot)} to ${position(target.dot)}.` : `Each point crosses the ${operation} line at right angles and stays the same distance from it. ${operation==='vertical'?'Left and right swap; heights stay the same.':'Top and bottom swap; left/right positions stay the same.'} The dot moves from ${position(start.dot)} to ${position(target.dot)}. A turn is not the required mirror image.`;
  return {id:`nvrchecked-${rotation?'rotation':'reflection'}-${motif+1}-${operation}`,text:`${instruction} Which option shows the result?`,options,correctAnswer:options[keyIndex],explanation:`Option ${options[keyIndex]}. ${method} Check the outline as well as the dot.`,topic:rotation?visualLabels.rotations:visualLabels.reflections,visual};
}
export function visualPool(topic:VisualTopic):Question[] {
  if(topic==='sequences' || topic==='matrices') return visualMotifs.flatMap((_,i)=>(['cw90','ccw90'] as const).map((op,j)=>makePattern(i,op,topic,i*2+j)));
  return topic==='rotations' ? visualMotifs.slice(0,4).flatMap((_,i)=>(['cw90','ccw90','half'] as const).map((op,j)=>makeQuestion(i,op,i*3+j))) : visualMotifs.flatMap((_,i)=>(['vertical','horizontal'] as const).map((op,j)=>makeQuestion(i,op,i*2+j)));
}
function shuffle<T>(items:T[],random:()=>number):T[] {const copy=items.slice();for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}
export function createVisualPractice(topic?:string,random:()=>number=Math.random,excludeIds:string[]=[]):Question[] {
  if(topic && !isVisualTopic(topic))return [];
  const take=(t:VisualTopic,n:number)=>shuffle(visualPool(t).filter(q=>!excludeIds.includes(q.id)),random).slice(0,n);
  return topic ? take(topic as VisualTopic,8) : shuffle(visualTopics.flatMap(t=>take(t,2)),random);
}

// Constant-turn sequences and 3×3 transformation grids: deliberately limited skill families.
function makePattern(motif:number, operation:'cw90'|'ccw90', topic:'sequences'|'matrices', index:number):Question {
  const base=visualMotifs[motif];
  const repeat=(f:VisualFigure,n:number)=>{let out=f;for(let i=0;i<n;i++)out=transformFigure(out,operation);return out;};
  const matrix=topic==='matrices';
  const cells:VisualFigure[] = matrix ? Array.from({length:9},(_,i)=>repeat(Math.floor(i/3)%2 ? transformFigure(base,'half') : base,i%3)) : Array.from({length:5},(_,i)=>repeat(base,i));
  const start=cells[cells.length-2], target=cells[cells.length-1];
  const keyIndex=index%4, options=['A','B','C','D'];
  const candidates=[target,transformFigure(start,'identity'),transformFigure(start,'half'),transformFigure(start,operation==='cw90'?'ccw90':'cw90')];
  const result=Object.fromEntries(options.map((key,i)=>[key,candidates[(i-keyIndex+4)%4]]));
  const direction=operation==='cw90'?'clockwise':'anticlockwise';
  const rule=matrix ? `Across every row, each figure turns 90° ${direction} about its own C. Down every column, each figure makes a half turn (180°). From the bottom-middle cell, turn 90° ${direction}; from the middle-right cell, make a half turn. Both give the same bottom-right figure.` : `Each figure turns 90° ${direction} about C to make the next frame. Check all three visible transitions, then apply the same quarter turn to frame 4. After four quarter turns the figure returns to its first orientation.`;
  return {id:`nvrchecked-${topic}-${motif+1}-${operation}`,text:matrix?'The same turn is used at every step across each row, and the same turn is used down each column. Which option completes the bottom-right cell?':'The same turn is used at every step. Which option is the next figure in the sequence?',options,correctAnswer:options[keyIndex],topic:visualLabels[topic],explanation:`Option ${options[keyIndex]}. ${rule} Follow both the outline and the solid dot; do not flip the figure.`,visual:{start,options:result,guide:'centre',operation,motif,pattern:{kind:matrix?'matrix':'sequence',columns:matrix?3:5,cells:cells.map((f,i)=>i===cells.length-1?null:f)}}};
}
