import { useRef } from "react";
import SlIconButton from "@shoelace-style/shoelace/dist/react/icon-button";
import SlTooltip from "@shoelace-style/shoelace/dist/react/tooltip";
import SlRelativeTime from "@shoelace-style/shoelace/dist/react/relative-time";
import { Bar, Line, Radar, Pie } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import "chart.js/auto";
import { ArchiveCardProps } from "../types/types";

const ArchiveCard: React.FC<ArchiveCardProps> = ({
  data,
  deleteChart,
  editChart,
}) => {
  const chartRef = useRef<any>(null);

  const getChartComponent = (type: "pie" | "bar" | "line" | "radar") => {
    switch (type) {
      case "pie":
        return (
          <Pie
            ref={chartRef}
            data={data.data as ChartData<"pie">}
            options={data.options as ChartOptions<"pie">}
          />
        );
      case "bar":
        return (
          <Bar
            ref={chartRef}
            data={data.data as ChartData<"bar">}
            options={data.options as ChartOptions<"bar">}
          />
        );
      case "line":
        return (
          <Line
            ref={chartRef}
            data={data.data as ChartData<"line">}
            options={data.options as ChartOptions<"line">}
          />
        );
      case "radar":
        return (
          <Radar
            ref={chartRef}
            data={data.data as ChartData<"radar">}
            options={data.options as ChartOptions<"radar">}
          />
        );
    }
  };

  return (
    <div className="archive-card_wrapper">
      <div
        className="w-100 d-flex align-items-center justify-content-center p-2 chart-display"
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
          {getChartComponent(data.type)}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <SlRelativeTime
          style={{ color: "gray", fontSize: "0.8rem" }}
          date={data.timestamp}
        />
        <div
          className="d-flex justify-content-center align-items-center m-2 button_export"
          style={{ width: "30%" }}
          onClick={editChart}
        >
          <span>Edit</span>
        </div>
        <SlTooltip
          className="icon-button-delete"
          content="Delete archived chart"
          placement="bottom"
          onClick={deleteChart}
        >
          <SlIconButton
            style={{ fontSize: "1.5rem" }}
            name="trash"
            label="Delete"
          />
        </SlTooltip>
      </div>
    </div>
  );
};

export default ArchiveCard;
