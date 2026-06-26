"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QUESTIONS, DIMENSIONS, type Answer } from "@/lib/assessment";

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

const DIM_COLORS  = [C.accent, C.blue, C.accent, C.blue];
const DIM_ILLUSTS = [
  "/illustrations/strategy.svg",
  "/illustrations/tools.svg",
  "/illustrations/checklist.svg",
  "/illustrations/collaborative-work.svg",
];

export default function AssessmentPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers]           = useState<Answer[]>([]);
  const [selected, setSelected]         = useState<number | null>(null);
  const [direction, setDirection]       = useState(1);

  const question  = QUESTIONS[currentIndex];
  const progress  = ((currentIndex + 1) / QUESTIONS.length) * 100;
  const isLast    = currentIndex === QUESTIONS.length - 1;
  const dimIndex  = DIMENSIONS.findIndex(d => d.key === question.dimension);
  const dim       = DIMENSIONS[dimIndex];
  const dimColor  = DIM_COLORS[dimIndex];
  const dimIllust = DIM_ILLUSTS[dimIndex];

  function handleNext() {
    if (selected === null) return;
    const updated = [
      ...answers.filter(a => a.questionId !== question.id),
      { questionId: question.id, value: selected },
    ];
    if (isLast) {
      sessionStorage.setItem("aire-answers", JSON.stringify(updated));
      router.push("/results");
      return;
    }
    setDirection(1);
    setAnswers(updated);
    setSelected(answers.find(a => a.questionId === QUESTIONS[currentIndex + 1].id)?.value ?? null);
    setCurrentIndex(i => i + 1);
  }

  function handleBack() {
    if (currentIndex === 0) return;
    setDirection(-1);
    const prev = QUESTIONS[currentIndex - 1];
    setSelected(answers.find(a => a.questionId === prev.id)?.value ?? null);
    setCurrentIndex(i => i - 1);
  }

  const variants = {
    enter:  (d: number) => ({ opacity: 0, x: d * 20 }),
    center: { opacity: 1, x: 0 },
    exit:   (d: number) => ({ opacity: 0, x: d * -20 }),
  };

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ background: C.bg, color: C.text }}>

      {/* Nav */}
      <header>
        <nav className="px-6 md:px-10 py-4 flex items-center justify-between"
          style={{ borderBottom: `1px solid ${C.border}` }}>
          <Link href="/" className="text-sm font-extrabold tracking-[0.18em] uppercase transition-opacity hover:opacity-60"
            style={{ color: C.navy }}>
            AIRE™
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider"
              style={{ background: C.accentBg, color: C.accentDark, border: `1px solid ${C.borderAccent}` }}>
              Prototype
            </span>
            <span className="text-xs font-medium tabular-nums" style={{ color: C.textMuted }}>
              {currentIndex + 1} / {QUESTIONS.length}
            </span>
          </div>
        </nav>

        {/* Progress bar */}
        <div className="px-6 md:px-10 py-3" style={{ borderBottom: `1px solid ${C.border}`, background: C.bgAlt }}>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.bgSection }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: C.accent }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs" style={{ color: C.textSubtle }}>{dim.key} · Cell {question.cell} of 3</span>
            <span className="text-xs font-bold" style={{ color: C.accent }}>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Demo notice */}
        <div className="px-6 md:px-10 py-2 text-xs"
          style={{ background: C.bgAlt, borderBottom: `1px solid ${C.border}`, color: C.textSubtle }}>
          Demo mode. Responses are stored in your browser session only.
        </div>
      </header>

      <main id="main-content" className="flex-1 flex flex-col md:flex-row">

        {/* Sidebar */}
        <aside className="md:w-60 shrink-0 flex flex-col gap-6 px-6 md:px-7 py-8"
          style={{ borderRight: `1px solid ${C.border}`, background: C.bgAlt }}>

          <AnimatePresence mode="wait">
            <motion.div
              key={dimIndex}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22 }}
              className="flex justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={dimIllust} alt={dim.key} width={120} height={100} style={{ opacity: 0.85 }} />
            </motion.div>
          </AnimatePresence>

          <div>
            <p className="text-xs font-bold tracking-[0.15em] uppercase mb-3" style={{ color: C.textSubtle }}>Dimension</p>
            <div className="rounded-lg p-4" style={{ background: C.bg, border: `1px solid ${C.border}`, borderLeft: `3px solid ${dimColor}` }}>
              <div className="flex items-center gap-3">
                <span style={{ fontWeight: 900, color: dimColor, fontSize: 28, lineHeight: 1 }}>{dim.letter}</span>
                <div>
                  <div className="text-sm font-bold" style={{ color: C.text }}>{dim.key}</div>
                  <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>{dim.desc}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <p className="text-xs font-bold tracking-[0.15em] uppercase mb-3" style={{ color: C.textSubtle }}>Progress</p>
            <div className="flex flex-col gap-3.5">
              {DIMENSIONS.map((d, di) => {
                const dimQs     = QUESTIONS.filter(q => q.dimension === d.key);
                const isCurrent = d.key === question.dimension;
                const dc        = DIM_COLORS[di];
                return (
                  <div key={d.key} className="flex items-center gap-3">
                    <span className="text-xs w-4 font-bold" style={{ color: isCurrent ? dc : C.textSubtle }}>{d.letter}</span>
                    <div className="flex gap-1.5">
                      {dimQs.map(q => {
                        const ans   = answers.find(a => a.questionId === q.id);
                        const isCur = q.id === question.id;
                        return (
                          <div key={q.id} className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                            style={{
                              background: isCur ? dc : ans ? dc + "66" : C.border,
                              outline: isCur ? `2px solid ${dc}40` : "none",
                              outlineOffset: 1,
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Question area */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-14 py-12 max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={question.id} custom={direction} variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>

              <h1 className="text-2xl md:text-3xl leading-snug mb-3 font-extrabold"
                style={{ letterSpacing: "-0.015em", color: C.navy }}>
                {question.text}
              </h1>

              {question.subtext && (
                <p className="text-sm mb-9" style={{ color: C.textMuted }}>{question.subtext}</p>
              )}

              <fieldset className="flex flex-col gap-2.5 mb-10">
                <legend className="sr-only">Rate your organization from 1 to 5</legend>
                {question.options.map(opt => {
                  const isSel = selected === opt.value;
                  return (
                    <label key={opt.value}
                      className="flex items-center gap-4 px-4 py-3.5 rounded-lg cursor-pointer transition-all duration-150"
                      style={{
                        background: isSel ? C.accentBg : C.bg,
                        border: `1px solid ${isSel ? C.borderAccent : C.border}`,
                        borderLeft: `${isSel ? 3 : 1}px solid ${isSel ? C.accent : C.border}`,
                      }}
                      onMouseEnter={e => { if (!isSel) (e.currentTarget as HTMLElement).style.background = C.bgAlt; }}
                      onMouseLeave={e => { if (!isSel) (e.currentTarget as HTMLElement).style.background = C.bg; }}
                    >
                      <input type="radio" name="answer" value={opt.value} checked={isSel} onChange={() => setSelected(opt.value)} className="sr-only" />
                      <div className="shrink-0 flex items-center justify-center transition-all duration-150"
                        style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${isSel ? C.accent : C.border}`, background: C.bg }}>
                        {isSel && <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.accent }} />}
                      </div>
                      <span className="text-xs font-bold w-4 tabular-nums shrink-0" style={{ color: isSel ? C.accent : C.textSubtle }}>{opt.value}</span>
                      <span className="text-sm" style={{ color: isSel ? C.text : C.textMuted, fontWeight: isSel ? 500 : 400 }}>{opt.label}</span>
                    </label>
                  );
                })}
              </fieldset>

              <div className="flex items-center gap-3">
                {currentIndex > 0 && (
                  <button onClick={handleBack}
                    className="text-sm font-medium px-5 py-2.5 rounded-md transition-colors"
                    style={{ background: C.bg, color: C.textMuted, border: `1px solid ${C.border}` }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.bgAlt; (e.currentTarget as HTMLElement).style.color = C.text; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = C.bg; (e.currentTarget as HTMLElement).style.color = C.textMuted; }}
                  >← Back</button>
                )}
                <button onClick={handleNext} disabled={selected === null}
                  className="text-sm font-semibold px-7 py-2.5 rounded-md transition-colors inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: selected !== null ? C.navy : C.bgSection, color: selected !== null ? "#FFFFFF" : C.textSubtle }}
                  onMouseEnter={e => { if (selected !== null) (e.currentTarget as HTMLElement).style.background = "#1E293B"; }}
                  onMouseLeave={e => { if (selected !== null) (e.currentTarget as HTMLElement).style.background = C.navy; }}
                >
                  {isLast ? "View Results →" : "Continue →"}
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
