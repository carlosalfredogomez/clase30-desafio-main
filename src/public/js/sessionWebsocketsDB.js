const socket = io();
console.log(socket);

const submitForm = document.getElementById("formUser");
const btnRegister = document.getElementById("btnRegister");
const name = document.getElementById("name");
const lastname = document.getElementById("lastname");
const age = document.getElementById("age");
const email = document.getElementById("email");
const password = document.getElementById("password");

submitForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitForm.submit() 
  
});

