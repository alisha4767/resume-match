export type SkillCategory = "frontend" | "backend" | "tools" | "softSkills";

export type SkillMatch = {
  category: SkillCategory;
  matched: string[];
  missing: string[];
};

export type AnalysisInput = {
  roleTitle: string;
  resumeText: string;
  jobDescription: string;
};

export type AnalysisResult = {
  id: string;
  roleTitle: string;
  createdAt: string;
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  skillMatches: SkillMatch[];
};