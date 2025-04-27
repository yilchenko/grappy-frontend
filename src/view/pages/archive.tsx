import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SlIcon from "@shoelace-style/shoelace/dist/react/icon";
import { ChartData, ChartOptions } from "chart.js";

import "../styles/archive.css";
import "../styles/body.css";
import ArchiveCard from "../components/archiveCard";
import { ChartType, ArchiveCardProps } from "../types/types";

interface ArchiveProps {
  setChartData: (data: ChartData) => void;
  setType: (type: ChartType) => void;
  setChartOptions: (options: ChartOptions) => void;
}

type StoredChartData = {
  data: ChartData;
  type: ChartType;
  options: ChartOptions;
  timestamp: string;
};

const Archive = ({ setChartData, setType, setChartOptions }: any) => {
  const navigate = useNavigate();
  const [archiveData, setArchiveData] = useState<StoredChartData[]>([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("chartData") || "[]");
    setArchiveData(storedData);
  }, []);

  const handleDeleteChart = (index: number): void => {
    const updatedData = [...archiveData];
    updatedData.splice(index, 1);
    setArchiveData(updatedData);
    localStorage.setItem("chartData", JSON.stringify(updatedData));
  };

  const handleEditChart = (index: number): void => {
    setChartData(archiveData[index].data);
    setType(archiveData[index].type);
    setChartOptions(archiveData[index].options);
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {archiveData.length > 0 ? (
        <div className="archive-grid" style={{ marginTop: "8vh" }}>
          {archiveData.map((data, index) => (
            <ArchiveCard
              key={index}
              data={data as any}
              deleteChart={() => handleDeleteChart(index)}
              editChart={() => handleEditChart(index)}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
            color: "gray",
          }}
        >
          <h1 className="header_text">Archive</h1>
          <p className="regular_text">
            Click on "save button" <SlIcon name="floppy" /> to add charts to
            storage.
            <br />
            You do not have any stored charts just yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Archive;
