import { useState, useEffect } from 'react'
import { Plus, Download, DollarSign, User, Calendar } from 'lucide-react'
import { supabase } from '../../utils/supabaseClient'
import { generatePayslipPDF } from '../../utils/pdfUtils'
import { format } from 'date-fns'

export default function Pagos() {
  const [payments, setPayments] = useState([])
  const [employees, setEmployees] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    employee_id: '',
    amount: '',
    payment_date: format(new Date(), 'yyyy-MM-dd'),
    period: '',
    deductions: '0',
    notes: ''
  })

  useEffect(() => {
    loadEmployees()
    loadPayments()
  }, [])

  const loadEmployees = async () => {
    // Mock data
    setEmployees([
      { id: 1, name: 'Juan Pérez', position: 'Desarrollador', salary: 3000 },
      { id: 2, name: 'María García', position: 'Diseñadora', salary: 2800 },
      { id: 3, name: 'Carlos López', position: 'Project Manager', salary: 3500 }
    ])
  }

  const loadPayments = async () => {
    // Mock data
    setPayments([
      {
        id: 1,
        employee_id: 1,
        employee_name: 'Juan Pérez',
        amount: 3000,
        deductions: 300,
        payment_date: '2024-02-01',
        period: 'Febrero 2024',
        notes: 'Pago mensual'
      },
      {
        id: 2,
        employee_id: 2,
        employee_name: 'María García',
        amount: 2800,
        deductions: 280,
        payment_date: '2024-02-01',
        period: 'Febrero 2024',
        notes: 'Pago mensual'
      }
    ])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const employee = employees.find(emp => emp.id === parseInt(formData.employee_id))
    
    const newPayment = {
      ...formData,
      id: payments.length + 1,
      employee_name: employee.name,
      created_at: new Date().toISOString()
    }
    
    setPayments([newPayment, ...payments])
    setShowModal(false)
    setFormData({
      employee_id: '',
      amount: '',
      payment_date: format(new Date(), 'yyyy-MM-dd'),
      period: '',
      deductions: '0',
      notes: ''
    })
    
    alert('Pago registrado exitosamente')
  }

  const handleDownloadPayslip = (payment) => {
    const employee = employees.find(emp => emp.id === payment.employee_id) || {
      name: payment.employee_name,
      position: 'N/A',
      id: payment.employee_id
    }
    
    generatePayslipPDF(employee, payment)
  }

  const totalPaid = payments.reduce((sum, payment) => 
    sum + (parseFloat(payment.amount) - parseFloat(payment.deductions)), 0
  )

  const totalDeductions = payments.reduce((sum, payment) => 
    sum + parseFloat(payment.deductions), 0
  )

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Pagos de Empleados
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gestiona los pagos y nómina
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary"
        >
          <Plus size={18} className="inline mr-2" />
          Registrar Pago
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Total Pagado
          </p>
          <p className="text-2xl font-bold text-green-600">
            ${totalPaid.toLocaleString()}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Deducciones Totales
          </p>
          <p className="text-2xl font-bold text-red-600">
            ${totalDeductions.toLocaleString()}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Empleados Pagados
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {new Set(payments.map(p => p.employee_id)).size}
          </p>
        </div>
      </div>

      {/* Payments List */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Historial de Pagos
        </h3>
        <div className="space-y-4">
          {payments.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No hay pagos registrados
            </p>
          ) : (
            payments.map((payment) => (
              <div key={payment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                      <DollarSign size={24} className="text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                          {payment.employee_name}
                        </h4>
                        <span className="badge badge-success">
                          {payment.period}
                        </span>
                      </div>
                      <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Calendar size={14} />
                          <span>Fecha: {format(new Date(payment.payment_date), 'dd/MM/yyyy')}</span>
                        </div>
                        <div>Salario: ${parseFloat(payment.amount).toLocaleString()}</div>
                        <div>Deducciones: ${parseFloat(payment.deductions).toLocaleString()}</div>
                        {payment.notes && (
                          <div className="mt-2 text-gray-500 dark:text-gray-400">
                            Nota: {payment.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Total Neto
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      ${(parseFloat(payment.amount) - parseFloat(payment.deductions)).toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleDownloadPayslip(payment)}
                      className="btn btn-secondary text-sm mt-3"
                    >
                      <Download size={14} className="inline mr-1" />
                      Descargar Recibo
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Registrar Pago
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Empleado</label>
                <select
                  value={formData.employee_id}
                  onChange={(e) => {
                    const employee = employees.find(emp => emp.id === parseInt(e.target.value))
                    setFormData({ 
                      ...formData, 
                      employee_id: e.target.value,
                      amount: employee?.salary || ''
                    })
                  }}
                  className="input"
                  required
                >
                  <option value="">Seleccionar empleado...</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} - {emp.position} (${emp.salary})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Monto ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="label">Deducciones ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.deductions}
                    onChange={(e) => setFormData({ ...formData, deductions: e.target.value })}
                    className="input"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Fecha de Pago</label>
                  <input
                    type="date"
                    value={formData.payment_date}
                    onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="label">Período</label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className="input"
                    placeholder="Ej: Febrero 2024"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="label">Notas (opcional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="input"
                  rows="3"
                  placeholder="Notas adicionales..."
                />
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Resumen del Pago
                </p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Monto Base:</span>
                    <span className="font-medium">${formData.amount || '0'}</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Deducciones:</span>
                    <span className="font-medium">-${formData.deductions || '0'}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-300 dark:border-gray-600 pt-2 font-bold">
                    <span>Total Neto:</span>
                    <span>${((parseFloat(formData.amount) || 0) - (parseFloat(formData.deductions) || 0)).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Registrar Pago
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
