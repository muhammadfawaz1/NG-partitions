import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function HeroVideo() {
  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-ink text-plaster">
      <Image
        alt="Premium commercial lobby interior by N&G Partitions"
        className="object-cover"
        fill
        priority
        sizes="100vw"
        src="/assets/images/hero/lobby-reception.jpeg"
      />
      <video
        aria-hidden="true"
        autoPlay
        className="motion-video absolute inset-0 h-full w-full origin-left scale-[1.08] object-cover object-left"
        loop
        muted
        playsInline
        poster="/assets/images/hero/lobby-reception.jpeg"
        preload="metadata"
      >
        <source src="/assets/video/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/58 to-ink/18" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(18,20,22,0.46),rgba(18,20,22,0.04)_42%,rgba(18,20,22,0.76))]" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-ink/62 via-ink/20 to-transparent" />

      <Container className="relative flex min-h-[92svh] items-end pb-14 pt-32 md:pb-20 lg:pt-40">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,0.9fr)_320px] lg:items-end">
          <div className="max-w-5xl">
            <p className="mb-5 text-sm font-medium text-concrete">
              N&G Partitions LTD / UK Commercial Interiors
            </p>
            <h1 className="font-display text-5xl font-normal leading-[0.95] text-white md:text-7xl lg:text-8xl">
              Drylining & Interior Specialists
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-plaster/78 md:text-2xl md:leading-9">
              Precision-built commercial interiors across the UK.
            </p>
            <p className="mt-3 max-w-2xl text-base leading-7 text-plaster/62 md:text-lg">
              Partitions, Suspended Ceilings, SFS & Acoustic Solutions
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/projects">View Projects</Button>
              <Button href="/contact" variant="secondary">Get in Touch</Button>
            </div>
          </div>

          <div className="grid gap-3 border-l border-white/15 pl-5 text-sm text-plaster/68">
            <p className="text-plaster">Commercial packages</p>
            <p>SFS / Drylining / Ceilings / Acoustics</p>
            <p className="pt-4 text-plaster">Based in Peterborough</p>
            <p>Delivering for commercial sites across the UK.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
