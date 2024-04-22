(function(){
    const openButton = document.querySelector('.nav_menu');
    const menu = document.querySelector('.nav_link');
    const closeMenu = document.querySelector('.nav_close');

    openButton.addEventListener('click', () => {
        menu.classList.add('nav_link--show');

    });

    closeMenu.addEventListener('click', () => {
        menu.classList.remove('nav_link--show');
    });
})();


// Detectar si el usuario está en un dispositivo móvil
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Seleccionar los elementos .about_icon y .about_icon2
const aboutIcons = document.querySelectorAll('.about_icon, .about_icon2');

// Función para activar o desactivar el efecto de hover en dispositivos móviles
function toggleHoverEffect(event) {
    // Verificar si el dispositivo es móvil y el tipo de evento
    if (isMobile && event.type === 'touchstart') {
        // Agregar la clase hover-effect cuando se toca en dispositivos móviles
        this.classList.add('hover-effect');
    } else {
        // Quitar la clase hover-effect en otros casos
        this.classList.remove('hover-effect');
    }
}

// Agregar un listener para el evento touchstart (tapping) en dispositivos móviles
aboutIcons.forEach(icon => {
    icon.addEventListener('touchstart', toggleHoverEffect);
});

// Agregar un listener para el evento click en otros dispositivos
aboutIcons.forEach(icon => {
    icon.addEventListener('click', toggleHoverEffect);
});
