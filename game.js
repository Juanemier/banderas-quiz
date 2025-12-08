// Versión simple del Juego de Banderas en JavaScript
// Usa flagcdn.com para buscar banderas por código alpha-2
// 240+ países y territorios mundiales

// Cache DOM elements
const elements = {
  flagImg: document.getElementById('flag-img'),
  info: document.getElementById('info'),
  result: document.getElementById('result'),
  top3: document.getElementById('top3'),
  startBtn: document.getElementById('start'),
  options: Array.from(document.querySelectorAll('.opt'))
};

// Game settings
const GAME_SETTINGS = {
  questionsPerGame: 25,
  feedbackDelay: 3000,
  endGameDelay: 200
};

// Sound elements
let successSound, errorSound;

function initSounds() {
  try {
    successSound = new Audio('si.wav');
    errorSound = new Audio('no.wav');
    
    // Preload sounds
    successSound.load();
    errorSound.load();
  } catch (e) {
    console.warn('Error initializing sounds:', e);
  }
}

function playSuccessSound() {
  if (successSound) {
    successSound.currentTime = 0; // Rewind to the start
    successSound.play().catch(e => console.warn('Error playing success sound:', e));
  }
}

function playErrorSound() {
  if (errorSound) {
    errorSound.currentTime = 0; // Rewind to the start
    errorSound.play().catch(e => console.warn('Error playing error sound:', e));
  }
}

