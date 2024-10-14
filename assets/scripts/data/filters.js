/**
 * Filters
 */

let currentSortColumn = null;

async function runSortTest(event) {
  const jsonUrl = "static/assets/json/data.json";
  let currentSortOrder = "asc";
  const clickedHeader = event.target.closest("th");
  const columnId = clickedHeader.id;
  try {
    const data = await fetchJSONData(jsonUrl);

    if (currentSortColumn === columnId) {
      currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
    } else {
      currentSortColumn = columnId;
    }

    data.sort((a, b) => {
      const valueA = a[columnId];
      const valueB = b[columnId];

      if (valueA < valueB) {
        return currentSortOrder === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return currentSortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    console.table(data);

    renderTable(data);
  } catch (err) {
    console.error(err);
  }
}

function renderTable(mortalityData) {
  const tableBody = document.querySelector("#table-body");
  tableBody.innerHTML = "";

  mortalityData.forEach((country) => {
    createTableRowData(tableBody, country);
  });
}
