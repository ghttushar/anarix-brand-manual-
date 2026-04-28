import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import anarixLogo from "../anarix-logo.svg";
import anarixSymbol from "../anarix-symbol.svg";
import anarixLoaderUrl from "../anarix-logo-loader.json?url";
import dashboardLatest from "../app-dashboard-latest.png";
import dashboardLegacy from "../app-dashboard-legacy.png";
import {
  colorSwatches,
  critiqueColumns,
  fullFormCards,
  meaningCards,
  motionRules,
  phaseOneRules,
  sourceSignals,
  stateDescriptors,
  surfaceMatrix,
  type ProductMode,
  type SurfaceAnchor,
  type VisualState,
} from "./data";
import { AnarixLoader } from "./components/AnarixLoader";
import { AanMascot } from "./components/AanMascot";
import { GuidedDemo } from "./components/GuidedDemo";
import { PlacementCatalog } from "./components/PlacementCatalog";

const stateKeys = Object.keys(stateDescriptors) as VisualState[];
const modeKeys: ProductMode[] = ["closed", "copilot", "split", "workspace"];
const anchorKeys: SurfaceAnchor[] = [
  "center",
  "chat-dock",
  "island",
  "taskbar",
  "tooltip",
  "copilot",
  "workspace",
  "artifact",
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

export default function App() {
  const [visualState, setVisualState] = useState<VisualState>("idle");
  const [mode, setMode] = useState<ProductMode>("closed");
  const [anchor, setAnchor] = useState<SurfaceAnchor>("center");

  const selectedDescriptor = useMemo(() => stateDescriptors[visualState], [visualState]);

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand-home" href="#top">
          <img src={anarixSymbol} alt="" />
          <div>
            <strong>Anarix</strong>
            <span>Phase 1 + Aan vNext</span>
          </div>
        </a>

        <nav className="site-nav" aria-label="Primary">
          <a href="#foundation">Anarix</a>
          <a href="#aan-meaning">Aan</a>
          <a href="#guided-demo">Demo</a>
          <a href="#placements">Placements</a>
          <a href="#rules">Rules</a>
        </nav>

        <a className="header-cta" href="#guided-demo">
          Open Aan demo
        </a>
      </header>

      <main id="top">
        <section className="hero-shell">
          <div className="hero-copy">
            <p className="eyebrow">Anarix foundation + Aan interaction layer</p>
            <h1>The approved Anarix system, then the Aan chapter rebuilt as a live assistant demo.</h1>
            <p className="hero-summary">
              Phase 1 stays exact: official logo, symbol, colors, and locked loader source. Phase 2
              now behaves like a real product layer, pushing Aan closer to Aria&apos;s state logic
              without copying its identity.
            </p>
            <div className="hero-actions">
              <a className="solid-button" href="#foundation">
                Review phase 1
              </a>
              <a className="ghost-button" href="#guided-demo">
                See Aan in motion
              </a>
            </div>
            <ul className="hero-facts">
              <li>Official Anarix assets stay exact and unchanged.</li>
              <li>Aan uses one shared demo state model across every live section.</li>
              <li>Current app surfaces stay source-backed; only future behavior is labeled as inferred.</li>
            </ul>
          </div>

          <div className="hero-stage">
            <div className="hero-stage-card">
              <span className="stage-label">Official Anarix foundation</span>
              <img className="hero-logo" src={anarixLogo} alt="Official Anarix logo" />
              <div className="hero-mascot">
                <AanMascot state="idle" size="sm" behavior="drift" anchor="center" />
              </div>
              <p>
                Aan sits above the brand foundation, but never replaces the official logo or the
                official symbol.
              </p>
            </div>
          </div>
        </section>

        <Section
          id="foundation"
          eyebrow="Phase 1 / Anarix"
          title="The exact brand system stays locked."
          description="The logo, symbol, colors, and Lottie loader below are still the source-of-truth files for Anarix."
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

            <div className="stack-card">
              <h3>Approved logo usage</h3>
              <div className="usage-grid">
                <figure className="usage-panel light">
                  <img src={anarixLogo} alt="Official Anarix logo on light background" />
                  <figcaption>Logo on light</figcaption>
                </figure>
                <figure className="usage-panel dark">
                  <div className="logo-carrier">
                    <img src={anarixLogo} alt="Official Anarix logo on light carrier over dark background" />
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

          <div className="loader-layout">
            <AnarixLoader />
            <div className="stack-card">
              <h3>Asset handoff</h3>
              <p>
                These files stay exact and downloadable inside the React rebuild. Aan is a separate
                mascot system built around them rather than a redraw of them.
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
          id="aan-meaning"
          eyebrow="Phase 2 / Aan"
          title="Aan is now documented as a living system, not a static mascot note."
          description="The meaning, the full form, and the behavioral role stay grounded in the story you supplied."
          dark
        >
          <div className="meaning-grid">
            {meaningCards.map((card) => (
              <article key={card.kicker} className="dark-card">
                <p className="eyebrow small">{card.kicker}</p>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </article>
            ))}
          </div>

          <div className="fullform-shell">
            <div className="stack-card dark-surface">
              <p className="eyebrow small">Full form</p>
              <h3>
                <code>Aan = Anarix Analytical Nural</code>
              </h3>
              <p>Spelling is preserved exactly as provided for this phase.</p>
            </div>
            <div className="meaning-grid fullform-grid">
              {fullFormCards.map((card) => (
                <article key={card.kicker} className="dark-card">
                  <p className="eyebrow small">{card.kicker}</p>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </Section>

        <Section
          eyebrow="Critique"
          title="What the Figma Make export improved, and why it still stops short of Aria."
          description="The export helped by proving Aan as code, but it still behaves more like a showcase than a guided product layer."
        >
          <div className="critique-grid">
            <article className="stack-card">
              <h3>What it improved</h3>
              <ul className="detail-list">
                {critiqueColumns.improved.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="stack-card">
              <h3>What still misses Aria</h3>
              <ul className="detail-list">
                {critiqueColumns.stillMissing.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
          <p className="support-copy">
            This next version keeps the useful interaction ideas from the export, but it does not
            inherit the placeholder guidelines, simplified logo geometry, or generic generated app
            chrome.
          </p>
        </Section>

        <Section
          id="guided-demo"
          eyebrow="Live Demo"
          title="Aan now demonstrates guided AI behavior instead of static states."
          description="This flow uses a single assistant anchor, progressive disclosure, and Aria-inspired transitions across suggestion, input, planning, guided output, and artifact resolution."
        >
          <GuidedDemo />
        </Section>

        <Section
          eyebrow="State Studio"
          title="One shared state contract now drives the mascot across all manual demos."
          description="The state lab exposes the same mode, visual-state, and surface-anchor vocabulary that future product implementation should use."
        >
          <div className="state-lab">
            <div className="state-preview-card">
              <div className="state-preview-head">
                <span>{mode}</span>
                <span>{visualState}</span>
                <span>{anchor}</span>
              </div>
              <div className="state-preview-stage">
                <AanMascot
                  state={visualState}
                  size="hero"
                  behavior={visualState === "cursor-aware" ? "pointer" : "drift"}
                  anchor={anchor}
                />
              </div>
              <h3>{selectedDescriptor.title}</h3>
              <p>{selectedDescriptor.copy}</p>
            </div>

            <div className="state-controls">
              <div className="control-group">
                <strong>Visual state</strong>
                <div className="pill-row">
                  {stateKeys.map((key) => (
                    <button
                      key={key}
                      type="button"
                      className={`filter-pill ${visualState === key ? "is-active" : ""}`}
                      onClick={() => {
                        setVisualState(key);
                        setMode(stateDescriptors[key].mode);
                        setAnchor(stateDescriptors[key].anchor);
                      }}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-group">
                <strong>Product mode</strong>
                <div className="pill-row">
                  {modeKeys.map((key) => (
                    <button
                      key={key}
                      type="button"
                      className={`filter-pill ${mode === key ? "is-active" : ""}`}
                      onClick={() => setMode(key)}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-group">
                <strong>Surface anchor</strong>
                <div className="pill-row">
                  {anchorKeys.map((key) => (
                    <button
                      key={key}
                      type="button"
                      className={`filter-pill ${anchor === key ? "is-active" : ""}`}
                      onClick={() => setAnchor(key)}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="Cursor Aware"
          title="Pointer response stays soft, magnetic, and short-travel."
          description="On precise pointers, Aan follows with resistance. On touch or reduced-motion contexts, it falls back to passive drift."
          dark
        >
          <div className="cursor-grid">
            <div className="cursor-stage">
              <div className="cursor-mesh" />
              <AanMascot state="cursor-aware" size="hero" behavior="pointer" anchor="workspace" />
              <p>Move your cursor across this field.</p>
            </div>
            <div className="dark-card">
              <h3>Motion-quality rules</h3>
              <ul className="detail-list">
                {motionRules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section
          id="placements"
          eyebrow="Source-backed placement catalog"
          title="Aan only appears where the current Anarix app already has a meaningful AI surface."
          description="These placements are grounded in the analyzed app source, current screenshots, and shipped Aan component names."
        >
          <PlacementCatalog
            dashboardLatest={dashboardLatest}
            dashboardLegacy={dashboardLegacy}
          />
        </Section>

        <Section
          id="rules"
          eyebrow="Integration rules"
          title="The manual ends with an implementation-ready behavior matrix."
          description="The table below stays anchored to the current app surface map and the shared Aan state contract."
          dark
        >
          <div className="rules-table-shell">
            <table className="rules-table">
              <thead>
                <tr>
                  <th>Surface</th>
                  <th>Trigger</th>
                  <th>Allowed states</th>
                  <th>Exit behavior</th>
                </tr>
              </thead>
              <tbody>
                {surfaceMatrix.map((row) => (
                  <tr key={row.surface}>
                    <td>{row.surface}</td>
                    <td>{row.trigger}</td>
                    <td>{row.states}</td>
                    <td>{row.exit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rules-footer-grid">
            <article className="dark-card">
              <h3>Source + bundle signals already present</h3>
              <div className="signal-cloud">
                {sourceSignals.map((signal) => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>
            </article>

            <article className="dark-card">
              <h3>Do not</h3>
              <ul className="detail-list">
                <li>Do not place Aan on every metric tile, chart, or utility card.</li>
                <li>Do not let circle and bar states erase the diamond origin completely.</li>
                <li>Do not keep Aan visible when the AI surface is closed.</li>
                <li>Do not replace the official Anarix logo system with mascot geometry.</li>
              </ul>
            </article>
          </div>
        </Section>
      </main>
    </div>
  );
}
