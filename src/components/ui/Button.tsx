import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  rel?: string;
  showArrow?: boolean;
  target?: string;
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variants: Record<ButtonVariant, string> = {
  primary: "bg-oak text-white hover:bg-[#94663d] focus-visible:ring-oak",
  secondary:
    "border border-white/25 bg-white/10 text-white hover:border-white/45 hover:bg-white/15 focus-visible:ring-white",
  ghost:
    "border border-ink/15 bg-transparent text-ink hover:border-ink/35 hover:bg-ink/5 focus-visible:ring-ink",
  dark: "bg-ink text-plaster hover:bg-coal focus-visible:ring-ink"
};

export function Button({
  children,
  className,
  href,
  rel,
  showArrow = true,
  target,
  variant = "primary",
  ...props
}: ButtonProps) {
  const buttonClassName = cn(
    "inline-flex h-12 items-center justify-center gap-2 rounded-md px-5 text-sm font-medium transition-colors duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-plaster",
    variants[variant],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {showArrow ? <ArrowUpRight aria-hidden="true" className="h-4 w-4" /> : null}
    </>
  );

  if (href) {
    return (
      <Link className={buttonClassName} href={href} rel={rel} target={target}>
        {content}
      </Link>
    );
  }

  return (
    <button className={buttonClassName} {...props}>
      {content}
    </button>
  );
}






