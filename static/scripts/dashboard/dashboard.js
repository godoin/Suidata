/**
 * Dashboard.js
 */

import {
  getHighestMortalityPerCountry,
  getHighestMortalityPerYear,
  getHighestMortalityPerSex,
  getHighestMortalityPerAgeGroup,
} from "./dashboardUtils.js";

let dashboardGeoJson;
let dashboardMap = L.map("dashboardMap", {zoomControl: false, dragging: false, scrollWheelZoom: false});
let dashboardTiles;
let dashboardInfo = L.control();
let selectedDashYear = "All";

const getSummaryDetails = async (dataJsonUrl) => {
  const data = await fetch(dataJsonUrl)
    .then((res) => res.json())
    .catch((err) => console.error(`Error fetching data: ${err}`));

  const highestMortalityPerYear = getHighestMortalityPerYear(data);
  const highestMortalityPerCountry = getHighestMortalityPerCountry(data);
  const highestMortalityPerSex = getHighestMortalityPerSex(data);
  const highestMortalityPerAgeGroup = getHighestMortalityPerAgeGroup(data);

  // console.log(`Mortality Per Year: ${highestMortalityPerYear.year} ~ ${highestMortalityPerYear.total_mortality}`);
  // console.log(`Mortality Per Country: ${highestMortalityPerCountry.name} ~ ${highestMortalityPerCountry.total_mortality}`);
  // console.log(`Mortality Per Sex: ${highestMortalityPerSex.sex} ~ ${highestMortalityPerSex.mortality}`);
  // console.log(`Mortality Per Ages: ${highestMortalityPerAgeGroup.sex} ~ ${highestMortalityPerSex.mortality}`);

  return {
    highestMortalityPerYear: {
      year: highestMortalityPerYear.year,
      mortality: highestMortalityPerYear.total_mortality
    },
    highestMortalityPerSex: {
      sex: highestMortalityPerSex.sex,
      mortality: highestMortalityPerSex.mortality
    },
    highestMortalityPerCountry: {
      name: highestMortalityPerCountry.name,
      mortality: highestMortalityPerCountry.total_mortality
    },
    highestMortalityPerAgeGroup: {
      age: highestMortalityPerAgeGroup.age,
      mortality: highestMortalityPerAgeGroup.mortality
    }
  };
};

const renderSummaryToDOM = (summaryData) => {
  const year = document.getElementById("year-column");
  const country = document.getElementById("country-column");
  const age = document.getElementById("age-column");
  const sex = document.getElementById("sex-column");

  const yearNumber = year.querySelector(".number");
  const yearValue = year.querySelector(".value");
  yearNumber.textContent = `${summaryData.highestMortalityPerYear.mortality}`;
  yearValue.textContent = `${summaryData.highestMortalityPerYear.year}`;

  const countryNumber = country.querySelector(".number");
  const countryValue = country.querySelector(".value");
  countryNumber.textContent = `${summaryData.highestMortalityPerCountry.mortality}`;
  countryValue.textContent = `${summaryData.highestMortalityPerCountry.name}`;

  const ageNumber = age.querySelector(".number");
  const ageValue = age.querySelector(".value");
  ageNumber.textContent = `${summaryData.highestMortalityPerAgeGroup.mortality}`;
  ageValue.textContent = `${summaryData.highestMortalityPerAgeGroup.age}`;

  const sexNumber = sex.querySelector(".number");
  const sexValue = sex.querySelector(".value");
  sexNumber.textContent = `${summaryData.highestMortalityPerSex.mortality}`;
  sexValue.textContent = `${summaryData.highestMortalityPerSex.sex}`;
}

const highestMortalityBarGraph = async (dataJsonUrl) => {
  const container = document.getElementById("mortality-countries");

  const countries = await fetch(dataJsonUrl)
    .then((res) => res.json())
    .catch((error) => console.error("Error fetching data:", error));

  const getHighestMortalityPerCountryBarGraph = countries
    .filter((country) => country.name !== "All" && country.year === "All")
    .sort((a, b) => b.total_mortality - a.total_mortality)
    .slice(0, 8);

  const maxMortality = Math.max(...getHighestMortalityPerCountryBarGraph.map(country => country.total_mortality))

  container.innerHTML = "";

  getHighestMortalityPerCountryBarGraph.forEach(country => {
    const percentage = ((country.total_mortality / maxMortality) * 100)
    const renderedGroup = renderGroup(country.name, country.total_mortality, percentage);
    container.innerHTML += renderedGroup;
  })

  // console.table(getHighestMortalityPerCountryBarGraph);
};

