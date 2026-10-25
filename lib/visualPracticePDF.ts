import type { Question, VisualFigure, VisualQuestion } from '../types';
import type { jsPDF as PDF } from 'jspdf';
function plain(text:string){return text.replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/[–—−]/g,'-').replace(/→/g,' to ').replace(/×/g,' x ').replace(/\u00a0/g,' ');}
function figure(doc:PDF,f:VisualFigure,x:number,y:number,size:number,guide:VisualQuestion['guide']){
 const p=([a,b]:[number,number])=>[x+(a+50)*size/100,y+(b+50)*size/100];
 doc.setDrawColor(80);doc.setLineWidth(.18);doc.setFillColor(255,255,255);doc.rect(x,y,size,size,'FD');
 doc.setLineDashPattern([1,1],0);doc.setDrawColor(160);
 if(guide!=='horizontal')doc.line(x+size/2,y+size*.08,x+size/2,y+size*.92);
 if(guide!=='vertical')doc.line(x+size*.08,y+size/2,x+size*.92,y+size/2);
 doc.setLineDashPattern([],0);doc.setDrawColor(0);doc.setLineWidth(.45);doc.setFillColor(225,225,225);
 const points=f.points.map(p);const deltas=points.slice(1).map((point,i)=>[point[0]-points[i][0],point[1]-points[i][1]]);
 doc.lines(deltas,points[0][0],points[0][1],[1,1],'FD',true);
 const dot=p(f.dot);doc.setFillColor(0,0,0);doc.circle(dot[0],dot[1],size*.03,'F');
 doc.setLineWidth(.15);doc.line(x+size/2-1,y+size/2,x+size/2+1,y+size/2);doc.line(x+size/2,y+size/2-1,x+size/2,y+size/2+1);doc.setFontSize(6);doc.text('C',x+size/2+1,y+size/2-1);
}
function text(doc:PDF,value:string,y:number,size=10){doc.setFontSize(size);const lines=doc.splitTextToSize(plain(value),176);doc.text(lines,17,y);return y+lines.length*size*.3528*1.3+3;}
export async function createVisualPracticePDF(questions:Question[],answers:boolean){
 if(!questions.length || questions.some(q=>!q.visual))throw new Error('This PDF needs visual practice questions');
 const {jsPDF}=await import('jspdf');const doc=new jsPDF({unit:'mm',format:'a4',compress:true});doc.setProperties({title:answers?'Original visual practice - worked answers':'Original visual practice - questions',author:'11 Plus Exam Papers',subject:'Original skill practice, not an official school paper'});
 questions.forEach((q,index)=>{if(index)doc.addPage();const v=q.visual!;doc.setTextColor(0);doc.setFont('helvetica','bold');let y=text(doc,'11+ ORIGINAL VISUAL PRACTICE',18,15);doc.setFont('helvetica','normal');y=text(doc,`${answers?'Worked answer':'Question'} ${index+1} of ${questions.length} | ${q.topic}`,y,10);y=text(doc,'Independent practice. Not an official paper or a complete NVR syllabus.',y,8);y=text(doc,q.text,y+3,10);
  if(answers){y=text(doc,`Answer: option ${q.correctAnswer}`,y,12);}
  if(v.pattern){const {cells,columns}=v.pattern;const size=columns===3?30:31,gap=3,total=columns*size+(columns-1)*gap,startX=(210-total)/2;
   cells.forEach((cell,i)=>{const x=startX+(i%columns)*(size+gap),top=y+Math.floor(i/columns)*(size+gap);const f=cell || (answers?v.options[q.correctAnswer]:null);if(f)figure(doc,f,x,top,size,'centre');else{doc.setDrawColor(80);doc.rect(x,top,size,size);doc.setFontSize(18);doc.text('?',x+size/2,top+size/2+2,{align:'center'});}});y+=Math.ceil(cells.length/columns)*(size+gap)+5;
  }else if(!answers){figure(doc,v.start,78,y,54,v.guide);y+=61;}
  if(answers){y=text(doc,q.explanation,y,10);doc.setFontSize(9);doc.text(v.pattern?'Last given figure':'Before',49,y+1,{align:'center'});doc.text(`After: option ${q.correctAnswer}`,154,y+1,{align:'center'});figure(doc,v.start,29,y+5,40,v.guide);figure(doc,v.options[q.correctAnswer],134,y+5,40,v.guide);y+=50;}
  else{const size=36,gap=9,startX=19.5;q.options.forEach((label,i)=>{const x=startX+i*(size+gap);doc.setFontSize(10);doc.text(`Option ${label}`,x+size/2,y,{align:'center'});figure(doc,v.options[label],x,y+4,size,v.guide);});y+=48;y=text(doc,'My answer: __________    Working / rule:',y,10);doc.setDrawColor(180);doc.line(17,y+10,193,y+10);y+=18;}
  if(y>277)throw new Error(`Visual PDF content exceeds page ${index+1}`);
  doc.setFontSize(8);doc.text('www.11plusexampapers.com | Original practice for tests taken in2027',17,286);doc.text(`${index+1} / ${questions.length}`,193,286,{align:'right'});
 });return doc;
}