const countries = [
  { name: "Afganistán", code: "af" }, { name: "Albania", code: "al" }, { name: "Alemania", code: "de" }, { name: "Andorra", code: "ad" }, { name: "Angola", code: "ao" },
  { name: "Anguila", code: "ai" }, { name: "Antártida", code: "aq" }, { name: "Antigua y Barbuda", code: "ag" }, { name: "Arabia Saudita", code: "sa" }, { name: "Argelia", code: "dz" },
  { name: "Argentina", code: "ar" }, { name: "Armenia", code: "am" }, { name: "Aruba", code: "aw" }, { name: "Australia", code: "au" }, { name: "Austria", code: "at" },
  { name: "Azerbaiyán", code: "az" }, { name: "Bahamas", code: "bs" }, { name: "Bangladés", code: "bd" }, { name: "Barbados", code: "bb" }, { name: "Baréin", code: "bh" },
  { name: "Bélgica", code: "be" }, { name: "Belice", code: "bz" }, { name: "Benín", code: "bj" }, { name: "Bermudas", code: "bm" }, { name: "Bielorrusia", code: "by" },
  { name: "Birmania", code: "mm" }, { name: "Bolivia", code: "bo" }, { name: "Bosnia y Herzegovina", code: "ba" }, { name: "Botsuana", code: "bw" }, { name: "Brasil", code: "br" },
  { name: "Brunéi", code: "bn" }, { name: "Bulgaria", code: "bg" }, { name: "Burkina Faso", code: "bf" }, { name: "Burundi", code: "bi" }, { name: "Bután", code: "bt" },
  { name: "Cabo Verde", code: "cv" }, { name: "Camboya", code: "kh" }, { name: "Camerún", code: "cm" }, { name: "Canadá", code: "ca" }, { name: "Catar", code: "qa" },
  { name: "Chad", code: "td" }, { name: "Chile", code: "cl" }, { name: "China", code: "cn" }, { name: "Chipre", code: "cy" }, { name: "Ciudad del Vaticano", code: "va" },
  { name: "Cocos", code: "cc" }, { name: "Colombia", code: "co" }, { name: "Comoras", code: "km" }, { name: "Congo", code: "cg" }, { name: "Corea del Norte", code: "kp" },
  { name: "Corea del Sur", code: "kr" }, { name: "Costa de Marfil", code: "ci" }, { name: "Costa Rica", code: "cr" }, { name: "Croacia", code: "hr" }, { name: "Cuba", code: "cu" },
  { name: "Curazao", code: "cw" }, { name: "Dinamarca", code: "dk" }, { name: "Dominica", code: "dm" }, { name: "Ecuador", code: "ec" }, { name: "Egipto", code: "eg" },
  { name: "El Salvador", code: "sv" }, { name: "Emiratos Árabes Unidos", code: "ae" }, { name: "Eritrea", code: "er" }, { name: "Eslovaquia", code: "sk" }, { name: "Eslovenia", code: "si" },
  { name: "España", code: "es" }, { name: "Estados Unidos", code: "us" }, { name: "Estonia", code: "ee" }, { name: "Esuatini", code: "sz" }, { name: "Etiopía", code: "et" },
  { name: "Feroe", code: "fo" }, { name: "Fidji", code: "fj" }, { name: "Filipinas", code: "ph" }, { name: "Finlandia", code: "fi" }, { name: "Francia", code: "fr" },
  { name: "Guayana Francesa", code: "gf" }, { name: "Gabón", code: "ga" }, { name: "Gambia", code: "gm" }, { name: "Georgia", code: "ge" }, { name: "Georgia del Sur", code: "gs" },
  { name: "Ghana", code: "gh" }, { name: "Gibraltar", code: "gi" }, { name: "Granada", code: "gd" }, { name: "Grecia", code: "gr" }, { name: "Groenlandia", code: "gl" },
  { name: "Guadalupe", code: "gp" }, { name: "Guam", code: "gu" }, { name: "Guatemala", code: "gt" }, { name: "Guernsey", code: "gg" }, { name: "Guinea", code: "gn" },
  { name: "Guinea Ecuatorial", code: "gq" }, { name: "Guinea-Bisáu", code: "gw" }, { name: "Guyana", code: "gy" }, { name: "Haití", code: "ht" }, { name: "Honduras", code: "hn" },
  { name: "Hong Kong", code: "hk" }, { name: "Hungría", code: "hu" }, { name: "Islandia", code: "is" }, { name: "Islas Åland", code: "ax" }, { name: "Islas Caimán", code: "ky" },
  { name: "Islas Carolina", code: "fm" }, { name: "Islas Cook", code: "ck" }, { name: "Islas Feroe", code: "fo" }, { name: "Islas Heard", code: "hm" }, { name: "Islas Malvinas", code: "fk" },
  { name: "Islas Marianas del Norte", code: "mp" }, { name: "Islas Marshall", code: "mh" }, { name: "Islas Norfolk", code: "nf" }, { name: "Islas Pitcairn", code: "pn" }, { name: "Islas Salomón", code: "sb" },
  { name: "Islas Turcas y Caicos", code: "tc" }, { name: "Islas Vírgenes Británicas", code: "vg" }, { name: "Islas Vírgenes de EE.UU.", code: "vi" }, { name: "India", code: "in" }, { name: "Indonesia", code: "id" },
  { name: "Irak", code: "iq" }, { name: "Irán", code: "ir" }, { name: "Irlanda", code: "ie" }, { name: "Isla Bouvet", code: "bv" }, { name: "Isla Christmas", code: "cx" },
  { name: "Isla de Man", code: "im" }, { name: "Isla Reunión", code: "re" }, { name: "Isla Svalbard", code: "sj" }, { name: "Israel", code: "il" }, { name: "Italia", code: "it" },
  { name: "Jamaica", code: "jm" }, { name: "Japón", code: "jp" }, { name: "Jersey", code: "je" }, { name: "Jordania", code: "jo" }, { name: "Kazajistán", code: "kz" },
  { name: "Kenia", code: "ke" }, { name: "Kirguistán", code: "kg" }, { name: "Kiribati", code: "ki" }, { name: "Kuwait", code: "kw" }, { name: "Laos", code: "la" },
  { name: "Lesoto", code: "ls" }, { name: "Letonia", code: "lv" }, { name: "Líbano", code: "lb" }, { name: "Liberia", code: "lr" }, { name: "Libia", code: "ly" },
  { name: "Liechtenstein", code: "li" }, { name: "Lituania", code: "lt" }, { name: "Luxemburgo", code: "lu" }, { name: "Macao", code: "mo" }, { name: "Macedonia", code: "mk" },
  { name: "Madagascar", code: "mg" }, { name: "Malasia", code: "my" }, { name: "Maldivas", code: "mv" }, { name: "Mali", code: "ml" }, { name: "Malta", code: "mt" },
  { name: "Marruecos", code: "ma" }, { name: "Martinica", code: "mq" }, { name: "Mauricio", code: "mu" }, { name: "Mauritania", code: "mr" }, { name: "Mayotte", code: "yt" },
  { name: "Méjico", code: "mx" }, { name: "Micronesia", code: "fm" }, { name: "Moldavia", code: "md" }, { name: "Mónaco", code: "mc" }, { name: "Mongolia", code: "mn" },
  { name: "Montenegro", code: "me" }, { name: "Montserrat", code: "ms" }, { name: "Mozambique", code: "mz" }, { name: "Namibia", code: "na" }, { name: "Nauru", code: "nr" },
  { name: "Nepal", code: "np" }, { name: "Nicaragua", code: "ni" }, { name: "Níger", code: "ne" }, { name: "Nigeria", code: "ng" }, { name: "Niue", code: "nu" },
  { name: "Noruega", code: "no" }, { name: "Nueva Caledonia", code: "nc" }, { name: "Nueva Zelanda", code: "nz" }, { name: "Omán", code: "om" }, { name: "Países Bajos", code: "nl" },
  { name: "Pakistán", code: "pk" }, { name: "Palaos", code: "pw" }, { name: "Palestina", code: "ps" }, { name: "Panamá", code: "pa" }, { name: "Papúa Nueva Guinea", code: "pg" },
  { name: "Paraguay", code: "py" }, { name: "Perú", code: "pe" }, { name: "Polinesia Francesa", code: "pf" }, { name: "Polonia", code: "pl" }, { name: "Portugal", code: "pt" },
  { name: "Puerto Rico", code: "pr" }, { name: "República Centroafricana", code: "cf" }, { name: "República Checa", code: "cz" }, { name: "República Democrática del Congo", code: "cd" }, { name: "República Dominicana", code: "do" },
  { name: "Reino Unido", code: "gb" }, { name: "Ruanda", code: "rw" }, { name: "Rumania", code: "ro" }, { name: "Rusia", code: "ru" }, { name: "Sahara Occidental", code: "eh" },
  { name: "Samoa", code: "ws" }, { name: "Samoa Americana", code: "as" }, { name: "San Cristóbal y Nieves", code: "kn" }, { name: "San Marino", code: "sm" }, { name: "San Martín", code: "mf" },
  { name: "San Pedro y Miquelón", code: "pm" }, { name: "San Vicente y las Granadinas", code: "vc" }, { name: "Santa Elena", code: "sh" }, { name: "Santa Lucía", code: "lc" }, { name: "Santo Tomé y Príncipe", code: "st" },
  { name: "Senegal", code: "sn" }, { name: "Serbia", code: "rs" }, { name: "Seychelles", code: "sc" }, { name: "Sierra Leona", code: "sl" }, { name: "Singapur", code: "sg" },
  { name: "Sint Maarten", code: "sx" }, { name: "Siria", code: "sy" }, { name: "Somalia", code: "so" }, { name: "Sri Lanka", code: "lk" }, { name: "Sudáfrica", code: "za" },
  { name: "Sudán", code: "sd" }, { name: "Sudán del Sur", code: "ss" }, { name: "Suecia", code: "se" }, { name: "Suiza", code: "ch" }, { name: "Surinam", code: "sr" },
  { name: "Tailandia", code: "th" }, { name: "Taiwán", code: "tw" }, { name: "Tanzania", code: "tz" }, { name: "Tayikistán", code: "tj" }, { name: "Territorio Británico del Océano Índico", code: "io" },
  { name: "Timor Oriental", code: "tl" }, { name: "Togo", code: "tg" }, { name: "Tokelau", code: "tk" }, { name: "Tonga", code: "to" }, { name: "Trinidad y Tobago", code: "tt" },
  { name: "Túnez", code: "tn" }, { name: "Turkmenistán", code: "tm" }, { name: "Turquía", code: "tr" }, { name: "Tuvalu", code: "tv" }, { name: "Ucrania", code: "ua" },
  { name: "Uganda", code: "ug" }, { name: "Uruguay", code: "uy" }, { name: "Uzbekistán", code: "uz" }, { name: "Vanuatu", code: "vu" }, { name: "Venezuela", code: "ve" },
  { name: "Vietnam", code: "vn" }, { name: "Wallis y Futuna", code: "wf" }, { name: "Yemen", code: "ye" }, { name: "Yibuti", code: "dj" }, { name: "Zambia", code: "zm" },
  { name: "Zimbabue", code: "zw" }
];

