// AIRE™ GAP Assessment — data model
// Two axes: four AIRE™ stages (Approach, Implementation, Responsibility, Enablement)
// × three GAP dimensions (Goals, Actions, Parameters) = 12 diagnostic cells.
//
// Built for AI governance & adoption, and applicable to any technology adoption
// decision — because nearly every tool an organization adopts now carries an AI
// component, and the choices around it deserve the same structured process.

export type Stage  = "Approach" | "Implementation" | "Responsibility" | "Enablement";
export type GapDim = "Goals" | "Actions" | "Parameters";

export interface Cell {
  id: string;                 // e.g. "A-G"
  stage: Stage;
  stageLetter: "A" | "I" | "R" | "E";
  gap: GapDim;
  gapLetter: "G" | "A" | "P";
  focus: string;              // focus-area name
  statements: [string, string];
  gapName: string;            // surfaced when score < 3
  gapDescription: string;     // what the gap costs you
  nextSteps: [string, string, string];
  examples?: { score: number; label: string; text: string }[]; // calibration (subset of cells)
}

export interface Answer {
  cellId: string;
  value: number;              // 1–4
}

// ── The 1–4 rating scale ───────────────────────────────────────────────────
export const SCALE = [
  { value: 1, label: "Not Started", blurb: "This does not exist yet. No documented stance, process, policy, or support structure for this area." },
  { value: 2, label: "Exploring",   blurb: "Conversations are happening and there is early awareness, but nothing is formalized or consistently practiced." },
  { value: 3, label: "In Progress", blurb: "Work is underway. Something exists and is being used, but it is not yet complete, consistent, or embedded." },
  { value: 4, label: "Established", blurb: "Formalized, communicated, and embedded in practice. It does not depend on any single person to sustain it." },
];

// ── AIRE™ stage definitions ────────────────────────────────────────────────
export const STAGES: { key: Stage; letter: "A" | "I" | "R" | "E"; color: string; tagline: string; desc: string }[] = [
  { key: "Approach",       letter: "A", color: "#ADE1FB", tagline: "Why & how you engage", desc: "Why and how your organization has chosen to engage with AI and technology. Your stance, vision, and the values that guide every subsequent decision." },
  { key: "Implementation", letter: "I", color: "#266CA9", tagline: "Deployment & oversight", desc: "How tools and workflows are deployed and monitored. The structured process for rolling out, overseeing, and adjusting use." },
  { key: "Responsibility", letter: "R", color: "#ADE1FB", tagline: "Ethics & guardrails",   desc: "The ethical, legal, and professional guardrails governing use. Data privacy, acceptable use, and the habits that protect people." },
  { key: "Enablement",     letter: "E", color: "#266CA9", tagline: "Capacity & culture",     desc: "The capacity, culture, and support structures that sustain adoption over time. Training, recognition, and the infrastructure that keeps practice alive." },
];

// ── GAP dimension definitions ──────────────────────────────────────────────
export const GAPS: { key: GapDim; letter: "G" | "A" | "P"; tagline: string; desc: string; lowMeaning: string; strongMeaning: string }[] = [
  {
    key: "Goals", letter: "G", tagline: "Where you are going",
    desc: "The defined outcomes your organization is working toward in this stage. Without named goals, progress cannot be measured and effort dissipates.",
    lowMeaning: "You are working without a clear destination in this stage. Effort and resources are being spent without a shared definition of what success looks like.",
    strongMeaning: "You have named where you are going. The question is whether Actions and Parameters are keeping pace.",
  },
  {
    key: "Actions", letter: "A", tagline: "What you are doing",
    desc: "The specific steps, practices, and behaviors actively happening to move toward your goals. Goals without actions are intentions, not plans.",
    lowMeaning: "You have intent but not momentum. There may be agreement on direction, but the steps that would move things forward are not happening consistently.",
    strongMeaning: "You are moving. Check whether your Parameters are giving that movement structure and protection.",
  },
  {
    key: "Parameters", letter: "P", tagline: "What governs the work",
    desc: "The structures, policies, agreements, and guardrails that make adoption defensible and sustainable. Actions without parameters create liability.",
    lowMeaning: "You are moving without guardrails. Adoption may be happening, but the structures that make it defensible, sustainable, and equitable are not yet in place.",
    strongMeaning: "Your governance infrastructure is solid. Ensure your Goals and Actions are ambitious enough to use it.",
  },
];

