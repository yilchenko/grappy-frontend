import "./App.css";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { useState, useEffect, useRef } from "react";
import loadable from "@loadable/component";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import pMinDelay from "p-min-delay";
import SlSpinner from "@shoelace-style/shoelace/dist/react/spinner";
import { ChartData, ChartOptions } from "chart.js";
import { ChartType, ChartDataCustom } from "./view/types/types";
import Header from "./view/components/header";

const Home = loadable(() => pMinDelay(import("./view/pages/home"), 500), {
  fallback: (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "65vh",
      }}
    >
      <SlSpinner
        style={
          {
            "--indicator-color": "rgb(108, 104, 135)",
            fontSize: "4rem",
            "--track-width": "8px",
          } as any
        }
      />
    </div>
  ),
});

const Archive = loadable(() => pMinDelay(import("./view/pages/archive"), 500), {
  fallback: (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "65vh",
      }}
    >
      <SlSpinner
        style={
          {
            "--indicator-color": "rgb(108, 104, 135)",
            fontSize: "4rem",
            "--track-width": "8px",
          } as any
        }
      />
    </div>
  ),
});

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.0/cdn/"
);

interface RotationAngles {
  left: number;
  top_right: number;
  bottom_left: number;
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const rotationTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 0);

    return () => {
      clearTimeout(loadingTimeout);
      if (rotationTimeoutRef.current) {
        window.clearTimeout(rotationTimeoutRef.current);
      }
    };
  }, []);

  const [chartData, setChartData] = useState<ChartDataCustom>({
    labels: ["data#1", "data#2", "data#3", "data#4", "data#5"],
    datasets: [
      {
        label: "Sample Data",
        data: [300, 230, 600, 750, 1300],
        backgroundColor: ["#3E5141"],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  const [chartOptions, setChartOptions] = useState<ChartOptions>({
    scales: {
      x: {
        display: true,
        title: {
          display: false,
          text: "X-Axis Label",
        },
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        beginAtZero: true,
        title: {
          display: false,
          text: "Y-Axis Label",
        },
        ticks: {
          stepSize: 10,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
      title: {
        display: true,
        text: "My fancy chart",
        font: {
          size: 16,
          weight: "normal",
        },
      },
    },
    responsive: true,
  });

  const [type, setType] = useState<ChartType>("bar");

  const [rotationAngle, setRotationAngle] = useState<RotationAngles>({
    left: 0,
    top_right: 0,
    bottom_left: 0,
  });

  const handleRotation = (): void => {
    if (isRotating) {
      return;
    }

    setIsRotating(true);

    setRotationAngle((prevRotationAngle) => ({
      ...prevRotationAngle,
      left: Math.floor(Math.random() * 360) + -360,
      top_right: Math.floor(Math.random() * 360) + 360,
      bottom_left: Math.floor(Math.random() * 360) - 360,
    }));

    rotationTimeoutRef.current = window.setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };

  const handleAppClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    if ((e.target as HTMLElement).tagName !== "SL-INPUT") {
      handleRotation();
    }
  };

  const handleWheel = (): void => {
    handleRotation();
  };

  return (
    <div className="App" onClick={handleAppClick} onWheel={handleWheel}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Router>
          <Header rotationAngle={rotationAngle} />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  chartData={chartData}
                  setChartData={setChartData}
                  type={type}
                  setType={setType}
                  chartOptions={chartOptions}
                  setChartOptions={setChartOptions}
                />
              }
            />
            <Route
              path="/archive"
              element={
                <Archive
                  setChartData={setChartData}
                  setType={setType}
                  setChartOptions={setChartOptions}
                />
              }
            />
          </Routes>
        </Router>
      )}
    </div>
  );
};

export default App;
