function sendMessage(cardId) {
    const card = document.getElementById(cardId);
    const paquete = card.querySelector('#paquete').textContent;
    const velocidad = card.querySelector('#velocidad').textContent;
    const cable = card.querySelector('#cable').textContent;
    const precio = card.querySelector('#precio').textContent;
    
    const message = `¡Hola! Estoy interesado en el paquete de ${paquete}. Con ${velocidad} de velocidad y ${cable}.\nPrecio: ${precio}`;
    
    const phoneNumber = "51962624690";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
}

function smoothScrollTo(sectionId) {
    const target = document.getElementById(sectionId);
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
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

function mejorarPlan() {
        const mensaje = encodeURIComponent('Hola! Estoy interesado en mejorar mi plan de Internet.');
        const numeroWhatsApp = '+51903075166';
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
        window.open(urlWhatsApp, '_blank');
    }