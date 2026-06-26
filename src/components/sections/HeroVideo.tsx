"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen min-h-[640px] overflow-hidden bg-ink">
      <Image
        alt="Premium commercial interior by N&G Partitions"
        className={`object-cover transition-opacity duration-700 ${videoLoaded ? "opacity-0" : "opacity-100"}`}
        fill
        priority
        sizes="100vw"
        src="/assets/images/hero/lobby-reception.webp"
      />

      <video
        ref={videoRef}
        aria-hidden="true"
        autoPlay
        className="motion-video absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
        loop
        muted
        onCanPlayThrough={() => setVideoLoaded(true)}
        playsInline
        poster="/assets/images/hero/lobby-reception.webp"
        preload="metadata"
        style={{
          opacity: videoLoaded ? 1 : 0,
          transform: `scale(${1.04 + scrollY * 0.00008}) translateY(${scrollY * 0.18}px)`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        <source src="/assets/video/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />
      <div className="absolute top-0 inset-x-0 h-px bg-white/10" />

      <Container className="relative flex h-screen min-h-[640px] flex-col justify-between pb-12 pt-0">

        <div className="flex items-center justify-between pt-[88px]">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/40">
            UK Commercial Interiors
          </p>
          <p className="hidden text-[11px] font-medium tracking-[0.18em] uppercase text-white/30 md:block">
            Est. Peterborough
          </p>
        </div>

        <div className="max-w-[780px]">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-oak" />
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-oak">
              N&G Partitions LTD
            </p>
          </div>

          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-normal leading-[0.92] tracking-[-0.02em] text-white">
            Precision<br />
            <span className="text-white/55">Interior</span><br />
            Specialists
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-8 text-white/60 md:text-xl">
            Drylining, partitions, suspended ceilings & acoustic solutions —
            delivered with architectural restraint across the UK.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 bg-white px-7 py-4 text-sm font-medium tracking-wide text-ink transition-all duration-300 hover:bg-oak hover:text-white"
            >
              View Projects
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border border-white/25 px-7 py-4 text-sm font-medium tracking-wide text-white/80 transition-all duration-300 hover:border-white/60 hover:text-white"
            >
              Start a Project
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-white/10 pt-6">
          <div className="flex gap-8 sm:gap-12">
            {[
              { value: "SFS", label: "Structural framing" },
              { value: "Dry", label: "Lining & partitions" },
              { value: "Acoustic", label: "Interior solutions" },
            ].map((stat) => (
              <div key={stat.value}>
                <p className="text-sm font-medium text-white">{stat.value}</p>
                <p className="mt-0.5 text-[11px] tracking-wide text-white/35 uppercase">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="hidden flex-col items-center gap-2 md:flex">
            <div className="h-10 w-px overflow-hidden bg-white/15">
              <div
                className="h-full w-full bg-white/60 origin-top"
                style={{ animation: "scrollLine 1.8s ease-in-out infinite" }}
              />
            </div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/30">Scroll</p>
          </div>
        </div>
      </Container>

      <style>{`
        @keyframes scrollLine {
          0% { transform: scaleY(0) translateY(-100%); }
          50% { transform: scaleY(1) translateY(0); }
          100% { transform: scaleY(0) translateY(100%); }
        }
      `}</style>
    </section>
  );
}






