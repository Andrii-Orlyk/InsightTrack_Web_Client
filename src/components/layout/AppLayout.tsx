import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { MobileNav } from '../navigation/MobileNav';
import { Sidebar } from '../navigation/Sidebar';
import { Topbar } from '../navigation/Topbar';

export function AppLayout() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const closeMobileNav = () => setIsMobileNavOpen(false);
  const toggleMobileNav = () => setIsMobileNavOpen((open) => !open);

  return (
    <div className="min-h-screen bg-slate-50">
      <Topbar isMobileNavOpen={isMobileNavOpen} onToggleMobileNav={toggleMobileNav} />
      <MobileNav isOpen={isMobileNavOpen} onClose={closeMobileNav} />

      <div className="mx-auto flex w-full max-w-7xl">
        <Sidebar className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block" />
        <main id="main-content" className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
