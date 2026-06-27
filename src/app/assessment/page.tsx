"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CELLS, SCALE, STAGES, GAPS, type Answer } from "@/lib/assessment";

const C = {
  bg:      "#01082D",
  surface: "#041D56",
  mid:     "#0F2573",
  accent:  "#ADE1FB",
  border:  "rgba(173,225,251,0.09)",
  muted:   "rgba(173,225,251,0.65)",
  subtle:  "rgba(173,225,251,0.35)",
};

const stageColor = (letter: string) =>
  STAGES.find(s => s.letter === letter)?.color ?? C.accent;

export default function AssessmentPage() {
  const router = useRouter();
  const [index, setIndex]       = useState(0);
  const [answers, setAnswers]   = useState<Answer[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [direction, setDir]     = useState(1);
  const [helpOpen, setHelpOpen] = useState(false);

  const cell     = CELLS[index];
  const total    = CELLS.length;
  const progress = ((index + 1) / total) * 100;
  const isLast   = index === total - 1;
  const color    = stageColor(cell.stageLetter);
  const gapDef   = GAPS.find(g => g.key === cell.gap)!;

  function handleNext() {
    if (selected === null) return;
    const updated = [...answers.filter(a => a.cellId !== cell.id), { cellId: cell.id, value: selected }];
    if (isLast) {
      sessionStorage.setItem("aire-answers", JSON.stringify(updated));
      router.push("/results");
      return;
    }
    setDir(1);
    setAnswers(updated);
    setHelpOpen(false);
    setSelected(updated.find(a => a.cellId === CELLS[index + 1].id)?.value ?? null);
    setIndex(i => i + 1);
  }

  function handleBack() {
    if (index === 0) return;
    setDir(-1);
    setHelpOpen(false);
    setSelected(answers.find(a => a.cellId === CELLS[index - 1].id)?.value ?? null);
    setIndex(i => i - 1);
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
            <span className="text-xs font-semibold tabular-nums" style={{ color: C.muted }}>
              {index + 1} / {total}
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
          style={{ background: "rgba(173,225,251,0.03)", borderBottom: `1px solid ${C.border}`, color: C.muted }}>
          Demo mode. Responses are stored in your browser session only and will not be saved.
        </div>
      </header>

      <main id="main-content" className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar — live 4×3 grid */}
        <aside className="md:w-72 px-6 md:px-8 py-10 flex flex-col gap-8 shrink-0"
          style={{ borderRight: `1px solid ${C.border}` }}>
          <div>
            <p className="text-xs font-extrabold tracking-[0.18em] uppercase mb-1" style={{ color: C.muted }}>
              You are here
            </p>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-4xl" style={{ fontWeight: 900, color }}>{cell.stageLetter}</span>
              <div>
                <div className="text-sm font-bold">{cell.stage}</div>
                <div className="text-xs font-medium mt-0.5" style={{ color: C.muted }}>
                  {cell.gap} · {gapDef.tagline}
                </div>
              </div>
            </div>
          </div>

          {/* GAP × AIRE matrix */}
          <div className="hidden md:block">
            <p className="text-xs font-extrabold tracking-[0.18em] uppercase mb-3" style={{ color: C.muted }}>
              GAP × AIRE™ Matrix
            </p>
            <div className="grid gap-1.5" style={{ gridTemplateColumns: "16px repeat(3, 1fr)" }}>
              <span />
              {GAPS.map(g => (
                <span key={g.key} className="text-[10px] font-bold text-center" style={{ color: C.subtle }}>{g.letter}</span>
              ))}
              {STAGES.map(s => (
                <FragmentRow key={s.letter} letter={s.letter}>
                  {GAPS.map(g => {
                    const cid = `${s.letter}-${g.letter}`;
                    const ans = answers.find(a => a.cellId === cid)?.value;
                    const isCur = cid === cell.id;
                    return (
                      <div key={cid} className="h-6 rounded flex items-center justify-center text-[10px] font-bold transition-all"
                        style={{
                          background: isCur ? s.color : ans ? s.color + "44" : "rgba(173,225,251,0.06)",
                          color: isCur ? C.bg : ans ? "#fff" : C.subtle,
                          outline: isCur ? `1px solid ${s.color}` : "none",
                        }}>
                        {ans ?? ""}
                      </div>
                    );
                  })}
                </FragmentRow>
              ))}
            </div>
            <p className="text-[10px] mt-3 leading-relaxed" style={{ color: C.subtle }}>
              Rate all 12 cells 1–4. Your lowest cells become your priority gaps.
            </p>
          </div>
        </aside>

        {/* Question area */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-14 py-14 max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={cell.id} custom={direction}
              variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>

              <p className="text-xs font-extrabold tracking-[0.2em] uppercase mb-4" style={{ color }}>
                {cell.stage} × {cell.gap}
              </p>

              <h1 className="text-2xl md:text-3xl leading-snug mb-5" style={{ letterSpacing: "-0.01em", fontWeight: 800 }}>
                {cell.focus}
              </h1>

              {/* The two statements to weigh */}
              <p className="text-xs font-bold tracking-wide uppercase mb-3" style={{ color: C.subtle }}>
                Rate how true both of these are today
              </p>
              <ul className="flex flex-col gap-2.5 mb-8">
                {cell.statements.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: C.muted }}>
                    <span style={{ color }}>●</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>

              {/* 1–4 scale */}
              <fieldset className="flex flex-col gap-2.5 mb-6">
                <legend className="sr-only">Rate from 1 (Not Started) to 4 (Established)</legend>
                {SCALE.map(opt => {
                  const isSel = selected === opt.value;
                  return (
                    <label key={opt.value}
                      className="flex items-start gap-4 px-5 py-3.5 rounded-xl cursor-pointer transition-all duration-200"
                      style={{
                        background: isSel ? "rgba(173,225,251,0.1)" : "rgba(4,29,86,0.5)",
                        border:     isSel ? "1px solid rgba(173,225,251,0.35)" : `1px solid ${C.border}`,
                        boxShadow:  isSel ? "0 0 20px rgba(173,225,251,0.1)" : "none",
                      }}
                      onMouseEnter={e => { if (!isSel) (e.currentTarget as HTMLElement).style.background = "rgba(15,37,115,0.6)"; }}
                      onMouseLeave={e => { if (!isSel) (e.currentTarget as HTMLElement).style.background = "rgba(4,29,86,0.5)"; }}
                    >
                      <input type="radio" name="answer" value={opt.value}
                        checked={isSel} onChange={() => setSelected(opt.value)} className="sr-only" />
                      <span className="text-xs font-extrabold w-4 tabular-nums shrink-0 mt-0.5"
                        style={{ color: isSel ? C.accent : C.subtle }}>{opt.value}</span>
                      <span className="flex-1">
                        <span className="text-sm font-bold">{opt.label}</span>
                        <span className="block text-xs mt-0.5 leading-snug" style={{ color: C.subtle }}>{opt.blurb}</span>
                      </span>
                      {isSel && <span className="text-xs font-bold mt-0.5" style={{ color: C.accent }}>✓</span>}
                    </label>
                  );
                })}
              </fieldset>

              {/* Calibration help (cells with examples) */}
              {cell.examples && (
                <div className="mb-8">
                  <button onClick={() => setHelpOpen(o => !o)}
                    className="text-xs font-bold transition-opacity hover:opacity-70 focus-ring"
                    style={{ color: C.accent }}>
                    {helpOpen ? "Hide calibration examples ↑" : "Not sure how to score this? See examples ↓"}
                  </button>
                  <AnimatePresence>
                    {helpOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className="mt-4 flex flex-col gap-2 rounded-xl p-4"
                          style={{ background: "rgba(173,225,251,0.04)", border: `1px solid ${C.border}` }}>
                          {cell.examples.map(ex => (
                            <div key={ex.score} className="flex gap-3 text-xs leading-relaxed">
                              <span className="font-extrabold w-14 shrink-0" style={{ color }}>{ex.score} · {ex.label}</span>
                              <span style={{ color: C.muted }}>{ex.text}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <div className="flex items-center gap-4">
                {index > 0 && (
                  <button onClick={handleBack}
                    className="text-sm font-bold hover:opacity-60 transition-opacity focus-ring"
                    style={{ color: C.muted }}>← Back</button>
                )}
                <button onClick={handleNext} disabled={selected === null}
                  className="text-sm font-extrabold px-8 py-3.5 rounded-xl transition-all focus-ring inline-flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ background: C.accent, color: C.bg, minHeight: 44 }}
                  onMouseEnter={e => { if (selected !== null) { (e.currentTarget as HTMLElement).style.background = "#C8ECFD"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(173,225,251,0.35)"; } }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = C.accent; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
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

function FragmentRow({ letter, children }: { letter: string; children: React.ReactNode }) {
  return (
    <>
      <span className="text-[10px] font-extrabold flex items-center justify-center" style={{ color: stageColor(letter) }}>{letter}</span>
      {children}
    </>
  );
}
