# ⚡ REFERENCIA RÁPIDA - Naam Hours

## 🚀 Comandos Esenciales

```bash
# Iniciar aplicación
npm run dev

# Instalar dependencias
npm install

# Build para producción
npm run build

# Script todo en uno
./quick-start.sh
```

## 🔗 Enlaces Importantes

- **Aplicación:** http://localhost:3000
- **Documentación completa:** [GUIA_USO.md](GUIA_USO.md)
- **Configuración:** [SETUP_VERIFICATION.md](SETUP_VERIFICATION.md)
- **MeetYouLive:** [MEETYOULIVE_INTEGRATION.md](MEETYOULIVE_INTEGRATION.md)

## 🎯 Acciones Rápidas

| Acción | Pasos |
|--------|-------|
| **Iniciar app** | `npm run dev` → http://localhost:3000 → "🚀 Modo Demo" |
| **Marcar entrada** | Marcajes → Clock In |
| **Marcar salida** | Marcajes → Clock Out |
| **Nueva factura** | Cobros → Nueva Factura → Completar datos |
| **Registrar pago** | Pagos → Nuevo Pago → Seleccionar empleado |
| **Reunión rápida** | MeetYouLive → Reunión Rápida |
| **Programar reunión** | MeetYouLive → Programar Reunión → Completar |
| **Crear backup** | Backup → Crear Backup |
| **Cambiar tema** | Click en ☀️/🌙 (arriba derecha) |

## 📱 Navegación Rápida

```
Menú Lateral:
├── 🏠 Dashboard      → Vista general
├── ⏰ Marcajes       → Control de tiempo
├── 📹 MeetYouLive    → Video conferencias
├── 💰 Cobros         → Facturas
├── 💵 Pagos          → Nómina
├── 📊 Reportes       → Análisis
├── 🔔 Notificaciones → Alertas
├── 👥 Empleados      → Gestión de personal
└── 💾 Backup         → Respaldos
```

## 🔑 Roles y Permisos

| Funcionalidad | Admin | Supervisor | Empleado |
|--------------|-------|------------|----------|
| Dashboard | ✅ | ✅ | ✅ |
| Marcajes | ✅ | ✅ | ✅ (solo propios) |
| MeetYouLive | ✅ | ✅ | ✅ |
| Cobros | ✅ | ✅ | ❌ |
| Pagos | ✅ | ✅ | ❌ |
| Reportes | ✅ | ✅ | ❌ |
| Empleados | ✅ | ✅ | ❌ |
| Backup | ✅ | ❌ | ❌ |

## ⚙️ Configuración Rápida

### Modo Demo (Sin Supabase)
```env
VITE_SUPABASE_URL=https://demo.supabase.co
VITE_SUPABASE_ANON_KEY=demo-key
```

### MeetYouLive (Opcional)
```env
VITE_MEETYOULIVE_API_URL=https://meetyoulive.app/api
VITE_MEETYOULIVE_API_KEY=tu_api_key
VITE_MEETYOULIVE_WORKSPACE_ID=tu_workspace_id
```

## 🐛 Problemas Comunes

| Problema | Solución Rápida |
|----------|----------------|
| App no abre | `npm run dev` → http://localhost:3000 |
| Error de módulos | `npm install` |
| Puerto ocupado | `npm run dev -- --port 3001` |
| Cambios no se ven | Recargar página (F5) |
| MeetYouLive no funciona | Verifica `.env` y reinicia servidor |

## 📋 Atajos

- **F5** - Recargar página
- **Ctrl/Cmd + K** - Búsqueda (próximamente)
- **Click ☀️/🌙** - Cambiar tema
- **Click 🔔** - Ver notificaciones

## 📞 ¿Necesitas Ayuda?

1. 📖 **[Guía Completa](GUIA_USO.md)** - Instrucciones detalladas
2. 🔍 **[Verificación de Setup](SETUP_VERIFICATION.md)** - Configuración
3. 📹 **[MeetYouLive](MEETYOULIVE_INTEGRATION.md)** - Video conferencias
4. 📚 **[README](README.md)** - Información general

## 🎯 Primera Vez - Checklist

- [ ] `npm install` - Instalar dependencias
- [ ] `.env` creado (o usar demo)
- [ ] `npm run dev` - Iniciar servidor
- [ ] http://localhost:3000 - Abrir navegador
- [ ] Click "🚀 Modo Demo" - Entrar
- [ ] Explorar Dashboard
- [ ] Probar Clock In/Out
- [ ] Crear factura de prueba
- [ ] Ver reportes

## 💡 Tips Rápidos

1. **Usa modo demo** para probar sin configurar Supabase
2. **Crea backups** regularmente (Admin)
3. **Exporta PDF/CSV** para compartir datos
4. **Usa MeetYouLive** para reuniones remotas
5. **Revisa notificaciones** periódicamente

---

**¿Necesitas más detalles?** → [GUIA_USO.md](GUIA_USO.md)

**Última actualización:** 2026-02-25
