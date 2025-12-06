const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const RANKING_FILE = path.join(__dirname, 'ranking-data.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Función para cargar el ranking del archivo
function loadRanking() {
  try {
    if (fs.existsSync(RANKING_FILE)) {
      return JSON.parse(fs.readFileSync(RANKING_FILE, 'utf8'));
    }
  } catch (err) {
    console.error('Error al cargar ranking:', err);
  }
  return [];
}

// Función para guardar el ranking al archivo
function saveRanking(ranking) {
  try {
    fs.writeFileSync(RANKING_FILE, JSON.stringify(ranking, null, 2), 'utf8');
  } catch (err) {
    console.error('Error al guardar ranking:', err);
  }
}

// GET: obtener ranking
app.get('/api/ranking', (req, res) => {
  const ranking = loadRanking();
  res.json(ranking);
});

// POST: agregar entrada al ranking
app.post('/api/ranking', (req, res) => {
  const { name, score, total } = req.body;
  
  if (!name || score === undefined || total === undefined) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  let ranking = loadRanking();
  
  // Agregar nueva entrada con timestamp
  ranking.push({
    name: name,
    score: score,
    total: total,
    date: new Date().toISOString()
  });
  
  // Ordenar por puntuación descendente, luego por fecha
  ranking.sort((a, b) => b.score - a.score || (a.date < b.date ? 1 : -1));
  
  // Mantener top 100
  ranking = ranking.slice(0, 100);
  
  saveRanking(ranking);
  res.json({ success: true, ranking: ranking });
});

// GET: obtener top 10
app.get('/api/ranking/top10', (req, res) => {
  const ranking = loadRanking();
  res.json(ranking.slice(0, 10));
});

// GET: obtener top 3
app.get('/api/ranking/top3', (req, res) => {
  const ranking = loadRanking();
  res.json(ranking.slice(0, 3));
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log('Ranking se guarda en:', RANKING_FILE);
});
