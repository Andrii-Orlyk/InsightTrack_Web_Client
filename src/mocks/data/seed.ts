import type { Category, Metric } from '../../types/metric';

export const seedCategories: Category[] = [
  { id: 'cat-health', name: 'Health', color: '#059669', label: 'Health' },
  { id: 'cat-finance', name: 'Finance', color: '#2563eb', label: 'Finance' },
  { id: 'cat-learning', name: 'Learning', color: '#7c3aed', label: 'Learning' },
  { id: 'cat-work', name: 'Work', color: '#ea580c', label: 'Work' },
];

export const seedMetrics: Metric[] = [
  {
    id: 'metric-1',
    title: 'Morning run',
    categoryId: 'cat-health',
    category: 'Health',
    type: 'duration',
    value: 35,
    unit: 'min',
    date: '2026-06-01',
    note: 'Easy pace recovery run',
    status: 'active',
  },
  {
    id: 'metric-2',
    title: 'Weekly budget review',
    categoryId: 'cat-finance',
    category: 'Finance',
    type: 'currency',
    value: 120,
    unit: 'USD',
    date: '2026-06-02',
    status: 'active',
  },
  {
    id: 'metric-3',
    title: 'TypeScript course',
    categoryId: 'cat-learning',
    category: 'Learning',
    type: 'duration',
    value: 90,
    unit: 'min',
    date: '2026-06-02',
    note: 'Generics and utility types',
    status: 'active',
  },
  {
    id: 'metric-4',
    title: 'Standup attendance',
    categoryId: 'cat-work',
    category: 'Work',
    type: 'count',
    value: 5,
    unit: 'days',
    date: '2026-06-03',
    status: 'pending',
  },
  {
    id: 'metric-5',
    title: 'Water intake',
    categoryId: 'cat-health',
    category: 'Health',
    type: 'count',
    value: 8,
    unit: 'glasses',
    date: '2026-06-03',
    status: 'active',
  },
  {
    id: 'metric-6',
    title: 'Savings transfer',
    categoryId: 'cat-finance',
    category: 'Finance',
    type: 'currency',
    value: 250,
    unit: 'USD',
    date: '2026-06-04',
    status: 'active',
  },
  {
    id: 'metric-7',
    title: 'Reading session',
    categoryId: 'cat-learning',
    category: 'Learning',
    type: 'duration',
    value: 45,
    unit: 'min',
    date: '2026-06-04',
    status: 'archived',
  },
  {
    id: 'metric-8',
    title: 'Focus blocks completed',
    categoryId: 'cat-work',
    category: 'Work',
    type: 'count',
    value: 4,
    unit: 'blocks',
    date: '2026-06-05',
    status: 'active',
  },
];

export function cloneSeedMetrics(): Metric[] {
  return seedMetrics.map((metric) => ({ ...metric }));
}

export function cloneSeedCategories(): Category[] {
  return seedCategories.map((category) => ({ ...category }));
}
