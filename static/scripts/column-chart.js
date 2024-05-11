const options = {
  colors: ["#EF4444"],
  series: [
    {
      name: "Number of Suicides",
      data: [
        { x: "Albania", y: 1970.0 },
        { x: "Antigua and Barbuda", y: 11.0 },
        { x: "Argentina", y: 93862.0 },
        { x: "Armenia", y: 2422.0 },
        { x: "Aruba", y: 120.0 },
        { x: "Australia", y: 80279.0 },
        { x: "Austria", y: 60179.0 },
        { x: "Azerbaijan", y: 3366.0 },
        { x: "Bahamas", y: 107.0 },
        { x: "Bahrain", y: 463.0 },
        { x: "Barbados", y: 205.0 },
        { x: "Belarus", y: 74974.0 },
        { x: "Belgium", y: 75948.0 },
        { x: "Belize", y: 352.0 },
        { x: "Bermuda", y: 6.0 },
        { x: "Bosnia and Herzegovina", y: 3591.0 },
        { x: "Brazil", y: 250824.0 },
        { x: "Brunei Darussalam", y: 123.0 },
        { x: "Bulgaria", y: 42868.0 },
        { x: "Cabo Verde", y: 42.0 },
        { x: "Canada", y: 128382.0 },
        { x: "Cayman Islands", y: 0.0 },
        { x: "Chile", y: 44126.0 },
        { x: "Colombia", y: 54136.0 },
        { x: "Costa Rica", y: 7346.0 },
        { x: "Croatia", y: 29400.0 },
        { x: "Cuba", y: 41418.0 },
        { x: "Cyprus", y: 412.0 },
        { x: "Czech Republic", y: 44361.0 },
      ],
    },
  ],
  chart: {
    type: "bar",
    height: "320px",
    fontFamily: "Inter, sans-serif",
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "70%",
      borderRadiusApplication: "end",
      borderRadius: 8,
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
    style: {
      fontFamily: "Inter, sans-serif",
    },
  },
  states: {
    hover: {
      filter: {
        type: "darken",
        value: 1,
      },
    },
  },
  stroke: {
    show: true,
    width: 0,
    colors: ["transparent"],
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: -14,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  xaxis: {
    floating: false,
    labels: {
      show: true,
      style: {
        fontFamily: "Inter, sans-serif",
        cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  fill: {
    opacity: 1,
  },
};

if (
  document.getElementById("column-chart") &&
  typeof ApexCharts !== "undefined"
) {
  const chart = new ApexCharts(
    document.getElementById("column-chart"),
    options
  );
  chart.render();
}
