type Props = {
  size?: number;
  variant?: "coral" | "blue" | "outline" | "white";
  className?: string;
};

export function Diamond({ size = 80, variant = "coral", className = "" }: Props) {
  const fill =
    variant === "coral"
      ? "#F26E77"
      : variant === "blue"
        ? "#4A62D9"
        : variant === "white"
          ? "#ffffff"
          : "none";
  const stroke = variant === "outline" ? "#1a1a1a" : "none";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ display: "block" }}
    >
      <polygon
        points="50,6 94,50 50,94 6,50"
        fill={fill}
        stroke={stroke}
        strokeWidth={variant === "outline" ? 4 : 0}
      />
    </svg>
  );
}
