<div id="carouselExampleCaptions" class="relative">
        <div class="relative h-56 overflow-hidden md:h-96">
            <div class="duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-0 z-20" data-carousel-item="">
                <img src="/resources/images/banner1.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="slider 1">
            </div>
            <div class="duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-full z-10" data-carousel-item="">
                <img src="/resources/images/banner2.png" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="slider 2">
            </div>
        </div>
        <button type="button" class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev="">
            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"></path>
                </svg>
                <span class="sr-only">Previous</span>
            </span>
        </button>
        <button type="button" class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next="">
            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"></path>
                </svg>
                <span class="sr-only">Next</span>
            </span>
        </button>
    </div>

// Enviar info duos
function sendMessage(cardId) {
    const card = document.getElementById(cardId);
    const precio = card.querySelector('#precio').textContent;

    const message = `¡Hola, buen dia! Estoy interesado en el paquete de Internet + Cable de S/.${precio}`;

    const phoneNumber = "51962624690";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl);
}

//Enviar info planes unicos
function sendMessageP(cardId) {
    const card = document.getElementById(cardId);
    const paquete = card.querySelector('#paquete').textContent;
    const precio = card.querySelector('#precio').textContent;

    const message = `¡Hola! Estoy interesado en el paquete de ${paquete} con precio de S/.${precio}`;

    const phoneNumber = "51962624690";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
}

// Desplazamiento a secciones
function smoothScrollTo(sectionId, offset = 75) {
    const target = document.getElementById(sectionId);
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(animation);
};

// Animacion de carga
window.addEventListener("load", () => {
    const loading = document.getElementById("loading");
    const content = document.getElementById("content");

    setTimeout(() => {
        loading.style.display = "none";
        content.style.display = "block";
    }, 500);
});

//Reducir el Nav al Scroollear
window.onscroll = function () {
    if (window.innerWidth > 768) {
        shrinkNav(); 
    }
};

function shrinkNav() {
    const nav = document.getElementById('nav');
    console.log(nav);
    if (window.scrollY > 50) {
        nav.classList.add('shrink');
    } else {
        nav.classList.remove('shrink');
    }
}

//Aparicion de Elementos
const elementos = document.querySelectorAll('.elemento');

const manejarScroll = () => {
    const alturaVentana = window.innerHeight;

    elementos.forEach((elemento) => {
        const posicionElemento = elemento.getBoundingClientRect().top;

        if (posicionElemento < alturaVentana - 100) {
            elemento.classList.add('aparecer');
        }
    });
};

window.addEventListener('scroll', manejarScroll);
manejarScroll();

