let slideIndex = 0;
let slideInterval;

function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides");
  if (slides.length === 0) return;
  if (n === undefined) n = ++slideIndex;
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

function nextSlide() {
  showSlides(slideIndex + 1);
  resetSlideInterval();
}
function prevSlide() {
  showSlides(slideIndex - 1);
  resetSlideInterval();
}
function resetSlideInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => showSlides(), 8000);
}

document.addEventListener("DOMContentLoaded", function() {
  // Selecciona solo los slides con imágenes que empiezan con imagen_
  const slides = Array.from(document.querySelectorAll('.mySlides')).filter(slide => {
    const img = slide.querySelector('img');
    return img && img.src.includes('imagen_');
  });
  let slideIndex = 1;
  let slideInterval;

  function showSlides(n) {
    if (slides.length === 0) return;
    if (n === undefined) n = slideIndex + 1;
    if (n > slides.length) n = 1;
    if (n < 1) n = slides.length;
    slideIndex = n;
    slides.forEach(s => s.style.display = "none");
    slides[slideIndex - 1].style.display = "block";
  }

  function nextSlide() {
    showSlides(slideIndex + 1);
    resetSlideInterval();
  }
  function prevSlide() {
    showSlides(slideIndex - 1);
    resetSlideInterval();
  }
  function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => showSlides(), 8000);
  }

  showSlides(slideIndex);
  slideInterval = setInterval(() => showSlides(), 8000);

  // Agregar controles al slideshow si no existen
  const slideshow = document.querySelector('.slideshow-container');
  if (slideshow && !slideshow.querySelector('.slideshow-control')) {
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '⟨';
    prevBtn.className = 'slideshow-control prev';
    prevBtn.onclick = prevSlide;
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '⟩';
    nextBtn.className = 'slideshow-control next';
    nextBtn.onclick = nextSlide;
    slideshow.appendChild(prevBtn);
    slideshow.appendChild(nextBtn);
  }

  // Navegación suave
  document.querySelectorAll('nav.menu-fijo ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 90,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // SUBPÁGINAS animadas
  const subpaginas = [
    'sub-formulario',
    'sub-reciclaje',
    'sub-gestion',
    'sub-consultoria',
    'sub-resenas',
    'sub-videos',
    'sub-calculadora',
    'sub-puntos'
  ];
  const inicioRenova = document.getElementById('inicio-renova');

  function mostrarSubpagina(id) {
    subpaginas.forEach(sid => {
      const el = document.getElementById(sid);
      if (el) {
        el.classList.remove('activa');
        el.style.display = 'none';
      }
    });
    if (!id || id === 'inicio-renova') {
      if (inicioRenova) inicioRenova.style.display = '';
      return;
    }
    if (inicioRenova) inicioRenova.style.display = 'none';
    const activa = document.getElementById(id);
    if (activa) {
      activa.style.display = '';
      void activa.offsetWidth;
      activa.classList.add('activa');
    }
  }
  mostrarSubpagina('inicio-renova');

  // Asignar eventos a los botones de la barra informativa
  const botones = document.querySelectorAll('.barra-informativa .mi-boton');
  const subpaginaPorBoton = [
    'inicio-renova',
    'sub-formulario',
    'sub-reciclaje',
    'sub-gestion',
    'sub-consultoria',
    'sub-resenas',
    'sub-videos'
  ];
  botones.forEach((btn, idx) => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      mostrarSubpagina(subpaginaPorBoton[idx]);
      window.scrollTo({ top: document.querySelector('.barra-informativa').offsetTop + document.querySelector('.barra-informativa').offsetHeight, behavior: 'smooth' });
    });
  });

  // Asignar eventos a los enlaces del menú fijo
  const menuLinks = document.querySelectorAll('.menu-fijo ul li a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const text = this.textContent.trim().toLowerCase();
      e.preventDefault();
      if (text === 'inicio') {
        mostrarSubpagina('inicio-renova');
      } else if (text === 'clasificador') {
        mostrarSubpagina('sub-reciclaje');
      } else if (text === 'calculadora') {
        mostrarSubpagina('sub-calculadora');
      } else if (text === 'puntos de reciclaje') {
        mostrarSubpagina('sub-puntos');
      }
      window.scrollTo({ top: document.querySelector('.barra-informativa').offsetTop + document.querySelector('.barra-informativa').offsetHeight, behavior: 'smooth' });
    });
  });

  // Formulario de contacto
  const formContacto = document.getElementById('form-contacto');
  if (formContacto) {
    formContacto.addEventListener('submit', function(e) {
      e.preventDefault();
      const nombre = document.getElementById('nombreContacto').value.trim();
      const correo = document.getElementById('correoContacto').value.trim();
      const asunto = document.getElementById('asuntoContacto').value.trim();
      const mensaje = document.getElementById('mensajeContacto').value.trim();
      const mensajeDiv = document.getElementById('mensaje-form-contacto');
      // Validación simple
      if (!nombre || !correo || !asunto || !mensaje) {
        mensajeDiv.textContent = 'Por favor, completa todos los campos.';
        mensajeDiv.style.color = '#E57373';
        return;
      }
      // Simula envío exitoso
      mensajeDiv.textContent = '¡Gracias por contactarnos! Te responderemos pronto.';
      mensajeDiv.style.color = 'var(--color-principal)';
      formContacto.reset();
    });
  }
});

