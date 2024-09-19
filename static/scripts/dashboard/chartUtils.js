export const createOptionsBySex = (maleMortality, femaleMortality) => {
  return {
    series: [maleMortality, femaleMortality],
    chart: {
      width: "100%",
      height: "100%",
      type: "donut",
    },
    labels: ["Male", "Female"],
    theme: {
      monochrome: {
        enabled: true,
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
      },
    },
    grid: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    dataLabels: {
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(1) + "%"];
      },
    },
    legend: {
      show: true,
      position: "bottom",
    },
  };
};

export const createOptionsByAge = (...ageGroups) => {
  return {
    series: [...ageGroups],
    chart: {
      width: "100%",
      height: "100%",
      type: "donut",
    },
    labels: [
      "5 to 14 years",
      "15 to 24 years",
      "25 to 34 years",
      "35 to 54 years",
      "55 to 74 years",
      "75+ years",
    ],
    theme: {
      monochrome: {
        enabled: true,
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
      },
    },
    grid: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    dataLabels: {
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(1) + "%"];
      },
    },
    legend: {
      show: true,
      position: "bottom",
    },
  };
};

export const createOptionsByMortalityByYear = (
  totalMortality,
  maleMortality,
  femaleMortality,
  years
) => {
  return {
    series: [
      {
        name: "Total Mortality",
        data: [...totalMortality],
      },
      {
        name: "Male Mortality",
        data: [...maleMortality],
      },
      {
        name: "Female Mortality",
        data: [...femaleMortality],
      },
    ],
    chart: {
      height: "100%",
      width: "100%",
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
        export: {
          csv: {
            filename: "mortality_rates",
            columnDelimiter: ",",
            headerCategory: "Year",
            headerValue: "Value",
          },
          svg: {
            filename: "mortality_chart_svg",
          },
          png: {
            filename: "mortality_chart_png",
          },
        },
      },
    },
    // title: {
    //   text: "Mortality Rates Per Year",
    //   align: "left",
    // },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [...years],
    },
    legend: {
      position: "bottom",
    },
  };
};
