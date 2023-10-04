const socket = io();
console.log(socket);

const submitFormLogin = document.getElementById("formLoginUser");
const btnLogin = document.getElementById("btnLogin");
const email = document.getElementById("emailLogin");
const password = document.getElementById("passwordLogin");

submitFormLogin.addEventListener("submit", (e) => {
  submitFormLogin.submit()
});

