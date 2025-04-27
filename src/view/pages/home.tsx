import React from "react";
import { BodyProps } from "../types/types";
import Body from "../components/body";
import AboutMission from "../components/about/aboutMission";
import AboutExport from "../components/about/aboutExport";
import AboutLibrary from "../components/about/aboutLibrary";
import AboutFooter from "../components/about/aboutFooter";

type HomeProps = Omit<BodyProps, "chartRef">;

const Home: React.FC<HomeProps> = ({
  chartData,
  setChartData,
  type,
  setType,
  chartOptions,
  setChartOptions,
}) => {
  return (
    <>
      <div className="section" id="body_anchor" style={{ marginTop: "8vh" }}>
        <Body
          chartData={chartData}
          setChartData={setChartData}
          type={type}
          setType={setType}
          chartOptions={chartOptions}
          setChartOptions={setChartOptions}
        />
      </div>
      <div className="section" id="about_anchor" style={{ marginTop: "40vh" }}>
        <AboutMission />
      </div>
      <div className="section">
        <AboutLibrary />
      </div>
      <div className="section export-section" style={{ marginTop: "10vh" }}>
        <AboutExport />
      </div>
      <div className="section footer-section">
        <AboutFooter />
      </div>
    </>
  );
};

export default Home;
