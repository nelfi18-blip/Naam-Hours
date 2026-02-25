# 🔧 SOLUCIÓN DE PROBLEMAS - "No me abre el programa"

## 🎯 Problema: "No me abre el programa Naam Hours"

Esta guía te ayudará a resolver el problema paso a paso.

---

## ✅ SOLUCIÓN RÁPIDA (3 Pasos)

### Paso 1: Instalar Dependencias

```bash
npm install
```

**¿Por qué?** El programa necesita descargar todas las librerías y paquetes necesarios para funcionar.

**Tiempo:** ~10 segundos

### Paso 2: Crear Archivo de Configuración

```bash
cp .env.example .env
```

**¿Por qué?** El programa necesita un archivo de configuración para saber cómo conectarse a los servicios.

**Tiempo:** 1 segundo

### Paso 3: Iniciar la Aplicación

```bash
npm run dev
```

**¿Por qué?** Este comando inicia el servidor de desarrollo.

**Resultado esperado:** Verás un mensaje como:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
```

### Paso 4: Abrir en Navegador

Abre tu navegador y ve a: **http://localhost:3000**

---

## 🔍 DIAGNÓSTICO DETALLADO

Si la solución rápida no funcionó, sigue estos pasos de diagnóstico:

### Verificación 1: ¿Node.js está instalado?

```bash
node --version
npm --version
```

**Resultado esperado:**
```
v18.0.0 o superior
10.0.0 o superior
```

**Si no está instalado:**
- Descarga Node.js desde: https://nodejs.org/
- Instala la versión LTS (Long Term Support)
- Reinicia tu terminal

---

### Verificación 2: ¿Estás en el directorio correcto?

```bash
pwd
ls -la
```

**Debes ver:**
- package.json
- src/
- vite.config.js
- .env.example

**Si no estás en el directorio correcto:**
```bash
cd ruta/a/Naam-Hours
```

---

### Verificación 3: ¿node_modules existe?

```bash
ls -la | grep node_modules
```

**Si NO existe:**
```bash
npm install
```

**Si existe pero hay errores:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### Verificación 4: ¿Archivo .env existe?

```bash
ls -la | grep .env
```

**Si NO existe:**
```bash
cp .env.example .env
```

**Verificar contenido:**
```bash
cat .env
```

**Debe contener al menos:**
```env
VITE_SUPABASE_URL=https://demo.supabase.co
VITE_SUPABASE_ANON_KEY=demo-key
VITE_APP_NAME=Naam Hours
VITE_APP_ENV=development
```

---

### Verificación 5: ¿Puerto 3000 está ocupado?

```bash
# Linux/Mac
lsof -ti:3000

# Si devuelve un número, el puerto está ocupado
```

**Solución - Opción A: Usa otro puerto**
```bash
npm run dev -- --port 3001
# Luego abre: http://localhost:3001
```

**Solución - Opción B: Libera el puerto**
```bash
# Linux/Mac
kill $(lsof -ti:3000)

# Windows
netstat -ano | findstr :3000
taskkill /PID [numero] /F
```

---

### Verificación 6: ¿Hay errores en la consola?

Cuando ejecutas `npm run dev`, ¿ves algún error?

#### Error: "Cannot find module"

**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install
```

#### Error: "EACCES: permission denied"

**Solución:**
```bash
sudo chown -R $(whoami) ~/.npm
npm install
```

#### Error: "Invalid supabaseUrl"

**Solución:** Verifica que .env tenga URLs válidas:
```bash
cat > .env << 'EOF'
VITE_SUPABASE_URL=https://demo.supabase.co
VITE_SUPABASE_ANON_KEY=demo-key
VITE_APP_NAME=Naam Hours
VITE_APP_ENV=development
EOF
```

Luego reinicia el servidor.

---

## 🚨 ERRORES COMUNES Y SOLUCIONES

### Error 1: "npm: command not found"

**Causa:** Node.js no está instalado o no está en el PATH.

**Solución:**
1. Instala Node.js desde https://nodejs.org/
2. Reinicia tu terminal
3. Verifica: `node --version`

---

### Error 2: "La página no carga / ERR_CONNECTION_REFUSED"

**Causa:** El servidor no está corriendo.

**Solución:**
1. Verifica que `npm run dev` esté ejecutándose
2. No debes ver ningún error en la terminal
3. Debe mostrar: "Local: http://localhost:3000"

---

### Error 3: "Página en blanco"

**Causa:** Error de JavaScript en el navegador.

**Solución:**
1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Console"
3. Busca errores en rojo
4. Si ves "Invalid supabaseUrl", sigue la Verificación 6

---

### Error 4: "Module not found" al ejecutar npm run dev

**Causa:** Dependencias no instaladas correctamente.

**Solución:**
```bash
# Limpia todo
rm -rf node_modules package-lock.json dist .vite

# Reinstala
npm install

# Inicia de nuevo
npm run dev
```

---

### Error 5: "Port 3000 is already in use"

**Causa:** Otro proceso está usando el puerto 3000.

**Solución rápida:**
```bash
npm run dev -- --port 3001
```

Luego abre: http://localhost:3001

---

## 📋 CHECKLIST DE VERIFICACIÓN COMPLETA

