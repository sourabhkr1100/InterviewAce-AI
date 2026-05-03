"use client";

import { Database, LayoutDashboard, LogOut, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Manage Users", icon: Users },
    { href: "/admin/questions", label: "Question Banks", icon: Database },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <aside className="w-full md:w-64 border-r border-border/50 bg-card/30 backdrop-blur-xl flex-shrink-0 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border/50">
          <Link href="/" className="font-bold text-lg tracking-tight flex items-center gap-2">
            <span className="text-primary">Admin</span> Panel
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/50">
          <Link href="/dashboard" className="flex items-center justify-center gap-2 px-3 py-2.5 w-full rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:text-foreground transition-all">
            <LogOut className="w-4 h-4" />
            Exit Admin
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 md:p-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
