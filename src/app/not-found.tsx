import Link from "next/link";

import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="bg-plaster pt-36">
      <Container className="py-24">
        <p className="mb-5 text-sm font-medium text-oak">404</p>
        <h1 className="max-w-2xl text-4xl font-medium leading-tight text-ink md:text-6xl">
          This page is not on the drawing set.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-ink/64">
          Return to the main site to explore N&G Partitions services and recent commercial interior work.
        </p>
        <Link
          className="mt-8 inline-flex rounded-md bg-ink px-5 py-3 text-sm font-medium text-plaster transition hover:bg-coal"
          href="/"
        >
          Back to Home
        </Link>
      </Container>
    </section>
  );
}






