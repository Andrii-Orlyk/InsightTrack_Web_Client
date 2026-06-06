import { PageShell } from '../components/common/PageShell';

const highlights = [
  'Dashboard summary cards and chart-ready sections',
  'Metrics table with filters and search',
  'Create and edit metric forms with validation',
  'Demo mode with MSW and live API-ready boundaries',
  'Automated tests and CI for portfolio review',
];

export function AboutPage() {
  return (
    <PageShell
      title="About InsightTrack"
      description="InsightTrack Web Client is a Strong Junior portfolio project focused on dashboard and reporting frontend skills."
    >
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Project focus</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          {highlights.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true" className="text-slate-400">
                —
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
