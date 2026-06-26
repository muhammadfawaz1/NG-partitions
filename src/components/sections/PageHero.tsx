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
  /** Pass true on the services page for the enhanced cinematic treatment */
  variant?: "default" | "cinematic";
};

export function PageHero({
  eyebrow,
  image,
  tags = [],
  text,
  title,
  variant = "default",
}: PageHeroProps) {
  const isCinematic = variant === "cinematic";

  return (
    <section
      className={[
        "relative overflow-hidden bg-ink text-plaster",
        isCinematic ? "min-h-[82svh] pt-28 md:pt-40" : "min-h-[68svh] pt-28 md:pt-36",
      ].join(" ")}
    >
      {/* ── Background image ── */}
      <Image
        alt={image.alt}
        className="object-cover"
        fill
        priority
        sizes="100vw"
        src={image.src}
      />

      {/* ── Gradient stack ── */}
      {isCinematic ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e10]/95 via-[#0c0e10]/60 to-[#0c0e10]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e10]/90 via-[#0c0e10]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1208]/30 via-transparent to-[#0a0f18]/20" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/52 to-ink/18" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(18,20,22,0.24),rgba(18,20,22,0.8))]" />
        </>
      )}

      {/* ── Content ──
          CHANGED: was items-end (text glued to the bottom edge, leaving a large
          unbalanced gap above). Now items-center so the block sits with even
          breathing room above and below, regardless of how tall min-h is. */}
      <Container
        className={[
          "relative flex",
          isCinematic ? "min-h-[72svh] items-center" : "min-h-[58svh] items-center",
        ].join(" ")}
      >
        <div className={isCinematic ? "max-w-4xl" : "max-w-5xl"}>

          {/* Eyebrow — both variants now use the ruled-line + tracked uppercase treatment */}
          {eyebrow ? (
            <div className="mb-7 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="block h-px w-8 bg-oak/70"
              />
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-oak">
                {eyebrow}
              </p>
            </div>
          ) : null}

          {/* Title */}
          {isCinematic ? (
            <h1
              className="font-display font-normal leading-[0.94] tracking-[-0.025em] text-white"
              style={{
                fontSize: "clamp(2.8rem, 6.5vw, 5.6rem)",
                textShadow: "0 2px 40px rgba(0,0,0,0.35)",
              }}
            >
              {title.split(",").map((part, i, arr) => (
                <span key={i} className="block">
                  {part.trim()}
                  {i < arr.length - 1 ? "," : ""}
                </span>
              ))}
            </h1>
          ) : (
            <h1
              className="font-display font-normal leading-[0.96] tracking-[-0.02em] text-white"
              style={{
                fontSize: "clamp(2.6rem, 6vw, 5.2rem)",
                textShadow: "0 2px 32px rgba(0,0,0,0.3)",
              }}
            >
              {title}
            </h1>
          )}

          {/* Descriptor text */}
          {text ? (
            isCinematic ? (
              <div className="mt-8 flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="mt-1.5 block h-10 w-px shrink-0 bg-oak/40"
                />
                <p
                  className="max-w-2xl text-lg leading-8 text-white/58 md:text-xl md:leading-9"
                  style={{ letterSpacing: "0.005em" }}
                >
                  {text}
                </p>
              </div>
            ) : (
              /* Default variant: left accent line + refined text opacity */
              <div className="mt-7 flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="mt-1.5 block h-10 w-px shrink-0 bg-oak/40"
                />
                <p className="max-w-2xl text-lg leading-8 text-white/60 md:text-xl md:leading-9">
                  {text}
                </p>
              </div>
            )
          ) : null}

          {/* Tags */}
          {tags.length ? (
            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag invert key={tag}>
                  {tag}
                </Tag>
              ))}
            </div>
          ) : null}

          {/* Cinematic: service discipline pills */}
          {isCinematic && (
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              {["SFS", "Drylining", "Ceilings", "Acoustics"].map((disc, i) => (
                <span
                  key={disc}
                  className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/45"
                >
                  {i > 0 && (
                    <span aria-hidden="true" className="h-px w-3 bg-white/20" />
                  )}
                  {disc}
                </span>
              ))}
            </div>
          )}
        </div>
      </Container>

      {/* Cinematic: bottom fade into page bg */}
      {isCinematic && (
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-plaster/8 to-transparent"
        />
      )}
    </section>
  );
}