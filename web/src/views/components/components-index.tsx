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
          { header: "Name", getValue: (row) => row.name },
          {
            header: "Age",
            getValue: (row) => (row.age === 30 ? loadingSpan : row.age),
          },
          {
            header: "Occupation",
            getValue: (row) => (row.age === 30 ? loadingSpan : row.occupation),
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
        columns={["Column 1", "Column 2", "Column 3"]}
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
    </div>
  );
}
