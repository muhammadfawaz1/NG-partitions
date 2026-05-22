import type { Metadata } from "next";

import { ServiceCard } from "@/components/cards/ServiceCard";
import { ImageFrame } from "@/components/media/ImageFrame";
import { FadeIn } from "@/components/motion/FadeIn";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Commercial SFS, drylining, partitions, suspended ceilings and acoustic solutions from N&G Partitions LTD."
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        image={{
          src: "/assets/images/hero/wood-slat-corridor.jpeg",
          alt: "Commercial corridor with timber slat ceiling and architectural interior finish"
        }}
        text="Specialist construction packages for commercial interiors that require technical accuracy and a refined finished presence."
        title="SFS, drylining, ceilings and acoustic interior systems."
      />

      <Section className="bg-plaster">
        <Container>
          <SectionHeader
            eyebrow="Core Disciplines"
            text="Each service is designed as part of a broader commercial interior package: technically controlled, visually calm and easy to coordinate."
            title="Four specialist services, one coherent delivery standard."
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <FadeIn delay={index * 0.06} key={service.slug}>
                <ServiceCard service={service} />
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-5 text-sm font-medium text-oak">Commercial Coordination</p>
              <h2 className="text-3xl font-medium leading-tight text-ink md:text-5xl">
                Designed for live project environments, not isolated trade packages.
              </h2>
              <p className="mt-6 text-base leading-7 text-ink/64 md:text-lg">
                N&G Partitions supports contractors, developers and client teams where framing,
                partitions, ceilings, acoustics and final finish must work together cleanly.
              </p>
            </div>
            <ImageFrame
              alt="Internal SFS and partition framework inside a commercial construction site"
              aspect="aspect-[16/10]"
              sizes="(min-width: 1024px) 55vw, 100vw"
              src="/assets/images/sfs/mixed-structure-interior.jpeg"
            />
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
