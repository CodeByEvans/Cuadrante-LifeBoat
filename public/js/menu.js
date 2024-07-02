(function(){
    const openButton = document.querySelector('.nav_menu');
    const menu = document.querySelector('.nav_link');
    const closeMenu = document.querySelector('.nav_close');
    const body = document.body;

    openButton.addEventListener('click', () => {
        menu.classList.add('nav_link--show');
        body.classList.add('no-scroll'); // Bloquea el desplazamiento del cuerpo
    });

    closeMenu.addEventListener('click', () => {
        menu.classList.remove('nav_link--show');
               body.classList.remove('no-scroll'); // Desbloquea el desplazamiento del cuerpo
    });
})();


