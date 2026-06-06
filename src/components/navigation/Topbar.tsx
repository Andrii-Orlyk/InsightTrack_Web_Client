import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from './navItems';

type TopbarProps = {
  isMobileNavOpen: boolean;
  onToggleMobileNav: () => void;
};

export function Topbar({ isMobileNavOpen, onToggleMobileNav }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="flex h-14 items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 lg:hidden"
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={onToggleMobileNav}
          >
            {isMobileNavOpen ? <X aria-hidden="true" className="h-4 w-4" /> : <Menu aria-hidden="true" className="h-4 w-4" />}
          </button>
          <Link
            to={ROUTES.dashboard}
            className="text-base font-semibold text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            InsightTrack
          </Link>
        </div>
        <span className="hidden text-sm text-slate-500 sm:inline">Dashboard reporting frontend</span>
      </div>
    </header>
  );
}
