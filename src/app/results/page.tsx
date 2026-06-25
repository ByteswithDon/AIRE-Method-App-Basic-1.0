"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { scoreByDimension, maturityLabel, type Answer } from "@/lib/assessment";

const C = {
  bg:     "#01082D",
  accent: "#ADE1FB",
  border: "rgba(173,225,251,0.09)",
  muted:  "rgba(173,225,251,0.65)",
  subtle: "rgba(173,225,251,0.35)",
};

const DIM_COLORS = ["#ADE1FB", "#266CA9", "#ADE1FB", "#266CA9"];

const MATURITY_LEVELS = [
  { label: "Initial",     range: "0–19",   color: C.subtle },
  { label: "Emerging",    range: "20–39",  color: "rgba(173,225,251,0.5)" },
  { label: "Developing",  range: "40–59",  color: "#266CA9" },
  { label: "Established", range: "60–79",  color: "#ADE1FB" },
  { label: "Leading",     range: "80–100", color: "#C8ECFD" },
];

export default function ResultsPage() {
  const [scores, setScores] = useState<ReturnType<typeof scoreByDimension> | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("aire-answers");
    if (raw) setScores(scoreByDimension(JSON.parse(raw) as Answer[]));
  }, []);

  if (!scores) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans" style={{ background: C.bg, color: "#fff" }}>
        <div className="text-center">
          <p className="text-sm font-medium mb-6" style={{ color: C.muted }}>No assessment data found.</p>
          <Link href="/assessment" className="text-sm font-extrabold px-6 py-3 rounded-xl"
            style={{ background: C.accent, color: C.bg }}>
            Start Assessment
          </Link>
        </div>
      </div>
    );
  }

  const overall = Math.round(scores.reduce((s, d) => s + d.score, 0) / scores.length);
  const label   = maturityLabel(overall);

  return (
    <div className="min-h-screen flex flex-col font-sans text-white" style={{ background: C.bg }}>
      {/* Nav */}
      <header>
        <nav className="px-6 md:px-12 py-5 flex items-center justify-between"
          style={{ borderBottom: `1px solid ${C.border}` }}>
          <Link href="/" className="text-sm font-extrabold tracking-[0.18em] uppercase hover:opacity-70 transition-opacity focus-ring">
            AIRE™
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs px-2.5 py-0.5 rounded-full font-extrabold tracking-wider uppercase"
              style={{ background: "rgba(173,225,251,0.1)", color: C.accent, border: `1px solid rgba(173,225,251,0.2)` }}>
              Prototype
            </span>
            <Link href="/assessment" className="text-sm font-bold hover:opacity-70 transition-opacity focus-ring"
              style={{ color: C.muted }}>
              Retake
            </Link>
          </div>
        </nav>
        <div className="px-6 md:px-12 py-2 text-xs font-medium"
          style={{ background: "rgba(173,225,251,0.03)", borderBottom: `1px solid ${C.border}`, color: C.subtle }}>
          Demo mode — these results are session-only and have not been saved to any database.
        </div>
      </header>

      <main id="main-content" className="flex-1 px-6 md:px-12 py-14 max-w-4xl">
        {/* Overall */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="mb-16">
          <p className="text-xs font-extrabold tracking-[0.24em] uppercase mb-6" style={{ color: C.accent }}>
            Your Results
          </p>
          <div className="flex items-end gap-6 mb-6">
            <span className="leading-none" style={{ fontSize: "clamp(64px, 12vw, 96px)", fontWeight: 900, color: C.accent }}>
              {overall}
            </span>
            <div className="pb-3">
              <div className="text-xl font-extrabold">{label}</div>
              <div className="text-xs font-bold tracking-wide uppercase mt-1" style={{ color: C.subtle }}>
                Overall Maturity Score
              </div>
            </div>
          </div>
          <div className="h-1 rounded-full w-full overflow-hidden" style={{ background: "rgba(173,225,251,0.08)" }}>
            <motion.div className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, #266CA9, ${C.accent})` }}
              initial={{ width: 0 }} animate={{ width: `${overall}%` }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} />
          </div>
        </motion.div>

        {/* Dimension cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {scores.map((dim, i) => {
            const dc = DIM_COLORS[i];
            return (
              <motion.div key={dim.key}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="p-6 rounded-2xl"
                style={{ background: "rgba(4,29,86,0.7)", border: `1px solid ${C.border}` }}>
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-3xl" style={{ fontWeight: 900, color: dc }}>{dim.letter}</span>
                      <span className="text-sm font-bold">{dim.key}</span>
                    </div>
                    <p className="text-xs font-medium" style={{ color: C.subtle }}>{dim.desc}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl" style={{ fontWeight: 900, color: dc }}>{dim.score}</div>
                    <div className="text-xs font-bold tracking-wide uppercase mt-0.5" style={{ color: C.subtle }}>
                      {maturityLabel(dim.score)}
                    </div>
                  </div>
                </div>
                <div className="h-0.5 rounded-full w-full overflow-hidden" style={{ background: "rgba(173,225,251,0.08)" }}>
                  <motion.div className="h-full rounded-full" style={{ background: dc }}
                    initial={{ width: 0 }} animate={{ width: `${dim.score}%` }}
                    transition={{ duration: 0.9, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA block */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}
          className="rounded-2xl p-8 flex flex-col gap-6"
          style={{ background: "rgba(173,225,251,0.05)", border: `1px solid rgba(173,225,251,0.14)` }}>

          <div>
            <p className="text-sm font-bold mb-1">What&rsquo;s next?</p>
            <p className="text-xs font-medium" style={{ color: C.muted }}>
              Explore the full AIRE methodology, request the facilitation guide, or get in touch to learn more.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            {/* Download */}
            <a href="/AIRE-Companion-Guide.pdf" download
              className="inline-flex items-center justify-center gap-2 text-sm font-extrabold px-6 py-3 rounded-xl transition-all focus-ring"
              style={{ background: C.accent, color: C.bg }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#C8ECFD";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(173,225,251,0.35)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = C.accent;
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}>
              <DownloadIcon />
              Download the Facilitation Guide
            </a>

            {/* Request */}
            <a href="mailto:lyndoniamckenzie@gmail.com?subject=AIRE%20Facilitation%20Guide%20Request&body=Hi%20Lyndonia%2C%0A%0AI%20completed%20the%20AIRE%20GAP%20Assessment%20and%20would%20like%20to%20request%20the%20facilitation%20guide.%0A%0A"
              className="inline-flex items-center justify-center gap-2 text-sm font-bold px-6 py-3 rounded-xl transition-all focus-ring"
              style={{ background: "rgba(173,225,251,0.08)", color: C.accent, border: `1px solid rgba(173,225,251,0.2)` }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(173,225,251,0.15)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(173,225,251,0.12)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(173,225,251,0.08)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}>
              <MailIcon />
              Request the Facilitation Guide
            </a>

            {/* Learn More / Contact */}
            <a href="mailto:lyndoniamckenzie@gmail.com?subject=AIRE%20Method%20%E2%80%94%20Learn%20More&body=Hi%20Lyndonia%2C%0A%0AI%27d%20love%20to%20learn%20more%20about%20the%20AIRE%20Method.%0A%0A"
              className="inline-flex items-center justify-center gap-2 text-sm font-bold px-6 py-3 rounded-xl transition-all focus-ring"
              style={{ background: "rgba(173,225,251,0.04)", color: C.muted, border: `1px solid ${C.border}` }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "#fff";
                (e.currentTarget as HTMLElement).style.border = `1px solid rgba(173,225,251,0.2)`;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = C.muted;
                (e.currentTarget as HTMLElement).style.border = `1px solid ${C.border}`;
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}>
              Learn More — Contact Lyndonia
            </a>
          </div>

          <p className="text-xs font-medium" style={{ color: C.subtle }}>
            Questions? Reach out at{" "}
            <a href="mailto:lyndoniamckenzie@gmail.com"
              className="underline underline-offset-2 hover:opacity-80 transition-opacity"
              style={{ color: C.muted }}>
              lyndoniamckenzie@gmail.com
            </a>
          </p>
        </motion.div>
      </main>

      {/* Maturity legend */}
      <footer className="px-6 md:px-12 py-8 mt-8" style={{ borderTop: `1px solid ${C.border}` }}>
        <p className="text-xs font-extrabold tracking-[0.16em] uppercase mb-4" style={{ color: C.subtle }}>
          Maturity Scale
        </p>
        <div className="flex flex-wrap gap-3">
          {MATURITY_LEVELS.map(m => (
            <div key={m.label} className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: "rgba(173,225,251,0.04)", border: `1px solid ${C.border}` }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: m.color }} />
              <span className="text-xs font-bold" style={{ color: C.muted }}>{m.label}</span>
              <span className="text-xs font-medium" style={{ color: C.subtle }}>{m.range}</span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}
