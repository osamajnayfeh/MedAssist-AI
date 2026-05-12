(function () {
  var loginForm = document.getElementById("login-form");
  var registerForm = document.getElementById("register-form");

  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = document.getElementById("register-name").value.trim();
      var email = document.getElementById("register-email").value.trim();
      var password = document.getElementById("register-password").value;

      if (!name || !email || password.length < 6) {
        window.alert("Use a valid name, email, and password (6+ chars).");
        return;
      }

      localStorage.setItem("clinicalmind-user", JSON.stringify({ name: name, email: email }));
      window.location.href = "login.html";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var email = document.getElementById("login-email").value.trim();
      var userRaw = localStorage.getItem("clinicalmind-user");

      if (!userRaw) {
        window.alert("No account found. Please register first.");
        return;
      }

      var user = JSON.parse(userRaw);
      if (user.email !== email) {
        window.alert("Email does not match registered user.");
        return;
      }

      window.location.href = "dashboard.html";
    });
  }
})();
