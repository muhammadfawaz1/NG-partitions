import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProject, projects, serviceLabels } from "@/data/projects";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { formatStatus } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.seo.title.replace(" | N&G Partitions", ""),
    description: project.seo.description,
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      images: [project.heroImage.src],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      {/* ── HERO ──
          Height reduced from min-h-[100vh] (full viewport) to roughly match
          the proportions of the Services page's PageHero "cinematic" variant.
          This is an estimate based on the screenshot, not a guaranteed exact
          match — share PageHero.tsx if you want this pixel-identical instead
          of just visually close. */}
      <div className="relative min-h-[78vh] overflow-hidden bg-ink">
        <Image
          src={project.heroImage.src}
          alt={project.heroImage.alt}
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/85" />

        <div className="absolute top-6 left-8 flex items-center gap-3 z-10">
          <Link
            href="/projects"
            className="text-[9px] font-bold tracking-[.18em] uppercase text-white/40 hover:text-white/70 transition-colors"
          >
            Projects
          </Link>
          <span className="text-white/20 text-[9px]">→</span>
          <span className="text-[9px] font-bold tracking-[.12em] uppercase text-white/60">
            {project.title}
          </span>
        </div>

        <div className="absolute top-6 right-8 flex gap-2 z-10">
          {project.services.map((s) => (
            <span
              key={s}
              className="border border-oak/40 bg-oak/15 text-oak px-3 py-1 text-[8px] font-bold tracking-[.12em] uppercase rounded-sm"
            >
              {serviceLabels[s]}
            </span>
          ))}
        </div>

        <div className="absolute inset-0 z-10 flex flex-col justify-center">
          <Container>
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-6 bg-oak" />
                <span className="text-[9px] font-bold tracking-[.2em] uppercase text-oak">
                  {project.eyebrow}
                </span>
              </div>
              <h1
                className="font-display font-normal text-white leading-[1.05] tracking-[-0.02em] mb-6"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
              >
                {project.title}
              </h1>
              <p
                className="max-w-md text-sm leading-7 text-white/55 md:text-base md:leading-8"
                style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: 16 }}
                dangerouslySetInnerHTML={{
                  __html: project.shortDescription
                    .replace(/<span[^>]*>/g, "")
                    .replace(/<\/span>/g, ""),
                }}
              />
            </div>
          </Container>
        </div>
      </div>

      {/* ── BLACK META STRIP ── */}
      <div
        style={{
          background: "#111111",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Container>
          <div className="flex items-stretch overflow-x-auto">
            {[
              { label: "Location", value: project.location ?? "—" },
              {
                label: "Package",
                value: project.services.map((s) => serviceLabels[s]).join(" · "),
              },
              { label: "Period", value: project.year ?? "Recent work" },
              { label: "Status", value: formatStatus(project.status) },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 py-4 pr-8 ${
                  i !== 0 ? "pl-8 border-l border-white/[0.08]" : ""
                } whitespace-nowrap`}
              >
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,.3)",
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "rgba(255,255,255,.65)",
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
            <div className="ml-auto flex items-center gap-3 py-4 pl-8 border-l border-white/[0.08]">
              {projects.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className={`text-[8px] font-bold tracking-[.14em] uppercase transition-colors ${
                    p.slug === slug
                      ? "text-oak"
                      : "text-white/20 hover:text-white/45"
                  }`}
                >
                  <span className="mr-1 text-white/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {serviceLabels[p.services[0]] ?? p.title.split(" ")[0]}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* ── CREAM CONTENT AREA ── */}
      <div style={{ background: "#F4F0EA" }}>
        <Container>

          {/* ── OVERVIEW ── */}
          <div
            style={{
              padding: "72px 0 60px",
              borderBottom: "1px solid rgba(26,26,26,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 36,
              }}
            >
              <div style={{ height: 1, width: 24, background: "#8B5E3C" }} />
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "#8B5E3C",
                }}
              >
                Project Overview
              </span>
            </div>

            <div
              style={{ display: "grid", gap: "48px", alignItems: "start" }}
              className="overview-grid"
            >
              <style>{`
                .overview-grid { grid-template-columns: 1fr; }
                @media(min-width:768px){ .overview-grid { grid-template-columns: 1fr 1fr; } }
              `}</style>

              <p
                style={{
                  fontFamily: "var(--font-display, Georgia, serif)",
                  fontSize: "clamp(1.35rem, 2.2vw, 1.8rem)",
                  fontWeight: 300,
                  lineHeight: 1.55,
                  letterSpacing: "-0.02em",
                  color: "#1A1A1A",
                  margin: 0,
                }}
                dangerouslySetInnerHTML={{
                  __html: project.fullDescription
                    .replace(/<span[^>]*>/g, "")
                    .replace(/<\/span>/g, ""),
                }}
              />

              <div style={{ paddingTop: 4 }}>
                <p
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: 1.9,
                    color: "rgba(26,26,26,0.52)",
                    margin: "0 0 28px",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: project.shortDescription
                      .replace(/<span[^>]*>/g, "")
                      .replace(/<\/span>/g, ""),
                  }}
                />
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
                  {project.services.map((s, i) => (
                    <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                      {i > 0 && (
                        <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(139,94,60,0.4)" }} />
                      )}
                      <span
                        style={{
                          color: "#8B5E3C",
                          fontSize: "9px",
                          fontWeight: 700,
                          letterSpacing: ".16em",
                          textTransform: "uppercase",
                        }}
                      >
                        {serviceLabels[s]}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── SCOPE + OUTCOMES ── */}
          <div
            style={{
              display: "grid",
              borderBottom: "1px solid rgba(26,26,26,0.08)",
            }}
            className="scope-grid"
          >
            <style>{`
              .scope-grid { grid-template-columns: 1fr; }
              @media(min-width:768px){ .scope-grid { grid-template-columns: 1fr 1fr; } }
              .scope-col { padding: 48px 0 48px; }
              @media(min-width:768px){
                .scope-col { padding: 48px 48px 48px 0; border-right: 1px solid rgba(26,26,26,0.08); border-bottom: none; }
                .outcomes-col { padding: 48px 0 48px 48px; }
              }
              .outcomes-col { padding: 40px 0 48px; border-top: 1px solid rgba(26,26,26,0.08); }
              @media(min-width:768px){ .outcomes-col { padding: 48px 0 48px 48px; border-top: none; border-left: 1px solid rgba(26,26,26,0.08); } }
            `}</style>

            {/* Scope */}
            <div className="scope-col">
              <p
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "rgba(26,26,26,0.32)",
                  marginBottom: 20,
                }}
              >
                Scope of Works
              </p>
              {project.scope.map((item, i) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    padding: "13px 0",
                    borderTop:
                      i === 0 ? "none" : "1px solid rgba(26,26,26,0.06)",
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      flexShrink: 0,
                      marginTop: 2,
                      border: "1px solid rgba(139,94,60,0.22)",
                      background: "rgba(139,94,60,0.04)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 2,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 1,
                        background: "#8B5E3C",
                        display: "block",
                      }}
                    />
                  </span>
                  <span
                    style={{
                      fontSize: "0.84rem",
                      color: "#1A1A1A",
                      lineHeight: 1.65,
                      fontWeight: 400,
                    }}
                  >
                    {item.replace(/<[^>]*>/g, "")}
                  </span>
                </div>
              ))}
            </div>

            {/* Outcomes */}
            <div className="outcomes-col">
              <p
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "rgba(26,26,26,0.32)",
                  marginBottom: 20,
                }}
              >
                Outcomes Delivered
              </p>
              {project.outcomes.map((item, i) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    padding: "13px 0",
                    borderTop:
                      i === 0 ? "none" : "1px solid rgba(26,26,26,0.06)",
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      flexShrink: 0,
                      marginTop: 2,
                      background: "rgba(34,120,74,0.08)",
                      border: "1px solid rgba(34,120,74,0.22)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 2,
                      fontSize: "9px",
                      color: "#22784A",
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontSize: "0.84rem",
                      color: "#1A1A1A",
                      lineHeight: 1.65,
                      fontWeight: 400,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: item
                        .replace(/<[^>]*>/g, "")
                        .replace(/style="[^"]*"/g, ""),
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── GALLERY ── */}
          {project.gallery.length > 0 && (
            <div style={{ padding: "64px 0 72px" }}>

              {/* Gallery header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  marginBottom: 36,
                  paddingBottom: 20,
                  borderBottom: "1px solid rgba(26,26,26,0.08)",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{ height: 1, width: 20, background: "#8B5E3C" }}
                    />
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: ".2em",
                        textTransform: "uppercase",
                        color: "#8B5E3C",
                      }}
                    >
                      Gallery
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-display, Georgia, serif)",
                      fontSize: "clamp(1.3rem, 2.2vw, 1.9rem)",
                      fontWeight: 300,
                      fontStyle: "italic",
                      color: "#1A1A1A",
                      letterSpacing: "-0.02em",
                      margin: 0,
                    }}
                  >
                    Site progress &amp; finished spatial quality.
                  </p>
                </div>
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "rgba(26,26,26,0.25)",
                  }}
                >
                  {project.gallery.length}{" "}
                  {project.gallery.length === 1 ? "image" : "images"}
                </span>
              </div>

              <GalleryLightbox images={project.gallery} />
            </div>
          )}

        </Container>
      </div>

      {/* ── NEXT PROJECT ── */}
      {nextProject && (
        <Link
          href={`/projects/${nextProject.slug}`}
          className="block group"
          style={{ textDecoration: "none" }}
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              minHeight: 240,
              background: "#111",
            }}
          >
            <Image
              src={nextProject.heroImage.src}
              alt={nextProject.heroImage.alt}
              fill
              className="object-cover transition-all duration-700 group-hover:opacity-50"
              sizes="100vw"
              style={{ opacity: 0.28 }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(100deg, rgba(17,17,17,0.97) 30%, rgba(17,17,17,0.6) 100%)",
              }}
            />
            <Container>
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "52px 0",
                  gap: 24,
                }}
                className="next-row"
              >
                <style>{`.next-row { flex-direction: row; } @media(max-width:580px){ .next-row { flex-direction: column; align-items: flex-start; } }`}</style>
                <div>
                  <p
                    style={{
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: ".2em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.22)",
                      marginBottom: 14,
                    }}
                  >
                    Next project
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-display, Georgia, serif)",
                      fontSize: "clamp(1.5rem, 2.8vw, 2.6rem)",
                      fontWeight: 300,
                      fontStyle: "italic",
                      color: "rgba(255,255,255,0.72)",
                      margin: "0 0 16px",
                      letterSpacing: "-0.025em",
                      lineHeight: 1.1,
                      transition: "color 0.3s ease",
                    }}
                    className="next-title"
                  >
                    <style>{`.group:hover .next-title { color: rgba(255,255,255,0.95) !important; }`}</style>
                    {nextProject.title}
                  </p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {nextProject.services.slice(0, 2).map((s) => (
                      <span
                        key={s}
                        style={{
                          border: "1px solid rgba(201,162,39,0.28)",
                          color: "rgba(201,162,39,0.65)",
                          padding: "3px 10px",
                          fontSize: "8px",
                          fontWeight: 700,
                          letterSpacing: ".12em",
                          textTransform: "uppercase",
                          borderRadius: 2,
                        }}
                      >
                        {serviceLabels[s]}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flexShrink: 0,
                    color: "#C9A227",
                    transition: "gap 0.3s ease",
                  }}
                  className="next-arrow"
                >
                  <style>{`.group:hover .next-arrow { gap: 16px !important; }`}</style>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    View project
                  </span>
                  <span style={{ fontSize: 20, lineHeight: 1 }}>→</span>
                </div>
              </div>
            </Container>
          </div>
        </Link>
      )}

      <CTASection
        text="Share drawings, scope or programme requirements and N&G Partitions can discuss how the package should be approached."
        title="Need the same level of control on your project?"
      />
    </>
  );
}