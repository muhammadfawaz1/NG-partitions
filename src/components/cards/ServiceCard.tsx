import Link from "next/link";

import type { Service } from "@/data/services";
import { ImageFrame } from "@/components/media/ImageFrame";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      className="group block border-t border-ink/10 pt-5 transition duration-300 ease-premium hover:border-oak"
      href={`/services/${service.slug}`}
    >
      <ImageFrame
        alt={service.heroImage.alt}
        aspect="aspect-[4/5]"
        className="mb-6"
        imageClassName="brightness-[0.92]"
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        src={service.heroImage.src}
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-3 text-sm font-medium text-oak">{service.eyebrow}</p>
          <h3 className="text-2xl font-medium leading-tight text-ink">{service.title}</h3>
        </div>
        <span
          aria-hidden="true"
          className="mt-1 text-xl text-ink/35 transition duration-300 group-hover:translate-x-1 group-hover:text-oak"
        >
          /
        </span>
      </div>
      <p className="mt-4 max-w-sm text-base leading-7 text-ink/64">{service.summary}</p>
    </Link>
  );
}






