Publicar el Juego de Banderas en un Servidor Web Gratuito
==========================================================

## Opción 1: GitHub Pages (Recomendado - Fácil y Gratuito)

### Ventajas:
- ✅ Completamente gratis
- ✅ Directamente desde GitHub
- ✅ HTTPS automático
- ✅ Sin límite de ancho de banda
- ✅ Perfecto para PWA

### Desventajas:
- Requiere convertir Python a web (HTML5 + JavaScript)
- El juego original en Python no funciona directamente

### Pasos:

#### 1. Convierte tu juego a versión web (HTML5)

Opción A: Usa **Pygame-web** o **Pyodide** (ejecuta Python en navegador):

```bash
pip install pyodide-build
```

O usa **p5.js** (JavaScript) - más fácil para comenzar.

#### 2. Estructura de carpetas:
```
juego-banderas/
├── index.html
├── game.js
├── style.css
├── banderas_cache/
│   ├── es.gif
│   ├── fr.gif
│   └── ...
├── ranking.json
└── README.md
```

#### 3. Archivo `index.html` básico:
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Juego de Banderas</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="game-container">
        <h1>Juego de Banderas</h1>
        <canvas id="gameCanvas" width="900" height="700"></canvas>
        <div id="info"></div>
    </div>
    <script src="game.js"></script>
</body>
</html>
```

#### 4. Crea repositorio en GitHub:

```bash
# Desde la carpeta del proyecto
git init
git add .
git commit -m "Juego de Banderas - versión web"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/juego-banderas.git
git push -u origin main
```

#### 5. Activa GitHub Pages:
- Ve a: Settings → Pages
- Source: Deploy from a branch
- Branch: main → root
- Click "Save"
- Tu sitio estará en: `https://tu_usuario.github.io/juego-banderas`

---

## Opción 2: Vercel (Muy Fácil)

### Ventajas:
- ✅ Más rápido que GitHub Pages
- ✅ Gratis para proyectos estáticos
- ✅ Deployment automático desde GitHub
- ✅ Excelente rendimiento

### Pasos:

1. Sube el proyecto a GitHub (como arriba)
2. Ve a: https://vercel.com
3. Click "New Project"
4. Conecta tu repositorio de GitHub
5. Selecciona la rama `main`
6. Click "Deploy"
7. Tu sitio estará en: `https://juego-banderas-tu-nombre.vercel.app`

---

## Opción 3: Netlify (También Muy Fácil)

### Ventajas:
- ✅ Interfaz amigable
- ✅ Gratis para estático
- ✅ Drag & drop upload
- ✅ Buena comunidad

### Pasos:

1. Ve a: https://netlify.com
2. Click "Sign up"
3. Elige "Connect to Git" o "Drag and drop"
4. Si usas Git: conecta tu repo de GitHub
5. Si usas Drag & drop: arrastra la carpeta del proyecto
6. Deploy automático
7. Tu sitio estará en: `https://juego-banderas-xxxx.netlify.app`

---

## Opción 4: PythonAnywhere (Código Python Puro)

### Ventajas:
- ✅ Ejecuta Python directamente
- ✅ Gratis (con limitaciones)
- ✅ No necesitas convertir a web

### Desventajas:
- Turtle no funciona en web
- Necesitas adaptar la interfaz a web (Django/Flask)

### Pasos:

1. Ve a: https://pythonanywhere.com
2. Crea cuenta gratuita
3. Ve a "Web" → "Add new web app"
4. Elige "Flask" o "Django"
5. Sube tu código
6. Adapta `banderas.py` para usar Flask en lugar de Turtle

---

## Opción 5: Heroku (Para Apps Dinámicas)

### Ventajas:
- ✅ Puede ejecutar Python
- ✅ Gratis en tier hobby
- ✅ Base de datos incluida

### Desventajas:
- Menos rendimiento en versión gratuita
- Requiere refactor a Flask/Django

### Pasos:

1. Ve a: https://heroku.com
2. Crea cuenta
3. Descarga Heroku CLI: `brew install heroku` (Mac) o `choco install heroku-cli` (Windows)
4. Crea `requirements.txt` con dependencias
5. Crea `Procfile`:
```
web: python app.py
```
6. Deploy:
```bash
heroku login
heroku create juego-banderas
git push heroku main
```

---

## Solución Rápida: Convertir a Web con Pyodide

### ¿Qué es Pyodide?
Ejecuta Python directamente en el navegador (sin servidor).

### Pasos:

