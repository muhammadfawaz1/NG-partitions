import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <Section className="bg-[#f5f0e8] py-24 md:py-32">
      <Container>
        {/* Header row */}
        <div className="flex flex-col gap-4 pb-10 sm:flex-row sm:items-center sm:justify-between">
          <FadeIn className="flex items-center gap-4">
            <span className="rounded-full border border-[#f0d8b8] bg-[#fdf0e0] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-oak">
              Client Feedback
            </span>
            <h2 className="text-2xl font-medium leading-snug text-ink md:text-3xl">
              Trusted by contractors and architects across the UK.
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="hidden max-w-[300px] text-right text-sm leading-relaxed text-ink/60 sm:block">
              Working with main contractors, architects and project managers where finish and programme matter.
            </p>
          </FadeIn>
        </div>

        {/* Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <FadeIn delay={index * 0.06} key={`${t.name}-${t.company}`}>
              <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-[#e8e0d4] bg-white p-7">
                {/* Decorative quote mark */}
                <span className="pointer-events-none absolute right-4 top-0 select-none font-serif text-7xl leading-none text-[#f5ede0]">
                  &ldquo;
                </span>

                <div className="relative z-10">
                  <p className="mb-4 text-xs tracking-[2px] text-oak">★★★★★</p>
                  <blockquote className="text-sm leading-7 text-ink/70">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Author */}
                <div className="relative z-10 mt-6 flex items-center gap-3 border-t border-[#f0ece4] pt-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#f0d8b8] bg-[#fdf0e0] text-[10px] font-semibold text-oak">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-ink/50">{t.role} — {t.company}</p>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}






