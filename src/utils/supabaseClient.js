import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database tables structure reference:
// - users: id, email, role (admin, supervisor, employee), created_at
// - employees: id, user_id, name, position, salary, phone, created_at
// - time_entries: id, employee_id, clock_in, clock_out, location, photo_url, notes
// - invoices: id, employee_id, amount, status (pending, paid, rejected), due_date, created_at
// - payments: id, employee_id, amount, payment_date, period, deductions, notes
// - notifications: id, user_id, type, message, read, created_at
