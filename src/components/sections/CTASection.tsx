import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type CTASectionProps = {
  title?: string;
  text?: string;
};

export function CTASection({
  text = "Speak to N&G Partitions about a commercial interior package that needs technical control, visual finish and dependable site delivery.",
  title = "Ready to discuss your next interior package?"
}: CTASectionProps) {
  return (
    <section className="bg-plaster py-20 md:py-28">
      <Container>
        <div className="grid gap-8 rounded-md bg-ink p-8 text-plaster md:grid-cols-[1fr_auto] md:items-end md:p-12 lg:p-16">
          <div>
            <p className="mb-4 text-sm font-medium text-oak">Project Enquiries</p>
            <h2 className="max-w-3xl text-3xl font-medium leading-tight text-white md:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-plaster/68 md:text-lg">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Button href="/contact">Get in Touch</Button>
            <Button href="/projects" variant="secondary">View Projects</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
