import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Star, TrendingUp, Calendar, Film, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/popular", label: "Popular", icon: Star },
  { to: "/top-rated", label: "Top Rated", icon: TrendingUp },
  { to: "/upcoming", label: "Upcoming", icon: Calendar },
  { to: "/favorites", label: "Favorites", icon: Heart },
] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col bg-sidebar border border-sidebar-border rounded-2xl p-4 gap-2 h-[calc(100dvh-2rem)] sticky top-4">
      <div className="flex items-center gap-2 px-2 py-3 mb-2">
        <div className="size-9 rounded-xl bg-primary flex items-center justify-center">
          <Film className="size-5 text-primary-foreground" />
        </div>
        <span className="font-bold text-lg">MovieHub</span>
      </div>
      <nav className="flex flex-col gap-1" aria-label="Main">
        {links.map((l) => {
          const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
          return (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-accent",
              )}
            >
              <l.icon className="size-4" />
              {l.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
