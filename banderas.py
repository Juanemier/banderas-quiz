import turtle
import random
import urllib.request
import os
from PIL import Image
from io import BytesIO
import json
from datetime import datetime
import time

# Fallback list de países (si no está disponible la librería `pycountry`)
FALLBACK_PAISES_INFO = [
    ("España", "es"),
    ("Francia", "fr"),
    ("Alemania", "de"),
    ("Italia", "it"),
    ("Portugal", "pt"),
    ("Grecia", "gr"),
    ("Suecia", "se"),
    ("Noruega", "no"),
    ("Dinamarca", "dk"),
    ("Finlandia", "fi"),
    ("Países Bajos", "nl"),
    ("Bélgica", "be"),
    ("Suiza", "ch"),
    ("Austria", "at"),
    ("Polonia", "pl"),
    ("República Checa", "cz"),
    ("Hungría", "hu"),
    ("Rumania", "ro"),
    ("Bulgaria", "bg"),
    ("Serbia", "rs"),
    ("Croacia", "hr"),
    ("Eslovenia", "si"),
    ("Irlanda", "ie"),
    ("Reino Unido", "gb"),
    ("Rusia", "ru"),
    ("Turquía", "tr"),
    ("Japón", "jp"),
    ("China", "cn"),
    ("India", "in"),
    ("Corea del Sur", "kr"),
    ("Tailandia", "th"),
    ("Vietnam", "vn"),
    ("Filipinas", "ph"),
    ("Indonesia", "id"),
    ("Singapur", "sg"),
    ("Malasia", "my"),
    ("Canadá", "ca"),
    ("Estados Unidos", "us"),
    ("México", "mx"),
    ("Brasil", "br"),
    ("Argentina", "ar"),
    ("Chile", "cl"),
    ("Perú", "pe"),
    ("Colombia", "co"),
    ("Venezuela", "ve"),
    ("Australia", "au"),
    ("Nueva Zelanda", "nz"),
    ("Sudáfrica", "za"),
    ("Egipto", "eg"),
    ("Nigeria", "ng"),
]

# Intentar usar pycountry para obtener la lista completa (~>254 países/territorios).
try:
    import pycountry
    paises_info = []
    for c in pycountry.countries:
        # Algunos nombres contienen caracteres raros; usamos el nombre oficial y el código alpha_2 en minúsculas
        if hasattr(c, 'alpha_2') and hasattr(c, 'name'):
            paises_info.append((c.name, c.alpha_2.lower()))
    # Si por alguna razón no se obtuvo nada, usar el fallback
    if not paises_info:
        paises_info = FALLBACK_PAISES_INFO
except Exception:
    paises_info = FALLBACK_PAISES_INFO

# Diccionario para acceso rápido (nombre -> código)
paises = {nombre: codigo for nombre, codigo in paises_info}

