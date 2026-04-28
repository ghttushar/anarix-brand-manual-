import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

type Shape = "diamond" | "circle" | "bar" | "cube";

type Props = {
  size?: number;
  shape?: Shape;
  trackCursor?: boolean;
};

export function Aan({ size = 160, shape = "diamond", trackCursor = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [eye, setEye] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (!trackCursor) {
      return;
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
      const dist = Math.min(1, Math.hypot(dx, dy) / 400);
      const angle = Math.atan2(dy, dx);

      setEye({
        x: Math.cos(angle) * dist * 6,
        y: Math.sin(angle) * dist * 6,
      });
    };

    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [trackCursor]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 140);
    }, 3800);

    return () => window.clearInterval(intervalId);
  }, []);

  const radius =
    shape === "circle" ? "50%" : shape === "bar" ? "40px" : shape === "cube" ? "12%" : "0%";
  const aspect =
    shape === "bar"
      ? { width: size * 1.8, height: size * 0.6 }
      : { width: size, height: size };
  const rotate = shape === "diamond" ? 45 : 0;

  return (
    <div
      ref={ref}
      className="aan-character"
      style={{ width: aspect.width, height: aspect.height }}
    >
      <motion.div
        animate={{
          width: aspect.width,
          height: aspect.height,
          borderRadius: radius,
          rotate,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        style={{
          background: "linear-gradient(135deg, #F26E77 0%, #4A62D9 100%)",
          position: "relative",
          boxShadow: "0 20px 60px -15px rgba(74,98,217,0.45)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `rotate(${-rotate}deg)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: size * 0.14,
          }}
        >
          {[0, 1].map((index) => (
            <motion.div
              key={index}
              animate={{
                x: eye.x,
                y: eye.y,
                scaleY: blink ? 0.1 : 1,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              style={{
                width: size * 0.12,
                height: size * 0.18,
                background: "white",
                borderRadius: "50%",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
