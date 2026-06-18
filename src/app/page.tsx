"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const DIMENSIONS = [
  { letter: "A", name: "Approach", desc: "Vision & stance" },
  { letter: "I", name: "Implementation", desc: "Deployment & tools" },
  { letter: "R", name: "Responsibility", desc: "Ethics & privacy" },
  { letter: "E", name: "Enablement", desc: "Staff capacity" },
];

const STATS = [
  { num: "12", label: "Assessment cells" },
  { num: "4×3", label: "Framework matrix" },
  { num: "30", label: "Day action pathway" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-parchment text-ink">
      {/* Nav */}
      <header>
        <nav
          aria-label="Main navigation"
          className="px-8 md:px-12 py-6 flex items-center justify-between border-b border-border"
        >
          <motion.span
            {...fade(0)}
            className="text-sm font-bold tracking-[0.18em] uppercase"
            aria-label="AIRE"
          >
            AIRE™
          </motion.span>
          <motion.div {...fade(0.05)} className="flex items-center gap-8">
            <Link
              href="#"
              className="text-sm font-semibold text-sage hover:opacity-80 transition-opacity focus-ring"
            >
              Sign In
            </Link>
            <Link
              href="/assessment"
              className="text-sm font-bold px-5 py-2.5 bg-amber text-ink hover:opacity-90 transition-opacity focus-ring inline-flex items-center"
              style={{ minHeight: 44 }}
            >
              Get Access
            </Link>
          </motion.div>
        </nav>
      </header>

      {/* Hero */}
      <main id="main-content" className="flex-1 flex flex-col lg:flex-row">
        {/* Left — copy */}
        <div className="flex flex-col justify-center px-8 md:px-12 py-20 max-w-2xl">
          <motion.p
            {...fade(0.1)}
            className="text-sm font-bold tracking-[0.2em] uppercase mb-6 text-terracotta"
          >
            AI Governance Diagnostic
          </motion.p>

          <motion.h1
            {...fade(0.18)}
            className="leading-none tracking-[-0.03em] mb-8"
            style={{ fontSize: "clamp(48px, 8vw, 80px)", fontWeight: 300 }}
          >
            GAP<br />Assessment
          </motion.h1>

          <motion.p
            {...fade(0.26)}
            className="text-lg leading-relaxed max-w-md mb-12 font-light text-muted"
          >
            Measure your organization&rsquo;s readiness across the four dimensions
            of responsible AI adoption.
          </motion.p>

          <motion.div {...fade(0.32)} className="flex items-center gap-6 mb-20 flex-wrap">
            <Link
              href="/assessment"
              className="text-sm font-bold px-8 py-3.5 bg-amber text-ink hover:opacity-90 transition-opacity focus-ring inline-flex items-center"
              style={{ minHeight: 44 }}
            >
              Begin Assessment
            </Link>
            <Link
              href="#"
              className="text-sm font-semibold text-sage underline underline-offset-4 hover:opacity-80 transition-opacity focus-ring"
            >
              Sign in to existing account
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...fade(0.4)}
            className="flex gap-12 pt-10 border-t border-border"
          >
            {STATS.map((s) => (
              <div key={s.num}>
                <div className="text-3xl font-light mb-1">{s.num}</div>
                <div className="text-xs font-semibold tracking-wide uppercase text-sage">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — decorative illustration */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-16 relative">
          <IllustrationNetwork />
        </div>
      </main>

      {/* Framework strip */}
      <footer className="border-t border-border px-0">
        <div className="flex">
          {DIMENSIONS.map((item, i) => (
            <motion.div
              key={item.letter}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.08, ease: "easeOut" }}
              className="flex-1 px-8 py-6 flex flex-col gap-1"
              style={{ borderLeft: i > 0 ? "1px solid #D6CEBC" : "none" }}
            >
              <span className="text-2xl font-light text-amber" aria-hidden="true">
                {item.letter}
              </span>
              <span className="text-sm font-semibold">{item.name}</span>
              <span className="text-xs text-sage">{item.desc}</span>
            </motion.div>
          ))}
        </div>
      </footer>
    </div>
  );
}

function IllustrationNetwork() {
  return (
    <svg
      viewBox="0 0 400 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-sm opacity-90"
      aria-hidden="true"
    >
      {/* Central node */}
      <circle cx="200" cy="210" r="36" stroke="#1A1A1A" strokeWidth="1.5" />
      <text x="200" y="216" textAnchor="middle" fontSize="13" fontFamily="system-ui" fontWeight="300" fill="#1A1A1A">AIRE™</text>

      {/* Orbiting nodes — A, I, R, E */}
      {/* A — top */}
      <circle cx="200" cy="80" r="28" stroke="#E8A317" strokeWidth="1.5" />
      <text x="200" y="87" textAnchor="middle" fontSize="15" fontFamily="system-ui" fontWeight="300" fill="#1A1A1A">A</text>
      <line x1="200" y1="108" x2="200" y2="174" stroke="#D6CEBC" strokeWidth="1" strokeDasharray="4 3" />

      {/* I — right */}
      <circle cx="330" cy="210" r="28" stroke="#A8431F" strokeWidth="1.5" />
      <text x="330" y="217" textAnchor="middle" fontSize="15" fontFamily="system-ui" fontWeight="300" fill="#1A1A1A">I</text>
      <line x1="302" y1="210" x2="236" y2="210" stroke="#D6CEBC" strokeWidth="1" strokeDasharray="4 3" />

      {/* R — bottom */}
      <circle cx="200" cy="340" r="28" stroke="#4A5F38" strokeWidth="1.5" />
      <text x="200" y="347" textAnchor="middle" fontSize="15" fontFamily="system-ui" fontWeight="300" fill="#1A1A1A">R</text>
      <line x1="200" y1="246" x2="200" y2="312" stroke="#D6CEBC" strokeWidth="1" strokeDasharray="4 3" />

      {/* E — left */}
      <circle cx="70" cy="210" r="28" stroke="#1A1A1A" strokeWidth="1.5" />
      <text x="70" y="217" textAnchor="middle" fontSize="15" fontFamily="system-ui" fontWeight="300" fill="#1A1A1A">E</text>
      <line x1="98" y1="210" x2="164" y2="210" stroke="#D6CEBC" strokeWidth="1" strokeDasharray="4 3" />

      {/* Corner accent nodes */}
      <circle cx="310" cy="90" r="6" stroke="#D6CEBC" strokeWidth="1" />
      <circle cx="90" cy="340" r="6" stroke="#D6CEBC" strokeWidth="1" />
      <line x1="306" y1="93" x2="228" y2="178" stroke="#D6CEBC" strokeWidth="0.75" />
      <line x1="94" y1="336" x2="172" y2="242" stroke="#D6CEBC" strokeWidth="0.75" />

      {/* Subtle grid dots */}
      {[40, 80, 120, 160].map((x) =>
        [40, 80, 120].map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="#D6CEBC" opacity="0.5" />
        ))
      )}
      {[240, 280, 320, 360].map((x) =>
        [300, 340, 380].map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="#D6CEBC" opacity="0.5" />
        ))
      )}
    </svg>
  );
}
