"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type StatKind = "counter-plus" | "text-reveal" | "counter" | "counter-percent";

interface StatItem {
  value: string;
  label: string;
  kind: StatKind;
  target?: number;
  countDuration?: number;
}

const STATS: StatItem[] = [
  { value: "10+", label: "Years Delivering",  kind: "counter-plus",    target: 10,  countDuration: 600 },
  { value: "UK",  label: "Wide Coverage",     kind: "text-reveal" },
  { value: "4",   label: "Core Disciplines",  kind: "counter",         target: 4,   countDuration: 450  },
  { value: "100%",label: "Commercial Focus",  kind: "counter-percent", target: 100, countDuration: 700 },
];

const TOP_RULE_DURATION           = 400;
const CELL_DURATION               = 500;
const CELL_STAGGER                = 80;
const COUNTER_START_OFFSET        = 60;
const SHIMMER_DELAY_AFTER_LANDING = 400;

// ─────────────────────────────────────────────────────────────────────────────
// FIX: This CSS string is now a module-level constant rendered via
// `dangerouslySetInnerHTML` instead of as a JSX text child (`<style>{`...`}</style>`).
//
// Root cause of the hydration error: when CSS containing literal quote
// characters (e.g. `content: "";`) is rendered as a JSX text child, Next.js
// 14.0.3's server-side HTML serializer can HTML-entity-encode the quotes
// (`&quot;&quot;`) while the client-side render produces literal quotes
// (`""`). React's hydration text-diff then fails because the server and
// client strings don't match character-for-character, which cascades into
// "Text content does not match server-rendered HTML" and forces the whole
// root to fall back to client-side rendering.
//
// Using `dangerouslySetInnerHTML` bypasses React's text-node reconciliation
// for this content entirely — the string is injected as raw HTML on both
// server and client, so there's nothing for React to diff and no entity
// re-encoding step to introduce a mismatch.
// ─────────────────────────────────────────────────────────────────────────────
const STATS_STRIP_CSS = `
  :root {
    --stats-ink: #1e1b16;
    --stats-oak: #a07d5a;
  }
  .stats-strip { margin-top: 4rem; }
  .stats-top-rule {
    width: 100%; height: 1px;
    background: rgba(30,27,22,0.08);
    transform-origin: left center;
    transition: transform ${TOP_RULE_DURATION}ms cubic-bezier(0.22,1,0.36,1);
    will-change: transform;
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    padding-top: 2.5rem;
  }
  .stats-cell-shell {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    transform-origin: left bottom;
    transition:
      opacity ${CELL_DURATION}ms cubic-bezier(0.22,1,0.36,1),
      transform ${CELL_DURATION}ms cubic-bezier(0.22,1,0.36,1);
    will-change: opacity, transform;
  }
  .stats-cell-shell:not(:first-child)::before {
    content: "";
    position: absolute;
    top: 0; bottom: 0; left: 0;
    width: 1px;
    background: rgba(30,27,22,0.08);
    transform: scaleY(0);
    transform-origin: top center;
    transition: transform 600ms cubic-bezier(0.22,1,0.36,1) var(--stats-divider-delay);
  }
  .stats-cell-active:not(:first-child)::before { transform: scaleY(1); }
  .stats-cell-shell::after {
    content: "";
    position: absolute; inset: 0;
    z-index: 2; pointer-events: none;
    opacity: 0;
    transform: translateX(-140%) skewX(-18deg);
    background: linear-gradient(105deg,
      transparent 25%,
      rgba(255,255,255,0.03) 40%,
      rgba(255,255,255,0.3) 50%,
      rgba(255,255,255,0.06) 60%,
      transparent 75%
    );
  }
  .stats-cell-active::after {
    animation: stats-shimmer 900ms cubic-bezier(0.22,1,0.36,1) var(--stats-shimmer-delay) both;
  }
  @keyframes stats-shimmer {
    0%   { opacity: 0; transform: translateX(-140%) skewX(-18deg); }
    18%  { opacity: 0.72; }
    75%  { opacity: 0.32; }
    100% { opacity: 0; transform: translateX(140%) skewX(-18deg); }
  }
  .stats-cell {
    position: relative; z-index: 1;
    padding: 1rem 2rem;
    outline: none;
  }
  .stats-cell:focus-visible {
    outline: 2px solid var(--stats-oak);
    outline-offset: -3px;
    border-radius: 4px;
  }
  .stats-value {
    min-width: 4.5ch;
    margin: 0;
    font-size: 2.25rem;
    line-height: 1;
    font-weight: 400;
    transition: color 280ms ease, transform 280ms cubic-bezier(0.22,1,0.36,1);
  }
  .stats-label {
    margin: 0.35rem 0 0;
    font-size: 11px;
    line-height: 1.4;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    transition: color 280ms ease;
  }
  .stats-uk-reveal {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .stats-uk-letters { display: inline-flex; }
  .stats-uk-letter-mask { display: inline-block; overflow: hidden; }
  .stats-uk-letter {
    display: inline-block;
    transition:
      opacity 650ms cubic-bezier(0.22,1,0.36,1),
      transform 650ms cubic-bezier(0.22,1,0.36,1);
  }
  .stats-uk-underline {
    display: block;
    width: 100%; height: 1.5px;
    margin-top: 3px;
    background: var(--stats-oak);
    transform-origin: left center;
    transition:
      transform 600ms cubic-bezier(0.22,1,0.36,1),
      opacity 400ms ease;
  }
  @media (max-width: 767px) {
    .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .stats-cell-shell:nth-child(3)::before { display: none; }
    .stats-cell-shell:nth-child(n+3) { border-top: 1px solid rgba(30,27,22,0.08); }
  }
  @media (max-width: 520px) {
    .stats-grid { grid-template-columns: 1fr; }
    .stats-cell-shell:not(:first-child)::before { display: none; }
    .stats-cell-shell:nth-child(n+2) { border-top: 1px solid rgba(30,27,22,0.08); }
  }
`;

