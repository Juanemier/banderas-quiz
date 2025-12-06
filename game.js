// Versión simple del Juego de Banderas en JavaScript
// Usa flagcdn.com para buscar banderas por código alpha-2

const countries = [
  { name: "España", code: "es" },
  { name: "Francia", code: "fr" },
  { name: "Alemania", code: "de" },
  { name: "Italia", code: "it" },
  { name: "Portugal", code: "pt" },
  { name: "Grecia", code: "gr" },
  { name: "Suecia", code: "se" },
  { name: "Noruega", code: "no" },
  { name: "Dinamarca", code: "dk" },
  { name: "Finlandia", code: "fi" },
  { name: "Países Bajos", code: "nl" },
  { name: "Bélgica", code: "be" },
  { name: "Suiza", code: "ch" },
  { name: "Austria", code: "at" },
  { name: "Polonia", code: "pl" },
  { name: "República Checa", code: "cz" },
  { name: "Hungría", code: "hu" },
  { name: "Rumania", code: "ro" },
  { name: "Bulgaria", code: "bg" },
  { name: "Serbia", code: "rs" },
  { name: "Croacia", code: "hr" },
  { name: "Eslovenia", code: "si" },
  { name: "Irlanda", code: "ie" },
  { name: "Reino Unido", code: "gb" },
  { name: "Rusia", code: "ru" },
  { name: "Turquía", code: "tr" },
  { name: "Japón", code: "jp" },
  { name: "China", code: "cn" },
  { name: "India", code: "in" },
  { name: "Corea del Sur", code: "kr" },
  { name: "Tailandia", code: "th" },
  { name: "Vietnam", code: "vn" },
  { name: "Filipinas", code: "ph" },
  { name: "Indonesia", code: "id" },
  { name: "Singapur", code: "sg" },
  { name: "Malasia", code: "my" },
  { name: "Canadá", code: "ca" },
  { name: "Estados Unidos", code: "us" },
  { name: "México", code: "mx" },
  { name: "Brasil", code: "br" },
  { name: "Argentina", code: "ar" },
  { name: "Chile", code: "cl" },
  { name: "Perú", code: "pe" },
  { name: "Colombia", code: "co" },
  { name: "Venezuela", code: "ve" },
  { name: "Australia", code: "au" },
  { name: "Nueva Zelanda", code: "nz" },
  { name: "Sudáfrica", code: "za" },
  { name: "Egipto", code: "eg" },
  { name: "Nigeria", code: "ng" }
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

function startGame(){
  pool = [...countries];
  shuffle(pool);
  pool = pool.slice(0,25);
  currentIndex = 0;
  score = 0;
  result.textContent = '';
  info.textContent = `Pregunta 1 de ${pool.length}`;
  renderTop3();
  showQuestion();
}

function showQuestion(){
  if(currentIndex >= pool.length){ endGame(); return; }
  const item = pool[currentIndex];
  flagImg.src = `https://flagcdn.com/w320/${item.code}.png`;
  // Generar 4 opciones (1 correcta + 3 aleatorias)
  let others = countries.filter(c => c.name !== item.name);
  shuffle(others);
  options = [item, others[0], others[1], others[2]];
  shuffle(options);
  document.getElementById('opt0').textContent = options[0].name;
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
