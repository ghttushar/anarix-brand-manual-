const scenes = {
  launch: {
    tag: "Launch readiness",
    state: "Ready to review",
    kicker: "Structured next step",
    title: "Everything is aligned. Review the launch path.",
    copy:
      "A strong product moment should feel focused, not loud. Surface what matters, hide the rest, and let the primary decision breathe.",
    points: [
      "Single primary CTA with support details beneath it",
      "Calm reassurance before the point of commitment",
      "Secondary actions shifted into a lighter visual weight",
    ],
    cta: "Review launch",
    principle: "Make the next action obvious.",
    note:
      "This state demonstrates how the brand should handle high-importance moments: composed language, one dominant action, and no competing surfaces.",
  },
  onboarding: {
    tag: "Guided onboarding",
    state: "Step 2 of 4",
    kicker: "Progress with context",
    title: "Set the essentials now. The deeper setup can wait.",
    copy:
      "The manual should encourage progressive disclosure. Ask for the minimum needed to move forward, then expand only when confidence has been earned.",
    points: [
      "Break complex setup into clean, visible stages",
      "Use helper text to reduce hesitation before input",
      "Reward completion with a clear sense of momentum",
    ],
    cta: "Continue setup",
    principle: "Reduce cognitive load before asking for trust.",
    note:
      "This scene frames onboarding as guidance, not friction. Small asks, visible progress, and compact explanations keep the brand feeling capable and considerate.",
  },
  consent: {
    tag: "Trust confirmation",
    state: "Awaiting approval",
    kicker: "Calm reassurance",
    title: "Before you confirm, here is exactly what changes.",
    copy:
      "Trust moments need plain language and visible consequences. The interface should slow down just enough for confidence without creating fear or ceremony.",
    points: [
      "Explain the impact in direct, literal language",
      "Keep destructive or permanent actions visually contained",
      "Offer a soft escape route without hiding the choice",
    ],
    cta: "Confirm change",
    principle: "Use restraint to increase trust.",
    note:
      "Brand confidence often shows up as patience. This state proves that precision and transparency can feel premium without sounding severe.",
  },
  recovery: {
    tag: "Recovery path",
    state: "Safe fallback ready",
    kicker: "No dead ends",
    title: "Something drifted. Here is the fastest path back.",
    copy:
      "Recovery experiences should protect momentum. A useful system names the issue clearly, restores orientation, and offers the smallest possible next move.",
    points: [
      "State the problem once, then focus on the remedy",
      "Lead with the most likely successful action",
      "Preserve context so users do not feel reset or punished",
    ],
    cta: "Restore progress",
    principle: "Recovery should feel supportive, not apologetic.",
    note:
      "The brand stays calm under stress. Recovery patterns are where that discipline becomes most visible and most memorable.",
  },
};

const bindings = {
  tag: document.getElementById("scene-tag"),
  state: document.getElementById("scene-state"),
  kicker: document.getElementById("scene-kicker"),
  title: document.getElementById("scene-title"),
  copy: document.getElementById("scene-copy"),
  points: document.getElementById("scene-points"),
  cta: document.getElementById("scene-cta"),
  principle: document.getElementById("scene-principle"),
  note: document.getElementById("scene-note"),
};

const sceneButtons = Array.from(document.querySelectorAll("[data-scene]"));

function renderScene(sceneName) {
  const scene = scenes[sceneName];

  if (!scene) {
    return;
  }

  bindings.tag.textContent = scene.tag;
  bindings.state.textContent = scene.state;
  bindings.kicker.textContent = scene.kicker;
  bindings.title.textContent = scene.title;
  bindings.copy.textContent = scene.copy;
  bindings.cta.textContent = scene.cta;
  bindings.principle.textContent = scene.principle;
  bindings.note.textContent = scene.note;

  bindings.points.replaceChildren(
    ...scene.points.map((point) => {
      const item = document.createElement("li");
      item.textContent = point;
      return item;
    }),
  );

  sceneButtons.forEach((button) => {
    const isActive = button.dataset.scene === sceneName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

sceneButtons.forEach((button) => {
  button.addEventListener("click", () => {
    renderScene(button.dataset.scene);
  });
});

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

renderScene("launch");
