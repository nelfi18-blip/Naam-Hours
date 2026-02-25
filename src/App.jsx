import { useState } from 'react'
import { AuthProvider, useAuth } from './hooks/useAuth'
import LoginForm from './components/Auth/LoginForm'
import MainLayout from './components/Layout/MainLayout'
import Dashboard from './components/Dashboard/Dashboard'
import Marcajes from './components/Marcajes/Marcajes'
import Cobros from './components/Cobros/Cobros'
import Pagos from './components/Pagos/Pagos'
import Reportes from './components/Reportes/Reportes'
import Notificaciones from './components/Notificaciones/Notificaciones'
import Empleados from './components/Empleados/Empleados'
import Backup from './components/Backup/Backup'
import MeetYouLive from './components/MeetYouLive/MeetYouLive'

function AppContent() {
  const { user, loading } = useAuth()
  const [currentView, setCurrentView] = useState('dashboard')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />
      case 'marcajes':
        return <Marcajes />
      case 'cobros':
        return <Cobros />
      case 'pagos':
        return <Pagos />
      case 'reportes':
        return <Reportes />
      case 'notificaciones':
        return <Notificaciones />
      case 'empleados':
        return <Empleados />
      case 'backup':
        return <Backup />
      case 'meetyoulive':
        return <MeetYouLive />
      default:
        return <Dashboard />
    }
  }

  return (
    <MainLayout currentView={currentView} onViewChange={setCurrentView}>
      {renderView()}
    </MainLayout>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
