import { z } from 'zod';

export const metricFormSchema = z.object({
  title: z.string().trim().min(1, 'Title is required.'),
  categoryId: z.string().min(1, 'Category is required.'),
  type: z.enum(['count', 'duration', 'currency', 'percentage']),
  value: z.number().positive('Value must be greater than zero.'),
  unit: z.string().trim().min(1, 'Unit is required.'),
  date: z.string().min(1, 'Date is required.'),
  note: z.string().optional(),
  status: z.enum(['active', 'pending', 'archived']),
});

export type MetricFormValues = z.infer<typeof metricFormSchema>;

export const defaultMetricFormValues: MetricFormValues = {
  title: '',
  categoryId: '',
  type: 'count',
  value: 1,
  unit: '',
  date: new Date().toISOString().slice(0, 10),
  note: '',
  status: 'active',
};
