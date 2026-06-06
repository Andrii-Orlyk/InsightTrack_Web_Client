import { Link } from 'react-router-dom';
import { PageShell } from '../components/common/PageShell';
import { ROUTES } from '../components/navigation/navItems';

export function NotFoundPage() {
  return (
    <PageShell
      title="Page not found"
      description="The page you requested does not exist or may have moved."
    >
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">
          Return to the{' '}
          <Link to={ROUTES.dashboard} className="font-medium text-slate-900 underline-offset-2 hover:underline">
            dashboard
          </Link>{' '}
          or{' '}
          <Link to={ROUTES.home} className="font-medium text-slate-900 underline-offset-2 hover:underline">
            home page
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
