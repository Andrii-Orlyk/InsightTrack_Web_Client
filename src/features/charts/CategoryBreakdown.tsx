import type { ReportCategoryBreakdown } from '../../types/metric';
import { EmptyState } from '../../components/feedback/EmptyState';

type CategoryBreakdownProps = {
  items: ReportCategoryBreakdown[];
};

export function CategoryBreakdown({ items }: CategoryBreakdownProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="No category data"
        description="Metrics in this period will appear grouped by category."
      />
    );
  }

  return (
    <ul className="space-y-3" aria-label="Category breakdown">
      {items.map((item) => (
        <li
          key={item.categoryId}
          className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2"
        >
          <div>
            <p className="text-sm font-medium text-slate-800">{item.category}</p>
            <p className="text-xs text-slate-500">{item.percentage}% of total</p>
          </div>
          <span className="text-sm font-semibold text-slate-900">{item.value}</span>
        </li>
      ))}
    </ul>
  );
}
