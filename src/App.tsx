import type { ReactNode } from "react";
import { Brain, MousePointer2, Sparkles } from "lucide-react";
import anarixLogo from "../anarix-logo.svg";
import anarixSymbol from "../anarix-symbol.svg";
import anarixLoaderUrl from "../anarix-logo-loader.json?url";
import { Aan } from "./components/Aan";
import { AnarixLoader } from "./components/AnarixLoader";
import { Diamond } from "./components/Diamond";
import { colorSwatches, misuseRules, phaseOneRules } from "./data";

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
        </nav>

        <a className="header-cta" href="#aan">
          Open Aan section
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
          title="Aan, our analytical neural."
          description="Aan — self-respect, the sun in Hindi — and our acronym for Anarix Analytical Neural. A diamond-shaped mascot that connects to every part of the platform like a brain to a body."
          dark
        >
          <div className="aan-intro-grid">
            <div className="aan-stage-card">
              <Aan size={220} />
            </div>

            <div className="aan-feature-list">
              <article className="aan-feature">
                <MousePointer2 size={24} className="aan-feature-icon" />
                <div>
                  <h3>Cursor-aware</h3>
                  <p>
                    Aan&apos;s eyes track your cursor with a soft spring, the way Aria does in Wix.
                    Move your mouse. It&apos;s watching.
                  </p>
                </div>
              </article>

              <article className="aan-feature">
                <Sparkles size={24} className="aan-feature-icon" />
                <div>
                  <h3>Morphing form</h3>
                  <p>
                    Diamond at rest. Circle when listening. Bar when loading. Cube when thinking.
                    One character, four moods.
                  </p>
                </div>
              </article>

              <article className="aan-feature">
                <Brain size={24} className="aan-feature-icon" />
                <div>
                  <h3>Always connected</h3>
                  <p>
                    Aan appears across the surface — header, sidebar, empty states, tooltips — as a
                    single source of personality.
                  </p>
                </div>
              </article>
            </div>
          </div>

          <div className="aan-state-shell">
            <h3>States &amp; morphs</h3>
            <div className="aan-state-grid">
              {[
                { shape: "diamond" as const, label: "Idle" },
                { shape: "circle" as const, label: "Listening" },
                { shape: "bar" as const, label: "Loading" },
                { shape: "cube" as const, label: "Thinking" },
              ].map((item) => (
                <div key={item.label} className="aan-state-card">
                  <Aan size={110} shape={item.shape} trackCursor={false} />
                  <div className="aan-state-label">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section
          eyebrow="In product"
          title="Where Aan lives."
          description="A glimpse of how the mascot integrates inside the Anarix dashboard — never decorative, always doing a job."
        >
          <div className="product-mock-shell">
            <div className="product-browser-bar">
              <span className="browser-dot red" />
              <span className="browser-dot yellow" />
              <span className="browser-dot green" />
              <div className="browser-pill">app.anarix.ai/insights</div>
            </div>

            <div className="product-layout">
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
                  <div className="ask-aan-pill">
                    <Aan size={28} trackCursor={false} />
                    <span>Ask Aan</span>
                  </div>
                </div>

                <div className="product-metric-grid">
                  {[
                    { label: "Active users", value: "128,402", delta: "+12.4%" },
                    { label: "Activation", value: "38.1%", delta: "+2.1%" },
                    { label: "Retention", value: "71.6%", delta: "-0.8%" },
                  ].map((metric) => (
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
                    <div>
                      Retention dipped on iOS 17.4 — likely tied to Tuesday&apos;s onboarding
                      change.
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
