export function TsvIcon() {
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
      {/* Table outline */}
      <rect x="3.5" y="4.5" width="17" height="10" rx="1.5" />
      {/* Vertical lines (columns) */}
      <line x1="9" y1="5" x2="9" y2="14" />
      <line x1="15" y1="5" x2="15" y2="14" />
      {/* Horizontal line (row) */}
      <line x1="4" y1="9.5" x2="20" y2="9.5" />
      {/* TSV text */}
      <text
        x="12"
        y="21"
        textAnchor="middle"
        fontSize="4.5"
        fill="var(--current-on-color)"
        fontFamily="monospace"
      >
        TSV
      </text>
    </svg>
  );
}
