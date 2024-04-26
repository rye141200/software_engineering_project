// --- login page ---
// Get the first form on the page
const form = document.querySelector("form");

// Get the first element with class 'errorMessage' on the page
const errorMessage = document.querySelector(".errorMessage");

// Get the input elements by their IDs
const email = document.getElementById("login-email");
const password = document.getElementById("password");
const showPassword = document.getElementById("showPassword");

// Function to validate the password
const validatePassword = function (password) {
  // Check if the password is at least 8 characters long and contains both letters and numbers
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$/;
  return passwordPattern.test(password);
};

// Add event listener to the form
form.addEventListener("submit", (e) => {
  // Prevent the form from submitting
  e.preventDefault();

  // Validate the email
  if (!email.value.endsWith("@gmail.com")) {
    alert("Please enter a valid email address ending with @gmail.com.");
  }

  // Validate the password
  const isPasswordValid = validatePassword(password.value);

  if (!isPasswordValid) {
    alert(
      "Password must be at least 8 characters long and contain both letters and numbers."
    );
  }

  // If there are any error messages, show them
  if (errorMessages.length > 0) {
    alert("enter a valid password");
  } else {
    // Submit the form if there are no errors (you might want to handle form submission differently depending on your application)
    alert("Form submitted successfully!");
  }
});

showPassword.addEventListener("click", function () {
  this.classList.toggle("fa-eye-slash");
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
});
