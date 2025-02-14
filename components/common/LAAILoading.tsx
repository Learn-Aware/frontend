"use client";

export default function LAAILoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]">
      <svg
        width="400"
        height="100"
        viewBox="0 0 250 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-pulse"
      >
        <text
          x="20"
          y="80"
          fontSize="80"
          fontWeight="bold"
          fill="hsl(var(--laai-blue))"
          stroke="hsl(var(--laai-blue-dark))"
          strokeWidth="2"
        >
          LAAI
        </text>
      </svg>
    </div>
  );
}
