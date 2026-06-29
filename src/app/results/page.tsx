"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  STAGES, GAPS, TRAINING_PATHWAY,
  overallScore, scoreByGap, priorityGaps, maturityLabel, answerFor, buildAIPrompt,
  type Answer,
} from "@/lib/assessment";

const C = {
  bg:     "#01082D",
  accent: "#ADE1FB",
  border: "rgba(173,225,251,0.09)",
  muted:  "rgba(173,225,251,0.65)",
  subtle: "rgba(173,225,251,0.35)",
};

// cell background by score
function cellBg(score: number | null, color: string) {
  if (score == null) return "rgba(173,225,251,0.05)";
  if (score >= 3) return color + "33";
  return "rgba(248,113,113,0.16)"; // priority gap, warm flag
}

export default function ResultsPage() {
  const [answers, setAnswers] = useState<Answer[] | null>(null);
  const [copied, setCopied]   = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("aire-answers");
    if (raw) setAnswers(JSON.parse(raw) as Answer[]);
  }, []);

  if (!answers) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans" style={{ background: C.bg, color: "#fff" }}>
        <div className="text-center">
          <p className="text-sm font-medium mb-6" style={{ color: C.muted }}>No assessment data found.</p>
          <Link href="/assessment" className="text-sm font-extrabold px-6 py-3 rounded-xl"
            style={{ background: C.accent, color: C.bg }}>Start Assessment</Link>
        </div>
      </div>
    );
  }

  const overall   = overallScore(answers);
  const pct       = Math.round((overall / 4) * 100);
  const label     = maturityLabel(overall);
  const gapScores = scoreByGap(answers);
  const gaps      = priorityGaps(answers);
  const topGaps   = gaps.slice(0, 3);
  const enablementGaps = gaps.filter(g => g.cell.stageLetter === "E" && TRAINING_PATHWAY[g.cell.id]);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(buildAIPrompt(answers!));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  }

  // Opens a clean, print-styled results sheet in a new tab and triggers the
  // browser print dialog, where the user can "Save as PDF" to attach to an email.
  function downloadPdf() {
    if (pdfBusy || !answers) return;
    setPdfBusy(true);
    try {
      const esc = (s: string) =>
        s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c] as string));

      const scoreRows = STAGES.map(s =>
        GAPS.map(g => {
          const v = answerFor(answers, `${s.letter}-${g.letter}`);
          const isGap = v != null && v < 3;
          return `<tr><td>${esc(s.key)} &times; ${esc(g.key)}</td>` +
            `<td class="num">${v ?? "-"} / 4${isGap ? ' <span class="flag">gap</span>' : ""}</td></tr>`;
        }).join("")
      ).join("");

      const gapBlocks = topGaps.length
        ? topGaps.map((gp, i) =>
            `<div class="gap"><h3>Priority ${i + 1}: ${esc(gp.cell.stage)} &times; ${esc(gp.cell.gap)}: ${esc(gp.cell.gapName)} (${gp.value}/4)</h3>` +
            `<p>${esc(gp.cell.gapDescription)}</p>` +
            `<ol>${gp.cell.nextSteps.map(st => `<li>${esc(st)}</li>`).join("")}</ol></div>`
          ).join("")
        : '<p class="muted">No cells scored below 3. Focus on raising your lowest cells to Established.</p>';

      const html =
        `<!doctype html><html><head><meta charset="utf-8"><title>AIRE GAP Assessment Results</title><style>` +
        `*{box-sizing:border-box}body{font-family:Arial,Helvetica,sans-serif;color:#0F172A;margin:40px;line-height:1.55}` +
        `h1{font-size:24px;margin:0 0 4px}.meta{color:#64748B;font-size:12px;margin-bottom:22px}` +
        `.overall{font-size:18px;font-weight:800;margin:0 0 18px}` +
        `h2{font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#334155;border-bottom:1px solid #E2E8F0;padding-bottom:6px;margin:26px 0 12px}` +
        `table{width:100%;border-collapse:collapse;font-size:13px}td{padding:5px 8px;border-bottom:1px solid #EEF2F7}` +
        `.num{text-align:right}.flag{color:#B91C1C;font-weight:700;font-size:11px}` +
        `.gap{margin:0 0 16px}.gap h3{font-size:14px;margin:0 0 4px;color:#B91C1C}.gap p{margin:0 0 6px;color:#475569;font-size:13px}` +
        `.muted{color:#475569;font-size:13px}ol{margin:6px 0 0 18px;font-size:13px}li{margin:2px 0}` +
        `.legal{margin-top:34px;border-top:1px solid #E2E8F0;padding-top:12px;color:#94A3B8;font-size:11px}` +
        `@media print{body{margin:24px}}</style></head><body onload="window.print()">` +
        `<h1>AIRE&trade; GAP Assessment Results</h1>` +
        `<div class="meta">Generated ${esc(new Date().toLocaleDateString())} &middot; Prototype, demonstration data only</div>` +
        `<div class="overall">Overall: ${overall.toFixed(1)} / 4 (${esc(label)})</div>` +
        `<h2>Scores by cell</h2><table>${scoreRows}</table>` +
        `<h2>Priority gaps and 30-day next steps</h2>${gapBlocks}` +
        `<p class="legal">&copy; 2026 Lyndonia McKenzie. AIRE&trade; and GAP&trade; are trademarks of Lyndonia McKenzie. All rights reserved.</p>` +
        `</body></html>`;

      const w = window.open("", "_blank");
      if (w) { w.document.write(html); w.document.close(); }
    } finally {
      setPdfBusy(false);
    }
  }

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
              style={{ color: C.muted }}>Retake</Link>
          </div>
        </nav>
        <div className="px-6 md:px-12 py-2 text-xs font-medium"
          style={{ background: "rgba(173,225,251,0.03)", borderBottom: `1px solid ${C.border}`, color: C.muted }}>
          Demo mode. These results are session-only and have not been saved to any database.
        </div>
      </header>

      <main id="main-content" className="flex-1 px-6 md:px-12 py-14 max-w-4xl w-full">

        {/* Overall */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="mb-14">
          <p className="text-xs font-extrabold tracking-[0.24em] uppercase mb-6" style={{ color: C.accent }}>
            Your GAP Profile
          </p>
          <div className="flex items-end gap-6 mb-6">
            <span className="leading-none" style={{ fontSize: "clamp(56px, 11vw, 88px)", fontWeight: 900, color: C.accent }}>
              {overall.toFixed(1)}
            </span>
            <div className="pb-3">
              <div className="text-xl font-extrabold">{label}</div>
              <div className="text-xs font-bold tracking-wide uppercase mt-1" style={{ color: C.subtle }}>
                Average across 12 cells · scale 1–4
              </div>
            </div>
          </div>
          <div className="h-1 rounded-full w-full overflow-hidden" style={{ background: "rgba(173,225,251,0.08)" }}>
            <motion.div className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, #266CA9, ${C.accent})` }}
              initial={{ width: 0 }} animate={{ width: `${pct}%` }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} />
          </div>
        </motion.div>

        {/* The 4×3 matrix */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }} className="mb-16">
          <h2 className="text-sm font-extrabold tracking-[0.16em] uppercase mb-5" style={{ color: C.muted }}>
            GAP × AIRE™ Matrix
          </h2>
          <div className="grid gap-2" style={{ gridTemplateColumns: "minmax(96px,1fr) repeat(3, 1fr)" }}>
            <span />
            {GAPS.map(g => (
              <div key={g.key} className="text-center pb-1">
                <div className="text-sm font-extrabold">{g.letter}</div>
                <div className="text-[10px] font-medium" style={{ color: C.subtle }}>{g.key}</div>
              </div>
            ))}
            {STAGES.map(s => (
              <RowGroup key={s.letter} label={s.key} letter={s.letter} color={s.color}>
                {GAPS.map(g => {
                  const cid = `${s.letter}-${g.letter}`;
                  const score = answerFor(answers, cid);
                  const isGap = score != null && score < 3;
                  return (
                    <div key={cid} className="rounded-lg h-14 flex flex-col items-center justify-center"
                      style={{ background: cellBg(score, s.color), border: isGap ? "1px solid rgba(248,113,113,0.5)" : `1px solid ${C.border}` }}>
                      <span className="text-lg font-extrabold" style={{ color: isGap ? "#FCA5A5" : "#fff" }}>{score ?? "–"}</span>
                      {isGap && <span className="text-[9px] font-bold uppercase tracking-wide" style={{ color: "#FCA5A5" }}>gap</span>}
                    </div>
                  );
                })}
              </RowGroup>
            ))}
          </div>
          <p className="text-xs mt-4" style={{ color: C.subtle }}>
            Cells scoring below 3 are priority gaps, your highest-leverage starting points.
          </p>
        </motion.div>

        {/* GAP dimension read */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }} className="mb-16">
          <h2 className="text-sm font-extrabold tracking-[0.16em] uppercase mb-5" style={{ color: C.muted }}>
            What your scores reveal by dimension
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {gapScores.map(g => (
              <div key={g.key} className="p-5 rounded-2xl" style={{ background: "rgba(4,29,86,0.6)", border: `1px solid ${C.border}` }}>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-extrabold" style={{ color: g.low ? "#FCA5A5" : C.accent }}>{g.letter}</span>
                  <span className="text-sm font-bold">{g.key}</span>
                  <span className="ml-auto text-sm font-extrabold tabular-nums" style={{ color: g.low ? "#FCA5A5" : C.accent }}>{g.avg.toFixed(1)}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: C.muted }}>
                  {g.low ? g.lowMeaning : g.strongMeaning}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Priority gaps */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }} className="mb-16">
          <h2 className="text-sm font-extrabold tracking-[0.16em] uppercase mb-2" style={{ color: C.muted }}>
            Your priority gaps
          </h2>
          <p className="text-xs mb-6" style={{ color: C.subtle }}>
            {gaps.length === 0
              ? "No cells scored below 3. Your foundation is strong. Focus on raising your lowest cells from In Progress to Established."
              : `${gaps.length} cell${gaps.length > 1 ? "s" : ""} scored below 3. Start with the ${topGaps.length} below.`}
          </p>

          <div className="flex flex-col gap-4">
            {topGaps.map((g, i) => (
              <div key={g.cell.id} className="rounded-2xl p-6"
                style={{ background: "rgba(4,29,86,0.7)", border: "1px solid rgba(248,113,113,0.3)" }}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-xs font-extrabold tracking-[0.18em] uppercase mb-1" style={{ color: C.subtle }}>
                      Priority {i + 1} · {g.cell.stage} × {g.cell.gap}
                    </p>
                    <h3 className="text-lg font-extrabold" style={{ color: "#FCA5A5" }}>{g.cell.gapName}</h3>
                  </div>
                  <span className="text-2xl font-extrabold shrink-0" style={{ color: "#FCA5A5" }}>{g.value}<span className="text-sm" style={{ color: C.subtle }}>/4</span></span>
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: C.muted }}>{g.cell.gapDescription}</p>
                <p className="text-xs font-bold tracking-wide uppercase mb-3" style={{ color: C.accent }}>30-day next steps</p>
                <ol className="flex flex-col gap-2">
                  {g.cell.nextSteps.map((step, si) => (
                    <li key={si} className="flex gap-3 text-sm leading-relaxed" style={{ color: C.muted }}>
                      <span className="font-extrabold shrink-0" style={{ color: C.accent }}>{si + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Enablement training pathway */}
        {enablementGaps.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }} className="mb-16">
            <h2 className="text-sm font-extrabold tracking-[0.16em] uppercase mb-2" style={{ color: C.muted }}>
              Recommended training pathway
            </h2>
            <p className="text-xs mb-6" style={{ color: C.subtle }}>
              Your Enablement gaps point to specific learning. Equip the team with these before or after adoption, not just policy.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {enablementGaps.map(g => {
                const t = TRAINING_PATHWAY[g.cell.id];
                return (
                  <div key={g.cell.id} className="rounded-2xl p-6" style={{ background: "rgba(173,225,251,0.05)", border: `1px solid rgba(173,225,251,0.14)` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-extrabold px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(173,225,251,0.12)", color: C.accent }}>{t.timing}</span>
                    </div>
                    <h3 className="text-base font-extrabold mb-3">{t.title}</h3>
                    <ul className="flex flex-col gap-1.5">
                      {t.modules.map((m, mi) => (
                        <li key={mi} className="flex gap-2 text-xs leading-relaxed" style={{ color: C.muted }}>
                          <span style={{ color: C.accent }}>›</span><span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Putting it all together: AI teammate prompt */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }} className="mb-16 rounded-2xl p-8"
          style={{ background: "rgba(4,29,86,0.7)", border: `1px solid ${C.border}` }}>
          <h2 className="text-sm font-extrabold tracking-[0.16em] uppercase mb-2" style={{ color: C.muted }}>
            Putting it all together
          </h2>
          <p className="text-sm leading-relaxed mb-5" style={{ color: C.muted }}>
            You did the hard thinking. Now use AI as a teammate, not to do the work, but to turn your scores and
            priority gaps into a full execution plan. Copy the prompt below into ChatGPT, Copilot, or any tool you use.
            It is pre-filled with your results.
          </p>
          <div className="rounded-xl p-4 mb-4 max-h-56 overflow-auto text-xs font-mono leading-relaxed whitespace-pre-wrap"
            style={{ background: "#01082D", border: `1px solid ${C.border}`, color: C.muted }}>
            {buildAIPrompt(answers)}
          </div>
          <button onClick={copyPrompt}
            className="text-sm font-extrabold px-6 py-3 rounded-xl transition-all focus-ring"
            style={{ background: C.accent, color: C.bg }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#C8ECFD"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.accent}>
            {copied ? "Copied ✓" : "Copy the AI Teammate Prompt"}
          </button>
        </motion.div>

        {/* CTA block */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }}
          className="rounded-2xl p-8 flex flex-col gap-6"
          style={{ background: "rgba(173,225,251,0.05)", border: `1px solid rgba(173,225,251,0.14)` }}>
          <div>
            <p className="text-sm font-bold mb-1">What&rsquo;s next?</p>
            <p className="text-xs font-medium" style={{ color: C.muted }}>
              Download your results as a PDF, grab the companion guide, or reach out directly. When you request more
              information, attach your downloaded results PDF so I can speak to exactly where your organization stands.
              I&rsquo;m happy to answer questions, share more about the methodology, or talk through what this could look like for your team.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <button onClick={downloadPdf} disabled={pdfBusy}
              className="inline-flex items-center justify-center gap-2 text-sm font-extrabold px-6 py-3 rounded-xl transition-all focus-ring disabled:opacity-50"
              style={{ background: C.accent, color: C.bg }}
              onMouseEnter={e => { if (!pdfBusy) (e.currentTarget as HTMLElement).style.background = "#C8ECFD"; }}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.accent}>
              <DownloadIcon /> {pdfBusy ? "Opening..." : "Download My Results (PDF)"}
            </button>
            <a href="/AIRE-Companion-Guide.pdf" download="AIRE-Facilitator-Guide.pdf"
              className="inline-flex items-center justify-center gap-2 text-sm font-bold px-6 py-3 rounded-xl transition-all focus-ring"
              style={{ background: "rgba(173,225,251,0.08)", color: C.accent, border: `1px solid rgba(173,225,251,0.2)` }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(173,225,251,0.15)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(173,225,251,0.08)"}>
              <DownloadIcon /> Sample Facilitation Guide
            </a>
            <a href="mailto:lyndoniamckenzie@gmail.com?subject=AIRE%20Method%20-%20Request%20for%20More%20Information&body=Hi%20Lyndonia%2C%0A%0AI%27m%20interested%20in%20learning%20more%20about%20the%20AIRE%20Method%20for%20my%20%5Btype%20of%20organization%5D.%20We%20are%20looking%20at%20%5Bdescribe%20the%20technology%20rollout%20or%20adoption%5D%20and%20I%20think%20this%20framework%20could%20be%20a%20great%20fit.%0A%0AI%27ve%20attached%20my%20AIRE%20GAP%20Assessment%20results%20PDF%20for%20context.%0A%0ALooking%20forward%20to%20connecting%2C%0A%5BYour%20name%5D"
              className="inline-flex items-center justify-center gap-2 text-sm font-bold px-6 py-3 rounded-xl transition-all focus-ring"
              style={{ background: "rgba(173,225,251,0.08)", color: C.accent, border: `1px solid rgba(173,225,251,0.2)` }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(173,225,251,0.15)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(173,225,251,0.08)"}>
              <MailIcon /> Request More Information
            </a>
          </div>
        </motion.div>
      </main>

      {/* Rating legend */}
      <footer className="px-6 md:px-12 py-8 mt-8" style={{ borderTop: `1px solid ${C.border}` }}>
        <p className="text-xs font-extrabold tracking-[0.16em] uppercase mb-4" style={{ color: C.subtle }}>
          Rating scale
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { n: 1, label: "Not Started" }, { n: 2, label: "Exploring" },
            { n: 3, label: "In Progress" }, { n: 4, label: "Established" },
          ].map(m => (
            <div key={m.n} className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: "rgba(173,225,251,0.04)", border: `1px solid ${C.border}` }}>
              <span className="text-xs font-extrabold" style={{ color: C.accent }}>{m.n}</span>
              <span className="text-xs font-bold" style={{ color: C.muted }}>{m.label}</span>
            </div>
          ))}
        </div>
        <p className="text-xs mt-8 leading-relaxed" style={{ color: C.subtle }}>
          &copy; 2026 Lyndonia McKenzie. AIRE&trade; and GAP&trade; are trademarks of Lyndonia McKenzie. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function RowGroup({ label, letter, color, children }: { label: string; letter: string; color: string; children: React.ReactNode }) {
  return (
    <>
      <div className="flex items-center gap-2 pr-2">
        <span className="text-lg font-extrabold" style={{ color }}>{letter}</span>
        <span className="text-xs font-semibold leading-tight" style={{ color: "rgba(173,225,251,0.65)" }}>{label}</span>
      </div>
      {children}
    </>
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
