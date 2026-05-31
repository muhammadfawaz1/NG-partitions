import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <Section className="bg-ink text-plaster">
      <Container>
        <div className="grid gap-4 border-b border-white/10 pb-12 lg:grid-cols-2 lg:items-end">
          <FadeIn>
            <p className="mb-5 text-sm font-medium text-oak">Client Feedback</p>
            <h2 className="text-4xl font-medium leading-tight text-white md:text-5xl">
              Trusted by contractors and architects across the UK.
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="text-lg leading-8 text-plaster/65 lg:text-right">
              N&amp;G Partitions works with main contractors, architects and
              project managers on commercial interiors where finish and
              programme matter.
            </p>
          </FadeIn>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t: { name: string; role: string; company: string; quote: string }, index: number) => (
            <FadeIn delay={index * 0.06} key={t.name}>
              <article className="flex h-full flex-col justify-between rounded-md border border-white/10 bg-white/5 p-6">
                <div>
                  <p className="mb-6 text-sm font-medium text-oak">★★★★★</p>
                  <blockquote className="text-base leading-7 text-plaster/80">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="mt-1 text-sm text-plaster/55">
                    {t.role} &mdash; {t.company}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}