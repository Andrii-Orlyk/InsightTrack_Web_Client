import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from './cn';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';

type BadgeProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    variant?: BadgeVariant;
  }
>;

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  warning: 'bg-amber-50 text-amber-800 ring-1 ring-amber-200',
  error: 'bg-red-50 text-red-700 ring-1 ring-red-200',
  info: 'bg-sky-50 text-sky-700 ring-1 ring-sky-200',
  outline: 'bg-white text-slate-700 ring-1 ring-slate-200',
};

export function Badge({ children, className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
