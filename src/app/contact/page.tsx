import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { ImageFrame } from "@/components/media/ImageFrame";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact N&G Partitions LTD for commercial drylining, partitions, SFS, suspended ceilings and acoustic interior packages."
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        image={{
          src: "/assets/images/hero/lobby-reception.jpeg",
          alt: "Premium commercial reception interior with feature wall"
        }}
        text="Discuss commercial interior packages, current project requirements or upcoming tender opportunities."
        title="Start the conversation with N&G Partitions."
      />

      <Section className="bg-plaster">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-5 text-sm font-medium text-oak">Direct Details</p>
              <h2 className="text-3xl font-medium leading-tight text-ink md:text-5xl">
                Clear contact routes for serious project enquiries.
              </h2>
              <div className="mt-10 grid gap-4 text-base text-ink/70">
                <Link
                  className="flex items-center gap-4 border-t border-ink/10 py-5 transition hover:text-ink"
                  href={`tel:${site.phone}`}
                >
                  <Phone className="h-5 w-5 text-oak" />
                  {site.phone}
                </Link>
                <Link
                  className="flex items-center gap-4 border-t border-ink/10 py-5 transition hover:text-ink"
                  href={`mailto:${site.email}`}
                >
                  <Mail className="h-5 w-5 text-oak" />
                  {site.email}
                </Link>
                <p className="flex items-start gap-4 border-t border-ink/10 py-5">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-oak" />
                  {site.address}
                </p>
              </div>
              <ImageFrame
                alt="Commercial ceiling and interior finish detail"
                aspect="aspect-[16/12]"
                className="mt-10"
                sizes="(min-width: 1024px) 38vw, 100vw"
                src="/assets/images/ceilings/ceiling-grid-closeup.jpeg"
              />
            </div>

            <form
              action={`mailto:${site.email}`}
              className="rounded-md bg-white p-6 shadow-architectural md:p-8 lg:p-10"
              encType="text/plain"
              method="post"
            >
              <div className="grid gap-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-ink" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="h-12 w-full rounded-md border border-ink/15 bg-plaster px-4 text-base text-ink outline-none transition focus:border-oak focus:ring-2 focus:ring-oak/20"
                    id="name"
                    name="name"
                    required
                    type="text"
                  />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="h-12 w-full rounded-md border border-ink/15 bg-plaster px-4 text-base text-ink outline-none transition focus:border-oak focus:ring-2 focus:ring-oak/20"
                      id="email"
                      name="email"
                      required
                      type="email"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      className="h-12 w-full rounded-md border border-ink/15 bg-plaster px-4 text-base text-ink outline-none transition focus:border-oak focus:ring-2 focus:ring-oak/20"
                      id="phone"
                      name="phone"
                      type="tel"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-ink" htmlFor="project">
                    Project Type
                  </label>
                  <select
                    className="h-12 w-full rounded-md border border-ink/15 bg-plaster px-4 text-base text-ink outline-none transition focus:border-oak focus:ring-2 focus:ring-oak/20"
                    id="project"
                    name="project_type"
                  >
                    <option>SFS</option>
                    <option>Drylining & Partitions</option>
                    <option>Suspended Ceilings</option>
                    <option>Acoustic Solutions</option>
                    <option>Commercial Fit-Out</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-ink" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="min-h-40 w-full rounded-md border border-ink/15 bg-plaster px-4 py-3 text-base text-ink outline-none transition focus:border-oak focus:ring-2 focus:ring-oak/20"
                    id="message"
                    name="message"
                    required
                  />
                </div>
                <Button className="w-full sm:w-fit" showArrow={false} type="submit" variant="dark">
                  Send Enquiry
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </Section>
    </>
  );
}
