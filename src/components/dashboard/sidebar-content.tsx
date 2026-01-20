'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  User, 
  Building2, 
  Map, 
  FileText, 
  Settings,
  ChevronRight,
  Compass
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
  { href: '/dashboard/companies', label: 'Companies', icon: Building2 },
  { href: '/dashboard/roadmap', label: 'Roadmap', icon: Map },
  { href: '/dashboard/resume', label: 'Resume', icon: FileText },
];

export function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
          <Compass className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold">PlacementPro</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={`w-full justify-start gap-3 ${
                  isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t border-sidebar-border p-4">
        <Button variant="ghost" className="w-full justify-start gap-3 text-sidebar-foreground">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
}
