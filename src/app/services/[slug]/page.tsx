import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ImageFrame } from "@/components/media/ImageFrame";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { getService, services } from "@/data/services";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.summary,
    openGraph: {
      title: `${service.title} | N&G Partitions`,
      description: service.summary,
      images: [service.heroImage.src]
    }
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        image={{
          src: service.heroImage.src,
          alt: service.heroImage.alt
        }}
        tags={service.applications.slice(0, 3)}
        text={service.summary}
        title={service.title}
      />

      <Section className="bg-plaster">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeader
              className="md:block"
              eyebrow="Overview"
              title={`Commercial ${service.title.toLowerCase()} delivered with technical control.`}
            />
            <div className="space-y-6">
              <p className="text-lg leading-8 text-ink/70">{service.overview}</p>
              <div className="flex flex-wrap gap-2">
                {service.capabilities.slice(0, 4).map((capability) => (
                  <Tag key={capability}>{capability}</Tag>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-5 text-sm font-medium text-oak">Technical Capabilities</p>
              <div className="grid gap-3">
                {service.capabilities.map((capability) => (
                  <div className="border-t border-ink/10 py-4 text-base font-medium text-ink/72" key={capability}>
                    {capability}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-5 text-sm font-medium text-oak">Applications</p>
              <div className="grid gap-3">
                {service.applications.map((application) => (
                  <div className="border-t border-ink/10 py-4 text-base font-medium text-ink/72" key={application}>
                    {application}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-ink text-plaster">
        <Container>
          <SectionHeader
            eyebrow="Process & Quality"
            invert
            text="The premium result comes from controlled details: setting-out, interfaces, sequencing and the final finish."
            title="Built with the discipline the finished room deserves."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {service.quality.map((item, index) => (
              <article className="border-t border-white/15 pt-5" key={item}>
                <p className="mb-7 text-sm text-oak">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="text-xl font-medium text-white">{item}</h3>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-plaster">
        <Container>
          <SectionHeader
            eyebrow="Relevant Imagery"
            text="A concise visual sequence showing the system in context, from construction detail to finished commercial interior."
            title={`${service.title} in practice.`}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.gallery.map((image, index) => (
              <ImageFrame
                alt={image.alt}
                aspect={index === 0 ? "aspect-[4/5]" : "aspect-[16/12]"}
                key={image.src}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                src={image.src}
              />
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        text={`Discuss ${service.title.toLowerCase()} requirements, package scope and programme expectations with N&G Partitions.`}
        title={`Planning a ${service.title.toLowerCase()} package?`}
      />
    </>
  );
}
