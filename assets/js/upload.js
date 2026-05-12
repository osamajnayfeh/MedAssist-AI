(function () {
  var fileInput = document.getElementById("scan-file");
  var preview = document.getElementById("preview");
  var form = document.getElementById("upload-form");

  if (!fileInput || !preview || !form) {
    return;
  }

  fileInput.addEventListener("change", function () {
    var file = fileInput.files && fileInput.files[0];
    if (!file) {
      preview.classList.remove("visible");
      preview.removeAttribute("src");
      return;
    }

    var reader = new FileReader();
    reader.onload = function (event) {
      preview.src = event.target && event.target.result ? event.target.result : "";
      preview.classList.add("visible");
    };
    reader.readAsDataURL(file);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var file = fileInput.files && fileInput.files[0];
    if (!file) {
      window.alert("Please select an image before analysis.");
      return;
    }

    var mock = {
      condition: "Normal",
      confidence: 0.87,
      recommendation: "Continue routine follow-up and clinical observation."
    };
    localStorage.setItem("clinicalmind-last-result", JSON.stringify(mock));
    window.location.href = "results.html";
  });
})();
