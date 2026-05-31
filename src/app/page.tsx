import { featuredProjects } from "@/data/projects";
import { industries, manufacturerSystems, trustSignals, whyChooseUs } from "@/data/site";
import { services } from "@/data/services";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { CTASection } from "@/components/sections/CTASection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <HeroVideo />

      <Section className="bg-plaster">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <FadeIn>
              <p className="mb-5 text-sm font-medium text-oak">Precision / Finish / Control</p>
              <h2 className="max-w-3xl text-4xl font-medium leading-tight text-ink md:text-6xl">
                Commercial interiors delivered with architectural restraint and site discipline.
              </h2>
            </FadeIn>
            <FadeIn delay={0.08}>
              <div className="grid gap-6 border-l border-ink/10 pl-6">
                <p className="text-lg leading-8 text-ink/70">
                  N&G Partitions LTD specialises in technically precise drylining, partitions,
                  suspended ceilings, SFS and acoustic packages for modern commercial spaces.
                </p>
                <p className="text-base leading-7 text-ink/58">
                  The work is practical, coordinated and finish-focused: the kind of delivery
                  clients need when interiors must look calm, perform properly and stay aligned
                  with programme.
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      <Section className="bg-plaster pt-0">
        <Container>
          <SectionHeader
            action={<Button href="/services" variant="ghost">All Services</Button>}
            eyebrow="Services"
            text="Core packages for commercial interiors, from structural framing through to finished ceilings and acoustic detail."
            title="Specialist systems, delivered as composed interior packages."
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
          <SectionHeader
            action={<Button href="/projects" variant="ghost">View Case Studies</Button>}
            eyebrow="Featured Projects"
            text="Presented as architectural case studies: image-led, technically grounded and focused on the finish clients actually see."
            title="Recent work with the clarity of a portfolio, not a gallery dump."
          />
          <div className="mt-14 grid gap-10 lg:grid-cols-[1.35fr_0.9fr]">
            {featuredProjects.slice(0, 1).map((project) => (
              <FadeIn key={project.slug}>
                <ProjectCard large project={project} />
              </FadeIn>
            ))}
            <div className="grid gap-10">
              {featuredProjects.slice(1, 3).map((project, index) => (
                <FadeIn delay={index * 0.06} key={project.slug}>
                  <ProjectCard project={project} />
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-plaster">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionHeader
                className="md:block"
                eyebrow="Why N&G"
                text="The business is positioned for clients who need confidence before, during and after site delivery."
                title="A contractor with the finish sensitivity of an interiors studio."
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {whyChooseUs.map((item, index) => (
                <FadeIn delay={index * 0.06} key={item.title}>
                  <article className="h-full border-t border-ink/10 pt-5">
                    <p className="mb-7 text-sm text-oak">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className="text-xl font-medium text-ink">{item.title}</h3>
                    <p className="mt-4 text-base leading-7 text-ink/62">{item.text}</p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>

          <div className="mt-20 grid gap-8 border-t border-ink/10 pt-10 lg:grid-cols-[0.45fr_1fr]">
            <div>
              <p className="text-sm font-medium text-oak">Industries Served</p>
              <h3 className="mt-4 text-3xl font-medium leading-tight text-ink">
                Built for commercial environments where details matter.
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry) => (
                <div className="rounded-md border border-ink/10 px-4 py-4 text-sm font-medium text-ink/72" key={industry}>
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <ProcessSection />

<TestimonialsSection />

      <Section className="bg-white">
        <Container>
          <SectionHeader
            eyebrow="Trust Signals"
            text="Accreditations, project-specific documentation and manufacturer alignment can be presented cleanly as the business profile grows."
            title="Professional signals without visual noise."
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-5 text-sm font-medium text-oak">Accreditations & Compliance</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {trustSignals.map((signal) => (
                  <div className="border-t border-ink/10 py-4 text-sm font-medium text-ink/70" key={signal}>
                    {signal}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-5 text-sm font-medium text-oak">Specified Systems</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {manufacturerSystems.map((system) => (
                  <div className="border-t border-ink/10 py-4 text-sm font-medium text-ink/70" key={system}>
                    {system}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
