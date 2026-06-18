export type Dimension = "Approach" | "Implementation" | "Responsibility" | "Enablement";

export interface Question {
  id: string;
  dimension: Dimension;
  cell: number; // 1–3 within each dimension
  text: string;
  subtext?: string;
  options: { value: number; label: string }[];
}

export interface Answer {
  questionId: string;
  value: number;
}

export const DIMENSIONS: { key: Dimension; letter: string; desc: string; color: string }[] = [
  { key: "Approach", letter: "A", desc: "Vision & strategic stance", color: "#E8A317" },
  { key: "Implementation", letter: "I", desc: "Deployment & tooling", color: "#A8431F" },
  { key: "Responsibility", letter: "R", desc: "Ethics & privacy", color: "#4A5F38" },
  { key: "Enablement", letter: "E", desc: "Staff capacity & culture", color: "#1A1A1A" },
];

const SCALE = [
  { value: 1, label: "Not at all" },
  { value: 2, label: "Minimal" },
  { value: 3, label: "Developing" },
  { value: 4, label: "Established" },
  { value: 5, label: "Leading" },
];

export const QUESTIONS: Question[] = [
  // Approach
  {
    id: "A1",
    dimension: "Approach",
    cell: 1,
    text: "Our organization has a clearly articulated AI vision and strategy.",
    subtext: "This includes documented goals and executive alignment.",
    options: SCALE,
  },
  {
    id: "A2",
    dimension: "Approach",
    cell: 2,
    text: "Leadership actively champions responsible AI adoption.",
    subtext: "Senior leaders speak publicly and internally about AI direction.",
    options: SCALE,
  },
  {
    id: "A3",
    dimension: "Approach",
    cell: 3,
    text: "We have defined success metrics for AI initiatives.",
    subtext: "KPIs, ROI frameworks, or impact assessments exist.",
    options: SCALE,
  },
  // Implementation
  {
    id: "I1",
    dimension: "Implementation",
    cell: 1,
    text: "We have deployed AI tools into production workflows.",
    subtext: "At least one AI system is actively used by staff.",
    options: SCALE,
  },
  {
    id: "I2",
    dimension: "Implementation",
    cell: 2,
    text: "Our technology infrastructure supports AI integration securely.",
    subtext: "Data pipelines, APIs, and access controls are in place.",
    options: SCALE,
  },
  {
    id: "I3",
    dimension: "Implementation",
    cell: 3,
    text: "We evaluate and select AI tools through a structured process.",
    subtext: "Vendor assessments, pilots, or procurement criteria exist.",
    options: SCALE,
  },
  // Responsibility
  {
    id: "R1",
    dimension: "Responsibility",
    cell: 1,
    text: "We have policies governing how AI is used in our organization.",
    subtext: "Acceptable use policies, data handling rules, or AI governance docs.",
    options: SCALE,
  },
  {
    id: "R2",
    dimension: "Responsibility",
    cell: 2,
    text: "Privacy and data protection are explicitly addressed in our AI work.",
    subtext: "Data minimization, consent, and retention policies apply to AI.",
    options: SCALE,
  },
  {
    id: "R3",
    dimension: "Responsibility",
    cell: 3,
    text: "We actively monitor AI outputs for bias, errors, or harmful outputs.",
    subtext: "Auditing, red-teaming, or human review processes exist.",
    options: SCALE,
  },
  // Enablement
  {
    id: "E1",
    dimension: "Enablement",
    cell: 1,
    text: "Staff have access to structured AI literacy or training programs.",
    subtext: "Formal courses, workshops, or learning pathways are available.",
    options: SCALE,
  },
  {
    id: "E2",
    dimension: "Enablement",
    cell: 2,
    text: "We have internal AI champions or centers of excellence.",
    subtext: "Roles, teams, or communities of practice support AI adoption.",
    options: SCALE,
  },
  {
    id: "E3",
    dimension: "Enablement",
    cell: 3,
    text: "Our culture encourages experimentation and learning from AI failures.",
    subtext: "Psychological safety exists to try, fail, and iterate with AI.",
    options: SCALE,
  },
];

export function scoreByDimension(answers: Answer[]) {
  return DIMENSIONS.map((dim) => {
    const dimQuestions = QUESTIONS.filter((q) => q.dimension === dim.key);
    const dimAnswers = answers.filter((a) =>
      dimQuestions.some((q) => q.id === a.questionId)
    );
    const total = dimAnswers.reduce((sum, a) => sum + a.value, 0);
    const max = dimQuestions.length * 5;
    const score = dimAnswers.length > 0 ? Math.round((total / max) * 100) : 0;
    return { ...dim, score, total, max };
  });
}

export function maturityLabel(score: number): string {
  if (score >= 80) return "Leading";
  if (score >= 60) return "Established";
  if (score >= 40) return "Developing";
  if (score >= 20) return "Emerging";
  return "Initial";
}