#### 1. Crea `index.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <script defer src="https://cdn.jsdelivr.net/pyodide/v0.23.0/full/pyodide.js"></script>
</head>
<body>
    <h1>Juego de Banderas</h1>
    <div id="output"></div>
    <script>
        async function main() {
            let pyodide = await loadPyodide();
            await pyodide.loadPackage(['pillow', 'urllib3']);
            
            let code = `
# Tu código de banderas.py aquí (adaptado)
import json

# Cargar ranking desde LocalStorage del navegador
# ... resto del código ...
            `;
            
            pyodide.runPython(code);
        }
        main();
    </script>
</body>
</html>
```

#### 2. Sube a GitHub Pages como en Opción 1

---

## Comparativa Rápida

| Plataforma | Tipo | Esfuerzo | Performance | Gratuito | Recomendación |
|------------|------|----------|-------------|----------|---------------|
| **GitHub Pages** | Estático | Bajo | Bueno | ✅ | ⭐⭐⭐⭐⭐ |
| **Vercel** | Estático | Bajo | Excelente | ✅ | ⭐⭐⭐⭐⭐ |
| **Netlify** | Estático | Bajo | Bueno | ✅ | ⭐⭐⭐⭐ |
| **Pyodide** | Estático | Medio | Regular | ✅ | ⭐⭐⭐ |
| **PythonAnywhere** | Dinámico | Alto | Bueno | ✅ | ⭐⭐ |
| **Heroku** | Dinámico | Alto | Regular | ✅ | ⭐⭐ |

---

## Mi Recomendación: GitHub Pages + Vercel

### Paso 1: Convierte el juego a web (simple)
Usa esta estructura mínima en JavaScript:

```javascript
// game.js
class JuegoBanderas {
    constructor() {
        this.puntos = 0;
        this.paises = [...]; // Tu lista de países
        this.ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    }
    
    mostrarBandera() {
        // Dibuja la bandera en canvas
    }
    
    verificarRespuesta(respuesta) {
        // Lógica del juego
        localStorage.setItem('ranking', JSON.stringify(this.ranking));
    }
}

const juego = new JuegoBanderas();
```

### Paso 2: Sube a GitHub
```bash
git init
git add .
git commit -m "Juego de Banderas web"
git remote add origin https://github.com/tu_usuario/juego-banderas.git
git push -u origin main
```

### Paso 3: Publica en Vercel
- Ve a vercel.com
- Conecta tu repo
- Click Deploy
- ¡Listo! Tu juego está online

---

## Alternativa Rápida: Usa Streamlit

### Ventajas:
- ✅ Código Python sin cambios
- ✅ Deploy automático gratis
- ✅ Interfaz moderna automática

### Pasos:

```bash
pip install streamlit
```

Crea `app.py`:
```python
import streamlit as st
from banderas import JuegoBanderas

st.title("Juego de Banderas")

if 'juego' not in st.session_state:
    st.session_state.juego = JuegoBanderas()

# Tu interfaz Streamlit aquí
```

Deploy:
```bash
git push  # A GitHub
# Ve a: https://share.streamlit.io
# Conecta tu repo
# Deploy automático
```

Tu app estará en: `https://share.streamlit.io/tu_usuario/juego-banderas/main/app.py`

---

## Resumen: Opción Más Rápida

Si quieres publicar **hoy mismo**:

### 1. Usa Streamlit (10 minutos):
```bash
pip install streamlit
# Adapta banderas.py a Streamlit
streamlit run app.py
```

### 2. Sube a GitHub y Streamlit Cloud:
```bash
git push origin main
# Ve a streamlit.io y conecta repo
```

### 3. ¡Listo! Tu juego está online

---

## Requisitos por Opción

### Opción Más Fácil (Streamlit):
```bash
pip install streamlit pycountry pillow
```

### Opción Más Rápida (Vercel + JS):
- Convertir lógica a JavaScript
- HTML5 Canvas para gráficos
- localStorage para ranking

### Opción Más Potente (Flask + Heroku):
```bash
pip install flask gunicorn
# Requiere arquitectura backend
```

---

## ¿Cuál Escoger?

- **Solo quieres publicar hoy**: Streamlit
- **Quieres algo profesional**: GitHub Pages + Vercel
- **Prefieres mantener Python puro**: PythonAnywhere o Streamlit
- **Necesitas base de datos**: Heroku + Flask

¿Cuál te interesa? Puedo ayudarte a implementar la opción que elijas.
