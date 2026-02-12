import { useState, useEffect, createContext, useContext } from 'react'
import { supabase } from '../utils/supabaseClient'
import { getCurrentUser, getUserRole, ROLES } from '../utils/authUtils'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(ROLES.EMPLOYEE)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions and sets the user
    const initAuth = async () => {
      const { user: currentUser } = await getCurrentUser()
      setUser(currentUser)
      
      if (currentUser) {
        const role = await getUserRole(currentUser.id)
        setUserRole(role)
      }
      
      setLoading(false)
    }

    initAuth()

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      
      if (session?.user) {
        const role = await getUserRole(session.user.id)
        setUserRole(role)
      } else {
        setUserRole(ROLES.EMPLOYEE)
      }
      
      setLoading(false)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const value = {
    user,
    userRole,
    loading,
    signOut: async () => {
      await supabase.auth.signOut()
      setUser(null)
      setUserRole(ROLES.EMPLOYEE)
    }
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
