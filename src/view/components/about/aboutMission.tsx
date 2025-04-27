import React from "react";

import radar from "./../../assets/imgs/about/radar.svg";
import radar_halfs from "./../../assets/imgs/about/radar_halfs.svg";

import ColoredLetters from "./coloredLetters";

const AboutMission: React.FC = () => {
  return (
    <div
      className="mt-5 header_text about-wrapper text-start"
      style={{ height: "80vh", minHeight: "500px" }}
    >
      <div className="about-col px-3">
        <p className="font-title">
          Our{" "}
          <ColoredLetters letters="Mission" colorXAmount={3} colorYAmount={2} />
        </p>
        <p className="regular_text font-small">
          At Grappy, our mission is to simplify the process of{" "}
          <strong>
            <em>creating</em>
          </strong>{" "}
          web graphs, charts, and more, so you can bring your ideas to life
          effortlessly. We believe that user-friendliness and speed are the keys
          to unlocking your true potential, and we've tailored Grappy to embody
          these principles.
        </p>
        <img
          loading="lazy"
          className="radar_halfs-img"
          src={radar_halfs}
          alt="Radar_halfs"
          style={{
            width: "50%",
            marginLeft: "20%",
            marginTop: 20,
          }}
        />
      </div>
      <div className="about-col px-3">
        <img loading="lazy" src={radar} alt="Radar" style={{ width: "100%" }} />
      </div>
    </div>
  );
};

export default AboutMission;