class Boton:
    """Clase para representar un botón clickeable"""
    def __init__(self, x, y, ancho, alto, texto, callback, indice):
        self.x = x
        self.y = y
        self.ancho = ancho
        self.alto = alto
        self.texto = texto
        self.callback = callback
        self.indice = indice
        self.x_min = x - ancho/2
        self.x_max = x + ancho/2
        self.y_min = y - alto/2
        self.y_max = y + alto/2
    
    def contiene(self, px, py):
        """Verifica si el punto (px, py) está dentro del botón"""
        return self.x_min <= px <= self.x_max and self.y_min <= py <= self.y_max
    
    def dibujar(self):
        """Dibuja el botón"""
        # Botón principal
        boton_bg = turtle.Turtle()
        boton_bg.hideturtle()
        boton_bg.penup()
        boton_bg.speed(0)
        boton_bg.goto(self.x_min, self.y_max)
        boton_bg.pendown()
        boton_bg.fillcolor("#4CAF50")
        boton_bg.pencolor("#2E7D32")
        boton_bg.pensize(2)
        boton_bg.begin_fill()
        boton_bg.goto(self.x_max, self.y_max)
        boton_bg.goto(self.x_max, self.y_min)
        boton_bg.goto(self.x_min, self.y_min)
        boton_bg.goto(self.x_min, self.y_max)
        boton_bg.end_fill()
        boton_bg.penup()
        
        # Sombra derecha
        sombra_d = turtle.Turtle()
        sombra_d.hideturtle()
        sombra_d.penup()
        sombra_d.speed(0)
        sombra_d.goto(self.x_max, self.y_max)
        sombra_d.pendown()
        sombra_d.fillcolor("#1B5E20")
        sombra_d.pencolor("#1B5E20")
        sombra_d.begin_fill()
        sombra_d.goto(self.x_max + 8, self.y_max - 8)
        sombra_d.goto(self.x_max + 8, self.y_min - 8)
        sombra_d.goto(self.x_max, self.y_min)
        sombra_d.goto(self.x_max, self.y_max)
        sombra_d.end_fill()
        sombra_d.penup()
        
        # Sombra inferior
        sombra_i = turtle.Turtle()
        sombra_i.hideturtle()
        sombra_i.penup()
        sombra_i.speed(0)
        sombra_i.goto(self.x_min, self.y_min)
        sombra_i.pendown()
        sombra_i.fillcolor("#1B5E20")
        sombra_i.pencolor("#1B5E20")
        sombra_i.begin_fill()
        sombra_i.goto(self.x_max, self.y_min)
        sombra_i.goto(self.x_max + 8, self.y_min - 8)
        sombra_i.goto(self.x_min - 8 + 8, self.y_min - 8)
        sombra_i.goto(self.x_min, self.y_min)
        sombra_i.end_fill()
        sombra_i.penup()
        
        # Texto
        label = turtle.Turtle()
        label.hideturtle()
        label.penup()
        label.goto(self.x, self.y)
        label.pencolor("white")
        
        if len(self.texto) > 15:
            palabras = self.texto.split()
            if len(palabras) > 1:
                mitad = len(palabras) // 2
                linea1 = " ".join(palabras[:mitad])
                linea2 = " ".join(palabras[mitad:])
                label.goto(self.x, self.y + 10)
                label.write(linea1, align="center", font=("Arial", 14, "bold"))
                label.goto(self.x, self.y - 10)
                label.write(linea2, align="center", font=("Arial", 14, "bold"))
            else:
                label.write(self.texto, align="center", font=("Arial", 15, "bold"))
        else:
            label.write(self.texto, align="center", font=("Arial", 15, "bold"))
        
        return boton_bg, sombra_d, sombra_i, label

