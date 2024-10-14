/**
 * loading.js
 */

const handleLoading = (loadingId, contentId) => {
  const loader = document.getElementById(loadingId);
  const content = document.getElementById(contentId);

  if (loader && content) {
    loader.style.display = "none";
    content.style.display = "block";
  } else {
    console.error("Error: loader and content not found...");
  }
};

const setupLoading = () => {
  // console.log("Running loading module...");

  const seconds = 4000;
  const loadingId = "loader";
  const contentId = "content";

  setTimeout(handleLoading(loadingId, contentId), seconds);
};

export { setupLoading };