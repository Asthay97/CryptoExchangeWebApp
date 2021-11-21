import React, { useRef, useEffect, useState } from "react";
import Chartjs from "chart.js";
import { historyOptions } from "./chartConfigs";
import "../styles/HistoryChart.css";

const HistoryChart = ({ data }) => {
  const chartRef = useRef();
  const { day, week, year, detail } = data;
  const [timeFormat, setTimeFormat] = useState("24h");

  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "1d":
        return day;
      case "1w":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  useEffect(() => {
    if (chartRef && chartRef.current && detail) {
      new Chartjs(chartRef.current, {
        type: "line",
        data: {
          datasets: [
            {
              label: `${detail.name} price`,
              data: determineTimeFormat(),
              backgroundColor: "rgba(175, 0, 0, 0.1)",
              borderColor: "rgba(174, 0, 0, 0.6)",
              pointRadius: 0,
              fill: true,
            },
          ],
        },
        options: {
          ...historyOptions,
        },
      });
    }
  });

  const renderPrice = () => {
    if (detail) {
      return (
        <>
          <p className="my-0">${detail.current_price.toFixed(2)}</p>
          <p
            className={
              detail.price_change_24h < 0
                ? "text-danger my-0"
                : "text-success my-0"
            }
          >
            {detail.price_change_percentage_24h.toFixed(2)}%
          </p>
        </>
      );
    }
  };
  return (
    <div className="chart">
      <div className="chart_price">{renderPrice()}</div>
      <div className="chart-ref">
        <canvas ref={chartRef} id="myChart"></canvas>
      </div>

      <div className="chart-button mt-1">
        <button
          onClick={() => setTimeFormat("1d")}
          className="btn btn-outline-secondary btn-sm"
        >
          1d
        </button>
        <button
          onClick={() => setTimeFormat("1w")}
          className="btn btn-outline-secondary btn-sm mx-1"
        >
          1w
        </button>
        <button
          onClick={() => setTimeFormat("1y")}
          className="btn btn-outline-secondary btn-sm"
        >
          1y
        </button>
      </div>
    </div>
  );
};

export default HistoryChart;
