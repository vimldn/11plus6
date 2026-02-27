import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Visible breadcrumb navigation.
 *
 * Usage:
 *   <Breadcrumbs items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Schools', href: '/schools' },
 *     { label: 'QE Barnet' },            // last item — no href = current page
 *   ]} />
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={11} className="text-slate-300 shrink-0" />}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-indigo-600 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-slate-400 font-medium" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
