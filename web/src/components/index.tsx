import { useState } from "react";
import { ButtonBar } from "./button-bar";

interface IndexProps {
  title: string;
  newElement?: React.ReactNode;
  views: View[];
}

type View = {
  id: string;
  name: string;
  icon: React.ReactNode;
  component: React.ReactNode;
};

export function Index({ title, newElement, views }: IndexProps) {
  const [mode, setMode] = useState<string>(views[0].id);

  return (
    <div>
      <h1>{title}</h1>
      {newElement}
      {views.length > 1 && (
        <div
          className="view-selector"
          style={{ display: "flex", justifyContent: "flex-end", gap: "0px" }}
        >
          <ButtonBar
            selectedButton={mode}
            setSelectedButton={setMode}
            buttons={views.map((view) => ({
              id: view.id,
              contents: (
                <span role="img" aria-label={view.name}>
                  {view.icon}
                </span>
              ),
              tooltip: view.name,
            }))}
          />
        </div>
      )}
      {views.find((v) => v.id === mode)?.component}
    </div>
  );
}
