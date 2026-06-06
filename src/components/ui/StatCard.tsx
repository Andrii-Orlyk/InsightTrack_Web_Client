import type { ReactNode } from 'react';
import { cn } from './cn';
import { Card, CardBody } from './Card';

type StatTrend = {
  label: string;
  direction?: 'up' | 'down' | 'neutral';
};

type StatCardProps = {
  label: string;
  value: ReactNode;
  hint?: string;
  trend?: StatTrend;
  icon?: ReactNode;
  className?: string;
};

const trendClasses: Record<NonNullable<StatTrend['direction']>, string> = {
  up: 'text-emerald-700',
  down: 'text-red-700',
  neutral: 'text-slate-500',
};

export function StatCard({ label, value, hint, trend, icon, className }: StatCardProps) {
  return (
    <Card className={className}>
      <CardBody className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-medium text-slate-500">{label}</p>
          {icon ? <div className="text-slate-400">{icon}</div> : null}
        </div>
        <p className="text-2xl font-semibold text-slate-900">{value}</p>
        {trend ? (
          <p className={cn('text-xs font-medium', trendClasses[trend.direction ?? 'neutral'])}>
            {trend.label}
          </p>
        ) : null}
        {hint ? <p className="text-xs text-slate-400">{hint}</p> : null}
      </CardBody>
    </Card>
  );
}
