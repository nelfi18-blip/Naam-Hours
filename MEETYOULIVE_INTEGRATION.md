# 📹 Integración con MeetYouLive

## 🌐 ¿Qué es MeetYouLive?

MeetYouLive es una plataforma de videoconferencias que permite realizar reuniones virtuales de alta calidad. Esta integración permite gestionar reuniones directamente desde Naam Hours.

## 🚀 Configuración

### 1. Obtener Credenciales

1. Visita [meetyoulive.app](https://meetyoulive.app)
2. Crea una cuenta o inicia sesión
3. Ve a Configuración > API
4. Copia tus credenciales:
   - API URL
   - API Key
   - Workspace ID

### 2. Configurar Variables de Entorno

Edita tu archivo `.env` y agrega las siguientes variables:

```env
# MeetYouLive Integration
VITE_MEETYOULIVE_API_URL=https://meetyoulive.app/api
VITE_MEETYOULIVE_API_KEY=tu_api_key_aqui
VITE_MEETYOULIVE_WORKSPACE_ID=tu_workspace_id_aqui
```

### 3. Reiniciar Aplicación

```bash
# Detén el servidor si está corriendo
# Luego inicia de nuevo
npm run dev
```

## 📋 Funcionalidades

### 1. Reunión Rápida
- Crea una sala de reunión instantánea
- Obtén un enlace inmediato para compartir
- Perfecto para reuniones improvisadas

### 2. Programar Reuniones
- Crea reuniones para fechas futuras
- Añade título y descripción
- Establece duración
- Comparte el enlace con anticipación

### 3. Gestionar Reuniones
- Ver lista de todas tus reuniones
- Acceder a salas activas
- Eliminar reuniones canceladas

## 💻 Uso

### Crear Reunión Rápida

1. Ve a la sección "MeetYouLive" en el menú
2. Haz clic en "Reunión Rápida"
3. Se abrirá una nueva pestaña con la sala de reunión
4. Comparte el enlace con los participantes

### Programar Reunión

1. Haz clic en "Programar Reunión"
2. Completa el formulario:
   - Título: Nombre de la reunión
   - Descripción: Agenda u objetivos
   - Fecha y Hora: Cuándo se realizará
   - Duración: En minutos (default: 60)
3. Haz clic en "Crear Reunión"
4. Recibirás un enlace para compartir

### Unirse a una Reunión

1. En la lista de reuniones, localiza la reunión
2. Haz clic en "Unirse"
3. Se abrirá la sala en una nueva pestaña

## 🔧 API Reference

### Cliente JavaScript

El cliente está disponible en `src/utils/meetyouliveClient.js`

#### Verificar Configuración

```javascript
import { isMeetYouLiveConfigured } from './utils/meetyouliveClient'

if (isMeetYouLiveConfigured()) {
  console.log('MeetYouLive está configurado')
}
```

#### Crear Reunión

```javascript
import { createMeeting } from './utils/meetyouliveClient'

const result = await createMeeting({
  title: 'Reunión de Equipo',
  description: 'Revisión semanal',
  scheduledTime: new Date('2024-03-15T10:00:00'),
  duration: 60
})

if (result.success) {
  console.log('URL de la reunión:', result.roomUrl)
}
```

#### Reunión Instantánea

```javascript
import { createInstantMeeting } from './utils/meetyouliveClient'

const result = await createInstantMeeting('Reunión Rápida')
if (result.success) {
  window.open(result.roomUrl, '_blank')
}
```

#### Listar Reuniones

```javascript
import { listMeetings } from './utils/meetyouliveClient'

const result = await listMeetings()
if (result.success) {
  console.log('Reuniones:', result.meetings)
}
```

#### Eliminar Reunión

```javascript
import { deleteMeeting } from './utils/meetyouliveClient'

const result = await deleteMeeting(meetingId)
if (result.success) {
  console.log('Reunión eliminada')
}
```

## 🎯 Casos de Uso

### 1. Reuniones de Equipo
Programa reuniones recurrentes con tu equipo directamente desde la app.

### 2. Entrevistas
Crea salas de entrevista para candidatos con toda la información en un solo lugar.

### 3. Consultas con Clientes
Genera enlaces de reunión para tus clientes con descripción del servicio.

### 4. Capacitaciones
Organiza sesiones de training con fechas programadas.

## ⚠️ Solución de Problemas

### Error: "MeetYouLive no está configurado"

**Causa:** Las variables de entorno no están configuradas correctamente.

**Solución:**
1. Verifica que el archivo `.env` existe
2. Confirma que las variables empiezan con `VITE_`
3. Reinicia el servidor de desarrollo

### Error: "Error de conexión"

**Causa:** Las credenciales son inválidas o la API no está disponible.

**Solución:**
1. Verifica tus credenciales en meetyoulive.app
2. Confirma que el API Key es válido
3. Verifica el Workspace ID
4. Usa el botón "Verificar Conexión" en la UI

### Las reuniones no aparecen

**Causa:** Problema con la sincronización.

**Solución:**
1. Haz clic en "Actualizar" en la lista de reuniones
2. Verifica tu conexión a internet
3. Revisa la consola del navegador para errores

## 🔐 Seguridad

- Las credenciales se almacenan solo en variables de entorno
- Nunca expongas tu API Key en el código fuente
- Usa HTTPS para todas las comunicaciones
- Las claves no se envían al cliente en producción

## 📚 Recursos Adicionales

- [Documentación de MeetYouLive](https://meetyoulive.app/docs)
- [API Reference](https://meetyoulive.app/api/docs)
- [Soporte](https://meetyoulive.app/support)

## 🆘 Soporte

Si tienes problemas con la integración:

1. Revisa esta documentación
2. Verifica tus credenciales
3. Consulta los logs del navegador
4. Contacta al soporte de MeetYouLive

---

**Última actualización:** 2026-02-25  
**Versión:** 1.0.0
