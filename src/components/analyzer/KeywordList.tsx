import { Badge } from "../common/Badge";
import { Card } from "../common/Card";

type KeywordListProps = {
  title: string;
  keywords: string[];
  type: "matched" | "missing";
};

export function KeywordList({ title, keywords, type }: KeywordListProps) {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-slate-950">{title}</h2>

      {keywords.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No keywords found.</p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          {keywords.map((keyword) => (
            <Badge key={keyword} tone={type === "matched" ? "green" : "red"}>
              {keyword}
            </Badge>
          ))}
        </div>
      )}
    </Card>
  );
}