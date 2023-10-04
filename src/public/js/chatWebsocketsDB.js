const socket = io();

const submitUserForm = document.getElementById("formUser");
const btnSubmitUser = document.getElementById("submitUser");
const emailInput = document.getElementById("email");
const submitMessageForm = document.getElementById("formMessage");
const btnSubmitMessage = document.getElementById("submitMessage");
const messageInput = document.getElementById("message");

const getUser = () => {
  const email = emailInput.value;
  const user = {
    email,
  };
  return user;
};

const getMessage = () => {
  const message = messageInput.value;
  const messages = {
    message,
  };
  return messages;
};

socket.on("joinUser", (newUser) => {
  const user = JSON.parse(newUser);
  Swal.fire({
    title: `${user.email} se unio al chat`,
    icon: "success", 
    timer: 5000,
    timerProgressBar: true,
    toast: true,
    position: "top-end",
  });
});


socket.on("redirect", (newUser) => {
  window.location.href = "http://localhost:8080/chat.handlebars/messages";
});

socket.on("newMessage", (newMessage) => {
  const message = JSON.parse(newMessage);
  console.log(`${message.message}`);
    const tableMessages = document.getElementById("tableMessages");
    const newRowMessages = tableMessages.insertRow();
    const messages = newRowMessages.insertCell();
    messages.textContent = message.message;
});

btnSubmitUser && btnSubmitUser.addEventListener("click", (e) => {
  console.log(e)
  e.preventDefault();
  const user = getUser();
  socket.emit("newUser", JSON.stringify(user));
});

btnSubmitMessage && btnSubmitMessage.addEventListener("click", (e) => {
  e.preventDefault();
  const newMessage = getMessage();
  socket.emit("newMessage", JSON.stringify(newMessage));
});

