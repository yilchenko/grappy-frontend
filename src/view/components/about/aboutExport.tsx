import React from "react";

import line from "./../../assets/imgs/about/line.svg";
import ColoredLetters from "./coloredLetters";

const AboutExport: React.FC = () => {
  return (
    <div
      className="mt-5 header_text about-wrapper text-start"
      style={{ height: "80vh", minHeight: "500px" }}
    >
      <div className="about-col px-3">
        <p className="font-title">
          <ColoredLetters letters="Export" colorXAmount={3} colorYAmount={2} />{" "}
          Options Galore
        </p>
        <ul
          className="regular_text font-small"
          style={{ fontSize: 17, marginLeft: "-32px" }}
        >
          <li>
            <strong>Shareable Links:</strong> Easily share your diagrams with
            collaborators by generating unique links that allow them to view and
            edit the diagram in real-time.
          </li>
          <li>
            <strong>PNG:</strong> Export your diagrams as high-quality PNG
            images for use in documents, presentations, or web content.
          </li>
          <li>
            <strong>SVG:</strong> Export your diagrams as scalable vector
            graphics, ideal for retaining quality across various sizes and
            platforms.
          </li>
        </ul>
      </div>
      <div className="about-col px-3">
        <img loading="lazy" src={line} alt="Line" style={{ width: "100%" }} />
      </div>
    </div>
  );
};

export default AboutExport;
