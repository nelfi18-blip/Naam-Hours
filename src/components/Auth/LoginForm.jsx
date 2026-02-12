import { useState } from 'react'
import { signIn, signUp } from '../../utils/authUtils'
import { LogIn, UserPlus, Mail, Lock, AlertCircle } from 'lucide-react'

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (isLogin) {
        const { data, error } = await signIn(email, password)
        if (error) throw error
      } else {
        const { data, error } = await signUp(email, password, {
          full_name: email.split('@')[0]
        })
        if (error) throw error
        
        setError(null)
        alert('Cuenta creada exitosamente. Por favor verifica tu email.')
        setIsLogin(true)
      }
    } catch (err) {
      setError(err.message || 'Error de autenticación')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Naam Hours
          </h1>
          <p className="text-primary-100 dark:text-gray-400">
            Sistema Profesional de Gestión
          </p>
        </div>

        <div className="card animate-slide-up">
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              onClick={() => {
                setIsLogin(true)
                setError(null)
              }}
              className={`flex-1 py-3 font-medium transition-all ${
                isLogin
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <LogIn className="inline mr-2" size={18} />
              Iniciar Sesión
            </button>
            <button
              onClick={() => {
                setIsLogin(false)
                setError(null)
              }}
              className={`flex-1 py-3 font-medium transition-all ${
                !isLogin
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <UserPlus className="inline mr-2" size={18} />
              Registrarse
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-2">
              <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" size={20} />
              <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <Mail className="inline mr-2" size={16} />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>

            <div>
              <label className="label">
                <Lock className="inline mr-2" size={16} />
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 dark:border-gray-600"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Recordarme</span>
                </label>
                <button
                  type="button"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </span>
              ) : (
                isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              {' '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError(null)
                }}
                className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
              >
                {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
              </button>
            </p>
          </div>
        </div>

        <div className="text-center text-sm text-primary-100 dark:text-gray-500">
          <p>© 2024 Naam Hours. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}
