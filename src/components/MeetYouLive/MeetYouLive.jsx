import { useState, useEffect } from 'react'
import { Video, Plus, Calendar, Users, ExternalLink, Trash2, RefreshCw, Settings, AlertCircle, CheckCircle } from 'lucide-react'
import { 
  isMeetYouLiveConfigured, 
  createMeeting, 
  createInstantMeeting, 
  listMeetings, 
  deleteMeeting,
  testConnection 
} from '../../utils/meetyouliveClient'
import { format } from 'date-fns'

export default function MeetYouLive() {
  const [meetings, setMeetings] = useState([])
  const [loading, setLoading] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    scheduledTime: '',
    duration: 60
  })

  useEffect(() => {
    checkConnection()
    if (isMeetYouLiveConfigured()) {
      loadMeetings()
    }
  }, [])

  const checkConnection = async () => {
    const status = await testConnection()
    setConnectionStatus(status)
  }

  const loadMeetings = async () => {
    setLoading(true)
    const result = await listMeetings()
    if (result.success) {
      setMeetings(result.meetings || [])
    }
    setLoading(false)
  }

  const handleCreateMeeting = async (e) => {
    e.preventDefault()
    setLoading(true)

    const result = await createMeeting({
      title: formData.title,
      description: formData.description,
      scheduledTime: formData.scheduledTime ? new Date(formData.scheduledTime) : null,
      duration: parseInt(formData.duration)
    })

    if (result.success) {
      alert(`Reunión creada exitosamente!\nURL: ${result.roomUrl}`)
      setShowCreateModal(false)
      setFormData({ title: '', description: '', scheduledTime: '', duration: 60 })
      await loadMeetings()
    } else {
      alert(`Error: ${result.error}`)
    }
    setLoading(false)
  }

  const handleInstantMeeting = async () => {
    setLoading(true)
    const result = await createInstantMeeting('Reunión Rápida')
    
    if (result.success) {
      window.open(result.roomUrl, '_blank')
      await loadMeetings()
    } else {
      alert(`Error: ${result.error}`)
    }
    setLoading(false)
  }

  const handleDeleteMeeting = async (meetingId) => {
    if (!confirm('¿Estás seguro de eliminar esta reunión?')) return

    setLoading(true)
    const result = await deleteMeeting(meetingId)
    
    if (result.success) {
      alert('Reunión eliminada')
      await loadMeetings()
    } else {
      alert(`Error: ${result.error}`)
    }
    setLoading(false)
  }

  if (!isMeetYouLiveConfigured()) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            MeetYouLive Integration
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Video conferencias integradas
          </p>
        </div>

        <div className="card bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <div className="flex items-start space-x-3">
            <AlertCircle size={24} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Configuración Requerida
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Para usar MeetYouLive, necesitas configurar las credenciales en tu archivo <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">.env</code>
              </p>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <pre className="text-xs text-gray-700 dark:text-gray-300 overflow-x-auto">
{`VITE_MEETYOULIVE_API_URL=https://meetyoulive.app/api
VITE_MEETYOULIVE_API_KEY=tu_api_key
VITE_MEETYOULIVE_WORKSPACE_ID=tu_workspace_id`}
                </pre>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                Obtén tus credenciales en{' '}
                <a 
                  href="https://meetyoulive.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  meetyoulive.app
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            MeetYouLive
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gestiona tus video conferencias
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={checkConnection}
            className="btn btn-secondary"
            disabled={loading}
          >
            <RefreshCw size={18} className="inline mr-2" />
            Verificar Conexión
          </button>
          <button
            onClick={handleInstantMeeting}
            className="btn btn-primary"
            disabled={loading}
          >
            <Video size={18} className="inline mr-2" />
            Reunión Rápida
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary"
            disabled={loading}
          >
            <Plus size={18} className="inline mr-2" />
            Programar Reunión
          </button>
        </div>
      </div>

      {/* Connection Status */}
      {connectionStatus && (
        <div className={`card ${
          connectionStatus.success 
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
        }`}>
          <div className="flex items-center space-x-3">
            {connectionStatus.success ? (
              <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
            ) : (
              <AlertCircle size={20} className="text-red-600 dark:text-red-400" />
            )}
            <div>
              <p className={`font-medium ${
                connectionStatus.success 
                  ? 'text-green-800 dark:text-green-200' 
                  : 'text-red-800 dark:text-red-200'
              }`}>
                {connectionStatus.success 
                  ? '✓ Conectado a MeetYouLive' 
                  : connectionStatus.error || 'Error de conexión'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Meetings List */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Reuniones
          </h3>
          <button 
            onClick={loadMeetings}
            className="btn btn-secondary text-sm"
            disabled={loading}
          >
            <RefreshCw size={16} className="inline mr-2" />
            Actualizar
          </button>
        </div>

        {loading && meetings.length === 0 ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-gray-500 dark:text-gray-400 mt-4">Cargando reuniones...</p>
          </div>
        ) : meetings.length === 0 ? (
          <div className="text-center py-8">
            <Video size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No hay reuniones programadas</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary mt-4"
            >
              Crear primera reunión
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {meetings.map((meeting) => (
              <div
                key={meeting.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-lg">
                      <Video size={24} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {meeting.title}
                      </h4>
                      {meeting.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {meeting.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {meeting.scheduled_time && (
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{format(new Date(meeting.scheduled_time), 'dd/MM/yyyy HH:mm')}</span>
                          </div>
                        )}
                        {meeting.duration_minutes && (
                          <span>Duración: {meeting.duration_minutes} min</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {meeting.room_url && (
                      <a
                        href={meeting.room_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary text-sm"
                      >
                        <ExternalLink size={14} className="inline mr-1" />
                        Unirse
                      </a>
                    )}
                    <button
                      onClick={() => handleDeleteMeeting(meeting.id)}
                      className="btn btn-danger text-sm"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Meeting Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Programar Reunión
            </h2>
            <form onSubmit={handleCreateMeeting} className="space-y-4">
              <div>
                <label className="label">Título de la Reunión</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input"
                  placeholder="Reunión de equipo..."
                  required
                />
              </div>
              <div>
                <label className="label">Descripción (opcional)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input"
                  rows="3"
                  placeholder="Agenda de la reunión..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Fecha y Hora</label>
                  <input
                    type="datetime-local"
                    value={formData.scheduledTime}
                    onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Duración (minutos)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="input"
                    min="15"
                    step="15"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-secondary"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Creando...' : 'Crear Reunión'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
