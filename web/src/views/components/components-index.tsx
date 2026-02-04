import { ButtonBar } from "../../components/button-bar";
import { ColumnTable, loadingSpan } from "../../components/column-table";
import { CodeListing } from "../../components/code-listing";
import { RowTable } from "../../components/row-table";
import { ColorSwatch } from "../../components/color-swatch";
import { PaletteSwatch } from "../../components/palette-swatch";
import { useState } from "react";
import { PrimaryContainer } from "../../components/primary-container";
import { SecondaryContainer } from "../../components/secondary-container";
import { BackgroundContainer } from "../../components/background-container";
import { SurfaceContainer } from "../../components/surface-container";
import { ViteForeground } from "../../models/colors";
import { libations } from "../../models/palettes";

export function ComponentsIndex() {
  const [selectedButton, setSelectedButton] = useState("button1");

  return (
    <div>
      <h1>UI Components Showcase</h1>

      <h2>Button Bar</h2>
      <ButtonBar
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
        buttons={[
          { id: "button1", contents: "Button 1", tooltip: "First Button" },
          { id: "button2", contents: "Button 2", tooltip: "Second Button" },
          { id: "button3", contents: "Button 3", tooltip: "Third Button" },
        ]}
      />

      <h2>Column Table</h2>
      <ColumnTable
        columns={[
          { header: "Name", renderColumn: (row) => row.name },
          {
            header: "Age",
            renderColumn: (row) => (row.age === 30 ? loadingSpan : row.age),
          },
          {
            header: "Occupation",
            renderColumn: (row) =>
              row.age === 30 ? loadingSpan : row.occupation,
          },
        ]}
        rows={[
          { name: "Alice", age: 25, occupation: "Engineer" },
          { name: "Bob", age: 30, occupation: "Designer" },
          { name: "Charlie", age: 35, occupation: "Teacher" },
        ]}
      />

      <h2>Code Listing</h2>
      <CodeListing content={`const hello = 'world';`} />

      <h2>Table</h2>
      <RowTable
        columns={[
          { header: "Column 1" },
          { header: "Column 2" },
          { header: "Column 3" },
        ]}
        rows={[
          { col1: "Row 1 Col 1", col2: "Row 1 Col 2", col3: "Row 1 Col 3" },
          { col1: "Row 2 Col 1", col2: "Row 2 Col 2", col3: "Row 2 Col 3" },
          { col1: "Row 3 Col 1", col2: "Row 3 Col 2", col3: "Row 3 Col 3" },
        ]}
        renderRow={(row, index) => (
          <>
            {index === 1 ? (
              <td colSpan={3}>{row.col1} - Spanning all columns</td>
            ) : (
              <>
                <td>{row.col1}</td>
                <td>{row.col2}</td>
                <td>{row.col3}</td>
              </>
            )}
          </>
        )}
      />

      <h2>Color Swatch</h2>
      <ColorSwatch color={ViteForeground} />

      <h2>Palette Swatch</h2>
      <PaletteSwatch colors={libations.colors} />

      <h2>Containers</h2>
      <PrimaryContainer>Primary</PrimaryContainer>
      <div className="primary-variant">Primary Variant</div>
      <SecondaryContainer>Secondary</SecondaryContainer>
      <div className="secondary-variant">Secondary Variant</div>
      <BackgroundContainer>Background</BackgroundContainer>
      <SurfaceContainer>Surface</SurfaceContainer>
      <div className="error">Error</div>
      <div className="warning">Warning</div>
      <div className="success">Success</div>

      <h2>Gradients</h2>
      <style>{`
        .gradient-examples {
          display: grid;
          gap: 1rem;
          grid-template-rows: repeat(5, 1fr);
          margin: auto;
          max-height: 250px;
          max-width: 800px;
          padding: 1rem;
        }

        @media (min-width: 600px) {
          .gradient-examples {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        .gradient-example {
          align-items: center;
          border-radius: 16px;
          box-shadow: 0 0 15px hsla(0deg, 0%, 0%, 0.5);
          color: var(--current-on-color);
          font-size: 1.25rem;
          font-weight: 900;
          display: flex;
          height: 250px;
          justify-content: center;
          text-shadow: 0 2px 3px hsla(0deg, 0%, 0%, 0.25);
        }

        .linear-gradient-current {
          background-image: linear-gradient(var(--current-color), var(--current-variant-color));
        }

        .linear-gradient-current-on-bottom {
          background-image: linear-gradient(var(--current-color), var(--current-variant-color), var(--current-on-color));
        }

        .linear-gradient-current-on-center {
          background-image: linear-gradient(var(--current-on-color), var(--current-color), var(--current-variant-color), var(--current-on-color));
        }

        .radial-gradient-current {
          background-image: radial-gradient(var(--current-color), var(--current-variant-color));
        }

        .conic-gradient-current {
          background-image: conic-gradient(var(--current-color), var(--current-variant-color), var(--current-on-color), var(--current-color));
        }
      `}</style>
      <div className="gradient-examples">
        <div className="gradient-example linear-gradient-current">Linear</div>
        <div className="gradient-example linear-gradient-current-on-bottom">
          Linear
        </div>
        <div className="gradient-example linear-gradient-current-on-center">
          Linear
        </div>
        <div className="gradient-example radial-gradient-current">Radial</div>
        <div className="gradient-example conic-gradient-current">Conic</div>
      </div>
      <PrimaryContainer>
        <div className="gradient-examples">
          <div className="gradient-example linear-gradient-current">Linear</div>
          <div className="gradient-example linear-gradient-current-on-bottom">
            Linear
          </div>
          <div className="gradient-example linear-gradient-current-on-center">
            Linear
          </div>
          <div className="gradient-example radial-gradient-current">Radial</div>
          <div className="gradient-example conic-gradient-current">Conic</div>
        </div>
      </PrimaryContainer>
      <SecondaryContainer>
        <div className="gradient-examples">
          <div className="gradient-example linear-gradient-current">Linear</div>
          <div className="gradient-example linear-gradient-current-on-bottom">
            Linear
          </div>
          <div className="gradient-example linear-gradient-current-on-center">
            Linear
          </div>
          <div className="gradient-example radial-gradient-current">Radial</div>
          <div className="gradient-example conic-gradient-current">Conic</div>
        </div>
      </SecondaryContainer>
    </div>
  );
}
