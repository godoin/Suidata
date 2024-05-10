console.log("Running scripts");

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    var modal = document.getElementById("default-modal");
    if (modal) {
      modal.classList.add("hidden");
    }
  }, 4000);
});
