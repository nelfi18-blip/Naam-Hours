import { supabase } from './supabaseClient'

export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  PAYMENT_REMINDER: 'payment_reminder',
  ATTENDANCE_ALERT: 'attendance_alert',
  INVOICE_STATUS: 'invoice_status'
}

export const createNotification = async (userId, type, message, metadata = {}) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert([{
        user_id: userId,
        type,
        message,
        metadata,
        read: false,
        created_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error creating notification:', error)
    return { data: null, error }
  }
}

export const getNotifications = async (userId, limit = 50) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: [], error }
  }
}

export const markAsRead = async (notificationId) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)
    
    if (error) throw error
    return { error: null }
  } catch (error) {
    return { error }
  }
}

export const markAllAsRead = async (userId) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false)
    
    if (error) throw error
    return { error: null }
  } catch (error) {
    return { error }
  }
}

export const deleteNotification = async (notificationId) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId)
    
    if (error) throw error
    return { error: null }
  } catch (error) {
    return { error }
  }
}

export const sendPaymentReminder = async (userId, invoiceId, amount, dueDate) => {
  const message = `Recordatorio: Factura #${invoiceId} por $${amount} vence el ${dueDate}`
  return await createNotification(userId, NOTIFICATION_TYPES.PAYMENT_REMINDER, message, {
    invoiceId,
    amount,
    dueDate
  })
}

export const sendAttendanceAlert = async (userId, employeeName, message) => {
  return await createNotification(userId, NOTIFICATION_TYPES.ATTENDANCE_ALERT, 
    `${employeeName}: ${message}`, { employeeName })
}

export const sendInvoiceStatusUpdate = async (userId, invoiceId, status) => {
  const statusMessages = {
    paid: 'ha sido pagada',
    rejected: 'ha sido rechazada',
    pending: 'está pendiente'
  }
  
  const message = `La factura #${invoiceId} ${statusMessages[status] || 'ha sido actualizada'}`
  return await createNotification(userId, NOTIFICATION_TYPES.INVOICE_STATUS, message, {
    invoiceId,
    status
  })
}

// Email notifications (placeholder - integrate with email service)
export const sendEmailNotification = async (email, subject, body) => {
  // TODO: Integrate with email service (SendGrid, AWS SES, etc.)
  console.log('Email notification:', { email, subject, body })
  
  // For now, just log it
  // In production, you would call your email service API here
  return { success: true }
}
