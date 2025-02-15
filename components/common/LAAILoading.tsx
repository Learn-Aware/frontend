"use client";
import Image from "next/image";

export default function LAAILoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]">
      <div className="flex items-center gap-x-2">
        <Image
          src="/images/logo.png"
          alt="LAAI"
          width={80}
          height={80}
          className="animate-pulse"
        />
        <svg
          width="200"
          height="80"
          viewBox="0 0 200 80"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-pulse"
        >
          <defs>
            <linearGradient
              id="laaiGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="hsl(270, 70%, 80%)" />
              <stop offset="70%" stopColor="hsl(220, 80%, 75%)" />
              <stop offset="100%" stopColor="hsl(230, 80%, 55%)" />
            </linearGradient>
          </defs>

          <text
            x="0"
            y="60"
            fontSize="60"
            fontWeight="bold"
            fill="url(#laaiGradient)"
            stroke="hsl(230, 80%, 45%)"
            strokeWidth="1"
          >
            LAAI
          </text>
        </svg>
      </div>
    </div>
  );
}