let pool = [], currentIndex = 0, score = 0, options = [];
let ranking = [];
// Compute API_URL dynamically so mobile devices can use the same host when
// the page is opened via http://<host>:<port>
let API_URL;
if(location.protocol === 'file:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1'){
  API_URL = 'http://localhost:3000';
} else {
  // Use the page's hostname (works when you serve the static files from the same machine
  // and access them via http://<DESKTOP_IP>:8000 on your mobile device)
  API_URL = location.protocol + '//' + location.hostname + ':3000';
}
function setStartText(text) {
  if (elements.startBtn) elements.startBtn.textContent = text;
}

function showStart(text = 'JUGAR') {
  if (elements.startBtn) {
    elements.startBtn.style.display = 'inline-block';
    elements.startBtn.textContent = text;
  }
}

function hideStart() {
  if (elements.startBtn) elements.startBtn.style.display = 'none';
}

function setOptionsEnabled(enabled) {
  elements.options.forEach(btn => btn.disabled = !enabled);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startGame() {
  pool = [...countries];
  shuffle(pool);
  pool = pool.slice(0, GAME_SETTINGS.questionsPerGame);
  currentIndex = 0;
  score = 0;
  elements.result.textContent = '';
  elements.info.textContent = `Pregunta 1 de ${pool.length}`;
  hideStart();
  setOptionsEnabled(true);
  renderTop3();
  showQuestion();
}

function showQuestion() {
  if (currentIndex >= pool.length) {
    endGame();
    return;
  }
  
  const item = pool[currentIndex];
  elements.flagImg.src = `https://flagcdn.com/w320/${item.code}.png`;
  
  // Get 3 random incorrect options
  const others = countries
    .filter(c => c.name !== item.name)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  
  options = [item, ...others];
  shuffle(options);
  
  // Update option buttons
  elements.options.forEach((btn, i) => {
    btn.textContent = options[i].name;
  });
  
  elements.info.textContent = `Pregunta ${currentIndex + 1} de ${pool.length} — Puntos: ${score}`;
}

function handleChoice(choiceIndex) {
  const chosen = options[choiceIndex];
  const correct = pool[currentIndex];
  
  if (chosen.name === correct.name) {
    score++;
    elements.result.textContent = '¡CORRECTO!';
    elements.result.className = 'result success';
    playSuccessSound();
  } else {
    elements.result.textContent = `INCORRECTO — Era: ${correct.name}`;
    elements.result.className = 'result error';
    playErrorSound();
  }

  setOptionsEnabled(false);
  
  setTimeout(() => {
    currentIndex++;
    elements.result.textContent = '';
    elements.result.className = 'result';
    setOptionsEnabled(true);
    showQuestion();
  }, GAME_SETTINGS.feedbackDelay);
}

function endGame() {
  elements.info.textContent = `Fin. Has acertado ${score} de ${pool.length}`;
  elements.flagImg.src = '';
  elements.options.forEach(btn => btn.textContent = '');
  setOptionsEnabled(false);
  
  setTimeout(() => {
    const name = prompt('Introduce tu nombre para el ranking (Top 10):', 'Jugador');
    if(name){
      fetch(API_URL + '/api/ranking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, score: score, total: pool.length })
      })
      .then(res => res.json())
      .then(data => {
        if(data.success){
          ranking = data.ranking;
        }
      })
      .catch(err => console.error('Error al enviar ranking:', err))
      .finally(() => {
        renderTop3();
        renderTop10();
        showStart();
      });
    } else {
      renderTop3();
      renderTop10();
      showStart('Volver a jugar');
    }
  }, 200);
}

