// components/ui/spotlight-new.tsx
"use client";
import { cn } from "../../lib/utils";
import React from "react";

type SpotlightProps = {
  className?: string;
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
};

export const SpotlightNew = ({
  className,
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)",
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100,
}: SpotlightProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {/* Main spotlight */}
      <div
        className="absolute animate-spotlight-move opacity-0"
        style={{
          background: gradientFirst,
          width: `${width}px`,
          height: `${height}px`,
          transform: `translateY(${translateY}px)`,
          animationDuration: `${duration}s`,
          animationDelay: "0.5s",
          animationFillMode: "forwards",
        }}
      />
      
      {/* Left spotlight */}
      <div
        className="absolute animate-spotlight-move-left opacity-0"
        style={{
          background: gradientSecond,
          width: `${smallWidth}px`,
          height: `${height}px`,
          transform: `translateY(${translateY}px) translateX(-${xOffset}px)`,
          animationDuration: `${duration}s`,
          animationDelay: "1s",
          animationFillMode: "forwards",
        }}
      />
      
      {/* Right spotlight */}
      <div
        className="absolute animate-spotlight-move-right opacity-0"
        style={{
          background: gradientThird,
          width: `${smallWidth}px`,
          height: `${height}px`,
          transform: `translateY(${translateY}px) translateX(${xOffset * 2}px)`,
          animationDuration: `${duration}s`,
          animationDelay: "1.5s",
          animationFillMode: "forwards",
        }}
      />
    </div>
  );
};
