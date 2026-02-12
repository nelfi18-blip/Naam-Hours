import { supabase } from './supabaseClient'

export const ROLES = {
  ADMIN: 'admin',
  SUPERVISOR: 'supervisor',
  EMPLOYEE: 'employee'
}

export const signUp = async (email, password, userData) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error) {
    return { error }
  }
}

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return { user, error: null }
  } catch (error) {
    return { user: null, error }
  }
}

export const hasPermission = (userRole, requiredRole) => {
  const roleHierarchy = {
    [ROLES.ADMIN]: 3,
    [ROLES.SUPERVISOR]: 2,
    [ROLES.EMPLOYEE]: 1
  }
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

export const canAccessResource = (userRole, resourceOwnerId, currentUserId) => {
  // Admin can access everything
  if (userRole === ROLES.ADMIN) return true
  
  // Supervisor can access their team (implement team logic as needed)
  if (userRole === ROLES.SUPERVISOR) return true
  
  // Employee can only access their own resources
  return resourceOwnerId === currentUserId
}

export const getUserRole = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data?.role || ROLES.EMPLOYEE
  } catch (error) {
    console.error('Error getting user role:', error)
    return ROLES.EMPLOYEE
  }
}

export const updateUserRole = async (userId, newRole) => {
  try {
    const { error } = await supabase
      .from('users')
      .update({ role: newRole })
      .eq('id', userId)
    
    if (error) throw error
    return { error: null }
  } catch (error) {
    return { error }
  }
}

export const logAuditEvent = async (userId, action, details) => {
  try {
    const { error } = await supabase
      .from('audit_logs')
      .insert([{
        user_id: userId,
        action,
        details,
        created_at: new Date().toISOString()
      }])
    
    if (error) throw error
  } catch (error) {
    console.error('Error logging audit event:', error)
  }
}
