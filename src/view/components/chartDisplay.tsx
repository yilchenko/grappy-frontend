import React from "react";
import SlIcon from "@shoelace-style/shoelace/dist/react/icon";
import SlCopyButton from "@shoelace-style/shoelace/dist/react/copy-button";
import { Bar, Line, Radar, Pie } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import "chart.js/auto";
import { ChartDisplayProps } from "../types/types";

const ChartDisplay: React.FC<ChartDisplayProps> = ({
  chartData,
  chartOptions,
  type,
  chartRef,
}) => {
  const storeChartData = (
    chartData: any,
    chartOptions: any,
    type: string
  ): void => {
    const timestamp = new Date().toISOString();
    const existingData = JSON.parse(localStorage.getItem("chartData") || "[]");

    if (!Array.isArray(existingData)) {
      console.error(
        "Existing data is not an array. Resetting to an empty array."
      );
      localStorage.removeItem("chartData");
      return;
    }

    const newDataInstance = {
      data: chartData,
      options: chartOptions,
      type,
      timestamp,
    };
    existingData.push(newDataInstance);
    localStorage.setItem("chartData", JSON.stringify(existingData));
  };

  const getChartComponent = (type: "pie" | "bar" | "line" | "radar") => {
    switch (type) {
      case "pie":
        return (
          <Pie
            ref={chartRef}
            data={chartData as ChartData<"pie">}
            options={chartOptions as ChartOptions<"pie">}
          />
        );
      case "bar":
        return (
          <Bar
            ref={chartRef}
            data={chartData as ChartData<"bar">}
            options={chartOptions as ChartOptions<"bar">}
          />
        );
      case "line":
        return (
          <Line
            ref={chartRef}
            data={chartData as ChartData<"line">}
            options={chartOptions as ChartOptions<"line">}
          />
        );
      case "radar":
        return (
          <Radar
            ref={chartRef}
            data={chartData as ChartData<"radar">}
            options={chartOptions as ChartOptions<"radar">}
          />
        );
    }
  };

  const getTopOffset = (type: string): string => {
    return type === "pie" || type === "radar" ? "5%" : "-5%";
  };

  return (
    <div
      className="w-100 d-flex align-items-center justify-content-center p-4 chart-display"
      style={{ flexDirection: "column" }}
    >
      <div
        className="w-100 d-flex align-items-center justify-content-center p-1 flex-column"
        style={{
          maxHeight: "100%",
          height: "100%",
          backgroundColor: "white",
          borderRadius: "45px",
          zIndex: 3000,
          maxWidth: "100%",
        }}
      >
        <div
          className="save_to_archive-button"
          style={{ top: getTopOffset(type) }}
        >
          <SlCopyButton
            onClick={() => storeChartData(chartData, chartOptions, type)}
            value="Save to archive"
            copy-label="Save to archive"
            success-label="Success!"
            error-label="Whoops, your browser doesn't support this!"
          >
            <SlIcon slot="copy-icon" name="floppy" style={{ color: "gray" }} />
            <SlIcon slot="success-icon" name="check-lg" />
            <SlIcon slot="error-icon" name="clipboard-x" />
          </SlCopyButton>
        </div>
        {getChartComponent(type)}
      </div>
    </div>
  );
};

export default ChartDisplay;
