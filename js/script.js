// --- login page ---
// Get the first form on the page
const form = document.querySelector("form");

// Get the first element with class 'errorMessage' on the page
const errorMessage = document.querySelector(".errorMessage");

// Get the input elements by their IDs
const email = document.getElementById("email");
const password = document.getElementById("password");
const showPassword = document.getElementById("showPassword");
// Symbols to be included in the username
const symbols = ["$", "_", "-"];

// Function to validate the username
const validateUserName = function (username) {
  // Check if the username contains any of the specified symbols
  return symbols.some((sym) => username.includes(sym));
};

// Function to validate the password
const validatePassword = function (password) {
  // Check if the password is at least 8 characters long and contains both letters and numbers
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$/;
  return passwordPattern.test(password);
};

// Function to show error messages
const showErrorMessage = (messages) => {
  // Display all error messages in sequence
  errorMessage.innerHTML = messages.join("<br>");

  // Set a timeout to clear the error messages after 3 seconds (3000 milliseconds)
  setTimeout(() => {
    errorMessage.innerHTML = "";
  }, 3000);
};

// Add event listener to the form
form.addEventListener("submit", (e) => {
  // Prevent the form from submitting
  e.preventDefault();

  // Initialize an array to store error messages
  let errorMessages = [];

  // Validate the username

  // Validate the email
  if (!email.value.endsWith("@gmail.com")) {
    errorMessages.push(
      "Please enter a valid email address ending with @gmail.com."
    );
  }

  // Validate the password
  const isPasswordValid = validatePassword(password.value);

  if (!isPasswordValid) {
    errorMessages.push(
      "Password must be at least 8 characters long and contain both letters and numbers."
    );
  }

  // If there are any error messages, show them
  if (errorMessages.length > 0) {
    showErrorMessage(errorMessages);
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
