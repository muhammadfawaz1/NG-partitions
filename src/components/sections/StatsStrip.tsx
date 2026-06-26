"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  label: string;
  isNumeric: boolean;
  value: number;
  suffix: string;
  display?: string;
};

const stats: Stat[] = [
  { label: "Years delivering", isNumeric: true, value: 10, suffix: "+" },
  { label: "Wide coverage", isNumeric: false, value: 0, suffix: "", display: "UK" },
  { label: "Core disciplines", isNumeric: true, value: 4, suffix: "" },
  { label: "Commercial focus", isNumeric: true, value: 100, suffix: "%" },
];

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function useCountUp(target: number, shouldStart: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!shouldStart || startedRef.current) return;
    startedRef.current = true;

    let startTime: number | null = null;
    let frame: number;

    function tick(timestamp: number) {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.round(easeOutQuart(progress) * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [shouldStart, target, duration]);

  return value;
}

function StatItem({ stat, inView, delay }: { stat: Stat; inView: boolean; delay: number }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(timeout);
  }, [inView, delay]);

  const count = useCountUp(stat.value, ready);

  return (
    <div
      className={`flex flex-col gap-2 py-8 transition-all duration-700 ease-out sm:px-8 sm:first:pl-0 ${
        ready ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <p
        className={`font-display text-5xl font-normal tracking-[-0.01em] text-ink transition-transform duration-700 ease-out sm:text-6xl lg:text-7xl ${
          ready ? "scale-100" : "scale-90"
        }`}
      >
        {stat.isNumeric ? count : stat.display}
        {stat.isNumeric ? stat.suffix : ""}
      </p>
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink/40">
        {stat.label}
      </p>
      <span className={`h-px bg-oak transition-all duration-700 ${ready ? "w-10" : "w-0"}`} />
    </div>
  );
}

export function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      // threshold: 0 + a small rootMargin makes this fire as soon as any
      // part of the strip is on screen, instead of waiting for 40% of it
      // to be visible — far more reliable for a strip sitting near the top
      // of the page, where it may already be fully visible on load.
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);

    // Failsafe: if the observer hasn't fired shortly after mount (some
    // browsers don't report an already-on-screen element as "intersecting"
    // until the next scroll/resize tick), start the animation anyway.
    const failsafe = setTimeout(() => setInView(true), 800);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="mt-16 grid grid-cols-2 divide-y divide-ink/8 border-t border-ink/8 sm:grid-cols-4 sm:divide-y-0 sm:divide-x"
    >
      {stats.map((stat, index) => (
        <StatItem key={stat.label} stat={stat} inView={inView} delay={index * 120} />
      ))}
    </div>
  );
}






