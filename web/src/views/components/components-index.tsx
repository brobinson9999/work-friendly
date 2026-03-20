import { ButtonBar } from "../../components/button-bar";
import { ColumnTable } from "../../components/column-table";
import { CodeListing } from "../../components/code-listing";
import { RowTable } from "../../components/row-table";
import { ColorSwatch } from "../../components/color-swatch";
import { PaletteSwatch } from "../../components/palette-swatch";
import { ViteForeground } from "../../models/colors";
import { libations } from "../../models/palettes";

import { BarChart } from "../../components/bar-chart";
import { ScatterPlot } from "../../components/scatter-plot";
import { useState } from "react";
import { GaugeDemo } from "../../components/gauge-demo";
import { dateAxis, numberAxis, textAxis } from "../../components/chart-axis";
import { div } from "../../components/tags";
import { FormField } from "../../components/form-field";
import { FormFieldReverse } from "../../components/form-field-reverse";
import { loadingSpan } from "../../components/loading-span";

type ChartSampleData = {
  fruit: string;
  qty: number;
  color: string;
  price: number;
  weight: number;
  radius: number;
  bestBefore: Date;
};

function ComponentCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return div(["component"], {}, [<h3>{title}</h3>, children]);
}

export function ComponentsIndex() {
  const [selectedButton, setSelectedButton] = useState("button1");

  const chartData: ChartSampleData[] = [
    {
      fruit: "Apples",
      qty: 120,
      color: "#e74c3c",
      price: 1.2,
      weight: 0.5,
      radius: 10,
      bestBefore: new Date("2024-12-31"),
    },
    {
      fruit: "Bananas",
      qty: 90,
      color: "#f1c40f",
      price: 0.8,
      weight: 0.3,
      radius: 8,
      bestBefore: new Date("2024-11-30"),
    },
    {
      fruit: "Cherries",
      qty: 60,
      color: "#c0392b",
      price: 2.5,
      weight: 0.2,
      radius: 5,
      bestBefore: new Date("2024-10-15"),
    },
    {
      fruit: "Dates",
      qty: 30,
      color: "#8d5524",
      price: 3.0,
      weight: 0.4,
      radius: 6,
      bestBefore: new Date("2024-09-30"),
    },
    {
      fruit: "Elderberries",
      qty: 75,
      color: "#6c3483",
      price: 1.8,
      weight: 0.3,
      radius: 7,
      bestBefore: new Date("2024-08-31"),
    },
    {
      fruit: "Figs",
      qty: 45,
      color: "#a569bd",
      price: 2.2,
      weight: 0.4,
      radius: 9,
      bestBefore: new Date("2024-07-31"),
    },
    {
      fruit: "Grapes",
      qty: 110,
      color: "#5b2c6f",
      price: 2.0,
      weight: 0.5,
      radius: 8,
      bestBefore: new Date("2024-06-30"),
    },
  ];

  return (
    <div>
      <h1>UI Components</h1>

      <section>
        {div(
          ["components"],
          {},
          <>
            <ComponentCard title="Button Bar">
              <ButtonBar
                selectedButton={selectedButton}
                setSelectedButton={setSelectedButton}
                buttons={[
                  {
                    id: "button1",
                    contents: "Button 1",
                    tooltip: "First Button",
                  },
                  {
                    id: "button2",
                    contents: "Button 2",
                    tooltip: "Second Button",
                  },
                  {
                    id: "button3",
                    contents: "Button 3",
                    tooltip: "Third Button",
                  },
                ]}
              />
            </ComponentCard>

            <ComponentCard title="Column Table">
              <ColumnTable
                columns={[
                  { header: "Name", renderColumn: (row) => row.name },
                  {
                    header: "Age",
                    renderColumn: (row) =>
                      row.age === 30 ? loadingSpan : row.age,
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
            </ComponentCard>

            <ComponentCard title="Code Listing">
              <CodeListing content={`const hello = 'world';`} />
            </ComponentCard>

            <ComponentCard title="Table">
              <RowTable
                columns={[
                  { header: "Column 1" },
                  { header: "Column 2" },
                  { header: "Column 3" },
                ]}
                rows={[
                  {
                    col1: "Row 1 Col 1",
                    col2: "Row 1 Col 2",
                    col3: "Row 1 Col 3",
                  },
                  {
                    col1: "Row 2 Col 1",
                    col2: "Row 2 Col 2",
                    col3: "Row 2 Col 3",
                  },
                  {
                    col1: "Row 3 Col 1",
                    col2: "Row 3 Col 2",
                    col3: "Row 3 Col 3",
                  },
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
            </ComponentCard>

            <ComponentCard title="Color Swatch">
              <ColorSwatch color={ViteForeground} />
            </ComponentCard>

            <ComponentCard title="Palette Swatch">
              <PaletteSwatch colors={libations.colors} />
            </ComponentCard>

            <ComponentCard title="Containers">
              {div(["primary"], {}, "Primary")}
              {div(["primary-variant"], {}, "Primary Variant")}
              {div(["secondary"], {}, "Secondary")}
              {div(["secondary-variant"], {}, "Secondary Variant")}
              {div(["background"], {}, "Background")}
              {div(["surface"], {}, "Surface")}
              {div(["error"], {}, "Error")}
              {div(["warning"], {}, "Warning")}
              {div(["success"], {}, "Success")}
            </ComponentCard>

            <ComponentCard title="Bar Chart">
              <BarChart
                data={chartData}
                labelAxis={textAxis<ChartSampleData>(
                  "fruit",
                  "Fruit",
                  (d) => d.fruit,
                )}
                valueAxis={numberAxis<ChartSampleData>(
                  "qty",
                  "Quantity",
                  (d) => d.qty,
                  {
                    min: 0,
                  },
                )}
                colorAxis={textAxis<ChartSampleData>(
                  "color",
                  "Color",
                  (d) => d.color,
                )}
                barHeightAxis={numberAxis<ChartSampleData>(
                  "radius",
                  "Bar Height",
                  (d) => d.radius,
                  {
                    min: 0,
                  },
                )}
              />
            </ComponentCard>

            <ComponentCard title="Scatter Plot">
              <ScatterPlot
                data={chartData}
                labelAxis={textAxis<ChartSampleData>(
                  "fruit",
                  "Fruit",
                  (d) => d.fruit,
                )}
                xAxis={numberAxis<ChartSampleData>(
                  "price",
                  "Price",
                  (d) => d.price,
                  {
                    min: 0,
                  },
                )}
                yAxis={dateAxis<ChartSampleData>(
                  "bestBefore",
                  "Best Before",
                  (d) => d.bestBefore,
                )}
                colorAxis={textAxis<ChartSampleData>(
                  "color",
                  "Color",
                  (d) => d.color,
                )}
                radiusAxis={numberAxis<ChartSampleData>(
                  "radius",
                  "Radius",
                  (d) => d.radius,
                  {
                    min: 0,
                  },
                )}
              />
            </ComponentCard>

            <ComponentCard title="Gradients">
              <div className="gradient-examples-row-1">
                <div className="gradient-examples">
                  <div className="gradient-example linear-gradient-current">
                    Linear
                  </div>
                  <div className="gradient-example linear-gradient-current-on-bottom">
                    Linear
                  </div>
                  <div className="gradient-example linear-gradient-current-on-center">
                    Linear
                  </div>
                  <div className="gradient-example radial-gradient-current">
                    Radial
                  </div>
                  <div className="gradient-example conic-gradient-current">
                    Conic
                  </div>
                </div>
              </div>
              <div className="gradient-examples-row-2">
                <div className="gradient-examples">
                  <div className="gradient-example linear-gradient-current">
                    Linear
                  </div>
                  <div className="gradient-example linear-gradient-current-on-bottom">
                    Linear
                  </div>
                  <div className="gradient-example linear-gradient-current-on-center">
                    Linear
                  </div>
                  <div className="gradient-example radial-gradient-current">
                    Radial
                  </div>
                  <div className="gradient-example conic-gradient-current">
                    Conic
                  </div>
                </div>
              </div>
              <div className="gradient-examples-row-3">
                <div className="gradient-examples">
                  <div className="gradient-example linear-gradient-current">
                    Linear
                  </div>
                  <div className="gradient-example linear-gradient-current-on-bottom">
                    Linear
                  </div>
                  <div className="gradient-example linear-gradient-current-on-center">
                    Linear
                  </div>
                  <div className="gradient-example radial-gradient-current">
                    Radial
                  </div>
                  <div className="gradient-example conic-gradient-current">
                    Conic
                  </div>
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Gauges">
              <h4>One Eighty Speedo</h4>
              <GaugeDemo className="one-eighty-speedo" />
              <h4>Two Seventy Speedo</h4>
              <GaugeDemo className="two-seventy-speedo" />
              <h4>Radio Gauge</h4>
              <GaugeDemo className="radio-gauge" />
              <h4>Bar Gauge</h4>
              <GaugeDemo className="bar-gauge" />
              <h4>Vertical Gauge</h4>
              <GaugeDemo className="vertical-gauge" />
            </ComponentCard>

            <ComponentCard title="Forms">
              <form>
                <fieldset>
                  <legend>Text Inputs</legend>
                  <FormField
                    label="Text"
                    input={(id) => (
                      <input
                        type="text"
                        id={id}
                        name="text"
                        placeholder="Text input"
                      />
                    )}
                  />
                  <FormField
                    label="Password"
                    input={(id) => (
                      <input
                        type="password"
                        id={id}
                        name="password"
                        placeholder="Password"
                      />
                    )}
                  />
                  <FormField
                    label="Email"
                    input={(id) => (
                      <input
                        type="email"
                        id={id}
                        name="email"
                        placeholder="Email"
                      />
                    )}
                  />
                  <FormField
                    label="Search"
                    input={(id) => (
                      <input
                        type="search"
                        id={id}
                        name="search"
                        placeholder="Search"
                      />
                    )}
                  />
                  <FormField
                    label="URL"
                    input={(id) => (
                      <input
                        type="url"
                        id={id}
                        name="url"
                        placeholder="https://example.com"
                      />
                    )}
                  />
                  <FormField
                    label="Telephone"
                    input={(id) => (
                      <input
                        type="tel"
                        id={id}
                        name="tel"
                        placeholder="(555) 555-5555"
                      />
                    )}
                  />
                </fieldset>
                <fieldset>
                  <legend>Number & Range</legend>
                  <FormField
                    label="Number"
                    input={(id) => (
                      <input
                        type="number"
                        id={id}
                        name="number"
                        min="0"
                        max="10"
                      />
                    )}
                  />
                  <FormField
                    label="Range"
                    input={(id) => (
                      <input
                        type="range"
                        id={id}
                        name="range"
                        min="0"
                        max="100"
                      />
                    )}
                  />
                </fieldset>
                <fieldset>
                  <legend>Date & Time</legend>
                  <FormField
                    label="Date"
                    input={(id) => <input type="date" id={id} name="date" />}
                  />
                  <FormField
                    label="Time"
                    input={(id) => <input type="time" id={id} name="time" />}
                  />
                  <FormField
                    label="Month"
                    input={(id) => <input type="month" id={id} name="month" />}
                  />
                  <FormField
                    label="Week"
                    input={(id) => <input type="week" id={id} name="week" />}
                  />
                  <FormField
                    label="Datetime-local"
                    input={(id) => (
                      <input
                        type="datetime-local"
                        id={id}
                        name="datetime-local"
                      />
                    )}
                  />
                </fieldset>
                <fieldset>
                  <legend>Choices</legend>
                  <FormField
                    label="Select"
                    input={(id) => (
                      <select id={id} name="select">
                        <option value="">Please choose</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                      </select>
                    )}
                  />
                  <FormField
                    label="Multi-select"
                    input={(id) => (
                      <select id={id} name="multi-select" multiple size={3}>
                        <option value="a">Alpha</option>
                        <option value="b">Bravo</option>
                        <option value="c">Charlie</option>
                      </select>
                    )}
                  />
                  <FormField
                    label="Datalist"
                    input={(id) => (
                      <>
                        <input list="browsers" id={id} name="browser" />
                        <datalist id="browsers">
                          <option value="Chrome" />
                          <option value="Firefox" />
                          <option value="Safari" />
                          <option value="Edge" />
                          <option value="Opera" />
                        </datalist>
                      </>
                    )}
                  />
                </fieldset>
                <fieldset>
                  <legend>Checkboxes & Radios</legend>
                  <FormFieldReverse
                    label="Checkbox 1"
                    input={(id) => (
                      <input type="checkbox" id={id} name="check1" />
                    )}
                  />
                  <FormFieldReverse
                    label="Checkbox 2 (disabled)"
                    input={(id) => (
                      <input type="checkbox" id={id} name="check1" disabled />
                    )}
                  />
                  <FormFieldReverse
                    label="Checkbox 3 (checked)"
                    input={(id) => (
                      <input
                        type="checkbox"
                        id={id}
                        name="check2"
                        defaultChecked
                      />
                    )}
                  />
                  <FormFieldReverse
                    label="Radio A"
                    input={(id) => (
                      <input type="radio" id={id} name="radio" value="a" />
                    )}
                  />
                  <FormFieldReverse
                    label="Radio B (checked)"
                    input={(id) => (
                      <input
                        type="radio"
                        id={id}
                        name="radio"
                        value="b"
                        defaultChecked
                      />
                    )}
                  />
                  <FormFieldReverse
                    label="Radio C (disabled)"
                    input={(id) => (
                      <input
                        type="radio"
                        id={id}
                        name="radio"
                        value="c"
                        disabled
                      />
                    )}
                  />
                </fieldset>
                <fieldset>
                  <legend>File & Color</legend>
                  <FormField
                    label="File"
                    input={(id) => <input type="file" id={id} name="file" />}
                  />
                  <FormField
                    label="Color"
                    input={(id) => (
                      <input
                        type="color"
                        id={id}
                        name="color"
                        defaultValue="#ff0000"
                      />
                    )}
                  />
                </fieldset>
                <fieldset>
                  <legend>Textarea & Output</legend>
                  <FormField
                    label="Textarea"
                    input={(id) => (
                      <textarea
                        id={id}
                        name="textarea"
                        rows={3}
                        cols={30}
                        placeholder="Type here..."
                      />
                    )}
                  />
                  <FormField
                    label="Output"
                    input={(id) => (
                      <output id={id} htmlFor="number">
                        42
                      </output>
                    )}
                  />
                </fieldset>
                <fieldset>
                  <legend>Buttons</legend>
                  <button type="button">Button</button>
                  <button type="submit">Submit</button>
                  <button type="reset">Reset</button>
                </fieldset>
                <fieldset>
                  <legend>Other Inputs</legend>
                  <FormField
                    label="Hidden"
                    input={(id) => (
                      <input
                        type="hidden"
                        id={id}
                        name="hidden"
                        value="hidden value"
                      />
                    )}
                  />
                  <FormField
                    label="Image Button"
                    input={(id) => (
                      <input
                        type="image"
                        id={id}
                        src="/react-logo.svg"
                        alt="Submit"
                      />
                    )}
                  />
                </fieldset>
              </form>
            </ComponentCard>

            <ComponentCard title="Block Quote">
              <blockquote>
                An <em>option button</em>, also referred to as a radio button,
                represents a single choice within a limited set of mutually
                exclusive choices. That is, the user can choose only one set of
                options.
                <footer>— Microsoft Windows User Experience p. 164</footer>
              </blockquote>
            </ComponentCard>
          </>,
        )}
      </section>
    </div>
  );
}