function easeOutExpo(p: number): number {
  return p >= 1 ? 1 : 1 - Math.pow(2, -10 * p);
}

function useIntersectionOnce(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setTriggered(true); return; }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setTriggered(true); obs.disconnect(); }
      },
      { threshold, rootMargin: "0px 0px -5% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, triggered };
}

// ─── Core counter hook ────────────────────────────────────────────────────────
// Uses setInterval ticking every 16ms. Starts only once when `start` flips to
// true, after `delay` ms. Completely avoids rAF-inside-setTimeout nesting.

function useCountUp(target: number, duration: number, start: boolean, delay: number) {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const delayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    if (delayRef.current) { clearTimeout(delayRef.current); delayRef.current = null; }
    setCount(0);

    if (!start) return;

    delayRef.current = setTimeout(() => {
      const startTime = Date.now();
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const next = Math.round(easeOutExpo(progress) * target);
        setCount(next);
        if (progress >= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setCount(target);
        }
      }, 16);
    }, delay);

    return () => {
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
      if (delayRef.current) { clearTimeout(delayRef.current); delayRef.current = null; }
    };
  }, [start, target, duration, delay]);

  return count;
}

// ─── Suffix ───────────────────────────────────────────────────────────────────

function AnimatedSuffix({ char, visible }: { char: string; visible: boolean }) {
  return (
    <span
      style={{
        display: "inline-block",
        marginLeft: "1px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(4px) scale(0.85)",
        transformOrigin: "bottom center",
        transition: "opacity 350ms cubic-bezier(0.22,1,0.36,1), transform 350ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {char}
    </span>
  );
}

// ─── Counter variants ─────────────────────────────────────────────────────────

function CounterPlus({ target, duration, active, delay }: { target: number; duration: number; active: boolean; delay: number }) {
  const count = useCountUp(target, duration, active, delay);
  return (
    <span className="inline-flex items-baseline" style={{ minWidth: "3.2ch" }} aria-hidden="true">
      <span>{count}</span>
      <AnimatedSuffix char="+" visible={active && count >= Math.ceil(target * 0.9)} />
    </span>
  );
}

function CounterPercent({ target, duration, active, delay }: { target: number; duration: number; active: boolean; delay: number }) {
  const count = useCountUp(target, duration, active, delay);
  return (
    <span className="inline-flex items-baseline" style={{ minWidth: "4.4ch" }} aria-hidden="true">
      <span>{count}</span>
      <AnimatedSuffix char="%" visible={active && count >= Math.ceil(target * 0.8)} />
    </span>
  );
}

function CounterSimple({ target, duration, active, delay }: { target: number; duration: number; active: boolean; delay: number }) {
  const count = useCountUp(target, duration, active, delay);
  return (
    <span style={{ display: "inline-block", minWidth: "1.2ch" }} aria-hidden="true">
      {count}
    </span>
  );
}

// ─── UK reveal ────────────────────────────────────────────────────────────────

function UKReveal({ active, delay }: { active: boolean; delay: number }) {
  return (
    <span className="stats-uk-reveal" aria-hidden="true">
      <span className="stats-uk-letters">
        {["U", "K"].map((letter, i) => (
          <span className="stats-uk-letter-mask" key={letter}>
            <span
              className="stats-uk-letter"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? "translateY(0)" : "translateY(110%)",
                transitionDelay: `${delay + i * 80}ms`,
              }}
            >
              {letter}
            </span>
          </span>
        ))}
      </span>
      <span
        className="stats-uk-underline"
        style={{
          opacity: active ? 0.55 : 0,
          transform: active ? "scaleX(1)" : "scaleX(0)",
          transitionDelay: `${delay + 360}ms`,
        }}
      />
    </span>
  );
}

