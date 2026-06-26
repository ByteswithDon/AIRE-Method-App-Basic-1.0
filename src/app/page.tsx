"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const C = {
  bg:      "#01082D",
  card:    "#061640",
  mid:     "#0A1E52",
  surface: "#0F2573",
  blue:    "#266CA9",
  accent:  "#ADE1FB",
  muted:   "rgba(173,225,251,0.65)",
  subtle:  "rgba(173,225,251,0.35)",
  border:  "rgba(173,225,251,0.08)",
};

// Neumorphic shadows — 3-layer kit pattern: subtle near + opposing highlight + deep dark
const raised = [
  "2px 2px 5px rgba(1,8,45,0.55)",
  "-5px -5px 18px rgba(10,30,82,0.5)",
  "6px 6px 20px rgba(1,8,45,0.82)",
].join(", ");
const raisedHover = [
  "2px 2px 6px rgba(1,8,45,0.6)",
  "-7px -7px 22px rgba(38,108,169,0.18)",
  "9px 9px 26px rgba(1,8,45,0.88)",
].join(", ");
const btnShadow = [
  "2px 2px 4px rgba(1,8,45,0.5)",
  "-3px -3px 10px rgba(10,30,82,0.45)",
  "4px 4px 12px rgba(1,8,45,0.72)",
].join(", ");
const btnShadowHover = [
  "2px 2px 5px rgba(1,8,45,0.55)",
  "-4px -4px 14px rgba(38,108,169,0.16)",
  "6px 6px 18px rgba(1,8,45,0.84)",
  "0 0 20px rgba(173,225,251,0.14)",
].join(", ");
const btnGradient = `linear-gradient(135deg, #C4EAFE 0%, #ADE1FB 45%, #7EC8E3 100%)`;
const secondaryShadow = [
  "2px 2px 5px rgba(1,8,45,0.55)",
  "-3px -3px 10px rgba(10,30,82,0.4)",
  "4px 4px 12px rgba(1,8,45,0.72)",
].join(", ");
const secondaryShadowHover = [
  "3px 3px 7px rgba(1,8,45,0.6)",
  "-4px -4px 12px rgba(38,108,169,0.15)",
  "5px 5px 16px rgba(1,8,45,0.8)",
].join(", ");

const DIMENSIONS = [
  {
    letter: "A", name: "Approach", desc: "Vision & strategic stance", color: C.accent,
    full: "This is about how your organization has defined where it's headed with technology. Do you have a documented strategy? Is leadership aligned on what responsible technology use actually looks like? That's what Approach is measuring.",
  },
  {
    letter: "I", name: "Implementation", desc: "Deployment & tooling", color: "#7EB8D4",
    full: "This is where the rubber meets the road. Are tools actually deployed and in use? Is there a real process for evaluating and selecting them? Implementation is about whether decisions are turning into working systems that people actually use.",
  },
  {
    letter: "R", name: "Responsibility", desc: "Ethics & privacy", color: C.accent,
    full: "Technology use comes with real obligations. Responsibility looks at whether your organization has policies in place, handles data with care, and has oversight structures that keep things accountable. It's not just compliance. It's how you build trust.",
  },
  {
    letter: "E", name: "Enablement", desc: "Staff capacity & culture", color: "#7EB8D4",
    full: "Tools don't adopt themselves. Enablement is about whether your people have the training, the support, and the confidence to actually use what's been put in front of them. That means programs, champions, and a culture where it's okay to try things and figure it out.",
  },
];

const STATS = [
  { num: "12",  label: "Assessment cells" },
  { num: "4×3", label: "Framework matrix" },
  { num: "30",  label: "Day action pathway" },
];

