import { useState } from 'react'
import { Download, Upload, Database, Calendar, Trash2 } from 'lucide-react'
import { createBackup, listBackups, exportBackup, deleteBackup, importBackup } from '../../utils/backupUtils'
import { format } from 'date-fns'

export default function Backup() {
  const [backups, setBackups] = useState([])
  const [loading, setLoading] = useState(false)

  const loadBackups = () => {
    const { backups: backupList } = listBackups()
    setBackups(backupList)
  }

  useState(() => {
    loadBackups()
  }, [])

  const handleCreateBackup = async () => {
    setLoading(true)
    const { success, backupKey } = await createBackup()
    if (success) {
      alert('Backup creado exitosamente')
      loadBackups()
    } else {
      alert('Error al crear backup')
    }
    setLoading(false)
  }

  const handleExport = (backupKey) => {
    const { success } = exportBackup(backupKey)
    if (!success) {
      alert('Error al exportar backup')
    }
  }

  const handleDelete = (backupKey) => {
    if (confirm('¿Estás seguro de que quieres eliminar este backup?')) {
      const { success } = deleteBackup(backupKey)
      if (success) {
        loadBackups()
      } else {
        alert('Error al eliminar backup')
      }
    }
  }

  const handleImport = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setLoading(true)
    const { success, backupKey } = await importBackup(file)
    if (success) {
      alert('Backup importado exitosamente')
      loadBackups()
    } else {
      alert('Error al importar backup')
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Backup y Respaldo
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gestiona los respaldos de tu información
          </p>
        </div>
        <div className="flex space-x-3">
          <label className="btn btn-secondary cursor-pointer">
            <Upload size={18} className="inline mr-2" />
            Importar
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
          <button
            onClick={handleCreateBackup}
            disabled={loading}
            className="btn btn-primary"
          >
            <Database size={18} className="inline mr-2" />
            Crear Backup
          </button>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Backups Disponibles
        </h3>
        <div className="space-y-3">
          {backups.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No hay backups disponibles
            </p>
          ) : (
            backups.map((backup) => (
              <div
                key={backup.key}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                      <Database size={24} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {backup.key}
                      </p>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{format(new Date(backup.timestamp), 'dd/MM/yyyy HH:mm')}</span>
                        </div>
                        <span>•</span>
                        <span>{(backup.size / 1024).toFixed(2)} KB</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleExport(backup.key)}
                      className="btn btn-secondary text-sm"
                    >
                      <Download size={14} className="inline mr-1" />
                      Exportar
                    </button>
                    <button
                      onClick={() => handleDelete(backup.key)}
                      className="btn btn-danger text-sm"
                    >
                      <Trash2 size={14} className="inline mr-1" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <Database size={20} className="text-blue-600 dark:text-blue-400 mt-1" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
              Información sobre Backups
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Los backups se guardan localmente en tu navegador</li>
              <li>• Se mantienen automáticamente los últimos 10 backups</li>
              <li>• Puedes exportar e importar backups en formato JSON</li>
              <li>• Los backups incluyen toda la información de la aplicación</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
