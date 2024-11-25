/**
 * observer.js
 */

const options = {
  root: null,
  rootMargin: "0",
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("show");
  }, options);
});

const setupSections = () => {
  const sections = document.querySelectorAll("section");
  sections.forEach((el) => observer.observe(el));

  // const main = document.querySelector("main");
  // if (main) observer.observe(main);

  // const footer = document.querySelector("footer");
  // if (footer) observer.observe(footer);
};

export { setupSections };