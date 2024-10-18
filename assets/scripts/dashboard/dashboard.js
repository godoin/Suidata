/**
 * Dashboard.js
 */

import {
  attachEventHandlerById,
} from "../shared/eventHandlers.js";
import {
  createOptionsBySex,
  createOptionsByAge,
  createOptionsByMortalityByYear,
} from "./chartUtils.js";

import {
  getHighestMortalityPerCountry,
  getHighestMortalityPerYear,
  getHighestMortalityPerSex,
  getHighestMortalityPerAgeGroup,
} from "./dashboardUtils.js";

let dashboardGeoJson;
let dashboardTiles;
let dashboardInfo = L.control();
let selectedDashYear = "";
let dashboardMap;


const getSummaryDetails = async (dataJsonUrl) => {
  const data = await fetch(dataJsonUrl)
    .then((res) => res.json())
    .catch((err) => console.error(`Error fetching data: ${err}`));

  const highestMortalityPerYear = getHighestMortalityPerYear(
    data,
    selectedDashYear
  );
  const highestMortalityPerCountry = getHighestMortalityPerCountry(
    data,
    selectedDashYear
  );
  const highestMortalityPerSex = getHighestMortalityPerSex(
    data,
    selectedDashYear
  );
  const highestMortalityPerAgeGroup = getHighestMortalityPerAgeGroup(
    data,
    selectedDashYear
  );

  // console.log(
  //   `Mortality Per Year: ${highestMortalityPerYear.year} ~ ${highestMortalityPerYear.total_mortality}`
  // );
  // console.log(
  //   `Mortality Per Country: ${highestMortalityPerCountry.name} ~ ${highestMortalityPerCountry.total_mortality}`
  // );
  // console.log(
  //   `Mortality Per Sex: ${highestMortalityPerSex.sex} ~ ${highestMortalityPerSex.mortality}`
  // );
  // console.log(
  //   `Mortality Per Ages: ${highestMortalityPerAgeGroup.sex} ~ ${highestMortalityPerSex.mortality}`
  // );

  return {
    highestMortalityPerYear: {
      year: highestMortalityPerYear.year,
      mortality: highestMortalityPerYear.total_mortality,
    },
    highestMortalityPerSex: {
      sex: highestMortalityPerSex.sex,
      mortality: highestMortalityPerSex.mortality,
    },
    highestMortalityPerCountry: {
      name: highestMortalityPerCountry.name,
      mortality: highestMortalityPerCountry.total_mortality,
    },
    highestMortalityPerAgeGroup: {
      age: highestMortalityPerAgeGroup.age,
      mortality: highestMortalityPerAgeGroup.mortality,
    },
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
};

const highestMortalityBarGraph = async (dataJsonUrl) => {
  const container = document.getElementById("mortality-countries");

  const countries = await fetch(dataJsonUrl)
    .then((res) => res.json())
    .catch((error) => console.error("Error fetching data:", error));

  const getHighestMortalityPerCountryBarGraph = countries
    .filter(
      (country) =>
        country.name !== "All" &&
        (selectedDashYear
          ? country.year === selectedDashYear
          : country.year === "All")
    )
    .sort((a, b) => b.total_mortality - a.total_mortality)
    .slice(0, 10);

  const getMaxMortality = countries
    .filter(
      (country) =>
        country.name === "All" &&
        (selectedDashYear
          ? country.year === selectedDashYear
          : country.year === "All")
    )
    .reduce((highest, current) =>
      current.total_mortality > highest
        ? current.total_mortality
        : highest.total_mortality
    );

  // console.table(getCheckMaxMortality);

  const maxMortality = getMaxMortality.total_mortality;

  container.innerHTML = "";

  getHighestMortalityPerCountryBarGraph.forEach((country) => {
    const percentage = (country.total_mortality / maxMortality) * 100;
    const renderedGroup = renderGroup(
      country.name,
      country.total_mortality,
      percentage
    );
    container.innerHTML += renderedGroup;
  });

  // console.table(getHighestMortalityPerCountryBarGraph);
};

const renderGroup = (name, value, percentage) => `
  <div class="group">
    <div class="detail">
        <span class="name">${name}</span>
        <div class="value-group">
        <span class="value">(${percentage.toFixed(2)}%)</span>
          <span class="value">${value || "N/A"} </span>
        </div>
    </div>
    <div class="bar" id="${name.toLowerCase().replace(/\s+/g, "")}">
        <div class="percentage" style="width: ${percentage}%;"></div>
    </div>
  </div>
`;

const mapDataLoading = async (mapJsonUrl, dataJsonUrl) => {
  dashboardMap.setView([0, 0], 0);
  dashboardTiles = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }
  ).addTo(dashboardMap);
  const data = await fetch(mapJsonUrl)
    .then((res) => res.json())
    .catch((err) => console.error(`Error fetching JSON data: ${err}`));

  L.geoJson(data).addTo(dashboardMap);

  highestMortalityBarGraph(dataJsonUrl);
};

