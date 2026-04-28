export type ProductMode = "closed" | "copilot" | "split" | "workspace";
export type VisualState =
  | "idle"
  | "ready"
  | "listening"
  | "loading"
  | "thinking"
  | "guided-output"
  | "artifact"
  | "cursor-aware";
export type SurfaceAnchor =
  | "center"
  | "chat-dock"
  | "island"
  | "taskbar"
  | "tooltip"
  | "copilot"
  | "workspace"
  | "artifact";

export const colorSwatches = [
  {
    name: "Primary Coral",
    hex: "#F26E77",
    note: "Use exactly as supplied inside the official mark and coral-led Aan states.",
  },
  {
    name: "Primary Blue",
    hex: "#4A62D9",
    note: "Use exactly as supplied inside the official mark and higher-cognition Aan states.",
  },
  {
    name: "Logo Ink",
    hex: "#1D252D",
    note: "Use only for the official wordmark and darker embedded-system Aan moments.",
  },
];

export const phaseOneRules = [
  {
    title: "Primary logo",
    note: "Use the full logo when the name must appear. Never redraw, recolor, invert, or re-proportion it.",
  },
  {
    title: "Standalone symbol",
    note: "Use the official symbol when space is tight. Maintain at least 1x clear space based on the coral diamond height.",
  },
  {
    title: "Minimum size",
    note: "Do not reproduce the full logo below 160px wide or the symbol below 48px wide on screen.",
  },
  {
    title: "Dark usage",
    note: "Keep the full logo exact on dark surfaces by placing it on a light carrier instead of recoloring it.",
  },
];

export const fullFormCards = [
  {
    kicker: "A / Anarix",
    title: "Native to the platform.",
    copy: "Aan should always feel like it belongs to Anarix, not like a bolted-on chatbot layer.",
  },
  {
    kicker: "A / Analytical",
    title: "Grounded in signals and evidence.",
    copy: "Aan reads prompts, surfaces context, and turns product state into the next useful action.",
  },
  {
    kicker: "N / Nural",
    title: "Connected across nodes and workflows.",
    copy: "The spelling is preserved exactly as supplied, and the meaning stays operational across the system.",
  },
];

export const meaningCards = [
  {
    kicker: "Hindi and Sanskrit signal",
    title: "Self-respect, dignity, esteem, honor, grace, and the sun.",
    copy: "Aan should feel composed, respected, and watchful rather than performative.",
  },
  {
    kicker: "English brand gloss",
    title: "Presence, poise, kindness, peace, and clear guidance.",
    copy: "Inside the manual, Aan reads as calm intelligence that notices and responds without panic.",
  },
  {
    kicker: "Product translation",
    title: "If Anarix is the body, Aan is the layer above action.",
    copy: "It does not replace the product. It helps the product notice, analyze, and act.",
  },
];

export const critiqueColumns = {
  improved: [
    "It turns Aan into a live component instead of a documented mockup.",
    "Cursor tracking, blinking, and morphing are implemented in code rather than described.",
    "It proves the mascot can shift between diamond, circle, bar, and cube-like states.",
    "It pushes the manual closer to a behavior demo instead of a static style page.",
  ],
  stillMissing: [
    "It is still a showcase page, not a state-driven assistant system like Aria.",
    "The mascot is not anchored to a unified product state machine or progressive disclosure flow.",
    "The prototype redraws brand geometry too loosely and simplifies official identity assets.",
    "It does not sit inside your real Anarix UI surfaces with the same rigor as the app source.",
  ],
};

export const motionRules = [
  "No generic spinner behavior. Aan must stay the identity anchor while the system works.",
  "No instant snapping. Movement should feel slightly weighted and delayed.",
  "No chatty blinking or decorative eye noise.",
  "No mascot presence when the AI surface is inactive.",
  "Respect reduced motion with calmer fades, shorter travel, and state swaps instead of choreography.",
  "On touch devices, replace cursor chasing with slow autonomous gaze drift.",
];

export const stateDescriptors: Record<
  VisualState,
  {
    title: string;
    copy: string;
    mode: ProductMode;
    anchor: SurfaceAnchor;
  }
> = {
  idle: {
    title: "Diamond-first idle",
    copy: "Aan rests as a diamond with only enough life to feel aware.",
    mode: "closed",
    anchor: "center",
  },
  ready: {
    title: "Prompt-ready",
    copy: "Aan moves closer to the dock and prepares the user to act without forcing a blank canvas.",
    mode: "copilot",
    anchor: "chat-dock",
  },
  listening: {
    title: "Listening",
    copy: "The form leans circle-first while the user is typing, staying available without overtaking the input.",
    mode: "copilot",
    anchor: "chat-dock",
  },
  loading: {
    title: "Planning / processing",
    copy: "The mascot condenses into a bar-led system indicator so loading still feels like Aan rather than a spinner.",
    mode: "copilot",
    anchor: "center",
  },
  thinking: {
    title: "Thinking",
    copy: "Higher-cognition states can introduce blue, black, and a tighter cube-like body while staying controlled.",
    mode: "copilot",
    anchor: "center",
  },
  "guided-output": {
    title: "Guided output",
    copy: "Aan becomes the center-state anchor while suggestions and section cards emerge around it.",
    mode: "copilot",
    anchor: "center",
  },
  artifact: {
    title: "Artifact / result",
    copy: "Once the answer resolves, Aan gets smaller and calmer so the output becomes primary.",
    mode: "split",
    anchor: "artifact",
  },
  "cursor-aware": {
    title: "Cursor-aware",
    copy: "Aan reacts with resistance and short travel, following intent rather than chasing the pointer.",
    mode: "workspace",
    anchor: "workspace",
  },
};

export const surfaceMatrix = [
  {
    surface: "AppSidebar Ask Aan pill",
    trigger: "Persistent sidebar entry wired to workspace mode",
    states: "ready, artifact",
    exit: "Returns to a calm trigger when the workspace closes",
  },
  {
    surface: "FloatingActionIsland",
    trigger: "Hover-expanded quick-action cluster on the latest dashboard",
    states: "ready, artifact",
    exit: "Collapses back into the island without leaving mascot residue",
  },
  {
    surface: "AppTaskbar compact action row",
    trigger: "Floating island disabled or compact layouts",
    states: "ready",
    exit: "Stays button-scaled and never grows into a floating character",
  },
  {
    surface: "AskAanTooltip",
    trigger: "Selected text seeds a pending prompt into copilot",
    states: "cursor-aware, ready",
    exit: "Disappears on deselect, submit, or navigation",
  },
  {
    surface: "AanCopilotPanel + AanInput",
    trigger: "Open copilot and active conversation flow",
    states: "listening, loading, thinking, guided-output",
    exit: "Returns to ready or fully closes with no ambient mascot left behind",
  },
  {
    surface: "AanSplitView / currentArtifact",
    trigger: "Draft or report opens into artifact review",
    states: "artifact",
    exit: "Hands focus back to content when the split closes",
  },
  {
    surface: "AanWorkspace",
    trigger: "Full-screen AI review mode and deeper multi-step work",
    states: "cursor-aware, listening, artifact",
    exit: "Docks back into compact entry points when workspace closes",
  },
];

export const sourceSignals = [
  "AanProvider",
  "openCopilot",
  "openWorkspace",
  "openSplit",
  "closeAan",
  "AskAanTooltip",
  "FloatingActionIsland",
  "currentArtifact",
  "pendingPrompt",
  "selectedModel",
  "generationType = report | audit",
];
