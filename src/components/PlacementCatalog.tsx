import type { ReactNode } from "react";
import { AanMascot } from "./AanMascot";

type PlacementCard = {
  badge: string;
  tone: "source" | "live" | "legacy" | "future";
  title: string;
  copy: string;
  media: ReactNode;
};

type PlacementCatalogProps = {
  dashboardLatest: string;
  dashboardLegacy: string;
};

function PlacementBadge({ tone, children }: { tone: PlacementCard["tone"]; children: string }) {
  return <span className={`placement-badge tone-${tone}`}>{children}</span>;
}

export function PlacementCatalog({
  dashboardLatest,
  dashboardLegacy,
}: PlacementCatalogProps) {
  const cards: PlacementCard[] = [
    {
      badge: "Source-backed pattern",
      tone: "legacy",
      title: "AppSidebar Ask Aan pill",
      copy: "The current sidebar already gives Aan a persistent utility entry. It should stay calm and task-oriented rather than decorative.",
      media: (
        <div className="placement-shot">
          <img src={dashboardLegacy} alt="Legacy Anarix dashboard screenshot with Ask Aan entry in the sidebar." />
        </div>
      ),
    },
    {
      badge: "Live screenshot",
      tone: "live",
      title: "FloatingActionIsland",
      copy: "The island is the strongest compact mascot home because the real product already treats Ask Aan as a first-class quick action there.",
      media: (
        <div className="placement-shot shot-island">
          <img src={dashboardLatest} alt="Latest Anarix dashboard screenshot with floating action island." />
          <div className="placement-overlay island-overlay">
            <AanMascot state="ready" size="xs" behavior="passive" anchor="island" />
          </div>
        </div>
      ),
    },
    {
      badge: "Source-backed pattern",
      tone: "source",
      title: "AppTaskbar compact action row",
      copy: "When the island is off, Aan should compress into the existing taskbar action system instead of becoming a floating second assistant.",
      media: (
        <div className="mini-surface">
          <div className="mini-toolbar">
            <span className="sync-dot" />
            <span>Amazon account synced</span>
          </div>
          <div className="mini-actions">
            <button type="button" className="mini-pill is-primary">
              <span className="mini-diamond coral" />
              <span>Ask Aan</span>
            </button>
            <button type="button" className="mini-pill">
              <span className="mini-diamond blue" />
              <span>Insights</span>
            </button>
            <button type="button" className="mini-pill">
              <span className="mini-diamond ink" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      ),
    },
    {
      badge: "Source-backed trigger",
      tone: "source",
      title: "AskAanTooltip",
      copy: "The selected-text prompt handoff is the most precise cursor-adjacent entry already present in the app source.",
      media: (
        <div className="mini-surface">
          <div className="selection-copy">
            The dashboard highlights <strong>wasted spend</strong>, <strong>budget pacing</strong>,
            and <strong>top campaign ROAS</strong> in the current page context.
          </div>
          <button type="button" className="selection-pill">
            <span className="mini-diamond coral" />
            <span>Ask Aan</span>
          </button>
        </div>
      ),
    },
    {
      badge: "Source-backed panel",
      tone: "source",
      title: "AanCopilotPanel + AanInput",
      copy: "Copilot is where listening, planning, and guided-output states belong. Aan should stay tied to the prompt flow instead of the panel chrome.",
      media: (
        <div className="mini-surface panel-surface">
          <div className="surface-heading">
            <span>Copilot</span>
            <span className="surface-chip">gemini-flash</span>
          </div>
          <div className="bubble assistant">
            Hello! I&apos;m Aan. I can analyze campaign performance, create rules, and optimize your strategy.
          </div>
          <div className="bubble user">Generate a report for my last 7 days campaign performance.</div>
          <div className="panel-anchor">
            <AanMascot state="thinking" size="sm" behavior="passive" anchor="copilot" />
          </div>
        </div>
      ),
    },
    {
      badge: "Source-backed workspace",
      tone: "future",
      title: "AanWorkspace + AanSplitView",
      copy: "The app already has workspace and split-review routes. Aan should dock to the frame, then shrink once artifacts become primary.",
      media: (
        <div className="mini-surface workspace-surface">
          <div className="workspace-frame">
            <div className="workspace-chart" />
            <div className="workspace-panel" />
            <div className="workspace-anchor">
              <AanMascot state="cursor-aware" size="sm" behavior="pointer" anchor="workspace" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="placement-grid">
      {cards.map((card) => (
        <article key={card.title} className="placement-card">
          <div className="placement-card-head">
            <PlacementBadge tone={card.tone}>{card.badge}</PlacementBadge>
            <h4>{card.title}</h4>
          </div>
          {card.media}
          <p>{card.copy}</p>
        </article>
      ))}
    </div>
  );
}
