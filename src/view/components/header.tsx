import React from "react";
import { useNavigate } from "react-router-dom";
import SlIconButton from "@shoelace-style/shoelace/dist/react/icon-button";
import SlTooltip from "@shoelace-style/shoelace/dist/react/tooltip";
import logo1 from "./../assets/imgs/logo/logo1.svg";
import logo2 from "./../assets/imgs/logo/logo2.svg";
import logo3 from "./../assets/imgs/logo/logo3.svg";
import { HeaderProps } from "../types/types";

const Header: React.FC<HeaderProps> = ({ rotationAngle }: any) => {
  const navigate = useNavigate();

  const handleScrollToElement = (elementId: string): void => {
    const element = document.getElementById(elementId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleInfoClick = async (): Promise<void> => {
    const currentPath = window.location.pathname;

    if (currentPath === "/") {
      handleScrollToElement("about_anchor");
    } else {
      await navigate("/");
      handleScrollToElement("about_anchor");
    }
  };

  const handleLogoClick = (): void => {
    const currentPath = window.location.pathname;

    if (currentPath === "/") {
      handleScrollToElement("body_anchor");
    } else {
      navigate("/");
    }
  };

  return (
    <div
      className="w-100 d-flex flex-row align-items-center header fs-4"
      style={{
        height: "10vh",
        justifyContent: "space-between",
        letterSpacing: 15,
        backgroundColor: "white",
      }}
    >
      <div
        className="regular_text"
        style={{
          flex: "0 0 auto",
          order: -1,
          width: 0,
          display: "flex",
          flexDirection: "row",
          fontSize: "1.7rem",
          letterSpacing: "0",
        }}
      >
        <SlTooltip className="icon-button-reg" content="Archive">
          <SlIconButton
            className="ml-0-sm"
            name="archive"
            label="Storage"
            href="/archive"
          />
        </SlTooltip>
        <SlTooltip
          className="icon-button-reg display-none-sm"
          content="About"
          onClick={handleInfoClick}
        >
          <SlIconButton name="info-circle" label="About" />
        </SlTooltip>
      </div>
      <div className="d-flex flex-row align-items-center">
        <p
          className="m-0"
          style={{ cursor: "pointer" }}
          onClick={handleLogoClick}
        >
          grappy
        </p>
        <div
          className="d-flex"
          onClick={handleLogoClick}
          style={{ width: 100, flexDirection: "row", cursor: "pointer" }}
        >
          <div style={{ width: "50%" }}>
            <img
              src={logo1}
              alt="Logo1"
              style={{
                height: 50,
                transform: `rotate(${rotationAngle.left}deg)`,
                transition: "transform 0.7s",
              }}
            />
          </div>
          <div
            className="d-flex"
            style={{
              width: "40%",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <img
              src={logo2}
              alt="Logo2"
              style={{
                height: 23,
                transform: `rotate(${rotationAngle.top_right}deg)`,
                transition: "transform 0.3s",
              }}
            />
            <img
              src={logo3}
              alt="Logo3"
              style={{
                height: 23,
                transform: `rotate(${rotationAngle.bottom_left}deg)`,
                transition: "transform 0.7s",
              }}
            />
          </div>
        </div>
      </div>
      <div />
    </div>
  );
};

export default Header;
