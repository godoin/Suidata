let handleLoading = (e, n) => {
    let t = document.getElementById(e),
      o = document.getElementById(n);
    t && o
      ? ((t.style.display = "none"), (o.style.display = "flex"))
      : console.error("Error: loader and content not found...");
  },
  setupLoading = () => {
    setTimeout(handleLoading("loader", "content"), 4e3);
  };
export { setupLoading };
