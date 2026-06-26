"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  Mail, MapPin, Phone, CheckCircle, AlertCircle,
  ArrowRight, Clock, Shield, Globe, User, Tag, FileText,
  type LucideIcon,
} from "lucide-react";

import { PageHero } from "@/components/sections/PageHero";
import { site } from "@/data/site";

const GLOBAL_CSS = `
  /*
    ROOT CAUSE FIX:
    The original code had "overflow-y: scroll" + "scrollbar-gutter: stable" on
    html/body. When the textarea received focus, browsers would repaint the
    scrollbar gutter, causing the entire page width to shift — which made every
    element appear to resize/reflow.

    Fix: Remove overflow-y:scroll from html/body entirely. Instead we only apply
    scrollbar-gutter:stable which quietly reserves the scrollbar track without
    forcing a scrollbar to appear. This eliminates the focus-triggered reflow.

    Additionally: the textarea itself had "scrollbar-gutter: stable" which was
    adding reserved internal space that would appear/disappear on focus. Removed.
    The textarea now uses overflow-y: auto (scroll only when content overflows).
  */
  html, body {
    scrollbar-gutter: stable;
  }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(28px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; transform:translateX(-20px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes lineGrow {
    from { width:0; opacity:0; }
    to   { width:100%; opacity:1; }
  }
  @keyframes wordSlide {
    from { opacity:0; transform:translateY(22px) skewY(2deg); }
    to   { opacity:1; transform:translateY(0)    skewY(0); }
  }
  @keyframes ripplePulse {
    0%   { transform:scale(1);   opacity:.6; }
    100% { transform:scale(3.4); opacity:0; }
  }
  @keyframes sweep {
    0%   { background-position:200% center; }
    100% { background-position:-200% center; }
  }
  @keyframes spin { to { transform:rotate(360deg); } }
  @keyframes checkPop {
    0%  { transform:scale(0) rotate(-12deg); opacity:0; }
    65% { transform:scale(1.18) rotate(3deg); opacity:1; }
    100%{ transform:scale(1) rotate(0); opacity:1; }
  }

  .vis-fade-up { animation: fadeUp  .65s cubic-bezier(.22,1,.36,1) both; }
  .vis-fade-in { animation: fadeIn  .55s cubic-bezier(.22,1,.36,1) both; }
  .vis-line    { animation: lineGrow .8s cubic-bezier(.22,1,.36,1) both; }

  .wr-word { display:inline-block; overflow:hidden; vertical-align:bottom; margin-right:0.22em; }
  .wr-inner { display:inline-block; animation:wordSlide .7s cubic-bezier(.22,1,.36,1) both; }

  .contact-strip {
    display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr));
    border-top:1px solid rgba(26,26,26,.1);
    border-bottom:1px solid rgba(26,26,26,.1);
  }
  .contact-item {
    display:flex; align-items:center; gap:14px;
    padding:24px 22px; border-left:1px solid rgba(26,26,26,.1);
    transition: background .25s ease;
  }
  .contact-item:first-child { border-left:none; }
  @media (max-width:899px) {
    .contact-item { border-left:none; border-top:1px solid rgba(26,26,26,.08); }
    .contact-item:first-child { border-top:none; }
  }
  .contact-item:hover { background:rgba(139,94,60,.04); }
  .contact-icon {
    width:38px; height:38px; border-radius:50%; flex-shrink:0;
    background:rgba(139,94,60,.08); border:1px solid rgba(139,94,60,.18);
    display:flex; align-items:center; justify-content:center;
    transition: transform .3s cubic-bezier(.34,1.56,.64,1), background .25s ease;
  }
  .contact-item:hover .contact-icon { transform:scale(1.08) rotate(-4deg); background:rgba(139,94,60,.14); }

  /* ── INPUT FIELDS ── */
  .fi,
  .fi:hover,
  .fi:focus,
  .fi:active,
  .fi:focus-visible,
  .fi:focus-within {
    box-sizing:border-box !important;
    width:100% !important;
    background:#F4F0EA !important;
    background-color:#F4F0EA !important;
    border:1px solid rgba(139,94,60,.45) !important;
    border-radius:6px;
    padding:14px 16px;
    font-size:1rem; line-height:1.4;
    color:#1A1A1A !important;
    -webkit-text-fill-color: #1A1A1A !important;
    caret-color: #1A1A1A !important;
    color-scheme: light !important;
    outline:none;
    transition: border-color .25s ease, box-shadow .25s ease;
    appearance: none;
    -webkit-appearance: none;
  }
  .fi::placeholder { color:rgba(26,26,26,.38) !important; opacity: 1 !important; }
  .fi:hover { border-color:rgba(139,94,60,.7) !important; }
  .fi:focus,
  .fi:focus-visible {
    border-color:#8B5E3C !important;
    box-shadow:0 0 0 3px rgba(139,94,60,.14) !important;
  }
  .fi:-webkit-autofill,
  .fi:-webkit-autofill:hover,
  .fi:-webkit-autofill:focus,
  .fi:-webkit-autofill:active,
  .fi:-webkit-autofill:focus-visible {
    -webkit-text-fill-color: #1A1A1A !important;
    -webkit-box-shadow: 0 0 0px 1000px #F4F0EA inset !important;
    box-shadow: 0 0 0px 1000px #F4F0EA inset !important;
    background-color: #F4F0EA !important;
    caret-color: #1A1A1A !important;
    color: #1A1A1A !important;
  }

  /*
    TEXTAREA FIX:
    - resize: none prevents manual resizing (was already set, kept)
    - overflow-y: auto means scrollbar only appears when text overflows the fixed
      row height — it does NOT reserve space upfront, so no layout shift on focus
    - scrollbar-gutter REMOVED — this was the main offender; it reserved ~15px of
      width inside the textarea that would appear/vanish on focus, pushing sibling
      elements and causing the "resize" illusion
  */
  textarea.fi {
    resize: none !important;
    overflow: hidden !important;
    line-height: 1.75;
    height: 160px !important;
    min-height: 160px !important;
    max-height: 160px !important;
    box-sizing: border-box !important;
  }

  .slabel { display:flex; align-items:center; gap:10px; margin-bottom:18px; }
  .slabel-icon {
    width:26px; height:26px; border-radius:50%; flex-shrink:0;
    background:#C9A227; display:flex; align-items:center; justify-content:center;
  }
  .slabel-t { font-size:11px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:rgba(26,26,26,.6); }
  .slabel-rule { height:1px; flex:1; background:rgba(26,26,26,.08); }

  .pt-btn {
    border:1px solid rgba(26,26,26,.15);
    background:#fff; padding:10px 20px;
    font-size:.8rem; font-weight:700;
    letter-spacing:.09em; text-transform:uppercase;
    color:rgba(26,26,26,.55); cursor:pointer;
    position:relative; overflow:hidden; border-radius:999px;
    transition: all .25s cubic-bezier(.22,1,.36,1);
  }
  .pt-btn:hover {
    border-color:rgba(139,94,60,.45);
    color:#1A1A1A;
    background:rgba(139,94,60,.05);
    transform:translateY(-2px);
  }
  .pt-btn.on {
    background:rgba(139,94,60,.06);
    border-color:#C9A227;
    color:#1A1A1A;
    transform:translateY(-2px) scale(1.04);
    box-shadow:0 0 0 2px rgba(201,162,39,.35), 0 6px 20px rgba(139,94,60,.15);
  }
  .pt-btn.on::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(100deg,transparent 20%,rgba(201,162,39,.18) 50%,transparent 80%);
    background-size:200% 100%;
    animation: sweep .9s ease forwards;
  }

  .sub-btn {
    display:inline-flex; align-items:center; gap:12px;
    background:#8B5E3C; color:#fff;
    padding:16px 38px;
    font-size:.8rem; font-weight:700; letter-spacing:.16em; text-transform:uppercase;
    border:none; cursor:pointer; position:relative; overflow:hidden; border-radius:4px;
    transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease, background .25s ease;
  }
  .sub-btn:hover { background:#724a2f; transform:translateY(-2px) scale(1.02); box-shadow:0 10px 32px rgba(0,0,0,.2); }
  .sub-arr { transition:transform .3s cubic-bezier(.34,1.56,.64,1); }
  .sub-btn:hover .sub-arr { transform:translateX(5px); }

  .spin { animation:spin .8s linear infinite; }
  .check-pop { animation:checkPop .5s cubic-bezier(.34,1.56,.64,1) both; }

  .grain { position:relative; }
  .grain::after {
    content:''; position:absolute; inset:0; pointer-events:none; z-index:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.045'/%3E%3C/svg%3E");
    background-size:160px 160px; opacity:.4;
  }
  .grain > * { position:relative; z-index:1; }

  .split-grid {
    display:grid;
    grid-template-columns:1fr;
    align-items:start;
  }
  @media (min-width:900px)  {
    .split-grid {
      grid-template-columns:390px minmax(0,560px);
      justify-content:space-between;
      align-items:start;
    }
  }
  @media (min-width:1100px) {
    .split-grid {
      grid-template-columns:430px minmax(0,640px);
      justify-content:space-between;
    }
  }

  .left-col {
    padding:56px 40px 56px 0;
    display:flex;
    flex-direction:column;
  }
  @media (max-width:899px) { .left-col { padding:40px 0 32px; } }

  .right-col {
    padding:56px 0;
    display:flex;
    flex-direction:column;
  }
  @media (max-width:899px) { .right-col { padding:8px 0 40px; } }

  .fl-label {
    display:block; font-size:10px; font-weight:700;
    letter-spacing:.14em; text-transform:uppercase;
    color:rgba(26,26,26,.45); margin-bottom:8px;
  }
  .fl-label .req { color:#8B5E3C; margin-left:2px; }

  .trust-block { display:flex; flex-direction:column; gap:16px; margin-bottom:36px; }
  .trust-item  { display:flex; align-items:center; gap:14px; padding:12px 16px; background:#fff; border:1px solid rgba(26,26,26,.07); border-radius:4px; }
  .trust-icon  { width:34px; height:34px; display:flex; align-items:center; justify-content:center; background:rgba(139,94,60,.07); border:1px solid rgba(139,94,60,.15); border-radius:3px; flex-shrink:0; }

  .step-item { display:flex; gap:16px; }
  .step-num  { width:30px; height:30px; border:1.5px solid rgba(139,94,60,.3); background:rgba(139,94,60,.05); display:flex; align-items:center; justify-content:center; flex-shrink:0; border-radius:2px; }

  .left-col-spacer { flex:1; min-height:16px; }

  @media (prefers-reduced-motion:reduce) {
    *,*::before,*::after { animation-duration:.01ms!important; transition-duration:.01ms!important; }
  }
`;

