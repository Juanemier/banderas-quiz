# Juego de Banderas - Instrucciones para Ejecutar Localmente

## Opción 1: Con Python (Recomendado)

No requiere instalar nada adicional.

```bash
cd /home/juane1977/Escritorio/python_work
python3 server.py
```

El servidor se ejecutará en `http://localhost:3000`.

## Opción 2: Con Node.js

Requiere Node.js y npm instalados.

```bash
cd /home/juane1977/Escritorio/python_work
npm install
npm start
```

## Cómo Jugar Localmente

1. **Inicia el servidor** (Python o Node.js)
2. **Abre en tu navegador:** `http://localhost:3000/index.html`
3. **Presiona JUGAR** para comenzar
4. El ranking se guardará automáticamente en `ranking-data.json`

## Características

- **240+ banderas** de todo el mundo
- **25 preguntas** por partida
- **Ranking persistente** guardado en archivo
- **Sonidos** de acierto y error
- **Top 3** mostrado siempre
- **Top 10** mostrado al finalizar

## Archivos Importantes

- `index.html` — Interfaz del juego
- `style.css` — Estilos
- `game.js` — Lógica del juego (cliente)
- `server.py` — Servidor de ranking (Python)
- `server.js` — Servidor de ranking (Node.js, alternativa)
- `ranking-data.json` — Archivo donde se guarda el ranking histórico

## Problemas Comunes

**Error: "Cannot GET /api/ranking"**
→ Asegúrate de que el servidor esté corriendo en otro terminal.

**Error: CORS o red**
→ El servidor debe estar en `http://localhost:3000`.

**El ranking no se guarda**
→ Verifica que `ranking-data.json` tenga permisos de escritura.

---

**Versión Web (GitHub Pages):** https://juanemier.github.io/banderas-quiz/index.html  
(Usa localStorage en lugar de archivo persistente)
