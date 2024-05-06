// --- login page ---
import { showAlert } from './alert.js';

//! elements and variables
const form = document.querySelector('.login-form');
const errorMessage = document.querySelector('.errorMessage');
const email = document.querySelector('.login-email');
const password = document.querySelector('.password');
const showPassword = document.querySelector('.showPassword');
//! elements and variables

//!  Helper functions

//!  Helper functions

//! handlers
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  //! Use Fetch API to send form data to the server

  let response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });
  response = await response.json();

  // status : failure or success
  // message :
  if (response.message == 'successful') {
    showAlert('success', 'Logged In Successfully', 3);
    window.location.href = '/home';
  } else {
    showAlert('error', 'invalid Email or Password', 3);
  }
});

showPassword.addEventListener('click', function () {
  this.classList.toggle('fa-eye-slash');
  const type =
    password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
});
//! handlers
