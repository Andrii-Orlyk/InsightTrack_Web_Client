import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import type { NavItem } from './navItems';

type NavLinkItemProps = {
  item: NavItem;
  onNavigate?: () => void;
  className?: string;
};

export function NavLinkItem({ item, onNavigate, className }: NavLinkItemProps) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        twMerge(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900',
          isActive
            ? 'bg-slate-900 text-white'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
          className
        )
      }
    >
      <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
      <span>{item.label}</span>
    </NavLink>
  );
}
