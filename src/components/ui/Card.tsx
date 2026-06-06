import type { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { cn } from './cn';

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn('rounded-xl border border-slate-200 bg-white shadow-sm', className)}
      {...props}
    >
      {children}
    </div>
  );
}

type CardSectionProps = PropsWithChildren<{ className?: string }>;

export function CardHeader({ children, className }: CardSectionProps) {
  return <div className={cn('border-b border-slate-100 px-4 py-3 sm:px-6', className)}>{children}</div>;
}

export function CardBody({ children, className }: CardSectionProps) {
  return <div className={cn('px-4 py-4 sm:px-6', className)}>{children}</div>;
}

export function CardFooter({ children, className }: CardSectionProps) {
  return (
    <div className={cn('border-t border-slate-100 px-4 py-3 sm:px-6', className)}>{children}</div>
  );
}

type CardTitleProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function CardTitle({ title, description, actions }: CardTitleProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  );
}
