const header = document.getElementById("site-header");
const revealTargets = document.querySelectorAll(".reveal");
const motionStatus = document.getElementById("motion-status");
const replayButton = document.getElementById("replay-animation");
const animationContainer = document.getElementById("logo-animation");
const taxonomyContainer = document.getElementById("state-taxonomy");
const processChip = document.getElementById("process-state-chip");
const processTitle = document.getElementById("process-title");
const processCopy = document.getElementById("process-copy");
const processPoints = document.getElementById("process-points");
const processAvatar = document.getElementById("process-avatar");
const processButtons = Array.from(document.querySelectorAll("[data-process-state]"));
const surfaceMatrixBody = document.getElementById("surface-matrix-body");
const bundleSignals = document.getElementById("bundle-signals");
const cursorStage = document.getElementById("cursor-stage");
const cursorAvatar = document.getElementById("cursor-avatar");

const AAN_STATE_MAP = {
  still: {
    label: "still",
    title: "Aan begins as a floating coral diamond.",
    copy:
      "Still form is the quiet baseline. It keeps the diamond primary, the face minimal, and the motion almost suspended.",
    points: [
      "Hold the diamond before any morph.",
      "Use eyes only to suggest awareness.",
      "Keep coral as the default body color.",
    ],
  },
  "idle-loader": {
    label: "idle-loader",
    title: "Aan waits above the system with patient attention.",
    copy:
      "Loader state keeps the eyes alive, the bar readable, and the body calm so the mascot never becomes a spinner toy.",
    points: [
      "Eyes can glance, but the body stays composed.",
      "The loading bar appears only when work is real.",
      "Always resolve back into a clean diamond.",
    ],
  },
  "chat-hovering": {
    label: "chat-hovering",
    title: "Aan listens from above the composer.",
    copy:
      "Chat hovering keeps Aan close to the user's intent without interrupting the sentence, caret, or placeholder.",
    points: [
      "Anchor above the field, not inside it.",
      "Scale down from loader size.",
      "Stay coral-forward while the user is still speaking.",
    ],
  },
  "typing-listening": {
    label: "typing-listening",
    title: "Aan listens before it commits to motion.",
    copy:
      "Typing state should stay coral-forward, compact, and attentive. The eyes can hold a stronger focus, but the body should remain readable as a diamond.",
    points: [
      "Stay closest to the still form.",
      "Do not jump into a heavy morph while the user is still typing.",
      "Use attention, not spectacle, as the signal.",
    ],
  },
  "thinking-processing": {
    label: "thinking-processing",
    title: "Thinking adds tension and orbit without panic.",
    copy:
      "Processing can tighten the diamond, introduce orbit, and use darker tones to imply focus, but it must stay controlled.",
    points: [
      "Compression is allowed. Collapse is not.",
      "Orbit can spin, but the center must stay readable.",
      "Return to still or analyzing without visual noise.",
    ],
  },
  analyzing: {
    label: "analyzing",
    title: "Analyzing can lean into blue when the product is actively working.",
    copy:
      "Analyzing is the strongest cognition state. This is where blue and black can appear, but only because the interface has entered a real reasoning moment.",
    points: [
      "Use blue or blue-coral gradients only when the state is earned.",
      "Let the loading bar confirm real progress.",
      "Exit cleanly into a result or idle state.",
    ],
  },
  "cursor-aware": {
    label: "cursor-aware",
    title: "Cursor response should feel magnetic and quiet.",
    copy:
      "The eyes can move a little more than the body. Follow with resistance, then return smoothly to center.",
    points: [
      "Keep travel radius short.",
      "Do not snap directly to the pointer.",
      "Reset immediately on pointer exit.",
    ],
  },
  "button-embedded": { label: "button-embedded" },
  "nav-presence": { label: "nav-presence" },
  "action-island": { label: "action-island" },
  copilot: { label: "copilot" },
  "workspace-fullscreen": { label: "workspace/fullscreen" },
  "artifact-result": { label: "artifact/result" },
};

const AAN_STATE_ORDER = [
  "still",
  "idle-loader",
  "chat-hovering",
  "typing-listening",
  "thinking-processing",
  "analyzing",
  "cursor-aware",
  "button-embedded",
  "nav-presence",
  "action-island",
  "copilot",
  "workspace-fullscreen",
  "artifact-result",
];

