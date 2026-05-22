import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";

type PageHeroProps = {
  eyebrow?: string;
  image: {
    src: string;
    alt: string;
  };
  tags?: string[];
  text?: string;
  title: string;
};

export function PageHero({ eyebrow, image, tags = [], text, title }: PageHeroProps) {
  return (
    <section className="relative min-h-[68svh] overflow-hidden bg-ink pt-28 text-plaster md:pt-36">
      <Image
        alt={image.alt}
        className="object-cover"
        fill
        priority
        sizes="100vw"
        src={image.src}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/52 to-ink/18" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(18,20,22,0.24),rgba(18,20,22,0.8))]" />
      <Container className="relative flex min-h-[58svh] items-end pb-14">
        <div className="max-w-5xl">
          {eyebrow ? <p className="mb-5 text-sm font-medium text-concrete">{eyebrow}</p> : null}
          <h1 className="font-display text-5xl font-normal leading-[0.98] text-white md:text-7xl">
            {title}
          </h1>
          {text ? <p className="mt-6 max-w-3xl text-lg leading-8 text-plaster/72 md:text-xl">{text}</p> : null}
          {tags.length ? (
            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag invert key={tag}>{tag}</Tag>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
