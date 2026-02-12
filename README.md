# Naam Hours - Sistema Profesional de Gestión

<div align="center">
  <h3>Sistema completo de gestión de horas, cobros y nómina</h3>
  <p>Aplicación profesional construida con React, Supabase y Tailwind CSS</p>
</div>

## 🚀 Características

### ✅ Características Implementadas

1. **Dashboard Principal**
   - KPIs en tiempo real
   - Gráficos interactivos (Chart.js)
   - Estadísticas de empleados e ingresos
   - Actividad reciente

2. **Autenticación y Seguridad**
   - Sistema de login/registro con Supabase Auth
   - Roles y permisos (Admin, Supervisor, Empleado)
   - Control de acceso basado en roles
   - Sesiones persistentes

3. **Gestión de Marcajes**
   - Clock In/Out con timestamp
   - Captura de ubicación GPS
   - Historial completo de marcajes
   - Notas y observaciones

4. **Módulo de Cobros**
   - Crear y gestionar facturas
   - Estados: Pendiente, Pagado, Rechazado
   - Exportar PDF con jsPDF
   - Exportar CSV
   - Estadísticas de ingresos

5. **Módulo de Pagos de Empleados**
   - Registro de pagos
   - Cálculo de deducciones
   - Generación de recibos PDF
   - Historial de nóminas

6. **Sistema de Notificaciones**
   - Notificaciones en la aplicación
   - Contador de notificaciones sin leer
   - Marcar como leídas
   - Sistema de tipos (info, success, warning, error)

7. **Tema Oscuro/Claro**
   - Toggle de tema
   - Sincronización con preferencias del sistema
   - Persistencia en localStorage
   - Transiciones suaves

8. **Sistema de Backup**
   - Backup automático de datos
   - Exportar/importar backups
   - Versioning automático
   - Límite de 10 backups

9. **Reportes**
   - Placeholder para módulo de reportes
   - Exportación de datos a PDF/CSV

10. **Gestión de Empleados**
    - Placeholder para gestión de empleados

## 🛠️ Tecnologías

- **React 18+** - Framework UI
- **Vite** - Build tool
- **Tailwind CSS** - Estilos
- **Supabase** - Backend y autenticación
- **jsPDF & jspdf-autotable** - Generación de PDFs
- **Chart.js & react-chartjs-2** - Gráficos
- **date-fns** - Manejo de fechas
- **lucide-react** - Iconos

## 🌐 Link de Acceso Rápido

**URL de la aplicación:** 👉 **http://localhost:3000**

Para iniciar:
```bash
npm run dev
```

Luego abre tu navegador en **http://localhost:3000** y haz clic en "🚀 Acceder en Modo Demo"

📖 **[Ver guía completa de acceso →](COMO_ABRIR.md)**

---

## 📦 Instalación

### Prerequisitos

- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase (gratuita)

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/nelfi18-blip/Naam-Hours.git
   cd Naam-Hours
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Edita `.env` y añade tus credenciales de Supabase:
   ```
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_ANON_KEY=tu_clave_anon_de_supabase
   ```

4. **Configurar Base de Datos Supabase**

   Crea las siguientes tablas en tu proyecto de Supabase:

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

5. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:3000`

## 🚢 Despliegue en Vercel

1. **Push a GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Conectar con Vercel**
   - Visita [vercel.com](https://vercel.com)
   - Importa tu repositorio
   - Configura las variables de entorno
   - Despliega

3. **Variables de entorno en Vercel**
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## 📖 Uso

### Roles y Permisos

- **Admin**: Acceso total a todas las funcionalidades
- **Supervisor**: Gestión de equipos, marcajes, cobros y pagos
- **Empleado**: Solo visualización de sus propios datos y marcajes

### Funcionalidades Principales

#### Dashboard
- Vista general de KPIs
- Gráficos de horas trabajadas e ingresos
- Actividad reciente

#### Marcajes
- Clock In/Out con ubicación
- Historial de entradas y salidas
- Notas por marcaje

#### Cobros
- Crear facturas
- Gestionar estados
- Exportar PDF/CSV
- Estadísticas de ingresos

#### Pagos
- Registrar pagos de empleados
- Calcular deducciones
- Generar recibos PDF
- Historial de nóminas

#### Notificaciones
- Ver notificaciones en tiempo real
- Marcar como leídas
- Eliminar notificaciones

#### Backup
- Crear backups automáticos
- Exportar/importar datos
- Gestionar versiones

## 🎨 Tema Oscuro

El tema oscuro se activa automáticamente según las preferencias del sistema o se puede alternar manualmente usando el botón en la barra de navegación.

## 🔒 Seguridad

- Autenticación con Supabase Auth
- Control de acceso basado en roles
- Validación de datos en el cliente
- Protección de rutas por rol
- Logs de auditoría

## 📝 Estructura del Proyecto

```
Naam-Hours/
├── src/
│   ├── components/
│   │   ├── Auth/              # Componentes de autenticación
│   │   ├── Dashboard/         # Dashboard principal
│   │   ├── Layout/            # Layout y navegación
│   │   ├── Marcajes/          # Gestión de marcajes
│   │   ├── Cobros/            # Módulo de cobros
│   │   ├── Pagos/             # Módulo de pagos
│   │   ├── Reportes/          # Reportes
│   │   ├── Notificaciones/    # Sistema de notificaciones
│   │   ├── Empleados/         # Gestión de empleados
│   │   └── Backup/            # Sistema de backup
│   ├── hooks/
│   │   ├── useAuth.js         # Hook de autenticación
│   │   ├── useDarkMode.js     # Hook de tema
│   │   └── useNotifications.js # Hook de notificaciones
│   ├── utils/
│   │   ├── supabaseClient.js  # Cliente de Supabase
│   │   ├── authUtils.js       # Utilidades de auth
│   │   ├── pdfUtils.js        # Generación de PDFs
│   │   ├── notificationUtils.js # Utilidades de notificaciones
│   │   └── backupUtils.js     # Sistema de backup
│   ├── App.jsx                # Componente principal
│   ├── main.jsx               # Punto de entrada
│   └── index.css              # Estilos globales
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👥 Autor

Creado por el equipo de Naam Hours

## 📞 Soporte

Para soporte, contacta a través de GitHub Issues o email.

---

<div align="center">
  <p>⭐ Si te gusta este proyecto, dale una estrella en GitHub ⭐</p>
</div>
