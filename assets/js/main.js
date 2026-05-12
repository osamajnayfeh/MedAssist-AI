(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var storedTheme = localStorage.getItem("clinicalmind-theme");

  if (storedTheme === "dark") {
    root.setAttribute("data-theme", "dark");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var isDark = root.getAttribute("data-theme") === "dark";
      if (isDark) {
        root.removeAttribute("data-theme");
        localStorage.setItem("clinicalmind-theme", "light");
      } else {
        root.setAttribute("data-theme", "dark");
        localStorage.setItem("clinicalmind-theme", "dark");
      }
    });
  }

  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  var key = currentPage.replace(".html", "");
  var active = document.querySelector("[data-nav='" + key + "']");
  if (active) {
    active.classList.add("is-active");
  }
})();
