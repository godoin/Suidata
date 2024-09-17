let geoJson;
let map;
let tiles;
let info = L.control();

const getColor = (mortality) => {
  return mortality > 8500
    ? "#0c4a6e"
    : mortality > 7000
    ? "#075985"
    : mortality > 5500
    ? "#0369a1"
    : mortality > 4000
    ? "#0284c7"
    : mortality > 2500
    ? "#0ea5e9"
    : mortality > 1500
    ? "#7dd3fc"
    : mortality > 500
    ? "#e0f2fe"
    : "#082f49";
};
const style = (feature) => {
  return {
    fillColor: getColor(feature.properties.mortality),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };
};

const highlightFeature = (e) => {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.7,
  });

  layer.bringToFront();
};

const resetHighlight = (e) => {
  geoJson.resetStyle(e.target);
};

const zoomToFeature = (e) => {
  map.fitBounds(e.target.getBounds());
};

const onEachFeature = (feature, layer) => {
  layer.on({
    mouseover: (e) => {
      highlightFeature(e);
      info.update(layer.feature.properties);
    },
    mouseout: (e) => {
      resetHighlight(e);
      info.update();
    },
    click: zoomToFeature,
  });
};

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "data-column");
  this.update();
  return this._div;
};

info.update = function (props) {
  this._div.innerHTML = `
      <header>
        <h1 class="title">${props ? props.name || "N/A" : "Suicide Count"}</h1>
        <span class="value">
          ${props ? props.mortality || "N/A" : "1,175,258"}
        </span>
      </header>
      <div class="content">
        <section class="sex">
          <h2>Sex</h2>
          <div class="group">
            <div class="detail">
              <span class="name">Male</span>
              <span class="value">
                ${props ? props.maleMortality || "N/A" : "788,093"}
              </span>
            </div>
            <div class="bar" id="male"></div>
          </div>
          <div class="group">
            <div class="detail">
              <span class="name">Female</span>
              <span class="value">
                ${props ? props.femaleMortality || "N/A" : "388,195"}
              </span>
            </div>
            <div class="bar" id="female"></div>
          </div>
        </section>
        <section class="age">
          <h2>Age Groups</h2>
          <div class="group">
            <div class="detail">
              <span class="name">5-14 Years</span>
              <span class="value">
                ${props ? props.ageGroupOne || "N/A" : "130,695"}
              </span> 
            </div>
            <div class="bar" id="5-14years"></div>
          </div>
          <div class="group">
            <div class="detail">
              <span class="name">15-24 Years</span>
              <span class="value">
                ${props ? props.ageGroupTwo || "N/A" : "392,087"}
              </span> 
            </div>
            <div class="bar" id="15-24years"></div>
          </div>
          <div class="group">
            <div class="detail">
              <span class="name">25-34 Years</span>
              <span class="value">
                ${props ? props.ageGroupThree || "N/A" : "261,390"}
              </span> 
            </div>
            <div class="bar" id="25-34years"></div>
          </div>
          <div class="group">
            <div class="detail">
              <span class="name">35-54 Years</span>
              <span class="value">
                ${props ? props.ageGroupFour || "N/A" : "261,390"}
              </span> 
            </div>
            <div class="bar" id="35-54years"></div>
          </div>
          <div class="group">
            <div class="detail">
              <span class="name">75+ Years</span>
              <span class="value">
                ${props ? props.ageGroupFive || "N/A" : "131,095"}
              </span> 
            </div>
            <div class="bar" id="35-54years"></div>
          </div>
        </section>
      </div>
  `;
};

const loadDataToMap = (data) => {
  geoJson = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature,
  });
  geoJson.addTo(map);
};

const fetchMapData = async (jsonUrl) => {
  try {
    const res = await fetch(jsonUrl);

    if (!res.ok) {
      console.error("Error fetching GeoJson data...");
      return null;
    }

    const data = await res.json();
    loadDataToMap(data);
  } catch (err) {
    console.error(err);
  }
};

const setupMap = () => {
  map = L.map("map").setView([0, 0], 1);

  tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  info.addTo(map);

  fetchMapData("static/assets/json/map.json");
};

setupMap();