const summaryDataLoading = async (dataJsonUrl) => {
  const summaryData = await getSummaryDetails(dataJsonUrl);
  renderSummaryToDOM(summaryData);
};

const barGraphDataLoading = async (dataJsonUrl) => {
  const countries = await fetch(dataJsonUrl)
    .then((res) => res.json())
    .catch((err) => console.error(`Error fetching JSON data: ${err}`));

  const allCountriesByAllYears = countries.find(
    (country) =>
      country.name === "All" &&
      (selectedDashYear
        ? country.year === selectedDashYear
        : country.year === "All")
  );

  const maleMortality = allCountriesByAllYears.male;
  const femaleMortality = allCountriesByAllYears.female;
  const ageGroupOne = allCountriesByAllYears.age_group_5_to_14;
  const ageGroupTwo = allCountriesByAllYears.age_group_15_to_24;
  const ageGroupThree = allCountriesByAllYears.age_group_25_to_34;
  const ageGroupFour = allCountriesByAllYears.age_group_35_to_54;
  const ageGroupFive = allCountriesByAllYears.age_group_55_to_74;
  const ageGroupSix = allCountriesByAllYears.age_group_75_plus;

  const optionsBySex = createOptionsBySex(maleMortality, femaleMortality);
  const optionsByAge = createOptionsByAge(
    ageGroupOne,
    ageGroupTwo,
    ageGroupThree,
    ageGroupFour,
    ageGroupFive,
    ageGroupSix
  );

  var chartBySex = new ApexCharts(
    document.querySelector("#sex-chart"),
    optionsBySex
  );
  var chartByAge = new ApexCharts(
    document.querySelector("#age-chart"),
    optionsByAge
  );

  chartBySex.render();
  chartByAge.render();
};

const lineGraphDataLoading = async (dataJsonUrl) => {
  const countries = await fetch(dataJsonUrl)
    .then((res) => res.json())
    .catch((err) => console.error(`Error fetching JSON data: ${err}`));

  const allCountriesByYears = countries.filter(
    (country) => country.name === "All" && country.year !== "All"
  );

  const totalMortality = allCountriesByYears.map(
    (country) => country.total_mortality
  );
  const years = allCountriesByYears.map((country) => country.year);
  const maleMortality = allCountriesByYears.map((country) => country.male);
  const femaleMortality = allCountriesByYears.map((country) => country.female);

  // console.table(allCountriesByYears);

  const optionsByMortality = createOptionsByMortalityByYear(
    totalMortality,
    maleMortality,
    femaleMortality,
    years
  );
  var chart = new ApexCharts(
    document.querySelector("#line-chart"),
    optionsByMortality
  );
  chart.render();
};

const handleYearUpdate = (event) => {
  const mapJsonUrl = "assets/json/map.json";
  const dataJsonUrl = "assets/json/data.json";

  selectedDashYear = parseInt(event.target.value, 10);

  summaryDataLoading(dataJsonUrl);
  highestMortalityBarGraph(dataJsonUrl);
  barGraphDataLoading(dataJsonUrl);
  lineGraphDataLoading(dataJsonUrl);
  // console.log(`Check: ${selectedDashYear}`);
};

const setupDashboardLoadingandListeners = () => {
  console.log(`Dashboard loading and event listeners are running...`);
  const mapJsonUrl = "assets/json/map.json";
  const dataJsonUrl = "assets/json/data.json";
  const selectYear = "year-select";
  const dashboardMapId = "dashboardMap"
  
  const mapElement = document.getElementById(dashboardMapId);
  
  if (mapElement) {
    // Intialize Map
    dashboardMap = L.map("dashboardMap", {
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
    });  
    
    // Initializers
    summaryDataLoading(dataJsonUrl);
    mapDataLoading(mapJsonUrl, dataJsonUrl);
    barGraphDataLoading(dataJsonUrl);
    lineGraphDataLoading(dataJsonUrl);
  
    // Click Events
    attachEventHandlerById(selectYear, "change", handleYearUpdate);
  }
};

setupDashboardLoadingandListeners();
