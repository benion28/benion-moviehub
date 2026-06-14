import { Link, useNavigate } from "@tanstack/react-router";
import { Search, SlidersHorizontal, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function Header() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/search", search: { q: q.trim() } });
  };

  return (
    <header className="flex items-center gap-3 mb-6">
      <form onSubmit={onSubmit} className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search movies..."
          aria-label="Search movies"
          className="w-full h-12 pl-11 pr-4 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </form>
      <Button asChild size="lg" className="h-12 px-5 rounded-xl">
        <Link to="/search" search={{ q: "" }}>
          <SlidersHorizontal className="size-4" />
          Filters
        </Link>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="h-12 w-12 rounded-xl"
      >
        {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </Button>
    </header>
  );
}
