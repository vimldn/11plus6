import type { Question } from '../types';
import { verbalCurated } from './verbalCurated';

export type VerbalTopic = 'codes' | 'analogies' | 'classifications' | 'sequences';
export const verbalTopics: VerbalTopic[] = ['codes','analogies','classifications','sequences'];
export const verbalLabels: Record<VerbalTopic,string> = {codes:'VR letter codes',analogies:'VR analogies',classifications:'VR classifications',sequences:'VR sequences'};
export function isVerbalTopic(topic: string): topic is VerbalTopic { return verbalTopics.includes(topic as VerbalTopic); }
const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function shiftWord(word: string, shift: number) { return Array.from(word).map(c=>alphabet[(alphabet.indexOf(c)+shift+26)%26]).join(''); }
function shuffle<T>(items:T[],random:()=>number):T[]{const out=[...items];for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;}
export function verbalPool(topic:VerbalTopic): Question[] {
  if(topic==='analogies'||topic==='classifications')return verbalCurated.filter(q=>q.topic===verbalLabels[topic]).map(q=>({...q,options:[...q.options]}));
  const out:Question[]=[];
  const add=(id:string,text:string,answer:string,explanation:string,wrong:string[])=>{
    const options=[answer,...Array.from(new Set(wrong)).filter(x=>x!==answer).slice(0,3)];
    if(options.length!==4)throw new Error('Invalid VR distractors: '+id);
    out.push({id,text,correctAnswer:answer,options,explanation,topic:verbalLabels[topic],difficulty:1});
  };
  if(topic==='codes'){
    const words=['BEE','JAR','MAP','HEN','OWL','FOX','LOG','KEY','SUN','ZIP','WEB','CUP','HAT','NET','PEN','BOX','ICE','RED','TOP','VAN'];
    for(const word of words)for(const shift of [-3,-2,-1,1,2,3]){
      const answer=shiftWord(word,shift),example=shiftWord('BAG',shift),direction=shift>0?'forwards':'backwards';
      const mappings=Array.from(word).map((c,i)=>`${c} → ${answer[i]}`).join(', ');
      add(`vrchecked-code-${word}-${shift}`,`A B C D E F G H I J K L M N O P Q R S T U V W X Y Z. In this code every letter moves the same number of places ${direction}; the alphabet wraps after Z or before A. BAG becomes ${example}. What does ${word} become?`,answer,`The rule moves every letter ${Math.abs(shift)} place${Math.abs(shift)===1?'':'s'} ${direction}. Check BAG → ${example}, then apply it to the target: ${mappings}. Put the letters in their original order: ${answer}. The coded result need not be a real word.`,[shiftWord(word,-shift),shiftWord(word,shift+1),shiftWord(word,shift+2),shiftWord(word,shift+3)]);
    }
  }
  if(topic==='sequences'){
    for(let start=2;start<=21;start++)for(let step=2;step<=4;step++){
      const seq=Array.from({length:4},(_,i)=>start+i*step),answer=start+4*step;
      add(`vrchecked-number-${start}-${step}`,`Continue the constant-step number sequence: ${seq.join(', ')}, ?`,String(answer),`The gap is +${step} each time: ${seq[1]} − ${seq[0]} = ${step}, ${seq[2]} − ${seq[1]} = ${step}, and ${seq[3]} − ${seq[2]} = ${step}. Add the same gap once more: ${seq[3]} + ${step} = ${answer}.`,[String(answer-step),String(answer+step),String(answer+1)]);
    }
    for(let start=0;start<10;start++)for(let step=1;step<=3;step++){
      const seq=Array.from({length:4},(_,i)=>alphabet[start+i*step]),answer=alphabet[start+4*step];
      add(`vrchecked-letter-${start}-${step}`,`A B C D E F G H I J K L M N O P Q R S T U V W X Y Z. Continue this constant-step forward letter sequence without wrapping: ${seq.join(', ')}, ?`,answer,`Move forwards ${step} alphabet place${step===1?'':'s'} at every step. ${seq.map(c=>`${c} (${alphabet.indexOf(c)+1})`).join(', ')} have positions separated by ${step}. The next position is ${start+1+4*step}, which is ${answer}.`,[alphabet[start+3*step],alphabet[start+4*step+1],alphabet[start+4*step+2]]);
    }
  }
  return out;
}
export function createVerbalPractice(topic?: string, random:()=>number=Math.random, excludeIds:string[]=[]):Question[]{
  if(topic&&!isVerbalTopic(topic))return [];
  const topics=topic?[topic as VerbalTopic]:verbalTopics;
  return shuffle(topics.flatMap(t=>shuffle(verbalPool(t).filter(q=>!excludeIds.includes(q.id)),random).slice(0,topic?10:3)),random).map(q=>({...q,options:shuffle(q.options,random)}));
}
