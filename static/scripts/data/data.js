/**
 * Data.js
 */

import {
  attachEventHandlerById,
} from "../shared/eventHandlers.js";

let allCountries = [];
let currentSortColumn = [];
let isAscending = true;
let currentPage = 1;
const itemsPerPage = 10;

const createTableDataElement = (country) => {
  const newRowData = document.createElement("tr");
  newRowData.classList.add("data");

  const html = `
    <td class="data">
      <div class="group">
        <img src="${country.image_url}" alt="${country.name}" height="30" width="60"/>
          ${country.name}
      </div>
    </td>
    <td class="data">${country.year}</td>
    <td class="data">${country.male}</td>
    <td class="data">${country.female}</td>
    <td class="data">${country.age_group_5_to_14}</td>
    <td class="data">${country.age_group_15_to_24}</td>
    <td class="data">${country.age_group_25_to_34}</td>
    <td class="data">${country.age_group_35_to_54}</td>
    <td class="data">${country.age_group_55_to_74}</td>
    <td class="data">${country.age_group_75_plus}</td>
  `;

  newRowData.innerHTML = html;

  return newRowData;
};

const loadCountryData = (data, tableBodyId, page = 1) => {
  const tableBody = document.getElementById(tableBodyId);
  const tableContainer = tableBody?.closest(`.table-container`);

  tableBody.innerHTML = "";

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const pageData = data.slice(startIndex, endIndex);

  const dataElements = pageData.map(createTableDataElement);
  dataElements.forEach((element) => tableBody.appendChild(element));

  updatePaginationButtons();
};

function updatePaginationButtons() {
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  prevButton.disabled = currentPage === 1;

  const totalPages = Math.ceil(allCountries.length / itemsPerPage);
  nextButton.disabled = currentPage === totalPages;
}

const handlePreviousPage = () => {
  if (currentPage > 1) {
    currentPage--;
    loadCountryData(allCountries, "table-body", currentPage);
  }
};

const handleNextPage = () => {
  const totalPages = Math.ceil(allCountries.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    loadCountryData(allCountries, "table-body", currentPage);
  }
};

const initializeDataLoading = async (jsonUrl, tableBodyId) => {
  try {
    const res = await fetch(jsonUrl);

    if (!res.ok) {
      console.error(`Error fetching data from ${jsonUrl}`);
      return null;
    }

    const data = await res.json();
    loadCountryData(data, tableBodyId);
    allCountries = data;

    // const getAllCountries = allCountries.map((country) => country.name)
    // const uniqueCountries = Array.from(new Set(getAllCountries));
    // console.table(uniqueCountries);

  } catch (err) {
    console.error(err);
  }
};

const handleSearch = (e, selectedYearId) => {
  e.preventDefault();
  
  const searchTerm = e.target.value.toLowerCase();
  const selectedYear = document.getElementById(selectedYearId).value;

  const filteredCountries = allCountries
    .filter((data) => data.name?.toLowerCase().includes(searchTerm))
    .filter((data) => selectedYear ? data.year?.toString() === selectedYear: true);

  loadCountryData(filteredCountries, "table-body");
};

const handleSorting = (e, searchTermId) => {
  e.preventDefault();
  const selectedYear = e.target.value;
  const searchTerm = document.getElementById(searchTermId).value.toLowerCase();

  const sortedCountries = allCountries
    .filter((data) => searchTerm ? data.name?.toLowerCase().includes(searchTerm) : true)
    .filter((data) => {
        console.log(`${selectedYear} ~ ${data.year.toString()}`);
        return data.year?.toString() === selectedYear;
        }
      );

  loadCountryData(sortedCountries, "table-body");
}

export const setupDataLoadingAndListeners = () => {
  console.log("Data event loading and listeners are running...");

  // Variables
  const jsonUrl = "static/assets/json/data.json";
  const tableBody = "table-body";

  const yearSelectedId = "data-year-select";
  const searchInputId = "search-input";

  const previousBtn = "prev-button";
  const nextBtn = "next-button";

  // Initializers
  initializeDataLoading(jsonUrl, tableBody);
  
  // Event Listeners
  attachEventHandlerById(yearSelectedId, "change", handleSorting, searchInputId);
  attachEventHandlerById(searchInputId, "input", handleSearch, yearSelectedId);
  attachEventHandlerById(previousBtn, "click", handlePreviousPage);
  attachEventHandlerById(nextBtn, "click", handleNextPage);
};
