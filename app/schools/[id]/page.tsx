// Server component — handles metadata + schema injection
// The actual UI is in SchoolPageClient (client component)
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SCHOOLS } from '@/lib/schools';
import { schoolPageSchema } from '@/lib/schemas';
import { SchemaOrg } from '@/components/SchemaOrg';
import SchoolPageClient from './SchoolPageClient';
import catalog from '@/data/schools.catalog.json';

interface Props { params: { id: string } }

export async function generateStaticParams() {
  return (catalog as { id: string }[]).map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const school = SCHOOLS.find((s) => s.id === params.id);
  if (!school) return {};

  const s = school as any;
  const city: string = s.location?.city ?? 'UK';
  const area: string = s.location?.area ?? city;
  const description = `${school.name} 11+ admissions guide. Exam format, key dates, subjects tested and free themed mock exams to help your child prepare for entrance.`;

  return {
    title: `${school.name} — 11+ Admissions & Mock Exams`,
    description,
    alternates: { canonical: `/schools/${school.id}` },
    openGraph: {
      title: `${school.name} — 11+ Admissions`,
      description,
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${school.name} — 11+ Admissions & Mock Exams`,
      description,
    },
  };
}

export default function SchoolPage({ params }: Props) {
  const school = SCHOOLS.find((s) => s.id === params.id);
  if (!school) notFound();

  const s = school as any;
  const city: string = s.location?.city ?? 'UK';

  const schema = schoolPageSchema({
    id: school.id,
    name: school.name,
    description: `${school.name} 11+ admissions guide. Exam format, key dates, subjects tested and free themed mock exams to help your child prepare for entrance.`,
    city,
    category: school.category,
    admissionsUrl: undefined,
  });

  return (
    <>
      <SchemaOrg data={schema} />
      <SchoolPageClient params={params} />
    </>
  );
}
