function getCardData(cardId) {
    const card = document.getElementById(cardId);
    
    const paquete = card.querySelector('#paquete').innerText;
    const internet = card.querySelector('#internet').innerText;
    const cable = card.querySelector('#info-cable').innerText;
    const precio = card.querySelector('#precio').innerText;

    alert(paquete + "\n" + internet + "\n" + cable + "\n" + precio);
}
function cargarFragmento(url, contenedorId) {
const baseUrl = '/TeleIncaWebp/';
const fullUrl = baseUrl + url;
    fetch(fullUrl)
    .then(response => response.text())
    .then(html => {
    document.getElementById(contenedorId).innerHTML = html;
    })
    .catch(error => {
    console.error('Error cargando el fragmento:', error);
    });
}
document.addEventListener("DOMContentLoaded", function() {
cargarFragmento('../templates/footer.html', 'contFoot');
cargarFragmento('../templates/nav.html', 'contNav');
});