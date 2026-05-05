import { Link, useParams } from "react-router";
import { Button } from "../components/common/Button";
import { KeywordList } from "../components/analyzer/KeywordList";
import { MatchSummary } from "../components/analyzer/MatchSummary";
import { SkillChart } from "../components/analyzer/SkillChart";
import { SuggestionsList } from "../components/analyzer/SuggestionsList";
import { useAnalyzerStore } from "../features/analyzer/analyzer.store";

export function ResultsPage() {
  const { analysisId } = useParams();
  const result = useAnalyzerStore((state) =>
    analysisId ? state.getAnalysisById(analysisId) : undefined
  );

  if (!result) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
        <h1 className="text-2xl font-bold text-slate-950">
          Analysis not found
        </h1>
        <p className="mt-2 text-slate-600">
          Create a new analysis to see your resume match report.
        </p>
        <Link to="/analyze" className="mt-6 inline-block">
          <Button>Start new analysis</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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