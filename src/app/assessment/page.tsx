"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QUESTIONS, DIMENSIONS, type Answer } from "@/lib/assessment";

const C = {
  bg:      "#01082D",
  surface: "#041D56",
  mid:     "#0F2573",
  accent:  "#ADE1FB",
  border:  "rgba(173,225,251,0.09)",
  muted:   "rgba(173,225,251,0.65)",
  subtle:  "rgba(173,225,251,0.35)",
};

const DIM_COLORS = ["#ADE1FB", "#266CA9", "#ADE1FB", "#266CA9"];

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
    enter:  (d: number) => ({ opacity: 0, x: d * 24 }),
    center: { opacity: 1, x: 0 },
    exit:   (d: number) => ({ opacity: 0, x: d * -24 }),
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-white" style={{ background: C.bg }}>
      {/* Nav */}
      <header>
        <nav className="px-6 md:px-10 py-5 flex items-center justify-between"
          style={{ borderBottom: `1px solid ${C.border}` }}>
          <Link href="/" className="text-sm font-extrabold tracking-[0.18em] uppercase hover:opacity-70 transition-opacity focus-ring">
            AIRE™
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs px-2.5 py-0.5 rounded-full font-extrabold tracking-wider uppercase"
              style={{ background: "rgba(173,225,251,0.1)", color: C.accent, border: `1px solid rgba(173,225,251,0.2)` }}>
              Prototype
            </span>
            <span className="text-xs font-semibold" style={{ color: C.subtle }}>
              {currentIndex + 1} / {QUESTIONS.length}
            </span>
          </div>
        </nav>

        {/* Progress bar */}
        <div className="h-0.5" style={{ background: "rgba(173,225,251,0.08)" }}>
          <motion.div className="h-full rounded-full" style={{ background: C.accent }}
            animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
        </div>

        {/* Demo notice */}
        <div className="px-6 md:px-10 py-2 text-xs font-medium"
          style={{ background: "rgba(173,225,251,0.03)", borderBottom: `1px solid ${C.border}`, color: C.subtle }}>
          Demo mode. Responses are stored in your browser session only and will not be saved.
        </div>
      </header>

      <main id="main-content" className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="md:w-64 px-6 md:px-8 py-10 flex flex-col gap-8 shrink-0"
          style={{ borderRight: `1px solid ${C.border}` }}>
          <div>
            <p className="text-xs font-extrabold tracking-[0.18em] uppercase mb-4" style={{ color: C.subtle }}>
              Dimension
            </p>
            <div className="flex items-center gap-3">
              <span className="text-4xl" style={{ fontWeight: 900, color: dimColor }}>{dim.letter}</span>
              <div>
                <div className="text-sm font-bold">{dim.key}</div>
                <div className="text-xs font-medium mt-0.5" style={{ color: C.subtle }}>{dim.desc}</div>
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="hidden md:block">
            <p className="text-xs font-extrabold tracking-[0.18em] uppercase mb-4" style={{ color: C.subtle }}>Progress</p>
            <div className="flex flex-col gap-3">
              {DIMENSIONS.map((d, di) => {
                const dimQs     = QUESTIONS.filter(q => q.dimension === d.key);
                const isCurrent = d.key === question.dimension;
                const dc        = DIM_COLORS[di];
                return (
                  <div key={d.key} className="flex items-center gap-3">
                    <span className="text-xs w-4 font-extrabold" style={{ color: isCurrent ? dc : "rgba(173,225,251,0.2)" }}>
                      {d.letter}
                    </span>
                    <div className="flex gap-1.5">
                      {dimQs.map(q => {
                        const ans   = answers.find(a => a.questionId === q.id);
                        const isCur = q.id === question.id;
                        return (
                          <div key={q.id} className="w-2 h-2 rounded-full transition-all duration-300"
                            style={{
                              background: isCur ? dc : ans ? "rgba(173,225,251,0.45)" : "rgba(173,225,251,0.1)",
                              boxShadow:  isCur ? `0 0 6px ${dc}90` : "none",
                            }} />
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
        <div className="flex-1 flex flex-col justify-center px-6 md:px-14 py-14 max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={question.id} custom={direction}
              variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>

              <p className="text-xs font-extrabold tracking-[0.2em] uppercase mb-6" style={{ color: dimColor }}>
                {dim.key} · Cell {question.cell} of 3
              </p>

              <h1 className="text-2xl md:text-3xl leading-snug mb-3" style={{ letterSpacing: "-0.01em", fontWeight: 800 }}>
                {question.text}
              </h1>

              {question.subtext && (
                <p className="text-sm mb-10 font-medium" style={{ color: C.muted }}>{question.subtext}</p>
              )}

              <fieldset className="flex flex-col gap-2.5 mb-12">
                <legend className="sr-only">Rate your organization from 1 to 5</legend>
                {question.options.map(opt => {
                  const isSel = selected === opt.value;
                  return (
                    <label key={opt.value}
                      className="flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer transition-all duration-200"
                      style={{
                        background: isSel ? "rgba(173,225,251,0.1)" : "rgba(4,29,86,0.5)",
                        border:     isSel ? "1px solid rgba(173,225,251,0.35)" : `1px solid ${C.border}`,
                        boxShadow:  isSel ? "0 0 20px rgba(173,225,251,0.1)" : "none",
                      }}
                      onMouseEnter={e => {
                        if (!isSel) {
                          (e.currentTarget as HTMLElement).style.background = "rgba(15,37,115,0.6)";
                          (e.currentTarget as HTMLElement).style.border = "1px solid rgba(173,225,251,0.15)";
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isSel) {
                          (e.currentTarget as HTMLElement).style.background = "rgba(4,29,86,0.5)";
                          (e.currentTarget as HTMLElement).style.border = `1px solid ${C.border}`;
                        }
                      }}
                    >
                      <input type="radio" name="answer" value={opt.value}
                        checked={isSel} onChange={() => setSelected(opt.value)} className="sr-only" />
                      <span className="text-xs font-extrabold w-5 tabular-nums"
                        style={{ color: isSel ? C.accent : C.subtle }}>
                        {opt.value}
                      </span>
                      <span className="text-sm font-semibold">{opt.label}</span>
                      {isSel && <span className="ml-auto text-xs font-bold" style={{ color: C.accent }}>✓</span>}
                    </label>
                  );
                })}
              </fieldset>

              <div className="flex items-center gap-4">
                {currentIndex > 0 && (
                  <button onClick={handleBack}
                    className="text-sm font-bold hover:opacity-60 transition-opacity focus-ring"
                    style={{ color: C.muted }}>
                    ← Back
                  </button>
                )}
                <button onClick={handleNext} disabled={selected === null}
                  className="text-sm font-extrabold px-8 py-3.5 rounded-xl transition-all focus-ring inline-flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ background: C.accent, color: C.bg, minHeight: 44 }}
                  onMouseEnter={e => {
                    if (selected !== null) {
                      (e.currentTarget as HTMLElement).style.background = "#C8ECFD";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(173,225,251,0.35)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = C.accent;
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}>
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
