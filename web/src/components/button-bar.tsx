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
        let buttonClass = selectedButton === button.id ? "selected" : undefined;
        return (
          <button
            key={index}
            onClick={() =>
              selectedButton !== button.id && setSelectedButton(button.id)
            }
            className={buttonClass}
            title={button.tooltip}
          >
            {button.contents}
          </button>
        );
      })}
    </div>
  );
}
