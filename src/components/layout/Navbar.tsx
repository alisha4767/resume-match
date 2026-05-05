import { Link, NavLink } from "react-router";
import { BarChart3 } from "lucide-react";
import { clsx } from "clsx";

const links = [
  { label: "Home", to: "/" },
  { label: "Analyze", to: "/analyze" },
  { label: "Dashboard", to: "/dashboard" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="grid size-9 place-items-center rounded-xl bg-slate-950 text-white">
            <BarChart3 size={18} />
          </span>
          ResumeMatch
        </Link>

        <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                clsx(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-600 hover:text-slate-950"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}