// ── The 12 cells ───────────────────────────────────────────────────────────
export const CELLS: Cell[] = [
  // Approach
  {
    id: "A-G", stage: "Approach", stageLetter: "A", gap: "Goals", gapLetter: "G",
    focus: "Organizational AI Vision",
    statements: [
      "We have a documented Approach statement that connects to our mission and equity commitments.",
      "Any member of our leadership team could articulate why we are adopting AI and technology, and what values will guide it.",
    ],
    gapName: "Purposeless Adoption",
    gapDescription: "Implementation is happening without a governing vision. Every subsequent decision will drift.",
    nextSteps: [
      "Schedule a 60-minute leadership conversation using the AIRE™ Stance Worksheet.",
      "Draft a one-paragraph Approach statement: why, which values, what responsible looks like.",
      "Connect your Approach explicitly to your equity commitments before finalizing.",
    ],
    examples: [
      { score: 1, label: "Not Started", text: "No one in leadership has discussed why the organization is considering AI. Tools may already be in use but there is no stated rationale, no connection to mission, and no documented stance of any kind." },
      { score: 2, label: "Exploring",   text: "There have been informal conversations in leadership. Someone has mentioned 'we should figure out where we stand,' but nothing is written down and staff could not describe the organization's position." },
      { score: 3, label: "In Progress", text: "A draft Approach statement exists or is being developed. It has been discussed in at least one formal leadership setting but is not yet finalized, adopted, or communicated to staff." },
      { score: 4, label: "Established", text: "A formal, written Approach statement exists, connects explicitly to mission and equity commitments, has been communicated to all staff, and is referenced in decisions." },
    ],
  },
  {
    id: "A-A", stage: "Approach", stageLetter: "A", gap: "Actions", gapLetter: "A",
    focus: "Establishing Your Stance",
    statements: [
      "Our leadership team has had formal, documented conversations about our organizational AI posture.",
      "We have communicated our stance to all staff in writing, not just through informal conversation.",
    ],
    gapName: "Unactivated Vision",
    gapDescription: "The intent may exist but it has not moved into practice. A belief that has not been communicated is not yet a stance.",
    nextSteps: [
      "Schedule and document a formal leadership posture conversation this month.",
      "Communicate your Approach statement to all staff in a named, trackable format.",
      "Assign ownership for keeping the Approach statement current as the landscape changes.",
    ],
  },
  {
    id: "A-P", stage: "Approach", stageLetter: "A", gap: "Parameters", gapLetter: "P",
    focus: "Boundaries for Adoption",
    statements: [
      "We have defined what use is and is not appropriate in our specific organizational context.",
      "Staff have written guidance they can reference when uncertain about a use case.",
    ],
    gapName: "Ungoverned Space",
    gapDescription: "Without defined parameters, staff make individual judgment calls in a vacuum. Risk accumulates invisibly.",
    nextSteps: [
      "Distribute an AI Use Decision Checklist to all staff as an immediate guardrail.",
      "Draft a one-page Acceptable and Prohibited Use framework within 30 days.",
      "Establish a named contact staff can reach with questions before acting.",
    ],
  },
  // Implementation
  {
    id: "I-G", stage: "Implementation", stageLetter: "I", gap: "Goals", gapLetter: "G",
    focus: "Deployment Outcomes",
    statements: [
      "We have defined what successful implementation looks like for each role in our organization.",
      "There is a deployment timeline with named milestones that leadership is actively tracking.",
    ],
    gapName: "Unmeasured Rollout",
    gapDescription: "Deployment is happening without a destination. Progress cannot be assessed and drift is inevitable.",
    nextSteps: [
      "Define role-specific implementation outcomes for each role group separately.",
      "Set a 90-day milestone with a named owner and a formal review checkpoint.",
      "Build a simple dashboard for leadership to monitor adoption progress by role.",
    ],
  },
  {
    id: "I-A", stage: "Implementation", stageLetter: "I", gap: "Actions", gapLetter: "A",
    focus: "Structured Deployment",
    statements: [
      "Tool deployment follows a defined process in our organization, not ad hoc individual adoption.",
      "There is a functioning feedback mechanism for staff to surface implementation concerns or questions.",
    ],
    gapName: "Reactive Implementation",
    gapDescription: "Adoption is being driven by early adopters without a structure others can follow. Inconsistency compounds.",
    nextSteps: [
      "Design a 30-day pilot structure for any new tool before organization-wide deployment.",
      "Create and distribute a simple staff feedback form for adoption concerns.",
      "Schedule a 30-day implementation review and assign a named facilitator.",
    ],
  },
  {
    id: "I-P", stage: "Implementation", stageLetter: "I", gap: "Parameters", gapLetter: "P",
    focus: "Approved Tools & Oversight",
    statements: [
      "We have a current, communicated approved tool list and staff know where to find it.",
      "Leadership actively monitors tool use and can identify shadow adoption across the organization.",
    ],
    gapName: "Shadow AI Vacuum",
    gapDescription: "Without a published approved list, staff fill the gap with personal tools. Shadow AI becomes the de facto policy.",
    nextSteps: [
      "Publish a current approved tool list this week. Even a short one closes the vacuum.",
      "Assign a monitoring owner responsible for identifying unapproved tool use quarterly.",
      "Establish a request process so shadow adoption has a sanctioned alternative.",
    ],
    examples: [
      { score: 1, label: "Not Started", text: "No approved tool list exists. Staff use whatever they find. Leadership has no visibility into which tools are in use or whether any data privacy agreements are in place." },
      { score: 2, label: "Exploring",   text: "Someone has started compiling a list of tools in use. There is informal awareness of what might be appropriate, but nothing is formally approved or communicated." },
      { score: 3, label: "In Progress", text: "An approved list exists and has been shared, but it may be incomplete, outdated, or not actively maintained. Monitoring of non-approved use is informal." },
      { score: 4, label: "Established", text: "A current approved list is published, communicated, and accessible. A named owner maintains it, there is a process for adding tools, and shadow use is monitored and addressed." },
    ],
  },
  // Responsibility
  {
    id: "R-G", stage: "Responsibility", stageLetter: "R", gap: "Goals", gapLetter: "G",
    focus: "Ethics & Privacy Priorities",
    statements: [
      "Data privacy is explicitly named as an organizational priority, not just assumed.",
      "Our equity commitments are directly connected to our governance decisions and communicated as such.",
    ],
    gapName: "Implicit Responsibility",
    gapDescription: "When responsibility is assumed rather than named, it is the first thing that erodes under pressure.",
    nextSteps: [
      "Name data privacy as a strategic governance priority in your Approach statement.",
      "Write one sentence connecting your equity commitments to your decision-making standard.",
      "Identify which leader owns Responsibility governance and communicate that ownership.",
    ],
  },
  {
    id: "R-A", stage: "Responsibility", stageLetter: "R", gap: "Actions", gapLetter: "A",
    focus: "Training & Checklist Use",
    statements: [
      "Staff have received explicit training on what constitutes personally identifiable information in AI prompts.",
      "The AI Use Decision Checklist has been distributed, discussed, and is actively referenced by staff.",
    ],
    gapName: "Policy Without Practice",
    gapDescription: "Governance documents exist but are not embedded in daily decisions. Exposure accumulates between policy and practice.",
    nextSteps: [
      "Conduct a PII-in-prompts training session with all staff within 30 days.",
      "Facilitate a Decision Checklist walkthrough with each role group, not just an all-staff send.",
      "Build the Checklist into onboarding so new staff arrive with the habit.",
    ],
  },
  {
    id: "R-P", stage: "Responsibility", stageLetter: "R", gap: "Parameters", gapLetter: "P",
    focus: "Agreements & Policies",
    statements: [
      "Signed data privacy agreements exist for every AI tool currently in use in our organization.",
      "An Acceptable and Prohibited Use policy exists, has been communicated, and is accessible to all staff.",
    ],
    gapName: "Legal Exposure",
    gapDescription: "Operating without signed DPAs and a published use policy creates compliance exposure that scales with every tool deployed.",
    nextSteps: [
      "Audit all current tools. Any tool without a signed DPA should be paused immediately.",
      "Draft or adopt an Acceptable and Prohibited Use policy within 30 days.",
      "Schedule an annual policy review and assign an owner to track DPA renewal dates.",
    ],
    examples: [
      { score: 1, label: "Not Started", text: "No signed data privacy agreements exist for any tools in use. There is no Acceptable and Prohibited Use policy. Staff use tools without any formal governance structure." },
      { score: 2, label: "Exploring",   text: "Leadership is aware that DPAs are needed and has begun asking about them. At least one tool is in use without a signed agreement. A use policy is under discussion but does not yet exist in writing." },
      { score: 3, label: "In Progress", text: "Some tools have signed DPAs. A use policy draft exists but has not been formally adopted or communicated to all staff. Not all tools have been audited." },
      { score: 4, label: "Established", text: "Every tool in use has a current, signed data privacy agreement. An Acceptable and Prohibited Use policy is adopted, communicated, accessible, and reviewed annually." },
    ],
  },
  // Enablement
  {
    id: "E-G", stage: "Enablement", stageLetter: "E", gap: "Goals", gapLetter: "G",
    focus: "Defined Staff Capacity",
    statements: [
      "We have defined what 'capable' looks like for each role in our organization.",
      "Staff know what proficiency we are working toward and why it matters for their specific work.",
    ],
    gapName: "Training Without Destination",
    gapDescription: "Professional development is happening but staff cannot identify what success looks like. Effort without a target dissipates.",
    nextSteps: [
      "Define role-specific capacity goals for each role group separately.",
      "Communicate those goals explicitly to staff alongside the rationale for each.",
      "Build a simple self-assessment staff can use to track their own progress.",
    ],
  },
  {
    id: "E-A", stage: "Enablement", stageLetter: "E", gap: "Actions", gapLetter: "A",
    focus: "Role-Specific Support",
    statements: [
      "Staff have received role-specific training, not just a generic tool walkthrough or policy announcement.",
      "There is a designated, named person staff can contact with questions without fear of judgment.",
    ],
    gapName: "Generic Enablement",
    gapDescription: "All-staff sessions produce awareness. Role-specific sessions produce practice change. One-size training underserves most roles.",
    nextSteps: [
      "Replace your next all-staff session with three 20-minute role-specific conversations.",
      "Assign and announce a named point-of-contact this week.",
      "Identify two or three responsible early adopters who can model the practice for peers.",
    ],
    examples: [
      { score: 1, label: "Not Started", text: "No professional learning has been provided. There is no named person staff can contact with questions. Staff are figuring it out independently or not at all." },
      { score: 2, label: "Exploring",   text: "One all-staff information session was held, or an email with resources was sent. Staff have general awareness but no role-specific training and no named point-of-contact." },
      { score: 3, label: "In Progress", text: "Some role-specific training has reached one or more groups. A point-of-contact has been identified informally. Not all roles are covered and support is not yet systematic." },
      { score: 4, label: "Established", text: "All role groups have received training specific to their context. A named point-of-contact is publicly known and accessible. Staff report knowing where to go with questions." },
    ],
  },
  {
    id: "E-P", stage: "Enablement", stageLetter: "E", gap: "Parameters", gapLetter: "P",
    focus: "Sustained Support Structures",
    statements: [
      "Staff have ongoing access to support resources beyond an initial training session.",
      "Responsible adoption is recognized and celebrated, not just corrected when it fails.",
    ],
    gapName: "Unsustained Adoption",
    gapDescription: "Without infrastructure for sustained support, adoption peaks at launch and regresses. Enablement is a culture, not an event.",
    nextSteps: [
      "Create a living resource hub staff can access between sessions.",
      "Build a recognition mechanism for responsible adoption, specific enough to be meaningful.",
      "Schedule quarterly Enablement check-ins rather than relying on annual PD.",
    ],
  },
];

