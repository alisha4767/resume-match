import type { AnalysisResult } from "../../features/analyzer/analyzer.types";
import { Card } from "../common/Card";

type ScoreExplanationProps = {
  result: AnalysisResult;
};

export function ScoreExplanation({ result }: ScoreExplanationProps) {
  const totalKeywords =
    result.matchedKeywords.length + result.missingKeywords.length;

  return (
    <Card>
      <h2 className="text-lg font-semibold text-slate-950">
        How this score was calculated
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        The match score compares keywords found in the job description with
        keywords found in your resume. It checks skill-related terms across
        frontend, backend, tools, and soft skills.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Total job keywords</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">
            {totalKeywords}
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4">
          <p className="text-sm text-emerald-700">Matched keywords</p>
          <p className="mt-2 text-3xl font-bold text-emerald-700">
            {result.matchedKeywords.length}
          </p>
        </div>

        <div className="rounded-2xl bg-rose-50 p-4">
          <p className="text-sm text-rose-700">Missing keywords</p>
          <p className="mt-2 text-3xl font-bold text-rose-700">
            {result.missingKeywords.length}
          </p>
        </div>
      </div>
    </Card>
  );
}