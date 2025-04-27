import { ChartData, ChartOptions } from "chart.js";

export interface ArchiveCardProps {
  data: {
    data: ChartData<"pie" | "bar" | "line" | "radar">;
    options: ChartOptions<"pie" | "bar" | "line" | "radar">;
    type: "pie" | "bar" | "line" | "radar";
    timestamp: string;
  };
  deleteChart: () => void;
  editChart: () => void;
}

export interface ChartDataCustom extends ChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string | string[];
    borderColor?: string;
    borderWidth?: number;
    [key: string]: any;
  }>;
}

export interface BodyProps {
  chartData: ChartDataCustom;
  setChartData: (
    data: ChartDataCustom | ((prevData: ChartDataCustom) => ChartDataCustom)
  ) => void;
  type: "pie" | "bar" | "line" | "radar";
  setType: (type: "pie" | "bar" | "line" | "radar") => void;
  chartOptions: ChartOptions;
  setChartOptions: (
    options: ChartOptions | ((prevOptions: ChartOptions) => ChartOptions)
  ) => void;
}

export interface ChartDisplayProps {
  chartData: ChartData<"pie" | "bar" | "line" | "radar">;
  chartOptions: ChartOptions<"pie" | "bar" | "line" | "radar">;
  type: keyof Pick<any, "pie" | "bar" | "line" | "radar">;
  chartRef: React.RefObject<any>;
}

export interface DataPointsProps {
  labelData: string[];
  valueData: number[];
  setChartData: (data: any) => void;
}

export interface ExportProps {
  chartRef: React.RefObject<any>;
  generateLink: () => void;
  showAlert: boolean;
}

export interface HeaderProps {
  rotationAngle: {
    left: number;
    top_right: number;
    bottom_left: number;
  };
}

export interface DragItem {
  index: number;
  type: string;
}

export interface HeaderProps {
  rotationAngle: {
    left: number;
    top_right: number;
    bottom_left: number;
  };
}

export interface PropertiesProps {
  chartData: ChartData;
  setChartData: (
    data: ChartData | ((prevData: ChartData) => ChartData)
  ) => void;
  chartOptions: ChartOptions;
  setChartOptions: (
    options: ChartOptions | ((prevOptions: ChartOptions) => ChartOptions)
  ) => void;
}

export interface Colors {
  normal: string;
  lighter: boolean;
}

export interface ValidationConfig {
  dataType: "number" | "string";
  min?: number;
  max?: number;
  maxLength?: number;
}

export const validationCFG: Record<string, ValidationConfig> = {
  border: {
    dataType: "number",
    min: 0,
    max: 15,
  },
  title: {
    dataType: "string",
    maxLength: 15,
  },
};

export type ChartType = "pie" | "bar" | "line" | "radar";

export interface TypeBarProps {
  type: ChartType;
  setType: (type: ChartType) => void;
}

export interface CustomCSSProperties extends React.CSSProperties {
  "--max-width"?: string;
}

export interface SlInputElement extends HTMLElement {
  value: string;
  select: () => void;
}

export type SlInputFocusEvent = FocusEvent & {
  target: SlInputElement;
};