// ── Enablement → training pathway (the course-outline layer) ───────────────
// When an Enablement cell is a priority gap, recommend a targeted micro-training.
export const TRAINING_PATHWAY: Record<string, { title: string; timing: "Pre-adoption" | "Post-adoption"; modules: string[] }> = {
  "E-G": {
    title: "Role-Based Capacity Mapping",
    timing: "Pre-adoption",
    modules: [
      "Define what 'capable' means for each role group",
      "Set proficiency targets and the rationale behind them",
      "Build a staff self-assessment to track progress",
    ],
  },
  "E-A": {
    title: "Role-Specific Practice Labs",
    timing: "Post-adoption",
    modules: [
      "Convert all-staff sessions into short role-specific labs",
      "Onboard and announce a named point-of-contact",
      "Activate early adopters as peer models",
    ],
  },
  "E-P": {
    title: "Sustaining Adoption",
    timing: "Post-adoption",
    modules: [
      "Stand up a living resource hub for between-session support",
      "Design a specific recognition mechanism",
      "Run quarterly Enablement check-ins",
    ],
  },
};

// ── Scoring ────────────────────────────────────────────────────────────────
export const PRIORITY_THRESHOLD = 3; // a cell scoring below 3 is a priority gap

export function cellById(id: string): Cell {
  return CELLS.find(c => c.id === id) as Cell;
}

