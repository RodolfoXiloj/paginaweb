

document.addEventListener("DOMContentLoaded", function() {
  let slideIndex = 0;
  showSlides();

  function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex - 1].style.display = "block";  
    setTimeout(showSlides, 8000); 
  }
});

window.addEventListener('scroll', function() {
  const menu = document.querySelector('.menu-fijo');
  if (window.scrollY > 50) {
    menu.classList.add('scrolled');
  } 
  else {
    menu.classList.remove('scrolled');
  }
});


function clasificarResiduo() {
  const residuo = document.getElementById('nombreResiduo').value.toLowerCase();
  let tipo;

  switch (residuo) {
    case 'manzana':
    case 'plátano':
    case 'cáscara de huevo':
      tipo = 'Orgánico Deposite en Recipiente Color Marron';
      break;
    case 'botella de plástico':
    case 'bolsa de plástico':
      tipo = 'Plástico Deposite en Recipiente Color Azul';
      break;
    case 'botella de vidrio':
    case 'frasco':
      tipo = 'Vidrio Deposite en Recipiente Color Verde';
      break;
    case 'periódico':
    case 'caja de cartón':
    case 'hojas de papel':
      tipo = 'Papel/Cartón Deposite en Recioiente Color Azul';
      break;
    case 'lata':
    case 'aluminio':
      tipo = 'Metal/Aluminio Recipinte Color Amarillo';
      break;
    default:
      tipo = 'No lo se Rick';
  }

  document.getElementById('resultado').innerText = `Tipo de residuo: ${tipo}`;
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

    let ahorroAgua, reduccionCO2, ahorroEnergia;

    switch(material) {
        case "papel":
            ahorroAgua = cantidad * 20; 
            reduccionCO2 = cantidad * 5; 
            ahorroEnergia = cantidad * 10;
            break;
        case "plastico":
            ahorroAgua = cantidad * 10;
            reduccionCO2 = cantidad * 15; 
            ahorroEnergia = cantidad * 25;
            break;
        case "vidrio":
            ahorroAgua = cantidad * 5;
            reduccionCO2 = cantidad * 8; 
            ahorroEnergia = cantidad * 20;
            break;
        case "metal":
            ahorroAgua = cantidad * 3;
            reduccionCO2 = cantidad * 12; 
            ahorroEnergia = cantidad * 30;
            break;
        default:
            ahorroAgua = reduccionCO2 = ahorroEnergia = 0;
    }

    document.getElementById("resultados").innerHTML = 
        `<p>Has ahorrado <strong>${ahorroAgua} litros de agua</strong></p>
        <p>Has reducido <strong>${reduccionCO2} kg de CO₂</strong></p>
        <p>Has ahorrado <strong>${ahorroEnergia} kWh de energía</strong></p>`;
}


  

    

   