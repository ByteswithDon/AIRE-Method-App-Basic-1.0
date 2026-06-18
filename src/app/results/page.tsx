"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  scoreByDimension,
  maturityLabel,
  type Answer,
} from "@/lib/assessment";

export default function ResultsPage() {
  const [scores, setScores] = useState<ReturnType<typeof scoreByDimension> | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("aire-answers");
    if (raw) {
      const answers: Answer[] = JSON.parse(raw);
      setScores(scoreByDimension(answers));
    }
  }, []);

  if (!scores) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parchment">
        <div className="text-center">
          <p className="text-sm text-sage mb-6">No assessment data found.</p>
          <Link href="/assessment" className="text-sm font-bold underline underline-offset-4">
            Start Assessment
          </Link>
        </div>
      </div>
    );
  }

  const overall = Math.round(scores.reduce((s, d) => s + d.score, 0) / scores.length);
  const label = maturityLabel(overall);

  return (
    <div className="min-h-screen flex flex-col bg-parchment text-ink">
      {/* Nav */}
      <header>
        <nav className="px-8 md:px-12 py-6 flex items-center justify-between border-b border-border">
          <Link href="/" className="text-sm font-bold tracking-[0.18em] uppercase focus-ring">
            AIRE™
          </Link>
          <Link
            href="/assessment"
            className="text-sm font-semibold text-sage hover:opacity-80 transition-opacity focus-ring"
          >
            Retake Assessment
          </Link>
        </nav>
      </header>

      <main id="main-content" className="flex-1 px-8 md:px-12 py-14 max-w-4xl">
        {/* Overall */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-terracotta mb-4">
            Your Results
          </p>
          <div className="flex items-end gap-6 mb-3">
            <span className="font-light" style={{ fontSize: "clamp(56px, 10vw, 88px)", lineHeight: 1 }}>
              {overall}
            </span>
            <div className="pb-3">
              <div className="text-lg font-light">{label}</div>
              <div className="text-xs text-sage font-semibold tracking-wide uppercase">Overall Maturity</div>
            </div>
          </div>
          <div className="h-px bg-border w-full mt-8 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-ink"
              initial={{ width: 0 }}
              animate={{ width: `${overall}%` }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>

        {/* Dimension grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {scores.map((dim, i) => (
            <motion.div
              key={dim.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: "easeOut" }}
              className="border border-border p-6"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-3xl font-light mr-3" style={{ color: dim.color }}>
                    {dim.letter}
                  </span>
                  <span className="text-sm font-semibold">{dim.key}</span>
                  <p className="text-xs text-sage mt-1">{dim.desc}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-light">{dim.score}</div>
                  <div className="text-xs text-sage font-semibold tracking-wide uppercase">
                    {maturityLabel(dim.score)}
                  </div>
                </div>
              </div>
              {/* Bar */}
              <div className="h-px bg-border relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full"
                  style={{ background: dim.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${dim.score}%` }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t border-border pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div>
            <p className="text-sm font-semibold mb-1">Ready to act on your results?</p>
            <p className="text-xs text-sage">
              Get a tailored 30-day roadmap based on your maturity scores.
            </p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/assessment"
              className="text-sm font-semibold text-sage hover:opacity-80 underline underline-offset-4 transition-opacity focus-ring"
            >
              Retake Assessment
            </Link>
            <a
              href="mailto:contact@aire-method.com"
              className="text-sm font-bold px-8 py-3.5 bg-amber text-ink hover:opacity-90 transition-opacity focus-ring inline-flex items-center"
              style={{ minHeight: 44 }}
            >
              Get My Roadmap
            </a>
          </div>
        </motion.div>
      </main>

      {/* Maturity legend */}
      <footer className="border-t border-border px-8 md:px-12 py-8">
        <p className="text-xs font-semibold tracking-[0.14em] uppercase text-sage mb-4">
          Maturity Scale
        </p>
        <div className="flex gap-0 flex-wrap">
          {[
            { label: "Initial", range: "0–19" },
            { label: "Emerging", range: "20–39" },
            { label: "Developing", range: "40–59" },
            { label: "Established", range: "60–79" },
            { label: "Leading", range: "80–100" },
          ].map((m, i) => (
            <div
              key={m.label}
              className="flex-1 min-w-[120px] px-4 py-3"
              style={{ borderLeft: i > 0 ? "1px solid #D6CEBC" : "none" }}
            >
              <div className="text-xs font-semibold">{m.label}</div>
              <div className="text-xs text-sage">{m.range}</div>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
