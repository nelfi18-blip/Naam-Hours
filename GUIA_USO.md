# 📖 GUÍA COMPLETA DE USO - Naam Hours

## 🎯 ¿Cómo lo Hago? - Guía Paso a Paso

Esta guía te mostrará exactamente cómo usar cada funcionalidad de Naam Hours.

---

## 🚀 INICIO RÁPIDO

### Paso 1: Instalar y Ejecutar la Aplicación

#### Opción A: Usando el Script Automático (Más Fácil)

```bash
./quick-start.sh
```

Esto instalará todo automáticamente y abrirá la aplicación.

#### Opción B: Paso a Paso Manual

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo de configuración
cp .env.example .env

# 3. Iniciar el servidor
npm run dev

# 4. Abrir navegador en http://localhost:3000
```

### Paso 2: Acceder a la Aplicación

1. Abre tu navegador web
2. Ve a: **http://localhost:3000**
3. Verás la pantalla de login
4. Haz clic en **"🚀 Acceder en Modo Demo"**
5. ¡Listo! Ya estás dentro

---

## 📋 CÓMO USAR CADA FUNCIONALIDAD

### 1. 🏠 Dashboard (Inicio)

**¿Qué es?** Tu panel principal con estadísticas en tiempo real.

**Cómo acceder:**
- Click en "Dashboard" en el menú lateral
- Es la primera pantalla al entrar

**¿Qué puedes ver?**
- Empleados activos
- Horas trabajadas totales
- Ingresos del mes
- Pagos pendientes
- Gráficos de actividad

**Cómo interpretar los datos:**
- 📈 Verde con flecha arriba = Aumento positivo
- 📉 Rojo con flecha abajo = Disminución
- Los gráficos muestran tendencias de la última semana/mes

---

### 2. ⏰ Marcajes (Control de Tiempo)

**¿Qué es?** Sistema para registrar entrada y salida de empleados.

**Cómo registrar entrada (Clock In):**

1. Click en "Marcajes" en el menú
2. Click en el botón **"Clock In"**
3. Se registrará automáticamente:
   - Hora exacta
   - Tu ubicación GPS (si está habilitada)
4. Aparecerá confirmación

**Cómo registrar salida (Clock Out):**

1. Click en el botón **"Clock Out"**
2. Opcional: Agrega notas sobre tu jornada
3. Se calculará automáticamente las horas trabajadas

**Ver historial:**
- Todos tus marcajes aparecen en la tabla
- Puedes filtrar por fecha
- Se muestra duración total trabajada

**Ejemplo de uso:**
```
9:00 AM  → Click "Clock In"  → Inicio de jornada
6:00 PM  → Click "Clock Out" → Fin de jornada
Resultado: 9 horas trabajadas registradas
```

---

### 3. 📹 MeetYouLive (Video Conferencias)

**¿Qué es?** Sistema integrado de reuniones virtuales.

#### Primera Vez: Configurar MeetYouLive

**Si ves el mensaje "Configuración Requerida":**

1. Ve a https://meetyoulive.app
2. Crea una cuenta
3. Ve a Configuración → API
4. Copia estas 3 cosas:
   - API URL
   - API Key
   - Workspace ID
5. Abre el archivo `.env` en tu proyecto
6. Agrega estas líneas:

```env
VITE_MEETYOULIVE_API_URL=https://meetyoulive.app/api
VITE_MEETYOULIVE_API_KEY=tu_api_key_aqui
VITE_MEETYOULIVE_WORKSPACE_ID=tu_workspace_id_aqui
```

7. Reinicia el servidor: `npm run dev`

#### Crear Reunión Rápida

**Pasos:**
1. Click en "MeetYouLive" en el menú
2. Click en **"Reunión Rápida"**
3. Se abrirá una nueva pestaña con tu sala
4. Comparte el link con los participantes

**Cuándo usar:**
- Reuniones improvisadas
- Llamadas urgentes
- Sin necesidad de programar

#### Programar Reunión

**Pasos:**
1. Click en **"Programar Reunión"**
2. Completa el formulario:
   - **Título:** "Reunión de Equipo"
   - **Descripción:** "Revisión semanal" (opcional)
   - **Fecha y Hora:** Selecciona cuándo
   - **Duración:** 60 minutos (por ejemplo)
3. Click en **"Crear Reunión"**
4. Recibirás el link de la reunión

**Cuándo usar:**
- Reuniones planificadas
- Entrevistas
- Capacitaciones
- Presentaciones

#### Unirse a una Reunión

**Pasos:**
1. En la lista de reuniones
2. Busca la reunión
3. Click en **"Unirse"**
4. Se abrirá la sala en nueva pestaña

#### Eliminar una Reunión

**Pasos:**
1. Busca la reunión en la lista
2. Click en el ícono de basura 🗑️
3. Confirma la eliminación

---

### 4. 💰 Cobros (Facturación)

**¿Qué es?** Gestión de facturas y cobros a clientes.

#### Crear Nueva Factura

**Pasos:**
1. Click en "Cobros" en el menú
2. Click en **"Nueva Factura"**
3. Completa los datos:
   - **Cliente:** Nombre del cliente
   - **Email:** correo@cliente.com
   - **Monto:** $1,500.00
   - **Descripción:** "Servicios de desarrollo"
   - **Fecha de vencimiento:** Selecciona fecha
4. Click en **"Crear Factura"**

**Estados de factura:**
- 🟡 **Pendiente:** No pagada aún
- 🟢 **Pagado:** Cliente ha pagado
- 🔴 **Rechazado:** Factura rechazada

#### Cambiar Estado de Factura

**Pasos:**
1. Busca la factura en la lista
2. Click en el menú de acciones (...)
3. Selecciona nuevo estado:
   - "Marcar como Pagado"
   - "Marcar como Rechazado"

#### Exportar Factura

**Como PDF:**
1. Click en el botón **"Exportar PDF"**
2. Se descargará automáticamente
3. Puedes enviarlo al cliente

**Como CSV:**
1. Click en **"Exportar CSV"**
2. Se descargará archivo Excel-compatible
3. Úsalo para análisis o reportes

**Ver estadísticas:**
- Total cobrado este mes
- Facturas pendientes
- Tasa de pago

---

### 5. 💵 Pagos (Nómina de Empleados)

**¿Qué es?** Sistema para registrar pagos a empleados.

#### Registrar un Pago

**Pasos:**
1. Click en "Pagos" en el menú
2. Click en **"Nuevo Pago"**
3. Completa:
   - **Empleado:** Selecciona de la lista
   - **Monto:** $2,500.00
   - **Periodo:** "Febrero 2026"
   - **Fecha de pago:** Selecciona fecha
   - **Deducciones:** $250.00 (opcional)
   - **Notas:** "Pago quincenal" (opcional)
4. Click en **"Registrar Pago"**

**Cálculos automáticos:**
- Monto bruto: $2,500.00
- Deducciones: -$250.00
- **Neto a pagar: $2,250.00**

#### Generar Recibo de Pago

**Pasos:**
1. Busca el pago en la lista
2. Click en **"Generar Recibo"**
3. Se descarga PDF automáticamente
4. Envía al empleado

**Contenido del recibo:**
- Nombre del empleado
- Periodo de pago
- Monto bruto
- Deducciones
- Total neto
- Fecha de pago

#### Ver Historial de Pagos

**Filtros disponibles:**
- Por empleado
- Por mes/año
- Por rango de montos

---

### 6. 📊 Reportes

**¿Qué es?** Visualización de datos y análisis.

**Tipos de reportes:**
- Horas trabajadas por periodo
- Ingresos mensuales
- Productividad por empleado
- Análisis de costos

**Cómo generar:**
1. Click en "Reportes"
2. Selecciona tipo de reporte
3. Elige rango de fechas
4. Click en **"Generar"**

**Exportar reportes:**
- PDF para presentaciones
- CSV para análisis en Excel
- Gráficos como imágenes

---

### 7. 🔔 Notificaciones

**¿Qué es?** Alertas y mensajes del sistema.

**Ver notificaciones:**
1. Click en el ícono de campana 🔔 (arriba derecha)
2. Se abre el panel de notificaciones

**Tipos de notificaciones:**
- ℹ️ **Info:** Información general
- ✅ **Éxito:** Acción completada
- ⚠️ **Advertencia:** Requiere atención
- ❌ **Error:** Algo salió mal

**Marcar como leída:**
- Click en una notificación
- O click en "Marcar todas como leídas"

**Ejemplo de notificaciones:**
- "Nueva factura creada"
- "Pago registrado exitosamente"
- "Reunión programada para mañana"

---

### 8. 👥 Empleados

**¿Qué es?** Gestión de la base de datos de empleados.

#### Agregar Empleado

**Pasos:**
1. Click en "Empleados"
2. Click en **"Nuevo Empleado"**
3. Completa:
   - **Nombre:** Juan Pérez
   - **Email:** juan@empresa.com
   - **Posición:** Desarrollador
   - **Salario:** $3,000/mes
   - **Teléfono:** +1234567890
4. Click en **"Guardar"**

#### Editar Empleado

**Pasos:**
1. Busca al empleado
2. Click en el ícono de editar ✏️
3. Modifica los datos
4. Click en **"Actualizar"**

#### Ver Detalles

**Información disponible:**
- Datos personales
- Historial de marcajes
- Historial de pagos
- Horas totales trabajadas

---

### 9. 💾 Backup (Respaldo)

**¿Qué es?** Sistema de respaldo de datos.

#### Crear Backup

**Pasos:**
1. Click en "Backup"
2. Click en **"Crear Backup"**
3. Se genera archivo JSON con todos los datos
4. Se guarda automáticamente

**Qué incluye el backup:**
- Todos los marcajes
- Todas las facturas
- Todos los pagos
- Datos de empleados
- Configuración

#### Restaurar Backup

**Pasos:**
1. Click en **"Restaurar Backup"**
2. Selecciona el archivo de backup
3. Click en **"Subir"**
4. Confirma la restauración
5. Los datos se importan automáticamente

**⚠️ Importante:**
- Se guarda un máximo de 10 backups
- Los backups más antiguos se eliminan automáticamente

#### Descargar Backup

**Pasos:**
1. En la lista de backups
2. Click en **"Descargar"** 💾
3. Se descarga archivo JSON
4. Guárdalo en lugar seguro

---

### 10. 🌓 Tema Oscuro/Claro

**Cómo cambiar el tema:**

1. Busca el ícono de sol/luna (arriba derecha)
2. Click en el ícono
3. El tema cambia instantáneamente

**Modos disponibles:**
- ☀️ **Claro:** Fondo blanco, mejor para día
- 🌙 **Oscuro:** Fondo oscuro, mejor para noche

**Persistencia:**
- Tu preferencia se guarda automáticamente
- Se mantiene al cerrar y reabrir

---

## 🔑 PERMISOS Y ROLES

### Admin (Administrador)
**Puede hacer TODO:**
- ✅ Ver dashboard completo
- ✅ Gestionar marcajes
- ✅ Crear/editar facturas
- ✅ Registrar pagos
- ✅ Ver reportes
- ✅ Gestionar empleados
- ✅ Crear backups
- ✅ Usar MeetYouLive

### Supervisor
**Puede hacer CASI TODO:**
- ✅ Ver dashboard
- ✅ Gestionar marcajes de su equipo
- ✅ Crear facturas
- ✅ Registrar pagos
- ✅ Ver reportes
- ✅ Usar MeetYouLive
- ❌ No puede crear backups

### Empleado (Employee)
**Acceso LIMITADO:**
- ✅ Ver dashboard básico
- ✅ Sus propios marcajes (Clock In/Out)
- ✅ Ver sus notificaciones
- ✅ Usar MeetYouLive
- ❌ No puede ver finanzas
- ❌ No puede gestionar otros empleados

---

## ❓ PROBLEMAS COMUNES Y SOLUCIONES

### "No puedo abrir la aplicación"

**Solución:**
```bash
# 1. Verifica que el servidor esté corriendo
npm run dev

