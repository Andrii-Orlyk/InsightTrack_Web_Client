import type { ReportTrendItem } from '../../types/metric';
import { EmptyState } from '../../components/feedback/EmptyState';

type TrendBarsProps = {
  items: ReportTrendItem[];
  emptyMessage?: string;
};

export function TrendBars({ items, emptyMessage = 'No trend data available.' }: TrendBarsProps) {
  if (items.length === 0) {
    return <EmptyState title="No data" description={emptyMessage} />;
  }

  const maxValue = Math.max(...items.map((item) => item.value), 1);

  return (
    <ul className="space-y-3" aria-label="Trend bars">
      {items.map((item) => {
        const width = `${Math.round((item.value / maxValue) * 100)}%`;
        return (
          <li key={item.label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">{item.label}</span>
              <span className="text-slate-500">{item.value}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-slate-900 transition-all"
                style={{ width }}
                role="presentation"
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
