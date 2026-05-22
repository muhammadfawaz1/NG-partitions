import { processSteps } from "@/data/site";
import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ProcessSection() {
  return (
    <Section className="bg-ink text-plaster">
      <Container>
        <SectionHeader
          eyebrow="Process"
          invert
          text="A calm sequence from technical review to handover keeps commercial interior packages moving cleanly on site."
          title="Controlled delivery, from first detail to final finish."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <FadeIn delay={index * 0.06} key={step.title}>
              <article className="h-full border-t border-white/15 pt-5">
                <p className="mb-8 text-sm text-oak">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="text-xl font-medium text-white">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-plaster/62">{step.text}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
