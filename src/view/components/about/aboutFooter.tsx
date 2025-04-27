import React from "react";

import logo_grayscale from "./../../assets/imgs/logo_yilch.png";
import ColoredLetters from "./coloredLetters";

const AboutFooter: React.FC = () => {
  return (
    <div
      className="mt-5 header_text footer-wrapper text-start"
      style={{ height: "80vh", minHeight: "500px" }}
    >
      <h3 className="footer-title">
        <ColoredLetters letters="grappy" colorXAmount={2} colorYAmount={1} /> -
        Where Creativity Flows Smoothly.
      </h3>
      <div
        className="footer-left-wrapper text-end"
        style={{ marginTop: "30vh" }}
      >
        <div
          className="regular_text px-2 align-items-center d-flex"
          style={{
            borderRight: "2px gray solid",
            width: "65%",
            height: "20vh",
            fontSize: 13,
            lineHeight: "14px",
          }}
        >
          <p className="m-0">
            Approach with curiosity and remember, your data deserves to be
            celebrated. Thank you for joining me on this imaginative journey
            through the realms of data and design.
            <br /> <strong>All rights reserved.</strong>
          </p>
        </div>
        <div
          className="justify-content-center align-items-start d-flex px-3"
          style={{
            width: "35%",
            height: "20vh",
            flexDirection: "column",
          }}
        >
          <img
            loading="lazy"
            src={logo_grayscale}
            alt="Logo_grayscale"
            style={{ width: "55%" }}
          />

          {/* <div
            className="justify-content-start align-items-start d-flex w-100"
            style={{ flexDirection: "column" }}
          >
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=yilchenko@tutanota.com"
              target="_blank"
              rel="noopener noreferrer"
              className="regular_text"
              style={{
                color: "gray",
                fontSize: 13,
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              contact
            </a>
            <span
              className="regular_text"
              style={{
                color: "gray",
                fontSize: 13,
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              more projects
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AboutFooter;
