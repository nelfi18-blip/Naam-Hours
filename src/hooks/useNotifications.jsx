import { useState, useEffect, useCallback } from 'react'
import { getNotifications, markAsRead, markAllAsRead, deleteNotification } from '../utils/notificationUtils'

export const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchNotifications = useCallback(async () => {
    if (!userId) {
      setLoading(false)
      return
    }

    setLoading(true)
    const { data } = await getNotifications(userId)
    
    if (data) {
      setNotifications(data)
      setUnreadCount(data.filter(n => !n.read).length)
    }
    
    setLoading(false)
  }, [userId])

  useEffect(() => {
    fetchNotifications()
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000)
    
    return () => clearInterval(interval)
  }, [fetchNotifications])

  const markNotificationAsRead = async (notificationId) => {
    await markAsRead(notificationId)
    await fetchNotifications()
  }

  const markAllNotificationsAsRead = async () => {
    await markAllAsRead(userId)
    await fetchNotifications()
  }

  const removeNotification = async (notificationId) => {
    await deleteNotification(notificationId)
    await fetchNotifications()
  }

  return {
    notifications,
    unreadCount,
    loading,
    refresh: fetchNotifications,
    markAsRead: markNotificationAsRead,
    markAllAsRead: markAllNotificationsAsRead,
    remove: removeNotification
  }
}
