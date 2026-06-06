export function formatMetricValue(value: number, unit: string): string {
  const formatted = Number.isInteger(value) ? value.toString() : value.toFixed(1);
  return unit ? `${formatted} ${unit}` : formatted;
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatPercent(value: number): string {
  return `${value > 0 ? '+' : ''}${value}%`;
}
