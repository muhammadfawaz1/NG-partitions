import { featuredProjects, serviceLabels } from "@/data/projects";
import Link from "next/link";
import { industries, whyChooseUs } from "@/data/site";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FadeIn } from "@/components/motion/FadeIn";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { CTASection } from "@/components/sections/CTASection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { StatsStrip } from "@/components/sections/StatsStrip";

export default function Home() {
  return (
    <>
      <HeroVideo />

      {/* INTRO */}
      <Section className="bg-plaster py-24 md:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-end">
            <FadeIn>
              <p className="mb-6 text-[11px] font-medium tracking-[0.2em] uppercase text-oak">
                Precision / Finish / Control
              </p>
              <h2 className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-normal leading-[1.0] tracking-[-0.02em] text-ink">
                Commercial interiors delivered with architectural restraint and site discipline.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="grid gap-6 border-l-2 border-oak/20 pl-8">
                <p className="text-xl leading-9 text-ink/65">
                  N&G Partitions LTD specialises in technically precise drylining, partitions,
                  suspended ceilings, SFS and acoustic packages for modern commercial spaces.
                </p>
                <p className="text-base leading-7 text-ink/45">
                  The work is practical, coordinated and finish-focused: the kind of delivery
                  clients need when interiors must look calm, perform properly and stay aligned
                  with programme.
                </p>
                <div className="mt-2">
                  <Link href="/about" className="group inline-flex items-center gap-2 text-sm font-medium text-ink/50 transition-colors hover:text-ink">
                    About N&G
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* ── Animated stats strip ── */}
          <StatsStrip />
        </Container>
      </Section>

      {/* PROJECTS */}
      <div className="border-t border-ink/8" />
      <Section className="bg-plaster py-24 md:py-32">
        <Container>
          <div className="border-b border-ink/8 pb-10">
            <p className="mb-4 text-[11px] font-medium tracking-[0.2em] uppercase text-oak">Featured Projects</p>
            <h2 className="font-display text-[clamp(2.2rem,4.2vw,3.8rem)] font-normal leading-[1.05] tracking-[-0.02em] text-ink">
              Recent project work, shown with the same clarity and discipline we bring to site delivery.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProjects.slice(0, 4).map((project, index) => (
              <FadeIn delay={index * 0.07} key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block overflow-hidden rounded-xl border border-ink/8 bg-white transition-all duration-300 hover:border-oak/30 hover:shadow-md"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={project.heroImage.src}
                      alt={project.heroImage.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="mb-2 flex flex-wrap gap-1">
                      {project.services.map((s) => (
                        <span key={s} className="rounded-full border border-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink/50">
                          {serviceLabels[s]}
                        </span>
                      ))}
                      {project.status && (
                        <span className="rounded-full border border-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink/50 capitalize">
                          {project.status}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-oak">{project.eyebrow}</p>
                    <h3 className="mt-1 text-sm font-medium text-ink">{project.title}</h3>
                    <p className="mt-1 text-[11px] leading-5 text-ink/45">{project.shortDescription}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* WHY N&G */}
      <Section className="bg-white py-24 md:py-32">
        <Container>
          <div className="grid gap-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <FadeIn>
              <p className="mb-6 text-[11px] font-medium tracking-[0.2em] uppercase text-oak">Why N&G</p>
              <h2 className="font-display text-[clamp(2.2rem,4vw,3.8rem)] font-normal leading-[1.0] tracking-[-0.02em] text-ink">
                A contractor with the finish sensitivity of an interiors studio.
              </h2>
              <p className="mt-6 text-base leading-7 text-ink/50">
                The business is positioned for clients who need confidence before, during and after site delivery.
              </p>
            </FadeIn>
            <div className="grid grid-cols-2 gap-0">
              {whyChooseUs.map((item, index) => (
                <FadeIn delay={index * 0.07} key={item.title}>
                  <article className="border-b border-r border-ink/8 p-7 last:border-r-0 [&:nth-child(2)]:border-r-0 [&:nth-child(3)]:border-b-0 [&:nth-child(4)]:border-b-0">
                    <p className="mb-5 font-display text-5xl font-normal text-oak/30">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-base font-medium text-ink">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-ink/50">{item.text}</p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* INDUSTRIES */}
      <Section className="bg-plaster py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:items-start">
            <FadeIn>
              <p className="mb-4 text-[11px] font-medium tracking-[0.2em] uppercase text-oak">Industries Served</p>
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-normal leading-tight tracking-[-0.02em] text-ink">
                Built for commercial environments where details matter.
              </h2>
              <p className="mt-4 text-sm leading-7 text-ink/45">
                N&G Partitions delivers specialist interior packages across the full range of commercial sectors.
              </p>
            </FadeIn>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry, index) => (
                <FadeIn delay={index * 0.05} key={industry.name}>
                  <Link
                    href="/services"
                    className="group flex h-full flex-col justify-between border border-ink/8 bg-white p-6 transition-all duration-300 hover:border-oak/30 hover:shadow-architectural"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-ink">{industry.name}</p>
                        <span className="mt-0.5 shrink-0 text-[11px] text-ink/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-oak">↗</span>
                      </div>
                      <p className="mt-3 text-xs leading-6 text-ink/45">{industry.description}</p>
                    </div>
                    <div className="mt-6 h-px w-0 bg-oak transition-all duration-500 group-hover:w-full" />
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <ProcessSection />
      <TestimonialsSection />

      {/* TRUST SIGNALS
          Two-column layout where BOTH columns share the same CSS grid row tracks.
          The outer wrapper is a 2-col grid; inside each column sits a header block
          then 4 item rows. To lock rows across columns we use a single CSS subgrid
          spanning all rows: [header] + [4 items] = 5 rows total per column.
          Each item row has 3 sub-rows: icon · title · subtitle — but we collapse
          them into a single flex row (icon | text block) so one grid row = one item.
      */}
      <Section className="bg-[#f5f0e8] py-24 md:py-32">
        <Container>
          {/*
            Outer grid: 2 equal columns.
            We use `grid-rows-[auto_repeat(4,1fr)]` so row 0 = column headers,
            rows 1-4 = the 4 items. Both columns are children of the SAME grid,
            so their rows are automatically locked together.
          */}
          <div
            className="grid grid-cols-1 gap-x-16 lg:grid-cols-2"
            style={{
              gridTemplateRows: "auto auto auto auto auto", // header + 4 item rows
            }}
          >
            {/* ── LEFT COLUMN HEADER (row 1) ── */}
            <FadeIn>
              <p className="mb-4 border-b border-[#e0d8cc] pb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-ink/40">
                Accreditations & Compliance
              </p>
              <div className="mb-2">
                <div className="mb-1 h-0.5 w-6 bg-oak" />
                <h3 className="font-display text-[clamp(1.4rem,2.5vw,2rem)] font-normal leading-snug tracking-[-0.02em] text-ink">
                  Built on verified practice
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink/50">
                  Every project is planned, executed and handed over in line with industry standards and manufacturer requirements.
                </p>
              </div>
            </FadeIn>

            {/* ── RIGHT COLUMN HEADER (row 1, same grid row) ── */}
            <FadeIn delay={0.05}>
              <p className="mb-4 border-b border-[#e0d8cc] pb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-ink/40">
                Specified Systems
              </p>
              <div className="mb-2">
                <div className="mb-1 h-0.5 w-6 bg-[#6b7793]" />
                <h3 className="font-display text-[clamp(1.4rem,2.5vw,2rem)] font-normal leading-snug tracking-[-0.02em] text-ink">
                  Approved manufacturer partners
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink/50">
                  We install systems from the UK's leading drylining and ceiling manufacturers, specified to project requirements.
                </p>
              </div>
            </FadeIn>

            {/* ── ITEMS: rendered as a shared 4-row subgrid across both columns ──
                We flatten the 2 × 4 items into a single grid continuation so each
                pair of left+right items occupies the same grid row track.
                Pattern: left[0], right[0], left[1], right[1], left[2], right[2], left[3], right[3]
            */}
            {[
              {
                left:  { label: "RAMS-led planning",              sub: "Risk & method statements",         icon: "◈", color: "text-oak" },
                right: { name:  "British Gypsum",                 sub: "Drylining & boards",               icon: "▦", color: "text-[#4d7fb8]" },
              },
              {
                left:  { label: "Qualified site teams",           sub: "Trained & accredited operatives",  icon: "◎", color: "text-[#4f8f5b]" },
                right: { name:  "Knauf",                          sub: "Partition boards",                 icon: "⬡", color: "text-oak" },
              },
              {
                left:  { label: "Manufacturer-aligned systems",   sub: "Spec-matched installations",       icon: "▥", color: "text-[#6b7793]" },
                right: { name:  "Armstrong",                      sub: "Ceiling tiles",                    icon: "⊞", color: "text-[#4f8f5b]" },
              },
              {
                left:  { label: "Documentation-ready handover",   sub: "Full O&M pack on completion",      icon: "▧", color: "text-[#4d7fb8]" },
                right: { name:  "Gypframe",                       sub: "Steel framing",                    icon: "⊟", color: "text-[#6b7793]" },
              },
            ].map((pair, i) => (
              <>
                {/* LEFT item — occupies column 1 of the shared grid */}
                <FadeIn delay={i * 0.06} key={`left-${i}`}>
                  <div className="flex items-start gap-4 border-t border-[#e0d8cc] py-5">
                    <span className={`mt-0.5 w-5 shrink-0 font-display text-lg ${pair.left.color}`} aria-hidden="true">
                      {pair.left.icon}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ink">{pair.left.label}</p>
                      <p className="mt-0.5 text-xs text-ink/40">{pair.left.sub}</p>
                    </div>
                  </div>
                </FadeIn>

                {/* RIGHT item — occupies column 2 of the same shared grid row */}
                <FadeIn delay={i * 0.06 + 0.04} key={`right-${i}`}>
                  <div className="flex items-start gap-4 border-t border-[#e0d8cc] py-5">
                    <span className={`mt-0.5 w-5 shrink-0 font-display text-lg ${pair.right.color}`} aria-hidden="true">
                      {pair.right.icon}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ink">{pair.right.name}</p>
                      <p className="mt-0.5 text-xs text-ink/40">{pair.right.sub}</p>
                    </div>
                  </div>
                </FadeIn>
              </>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}






