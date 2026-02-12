# 🔍 Verificación de Configuración - Naam Hours

## Estado Actual del Sistema

### ✅ Elementos Presentes
- [x] Código fuente completo en `/src`
- [x] Archivos de configuración (package.json, vite.config.js, tailwind.config.js)
- [x] Documentación (README.md)
- [x] Ejemplo de variables de entorno (.env.example)

### ❌ Elementos Faltantes para Usar el Programa

#### 1. 📦 Dependencias NO Instaladas
**Estado:** ❌ FALTA  
**Ubicación:** `node_modules/` (no existe)

**Solución:**
```bash
npm install
```

**Tiempo estimado:** 2-3 minutos  
**Espacio requerido:** ~500MB

**Verificación:**
```bash
# Debe mostrar "node_modules exists"
test -d node_modules && echo "✓ node_modules exists" || echo "✗ node_modules NOT found"
```

---

#### 2. 🔐 Variables de Entorno NO Configuradas
**Estado:** ❌ FALTA  
**Ubicación:** `.env` (no existe)

**Solución:**
```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar con tus credenciales
nano .env  # o usa tu editor preferido
```

**Configuración Mínima (Modo Demo - NO requiere Supabase):**
```env
VITE_SUPABASE_URL=https://demo.supabase.co
VITE_SUPABASE_ANON_KEY=demo-key
VITE_APP_NAME=Naam Hours
VITE_APP_ENV=development
```

**Configuración Completa (Modo Producción - requiere Supabase):**
```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anon_key_aqui
VITE_APP_NAME=Naam Hours
VITE_APP_ENV=production
```

**Verificación:**
```bash
# Debe mostrar ".env exists"
test -f .env && echo "✓ .env exists" || echo "✗ .env NOT found"
```

---

#### 3. ⚙️ Base de Datos Supabase (Opcional - solo para modo producción)
**Estado:** ⚠️ OPCIONAL (el programa funciona en modo demo sin esto)

**Para modo demo:** NO ES NECESARIO  
**Para modo producción:** Necesitas configurar las tablas en Supabase

**Solución (si quieres usar Supabase):**

1. Crear cuenta en [supabase.com](https://supabase.com)
2. Crear nuevo proyecto
3. Ejecutar el siguiente SQL en el SQL Editor de Supabase:

```sql
-- Tabla de usuarios
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'employee',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de empleados
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  position TEXT,
  salary NUMERIC,
  phone TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de marcajes
CREATE TABLE time_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id),
  clock_in TIMESTAMP NOT NULL,
  clock_out TIMESTAMP,
  location TEXT,
  photo_url TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de facturas
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id),
  client_name TEXT NOT NULL,
  client_email TEXT,
  amount NUMERIC NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  due_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de pagos
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id),
  amount NUMERIC NOT NULL,
  payment_date DATE NOT NULL,
  period TEXT,
  deductions NUMERIC DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de notificaciones
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  metadata JSONB,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de auditoría
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🚀 Guía de Inicio Rápido

### Opción 1: Modo Demo (Recomendado para Pruebas)

**No requiere configuración de Supabase. Ideal para probar todas las funcionalidades.**

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo .env básico (modo demo)
echo 'VITE_SUPABASE_URL=https://demo.supabase.co' > .env
echo 'VITE_SUPABASE_ANON_KEY=demo-key' >> .env
echo 'VITE_APP_NAME=Naam Hours' >> .env
echo 'VITE_APP_ENV=development' >> .env

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir navegador en http://localhost:3000
# 5. Click en "🚀 Acceder en Modo Demo"
```

### Opción 2: Modo Producción (Requiere Supabase)

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase
nano .env

# 3. Crear tablas en Supabase (ver SQL arriba)

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Abrir navegador en http://localhost:3000
# 6. Registrarte o iniciar sesión
```

---

## ✅ Lista de Verificación Completa

### Pre-requisitos del Sistema
- [x] Node.js 18+ instalado (Versión detectada: v24.13.0 ✓)
- [x] npm instalado (Versión detectada: 11.6.2 ✓)
- [ ] Git instalado (para clonar el repositorio)

### Configuración del Proyecto
- [ ] Dependencias instaladas (`npm install`)
- [ ] Archivo `.env` creado y configurado
- [ ] Modo seleccionado (Demo o Producción)

### Verificación del Servidor
- [ ] Servidor inicia sin errores (`npm run dev`)
- [ ] Página carga en http://localhost:3000
- [ ] No hay errores en la consola del navegador

### Verificación de Funcionalidades (Modo Demo)
- [ ] Pantalla de login carga correctamente
- [ ] Botón "Acceder en Modo Demo" funciona
- [ ] Dashboard muestra KPIs y gráficos
- [ ] Navegación entre módulos funciona
- [ ] Tema oscuro/claro se puede alternar

---

## 🔧 Comandos Útiles

```bash
# Verificar Node.js y npm
node --version  # Debe ser 18+
npm --version

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview

# Verificar código (linter)
npm run lint

# Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

## 🐛 Solución de Problemas Comunes

### Problema: "Cannot find module"
**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problema: "Port 3000 already in use"
**Solución:**
```bash
# Usar otro puerto
npm run dev -- --port 3001
```

### Problema: Variables de entorno no se cargan
**Solución:**
1. Verificar que el archivo se llame `.env` (no `.env.txt`)
2. Reiniciar el servidor de desarrollo
3. Verificar que las variables empiecen con `VITE_`

### Problema: Errores de Supabase en modo demo
**Solución:**
El modo demo no requiere Supabase real. Los errores de conexión son normales y no afectan la funcionalidad.

### Problema: Páginas en blanco o errores de compilación
**Solución:**
```bash
# Limpiar caché de Vite
rm -rf node_modules/.vite
npm run dev
```

---

## 📊 Resumen Ejecutivo

### ¿Qué falta para usar el programa?

1. **Instalar dependencias:** `npm install` (2-3 minutos)
2. **Configurar .env:** Copiar `.env.example` a `.env` (30 segundos)
3. **Iniciar servidor:** `npm run dev` (10 segundos)
4. **Usar modo demo:** Click en botón "Acceder en Modo Demo" (instantáneo)

**Tiempo total estimado:** ~5 minutos

### Recursos Necesarios
- **Espacio en disco:** ~500MB (node_modules)
- **RAM:** ~200MB (servidor de desarrollo)
- **Internet:** Necesario para instalar dependencias

### Resultado Final
Una vez completados estos pasos, tendrás:
- ✅ Aplicación ejecutándose en http://localhost:3000
- ✅ Acceso completo a todas las funcionalidades en modo demo
- ✅ Dashboard con KPIs y gráficos interactivos
- ✅ Gestión de marcajes, cobros, pagos y más
- ✅ Tema oscuro/claro funcional
- ✅ Sin necesidad de base de datos externa

---

## 📞 Soporte

Si encuentras problemas:
1. Revisa esta guía completa
2. Consulta el README.md
3. Verifica los logs en la consola
4. Abre un issue en GitHub con detalles del error

---

**Última actualización:** 2026-02-12  
**Versión del documento:** 1.0
