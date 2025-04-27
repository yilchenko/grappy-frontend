import "canvas-toBlob";
import SlIcon from "@shoelace-style/shoelace/dist/react/icon";
import SlTooltip from "@shoelace-style/shoelace/dist/react/tooltip";
import { ExportProps, CustomCSSProperties } from "../types/types";

const Export: React.FC<ExportProps> = ({
  chartRef,
  generateLink,
  showAlert,
}) => {
  const downloadChartAsPng = (): void => {
    const canvas = chartRef.current.canvas;

    canvas.toBlob((blob: Blob | null) => {
      if (blob) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "chart.png";
        a.click();
        window.URL.revokeObjectURL(url);
      }
    });
  };

  const downloadChartAsSvg = (): void => {
    const canvas = chartRef.current.canvas;
    const img = new Image();
    img.src = canvas.toDataURL();

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", canvas.width.toString());
    svg.setAttribute("height", canvas.height.toString());

    const foreignObject = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "foreignObject"
    );
    foreignObject.setAttribute("width", "100%");
    foreignObject.setAttribute("height", "100%");
    foreignObject.appendChild(img);

    svg.appendChild(foreignObject);

    const svgString = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = window.URL.createObjectURL(svgBlob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "chart.svg";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div
      className="w-100 d-flex justify-content-center regular_text p-5"
      style={{
        height: "15%",
        backgroundColor: "#E2DBDA",
        borderRadius: 25,
        marginTop: 20,
      }}
    >
      <div
        className="d-flex flex-row justify-content-center align-items-center"
        style={{ flexBasis: "35%" }}
      >
        <span style={{ fontSize: 20 }}>Export:</span>
      </div>
      <div
        className="d-flex flex-row justify-content-center align-items-center"
        style={{ flexBasis: "65%" }}
      >
        <SlTooltip
          style={{ "--max-width": "180px" } as CustomCSSProperties}
          className="custom-tooltip"
          open={showAlert}
          trigger="manual"
        >
          <div slot="content" style={{ display: "flex", alignItems: "center" }}>
            <SlIcon style={{ fontSize: "32px" }} name="check2"></SlIcon>
            <span>
              Link copied to clipboard <strong>successfully</strong>
            </span>
          </div>
          <div
            className="d-flex justify-content-center align-items-center m-2 button_export"
            onClick={generateLink}
          >
            <span>link</span>
          </div>
        </SlTooltip>

        <div
          className="d-flex justify-content-center align-items-center m-2 button_export"
          onClick={downloadChartAsPng}
        >
          <span>PNG</span>
        </div>
        <div
          className="d-flex justify-content-center align-items-center m-2 button_export"
          onClick={downloadChartAsSvg}
        >
          <span>SVG</span>
        </div>
      </div>
    </div>
  );
};

export default Export;
