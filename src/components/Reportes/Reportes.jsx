import { BarChart3 } from 'lucide-react'

export default function Reportes() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Reportes
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Genera reportes y analiza la productividad
        </p>
      </div>

      <div className="card text-center py-16">
        <BarChart3 size={64} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Módulo de Reportes
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Aquí podrás generar reportes detallados de horas, ingresos y productividad
        </p>
      </div>
    </div>
  )
}
