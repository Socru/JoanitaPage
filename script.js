/* =========================
   MODAL CON ANIMACIÓN Y CORAZONES
========================= */

const modal = document.getElementById("modalAmor");
const abrir = document.getElementById("abrirModal");
const cerrar = document.getElementById("cerrarModal");

abrir.addEventListener("click", () => {
    modal.style.display = "flex";
    modal.style.animation = "fadeInModal 0.4s ease";
    crearCorazones();
});

cerrar.addEventListener("click", cerrarModal);

window.addEventListener("click", (e) => {
    if (e.target === modal) cerrarModal();
});

function cerrarModal() {
    modal.style.animation = "fadeOutModal 0.3s ease";
    setTimeout(() => {
        modal.style.display = "none";
    }, 250);
}

function crearCorazones() {
    for (let i = 0; i < 15; i++) {
        const corazon = document.createElement("div");
        corazon.innerHTML = "💜";
        corazon.style.position = "fixed";
        corazon.style.left = Math.random() * 100 + "vw";
        corazon.style.bottom = "-20px";
        corazon.style.fontSize = (Math.random() * 20 + 15) + "px";
        corazon.style.animation = "subirCorazon 3s linear forwards";
        corazon.style.pointerEvents = "none";
        document.body.appendChild(corazon);
        setTimeout(() => corazon.remove(), 3000);
    }
}

/* =========================
   CARRUSEL INTERACTIVO
========================= */

function activarCarrusel(id) {
    const track = document.getElementById(id);
    if (!track) return;

    const items = track.children;
    let index = 0;

    // Función para centrar el elemento
    function actualizarCarrusel() {
        const itemWidth = items[0].offsetWidth + 20; // 20 = gap entre items
        track.style.transform = `translateX(-${index * itemWidth}px)`;
    }

    // Click en imagen o video
    Array.from(items).forEach((item, i) => {
        item.addEventListener("click", () => {
            index = i;
            actualizarCarrusel();
        });
    });

    // Swipe para móvil
    let startX = 0;
    track.addEventListener("touchstart", (e) => startX = e.touches[0].clientX);

    track.addEventListener("touchend", (e) => {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 50 && index < items.length - 1) {
            index++;
        } else if (endX - startX > 50 && index > 0) {
            index--;
        }
        actualizarCarrusel();
    });

    // Opcional: auto-carrusel cada 3s
    setInterval(() => {
        index++;
        if (index >= items.length) index = 0;
        actualizarCarrusel();
    }, 5000);
}

// Activar ambos carruseles
activarCarrusel("carruselImagenes");
function carruselVideosInteractivo(trackId, btnPrevId, btnNextId) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(btnPrevId);
    const nextBtn = document.getElementById(btnNextId);
    if (!track || !prevBtn || !nextBtn) return;

    const items = Array.from(track.children);
    let index = 0;

    function centrarVideo() {
        if (items.length === 0) return;

        const gap = parseInt(getComputedStyle(track).gap) || 20;
        const itemWidth = items[0].offsetWidth;
        track.style.transform = `translateX(-${index * (itemWidth + gap)}px)`;
    }

    // Centrar primer video al cargar
    window.addEventListener("load", centrarVideo);
    window.addEventListener("resize", centrarVideo);

    // Botones
    prevBtn.addEventListener("click", () => {
        if (index > 0) index--;
        centrarVideo();
    });

    nextBtn.addEventListener("click", () => {
        if (index < items.length - 1) index++;
        centrarVideo();
    });

    // Click en video centra y pausa los demás
    items.forEach((video, i) => {
        video.addEventListener("click", () => {
            index = i;
            centrarVideo();
        });
        video.addEventListener("play", () => {
            items.forEach((v, j) => { if (j !== i && !v.paused) v.pause(); });
        });
    });

    // Swipe móvil
    let startX = 0;
    track.addEventListener("touchstart", e => startX = e.touches[0].clientX);
    track.addEventListener("touchend", e => {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 50 && index < items.length - 1) index++;
        else if (endX - startX > 50 && index > 0) index--;
        centrarVideo();
    });
}

// Activar carrusel
carruselVideosInteractivo("carruselVideosSolo", "prevVideo", "nextVideo");
