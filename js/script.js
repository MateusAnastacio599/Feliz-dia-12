window.addEventListener("DOMContentLoaded", () => {
  fetch('musicas.json')
    .then(res => res.json())
    .then(musicas => {
      const sorteada = musicas[Math.floor(Math.random() * musicas.length)];

      document.querySelector(".music-title").textContent = sorteada.titulo;
      document.querySelector(".music-artist").textContent = sorteada.artista;
      document.querySelector(".music-cover").src = sorteada.capa;
      document.getElementById("player").src = sorteada.arquivo;
    })
    .catch(err => console.error("Erro ao carregar músicas:", err));
});

const reloadBtn = document.querySelector('.reload-btn');
const reloadIcon = document.getElementById('relod-icon');

reloadBtn.addEventListener('click', () => {
  reloadIcon.style.animation = 'none';
  reloadIcon.offsetHeight; // força o repaint
  reloadIcon.style.animation = 'spin 0.5s ease';
  
  const player = document.getElementById("player");
  player.currentTime = 0;
  player.play();
});



const player = document.getElementById("player");
const btnPlayPause = document.getElementById("btnPlayPause");
const playPauseIcon = document.getElementById("playPauseIcon");

btnPlayPause.addEventListener("click", () => {
  if (player.paused) {
    player.play();
    playPauseIcon.src = "img/icones/pause-svgrepo-com.svg";
  } else {
    player.pause();
    playPauseIcon.src = "img/icones/play-svgrepo-com.svg";
  }
});


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

iniciarAutoSlide();

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
      index = index === 0 ? totalImgs - 1 : index - 1;
    } else {
      index = (index + 1) % totalImgs;
    }
    mostrarImagem(index);
    resetarAutoSlide();
  }
});

const livroDeAventuras = `
  <a class="titulo2">
    <span style="color: #e63946; ">N</span>
    <span style="color: #f1fa8c;">o</span>
    <span style="color: #a8dadc;">s</span>
    <span style="color: #457b9d;">s</span>
    <span style="color: #ff6b6b;">o</span>
    &nbsp;
    <span style="color: #6a4c93;">L</span>
    <span style="color: #ff9f1c;">i</span>
    <span style="color: #2ec4b6;">v</span>
    <span style="color: #e63946;">r</span>
    <span style="color: #f1fa8c;">o</span>
    &nbsp;
    <span style="color: #a8dadc;">d</span>
    <span style="color: #457b9d;">e</span>
    &nbsp;
    <span style="color: #ff6b6b;">A</span>
    <span style="color: #6a4c93;">v</span>
    <span style="color: #ff9f1c;">e</span>
    <span style="color: #2ec4b6;">n</span>
    <span style="color: #e63946;">t</span>
    <span style="color: #f1fa8c;">u</span>
    <span style="color: #a8dadc;">r</span>
    <span style="color: #457b9d;">a</span>
    <span style="color: #ff6b6b;">s</span>
  </a>
`;
document.getElementById("meuTituloContainer").innerHTML = livroDeAventuras;



