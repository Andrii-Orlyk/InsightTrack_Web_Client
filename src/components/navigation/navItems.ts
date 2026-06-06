import type { LucideIcon } from 'lucide-react';
import { BarChart3, Home, Info, LayoutDashboard, Table2 } from 'lucide-react';

export type NavItem = {
  label: string;
  path: string;
  icon: LucideIcon;
  end?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/', icon: Home, end: true },
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Metrics', path: '/metrics', icon: Table2 },
  { label: 'Reports', path: '/reports', icon: BarChart3 },
  { label: 'About', path: '/about', icon: Info },
];

export const ROUTES = {
  home: '/',
  dashboard: '/dashboard',
  metrics: '/metrics',
  reports: '/reports',
  about: '/about',
} as const;
