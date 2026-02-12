import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { format } from 'date-fns'

export const generatePayslipPDF = (employee, payment) => {
  const doc = new jsPDF()
  
  // Header
  doc.setFontSize(20)
  doc.setTextColor(14, 165, 233) // Primary color
  doc.text('RECIBO DE NÓMINA', 105, 20, { align: 'center' })
  
  // Company info
  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  doc.text('Naam Hours', 20, 35)
  doc.text('Sistema de Gestión Profesional', 20, 40)
  
  // Employee info
  doc.setFontSize(12)
  doc.text('Información del Empleado', 20, 55)
  doc.setFontSize(10)
  doc.text(`Nombre: ${employee.name}`, 20, 65)
  doc.text(`Posición: ${employee.position || 'N/A'}`, 20, 72)
  doc.text(`ID: ${employee.id}`, 20, 79)
  
  // Payment info
  doc.setFontSize(12)
  doc.text('Detalles del Pago', 120, 55)
  doc.setFontSize(10)
  doc.text(`Fecha: ${format(new Date(payment.payment_date), 'dd/MM/yyyy')}`, 120, 65)
  doc.text(`Período: ${payment.period || 'N/A'}`, 120, 72)
  
  // Payment table
  const tableData = [
    ['Concepto', 'Monto'],
    ['Salario Base', `$${payment.amount.toFixed(2)}`],
    ['Deducciones', `-$${(payment.deductions || 0).toFixed(2)}`],
    ['Total Neto', `$${(payment.amount - (payment.deductions || 0)).toFixed(2)}`],
  ]
  
  doc.autoTable({
    startY: 95,
    head: [tableData[0]],
    body: tableData.slice(1),
    theme: 'striped',
    headStyles: { fillColor: [14, 165, 233] },
  })
  
  // Notes
  if (payment.notes) {
    doc.setFontSize(10)
    doc.text('Notas:', 20, doc.lastAutoTable.finalY + 15)
    doc.setFontSize(9)
    doc.text(payment.notes, 20, doc.lastAutoTable.finalY + 22, { maxWidth: 170 })
  }
  
  // Footer
  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 150
  doc.setFontSize(8)
  doc.setTextColor(128, 128, 128)
  doc.text('Este documento es generado automáticamente por Naam Hours', 105, finalY + 30, { align: 'center' })
  
  // Save
  doc.save(`recibo_${employee.name}_${format(new Date(), 'yyyyMMdd')}.pdf`)
}

export const generateInvoicePDF = (invoice, client) => {
  const doc = new jsPDF()
  
  // Header
  doc.setFontSize(22)
  doc.setTextColor(14, 165, 233)
  doc.text('FACTURA', 105, 20, { align: 'center' })
  
  // Invoice number
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.text(`Factura #${invoice.id}`, 20, 35)
  doc.text(`Fecha: ${format(new Date(invoice.created_at), 'dd/MM/yyyy')}`, 20, 42)
  doc.text(`Vencimiento: ${format(new Date(invoice.due_date), 'dd/MM/yyyy')}`, 20, 49)
  
  // Status badge
  const statusColors = {
    pending: [251, 191, 36],
    paid: [34, 197, 94],
    rejected: [239, 68, 68]
  }
  const statusLabels = {
    pending: 'PENDIENTE',
    paid: 'PAGADO',
    rejected: 'RECHAZADO'
  }
  
  doc.setFillColor(...(statusColors[invoice.status] || [128, 128, 128]))
  doc.roundedRect(150, 32, 40, 10, 2, 2, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)
  doc.text(statusLabels[invoice.status] || 'N/A', 170, 38.5, { align: 'center' })
  
  // Client info
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(12)
  doc.text('Cliente:', 20, 65)
  doc.setFontSize(10)
  doc.text(client.name || 'N/A', 20, 72)
  doc.text(client.email || '', 20, 79)
  
  // Items table
  const tableData = [
    ['Descripción', 'Cantidad', 'Precio Unit.', 'Total'],
    [invoice.description || 'Servicios profesionales', '1', `$${invoice.amount.toFixed(2)}`, `$${invoice.amount.toFixed(2)}`],
  ]
  
  doc.autoTable({
    startY: 95,
    head: [tableData[0]],
    body: tableData.slice(1),
    theme: 'grid',
    headStyles: { fillColor: [14, 165, 233] },
    footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0] },
    foot: [['', '', 'TOTAL', `$${invoice.amount.toFixed(2)}`]],
  })
  
  // Payment instructions
  doc.setFontSize(10)
  doc.text('Instrucciones de Pago:', 20, doc.lastAutoTable.finalY + 15)
  doc.setFontSize(9)
  doc.text('Por favor realice el pago antes de la fecha de vencimiento.', 20, doc.lastAutoTable.finalY + 22)
  
  // Footer
  const finalY = doc.lastAutoTable.finalY
  doc.setFontSize(8)
  doc.setTextColor(128, 128, 128)
  doc.text('Gracias por su preferencia - Naam Hours', 105, finalY + 40, { align: 'center' })
  
  // Save
  doc.save(`factura_${invoice.id}_${format(new Date(), 'yyyyMMdd')}.pdf`)
}

export const generateReportPDF = (reportData, title, dateRange) => {
  const doc = new jsPDF()
  
  // Header
  doc.setFontSize(18)
  doc.setTextColor(14, 165, 233)
  doc.text(title, 105, 20, { align: 'center' })
  
  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  doc.text(`Período: ${dateRange}`, 105, 30, { align: 'center' })
  doc.text(`Generado: ${format(new Date(), 'dd/MM/yyyy HH:mm')}`, 105, 37, { align: 'center' })
  
  // Summary stats
  if (reportData.summary) {
    doc.setFontSize(11)
    doc.text('Resumen:', 20, 50)
    doc.setFontSize(9)
    
    let y = 57
    Object.entries(reportData.summary).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, 20, y)
      y += 7
    })
  }
  
  // Data table
  if (reportData.tableData && reportData.tableData.length > 0) {
    doc.autoTable({
      startY: 80,
      head: [reportData.tableData[0]],
      body: reportData.tableData.slice(1),
      theme: 'striped',
      headStyles: { fillColor: [14, 165, 233] },
    })
  }
  
  // Footer
  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 150
  doc.setFontSize(8)
  doc.setTextColor(128, 128, 128)
  doc.text('Naam Hours - Sistema de Gestión Profesional', 105, finalY + 20, { align: 'center' })
  
  // Save
  doc.save(`reporte_${format(new Date(), 'yyyyMMdd_HHmmss')}.pdf`)
}

export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) return
  
  // Get headers
  const headers = Object.keys(data[0])
  
  // Create CSV content
  let csv = headers.join(',') + '\n'
  
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header]
      // Escape commas and quotes
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value
    })
    csv += values.join(',') + '\n'
  })
  
  // Create download link
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}_${format(new Date(), 'yyyyMMdd')}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
