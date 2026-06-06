import type { PropsWithChildren, ReactNode } from 'react';

type PageShellProps = PropsWithChildren<{
  title: string;
  description?: string;
  actions?: ReactNode;
}>;

export function PageShell({ title, description, actions, children }: PageShellProps) {
  return (
    <section aria-labelledby="page-title" className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 id="page-title" className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            {title}
          </h1>
          {description ? <p className="mt-2 max-w-3xl text-slate-600">{description}</p> : null}
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}
