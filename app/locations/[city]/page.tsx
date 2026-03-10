// app/locations/[city]/page.tsx
import { redirect } from 'next/navigation';
import { UK_CITIES } from '@/lib/siteData';

interface Props { params: { city: string } }

export async function generateStaticParams() {
  return UK_CITIES.map((c) => ({ city: c.slug }));
}

export default function LocationsRedirect({ params: _ }: Props) {
  redirect('/tutors');
}
