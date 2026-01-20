'use client';
import { SidebarContent } from './sidebar-content';

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar hidden md:block">
      <SidebarContent />
    </aside>
  );
}
