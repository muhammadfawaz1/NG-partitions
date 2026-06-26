import type { Metadata } from "next";

import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Architectural case studies from N&G Partitions across SFS, drylining, suspended ceilings and acoustic commercial interiors."
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        image={{
          src: "/assets/images/ceilings/open-office-wide.webp",
          alt: "Completed open-plan commercial office with suspended ceiling"
        }}
        text="A growing portfolio of commercial interiors presented through image-led case studies and technical scope."
        title="Case studies with construction substance."
        variant="cinematic"
      />

      <Section className="bg-plaster pb-20 lg:pb-28">
        <Container>

          <SectionHeader
            text="Each project is structured to show scope, technical detail and the quality of the finished or in-progress package."
            title="Commercial interior packages, documented with clarity."
          />
          <div className="mt-14 grid gap-x-8 gap-y-14 lg:grid-cols-2">
            {projects.map((project, index) => (
              <FadeIn delay={index * 0.06} key={project.slug}>
                {/* large prop removed — all cards equal */}
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}






