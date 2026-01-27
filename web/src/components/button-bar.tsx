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
        let buttonClass =
          selectedButton === button.id ? "primary" : "secondary";
        buttonClass += " button-bar-button";
        if (index === 0) {
          buttonClass += " button-bar-button-first";
        } else if (index === buttons.length - 1) {
          buttonClass += " button-bar-button-last";
        } else {
          buttonClass += " button-bar-button-middle";
        }
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
