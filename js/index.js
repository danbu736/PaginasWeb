document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA PARA EL MENÚ DE HAMBURGUESA ---
    const menuHamburguesa = document.getElementById('menu-hamburguesa');
    const navegacionMovil = document.getElementById('navegacion-movil');

    if (menuHamburguesa && navegacionMovil) {
        menuHamburguesa.addEventListener('click', () => {
            navegacionMovil.classList.toggle('esta-activo');
            menuHamburguesa.classList.toggle('esta-activo');
        });
    }


    // --- LÓGICA PARA EL CARRUSEL DE LOGOS ---
    const pistaLogos = document.getElementById('pistaLogos');
    
    if (pistaLogos) {
        const btnAnterior = document.getElementById('btnAnterior');
        const btnSiguiente = document.getElementById('btnSiguiente');
        const logos = Array.from(pistaLogos.children);
        
        // Clonar logos para un efecto de bucle infinito
        logos.forEach(logo => {
            const clon = logo.cloneNode(true);
            pistaLogos.appendChild(clon);
        });

        let posicion = 0;
        
        const anchoDeslizamiento = () => pistaLogos.children[0].getBoundingClientRect().width;

        btnSiguiente.addEventListener('click', () => {
            pistaLogos.style.transition = 'transform 0.5s ease-in-out';
            posicion++;
            pistaLogos.style.transform = `translateX(${-anchoDeslizamiento() * posicion}px)`;

            // Si llegamos al final de los logos originales
            if (posicion >= logos.length) { 
                setTimeout(() => {
                    pistaLogos.style.transition = 'none'; // Desactivamos la transición
                    posicion = 0; // Volvemos al inicio visualmente
                    pistaLogos.style.transform = `translateX(0)`;
                }, 500); // Esperamos a que la transición actual termine
            }
        });

        btnAnterior.addEventListener('click', () => {
            // Si estamos al principio, saltamos al final de los clones
            if (posicion === 0) { 
                posicion = logos.length;
                pistaLogos.style.transition = 'none';
                pistaLogos.style.transform = `translateX(${-anchoDeslizamiento() * posicion}px)`;
            }
            // Pequeño delay para que el "none" de la transición se aplique antes de mover
            setTimeout(() => { 
                pistaLogos.style.transition = 'transform 0.5s ease-in-out';
                posicion--;
                pistaLogos.style.transform = `translateX(${-anchoDeslizamiento() * posicion}px)`;
            }, 50);
        });
    }
});