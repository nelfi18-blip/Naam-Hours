import { Menu, X, Bell, User, LogOut, Sun, Moon, Settings } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useDarkMode } from '../../hooks/useDarkMode'
import { useNotifications } from '../../hooks/useNotifications'

export default function Navbar({ onMenuClick }) {
  const { user, userRole, signOut } = useAuth()
  const { isDark, toggleDarkMode } = useDarkMode()
  const { unreadCount } = useNotifications(user?.id)
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="flex-shrink-0 flex items-center ml-2">
              <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                Naam Hours
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <User size={20} />
                <span className="hidden md:block text-sm font-medium">
                  {user?.email?.split('@')[0]}
                </span>
                <span className="hidden md:block text-xs px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                  {userRole}
                </span>
              </button>

              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-20 border border-gray-200 dark:border-gray-700">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {user?.email}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {userRole}
                      </p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2">
                      <Settings size={16} />
                      <span>Configuración</span>
                    </button>
                    <button
                      onClick={signOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