# 2. Espera a ver este mensaje:
# "Local: http://localhost:3000"

# 3. Abre tu navegador en:
http://localhost:3000
```

### "Error: Cannot find module"

**Solución:**
```bash
# Reinstala las dependencias
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### "Puerto 3000 ya está en uso"

**Solución:**
```bash
# Opción 1: Usa otro puerto
npm run dev -- --port 3001

# Opción 2: Cierra el proceso en el puerto 3000
# Linux/Mac:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID [numero] /F
```

### "MeetYouLive no funciona"

**Solución:**
1. Verifica que hayas configurado las credenciales en `.env`
2. Las variables deben empezar con `VITE_`
3. Reinicia el servidor después de editar `.env`
4. Click en "Verificar Conexión" en la UI

### "No veo el botón de modo demo"

**Solución:**
- Recarga la página (F5)
- Borra caché del navegador
- Verifica que estés en http://localhost:3000

### "Los datos no se guardan"

**En modo demo:**
- Los datos se guardan en localStorage
- Se mantienen mientras no borres el caché
- Para datos persistentes, configura Supabase

---

## 🎓 FLUJO DE TRABAJO TÍPICO

### Día de Trabajo de un Empleado:

```
9:00 AM
↓
Abrir aplicación → Click "Marcajes" → "Clock In"
↓
Trabajo durante el día
↓
6:00 PM
↓
Click "Clock Out" → Agregar notas (opcional)
↓
Ver resumen de horas trabajadas
```

