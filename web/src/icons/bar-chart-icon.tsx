export function BarChartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="var(--current-on-color)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Axes */}
      <line x1="4" y1="20" x2="20" y2="20" />
      <line x1="4" y1="20" x2="4" y2="4" />
      {/* Bars */}
      <rect
        x="6.5"
        y="14"
        width="2.5"
        height="6"
        fill="var(--current-on-color)"
        stroke="none"
      />
      <rect
        x="11"
        y="10"
        width="2.5"
        height="10"
        fill="var(--current-on-color)"
        stroke="none"
      />
      <rect
        x="15.5"
        y="6"
        width="2.5"
        height="14"
        fill="var(--current-on-color)"
        stroke="none"
      />
    </svg>
  );
}
