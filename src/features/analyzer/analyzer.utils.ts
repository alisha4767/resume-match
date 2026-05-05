import { SKILL_KEYWORDS } from "../../data/skills.js";
import type {
  AnalysisInput,
  AnalysisResult,
  SkillMatch,
} from "./analyzer.types";
import { containsKeyword, normalizeText, uniqueValues } from "../../utils/text";

function getRelevantJobKeywords(jobDescription: string) {
  const allSkills = Object.values(SKILL_KEYWORDS).flat();

 return allSkills.filter((skill) =>
    containsKeyword(jobDescription, skill)
  );
}

function buildSkillMatches(
  resumeText: string,
  jobDescription: string
): SkillMatch[] {
  return Object.entries(SKILL_KEYWORDS).map(([category, skills]) => {
    const jobSkills = skills.filter((skill) =>
      containsKeyword(jobDescription, skill)
    );

    const matched = jobSkills.filter((skill) =>
      containsKeyword(resumeText, skill)
    );

    const missing = jobSkills.filter(
      (skill) => !containsKeyword(resumeText, skill)
    );

    return {
      category: category as SkillMatch["category"],
      matched,
      missing,
    };
  });
}

function buildSuggestions(missingKeywords: string[], score: number) {
  const suggestions: string[] = [];

  if (score < 50) {
    suggestions.push(
      "Add a stronger skills section that mirrors the most important job requirements."
    );
  }

  if (missingKeywords.length > 0) {
    suggestions.push(
      `Consider adding relevant experience around: ${missingKeywords
        .slice(0, 5)
        .join(", ")}.`
    );
  }

  suggestions.push(
    "Use measurable bullet points such as: Improved page load time by 35% using React optimization techniques."
  );

  suggestions.push(
    "Keep your resume language close to the job description, but only include skills you can honestly explain."
  );

  return suggestions;
}

export function analyzeResume(input: AnalysisInput): AnalysisResult {
  const resumeText = normalizeText(input.resumeText);
  const jobDescription = normalizeText(input.jobDescription);

  const jobKeywords = getRelevantJobKeywords(jobDescription);

  const matchedKeywords = jobKeywords.filter((keyword) =>
    containsKeyword(resumeText, keyword)
  );

  const missingKeywords = jobKeywords.filter(
    (keyword) => !containsKeyword(resumeText, keyword)
  );

  const score =
    jobKeywords.length === 0
      ? 0
      : Math.round((matchedKeywords.length / jobKeywords.length) * 100);

  return {
    id: crypto.randomUUID(),
    roleTitle: input.roleTitle || "Untitled role",
    createdAt: new Date().toISOString(),
    score,
    matchedKeywords: uniqueValues(matchedKeywords),
    missingKeywords: uniqueValues(missingKeywords),
    suggestions: buildSuggestions(missingKeywords, score),
    skillMatches: buildSkillMatches(resumeText, jobDescription),
  };
}