export function answerFor(answers: Answer[], cellId: string): number | null {
  return answers.find(a => a.cellId === cellId)?.value ?? null;
}

export function scoreByStage(answers: Answer[]) {
  return STAGES.map(stage => {
    const stageCells = CELLS.filter(c => c.stage === stage.key);
    const vals = stageCells.map(c => answerFor(answers, c.id)).filter((v): v is number => v != null);
    const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    return { ...stage, avg, pct: Math.round((avg / 4) * 100) };
  });
}

export function scoreByGap(answers: Answer[]) {
  return GAPS.map(gap => {
    const gapCells = CELLS.filter(c => c.gap === gap.key);
    const vals = gapCells.map(c => answerFor(answers, c.id)).filter((v): v is number => v != null);
    const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    return { ...gap, avg, low: avg > 0 && avg < 2.5 };
  });
}

export function overallScore(answers: Answer[]): number {
  const vals = answers.map(a => a.value);
  if (!vals.length) return 0;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

export function priorityGaps(answers: Answer[]): { cell: Cell; value: number }[] {
  return answers
    .filter(a => a.value < PRIORITY_THRESHOLD)
    .map(a => ({ cell: cellById(a.cellId), value: a.value }))
    .sort((x, y) => x.value - y.value);
}

export function maturityLabel(avg: number): string {
  if (avg >= 3.25) return "Established";
  if (avg >= 2.5)  return "In Progress";
  if (avg >= 1.75) return "Exploring";
  return "Not Started";
}

// ── AI-teammate prompt (Putting It All Together, Part 3) ────────────────────
export function buildAIPrompt(answers: Answer[]): string {
  const line = (id: string) => `${cellById(id).stage} × ${cellById(id).gap}: ${answerFor(answers, id) ?? "_"}`;
  const top = priorityGaps(answers).slice(0, 3)
    .map((g, i) => `${i + 1}. ${g.cell.stage} × ${g.cell.gap} — ${g.cell.gapName}: ${g.cell.gapDescription}`)
    .join("\n");

  return `You are an expert in AI governance and organizational change. I am going to share the results of my AIRE™ GAP Assessment and need you to help me build a complete, practical, ready-to-use AIRE™ Implementation and Execution Plan for my organization.

[ABOUT ME]
I am a [ROLE] at [ORGANIZATION]. My organization serves [CONTEXT: e.g. approximately X people, X staff].

[MY GAP ASSESSMENT SCORES] (1 = Not Started, 4 = Established)
${["A-G","A-A","A-P","I-G","I-A","I-P","R-G","R-A","R-P","E-G","E-A","E-P"].map(line).join("\n")}

[MY TOP THREE PRIORITY GAPS]
${top || "1. [add your priority gaps]"}

[WHAT I NEED FROM YOU]
1. Review my scores and flag any gaps I may have underrated or mischaracterized.
2. Strengthen my Approach statement so it is specific, mission-connected, and ready to share with staff.
3. Build a 30-day execution plan for my top three priority gaps. Each gap should have a clear goal, three to five specific actions with suggested owners and timelines, and one success indicator.
4. Draft a one-page summary I can share with leadership explaining what the assessment revealed and what I am committing to first.
5. Suggest two questions I should be asking about the gaps I did not prioritize.

[OUTPUT FORMAT]
Use clear headings for each request. Plain, direct language. Avoid generic advice — be specific to the scores above. If you need to clarify something before you begin, ask one question at a time.`;
}
