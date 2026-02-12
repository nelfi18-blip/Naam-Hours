import { 
  Home, Clock, DollarSign, Users, FileText, Bell, 
  Database, BarChart3, X 
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { ROLES } from '../../utils/authUtils'

export default function Sidebar({ isOpen, onClose, currentView, onViewChange }) {
  const { userRole } = useAuth()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, roles: [ROLES.ADMIN, ROLES.SUPERVISOR, ROLES.EMPLOYEE] },
    { id: 'marcajes', label: 'Marcajes', icon: Clock, roles: [ROLES.ADMIN, ROLES.SUPERVISOR, ROLES.EMPLOYEE] },
    { id: 'cobros', label: 'Cobros', icon: DollarSign, roles: [ROLES.ADMIN, ROLES.SUPERVISOR] },
    { id: 'pagos', label: 'Pagos', icon: Users, roles: [ROLES.ADMIN, ROLES.SUPERVISOR] },
    { id: 'reportes', label: 'Reportes', icon: BarChart3, roles: [ROLES.ADMIN, ROLES.SUPERVISOR] },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell, roles: [ROLES.ADMIN, ROLES.SUPERVISOR, ROLES.EMPLOYEE] },
    { id: 'empleados', label: 'Empleados', icon: Users, roles: [ROLES.ADMIN, ROLES.SUPERVISOR] },
    { id: 'backup', label: 'Backup', icon: Database, roles: [ROLES.ADMIN] },
  ]

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  )

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Menú
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="px-4 py-6 space-y-2 overflow-y-auto h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)]">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentView === item.id

            return (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id)
                  onClose()
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                  transition-all duration-200 group
                  ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                <Icon 
                  size={20} 
                  className={isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400'}
                />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
