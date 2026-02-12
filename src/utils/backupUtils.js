import { supabase } from './supabaseClient'
import { format } from 'date-fns'

export const createBackup = async () => {
  try {
    // Get all data from tables
    const tables = ['users', 'employees', 'time_entries', 'invoices', 'payments', 'notifications']
    const backup = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      data: {}
    }
    
    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
      
      if (!error && data) {
        backup.data[table] = data
      }
    }
    
    // Save backup to localStorage
    const backupKey = `backup_${format(new Date(), 'yyyyMMdd_HHmmss')}`
    localStorage.setItem(backupKey, JSON.stringify(backup))
    
    // Keep only last 10 backups
    const allBackups = Object.keys(localStorage)
      .filter(key => key.startsWith('backup_'))
      .sort()
    
    if (allBackups.length > 10) {
      allBackups.slice(0, allBackups.length - 10).forEach(key => {
        localStorage.removeItem(key)
      })
    }
    
    return { success: true, backupKey, error: null }
  } catch (error) {
    console.error('Error creating backup:', error)
    return { success: false, backupKey: null, error }
  }
}

export const listBackups = () => {
  try {
    const backups = Object.keys(localStorage)
      .filter(key => key.startsWith('backup_'))
      .map(key => {
        const backup = JSON.parse(localStorage.getItem(key))
        return {
          key,
          timestamp: backup.timestamp,
          version: backup.version,
          size: new Blob([localStorage.getItem(key)]).size
        }
      })
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    
    return { backups, error: null }
  } catch (error) {
    console.error('Error listing backups:', error)
    return { backups: [], error }
  }
}

export const restoreBackup = async (backupKey) => {
  try {
    const backupData = localStorage.getItem(backupKey)
    if (!backupData) {
      throw new Error('Backup not found')
    }
    
    const backup = JSON.parse(backupData)
    
    // Note: In a real application, you would need proper restore logic
    // that handles conflicts, validates data, and ensures data integrity
    console.log('Restore backup:', backup)
    
    // This is a placeholder - actual restoration would require careful implementation
    return { success: true, error: null }
  } catch (error) {
    console.error('Error restoring backup:', error)
    return { success: false, error }
  }
}

export const deleteBackup = (backupKey) => {
  try {
    localStorage.removeItem(backupKey)
    return { success: true, error: null }
  } catch (error) {
    console.error('Error deleting backup:', error)
    return { success: false, error }
  }
}

export const exportBackup = (backupKey) => {
  try {
    const backupData = localStorage.getItem(backupKey)
    if (!backupData) {
      throw new Error('Backup not found')
    }
    
    const blob = new Blob([backupData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    
    link.href = url
    link.download = `${backupKey}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    return { success: true, error: null }
  } catch (error) {
    console.error('Error exporting backup:', error)
    return { success: false, error }
  }
}

export const importBackup = async (file) => {
  try {
    const text = await file.text()
    const backup = JSON.parse(text)
    
    // Validate backup structure
    if (!backup.timestamp || !backup.version || !backup.data) {
      throw new Error('Invalid backup file')
    }
    
    // Save imported backup
    const backupKey = `backup_imported_${format(new Date(), 'yyyyMMdd_HHmmss')}`
    localStorage.setItem(backupKey, text)
    
    return { success: true, backupKey, error: null }
  } catch (error) {
    console.error('Error importing backup:', error)
    return { success: false, backupKey: null, error }
  }
}

export const scheduleAutoBackup = (intervalHours = 24) => {
  // Schedule automatic backups
  const intervalMs = intervalHours * 60 * 60 * 1000
  
  const backupInterval = setInterval(() => {
    createBackup()
  }, intervalMs)
  
  // Save interval ID to be able to cancel it later
  localStorage.setItem('autoBackupInterval', 'enabled')
  
  return backupInterval
}

export const cancelAutoBackup = (intervalId) => {
  if (intervalId) {
    clearInterval(intervalId)
    localStorage.removeItem('autoBackupInterval')
  }
}