const renderGroup = (name, value, percentage) => `
  <div class="group">
    <div class="detail">
        <span class="name">${name}</span>
        <span class="value">${value || "N/A"}</span>
    </div>
    <div class="bar" id="${name.toLowerCase().replace(/\s+/g, "")}">
        <div class="percentage" style="width: ${percentage}%;"></div>
    </div>
  </div>
`;


const mapDataLoading = async (mapJsonUrl, dataJsonUrl) => {
  dashboardMap.setView([0, 0], 0);
  dashboardTiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(dashboardMap);   


  const data = await fetch(mapJsonUrl)
    .then(res => res.json())
    .catch(err => console.error(`Error fetching JSON data: ${err}`));

  L.geoJson(data).addTo(dashboardMap);

  highestMortalityBarGraph(dataJsonUrl);
};

const summaryDataLoading = async (dataJsonUrl) => {
  const summaryData = await getSummaryDetails(dataJsonUrl);
  renderSummaryToDOM(summaryData);
}

const barGraphDataLoading = async (dataJsonUrl) => {
  const countries = await fetch(dataJsonUrl)
    .then(res => res.json())
    .catch(err => console.error(`Error fetching JSON data: ${err}`));

  const allCountriesByAllYears = countries
    .find((country) => country.name === "All" && country.year === "All");


  const maleMortality = allCountriesByAllYears.male;
  const femaleMortality = allCountriesByAllYears.female;
  const ageGroupOne = allCountriesByAllYears.age_group_5_to_14;
  const ageGroupTwo = allCountriesByAllYears.age_group_15_to_24;
  const ageGroupThree = allCountriesByAllYears.age_group_25_to_34;
  const ageGroupFour = allCountriesByAllYears.age_group_35_to_54;
  const ageGroupFive = allCountriesByAllYears.age_group_55_to_74;
  const ageGroupSix = allCountriesByAllYears.age_group_75_plus;
  
  var optionsBySex = {
    series: [maleMortality, femaleMortality],
    chart: {
      width: '100%',
      height: '100%',
      type: 'pie',
    },
    labels: [
      'Male',
      'Female',
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
        return [name, val.toFixed(1) + '%'];
      },
    },
    legend: {
      show: false,
    },
  };

  var optionsByAge = {
    series: [ageGroupOne, ageGroupTwo, ageGroupThree, ageGroupFour, ageGroupFive, ageGroupSix],
    chart: {
      width: '100%',
      height: '100%',
      type: 'pie',
    },
    labels: [
      '5 to 14 years',
      '15 to 24 years',
      '25 to 34 years',
      '35 to 54 years',
      '55 to 74 years',
      '75+ years',
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
        return [name, val.toFixed(1) + '%'];
      },
    },
    legend: {
      show: false,
    },
  };

  var chartBySex = new ApexCharts(document.querySelector("#sex-chart"), optionsBySex);
  var chartByAge = new ApexCharts(document.querySelector("#age-chart"), optionsByAge);
  chartBySex.render();
  chartByAge.render();
};

const lineGraphDataLoading = async (dataJsonUrl) => {
  const countries = await fetch(dataJsonUrl)
    .then(res => res.json())
    .catch(err => console.error(`Error fetching JSON data: ${err}`));
  
  const allCountriesByYears = countries
    .filter((country) => country.name === "All" && country.year !== "All")

  const totalMortality = allCountriesByYears.map(country => country.total_mortality);
  const years = allCountriesByYears.map(country => country.year);
  const maleMortality = allCountriesByYears.map(country => country.male)
  const femaleMortality = allCountriesByYears.map(country => country.female)

  console.table(allCountriesByYears);

  var options = {
    series: [
      {
        name: "Total Mortality",
        data: [...totalMortality]
      },
      {
        name: "Male Mortality",
        data: [...maleMortality]
      },
      {
        name: "Female Mortality",
        data: [...femaleMortality]
      }
    ],
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Mortality Rates Per Year',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      }
    },
    xaxis: {
      categories: [...years]
    }
  };
  var chart = new ApexCharts(document.querySelector("#line-chart"), options);
  chart.render();
};


const setupDashboardLoadingandListeners = () => {
  const mapJsonUrl = "static/assets/json/map.json";
  const dataJsonUrl = "static/assets/json/data.json";

  console.log(`Dashboard loading and event listeners are running...`);
  summaryDataLoading(dataJsonUrl);
  mapDataLoading(mapJsonUrl, dataJsonUrl);
  barGraphDataLoading(dataJsonUrl);
  lineGraphDataLoading(dataJsonUrl);
};

setupDashboardLoadingandListeners();
