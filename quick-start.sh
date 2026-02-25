#!/bin/bash

# Script de Inicio Rápido para Naam Hours
# Este script configura y lanza la aplicación en modo demo

echo "🚀 Naam Hours - Inicio Rápido"
echo "================================"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    echo "Por favor instala Node.js 18+ desde https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Advertencia: Se requiere Node.js 18 o superior"
    echo "Versión actual: $(node -v)"
fi

echo "✓ Node.js detectado: $(node -v)"
echo "✓ npm detectado: $(npm -v)"
echo ""

# Verificar si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Error al instalar dependencias"
        exit 1
    fi
    echo "✓ Dependencias instaladas"
else
    echo "✓ Dependencias ya instaladas"
fi
echo ""

# Crear archivo .env si no existe
if [ ! -f ".env" ]; then
    echo "🔧 Creando archivo de configuración (.env)..."
    cat > .env << 'EOF'
# Supabase Configuration (Demo Mode)
VITE_SUPABASE_URL=https://demo.supabase.co
VITE_SUPABASE_ANON_KEY=demo-key

# App Configuration
VITE_APP_NAME=Naam Hours
VITE_APP_ENV=development

# Optional: Email Service (for notifications)
VITE_EMAIL_SERVICE_URL=
VITE_EMAIL_API_KEY=

# Optional: Maps API (for GPS tracking)
VITE_MAPS_API_KEY=
EOF
    echo "✓ Archivo .env creado (modo demo)"
else
    echo "✓ Archivo .env ya existe"
fi
echo ""

echo "================================"
echo "✅ Configuración completada!"
echo ""
echo "📋 Instrucciones:"
echo "1. El servidor se iniciará en http://localhost:3000"
echo "2. Haz clic en '🚀 Acceder en Modo Demo' para probar la aplicación"
echo "3. Presiona Ctrl+C para detener el servidor"
echo ""
echo "🌟 Iniciando servidor de desarrollo..."
echo "================================"
echo ""

# Iniciar servidor de desarrollo
npm run dev
