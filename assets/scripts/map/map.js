let map,
  tiles,
  info = L.control(),
  legend = L.control(),
  yearSelectControl = L.control(),
  selectedMapYear = "",
  geoJson;
const highlightFeature = (e) => {
    var a = e.target;
    a.setStyle({ weight: 5, color: "#666", dashArray: "", fillOpacity: 0.7 }),
      a.bringToFront();
  },
  resetHighlight = (e) => {
    geoJson.resetStyle(e.target);
  },
  zoomToFeature = (e) => {
    map?.fitBounds(e.target.getBounds());
  },
  onEachFeature = (e, a) => {
    a.on({
      mouseover(e) {
        highlightFeature(e), info.update(a.feature.properties);
      },
      click(e) {
        info.update(a.feature.properties);
      },
      mouseout(e) {
        resetHighlight(e);
      },
    });
  },
  getColor = async (e) => {
    let a =
      (
        await fetch("assets/json/data.json")
          .then((e) => e.json())
          .then((a) => a.find((a) => a.name === e))
          .catch((e) => console.error(`Error fetching data: ${e}..`))
      )?.total_mortality || 0;
    return a > 75e4
      ? "#082f49"
      : a > 5e5
      ? "#0c4a6e"
      : a > 25e4
      ? "#075985"
      : a > 1e5
      ? "#0369a1"
      : a > 5e4
      ? "#0284c7"
      : a > 25e3
      ? "#0ea5e9"
      : a > 1e4
      ? "#38bdf8"
      : a > 5e3
      ? "#7dd3fc"
      : a > 1e3
      ? "#e0f2fe"
      : "#f0f9ff";
  },
  standardLegendColors = (e) =>
    e > 75e4
      ? "#082f49"
      : e > 5e5
      ? "#0c4a6e"
      : e > 25e4
      ? "#075985"
      : e > 1e5
      ? "#0369a1"
      : e > 5e4
      ? "#0284c7"
      : e > 25e3
      ? "#0ea5e9"
      : e > 1e4
      ? "#38bdf8"
      : e > 5e3
      ? "#7dd3fc"
      : e > 1e3
      ? "#e0f2fe"
      : "#f0f9ff",
  style = async (e) => ({
    fillColor: await getColor(e.properties.name),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  }),
  renderCardData = (e) => {
    let a = {
        total_mortality: 0,
        male: 0,
        female: 0,
        age_group_5_to_14: 0,
        age_group_15_to_24: 0,
        age_group_25_to_34: 0,
        age_group_35_to_54: 0,
        age_group_55_to_74: 0,
        age_group_75_plus: 0,
      },
      t = e || a,
      o = Object.values(t)
        .filter((e) => "number" == typeof e)
        .reduce((e, a) => e + a, 0),
      r = (e) => ((e / o) * 100).toFixed(2) || 0,
      n = {
        male: r(t.male),
        female: r(t.female),
        age_group_5_to_14: r(t.age_group_5_to_14),
        age_group_15_to_24: r(t.age_group_15_to_24),
        age_group_25_to_34: r(t.age_group_25_to_34),
        age_group_35_to_54: r(t.age_group_35_to_54),
        age_group_55_to_74: r(t.age_group_55_to_74),
        age_group_75_plus: r(t.age_group_75_plus),
      };
    return `
    <header>
      <h1 class="title">${
        "" === t.name ? "All Countries" : t.name || "N/A"
      }</h1>
      <span class="value">${t.total_mortality || "N/A"}</span>
    </header>
    <div class="content">
      <div class="content-group sex">
        <h2>Sex</h2>
          ${renderGroup("Male", t.male, n.male)}
          ${renderGroup("Female", t.female, n.female)}
      </div>
      <div class="content-group age">
        <h2>Age Groups</h2>
          ${Object.entries(n)
            .filter(([e]) => e.startsWith("age_group_"))
            .map(([e, a]) =>
              renderGroup(
                e.replace(/_/g, "-").replace("age-group-", "") + " years",
                t[e],
                a
              )
            )
            .join("")} 
      </div>
      <div class="conetnt-group" id="mortality-countries"></div>
    </div>
  `;
  },
  renderGroup = (e, a, t) => `
  <div class="group">
    <div class="detail">
        <span class="name">${e}</span>
        <span class="value">${a || "N/A"}</span>
    </div>
    <div class="bar" id="${e.toLowerCase().replace(/\s+/g, "")}">
        <div class="percentage" style="width: ${t}%;"></div>
    </div>
  </div>
`;
(legend.onAdd = function (e) {
  for (
    var a = L.DomUtil.create("div", "info legend"),
      t = [0, 1e3, 5e3, 1e4, 25e3, 5e4, 1e5, 25e4, 5e5, 75e4],
      o = 0;
    o < t.length;
    o++
  )
    a.innerHTML +=
      '<i style="background:' +
      standardLegendColors(t[o] + 1) +
      '"></i> ' +
      t[o] +
      (t[o + 1] ? "&ndash;" + t[o + 1] + "<br>" : "+");
  return a;
}),
  (yearSelectControl.onAdd = function (e) {
    let a = L.DomUtil.create("div", "year-select-container");
    a.innerHTML = `
    <div class="actions">
      <select
        id="year-select"
        class="button outline map-shadows"
        aria-label="Select a year between 1985 and 2006"
      >
        <option value="" checked>Filter by: All</option>
      </select>
  `;
    let t = a.querySelector("#year-select");
    for (let o = 1985; o <= 2016; o++) {
      let r = document.createElement("option");
      (r.value = o), (r.text = `Filter by: ${o}`), t.appendChild(r);
    }
    return t.addEventListener("change", handleYearUpdate), a;
  }),
  (info.onAdd = function (e) {
    return (
      (this._div = L.DomUtil.create("div", "data-column")),
      this.update(),
      this._div
    );
  }),
  (info.update = async function (e) {
    let a = "assets/json/data.json";
    if (e && e.name) {
      let t = await fetch(a)
        .then((e) => e.json())
        .then((a) =>
          a.find(
            (a) =>
              a.name === e.name &&
              (selectedMapYear ? a.year === selectedMapYear : "All" === a.year)
          )
        )
        .catch((e) => console.error(`Error fetching data: ${e}...`));
      this._div.innerHTML = renderCardData(t);
    } else {
      let o = await fetch(a)
        .then((e) => e.json())
        .then((e) =>
          e.find(
            (e) =>
              "All" === e.name &&
              (selectedMapYear ? e.year === selectedMapYear : "All" === e.year)
          )
        )
        .catch((e) => console.error(`Error fetching data: ${e}..`));
      this._div.innerHTML = renderCardData(o);
    }
  });
