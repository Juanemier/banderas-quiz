#!/usr/bin/env python3
"""
Servidor simple para guardar el ranking del juego de banderas
Manejo de datos persistente en archivo JSON
"""

import json
import os
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import threading
from datetime import datetime

RANKING_FILE = 'ranking-data.json'

# Cargar ranking del archivo
def load_ranking():
    try:
        if os.path.exists(RANKING_FILE):
            with open(RANKING_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
    except Exception as e:
        print(f'Error cargando ranking: {e}')
    return []

# Guardar ranking al archivo
def save_ranking(ranking):
    try:
        with open(RANKING_FILE, 'w', encoding='utf-8') as f:
            json.dump(ranking, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f'Error guardando ranking: {e}')

class RankingHandler(BaseHTTPRequestHandler):
    
    def do_GET(self):
        """Manejar solicitudes GET"""
        path = urlparse(self.path).path
        
        if path == '/api/ranking':
            # Obtener ranking completo
            ranking = load_ranking()
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(ranking, ensure_ascii=False).encode('utf-8'))
        
        elif path == '/api/ranking/top10':
            # Obtener top 10
            ranking = load_ranking()
            top10 = ranking[:10]
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(top10, ensure_ascii=False).encode('utf-8'))
        
        elif path == '/api/ranking/top3':
            # Obtener top 3
            ranking = load_ranking()
            top3 = ranking[:3]
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(top3, ensure_ascii=False).encode('utf-8'))
        
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_POST(self):
        """Manejar solicitudes POST"""
        path = urlparse(self.path).path
        
        if path == '/api/ranking':
            # Agregar entrada al ranking
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            
            try:
                data = json.loads(body)
                name = data.get('name', 'Anónimo')
                score = data.get('score', 0)
                total = data.get('total', 25)
                
                ranking = load_ranking()
                
                # Agregar nueva entrada
                ranking.append({
                    'name': name,
                    'score': score,
                    'total': total,
                    'date': datetime.now().isoformat()
                })
                
                # Ordenar por score descendente
                ranking.sort(key=lambda x: (-x['score'], x['date']))
                
                # Mantener top 100
                ranking = ranking[:100]
                
                save_ranking(ranking)
                
                response = {
                    'success': True,
                    'ranking': ranking
                }
                
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
                
            except Exception as e:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_OPTIONS(self):
        """Manejar CORS preflight"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def log_message(self, format, *args):
        """Suprimir logs de solicitudes"""
        pass

if __name__ == '__main__':
    PORT = 3000
    # Bind to all interfaces so mobile devices on the same LAN can reach the API
    server = HTTPServer(('', PORT), RankingHandler)
    print(f'Servidor ejecutándose en http://localhost:{PORT}')
    print(f'Ranking se guarda en: {RANKING_FILE}')
    print('Presiona Ctrl+C para detener el servidor')
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nServidor detenido.')
        server.server_close()
