/**
 * preFetching.js
 */

import { attachMultipleEventHandlerBySelectorAll } from "./eventHandlers.js";

const updateNavbarActiveState = (targetUrl) => {
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    const link = item.querySelector("a");
    if (link) {
      if (link.href === targetUrl) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    }
  });
};

const updateMainStyles = (targetUrl, mainSelector) => {
  const main = document.querySelector(mainSelector);
  const html = document.querySelector("html");
  main.classList.remove("index", "about", "works", "playground", "gallery");

  if (targetUrl === "http://godwin-duliente.dev/") {
    main.classList.add("index");
    html.classList.remove("no-scroll");
  } else if (targetUrl === "http://godwin-duliente.dev/about") {
    main.classList.add("about");
    html.classList.remove("no-scroll");
  } else if (targetUrl === "http://godwin-duliente.dev/works") {
    main.classList.add("works");
    html.classList.remove("no-scroll");
  } else if (targetUrl === "http://godwin-duliente.dev/playground") {
    main.classList.add("playground");
    html.classList.add("no-scroll");
  } else if (targetUrl === "http://godwin-duliente.dev/gallery") {
    main.classList.add("gallery");
    html.classList.add("no-scroll");
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

  // console.log(`${targetUrl}`);

  await fetch(targetUrl)
    .then((res) => res.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const newHtml = doc.querySelector(mainSelector).innerHTML;

      mainContainer.innerHTML = newHtml;
      window.history.pushState({}, "", targetUrl);
    })
    .catch((err) => console.error(`Error prefetching: ${err}`));

  // Refresh scripts and update styling.
  updateMainStyles(targetUrl, mainSelector);
  updateNavbarActiveState(targetUrl);
  scrollToTop(0, "smooth");
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