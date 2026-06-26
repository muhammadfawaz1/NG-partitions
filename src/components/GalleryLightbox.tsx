"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

// One label treatment, reused above every image in the gallery — thin
// line + tracked caps. Oak for process shots, gold for the featured result.
function SectionLabel({ label, tone = "#8B5E3C" }: { label: string; tone?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ height: 1, width: 16, background: tone }} />
      <span
        style={{
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          color: tone,
        }}
      >
        {label}
      </span>
    </div>
  );
}

const GALLERY_GRID_CSS = `
  .gallery-pair { display: grid; gap: 28px; }
  .gallery-pair[data-cols="2"] { grid-template-columns: 1fr 1fr; }
  .gallery-pair[data-cols="3"] { grid-template-columns: 1fr 1fr 1fr; }
  .gallery-pair[data-cols="4"] { grid-template-columns: repeat(4, 1fr); }
  @media (max-width: 560px) {
    .gallery-pair { grid-template-columns: 1fr !important; gap: 32px; }
  }
  @media (min-width: 561px) and (max-width: 820px) {
    .gallery-pair[data-cols="3"], .gallery-pair[data-cols="4"] {
      grid-template-columns: 1fr 1fr !important;
    }
  }
`;

export function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Generalized: every image except the last is a "phase" shot; the last
  // image is always the final/completed shot — works whether a project has
  // 2 phase shots + 1 final, or 3 phase shots + 1 final, etc.
  const finalIndex = images.length - 1;
  const initial = images.slice(0, finalIndex);
  const final = images[finalIndex];

  const nav = useCallback((dir: number) => {
    setOpen((prev) => prev === null ? null : ((prev + dir + images.length) % images.length));
  }, [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (open === null) return;
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") nav(1);
      if (e.key === "ArrowLeft") nav(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, nav]);

  useEffect(() => {
    document.body.style.overflow = open !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const labelFor = (i: number) => {
    if (i < finalIndex) return `PHASE ${String(i + 1).padStart(2, "0")}`;
    return "FINAL RESULT";
  };

  return (
    <>
      {/* ── PHASE IMAGES — variable count (2, 3...), each with its own label above it ── */}
      <style dangerouslySetInnerHTML={{ __html: GALLERY_GRID_CSS }} />

      <div className="gallery-pair" data-cols={initial.length}>
        {initial.map((img, i) => (
          <div key={img.src}>
            <div style={{ marginBottom: 14 }}>
              <SectionLabel label={`Phase ${String(i + 1).padStart(2, "0")}`} tone="#8B5E3C" />
            </div>
            <button
              onClick={() => setOpen(i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: "relative", aspectRatio: "4/3", overflow: "hidden",
                cursor: "pointer", background: "none", border: "none", padding: 0,
                display: "block", width: "100%",
              }}
              aria-label={`Open image: ${img.alt}`}
            >
              <Image
                src={img.src} alt={img.alt} fill
                className="object-cover"
                sizes="(min-width: 820px) 33vw, (min-width: 560px) 50vw, 100vw"
                style={{ transition: "transform 0.6s ease", transform: hoveredIndex === i ? "scale(1.04)" : "scale(1)" }}
              />
              {/* Bottom scrim — gives the caption a guaranteed dark zone to sit on,
                  instead of floating directly on whatever the photo happens to show */}
              {img.caption && (
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(10,8,5,0.6) 0%, rgba(10,8,5,0) 45%)",
                }} />
              )}
              {/* Hover overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: hoveredIndex === i ? "rgba(139,94,60,0.3)" : "rgba(0,0,0,0)",
                transition: "background 0.35s ease",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  border: "1.5px solid rgba(255,255,255,0.9)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: hoveredIndex === i ? 1 : 0,
                  transform: hoveredIndex === i ? "scale(1)" : "scale(0.7)",
                  transition: "all 0.3s ease",
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2h4M2 2v4M12 2H8M12 2v4M2 12h4M2 12v-4M12 12H8M12 12v-4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              {img.caption && (
                <p style={{
                  position: "absolute", bottom: 12, left: 14, right: 14,
                  fontSize: "9.5px", fontWeight: 500, letterSpacing: ".01em",
                  color: "rgba(255,255,255,0.8)", margin: 0, lineHeight: 1.5,
                }}>
                  {img.caption}
                </p>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* ── FINAL IMAGE — always the last array item, sized as the climax ── */}
      {final && (
        <div style={{ marginTop: 48 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            marginBottom: 16, flexWrap: "wrap",
          }}>
            <SectionLabel label="Final Result" tone="#C9A227" />
            <span style={{
              fontSize: "9px", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase",
              color: "rgba(139,94,60,0.85)",
              border: "1px solid rgba(139,94,60,0.3)", padding: "2px 8px", borderRadius: 2,
            }}>
              ★ Featured
            </span>
          </div>

          <button
            onClick={() => setOpen(finalIndex)}
            onMouseEnter={() => setHoveredIndex(99)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/9",
              overflow: "hidden", cursor: "pointer",
              background: "none", border: "none", padding: 0, display: "block",
            }}
            aria-label={`Open final image: ${final.alt}`}
          >
            <Image
              src={final.src} alt={final.alt} fill priority={false}
              className="object-cover"
              sizes="(min-width: 768px) 1150px, 100vw"
              style={{ transition: "transform 0.8s ease", transform: hoveredIndex === 99 ? "scale(1.03)" : "scale(1)" }}
            />
            {/* Vertical vignette anchored at the bottom, where the caption actually
                sits — a horizontal gradient doesn't guarantee contrast for bottom text */}
            <div style={{
              position: "absolute", inset: 0,
              background:
                "linear-gradient(to top, rgba(8,6,4,0.72) 0%, rgba(8,6,4,0) 50%), " +
                "linear-gradient(to bottom, rgba(8,6,4,0.32) 0%, rgba(8,6,4,0) 28%)",
            }} />

            {/* Caption — balanced wrapping avoids orphaned-word line breaks */}
            <div style={{ position: "absolute", bottom: 28, left: 24, right: 24 }}>
              <p style={{
                fontFamily: "var(--font-display, Georgia, serif)",
                fontSize: "clamp(1.5rem, 3.2vw, 2.6rem)",
                fontWeight: 300, fontStyle: "italic",
                color: "rgba(255,255,255,0.94)", margin: 0, letterSpacing: "-0.02em",
                lineHeight: 1.2, maxWidth: 620,
                textWrap: "balance",
                textShadow: "0 2px 20px rgba(0,0,0,0.45)",
              } as React.CSSProperties}>
                {final.caption ?? "The finished space."}
              </p>
            </div>

            {/* Hover expand icon */}
            <div style={{
              position: "absolute", right: 24, top: 24,
              display: "flex", alignItems: "center", gap: 10,
              opacity: hoveredIndex === 99 ? 1 : 0,
              transform: hoveredIndex === 99 ? "translateX(0)" : "translateX(10px)",
              transition: "all 0.35s ease",
            }}>
              <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>
                VIEW FULL IMAGE
              </span>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                border: "1.5px solid rgba(255,255,255,0.7)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2h4M2 2v4M12 2H8M12 2v4M2 12h4M2 12v-4M12 12H8M12 12v-4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            {/* Animated hover tint */}
            <div style={{
              position: "absolute", inset: 0,
              background: hoveredIndex === 99 ? "rgba(139,94,60,0.16)" : "rgba(0,0,0,0)",
              transition: "background 0.4s ease",
            }} />
          </button>
        </div>
      )}

      {/* ══════════════ LIGHTBOX ══════════════ */}
      {open !== null && (
        <div
          onClick={() => setOpen(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(8,6,4,0.97)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            animation: "fadeIn 0.25s ease",
          }}
        >
          <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>

          {/* Top bar */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            padding: "20px 28px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(8,6,4,0.8)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ height: 1, width: 16, background: open === finalIndex ? "#C9A227" : "#8B5E3C" }} />
              <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: open === finalIndex ? "#C9A227" : "#8B5E3C" }}>
                {labelFor(open)}
              </span>
              {open === finalIndex && (
                <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(139,94,60,0.7)", marginLeft: 4 }}>
                  ★ Featured
                </span>
              )}
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setOpen(null); }}
              style={{ background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)", padding: "6px 16px", cursor: "pointer", fontSize: "9px", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase" }}
            >
              ESC · CLOSE
            </button>
          </div>

          {/* Main image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative", width: "min(92vw, 1200px)",
              aspectRatio: open === finalIndex ? "16/9" : "4/3",
              animation: "slideUp 0.3s ease",
              boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Image
              src={images[open].src}
              alt={images[open].alt}
              fill className="object-cover"
              sizes="92vw" priority
            />
            {images[open].caption && (
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,6,4,0.65) 0%, transparent 45%)" }} />
            )}
            {images[open].caption && (
              <p style={{
                position: "absolute", bottom: 18, left: 22, right: 22,
                fontFamily: "var(--font-display, Georgia, serif)",
                fontStyle: "italic", fontWeight: 300,
                fontSize: open === finalIndex ? "clamp(1.1rem, 2.2vw, 1.6rem)" : "0.95rem",
                color: "rgba(255,255,255,0.85)", margin: 0, letterSpacing: "-0.01em",
                lineHeight: 1.4,
              }}>
                {images[open].caption}
              </p>
            )}
          </div>

          {/* Nav controls */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 24 }}
          >
            <button
              onClick={() => nav(-1)}
              style={{ background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)", padding: "10px 24px", cursor: "pointer", fontSize: "9px", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", transition: "all 0.2s" }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.35)"; (e.target as HTMLElement).style.color = "rgba(255,255,255,0.85)"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; (e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
            >
              ← Prev
            </button>

            {/* Dot indicators */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setOpen(i)}
                  style={{
                    width: i === open ? 20 : 6, height: 6,
                    borderRadius: 3, border: "none", cursor: "pointer", padding: 0,
                    background: i === open ? "#8B5E3C" : "rgba(255,255,255,0.18)",
                    transition: "all 0.3s ease",
                  }}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => nav(1)}
              style={{ background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)", padding: "10px 24px", cursor: "pointer", fontSize: "9px", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", transition: "all 0.2s" }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.35)"; (e.target as HTMLElement).style.color = "rgba(255,255,255,0.85)"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; (e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
            >
              Next →
            </button>
          </div>

          <p style={{ marginTop: 14, fontSize: "9px", color: "rgba(255,255,255,0.18)", letterSpacing: ".1em", textTransform: "uppercase" }}>
            {open + 1} / {images.length} · Arrow keys to navigate
          </p>
        </div>
      )}
    </>
  );
}






