document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA PARA EL MENÚ DE HAMBURGUESA ---
    const hamburger = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            mobileNav.classList.toggle('is-active');
            hamburger.classList.toggle('is-active');
        });
    }


    // --- LÓGICA PARA EL CARRUSEL DE LOGOS ---
    // (Esta sección es para un carrusel que puede estar en otra página, como la de inicio)
    const logosTrack = document.getElementById('logosTrack');
    
    if (logosTrack) {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const logos = Array.from(logosTrack.children);
        
        // Clonar logos para un efecto de bucle infinito
        logos.forEach(logo => {
            const clone = logo.cloneNode(true);
            logosTrack.appendChild(clone);
        });

        let position = 0;
        let logoWidth = logos.length > 0 ? logos[0].getBoundingClientRect().width : 0;
        
        // Función para actualizar el ancho del logo
        function updateLogoWidth() {
            if (logos.length > 0) {
                logoWidth = logos[0].getBoundingClientRect().width;
            }
        }
        
        // Actualizar al cargar y al cambiar el tamaño de la ventana
        updateLogoWidth();
        window.addEventListener('resize', updateLogoWidth);

        const slideWidth = () => logosTrack.children[0].getBoundingClientRect().width;

        nextBtn.addEventListener('click', () => {
            logosTrack.style.transition = 'transform 0.5s ease-in-out';
            position++; // Incrementamos la posición
            logosTrack.style.transform = `translateX(${-slideWidth() * position}px)`;

            if (position >= logos.length) { // Si llegamos al final de los logos originales
                setTimeout(() => {
                    logosTrack.style.transition = 'none'; // Desactivamos la transición
                    position = 0; // Volvemos al inicio visualmente
                    logosTrack.style.transform = `translateX(0)`;
                }, 500); // Esperamos a que la transición actual termine
            }
        });

        prevBtn.addEventListener('click', () => {
            if (position === 0) { // Si estamos al principio, saltamos al final de los clones
                position = logos.length;
                logosTrack.style.transition = 'none';
                logosTrack.style.transform = `translateX(${-slideWidth() * position}px)`;
            }
            setTimeout(() => { // Pequeño delay para que el "none" de la transición se aplique antes de mover
                logosTrack.style.transition = 'transform 0.5s ease-in-out';
                position--;
                logosTrack.style.transform = `translateX(${-slideWidth() * position}px)`;
            }, 50);
        });
    }
});