class JuegoBanderas:
    def __init__(self):
        self.screen = turtle.Screen()
        self.screen.setup(width=900, height=700)
        self.screen.bgcolor("white")
        self.screen.title("Juego de Banderas - Adivina el País")
        
        self.puntos = 0
        self.pregunta_actual = 0
        # Seleccionar aleatoriamente 25 banderas distintas del conjunto disponible
        todos_los_paises = [nombre for nombre, _ in paises_info]
        if len(todos_los_paises) >= 25:
            self.paises_lista = random.sample(todos_los_paises, 25)
        else:
            self.paises_lista = todos_los_paises[:]
            random.shuffle(self.paises_lista)
        
        # Crear carpeta para cachear imágenes
        self.cache_dir = "banderas_cache"
        if not os.path.exists(self.cache_dir):
            os.makedirs(self.cache_dir)
        
        # Crear tortugas para mostrar información
        self.display = turtle.Turtle()
        self.display.hideturtle()
        self.display.speed(0)
        
        self.botones_graficos = []
        self.botones = []
        # Current flag and border so they can be cleared when changing questions
        self.current_flag = None
        self.current_border = None
        self.flag_sizes = {}
        # Padding (px) to add around the flag when drawing the border
        self.border_padding = 6
        
        # Registrar click del mouse
        self.screen.onclick(self.click_pantalla)
        # Archivo de ranking
        self.ranking_file = "ranking.json"
        self.ranking = self.load_ranking()
        
        # Mostrar pantalla de inicio con ranking
        self.mostrar_menu_inicio()
    
    def click_pantalla(self, x, y):
        """Maneja los clicks en la pantalla"""
        for boton in self.botones:
            if boton.contiene(x, y):
                boton.callback(boton.indice)
                break
    
    def descargar_bandera(self, codigo_pais):
        """Descarga la imagen de la bandera y la guarda en caché"""
        filename = os.path.join(self.cache_dir, f"{codigo_pais}.gif")
        
        # Si ya existe en caché, usarla (y registrar tamaño si es posible)
        if os.path.exists(filename):
            try:
                # obtener tamaño de la imagen GIF ya guardada
                img = Image.open(filename)
                self.flag_sizes[codigo_pais] = img.size
            except Exception:
                # ignorar si no se puede leer
                pass
            return filename
        
        try:
            url = f"https://flagcdn.com/w640/{codigo_pais}.png"
            urllib.request.urlretrieve(url, filename.replace('.gif', '.png'))

            img = Image.open(filename.replace('.gif', '.png'))
            # Redimensionar manteniendo proporción, máximo 300x180
            img.thumbnail((300, 180), Image.Resampling.LANCZOS)
            # Guardar tamaño actual para dibujar borde ajustado
            self.flag_sizes[codigo_pais] = img.size
            img_gif = img.convert('RGB')
            img_gif.save(filename)

            os.remove(filename.replace('.gif', '.png'))

            return filename
        except Exception as e:
            print(f"Error descargando bandera para {codigo_pais}: {e}")
            return None
    
    def mostrar_bandera_imagen(self, codigo_pais, x, y):
        """Muestra la imagen de la bandera en la pantalla"""
        try:
            archivo_bandera = self.descargar_bandera(codigo_pais)
            if archivo_bandera and os.path.exists(archivo_bandera):
                self.screen.addshape(archivo_bandera)

                # Mostrar bandera
                bandera_turtle = turtle.Turtle()
                bandera_turtle.shape(archivo_bandera)
                bandera_turtle.penup()
                bandera_turtle.goto(x, y)
                bandera_turtle.hideturtle()
                bandera_turtle.showturtle()

                # Obtener tamaño real (ancho, alto) de la imagen si está disponible
                w, h = self.flag_sizes.get(codigo_pais, (300, 180))
                # Aplicar padding para que el borde quede ligeramente separado
                half_w = w / 2 + self.border_padding
                half_h = h / 2 + self.border_padding

                # Dibujar borde negro ajustado al tamaño de la imagen
                borde = turtle.Turtle()
                borde.hideturtle()
                borde.penup()
                borde.speed(0)
                # Arriba-izquierda
                borde.goto(x - half_w, y + half_h)
                borde.pendown()
                borde.pencolor("black")
                borde.pensize(2)
                # Dibujar rectángulo
                borde.goto(x + half_w, y + half_h)
                borde.goto(x + half_w, y - half_h)
                borde.goto(x - half_w, y - half_h)
                borde.goto(x - half_w, y + half_h)
                borde.penup()

                # Guardar referencias para poder limpiarlas más tarde
                self.current_flag = bandera_turtle
                self.current_border = borde

                return bandera_turtle
        except Exception as e:
            print(f"Error mostrando bandera: {e}")
        
        return None
    
    def limpiar_botones(self):
        """Limpia todos los botones"""
        for boton, shadow1, shadow2, label in self.botones_graficos:
            try:
                boton.clear()
                boton.hideturtle()
            except Exception:
                pass
            try:
                shadow1.clear()
                shadow1.hideturtle()
            except Exception:
                pass
            try:
                shadow2.clear()
                shadow2.hideturtle()
            except Exception:
                pass
            try:
                label.clear()
                label.hideturtle()
            except Exception:
                pass

        # Limpiar bandera y borde actuales si existen
        try:
            if self.current_flag:
                self.current_flag.clear()
                self.current_flag.hideturtle()
                self.current_flag = None
        except Exception:
            pass
        try:
            if self.current_border:
                self.current_border.clear()
                self.current_border.hideturtle()
                self.current_border = None
        except Exception:
            pass

        self.botones_graficos = []
        self.botones = []
        self.screen.update()

    def mostrar_menu_inicio(self):
        """Muestra el menú de inicio con el top 3 del ranking y botón para jugar."""
        self.limpiar_botones()
        self.display.clear()
        self.display.penup()
        
        # Título
        self.display.goto(0, 250)
        self.display.pencolor("blue")
        self.display.write("JUEGO DE BANDERAS", align="center", font=("Arial", 40, "bold"))
        
        # Mostrar top 3
        self.display.goto(0, 180)
        self.display.pencolor("darkgreen")
        self.display.write("Top 3 Jugadores:", align="center", font=("Arial", 18, "bold"))
        
        y = 140
        if self.ranking:
            for i, entry in enumerate(self.ranking[:3], start=1):
                self.display.goto(0, y)
                self.display.pencolor("black")
                text = f"{i}. {entry.get('name','-')} - {entry.get('score',0)}/{entry.get('total',0)}"
                self.display.write(text, align="center", font=("Arial", 16, "normal"))
                y -= 40
        else:
            self.display.goto(0, y)
            self.display.pencolor("gray")
            self.display.write("No hay puntuaciones aún", align="center", font=("Arial", 14, "normal"))
        
        # Botón para jugar
        boton_jugar = Boton(0, -100, 150, 50, "JUGAR", self.boton_jugar, 0)
        elementos = boton_jugar.dibujar()
        self.botones_graficos.append(elementos)
        self.botones.append(boton_jugar)
        
        self.screen.update()
    
    def boton_jugar(self, idx):
        """Callback para botón de jugar."""
        # Reiniciar estado del juego
        self.puntos = 0
        self.pregunta_actual = 0
        todos_los_paises = [nombre for nombre, _ in paises_info]
        if len(todos_los_paises) >= 25:
            self.paises_lista = random.sample(todos_los_paises, 25)
        else:
            self.paises_lista = todos_los_paises[:]
            random.shuffle(self.paises_lista)
        # Mostrar primera pregunta
        self.mostrar_pregunta()
    
    def mostrar_top3(self):
        """Dibuja el top 3 en la esquina superior derecha de la pantalla de juego."""
        # Usar una tortuga temporal para mostrar el top 3 sin interferir con el juego
        top3_turtle = turtle.Turtle()
        top3_turtle.hideturtle()
        top3_turtle.penup()
        top3_turtle.speed(0)
        
        x_pos = 280
        y_pos = 320
        
        top3_turtle.goto(x_pos, y_pos)
        top3_turtle.pencolor("darkgreen")
        top3_turtle.write("Top 3:", align="left", font=("Arial", 10, "bold"))
        
        y_pos -= 18
        if self.ranking:
            for i, entry in enumerate(self.ranking[:3], start=1):
                top3_turtle.goto(x_pos, y_pos)
                top3_turtle.pencolor("black")
                text = f"{i}. {entry.get('name','?')[:12]} - {entry.get('score',0)}"
                top3_turtle.write(text, align="left", font=("Arial", 9, "normal"))
                y_pos -= 16
        
        # Guardar referencia para limpiar después (opcional, pero lo guardamos en botones_graficos)
        # Por ahora, no lo añadimos al ranking visual para no causar conflictos
        return top3_turtle

    # --- Ranking (persistente) ---
    def load_ranking(self):
        try:
            if os.path.exists(self.ranking_file):
                with open(self.ranking_file, 'r', encoding='utf-8') as f:
                    return json.load(f)
        except Exception:
            pass
        return []

    def save_ranking(self):
        try:
            with open(self.ranking_file, 'w', encoding='utf-8') as f:
                json.dump(self.ranking, f, ensure_ascii=False, indent=2)
        except Exception:
            pass

    def update_ranking(self, name, score, total):
        # Añadir entrada y mantener orden descendente por score
        entry = {
            'name': name,
            'score': score,
            'total': total,
            'date': datetime.utcnow().isoformat()
        }
        self.ranking.append(entry)
        # Ordenar por score (desc) y luego por fecha (más reciente primero)
        self.ranking.sort(key=lambda e: (e.get('score', 0), e.get('date', '')), reverse=True)
        # Mantener solo los top 10
        self.ranking = self.ranking[:10]
        # Guardar
        self.save_ranking()
    
    def eliminar_del_ranking(self, name):
        """Elimina todas las entradas de un jugador del ranking."""
        self.ranking = [entry for entry in self.ranking if entry.get('name', '').lower() != name.lower()]
        self.save_ranking()
    
    def mostrar_dialogo_eliminar(self):
        """Muestra un diálogo para eliminar un jugador del ranking."""
        try:
            nombre = self.screen.textinput("Eliminar del Ranking", "Nombre del jugador a eliminar:")
            if nombre:
                # Contar cuántas entradas se van a eliminar
                antes = len(self.ranking)
                self.eliminar_del_ranking(nombre)
                despues = len(self.ranking)
                
                if antes > despues:
                    self.screen.textinput("Resultado", f"Se eliminaron {antes - despues} entrada(s) de '{nombre}'")
                else:
                    self.screen.textinput("Resultado", f"No se encontró a '{nombre}' en el ranking")
                
                # Volver a mostrar el menú
                self.mostrar_menu_inicio()
            else:
                self.mostrar_menu_inicio()
        except Exception as e:
            self.screen.textinput("Error", f"Error al eliminar: {str(e)}")
            self.mostrar_menu_inicio()
    
    def crear_boton(self, x, y, texto, indice, ancho=None):
        """Crea un botón con ancho adaptado al texto o ancho fijo si se proporciona"""
        # Si no se proporciona ancho, calcular el específico para este texto
        if ancho is None:
            if len(texto) > 15 and ' ' in texto:
                palabras = texto.split()
                mitad = len(palabras) // 2
                linea1 = " ".join(palabras[:mitad])
                linea2 = " ".join(palabras[mitad:])
                maxlen = max(len(linea1), len(linea2))
            else:
                maxlen = len(texto)
            ancho = max(120, min(360, maxlen * 10 + 40))
        
        alto = 60

        boton_obj = Boton(x, y, ancho, alto, texto, self.verificar_respuesta, indice)
        elementos = boton_obj.dibujar()
        self.botones_graficos.append(elementos)
        self.botones.append(boton_obj)
    
    def calcular_ancho_maximo_botones(self, opciones):
        """Calcula el ancho máximo necesario para los 4 botones de opciones"""
        ancho_maximo = 120  # Mínimo
        for texto in opciones:
            if len(texto) > 15 and ' ' in texto:
                palabras = texto.split()
                mitad = len(palabras) // 2
                linea1 = " ".join(palabras[:mitad])
                linea2 = " ".join(palabras[mitad:])
                maxlen = max(len(linea1), len(linea2))
            else:
                maxlen = len(texto)
            ancho_estimado = max(120, min(360, maxlen * 10 + 40))
            ancho_maximo = max(ancho_maximo, ancho_estimado)
        return ancho_maximo
    
    def verificar_respuesta(self, indice):
        """Verifica la respuesta seleccionada y pasa a la siguiente después de 3 segundos"""
        respuesta_usuario = self.opciones_actuales[indice]
        
        self.limpiar_botones()
        self.display.clear()
        self.display.penup()
        # Mostrar resultado en la parte superior para no superponer la bandera
        if respuesta_usuario == self.respuesta_correcta:
            self.puntos += 1
            self.display.goto(0, 200)
            self.display.pencolor("green")
            self.display.write("¡CORRECTO!", align="center", font=("Arial", 36, "bold"))
            self.display.goto(0, 160)
            self.display.pencolor("black")
            self.display.write(f"Es {self.respuesta_correcta}", align="center", font=("Arial", 20, "normal"))
        else:
            self.display.goto(0, 200)
            self.display.pencolor("red")
            self.display.write("INCORRECTO", align="center", font=("Arial", 36, "bold"))
            self.display.goto(0, 160)
            self.display.pencolor("black")
            self.display.write(f"Respuesta correcta: {self.respuesta_correcta}", align="center", font=("Arial", 20, "normal"))
        
        self.display.goto(0, -120)
        self.display.pencolor("gray")
        self.display.write("Próxima pregunta en 3 segundos...", align="center", font=("Arial", 14, "normal"))
        
        self.screen.update()
        
        # Esperar 3 segundos y pasar a la siguiente pregunta
        time.sleep(3)
        self.siguiente_pregunta()
    
    def siguiente_pregunta(self):
        self.pregunta_actual += 1
        self.mostrar_pregunta()
    
    def mostrar_pregunta(self):
        if self.pregunta_actual < len(self.paises_lista):
            self.limpiar_botones()
            self.display.clear()
            self.display.penup()
            self.screen.update()
            
            # Mostrar número de pregunta y puntos
            self.display.penup()
            self.display.goto(0, 300)
            self.display.pencolor("black")
            self.display.write(f"Pregunta {self.pregunta_actual + 1} de {len(self.paises_lista)}", 
                              align="center", font=("Arial", 16, "bold"))
            
            self.display.goto(0, 250)
            self.display.write(f"Puntos: {self.puntos}", 
                              align="center", font=("Arial", 14, "normal"))
            
            # Mostrar top 3 en esquina superior derecha
            self.mostrar_top3()
            
            # País actual
            pais_actual = self.paises_lista[self.pregunta_actual]
            codigo = paises[pais_actual]
            
            # Mostrar bandera
            self.display.goto(0, 80)
            self.display.pencolor("gray")
            self.display.write("Cargando bandera...", align="center", font=("Arial", 12, "normal"))
            self.screen.update()
            
            self.mostrar_bandera_imagen(codigo, 0, 80)
            
            # Generar opciones: respuesta correcta + 3 incorrectas
            opciones = [pais_actual]
            paises_disponibles = [p for p in self.paises_lista if p != pais_actual]
            opciones.extend(random.sample(paises_disponibles, 3))
            random.shuffle(opciones)
            
            # Guardar la respuesta correcta y opciones
            self.respuesta_correcta = pais_actual
            self.opciones_actuales = opciones
            
            # Calcular el ancho máximo para todos los botones
            ancho_maximo = self.calcular_ancho_maximo_botones(opciones)
            
            # Crear botones para las 4 opciones (2 filas de 2) con el mismo ancho
            self.crear_boton(-150, -60, opciones[0], 0, ancho_maximo)
            self.crear_boton(150, -60, opciones[1], 1, ancho_maximo)
            self.crear_boton(-150, -140, opciones[2], 2, ancho_maximo)
            self.crear_boton(150, -140, opciones[3], 3, ancho_maximo)
            
            self.screen.update()
        else:
            self.mostrar_resultado_final()
    
    def mostrar_resultado_final(self):
        self.limpiar_botones()
        self.display.clear()
        self.display.goto(0, 100)
        self.display.pencolor("blue")
        self.display.write("¡JUEGO TERMINADO!", align="center", font=("Arial", 40, "bold"))
        
        # Pedir nombre para ranking
        try:
            nombre = self.screen.textinput("Nombre", "Introduce tu nombre para el ranking:")
            if not nombre:
                nombre = f"Jugador_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}"
        except Exception:
            nombre = f"Jugador_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}"

        # Actualizar ranking
        try:
            self.update_ranking(nombre, self.puntos, len(self.paises_lista))
        except Exception:
            pass

        # Mostrar cantidad de aciertos (puntos)
        self.display.goto(0, 0)
        self.display.pencolor("darkgreen")
        self.display.write(f"Aciertos: {self.puntos} de {len(self.paises_lista)}", 
                          align="center", font=("Arial", 30, "bold"))
        
        porcentaje = (self.puntos / len(self.paises_lista)) * 100
        self.display.goto(0, -60)
        self.display.pencolor("black")
        self.display.write(f"Porcentaje: {porcentaje:.1f}%", align="center", font=("Arial", 20, "normal"))
        
        if porcentaje == 100:
            mensaje = "¡EXCELENTE! ¡Eres un experto en geografía!"
        elif porcentaje >= 80:
            mensaje = "¡MUY BIEN! Tienes muy buenos conocimientos"
        elif porcentaje >= 60:
            mensaje = "¡BIEN! Sigue practicando"
        elif porcentaje >= 40:
            mensaje = "Necesitas practicar más"
        else:
            mensaje = "¡Aprende más sobre geografía!"
        
        self.display.goto(0, -120)
        self.display.pencolor("purple")
        self.display.write(mensaje, align="center", font=("Arial", 16, "normal"))
        
        # Mostrar top 10 del ranking debajo
        try:
            top_n = 10
            self.display.goto(0, -160)
            self.display.pencolor("black")
            self.display.write("Top 10 Jugadores:", align="center", font=("Arial", 16, "bold"))
            y = -190
            for i, entry in enumerate(self.ranking[:top_n], start=1):
                text = f"{i}. {entry.get('name','-')} - {entry.get('score',0)}/{entry.get('total',0)}"
                self.display.goto(0, y)
                self.display.write(text, align="center", font=("Arial", 12, "normal"))
                y -= 20
        except Exception:
            pass

        # Botón para volver al menú
        boton_menu = Boton(0, -340, 150, 50, "MENÚ", self.boton_menu, 0)
        elementos = boton_menu.dibujar()
        self.botones_graficos.append(elementos)
        self.botones.append(boton_menu)
        
        self.display.goto(0, -380)
        self.display.pencolor("black")
        self.display.write("o cierra la ventana para salir", align="center", font=("Arial", 10, "normal"))
        
        self.screen.update()
    
    def boton_menu(self, idx):
        """Callback para el botón volver al menú"""
        self.mostrar_menu_inicio()
    
    def iniciar(self):
        """Inicia el loop principal del juego"""
        self.screen.mainloop()

# Iniciar el juego
if __name__ == "__main__":
    juego = JuegoBanderas()
    juego.iniciar()
