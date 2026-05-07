import type { ReactNode } from "react";
import { ArrowUp, Mic, Plus } from "lucide-react";
import anarixLogo from "../anarix-logo.svg";
import anarixSymbol from "../anarix-symbol.svg";
import anarixLoaderUrl from "../anarix-logo-loader.json?url";
import { Aan } from "./components/Aan";
import { AnarixLoader } from "./components/AnarixLoader";
import { Diamond } from "./components/Diamond";
import { colorSwatches, misuseRules, phaseOneRules } from "./data";

const guidedOptions = [
  "Tell me what you can do",
  "Suggest a section for this page",
  "Suggest a page for this site",
];

const sectionIdeas = [
  {
    title: "Portfolio",
    body: "Showcase completed work and success stories to reinforce your expertise and build trust with potential clients.",
  },
  {
    title: "Testimonials",
    body: "Highlight reviews and quotes from satisfied customers to provide social proof that encourages new visitors to connect.",
  },
  {
    title: "Service Areas",
    body: "Clearly list the neighborhoods or regions you serve to attract nearby customers and improve local search visibility.",
  },
];

const buttonPatterns = [
  { label: "Ask Aan", tone: "dark" as const },
  { label: "Copilot Mode", tone: "light" as const },
  { label: "Generate Section", tone: "primary" as const },
];

const metrics = [
  { label: "Active users", value: "128,402", delta: "+12.4%" },
  { label: "Activation", value: "38.1%", delta: "+2.1%" },
  { label: "Retention", value: "71.6%", delta: "-0.8%" },
];

const actionIslandActions = ["Summarize", "Build report", "Explain drop"];

const workspaceBullets = [
  "Retention softened after Tuesday's onboarding experiment.",
  "Paid search stayed efficient while direct traffic improved conversion quality.",
  "Aan should surface the cause, the impact, and the next recommended action.",
];

const philosophyOrigins = [
  {
    label: "Brand origin",
    title: "Anarix comes from analytics + metrics.",
    body: "Aan is the intelligence layer born from that union, translating analysis and metrics into visible guidance, interpretation, and action.",
  },
  {
    label: "Shape ancestry",
    title: "Aan inherits the Anarix diamond.",
    body: "The mascot is not a separate invented icon. It grows out of the same geometric family as the official Anarix symbol and gives that logic life.",
  },
  {
    label: "System role",
    title: "If Anarix is the body, Aan is the brain.",
    body: "Aan connects with every active part of the product to understand context, analyze signals, and suggest or trigger the next best move.",
  },
];

const philosophyRules = [
  {
    label: "How",
    title: "How Aan relates visually",
    body: "The same diamond ancestry stays intact, but gaze, morphing, and motion make the form feel intelligent rather than static.",
  },
  {
    label: "Why",
    title: "Why Aan exists",
    body: "Aan makes intelligence visible. It gives users a trustworthy presence whenever the system is analyzing, guiding, generating, or deciding.",
  },
  {
    label: "When",
    title: "When Aan appears",
    body: "Aan shows up only when intelligence is active: in the dock, copilot, action island, quick actions, surfaced insights, and generated artifacts.",
  },
];

const presenceRules = {
  active: [
    "Chat dock and prompt entry",
    "Copilot panels and split view",
    "Action island and quick actions",
    "Insight notices and generated artifacts",
  ],
  passive: [
    "Static decoration in empty chrome",
    "Repeated branding where no AI is active",
    "Noisy mascot moments without purpose",
    "Cute filler motion disconnected from work",
  ],
};

const stateNarratives = [
  {
    shape: "diamond" as const,
    label: "Diamond idle",
    body: "The inherited Anarix form at rest: calm, ready, and structurally tied to the brand.",
  },
  {
    shape: "circle" as const,
    label: "Circle listening",
    body: "Aan opens into a softer listening state when it receives human intent and context.",
  },
  {
    shape: "bar" as const,
    label: "Bar loading",
    body: "The form stretches into a bridge between prompt and output while work is being processed.",
  },
  {
    shape: "cube" as const,
    label: "Cube thinking",
    body: "Aan condenses into a tighter analytical state when reasoning becomes focused and decision-heavy.",
  },
];

