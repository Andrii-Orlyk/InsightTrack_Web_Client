export function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="flex min-h-[40vh] items-center justify-center"
    >
      <div className="flex flex-col items-center gap-3 text-sm text-slate-600">
        <span
          aria-hidden="true"
          className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900"
        />
        <span>Loading page...</span>
      </div>
    </div>
  );
}
