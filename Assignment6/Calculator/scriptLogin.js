$(document).ready(function () {
    // Marking each input as Untouched initially.
    $("input").each(function () {
      $(this).data("touched", false);
    });

    // When an input loses focus, marking it as touched and then running the validations.
    $("input").on("blur", function () {
      $(this).data("touched", true);
      checkValidations();
    });

    // Always running the validations on input,but only showing the errors if field is touched.
    $("input").on("input", function () {
      checkValidations();
    });

    // Helper validation functions.
    function validateEmail(email) {
      const regex = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/;
      return regex.test(email);
    }

    function validateUsername(username) {
      const regex = /^[A-Za-z]+$/;
      return regex.test(username);
    }

    function validatePassword(password) {
      return password.length >= 6 && password.length <= 20;
    }

    // Validation function for all fields.
    function checkValidations() {
      let valid = true;

      // Validating the Email here
      const email = $("#email").val().trim();
      if (email === "") {
        valid = false;
        if ($("#email").data("touched")) {
          $("#emailError").text("Email cannot be empty.");
          $("#email").addClass("is-invalid").removeClass("is-valid");
        } else {
          $("#emailError").text("");
          $("#email").removeClass("is-invalid is-valid");
        }
      } else if (!validateEmail(email)) {
        valid = false;
        if ($("#email").data("touched")) {
          $("#emailError").text("Please enter a valid Northeastern email (ending with @northeastern.edu).");
          $("#email").addClass("is-invalid").removeClass("is-valid");
        } else {
          $("#emailError").text("");
          $("#email").removeClass("is-invalid is-valid");
        }
      } else {
        // Valid email
        if ($("#email").data("touched")) {
          $("#emailError").text("");
          $("#email").removeClass("is-invalid").addClass("is-valid");
        } else {
          $("#emailError").text("");
          $("#email").removeClass("is-invalid is-valid");
        }
      }

      // Validating the UserName here
      const username = $("#username").val().trim();
      if (username === "") {
        valid = false;
        if ($("#username").data("touched")) {
          $("#usernameError").text("Username cannot be empty.");
          $("#username").addClass("is-invalid").removeClass("is-valid");
        } else {
          $("#usernameError").text("");
          $("#username").removeClass("is-invalid is-valid");
        }
      } else if (!validateUsername(username)) {
        valid = false;
        if ($("#username").data("touched")) {
          $("#usernameError").text("Username must contain only letters.");
          $("#username").addClass("is-invalid").removeClass("is-valid");
        } else {
          $("#usernameError").text("");
          $("#username").removeClass("is-invalid is-valid");
        }
      } else {
        // Valid username
        if ($("#username").data("touched")) {
          $("#usernameError").text("");
          $("#username").removeClass("is-invalid").addClass("is-valid");
        } else {
          $("#usernameError").text("");
          $("#username").removeClass("is-invalid is-valid");
        }
      }

      // Validating the Password here
      const password = $("#password").val();
      if (password === "") {
        valid = false;
        if ($("#password").data("touched")) {
          $("#passwordError").text("Password cannot be empty.");
          $("#password").addClass("is-invalid").removeClass("is-valid");
        } else {
          $("#passwordError").text("");
          $("#password").removeClass("is-invalid is-valid");
        }
      } else if (!validatePassword(password)) {
        valid = false;
        if ($("#password").data("touched")) {
          $("#passwordError").text("Password must be between 6 and 20 characters.");
          $("#password").addClass("is-invalid").removeClass("is-valid");
        } else {
          $("#passwordError").text("");
          $("#password").removeClass("is-invalid is-valid");
        }
      } else {
        // Valid password
        if ($("#password").data("touched")) {
          $("#passwordError").text("");
          $("#password").removeClass("is-invalid").addClass("is-valid");
        } else {
          $("#passwordError").text("");
          $("#password").removeClass("is-invalid is-valid");
        }
      }

      // Confirming whether the password and confirm password match
      const confirmPassword = $("#confirmPassword").val();
      if (confirmPassword === "") {
        valid = false;
        if ($("#confirmPassword").data("touched")) {
          $("#confirmPasswordError").text("Please confirm your password.");
          $("#confirmPassword").addClass("is-invalid").removeClass("is-valid");
        } else {
          $("#confirmPasswordError").text("");
          $("#confirmPassword").removeClass("is-invalid is-valid");
        }
      } else if (password !== confirmPassword) {
        valid = false;
        if ($("#confirmPassword").data("touched")) {
          $("#confirmPasswordError").text("Passwords do not match.");
          $("#confirmPassword").addClass("is-invalid").removeClass("is-valid");
        } else {
          $("#confirmPasswordError").text("");
          $("#confirmPassword").removeClass("is-invalid is-valid");
        }
      } else {
        // Valid confirm password
        if ($("#confirmPassword").data("touched")) {
          $("#confirmPasswordError").text("");
          $("#confirmPassword").removeClass("is-invalid").addClass("is-valid");
        } else {
          $("#confirmPasswordError").text("");
          $("#confirmPassword").removeClass("is-invalid is-valid");
        }
      }

      // Enabling the Login button if all fields are valid.
      $("#loginBtn").prop("disabled", !valid);
    }

    // On submitting the form, storing the username in sessionStorage and redirecting to the calculator page.

    $("#loginForm").submit(function (e) {
      e.preventDefault();
      $("input").each(function () {
        $(this).data("touched", true);
      });
      checkValidations();
      if (!$("#loginBtn").prop("disabled")) {
        // Storing the username in sessionStorage
        sessionStorage.setItem("username", $("#username").val().trim());
        // Redirecting to calculator page
        window.location.href = "calculator.html";
      }
    });
  });