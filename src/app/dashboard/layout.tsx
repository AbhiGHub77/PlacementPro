'use client';

import { Sidebar } from '@/components/dashboard/sidebar';
import { UserNav } from '@/components/auth/user-nav';
import { MobileNav } from '@/components/dashboard/mobile-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="md:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/80 px-4 md:justify-end md:px-8 backdrop-blur-xl">
          <MobileNav />
          <UserNav />
        </header>
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
