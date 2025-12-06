// Versión simple del Juego de Banderas en JavaScript
// Usa flagcdn.com para buscar banderas por código alpha-2
// 254 países y territorios mundiales

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
  { name: "Hong Kong", code: "hk" }, { name: "Hungría", code: "hu" }, { name: "Islandia", code: "is" }, { name: "Islas Åland", code: "ax" }, { name: "Islas Bermuda", code: "bm" },
  { name: "Islas Caimán", code: "ky" }, { name: "Islas Carolina", code: "fm" }, { name: "Islas Cocos", code: "cc" }, { name: "Islas Cook", code: "ck" }, { name: "Islas Feroe", code: "fo" },
  { name: "Islas Heard", code: "hm" }, { name: "Islas Malvinas", code: "fk" }, { name: "Islas Marianas del Norte", code: "mp" }, { name: "Islas Marshall", code: "mh" }, { name: "Islas Norfolk", code: "nf" },
  { name: "Islas Pitcairn", code: "pn" }, { name: "Islas Salomón", code: "sb" }, { name: "Islas Turcas y Caicos", code: "tc" }, { name: "Islas Vírgenes Británicas", code: "vg" }, { name: "Islas Vírgenes de EE.UU.", code: "vi" },
  { name: "India", code: "in" }, { name: "Indonesia", code: "id" }, { name: "Irak", code: "iq" }, { name: "Irán", code: "ir" }, { name: "Irlanda", code: "ie" },
  { name: "Isla Bouvet", code: "bv" }, { name: "Isla Christmas", code: "cx" }, { name: "Isla de Man", code: "im" }, { name: "Isla Reunión", code: "re" }, { name: "Isla Svalbard", code: "sj" },
  { name: "Israel", code: "il" }, { name: "Italia", code: "it" }, { name: "Jamaica", code: "jm" }, { name: "Japón", code: "jp" }, { name: "Jersey", code: "je" },
  { name: "Jordania", code: "jo" }, { name: "Kazajistán", code: "kz" }, { name: "Kenia", code: "ke" }, { name: "Kirguistán", code: "kg" }, { name: "Kiribati", code: "ki" },
  { name: "Kuwait", code: "kw" }, { name: "Laos", code: "la" }, { name: "Lesoto", code: "ls" }, { name: "Letonia", code: "lv" }, { name: "Líbano", code: "lb" },
  { name: "Liberia", code: "lr" }, { name: "Libia", code: "ly" }, { name: "Liechtenstein", code: "li" }, { name: "Lituania", code: "lt" }, { name: "Luxemburgo", code: "lu" },
  { name: "Macao", code: "mo" }, { name: "Macedonia", code: "mk" }, { name: "Madagascar", code: "mg" }, { name: "Malasia", code: "my" }, { name: "Maldivas", code: "mv" },
  { name: "Mali", code: "ml" }, { name: "Malta", code: "mt" }, { name: "Mariana del Norte", code: "mp" }, { name: "Marruecos", code: "ma" }, { name: "Martinica", code: "mq" },
  { name: "Mauricio", code: "mu" }, { name: "Mauritania", code: "mr" }, { name: "Mayotte", code: "yt" }, { name: "Medina", code: "sa" }, { name: "Melanesia", code: "sb" },
  { name: "Méjico", code: "mx" }, { name: "Menorca", code: "es" }, { name: "Mérida", code: "mx" }, { name: "Micronesia", code: "fm" }, { name: "Moldavia", code: "md" },
  { name: "Mónaco", code: "mc" }, { name: "Mongolia", code: "mn" }, { name: "Montenegro", code: "me" }, { name: "Montserrat", code: "ms" }, { name: "Mozambique", code: "mz" },
  { name: "Namibia", code: "na" }, { name: "Nauru", code: "nr" }, { name: "Nepal", code: "np" }, { name: "Nicaragua", code: "ni" }, { name: "Níger", code: "ne" },
  { name: "Nigeria", code: "ng" }, { name: "Niue", code: "nu" }, { name: "Noruega", code: "no" }, { name: "Nueva Caledonia", code: "nc" }, { name: "Nueva Zelanda", code: "nz" },
  { name: "Omán", code: "om" }, { name: "Países Bajos", code: "nl" }, { name: "Pakistán", code: "pk" }, { name: "Palaos", code: "pw" }, { name: "Palestina", code: "ps" },
  { name: "Panamá", code: "pa" }, { name: "Papúa Nueva Guinea", code: "pg" }, { name: "Paquistán", code: "pk" }, { name: "Paraguay", code: "py" }, { name: "Perú", code: "pe" },
  { name: "Polinesia Francesa", code: "pf" }, { name: "Polonia", code: "pl" }, { name: "Polinesia", code: "pf" }, { name: "Portugal", code: "pt" }, { name: "Príncipe de Gales", code: "gb" },
  { name: "Puerto Rico", code: "pr" }, { name: "Qatar", code: "qa" }, { name: "Quedlinburg", code: "de" }, { name: "República Centroafricana", code: "cf" }, { name: "República Checa", code: "cz" },
  { name: "República Democrática del Congo", code: "cd" }, { name: "República Dominicana", code: "do" }, { name: "Reunión", code: "re" }, { name: "Reino Unido", code: "gb" }, { name: "Ruanda", code: "rw" },
  { name: "Rumania", code: "ro" }, { name: "Rusia", code: "ru" }, { name: "Saba", code: "bq" }, { name: "Sahara Occidental", code: "eh" }, { name: "Samoa", code: "ws" },
  { name: "Samoa Americana", code: "as" }, { name: "San Bartolomé", code: "bq" }, { name: "San Cristóbal y Nieves", code: "kn" }, { name: "San Eustaquio", code: "bq" }, { name: "San Marino", code: "sm" },
  { name: "San Martín", code: "mf" }, { name: "San Pedro y Miquelón", code: "pm" }, { name: "San Vicente y las Granadinas", code: "vc" }, { name: "Santa Elena", code: "sh" }, { name: "Santa Lucía", code: "lc" },
  { name: "Santiago", code: "cl" }, { name: "Santo Tomé y Príncipe", code: "st" }, { name: "Senegal", code: "sn" }, { name: "Serbia", code: "rs" }, { name: "Seychelles", code: "sc" },
  { name: "Siria", code: "sy" }, { name: "Singapur", code: "sg" }, { name: "Sint Maarten", code: "sx" }, { name: "Siria", code: "sy" }, { name: "Soalia", code: "so" },
  { name: "Somalia", code: "so" }, { name: "Sri Lanka", code: "lk" }, { name: "Sudáfrica", code: "za" }, { name: "Sudán", code: "sd" }, { name: "Sudán del Sur", code: "ss" },
  { name: "Suecia", code: "se" }, { name: "Suiza", code: "ch" }, { name: "Surinam", code: "sr" }, { name: "Svalbard", code: "sj" }, { name: "Tailandia", code: "th" },
  { name: "Taiwán", code: "tw" }, { name: "Tanzania", code: "tz" }, { name: "Tayikistán", code: "tj" }, { name: "Territorio Británico del Océano Índico", code: "io" }, { name: "Territorios Australes Franceses", code: "tf" },
  { name: "Territorios Palestinos", code: "ps" }, { name: "Tetúan", code: "ma" }, { name: "Timor Oriental", code: "tl" }, { name: "Togo", code: "tg" }, { name: "Tokelau", code: "tk" },
  { name: "Tonga", code: "to" }, { name: "Trinidad y Tobago", code: "tt" }, { name: "Túnez", code: "tn" }, { name: "Turkmenistán", code: "tm" }, { name: "Turquía", code: "tr" },
  { name: "Tuvalu", code: "tv" }, { name: "Ucrania", code: "ua" }, { name: "Uganda", code: "ug" }, { name: "Ulán Bator", code: "mn" }, { name: "Unión Europea", code: "eu" },
  { name: "Uruguay", code: "uy" }, { name: "Uzbekistán", code: "uz" }, { name: "Vanuatu", code: "vu" }, { name: "Venezuela", code: "ve" }, { name: "Vietnam", code: "vn" },
  { name: "Wallis y Futuna", code: "wf" }, { name: "Yemen", code: "ye" }, { name: "Yibuti", code: "dj" }, { name: "Zambia", code: "zm" }, { name: "Zimbabue", code: "zw" }
];