const loadDataToMap = (e) => {
    (geoJson = L.geoJson(e, {
      style: style,
      onEachFeature: onEachFeature,
    })).addTo(map);
  },
  updateMap = async () => {
    geoJson.eachLayer(async function (e) {
      let a = await getColor(e.feature.properties.name);
      e.setStyle({ fillColor: a });
    }),
      info.update();
  },
  handleYearUpdate = (e) => {
    console.log(`Selected Year: ${e.target.value}`),
      (selectedMapYear = parseInt(e.target.value, 10)),
      updateMap();
  },
  initMapLoading = async (e) => {
    let a = await fetch(e)
      .then((e) => e.json())
      .catch((e) => console.error(`Error trying to fetch data: ${e}`));
    loadDataToMap(a);
  },
  mapDataLoading = (e) => {
    map?.setView([0, 0], 2),
      (tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map)),
      initMapLoading(e),
      info.addTo(map),
      legend.addTo(map),
      yearSelectControl.addTo(map),
      info.setPosition("topleft"),
      yearSelectControl.setPosition("topright"),
      legend.setPosition("topright"),
      map?.zoomControl.setPosition("bottomleft");
  },
  setupMapLoadingandListeners = () => {
    console.log("Map loading and event listeners are running...");
    document.getElementById("map") &&
      ((map = L.map("map")), mapDataLoading("assets/json/map.json"));
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  };
setupMapLoadingandListeners();
