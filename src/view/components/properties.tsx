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
      const lighterColors = generateLighterColors(
        chartData.datasets[0].backgroundColor as string,
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
            backgroundColor: [
              (chartData.datasets[0].backgroundColor as string[])[0],
            ],
          },
        ],
      }));
    }
  };

  const handleBackgroundColor = (e: any): void => {
    const newColor = e?.target?.value;
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

  // Add all other handlers with proper type annotations...

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
          {/* Add all the properties grid items here... */}
          {/* This is where all your existing JSX goes */}
        </div>
      )}
      <div
        onClick={() => setIsFolded(!isFolded)}
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
