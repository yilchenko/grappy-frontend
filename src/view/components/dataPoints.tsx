import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SlInput from "@shoelace-style/shoelace/dist/react/input";
import SlTooltip from "@shoelace-style/shoelace/dist/react/tooltip";
import deleteData from "./../assets/imgs/delete_data.png";
import plus from "./../assets/imgs/plus.png";
import { DataPointsProps, DragItem } from "../types/types";

const getRandomInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const DataPoints: React.FC<DataPointsProps> = ({
  labelData,
  valueData,
  setChartData,
}) => {
  const handleFocus = (e: any): void => {
    (e.target as HTMLInputElement).select();
  };

  const handleLabelChange = (e: CustomEvent, index: number): void => {
    const newLabelData = [...labelData];
    newLabelData[index] = (e.target as HTMLInputElement).value;

    if (newLabelData[index].length < 12) {
      setChartData((prevChartData: any) => ({
        ...prevChartData,
        labels: newLabelData,
      }));
    } else {
      setChartData((prevChartData: any) => ({
        ...prevChartData,
      }));
    }
  };

  const handleValueChange = (e: CustomEvent, index: number): void => {
    const newValueData = [...valueData];
    newValueData[index] = parseInt((e.target as HTMLInputElement).value);

    if (
      !isNaN(newValueData[index]) &&
      newValueData[index] !== undefined &&
      newValueData[index] < 100000 &&
      newValueData[index] > -100000
    ) {
      setChartData((prevChartData: any) => ({
        ...prevChartData,
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: newValueData,
          },
        ],
      }));
    } else {
      setChartData((prevChartData: any) => ({
        ...prevChartData,
      }));
    }
  };

  const addDataPoint = (newLabel: string, newData: number): void => {
    setChartData((prevChartData: any) => ({
      ...prevChartData,
      labels: [...prevChartData.labels, newLabel],
      datasets: [
        {
          ...prevChartData.datasets[0],
          data: [...prevChartData.datasets[0].data, newData],
        },
      ],
    }));
  };

  const removeDataPoint = (indexToRemove: number): void => {
    setChartData((prevChartData: any) => {
      const updatedLabels = [...prevChartData.labels];
      updatedLabels.splice(indexToRemove, 1);

      const updatedData = [...prevChartData.datasets[0].data];
      updatedData.splice(indexToRemove, 1);

      return {
        ...prevChartData,
        labels: updatedLabels,
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: updatedData,
          },
        ],
      };
    });
  };

  const DraggableItem: React.FC<{ index: number }> = ({ index }) => {
    const [{ isDragging }, ref] = useDrag(() => ({
      type: "DATA_ITEM",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    const [, drop] = useDrop({
      accept: "DATA_ITEM",
      hover: (draggedItem: DragItem) => {
        if (draggedItem.index !== index) {
          const newLabelData = [...labelData];
          const newValueData = [...valueData];

          const movedLabel = newLabelData.splice(draggedItem.index, 1)[0];
          const movedValue = newValueData.splice(draggedItem.index, 1)[0];

          newLabelData.splice(index, 0, movedLabel);
          newValueData.splice(index, 0, movedValue);

          setChartData((prevChartData: any) => ({
            ...prevChartData,
            labels: newLabelData,
            datasets: [
              {
                ...prevChartData.datasets[0],
                data: newValueData,
              },
            ],
          }));

          draggedItem.index = index;
        }
      },
    });

    return (
      <div className="d-flex flex-row align-items-center justify-content-center w-100 data-item">
        <div
          ref={(node) => ref(drop(node))}
          className="d-flex flex-row w-100 align-items-center justify-content-center my-1"
          style={{
            backgroundColor: "#6C6887",
            borderRadius: "15px",
            height: 35,
            color: "white",
          }}
        >
          <span>Name:</span>
          <SlTooltip style={{ textAlign: "start" }}>
            <div slot="content">
              Changes the <strong>name</strong> of a data point.
              <br />
              Names are displayed on the <i>bottom</i> of the chart.
              <br />
              Limited to{" "}
              <strong>
                <i>12</i>
              </strong>{" "}
              letters.
            </div>
            <SlInput
              className="medium-input regular_text"
              value={labelData[index]}
              onFocus={handleFocus as any}
              onSlChange={(e) => handleLabelChange(e, index)}
            />
          </SlTooltip>
          <span className="ms-3">Value:</span>
          <SlTooltip style={{ textAlign: "start" }}>
            <div slot="content">
              Changes the <strong>value</strong> of a data point.
              <br />
              Values are displayed on the <i>left</i> of the chart.
              <br />
              Іs defined from{" "}
              <strong>
                <i>-10k</i>
              </strong>{" "}
              to{" "}
              <strong>
                <i>10k</i>
              </strong>
              .
            </div>
            <SlInput
              className="small-input regular_text"
              value={valueData[index].toString()}
              onFocus={handleFocus}
              onSlChange={(e) => handleValueChange(e, index)}
            />
          </SlTooltip>
        </div>
        <SlTooltip style={{ textAlign: "start", "--max-width": "90px" } as any}>
          <div slot="content">
            <strong>Removes</strong> a data point.
          </div>
          <img
            className="ms-1"
            src={deleteData}
            alt="delete_data"
            style={{ height: 15, cursor: "pointer" }}
            onClick={() => removeDataPoint(index)}
          />
        </SlTooltip>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="w-100 d-flex align-items-center regular_text py-3"
        style={{ height: "auto", flexDirection: "column", color: "black" }}
      >
        <span style={{ fontSize: 20 }}>Data points:</span>
        {labelData.map((_, index) => (
          <DraggableItem index={index} key={index} />
        ))}
        <div
          className="button_add d-flex flex-row justify-content-center align-items-center mt-3"
          onClick={() => {
            addDataPoint(
              `data#${labelData.length + 1}`,
              getRandomInteger(100, 1500)
            );
          }}
        >
          <span>Add data point</span>
          <img className="ms-2" src={plus} alt="Plus" style={{ height: 10 }} />
        </div>
      </div>
    </DndProvider>
  );
};

export default DataPoints;
