import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "../common/Card";
import type { SkillMatch } from "../../features/analyzer/analyzer.types";

type SkillChartProps = {
  skills: SkillMatch[];
};

export function SkillChart({ skills }: SkillChartProps) {
  const data = skills.map((skill) => ({
    category: skill.category,
    matched: skill.matched.length,
    missing: skill.missing.length,
  }));

  return (
    <Card>
      <h2 className="text-lg font-semibold text-slate-950">
        Skill category breakdown
      </h2>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="matched" radius={[8, 8, 0, 0]} />
            <Bar dataKey="missing" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}