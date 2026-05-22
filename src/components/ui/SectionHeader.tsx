import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  action?: ReactNode;
  className?: string;
  invert?: boolean;
};

export function SectionHeader({
  action,
  className,
  eyebrow,
  invert = false,
  text,
  title
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "grid gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(260px,0.45fr)] md:items-end",
        className
      )}
    >
      <div className="max-w-4xl">
        {eyebrow ? (
          <p className={cn("mb-4 text-sm font-medium text-oak", invert && "text-concrete")}>
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "text-3xl font-medium leading-tight text-ink md:text-5xl",
            invert && "text-plaster"
          )}
        >
          {title}
        </h2>
      </div>
      <div className="space-y-6">
        {text ? (
          <p className={cn("text-base leading-7 text-ink/68 md:text-lg", invert && "text-plaster/68")}>
            {text}
          </p>
        ) : null}
        {action}
      </div>
    </div>
  );
}
