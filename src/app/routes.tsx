import { createBrowserRouter } from "react-router";
import { App } from "./App";
import { DashboardPage } from "../pages/DashboardPage";
import { HomePage } from "../pages/HomePage";
import { NewAnalysisPage } from "../pages/NewAnalysisPage";
import { ResultsPage } from "../pages/ResultsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: "analyze", Component: NewAnalysisPage },
      { path: "results/:analysisId", Component: ResultsPage },
      { path: "dashboard", Component: DashboardPage },
    ],
  },
]);