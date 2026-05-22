"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { navigation, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/82 text-plaster backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-8 lg:px-12">
        <Link
          aria-label="N&G Partitions home"
          className="group flex items-center gap-3"
          href="/"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/5 text-sm font-semibold">
            N&G
          </span>
          <span className="hidden text-sm font-medium text-plaster/85 transition group-hover:text-white sm:block">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => {
            const active =
              pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                className={cn(
                  "text-sm font-medium text-plaster/68 transition duration-300 hover:text-white",
                  active && "text-white"
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            className="rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-plaster/85 transition hover:border-oak hover:text-white"
            href={`tel:${site.phone}`}
          >
            {site.phone}
          </Link>
          <Link
            className="rounded-md bg-oak px-4 py-2 text-sm font-medium text-white transition hover:bg-[#94663d]"
            href="/contact"
          >
            Enquire
          </Link>
        </div>

        <button
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-plaster transition hover:border-white/35 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-t border-white/10 bg-ink transition-all duration-300 ease-premium lg:hidden",
          open ? "max-h-[420px]" : "max-h-0"
        )}
      >
        <nav aria-label="Mobile navigation" className="grid gap-1 px-5 py-5">
          {navigation.map((item) => (
            <Link
              className="rounded-md px-3 py-3 text-base font-medium text-plaster/78 transition hover:bg-white/5 hover:text-white"
              href={item.href}
              key={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="mt-3 rounded-md bg-oak px-3 py-3 text-base font-medium text-white"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Get in Touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
