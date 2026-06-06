import type { MetricFilters, MetricType } from '../../types/metric';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { FilterBar } from '../../components/layout/FilterBar';
import type { Category } from '../../types/metric';

const typeOptions = [
  { label: 'All types', value: '' },
  { label: 'Count', value: 'count' },
  { label: 'Duration', value: 'duration' },
  { label: 'Currency', value: 'currency' },
  { label: 'Percentage', value: 'percentage' },
];

type MetricsFiltersProps = {
  filters: MetricFilters;
  categories: Category[];
  onChange: (filters: MetricFilters) => void;
};

export function MetricsFilters({ filters, categories, onChange }: MetricsFiltersProps) {
  const categoryOptions = [
    { label: 'All categories', value: '' },
    ...categories.map((category) => ({ label: category.name, value: category.id })),
  ];

  const update = (patch: Partial<MetricFilters>) => {
    onChange({ ...filters, ...patch });
  };

  return (
    <FilterBar title="Filters" description="Search and narrow metrics by category, type, and date.">
      <Input
        label="Search"
        placeholder="Search by title or note"
        value={filters.search ?? ''}
        onChange={(event) => update({ search: event.target.value })}
      />
      <Select
        label="Category"
        options={categoryOptions}
        value={filters.categoryId ?? ''}
        onChange={(event) => update({ categoryId: event.target.value || undefined })}
      />
      <Select
        label="Type"
        options={typeOptions}
        value={filters.type ?? ''}
        onChange={(event) => update({ type: (event.target.value as MetricType | '') || undefined })}
      />
      <Input
        label="From date"
        type="date"
        value={filters.from ?? ''}
        onChange={(event) => update({ from: event.target.value || undefined })}
      />
      <Input
        label="To date"
        type="date"
        value={filters.to ?? ''}
        onChange={(event) => update({ to: event.target.value || undefined })}
      />
    </FilterBar>
  );
}
