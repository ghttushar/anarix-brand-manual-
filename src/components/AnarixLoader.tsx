import { useEffect, useRef, useState } from "react";
import loaderData from "../../anarix-logo-loader.json";

type LottieRuntime = {
  loadAnimation: (config: {
    container: Element;
    renderer: "svg";
    loop: boolean;
    autoplay: boolean;
    animationData: unknown;
    rendererSettings?: Record<string, unknown>;
  }) => {
    destroy: () => void;
    goToAndPlay: (value: number, isFrame: boolean) => void;
  };
};

export function AnarixLoader() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<{
    destroy: () => void;
    goToAndPlay: (value: number, isFrame: boolean) => void;
  } | null>(null);
  const [status, setStatus] = useState("Loading official source animation...");

  useEffect(() => {
    const node = containerRef.current;
    let isDisposed = false;

    if (!node) {
      setStatus("Lottie container unavailable in this environment.");
      return;
    }

    setStatus("Loading official source animation...");

    void import("lottie-web/build/player/lottie_light").then((module) => {
      if (isDisposed) {
        return;
      }

      const runtime = module.default as LottieRuntime;

      animationRef.current = runtime.loadAnimation({
        container: node,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: JSON.parse(JSON.stringify(loaderData)),
        rendererSettings: {
          preserveAspectRatio: "xMidYMid meet",
        },
      });

      setStatus("Official Lottie source loaded unchanged.");
    });

    return () => {
      isDisposed = true;
      animationRef.current?.destroy();
      animationRef.current = null;
    };
  }, []);

  return (
    <div className="loader-card">
      <div ref={containerRef} className="loader-stage" />
      <div className="loader-meta">
        <div>
          <strong>Official motion source</strong>
          <span>Lottie v5.9.0 | 60 fps | 120 frames | 2 seconds</span>
        </div>
        <button
          type="button"
          className="ghost-button"
          onClick={() => animationRef.current?.goToAndPlay(0, true)}
        >
          Replay
        </button>
      </div>
      <p className="loader-status">{status}</p>
    </div>
  );
}
