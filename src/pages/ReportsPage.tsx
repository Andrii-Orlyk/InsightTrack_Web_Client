import { PageShell } from '../components/common/PageShell';
import { ReportsSummaryPanel } from '../features/charts';

export function ReportsPage() {
  return (
    <PageShell
      title="Reports"
      description="Daily, weekly, and monthly reporting views with chart-ready demo summaries."
    >
      <ReportsSummaryPanel />
    </PageShell>
  );
}
