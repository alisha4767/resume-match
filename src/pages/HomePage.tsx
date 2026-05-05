import { Link } from "react-router";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";

const features = [
  "ATS-style keyword matching",
  "Missing skill detection",
  "Saved job comparisons",
  "Visual dashboard",
];

export function HomePage() {
  return (
    <div className="grid items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr]">
      <section>
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
          <Sparkles size={16} className="text-blue-600" />
          Resume-ready React project
        </div>

        <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-tight text-slate-950 md:text-6xl">
          Analyze your resume against real job descriptions.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          ResumeMatch helps job seekers find missing keywords, improve their
          resume, and track job-specific match scores with a clean dashboard.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/analyze">
            <Button>
              Start analysis
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>

          <Link to="/dashboard">
            <Button variant="secondary">View dashboard</Button>
          </Link>
        </div>
      </section>

      <Card className="relative overflow-hidden">
        <div className="absolute right-6 top-6 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          Live preview
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-sm text-slate-500">Match score</p>
            <p className="mt-2 text-6xl font-bold text-slate-950">82%</p>
          </div>

          <div className="h-3 rounded-full bg-slate-100">
            <div className="h-3 w-[82%] rounded-full bg-slate-950" />
          </div>

          <div className="grid gap-3 pt-4">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4"
              >
                <CheckCircle2 className="text-emerald-500" size={20} />
                <span className="font-medium text-slate-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}