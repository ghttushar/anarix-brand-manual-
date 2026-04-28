import { useEffect, useMemo, useRef, useState } from "react";
import { AanMascot } from "./AanMascot";
import type { ProductMode, SurfaceAnchor, VisualState } from "../data";

type DemoStage = "idle" | "ready" | "input" | "processing" | "guided" | "artifact";

type StageDefinition = {
  mode: ProductMode;
  state: VisualState;
  anchor: SurfaceAnchor;
  label: string;
  note: string;
};

const stageDefinitions: Record<DemoStage, StageDefinition> = {
  idle: {
    mode: "closed",
    state: "idle",
    anchor: "center",
    label: "Idle / suggestion mode",
    note: "Aan introduces action options before the user has to invent a prompt.",
  },
  ready: {
    mode: "copilot",
    state: "ready",
    anchor: "chat-dock",
    label: "Prompt ready",
    note: "A starter intent moves Aan toward the dock and makes the next action obvious.",
  },
  input: {
    mode: "copilot",
    state: "listening",
    anchor: "chat-dock",
    label: "User prompt input",
    note: "Aan listens above the dock instead of hiding inside the field.",
  },
  processing: {
    mode: "copilot",
    state: "loading",
    anchor: "center",
    label: "Planning / processing",
    note: "The loader is still Aan. The mascot becomes the system-state anchor instead of a spinner.",
  },
  guided: {
    mode: "copilot",
    state: "guided-output",
    anchor: "center",
    label: "Guided output",
    note: "Suggestion cards emerge around a calm center anchor, not as a hard screen swap.",
  },
  artifact: {
    mode: "split",
    state: "artifact",
    anchor: "artifact",
    label: "Artifact / result",
    note: "Once the answer resolves, Aan shrinks and lets the result take priority.",
  },
};

const starterPrompts = [
  "Tell me what you can do for this dashboard.",
  "Suggest a section for this page.",
  "Suggest a page for this site.",
];

const suggestionCards = [
  {
    title: "Portfolio",
    body: "Showcase completed work and trust-building proof in a way that feels premium and direct.",
  },
  {
    title: "Testimonials",
    body: "Highlight results and quotes from satisfied customers to reduce decision friction.",
  },
  {
    title: "Service Areas",
    body: "Clarify neighborhoods or regions you serve to improve local relevance and conversion.",
  },
];

