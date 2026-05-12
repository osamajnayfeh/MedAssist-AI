(function () {
  var mount = document.getElementById("result-card");
  if (!mount) {
    return;
  }

  var raw = localStorage.getItem("clinicalmind-last-result");
  if (!raw) {
    mount.innerHTML = "<p>No analysis found. Upload a scan first.</p>";
    return;
  }

  try {
    var result = JSON.parse(raw);
    var confidence = Math.round((result.confidence || 0) * 100);
    mount.innerHTML = [
      "<h2>Prediction: " + (result.condition || "Unknown") + "</h2>",
      "<p><strong>Confidence:</strong> " + confidence + "%</p>",
      "<p><strong>Recommendation:</strong> " + (result.recommendation || "None") + "</p>"
    ].join("");
  } catch (error) {
    mount.innerHTML = "<p>Could not parse result data.</p>";
  }
})();