export default function Home() {
  const [aboutOpen, setAboutOpen]   = useState(false);
  const [bioOpen,   setBioOpen]     = useState(false);
  const [introOpen, setIntroOpen]   = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col font-sans text-white overflow-x-hidden" style={{ background: C.bg }}>

      {/* Atmosphere */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" style={{
        background: `
          radial-gradient(ellipse 65% 50% at 12% 88%, rgba(38,108,169,0.22) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 88% 12%, rgba(173,225,251,0.07) 0%, transparent 55%),
          radial-gradient(ellipse 40% 30% at 50% 50%, rgba(15,37,115,0.15) 0%, transparent 70%),
          linear-gradient(rgba(173,225,251,0.018) 1px, transparent 1px),
          linear-gradient(90deg, rgba(173,225,251,0.018) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 100% 100%, 60px 60px, 60px 60px",
      }} />

      {/* ── Nav ── */}
      <header className="relative z-10">
        <nav className="px-6 md:px-12 py-5 flex items-center justify-between">
          <span className="text-sm font-extrabold tracking-[0.2em] uppercase text-white">AIRE™</span>

          <div className="flex items-center gap-4">
            <button
              onClick={() => { setAboutOpen(!aboutOpen); setBioOpen(false); }}
              className="text-sm font-semibold transition-colors focus-ring px-4 py-2 rounded-full"
              style={{ color: C.muted }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
            >
              About
            </button>

            <a href="https://www.linkedin.com/in/lyndonia/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold transition-colors focus-ring px-3 py-2 rounded-full"
              style={{ color: C.muted }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
              aria-label="LinkedIn"
            >
              <LinkedInIcon /><span className="hidden sm:inline">LinkedIn</span>
            </a>

            <a href="https://github.com/byteswithdon" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold transition-colors focus-ring px-3 py-2 rounded-full"
              style={{ color: C.muted }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
              aria-label="GitHub"
            >
              <GitHubIcon /><span className="hidden sm:inline">GitHub</span>
            </a>

            <Link href="/assessment"
              className="text-sm font-extrabold px-5 py-2.5 rounded-full transition-all focus-ring"
              style={{ background: btnGradient, color: C.bg, boxShadow: btnShadow }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = btnShadowHover;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = btnShadow;
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Begin Assessment
            </Link>
          </div>
        </nav>

        {/* About drawer */}
        <AnimatePresence>
          {aboutOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
              style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: "rgba(6,22,64,0.97)" }}
            >
              <div className="px-6 md:px-12 py-8 max-w-3xl">
                <p className="text-xs font-extrabold tracking-[0.18em] uppercase mb-4" style={{ color: C.accent }}>About</p>
                <p className="text-sm leading-relaxed font-medium" style={{ color: C.muted }}>
                  I&rsquo;m a Microsoft 365 and SharePoint administrator, LMS administrator, and migration specialist
                  with 10+ years helping organizations build the infrastructure behind enterprise learning and
                  collaboration platforms. I love working with teams that know something needs to change but
                  aren&rsquo;t quite sure where to start or which tools will actually serve them well.
                </p>
                <button
                  onClick={() => setBioOpen(!bioOpen)}
                  className="mt-4 text-xs font-bold tracking-wide flex items-center gap-1 focus-ring transition-opacity hover:opacity-70"
                  style={{ color: C.accent }}
                >
                  {bioOpen ? "Show less ↑" : "Read full bio ↓"}
                </button>
                <AnimatePresence>
                  {bioOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-5 space-y-3 text-sm leading-relaxed font-medium" style={{ color: C.muted }}>
                        <p>I&rsquo;m especially interested in working with organizations that are navigating infrastructure buildouts, enablement, and training, and that are trying to figure out which tech stacks will actually fit how they work. That question comes up constantly and it deserves a real process, not just a vendor recommendation.</p>
                        <p>I lead infrastructure development and migrations for learning management systems, build out governance frameworks, and create the training and rollout documentation that helps teams actually adopt what gets built. I also use AI-enabled prototyping to model features and bridge the gap between technical and non-technical stakeholders before anything goes live.</p>
                        <p>I&rsquo;m hands-on across the M365 stack (SharePoint, Teams, Learn 365, Zensai) and comfortable across a range of LMS platforms and API integrations.</p>
                        <div className="pt-3">
                          <p className="text-xs font-extrabold tracking-wide uppercase text-white mb-3">Core Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {["SharePoint Online","M365 Administration","LMS Administration","Power Automate","Power BI","Information Architecture","Content Migration","WCAG / ADA","API Integration","SCORM / xAPI","SQL","Supabase","Vercel","GitHub","Docebo","Canvas","Moodle","Notion","Scribe","Zendesk"].map(s => (
                              <span key={s} className="text-xs px-3 py-1 rounded-full font-semibold"
                                style={{ background: "rgba(173,225,251,0.06)", color: C.muted, border: `1px solid rgba(173,225,251,0.1)`, boxShadow: "2px 2px 5px rgba(1,8,45,0.5), -2px -2px 6px rgba(10,30,82,0.38), 2px 2px 6px rgba(1,8,45,0.6)" }}>
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Prototype notice ── */}
      <div className="relative z-10 px-6 md:px-12 py-3 flex flex-wrap items-center gap-3 justify-between text-xs"
        style={{ background: "rgba(173,225,251,0.03)", borderBottom: `1px solid ${C.border}` }}>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase"
            style={{ background: "rgba(173,225,251,0.07)", color: C.accent, border: `1px solid rgba(173,225,251,0.18)`, boxShadow: "2px 2px 5px rgba(1,8,45,0.5), -2px -2px 7px rgba(10,30,82,0.4), 2px 2px 7px rgba(1,8,45,0.6)" }}>
            Prototype
          </span>
          <span style={{ color: C.muted }}>
            Demonstration only. Responses are <strong className="text-white font-bold">not saved</strong> and no database is connected.
          </span>
        </div>
        <button
          onClick={() => setIntroOpen(!introOpen)}
          className="font-bold transition-opacity hover:opacity-70 focus-ring whitespace-nowrap"
          style={{ color: C.accent }}
        >
          {introOpen ? "Hide context ↑" : "Why I built this ↓"}
        </button>
      </div>

      {/* Context drawer */}
      <AnimatePresence>
        {introOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 overflow-hidden"
            style={{ borderBottom: `1px solid ${C.border}`, background: "rgba(6,22,64,0.97)" }}
          >
            <div className="px-6 md:px-12 py-8 max-w-3xl">
              <p className="text-xs font-extrabold tracking-[0.18em] uppercase mb-4" style={{ color: C.blue }}>Context &amp; Intent</p>
              <div className="space-y-3 text-sm leading-relaxed font-medium" style={{ color: C.muted }}>
                <p>The AIRE Method grew out of a real problem I kept running into: teams in flat organizations adopting technology without a shared process, which meant duplicate subscriptions, misaligned rollouts, and people who never really got brought along.</p>
                <p>It started as a Google Sheets evaluation tool I used to facilitate conversations with stakeholders. After presenting it at the <strong className="text-white">Learning Forward Winter Conference</strong> and watching leaders across sectors immediately recognize the gap it was filling, I decided to build it into something you could actually move through online.</p>
                <p>This prototype shows how the framework works as an interactive tool. In a full production version, responses would live in Supabase and the scoring engine would generate tailored recommendations. <strong className="text-white">This demo is about the experience and the logic, not a live backend.</strong></p>
                <p>I built it using AI-enabled prototyping (Claude + Claude Code) alongside my own platform and architecture background, which is exactly how I work with teams every day.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <main id="main-content" className="relative z-10 flex-1 flex flex-col lg:flex-row">

        {/* Left */}
        <div className="flex flex-col justify-center px-6 md:px-12 py-20 max-w-2xl">
          <motion.p {...fade(0.1)} className="text-xs font-extrabold tracking-[0.26em] uppercase mb-6" style={{ color: C.accent }}>
            Technology Readiness Diagnostic
          </motion.p>

          <motion.h1 {...fade(0.18)}
            className="leading-none mb-6"
            style={{ fontSize: "clamp(52px, 8vw, 88px)", letterSpacing: "-0.03em", fontWeight: 900 }}
          >
            GAP
            <br />
            <span style={{ color: C.accent }}>Assessment</span>
          </motion.h1>

          <motion.p {...fade(0.26)} className="text-base leading-relaxed max-w-md mb-10 font-medium" style={{ color: C.muted }}>
            Measure your organization&rsquo;s readiness across the four dimensions
            of technology adoption and get a structured 30-day correction pathway.
          </motion.p>

          <motion.div {...fade(0.32)} className="flex flex-wrap gap-3">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 text-sm font-extrabold px-8 py-4 rounded-full transition-all focus-ring group"
              style={{ background: btnGradient, color: C.bg, boxShadow: btnShadow }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = btnShadowHover;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = btnShadow;
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Begin Assessment
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div {...fade(0.44)} className="flex gap-6 mt-16 pt-10" style={{ borderTop: `1px solid ${C.border}` }}>
            {STATS.map(s => (
              <div key={s.num}
                className="px-5 py-4 rounded-2xl"
                style={{ background: C.card, boxShadow: raised, border: `1px solid rgba(173,225,251,0.05)` }}
              >
                <div className="text-2xl mb-1" style={{ fontWeight: 900, color: C.accent }}>{s.num}</div>
                <div className="text-xs font-bold tracking-wide uppercase" style={{ color: C.subtle }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — dimension cards */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
          <div className="grid grid-cols-2 gap-5 w-full max-w-sm">
            {DIMENSIONS.map((dim, i) => (
              <motion.button
                key={dim.letter}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActiveCard(i)}
                className="p-6 rounded-2xl flex flex-col gap-2.5 transition-all duration-300 text-left focus-ring group"
                style={{
                  background: C.card,
                  boxShadow: raised,
                  border: `1px solid rgba(173,225,251,0.05)`,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = raisedHover;
                  el.style.transform = "translateY(-4px)";
                  el.style.border = `1px solid rgba(173,225,251,0.14)`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = raised;
                  el.style.transform = "translateY(0)";
                  el.style.border = `1px solid rgba(173,225,251,0.05)`;
                }}
              >
                <span className="text-4xl" style={{ fontWeight: 900, color: dim.color, lineHeight: 1 }}>{dim.letter}</span>
                <span className="text-sm font-bold text-white mt-1">{dim.name}</span>
                <span className="text-xs font-medium" style={{ color: C.subtle }}>{dim.desc}</span>
                <span className="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity mt-1" style={{ color: C.accent }}>Learn more →</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Dimension detail modal */}
        <AnimatePresence>
          {activeCard !== null && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              style={{ background: "rgba(1,8,45,0.8)", backdropFilter: "blur(8px)" }}
              onClick={() => setActiveCard(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 16 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                onClick={e => e.stopPropagation()}
                className="relative w-full max-w-md rounded-2xl p-8"
                style={{
                  background: C.card,
                  boxShadow: [
                    "2px 2px 6px rgba(1,8,45,0.6)",
                    "-8px -8px 24px rgba(10,30,82,0.5)",
                    "10px 10px 30px rgba(1,8,45,0.9)",
                    "0 0 0 1px rgba(173,225,251,0.08)",
                  ].join(", "),
                  border: `1px solid rgba(173,225,251,0.1)`,
                }}
              >
                <button
                  onClick={() => setActiveCard(null)}
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full transition-all focus-ring text-sm"
                  style={{ color: C.muted, background: C.mid, boxShadow: secondaryShadow }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = secondaryShadowHover)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = secondaryShadow)}
                  aria-label="Close"
                >
                  ✕
                </button>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCard}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}
                  >
                    <p className="text-xs font-extrabold tracking-[0.2em] uppercase mb-4" style={{ color: C.subtle }}>
                      {activeCard + 1} of {DIMENSIONS.length}
                    </p>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-6xl" style={{ fontWeight: 900, color: DIMENSIONS[activeCard].color, lineHeight: 1 }}>
                        {DIMENSIONS[activeCard].letter}
                      </span>
                      <span className="text-xl font-bold text-white">{DIMENSIONS[activeCard].name}</span>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: C.subtle }}>
                      {DIMENSIONS[activeCard].desc}
                    </p>
                    <p className="text-sm leading-relaxed font-medium" style={{ color: C.muted }}>
                      {DIMENSIONS[activeCard].full}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: `1px solid rgba(173,225,251,0.08)` }}>
                  <button
                    onClick={() => setActiveCard((activeCard - 1 + DIMENSIONS.length) % DIMENSIONS.length)}
                    className="text-sm font-bold px-5 py-2.5 rounded-full transition-all focus-ring"
                    style={{ color: C.muted, background: C.mid, boxShadow: secondaryShadow }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = secondaryShadowHover; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = secondaryShadow; }}
                  >
                    ← Prev
                  </button>

                  <div className="flex gap-2">
                    {DIMENSIONS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveCard(i)}
                        className="w-2 h-2 rounded-full transition-all focus-ring"
                        style={{ background: i === activeCard ? C.accent : "rgba(173,225,251,0.2)" }}
                        aria-label={`Go to ${DIMENSIONS[i].name}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveCard((activeCard + 1) % DIMENSIONS.length)}
                    className="text-sm font-bold px-5 py-2.5 rounded-full transition-all focus-ring"
                    style={{ color: C.bg, background: btnGradient, boxShadow: btnShadow }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = btnShadowHover; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = btnShadow; }}
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 px-6 md:px-12 py-8" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <span className="text-xs font-semibold" style={{ color: C.subtle }}>
            AIRE™ · Technology Readiness &amp; Implementation Evaluation
          </span>
          <div className="flex flex-wrap gap-3">
            <a href="/AIRE-Companion-Guide.pdf" download
              className="inline-flex items-center gap-1.5 text-xs font-bold px-5 py-2.5 rounded-full transition-all focus-ring"
              style={{ background: btnGradient, color: C.bg, boxShadow: btnShadow }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = btnShadowHover;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = btnShadow;
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <DownloadIcon size={12} /> Download the Sample Facilitation Guide
            </a>
            <a
              href="mailto:lyndoniamckenzie@gmail.com?subject=AIRE%20Method%20%E2%80%94%20Request%20for%20More%20Information&body=Hi%20Lyndonia%2C%0A%0AI%27d%20love%20to%20learn%20more%20about%20the%20AIRE%20Method.%0A%0A"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-5 py-2.5 rounded-full transition-all focus-ring"
              style={{
                background: C.mid,
                color: C.accent,
                border: `1px solid rgba(173,225,251,0.1)`,
                boxShadow: secondaryShadow,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = secondaryShadowHover;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = secondaryShadow;
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Request More Information
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Icons ── */
function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  );
}

function DownloadIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}
