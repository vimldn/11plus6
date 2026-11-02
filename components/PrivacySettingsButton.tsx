'use client';
import { openPrivacySettings } from '@/lib/analytics';

export default function PrivacySettingsButton() {
  return <button type="button" className="underline underline-offset-4" onClick={openPrivacySettings}>Cookie settings</button>;
}
