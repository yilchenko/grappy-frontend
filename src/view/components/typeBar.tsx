import React from "react";
import pie from "./../assets/imgs/pie.svg";
import line from "./../assets/imgs/line.svg";
import bar from "./../assets/imgs/bar.svg";
import radar from "./../assets/imgs/radar.svg";
import { TypeBarProps, ChartType } from "../types/types";

const TypeBar: React.FC<TypeBarProps> = ({ type, setType }) => {
  const handleClick = (newType: ChartType): void => {
    setType(newType);
  };

  return (
    <div
      className="d-flex flex-row justify-content-start align-items-center typebar-wrapper"
      style={{ height: 0, width: "auto" }}
    >
      <div
        className={
          type === "pie" ? "typebar-item-active" : "typebar-item-disabled"
        }
        onClick={() => handleClick("pie")}
      >
        <img src={pie} alt="Pie" style={{ height: 30, marginTop: 10 }} />
      </div>
      <div
        className={
          type === "bar"
            ? "typebar-item-active ms-2"
            : "typebar-item-disabled ms-2"
        }
        onClick={() => handleClick("bar")}
      >
        <img
          src={bar}
          alt="Bar"
          style={{ height: 30, width: 25, marginTop: 10 }}
        />
      </div>
      <div
        className={
          type === "line"
            ? "typebar-item-active ms-2"
            : "typebar-item-disabled ms-2"
        }
        onClick={() => handleClick("line")}
      >
        <img
          src={line}
          alt="Line"
          style={{ height: 30, width: 25, marginTop: 10 }}
        />
      </div>
      <div
        className={
          type === "radar"
            ? "typebar-item-active ms-2"
            : "typebar-item-disabled ms-2"
        }
        onClick={() => handleClick("radar")}
      >
        <img src={radar} alt="Radar" style={{ height: 30, marginTop: 10 }} />
      </div>
    </div>
  );
};

export default TypeBar;
