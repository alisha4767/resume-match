import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { analyzeResume } from "../../features/analyzer/analyzer.utils";
import { useAnalyzerStore } from "../../features/analyzer/analyzer.store";

export function AnalyzerForm() {
  const navigate = useNavigate();
  const addAnalysis = useAnalyzerStore((state) => state.addAnalysis);

  const [roleTitle, setRoleTitle] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = analyzeResume({
      roleTitle,
      resumeText,
      jobDescription,
    });

    addAnalysis(result);
    navigate(`/results/${result.id}`);
  }

  const isDisabled = resumeText.trim().length < 50 || jobDescription.trim().length < 50;

  return (
    <Card className="mx-auto max-w-5xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <p className="text-sm font-medium text-blue-600">New analysis</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Compare your resume with a job description
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Paste both texts below. The analyzer will calculate a match score,
            identify missing keywords, and suggest improvements.
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Role title
          </label>
          <input
            value={roleTitle}
            onChange={(event) => setRoleTitle(event.target.value)}
            placeholder="Frontend Developer Intern"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-blue-500 transition focus:ring-2"
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Resume text
            </label>
            <textarea
              value={resumeText}
              onChange={(event) => setResumeText(event.target.value)}
              placeholder="Paste your resume here..."
              className="mt-2 min-h-80 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-blue-500 transition focus:ring-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Job description
            </label>
            <textarea
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              placeholder="Paste the job description here..."
              className="mt-2 min-h-80 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-blue-500 transition focus:ring-2"
            />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-600">
            Tip: Use the actual job description for better keyword matching.
          </p>

          <Button disabled={isDisabled}>Analyze resume</Button>
        </div>
      </form>
    </Card>
  );
}