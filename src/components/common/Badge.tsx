import { clsx } from "clsx";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "green" | "yellow" | "red" | "blue" | "gray";
};

const tones = {
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  yellow: "bg-amber-50 text-amber-700 ring-amber-200",
  red: "bg-rose-50 text-rose-700 ring-rose-200",
  blue: "bg-blue-50 text-blue-700 ring-blue-200",
  gray: "bg-slate-100 text-slate-700 ring-slate-200",
};

export function Badge({ children, tone = "gray" }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex rounded-full px-3 py-1 text-xs font-medium ring-1",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}