import { Download, Plus } from "lucide-react";
import { Link, useParams } from "react-router";
import { KeywordList } from "../components/analyzer/KeywordList";
import { MatchSummary } from "../components/analyzer/MatchSummary";
import { SkillChart } from "../components/analyzer/SkillChart";
import { SuggestionsList } from "../components/analyzer/SuggestionsList";
import { Button } from "../components/common/Button";
import { useAnalyzerStore } from "../features/analyzer/analyzer.store";

export function ResultsPage() {
  const { analysisId } = useParams();

  const result = useAnalyzerStore((state) =>
    analysisId ? state.getAnalysisById(analysisId) : undefined
  );

  function handlePrintReport() {
    window.print();
  }

  if (!result) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-950">
          Analysis not found
        </h1>

        <p className="mt-2 text-slate-600">
          Create a new analysis to see your report.
        </p>

        <Link to="/analyze" className="mt-6 inline-block">
          <Button>Start new analysis</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 print-page">
      <div className="print-hidden flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            Analysis report
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
            Resume match results
          </h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to="/analyze">
            <Button variant="secondary">
              <Plus className="mr-2" size={16} />
              New analysis
            </Button>
          </Link>

          <Button onClick={handlePrintReport}>
            <Download className="mr-2" size={16} />
            Export PDF
          </Button>
        </div>
      </div>

      <MatchSummary result={result} />

      <div className="grid gap-6 lg:grid-cols-2">
        <KeywordList
          title="Matched keywords"
          keywords={result.matchedKeywords}
          type="matched"
        />

        <KeywordList
          title="Missing keywords"
          keywords={result.missingKeywords}
          type="missing"
        />
      </div>

      <SkillChart skills={result.skillMatches} />

      <SuggestionsList suggestions={result.suggestions} />
    </div>
  );
}