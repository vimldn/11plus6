import { Subject, Question, SchoolType, QuizType } from '../types';
import { getRandomQuestions } from '../data/questionBank';

type Difficulty = 'standard' | 'challenging' | 'exam-ready';
export type QuestionBatch = { questions: Question[]; notice: string };
// School selection never permits unchecked model output or a claim of school-paper fidelity.
export const generateQuestions = async (
  subject: Subject, schoolType: SchoolType | null, topic?: string,
  quizType: QuizType = 'multiple-choice', count = 25, schoolId?: string,
  difficulty: Difficulty = 'standard'
): Promise<QuestionBatch> => {
  if (schoolId) {
    try {
      const res = await fetch('/api/exams/generate', {
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({schoolId,subject,quizType,count,difficulty,topic}),
      });
      if (res.ok) {
        const data = await res.json();
        if(data.meta?.source==='reviewed-bank')return {questions:data.questions,notice:'Reviewed general skill practice. The selected school does not define this question set or its timing. Unchecked model-generated answers and uploaded-paper simulation are not served.'+(data.questions.length<count?` Only ${data.questions.length} questions are available for these settings.`:'')};

      }
    } catch { /* Transparent local fallback below, without claiming school alignment. */ }
  }
  const questions = getRandomQuestions(subject,quizType,count,topic,difficulty);
  return {questions,notice:(schoolId ? 'School-specific generation was unavailable. These are general question-bank questions, not matched to your selected school. ' : 'General question-bank practice. ') + 'Legacy source questions have received an editorial answer review; ambiguous items are held out. This is not educator certification or an official school paper. Difficulty labels are author tags, not calibrated exam predictions.' + (subject===Subject.NonVerbalReasoning ? ' This legacy set contains written geometry and reasoning exercises, not a diagram-based NVR simulation; use the visual subject hub for checked picture practice.' : '') + (questions.length < count ? ` Only ${questions.length} questions are available for these settings.` : '')};
};
