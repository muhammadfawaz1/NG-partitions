import { featuredProjects, serviceLabels } from "@/data/projects";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { industries, manufacturerSystems, trustSignals, whyChooseUs } from "@/data/site";
import { services } from "@/data/services";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FadeIn } from "@/components/motion/FadeIn";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { CTASection } from "@/components/sections/CTASection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function Home() {
  return (
    <>
      <HeroVideo />

      {/* INTRO */}
     <Section className="bg-plaster pt-20 pb-10 md:pt-28 md:pb-12">
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

          <FadeIn delay={0.15}>
            <div className="mt-20 grid grid-cols-2 gap-0 border-t border-ink/8 pt-10 sm:grid-cols-4">
              {[
                { value: "10+", label: "Years delivering" },
                { value: "UK", label: "Wide coverage" },
                { value: "4", label: "Core disciplines" },
                { value: "100%", label: "Commercial focus" },
              ].map((s) => (
                <div key={s.label} className="border-r border-ink/8 px-8 py-4 last:border-r-0 first:pl-0">
                  <p className="font-display text-4xl font-normal text-ink">{s.value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-ink/35">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>
      <Section className="bg-plaster pt-0 pb-12 md:pb-16">
  <Container>
    <div className="flex items-end justify-between border-b border-ink/8 pb-10">
      <div>
        <p className="mb-4 text-[11px] font-medium tracking-[0.2em] uppercase text-oak">Featured Projects</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.6rem)] font-normal leading-[1.0] tracking-[-0.02em] text-ink">
                Recent work with the clarity of a portfolio, not a gallery dump.
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden shrink-0 items-center gap-2 border border-ink/12 px-5 py-3 text-sm font-medium text-ink/50 transition-all hover:border-oak hover:text-ink md:inline-flex"
            >
              View Case Studies →
            </Link>
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
                  <div className="p-4">
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
      <Section className="bg-white py-28 md:py-36">
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
              <div className="mt-10">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 border border-ink/12 px-6 py-3.5 text-sm font-medium text-ink/60 transition-all hover:border-oak hover:text-ink"
                >
                  Our Approach
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
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
      <Section className="bg-plaster py-20 md:py-28">
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

      {/* TRUST SIGNALS */}
      <Section className="bg-[#f5f0e8] py-8 md:py-10">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <FadeIn>
              <p className="mb-4 border-b border-[#e0d8cc] pb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-ink/40">
                Accreditations & Compliance
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "RAMS-led planning", sub: "Risk & method statements" },
                  { label: "Qualified site teams", sub: "Trained & accredited operatives" },
                  { label: "Manufacturer-aligned systems", sub: "Spec-matched installations" },
                  { label: "Documentation-ready handover", sub: "Full O&M pack on completion" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-2 rounded-lg border border-[#e8e0d4] bg-white p-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#f0e0cc] bg-[#fdf6ee] text-sm text-oak">
                      ✓
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink">{item.label}</p>
                      <p className="text-[11px] text-ink/40">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <p className="mb-4 border-b border-[#e0d8cc] pb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-ink/40">
                Specified Systems
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: "British Gypsum", sub: "Drylining & boards", color: "bg-[#eef4fd] border-[#ccddf5] text-[#3a6fbf]", icon: "▦" },
                  { name: "Knauf", sub: "Partition boards", color: "bg-[#fdf6ee] border-[#f0e0cc] text-oak", icon: "⬡" },
                  { name: "Armstrong", sub: "Ceiling tiles", color: "bg-[#eef7ee] border-[#cce5cc] text-[#3a7a3a]", icon: "⊞" },
                  { name: "Gypframe", sub: "Steel framing", color: "bg-[#f0f2f5] border-[#d0d5dd] text-[#556080]", icon: "⊟" },
                  { name: "Rockfon", sub: "Acoustic wool", color: "bg-[#fdf0f0] border-[#f5cccc] text-[#bf4040]", icon: "≋" },
                  { name: "SAS Ceilings", sub: "Bespoke solutions", color: "bg-[#eef8f5] border-[#bbe0d5] text-[#2a7a65]", icon: "⊡" },
                ].map((item) => (
                  <div key={item.name} className="flex flex-col items-center gap-2 rounded-lg border border-[#e8e0d4] bg-white p-3 text-center">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg border text-lg ${item.color}`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-ink">{item.name}</p>
                      <p className="text-[10px] text-ink/40">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}