import type { HTMLAttributes, PropsWithChildren, ReactNode, ThHTMLAttributes, TdHTMLAttributes } from 'react';
import { cn } from './cn';
import { LoadingState } from '../feedback/LoadingState';

type TableProps = PropsWithChildren<HTMLAttributes<HTMLTableElement>>;

export function Table({ children, className, ...props }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className={cn('min-w-full divide-y divide-slate-200 text-sm', className)} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn('bg-slate-50', className)} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn('divide-y divide-slate-100 bg-white', className)} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn('transition hover:bg-slate-50/80', className)} {...props}>
      {children}
    </tr>
  );
}

export function TableHead({ children, className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      scope="col"
      className={cn('px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500', className)}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableCell({ children, className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn('px-4 py-3 text-slate-700', className)} {...props}>
      {children}
    </td>
  );
}

type TableShellProps = {
  children: ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
  loadingMessage?: string;
  emptyState?: ReactNode;
  caption?: string;
  className?: string;
};

export function TableShell({
  children,
  isLoading = false,
  isEmpty = false,
  loadingMessage = 'Loading table data...',
  emptyState,
  caption,
  className,
}: TableShellProps) {
  if (isLoading) {
    return (
      <div className={cn('rounded-xl border border-slate-200 bg-white p-6', className)}>
        <LoadingState message={loadingMessage} />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className={cn('rounded-xl border border-slate-200 bg-white', className)}>
        {emptyState}
      </div>
    );
  }

  return (
    <div className={className}>
      <Table>
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        {children}
      </Table>
    </div>
  );
}