window.addEventListener('scroll', function() {
  const menu = document.querySelector('.menu-fijo');
  if (window.scrollY > 50) {
    menu.classList.add('scrolled');
  } else {
    menu.classList.remove('scrolled');
  }
});

function clasificarResiduo() {
  const residuo = document.getElementById('nombreResiduo').value.trim().toLowerCase();
  let tipo, color, icono;
  switch (residuo) {
    case 'manzana':
    case 'plátano':
    case 'cáscara de huevo':
      tipo = 'Orgánico'; color = '#A1887F'; icono = '🍃'; break;
    case 'botella de plástico':
    case 'bolsa de plástico':
    case 'plástico':
      tipo = 'Plástico'; color = '#81D4FA'; icono = '🧴'; break;
    case 'botella de vidrio':
    case 'frasco':
    case 'vidrio':
      tipo = 'Vidrio'; color = '#A5D6A7'; icono = '🍾'; break;
    case 'periódico':
    case 'caja de cartón':
    case 'hojas de papel':
    case 'papel':
    case 'cartón':
      tipo = 'Papel/Cartón'; color = '#FFF9C4'; icono = '📄'; break;
    case 'lata':
    case 'aluminio':
    case 'metal':
      tipo = 'Metal/Aluminio'; color = '#FFD54F'; icono = '🥫'; break;
    default:
      tipo = 'No identificado'; color = '#E57373'; icono = '❓';
  }
  document.getElementById('resultado').innerHTML = `<span style="color:${color};font-size:1.3em;">${icono} Tipo de residuo: <b>${tipo}</b></span>`;
}

function initMapa() {
  const ubicacionInicial = { lat: 14.6349, lng: -90.5069 }; 
  const mapa = new google.maps.Map(document.getElementById("mapa"), {
    center: ubicacionInicial,
    zoom: 12,
  });

  new google.maps.Marker({
    position: ubicacionInicial,
    map: mapa,
    title: "Punto de reciclaje",
  });
}

function calcularImpacto() {
  let material = document.getElementById("material").value;
  let cantidad = parseFloat(document.getElementById("cantidad").value);
  if (isNaN(cantidad) || cantidad <= 0) {
    document.getElementById("resultados").innerHTML = '<span style="color:#E57373;">Por favor, ingresa una cantidad válida mayor a 0.</span>';
    return;
  }
  let ahorroAgua, reduccionCO2, ahorroEnergia, mensaje;
  switch(material) {
    case "papel":
      ahorroAgua = cantidad * 20;
      reduccionCO2 = cantidad * 5;
      ahorroEnergia = cantidad * 10;
      mensaje = '¡Reciclar papel salva árboles y agua!';
      break;
    case "plastico":
      ahorroAgua = cantidad * 10;
      reduccionCO2 = cantidad * 15;
      ahorroEnergia = cantidad * 25;
      mensaje = '¡Reciclar plástico reduce la contaminación!';
      break;
    case "vidrio":
      ahorroAgua = cantidad * 5;
      reduccionCO2 = cantidad * 8;
      ahorroEnergia = cantidad * 20;
      mensaje = '¡El vidrio reciclado ahorra mucha energía!';
      break;
    case "metal":
      ahorroAgua = cantidad * 3;
      reduccionCO2 = cantidad * 12;
      ahorroEnergia = cantidad * 30;
      mensaje = '¡Reciclar metales ahorra recursos valiosos!';
      break;
    default:
      ahorroAgua = reduccionCO2 = ahorroEnergia = 0;
      mensaje = '';
  }
  document.getElementById("resultados").innerHTML = 
    `<p>Has ahorrado <strong>${ahorroAgua} litros de agua</strong></p>
    <p>Has reducido <strong>${reduccionCO2} kg de CO₂</strong></p>
    <p>Has ahorrado <strong>${ahorroEnergia} kWh de energía</strong></p>
    <p style='color:var(--color-principal);font-weight:bold;'>${mensaje}</p>`;
}

// Mapa interactivo de puntos de reciclaje
function initMapaReciclaje() {
  var contenedor = document.getElementById('mapa-reciclaje');
  if (!contenedor) return;
  // Coordenadas de ejemplo: Ciudad de Guatemala
  var centro = { lat: 14.6349, lng: -90.5069 };
  var mapa = new google.maps.Map(contenedor, {
    center: centro,
    zoom: 13,
    mapTypeControl: false,
    streetViewControl: false
  });
  // Puntos de reciclaje de ejemplo
  var puntos = [
    { lat: 14.6349, lng: -90.5069, nombre: 'Punto Central' },
    { lat: 14.6225, lng: -90.5315, nombre: 'Centro de Acopio Zona 12' },
    { lat: 14.6427, lng: -90.5132, nombre: 'Punto Verde Zona 10' },
    { lat: 14.6090, lng: -90.5250, nombre: 'Reciclaje Zona 7' }
  ];
  puntos.forEach(function(p) {
    new google.maps.Marker({
      position: { lat: p.lat, lng: p.lng },
      map: mapa,
      title: p.nombre
    });
  });
}

window.initMapaReciclaje = initMapaReciclaje;
window.initMap = initMapaReciclaje;

  

    

   