// Chatbot Functionality
const chatbotButton = document.getElementById('chatbot-button');
const chatbotModal = document.getElementById('chatbot-modal');
const closeChatbot = document.getElementById('close-chatbot');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

chatbotButton.addEventListener('click', () => {
    chatbotModal.classList.remove('hidden');
    setTimeout(() => {
        chatInput.focus();
    }, 300);
});

closeChatbot.addEventListener('click', () => {
    chatbotModal.classList.add('hidden');
});

// Close modal when clicking outside
chatbotModal.addEventListener('click', (e) => {
    if (e.target === chatbotModal) {
        chatbotModal.classList.add('hidden');
    }
});

// Respuestas predefinidas
const respuestasPredefinidas = {
    "internet": "Tenemos planes de internet desde 80Mbps hasta 250Mbps. ¿Qué velocidad estás buscando?",
    "cable": "Nuestros planes de TV Cable incluyen desde 80 hasta +100 canales entre Nacionales e Internacionales. ¿Buscas algún contenido específico como deportes o películas?",
    "tv": "Nuestros planes de TV Cable incluyen desde 80 hasta +100 canales entre Nacionales e Internacionales. ¿Buscas algún contenido específico como deportes o películas?",
    "duo": "Los paquetes Dúo combinan los planes de Internet y TV Cable con descuentos especiales. ¿Te gustaría conocer nuestro paquete más popular?",
    "paquete": "Los paquetes Dúo combinan los planes de Internet y TV Cable con descuentos especiales. ¿Te gustaría conocer nuestro paquete más popular?",
    "precio": "Los precios varían según el plan. Nuestros planes de internet comienzan en S/.40.00, los de TV Cable en S/.30.00 y los paquetes Duo en S/.90.00. ¿Necesitas más detalles sobre algún plan específico?",
    "costo": "Los precios varían según el plan. Nuestros planes de internet comienzan en S/.40.00, los de TV Cable en S/.30.00 y los paquetes Duo en S/.90.00. ¿Necesitas más detalles sobre algún plan específico?",
    "promocion": "¡Tenemos varias promociones activas! Por tiempo limitado, ofrecemos instalación gratuita y los 6 primeros meses con el doble de megas de velocidad en nuestros paquetes Dúo. ¿Te interesa algún plan en particular?",
    "descuento": "¡Tenemos varias promociones activas! Por tiempo limitado, ofrecemos instalación gratuita y los 6 primeros meses con el doble de megas de velocidad en nuestros paquetes Dúo. ¿Te interesa algún plan en particular?"
};

// Manejar el envío del formulario del chat
chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const message = chatInput.value.trim();
    if (message === "") return;

    // Agregar mensaje del usuario al chat
    addMessage(message, "user");

    // Limpiar el input
    chatInput.value = "";

    // Mostrar mensaje de "escribiendo..."
    const botMessageElement = addMessage("Escribiendo... ⏳", "bot");

    if (!botMessageElement) {
        console.error("Error: No se pudo agregar el mensaje del bot.");
        return;
    }

    // Verificar si la pregunta tiene una respuesta predefinida
    let respuesta = obtenerRespuestaPredefinida(message);

    if (!respuesta) {
        // Si no hay una respuesta predefinida, consultar MagicLoops
        respuesta = await consultarMagicLoops(message);
    }

    // Actualizar el mensaje del bot con la respuesta obtenida
    botMessageElement.textContent = respuesta;
});

// Función para obtener una respuesta predefinida
function obtenerRespuestaPredefinida(mensaje) {
    for (const key in respuestasPredefinidas) {
        if (mensaje.toLowerCase().includes(key)) {
            return respuestasPredefinidas[key];
        }
    }
    return null;
}

// Función para consultar la API de MagicLoops
async function consultarMagicLoops(prompt) {
    try {
        const response = await fetch(`https://magicloops.dev/api/loop/f5299405-10cf-45cf-8631-ec5e56596318/run?prompt=${encodeURIComponent(prompt)}`);
        const data = await response.json();
        return data.response || "No se obtuvo respuesta.";
    } catch (error) {
        console.error("Error al obtener la respuesta de MagicLoops:", error);
        return "Hubo un problema al obtener la respuesta. Inténtalo de nuevo más tarde.";
    }
}

// Función para agregar mensajes al chat
function addMessage(text, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = text;
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return messageElement; // 🔹 Ahora retorna el mensaje agregado correctamente
}

function addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `flex mb-4 ${sender === 'user' ? 'justify-end' : ''}`;
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="bg-gray-200 text-gray-800 p-3 rounded-lg rounded-tr-none max-w-xs">
                <p>${message}</p>
            </div>
            <div class="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white ml-2 flex-shrink-0">
                <i class="fas fa-user text-xs"></i>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white mr-2 flex-shrink-0">
                <i class="fas fa-robot text-xs"></i>
            </div>
            <div class="bg-primary-100 text-primary-900 p-3 rounded-lg rounded-tl-none max-w-xs">
                <p>${message}</p>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Animate cards on scroll
function animateOnScroll() {
    const cards = document.querySelectorAll('.plan-card');
    
    cards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition) {
            setTimeout(() => {
                card.classList.add('animate-fade-in');
            }, index * 100);
        }
    });
}

// Initial animation
window.addEventListener('load', () => {
    animateOnScroll();
});

// Animate on scroll
window.addEventListener('scroll', () => {
    animateOnScroll();
});