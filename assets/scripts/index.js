import { setupToggleListeners } from "./shared/menuToggle.js";
import { setupDataLoadingAndListeners } from "./data/data.js";
import { setupIntroduceProject } from "./shared/introProject.js";

document.addEventListener("DOMContentLoaded", () => {
  setupToggleListeners();
  setupDataLoadingAndListeners();
  if(!sessionStorage.getItem('introProjectShown')) {
    setupIntroduceProject();

    sessionStorage.setItem('introProjectShown', true);
  }
  window.addEventListener("beforeunload", () => {
    // sessionStorage.removeItem('introProjectShown');
  })
});
