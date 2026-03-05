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
    <div className="button-bar">
      {buttons.map((button, index) => {
        return (
          <button
            key={index}
            onClick={() =>
              selectedButton !== button.id && setSelectedButton(button.id)
            }
            className={selectedButton === button.id ? "selected" : undefined}
            title={button.tooltip}
          >
            {button.contents}
          </button>
        );
      })}
    </div>
  );
}
