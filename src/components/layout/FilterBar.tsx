import type { PropsWithChildren, ReactNode } from 'react';
import { cn } from '../ui/cn';

type FilterBarProps = PropsWithChildren<{
  title?: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}>;

export function FilterBar({ title, description, actions, children, className }: FilterBarProps) {
  return (
    <section
      aria-label={title ?? 'Filters'}
      className={cn('rounded-xl border border-slate-200 bg-white p-4 shadow-sm', className)}
    >
      {title || description || actions ? (
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title ? <h2 className="text-sm font-semibold text-slate-900">{title}</h2> : null}
            {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
          </div>
          {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
        </div>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
    </section>
  );
}
