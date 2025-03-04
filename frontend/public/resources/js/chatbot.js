document.getElementById("chatbot-send").addEventListener("click", sendMessage);

async function sendMessage() {
  const inputField = document.getElementById("chatbot-input");
  const message = inputField.value.trim();
  if (!message) return;

  // Agregar el mensaje del usuario al chat
  addMessage("Tú", message);

  // Enviar el mensaje al backend
  const response = await fetch("http://localhost:3000/chatbot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sessionId: "123" }),
  });

  const data = await response.json();
  addMessage("Bot", data.reply);

  inputField.value = ""; // Limpiar el campo de texto
}

function addMessage(sender, message) {
  const chatBox = document.getElementById("chatbot-messages");
  const messageElement = document.createElement("p");
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Desplazar hacia abajo
}

function toggleChat() {
  const chat = document.getElementById("chatbot-container");
  chat.style.display = chat.style.display === "none" ? "flex" : "none";
}
