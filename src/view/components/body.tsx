import "./../styles/body.css";
import "./../styles/about.css";
import { useState, useEffect, useRef } from "react";
import Properties from "./properties";
import DataPoints from "./dataPoints";
import ChartDisplay from "./chartDisplay";
import Export from "./export";
import TypeBar from "./typeBar";
import { BodyProps } from "../types/types";
import { ChartData, ChartOptions } from "chart.js";

const Body: React.FC<BodyProps> = ({
  chartData,
  setChartData,
  type,
  setType,
  chartOptions,
  setChartOptions,
}) => {
  const chartRef = useRef<any>(null);
  const [linkSuccess, setLinkSuccess] = useState<boolean>(false);

  const alertLinkSuccess = (): void => {
    setLinkSuccess(true);
    setTimeout(() => {
      setLinkSuccess(false);
    }, 3000);
  };

  const copyLinkToClipboard = (link: string): void => {
    const textArea = document.createElement("textarea");
    textArea.value = link;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    console.log("Link copied to clipboard (fallback):", link);
    alertLinkSuccess();
  };

  const generateLink = (): void => {
    const serializedData = encodeURIComponent(JSON.stringify(chartData));
    const serializedOptions = encodeURIComponent(JSON.stringify(chartOptions));
    const link = `${window.location.origin}${window.location.pathname}?data=${serializedData}&options=${serializedOptions}&type=${type}`;
    copyLinkToClipboard(link);
  };

  const updateFromUrlParameters = (): void => {
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get("data");
    const optionsParam = urlParams.get("options");
    const typeParam = urlParams.get("type");

    if (dataParam && optionsParam && typeParam) {
      try {
        const parsedData = JSON.parse(
          decodeURIComponent(dataParam)
        ) as ChartData;
        const parsedOptions = JSON.parse(
          decodeURIComponent(optionsParam)
        ) as ChartOptions;
        setChartData(parsedData as any);
        setChartOptions(parsedOptions);
        setType(typeParam as "pie" | "bar" | "line" | "radar");
      } catch (error) {
        console.error("Error parsing URL parameters:", error);
      }
    }

    const def_link = `${window.location.origin}${window.location.pathname}`;
    window.history.replaceState({}, "", def_link);
  };

  useEffect(() => {
    updateFromUrlParameters();
  }, []);

  return (
    <div
      className="w-100 d-flex justify-content-center mt-5 regular_text"
      style={{ height: "80vh", minHeight: "500px" }}
    >
      <div className="d-flex flex-row justify-content-center body-wrapper">
        <div className="h-100 chart-wrapper">
          <TypeBar type={type} setType={setType} />
          <ChartDisplay
            chartData={chartData}
            chartOptions={chartOptions as any}
            type={type}
            chartRef={chartRef}
          />
        </div>
        <div className="w-100 h-100 d-flex flex-column toolbar_export-wrapper">
          <div className="toolbar-wrapper p-4">
            <Properties
              chartData={chartData}
              setChartData={setChartData as any}
              chartOptions={chartOptions}
              setChartOptions={setChartOptions}
            />
            <DataPoints
              labelData={chartData.labels}
              valueData={chartData.datasets[0].data}
              setChartData={setChartData}
            />
          </div>
          <Export
            chartRef={chartRef}
            generateLink={generateLink}
            showAlert={linkSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default Body;
