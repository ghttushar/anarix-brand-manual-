const motionStates = {
  idle: {
    chip: "Idle",
    title: "Aan waits above the system, calm and ready.",
    copy:
      "Idle is a suspended state. Aan should feel aware of the body beneath it without performing for attention.",
    points: [
      "Use a subtle float, not a bounce.",
      "Keep the diamond above the pillars even when nothing is happening.",
      "Make the presence legible before adding spectacle.",
    ],
  },
  cursor: {
    chip: "Cursor aware",
    title: "Aan acknowledges attention and leans toward intent.",
    copy:
      "Cursor response should feel magnetic and intelligent. The movement can be noticeable, but it should never look playful or unstable.",
    points: [
      "Track the pointer with resistance, not direct attachment.",
      "Use movement to suggest awareness, not entertainment.",
      "Return cleanly to center when the user leaves.",
    ],
  },
  think: {
    chip: "Thinking",
    title: "Aan compresses the signal while it reasons.",
    copy:
      "Thinking state should feel focused. Tighten the diamond, rotate the ring, and hold the pillars steady so the system still feels grounded.",
    points: [
      "The ring can rotate, but the structure should stay stable.",
      "Use repetition to imply computation, not anxiety.",
      "Keep the hierarchy intact while the AI is processing context.",
    ],
  },
  loading: {
    chip: "Loading",
    title: "Aan can morph into a loading bar when work becomes visible.",
    copy:
      "The loading morph is allowed because it translates intelligence into progress. It should feel like a deliberate system state, not a gimmick.",
    points: [
      "Shift from diamond to bar only while real progress is happening.",
      "Keep coral in charge of the state change so the AI remains identifiable.",
      "Return to the diamond once the action resolves.",
    ],
  },
  action: {
    chip: "Taking action",
    title: "Aan brightens, commits, and pushes clarity back into the system.",
    copy:
      "Action state is the moment where intelligence becomes assistance. It should feel decisive and energized, but still controlled.",
    points: [
      "Use stronger halo and signal lines to suggest activation.",
      "End in a clear result, not a lingering animation.",
      "Leave the user with confidence, not suspense.",
    ],
  },
};

const motionBindings = {
  chip: document.getElementById("motion-state-chip"),
  title: document.getElementById("motion-title"),
  copy: document.getElementById("motion-copy"),
  points: document.getElementById("motion-points"),
  presence: document.getElementById("motion-presence"),
};

const motionButtons = Array.from(document.querySelectorAll("[data-motion-state]"));
let currentMotionState = "idle";

function renderMotionState(stateName) {
  const state = motionStates[stateName];

  if (!state || !motionBindings.presence) {
    return;
  }

  currentMotionState = stateName;
  motionBindings.chip.textContent = state.chip;
  motionBindings.title.textContent = state.title;
  motionBindings.copy.textContent = state.copy;
  motionBindings.points.replaceChildren(
    ...state.points.map((point) => {
      const item = document.createElement("li");
      item.textContent = point;
      return item;
    }),
  );

  motionBindings.presence.className = `aan-presence state-${stateName}`;

  motionButtons.forEach((button) => {
    const isActive = button.dataset.motionState === stateName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

motionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    renderMotionState(button.dataset.motionState);
  });
});

function createFollower(stage, anchor, { strength = 0.18, limitX = 54, limitY = 42 } = {}) {
  if (!stage || !anchor) {
    return {
      fromEvent() {},
      reset() {},
    };
  }

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let frameId = 0;

  const tick = () => {
    currentX += (targetX - currentX) * 0.14;
    currentY += (targetY - currentY) * 0.14;
    anchor.style.transform = `translate(${currentX}px, ${currentY}px)`;

    if (Math.abs(targetX - currentX) > 0.12 || Math.abs(targetY - currentY) > 0.12) {
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

  const setTarget = (x, y) => {
    targetX = Math.max(-limitX, Math.min(limitX, x));
    targetY = Math.max(-limitY, Math.min(limitY, y));
    schedule();
  };

  return {
    fromEvent(event) {
      const rect = stage.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width;
      const relativeY = (event.clientY - rect.top) / rect.height;
      const offsetX = (relativeX - 0.5) * rect.width * strength;
      const offsetY = (relativeY - 0.5) * rect.height * strength;

      stage.style.setProperty("--pointer-x", `${relativeX * 100}%`);
      stage.style.setProperty("--pointer-y", `${relativeY * 100}%`);
      setTarget(offsetX, offsetY);
    },
    reset() {
      stage.style.removeProperty("--pointer-x");
      stage.style.removeProperty("--pointer-y");
      setTarget(0, 0);
    },
  };
}

const heroStage = document.getElementById("hero-stage");
const heroMascot = document.getElementById("hero-mascot");
const heroPresence = document.getElementById("hero-presence");
const motionStage = document.getElementById("motion-stage");
const motionAnchor = document.getElementById("motion-anchor");

const heroFollower = createFollower(heroStage, heroMascot, {
  strength: 0.18,
  limitX: 58,
  limitY: 50,
});

const motionFollower = createFollower(motionStage, motionAnchor, {
  strength: 0.22,
  limitX: 76,
  limitY: 62,
});

if (heroStage && heroPresence) {
  heroStage.addEventListener("mousemove", (event) => {
    heroFollower.fromEvent(event);
    heroPresence.className = "aan-presence state-cursor";
  });

  heroStage.addEventListener("mouseleave", () => {
    heroFollower.reset();
    heroPresence.className = "aan-presence state-idle";
  });
}

if (motionStage) {
  motionStage.addEventListener("mousemove", (event) => {
    if (currentMotionState === "cursor") {
      motionFollower.fromEvent(event);
    } else {
      const rect = motionStage.getBoundingClientRect();
      motionStage.style.setProperty("--pointer-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
      motionStage.style.setProperty("--pointer-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    }
  });

  motionStage.addEventListener("mouseleave", () => {
    motionFollower.reset();
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    },
  );

  document.querySelectorAll(".reveal").forEach((section) => {
    revealObserver.observe(section);
  });
} else {
  document.querySelectorAll(".reveal").forEach((section) => {
    section.classList.add("is-visible");
  });
}

renderMotionState("idle");
