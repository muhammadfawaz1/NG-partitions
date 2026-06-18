"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Mail, Phone, MessageSquare } from "lucide-react";

import { navigation, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300",
      scrolled
        ? "border-ink/10 bg-white/95 text-ink backdrop-blur-md"
        : "border-white/10 bg-ink/82 text-plaster backdrop-blur-md"
    )}>
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-8 lg:px-12">
        {/* Logo */}
        <Link aria-label="N&G Partitions home" className="group flex items-center gap-3" href="/" onClick={() => setOpen(false)}>
          <span className={cn(
            "flex h-9 w-9 items-center justify-center rounded-md border text-xs font-semibold transition-all duration-300",
            scrolled ? "border-ink/20 bg-ink/5 text-ink" : "border-white/15 bg-white/5 text-white"
          )}>
            N&G
          </span>
          <span className={cn(
            "hidden text-sm font-medium transition sm:block",
            scrolled ? "text-ink/80 group-hover:text-ink" : "text-plaster/85 group-hover:text-white"
          )}>
            {site.name}
          </span>
        </Link>

        {/* Nav links */}
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                className={cn(
                  "text-sm font-medium transition duration-300",
                  scrolled ? "text-ink/70 hover:text-ink" : "text-plaster/68 hover:text-white",
                  active && (scrolled ? "text-ink" : "text-white")
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="hidden items-center gap-2 lg:flex">
          {/* Email icon */}
          <Link
            href={`mailto:${site.email}`}
            aria-label="Email us"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border transition",
              scrolled ? "border-ink/20 text-ink/60 hover:border-oak hover:text-oak" : "border-white/15 text-white/60 hover:border-oak hover:text-oak"
            )}
          >
            <Mail className="h-3.5 w-3.5" />
          </Link>
          {/* Phone icon */}
          <Link
            href={`tel:${site.phone}`}
            aria-label="Call us"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border transition",
              scrolled ? "border-ink/20 text-ink/60 hover:border-oak hover:text-oak" : "border-white/15 text-white/60 hover:border-oak hover:text-oak"
            )}
          >
            <Phone className="h-3.5 w-3.5" />
          </Link>

          {/* Divider */}
          <div className={cn("mx-1 h-4 w-px", scrolled ? "bg-ink/15" : "bg-white/15")} />

          {/* Get in Touch */}
          <Link
            href="/contact"
            className={cn(
              "flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium transition",
              scrolled ? "border-ink/20 text-ink/80 hover:border-oak hover:text-ink" : "border-white/15 text-plaster/85 hover:border-oak hover:text-white"
            )}
          >
            <MessageSquare className="h-3 w-3 text-oak" />
            Get in Touch
          </Link>

          {/* Enquire */}
          <Link
            className="rounded-md bg-oak px-4 py-1.5 text-xs font-medium text-white transition hover:bg-[#94663d]"
            href="/contact"
          >
            Enquire
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-expanded={open}
          aria-label="Toggle navigation"
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-md border transition lg:hidden",
            scrolled ? "border-ink/20 text-ink" : "border-white/15 text-plaster"
          )}
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "grid overflow-hidden border-t transition-all duration-300 ease-premium lg:hidden",
        scrolled ? "border-ink/10 bg-white" : "border-white/10 bg-ink",
        open ? "max-h-[420px]" : "max-h-0"
      )}>
        <nav aria-label="Mobile navigation" className="grid gap-1 px-5 py-5">
          {navigation.map((item) => (
            <Link
              className={cn(
                "rounded-md px-3 py-3 text-base font-medium transition hover:bg-white/5",
                scrolled ? "text-ink/78 hover:bg-ink/5" : "text-plaster/78"
              )}
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