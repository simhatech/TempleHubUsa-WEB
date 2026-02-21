'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useUiStore } from '@/lib/stores/ui-store';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  LayoutDashboard,
  Calendar,
  Heart,
  BookOpen,
  HandHelping,
  ShoppingBag,
  Users,
  Crown,
  UserCircle,
  ShieldCheck,
  ChevronLeft,
  MapPin,
  ScrollText,
  HandHeart,
  Music,
  Video,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navSections = [
  {
    label: 'Main',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Worship & Devotion',
    items: [
      { href: '/prayers', label: 'Prayers', icon: HandHeart },
      { href: '/live-darshan', label: 'Live Darshan', icon: Video },
      { href: '/scriptures', label: 'Scriptures', icon: ScrollText },
      { href: '/bhajans', label: 'Bhajans', icon: Music },
    ],
  },
  {
    label: 'Services',
    items: [
      { href: '/my-events', label: 'My Events', icon: Calendar },
      { href: '/my-donations', label: 'My Donations', icon: Heart },
      { href: '/my-bookings', label: 'My Bookings', icon: BookOpen },
      { href: '/my-seva', label: 'My Seva', icon: HandHelping },
      { href: '/my-orders', label: 'My Orders', icon: ShoppingBag },
    ],
  },
  {
    label: 'Explore',
    items: [
      { href: '/temple-finder', label: 'Temple Finder', icon: MapPin },
    ],
  },
  {
    label: 'Account',
    items: [
      { href: '/family', label: 'Family', icon: Users },
      { href: '/membership', label: 'Membership', icon: Crown },
      { href: '/profile', label: 'Profile', icon: UserCircle },
    ],
  },
];

function SidebarContent() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const { sidebarOpen, toggleSidebar } = useUiStore();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">T</span>
          </div>
          {sidebarOpen && <span className="font-bold">TempleHubUSA</span>}
        </Link>
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden lg:flex">
          <ChevronLeft
            className={cn('h-4 w-4 transition-transform', !sidebarOpen && 'rotate-180')}
          />
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        {navSections.map((section, sIdx) => (
          <div key={section.label}>
            {sIdx > 0 && <div className="my-2 border-t" />}
            {sidebarOpen && (
              <p className="mb-1 px-3 pt-2 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {sidebarOpen && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {user?.role === 'ADMIN' && (
          <>
            <div className="my-4 border-t" />
            <Link
              href="/admin"
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                pathname.startsWith('/admin')
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <ShieldCheck className="h-4 w-4 shrink-0" />
              {sidebarOpen && <span>Admin Panel</span>}
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export function DashboardSidebar() {
  const { sidebarOpen, setSidebarOpen } = useUiStore();

  return (
    <>
      {/* Desktop */}
      <aside
        className={cn(
          'hidden border-r bg-sidebar transition-all duration-300 lg:block',
          sidebarOpen ? 'w-64' : 'w-16',
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile */}
      <Sheet open={false} onOpenChange={(open) => setSidebarOpen(open)}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
