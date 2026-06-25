import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const steps = [
  {
    number: "01",
    title: "Technical review",
    description:
      "Drawings, specifications and interfaces are reviewed early so details are understood before site pressure builds.",
  },
  {
    number: "02",
    title: "Programme planning",
    description:
      "Sequencing is aligned with other trades, access requirements and critical handover dates.",
  },
  {
    number: "03",
    title: "Precision installation",
    description:
      "SFS, partitions, drylining, ceiling and acoustic works are delivered with clean setting-out and controlled finishes.",
  },
  {
    number: "04",
    title: "Quality handover",
    description:
      "Snagging, documentation and final checks are treated as part of the build, not an afterthought.",
  },
];

export function ProcessSection() {
  return (
    <Section className="bg-ink py-24 md:py-32">
      <Container>
        {/* Header row */}
        <div className="grid gap-8 border-b border-white/10 pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <FadeIn>
            <p className="mb-6 text-[11px] font-medium tracking-[0.2em] uppercase text-oak">
              Process
            </p>
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.6rem)] font-normal leading-[1.05] tracking-[-0.02em] text-white">
              Controlled delivery, from first detail to final finish.
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="text-base leading-7 text-white/45">
              A calm sequence from technical review to handover keeps commercial interior
              packages moving cleanly on site.
            </p>
          </FadeIn>
        </div>

        {/*
          Steps row. The divider + spacing classes are computed from `index`
          rather than the `first:`/`last:` pseudo-classes, because each step
          is wrapped in <FadeIn>, which renders its own element. That means
          every step is the "first child" of ITS OWN wrapper, so first:/last:
          selectors never reliably target the true first/last grid column —
          this was the cause of the dividers sitting flush against the text
          in columns 2-4.
        */}
        <div className="grid grid-cols-1 gap-y-12 pt-14 pb-2 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const isFirst = index === 0;
            const isLast = index === steps.length - 1;
            return (
              <FadeIn delay={index * 0.07} key={step.number}>
                <div
                  className={[
                    "pr-6",
                    isLast ? "lg:pr-0" : "lg:pr-10",
                    isFirst ? "lg:pl-0" : "lg:border-l lg:border-white/10 lg:pl-10",
                  ].join(" ")}
                >
                  <p className="text-xs font-medium tracking-[0.1em] text-oak">{step.number}</p>
                  <h3 className="mt-4 text-base font-medium text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/45">{step.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}