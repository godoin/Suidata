import { setupToggleListeners } from "./shared/menuToggle.js";
import { setupDataLoadingAndListeners } from "./data/data.js";

document.addEventListener("DOMContentLoaded", () => {
  setupToggleListeners();
  setupDataLoadingAndListeners();
});
