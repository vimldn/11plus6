import { Subject, Question, SchoolType, QuizType } from '../types';
import { getRandomQuestions } from '../data/questionBank';
import { validateGeneratedQuestions } from '../lib/questionValidation';

type Difficulty = 'standard' | 'challenging' | 'exam-ready';
export type QuestionBatch = { questions: Question[]; notice: string };
// The current server uses written blueprint summaries, not uploaded PDF contents.
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
        if (data.meta?.source === 'openai' || data.meta?.source === 'claude') {
          return {questions:validateGeneratedQuestions(data.questions,count,quizType),notice:'AI-generated practice using a written school summary. Original uploaded papers are not read by this generator. Answers have structural checks but have not been independently verified. This is not an official paper or a verified 2027 school specification.'};
        }
      }
    } catch { /* Transparent local fallback below, without claiming school alignment. */ }
  }
  const questions = getRandomQuestions(subject,quizType,count,topic,difficulty);
  return {questions,notice:(schoolId ? 'School-specific generation was unavailable. These are general question-bank questions, not matched to your selected school. ' : 'General question-bank practice. ') + 'The full legacy bank has not yet completed independent answer review. Difficulty labels are author tags, not calibrated exam predictions.' + (questions.length < count ? ` Only ${questions.length} questions are available for these settings.` : '')};
};
