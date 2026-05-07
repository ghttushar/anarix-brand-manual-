import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

type Shape = "diamond" | "circle" | "bar" | "cube";

type Props = {
  size?: number;
  shape?: Shape;
  trackCursor?: boolean;
};

type ShapeStyle = {
  background: string;
  glow: string;
  ring: string;
  shadow: string;
};

const shapeStyles: Record<Shape, ShapeStyle> = {
  diamond: {
    background:
      "radial-gradient(circle at 50% 42%, #f88790 0%, #f5757e 34%, #f46d76 68%, #ef5f6c 100%)",
    glow: "rgba(244, 109, 118, 0.28)",
    ring: "rgba(247, 95, 107, 0.36)",
    shadow: "0 30px 72px -28px rgba(0,0,0,0.84)",
  },
  circle: {
    background:
      "radial-gradient(circle at 50% 44%, #f9929a 0%, #f67b84 36%, #f46d76 72%, #ef616d 100%)",
    glow: "rgba(244, 109, 118, 0.24)",
    ring: "rgba(247, 95, 107, 0.32)",
    shadow: "0 26px 58px -26px rgba(0,0,0,0.78)",
  },
  bar: {
    background: "linear-gradient(90deg, #ef6370 0%, #f46d76 46%, #f77a84 100%)",
    glow: "rgba(244, 109, 118, 0.22)",
    ring: "rgba(247, 95, 107, 0.3)",
    shadow: "0 24px 54px -24px rgba(0,0,0,0.72)",
  },
  cube: {
    background: "linear-gradient(135deg, #f88992 0%, #f46d76 44%, #ed5c69 100%)",
    glow: "rgba(244, 109, 118, 0.24)",
    ring: "rgba(247, 95, 107, 0.34)",
    shadow: "0 28px 60px -26px rgba(0,0,0,0.8)",
  },
};

export function Aan({ size = 160, shape = "diamond", trackCursor = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (!trackCursor) {
      const drift = [
        { x: 0, y: 0 },
        { x: -Math.max(2, size * 0.018), y: -Math.max(1, size * 0.012) },
        { x: Math.max(2, size * 0.014), y: -Math.max(1, size * 0.01) },
        { x: 0, y: Math.max(1, size * 0.014) },
        { x: 0, y: 0 },
      ];

      let index = 0;
      const driftId = window.setInterval(() => {
        index = (index + 1) % drift.length;
        setPupil(drift[index]);
      }, 1200);

      return () => window.clearInterval(driftId);
    }

    const handler = (event: MouseEvent) => {
      const node = ref.current;
      if (!node) {
        return;
      }

      const bounds = node.getBoundingClientRect();
      const cx = bounds.left + bounds.width / 2;
      const cy = bounds.top + bounds.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const dist = Math.min(1, Math.hypot(dx, dy) / 420);
      const angle = Math.atan2(dy, dx);

      setPupil({
        x: Math.cos(angle) * dist * Math.max(2, size * 0.03),
        y: Math.sin(angle) * dist * Math.max(2, size * 0.03),
      });
    };

    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [size, trackCursor]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 140);
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, []);

  const radius =
    shape === "circle" ? "50%" : shape === "bar" ? "40px" : shape === "cube" ? "12%" : "0%";
  const aspect =
    shape === "bar"
      ? { width: size * 1.8, height: size * 0.56 }
      : { width: size, height: size };
  const rotate = shape === "diamond" ? 45 : 0;
  const style = shapeStyles[shape];

  return (
    <motion.div
      ref={ref}
      className="aan-character"
      animate={{
        y: shape === "bar" ? 0 : [0, -3, 0],
      }}
      transition={{
        duration: 4.6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ width: aspect.width, height: aspect.height }}
    >
      <motion.div
        className="aan-character-aura"
        animate={{
          width: aspect.width * 1.08,
          height: aspect.height * 1.08,
          borderRadius: radius,
          rotate,
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: style.glow,
          border: `1px solid ${style.ring}`,
          filter: "blur(10px)",
        }}
      />

      <motion.div
        animate={{
          width: aspect.width,
          height: aspect.height,
          borderRadius: radius,
          rotate,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        style={{
          background: style.background,
          position: "relative",
          boxShadow: style.shadow,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 1,
            borderRadius: radius,
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        />
        <div className="aan-character-sheen" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `rotate(${-rotate}deg)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: size * 0.15,
          }}
        >
          {[0, 1].map((index) => (
            <motion.div
              key={index}
              animate={{
                scaleY: blink ? 0.12 : 1,
              }}
              transition={{ duration: 0.14 }}
              style={{
                width: size * 0.14,
                height: size * 0.18,
                background: "rgba(249,250,252,0.98)",
                borderRadius: "999px",
                display: "grid",
                placeItems: "center",
                boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
              }}
            >
              <motion.div
                animate={{ x: pupil.x, y: pupil.y }}
                transition={{ type: "spring", stiffness: 190, damping: 18 }}
                style={{
                  width: Math.max(3, size * 0.032),
                  height: Math.max(3, size * 0.032),
                  borderRadius: "999px",
                  background: "#0b0d14",
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
