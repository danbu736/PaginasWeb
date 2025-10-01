document.addEventListener('DOMContentLoaded', function() {
    
    const menuHamburguesa = document.getElementById('menu-hamburguesa');
    const navegacionMovil = document.getElementById('navegacion-movil');

    if (menuHamburguesa && navegacionMovil) {
        menuHamburguesa.addEventListener('click', () => {
            navegacionMovil.classList.toggle('esta-activo');
            menuHamburguesa.classList.toggle('esta-activo');
        });
    }

    const pistaLogos = document.getElementById('pistaLogos');
    
    if (pistaLogos) {
        const btnAnterior = document.getElementById('btnAnterior');
        const btnSiguiente = document.getElementById('btnSiguiente');
        const logos = Array.from(pistaLogos.children);
        
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

            if (posicion >= logos.length) { 
                setTimeout(() => {
                    pistaLogos.style.transition = 'none';
                    posicion = 0;
                    pistaLogos.style.transform = `translateX(0)`;
                }, 500); 
            }
        });

        btnAnterior.addEventListener('click', () => {
            if (posicion === 0) { 
                posicion = logos.length;
                pistaLogos.style.transition = 'none';
                pistaLogos.style.transform = `translateX(${-anchoDeslizamiento() * posicion}px)`;
            }
            setTimeout(() => { 
                pistaLogos.style.transition = 'transform 0.5s ease-in-out';
                posicion--;
                pistaLogos.style.transform = `translateX(${-anchoDeslizamiento() * posicion}px)`;
            }, 50);
        });
    }

});
