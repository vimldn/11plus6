import { VisualQuestion } from '../types';
// Reject malformed optional SVG data in browser-local saved attempts before rendering it.
export function isVisualQuestion(value:unknown):value is VisualQuestion {
  const v=value as VisualQuestion;
  const point=(p:any)=>Array.isArray(p)&&p.length===2&&p.every(n=>Number.isFinite(n)&&Math.abs(n)<=40);
  const figure=(f:any)=>f&&Array.isArray(f.points)&&f.points.length>=3&&f.points.length<=12&&f.points.every(point)&&point(f.dot);
  return Boolean(v && ['centre','vertical','horizontal'].includes(v.guide) && ['cw90','ccw90','half','vertical','horizontal'].includes(v.operation) && Number.isInteger(v.motif) && v.motif>=0 && v.motif<6 && figure(v.start) && v.options && Object.keys(v.options).length===4 && ['A','B','C','D'].every(k=>figure(v.options[k])));
}
