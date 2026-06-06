import { PageShell } from '../components/common/PageShell';
import {
  DashboardRecentMetrics,
  DashboardSummaryCards,
  DashboardTrendSection,
} from '../features/dashboard';

export function DashboardPage() {
  return (
    <PageShell
      title="Dashboard"
      description="Overview of metrics, trends, and recent activity from the demo dataset."
    >
      <div className="space-y-8">
        <DashboardSummaryCards />
        <DashboardTrendSection />
        <DashboardRecentMetrics />
      </div>
    </PageShell>
  );
}
