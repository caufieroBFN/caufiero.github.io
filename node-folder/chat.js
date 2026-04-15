// chat.js
const socket = io();
const form = document.getElementById("chatForm");
const input = document.getElementById("msg");
const messages = document.getElementById("messages");

form.addEventListener("submit", e => {
  e.preventDefault();
  const msg = input.value;
  socket.emit("chatMessage", msg);
  input.value = "";
});

socket.on("chatMessage", msg => {
  const li = document.createElement("li");
  li.textContent = msg;
  messages.appendChild(li);
});