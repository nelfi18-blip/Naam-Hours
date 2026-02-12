# 🔗 CÓMO ABRIR LA APLICACIÓN - Link de Acceso

## 🌐 Link para Abrir:

```
http://localhost:3000
```

---

## 📋 Instrucciones Rápidas:

### 1️⃣ Primero, Inicia el Servidor

```bash
npm run dev
```

### 2️⃣ Luego, Abre en tu Navegador

Haz clic en este link o cópialo en tu navegador:

**👉 http://localhost:3000**

### 3️⃣ Accede en Modo Demo

Una vez que la página cargue:
- Haz clic en el botón **"🚀 Acceder en Modo Demo"**
- ¡Listo! Ya puedes explorar todas las funcionalidades

---

## 🚀 Inicio Rápido (Todo en 1 Comando)

Si es la primera vez que usas la aplicación:

```bash
./quick-start.sh
```

Este script automáticamente:
- ✅ Instala las dependencias
- ✅ Crea el archivo de configuración
- ✅ Inicia el servidor
- ✅ Te muestra el link para abrir

---

## 🌍 Links Disponibles

| Descripción | URL | Cuándo Usar |
|-------------|-----|-------------|
| **Desarrollo** | http://localhost:3000 | Durante desarrollo (npm run dev) |
| **Vista Previa** | http://localhost:4173 | Después de build (npm run preview) |
| **Producción** | Tu URL de Vercel | Cuando despliegues en Vercel |

---

## 🔧 Verificación Rápida

Para verificar que el servidor está corriendo:

```bash
# Ver si el servidor está activo
curl http://localhost:3000

# O abrir directamente en el navegador
xdg-open http://localhost:3000  # En Linux
open http://localhost:3000      # En macOS
start http://localhost:3000     # En Windows
```

---

## 📱 Acceso desde Otros Dispositivos (Red Local)

Si quieres acceder desde tu teléfono u otra computadora en la misma red:

1. Encuentra tu IP local:
   ```bash
   # En Linux/Mac
   ifconfig | grep "inet "
   
   # En Windows
   ipconfig
   ```

2. Usa la IP en lugar de localhost:
   ```
   http://TU_IP_LOCAL:3000
   ```
   
   Ejemplo: `http://192.168.1.100:3000`

---

## ⚠️ Solución de Problemas

### Problema: "No se puede conectar"

**Solución:**
1. Verifica que el servidor esté corriendo:
   ```bash
   npm run dev
   ```

2. Espera a ver este mensaje:
   ```
   VITE ready in XXX ms
   ➜  Local:   http://localhost:3000/
   ➜  Network: use --host to expose
   ```

3. Luego abre: http://localhost:3000

### Problema: "Puerto 3000 ya está en uso"

**Solución 1:** Usa otro puerto:
```bash
npm run dev -- --port 3001
```
Luego abre: http://localhost:3001

**Solución 2:** Cierra el proceso que usa el puerto 3000:
```bash
# En Linux/Mac
lsof -ti:3000 | xargs kill -9

# En Windows
netstat -ano | findstr :3000
taskkill /PID [el_numero_que_aparece] /F
```

---

## 🎯 Resumen Visual

```
┌─────────────────────────────────────────┐
│                                         │
│  1. Ejecuta: npm run dev               │
│                                         │
│  2. Espera el mensaje:                 │
│     "Local: http://localhost:3000"     │
│                                         │
│  3. Abre en navegador:                 │
│     👉 http://localhost:3000           │
│                                         │
│  4. Click en:                          │
│     "🚀 Acceder en Modo Demo"         │
│                                         │
│  ✅ ¡Listo para usar!                  │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📞 Recursos Adicionales

- **Documentación completa:** README.md
- **Guía de configuración:** SETUP_VERIFICATION.md
- **Resumen de requisitos:** QUE_FALTA.md
- **Script automático:** ./quick-start.sh

---

## 🔥 Comando Más Rápido

Si ya tienes todo instalado:

```bash
npm run dev && echo "👉 Abre: http://localhost:3000"
```

---

**Última actualización:** 2026-02-12  
**Puerto por defecto:** 3000  
**URL local:** http://localhost:3000
