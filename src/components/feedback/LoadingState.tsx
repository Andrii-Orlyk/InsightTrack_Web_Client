import { cn } from '../ui/cn';

type LoadingStateProps = {
  message?: string;
  size?: 'sm' | 'md';
  className?: string;
};

export function LoadingState({ message = 'Loading...', size = 'md', className }: LoadingStateProps) {
  const spinnerSize = size === 'sm' ? 'h-5 w-5' : 'h-8 w-8';

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn('flex flex-col items-center justify-center gap-3 text-sm text-slate-600', className)}
    >
      <span
        aria-hidden="true"
        className={cn('animate-spin rounded-full border-2 border-slate-200 border-t-slate-900', spinnerSize)}
      />
      <span>{message}</span>
    </div>
  );
}
