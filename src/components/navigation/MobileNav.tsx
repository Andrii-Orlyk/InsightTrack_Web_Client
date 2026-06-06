import { Sidebar } from './Sidebar';

type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        aria-label="Close navigation overlay"
        className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
        onClick={onClose}
      />
      <div
        id="mobile-navigation"
        className="fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 bg-white shadow-xl lg:hidden"
      >
        <Sidebar onNavigate={onClose} className="h-full overflow-y-auto pt-14" />
      </div>
    </>
  );
}
