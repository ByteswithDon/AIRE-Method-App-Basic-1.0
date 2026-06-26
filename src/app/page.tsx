"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const C = {
  bg:           "#FFFFFF",
  bgAlt:        "#F8FAFC",
  bgSection:    "#F1F5F9",
  border:       "#E2E8F0",
  borderAccent: "#BAE6FD",
  text:         "#0F172A",
  textMuted:    "#64748B",
  textSubtle:   "#94A3B8",
  accent:       "#0EA5E9",
  accentDark:   "#0284C7",
  accentBg:     "#F0F9FF",
  blue:         "#1D4ED8",
  navy:         "#0F172A",
};

const DIMENSIONS = [
  {
    letter: "A",
    name: "Approach",
    desc: "Vision & strategic stance",
    color: C.accent,
    illustration: "/illustrations/148.Strategy.svg",
    full: "This is about how your organization has defined where it's headed with technology. Do you have a documented strategy? Is leadership aligned on what responsible technology use actually looks like? That's what Approach is measuring.",
  },
  {
    letter: "I",
    name: "Implementation",
    desc: "Deployment & tooling",
    color: C.blue,
    illustration: "/illustrations/106.Tools.svg",
    full: "This is where the rubber meets the road. Are tools actually deployed and in use? Is there a real process for evaluating and selecting them? Implementation is about whether decisions are turning into working systems that people actually use.",
  },
  {
    letter: "R",
    name: "Responsibility",
    desc: "Ethics & privacy",
    color: C.accent,
    illustration: "/illustrations/340.Checklist.svg",
    full: "Technology use comes with real obligations. Responsibility looks at whether your organization has policies in place, handles data with care, and has oversight structures that keep things accountable. It's not just compliance. It's how you build trust.",
  },
  {
    letter: "E",
    name: "Enablement",
    desc: "Staff capacity & culture",
    color: C.blue,
    illustration: "/illustrations/597.Collaborative-Work.svg",
    full: "Tools don't adopt themselves. Enablement is about whether your people have the training, the support, and the confidence to actually use what's been put in front of them. That means programs, champions, and a culture where it's okay to try things and figure it out.",
  },
];

