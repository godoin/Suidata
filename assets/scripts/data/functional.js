/**
 * Data.js
 */

const createTableDataElement = (country) => {
  const img = document.createElement("img");
  img.src = country.imageUrl;
  img.alt = country.name;

  const title = document.createTextNode(country.name);

  const group = document.createElement("div");
  group.classList.add("group");

  group.appendChild(img);
  group.appendChild(title);

  const name = document.createElement("td");
  name.classList.add("data");
  name.appendChild(group);

  const year = document.createElement("td");
  year.classList.add("data");
  year.innerHTML = country.year;

  const sex = document.createElement("td");
  sex.classList.add("data");
  sex.innerHTML = country.sex;

  const age = document.createElement("td");
  age.classList.add("data");
  age.innerHTML = country.ageGroup;

  const mortality = document.createElement("td");
  mortality.classList.add("data");
  mortality.innerHTML = country.suicideCount;

  const population = document.createElement("td");
  population.classList.add("data");
  population.innerHTML = country.population;

  const newRowData = document.createElement("tr");
  newRowData.classList.add("data");

  [name, year, sex, age, mortality, population].forEach((el) =>
    newRowData.appendChild(el)
  );

  return newRowData;
};

const startLoadingData = (data, tableBodyId) => {
  const tableBody = document.getElementById(tableBodyId);
  const tableContainer = tableBody.target.closest(`table-container`);

  if (!tableContainer) {
    console.error("Error the table container is not found...");
    return null;
  }

  tableBody.innerHTML = "";
  const dataElements = data.map(createTableDataElement);
  dataElements.forEach((element) => tableBody.appendChild(element));
};

const initializeDataLoading = async (jsonUrl, tableBodyId) => {
  try {
    const res = await fetch(jsonUrl);

    if (!res.ok) {
      console.error(`Error fetching data from ${jsonUrl}`);
      return null;
    }

    const data = await res.json();
    startLoadingData(data, tableBodyId);
  } catch (err) {
    console.error(err);
  }
};

export const setupDataLoadingAndListeners = () => {
  console.log("Data event loading and listeners are running...");

  initializeDataLoading("assets/json/data.json", "table-body");
};
