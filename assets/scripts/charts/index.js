console.log("Running scripts");

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    var modal = document.getElementById("toast-default");
    if (modal) {
      modal.classList.add("hidden");
    }
  }, 8000);
});
