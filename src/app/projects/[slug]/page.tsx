import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProject, projects, serviceLabels } from "@/data/projects";
import { ImageFrame } from "@/components/media/ImageFrame";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { formatStatus } from "@/lib/utils";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.seo.title.replace(" | N&G Partitions", ""),
    description: project.seo.description,
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      images: [project.heroImage.src]
    }
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const tags = [
    ...project.services.map((service) => serviceLabels[service]),
    project.status ? formatStatus(project.status) : "",
    project.location ?? ""
  ].filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow={project.eyebrow}
        image={{
          src: project.heroImage.src,
          alt: project.heroImage.alt
        }}
        tags={tags}
        text={project.shortDescription}
        title={project.title}
      />

      <Section className="bg-plaster">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.68fr_1fr]">
            <aside className="grid gap-4 lg:sticky lg:top-28 lg:self-start">
              <div className="border-t border-ink/10 py-4">
                <p className="text-sm text-ink/45">Status</p>
                <p className="mt-2 text-base font-medium text-ink">{formatStatus(project.status)}</p>
              </div>
              <div className="border-t border-ink/10 py-4">
                <p className="text-sm text-ink/45">Location</p>
                <p className="mt-2 text-base font-medium text-ink">{project.location}</p>
              </div>
              <div className="border-t border-ink/10 py-4">
                <p className="text-sm text-ink/45">Package</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <Tag key={service}>{serviceLabels[service]}</Tag>
                  ))}
                </div>
              </div>
              <div className="border-t border-ink/10 py-4">
                <p className="text-sm text-ink/45">Period</p>
                <p className="mt-2 text-base font-medium text-ink">{project.year}</p>
              </div>
            </aside>

            <div>
              <p className="text-xl leading-9 text-ink/72 md:text-2xl md:leading-10">
                {project.fullDescription}
              </p>
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div>
                  <p className="mb-5 text-sm font-medium text-oak">Scope</p>
                  <ul className="grid gap-3">
                    {project.scope.map((item) => (
                      <li className="border-t border-ink/10 py-3 text-base text-ink/70" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-5 text-sm font-medium text-oak">Outcome</p>
                  <ul className="grid gap-3">
                    {project.outcomes.map((item) => (
                      <li className="border-t border-ink/10 py-3 text-base text-ink/70" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <SectionHeader
            eyebrow="Gallery"
            text="A measured image sequence showing the package as a piece of commercial interior delivery."
            title="From technical detail to finished spatial quality."
          />
          <div className="mt-14 grid gap-6">
            {project.gallery.map((image, index) => (
              <ImageFrame
                alt={image.alt}
                aspect={index === 0 ? "aspect-[16/9]" : "aspect-[4/5] md:aspect-[16/12]"}
                caption={image.caption}
                key={image.src}
                sizes={index === 0 ? "100vw" : "(min-width: 1024px) 50vw, 100vw"}
                src={image.src}
              />
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        text="Share drawings, scope or programme requirements and N&G Partitions can discuss how the package should be approached."
        title="Need the same level of control on your project?"
      />
    </>
  );
}
