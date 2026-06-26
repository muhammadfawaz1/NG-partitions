import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/motion/FadeIn";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Commercial SFS, drylining, partitions, suspended ceilings and acoustic solutions from N&G Partitions LTD.",
};

// ─── Service discipline data ──────────────────────────────────────────────────
const disciplines = [
  {
    index: "01",
    eyebrow: "SFS",
    title: "Steel Framing\nSystems",
    summary:
      "Light gauge steel framing for robust commercial envelopes and internal structures — set out accurately, coordinated cleanly, ready for follow-on trades.",
    capabilities: [
      "External wall framing",
      "Internal SFS partitions",
      "Deflection head details",
      "Openings & structural interfaces",
      "Board-ready frame preparation",
    ],
    image: {
      src: "/assets/images/sfs/sfs-exterior-build.webp",
      alt: "Multi-storey commercial building with exposed steel framing system under construction",
    },
    href: "/services/steel-framing-systems",
    imageRight: true,
  },
  {
    index: "02",
    eyebrow: "Drylining",
    title: "Drylining &\nPartitions",
    summary:
      "Commercial partitioning and drylining delivered with clean lines, reliable programme control and finish-ready surfaces from the first fix.",
    capabilities: [
      "Metal stud partitions",
      "Plasterboard lining systems",
      "Fire & acoustic-rated partitions",
      "Shaftwall & corridor packages",
      "Jointing preparation",
    ],
    image: {
      src: "/assets/images/ceilings/open-office-ceiling.webp",
      alt: "Completed open-plan commercial office with clean drylining and suspended ceiling grid",
    },
    href: "/services/drylining-partitions",
    imageRight: false,
  },
  {
    index: "03",
    eyebrow: "Ceilings",
    title: "Suspended\nCeilings",
    summary:
      "Grid, tile and feature ceiling packages installed with precise alignment, lighting coordination and perimeter detail that defines the rhythm of a finished room.",
    capabilities: [
      "Lay-in ceiling grids",
      "Ceiling tile installation",
      "Bulkheads & perimeter details",
      "Lighting & services coordination",
      "Access panel integration",
    ],
    image: {
      src: "/assets/images/ceilings/open-office-ceiling-2.webp",
      alt: "Commercial open-plan office with precision suspended ceiling grid and integrated lighting",
    },
    href: "/services/suspended-ceilings",
    imageRight: true,
  },
  {
    index: "04",
    eyebrow: "Acoustics",
    title: "Acoustic\nSolutions",
    summary:
      "Acoustic ceilings, baffles and interior treatments that make spaces look composed and perform for the people using them every day.",
    capabilities: [
      "Acoustic ceiling treatments",
      "Baffle & raft coordination",
      "Acoustic-rated partitions",
      "Feature wall interfaces",
      "Performance-led detailing",
    ],
    image: {
      src: "/assets/images/timber/timber-slat-corridor.webp",
      alt: "Premium commercial corridor with timber slat acoustic ceiling treatment and warm lighting",
    },
    href: "/services/acoustic-solutions",
    imageRight: false,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        eyebrow="Services"
        image={{
          src: "/assets/images/hero/services-hero.webp",
          alt: "Premium commercial interior with timber slat ceiling, floor-to-ceiling glazing and city views — delivered by N&G Partitions",
        }}
        text="Specialist construction packages for commercial interiors that require technical accuracy and a refined finished presence."
        title="SFS, drylining, ceilings and acoustic interior systems."
        variant="cinematic"
      />

      {/* ── Discipline nav strip ── */}
      <Section className="bg-ink py-0">
        <Container>
          <div className="flex flex-col gap-6 border-b border-white/8 py-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/25">
              Core Disciplines
            </p>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
              {disciplines.map((d, i) => (
                <Link
                  key={d.eyebrow}
                  href={d.href}
                  className="group flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35 transition-all duration-300 hover:text-oak"
                >
                  <span className="text-white/15 transition-colors duration-300 group-hover:text-oak/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {d.eyebrow}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Editorial discipline panels ── */}
      <div className="bg-plaster">
        {disciplines.map((disc, index) => (
          <DisciplinePanel key={disc.eyebrow} disc={disc} index={index} />
        ))}
      </div>

      {/* ── Delivery promise strip ── */}
      <Section className="bg-ink py-20 md:py-28">
        <Container>
          <FadeIn>
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-oak">
                  Commercial Coordination
                </p>
                <h2
                  className="font-display font-normal leading-[1.0] tracking-[-0.025em] text-white"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
                >
                  Designed for live project environments,
                  <br className="hidden lg:block" /> not isolated trade
                  packages.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-white/40 md:text-lg md:leading-8">
                  N&amp;G Partitions supports contractors, developers and client
                  teams where framing, partitions, ceilings, acoustics and final
                  finish must work together cleanly — on programme and on
                  standard.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center gap-2 border border-white/12 px-6 py-4 text-sm font-medium text-white/60 transition-all hover:border-oak hover:text-white"
              >
                Start a conversation →
              </Link>
            </div>
          </FadeIn>

          {/* Four promises */}
          <div className="mt-16 grid grid-cols-2 gap-px bg-white/8 lg:grid-cols-4">
            {[
              {
                label: "Programme aligned",
                text: "Work sequenced to live site conditions",
              },
              {
                label: "Finish-focused",
                text: "Every surface prepared for what follows",
              },
              {
                label: "Trade-coordinated",
                text: "Interfaces managed, not left to chance",
              },
              {
                label: "Documentation ready",
                text: "Full O&M pack on completion",
              },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.06}>
                <div className="bg-ink p-8">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-oak/70">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mb-2 text-base font-medium text-white">
                    {item.label}
                  </p>
                  <p className="text-sm leading-6 text-white/40">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}

// ─── DisciplinePanel ──────────────────────────────────────────────────────────
type Disc = (typeof disciplines)[number];

function DisciplinePanel({ disc, index }: { disc: Disc; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <article className="border-b border-ink/6 last:border-b-0">
      <div className="grid lg:grid-cols-2">

        {/* ── Text column ── */}
        <FadeIn
          className={[
            "relative flex flex-col justify-center px-6 py-16 md:px-14 md:py-24 lg:px-16 xl:px-20",
            isEven ? "lg:order-1" : "lg:order-2",
          ].join(" ")}
        >
          {/* Ghost index — massive architectural watermark */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-6 select-none font-display font-normal leading-none text-ink/[0.04] lg:right-10 lg:top-10"
            style={{ fontSize: "clamp(6rem, 14vw, 12rem)" }}
          >
            {disc.index}
          </span>

          {/* Eyebrow row */}
          <div className="relative mb-10 flex items-center gap-4">
            <div className="h-px w-10 bg-oak" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-oak">
              {disc.eyebrow}
            </span>
            <div className="h-px flex-1 bg-ink/8" />
          </div>

          {/* Title — large, tight, editorial */}
          <h2
            className="relative font-display font-normal leading-[0.9] tracking-[-0.035em] text-ink"
            style={{ fontSize: "clamp(3rem, 5.5vw, 5rem)" }}
          >
            {disc.title.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>

          {/* Summary — generous line height, refined weight */}
          <p className="relative mt-8 max-w-sm text-[1rem] font-normal leading-[1.9] tracking-[0.005em] text-ink/48 md:text-[1.05rem]">
            {disc.summary}
          </p>

          {/* Capabilities — architectural spec-sheet rows */}
          <div className="relative mt-10 border-t border-ink/8">
            {disc.capabilities.map((cap, i) => (
              <div
                key={cap}
                className="group flex items-center gap-5 border-b border-ink/6 py-[0.8rem] transition-colors duration-200 hover:bg-ink/[0.02]"
              >
                {/* Tiny index pip */}
                <span className="w-5 shrink-0 text-[9px] font-semibold tabular-nums text-oak/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* Dot */}
                <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-oak/40" />
                {/* Capability label */}
                <span className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-ink/40 transition-colors duration-200 group-hover:text-ink/65">
                  {cap}
                </span>
                {/* Right arrow — appears on hover */}
                <span className="ml-auto translate-x-1 text-[10px] text-oak/0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-oak/70">
                  →
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ── Image column ── */}
        <div
          className={[
            "relative min-h-[520px] overflow-hidden lg:min-h-[700px]",
            isEven ? "lg:order-2" : "lg:order-1",
          ].join(" ")}
        >
          <Image
            src={disc.image.src}
            alt={disc.image.alt}
            fill
            className="object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          {/* Layered vignette for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-ink/5 to-transparent" />
          {/* Left edge fade for text bleed effect on even panels */}
          {isEven && (
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-plaster/20 to-transparent" />
          )}
          {/* Right edge fade for odd panels */}
          {!isEven && (
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-plaster/20 to-transparent" />
          )}
          {/* Floating discipline label on image */}
          <div className="absolute bottom-6 left-6 flex items-center gap-3">
            <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-white/30">
              {disc.eyebrow}
            </span>
            <div className="h-px w-6 bg-white/20" />
            <span className="font-display text-[0.7rem] font-normal text-white/20">
              N&amp;G Partitions
            </span>
          </div>
        </div>

      </div>
    </article>
  );
}