const SURFACE_MATRIX = [
  {
    surface: "Sidebar Ask Aan pill",
    trigger: "Persistent sidebar entry wired to openWorkspace",
    states: "button-embedded, nav-presence",
    exit: "Returns to calm trigger state when workspace closes",
  },
  {
    surface: "Taskbar Ask Aan button",
    trigger: "Compact action row when floating island is off",
    states: "button-embedded, nav-presence",
    exit: "Stays compact and yields to the island when that mode is active",
  },
  {
    surface: "Floating action island",
    trigger: "Hover-expanded quick-action cluster on the latest dashboard",
    states: "action-island, button-embedded",
    exit: "Returns to plain island state when AI is not active",
  },
  {
    surface: "Selected-text Ask Aan tooltip",
    trigger: "User highlights text and AskAanTooltip seeds pendingPrompt",
    states: "cursor-aware, button-embedded",
    exit: "Disappears after click, deselect, or navigation",
  },
  {
    surface: "Chat composer",
    trigger: "User focuses or types in the AI input",
    states: "chat-hovering, typing-listening",
    exit: "Disappears when input closes or AI surface collapses",
  },
  {
    surface: "Copilot panel",
    trigger: "openCopilot plus active conversation and generation flow",
    states: "typing-listening, thinking-processing, analyzing",
    exit: "Returns to idle or closes with closeAan",
  },
  {
    surface: "Split artifact review",
    trigger: "openSplit with currentArtifact or draft click-through",
    states: "artifact-result",
    exit: "Returns to copilot when the artifact panel is dismissed",
  },
  {
    surface: "Workspace route",
    trigger: "openWorkspace and ongoing AI-led review flow",
    states: "nav-presence, cursor-aware, typing-listening",
    exit: "Docks back to compact entry when workspace closes",
  },
  {
    surface: "Secondary product buttons",
    trigger: "Design system and component library Ask Aan variants",
    states: "button-embedded, nav-presence",
    exit: "Use icon-only or compact label treatments, never full mascots",
  },
];

const LIVE_BUNDLE_SIGNALS = [
  "AanProvider",
  "useAan",
  "closed | copilot | split | workspace",
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
  "gemini-flash",
];

let logoAnimation = null;

