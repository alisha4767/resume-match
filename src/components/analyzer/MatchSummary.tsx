import { Badge } from "../common/Badge";
import { Card } from "../common/Card";
import type  { AnalysisResult } from "../../features/analyzer/analyzer.types";

type MatchSummaryProps = {
  result: AnalysisResult;
};

function getScoreTone(score: number) {
  if (score >= 75) return "green";
  if (score >= 45) return "yellow";
  return "red";
}

function getScoreLabel(score: number) {
  if (score >= 75) return "Strong match";
  if (score >= 45) return "Moderate match";
  return "Needs work";
}

export function MatchSummary({ result }: MatchSummaryProps) {
  return (
    <Card>
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Badge tone={getScoreTone(result.score)}>
            {getScoreLabel(result.score)}
          </Badge>

          <h1 className="mt-4 text-3xl font-bold text-slate-950">
            {result.roleTitle}
          </h1>

          <p className="mt-2 text-slate-600">
            Your resume matched {result.matchedKeywords.length} important
            keywords and missed {result.missingKeywords.length}.
          </p>
        </div>

        <div className="grid size-36 place-items-center rounded-full bg-slate-950 text-white shadow-lg">
          <div className="text-center">
            <p className="text-4xl font-bold">{result.score}%</p>
            <p className="text-xs text-slate-300">match score</p>
          </div>
        </div>
      </div>
    </Card>
  );
}