/**
 * preFetching.js
 */

import { attachMultipleEventHandlerBySelectorAll } from "./eventHandlers.js";

const updateNavbarActiveState = (targetUrl) => {
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    const link = item.querySelector("a");
    if (link) {
      link.href === targetUrl ? item.classList.add("active") : item.classList.remove("active");
    }
  });
};

const updateMainStyles = (targetUrl, mainSelector) => {
  const main = document.querySelector(mainSelector);
  const html = document.querySelector("html");

  const urlClassMap = {
    "/": "about-container",
    "/index.html": "about-container",
    "/dashboard.html": "dashboard-container",
    "/dashboard": "dashboard-container",
    "/data.html": "data-container",
    "/data": "data-container",
    "/map.html": "map-container",
    "/map": "map-container"
  };

  const urlPath = new URL(targetUrl).pathname;

  main.classList.remove(
    "about-container",
    "dashboard-container",
    "data-container",
    "map-container"
  );

  if (urlClassMap[urlPath]) {
    main.classList.add(urlClassMap[urlPath]);

    if (urlClassMap[urlPath] === "map-container") {
      html.classList.add("no-scroll");
    } else {
      html.classList.remove("no-scroll");
    }
  }
};

const scrollToTop = (position, style) => {
  window.scrollTo({
    top: position,
    behavior: style,
  });
};

const handlePreFetching = async (e, link, mainSelector) => {
  e.preventDefault();

  const targetUrl = link.href;
  const mainContainer = document.querySelector(mainSelector);
  const cachedPage = sessionStorage.getItem(targetUrl);

  try {
    const res = await fetch(targetUrl);
    const html = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const newHtml = doc.querySelector(mainSelector).innerHTML;
    mainContainer.innerHTML = newHtml;
    window.history.pushState({}, "", targetUrl);
  } catch (error) {
    console.error(`Error prefetching: ${error}`);
  } finally {
    updateMainStyles(targetUrl, mainSelector);
    updateNavbarActiveState(targetUrl);
    scrollToTop(0, "smooth");
  }
};

const setupPreFetching = () => {
  // console.log("Running prefetching...");

  const navLinks = ".nav-item a";
  const eventType = "click";
  const mainSelector = "main";

  attachMultipleEventHandlerBySelectorAll(
    navLinks,
    eventType,
    handlePreFetching,
    mainSelector
  );
};

export { setupPreFetching };
