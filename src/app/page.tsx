"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

// Blue palette
const C = {
  bg:           "#01082D",
  surface:      "#041D56",
  surfaceMid:   "#0F2573",
  surfaceLight: "#266CA9",
  accent:       "#ADE1FB",
  border:       "rgba(173,225,251,0.1)",
  borderHover:  "rgba(173,225,251,0.22)",
  muted:        "rgba(173,225,251,0.65)",
  subtle:       "rgba(173,225,251,0.35)",
};

const DIMENSIONS = [
  { letter: "A", name: "Approach",       desc: "Vision & strategic stance",  color: "#ADE1FB" },
  { letter: "I", name: "Implementation", desc: "Deployment & tooling",        color: "#266CA9" },
  { letter: "R", name: "Responsibility", desc: "Ethics & privacy",            color: "#ADE1FB" },
  { letter: "E", name: "Enablement",     desc: "Staff capacity & culture",    color: "#266CA9" },
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

  return (
    <div className="min-h-screen flex flex-col font-sans text-white overflow-x-hidden" style={{ background: C.bg }}>

      {/* Background atmosphere */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" style={{
        background: `
          radial-gradient(ellipse 70% 55% at 15% 85%, rgba(38,108,169,0.18) 0%, transparent 65%),
          radial-gradient(ellipse 55% 40% at 85% 15%, rgba(173,225,251,0.06) 0%, transparent 60%),
          linear-gradient(rgba(173,225,251,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(173,225,251,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 56px 56px, 56px 56px",
      }} />

      {/* ── Nav ── */}
      <header className="relative z-10">
        <nav
          className="px-6 md:px-12 py-5 flex items-center justify-between"
          style={{ borderBottom: `1px solid ${C.border}` }}
          aria-label="Main navigation"
        >
          <span className="text-sm font-extrabold tracking-[0.18em] uppercase text-white">AIRE™</span>

          <div className="flex items-center gap-5">
            <button
              onClick={() => { setAboutOpen(!aboutOpen); setBioOpen(false); }}
              className="text-sm font-semibold transition-colors focus-ring"
              style={{ color: C.muted }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
            >
              About
            </button>

            <a
              href="https://www.linkedin.com/in/lyndonia-jane"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold transition-colors focus-ring"
              style={{ color: C.muted }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>

            <a
              href="https://github.com/byteswithdon"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold transition-colors focus-ring"
              style={{ color: C.muted }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
              aria-label="GitHub"
            >
              <GitHubIcon />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            <a
              href="/AIRE-Companion-Guide.pdf"
              download
              className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg transition-all focus-ring"
              style={{ background: "rgba(173,225,251,0.1)", color: C.accent, border: `1px solid rgba(173,225,251,0.2)` }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(173,225,251,0.18)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(173,225,251,0.15)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(173,225,251,0.1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <DownloadIcon />
              <span className="hidden sm:inline">Companion Guide</span>
            </a>
          </div>
        </nav>

        {/* About drawer */}
        <AnimatePresence>
          {aboutOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
              style={{ borderBottom: `1px solid ${C.border}`, background: "rgba(4,29,86,0.95)" }}
            >
              <div className="px-6 md:px-12 py-8 max-w-3xl">
                <p className="text-xs font-extrabold tracking-[0.18em] uppercase mb-4" style={{ color: C.accent }}>About</p>
                <p className="text-sm leading-relaxed font-medium" style={{ color: C.muted }}>
                  Microsoft 365 and SharePoint administrator, LMS administrator, and migration specialist
                  with 10+ years leading SharePoint strategy and building the infrastructure behind enterprise
                  learning and collaboration platforms. Designs information architecture and permissions models,
                  creates platform schematics, and advises leadership on technology selection and configuration.
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
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-5 space-y-3 text-sm leading-relaxed font-medium" style={{ color: C.muted }}>
                        <p>Leads infrastructure development and migration for learning management systems, paired with internal team enablement, technical prototyping, and the adoption, training, and rollout documentation that makes new platforms stick.</p>
                        <p>Uses AI-enabled prototyping — schematics, mockups, and working proofs of concept — to model features before rollout and bridge technical and non-technical teams. Grounds platform decisions in deep research: learner-engagement and usability studies, A/B testing, and post-release review.</p>
                        <p>Hands-on across the M365 stack (SharePoint, Teams, Learn 365 / Zensai) and a range of LMS platforms and API integrations.</p>
                        <div className="pt-3">
                          <p className="text-xs font-extrabold tracking-wide uppercase text-white mb-3">Core Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {["SharePoint Online","M365 Administration","LMS Administration","Power Automate","Power BI","Information Architecture","Content Migration","WCAG / ADA","API Integration","SCORM / xAPI","SQL","Supabase","Vercel","GitHub","Docebo","Canvas","Moodle","Notion","Scribe","Zendesk"].map(s => (
                              <span key={s} className="text-xs px-2.5 py-1 rounded-full font-semibold"
                                style={{ background: "rgba(173,225,251,0.08)", color: C.muted, border: `1px solid rgba(173,225,251,0.12)` }}>
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
        style={{ background: "rgba(173,225,251,0.04)", borderBottom: `1px solid rgba(173,225,251,0.08)` }}>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold tracking-wider uppercase"
            style={{ background: "rgba(173,225,251,0.12)", color: C.accent, border: `1px solid rgba(173,225,251,0.25)` }}>
            Prototype
          </span>
          <span style={{ color: C.subtle }}>
            Demonstration only — responses are <strong className="text-white font-bold">not saved</strong>. No database is connected.
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 overflow-hidden"
            style={{ borderBottom: `1px solid ${C.border}`, background: "rgba(4,29,86,0.97)" }}
          >
            <div className="px-6 md:px-12 py-8 max-w-3xl">
              <p className="text-xs font-extrabold tracking-[0.18em] uppercase mb-4" style={{ color: "#266CA9" }}>Context &amp; Intent</p>
              <div className="space-y-3 text-sm leading-relaxed font-medium" style={{ color: C.muted }}>
                <p>The AIRE Method grew out of a real problem I kept encountering: decision-makers in flat organizations adopting technology without a shared process — leading to duplicate subscriptions, misaligned rollouts, and teams that never fully adopted the tools.</p>
                <p>It started as a Google Sheets evaluation tool used to facilitate conversations with stakeholders. After presenting it at the <strong className="text-white">Learning Forward Winter Conference</strong> and watching leaders across sectors immediately recognize the gap it was solving, I decided to build a proper web-based version.</p>
                <p>This prototype demonstrates how the framework translates into an interactive digital tool. In a production version, responses would be stored in Supabase and the scoring engine would generate AI-assisted recommendations. <strong className="text-white">This demo shows the UX and logic — not a live backend.</strong></p>
                <p>Built using AI-enabled prototyping (Claude + Claude Code) paired with my own platform architecture background — exactly the approach I use to bridge technical and non-technical teams in my day-to-day work.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <main id="main-content" className="relative z-10 flex-1 flex flex-col lg:flex-row">
        {/* Left */}
        <div className="flex flex-col justify-center px-6 md:px-12 py-20 max-w-2xl">
          <motion.p {...fade(0.1)} className="text-xs font-extrabold tracking-[0.24em] uppercase mb-6" style={{ color: C.accent }}>
            AI Governance Diagnostic
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
            of responsible AI adoption — and get a structured 30-day action pathway.
          </motion.p>

          <motion.div {...fade(0.32)}>
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 text-sm font-extrabold px-8 py-4 rounded-xl transition-all focus-ring group"
              style={{ background: C.accent, color: C.bg }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#C8ECFD";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 36px rgba(173,225,251,0.4)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = C.accent;
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Begin Assessment
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div {...fade(0.44)} className="flex gap-10 mt-16 pt-10" style={{ borderTop: `1px solid ${C.border}` }}>
            {STATS.map(s => (
              <div key={s.num}>
                <div className="text-3xl mb-1" style={{ fontWeight: 900, color: C.accent }}>{s.num}</div>
                <div className="text-xs font-bold tracking-wide uppercase" style={{ color: C.subtle }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — dimension cards */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {DIMENSIONS.map((dim, i) => (
              <motion.div
                key={dim.letter}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="p-5 rounded-2xl flex flex-col gap-2 transition-all duration-300 cursor-default"
                style={{ background: "rgba(4,29,86,0.7)", border: `1px solid rgba(173,225,251,0.08)` }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(15,37,115,0.85)";
                  el.style.border = `1px solid rgba(173,225,251,0.22)`;
                  el.style.boxShadow = "0 8px 32px rgba(1,8,45,0.5)";
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(4,29,86,0.7)";
                  el.style.border = `1px solid rgba(173,225,251,0.08)`;
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                <span className="text-3xl" style={{ fontWeight: 900, color: dim.color }}>{dim.letter}</span>
                <span className="text-sm font-bold text-white">{dim.name}</span>
                <span className="text-xs font-medium" style={{ color: C.subtle }}>{dim.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 px-6 md:px-12 py-8"
        style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <span className="text-xs font-semibold" style={{ color: C.subtle }}>
            AIRE™ — AI Readiness &amp; Implementation Evaluation
          </span>
          <div className="flex flex-wrap gap-3">
            <a href="/AIRE-Companion-Guide.pdf" download
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-all focus-ring"
              style={{ background: C.accent, color: C.bg }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#C8ECFD";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(173,225,251,0.3)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = C.accent;
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}>
              <DownloadIcon size={12} /> Download Facilitation Guide
            </a>
            <a href="mailto:lyndoniamckenzie@gmail.com?subject=AIRE%20Facilitation%20Guide%20Request&body=Hi%20Lyndonia%2C%0A%0AI%27d%20like%20to%20request%20the%20AIRE%20facilitation%20guide.%0A%0A"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-all focus-ring"
              style={{ background: "rgba(173,225,251,0.08)", color: C.accent, border: `1px solid rgba(173,225,251,0.2)` }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(173,225,251,0.15)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(173,225,251,0.08)";
              }}>
              Request Facilitation Guide
            </a>
            <a href="mailto:lyndoniamckenzie@gmail.com?subject=AIRE%20Method%20%E2%80%94%20Learn%20More"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition-all focus-ring"
              style={{ color: C.muted, border: `1px solid ${C.border}` }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "#fff";
                (e.currentTarget as HTMLElement).style.border = `1px solid rgba(173,225,251,0.2)`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = C.muted;
                (e.currentTarget as HTMLElement).style.border = `1px solid ${C.border}`;
              }}>
              Learn More — lyndoniamckenzie@gmail.com
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
