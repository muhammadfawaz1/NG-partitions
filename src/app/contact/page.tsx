"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, MapPin, Phone, CheckCircle, AlertCircle } from "lucide-react";

import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Email 1 — To N&G owner
    data.append("access_key", "9a0ae4d8-a2c2-44fa-8ad5-fc9756b797cc");
    data.append("from_name", "N&G Partitions Website");
    data.append("subject", `New Enquiry from ${userName} - N&G Partitions`);

    // Email 2 — Auto reply to user
    data.append("replyto", userEmail);
    data.append("autoresponse_subject", "Thank you for your enquiry - N&G Partitions LTD");
    data.append("autoresponse_message", `Hi ${userName},

Thank you for contacting N&G Partitions LTD.

We have received your enquiry and one of our team will be in touch with you within 24 hours.

If your matter is urgent, please call us directly on +44 7918 406766.

Kind regards,
N&G Partitions LTD
+44 7918 406766
ng.partitionsltd@gmail.com
97 Whittlesey Road, Peterborough, PE2 8RW`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
        setUserEmail("");
        setUserName("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

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
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-md bg-white p-6 shadow-architectural md:p-8 lg:p-10"
            >
              {status === "success" && (
                <div className="mb-6 flex items-center gap-3 rounded-md bg-green-50 px-4 py-4 text-green-700">
                  <CheckCircle className="h-5 w-5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Enquiry sent successfully!</p>
                    <p className="text-sm">We'll be in touch within 24 hours. Check your email for confirmation.</p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 flex items-center gap-3 rounded-md bg-red-50 px-4 py-4 text-red-700">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p className="text-sm font-medium">Something went wrong. Please try again or call us directly.</p>
                </div>
              )}

              <div className="grid gap-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-ink" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    className="h-12 w-full rounded-md border border-ink/15 bg-plaster px-4 text-base text-ink outline-none transition focus:border-oak focus:ring-2 focus:ring-oak/20"
                    id="name"
                    name="name"
                    required
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      className="h-12 w-full rounded-md border border-ink/15 bg-plaster px-4 text-base text-ink outline-none transition focus:border-oak focus:ring-2 focus:ring-oak/20"
                      id="email"
                      name="email"
                      required
                      type="email"
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink" htmlFor="phone">
                      Phone Number
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

                <Button
                  className="w-full sm:w-fit"
                  showArrow={false}
                  type="submit"
                  variant="dark"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending..." : "Send Enquiry"}
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </Section>
    </>
  );
}