Marca cada ítem conforme lo completes:

- [ ] Node.js instalado (v18+)
- [ ] npm instalado (v10+)
- [ ] En el directorio correcto (tiene package.json)
- [ ] Dependencias instaladas (`node_modules` existe)
- [ ] Archivo `.env` existe
- [ ] Archivo `.env` tiene configuración válida
- [ ] Puerto 3000 disponible (o usando otro puerto)
- [ ] `npm run dev` ejecutado sin errores
- [ ] Mensaje "Local: http://localhost:3000" visible
- [ ] Navegador abierto en http://localhost:3000
- [ ] Página de login visible
- [ ] Botón "🚀 Acceder en Modo Demo" visible

---

## 🎯 SCRIPT DE DIAGNÓSTICO AUTOMÁTICO

Ejecuta este script para diagnosticar automáticamente:

```bash
#!/bin/bash

echo "🔍 Diagnóstico de Naam Hours..."
echo ""

# 1. Verificar Node.js
echo "1. Verificando Node.js..."
if command -v node &> /dev/null; then
    echo "   ✅ Node.js instalado: $(node --version)"
else
    echo "   ❌ Node.js NO instalado"
    exit 1
fi

# 2. Verificar npm
echo "2. Verificando npm..."
if command -v npm &> /dev/null; then
    echo "   ✅ npm instalado: $(npm --version)"
else
    echo "   ❌ npm NO instalado"
    exit 1
fi

# 3. Verificar directorio
echo "3. Verificando directorio..."
if [ -f "package.json" ]; then
    echo "   ✅ package.json encontrado"
else
    echo "   ❌ package.json NO encontrado"
    echo "   → Navega al directorio correcto"
    exit 1
fi

# 4. Verificar node_modules
echo "4. Verificando dependencias..."
if [ -d "node_modules" ]; then
    echo "   ✅ node_modules existe"
else
    echo "   ⚠️  node_modules NO existe"
    echo "   → Ejecutando: npm install"
    npm install
fi

# 5. Verificar .env
echo "5. Verificando configuración..."
if [ -f ".env" ]; then
    echo "   ✅ .env existe"
else
    echo "   ⚠️  .env NO existe"
    echo "   → Creando desde .env.example"
    cp .env.example .env
fi

# 6. Verificar puerto
echo "6. Verificando puerto 3000..."
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "   ⚠️  Puerto 3000 ocupado"
    echo "   → Usa: npm run dev -- --port 3001"
else
    echo "   ✅ Puerto 3000 disponible"
fi

echo ""
echo "✅ Diagnóstico completado"
echo ""
echo "🚀 Para iniciar la aplicación:"
echo "   npm run dev"
echo ""
echo "📱 Luego abre en tu navegador:"
echo "   http://localhost:3000"
```

Guarda este script como `diagnostico.sh` y ejecútalo:

```bash
chmod +x diagnostico.sh
./diagnostico.sh
```

---

## 🎬 PROCESO COMPLETO DESDE CERO

Si quieres empezar completamente desde cero:

```bash
# 1. Navega al proyecto
cd /ruta/a/Naam-Hours

# 2. Limpia todo
rm -rf node_modules package-lock.json dist .vite .env

# 3. Crea .env desde ejemplo
cp .env.example .env

# 4. Instala dependencias
npm install

# 5. Inicia servidor
npm run dev

# 6. Abre navegador
# http://localhost:3000
```

---

## 📸 RESULTADO ESPERADO

Cuando todo funcione correctamente, deberás ver:

![Naam Hours Funcionando](https://github.com/user-attachments/assets/4277771d-6c61-42d9-bdd9-28dc4fa951df)

**En la pantalla:**
- Título "Naam Hours"
- Formulario de login
- Botón "🚀 Acceder en Modo Demo"

---

## 💡 CONSEJOS PREVENTIVOS

Para evitar este problema en el futuro:

1. **Siempre ejecuta `npm install`** después de clonar o actualizar el repo
2. **Verifica que `.env` exista** antes de iniciar
3. **Usa `npm run dev`** (no ejecutes vite directamente)
4. **No borres `node_modules`** a menos que sea necesario
5. **Mantén Node.js actualizado** (usa la versión LTS)

---

## 🆘 ¿NADA FUNCIONÓ?

Si seguiste todos los pasos y aún no funciona:

1. **Captura de pantalla** del error en la terminal
2. **Captura de pantalla** de la consola del navegador (F12)
3. **Versiones:**
   ```bash
   node --version
   npm --version
   ```
4. **Sistema operativo:** Windows/Mac/Linux
5. **Contenido de .env:**
   ```bash
   cat .env
   ```

---

## 📚 RECURSOS ADICIONALES

- **Guía completa de uso:** [GUIA_USO.md](GUIA_USO.md)
- **Cómo abrir la app:** [COMO_ABRIR.md](COMO_ABRIR.md)
- **Verificación de setup:** [SETUP_VERIFICATION.md](SETUP_VERIFICATION.md)
- **Referencia rápida:** [REFERENCIA_RAPIDA.md](REFERENCIA_RAPIDA.md)

---

**Última actualización:** 2026-02-25  
**Versión:** 1.0.0