const PROJECT_TYPES = [
  "SFS", "Drylining & Partitions", "Suspended Ceilings",
  "Acoustic Solutions", "Commercial Fit-Out", "Multiple / Other",
];

const NEXT_STEPS = [
  { n:"01", title:"We review", body:"Your enquiry lands with our team — we read every message personally." },
  { n:"02", title:"We call",   body:"A specialist calls within 24 hours to understand your project." },
  { n:"03", title:"We quote",  body:"We send a clear, no-obligation scope and pricing breakdown." },
];

const TRUST_ITEMS = [
  { Icon: Globe,  text: "UK-wide commercial projects",  delay: ".6s"  },
  { Icon: Clock,  text: "Responding within 24 hours",   delay: ".68s" },
  { Icon: Shield, text: "Your data is never shared",    delay: ".76s" },
] as const;

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

function WordReveal({ lines, style, active }: {
  lines: string[];
  style?: React.CSSProperties;
  active: boolean;
}) {
  let wi = 0;
  return (
    <h2 style={{ ...style, margin:0 }}>
      {lines.map((line, li) => (
        <span key={li} style={{ display:"block" }}>
          {line.split(" ").map((word) => {
            const delay = `${0.05 + wi++ * 0.08}s`;
            return (
              <span key={word + delay} className="wr-word">
                <span className="wr-inner" style={{
                  animationDelay: delay,
                  animationPlayState: active ? "running" : "paused",
                  opacity: active ? undefined : 0,
                }}>
                  {word}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </h2>
  );
}

export default function ContactPage() {
  const [status,  setStatus]  = useState<"idle"|"loading"|"success"|"error">("idle");
  const [selType, setSelType] = useState(PROJECT_TYPES[0]);
  const [email,   setEmail]   = useState("");
  const [name,    setName]    = useState("");

  const cardsR = useReveal(0.08);
  const leftR  = useReveal(0.08);
  const formR  = useReveal(0.05);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name:        formData.get("name")    as string,
      email:       formData.get("email")   as string,
      phone:       formData.get("phone")   as string,
      company:     formData.get("company") as string,
      projectType: selType,
      message:     formData.get("message") as string,
    };

    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await r.json();
      if (j.success) {
        setStatus("success");
        form.reset();
        setEmail(""); setName(""); setSelType(PROJECT_TYPES[0]);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      <PageHero
        eyebrow="Contact"
        image={{ src:"/assets/images/hero/lobby-reception.webp", alt:"Premium commercial reception interior" }}
        text="Discuss commercial interior packages, current project requirements or upcoming tender opportunities."
        title="Start the conversation with N&G Partitions."
      />

      {/* ── CREAM SECTION ── */}
      <section className="grain" style={{ background:"#F4F0EA" }}>
        <div style={{ maxWidth:1300, margin:"0 auto", padding:"0 28px" }}>

          {/* ── Top 3 contact items ── */}
          <div
            ref={cardsR.ref}
            className="contact-strip"
            style={{ marginTop:64, marginBottom:56 }}
          >
            {[
              { Icon:Phone,  label:"Call Us",  val:site.phone,   sub:"Mon–Fri, 8am–6pm",          href:`tel:${site.phone}`,    delay:"0s"  },
              { Icon:Mail,   label:"Email Us", val:site.email,   sub:"We reply within 24 hours",  href:`mailto:${site.email}`, delay:".1s" },
              { Icon:MapPin, label:"Our Base", val:site.address, sub:"Peterborough, UK",          href:null,                   delay:".2s" },
            ].map(({ Icon, label, val, sub, href, delay }) => {
              const card = (
                <div
                  className={`contact-item ${cardsR.vis ? "vis-fade-up" : ""}`}
                  style={{ animationDelay:delay, opacity:cardsR.vis?undefined:0 }}
                >
                  <div className="contact-icon">
                    <Icon size={15} color="#8B5E3C" strokeWidth={1.5} />
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontSize:"10px",fontWeight:700,letterSpacing:".16em",textTransform:"uppercase",color:"rgba(26,26,26,.35)",marginBottom:4 }}>{label}</p>
                    <p style={{ fontSize:".88rem",fontWeight:600,color:"#1A1A1A",lineHeight:1.35,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{val}</p>
                    <p style={{ fontSize:".74rem",color:"rgba(26,26,26,.4)",marginTop:2 }}>{sub}</p>
                  </div>
                </div>
              );
              return href
                ? <Link key={label} href={href} style={{ textDecoration:"none" }}>{card}</Link>
                : <div key={label}>{card}</div>;
            })}
          </div>

          {/* ── SPLIT LAYOUT ── */}
          <div className="split-grid">

            {/* ══ LEFT ══ */}
            <div className="left-col" ref={leftR.ref}>

              <div
                className={leftR.vis ? "vis-fade-in" : ""}
                style={{ display:"flex",alignItems:"center",gap:10,marginBottom:28,opacity:leftR.vis?undefined:0,animationDelay:".05s" }}
              >
                <div style={{ height:1,width:24,background:"#8B5E3C" }} />
                <span style={{ fontSize:"10px",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:"#8B5E3C" }}>
                  Enquiry Form
                </span>
              </div>

              <div style={{ marginBottom:24 }}>
                <WordReveal
                  active={leftR.vis}
                  lines={["Tell us", "about your", "project."]}
                  style={{
                    fontSize:"clamp(2.5rem,3.8vw,3.6rem)",
                    fontWeight:300,
                    lineHeight:.94,
                    letterSpacing:"-.035em",
                    color:"#1A1A1A",
                  }}
                />
              </div>

              <p
                className={leftR.vis ? "vis-fade-up" : ""}
                style={{ fontSize:".95rem",lineHeight:1.85,color:"rgba(26,26,26,.65)",marginBottom:36,animationDelay:".54s",opacity:leftR.vis?undefined:0,fontWeight:400 }}
              >
                We work with main contractors, developers and fit-out teams on commercial interior packages across the UK.
              </p>

              <div
                className={leftR.vis ? "vis-line" : ""}
                style={{ height:1,background:"rgba(26,26,26,.08)",marginBottom:28,animationDelay:".56s",opacity:leftR.vis?undefined:0 }}
              />

              <div
                className={`trust-block ${leftR.vis ? "vis-fade-up" : ""}`}
                style={{ animationDelay:".6s", opacity:leftR.vis?undefined:0 }}
              >
                {TRUST_ITEMS.map(({ Icon, text }) => (
                  <div key={text} className="trust-item">
                    <div className="trust-icon">
                      <Icon size={15} color="#8B5E3C" strokeWidth={1.5} />
                    </div>
                    <span style={{ fontSize:".88rem",color:"rgba(26,26,26,.72)",fontWeight:500,lineHeight:1.4 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div
                className={leftR.vis ? "vis-line" : ""}
                style={{ height:1,background:"rgba(26,26,26,.08)",marginBottom:32,animationDelay:".78s",opacity:leftR.vis?undefined:0 }}
              />

              <div
                className={leftR.vis ? "vis-fade-up" : ""}
                style={{ animationDelay:".84s",opacity:leftR.vis?undefined:0 }}
              >
                <p style={{ fontSize:"10px",fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:"rgba(26,26,26,.32)",marginBottom:24 }}>
                  What happens next
                </p>
                <div style={{ display:"flex",flexDirection:"column",gap:0 }}>
                  {NEXT_STEPS.map((s, i) => (
                    <div key={s.n} className="step-item" style={{ paddingBottom: i < NEXT_STEPS.length-1 ? 24 : 0 }}>
                      <div style={{ display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0 }}>
                        <div className="step-num">
                          <span style={{ fontSize:"9px",fontWeight:700,color:"#8B5E3C" }}>{s.n}</span>
                        </div>
                        {i < NEXT_STEPS.length-1 && (
                          <div style={{ width:1,flex:1,background:"rgba(139,94,60,.15)",margin:"6px 0" }} />
                        )}
                      </div>
                      <div style={{ paddingTop:5 }}>
                        <p style={{ fontSize:".88rem",fontWeight:600,color:"#1A1A1A",marginBottom:5,lineHeight:1.3 }}>{s.title}</p>
                        <p style={{ fontSize:".82rem",lineHeight:1.75,color:"rgba(26,26,26,.55)" }}>{s.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="left-col-spacer" />

            </div>

            {/* ══ RIGHT ══ */}
            <div
              ref={formR.ref}
              className={`right-col ${formR.vis ? "vis-fade-up" : ""}`}
              style={{
                animationDelay:".12s",
                opacity: formR.vis ? undefined : 0,
              }}
            >
              <div style={{ display:"flex",alignItems:"center",marginBottom:32,paddingBottom:20,borderBottom:"1px solid rgba(26,26,26,.08)" }}>
                <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                  <div style={{ width:3,height:18,background:"#8B5E3C" }} />
                  <span style={{ fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",color:"#1A1A1A" }}>Project Enquiry</span>
                </div>
              </div>

              {/* Success */}
              {status === "success" && (
                <div className="vis-fade-up" style={{ marginBottom:28,display:"flex",gap:14,borderLeft:"2px solid rgba(139,94,60,.6)",background:"rgba(139,94,60,.08)",padding:"16px 20px",borderRadius:4 }}>
                  <CheckCircle size={16} color="#8B5E3C" strokeWidth={1.5} className="check-pop" style={{ flexShrink:0,marginTop:2 }} />
                  <div>
                    <p style={{ fontSize:".78rem",fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"#6b4429",marginBottom:4 }}>Enquiry sent</p>
                    <p style={{ fontSize:".82rem",lineHeight:1.7,color:"rgba(26,26,26,.6)" }}>
                      We'll be in touch within 24 hours. A confirmation has been sent to your inbox.
                    </p>
                  </div>
                </div>
              )}

              {/* Error */}
              {status === "error" && (
                <div className="vis-fade-up" style={{ marginBottom:28,display:"flex",gap:14,borderLeft:"2px solid rgba(190,60,60,.55)",background:"rgba(190,60,60,.07)",padding:"16px 20px",borderRadius:4 }}>
                  <AlertCircle size={16} color="#b03a3a" strokeWidth={1.5} style={{ flexShrink:0,marginTop:2 }} />
                  <div>
                    <p style={{ fontSize:".78rem",fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"#8a2f2f",marginBottom:4 }}>Submission failed</p>
                    <p style={{ fontSize:".82rem",lineHeight:1.7,color:"rgba(26,26,26,.6)" }}>
                      Please try again or call{" "}
                      <Link href={`tel:${site.phone}`} style={{ textDecoration:"underline",color:"#1A1A1A" }}>{site.phone}</Link>
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display:"flex",flexDirection:"column",gap:36 }}>

                {/* 01 Your details */}
                <div>
                  <FStep icon={User} t="Your details" />
                  <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
                    <div>
                      <FLabel id="name" text="Full Name" req />
                      <input id="name" name="name" type="text" required autoComplete="off"
                        onChange={e => setName(e.target.value)}
                        className="fi"
                        style={{
                          colorScheme:"light",
                          backgroundColor:"#F4F0EA",
                          color:"#1A1A1A",
                          WebkitTextFillColor:"#1A1A1A",
                          caretColor:"#1A1A1A",
                        }} />
                    </div>
                    <div style={{ display:"grid", gap:16 }} className="two-col">
                      <style>{`@media(min-width:560px){.two-col{grid-template-columns:1fr 1fr;}}`}</style>
                      <div>
                        <FLabel id="email" text="Email Address" req />
                        <input id="email" name="email" type="email" required autoComplete="off"
                          onChange={e => setEmail(e.target.value)}
                          className="fi"
                          style={{
                            colorScheme:"light",
                            backgroundColor:"#F4F0EA",
                            color:"#1A1A1A",
                            WebkitTextFillColor:"#1A1A1A",
                            caretColor:"#1A1A1A",
                          }} />
                      </div>
                      <div>
                        <FLabel id="phone" text="Phone Number" />
                        <input id="phone" name="phone" type="tel" autoComplete="off"
                          className="fi"
                          style={{
                            colorScheme:"light",
                            backgroundColor:"#F4F0EA",
                            color:"#1A1A1A",
                            WebkitTextFillColor:"#1A1A1A",
                            caretColor:"#1A1A1A",
                          }} />
                      </div>
                    </div>
                    <div>
                      <FLabel id="company" text="Company / Organisation" />
                      <input id="company" name="company" type="text" autoComplete="off"
                        className="fi"
                        style={{
                          colorScheme:"light",
                          backgroundColor:"#F4F0EA",
                          color:"#1A1A1A",
                          WebkitTextFillColor:"#1A1A1A",
                          caretColor:"#1A1A1A",
                        }} />
                    </div>
                  </div>
                </div>

                {/* 02 Project type */}
                <div>
                  <FStep icon={Tag} t="Project type" />
                  <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
                    {PROJECT_TYPES.map(t => (
                      <button key={t} type="button"
                        onClick={() => setSelType(t)}
                        className={`pt-btn ${selType === t ? "on" : ""}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 03 Your project */}
                <div>
                  <FStep icon={FileText} t="Your project" />
                  <div>
                    <FLabel id="message" text="Project Brief" req />
                    <textarea id="message" name="message" required
                      className="fi"
                      style={{
                        colorScheme:"light",
                        backgroundColor:"#F4F0EA",
                        color:"#1A1A1A",
                        WebkitTextFillColor:"#1A1A1A",
                        caretColor:"#1A1A1A",
                        display:"block",
                        width:"100%",
                        height:"160px",
                        minHeight:"160px",
                        maxHeight:"160px",
                        resize:"none",
                        overflow:"hidden",
                        boxSizing:"border-box",
                      }} />
                  </div>
                </div>

                <div style={{ height:1,background:"rgba(26,26,26,.08)" }} />

                {/* Submit */}
                <div style={{ display:"flex",flexDirection:"column",gap:14,paddingTop:4,marginTop:-12 }} className="sub-row">
                  <style>{`@media(min-width:500px){.sub-row{flex-direction:row;align-items:center;}}`}</style>
                  <button type="submit" disabled={status==="loading"} className="sub-btn" style={{ opacity:status==="loading"?.6:1 }}>
                    {status === "loading" ? (
                      <>
                        <span className="spin" style={{ width:13,height:13,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",display:"inline-block" }} />
                        <span>Sending…</span>
                      </>
                    ) : (
                      <>
                        <span>Send Enquiry</span>
                        <ArrowRight size={14} className="sub-arr" />
                      </>
                    )}
                  </button>
                </div>

              </form>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}

function FStep({ icon: Icon, t }: { icon: LucideIcon; t:string }) {
  return (
    <div className="slabel">
      <div className="slabel-icon">
        <Icon size={13} color="#1A1A1A" strokeWidth={2} />
      </div>
      <span className="slabel-t">{t}</span>
      <div className="slabel-rule" />
    </div>
  );
}
function FLabel({ id, text, req }: { id:string; text:string; req?:boolean }) {
  return (
    <label htmlFor={id} className="fl-label">
      {text}{req && <span className="req">*</span>}
    </label>
  );
}






