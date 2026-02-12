import { useState, useEffect } from 'react'
import { Clock, MapPin, Camera, CheckCircle, XCircle, Calendar } from 'lucide-react'
import { supabase } from '../../utils/supabaseClient'
import { useAuth } from '../../hooks/useAuth'
import { format } from 'date-fns'

export default function Marcajes() {
  const { user } = useAuth()
  const [isClockedIn, setIsClockedIn] = useState(false)
  const [currentEntry, setCurrentEntry] = useState(null)
  const [entries, setEntries] = useState([])
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [notes, setNotes] = useState('')

  useEffect(() => {
    loadTimeEntries()
    checkCurrentStatus()
  }, [])

  const loadTimeEntries = async () => {
    // Mock data for demonstration
    setEntries([
      {
        id: 1,
        clock_in: new Date('2024-02-12T08:00:00'),
        clock_out: new Date('2024-02-12T17:00:00'),
        location: 'Oficina Principal',
        notes: 'Día completo de trabajo'
      },
      {
        id: 2,
        clock_in: new Date('2024-02-11T09:00:00'),
        clock_out: new Date('2024-02-11T18:30:00'),
        location: 'Oficina Principal',
        notes: ''
      }
    ])
  }

  const checkCurrentStatus = async () => {
    // Check if user has an active clock-in
    // This would query Supabase in a real app
    setIsClockedIn(false)
  }

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocalización no soportada')
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => reject(error.message)
      )
    })
  }

  const handleClockIn = async () => {
    setLoading(true)
    try {
      const location = await getCurrentLocation()
      setLocation(location)

      // In a real app, save to Supabase
      const newEntry = {
        employee_id: user.id,
        clock_in: new Date(),
        location: `${location.latitude}, ${location.longitude}`,
        notes: notes
      }

      setIsClockedIn(true)
      setCurrentEntry(newEntry)
      setNotes('')
      alert('Clock In registrado exitosamente')
    } catch (error) {
      console.error('Error en Clock In:', error)
      alert('Error al registrar Clock In: ' + error)
    } finally {
      setLoading(false)
    }
  }

  const handleClockOut = async () => {
    setLoading(true)
    try {
      // In a real app, update entry in Supabase
      setIsClockedIn(false)
      setCurrentEntry(null)
      await loadTimeEntries()
      alert('Clock Out registrado exitosamente')
    } catch (error) {
      console.error('Error en Clock Out:', error)
      alert('Error al registrar Clock Out: ' + error)
    } finally {
      setLoading(false)
    }
  }

  const calculateDuration = (clockIn, clockOut) => {
    if (!clockOut) return 'En progreso'
    const diff = clockOut - clockIn
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Marcajes
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Gestiona tu tiempo de entrada y salida
        </p>
      </div>

      {/* Clock In/Out Card */}
      <div className="card">
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-100 dark:bg-primary-900 rounded-full mb-6">
            <Clock size={48} className="text-primary-600 dark:text-primary-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {isClockedIn ? 'Ya estás registrado' : 'Registra tu entrada'}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {isClockedIn 
              ? `Entrada registrada a las ${currentEntry?.clock_in ? format(new Date(currentEntry.clock_in), 'HH:mm') : ''}`
              : 'Presiona el botón para marcar tu entrada'
            }
          </p>

          {!isClockedIn && (
            <div className="mb-6 max-w-md mx-auto">
              <label className="label">Notas (opcional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="input"
                rows="3"
                placeholder="Agrega notas sobre tu jornada..."
              />
            </div>
          )}

          <button
            onClick={isClockedIn ? handleClockOut : handleClockIn}
            disabled={loading}
            className={`btn ${isClockedIn ? 'btn-danger' : 'btn-success'} px-8 py-4 text-lg disabled:opacity-50`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </span>
            ) : (
              <>
                {isClockedIn ? (
                  <>
                    <XCircle className="inline mr-2" size={20} />
                    Clock Out
                  </>
                ) : (
                  <>
                    <CheckCircle className="inline mr-2" size={20} />
                    Clock In
                  </>
                )}
              </>
            )}
          </button>

          {location && (
            <div className="mt-4 flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
              <MapPin size={16} className="mr-2" />
              <span>Ubicación registrada</span>
            </div>
          )}
        </div>
      </div>

      {/* History */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Historial de Marcajes
          </h3>
          <button className="btn btn-secondary text-sm">
            <Calendar size={16} className="inline mr-2" />
            Filtrar por fecha
          </button>
        </div>

        <div className="space-y-4">
          {entries.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No hay marcajes registrados
            </p>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                      <Clock size={20} className="text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {format(entry.clock_in, 'EEEE, dd MMMM yyyy')}
                      </p>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <span>Entrada: {format(entry.clock_in, 'HH:mm')}</span>
                        {entry.clock_out && (
                          <>
                            <span>•</span>
                            <span>Salida: {format(entry.clock_out, 'HH:mm')}</span>
                          </>
                        )}
                      </div>
                      {entry.location && (
                        <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                          <MapPin size={14} className="mr-1" />
                          <span>{entry.location}</span>
                        </div>
                      )}
                      {entry.notes && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          {entry.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="badge badge-success">
                      {calculateDuration(entry.clock_in, entry.clock_out)}
                    </span>
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
