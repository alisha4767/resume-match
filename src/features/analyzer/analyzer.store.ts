import { create } from "zustand";
import { persist } from "zustand/middleware";
import type  { AnalysisResult } from "./analyzer.types";

type AnalyzerStore = {
  analyses: AnalysisResult[];
  addAnalysis: (analysis: AnalysisResult) => void;
  getAnalysisById: (id: string) => AnalysisResult | undefined;
  removeAnalysis: (id: string) => void;
  clearAnalyses: () => void;
};

export const useAnalyzerStore = create<AnalyzerStore>()(
  persist(
    (set, get) => ({
      analyses: [],

      addAnalysis: (analysis) => {
        set((state) => ({
          analyses: [analysis, ...state.analyses],
        }));
      },

      getAnalysisById: (id) => {
        return get().analyses.find((analysis) => analysis.id === id);
      },

      removeAnalysis: (id) => {
        set((state) => ({
          analyses: state.analyses.filter((analysis) => analysis.id !== id),
        }));
      },

      clearAnalyses: () => {
        set({ analyses: [] });
      },
    }),
    {
      name: "resume-match-analyses",
    }
  )
);