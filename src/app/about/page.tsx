import type { Metadata } from "next";

import { ImageFrame } from "@/components/media/ImageFrame";
import { FadeIn } from "@/components/motion/FadeIn";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site, whyChooseUs } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About N&G Partitions LTD, a Peterborough-based commercial interiors specialist delivering drylining, partitions, SFS, suspended ceilings and acoustic solutions."
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About N&G Partitions LTD"
        image={{
          src: "/assets/images/hero/lobby-reception.jpeg",
          alt: "Premium commercial lobby interior with linear lighting"
        }}
        text="A UK commercial interiors specialist built around precision, programme awareness and composed architectural finish."
        title="Interior packages delivered with quiet confidence."
      />

      <Section className="bg-plaster">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <FadeIn>
              <SectionHeader
                className="md:block"
                eyebrow="Company"
                title="A specialist contractor for commercial spaces that need technical control and a premium finish."
              />
            </FadeIn>
            <FadeIn delay={0.08}>
              <div className="space-y-6 text-lg leading-8 text-ink/68">
                <p>
                  {site.name} works across drylining, partitions, suspended ceilings, steel
                  framing systems and acoustic interior solutions. The company is based in
                  Peterborough and supports commercial projects across the UK.
                </p>
                <p>
                  The visual standard is deliberately refined: clean lines, controlled interfaces
                  and careful coordination between structure, services and final finish.
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <ImageFrame
              alt="Open-plan commercial office with suspended ceiling by N&G Partitions"
              aspect="aspect-[16/10]"
              sizes="(min-width: 1024px) 55vw, 100vw"
              src="/assets/images/hero/open-office-wide.jpeg"
            />
            <div>
              <p className="mb-5 text-sm font-medium text-oak">Approach</p>
              <h2 className="text-3xl font-medium leading-tight text-ink md:text-5xl">
                The work should disappear into the quality of the room.
              </h2>
              <p className="mt-6 text-base leading-7 text-ink/64 md:text-lg">
                N&G Partitions focuses on the parts of commercial interiors that determine how a
                space feels in use: ceiling rhythm, partition alignment, acoustic comfort, clean
                junctions and the discipline of a well-managed site package.
              </p>
            </div>
          </div>

          <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, index) => (
              <article className="border-t border-ink/10 pt-5" key={item.title}>
                <p className="mb-7 text-sm text-oak">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="text-xl font-medium text-ink">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-ink/62">{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
