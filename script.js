// Selecciona el botón de hamburguesa y el menú de navegación
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links li");

// Evento de clic en el botón de hamburguesa
burger.addEventListener("click", () => {
  // Alternar la visibilidad del menú de navegación
  navLinks.classList.toggle("active");

  // Animación del botón de hamburguesa (cambia de estado)
  burger.classList.toggle("toggle");

  // Agrega una animación a los enlaces del menú con un pequeño error
  navItems.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = ""; // Si ya tiene animación, la quita
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 7 + 0.3
      }s`;
    }
  });
});

// Agrega desplazamiento suave a todos los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del enlace
    if (this.getAttribute("href") === "#") return; // Ignora enlaces vacíos

    // Obtiene el elemento de destino según el href del enlace
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // Ajusta el desplazamiento para compensar la barra superior
        behavior: "smooth", // Efecto de desplazamiento suave
      });

      // Si el menú móvil está abierto, lo cierra después de hacer clic
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        burger.classList.remove("toggle");
        navItems.forEach((link) => {
          link.style.animation = "";
        });
      }
    }
  });
});

// Agrega una clase "sticky" a la barra superior cuando el usuario hace scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".barra-superior");
  header.classList.toggle("sticky", window.scrollY > 0); // Se activa si el usuario ha hecho scroll
});

// Función para animar elementos cuando aparecen en la pantalla
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".servicio, .team-member");
  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top; // Posición del elemento en relación con la ventana
    const screenPosition = window.innerHeight / 1.2; // Umbral para activar la animación
    if (elementPosition < screenPosition) {
      element.style.opacity = "1"; // Hace visible el elemento
      element.style.transform = "translateY(0)"; // Lo mueve a su posición original
    }
  });
};

// Configura el estado inicial de los elementos animados
document.querySelectorAll(".servicio, .team-member").forEach((element) => {
  element.style.opacity = "0"; // Los oculta inicialmente
  element.style.transform = "translateY(20px)"; // Las posiciones más abajo para la animación
  element.style.transition = "all 0.5s ease"; // Aplica una transición suave
});

// Ejecuta la animación al hacer scroll y al cargar la página
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);
