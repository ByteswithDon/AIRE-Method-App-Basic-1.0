"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QUESTIONS, DIMENSIONS, type Answer } from "@/lib/assessment";

export default function AssessmentPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);

  const question = QUESTIONS[currentIndex];
  const progress = (currentIndex / QUESTIONS.length) * 100;
  const isLast = currentIndex === QUESTIONS.length - 1;
  const dim = DIMENSIONS.find((d) => d.key === question.dimension)!;

  function handleSelect(value: number) {
    setSelected(value);
  }

  function handleNext() {
    if (selected === null) return;
    const updated = [
      ...answers.filter((a) => a.questionId !== question.id),
      { questionId: question.id, value: selected },
    ];
    if (isLast) {
      sessionStorage.setItem("aire-answers", JSON.stringify(updated));
      router.push("/results");
      return;
    }
    setDirection(1);
    setAnswers(updated);
    setSelected(answers.find((a) => a.questionId === QUESTIONS[currentIndex + 1].id)?.value ?? null);
    setCurrentIndex((i) => i + 1);
  }

  function handleBack() {
    if (currentIndex === 0) return;
    setDirection(-1);
    const prev = QUESTIONS[currentIndex - 1];
    setSelected(answers.find((a) => a.questionId === prev.id)?.value ?? null);
    setCurrentIndex((i) => i - 1);
  }

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 32 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -32 }),
  };

  return (
    <div className="min-h-screen flex flex-col bg-parchment text-ink">
      {/* Nav */}
      <header>
        <nav className="px-8 md:px-12 py-6 flex items-center justify-between border-b border-border">
          <Link href="/" className="text-sm font-bold tracking-[0.18em] uppercase focus-ring">
            AIRE™
          </Link>
          <span className="text-xs text-sage font-semibold tracking-wide uppercase">
            {currentIndex + 1} / {QUESTIONS.length}
          </span>
        </nav>
        {/* Progress bar */}
        <div className="h-px bg-border relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-amber"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </header>

      <main id="main-content" className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar — dimension */}
        <aside className="md:w-64 border-b md:border-b-0 md:border-r border-border px-8 py-10 flex flex-col gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-sage mb-4">
              Dimension
            </p>
            <div className="flex items-center gap-3">
              <span
                className="text-4xl font-light"
                style={{ color: dim.color }}
                aria-hidden="true"
              >
                {dim.letter}
              </span>
              <div>
                <div className="text-sm font-semibold">{dim.key}</div>
                <div className="text-xs text-sage">{dim.desc}</div>
              </div>
            </div>
          </div>

          {/* Dimension progress dots */}
          <div className="hidden md:block">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-sage mb-4">
              Progress
            </p>
            <div className="flex flex-col gap-3">
              {DIMENSIONS.map((d) => {
                const dimQs = QUESTIONS.filter((q) => q.dimension === d.key);
                const answered = answers.filter((a) =>
                  dimQs.some((q) => q.id === a.questionId)
                ).length;
                const isCurrent = d.key === question.dimension;
                return (
                  <div key={d.key} className="flex items-center gap-2">
                    <span
                      className="text-xs w-4 font-light"
                      style={{ color: isCurrent ? d.color : "#D6CEBC" }}
                    >
                      {d.letter}
                    </span>
                    <div className="flex gap-1">
                      {dimQs.map((q) => {
                        const ans = answers.find((a) => a.questionId === q.id);
                        const isCur = q.id === question.id;
                        return (
                          <div
                            key={q.id}
                            className="w-2 h-2 rounded-full border border-border"
                            style={{
                              background: isCur
                                ? d.color
                                : ans
                                ? "#1A1A1A"
                                : "transparent",
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

        {/* Question */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-14 max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={question.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-terracotta mb-6">
                Cell {question.cell} of 3
              </p>

              <h1 className="text-2xl md:text-3xl font-light leading-snug mb-3" style={{ letterSpacing: "-0.01em" }}>
                {question.text}
              </h1>

              {question.subtext && (
                <p className="text-sm text-muted font-light mb-10">{question.subtext}</p>
              )}

              <fieldset className="flex flex-col gap-3 mb-12">
                <legend className="sr-only">Rate your organization</legend>
                {question.options.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-4 px-5 py-4 border cursor-pointer transition-all group ${
                      selected === opt.value
                        ? "border-ink bg-ink text-parchment"
                        : "border-border hover:border-ink/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={opt.value}
                      checked={selected === opt.value}
                      onChange={() => handleSelect(opt.value)}
                      className="sr-only"
                    />
                    <span
                      className={`text-xs font-semibold w-5 tabular-nums ${
                        selected === opt.value ? "text-amber" : "text-sage"
                      }`}
                    >
                      {opt.value}
                    </span>
                    <span className="text-sm font-medium">{opt.label}</span>
                  </label>
                ))}
              </fieldset>

              <div className="flex items-center gap-4">
                {currentIndex > 0 && (
                  <button
                    onClick={handleBack}
                    className="text-sm font-semibold text-sage hover:opacity-80 transition-opacity focus-ring"
                  >
                    ← Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={selected === null}
                  className="text-sm font-bold px-8 py-3.5 bg-amber text-ink hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed focus-ring inline-flex items-center"
                  style={{ minHeight: 44 }}
                >
                  {isLast ? "View Results" : "Continue →"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
