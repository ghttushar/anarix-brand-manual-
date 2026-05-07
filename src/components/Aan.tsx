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
  shadow: string;
  sparkLeft: number;
  sparkTop: number;
};

const shapeStyles: Record<Shape, ShapeStyle> = {
  diamond: {
    background:
      "radial-gradient(circle at 50% 38%, #f88a93 0%, #f57780 42%, #f46d76 78%, #f2626d 100%)",
    glow: "rgba(244, 109, 118, 0.34)",
    shadow: "0 30px 76px -28px rgba(244, 109, 118, 0.48)",
    sparkLeft: 91,
    sparkTop: 50,
  },
  circle: {
    background:
      "radial-gradient(circle at 50% 38%, #f9939b 0%, #f67d86 42%, #f46d76 78%, #f2606c 100%)",
    glow: "rgba(244, 109, 118, 0.3)",
    shadow: "0 28px 70px -28px rgba(244, 109, 118, 0.44)",
    sparkLeft: 87,
    sparkTop: 13,
  },
  bar: {
    background:
      "linear-gradient(180deg, #f88790 0%, #f5737c 48%, #f46d76 78%, #f15f6b 100%)",
    glow: "rgba(244, 109, 118, 0.28)",
    shadow: "0 24px 64px -24px rgba(244, 109, 118, 0.42)",
    sparkLeft: 93,
    sparkTop: 14,
  },
  cube: {
    background:
      "radial-gradient(circle at 50% 34%, #f88d96 0%, #f67680 44%, #f46d76 78%, #f05e6a 100%)",
    glow: "rgba(244, 109, 118, 0.3)",
    shadow: "0 28px 68px -26px rgba(244, 109, 118, 0.44)",
    sparkLeft: 86,
    sparkTop: 13,
  },
};

export function Aan({ size = 160, shape = "diamond", trackCursor = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!trackCursor) {
      setEyeOffset({ x: 0, y: 0 });
      return;
    }

    const handler = (event: MouseEvent) => {
      const node = ref.current;
      if (!node) {
        return;
      }

      const bounds = node.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.min(1, Math.hypot(dx, dy) / 420);
      const angle = Math.atan2(dy, dx);
      const travel = Math.max(1.5, size * 0.02);

      setEyeOffset({
        x: Math.cos(angle) * distance * travel,
        y: Math.sin(angle) * distance * travel,
      });
    };

    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [size, trackCursor]);

  const radius =
    shape === "circle" ? "50%" : shape === "bar" ? "999px" : shape === "cube" ? "18%" : "16%";
  const aspect =
    shape === "bar"
      ? { width: size * 1.8, height: size * 0.56 }
      : { width: size, height: size };
  const rotate = shape === "diamond" ? 45 : 0;
  const style = shapeStyles[shape];
  const eyeSize = Math.max(4, size * 0.055);
  const eyeGap = size * 0.145;
  const sparkSize = Math.max(4, size * 0.048);

  return (
    <motion.div
      ref={ref}
      className="aan-character"
      animate={{ y: shape === "bar" ? 0 : [0, -3, 0] }}
      transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: aspect.width, height: aspect.height }}
    >
      <motion.div
        className="aan-character-aura"
        animate={{
          width: aspect.width * 1.1,
          height: aspect.height * 1.1,
          borderRadius: radius,
          rotate,
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: style.glow,
          filter: "blur(22px)",
          opacity: 0.95,
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
        <div className="aan-character-sheen" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `rotate(${-rotate}deg)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: eyeGap,
          }}
        >
          {[0, 1].map((index) => (
            <motion.div
              key={index}
              animate={{ x: eyeOffset.x, y: eyeOffset.y }}
              transition={{ type: "spring", stiffness: 170, damping: 18 }}
              style={{
                width: eyeSize,
                height: eyeSize,
                borderRadius: "999px",
                background: "#11141f",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.04)",
              }}
            />
          ))}
        </div>
      </motion.div>

      <motion.span
        animate={{
          opacity: [0.9, 1, 0.9],
          scale: [1, 0.95, 1],
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: `${style.sparkLeft}%`,
          top: `${style.sparkTop}%`,
          width: sparkSize,
          height: sparkSize,
          borderRadius: "999px",
          background: "rgba(255,255,255,0.98)",
          boxShadow: `0 0 ${Math.max(10, size * 0.16)}px rgba(255,255,255,0.34)`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </motion.div>
  );
}
