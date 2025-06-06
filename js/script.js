const inicio = new Date("2020-10-12T17:34:00");

function atualizarTempo() {
  const agora = new Date();

  let anos = agora.getFullYear() - inicio.getFullYear();
  let meses = agora.getMonth() - inicio.getMonth();
  let dias = agora.getDate() - inicio.getDate();
  let horas = agora.getHours() - inicio.getHours();
  let minutos = agora.getMinutes() - inicio.getMinutes();
  let segundos = agora.getSeconds() - inicio.getSeconds();

  if (segundos < 0) {
    segundos += 60;
    minutos--;
  }
  if (minutos < 0) {
    minutos += 60;
    horas--;
  }
  if (horas < 0) {
    horas += 24;
    dias--;
  }
  if (dias < 0) {
    const mesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0);
    dias += mesAnterior.getDate();
    meses--;
  }
  if (meses < 0) {
    meses += 12;
    anos--;
  }

  const partes = [];
  if (anos > 0) partes.push(`<strong>${anos}</strong> ${anos === 1 ? "ano" : "anos"}`);
  if (meses > 0) partes.push(`<strong>${meses}</strong> ${meses === 1 ? "mês" : "meses"}`);
  if (dias > 0) partes.push(`<strong>${dias}</strong> ${dias === 1 ? "dia" : "dias"}`);
  if (horas > 0) partes.push(`<strong>${horas}</strong> ${horas === 1 ? "hora" : "horas"}`);
  if (minutos > 0) partes.push(`<strong>${minutos}</strong> ${minutos === 1 ? "minuto" : "minutos"}`);
  if (segundos >= 0) partes.push(`<strong>${segundos}</strong> ${segundos === 1 ? "segundo" : "segundos"}`);

  document.getElementById("contador").innerHTML = 
    `Me aguentando há ${partes.join(", ")} 💞`;
}

setInterval(atualizarTempo, 1000);
atualizarTempo();

const track = document.getElementById("carouselTrack");
const totalImgs = track.children.length;
let index = 0;
let autoSlideInterval;

function mostrarImagem(i) {
  track.style.transform = `translateX(-${i * 100}%)`;
}

function iniciarAutoSlide() {
  autoSlideInterval = setInterval(() => {
    index = (index + 1) % totalImgs;
    mostrarImagem(index);
  }, 5000);
}

function resetarAutoSlide() {
  clearInterval(autoSlideInterval);
  iniciarAutoSlide();
}

// Iniciar carrossel automático ao carregar
iniciarAutoSlide();

// Swipe com transição
let startX = 0;
const carousel = document.getElementById("carousel");

carousel.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      // swipe para a direita
      index = index === 0 ? totalImgs - 1 : index - 1;
    } else {
      // swipe para a esquerda
      index = (index + 1) % totalImgs;
    }
    mostrarImagem(index);
    resetarAutoSlide();
  }
});