function renderTop3() {
  const top = ranking.slice(0, 3);
  if (top.length === 0) {
    elements.top3.innerHTML = '<h4>Ranking</h4><em>No hay top aún</em>';
    return;
  }
  const lines = top.map((e, i) => 
    `<strong>${i + 1}.</strong> ${e.name} — ${e.score}/${e.total}`
  );
  elements.top3.innerHTML = `<h4>Ranking</h4>${lines.join('<br>')}`;
}

function renderTop10() {
  if (ranking.length === 0) return;
  const txt = ranking
    .slice(0, 10)
    .map((e, i) => `${i + 1}. ${e.name} — ${e.score}/${e.total}`)
    .join('\n');
  alert(`Top 10:\n${txt}`);
}

async function loadRanking() {
  try {
    const res = await fetch(`${API_URL}/api/ranking`);
    ranking = await res.json();
    renderTop3();
  } catch (err) {
    console.error('Error cargando ranking:', err);
    ranking = [];
  }
}

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Initialize sounds
  initSounds();
  
  // Add data-index attributes to option buttons
  elements.options.forEach((btn, index) => {
    btn.dataset.index = index;
  });
  
  // Single event listener for all option buttons
  document.querySelector('.options-container')?.addEventListener('click', (e) => {
    const button = e.target.closest('.opt');
    if (button) {
      handleChoice(parseInt(button.dataset.index));
    }
  });

  loadRanking();
  elements.info.textContent = 'Pulsa JUGAR para comenzar';
  elements.startBtn?.addEventListener('click', startGame);
});
