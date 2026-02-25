import { Users } from 'lucide-react'

export default function Empleados() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Empleados
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Gestiona el equipo de trabajo
        </p>
      </div>

      <div className="card text-center py-16">
        <Users size={64} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Gestión de Empleados
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Aquí podrás administrar la información de todos los empleados
        </p>
      </div>
    </div>
  )
}
