import { Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { EmptyState } from "../components/common/EmptyState";
import { useAnalyzerStore } from "../features/analyzer/analyzer.store";
import { formatDate } from "../utils/date";

type SortOption = "newest" | "oldest" | "highest" | "lowest";

function getScoreTone(score: number) {
  if (score >= 75) return "green";
  if (score >= 45) return "yellow";
  return "red";
}

export function DashboardPage() {
  const analyses = useAnalyzerStore((state) => state.analyses);
  const clearAnalyses = useAnalyzerStore((state) => state.clearAnalyses);
  const removeAnalysis = useAnalyzerStore((state) => state.removeAnalysis);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const filteredAnalyses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const results = analyses.filter((analysis) =>
      analysis.roleTitle.toLowerCase().includes(query)
    );

    return [...results].sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }

      if (sortBy === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }

      if (sortBy === "highest") {
        return b.score - a.score;
      }

      return a.score - b.score;
    });
  }, [analyses, searchQuery, sortBy]);

  if (analyses.length === 0) {
    return (
      <EmptyState
        title="No analyses yet"
        description="Run your first resume analysis and saved reports will appear here."
        actionLabel="Analyze resume"
        actionHref="/analyze"
      />
    );
  }

  const averageScore = Math.round(
    analyses.reduce((total, analysis) => total + analysis.score, 0) /
      analyses.length
  );

  const bestScore = Math.max(...analyses.map((analysis) => analysis.score));

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Dashboard
          </h1>

          <p className="mt-1 text-slate-600">
            Track, search, and compare your saved resume reports.
          </p>
        </div>

        <Button variant="secondary" onClick={clearAnalyses}>
          Clear reports
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm text-slate-500">Saved reports</p>
          <p className="mt-2 text-4xl font-bold text-slate-950">
            {analyses.length}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-slate-500">Average score</p>
          <p className="mt-2 text-4xl font-bold text-slate-950">
            {averageScore}%
          </p>
        </Card>

        <Card>
          <p className="text-sm text-slate-500">Best score</p>
          <p className="mt-2 text-4xl font-bold text-slate-950">
            {bestScore}%
          </p>
        </Card>
      </div>

      <Card>
        <div className="grid gap-4 md:grid-cols-[1fr_220px]">
          <label className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by role title..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none ring-blue-500 transition focus:ring-2"
            />
          </label>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortOption)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none ring-blue-500 transition focus:ring-2"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="highest">Highest score</option>
            <option value="lowest">Lowest score</option>
          </select>
        </div>
      </Card>

      {filteredAnalyses.length === 0 ? (
        <Card className="text-center">
          <h2 className="text-xl font-semibold text-slate-950">
            No matching reports
          </h2>
          <p className="mt-2 text-slate-600">
            Try a different search term or clear the search box.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredAnalyses.map((analysis) => (
            <Card
              key={analysis.id}
              className="transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <Link to={`/results/${analysis.id}`} className="min-w-0 flex-1">
                  <h2 className="text-xl font-semibold text-slate-950">
                    {analysis.roleTitle}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Created on {formatDate(analysis.createdAt)}
                  </p>
                </Link>

                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone={getScoreTone(analysis.score)}>
                    {analysis.score}% match
                  </Badge>

                  <span className="text-sm text-slate-500">
                    {analysis.missingKeywords.length} missing keywords
                  </span>

                  <Button
                    variant="ghost"
                    onClick={() => removeAnalysis(analysis.id)}
                    aria-label={`Delete ${analysis.roleTitle}`}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}