import { Users, Clock, DollarSign, TrendingUp, Calendar, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'
import { useAuth } from '../../hooks/useAuth'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function Dashboard() {
  const { user, userRole } = useAuth()
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeToday: 0,
    totalInvoices: 0,
    totalRevenue: 0,
    pendingPayments: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // In a real app, these would be actual Supabase queries
      // For now, using mock data
      setStats({
        totalEmployees: 25,
        activeToday: 18,
        totalInvoices: 47,
        totalRevenue: 125400,
        pendingPayments: 8
      })
      setLoading(false)
    } catch (error) {
      console.error('Error loading dashboard:', error)
      setLoading(false)
    }
  }

  const kpis = [
    {
      title: 'Empleados Activos',
      value: `${stats.activeToday}/${stats.totalEmployees}`,
      icon: Users,
      color: 'bg-blue-500',
      trend: '+5%'
    },
    {
      title: 'Horas Trabajadas',
      value: '1,248h',
      icon: Clock,
      color: 'bg-green-500',
      trend: '+12%'
    },
    {
      title: 'Ingresos Totales',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-yellow-500',
      trend: '+8%'
    },
    {
      title: 'Pagos Pendientes',
      value: stats.pendingPayments,
      icon: AlertCircle,
      color: 'bg-red-500',
      trend: '-3%'
    }
  ]

  const lineChartData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Horas Trabajadas',
        data: [8.5, 9, 8, 9.5, 8, 4, 0],
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        tension: 0.4
      }
    ]
  }

  const barChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Ingresos',
        data: [20000, 25000, 22000, 28000, 24000, 30000],
        backgroundColor: 'rgba(14, 165, 233, 0.8)',
      }
    ]
  }

  const doughnutData = {
    labels: ['Completadas', 'En Proceso', 'Pendientes'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Bienvenido, {user?.email?.split('@')[0]}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Calendar size={16} />
          <span>{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <div key={index} className="card hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {kpi.value}
                  </p>
                  <div className="flex items-center space-x-1">
                    <TrendingUp size={14} className="text-green-600" />
                    <span className="text-sm text-green-600 font-medium">
                      {kpi.trend}
                    </span>
                  </div>
                </div>
                <div className={`${kpi.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Horas Trabajadas - Última Semana
          </h3>
          <div className="h-64">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Ingresos Mensuales
          </h3>
          <div className="h-64">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Estado de Tareas
          </h3>
          <div className="h-48">
            <Doughnut data={doughnutData} options={chartOptions} />
          </div>
        </div>

        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Actividad Reciente
          </h3>
          <div className="space-y-3">
            {[
              { user: 'Juan Pérez', action: 'Clock In', time: 'Hace 2 horas', type: 'success' },
              { user: 'María García', action: 'Factura pagada', time: 'Hace 4 horas', type: 'info' },
              { user: 'Carlos López', action: 'Clock Out', time: 'Hace 5 horas', type: 'success' },
              { user: 'Ana Martínez', action: 'Solicitud de pago', time: 'Hace 1 día', type: 'warning' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {activity.user}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {activity.action}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
