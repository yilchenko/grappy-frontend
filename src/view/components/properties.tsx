import React, { useState } from "react";
import SlCheckbox from "@shoelace-style/shoelace/dist/react/checkbox";
import SlColorPicker from "@shoelace-style/shoelace/dist/react/color-picker";
import SlInput from "@shoelace-style/shoelace/dist/react/input";
import SlTooltip from "@shoelace-style/shoelace/dist/react/tooltip";
import arrowUp from "./../assets/imgs/arrowup.svg";
import arrowDown from "./../assets/imgs/arrowdown.svg";
import { PropertiesProps, Colors, ValidationConfig } from "../types/types";
import { validationCFG } from "../types/types";

const colorToRGB = (color: string): number[] => {
  if (!/^#([A-Fa-f0-9]{6})$/.test(color)) {
    throw new Error('Invalid color format. Please use "#RRGGBB".');
  }

  const hex = color.slice(1);
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return [r, g, b];
};

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, value));
};

const generateLighterColors = (
  color: string,
  count: number,
  maxLightness = 255
): string[] => {
  const [r, g, b] = colorToRGB(color);
  const lighterColors: string[] = [];
  const tolerance = 110;
  const step = Math.round((maxLightness - tolerance) / count);

  for (let i = 0; i < count; i++) {
    const newR = clamp(r + i * step, 0, maxLightness);
    const newG = clamp(g + i * step, 0, maxLightness);
    const newB = clamp(b + i * step, 0, maxLightness);

    const newColor = `#${newR.toString(16).padStart(2, "0")}${newG
      .toString(16)
      .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
    lighterColors.push(newColor);
  }

  return lighterColors;
};

const Properties: React.FC<PropertiesProps> = ({
  chartData,
  setChartData,
  chartOptions,
  setChartOptions,
}) => {
  const [isFolded, setIsFolded] = useState<boolean>(true);
  const [colors, setColors] = useState<Colors>({
    normal: "#3E5141",
    lighter: false,
  });

  const validateValueChange = (
    value: string | number,
    validationConfig: ValidationConfig
  ): string | number | false => {
    if (validationConfig.dataType === "number") {
      const result = parseInt(value.toString());
      if (
        !isNaN(result) &&
        result !== undefined &&
        result <= (validationConfig.max || Infinity) &&
        result >= (validationConfig.min || -Infinity)
      ) {
        return result;
      }
      return false;
    } else if (
      validationConfig.dataType === "string" &&
      typeof value === "string"
    ) {
      if (value.length <= (validationConfig.maxLength || Infinity)) {
        return value;
      }
      return false;
    }
    return false;
  };

  const handleLightBgColor = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    setColors((prevColors) => ({
      ...prevColors,
      lighter: target.checked,
    }));

    if (target.checked) {
      const backgroundColorValue = Array.isArray(
        chartData.datasets[0].backgroundColor
      )
        ? chartData.datasets[0].backgroundColor[0]
        : (chartData.datasets[0].backgroundColor as string);

      const lighterColors = generateLighterColors(
        backgroundColorValue,
        (chartData.datasets[0].data || []).length
      );

      setChartData((prevChartData) => ({
        ...prevChartData,
        datasets: [
          {
            ...prevChartData.datasets[0],
            backgroundColor: lighterColors,
          },
        ],
      }));
    } else {
      const backgroundColorArray = Array.isArray(
        chartData.datasets[0].backgroundColor
      )
        ? chartData.datasets[0].backgroundColor
        : [chartData.datasets[0].backgroundColor];

      setChartData((prevChartData) => ({
        ...prevChartData,
        datasets: [
          {
            ...prevChartData.datasets[0],
            backgroundColor: [backgroundColorArray[0]],
          },
        ],
      }));
    }
  };

  const handleBackgroundColor = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    const newColor = target.value;

    if (colors.lighter) {
      const lighterColors = generateLighterColors(
        newColor,
        (chartData.datasets[0].data || []).length
      );
      setChartData((prevChartData) => ({
        ...prevChartData,
        datasets: [
          {
            ...prevChartData.datasets[0],
            backgroundColor: lighterColors,
          },
        ],
      }));
    } else {
      setChartData((prevChartData) => ({
        ...prevChartData,
        datasets: [
          {
            ...prevChartData.datasets[0],
            backgroundColor: [newColor],
          },
        ],
      }));
    }
  };

  const handleBorderColor = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    const newColor = target.value;
    setChartData((prevChartData) => ({
      ...prevChartData,
      datasets: [
        {
          ...prevChartData.datasets[0],
          borderColor: newColor,
        },
      ],
    }));
  };

  const handleBorderWidth = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    const newWidth = target.value;
    const validatedValue = validateValueChange(newWidth, validationCFG.border);

    if (validatedValue !== false) {
      setChartData((prevChartData) => ({
        ...prevChartData,
        datasets: [
          {
            ...prevChartData.datasets[0],
            borderWidth: validatedValue as number,
          },
        ],
      }));
    }
  };

  const handleLabelsDisplay = (e: Event, axis: string): void => {
    const target = e.target as HTMLInputElement;
    const newValue = target.checked;

    setChartOptions((prevChartOptions: any) => ({
      ...prevChartOptions,
      scales: {
        ...prevChartOptions.scales,
        [axis]: {
          ...prevChartOptions.scales[axis],
          display: newValue,
        },
      },
    }));
  };

  const handleGridDisplay = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    const newValue = target.checked;

    setChartOptions((prevChartOptions: any) => ({
      ...prevChartOptions,
      scales: {
        ...prevChartOptions.scales,
        x: {
          ...prevChartOptions.scales.x,
          grid: {
            ...prevChartOptions.scales.x.grid,
            display: newValue,
          },
        },
        y: {
          ...prevChartOptions.scales.y,
          grid: {
            ...prevChartOptions.scales.y.grid,
            display: newValue,
          },
        },
      },
    }));
  };

  const handleTitle = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    const newTitle = target.value;
    const validatedValue = validateValueChange(newTitle, validationCFG.title);

    if (validatedValue !== false) {
      setChartOptions((prevChartOptions: any) => ({
        ...prevChartOptions,
        plugins: {
          ...prevChartOptions.plugins,
          title: {
            ...prevChartOptions.plugins.title,
            text: validatedValue as string,
          },
        },
      }));
    }
  };

  const handleFold = (): void => {
    setIsFolded(!isFolded);
  };

  return (
    <div
      className={
        isFolded
          ? "w-100 d-flex align-items-center regular_text p-3 folded_properies-wrapper transition"
          : "w-100 d-flex align-items-center regular_text p-3 unfolded_properies-wrapper transition"
      }
    >
      {isFolded ? (
        <span style={{ marginBottom: -30 }}>Properties</span>
      ) : (
        <div
          className="properties_grid-container text-start"
          id="properties_anchor"
        >
          <span>Title:</span>
          <div className="d-flex flex-row">
            <SlTooltip>
              <div slot="content">
                Changes the <strong>title</strong> on the top of the chart.{" "}
                <br />
                Set to empty to <i>remove</i> the title.
              </div>
              <SlInput
                className="reg-input regular_text"
                value={(chartOptions as any).plugins.title.text}
                onSlChange={(e) => handleTitle(e)}
              />
            </SlTooltip>
          </div>

          <span>Labels X:</span>
          <SlTooltip style={{ "--max-width": "180px" } as React.CSSProperties}>
            <div slot="content">
              Toggle the <strong>data labels</strong> on the bottom of the
              chart.
            </div>
            <div style={{ maxWidth: 25 }}>
              <SlCheckbox
                checked={(chartOptions as any).scales.x.display}
                onSlChange={(e) => handleLabelsDisplay(e, "x")}
                className="custom-checkbox"
              ></SlCheckbox>
            </div>
          </SlTooltip>

          <span>Labels Y:</span>
          <SlTooltip style={{ "--max-width": "170px" } as React.CSSProperties}>
            <div slot="content">
              Toggle the <strong>value labels</strong> on the left of the chart.
            </div>
            <div style={{ maxWidth: 25 }}>
              <SlCheckbox
                checked={(chartOptions as any).scales.y.display}
                onSlChange={(e) => handleLabelsDisplay(e, "y")}
                className="custom-checkbox"
              ></SlCheckbox>
            </div>
          </SlTooltip>

          <span>Border:</span>
          <div className="d-flex flex-row">
            <SlTooltip>
              <div slot="content">
                Changes the <strong>border</strong> or <strong>line</strong>{" "}
                width.
                <br />
                Set to 0 to <i>remove</i> the border or line.
                <br />
                Іs defined from{" "}
                <strong>
                  <i>0</i>
                </strong>{" "}
                to{" "}
                <strong>
                  <i>15</i>
                </strong>{" "}
                px.
              </div>
              <SlInput
                className="small-input regular_text"
                value={chartData.datasets[0].borderWidth as string}
                onSlChange={(e) => handleBorderWidth(e)}
              />
            </SlTooltip>
            <span className="ms-2">px</span>
          </div>

          <span>Grid:</span>
          <SlTooltip style={{ "--max-width": "250px" } as React.CSSProperties}>
            <div slot="content">
              Toggle the <strong>grid</strong> on the background of the chart.
              <br />
              Does <i>not</i> work with labels removed.
            </div>
            <div style={{ maxWidth: 25 }}>
              <SlCheckbox
                checked={(chartOptions as any).scales.y.grid.display}
                onSlChange={(e) => handleGridDisplay(e)}
                className="custom-checkbox"
              ></SlCheckbox>
            </div>
          </SlTooltip>

          <span>Highlight:</span>
          <SlTooltip style={{ "--max-width": "250px" } as React.CSSProperties}>
            <div slot="content">
              Toggle the <strong>background highlight</strong> option.
              <br />
              Is used to <i>highlight</i> each individual data point background.
            </div>
            <div style={{ maxWidth: 25 }}>
              <SlCheckbox
                checked={colors.lighter}
                onSlChange={(e) => handleLightBgColor(e)}
                className="custom-checkbox"
              ></SlCheckbox>
            </div>
          </SlTooltip>

          <div
            className="d-flex justify-content-start align-items-center"
            style={{ height: 75, width: "100%" }}
          >
            <span className="mt-4">Color:</span>
          </div>
          <div className="d-flex flex-row text-center" style={{ height: 75 }}>
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ width: "50%" }}
            >
              <span className="mb-2">border</span>
              <SlTooltip>
                <div slot="content" className="text-start">
                  Changes the <strong>border color</strong>.
                  <br />
                  Also affects the <i>line color</i> <br /> in line and radar
                  charts.
                </div>
                <SlColorPicker
                  format="hex"
                  size="small"
                  onSlChange={(e) => handleBorderColor(e)}
                  value={chartData.datasets[0].borderColor as string}
                />
              </SlTooltip>
            </div>
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ width: "50%" }}
            >
              <span className="mb-2">background</span>
              <SlTooltip>
                <div slot="content" className="text-start">
                  Changes the <strong>background color</strong>.
                  <br />
                  Also affects the <i>point color</i> <br /> in line and radar
                  charts.
                </div>
                <SlColorPicker
                  format="hex"
                  size="small"
                  onSlChange={(e) => handleBackgroundColor(e)}
                  value={
                    Array.isArray(chartData.datasets[0].backgroundColor)
                      ? chartData.datasets[0].backgroundColor[0]
                      : (chartData.datasets[0].backgroundColor as string)
                  }
                />
              </SlTooltip>
            </div>
          </div>
        </div>
      )}
      <div
        onClick={handleFold}
        className="d-flex justify-content-center align-items-center mt-5"
        style={{
          minHeight: 30,
          width: 100,
          backgroundColor: "white",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        {isFolded ? (
          <img src={arrowDown} alt="Expand" style={{ height: 15 }} />
        ) : (
          <img src={arrowUp} alt="Collapse" style={{ height: 15 }} />
        )}
      </div>
    </div>
  );
};

export default Properties;
