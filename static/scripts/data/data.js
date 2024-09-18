/**
 * Data.js
 */

import {
  attachClickHandlerById,
  attachInputHandlerById,
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
        <img src="" alt="${country.name}" />
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

  if (!tableContainer) {
    console.error("Error the table container is not found...");
    return null;
  }

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
  } catch (err) {
    console.error(err);
  }
};

const handleSearch = (event) => {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();

  const filteredCountries = allCountries.filter(
    (data) =>
      data.name?.toLowerCase().includes(searchTerm) ||
      data.year?.toString().includes(searchTerm) ||
      data.male?.toString().includes(searchTerm) ||
      data.female?.toString().includes(searchTerm) ||
      data.age_group_5_to_14?.toString().includes(searchTerm) || 
      data.age_group_15_to_24?.toString().includes(searchTerm) ||
      data.age_group_25_to_34?.toString().includes(searchTerm) ||
      data.age_group_35_to_54?.toString().includes(searchTerm) ||
      data.age_group_55_to_74?.toString().includes(searchTerm) ||
      data.age_group_75_plus?.toString().includes(searchTerm)
  );

  loadCountryData(filteredCountries, "table-body");
};

const handleSortOrder = (event) => {
  const clickedHeader = event?.target.closest("th");
  const columnId = clickedHeader.id;

  if (currentSortColumn === columnId) {
    isAscending = !isAscending;
  } else {
    currentSortColumn = columnId;
    isAscending = true;
  }

  const sortedCountries = allCountries.sort((a, b) => {
    const valueA = a[columnId];
    const valueB = b[columnId];

    console.table(valueA);

    if (typeof valueA === "number" && typeof valueB === "number") {
      return isAscending ? valueA - valueB : valueB - valueA;
    }

    if (valueA < valueB) {
      return isAscending ? -1 : 1;
    }
    if (valueA > valueB) {
      return isAscending ? 1 : -1;
    }
    return 0;
  });

  loadCountryData(sortedCountries, "table-body");
};

export const setupDataLoadingAndListeners = () => {
  console.log("Data event loading and listeners are running...");

  initializeDataLoading("static/assets/json/data.json", "table-body");
  attachInputHandlerById("search-input", handleSearch);
  document.querySelectorAll(".header").forEach((header) => {
    header.addEventListener("click", handleSortOrder);
  });

  attachClickHandlerById("prev-button", handlePreviousPage);
  attachClickHandlerById("next-button", handleNextPage);
};
