export function BashIcon() {
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
      <rect
        x="1"
        y="1"
        width="22"
        height="22"
        rx="4"
        ry="4"
        stroke="var(--current-on-color)"
        fill="none"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        fill="var(--current-on-color)"
        fontSize="10"
        fontFamily="Arial, sans-serif"
        dy=".3em"
      >
        ~ $
      </text>
    </svg>
  );
}
