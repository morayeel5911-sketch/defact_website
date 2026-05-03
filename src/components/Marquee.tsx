"use client";

interface MarqueeProps {
  text: string;
  speed?: number; // seconds for one loop
  direction?: "left" | "right";
  className?: string;
  textClassName?: string;
}

export default function Marquee({
  text,
  speed = 20,
  direction = "left",
  className = "",
  textClassName = "",
}: MarqueeProps) {
  // Duplicate text multiple times for seamless loop
  const items = Array(10).fill(text);
  const animationDirection = direction === "left" ? "normal" : "reverse";

  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
      }}
    >
      <div
        className="inline-flex"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection,
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className={`inline-block mx-8 ${textClassName}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
