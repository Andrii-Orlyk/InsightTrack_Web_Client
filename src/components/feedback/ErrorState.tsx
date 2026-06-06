import type { ReactNode } from 'react';
import { Button } from '../ui/Button';
import { cn } from '../ui/cn';

type ErrorStateProps = {
  title?: string;
  description: string;
  onRetry?: () => void;
  retryLabel?: string;
  action?: ReactNode;
  className?: string;
};

export function ErrorState({
  title = 'Something went wrong',
  description,
  onRetry,
  retryLabel = 'Try again',
  action,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn('rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center', className)}
      role="alert"
    >
      <h3 className="text-sm font-semibold text-red-800">{title}</h3>
      <p className="mt-2 text-sm text-red-700">{description}</p>
      {onRetry ? (
        <div className="mt-4">
          <Button variant="secondary" size="sm" onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
