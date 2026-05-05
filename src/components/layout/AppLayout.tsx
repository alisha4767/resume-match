import { Navbar } from "./Navbar";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#e0f2fe,transparent_35%),#f8fafc]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-5 py-8">{children}</main>
    </div>
  );
}