import { useState, useEffect } from 'react'
import { Plus, FileText, Download, DollarSign, Filter } from 'lucide-react'
import { supabase } from '../../utils/supabaseClient'
import { generateInvoicePDF, exportToCSV } from '../../utils/pdfUtils'
import { format } from 'date-fns'

export default function Cobros() {
  const [invoices, setInvoices] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    amount: '',
    description: '',
    due_date: '',
    status: 'pending'
  })

  useEffect(() => {
    loadInvoices()
  }, [])

  const loadInvoices = async () => {
    // Mock data
    setInvoices([
      {
        id: 1,
        client_name: 'Empresa ABC',
        client_email: 'contacto@abc.com',
        amount: 5000,
        description: 'Servicios de consultoría',
        due_date: '2024-03-15',
        status: 'pending',
        created_at: '2024-02-01'
      },
      {
        id: 2,
        client_name: 'Corporación XYZ',
        client_email: 'info@xyz.com',
        amount: 8500,
        description: 'Desarrollo de software',
        due_date: '2024-02-28',
        status: 'paid',
        created_at: '2024-01-15'
      }
    ])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // In real app, save to Supabase
    const newInvoice = {
      ...formData,
      id: invoices.length + 1,
      created_at: new Date().toISOString()
    }
    
    setInvoices([newInvoice, ...invoices])
    setShowModal(false)
    setFormData({
      client_name: '',
      client_email: '',
      amount: '',
      description: '',
      due_date: '',
      status: 'pending'
    })
  }

  const handleDownloadPDF = (invoice) => {
    generateInvoicePDF(invoice, {
      name: invoice.client_name,
      email: invoice.client_email
    })
  }

  const handleExportCSV = () => {
    exportToCSV(invoices, 'facturas')
  }

  const updateStatus = async (invoiceId, newStatus) => {
    setInvoices(invoices.map(inv => 
      inv.id === invoiceId ? { ...inv, status: newStatus } : inv
    ))
  }

  const filteredInvoices = filter === 'all' 
    ? invoices 
    : invoices.filter(inv => inv.status === filter)

  const statusColors = {
    pending: 'badge-warning',
    paid: 'badge-success',
    rejected: 'badge-danger'
  }

  const statusLabels = {
    pending: 'Pendiente',
    paid: 'Pagado',
    rejected: 'Rechazado'
  }

  const totalRevenue = invoices.reduce((sum, inv) => 
    inv.status === 'paid' ? sum + parseFloat(inv.amount) : sum, 0
  )

  const pendingRevenue = invoices.reduce((sum, inv) => 
    inv.status === 'pending' ? sum + parseFloat(inv.amount) : sum, 0
  )

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Cobros y Facturas
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gestiona tus facturas y pagos
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleExportCSV}
            className="btn btn-secondary"
          >
            <Download size={18} className="inline mr-2" />
            Exportar CSV
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary"
          >
            <Plus size={18} className="inline mr-2" />
            Nueva Factura
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Total Facturado
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            ${(totalRevenue + pendingRevenue).toLocaleString()}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Cobrado
          </p>
          <p className="text-2xl font-bold text-green-600">
            ${totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Pendiente
          </p>
          <p className="text-2xl font-bold text-yellow-600">
            ${pendingRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <Filter size={20} className="text-gray-500" />
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setFilter('paid')}
            className={`px-4 py-2 rounded-lg ${filter === 'paid' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
          >
            Pagadas
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded-lg ${filter === 'rejected' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
          >
            Rechazadas
          </button>
        </div>
      </div>

      {/* Invoices List */}
      <div className="card">
        <div className="space-y-4">
          {filteredInvoices.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No hay facturas para mostrar
            </p>
          ) : (
            filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-lg">
                      <FileText size={24} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                          Factura #{invoice.id}
                        </h4>
                        <span className={`badge ${statusColors[invoice.status]}`}>
                          {statusLabels[invoice.status]}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {invoice.client_name} • {invoice.client_email}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {invoice.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Vencimiento: {format(new Date(invoice.due_date), 'dd/MM/yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      ${parseFloat(invoice.amount).toLocaleString()}
                    </p>
                    <div className="mt-4 space-x-2">
                      <button
                        onClick={() => handleDownloadPDF(invoice)}
                        className="btn btn-secondary text-sm"
                      >
                        <Download size={14} className="inline mr-1" />
                        PDF
                      </button>
                      {invoice.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateStatus(invoice.id, 'paid')}
                            className="btn btn-success text-sm"
                          >
                            Marcar Pagado
                          </button>
                          <button
                            onClick={() => updateStatus(invoice.id, 'rejected')}
                            className="btn btn-danger text-sm"
                          >
                            Rechazar
                          </button>
                        </>
                      )}
                    </div>
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
              Nueva Factura
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Nombre del Cliente</label>
                  <input
                    type="text"
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="label">Email del Cliente</label>
                  <input
                    type="email"
                    value={formData.client_email}
                    onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                    className="input"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="label">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input"
                  rows="3"
                  required
                />
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
                  <label className="label">Fecha de Vencimiento</label>
                  <input
                    type="date"
                    value={formData.due_date}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                    className="input"
                    required
                  />
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
                  Crear Factura
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
