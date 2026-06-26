import Link from "next/link";
import { Container } from "@/components/ui/Container";

type CTASectionProps = {
  title?: string;
  text?: string;
};

export function CTASection({
  text = "Speak to N&G Partitions about a commercial interior package that needs technical control, visual finish and dependable site delivery.",
  title = "Ready to discuss your next interior package?",
}: CTASectionProps) {
  return (
    <section className="bg-ink py-10 md:py-14">
      <Container>
        <div className="grid overflow-hidden rounded-xl border border-white/10 lg:grid-cols-2">
          {/* Left */}
          <div className="border-b border-white/10 p-8 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-4 bg-oak" />

              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-oak">
                Project Enquiries
              </p>
            </div>

            <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-normal leading-[1.1] tracking-[-0.02em] text-white">
              {title}
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/45">
              {text}
            </p>

            <p className="mt-6 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.12em] text-white/20">
              N&amp;G Partitions Ltd — Peterborough — Delivering across the UK
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-between p-8">
            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="group flex items-center justify-between border border-white/15 px-5 py-4 text-sm font-medium text-white transition-all hover:border-oak hover:bg-oak/10"
              >
                <span>Get in Touch</span>

                <span className="text-oak transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/projects"
                className="group flex items-center justify-between border border-white/10 px-5 py-4 text-sm font-medium text-white/50 transition-all hover:border-white/20 hover:text-white"
              >
                <span>View Projects</span>

                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/25">
                Direct Line
              </p>

              <a
                href="tel:+447918406766"
                className="mt-1 block text-lg font-medium text-white/70 transition hover:text-white"
              >
                +44 7918 406766
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}






