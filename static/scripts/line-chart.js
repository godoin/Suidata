const data = [
  { year: 1979, sex: "female", total_suicides: 3652.0 },
  { year: 1979, sex: "male", total_suicides: 8755.0 },
  { year: 1980, sex: "female", total_suicides: 4806.0 },
  { year: 1980, sex: "male", total_suicides: 11977.0 },
  { year: 1981, sex: "female", total_suicides: 5383.0 },
  { year: 1981, sex: "male", total_suicides: 14834.0 },
  { year: 1982, sex: "female", total_suicides: 5142.0 },
  { year: 1982, sex: "male", total_suicides: 15249.0 },
  { year: 1983, sex: "female", total_suicides: 4928.0 },
  { year: 1983, sex: "male", total_suicides: 13210.0 },
  { year: 1984, sex: "female", total_suicides: 4956.0 },
  { year: 1984, sex: "male", total_suicides: 14306.0 },
  { year: 1985, sex: "female", total_suicides: 5811.0 },
  { year: 1985, sex: "male", total_suicides: 17286.0 },
  { year: 1986, sex: "female", total_suicides: 6747.0 },
  { year: 1986, sex: "male", total_suicides: 18807.0 },
  { year: 1987, sex: "female", total_suicides: 6775.0 },
  { year: 1987, sex: "male", total_suicides: 19419.0 },
  { year: 1988, sex: "female", total_suicides: 6534.0 },
  { year: 1988, sex: "male", total_suicides: 18769.0 },
  { year: 1989, sex: "female", total_suicides: 6295.0 },
  { year: 1989, sex: "male", total_suicides: 18957.0 },
  { year: 1990, sex: "female", total_suicides: 6296.0 },
  { year: 1990, sex: "male", total_suicides: 18945.0 },
  { year: 1991, sex: "female", total_suicides: 6053.0 },
  { year: 1991, sex: "male", total_suicides: 19754.0 },
  { year: 1992, sex: "female", total_suicides: 7051.0 },
  { year: 1992, sex: "male", total_suicides: 21506.0 },
  { year: 1993, sex: "female", total_suicides: 7127.0 },
  { year: 1993, sex: "male", total_suicides: 22343.0 },
  { year: 1994, sex: "female", total_suicides: 7188.0 },
  { year: 1994, sex: "male", total_suicides: 23136.0 },
  { year: 1995, sex: "female", total_suicides: 7169.0 },
  { year: 1995, sex: "male", total_suicides: 23769.0 },
  { year: 1996, sex: "female", total_suicides: 6962.0 },
  { year: 1996, sex: "male", total_suicides: 24463.0 },
  { year: 1997, sex: "female", total_suicides: 7087.0 },
  { year: 1997, sex: "male", total_suicides: 24392.0 },
  { year: 1998, sex: "female", total_suicides: 7237.0 },
  { year: 1998, sex: "male", total_suicides: 25303.0 },
  { year: 1999, sex: "female", total_suicides: 6770.0 },
  { year: 1999, sex: "male", total_suicides: 25217.0 },
  { year: 2000, sex: "female", total_suicides: 7138.0 },
  { year: 2000, sex: "male", total_suicides: 25752.0 },
  { year: 2001, sex: "female", total_suicides: 7377.0 },
  { year: 2001, sex: "male", total_suicides: 26830.0 },
  { year: 2002, sex: "female", total_suicides: 7432.0 },
  { year: 2002, sex: "male", total_suicides: 26255.0 },
  { year: 2003, sex: "female", total_suicides: 7304.0 },
  { year: 2003, sex: "male", total_suicides: 26528.0 },
  { year: 2004, sex: "female", total_suicides: 6629.0 },
  { year: 2004, sex: "male", total_suicides: 23250.0 },
  { year: 2005, sex: "female", total_suicides: 6182.0 },
  { year: 2005, sex: "male", total_suicides: 21543.0 },
  { year: 2006, sex: "female", total_suicides: 6395.0 },
  { year: 2006, sex: "male", total_suicides: 23229.0 },
  { year: 2007, sex: "female", total_suicides: 7074.0 },
  { year: 2007, sex: "male", total_suicides: 25371.0 },
  { year: 2008, sex: "female", total_suicides: 7282.0 },
  { year: 2008, sex: "male", total_suicides: 26324.0 },
  { year: 2009, sex: "female", total_suicides: 7166.0 },
  { year: 2009, sex: "male", total_suicides: 26752.0 },
  { year: 2010, sex: "female", total_suicides: 7293.0 },
  { year: 2010, sex: "male", total_suicides: 26566.0 },
  { year: 2011, sex: "female", total_suicides: 7244.0 },
  { year: 2011, sex: "male", total_suicides: 26342.0 },
  { year: 2012, sex: "female", total_suicides: 6905.0 },
  { year: 2012, sex: "male", total_suicides: 24145.0 },
  { year: 2013, sex: "female", total_suicides: 7067.0 },
  { year: 2013, sex: "male", total_suicides: 25357.0 },
  { year: 2014, sex: "female", total_suicides: 6294.0 },
  { year: 2014, sex: "male", total_suicides: 22953.0 },
  { year: 2015, sex: "female", total_suicides: 5972.0 },
  { year: 2015, sex: "male", total_suicides: 20986.0 },
  { year: 2016, sex: "female", total_suicides: 484.0 },
  { year: 2016, sex: "male", total_suicides: 1506.0 },
];

const lineOptions = {
  chart: {
    height: "100%",
    maxWidth: "100%",
    type: "line",
    fontFamily: "Inter, sans-serif",
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
    x: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 6,
  },
  grid: {
    show: true,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: -26,
    },
  },
  series: [
    {
      name: "Male",
      data: data
        .filter((entry) => entry.sex === "male")
        .map(({ year, total_suicides }) => ({
          x: year.toString(),
          y: total_suicides,
        })),
      color: "#2563eb",
    },
    {
      name: "Female",
      data: data
        .filter((entry) => entry.sex === "female")
        .map(({ year, total_suicides }) => ({
          x: year.toString(),
          y: total_suicides,
        })),
      color: "#db2777",
    },
  ],
  legend: {
    show: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    categories: [
      "01 Feb",
      "02 Feb",
      "03 Feb",
      "04 Feb",
      "05 Feb",
      "06 Feb",
      "07 Feb",
    ],
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
};

if (
  document.getElementById("line-chart") &&
  typeof ApexCharts !== "undefined"
) {
  const chart = new ApexCharts(
    document.getElementById("line-chart"),
    lineOptions
  );
  chart.render();
}