function syncHeader() {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function setMotionStatus(message, isError = false) {
  if (!motionStatus) {
    return;
  }

  motionStatus.textContent = message;
  motionStatus.classList.toggle("is-error", isError);
}

function setupRevealObserver() {
  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealTargets.forEach((target) => observer.observe(target));
}

function setupLogoAnimation() {
  if (!animationContainer) {
    return;
  }

  if (!window.lottie) {
    setMotionStatus("The Lottie runtime could not load. Download the JSON source below.", true);
    return;
  }

  logoAnimation = window.lottie.loadAnimation({
    container: animationContainer,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "anarix-logo-loader.json",
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  });

  logoAnimation.addEventListener("DOMLoaded", () => {
    setMotionStatus("Official Lottie source loaded unchanged.");
  });

  logoAnimation.addEventListener("data_failed", () => {
    setMotionStatus("The official animation JSON could not be rendered.", true);
  });
}

function renderAanTaxonomy() {
  if (!taxonomyContainer) {
    return;
  }

  taxonomyContainer.replaceChildren(
    ...AAN_STATE_ORDER.map((stateName) => {
      const token = document.createElement("span");
      token.className = "state-token";
      token.textContent = AAN_STATE_MAP[stateName].label;
      return token;
    }),
  );
}

function renderProcessState(stateName) {
  const state = AAN_STATE_MAP[stateName];

  if (!state || !processAvatar || !processChip || !processTitle || !processCopy || !processPoints) {
    return;
  }

  processChip.textContent = state.label;
  processTitle.textContent = state.title;
  processCopy.textContent = state.copy;
  processPoints.replaceChildren(
    ...state.points.map((point) => {
      const item = document.createElement("li");
      item.textContent = point;
      return item;
    }),
  );

  processAvatar.className = `aan-avatar size-lg state-${stateName}`;

  processButtons.forEach((button) => {
    const isActive = button.dataset.processState === stateName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

function renderSurfaceMatrix() {
  if (!surfaceMatrixBody) {
    return;
  }

  surfaceMatrixBody.replaceChildren(
    ...SURFACE_MATRIX.map((entry) => {
      const row = document.createElement("tr");
      [entry.surface, entry.trigger, entry.states, entry.exit].forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });
      return row;
    }),
  );
}

function renderBundleSignals() {
  if (!bundleSignals) {
    return;
  }

  bundleSignals.replaceChildren(
    ...LIVE_BUNDLE_SIGNALS.map((signal) => {
      const token = document.createElement("span");
      token.className = "signal-pill";
      token.textContent = signal;
      return token;
    }),
  );
}

function createCursorFollower(stage, avatar, { followX = 18, followY = 14, eyeX = 4, eyeY = 3 } = {}) {
  if (!stage || !avatar) {
    return {
      fromEvent() {},
      reset() {},
    };
  }

  let targetX = 0;
  let targetY = 0;
  let targetEyeX = 0;
  let targetEyeY = 0;
  let currentX = 0;
  let currentY = 0;
  let currentEyeX = 0;
  let currentEyeY = 0;
  let frameId = 0;

  const tick = () => {
    currentX += (targetX - currentX) * 0.16;
    currentY += (targetY - currentY) * 0.16;
    currentEyeX += (targetEyeX - currentEyeX) * 0.2;
    currentEyeY += (targetEyeY - currentEyeY) * 0.2;

    avatar.style.setProperty("--follow-x", `${currentX}px`);
    avatar.style.setProperty("--follow-y", `${currentY}px`);
    avatar.style.setProperty("--pupil-shift-x", `${currentEyeX}px`);
    avatar.style.setProperty("--pupil-shift-y", `${currentEyeY}px`);

    if (
      Math.abs(targetX - currentX) > 0.08 ||
      Math.abs(targetY - currentY) > 0.08 ||
      Math.abs(targetEyeX - currentEyeX) > 0.08 ||
      Math.abs(targetEyeY - currentEyeY) > 0.08
    ) {
      frameId = requestAnimationFrame(tick);
    } else {
      frameId = 0;
    }
  };

  const schedule = () => {
    if (!frameId) {
      frameId = requestAnimationFrame(tick);
    }
  };

  const setTarget = (x, y, pupilX, pupilY) => {
    targetX = Math.max(-followX, Math.min(followX, x));
    targetY = Math.max(-followY, Math.min(followY, y));
    targetEyeX = Math.max(-eyeX, Math.min(eyeX, pupilX));
    targetEyeY = Math.max(-eyeY, Math.min(eyeY, pupilY));
    schedule();
  };

  return {
    fromEvent(event) {
      const rect = stage.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width;
      const relativeY = (event.clientY - rect.top) / rect.height;
      const offsetX = (relativeX - 0.5) * rect.width * 0.06;
      const offsetY = (relativeY - 0.5) * rect.height * 0.05;
      const pupilX = (relativeX - 0.5) * eyeX * 2;
      const pupilY = (relativeY - 0.5) * eyeY * 2;
      setTarget(offsetX, offsetY, pupilX, pupilY);
    },
    reset() {
      setTarget(0, 0, 0, 0);
    },
  };
}

if (replayButton) {
  replayButton.addEventListener("click", () => {
    if (!logoAnimation) {
      setMotionStatus("Animation runtime is still loading.", true);
      return;
    }

    logoAnimation.goToAndPlay(0, true);
    setMotionStatus("Replaying the official source animation.");
  });
}

processButtons.forEach((button) => {
  button.addEventListener("click", () => {
    renderProcessState(button.dataset.processState);
  });
});

const cursorFollower = createCursorFollower(cursorStage, cursorAvatar);

if (cursorStage && cursorAvatar) {
  cursorStage.addEventListener("mousemove", (event) => {
    cursorFollower.fromEvent(event);
  });

  cursorStage.addEventListener("mouseleave", () => {
    cursorFollower.reset();
  });
}

window.addEventListener("scroll", syncHeader, { passive: true });

syncHeader();
setupRevealObserver();
setupLogoAnimation();
renderAanTaxonomy();
renderProcessState("typing-listening");
renderSurfaceMatrix();
renderBundleSignals();
