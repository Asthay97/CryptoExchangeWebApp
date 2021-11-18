export const historyOptions = {
  lineHeightAnnotation: {
    always: true,
    hover: true,
    lineWeight: 0.2,
  },

  animation: {
    duration: 1000,
  },
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    xAxes: [
      {
        type: "time",
        distribution: "linear",
      },
    ],
  },
};
