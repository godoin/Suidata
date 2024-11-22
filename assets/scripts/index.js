import { setupToggleListeners as e } from "./shared/menuToggle.js";
import { setupDataLoadingAndListeners as r } from "./data/data.js";
import { setupIntroduceProject as o } from "./shared/introProject.js";
import { setupPreFetching as t } from "./shared/preFetch.js";
import { setupSections as d } from "./shared/observer.js";
import { setupLoading as g } from "./shared/loading.js";
document.addEventListener("DOMContentLoaded", () => {
  e(),
    r(),
    t(),
    d(),
    sessionStorage.getItem("introProjectShown") ||
      (o(), sessionStorage.setItem("introProjectShown", !0)),
    window.addEventListener("beforeunload", () => {});
  window.addEventListener("load", () => {
    g();
  });
});
