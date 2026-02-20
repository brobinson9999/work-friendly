export function ScatterPlotIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="var(--current-on-color)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Axes */}
      <line x1="4" y1="20" x2="20" y2="20" />
      <line x1="4" y1="20" x2="4" y2="4" />
      {/* Chart function curve (e.g., y = x^2 scaled) */}
      <path d="M4 20 Q8 8 12 12 Q16 16 20 4" />
      {/* Dots on curve */}
      <circle
        cx="8"
        cy="14"
        r="1.2"
        fill="var(--current-on-color)"
        stroke="none"
      />
      <circle
        cx="12"
        cy="12"
        r="1.2"
        fill="var(--current-on-color)"
        stroke="none"
      />
      <circle
        cx="16"
        cy="8"
        r="1.2"
        fill="var(--current-on-color)"
        stroke="none"
      />
    </svg>
  );
}
