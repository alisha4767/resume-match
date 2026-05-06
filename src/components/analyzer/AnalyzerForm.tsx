import { ClipboardList } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { analyzeResume } from "../../features/analyzer/analyzer.utils";
import { useAnalyzerStore } from "../../features/analyzer/analyzer.store";
import { Button } from "../common/Button";
import { Card } from "../common/Card";

const sampleResume = `Frontend developer with experience building React and TypeScript applications. Skilled in JavaScript, HTML, CSS, Tailwind CSS, Git, GitHub, Vite, REST APIs, responsive design, Zustand, and collaboration. Built reusable UI components, dashboards, and form-based workflows for modern web applications.`;

const sampleJobDescription = `We are hiring a Frontend Developer with strong experience in React, TypeScript, JavaScript, HTML, CSS, Tailwind, responsive design, REST API integration, Git, GitHub, testing, accessibility, communication, and collaboration. Experience with state management tools like Zustand or Redux is a plus.`;

export function AnalyzerForm() {
  const navigate = useNavigate();
  const addAnalysis = useAnalyzerStore((state) => state.addAnalysis);

  const [roleTitle, setRoleTitle] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const isDisabled =
    resumeText.trim().length < 50 || jobDescription.trim().length < 50;

  function handleUseSampleData() {
    setRoleTitle("Frontend Developer");
    setResumeText(sampleResume);
    setJobDescription(sampleJobDescription);
  }

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

  return (
    <Card className="mx-auto max-w-5xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              New analysis
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Compare your resume with a job description
            </h1>

            <p className="mt-2 max-w-2xl text-slate-600">
              Paste both texts below. The analyzer will calculate a match
              score, identify missing keywords, and suggest improvements.
            </p>
          </div>

          <Button type="button" variant="secondary" onClick={handleUseSampleData}>
            <ClipboardList className="mr-2" size={16} />
            Use sample data
          </Button>
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
              placeholder="Paste your resume text here..."
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

        <div className="flex flex-col gap-4 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            Tip: use the actual job description for better keyword matching.
          </p>

          <Button disabled={isDisabled}>Analyze resume</Button>
        </div>
      </form>
    </Card>
  );
}