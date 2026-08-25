import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <TopNav open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} onToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <main className="mx-auto max-w-[1600px] p-4 lg:p-8 pt-20 lg:pt-24">
        <Outlet />
      </main>
    </div>
  );
}