// ─── Stat cell ────────────────────────────────────────────────────────────────

function StatCell({ stat, index, active }: { stat: StatItem; index: number; active: boolean }) {
  const entranceDelay = TOP_RULE_DURATION + index * CELL_STAGGER;
  const counterDelay  = entranceDelay + COUNTER_START_OFFSET;
  const shimmerDelay  = entranceDelay + CELL_DURATION + SHIMMER_DELAY_AFTER_LANDING;

  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const elevated = hovered || focused;

  return (
    <div
      className={`stats-cell-shell${active ? " stats-cell-active" : ""}`}
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0) skewY(0deg)" : "translateY(16px) skewY(0.4deg)",
        transitionDelay: `${entranceDelay}ms`,
        "--stats-shimmer-delay": `${shimmerDelay}ms`,
        "--stats-divider-delay": `${entranceDelay}ms`,
      } as CSSProperties}
    >
      <div
        className="stats-cell"
        role="group"
        tabIndex={0}
        aria-label={`${stat.value} ${stat.label}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <span className="sr-only">{stat.value} {stat.label}</span>

        <p
          className="stats-value font-display"
          style={{
            color: elevated ? "var(--stats-oak)" : "var(--stats-ink)",
            transform: elevated ? "translateY(-2px)" : "translateY(0)",
          }}
        >
          {stat.kind === "counter-plus" && (
            <CounterPlus
              target={stat.target ?? 0}
              duration={stat.countDuration ?? 1000}
              active={active}
              delay={counterDelay}
            />
          )}
          {stat.kind === "counter" && (
            <CounterSimple
              target={stat.target ?? 0}
              duration={stat.countDuration ?? 1000}
              active={active}
              delay={counterDelay}
            />
          )}
          {stat.kind === "counter-percent" && (
            <CounterPercent
              target={stat.target ?? 0}
              duration={stat.countDuration ?? 1000}
              active={active}
              delay={counterDelay}
            />
          )}
          {stat.kind === "text-reveal" && (
            <UKReveal active={active} delay={entranceDelay} />
          )}
        </p>

        <p
          className="stats-label"
          style={{
            color: elevated ? "rgba(30,27,22,0.5)" : "rgba(30,27,22,0.35)",
          }}
        >
          {stat.label}
        </p>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function StatsStrip() {
  const { ref, triggered } = useIntersectionOnce();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STATS_STRIP_CSS }} />

      <div ref={ref} className="stats-strip">
        <div
          className="stats-top-rule"
          aria-hidden="true"
          style={{ transform: triggered ? "scaleX(1)" : "scaleX(0)" }}
        />
        <div className="stats-grid">
          {STATS.map((stat, index) => (
            <StatCell key={stat.value} stat={stat} index={index} active={triggered} />
          ))}
        </div>
      </div>
    </>
  );
}