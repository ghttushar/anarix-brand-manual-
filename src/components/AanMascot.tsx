import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { SurfaceAnchor, VisualState } from "../data";

type MascotBehavior = "pointer" | "drift" | "passive";

type MascotProps = {
  state: VisualState;
  size?: "xs" | "sm" | "md" | "lg" | "hero";
  behavior?: MascotBehavior;
  anchor?: SurfaceAnchor;
  className?: string;
};

const stateTokens: Record<
  VisualState,
  {
    shape: "diamond" | "circle" | "bar" | "cube";
    tone: "coral" | "ink" | "blue" | "mixed";
  }
> = {
  idle: { shape: "diamond", tone: "coral" },
  ready: { shape: "diamond", tone: "coral" },
  listening: { shape: "circle", tone: "ink" },
  loading: { shape: "bar", tone: "mixed" },
  thinking: { shape: "cube", tone: "blue" },
  "guided-output": { shape: "circle", tone: "coral" },
  artifact: { shape: "diamond", tone: "blue" },
  "cursor-aware": { shape: "diamond", tone: "ink" },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function AanMascot({
  state,
  size = "md",
  behavior = "passive",
  anchor,
  className = "",
}: MascotProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [bodyOffset, setBodyOffset] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(false);
  const [driftTick, setDriftTick] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: coarse)");

    const syncPreferences = () => {
      setReducedMotion(reducedQuery.matches);
      setCoarsePointer(pointerQuery.matches);
    };

    syncPreferences();
    reducedQuery.addEventListener("change", syncPreferences);
    pointerQuery.addEventListener("change", syncPreferences);

    return () => {
      reducedQuery.removeEventListener("change", syncPreferences);
      pointerQuery.removeEventListener("change", syncPreferences);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const blinkTimer = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 150);
    }, 3600);

    return () => window.clearInterval(blinkTimer);
  }, [reducedMotion]);

  useEffect(() => {
    const effectiveBehavior =
      reducedMotion || behavior === "passive" ? "passive" : coarsePointer ? "drift" : behavior;

    if (effectiveBehavior === "pointer") {
      const onMove = (event: MouseEvent) => {
        const node = rootRef.current;
        if (!node) {
          return;
        }

        const bounds = node.getBoundingClientRect();
        const cx = bounds.left + bounds.width / 2;
        const cy = bounds.top + bounds.height / 2;
        const dx = clamp((event.clientX - cx) / 18, -10, 10);
        const dy = clamp((event.clientY - cy) / 24, -8, 8);

        setEyeOffset({ x: dx * 0.42, y: dy * 0.42 });
        setBodyOffset({ x: dx * 0.14, y: dy * 0.14 });
      };

      const onLeave = () => {
        setEyeOffset({ x: 0, y: 0 });
        setBodyOffset({ x: 0, y: 0 });
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseout", onLeave);

      return () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseout", onLeave);
      };
    }

    if (effectiveBehavior === "drift") {
      const interval = window.setInterval(() => setDriftTick((value) => value + 1), 1600);
      return () => window.clearInterval(interval);
    }

    setEyeOffset({ x: 0, y: 0 });
    setBodyOffset({ x: 0, y: 0 });
  }, [behavior, coarsePointer, reducedMotion]);

  const effectiveBehavior =
    reducedMotion || behavior === "passive" ? "passive" : coarsePointer ? "drift" : behavior;

  const driftOffsets = useMemo(() => {
    if (effectiveBehavior !== "drift") {
      return { eyeX: 0, eyeY: 0, bodyX: 0, bodyY: 0 };
    }

    return {
      eyeX: Math.sin(driftTick * 0.8) * 2.4,
      eyeY: Math.cos(driftTick * 0.6) * 1.8,
      bodyX: Math.sin(driftTick * 0.5) * 1.4,
      bodyY: Math.cos(driftTick * 0.4) * 1.1,
    };
  }, [driftTick, effectiveBehavior]);

  const token = stateTokens[state];
  const finalEye = {
    x: effectiveBehavior === "drift" ? driftOffsets.eyeX : eyeOffset.x,
    y: effectiveBehavior === "drift" ? driftOffsets.eyeY : eyeOffset.y,
  };
  const finalBody = {
    x: effectiveBehavior === "drift" ? driftOffsets.bodyX : bodyOffset.x,
    y: effectiveBehavior === "drift" ? driftOffsets.bodyY : bodyOffset.y,
  };

  return (
    <div
      ref={rootRef}
      className={[
        "aan-mascot",
        `size-${size}`,
        `state-${state}`,
        `shape-${token.shape}`,
        `tone-${token.tone}`,
        anchor ? `anchor-${anchor}` : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--eye-x": `${finalEye.x}px`,
          "--eye-y": `${finalEye.y}px`,
          "--body-x": `${finalBody.x}px`,
          "--body-y": `${finalBody.y}px`,
          "--blink-scale": blink ? 0.14 : 1,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <span className="aan-aura" />
      <span className="aan-orbit" />
      <span className="aan-shell">
        <span className="aan-face">
          <span className="aan-eye">
            <span className="aan-pupil" />
          </span>
          <span className="aan-eye">
            <span className="aan-pupil" />
          </span>
        </span>
      </span>
      <span className="aan-bar">
        <span className="aan-bar-fill" />
      </span>
    </div>
  );
}
