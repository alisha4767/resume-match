import { Link } from "react-router";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { Badge } from "../components/common/Badge";
import { useAnalyzerStore } from "../features/analyzer/analyzer.store";

export function DashboardPage() {
  const analyses = useAnalyzerStore((state) => state.analyses);
  const clearAnalyses = useAnalyzerStore((state) => state.clearAnalyses);

  if (analyses.length === 0) {
    return (
      <Card className="text-center">
        <h1 className="text-3xl font-bold text-slate-950">
          No analyses yet
        </h1>
        <p className="mt-2 text-slate-600">
          Run your first resume analysis and your reports will appear here.
        </p>

        <Link to="/analyze" className="mt-6 inline-block">
          <Button>Analyze resume</Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Dashboard</h1>
          <p className="mt-1 text-slate-600">
            Compare your saved resume match reports.
          </p>
        </div>

        <Button variant="secondary" onClick={clearAnalyses}>
          Clear reports
        </Button>
      </div>

      <div className="grid gap-4">
        {analyses.map((analysis) => (
          <Link key={analysis.id} to={`/results/${analysis.id}`}>
            <Card className="transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">
                    {analysis.roleTitle}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {new Date(analysis.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Badge tone={analysis.score >= 70 ? "green" : "yellow"}>
                    {analysis.score}% match
                  </Badge>
                  <span className="text-sm text-slate-500">
                    {analysis.missingKeywords.length} missing
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}