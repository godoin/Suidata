const getChartOptions = () => {
  const ageData = [
    { x: "15-24 years", y: 164506.0 },
    { x: "25-34 years", y: 191957.0 },
    { x: "35-54 years", y: 359443.0 },
    { x: "5-14 years", y: 11310.0 },
    { x: "55-74 years", y: 229340.0 },
    { x: "75+ years", y: 84737.0 },
  ];

  const labels = ageData.map((item) => item.x);
  const series = ageData.map((item) => item.y);

  return {
    series: series,
    colors: ["#1C64F2", "#16BDCA", "#9061F9", "#F4CA8F", "#F96B61", "#6BF961"],
    chart: {
      height: 420,
      width: "100%",
      type: "pie",
    },
    stroke: {
      colors: ["white"],
      lineCap: "",
    },
    plotOptions: {
      pie: {
        labels: {
          show: true,
        },
        size: "100%",
        dataLabels: {
          offset: -25,
        },
      },
    },
    labels: labels,
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value;
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value;
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  };
};

if (document.getElementById("pie-chart") && typeof ApexCharts !== "undefined") {
  const chart = new ApexCharts(
    document.getElementById("pie-chart"),
    getChartOptions()
  );
  chart.render();
}
