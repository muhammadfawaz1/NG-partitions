import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { navigation, site } from "@/data/site";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-plaster">
      <Container>
        <div className="grid gap-12 border-t border-white/10 py-14 md:grid-cols-[1.2fr_0.7fr_0.7fr] lg:py-20">
          <div>
            <Link className="mb-6 inline-flex items-center gap-3" href="/">
              <span className="flex h-11 w-11 items-center justify-center rounded-md border border-white/15 bg-white/5 text-sm font-semibold">
                N&G
              </span>
              <span className="text-sm font-medium text-plaster/85">{site.name}</span>
            </Link>
            <p className="max-w-md text-base leading-7 text-plaster/65">{site.description}</p>
            <div className="mt-8 grid gap-4 text-sm text-plaster/70">
              <Link className="flex items-center gap-3 transition hover:text-white" href={`tel:${site.phone}`}>
                <Phone className="h-4 w-4 text-oak" />
                {site.phone}
              </Link>
              <Link className="flex items-center gap-3 transition hover:text-white" href={`mailto:${site.email}`}>
                <Mail className="h-4 w-4 text-oak" />
                {site.email}
              </Link>
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-oak" />
                {site.address}
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-sm font-medium text-white">Navigation</h2>
            <ul className="grid gap-3 text-sm text-plaster/65">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link className="transition hover:text-white" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-5 text-sm font-medium text-white">Services</h2>
            <ul className="grid gap-3 text-sm text-plaster/65">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link className="transition hover:text-white" href={`/services/${service.slug}`}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-sm text-plaster/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>{site.domain}</p>
        </div>
      </Container>
    </footer>
  );
}
