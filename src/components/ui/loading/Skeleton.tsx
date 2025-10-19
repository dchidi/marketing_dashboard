import React from "react";
import cls from "./Skeleton.module.css";

type Size = number | string;

type SkeletonElement = "span" | "div";

export type SkeletonProps = {
  w?: Size;
  h?: Size;
  circle?: boolean;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
  block?: boolean;
  as?: SkeletonElement;

  /* variants */
  variant?: "shimmer" | "dots";

  /* dots options */
  colors?: string[];
  intervalMs?: number;
  dotSize?: number | string;
  gap?: number | string;

  /* surface around dots */
  pad?: number | string; // dY`^ inner padding inside rounded bg
  bgColor?: string; // dY`^ background behind dots
  radius?: number | string; // dY`^ rounded corners of bg

  /* layout */
  overlay?: boolean; // dY`^ center inside parent (absolute fill)
};

const Skeleton: React.FC<SkeletonProps> = ({
  w = "100%",
  h = 16,
  circle = false,
  className,
  style,
  block = true,
  as,

  variant = "shimmer",
  colors = ["#A5A5A5", "#A5A5A5", "#A5A5A5", "#A5A5A5"],
  intervalMs = 300,
  dotSize = 16,
  gap = 8,

  pad = 5,
  bgColor = "rgba(255,255,255,0.08)",
  radius = 16,

  overlay = true,
  ...rest
}) => {
  const width = typeof w === "number" ? `${w}px` : w;
  const height = typeof h === "number" ? `${h}px` : h;
  const elementName = (as ?? (overlay ? "div" : "span")) as SkeletonElement;

  if (variant === "dots") {
    const Element = elementName;
    const size = dotSize ?? h;
    const dotPx = typeof size === "number" ? `${size}px` : size;
    const gapPx = typeof gap === "number" ? `${gap}px` : gap;
    const padPx = typeof pad === "number" ? `${pad}px` : pad;
    const radiusPx = typeof radius === "number" ? `${radius}px` : radius;
    const cycleMs = intervalMs * colors.length;

    const wrapperStyle: React.CSSProperties = overlay
      ? { position: "absolute", inset: 0 }
      : { width, height };

    return (
      <Element
        role="status"
        aria-busy="true"
        aria-live="polite"
        className={[
          overlay ? cls.overlay : "",
          !overlay && block ? cls.block : "",
          className || "",
        ]
          .join(" ")
          .trim()}
        style={{
          ...wrapperStyle,
          ...style,
          ["--dot-size" as any]: dotPx,
          ["--dot-gap" as any]: gapPx,
          ["--dot-cycle" as any]: `${cycleMs}ms`,
          ["--dots-bg" as any]: bgColor,
          ["--dots-pad" as any]: padPx,
          ["--dots-radius" as any]: radiusPx,
        }}
        {...rest}
      >
        <span className={cls.dotsSurface} aria-hidden>
          <span className={cls.dotsRow}>
            {colors.map((c, i) => (
              <span
                key={i}
                className={cls.dot}
                style={{
                  backgroundColor: c,
                  animationDelay: `calc(${intervalMs}ms * ${i})`,
                }}
              />
            ))}
          </span>
        </span>
      </Element>
    );
  }

  const sx: React.CSSProperties = { width, height, ...style };
  const shimmerClasses = [
    cls.root,
    circle ? cls.circle : "",
    block ? cls.block : "",
    className || "",
  ]
    .join(" ")
    .trim();

  const Element = elementName;

  return (
    <Element
      role="status"
      aria-busy="true"
      aria-live="polite"
      className={shimmerClasses}
      style={sx}
      {...rest}
    >
      <span aria-hidden className={cls.shimmer} />
    </Element>
  );
};

export default Skeleton;
