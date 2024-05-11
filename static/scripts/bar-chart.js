const options = {
  series: [
    {
      name: "Total Mortality Rate",
      color: "#EF4444",
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
    sparkline: {
      enabled: false,
    },
    type: "bar",
    width: "100%",
    height: 700,
    toolbar: {
      show: false,
    },
  },
  fill: {
    opacity: 1,
  },
  plotOptions: {
    bar: {
      horizontal: true,
      columnWidth: "100%",
      borderRadiusApplication: "end",
      borderRadius: 6,
      dataLabels: {
        position: "top",
      },
    },
  },
  legend: {
    show: true,
    position: "bottom",
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    shared: true,
    intersect: false,
    formatter: function (value) {
      return value;
    },
  },
  xaxis: {
    labels: {
      show: true,
      style: {
        fontFamily: "Inter, sans-serif",
        cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
      },
      formatter: function (value) {
        return value;
      },
    },
    categories: [],
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: true,
      style: {
        fontFamily: "Inter, sans-serif",
        cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
      },
    },
  },
  grid: {
    show: true,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: -20,
    },
  },
  fill: {
    opacity: 1,
  },
};

options.xaxis.categories = options.series[0].data.map((item) => item.x);

if (document.getElementById("bar-chart") && typeof ApexCharts !== "undefined") {
  const chart = new ApexCharts(document.getElementById("bar-chart"), options);
  chart.render();
}
