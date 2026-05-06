import { Link } from "react-router";
import { Button } from "./Button";
import { Card } from "./Card";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <Card className="text-center">
      <h1 className="text-3xl font-bold tracking-tight text-slate-950">
        {title}
      </h1>

      <p className="mx-auto mt-3 max-w-xl text-slate-600">{description}</p>

      {actionLabel && actionHref ? (
        <Link to={actionHref} className="mt-6 inline-block">
          <Button>{actionLabel}</Button>
        </Link>
      ) : null}
    </Card>
  );
}