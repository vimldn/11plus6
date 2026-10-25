import { schoolPaperEvidence } from '@/data/schoolPaperEvidence';
import { NextResponse } from 'next/server';
import { SCHOOLS } from '@/lib/schools';

export async function GET() {
  // Public metadata only. Source PDFs are server-only and never exposed to users.
  const schools = SCHOOLS.map((s) => {
    const availableSubjects = ['maths', 'english'] as const;
    const defaultSubject = 'maths';

    const defaults = {
      mathsOnly: {durationMins:45,questionCount:25},
      englishOnly: {durationMins:45,questionCount:25},
    };


    return {
      id: s.id,
      name: s.name,
      category: s.category,
      summary: schoolPaperEvidence[s.id]?.format || 'General skill practice only. No current school-paper specification has been verified here.',
      assessmentEvidence: schoolPaperEvidence[s.id] || null,
      // Available general practice subjects, not a school-syllabus assertion
      availableSubjects,
      defaultSubject,
      // Raw catalog subjects — used by frontend when blueprint is absent
      subjects: (s as any).subjects ?? [],
      defaults,
      settingsArePracticeDefaults: true,
      verifiedSchoolSimulation: false,
      quizTypes: {
        maths: 'multiple-choice',
        english: 'multiple-choice',
      },
    };
  });

  return NextResponse.json({ schools });
}