// Estado del juego
let pool = [];
let currentIndex = 0;
let score = 0;
let options = [];
let ranking = JSON.parse(localStorage.getItem('ranking_v1') || '[]');

const flagImg = document.getElementById('flag-img');
const info = document.getElementById('info');
const result = document.getElementById('result');
const top3 = document.getElementById('top3');

function shuffle(a){ for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} }

// Sonidos con Web Audio API
function playSuccessSound(){
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = 800;
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.3);
}

function playErrorSound(){
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = 300;
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.4);
}

function startGame(){
function handleChoice(i){
  const chosen = options[i];
  const correct = pool[currentIndex];
  if(chosen.name === correct.name){
    score += 1;
    result.textContent = '¡CORRECTO!';
    result.style.color = 'green';
    playSuccessSound();
  } else {
    result.textContent = `INCORRECTO — Era: ${correct.name}`;
    result.style.color = 'red';
    playErrorSound();
  }
  // bloquear botones
  document.querySelectorAll('.opt').forEach(b=>b.disabled=true);
  // pasar a la siguiente después de 3 segundos
  setTimeout(()=>{
    currentIndex += 1;
    document.querySelectorAll('.opt').forEach(b=>b.disabled=false);
    result.textContent = '';
    showQuestion();
  }, 3000);
} document.getElementById('opt0').textContent = options[0].name;
  document.getElementById('opt1').textContent = options[1].name;
  document.getElementById('opt2').textContent = options[2].name;
  document.getElementById('opt3').textContent = options[3].name;
  info.textContent = `Pregunta ${currentIndex+1} de ${pool.length} — Puntos: ${score}`;
}

