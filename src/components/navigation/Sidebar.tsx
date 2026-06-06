import { NavLinkItem } from './NavLinkItem';
import { NAV_ITEMS } from './navItems';

type SidebarProps = {
  onNavigate?: () => void;
  className?: string;
};

export function Sidebar({ onNavigate, className }: SidebarProps) {
  return (
    <aside
      aria-label="Main navigation"
      className={className}
    >
      <div className="px-3 py-4">
        <p className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Menu</p>
        <nav className="mt-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLinkItem key={item.path} item={item} onNavigate={onNavigate} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
