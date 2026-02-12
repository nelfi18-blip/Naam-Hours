import { Bell, Check, Trash2, CheckCheck } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useNotifications } from '../../hooks/useNotifications'
import { format } from 'date-fns'

export default function Notificaciones() {
  const { user } = useAuth()
  const { notifications, unreadCount, markAsRead, markAllAsRead, remove } = useNotifications(user?.id)

  const getNotificationIcon = (type) => {
    return <Bell size={20} />
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Notificaciones
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {unreadCount} notificaciones sin leer
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="btn btn-secondary"
          >
            <CheckCheck size={18} className="inline mr-2" />
            Marcar todas como leídas
          </button>
        )}
      </div>

      <div className="card">
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No tienes notificaciones
            </p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.read
                    ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                    : 'border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/20'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      notification.read ? 'bg-gray-200 dark:bg-gray-700' : 'bg-primary-100 dark:bg-primary-800'
                    }`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {format(new Date(notification.created_at), 'dd/MM/yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                        title="Marcar como leída"
                      >
                        <Check size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => remove(notification.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
