import { Link } from 'react-router-dom';
import { PageShell } from '../components/common/PageShell';
import { ROUTES } from '../components/navigation/navItems';

const features = [
  'Dashboard summary cards and KPI overview',
  'Metrics table with filters and search',
  'Create and edit forms with validation',
  'Chart-ready reports and trend sections',
  'Loading, empty, and error UI states',
  'Responsive layout for mobile and desktop',
];

export function HomePage() {
  return (
    <PageShell
      title="InsightTrack Web Client"
      description="A dashboard and reporting frontend portfolio project built with React, TypeScript, and a demo-first workflow."
      actions={
        <Link
          to={ROUTES.dashboard}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          Open dashboard
        </Link>
      }
    >
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Portfolio frontend</p>
        <p className="mt-3 max-w-3xl text-slate-600">
          Use the navigation to explore the application shell. Dashboard data, tables, filters, and
          forms will be implemented in upcoming phases.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature} className="rounded-xl border border-slate-200 p-4 text-sm text-slate-700">
              {feature}
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