### Proceso de Facturación:

```
Cliente solicita servicio
↓
Realizar el trabajo
↓
"Cobros" → "Nueva Factura"
↓
Completar datos del cliente y monto
↓
Enviar factura (PDF)
↓
Cliente paga
↓
Marcar factura como "Pagado"
↓
Ver estadísticas actualizadas
```

### Proceso de Nómina:

```
Fin de mes
↓
"Pagos" → "Nuevo Pago"
↓
Seleccionar empleado
↓
Ingresar monto y deducciones
↓
Generar recibo PDF
↓
Enviar al empleado
↓
Registrar en sistema
```

### Reunión de Equipo:

```
"MeetYouLive" → "Programar Reunión"
↓
Título: "Reunión Semanal"
↓
Fecha y hora: Lunes 10:00 AM
↓
"Crear Reunión"
↓
Compartir link con equipo
↓
En la fecha indicada: "Unirse"
```

---

## 📱 ATAJOS DE TECLADO

Próximamente...

---

## 🔧 CONFIGURACIÓN AVANZADA

### Conectar con Supabase (Producción)

Si quieres datos persistentes reales:

1. Crea cuenta en https://supabase.com
2. Crea un nuevo proyecto
3. Ve a Project Settings → API
4. Copia tu URL y anon key
5. Edita `.env`:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anon
```

6. Ejecuta el SQL en Supabase (ver SETUP_VERIFICATION.md)
7. Reinicia: `npm run dev`

### Desplegar en Vercel

```bash
# 1. Instala Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Desplegar
vercel --prod
```

Ver detalles en VERCEL_DEPLOYMENT.md

---

## 📚 DOCUMENTACIÓN ADICIONAL

- **README.md** - Información general del proyecto
- **COMO_ABRIR.md** - Cómo abrir la aplicación
- **QUE_FALTA.md** - Requisitos de instalación
- **SETUP_VERIFICATION.md** - Guía de configuración completa
- **MEETYOULIVE_INTEGRATION.md** - Detalles de video conferencias
- **VERCEL_DEPLOYMENT.md** - Cómo desplegar a producción

---

## 💡 CONSEJOS Y MEJORES PRÁCTICAS

### Para Administradores:
1. Crea backups semanalmente
2. Revisa el dashboard diariamente
3. Exporta reportes mensualmente
4. Mantén actualizados los datos de empleados

### Para Empleados:
1. Registra tus marcajes puntualmente
2. Agrega notas descriptivas en Clock Out
3. Revisa tus notificaciones regularmente
4. Usa MeetYouLive para reuniones remotas

### Para Facturación:
1. Crea facturas inmediatamente después del servicio
2. Incluye descripciones claras
3. Establece fechas de vencimiento realistas
4. Haz seguimiento a facturas pendientes

### Para Nómina:
1. Registra pagos el mismo día que se realizan
2. Genera recibos siempre
3. Revisa deducciones cuidadosamente
4. Mantén notas de periodos especiales

---

## 🆘 ¿NECESITAS MÁS AYUDA?

1. **Lee la documentación** en los archivos .md del proyecto
2. **Revisa los ejemplos** en esta guía
3. **Prueba en modo demo** sin riesgo de perder datos
4. **Consulta el README** para información técnica

---

## 🎉 ¡Listo para Empezar!

Ahora ya sabes cómo usar todas las funcionalidades de Naam Hours.

**Resumen rápido para comenzar:**

1. `npm run dev` → Inicia la aplicación
2. Abre http://localhost:3000
3. Click en "🚀 Acceder en Modo Demo"
4. ¡Explora y prueba todas las funcionalidades!

**¿Primera vez?** Empieza con:
- Ver el Dashboard
- Hacer un Clock In/Clock Out de prueba
- Crear una factura de ejemplo
- Explorar los reportes

---

**Última actualización:** 2026-02-25  
**Versión:** 1.0.0  
**Aplicación:** Naam Hours - Sistema Profesional de Gestión