function handleChoice(i){
  const chosen = options[i];
  const correct = pool[currentIndex];
  if(chosen.name === correct.name){
    score += 1;
    result.textContent = '¡CORRECTO!';
    result.style.color = 'green';
  } else {
    result.textContent = `INCORRECTO — Era: ${correct.name}`;
    result.style.color = 'red';
  }
  // bloquear botones
  document.querySelectorAll('.opt').forEach(b=>b.disabled=true);
  // pasar a la siguiente después de 3 segundos
  setTimeout(()=>{
    currentIndex += 1;
    document.querySelectorAll('.opt').forEach(b=>b.disabled=false);
    result.textContent = '';
    showQuestion();
  }, 3000);
}

function endGame(){
  info.textContent = `Fin. Has acertado ${score} de ${pool.length}`;
  flagImg.src = '';
  document.getElementById('opt0').textContent = '';
  document.getElementById('opt1').textContent = '';
  document.getElementById('opt2').textContent = '';
  // pedir nombre
  setTimeout(()=>{
    const name = prompt('Introduce tu nombre para el ranking (Top 10):','Jugador');
    if(name){
      ranking.push({name: name, score: score, total: pool.length, date: new Date().toISOString()});
      ranking.sort((a,b)=> b.score - a.score || (a.date<b.date?1:-1));
      ranking = ranking.slice(0,10);
      localStorage.setItem('ranking_v1', JSON.stringify(ranking));
    }
    renderTop3();
    renderTop10();
  }, 200);
}

function renderTop3(){
  const top = ranking.slice(0,3);
  if(top.length===0){ top3.innerHTML = '<em>No hay top aún</em>'; return; }
  top3.innerHTML = top.map((e,i)=>`${i+1}. ${e.name} — ${e.score}`).join('<br>');
}

function renderTop10(){
  // Mostrar una alerta con top10
  if(ranking.length===0) return;
  const txt = ranking.map((e,i)=>`${i+1}. ${e.name} — ${e.score}/${e.total}`).join('\n');
  alert('Top 10:\n'+txt);
}

// Event listeners
document.getElementById('start').addEventListener('click', startGame);
document.getElementById('opt0').addEventListener('click', ()=>handleChoice(0));
document.getElementById('opt1').addEventListener('click', ()=>handleChoice(1));
document.getElementById('opt2').addEventListener('click', ()=>handleChoice(2));
document.getElementById('opt3').addEventListener('click', ()=>handleChoice(3));

// Inicializar UI
renderTop3();
info.textContent = 'Pulsa JUGAR para comenzar';
