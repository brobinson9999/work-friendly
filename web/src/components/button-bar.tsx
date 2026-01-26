interface ButtonBarProps<T> {
  selectedButton: T;
  setSelectedButton: (id: T) => void;
  buttons: Button<T>[];
}

type Button<T> = {
  id: T;
  contents: React.ReactNode;
  tooltip: string;
};

export function ButtonBar<T>({
  selectedButton,
  setSelectedButton,
  buttons,
}: ButtonBarProps<T>) {
  return (
    <div
      className="view-selector"
      style={{ display: "flex", justifyContent: "flex-end", gap: "0px" }}
    >
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() =>
            selectedButton !== button.id && setSelectedButton(button.id)
          }
          className={selectedButton === button.id ? "primary" : "secondary"}
          style={{
            borderLeft:
              index === 0 ? "0px" : "1px solid var(--current-on-color)",
            cursor: index === 0 ? "default" : "pointer",
            height: "44px",
            padding: "10px",
            margin: "0px",
            borderRadius:
              index === 0
                ? "24px 0 0 24px"
                : index === buttons.length - 1
                  ? "0 24px 24px 0"
                  : "0",
          }}
          title={button.tooltip}
        >
          {button.contents}
        </button>
      ))}
    </div>
  );
}