export default function Home() {
  const [aboutOpen, setAboutOpen]   = useState(false);
  const [bioOpen,   setBioOpen]     = useState(false);
  const [introOpen, setIntroOpen]   = useState(false);
  const [activeIdx, setActiveIdx]   = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden" style={{ background: C.bg, color: C.text }}>

      {/* Nav */}
      <header className="sticky top-0 z-50" style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
        <nav className="px-6 md:px-12 py-4 flex items-center justify-between">
          <span className="text-sm font-extrabold tracking-[0.2em] uppercase" style={{ color: C.navy }}>AIRE™</span>
          <div className="flex items-center gap-1 md:gap-3">
            <button
              onClick={() => { setAboutOpen(!aboutOpen); setBioOpen(false); }}
              className="text-sm font-medium px-3 py-1.5 rounded-md transition-colors"
              style={{ color: C.textMuted }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C.text; (e.currentTarget as HTMLElement).style.background = C.bgAlt; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = C.textMuted; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >About</button>

            <a href="https://www.linkedin.com/in/lyndonia/" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md transition-colors"
              style={{ color: C.textMuted }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C.text; (e.currentTarget as HTMLElement).style.background = C.bgAlt; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = C.textMuted; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              aria-label="LinkedIn"
            ><LinkedInIcon /><span>LinkedIn</span></a>

            <a href="https://github.com/byteswithdon" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md transition-colors"
              style={{ color: C.textMuted }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C.text; (e.currentTarget as HTMLElement).style.background = C.bgAlt; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = C.textMuted; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              aria-label="GitHub"
            ><GitHubIcon /><span>GitHub</span></a>

            <Link href="/assessment"
              className="text-sm font-semibold px-4 py-2 rounded-md transition-colors"
              style={{ background: C.navy, color: "#FFFFFF" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#1E293B"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.navy}
            >Begin Assessment</Link>
          </div>
        </nav>

        {/* About drawer */}
        <AnimatePresence>
          {aboutOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
              style={{ borderTop: `1px solid ${C.border}`, background: C.bgAlt }}
            >
              <div className="px-6 md:px-12 py-8 max-w-3xl">
                <p className="text-xs font-bold tracking-[0.16em] uppercase mb-4" style={{ color: C.accent }}>About</p>
                <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>
                  I&rsquo;m a Microsoft 365 and SharePoint administrator, LMS administrator, and migration specialist
                  with 10+ years helping organizations build the infrastructure behind enterprise learning and
                  collaboration platforms. I love working with teams that know something needs to change but
                  aren&rsquo;t quite sure where to start or which tools will actually serve them well.
                </p>
                <button
                  onClick={() => setBioOpen(!bioOpen)}
                  className="mt-4 text-xs font-semibold flex items-center gap-1 transition-opacity hover:opacity-70"
                  style={{ color: C.accent }}
                >
                  {bioOpen ? "Show less ↑" : "Read full bio ↓"}
                </button>
                <AnimatePresence>
                  {bioOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-5 space-y-3 text-sm leading-relaxed" style={{ color: C.textMuted }}>
                        <p>I&rsquo;m especially interested in working with organizations that are navigating infrastructure buildouts, enablement, and training, and that are trying to figure out which tech stacks will actually fit how they work. That question comes up constantly and it deserves a real process, not just a vendor recommendation.</p>
                        <p>I lead infrastructure development and migrations for learning management systems, build out governance frameworks, and create the training and rollout documentation that helps teams actually adopt what gets built. I also use AI-enabled prototyping to model features and bridge the gap between technical and non-technical stakeholders before anything goes live.</p>
                        <p>I&rsquo;m hands-on across the M365 stack (SharePoint, Teams, Learn 365, Zensai) and comfortable across a range of LMS platforms and API integrations.</p>
                        <div className="pt-3">
                          <p className="text-xs font-bold tracking-wide uppercase mb-3" style={{ color: C.text }}>Core Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {["SharePoint Online","M365 Administration","LMS Administration","Power Automate","Power BI","Information Architecture","Content Migration","WCAG / ADA","API Integration","SCORM / xAPI","SQL","Supabase","Vercel","GitHub","Docebo","Canvas","Moodle","Notion","Scribe","Zendesk"].map(s => (
                              <span key={s} className="text-xs px-3 py-1 rounded-full font-medium"
                                style={{ background: C.bg, color: C.textMuted, border: `1px solid ${C.border}` }}>
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

      {/* Prototype notice */}
      <div className="px-6 md:px-12 py-2.5 flex flex-wrap items-center gap-3 justify-between text-xs"
        style={{ background: C.bgAlt, borderBottom: `1px solid ${C.border}` }}>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{ background: C.accentBg, color: C.accentDark, border: `1px solid ${C.borderAccent}` }}>
            Prototype
          </span>
          <span style={{ color: C.textMuted }}>
            Demonstration only. Responses are <strong style={{ color: C.text, fontWeight: 600 }}>not saved</strong> and no database is connected.
          </span>
        </div>
        <button
          onClick={() => setIntroOpen(!introOpen)}
          className="text-sm font-semibold transition-opacity hover:opacity-70"
          style={{ color: C.accentDark }}
        >
          {introOpen ? "Hide context ↑" : "Why I built this ↓"}
        </button>
      </div>

      {/* Context drawer */}
      <AnimatePresence>
        {introOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
            style={{ borderBottom: `1px solid ${C.border}`, background: C.bgAlt }}
          >
            <div className="px-6 md:px-12 py-8 max-w-3xl">
              <p className="text-xs font-bold tracking-[0.16em] uppercase mb-4" style={{ color: C.blue }}>Context &amp; Intent</p>
              <div className="space-y-3 text-sm leading-relaxed" style={{ color: C.textMuted }}>
                <p>The AIRE Method grew out of a real problem I kept running into: teams in flat organizations adopting technology without a shared process, which meant duplicate subscriptions, misaligned rollouts, and people who never really got brought along.</p>
                <p>It started as a Google Sheets evaluation tool I used to facilitate conversations with stakeholders. After presenting it at the <strong style={{ color: C.text, fontWeight: 600 }}>Learning Forward Winter Conference</strong> and watching leaders across sectors immediately recognize the gap it was filling, I decided to build it into something you could actually move through online.</p>
                <p>This prototype shows how the framework works as an interactive tool. In a full production version, responses would live in Supabase and the scoring engine would generate tailored recommendations. <strong style={{ color: C.text, fontWeight: 600 }}>This demo is about the experience and the logic, not a live backend.</strong></p>
                <p>I built it using AI-enabled prototyping (Claude + Claude Code) alongside my own platform and architecture background, which is exactly how I work with teams every day.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <main id="main-content" className="flex-1 flex flex-col lg:flex-row">

        {/* LEFT: AIRE breakdown */}
        <div className="flex flex-col justify-center px-6 md:px-12 py-14 lg:py-20 lg:max-w-[54%]">

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="text-xs font-bold tracking-[0.22em] uppercase mb-4"
            style={{ color: C.accent }}
          >
            Technology Readiness Diagnostic
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="mb-4 leading-none"
            style={{ fontSize: "clamp(40px, 6vw, 68px)", letterSpacing: "-0.03em", fontWeight: 900, color: C.navy }}
          >
            The <span style={{ color: C.accent }}>AIRE</span><br />Method
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22 }}
            className="text-base leading-relaxed max-w-lg mb-10"
            style={{ color: C.textMuted }}
          >
            A structured framework for measuring where your organization
            actually stands on technology adoption — and what to do next.
          </motion.p>

          {/* AIRE dimension accordion */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="flex flex-col mb-10"
            style={{ borderTop: `1px solid ${C.border}` }}
          >
            {DIMENSIONS.map((dim, i) => {
              const isOpen = activeIdx === i;
              return (
                <div key={dim.letter} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <button
                    onClick={() => setActiveIdx(isOpen ? null : i)}
                    className="w-full flex items-center gap-5 py-4 text-left"
                  >
                    <span
                      className="shrink-0 flex items-center justify-center font-black"
                      style={{
                        width: 44, height: 44, borderRadius: 8, fontSize: 22, lineHeight: 1,
                        background: isOpen ? dim.color + "18" : C.bgAlt,
                        color: isOpen ? dim.color : C.textSubtle,
                        border: `1px solid ${isOpen ? dim.color + "40" : C.border}`,
                        transition: "all 0.15s",
                      }}
                    >
                      {dim.letter}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-sm font-bold" style={{ color: isOpen ? dim.color : C.text, transition: "color 0.15s" }}>
                          {dim.name}
                        </span>
                        <span className="text-xs" style={{ color: C.textSubtle }}>{dim.desc}</span>
                      </div>
                    </div>
                    <span style={{ color: C.textSubtle, fontSize: 12, display: "inline-block", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                      ↓
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-4 pb-5 pl-14">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={dim.illustration} alt={dim.name} width={72} height={72}
                            className="shrink-0" style={{ opacity: 0.85, borderRadius: 6 }} />
                          <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{dim.full}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.4 }}>
            <Link href="/assessment"
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-md transition-colors group"
              style={{ background: C.navy, color: "#FFFFFF" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#1E293B"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.navy}
            >
              Begin Assessment
              <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT: Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="flex-1 flex items-center justify-center p-8 lg:p-16"
          style={{ background: C.bgAlt, borderLeft: `1px solid ${C.border}` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeIdx !== null ? DIMENSIONS[activeIdx].illustration : "/illustrations/592.Tech-Briefing.svg"}
            alt={activeIdx !== null ? DIMENSIONS[activeIdx].name : "Technology readiness overview"}
            width={360} height={360}
            style={{ width: "100%", maxWidth: 360, height: "auto", display: "block" }}
          />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8" style={{ borderTop: `1px solid ${C.border}`, background: C.bgAlt }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span className="text-xs" style={{ color: C.textSubtle }}>AIRE™ · Technology Readiness &amp; Implementation Evaluation</span>
          <div className="flex flex-wrap gap-3">
            <a href="/AIRE-Companion-Guide.pdf" download
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-md transition-colors"
              style={{ background: C.navy, color: "#FFFFFF" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#1E293B"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.navy}
            ><DownloadIcon size={12} /> Download the Sample Facilitation Guide</a>
            <a
              href="mailto:lyndoniamckenzie@gmail.com?subject=AIRE%20Method%20%E2%80%94%20Request%20for%20More%20Information&body=Hi%20Lyndonia%2C%0A%0AI%27d%20love%20to%20learn%20more%20about%20the%20AIRE%20Method.%0A%0A"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-md transition-colors"
              style={{ background: C.bg, color: C.text, border: `1px solid ${C.border}` }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.bgSection}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.bg}
            >Request More Information</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
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
