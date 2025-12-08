const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = 'scores.json';

// Middleware
app.use(cors());
app.use(express.json());

// Ensure data file exists
async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, '[]', 'utf8');
  }
}

// Get all scores
app.get('/api/ranking', async (req, res) => {
  try {
    await ensureDataFile();
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const scores = JSON.parse(data);
    // Sort by score (descending) and date (ascending)
    scores.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(a.date) - new Date(b.date);
    });
    res.json(scores);
  } catch (error) {
    console.error('Error getting scores:', error);
    res.status(500).json({ error: 'Error al obtener el ranking' });
  }
});

// Save a new score
app.post('/api/score', async (req, res) => {
  try {
    const { name, score, total, date } = req.body;
    
    if (!name || typeof score !== 'number' || typeof total !== 'number' || !date) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }
    
    await ensureDataFile();
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const scores = JSON.parse(data);
    
    // Add new score
    const newScore = { id: Date.now(), name, score, total, date };
    scores.push(newScore);
    
    // Save back to file
    await fs.writeFile(DATA_FILE, JSON.stringify(scores, null, 2), 'utf8');
    
    res.status(201).json(newScore);
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ error: 'Error al guardar la puntuación' });
  }
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```__