export function GuidedDemo() {
  const [stage, setStage] = useState<DemoStage>("idle");
  const [prompt, setPrompt] = useState("");
  const [artifactTitle, setArtifactTitle] = useState("Homepage plan");
  const timerRef = useRef<number | null>(null);
  const pendingStage = useRef<DemoStage | null>(null);

  const definition = stageDefinitions[stage];

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const queueStage = (next: DemoStage, title?: string) => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    if (title) {
      setArtifactTitle(title);
    }

    pendingStage.current = next;
    setStage("processing");
    timerRef.current = window.setTimeout(() => {
      setStage(pendingStage.current ?? "guided");
      pendingStage.current = null;
    }, 1900);
  };

  const canSend = prompt.trim().length > 0;

  const promptPreview = useMemo(() => {
    if (prompt.trim()) {
      return prompt;
    }

    return "Create a professional website for a business that showcases our services and what we offer.";
  }, [prompt]);

  return (
    <div className="guided-demo">
      <div className="guided-shell">
        <div className="guided-topbar">
          <div>
            <strong>Aan</strong>
            <span>Guided assistant demo</span>
          </div>
          <div className="guided-chips">
            <span>{definition.mode}</span>
            <span>{definition.state}</span>
            <span>{definition.anchor}</span>
          </div>
        </div>

        <div className={`guided-canvas stage-${stage}`}>
          <div className={`mascot-anchor anchor-${definition.anchor}`}>
            <AanMascot
              state={definition.state}
              size={stage === "artifact" ? "sm" : stage === "processing" ? "lg" : "md"}
              behavior={definition.state === "cursor-aware" ? "pointer" : stage === "idle" ? "drift" : "passive"}
              anchor={definition.anchor}
            />
          </div>

          {stage === "idle" && (
            <div className="guided-center">
              <p className="eyebrow">Guided start</p>
              <h3>Hi Tushar, let&apos;s work together to build your site.</h3>
              <p>Here are some things Aan can do right now.</p>
              <div className="starter-grid">
                {starterPrompts.map((starter) => (
                  <button
                    key={starter}
                    type="button"
                    className="starter-card"
                    onClick={() => {
                      setPrompt(starter);
                      setStage("ready");
                    }}
                  >
                    {starter}
                  </button>
                ))}
              </div>
            </div>
          )}

          {(stage === "ready" || stage === "input") && (
            <div className="guided-prompt-region">
              <p className="prompt-ready">Your prompt is ready.</p>
              <div className="prompt-card">{promptPreview}</div>
              <button
                type="button"
                className="solid-button"
                onClick={() => setStage("input")}
              >
                Continue editing
              </button>
            </div>
          )}

          {stage === "processing" && (
            <div className="guided-processing">
              <div className="assistant-bubble">
                Customers can easily see your value. We&apos;ll focus on creating a clean, active
                layout that presents your services in a way that builds trust and draws visitors
                in.
              </div>
              <div className="processing-card">
                <strong>Planning your site</strong>
                <span>This may take a few minutes.</span>
              </div>
            </div>
          )}

          {stage === "guided" && (
            <div className="guided-results">
              <div className="user-bubble">I want to generate a section that fits this page.</div>
              <div className="result-panel">
                <p>Here are a few ideas for sections to add to this page.</p>
                <div className="suggestion-stack">
                  {suggestionCards.map((card, index) => (
                    <article
                      key={card.title}
                      className="suggestion-card"
                      style={{ animationDelay: `${index * 110}ms` }}
                    >
                      <h4>{card.title}</h4>
                      <p>{card.body}</p>
                      <button
                        type="button"
                        className="link-button"
                        onClick={() => queueStage("artifact", `${card.title} section plan`)}
                      >
                        Generate section
                      </button>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}

          {stage === "artifact" && (
            <div className="artifact-preview">
              <div className="artifact-card">
                <div className="artifact-card-head">
                  <span>Generated section</span>
                  <span className="artifact-tag">split view</span>
                </div>
                <h4>{artifactTitle}</h4>
                <p>
                  Aan resolves the flow into a concrete artifact with a title, structure, and next
                  actions rather than leaving the user in chat.
                </p>
                <ul>
                  <li>Lead statement with service promise</li>
                  <li>Three proof points aligned to conversion</li>
                  <li>CTA block with next best action</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="guided-dock">
          <span className="dock-context">Hero</span>
          <div className="dock-input">
            <textarea
              value={prompt}
              onChange={(event) => {
                setPrompt(event.target.value);
                if (stage === "idle") {
                  setStage("ready");
                }
                if (stage === "ready") {
                  setStage("input");
                }
              }}
              placeholder="Ask me anything..."
              rows={1}
            />
            <button
              type="button"
              className="send-button"
              onClick={() => {
                if (canSend) {
                  queueStage("guided", "Suggested homepage sections");
                }
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <div className="guided-sidecar">
        <div className="info-card">
          <p className="eyebrow">Flow note</p>
          <h4>{definition.label}</h4>
          <p>{definition.note}</p>
        </div>
        <div className="stage-switcher">
          {(Object.keys(stageDefinitions) as DemoStage[]).map((key) => (
            <button
              key={key}
              type="button"
              className={`stage-pill ${stage === key ? "is-active" : ""}`}
              onClick={() => setStage(key)}
            >
              {stageDefinitions[key].label}
            </button>
          ))}
          <button
            type="button"
            className="ghost-button"
            onClick={() => {
              if (timerRef.current) {
                window.clearTimeout(timerRef.current);
              }
              pendingStage.current = null;
              setPrompt("");
              setArtifactTitle("Homepage plan");
              setStage("idle");
            }}
          >
            Reset flow
          </button>
        </div>
      </div>
    </div>
  );
}