function Section({
  id,
  eyebrow,
  title,
  description,
  dark = false,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`section-shell ${dark ? "is-dark" : ""}`}>
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          {description ? <p className="section-copy">{description}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

function DockMock({
  context = "Hero",
  compact = false,
  prompt = "Ask me anything...",
}: {
  context?: string;
  compact?: boolean;
  prompt?: string;
}) {
  return (
    <div className={`flow-dock ${compact ? "is-compact" : ""}`}>
      <div className="flow-dock-row">
        <div className="flow-aan-anchor">
          <Aan size={compact ? 20 : 24} shape="circle" trackCursor={false} />
        </div>
        <div className="flow-dock-body">
          <div className="flow-context-strip">
            <div className="flow-context-pill">{context}</div>
            <div className="flow-context-meta">Aan is ready</div>
          </div>
          <div className="flow-input-shell">
            <span className="flow-input-placeholder">{prompt}</span>
            <div className="flow-dock-actions">
              <span className="flow-mini-icon">
                <Plus size={14} />
              </span>
              <span className="flow-mini-icon">
                <Mic size={14} />
              </span>
              <span className="flow-mini-icon is-solid">
                <ArrowUp size={14} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="flow-disclaimer">AI can make mistakes. Double-check the results.</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand-home" href="#top">
          <img src={anarixSymbol} alt="" />
          <div>
            <strong>Anarix</strong>
            <span>Official brand manual</span>
          </div>
        </a>

        <nav className="site-nav" aria-label="Primary">
          <a href="#foundation">Foundation</a>
          <a href="#usage">Usage</a>
          <a href="#assets">Assets</a>
          <a href="#aan">Aan</a>
          <a href="#copilot">Copilot</a>
        </nav>

        <a className="header-cta" href="#aan">
          Open Aan chapter
        </a>
      </header>

      <main id="top">
        <section className="hero-shell">
          <div className="hero-copy">
            <p className="eyebrow">Anarix brand manual</p>
            <h1>The official Anarix identity system, kept exact.</h1>
            <p className="hero-summary">
              This manual keeps the supplied Anarix logo, symbol, colors, and loader source as the
              single source of truth for future design, marketing, and product use.
            </p>
            <div className="hero-actions">
              <a className="solid-button" href="#foundation">
                Review foundation
              </a>
              <a className="ghost-button" href="#assets">
                Download assets
              </a>
            </div>
            <ul className="hero-facts">
              <li>Use the official logo and symbol exactly as supplied.</li>
              <li>Keep coral, blue, and ink values unchanged.</li>
              <li>Use the original loader source for motion references.</li>
            </ul>
          </div>

          <div className="hero-stage">
            <div className="hero-stage-card">
              <span className="stage-label">Official logo system</span>
              <img className="hero-logo" src={anarixLogo} alt="Official Anarix logo" />
              <img className="hero-symbol" src={anarixSymbol} alt="Official Anarix symbol" />
              <p>
                The full logo is the primary mark. The symbol is the compact identifier for tighter
                surfaces and favicon-scale applications.
              </p>
            </div>
          </div>
        </section>

        <Section
          id="foundation"
          eyebrow="Foundation"
          title="Exact logo, symbol, and color rules."
          description="These files and values should be treated as fixed brand assets rather than reinterpreted artwork."
        >
          <div className="foundation-grid">
            <div className="stack-card">
              <h3>Primary brand hues</h3>
              <div className="swatch-list">
                {colorSwatches.map((swatch) => (
                  <article key={swatch.name} className="swatch-card">
                    <div className="swatch-chip" style={{ background: swatch.hex }} />
                    <div>
                      <strong>{swatch.name}</strong>
                      <span>{swatch.hex}</span>
                      <p>{swatch.note}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="stack-card" id="usage">
              <h3>Approved logo usage</h3>
              <div className="usage-grid">
                <figure className="usage-panel light">
                  <img src={anarixLogo} alt="Official Anarix logo on light background" />
                  <figcaption>Logo on light</figcaption>
                </figure>
                <figure className="usage-panel dark">
                  <div className="logo-carrier">
                    <img
                      src={anarixLogo}
                      alt="Official Anarix logo on light carrier over dark background"
                    />
                  </div>
                  <figcaption>Logo on dark context</figcaption>
                </figure>
                <figure className="usage-panel light">
                  <img src={anarixSymbol} alt="Official Anarix symbol on light background" />
                  <figcaption>Symbol on light</figcaption>
                </figure>
                <figure className="usage-panel dark">
                  <img src={anarixSymbol} alt="Official Anarix symbol on dark background" />
                  <figcaption>Symbol on dark</figcaption>
                </figure>
              </div>
            </div>
          </div>

          <div className="rule-grid">
            {phaseOneRules.map((rule) => (
              <article key={rule.title} className="rule-card">
                <h4>{rule.title}</h4>
                <p>{rule.note}</p>
              </article>
            ))}
          </div>

          <div className="note-grid">
            {misuseRules.map((rule) => (
              <article key={rule.title} className="rule-card">
                <h4>{rule.title}</h4>
                <p>{rule.note}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="assets"
          eyebrow="Assets"
          title="Official motion and source-file handoff."
          description="These are the exact files that should travel with the brand system for future teams and vendors."
        >
          <div className="loader-layout">
            <AnarixLoader />

            <div className="stack-card">
              <h3>Asset handoff</h3>
              <p>
                Keep the logo, symbol, and Lottie loader source unchanged. If a dark-background
                application needs the full logo, place it on a light carrier rather than redrawing
                or recoloring it.
              </p>
              <div className="asset-links">
                <a href={anarixLogo} download>
                  anarix-logo.svg
                </a>
                <a href={anarixSymbol} download>
                  anarix-symbol.svg
                </a>
                <a href={anarixLoaderUrl} download>
                  anarix-logo-loader.json
                </a>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="aan"
          eyebrow="Phase 02 - Meet Aan"
          title="Aan, redesigned with more restraint, gravity, and system clarity."
          description="Aan keeps the character, but behaves with more seriousness. The mascot is the active intelligence layer across Anarix: watchful at rest, precise in motion, and useful in context."
          dark
        >
          <div className="aan-intro-grid">
            <div className="aan-stage-card">
              <Aan size={220} />
            </div>

            <div className="aan-intro-copy">
              <div className="aan-meaning-grid">
                <article className="aan-meaning-card">
                  <span className="aan-meaning-label">Hindi / Sanskrit</span>
                  <strong>Self-respect, dignity, grace, and the sun.</strong>
                  <p>Aan should feel composed, intelligent, and steady under pressure.</p>
                </article>
                <article className="aan-meaning-card">
                  <span className="aan-meaning-label">English reading</span>
                  <strong>Presence, composure, and intelligent attention.</strong>
                  <p>In product language, Aan reads as the intelligence staying on top of every action.</p>
                </article>
                <article className="aan-meaning-card">
                  <span className="aan-meaning-label">Full form</span>
                  <strong>Anarix Analytical Nural</strong>
                  <p>The user-provided full form ties the mascot directly to the analytical core of the product.</p>
                </article>
              </div>

            </div>
          </div>

          <div className="aan-philosophy-shell">
            <div className="aan-philosophy-heading">
              <p className="aan-philosophy-kicker">Aan philosophy</p>
              <h3>Aan is the Anarix diamond made intelligent.</h3>
              <p className="aan-philosophy-lead">
                Aan is relevant because it is not a mascot pasted on top of the product. It comes
                directly from the Anarix symbol, from the logic of analytics + metrics, and from
                the idea that intelligence should stay on top of every active decision surface.
              </p>
            </div>

            <div className="philosophy-origin-grid">
              {philosophyOrigins.map((item) => (
                <article key={item.label} className="philosophy-card">
                  <span className="philosophy-label">{item.label}</span>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>

            <div className="philosophy-diagram-grid">
              <article className="philosophy-diagram-card">
                <div className="philosophy-figure pillars">
                  <div className="pillar-diamond-wrap">
                    <Aan size={66} shape="diamond" trackCursor={false} />
                  </div>
                  <div className="pillar-base-row">
                    <div className="pillar-column">
                      <div className="pillar-block" />
                      <span className="pillar-cap">Analysis</span>
                    </div>
                    <div className="pillar-column">
                      <div className="pillar-block" />
                      <span className="pillar-cap">Metrics</span>
                    </div>
                  </div>
                </div>
                <span className="philosophy-label">Pillars interpretation</span>
                <h4>Aan stays on top of analysis and metrics.</h4>
                <p>
                  The upper diamond reads as the intelligence layer docked above two structural
                  bases, showing Aan staying above both inputs and coordinating them together.
                </p>
              </article>

              <article className="philosophy-diagram-card">
                <div className="philosophy-figure nodes">
                  <div className="node-network">
                    <span className="network-line horizontal" />
                    <span className="network-line vertical" />
                    <span className="network-node top" />
                    <span className="network-node right" />
                    <span className="network-node bottom" />
                    <span className="network-node left" />
                    <div className="node-core">
                      <Aan size={60} shape="cube" trackCursor={false} />
                    </div>
                  </div>
                </div>
                <span className="philosophy-label">Node interpretation</span>
                <h4>The diamond and cube can be read as connected nodes.</h4>
                <p>
                  Aan symbolizes linked intelligence across the platform, understanding, analyzing,
                  and responding across surfaces instead of living in one isolated panel.
                </p>
              </article>

              <article className="philosophy-diagram-card">
                <div className="philosophy-figure body">
                  <div className="body-brain-layout">
                    <div className="body-brain-core">
                      <Aan size={58} shape="circle" trackCursor={false} />
                    </div>
                    <div className="body-spine" />
                    <div className="body-node-row">
                      <div className="body-node">Dock</div>
                      <div className="body-node">Copilot</div>
                      <div className="body-node">Insights</div>
                    </div>
                  </div>
                </div>
                <span className="philosophy-label">Body / brain interpretation</span>
                <h4>If Anarix is the body, Aan is the brain.</h4>
                <p>
                  Aan connects to every active system part to understand context, analyze what is
                  happening, and help the product take the next action with clarity.
                </p>
              </article>
            </div>

            <div className="philosophy-rule-grid">
              {philosophyRules.map((item) => (
                <article key={item.label} className="philosophy-card">
                  <span className="philosophy-label">{item.label}</span>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>

            <div className="philosophy-relationship-grid">
              <article className="philosophy-relationship-card">
                <div className="relationship-head">
                  <span className="philosophy-label">Similarity</span>
                  <img src={anarixSymbol} alt="Official Anarix symbol" />
                </div>
                <h4>Shared ancestry, shared authority.</h4>
                <p>
                  Aan inherits the diamond ancestry, structural logic, and brand seriousness of
                  Anarix. That similarity is what makes the mascot feel native to the system.
                </p>
              </article>

              <article className="philosophy-relationship-card">
                <div className="relationship-head">
                  <span className="philosophy-label">Distinction</span>
                  <Aan size={46} shape="circle" trackCursor={false} />
                </div>
                <h4>Mark versus living intelligence.</h4>
                <p>
                  Anarix is the official brand mark. Aan is the living intelligence persona built
                  from that mark, appearing only when analysis, interpretation, generation, or
                  action is active.
                </p>
              </article>
            </div>

            <div className="presence-rule-grid">
              <article className="presence-rule-card">
                <span className="philosophy-label">Aan appears when</span>
                <ul>
                  {presenceRules.active.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="presence-rule-card">
                <span className="philosophy-label">Aan stays absent when</span>
                <ul>
                  {presenceRules.passive.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="presence-rule-card tone">
                <span className="philosophy-label">Tone rule</span>
                <h4>Serious, calm, and helpful.</h4>
                <p>
                  Aan should never read as random decoration. The character stays mature,
                  restrained, and useful so the brand keeps authority while still holding a clear
                  personality.
                </p>
              </article>
            </div>
          </div>

          <div className="aan-state-shell">
            <h3>States &amp; morphs</h3>
            <p className="aan-state-intro">
              Each state is the same inherited Anarix form changing role, not identity.
            </p>
            <div className="aan-state-grid">
              {stateNarratives.map((item) => (
                <div key={item.label} className="aan-state-card">
                  <Aan size={110} shape={item.shape} trackCursor={false} />
                  <div className="aan-state-label">{item.label}</div>
                  <p className="aan-state-copy">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="aan-flow-shell">
            <h3>Conversation system</h3>
            <div className="aan-flow-grid">
              <article className="flow-screen">
                <div className="flow-topbar">
                  <span>Aan</span>
                  <span className="flow-topbar-meta">guided start</span>
                </div>
                <div className="flow-center">
                  <Aan size={44} shape="circle" trackCursor={false} />
                  <p className="flow-title">Hi Tushar, let&apos;s work together to build your site.</p>
                  <p className="flow-subtle">Here are some things you can ask me.</p>
                </div>
                <div className="flow-suggestion-list">
                  {guidedOptions.map((option) => (
                    <div key={option} className="flow-suggestion-pill">
                      {option}
                    </div>
                  ))}
                </div>
                <DockMock />
              </article>

              <article className="flow-screen">
                <div className="flow-topbar">
                  <span>Aan</span>
                  <span className="flow-topbar-meta">prompt ready</span>
                </div>
                <div className="flow-ready-row">
                  <Aan size={24} trackCursor={false} />
                  <span>Your prompt is ready.</span>
                </div>
                <div className="flow-prompt-card">
                  Create a professional website for a business that showcases our services and what
                  we offer.
                </div>
                <button type="button" className="flow-primary-button">
                  Generate Site
                </button>
                <DockMock
                  compact
                  context="Hero"
                  prompt="Create a professional website for a business that showcases our services and what we offer."
                />
              </article>

              <article className="flow-screen">
                <div className="flow-topbar">
                  <span>Aan</span>
                  <span className="flow-topbar-meta">planning</span>
                </div>
                <div className="flow-message user">
                  Create a professional website for a business that showcases our services and what
                  we offer.
                </div>
                <div className="flow-message assistant">
                  Customers can easily see your value. We&apos;ll focus on creating a clean,
                  active layout that presents your services in a way that builds trust and draws
                  visitors in.
                </div>
                <div className="flow-plan-card">
                  <div>
                    <strong>Planning your site</strong>
                    <span>This may take a few minutes.</span>
                  </div>
                  <Aan size={26} shape="bar" trackCursor={false} />
                </div>
                <DockMock compact />
              </article>

              <article className="flow-screen">
                <div className="flow-topbar">
                  <span>Aan</span>
                  <span className="flow-topbar-meta">guided output</span>
                </div>
                <div className="flow-message user">
                  I want to generate a section that fits this page.
                </div>
                <div className="flow-suggestion-panel">
                  <p>Here are a few ideas for sections to add to this page.</p>
                  <div className="flow-section-list">
                    {sectionIdeas.map((idea) => (
                      <article key={idea.title} className="flow-section-card">
                        <div>
                          <strong>{idea.title}</strong>
                          <p>{idea.body}</p>
                        </div>
                        <button type="button" className="flow-link-button">
                          Generate Section
                        </button>
                      </article>
                    ))}
                  </div>
                </div>
                <DockMock />
              </article>
            </div>
          </div>
        </Section>

        <Section
          id="copilot"
          eyebrow="Patterns"
          title="Textbox, button, tooltip, and copilot mockups."
          description="These are the specific Aan surface patterns that were still missing: the dock input, the Ask Aan button family, the tooltip trigger, and the copilot workspace."
        >
          <div className="patterns-grid">
            <article className="pattern-card">
              <h3>Ask Aan button family</h3>
              <div className="button-spec-grid">
                {buttonPatterns.map((button) => (
                  <button key={button.label} type="button" className={`mock-button ${button.tone}`}>
                    {button.label}
                  </button>
                ))}
              </div>
            </article>

            <article className="pattern-card">
              <h3>Tooltip trigger</h3>
              <div className="tooltip-preview">
                <div className="tooltip-chip">Pointer hover</div>
                <div className="tooltip-aan-row">
                  <div className="tooltip-label">Ask Aan</div>
                  <Aan size={28} trackCursor={false} shape="circle" />
                </div>
              </div>
            </article>

            <article className="pattern-card wide">
              <h3>Bottom dock</h3>
              <DockMock
                context="Hero"
                prompt="Ask Aan to analyze my retention dip and suggest a next action."
              />
            </article>

            <article className="pattern-card wide">
              <h3>Navbar and action island</h3>
              <div className="surface-pattern-grid">
                <div className="nav-presence-preview">
                  <div className="nav-preview-bar">
                    <div className="nav-preview-brand">
                      <Diamond size={14} variant="coral" />
                      <span>Anarix</span>
                    </div>
                    <div className="nav-preview-links">
                      <span>Overview</span>
                      <span>Insights</span>
                      <span>Reports</span>
                    </div>
                    <div className="nav-preview-actions">
                      <button type="button" className="mock-button light">
                        Copilot
                      </button>
                      <div className="ask-aan-pill compact">
                        <Aan size={22} trackCursor={false} />
                        <span>Ask Aan</span>
                      </div>
                    </div>
                  </div>
                  <p className="surface-note">
                    In global navigation, Aan stays compact and serious. Presence first, performance second.
                  </p>
                </div>

                <div className="action-island-preview">
                  <div className="action-island">
                    <Aan size={26} shape="circle" trackCursor={false} />
                    <div className="action-island-divider" />
                    {actionIslandActions.map((action) => (
                      <span key={action} className="action-island-chip">
                        {action}
                      </span>
                    ))}
                  </div>
                  <p className="surface-note">
                    The action island is Aan&apos;s highest-readiness surface for fast explain, compare, and generate actions.
                  </p>
                </div>
              </div>
            </article>

            <article className="pattern-card wide">
              <h3>Split and fullscreen workspace</h3>
              <div className="workspace-preview-grid">
                <div className="workspace-preview">
                  <div className="workspace-head">
                    <span>Split copilot mode</span>
                    <span className="artifact-tag">live analysis</span>
                  </div>
                  <div className="workspace-columns">
                    <div className="workspace-canvas">
                      <div className="workspace-canvas-card strong">
                        <div className="workspace-kicker">Dashboard context</div>
                        <strong>Weekly insight stack</strong>
                        <span>Traffic, activation, and retention working together.</span>
                      </div>
                      <div className="workspace-canvas-grid">
                        {metrics.map((metric) => (
                          <div key={metric.label} className="workspace-metric-chip">
                            <span>{metric.label}</span>
                            <strong>{metric.value}</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="workspace-sidebar-panel">
                      <div className="workspace-sidebar-head">
                        <Aan size={28} shape="circle" trackCursor={false} />
                        <div>
                          <strong>Aan Copilot</strong>
                          <span>analyzing workspace context</span>
                        </div>
                      </div>
                      <div className="copilot-thinking">
                        <Aan size={24} shape="bar" trackCursor={false} />
                        <span>Cross-checking campaigns, onboarding, and device trends...</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="workspace-preview fullscreen">
                  <div className="workspace-head">
                    <span>Fullscreen artifact mode</span>
                    <span className="artifact-tag">focused output</span>
                  </div>
                  <div className="workspace-artifact-shell">
                    <div className="workspace-artifact-head">
                      <Aan size={30} shape="cube" trackCursor={false} />
                      <div>
                        <strong>Quarterly performance narrative</strong>
                        <span>Aan expands when the work becomes editorial, strategic, or presentation-ready.</span>
                      </div>
                    </div>
                    <ul className="workspace-artifact-list">
                      {workspaceBullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>

            <article className="pattern-card wide">
              <h3>Copilot workspace</h3>
              <div className="copilot-shell">
                <div className="copilot-panel">
                  <div className="copilot-head">
                    <div className="copilot-head-brand">
                      <Aan size={32} trackCursor={false} shape="circle" />
                      <div>
                        <strong>Aan Copilot</strong>
                        <span>context-aware assistant</span>
                      </div>
                    </div>
                    <div className="copilot-badge">gemini-flash</div>
                  </div>

                  <div className="copilot-thread">
                    <div className="copilot-message assistant">
                      I can analyze your dashboard, draft reports, or suggest actions that fit this
                      workflow.
                    </div>
                    <div className="copilot-message user">
                      Generate a report for my last 7 days campaign performance.
                    </div>
                    <div className="copilot-thinking">
                      <Aan size={28} trackCursor={false} shape="bar" />
                      <span>Analyzing performance, spend, and retention shifts...</span>
                    </div>
                  </div>

                  <div className="copilot-input">
                    <span className="flow-input-placeholder">Ask Aan anything...</span>
                    <div className="flow-dock-actions">
                      <span className="flow-mini-icon">
                        <Plus size={14} />
                      </span>
                      <span className="flow-mini-icon">
                        <Mic size={14} />
                      </span>
                      <span className="flow-mini-icon is-solid">
                        <ArrowUp size={14} />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="copilot-artifact">
                  <div className="copilot-artifact-head">
                    <span className="artifact-kicker">Generated insight pack</span>
                    <span className="artifact-tag">split view</span>
                  </div>
                  <h4>Weekly performance narrative</h4>
                  <ul>
                    <li>Highlight the retention dip on iOS 17.4.</li>
                    <li>Compare activation changes against last week.</li>
                    <li>Call out top-performing service entry points.</li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </Section>

        <Section
          eyebrow="In product"
          title="Where Aan lives inside Anarix."
          description="This product mockup adds the missing seriousness: Aan is not a decorative mascot floating alone. It appears as quick action, active copilot, and surfaced intelligence in the dashboard."
        >
          <div className="product-mock-shell">
            <div className="product-browser-bar">
              <span className="browser-dot red" />
              <span className="browser-dot yellow" />
              <span className="browser-dot green" />
              <div className="browser-pill">app.anarix.ai/insights</div>
            </div>

            <div className="product-layout product-layout-wide">
              <aside className="product-sidebar">
                <div className="product-brand">
                  <Diamond size={18} variant="coral" />
                  <span>ANARIX</span>
                </div>
                {["Overview", "Insights", "Cohorts", "Reports", "Settings"].map((label, index) => (
                  <div
                    key={label}
                    className={`product-nav-item ${index === 1 ? "is-active" : ""}`}
                  >
                    {label}
                  </div>
                ))}
              </aside>

              <main className="product-main">
                <div className="product-main-head">
                  <h3>Weekly Insights</h3>
                  <div className="product-action-row">
                    <div className="ask-aan-pill">
                      <Aan size={28} trackCursor={false} />
                      <span>Ask Aan</span>
                    </div>
                    <div className="mock-button light">Copilot</div>
                  </div>
                </div>

                <div className="product-metric-grid">
                  {metrics.map((metric) => (
                    <div key={metric.label} className="metric-card">
                      <div className="metric-label">{metric.label}</div>
                      <div className="metric-value">{metric.value}</div>
                      <div className="metric-delta">{metric.delta}</div>
                    </div>
                  ))}
                </div>

                <div className="aan-notice-card">
                  <Aan size={48} trackCursor={false} shape="circle" />
                  <div>
                    <div className="aan-notice-label">Aan noticed</div>
                    <div>Retention dipped on iOS 17.4 - likely tied to Tuesday&apos;s onboarding change.</div>
                  </div>
                </div>
                <div className="product-island-row">
                  <div className="action-island product">
                    <Aan size={24} shape="circle" trackCursor={false} />
                    <div className="action-island-divider" />
                    {actionIslandActions.map((action) => (
                      <span key={action} className="action-island-chip">
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
              </main>

              <aside className="product-sidepanel">
                <div className="copilot-head">
                  <div className="copilot-head-brand">
                    <Aan size={30} trackCursor={false} shape="circle" />
                    <div>
                      <strong>Copilot</strong>
                      <span>report mode</span>
                    </div>
                  </div>
                  <div className="copilot-badge">live</div>
                </div>
                <div className="copilot-thread compact">
                  <div className="copilot-message assistant">
                    I found a retention shift and two campaigns that outperformed baseline.
                  </div>
                  <div className="copilot-thinking">
                    <Aan size={24} trackCursor={false} shape="bar" />
                    <span>Preparing recommendations...</span>
                  </div>
                </div>
                <div className="copilot-input compact">
                  <span className="flow-input-placeholder">Ask Aan anything...</span>
                  <span className="flow-mini-icon is-solid">
                    <ArrowUp size={14} />
                  </span>
                </div>
              </aside>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
