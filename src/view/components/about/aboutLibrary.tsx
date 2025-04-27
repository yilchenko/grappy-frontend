import React from "react";

import bar_chart from "./../../assets/imgs/about/bar_chart.svg";
import ColoredLetters from "./coloredLetters";

const AboutLibrary: React.FC = () => {
  const code = `
npm install react-grappy
# or
yarn add react-grappy


import Grappy from 'react-grappy';

function App() {
  const grappyProjectURL = 'https://your-grappy-project-url.com';

  return (
    <div>
      <h1>Your React App</h1>
      <Grappy projectURL={grappyProjectURL} />
    </div>
  );
}

export default App;`;

  return (
    <div
      className="mt-5 header_text about-wrapper text-start"
      style={{ height: "80vh", minHeight: "500px" }}
    >
      <div className="about-col px-3" style={{ padding: 50 }}>
        <div
          style={{
            border: "2px black solid",
            width: "100%",
            height: "100%",
            overflowY: "auto",
            padding: "0 0 0 4%",
          }}
        >
          <pre>
            <code
              className="language-javascript"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {code}
            </code>
          </pre>
        </div>
      </div>
      <div className="about-col px-3">
        <p className="font-title">
          Seamless{" "}
          <ColoredLetters
            letters="Integration"
            colorXAmount={3}
            colorYAmount={2}
          />
        </p>
        <p className="regular_text font-small">
          At Grappy, we understand the importance of seamless integration with
          popular web development frameworks. That's why we've created{" "}
          <strong>
            <em>react-grappy</em>
          </strong>
          , a powerful React library that enables you to effortlessly export
          graphs created in Grappy directly into your web application.
        </p>
        <img
          loading="lazy"
          src={bar_chart}
          alt="Bar_chart"
          style={{
            width: "70%",
            marginLeft: "15%",
            marginTop: 20,
          }}
        />
      </div>
    </div>
  );
};

export default AboutLibrary;
