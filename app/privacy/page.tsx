import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import PrivacySettingsButton from '@/components/PrivacySettingsButton';
import ClearPracticeData from '@/components/ClearPracticeData';

export const metadata: Metadata = {
  title: 'Privacy and Cookie Policy',
  description: 'How 11 Plus Exam Papers handles enquiries, browser-saved practice and optional analytics, and how to manage your data.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return <div className="min-h-screen bg-white"><SiteNav /><main id="main-content" className="mx-auto max-w-3xl px-4 py-14 text-slate-700">
    <h1 className="text-4xl font-semibold text-emerald-950">Privacy and cookie policy</h1>
    <p className="mt-4 text-sm">Updated 2 November 2026</p>
    <p className="mt-6 leading-7">11 Plus Exam Papers is responsible for the information collected through this website. Contact <a className="underline" href="mailto:hello@11plusexampapers.com">hello@11plusexampapers.com</a> with privacy questions or requests. You can use the lessons, download papers and start practice without creating an account or giving a child’s name or a parent’s email address.</p>
    <section className="mt-9 space-y-4 leading-7"><h2 className="text-2xl font-semibold text-emerald-950">For children, parents and carers</h2>
      <p>Children can practise without submitting contact information. Enquiry and email-resource forms are for parents and carers. Please do not include a child’s full name, health information, date of birth or other sensitive information in a message. Optional analytics is off until someone chooses to allow it.</p>
    </section>
    <section className="mt-9 space-y-4 leading-7"><h2 className="text-2xl font-semibold text-emerald-950">Information you send us</h2>
      <p>If you request tutor support, we use the parent or carer’s name and email, and any optional phone number, year group, target school or notes supplied, to deal with that enquiry and its follow-up. If you request emailed resources, we use your email address and optional target-school information to send the updates you requested. You can ask us to stop by emailing the address above.</p>
      <p>Enquiries are sent through the website’s server to a Google Apps Script endpoint used to handle enquiry records. We use Vercel to host and deliver the site. These providers process information to provide their services. We do not include submitted contact details in our application’s enquiry logs or send them to analytics.</p>
      <p>We use enquiry details to take the steps you requested before providing a service and for our legitimate interest in answering questions and maintaining those records. Requested email updates rely on your choice to receive them; submitting a tutor enquiry does not sign you up for those updates. We keep enquiry information for as long as needed to handle the request and related follow-up, or to meet a legal requirement. You can contact us about access or deletion.</p>
    </section>
    <section className="mt-9 space-y-4 leading-7"><h2 className="text-2xl font-semibold text-emerald-950">Practice saved on your device</h2>
      <p>Supported quizzes save an unfinished attempt and up to 20 recent results in this browser’s local storage so you can resume and review mistakes. This includes questions, chosen answers, scores and timing. It is not an online account and is not sent to Google Analytics. Anyone using the same browser profile may be able to see it.</p>
      <ul className="list-disc space-y-2 pl-6"><li><strong>Active practice:</strong> an attempt more than seven days old cannot be resumed.</li><li><strong>Attempt history:</strong> the latest 20 saved results stay until removed or the browser’s site data is cleared.</li><li><strong>Written practice:</strong> text typed into writing activities stays in the current page session; it is not submitted to us for marking.</li></ul>
      <p>The button below removes saved practice and contact details that an older version of the site may have stored on this browser. It does not delete an enquiry already sent to us; contact us for that.</p>
      <ClearPracticeData />
    </section>
    <section className="mt-9 space-y-4 leading-7"><h2 className="text-2xl font-semibold text-emerald-950">Optional analytics and cookies</h2>
      <p>With your permission, Google Analytics measures visits, resource downloads and use of practice features. We send the page path and general action, such as starting or completing practice, without answers, scores, names, email addresses or form text. We remove query strings and fragments from the page addresses we send. Google also receives technical connection information when its service is loaded.</p>
      <p>The site does not load the Google Analytics tag until you choose “Allow analytics”. Our configuration disables Google signals and advertising personalisation. Analytics may use cookies starting with <code>_ga</code>; we set their lifetime to 180 days. The separate browser setting <code>11plus-analytics-consent-v1</code> remembers your choice for 180 days. Essential browser storage supports your requested practice and privacy settings.</p>
      <p>You can choose “Essential only” or withdraw analytics permission at any time. This stops our analytics events and removes accessible Google Analytics cookies for this site. It does not remove data already received by Google. All learning resources remain available.</p>
      <PrivacySettingsButton />
      <p>Google and Vercel may process information outside the UK as described in their privacy information: <a className="underline" href="https://policies.google.com/privacy">Google privacy policy</a> and <a className="underline" href="https://vercel.com/legal/privacy-policy">Vercel privacy policy</a>. Hosting providers may keep technical request and security logs to operate and protect their services.</p>
    </section>
    <section className="mt-9 space-y-4 leading-7"><h2 className="text-2xl font-semibold text-emerald-950">Your choices and rights</h2>
      <p>You can ask about personal information we hold and request access, correction or deletion. Depending on the circumstances, you can also ask us to restrict its use, object to processing or request a portable copy. Contact us using the email above; we may need to confirm who is making the request. You can also raise a concern with the <a className="underline" href="https://ico.org.uk/make-a-complaint/">UK Information Commissioner’s Office</a>.</p>
      <p>Links to schools and other websites take you to services with their own privacy policies. We will update this page when our handling of data changes. See also our <Link className="underline" href="/terms">terms of use</Link>.</p>
    </section>
  </main><SiteFooter /></div>;
}
