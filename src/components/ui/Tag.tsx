import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type TagProps = {
  children: ReactNode;
  className?: string;
  invert?: boolean;
};

export function Tag({ children, className, invert = false }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md border border-ink/10 px-3 py-1 text-xs font-medium text-ink/70",
        invert && "border-white/15 text-plaster/75",
        className
      )}
    >
      {children}
    </span>
  );
}
