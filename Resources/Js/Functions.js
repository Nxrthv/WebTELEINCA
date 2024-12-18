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

function internet() {
    window.location.href = "/Views/Internet.html";
}

window.onscroll = function() {
    stickyNav();
  };
  
  var navbar = document.getElementById("navbar");
  var sticky = navbar.offsetTop;
  
  function stickyNav() {
    if (window.pageYOffset > sticky) {
      navbar.classList.add("fixed");
    } else {
      navbar.classList.remove("fixed");
    }
  }
  