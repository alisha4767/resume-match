import { Lightbulb } from "lucide-react";
import { Card } from "../common/Card";

type SuggestionsListProps = {
  suggestions: string[];
};

export function SuggestionsList({ suggestions }: SuggestionsListProps) {
  return (
    <Card>
      <div className="flex items-center gap-2">
        <Lightbulb className="text-amber-500" size={20} />
        <h2 className="text-lg font-semibold text-slate-950">
          Resume improvement suggestions
        </h2>
      </div>

      <ul className="mt-4 space-y-3">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion}
            className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700"
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </Card>
  );
}