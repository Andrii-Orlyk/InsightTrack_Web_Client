import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { insightTrackApi } from '../../api/insightTrackApi';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { mapApiError } from '../../lib/apiErrors';
import { queryKeys } from '../../lib/queryKeys';
import type { Metric } from '../../types/metric';
import {
  defaultMetricFormValues,
  metricFormSchema,
  type MetricFormValues,
} from './metricSchema';

const typeOptions = [
  { label: 'Count', value: 'count' },
  { label: 'Duration', value: 'duration' },
  { label: 'Currency', value: 'currency' },
  { label: 'Percentage', value: 'percentage' },
];

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Pending', value: 'pending' },
  { label: 'Archived', value: 'archived' },
];

type MetricFormProps = {
  metric?: Metric | null;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function MetricForm({ metric, onSuccess, onCancel }: MetricFormProps) {
  const queryClient = useQueryClient();
  const categoriesQuery = useQuery({
    queryKey: queryKeys.categories,
    queryFn: insightTrackApi.getCategories,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<MetricFormValues>({
    resolver: zodResolver(metricFormSchema),
    defaultValues: defaultMetricFormValues,
  });

  useEffect(() => {
    if (metric) {
      reset({
        title: metric.title,
        categoryId: metric.categoryId,
        type: metric.type,
        value: metric.value,
        unit: metric.unit,
        date: metric.date,
        note: metric.note ?? '',
        status: metric.status,
      });
    } else {
      reset(defaultMetricFormValues);
    }
  }, [metric, reset]);

  const saveMutation = useMutation({
    mutationFn: (values: MetricFormValues) =>
      metric
        ? insightTrackApi.updateMetric(metric.id, values)
        : insightTrackApi.createMetric(values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['metrics'] });
      await queryClient.invalidateQueries({ queryKey: queryKeys.dashboardSummary });
      await queryClient.invalidateQueries({ queryKey: ['reports'] });
      onSuccess?.();
      if (!metric) {
        reset(defaultMetricFormValues);
      }
    },
    onError: (error) => {
      setError('root', { message: mapApiError(error) });
    },
  });

  const categoryOptions =
    categoriesQuery.data?.map((category) => ({
      label: category.name,
      value: category.id,
    })) ?? [];

  return (
    <Card>
      <CardBody className="space-y-4">
        <CardTitle
          title={metric ? 'Edit metric' : 'Create metric'}
          description="Add or update a metric event in demo mode."
        />
        <form
          className="grid gap-4 md:grid-cols-2"
          onSubmit={handleSubmit((values) => saveMutation.mutate(values))}
          noValidate
        >
          <div className="md:col-span-2">
            <Input
              label="Title"
              required
              error={errors.title?.message}
              {...register('title')}
            />
          </div>
          <Select
            label="Category"
            required
            placeholder="Select category"
            options={categoryOptions}
            error={errors.categoryId?.message}
            {...register('categoryId')}
          />
          <Select
            label="Type"
            required
            options={typeOptions}
            error={errors.type?.message}
            {...register('type')}
          />
          <Input
            label="Value"
            type="number"
            step="any"
            required
            error={errors.value?.message}
            {...register('value', { valueAsNumber: true })}
          />
          <Input label="Unit" required error={errors.unit?.message} {...register('unit')} />
          <Input label="Date" type="date" required error={errors.date?.message} {...register('date')} />
          <Select
            label="Status"
            required
            options={statusOptions}
            error={errors.status?.message}
            {...register('status')}
          />
          <div className="md:col-span-2">
            <Textarea label="Note" error={errors.note?.message} {...register('note')} />
          </div>

          {errors.root?.message ? (
            <p className="md:col-span-2 text-sm text-red-600" role="alert">
              {errors.root.message}
            </p>
          ) : null}

          {saveMutation.isSuccess && !metric ? (
            <p className="md:col-span-2 text-sm text-emerald-700" role="status">
              Metric saved successfully.
            </p>
          ) : null}

          <div className="flex flex-wrap gap-2 md:col-span-2">
            <Button type="submit" loading={isSubmitting || saveMutation.isPending}>
              {metric ? 'Save changes' : 'Create metric'}
            </Button>
            {onCancel ? (
              <Button type="button" variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
            ) : null}
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
